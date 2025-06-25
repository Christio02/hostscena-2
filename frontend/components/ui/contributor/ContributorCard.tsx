'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from 'react-modal'
import { IoMdClose } from 'react-icons/io'
import type Person from '@/interfaces/person'
import Marquee from '@/components/ui/marquee/Marquee'

interface Props {
  person: Person
  showTopBorder?: boolean
}

export default function ContributorCard({ person, showTopBorder = true }: Props) {
  const { name, image, email, phone, jobTitle, description } = person
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <div className="w-full max-w-[400px] min-w-[300px] hidden phone:block">
        <div className="relative w-full h-[400px]">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="px-[10px] py-[10px] flex flex-col justify-center border border-secondary border-t-0">
          <p className="font-bold">{name}</p>
          {jobTitle && <Marquee className="italic font-light" text={jobTitle} />}
          <button onClick={() => setModalIsOpen(true)} className="underline pt-[10px] text-left">
            Les mer
          </button>
        </div>
      </div>

      <div
        className={`flex phone:hidden w-full py-[10px] max-w-full min-h-[125px] ${
          showTopBorder ? 'border-t border-secondary' : ''
        }`}
      >
        <div className="w-[20%] min-w-[100px] relative">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="pl-[10px] flex flex-col text-[0.875rem] w-[80%]">
          <p className="font-bold text-caption">{name}</p>
          {jobTitle && <p>{jobTitle}</p>}
          {phone && <p>{phone}</p>}
          {email && <p>{email}</p>}
          <button onClick={() => setModalIsOpen(true)} className="underline text-left">
            Les mer
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        contentLabel="Personkort"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        className="relative w-[90%] max-w-[500px] bg-white"
      >
        <div className="relative w-full h-[50vh]">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="p-[10px]">
          <p className="font-bold">{name}</p>
          {jobTitle && <p className="italic font-light">{jobTitle}</p>}
          {description && <p className="mt-4 whitespace-pre-line">{description}</p>}
        </div>

        <button
          onClick={() => setModalIsOpen(false)}
          className="absolute top-4 right-4 text-4xl text-secondary bg-primary rounded-full"
        >
          <IoMdClose />
        </button>
      </Modal>
    </>
  )
}
