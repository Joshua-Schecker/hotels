import * as bodyParser from "body-parser";
import express from "express";
import "source-map-support/register";
import { validateRequestBody } from "zod-express-middleware";
import authHook from "./middleware/auth";
import { ErrorResponse, errorHandler } from "./middleware/errorHandler";
import { reservationSchema } from "./schemas";
import asyncHandler from "express-async-handler";

import { pb } from "./pocketbase";
import { bookRoomByNumber, bookRoomByType } from "./services/reservation";

const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(express.json());
app.use(authHook);

app.post(
	"/api/v1/rooms/:roomId/reservation",
	validateRequestBody(reservationSchema),
	asyncHandler(async (req, res) => {
		const user = pb.authStore.model;
		if (req.body.guestId && !user.roles.includes("booker")) {
			throw new ErrorResponse("Unathourized", 403);
		}
		const guestId = req.body.guestId ?? user.id;
		const result = bookRoomByNumber({
			...req.body,
			roomId: req.params.roomId,
			guestId,
		});
		res.send(result);
	}),
);

app.post(
	"/api/v1/hotel/:hotelId/reservation",
	validateRequestBody(reservationSchema),
	asyncHandler(async (req, res) => {
		const user = pb.authStore.model;
		if (req.body.guestId && !user.roles.includes("booker")) {
			throw new ErrorResponse("Unathourized", 403);
		}
		const guestId = req.body.guestId ?? user.id;
		const result = bookRoomByType({
			...req.body,
			hotelId: req.params.hotelId,
			guestId,
		});
		res.send(result);
	}),
);

app.use((req, res, next) => {
	return res.status(404).json({
		error: "Not Found",
	});
});
app.use(errorHandler);

app.listen(8080, () => {
	console.log("[server]: Server is running at http://localhost:8080");
});
