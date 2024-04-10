"use client"
import Loading from '@/app/(dashboard)/test/loading';
import CamView from '@/components/component/taketest/CamView';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from '@/components/ui/use-toast';
import { useApiSend } from '@/hooks/network/rq';
import { createSubmission } from '@/hooks/server/test/results';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'





const page = () => {

  const params = useParams()
  const search = useSearchParams()
  const userId = search.get('userId')
  // console.log(params)
  // console.log(search.get('userId'))
  const [isOk, setisOk] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


//   useEffect(() => {
//     console.log("isOk - ", isOk)
//   }, [isOk])

// useEffect(()=>{
//     history.pushState(null, null, location.href);
//     window.onpopstate = function () {
//         history.go(1);
//     };

// },[])

// useEffect(()=>{

//   window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = 'You cannot close this tab';
// });


// document.addEventListener("visibilitychange", (event) => {
//   if (document.visibilityState == "visible") {
//     console.log("tab is active")
//     // alert("you cannot leave the page")
//   } else {
//     console.log("tab is inactive")
//     alert("you cannot leave the page")
//   }
// });

// },[])



const { mutate, isPending } = useApiSend(
  createSubmission,
  (data: any) => {
      console.log(data)
      toast({
          title: "success",
          description: "Test Navigated!"
      })
      router.replace(`/test-redirect/${params.id}/${params.title}/${params.secret}/secure/${data._id}`);

  },
  (e: any) => {
      console.log(e)
      toast({
          variant: "destructive",
          title: "Test Already Taken - contact admin",
          description: e?.message
      })
  },
);

if (isPending) {
  return <Loading />
}


const onSubmit = async () => {
  console.log(params)
  if (params?.id && userId) {
      mutate({ "testId": params?.id,"userId":userId });
  }
}










  return (
    <Card className='container py-10 h-screen my-auto'>
      {params && <div className="test-component">
        <div className="test-code">
          <h3>Test code: {params?.secret}</h3>
        </div>

        <div className='flex flex-col md:flex-row w-full min-h-[500px]'>

          <Card className="min-w-[50%]">
            <Card className="left-part">

              <CardContent className="camera-preview min-h-[400px]">
                <CamView videoHeight={300} videoWidth={500} setisOk={setisOk} isOk={isOk} />
              </CardContent>
            </Card>



          </Card>

          <Card className='min-w-1/2 lg:w-1/2'>
            <CardHeader>
              <CardTitle className='text-2xl'>{params.title.replace(/%20/g, " ")}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="test-guidelines font-mono">
                <p className='text-lg font-bold'>Test Guidelines:</p>
                <ul>
                  <li>Read all questions carefully before answering.</li>
                  <li>Manage your time wisely.</li>
                  <li>Double-check your answers before submitting.</li>
                  <li>Avoid any distractions during the test.</li>
                  <li>Follow the instructions provided by the invigilator.</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              {isOk && <Button
                onClick={onSubmit}>
                Start Test
              </Button>
              }
            </CardFooter>
          </Card>

        </div>

      </div>}
    </Card>
  )
}

export default page