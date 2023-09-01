import * as z from 'zod';
const invitationParticipantSchema = z.object({
    eventId: z.number().int().positive(),
    userId: z.number().int().positive(),
});
export default invitationParticipantSchema;
