import express from "express";
import { checkAvailabilityAPI, createBooking, getHotelBookings, getUserBookings, demoPayment } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI); 
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect,getHotelBookings);
bookingRouter.post('/demo-payment', protect, demoPayment);

export default bookingRouter;
