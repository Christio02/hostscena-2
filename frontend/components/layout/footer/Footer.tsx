import SocialLinks from '@/components/layout/footer/SocialLinks'
import BuyFestivalPass from '@/components/ui/buyFestivalPass/BuyFestivalPass'
import { ContactFooter } from '@/interfaces/contact'
import { getContactFooterInfo } from '@/lib/sanity-cache'
import Image from 'next/image'
import { HiArrowLongRight } from 'react-icons/hi2'

const logo = '/assets/images/logo/logo_no_border.svg'

const footerImage = '/assets/images/footer_image.png'

export default async function Footer() {
  const footerData: ContactFooter = await getContactFooterInfo()
  const { email = '', address = '', postbox = '', socialLinks = [] } = footerData

  return (
    <footer className="pt-[60px] px-[20px]">
      <div className="tablet:border-t border-secondary flex flex-col tablet:flex-row tablet:justify-between">
        {/* Kontakt */}
        <div className="order-1 tablet:order-none tablet:pl-[20px] tablet:py-[30px] py-[20px] font-source flex gap-[20px] border-y border-secondary tablet:border-0">
          <div className="hidden tablet:block">
            <Image
              src={logo}
              alt="Logo"
              width={205}
              height={0}
              className="h-full border-secondary border-[1px] px-[14.4px] py-[13.6px]"
            />
          </div>
          <div className="w-[1px] h-full bg-black hidden tablet:block" />
          <div className="flex flex-col justify-center">
            <h2 className="text-h4">Kontakt:</h2>
            <p className="text-s">{email}</p>
            <p className="text-s">{address}</p>
            <p className="text-s">{postbox}</p>
          </div>
        </div>

        {/* Festivalpass knapp */}
        <div className="order-2 tablet:order-3  flex items-center justify-center py-[20px] tablet:pr-[20px]">
          <BuyFestivalPass
            className="w-full tablet:w-[287px] h-[116px]"
            imageSrc={footerImage}
            button={
              <button className="btn font-wittgenstein text-[1.5rem] px-[20px] py-[10px] text-nowrap">
                <span className="flex items-center gap-[10px]">
                  Kjøp festivalpass
                  <HiArrowLongRight size={30} />
                </span>
              </button>
            }
          />
        </div>

        {/* Logo + SoMe (Mobile) */}
        <div className="order-3 tablet:order-none flex justify-between items-center gap-[20px] py-[20px] border-t border-secondary tablet:py-0 tablet:hidden">
          <Image
            src={logo}
            alt="Logo"
            width={125}
            height={0}
            className="border-secondary border-[1px] px-[8.77px] py-[8.29px]"
          />
          <div className="flex gap-[20px]">
            <SocialLinks links={socialLinks} size={48} />
          </div>
        </div>

        {/* Desktop/Tablet SoMe */}
        <div className="hidden order-3 tablet:order-2 desktop:flex gap-[20px] justify-center items-center pr-[20px]">
          <div className="flex gap-[20px]">
            <SocialLinks links={socialLinks} size={48} />
          </div>
        </div>
      </div>
    </footer>
  )
}
