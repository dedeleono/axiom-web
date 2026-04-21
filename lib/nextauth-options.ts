import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" as const },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user?: { email?: string | null } | any }) {
      const email = user?.email?.toLowerCase().trim();
      if (!email) return false;

      const existing = await prisma.user.findUnique({
        where: { email },
        select: { role: true },
      });

      const adminEmails = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      // Dev bootstrap: if there are no admins yet, the first logged-in user becomes ADMIN.
      // Prod: only users listed in ADMIN_EMAILS are admins.
      const shouldBeAdmin =
        adminEmails.includes(email) ||
        (process.env.NODE_ENV !== "production" &&
          (existing?.role !== Role.ADMIN) &&
          (await prisma.user.count({ where: { role: Role.ADMIN } })) === 0);

      if (shouldBeAdmin && existing?.role !== Role.ADMIN) {
        await prisma.user
          .update({
            where: { email },
            data: { role: Role.ADMIN },
          })
          .catch(() =>
            prisma.user.create({
              data: {
                email,
                name: user?.name ?? null,
                image: user?.image ?? null,
                role: Role.ADMIN,
              },
            })
          );
      }

      return true;
    },
    async session({ session, user }: { session: any; user: any }) {
      if (session?.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email ?? undefined },
          select: { role: true },
        });
        if (dbUser) {
          (session.user as any).role = dbUser.role;
        }
      }
      return session;
    },
  },
};
