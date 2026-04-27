interface JwtPlayload {
  id: string;
  email: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

export { JwtPlayload };
