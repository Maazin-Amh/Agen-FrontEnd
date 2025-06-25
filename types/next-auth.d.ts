import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number | undefined | null;
      email: string | undefined | null;
      password: string | undefined | null | unknown;
      alamat: string | undefined | null | unknown;
      name: string | undefined | null;
      role: string | undefined | null |unknown;
      accessToken: any;
      refreshToken: any;
      token: any;
    };
  }
}
