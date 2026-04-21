import { Role } from "../src/generated/prisma/client";
import * as bcrypt from "bcrypt";
import { prisma } from "../src/app";

(async function main() {
  const hashedPassword = await bcrypt.hash("@dmin99", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@infratp.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@infratp.com",
      name: "Super Admin",
      password: hashedPassword,
      role: Role.ADMIN, // Utilisation de l'Enum
      storagePath: "/storage/admin", // Chemin local spécifique
      storageQuota: BigInt(107374182400), // 100 Go par exemple
      isActive: true,
    },
  });

  console.log(adminUser);
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
