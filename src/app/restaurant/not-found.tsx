"use client"
import Image from 'next/image'
import React from 'react'
import errorMascot from "../../../public/icons/error.png"

export default function NotFound({error}: {error: Error}) {
  return (
    <div className='bg-gray-200 h-screen flex flex-col justify-center items-center'>
        <Image className='w-56 mb-8' src={errorMascot} alt="error" />
        <div className="bg-white px-9 py-14 shadow-rounded">
            <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
            <p className="text-reg font-bold">
                We could't find thay restaurant
            </p>
            <p className="mt-6 text-sm font-light">Error code: 404</p>
        </div>
    </div>
  )
}
