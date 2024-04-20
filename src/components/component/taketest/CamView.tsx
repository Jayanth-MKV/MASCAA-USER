"use client"
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CameraOffIcon, MicOffIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


import * as faceapi from 'face-api.js';
import { FRONTEND_URL } from '@/utils/constants';



const CamView = ({ videoHeight, videoWidth, isOk, setisOk, data, setData }: any) => {



  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);


  const canvasRef = React.useRef();
  const videoRef = React.useRef();
  //   const videoHeight = 480;
  //   const videoWidth = 640;

  const params = useParams()
  console.log(params)

  const [micPermission, setMicPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);



  const handleVideoOnPlay = async () => {
    let refreshId = setInterval(async () => {
      // console.log({
      //   canvasRef,videoRef,captureVideo,modelsLoaded
      // })
      if (!(modelsLoaded && captureVideo)) {
        clearInterval(refreshId);
      }
      if (canvasRef && canvasRef.current && videoRef && videoRef.current && captureVideo) {
        // console.log("inside video play canvas ")
        (canvasRef.current as any).innerHTML = faceapi.createCanvas(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);
        // console.log(canvasRef.current)
        // console.log(videoRef.current)

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions().withAgeAndGender();
        console.log(detections)
        if (data && detections.length != 0) {
          setData(detections)
        }
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // console.log(canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight))

        canvasRef && canvasRef.current && (canvasRef.current as any).getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        // canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 50)
  }



  const enablePermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 300 } });
      setMicPermission(true);
      setCameraPermission(true);
      setCaptureVideo(true);


      // const videoElement = document.getElementById("camera-preview");
      let video:any = videoRef.current;
      console.log(video)
      if (video) {
        video.srcObject = stream;
        video.play();

        // videoElement.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing microphone or camera:", error);
    }
  };

  const loadModels = async () => {
    const MODEL_URL = `${FRONTEND_URL}/models`;

    await Promise.all([
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(async () => {
      setModelsLoaded(true);
    });
  }


  useEffect(() => {

    loadModels()
    console.log("modelsLoaded");
    enablePermissions();
  }, []);

  useEffect(() => {

    handleVideoOnPlay();
    if (canvasRef && canvasRef.current && videoRef && videoRef.current && captureVideo && modelsLoaded && !isOk) {
      setisOk(true);
    }

  }, [videoRef, canvasRef, modelsLoaded, captureVideo]);





  return (
    <div>

      {cameraPermission ?

        (
          captureVideo ?
            modelsLoaded ?
              <div className=''>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>

                  <video ref={videoRef as any} height={videoHeight} width={videoWidth} style={{ position: 'absolute' }} muted />
                  <canvas ref={canvasRef as any} height={videoHeight} width={videoWidth} style={{ position: 'absolute' }} />
                </div>
              </div>
              :
              <div>Video loading...</div>
            :
            <>
              <div>Models loading...</div>
            </>
        )

        : (

          <div className="camera-permission py-5">
            <div className="flex items-center justify-center w-[100%] min-h-[400px] bg-gray-300 rounded dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        )}

      <CardFooter>
        <div className="start-test-button">

          {(!micPermission || !cameraPermission) && <>
            <Button onClick={() => window.location.reload()}>
              Allow permissions to start test
            </Button>
          </>}

          <div className='flex w-[100px] h-[50px] items-center '>

            {(!micPermission) && <>
              <MicOffIcon
              />
            </>}
            {!cameraPermission && <>
              <CameraOffIcon />
            </>}
          </div>

        </div>
      </CardFooter>
    </div>
  )
}

export default CamView