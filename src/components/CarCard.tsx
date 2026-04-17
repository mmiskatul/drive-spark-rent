import { Link } from "react-router-dom";
import { Star, Users, Fuel, Settings2, MapPin, Heart, BadgeCheck } from "lucide-react";
import type { Car } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CarCard({ car, className }: { car: Car; className?: string }) {
  return (
    <article className={cn(
      "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-hover",
      className,
    )}>
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <img
          src={car.image}
          alt={car.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {car.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-foreground shadow-soft">
              <BadgeCheck className="h-3.5 w-3.5 text-status-confirmed" /> Verified
            </span>
          )}
          {!car.available && (
            <span className="rounded-full bg-status-rejected-bg text-status-rejected px-2.5 py-1 text-[11px] font-medium">Booked</span>
          )}
        </div>
        <button
          aria-label="Save"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur shadow-soft text-muted-foreground hover:text-destructive transition-colors"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">{car.brand} · {car.year}</p>
            <h3 className="font-display font-semibold text-foreground truncate mt-0.5">{car.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground shrink-0">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {car.rating}
            <span className="text-muted-foreground">({car.reviews})</span>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {car.location}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {car.seats}</div>
          <div className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" /> {car.transmission.slice(0, 4)}</div>
          <div className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5" /> {car.fuel}</div>
        </div>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-xl font-display font-bold text-foreground">${car.pricePerDay}</span>
            <span className="text-xs text-muted-foreground"> / day</span>
          </div>
          <Button asChild size="sm" className="rounded-full">
            <Link to={`/cars/${car.id}`}>View</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
