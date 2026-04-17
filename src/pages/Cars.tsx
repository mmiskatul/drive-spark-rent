import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, LayoutGrid, List, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/mock-data";

const categories = ["SUV", "Sedan", "Coupe", "Hatchback", "Electric", "Pickup"];

function FilterPanel({ price, setPrice }: { price: number[]; setPrice: (v: number[]) => void }) {
  return (
    <div className="space-y-7">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price / day</Label>
        <div className="mt-4 px-1">
          <Slider value={price} onValueChange={setPrice} min={0} max={600} step={10} />
          <div className="mt-3 flex justify-between text-sm font-medium">
            <span>${price[0]}</span><span>${price[1]}</span>
          </div>
        </div>
      </div>
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</Label>
        <div className="mt-3 space-y-2">
          {categories.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox id={`cat-${c}`} />
              <label htmlFor={`cat-${c}`} className="text-sm cursor-pointer">{c}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transmission</Label>
        <div className="mt-3 space-y-2">
          {["Automatic", "Manual"].map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox id={`tr-${c}`} />
              <label htmlFor={`tr-${c}`} className="text-sm cursor-pointer">{c}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fuel type</Label>
        <div className="mt-3 space-y-2">
          {["Petrol", "Diesel", "Electric", "Hybrid"].map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox id={`fu-${c}`} />
              <label htmlFor={`fu-${c}`} className="text-sm cursor-pointer">{c}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-border p-3 bg-secondary/40">
        <Checkbox id="verified" defaultChecked />
        <label htmlFor="verified" className="text-sm cursor-pointer flex-1">Verified partners only</label>
      </div>
    </div>
  );
}

export default function Cars() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [price, setPrice] = useState([0, 600]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => cars.filter((c) =>
    c.pricePerDay >= price[0] && c.pricePerDay <= price[1] &&
    (query === "" || c.title.toLowerCase().includes(query.toLowerCase()) || c.location.toLowerCase().includes(query.toLowerCase()))
  ), [price, query]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Browse cars</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} cars available across the UAE</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by car, brand or location…" className="pl-11 h-12 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="lg:hidden rounded-full">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-6"><FilterPanel price={price} setPrice={setPrice} /></div>
            </SheetContent>
          </Sheet>
          <Select defaultValue="recommended">
            <SelectTrigger className="h-12 rounded-full w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden sm:flex items-center rounded-full border border-border p-1 bg-card">
            <button onClick={() => setView("grid")} className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}><List className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-5">Filters</h3>
            <FilterPanel price={price} setPrice={setPrice} />
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary mx-auto"><Search className="h-6 w-6 text-muted-foreground" /></div>
              <h3 className="mt-5 font-display font-semibold text-lg">No cars found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or searching for something else.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((c) => (
                <div key={c.id} className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-border bg-card overflow-hidden card-hover">
                  <img src={c.image} alt={c.title} loading="lazy" className="sm:w-72 h-48 sm:h-auto object-cover" />
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{c.brand} · {c.year}</p>
                        <h3 className="font-display font-semibold text-lg">{c.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {c.location}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-warning text-warning" /> {c.rating}</div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-secondary px-2.5 py-1">{c.seats} seats</span>
                      <span className="rounded-full bg-secondary px-2.5 py-1">{c.transmission}</span>
                      <span className="rounded-full bg-secondary px-2.5 py-1">{c.fuel}</span>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <p><span className="font-display text-xl font-bold">${c.pricePerDay}</span><span className="text-xs text-muted-foreground"> / day</span></p>
                      <Button asChild className="rounded-full"><a href={`/cars/${c.id}`}>View details</a></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full">Load more</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
