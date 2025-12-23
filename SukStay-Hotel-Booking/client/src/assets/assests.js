import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import starIconHalf from './starIconHalf.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg11 from './roomImg1-1.jpg'
import roomImg12 from './roomImg1-2.jpg'
import roomImg13 from './roomImg1-3.jpg'
import roomImg14 from './roomImg1-4.jpg'
import roomImg21 from './roomImg2-1.jpg'
import roomImg22 from './roomImg2-2.jpg'
import roomImg23 from './roomImg2-3.jpg'
import roomImg24 from './roomImg2-4.jpg'
import roomImg31 from './roomImg3-1.jpg'
import roomImg32 from './roomImg3-2.jpg'
import roomImg33 from './roomImg3-3.jpg'
import roomImg34 from './roomImg3-4.jpg'
import roomImg41 from './roomImg4-1.jpg'
import roomImg42 from './roomImg4-2.jpg'
import roomImg43 from './roomImg4-3.jpg'
import roomImg44 from './roomImg4-4.jpg'
import regImage from './regImage.jpg'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.jpg";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.jpg";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.jpg";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import Person1 from "./Person1.jpg";
import Person2 from "./Person2.jpg";
import Person3 from "./Person3.jpg";
import owenerImg from "./Owner.jpeg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    starIconHalf,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    owenerImg
}

export const cities = [
  "Bangkok",
  "Phuket",
  "Chiang Mai",
  "Tokyo",
  "London",
  "New York",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1,
    title: "Tropical Adventure Escape",
    description: "Experience island life with beach activities, crystal-clear waters, and a relaxing seaside stay.",
    priceOff: 30,
    expiryDate: "Sep 15",
    image: exclusiveOfferCardImg1 
},
    { _id: 2,
    title: "Romantic Sunset Getaway",
    description: "Create unforgettable moments with your loved one, featuring dreamy views and intimate experiences.",
    priceOff: 20,
    expiryDate: "Oct 10", 
    image: exclusiveOfferCardImg2 
    },
    {_id: 3,
    title: "Own Your Journey Retreat",
    description: "Reconnect with nature through calm waters, outdoor activities, and peaceful surroundings.",
    priceOff: 25,
    expiryDate: "Dec 31",
    image: exclusiveOfferCardImg3 
},
]

// Testimonials Dummy Data
export const testimonials = [
  {
    id: 1,
    name: "Piroj Namtakammathep",
    address: "Bangkok, Thailand",
    image: Person1,
    rating: 5,
    review: "SukStay makes travel planning simple and stress-free. I found great deals quickly, and the booking experience was smooth from start to finish.",
  },
  {
    id: 2,
    name: "Hatake Kakashi",
    address: "Konoha, Japan",
    image: Person2,
    rating: 4,
    review: "I like the clean design and reliable recommendations. SukStay helped me book a comfortable stay without any hassle.",
  },
  {
    id: 3,
    name: "Michael Carter",
    address: "California, USA",
    image: Person3,
    rating: 4.5,
    review: "Fast, intuitive, and trustworthy. SukStay is now my go-to platform whenever I travel, whether for work or leisure.",
  },
];


// Facility Icon
export const facilityIcons = {
    "Free Wifi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};



// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];
