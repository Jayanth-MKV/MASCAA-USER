"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import * as faceapi from 'face-api.js';



const CamViewNoDialog = ({ videoHeight, videoWidth, isOk, setisOk, data, setData }: any) => {



  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);


  const canvasRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLInputElement>(null);
  //   const videoHeight = 480;
  //   const videoWidth = 640;

  const params = useParams()
  // console.log(params)

  const [micPermission, setMicPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);



  const handleVideoOnPlay = async () => {
    let refreshId = setInterval(async () => {
      // console.log({
      //   canvasRef, videoRef, captureVideo, modelsLoaded
      // })

      if (!(modelsLoaded && captureVideo)) {
        clearInterval(refreshId);
      }
      if (canvasRef && canvasRef.current && videoRef && videoRef.current && captureVideo) {
        // console.log("inside video play canvas ")
        (canvasRef as any).current.innerHTML = faceapi.createCanvas(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);
        // console.log(canvasRef.current)
        // console.log(videoRef.current)

        const detections = await faceapi.detectAllFaces((videoRef as any).current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions().withAgeAndGender();
        // console.log(detections)
        if (data && detections.length != 0) {
          setData(detections)
        }
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // console.log(canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight))

        canvasRef && canvasRef.current && (canvasRef.current as any).getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections((canvasRef as any).current, resizedDetections);
        // canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions((canvasRef as any).current, resizedDetections);
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
    const MODEL_URL = '/models';

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(async () => {
      setModelsLoaded(true);
    });
  }


  useEffect(() => {

    loadModels()
    console.log("modelsLoaded");
    enablePermissions();
  }, []);

  // useEffect(() => {
  //   enablePermissions();
  //   console.log("permissions enabled : ",videoRef.current);
  // }, [videoRef]);

  useEffect(() => {

    enablePermissions();
    console.log("videref set");
  }, [videoRef]);

  useEffect(() => {

    handleVideoOnPlay();
    if (canvasRef && canvasRef.current && videoRef && videoRef.current && captureVideo && modelsLoaded && !isOk) {
      setisOk(true);
    }

  }, [videoRef, canvasRef, modelsLoaded, captureVideo]);




  return (
    <>

      {cameraPermission ?

        (
          <div className={`flex justify-center relative`}>
                <>
                  <video ref={videoRef as any} height={videoHeight} width={videoWidth} style={{ position: 'absolute' }} className={`h-[${videoHeight}px]`} muted />
            {captureVideo ?
              modelsLoaded ?

                  <canvas ref={canvasRef as any} height={videoHeight} width={videoWidth} style={{ position: 'absolute' }} />
              :
              <div>Video loading...</div>
            :
            <>
              <div>Models loading...</div>
            </>}
                </>
              </div>
        )

        : (

          <div className="camera-permission py-5">
            <div className={"flex items-center justify-center  bg-gray-300 rounded dark:bg-gray-700" + `w-[${videoWidth}px] min-h-[${videoHeight}px]`}>
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        )}
    </>
  )
}

export default CamViewNoDialog;