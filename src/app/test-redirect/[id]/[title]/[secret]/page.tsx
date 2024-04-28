import ViewTest from '@/components/component/test/TestView';
import { getTestU } from '@/hooks/server/test/url';
import React from 'react'
import { cookies } from 'next/headers'
import Roadmap from '@/components/component/test/Roadmap';
import { BellIcon, Package2Icon } from '@/components/icons/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { LogoutPopUp } from '@/components/component/auth/logout-alert';

const page = async ({
    params,
    searchParams,
  }: {
    params: { id: string,title:string,secret:string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) => {

    console.log({id:params.id,title:params.title,secret:params.secret})
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
      <>
        <div className="flex h-[100px] justify-between flex-wrap items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Package2Icon className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            </Link>
            <div className="mt-auto p-5 flex justify-between border-gray">

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
      id="profile"
      size="icon"
      variant="ghost"
    >
      <DotsHorizontalIcon />
      <span className="sr-only">Toggle user menu</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Support</DropdownMenuItem>
    <DropdownMenuSeparator />
    <LogoutPopUp />
  </DropdownMenuContent>
</DropdownMenu>

</div>
          </div>
      <div className='lg:p-10 flex flex-col gap-5'>
        <h1 className='lg:text-2xl text-center font-bold mb-10'> Steps For Taking Test</h1>
        <div className='container md:w-[70%] md:h-[700px] mx-auto'>
        <Roadmap />
        </div>
        <div>
      <ViewTest test={test} userId={user?.id} />
        </div>


        {/* <div className='hidden md:block'>
        </div> */}

        {/* <div className='md:hidden'>
      <Nomobile />      
        </div> */}
      </div>
      </>
}
    </div>
  )
}

export default page