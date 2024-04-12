"use client"

import { LoadingSpinner } from '@/components/component/home/loader';
import { Package2Icon } from '@/components/icons/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {  useApiSend } from '@/hooks/network/rq';
import { createTest, getAllTests, Taketest } from '@/hooks/server/test/url';
import { Test } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@/components/ui/badge';
import TakeTestForm from '@/components/component/test/TakeTestForm';


const FormSchema = z.object({
  testSecret: z.string().min(6, { message: 'It has least 6 characters' }).max(6, { message: 'It has atmost 6 characters' }),
})

const Newtest = () => {
  const { toast } = useToast();
  const router = useRouter()
  const pathname = usePathname()





  const [selected, setSelected] = useState("");

  const { register, control, handleSubmit, formState, reset } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { errors } = formState;


  const { mutate, isPending } = useApiSend(
    Taketest,
    (data: any) => {
      toast({
        title: "Test Navigated Successfully",
        description: "success"
      })
      router.push(`/test-redirect/${data._id}/${data.title}/${data.testSecret}/`);
      router.refresh()
    },
    (e: any) => {
      toast({
        variant: "destructive",
        title: "Cannot Find Test",
        description: e?.message
      })
    },

  );

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected])


  const onSubmit = async (data: Test) => {
    const payload = {
      testSecret: data?.testSecret,
      id:selected
    }
    console.log("submitted data", payload);
    mutate(payload);
  }


  if (isPending) {
    return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
      <Package2Icon className="h-6 w-6" />
      <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
      <LoadingSpinner />
    </div>)
  }


  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center py-10 gap-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Take Test</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Take Tests and Evaluate Confidence </p>
        </div>
        <Card className="w-[350px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              {/* <CardTitle>Create Test</CardTitle>
              <CardDescription>Create your new Test in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Test</Label>
                  
                  <TakeTestForm selected={selected} setSelected={setSelected}  />

                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Test Secret</Label>
                  <Input {...register("testSecret")} placeholder="ABC123" />
                  {errors?.testSecret && <Badge variant="destructive">{errors?.testSecret?.message}</Badge>}

                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => reset()}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Newtest