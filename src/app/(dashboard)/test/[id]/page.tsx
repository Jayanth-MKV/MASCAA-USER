import ViewQues from '@/components/component/test/ViewQues';
import { getSubmission } from '@/hooks/server/test/results';
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const page = async ({ params, searchParams }: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  
  const data = await getSubmission(params.id);
    console.log(data);
  
  return (
    <div>
                  <Breadcrumb className='m-5'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/test">tests</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>answers</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      {data && 
        <ViewQues testId={data?.testId} data={data?.answers} id={data?._id} />
      }
    </div>
  )
}

export default page