import CountdownTimer from '@/components/component/taketest/CountdownTimer'
import MainTestPage from '@/components/component/taketest/MainTestPage'
import TestPage from '@/components/component/taketest/TestPage'
import { Package2Icon } from '@/components/icons/page'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { getSubmission } from '@/hooks/server/test/results'
import { getTestU } from '@/hooks/server/test/url'
import React from 'react'





const page = async ({ params, searchParams }: {
  params: { id: string,title:string,secret:string,subId:string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  console.log(params)

const testSubmission = await getSubmission(params.subId);
console.log(testSubmission)

const test = await getTestU(params.id);
console.log(test)


  return (
    <div className='container p-3 h-screen w-screen overflow-y-scroll scrollbar-hide'>
<div className='md:grid md:grid-cols-4  md:grid-rows-7 scrollbar-hide overflow-y-scroll  h-screen'>
<div className='col-span-3 flex row-span-1'>
  <div className='flex-1 flex items-center '>
    <Package2Icon className="h-6 w-6"  />
    <div className='text-2xl font-bold'>
    MASCAA
    </div>
    </div>
  <div className='flex-1 flex items-center font-bold text-xl'>{test?.title}</div>
  </div>
<div className='col-span-1 row-span-2 items-start justify-center flex flex-col'>
  {test && 
  <CountdownTimer startTime={test?.startTime} endTime={test?.endTime} />
}
<div className='my-3'>
Duration ( in minutes ) - {test?.durationMinutes}
</div>

<div>
  {test?.keywords.map((k)=>(<Badge className='mr-3'>{k}</Badge>))}
</div>
</div>


  {test && testSubmission && <MainTestPage test={test} testSubmission={testSubmission} />}


  </div>
    </div>
  )
}

export default page