import CustomerBookingDetails from "@/screens/customer/BookingDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CustomerBookingDetails id={id} />;
}
