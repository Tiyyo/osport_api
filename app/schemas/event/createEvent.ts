import * as z from 'zod';

const createEventSchema = z.object({
  date: z.string().datetime(),
  location: z.string(),
  duration: z.number(),
  nb_team: z.number().optional(),
  nb_max_participant: z.number(),
  user_id: z.number(),
  sport_id: z.number(),
});

export default createEventSchema;
