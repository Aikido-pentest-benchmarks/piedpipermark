import { z } from "zod";

import prisma from "@/lib/prisma";

export const RestrictedTokenSubjectTypeSchema = z.enum(["user", "machine"]);

export function parseRestrictedTokenSubjectType(
  raw: string | null | undefined,
): z.infer<typeof RestrictedTokenSubjectTypeSchema> {
  const parsed = RestrictedTokenSubjectTypeSchema.safeParse(
    typeof raw === "string" ? raw.trim().toLowerCase() : "user",
  );
  return parsed.success ? parsed.data : "user";
}

export async function revokeUserBoundTeamTokens(
  userId: string,
  teamId: string,
): Promise<void> {
  await prisma.restrictedToken.deleteMany({
    where: {
      userId,
      teamId,
      subjectType: "user",
    },
  });
}
