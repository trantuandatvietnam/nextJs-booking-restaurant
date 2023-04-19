import React from 'react'
import Header from './components/Header'

export default function Loading() {
  return (
    <main>
        <Header />

        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {
                [1, 2, 3, 4, 5, 6, 7,  8, 9, 10, 11, 12].map((_, index) => {
                   return <div key={index} className='animate-pulse bg-slate-200 m-3 w-64 h-72 rounded overflow-hidden cursor-pointer border'></div>
                })
            }
        </div>
    </main>
  )
}
