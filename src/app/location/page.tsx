"use client";
import LocationDialogs from "@/components/locations/dialogs/location-dialogs";
import { TravelDialog } from "@/components/locations/dialogs/travel-dialog";
import LocationMenu from "@/components/locations/location-menu";
import { locationData } from "@/data/locations/location-data";
import { useCurrentUser } from "@/hooks/use-current-user";
import { locationImages } from "@/images/locations/location-images";
import { useLocationStore } from "@/store/location-store";
import { LocationName } from "@/types/location";
import Image from "next/image";

const LocationPage = () => {
  const { data: user } = useCurrentUser();
  const location = user?.location.toLocaleLowerCase() as LocationName;
  const currentLocation = locationImages[location];
  const aboutLocation = locationData[location];
  return (
    <>
      <div className="location-page blur-on large-width relative mx-auto grid">
        <div className="relative grid">
          <Image
            src={currentLocation.img}
            alt={currentLocation.alt}
            placeholder="blur"
            className="location-image"
          />
          <h1 className="absolute place-self-end text-2xl font-medium text-slate-800">
            {currentLocation.name}
          </h1>
        </div>
        <LocationDialogs location={aboutLocation} />
        <LocationMenu />
      </div>
    </>
  );
};

export default LocationPage;
