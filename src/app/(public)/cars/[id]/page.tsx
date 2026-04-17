import CarDetails from "@/screens/CarDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CarDetails id={id} />;
}
