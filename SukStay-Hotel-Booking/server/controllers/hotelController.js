import Hotel from "../models/Hotel.js";
import User from "../models/User.js";


export const registerHotel = async (req, res) => {
  try {
    const {
      name,
      address,
      contact,
      city,
      highlightTitle,
      highlightSubtitle,
      rating,
    } = req.body;

    const owner = req.user._id;

    await Hotel.create({
      name,
      address,
      contact,
      city,
      owner,
      highlightTitle,
      highlightSubtitle,
      rating,
    });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel Registered Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getMyHotels = async (req, res) => {
  try {
    const owner = req.user._id;

    const hotels = await Hotel.find({ owner }).populate('owner', 'username image').select('name city owner');


    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
