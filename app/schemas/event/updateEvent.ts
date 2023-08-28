import * as z from 'zod';

export const updateeEventSchema = z.object({
  id: z.number(),
  date: z.string().datetime().optional(),
  location: z.string().optional(),
  duration: z.number().optional(),
  nb_team: z.number().optional(),
  nb_max_participant: z.number().optional(),
  sport_id: z.number().optional(),
});

export default updateeEventSchema;
