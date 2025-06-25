import { CustomPortableText } from "@/components/shared/CustomPortableText";
import BlackTitleBar from "@/components/ui/blackTitleBar/BlackTitleBar";
import BuyFestivalPass from "@/components/ui/buyFestivalPass/BuyFestivalPass";
import { Tickets } from "@/interfaces/tickets";
import { getTickets } from "@/lib/sanity-cache";

export default async function Billetter() {
  const ticketsData: Tickets = (await getTickets()) || { section: [] };
  return (
    <section>
      <BlackTitleBar title="Billetter" />
      <BuyFestivalPass
        className="min-h-[300px] tablet:h-[calc(100vh-215px)] w-full"
        button={
          <button className="btn font-wittgenstein max-w-[594px] text-nowrap text-h4 tablet:!text-[3.688rem] px-[20px] tablet:px-[26px] py-[10px] tablet:py-[13px]">
            Kjøp festivalpass her
          </button>
        }
        content={ticketsData?.section}
      />
    </section>
  );
}
