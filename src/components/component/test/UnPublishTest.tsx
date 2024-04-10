"use client"
import React, { useCallback, useRef, useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button'
import { useApiGet, useApiSend } from '@/hooks/network/rq'
import { getInviteLink, updateQues } from '@/hooks/server/test/url'
import Loading from '@/app/(dashboard)/test/loading'
import { PUBLISH_URL } from '@/utils/constants'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { SendHorizonalIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



const UnPublishTest = ({ id }: { id: string }) => {

    console.log(id)

    const { toast } = useToast()
    const router = useRouter();

    const { mutate, isPending } = useApiSend(
        updateQues,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "Test Published"
            })
            router.push(`/test/${id}`)
            router.refresh();

        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Cannot Publish",
                description: e?.message
            })
        },
    );

    if (isPending) {
        return <Loading />
    }

    const onSubmit = async () => {
        console.log(id);
        if (id) {
            return mutate({ id, published: true });
        }
    }

    return (
        <div>
            <Card className='max-w-[400px] mx-auto my-5'>
                <CardHeader>
                    <CardTitle className='mb-5'>Test Status -
                        <Badge className='ml-3' variant="destructive">unpublished</Badge>
                    </CardTitle>
                    <Separator />
                    <CardDescription>
                        <Label className='mt-5 text-md font-semibold'>Make sure the test is completely created before publishing </Label>
                        <a className='ml-5 text-sm text-blue-400  underline' href={`/test/${id}?tab=overview`} >
                            Check Overview
                        </a>
                    </CardDescription>

                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button className="w-full mt-5">
                                <SendHorizonalIcon className="mr-2 h-4 w-4" /> Publish
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will make the test as public and can be accessed via the url which you get after publishing
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onSubmit}>Yes! Publish</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </CardHeader>

            </Card>

        </div>
    )
}

export default UnPublishTest;