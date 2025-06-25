"use client";
import CreditsToggle from "@/components/layout/event/CreditsToggle";
import ResponsiveImageDisplay from "@/components/layout/event/ResponsiveImageDisplay";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import BorderTitleBar from "@/components/ui/borderTitleBar/BorderTitleBar";
import ContributorsGrid from "@/components/ui/contributor/ContributorsGrid";
import type Event from "@/interfaces/event";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { mapContributorsToPersons } from "@/utils/mapContributorsToPersons";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

interface Props {
  event: Event;
}

export default function EventDetail({ event }: Props) {
  const {
    title,
    tag,
    image,
    date,
    startTime,
    endTime,
    location,
    link,
    content,
    // credits, to be used
    // sponsor, to be used
    contributors,
    video,
    spotifyLink,
    imageCarousel,
  } = event;
  const formattedDate = capitalizeFirstLetter(
    new Date(date).toLocaleDateString("no-NO", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );

  const credits =
    "Concept:" +
    "Cristina Kristal Rizzo" +
    "\n" +
    "Dancers:" +
    "Marta Bellu, Jari Boldrini, Barbara Novati, Cristina Kristal Rizzo,\n" +
    "Charlie Laban Trier\n" +
    "\n" +
    "Music:\n" +
    "Deepsea Drive Machine, Dylan Mondegreen, Satie, Ed Sheeran,\n" +
    "Napa Snidvongs\n" +
    "\n" +
    "Set and Costumes:\n" +
    "Cristina Kristal Rizzo with the dancers\n" +
    "\n" +
    "Production\n" +
    "Cab 008\n" +
    "\n" +
    "With the sustain of L!arboreto – Teatro Dimora di Mondaino\n" +
    "In collaboration with Teatro Metastasio di Prato\n" +
    "Creative Residencies spazioK.Kinkaleri , Centro nazionale di produzione / Virgilio Sieni, L!arboreto – Teatro Dimora di Mondaino and with the sustain of Regione Toscana, MiBACT and Comune di Firenze";

  return (
    <>
      <div className="relative w-full h-[300px] mobile:h-[400px] tablet:h-[500px]">
        <Image
          src={image.asset.url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {link && (
          <Link
            href={link}
            className="w-[160px] right-[20px] bottom-[20px] text-[1.625rem] absolute tablet:hidden flex items-center justify-center gap-1 px-[20px] py-[5px] text-h5 btn"
          >
            Billetter
            <HiArrowLongRight size={30} />
          </Link>
        )}
      </div>
      {/* Event Details Section */}
      <div className="px-[20px]">
        <div className="flex justify-between items-center py-[20px] border-b border-secondary">
          <div>
            {tag && <p className="text-tag italic">{tag.toUpperCase()}</p>}
            <h1 className="text-h4 phone:text-h3">{title}</h1>
            <p className="text-caption">
              {formattedDate} kl. {startTime} {endTime ? `- ${endTime}` : ""}
            </p>
            <p className="text-caption">{location}</p>
          </div>{" "}
          {link && (
            <Link
              href={link}
              className="hidden tablet:flex items-center gap-1 px-[20px] py-[10px] text-h5 btn"
            >
              Billetter
              <HiArrowLongRight size={30} />
            </Link>
          )}
        </div>
      </div>
      {/* Content Section */}
      <div className="w-full py-[40px] px-[20px] flex justify-center items-center">
        <div className="max-w-[950px] flex flex-col tablet:flex-row gap-[40px]">
          <div>{content && <CustomPortableText value={content} />}</div>
          <div className="hidden tablet:block p-[20px] border border-secondary h-fit">
            {credits}
          </div>

          {/* Mobile toggle version of credits */}
          <CreditsToggle content={credits} />
        </div>
      </div>
      {/* Video Section */}
      {video && (
        <div className="w-full px-[20px]">
          <div className="border-y border-secondary w-full flex flex-col items-center justify-center py-[20px]">
            <div className="max-w-[950px] w-full">
              <div className="aspect-video w-full">
                {video.videoType === "youtube" && video.youtubeUrl ? (
                  <iframe
                    src={video.youtubeUrl.replace("watch?v=", "embed/")}
                    title="Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : video.videoType === "upload" && video.videoFile ? (
                  <video controls className="w-full h-full" title="Video">
                    <source src={video.videoFile.asset.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {/* Image Section */}
      {imageCarousel && imageCarousel.length > 0 && (
        <div className="flex flex-col items-center justify-center px-[20px]">
          {" "}
          <ResponsiveImageDisplay images={imageCarousel.map((i) => i.image)} />
        </div>
      )}
      {/* Spotify Link Section */}
      {spotifyLink && (
        <div className="w-full px-[20px]">
          <div className="flex flex-col items-center justify-center w-full border-t border-secondary pt-[20px]">
            <div className="max-w-[950px] w-full">
              <div className="w-full">
                <iframe
                  src={spotifyLink}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>{" "}
          </div>
        </div>
      )}
      {/* Contributors Section */}
      {contributors && contributors.length > 0 && (
        <>
          <BorderTitleBar title="Medvirkende" />
          <ContributorsGrid persons={mapContributorsToPersons(contributors)} />
        </>
      )}
    </>
  );
}
