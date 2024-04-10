import ViewTest from '@/components/component/test/TestView';
import { getTestU } from '@/hooks/server/test/url';
import React from 'react'
import { cookies } from 'next/headers'

const page = async ({
    params,
    searchParams,
  }: {
    params: { id: string,title:string,secret:string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) => {


    const test = await getTestU(params.id);
    console.log(test)


    const cookieStore = cookies()
    const s_user = cookieStore.get('s_user')
    console.log(s_user)
    const user = JSON.parse(s_user?.value||"{}")
    console.log(user)


  return (
    <div>
      {test !=undefined &&  
      <div className='py-10 flex'>
        <div>
      <ViewTest test={test} userId={user?.id} />
        </div>


        {/* <div className='hidden md:block'>
        </div> */}

        {/* <div className='md:hidden'>
      <Nomobile />      
        </div> */}
      </div>
}
    </div>
  )
}

export default page