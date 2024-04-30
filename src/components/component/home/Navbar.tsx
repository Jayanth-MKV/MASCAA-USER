"use client"
import React from 'react'
import { useTour } from '@reactour/tour'
import Link from 'next/link'
import { FileEditIcon, FileIcon, HomeIcon } from '@/components/icons/page'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    const { setIsOpen } = useTour()

  return (
    <>

              <nav className="grid items-start px-4 text-sm font-medium">
          <Button variant={'secondary'} className='text-sm my-5' onClick={() => {setIsOpen(true)}}>🛫 Take a Tour</Button>
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/home"
              id="tour-step-home"
              >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/test"
              id="tour-step-test"
              >
              <FileIcon className="h-4 w-4" />
              Tests
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/test/available"
              id="tour-step-available"
              >
              <FileIcon className="h-4 w-4" />
              Free Tests
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/test/take"
              id="tour-step-take"
            >
              <FileEditIcon className="h-4 w-4" />
              Take Test
            </Link>
          </nav>

          </>
  )
}

export default Navbar