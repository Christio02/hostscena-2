
import { HomeHeaderProps } from "@/interfaces/home";
import Image from "next/image";
import { vercelStegaSplit } from "@vercel/stega";

// helper function for formatting date
function formatDayAndMonth(dateString: string | undefined): string {
    if (!dateString) return '';

    // split normal part and invisible stega encoding part
    const { cleaned, encoded } = vercelStegaSplit(dateString); // "cleaned" is "YYYY-MM-DD"
    const [_, month, day] = cleaned.split('-');

    const formattedVisibleText = `${parseInt(day, 10)}.${parseInt(month, 10)}`;

    // put back together
    return `${formattedVisibleText}${encoded}`;
}

function getYear(dateString: string | undefined): string {
    if (!dateString) return '';

    const { cleaned, encoded } = vercelStegaSplit(dateString);
    const [year] = cleaned.split('-');

    return `${year}${encoded}`;
}

const logo = "/assets/images/logo/logo_no_border.svg";

export default function HomeHeader({
                                     startDate,
                                     endDate
                                   }: Pick<HomeHeaderProps, 'startDate' | 'endDate'>) {
    const formattedStart = formatDayAndMonth(startDate);
    const formattedEnd = formatDayAndMonth(endDate);

    const year = getYear(startDate);

  return (
    <header className="flex items-center px-[20px]">
      <div className="flex py-[20px] border-b border-secondary w-full gap-[10px]">
        <Image
          src={logo}
          alt="Logo"
          width={255}
          height={0}
          className="h-full border-secondary border phone:px-[18px] phone:py-[17px] phone:w-[255px] px-[12.2px] py-[11.6px] mobile:w-[175px] w-[165px]"
        />
        <div className="font-wittgenstein phone:text-[40px] text-[30px] phone:gap-[10px] flex flex-col justify-between w-full mobile:w-auto">
            <p className="text-nowrap phone:text-[40px] mobile:text-[25px] text-[23px] phone:px-[15px] px-[13px] phone:py-[3px] border border-secondary">
                {formattedStart} - {formattedEnd} {year}
            </p>
          <p className="phone:text-[40px] mobile:text-[29px] text-[27px] phone:px-[15px] px-[12px] pt-[5px] phone:py-[3px] border border-secondary mobile:w-fit">
            Ålesund
          </p>
        </div>
      </div>
    </header>
  );
}
