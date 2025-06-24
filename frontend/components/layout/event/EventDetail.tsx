'use client'
import EventImageCarousel from '@/components/layout/event/EventImageCarousel'
import BorderTitleBar from '@/components/ui/borderTitleBar/BorderTitleBar'
import type Event from '@/interfaces/event'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowLongRight } from 'react-icons/hi2'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface Props {
  event: Event
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
  } = event
  const formattedDate = capitalizeFirstLetter(
    new Date(date).toLocaleDateString('no-NO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }),
  )

  return (
    <>
      <div className="relative w-full h-[300px] mobile:h-[400px] tablet:h-[500px]">
        <Image src={image.asset.url} alt={title} fill className="object-cover" priority />
      </div>
      <div className="px-[20px]">
        <div className="flex justify-between items-center py-[20px] border-b border-secondary">
          <div>
            {tag && <p className="text-tag italic">{tag.toUpperCase()}</p>}
            <h1 className="text-h4 phone:text-h3">{title}</h1>
            <p className="text-caption">
              {formattedDate} kl. {startTime} - {endTime}
            </p>
            <p className="text-caption">{location}</p>
          </div>{' '}
          {link && (
            <Link
              href={link}
              className="hidden tablet:flex items-center gap-1 px-[20px] py-[10px] text-button btn"
            >
              Billetter
              <HiArrowLongRight size={30} />
            </Link>
          )}
        </div>
        {link && (
          <Link
            href={link}
            className="w-full tablet:hidden flex items-center justify-center gap-1 px-[20px] py-[10px] text-button btn mt-[20px]"
          >
            Billetter
            <HiArrowLongRight size={30} />
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full pt-[40px] pb-[20px] px-[20px]">
        <div className="max-w-[650px] space-y-[40px]">
          {content && <CustomPortableText value={content} />}
        </div>
      </div>
      {video && (
        <div className="flex flex-col items-center justify-center w-full pb-[40px] px-[20px]">
          <div className="max-w-[650px] w-full">
            <h2 className="text-h4 mb-[20px] text-center">Video</h2>
            <div className="aspect-video w-full">
              {video.videoType === 'youtube' && video.youtubeUrl ? (
                <iframe
                  src={video.youtubeUrl.replace('watch?v=', 'embed/')}
                  title="Video"
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : video.videoType === 'upload' && video.videoFile ? (
                <video controls className="w-full h-full rounded-lg" title="Video">
                  <source src={video.videoFile.asset.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          </div>
        </div>
      )}{' '}
      {imageCarousel && imageCarousel.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full pb-[40px] px-[20px]">
          {' '}
          <div className="max-w-[800px] w-full">
            <EventImageCarousel images={imageCarousel.map((slide) => slide.image)} />
          </div>
        </div>
      )}
      {spotifyLink && (
        <div className="flex flex-col items-center justify-center w-full pb-[40px] px-[20px]">
          <div className="max-w-[650px] w-full">
            <div className="w-full">
              <iframe
                src={spotifyLink}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </div>{' '}
        </div>
      )}
      {/* Contributors Section */}
      {contributors && contributors.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full pb-[40px] px-[20px]">
          <div className="max-w-[900px] w-full">
            <h2 className="text-h4 mb-[20px] text-center">Medvirkende</h2>
            <div
              className={`grid gap-[20px] ${
                contributors.length === 1
                  ? 'grid-cols-1'
                  : contributors.length === 2
                    ? 'grid-cols-1 tablet:grid-cols-2'
                    : contributors.length === 3
                      ? 'grid-cols-1 tablet:grid-cols-3'
                      : 'grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4'
              }`}
            >
              {contributors.map((contributor, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-[10px]">
                  <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
                    <Image
                      src={contributor.image.asset.url}
                      alt={contributor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-h5 font-semibold">{contributor.name}</h3>
                    <p className="text-caption text-secondary italic">{contributor.artistType}</p>
                    {contributor.bio && (
                      <p className="text-small mt-[5px] text-left">{contributor.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <BorderTitleBar linkText="Alle arrangementer" linkUrl="/program" />
    </>
  )
}
