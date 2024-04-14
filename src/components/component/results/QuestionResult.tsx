import React from 'react'
import ResultsPieChart from './ConfPieChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import EmotionsVideo from './Emotion-video'
import EmotionsAudio from './Emotion-audio'
import TimePieChart from './TimePieChart'
import { Button } from '@/components/ui/button'

const QuestionResult = ({data}:any) => {


  return (
    <div>
        <div className='h-fit'>
<Card className='my-5 '>
<CardHeader>
    <CardTitle>Overall Question Confidence</CardTitle>
    <CardDescription>Emotion + Answer Correctness + Time</CardDescription>
</CardHeader>
<CardContent className='h-[400px]'>
<ResultsPieChart confidence={data.question_confidence*100}/>
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Emotion - Video</CardTitle>
    <CardDescription>taken via the webcam - evaluated using out models</CardDescription>
</CardHeader>
<CardContent className='min-h-[400px]'>
{data.videoEmotion=="" && <div className='font-bold'>
    Video not evaluated - <Button className='ml-5'>
        Revaluate
    </Button>
    </div>}
{data.videoEmotion && 
<EmotionsVideo data={[data]}/>
}
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Audio Emotion</CardTitle>
    <CardDescription>emotion of the answer you spoke</CardDescription>
</CardHeader>
<CardContent className='min-h-[400px] flex items-center justify-center'>
{data.audioEmotion=="" &&
 <div className='font-bold'>
    Audio not evaluated - <Button className='ml-5'>
        Revaluate
    </Button>
    </div>}
{data.audioEmotion && 
<EmotionsAudio data={[data]}/>
}
</CardContent>
</Card>
<Card className='my-5 h-fit'>
<CardHeader>
    <CardTitle>Text Question Answer</CardTitle>
    <CardDescription>Your answer evaluated with correct answer</CardDescription>
</CardHeader>
<CardContent className=''>
{data.correctAnswer=="" && <div className='font-bold'>
    Answer not evaluated - <Button className='ml-5'>
        Revaluate
    </Button>
    </div>}
{data.correctAnswer==true && <div className='text-green-500 font-bold'>
    Your Answer Is Correct 
    </div>}
{data.correctAnswer!="" && data.correctAnswer==false && <div className='font-bold text-red-500'>
    Your Answer Is Incorrect
    </div>}
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Audio Relevancy</CardTitle>
    <CardDescription>This is the speech converted to text and then evaluated using reference answer</CardDescription>
</CardHeader>
<CardContent className='h-[400px] flex justify-center items-center'>
{data.audiotextRelevancy=="" && <div className='font-bold'>
    Relevancy not evaluated - <Button className='ml-5'>
        Revaluate
    </Button>
    </div>}
    {data.audiotextRelevancy &&
<ResultsPieChart confidence={data.question_confidence}/>
}
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Time Taken</CardTitle>
    <CardDescription>time taken to answer the text question - time for audio questions is not evaluated</CardDescription>
</CardHeader>
<CardContent className='h-[400px]'>
<TimePieChart total={60} time={data?.time} />
</CardContent>
</Card>
        </div>
    </div>
  )
}

export default QuestionResult


