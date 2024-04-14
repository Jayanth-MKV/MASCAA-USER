import Loading from '@/app/(dashboard)/test/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useApiSend } from '@/hooks/network/rq';
import { getAudio, getSubQues } from '@/hooks/server/test/results'
import React, { useState } from 'react'

const GetAudioComponent = async ({filePath}:{filePath:string}) => {

    const { toast } = useToast()
    const [audio, setAudio] = useState("");

    // mutate takes only one argument
    // const { mutate, isPending } = useApiSend(
    //     getAudio,
    //     (data: any) => {
    //         console.log(data)
    //         // toast({
    //         //     title: "success",
    //         //     description: "Ques Updated"
    //         // })
    //         const audioUrl = URL.createObjectURL(data);
    //     setAudio(audioUrl);

    //     },
    //     (e: any) => {
    //         console.log(e)
    //         toast({
    //             variant: "destructive",
    //             title: "Cannot get audio",
    //             description: e?.message
    //         })
    //     },
    // );

    // if (isPending) {
    //     return <Loading />
    // }

    // const onSubmit = async () => {
    //     console.log(filePath);
    //     mutate({ filePath:filePath.slice(6) });
    // }


    const onSubmit = () => {
      setAudio(`https://fbemwizsznfouopebwvp.supabase.co/storage/v1/object/public/`+filePath);
    }
    

    return (
        <>
            {audio && (
          <div className="audio-container">
            <audio src={audio} controls></audio>
          </div>
        )}
            {!audio &&
                <Button className='h-5' onClick={onSubmit}>Get</Button>
            }
        </>
    )
}

export default GetAudioComponent