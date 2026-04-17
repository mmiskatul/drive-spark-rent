import suvWhite from "@/assets/car-suv-white.jpg";
import sedanBlack from "@/assets/car-sedan-black.jpg";
import coupeRed from "@/assets/car-coupe-red.jpg";
import hatchBlue from "@/assets/car-hatch-blue.jpg";
import evSilver from "@/assets/car-ev-silver.jpg";
import truckWhite from "@/assets/car-truck-white.jpg";

export type CarCategory = "SUV" | "Sedan" | "Coupe" | "Hatchback" | "Electric" | "Pickup";
export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type Transmission = "Automatic" | "Manual";

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  image: string;
  gallery: string[];
  location: string;
  pricePerDay: number;
  seats: number;
  doors: number;
  luggage: number;
  transmission: Transmission;
  fuel: FuelType;
  rating: number;
  reviews: number;
  available: boolean;
  verified: boolean;
  partner: { id: string; name: string; logo?: string; rating: number; cars: number };
  features: string[];
  description: string;
}

export const cars: Car[] = [
  {
    id: "c1",
    title: "Mercedes-Benz GLE 450",
    brand: "Mercedes-Benz",
    model: "GLE 450",
    year: 2024,
    category: "SUV",
    image: suvWhite,
    gallery: [suvWhite, sedanBlack, evSilver],
    location: "Dubai Marina, UAE",
    pricePerDay: 240,
    seats: 5,
    doors: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.9,
    reviews: 187,
    available: true,
    verified: true,
    partner: { id: "p1", name: "Prestige Auto Rentals", rating: 4.9, cars: 42 },
    features: ["Apple CarPlay", "Panoramic Roof", "360° Camera", "Leather Seats", "GPS", "Bluetooth", "Heated Seats", "Cruise Control"],
    description: "Premium full-size SUV with cutting-edge technology, refined interior and effortless performance for city or long-distance travel.",
  },
  {
    id: "c2",
    title: "BMW 5 Series M Sport",
    brand: "BMW",
    model: "530i",
    year: 2024,
    category: "Sedan",
    image: sedanBlack,
    gallery: [sedanBlack, suvWhite],
    location: "Downtown, Dubai",
    pricePerDay: 180,
    seats: 5,
    doors: 4,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.8,
    reviews: 142,
    available: true,
    verified: true,
    partner: { id: "p2", name: "Elite Drive Co.", rating: 4.8, cars: 28 },
    features: ["Heads-Up Display", "Sport Mode", "Premium Sound", "Heated Seats", "Wireless Charging"],
    description: "Executive sedan combining athletic dynamics with first-class comfort. Perfect for business travel and weekend getaways.",
  },
  {
    id: "c3",
    title: "Porsche 911 Carrera",
    brand: "Porsche",
    model: "911",
    year: 2023,
    category: "Coupe",
    image: coupeRed,
    gallery: [coupeRed],
    location: "Palm Jumeirah, Dubai",
    pricePerDay: 520,
    seats: 2,
    doors: 2,
    luggage: 1,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 5.0,
    reviews: 64,
    available: true,
    verified: true,
    partner: { id: "p3", name: "Apex Supercars", rating: 5.0, cars: 18 },
    features: ["Sport Chrono", "Carbon Trim", "Premium Audio", "Launch Control"],
    description: "Iconic sports coupe. Pure driving pleasure, race-bred engineering, daily-drivable refinement.",
  },
  {
    id: "c4",
    title: "Mini Cooper S",
    brand: "Mini",
    model: "Cooper S",
    year: 2023,
    category: "Hatchback",
    image: hatchBlue,
    gallery: [hatchBlue],
    location: "JBR, Dubai",
    pricePerDay: 95,
    seats: 4,
    doors: 3,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.7,
    reviews: 98,
    available: true,
    verified: true,
    partner: { id: "p2", name: "Elite Drive Co.", rating: 4.8, cars: 28 },
    features: ["Sunroof", "Sport Seats", "Apple CarPlay", "Cruise Control"],
    description: "Compact, agile and full of character. The perfect city companion with a playful personality.",
  },
  {
    id: "c5",
    title: "Tesla Model Y Long Range",
    brand: "Tesla",
    model: "Model Y",
    year: 2024,
    category: "Electric",
    image: evSilver,
    gallery: [evSilver, suvWhite],
    location: "Business Bay, Dubai",
    pricePerDay: 160,
    seats: 5,
    doors: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Electric",
    rating: 4.9,
    reviews: 211,
    available: true,
    verified: true,
    partner: { id: "p4", name: "EcoMotion Rentals", rating: 4.9, cars: 36 },
    features: ["Autopilot", "Glass Roof", "Premium Connectivity", "Supercharging", "Sentry Mode"],
    description: "All-electric SUV with cutting-edge tech, instant torque and zero emissions. The future of driving.",
  },
  {
    id: "c6",
    title: "Ford F-150 Lariat",
    brand: "Ford",
    model: "F-150",
    year: 2023,
    category: "Pickup",
    image: truckWhite,
    gallery: [truckWhite],
    location: "Sharjah, UAE",
    pricePerDay: 140,
    seats: 5,
    doors: 4,
    luggage: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.6,
    reviews: 73,
    available: false,
    verified: true,
    partner: { id: "p5", name: "Desert Wheels", rating: 4.6, cars: 24 },
    features: ["4x4", "Tow Package", "Bed Liner", "Heated Seats", "Apple CarPlay"],
    description: "Capable and versatile. Built for work and weekend adventures alike.",
  },
];

export type BookingStatus = "pending" | "confirmed" | "active" | "completed" | "rejected" | "cancelled";

export interface Booking {
  id: string;
  code: string;
  carId: string;
  car: Car;
  customer: { name: string; email: string; avatar?: string };
  partner: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  days: number;
  subtotal: number;
  taxes: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
}

export const bookings: Booking[] = [
  {
    id: "b1", code: "DN-48201",
    carId: "c1", car: cars[0],
    customer: { name: "Ahmed Hassan", email: "ahmed@example.com" },
    partner: "Prestige Auto Rentals",
    pickupDate: "2026-04-22", returnDate: "2026-04-26",
    pickupLocation: "Dubai Marina",
    days: 4, subtotal: 960, taxes: 48, total: 1008,
    status: "pending", createdAt: "2026-04-17T09:14:00Z",
    notes: "Please arrange child seat if possible.",
  },
  {
    id: "b2", code: "DN-48180",
    carId: "c5", car: cars[4],
    customer: { name: "Sara Khan", email: "sara@example.com" },
    partner: "EcoMotion Rentals",
    pickupDate: "2026-04-19", returnDate: "2026-04-23",
    pickupLocation: "Business Bay",
    days: 4, subtotal: 640, taxes: 32, total: 672,
    status: "confirmed", createdAt: "2026-04-16T11:00:00Z",
  },
  {
    id: "b3", code: "DN-48150",
    carId: "c3", car: cars[2],
    customer: { name: "Marco Rossi", email: "marco@example.com" },
    partner: "Apex Supercars",
    pickupDate: "2026-04-15", returnDate: "2026-04-18",
    pickupLocation: "Palm Jumeirah",
    days: 3, subtotal: 1560, taxes: 78, total: 1638,
    status: "active", createdAt: "2026-04-12T08:30:00Z",
  },
  {
    id: "b4", code: "DN-48010",
    carId: "c4", car: cars[3],
    customer: { name: "Lina Park", email: "lina@example.com" },
    partner: "Elite Drive Co.",
    pickupDate: "2026-04-02", returnDate: "2026-04-05",
    pickupLocation: "JBR",
    days: 3, subtotal: 285, taxes: 14, total: 299,
    status: "completed", createdAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "b5", code: "DN-47988",
    carId: "c2", car: cars[1],
    customer: { name: "Diego Alvarez", email: "diego@example.com" },
    partner: "Elite Drive Co.",
    pickupDate: "2026-04-25", returnDate: "2026-04-28",
    pickupLocation: "Downtown",
    days: 3, subtotal: 540, taxes: 27, total: 567,
    status: "rejected", createdAt: "2026-04-15T15:00:00Z",
  },
];

export const locations = [
  { name: "Dubai", count: 1240, image: suvWhite },
  { name: "Abu Dhabi", count: 612, image: sedanBlack },
  { name: "Sharjah", count: 318, image: truckWhite },
  { name: "Ras Al Khaimah", count: 142, image: evSilver },
];

export const partners = [
  { id: "p1", name: "Prestige Auto Rentals", rating: 4.9, cars: 42, verified: true },
  { id: "p2", name: "Elite Drive Co.", rating: 4.8, cars: 28, verified: true },
  { id: "p3", name: "Apex Supercars", rating: 5.0, cars: 18, verified: true },
  { id: "p4", name: "EcoMotion Rentals", rating: 4.9, cars: 36, verified: true },
  { id: "p5", name: "Desert Wheels", rating: 4.6, cars: 24, verified: false },
];

export const testimonials = [
  { id: "t1", name: "Aisha M.", role: "Frequent traveler", quote: "The booking experience felt premium from start to finish. Car was spotless, partner was professional. This is how rentals should work.", rating: 5 },
  { id: "t2", name: "James P.", role: "Business owner", quote: "Listed five vehicles in under an hour. The dashboard is genuinely beautiful and the booking flow converts much better than my old platform.", rating: 5 },
  { id: "t3", name: "Priya R.", role: "Weekend driver", quote: "Found a Tesla in two minutes, booked in one. The whole flow felt like Apple-level polish — so easy.", rating: 5 },
];

export const faqs = [
  { q: "How does DriveNow work?", a: "Browse verified vehicles, request the dates that suit you, get instant confirmation from the rental partner, and pick up your car. Everything is tracked in your dashboard." },
  { q: "Are all rental partners verified?", a: "Yes. Every partner goes through a multi-step verification including business documents, insurance proof and identity checks before listing." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to 24 hours before pickup. Specific terms are shown on each car page before you confirm a booking." },
  { q: "Do I need a security deposit?", a: "Most listings require a refundable deposit, refunded within 3 business days after the rental ends and the vehicle is inspected." },
  { q: "How are payments handled?", a: "Payments are securely processed and held until pickup. Partners are paid out on a 7-day rolling cycle for completed rentals." },
  { q: "Can I extend my rental?", a: "Yes — request an extension from your booking page and the partner will confirm based on availability." },
];
