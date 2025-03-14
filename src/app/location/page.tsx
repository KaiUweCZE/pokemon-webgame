"use client";
import LocationDialogs from "@/components/locations/dialogs/location-dialogs";
import LocationMenu from "@/components/locations/location-menu";
import LottieUnderline from "@/components/lotties/lottie-undeline";
import LoadingPikachu from "@/components/ui/loading/loading-pikachu";
import { locationData } from "@/data/locations/location-data";
import { useCurrentUser } from "@/hooks/use-current-user";
import { locationImages } from "@/images/locations/location-images";
import { setLocationData, useLocationStore } from "@/store/location-store";
import { LocationName } from "@/types/location";
import Image from "next/image";
import { useEffect, useState } from "react";

const LocationPage = () => {
  const { data: user } = useCurrentUser();
  const location = user?.location.toLocaleLowerCase() as LocationName;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const currentLocation = locationImages[location];
  const aboutLocation = locationData[location];
  const { isActionInProgress, isLocationChanging, setLocationChanging } = useLocationStore();
  const partOfDay = user?.partOfDay ?? 0;
  useEffect(() => {
    setLocationData(aboutLocation);
  }, [user?.location, aboutLocation]);

  const timeOfDay =
    user?.partOfDay !== undefined ? ["Morning", "Evening", "Night"][user.partOfDay] : "";

  const showLoading = isLocationChanging || (isActionInProgress && isImageLoading);

  const timeStyles = partOfDay === 0 ? "" : partOfDay === 1 ? "evening-filter" : "night-filter";

  return (
    <div className="location-page blur-on large-width relative mx-auto grid">
      <div className="relative grid overflow-hidden shadow-primary transition-all duration-500">
        <Image
          src={currentLocation.img}
          alt={currentLocation.alt}
          placeholder="blur"
          className={`location-image time-filter transition-opacity duration-700 ${timeStyles} ${isImageLoading ? "opacity-70" : "opacity-100"}`}
          onLoadingComplete={() => {
            setIsImageLoading(false);
            setLocationChanging(false);
          }}
          onLoad={() => setIsImageLoading(false)}
          priority
        />

        <section className="absolute top-16 grid w-full items-center pl-36 pr-20">
          <div className="relative grid">
            <h1 className="text-5xl font-bold tracking-wide text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {currentLocation.name}
            </h1>
            <span className="absolute -left-3 top-6">
              <LottieUnderline isActive={!isLocationChanging} />
            </span>
            <div className="ml-2 mt-2 flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  partOfDay === 0
                    ? "bg-amber-200"
                    : partOfDay === 1
                      ? "bg-amber-400"
                      : "bg-amber-700"
                }`}
              ></span>
              <span className="text-xs italic text-amber-100/80">
                Day {user?.day || "?"} • {timeOfDay}
              </span>
            </div>
          </div>
        </section>
      </div>

      <LocationDialogs location={aboutLocation} />
      <LocationMenu />
      {showLoading && <LoadingPikachu />}
    </div>
  );
};

export default LocationPage;
