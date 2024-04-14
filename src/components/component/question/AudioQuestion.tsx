import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SpeakerLoudIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import CorrectAudioComponent from './CorrectAudioComponent'
import GetAudioComponent from './GetAudioComponent'

const AudioQuestion = ({ question, id }: any) => {
  return (
    <div className='md:p-3 '>
      <Card className='py-3' >

        <div className='flex p-3'>
          <SpeakerLoudIcon className='mr-5' width={20} height={20} />
          Audio Sub Question
        </div>
        <div className='px-3'>This question can be an a general question ( recommended ). The answer is speech, so ask accordingly</div>
      </Card>
      <Card className='relative my-10'>
        <CardHeader>
          <CardTitle className='text-xl'>
            {question?.title}
          </CardTitle>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: question?.content }} className='renderhtml '></div>
          </CardDescription>
          <Separator className='my-3' />
          <CardDescription className='py-3'>
          <strong>
                  Your Answer :
                </strong>
            <div dangerouslySetInnerHTML={{ __html: question?.audiototext }} className='renderhtml '></div>
          </CardDescription>
          <CardDescription className='py-5 my-3'>
            {question?.sqid &&
              <div className='flex justify-between'>
                <strong>
                  Reference Answer :
                </strong>
                <code>
                  <CorrectAudioComponent id={question.sqid} />
                </code>
              </div>
            }
          </CardDescription>
          <CardDescription className='py-5 my-3'>
            {question?.audiofileurl ?
              <div className='flex justify-between flex-col'>
                <strong>
                  Your Audio :
                </strong>
                <code className='py-5'>
                  <GetAudioComponent filePath={question.audiofileurl} />
                </code>
              </div>
              :
              <div>
                No Audio Submitted
              </div>
            }
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default AudioQuestion