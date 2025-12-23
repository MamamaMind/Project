import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Function to Check Availability of Room
const checkAvailability = async({checkInDate, checkOutDate, room})=>{
    try {
        const bookings = await Booking.find({
            room,
            checkInDate:{$lte: checkOutDate},
            checkOutDate:{$gte: checkInDate},
        });
        const isAvailable = bookings.length===0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}

// API to check availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async(req, res) =>{
    try {
        const {room, checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success:true, isAvailable})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to create a new booking
// POST /api/bookings/book

export const createBooking = async(req,res)=>{
    try {
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;
        // Before Booking, Check Availability
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room,});

        if(!isAvailable){
            return res.json({success: false, message:"Room is not available"})
        }
        // Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000*3600*24));

        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        const mailOptions = {
            from: `"SukStay" <${process.env.SMTP_EMAIL}>`,
            to: req.user.email,
            subject: 'Hotel Booking Details',
            html: `
                <h2>Booking Confirmation Details</h2>
                <p>Dear ${req.user.username},</p>
                <p>We are delighted to confirm your booking! Here are the details of your reservation.</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Room Name:</strong> ${roomData.roomName}</li>
                    <li><strong>Room Type:</strong> ${roomData.roomType}</li>
                    <li><strong>Guests:</strong> ${booking.guests}</li>
                    <li><strong>Check-in Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Check-out Date:</strong> ${booking.checkOutDate.toDateString()}</li>
                    <li><strong>Number of Nights:</strong> ${nights}</li>
                    <li><strong>Booking Amount:</strong> ${roomData.pricePerNight.toLocaleString()} ${process.env.CURRENCY ||'฿'}  /night</li>
                    <li><strong>Total Amount:</strong> ${booking.totalPrice.toLocaleString()} ${process.env.CURRENCY || '฿'}</li>
                </ul>
                <p>We look forward to welcoming you and hope you have a wonderful stay.</p>
                <p>If you need to make any changes, feel free to contact us.</p>
                <p>Kind regards,</p>
                <p>SukStay</p>
            `, 
        }
        await transporter.sendMail(mailOptions)

        res.json({success:true, message:"Booking created successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Failed to create booking"})
    }
}

// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async(req, res)=>{
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt: -1})
        res.json({success:true, bookings})
    } catch (error) {
        res.json({success: false, message: "Failed to fetch bookings"})
    }
}


export const getHotelBookings = async (req, res) => {
    try {
        const hotels = await Hotel.find({ owner: req.auth().userId });

        if (!hotels.length) {
            return res.json({
                success: false,
                message: "No hotels found"
            });
        }

        const hotelIds = hotels.map(h => h._id);

        const bookings = await Booking.find({
            hotel: { $in: hotelIds }
        })
        .populate("room hotel user")
        .sort({ createdAt: -1 });

        const totalBookings = bookings.length;

        const totalRevenue = bookings.reduce(
            (sum, booking) => sum + (booking.isPaid ? booking.totalPrice : 0),
            0
        );

        res.json({
            success: true,
            dashboardData: {
                bookings,
                totalBookings,
                totalRevenue
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Mark booking as paid for demo purposes
export const demoPayment = async (req, res) => {
    const { bookingId } = req.body;
    const userId = req.user._id;

    try {
        
        const booking = await Booking.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        // Update booking status
        booking.isPaid = true;
        booking.paymentMethod = "Demo";
        booking.status = "confirmed";
        await booking.save();

        res.json({ success: true, message: "Booking marked as paid" });
    } catch (error) {
        res.json({ success: false, message: "Failed to mark booking as paid" });
    }
};
