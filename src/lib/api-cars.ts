import { cars as mockCars, type Car, type CarCategory, type FuelType, type Transmission } from "@/lib/mock-data";

export type ApiCar = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  location: string;
  price_per_day: number;
  seats: number;
  transmission: string;
  fuel: string;
  status: "draft" | "active" | "unavailable";
  features: string[];
  image_urls?: string[];
  description?: string | null;
};

export type CarsResponse = {
  items: ApiCar[];
};

const categories: CarCategory[] = ["SUV", "Sedan", "Coupe", "Hatchback", "Electric", "Pickup"];
const fuelTypes: FuelType[] = ["Petrol", "Diesel", "Electric", "Hybrid"];
const transmissions: Transmission[] = ["Automatic", "Manual"];

function fallbackCarFor(category: string) {
  return mockCars.find((car) => car.category === category) ?? mockCars[0];
}

function toCategory(value: string): CarCategory {
  return categories.includes(value as CarCategory) ? (value as CarCategory) : "Sedan";
}

function toFuelType(value: string): FuelType {
  return fuelTypes.includes(value as FuelType) ? (value as FuelType) : "Petrol";
}

function toTransmission(value: string): Transmission {
  return transmissions.includes(value as Transmission) ? (value as Transmission) : "Automatic";
}

export function apiCarToCar(apiCar: ApiCar): Car {
  const category = toCategory(apiCar.category);
  const fallback = fallbackCarFor(category);
  const image = apiCar.image_urls?.[0] ?? fallback.image;
  const gallery = apiCar.image_urls?.length ? apiCar.image_urls : [image];

  return {
    id: apiCar.id,
    title: apiCar.title,
    brand: apiCar.brand,
    model: apiCar.model,
    year: apiCar.year,
    category,
    image,
    gallery,
    location: apiCar.location,
    pricePerDay: apiCar.price_per_day,
    seats: apiCar.seats,
    doors: fallback.doors,
    luggage: fallback.luggage,
    transmission: toTransmission(apiCar.transmission),
    fuel: toFuelType(apiCar.fuel),
    rating: fallback.rating,
    reviews: fallback.reviews,
    available: apiCar.status === "active",
    verified: true,
    partner: fallback.partner,
    features: apiCar.features,
    description: apiCar.description || "This car is available to rent from a verified DriveNow partner.",
  };
}

export function apiCarsToCars(response: CarsResponse): Car[] {
  return response.items.map(apiCarToCar);
}
