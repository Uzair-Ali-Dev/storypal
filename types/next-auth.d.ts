import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isProfileComplete: boolean;
      username: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
