"use client"
import React, { useState } from 'react'
import TestPage from './TestPage';
import CamViewNoDialog from './CamViewNoDialog';
import { useApiSend } from '@/hooks/network/rq';
import { submitAudio, submitAudioTrans, submitTest, submitText } from '@/hooks/server/test/url';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';


/*

[
    {
        "detection": {
            "_imageDims": {
                "_width": 300,
                "_height": 225
            },
            "_score": 0.5797850582560008,
            "_classScore": 0.5797850582560008,
            "_className": "",
            "_box": {
                "_x": 120.44187085556348,
                "_y": 113.2028370479604,
                "_width": 101.66678409051535,
                "_height": 102.00936076454485
            }
        },
        "expressions": {
            "neutral": 0.9188275337219238,
            "happy": 0.02256002090871334,
            "sad": 0.00003902181197190657,
            "angry": 0.02286597341299057,
            "fearful": 0.00019284548761788756,
            "disgusted": 0.0005387103301472962,
            "surprised": 0.03497588634490967
        },
        "gender": "male",
        "genderProbability": 0.9599584341049194,
        "age": 24.738243103027344
    }
]

*/


const MainTestPage = ({ test, testSubmission }: any) => {

    if (testSubmission.submitted) {
        return <>
            <div className='w-screen h-screen flex justify-center items-center'>
                Test already submitted
            </div>
        </>
    }

    const [index, setindex] = useState(0);

    const [isOk, setisOk] = useState(false);
    const [answer, setanswer] = useState("");
    const [data, setdata] = useState([]);

    const { toast } = useToast();
    const router = useRouter();


    const { mutate: mutateAudio, isPending } = useApiSend(
        submitAudio,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "Audio Submitted!"
            })
        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "cannot submit audio questions",
                description: e?.message
            })
        },
    )
    const { mutate: mutateText } = useApiSend(
        submitText,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "answer Submitted!"
            })
        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "cannot submit answer ",
                description: e?.message
            })
        },
    )


    const { mutate: mutateSubmit } = useApiSend(
        submitTest,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "Test Submitted!"
            })
        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "cannot submit test ",
                description: e?.message
            })
        },
    )

    const handleAudioAnswer = (data: any) => {

        const formData = new FormData();
        formData.append("text", data.text);
        formData.append("file", data.file, 'filename.wav');

        console.log(formData.getAll('file'));
        console.log(formData.getAll('text'));

        const payload = {
            formData: formData,
            index: index.toString(),
            testId: test._id,
            id: testSubmission._id,
            type: "AUDIO",
            text: data.text,
        }
        console.log("subq  audio answer: ", payload);
        mutateAudio({ ...payload });
    }



    const findMax = (obj: any) => {
        let max = Object.entries(obj).reduce((max: any, entry: any) => entry[1] >= max[1] ? entry : max, [0, -Infinity])
        return max[0];
    }

    const handleTextAnswer = (time: number) => {
        let emotion = ""
        console.log(data)
        if (data.length != 0) {
            const emotionData = data[0]["expressions"];
            emotion = findMax(emotionData);
        }
        const payload = {
            answer: answer,
            time: time.toString(),
            emotion,
            index: index.toString(),
            id: testSubmission._id,
            type: "TEXT",
        }
        console.log("subq text answer: ", payload);
        setanswer("");

        mutateText({ ...payload });
    }

    const handleSubmit = () => {
        console.log("test submitted")
        window.localStorage.removeItem("stopped-area");
        mutateSubmit({id:testSubmission._id});
    router.push(`/test-redirect/${test._id}/${test.title}/${test.testSecret}/secure/${testSubmission._id}/submit`)
    }



    return (
        <>
            {isOk && test && testSubmission && <TestPage index={index} setindex={setindex} handleSubmit={handleSubmit} handleAudioAnswer={handleAudioAnswer} handleTextAnswer={handleTextAnswer} answer={answer} setanswer={setanswer} test={test} testSubmission={testSubmission} />}
            <div className='row-span-1 col-span-1 overflow-y-scroll scrollbar-hide'>
                <CamViewNoDialog data={data} setData={setdata} videoHeight={100} videoWidth={150} setisOk={setisOk} isOk={isOk} />
            </div>
        </>
    )
}

export default MainTestPage