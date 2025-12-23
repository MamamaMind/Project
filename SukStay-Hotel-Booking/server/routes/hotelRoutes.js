import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel, getMyHotels } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
hotelRouter.get('/my-hotels', protect, getMyHotels);

export default hotelRouter;