import Loading from '@/app/(dashboard)/test/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useApiSend } from '@/hooks/network/rq';
import { getSubQues } from '@/hooks/server/test/results'
import React, { useState } from 'react'

const CorrectAudioComponent = async ({id}:{id:string}) => {

    const { toast } = useToast()
    const [correctAnswer, setCorrectAnswer] = useState("");

    // mutate takes only one argument
    const { mutate, isPending } = useApiSend(
        getSubQues,
        (data: any) => {
            console.log(data)
            // toast({
            //     title: "success",
            //     description: "Ques Updated"
            // })
            setCorrectAnswer(data.powerReference);

        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Cannot get correct answer",
                description: e?.message
            })
        },
    );

    if (isPending) {
        return <Loading />
    }

    const onSubmit = async () => {
        console.log(id);
        mutate({ id } as any);
    }

    return (
        <>
            {correctAnswer &&
                <Badge className='bg-green-500 ml-3'>{correctAnswer}</Badge>
            }
            {!correctAnswer &&
                <Button className='h-5' onClick={onSubmit}>Get</Button>
            }
        </>
    )
}

export default CorrectAudioComponent