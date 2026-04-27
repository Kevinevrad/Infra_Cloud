import { prisma, Role } from "../app";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type AuthenticatedRequest = Request & {
  user?: { userId: string; email: string; role: string };
} & Request<Params>;

type Params = {
  userId: string;
};

const userController = {
  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Email & Password Requis" });
      }
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur trouvé avec cet email" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "2h" },
      );

      res.status(200).json({ message: "Connecter avec succès  ", token });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
  },

  registerUser: async (req: AuthenticatedRequest, res: Response) => {
    const { email, password, name } = req.body;
    console.log(email, password, name);

    const admin = req.user;
    const role = req.body.role as Role | undefined;

    try {
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ message: "Email, Password & Name Requis" });
      }
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      console.log(existingUser);

      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Utilisateur déjà existant avec cet email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const storagePath = `storage/users/${Date.now()}-${email}`;

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          storagePath,
          password: hashedPassword,
          role: role && admin?.role === "ADMIN" ? role : Role.USER,
          createdBy: String(admin?.userId),
        },

        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      return res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erreur serveur",
      });
    }
  },

  removeUser: async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const admin = req.user;

    try {
      if (!admin || admin.role !== "ADMIN") {
        return res.status(403).json({ message: "Accès refusé" });
      }
      // prettier-ignore
      const user = await prisma.user.findUnique({where: { id: String(userId) },});

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      // prettier-ignore
      await prisma.user.delete({where: { id: String(userId) },});
      return res
        .status(200)
        .json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getAllUsers: async (req: AuthenticatedRequest, res: Response) => {
    const admin = req.user;

    try {
      if (admin?.role !== "ADMIN") {
        return res.status(403).json({ message: "Accès refusé" });
      }
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          storagePath: true,
          storageQuota: true,
          storageUsed: true,
          files: true,
          createdAt: true,
        },
      });
      const formattedUsers = users.map((user) => ({
        ...user,
        storageQuota: user.storageQuota.toString(),
        storageUsed: user.storageUsed.toString(),
      }));

      return res.status(200).json({ users: formattedUsers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getUserById: async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    console.log(req.params);

    const admin = req.user;

    try {
      if (!admin || admin?.role !== "ADMIN") {
        return res.status(403).json({ message: "Accès refusé" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          storagePath: true,
          storageQuota: true,
          storageUsed: true,
          files: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      const formattedUser = {
        ...user,
        storageQuota: user.storageQuota.toString(),
        storageUsed: user.storageUsed.toString(),
      };
      return res.status(200).json({ user: formattedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  updateUser: async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.params;
    const { email, name, storageQuota, password } = req.body;
    const admin = req.user;

    try {
      if (admin?.role !== "ADMIN") {
        return res.status(403).json({ message: "Accès refusé" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const updatedData: any = {};

      if (email) updatedData.email = email;
      if (name) updatedData.name = name;
      if (password) updatedData.password = await bcrypt.hash(password, 10);
      if (storageQuota) updatedData.storageQuota = BigInt(storageQuota);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updatedData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          storagePath: true,
          storageQuota: true,
          storageUsed: true,
          files: true,
          updatedAt: true,
        },
      });

      const formattedUser = {
        ...updatedUser,
        storageQuota: updatedUser.storageQuota.toString(),
        storageUsed: updatedUser.storageUsed.toString(),
      };

      return res.status(200).json({
        message: "Utilisateur mis à jour avec succès",
        user: formattedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

export default userController;
