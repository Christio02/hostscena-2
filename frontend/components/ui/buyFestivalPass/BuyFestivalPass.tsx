import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { getBackgroundVideo } from "@/lib/sanity-cache";
import { PortableTextBlock } from "@portabletext/types";
import { ReactNode } from "react";

interface BackgroundBoxesProps {
  className?: string;
  button: ReactNode;
  content?: PortableTextBlock[];
}

export default async function BuyFestivalPass({
  button,
  content,
}: BackgroundBoxesProps) {
  const videoData = await getBackgroundVideo();
  const videoUrl = videoData?.asset?.url;
  return (
    <section>
      <div className="relative w-full h-[50vh] overflow-hidden">
        {videoUrl && (
          <video
            className="top-0 left-0 w-full h-full max-w-none object-cover z-0"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center will-change-transform z-10">
          {button}
        </div>
      </div>
      <div className="py-[40px] flex items-center justify-center w-full">
        <div className="max-w-[650px] px-[20px] tablet:px-0">
          {content && <CustomPortableText value={content} />}
        </div>
      </div>
    </section>
  );
}
