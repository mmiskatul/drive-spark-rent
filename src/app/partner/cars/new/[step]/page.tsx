import PartnerAddCar from "@/screens/partner/AddCar";

export default async function Page({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  return <PartnerAddCar step={step} />;
}
