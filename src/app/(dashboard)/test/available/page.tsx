"use client"
import { Button } from '@/components/ui/button'
import { DashboardIcon, FileIcon, FileTextIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { getAllAvailableTests, getOngTests } from '@/hooks/server/test/url'
import { useApiGet } from '@/hooks/network/rq'
import { usePathname, useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertDateToIst } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Loading from '../loading'
import NoData from '@/components/component/home/NoData'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const Page = () => {
  const { toast } = useToast();
  const router = useRouter()
  const pathname = usePathname()



  const { data,
    isLoading,
    error,
    isError,
    isLoadingError,
    refetch } = useApiGet(
      ["testsavail"],
      getAllAvailableTests,
      {
        enabled: true,
        refetchOnWindowFocus: true,
        retry: 1
      }
    );

  if (isError || isLoadingError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Cannot get tests :" + error?.message
    });
    // refetch();
  }

  console.log("------------",data);



  if (isLoading) {
    return <Loading />
  }

  // const test = {
  //   createdAt:
  //     "2024-04-01T19:58:41.391Z",
  //   createdBy
  //     :
  //     "660913ff443c7da86b61911a",
  //   keywords
  //     :
  //     ['computer-science', 'mathematics'],
  //   published
  //     :
  //     false,
  //   testSecret
  //     :
  //     "AED7E9",
  //   title
  //     :
  //     "Test on cs",
  //   updatedAt
  //     :
  //     "2024-04-01T19:58:41.391Z",
  //   _id
  //     :
  //     "660b11f1a3e84b63a44a1ea7",
  // }


  return (
    <div>
            <Breadcrumb className='m-5'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>available</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      <div className="bg-white py-24 sm:py-10">
        <div className="lg:sticky lg:top-0 lg:pt-3 mx-auto max-w-7xl px-6 lg:px-8 md:items-center gap-10 flex flex-col lg:flex-row  md:justify-between">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Available Tests</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Take Free Tests and Evaluate Confidence </p>
          </div>

        </div>
        <div className="items-center mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data!=undefined && Array.isArray(data) &&
            data?.sort((a: any, b: any) => {
              const aUpdatedAt = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
              const bUpdatedAt = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
              return bUpdatedAt - aUpdatedAt;
            })?.map((test) => (
              <article key={test?.title} className="flex max-w-xl flex-col items-center justify-between">
                <Card className='h-[380px] w-[280px] flex flex-col justify-between'>
                  <CardHeader>
                    <CardTitle className='text-2xl overflow-clip max-h-[70px] h-[70px]'>{test.title.toUpperCase()} </CardTitle>
                    <CardDescription>{convertDateToIst(test.createdAt)}</CardDescription>
                  </CardHeader>
                  <ScrollArea className="w-full p-2 whitespace-nowrap rounded-md border">
                    <CardContent className='flex gap-3 overflow-hidden max-h-[100px] h-fit'>
                      {test?.keywords && test?.keywords.map((k: string) => (
                        <Badge key={k}>{k}</Badge>
                      ))}
                    </CardContent>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  <CardFooter>
                    <div className='flex flex-col gap-5 w-full'>
                    <Dialog>
  <DialogTrigger>
    <Button className="w-full">
    View
    </Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{test?.title}</DialogTitle>
      <DialogDescription>
        {test?.about}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

                      <Button className="w-full" onClick={() => {
                        router.push("/test/" + test._id+"/results");
                      }}>
                        <DashboardIcon className="mr-2 h-4 w-4" /> Take Test
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </article>
            ))
          }

        </div>
        {
          data!=undefined && Array.isArray(data) && data?.length == 0 && <>
            <NoData  text='No Ongoing Tests'/>
            <div className='w-full flex justify-center mt-5'>
              <Button className="max-w-[200px]" onClick={() => {
                router.push("/test")
              }}>
                <PlusCircledIcon className="mr-2 h-4 w-4" /> View Tests
              </Button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Page