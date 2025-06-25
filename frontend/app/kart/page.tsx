import BlackTitleBar from "@/components/ui/blackTitleBar/BlackTitleBar";
import GoogleMap from "@/components/ui/map/GoogleMap";
import { getMap } from "@/lib/sanity-cache";

export interface MapProps {
  mapUrl: string;
}
export default async function Kart() {
  const mapData: MapProps | null = await getMap();
  // to be used

  // render the link

  // const mapURL = "https://www.google.com/maps/d/u/0/embed?mid=1hSAprPeNIdTQ3QvE4WkmRadjY7YWBJA&ehbc=2E312F"

  return (
    <>
      <section className="flex flex-col items-center justify-center-center h-full w-full">
        <BlackTitleBar title="Kart" />
        <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10">
          <GoogleMap url={mapData?.mapUrl} width={"100%"} />
        </div>
      </section>
    </>
  );
}
