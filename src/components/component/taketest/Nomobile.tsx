import { Package2Icon } from '@/components/icons/page'
import React from 'react'

const Nomobile = () => {
  return (
    <div>
        

<div id="marketing-banner" tabIndex={-1} className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
    <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
        <a href="#" className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
        <Package2Icon className="h-6 w-6" />
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">MASCAA</span>
        </a>
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Take the test on Desktop</p>
    </div>
    <div className="flex items-center flex-shrink-0">
        <a href="/home" className="px-5 py-2 me-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Home
        </a>
        {/* <button data-dismiss-target="#marketing-banner" type="button" className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button> */}
    </div>
</div>


    </div>
  )
}

export default Nomobile