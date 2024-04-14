"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react'
import audioWave from "@/img/audio-wave.gif"
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';



const AudioAnswer = ({AudioOp,setAudioOp}:any) => {
  const mimeType = "audio/wav";

  const [permission, setPermission] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [abortController, setAbortController] = useState(new AbortController());
const [stt, setstt] = useState("");

  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    lang: 'en-IN', // Set the language to Indian English
    interimResults: true, // Get partial results
    continuous: true, // Enable continuous recognition
    maxAlternatives: 5, // Set the number of alternative transcriptions
    abortController: abortController, // Use the abortController instance
  });

  
  useEffect(() => {
    if (transcript) {
      console.log('Partial transcript:', transcript);
    }
    
    if (finalTranscript) {
      console.log('Final transcript:', finalTranscript);
      // Process the final transcript
    }
    setstt(transcript);
    setAudioOp({
      ...AudioOp,
      text:transcript
    });
    
  }, [transcript, finalTranscript]);

  
  useEffect(() => {
    
    
    setAudioOp({
      ...AudioOp,
      text:stt
    });
    
    
  }, [stt]);
  
  

  
  
  const getMicrophonePermission = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(streamData);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getMicrophonePermission();
  }, [])


  useEffect(() => {
    if(audioChunks.length!=0){
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      var wavefilefromblob = new File([audioBlob], 'filename.wav',{type: 'audio/wav' });
      console.log(wavefilefromblob);
      setAudioOp({...AudioOp,file:wavefilefromblob});  
    }
  }, [audioChunks])


  if (!("MediaRecorder" in window) || !browserSupportsSpeechRecognition) {
    return <span>The required APIs are not supported in your browser.</span>;
  }

  const startRecording = useCallback(async () => {
    setRecordingStatus("recording");
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' }); // Set the language to Indian English

    const media = new MediaRecorder(stream, { type: mimeType });
    setMediaRecorder(media);
    media?.start();

    let localAudioChunks = [];
    media.ondataavailable = (event) => {
      if (typeof event.data === "undefined" || event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }, [stream, mimeType, mediaRecorder]);

  const stopRecording = useCallback(() => {
    setRecordingStatus("inactive");
    abortController.abort(); // Abort the speech recognition
    SpeechRecognition.stopListening();

    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
        var wavefilefromblob = new File([audioBlob], 'filename.wav',{ type: 'audio/wav' });
        console.log(wavefilefromblob);
        setAudioOp({...AudioOp,file:wavefilefromblob}); 
        setAudioChunks([]);
      };
    }
  }, [mediaRecorder, mimeType, audioChunks, abortController]);

  const handleStartRecording = () => {
    startRecording();
    setAbortController(new AbortController()); // Create a new AbortController instance
  };

  const handleStopRecording = () => {
    stopRecording();
    setAbortController(new AbortController()); // Create a new AbortController instance
  };

  return (
    <>
      <div className="audio-controls flex flex-wrap border border-gray-700 h-full justify-around items-center">
        {!permission && (
          <Button onClick={getMicrophonePermission}>
            Get Microphone
          </Button>
        )}
        {permission && recordingStatus === "inactive" && (
          <Button onClick={handleStartRecording}>
            Start
          </Button>
        )}
        {recordingStatus === "recording" && (
          <>
            <Image width={100} height={100} src={audioWave} alt='audio wave' className='mr-5' />
            <Button onClick={handleStopRecording}>
              Stop
            </Button>
          </>
        )}
        {audio && (
          <div className="audio-container">
            <audio src={audio} controls></audio>
          </div>
        )}
        <div>
        <DialogTranscript transcript={stt} onChange={setstt} />
        </div>
      </div>
    </>
  )
}

export default AudioAnswer;


function DialogTranscript({transcript,onChange}:any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Transcript</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Give your brief explanation in words - for relevancy check</DialogTitle>
          <DialogDescription>
            This audio transcription may not be accurate. so, we expect you to correct and brief your saying in 3-5 lines.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
        <Textarea value={transcript} onChange={(e)=>onChange(e.target.value)} placeholder="Type your audio transcript here." />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}