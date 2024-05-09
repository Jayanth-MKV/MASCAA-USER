import { ProductItem } from '@/components/ui/navbar-menu'
import { FRONTEND_URL, FRONTEND_URLI } from '@/utils/constants'
import React from 'react'
import stud from "@/img/student.jpg"
import inst from "@/img/instructor.jpg"

const RegisterAs = () => {
  return (
    <div className='lg:w-1/2 mx-auto'>
      <h1 className='my-5 text-2xl font-bold text-center'> Not Registered Yet? <br /> Register Here</h1>
       <div className="  text-sm grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Instructor/Recruiter"
              href={`${FRONTEND_URL}/pricing`}
src={inst}
              description="Create & Evaluate Tests like never before."
            />
            <ProductItem
              title="Individual"
              href={`${FRONTEND_URL}/auth/register`}
src={stud}
              description="Evaluate your confidence and get industry ready"
            />
          </div>
    </div>
  )
}

export default RegisterAs