import { ErrorResponse } from "../middleware/errorHandler";
import { pb } from "../pocketbase";
import { ReservationInput } from "../schemas";

export async function bookReservationForRoom(
	reservation: ReservationInput & { roomId: string },
) {
	const existingReservations = await pb
		.collection("reservations")
		.getList(1, 1, {
			filter: pb.filter(
				`room_id={:roomId} && start < {:end} && end > {:start} && status = "active"`,
				reservation,
			),
		});
	if (existingReservations.totalItems > 0) {
		throw new ErrorResponse("Room is already booked for the given time", 400);
	}
	// call payment service here and add payment id to reservation record
	return pb.collection("reservations").create(reservation);
}

export async function bookReservation(reservation: ReservationInput) {
	const availableRooms = [];

	/* 
SELECT rooms.*
FROM rooms
LEFT JOIN reservations ON rooms.id = reservations.room_id 
    AND NOT (reservations.start >= :endAt OR reservations.end <= :startAt)
WHERE rooms.type = :roomType
    AND (reservations.id IS NULL OR reservations.active = false)
GROUP BY rooms.id
HAVING COUNT(reservations.id) = 0; 
*/

	if (availableRooms.length === 0) {
		throw new ErrorResponse("No rooms available", 400);
	}

	// call payment service here and add payment id to reservation record
	return pb
		.collection("reservations")
		.create({ roomId: availableRooms[0].id, ...reservation });
}
