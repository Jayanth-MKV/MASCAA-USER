import ViewQues from '@/components/component/test/ViewQues';
import { getSubmission } from '@/hooks/server/test/results';
import React from 'react'

const page = async ({ params, searchParams }: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  
  const data = await getSubmission(params.id);
    console.log(data);
  
  return (
    <div>
      
      {data && 
        <ViewQues testId={data?.testId} data={data?.answers} id={data?._id} />
      }
    </div>
  )
}

export default page