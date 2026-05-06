import { logger, task } from "@trigger.dev/sdk";

import { sendDataroomInfoEmail } from "@/lib/emails/send-dataroom-info";
import { sendDataroomTrial24hReminderEmail } from "@/lib/emails/send-dataroom-trial-24h";
import { sendDataroomTrialEndEmail } from "@/lib/emails/send-dataroom-trial-end";

export const sendDataroomTrialInfoEmailTask = task({
  id: "send-dataroom-trial-info-email",
  retry: { maxAttempts: 3 },
  run: async (payload: { to: string; useCase: string; name: string }) => {
    await sendDataroomInfoEmail(
      { user: { email: payload.to, name: payload.name } },
      payload.useCase,
    );
    logger.info("Dataroom trial info email sent");
  },
});

export const sendDataroomTrial24hReminderEmailTask = task({
  id: "send-dataroom-trial-24h-reminder-email",
  retry: { maxAttempts: 3 },
  run: async (payload: { to: string; name: string; teamId: string }) => {
    await sendDataroomTrial24hReminderEmail({
      email: payload.to,
      name: payload.name,
    });
    logger.info("Dataroom trial 24h reminder sent", {
      teamId: payload.teamId,
    });
  },
});

export const sendDataroomTrialExpiredEmailTask = task({
  id: "send-dataroom-trial-expired-email",
  retry: { maxAttempts: 3 },
  run: async (payload: { to: string; name: string; teamId: string }) => {
    await sendDataroomTrialEndEmail({
      email: payload.to,
      name: payload.name,
    });
    logger.info("Dataroom trial expired email sent", {
      teamId: payload.teamId,
    });
  },
});
