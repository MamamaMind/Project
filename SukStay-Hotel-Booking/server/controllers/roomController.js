import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";

// API to create a new room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomName, roomType, pricePerNight, amenities, hotelId, description } = req.body;

    
    const hotel = await Hotel.findOne({
      _id: hotelId,
      owner: req.auth().userId,
    });

    if (!hotel) {
      return res.json({ success: false, message: "Invalid hotel selection" });
    }

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomName,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: JSON.parse(amenities),
      images,
      description,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




// API to get all rooms
export const getRooms = async(req, res)=>{
    try {
        const rooms = await Room.find({isAvailable:true}).populate({
            path:'hotel', 
            populate:{
                path: 'owner',
                model: 'User',
                select: 'username image'
            }
        }).sort({createdAt: -1})
        res.json({success:true, rooms});
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getOwnerRooms = async (req, res) => {
  try {
    // FIXED: Changed req.auth.userId to req.auth().userId
    const hotels = await Hotel.find({ owner: req.auth().userId }); 

    if (!hotels.length) {
      return res.json({ success: true, rooms: [] });
    }

    const hotelIds = hotels.map(h => h._id);
    
    // Fixed: Added await and proper population
    const rooms = await Room.find({ hotel: { $in: hotelIds } })
      .populate("hotel", "name city");

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("Error in getOwnerRooms:", error); // Log the actual error
    res.status(500).json({ success: false, message: error.message });
  }
};


// API to toggle availability of a room
export const toggleRoomAvailability = async(req, res)=>{
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.json({success:true, message:"Room availability Updated"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate({
      path: "hotel",
      populate: {
        path: "owner",
        model: "User",
        select: "username image", // only send username & image
      },
    });

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
