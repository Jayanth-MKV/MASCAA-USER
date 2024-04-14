"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TextSubQuesEdit from './SubQuestionEdit'
import { Badge } from '@/components/ui/badge'
import { FileTextIcon } from '@radix-ui/react-icons'
import { getSubQues } from '@/hooks/server/test/results'
import { useApiGet } from '@/hooks/network/rq'
import { useToast } from '@/components/ui/use-toast'
import CorrectAnswerComponent from './CorrectAnswerComponent'

const TextQuestion =  ({ question, id }: any) => {

  // const { toast } = useToast();

  // const { data,
  //   isLoading,
  //   isError,
  //   isLoadingError,
  // } = useApiGet(
  //   ["testssub"],
  //   ()=>getSubQues(question.sid),
  //   {
  //     enabled: true,
  //     refetchOnWindowFocus: true,
  //     retry: 1
  //   }
  // );

  // if (isError || isLoadingError)
  //   toast({
  //     variant: "destructive",
  //     title: "Error",
  //     description: "Cannot get subq"
  //   })

  // console.log(data);

  console.log(question)

  return (
    <div className='md:p-3 flex flex-col justify-between h-auto'>
      <Card className='py-3' >

        <div className='flex p-3'>
          <FileTextIcon className='mr-5' width={20} height={20} />
          Text Sub Question
        </div>
        <div className='px-3'>This question can be an MCQ ( recommended ) or T/F or one word answers </div>
      </Card>
      <div className='relative flex-1 mt-5'>
        <CardHeader>
          <CardTitle className='text-xl'>
            {question?.title}
          </CardTitle>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: question?.content }} className='renderhtml '></div>
          </CardDescription>
          <CardDescription className='my-3 py-3'>
            {question.timeTaken>0 &&
              <>
                Time Taken
                <Badge className='ml-3'>
                  {question?.timeTaken} sec
                </Badge>
              </>
            }
          </CardDescription>
          <CardDescription className='my-3 py-3'>
              <>
                Your Answer
            {question?.answer &&
                <Badge className='ml-3'>
                  {question?.answer}
                </Badge>
                }
            {!question?.answer &&
                <Badge className='ml-3'>
                  {question?.answer}
                </Badge>
                }
              </>
          </CardDescription>
          <CardDescription className='my-3 py-3'>
            {
              <div className='flex justify-between'>
                Correct Answer
                <CorrectAnswerComponent id={question?.sqid} />
              </div>
            }
          </CardDescription>
        </CardHeader>
      </div>
      {/* <Card className='flex-1'>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>

      </Card> */}
    </div>
  )
}

export default TextQuestion