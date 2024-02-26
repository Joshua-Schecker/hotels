import { z } from "zod";

export const roomReservationSchema = z.object({
	guestId: z.string().uuid().optional(),
	start: z.date(),
	end: z.date(),
});
export type ReservationForRoomInput = z.infer<typeof reservationSchema>;

export const reservationSchema = z.object({
	roomType: z.enum(["single", "double", "suite"]),
	guestId: z.string().uuid().optional(),
	start: z.date(),
	end: z.date(),
});
export type ReservationInput = z.infer<typeof reservationSchema>;
