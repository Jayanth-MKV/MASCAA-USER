"use client"
import CamView from '@/components/component/taketest/CamView';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import QuestionTimer from './QuestionTimer';
import { Input } from '@/components/ui/input';
import AudioAnswer from './Answer';




const TestPage = ({ answer, setanswer, test, testSubmission, handleTextAnswer, handleAudioAnswer, handleSubmit }: any) => {
  // const params = useParams()
  // console.log(params)

  const TIME = 180;
  const [timeLeft, setTimeLeft] = useState(TIME/3);

  // const [isOk, setisOk] = useState(false)
  const [index, setindex] = useState(0);
  const [questionData, setquestionData] = useState({ topic: "Question Topic", content: " Question Content" })
  const [sub, setsub] = useState({ type: "TEXT" });
  const [AudioOp, setAudioOp] = useState({ text: '', file: null });

  const handleQuestionChange = useCallback(
    () => {
      console.log(index)
      if (index != testSubmission.answers.length - 1)
        setindex(index + 1);
      setTimeLeft(TIME)
      setsub({ type: "TEXT" });
    },
    [index],
  )


  const setLocal = (data: any) => {
    localStorage.setItem('stopped-area', JSON.stringify(data));
  }

  const getLocal = () => {
    const data = localStorage.getItem('stopped-area');
    if (data) {
      return JSON.parse(data);
    }
  }

  const handleAudioNext=() => {
    handleAudioAnswer(AudioOp);
    handleQuestionChange();
  }





  // run at start
  useEffect(() => {
    const data = getLocal();
    console.log(data)
    // const data = JSON.parse(d);
    setindex(data?.index || 0);
    setsub({ type: (data?.subType || "TEXT") });
    setTimeLeft(data?.time || TIME);
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        
        setLocal({ index, subType: sub?.type, time: prevTimeLeft });
        console.log({ index, subType: sub?.type, time: prevTimeLeft })
        if (prevTimeLeft == TIME - TIME / 3) {
          setsub({ type: "AUDIO" });
        }
        if (prevTimeLeft === 0) {
          clearInterval(interval);
          handleQuestionChange(); // Change to the next question
          return TIME; // Reset time left for the new question
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [index]);


  //   useEffect(()=>{
  //     history.pushState(null, null, location.href);
  //     window.onpopstate = function () {
  //         history.go(1);
  //     };

  // },[])

  // useEffect(()=>{

  //   window.addEventListener('beforeunload', function (e) {
  //     e.preventDefault();
  //     e.returnValue = 'You cannot close this tab';
  // });


  // document.addEventListener("visibilitychange", (event) => {
  //   if (document.visibilityState == "visible") {
  //     console.log("tab is active")
  //     // alert("you cannot leave the page")
  //   } else {
  //     console.log("tab is inactive")
  //     alert("you cannot leave the page")
  //   }
  // });

  // },[])



  // get ques and subques data
  useEffect(() => {
    const qd = testSubmission?.answers[index];
    setquestionData({ topic: qd?.topic || "Subquestion Topic", content: qd?.content || "Subquestion Content" });
    console.log(qd)
    const sq = testSubmission?.answers[index]?.subQ.filter((item: any) => item?.type == sub?.type)
    if (sq)
      setsub(sq[0]);
    console.log(sq)
    setanswer("");
  }, [index, sub])



  // handles if time is completed
  useEffect(() => {
    if (timeLeft == 0 && index==(testSubmission.answers.length-1)) {
      console.log("submitted");
      handleSubmit();
      return
    }
    if (timeLeft < 3) {
      if (sub?.type == "TEXT") {
        handleTextAnswer(TIME - timeLeft);
      }
      if (sub?.type == "AUDIO") {
        handleAudioAnswer(AudioOp);
      }
    }
  }, [timeLeft])




  return (
    <>
      <div className='row-span-2 col-span-3 flex flex-col justify-center overflow-y-scroll scrollbar-hide p-5'>
        <div className='my-2 text-xl font-semibold'>{questionData?.topic}</div>
        <div >
          <div dangerouslySetInnerHTML={{ __html: questionData?.content }} className='renderhtml '></div>
        </div>
      </div>






      <div className='row-span-4 col-span-1 flex flex-col p-5 overflow-y-scroll scrollbar-hide'>
        <div> Questions</div>
        <div className='flex gap-5 my-5 flex-wrap'>
          {testSubmission && testSubmission.answers.map((item: any, idx: number) => {
            return <>
              <div>
                <Button className={(idx != index) ? "bg-gray-400" : ""}
                  disabled={idx != index}
                  onClick={() => {
                    setindex(idx);
                    setquestionData({ topic: item?.topic, content: item?.content })
                  }}>{idx + 1}</Button>
                {/* {item?.topic} */}
              </div>
            </>
          })}
        </div>
        <Separator className='my-3' />
        <div>Sub Questions</div>
        <div className='flex gap-5 my-5'>
          {testSubmission && testSubmission.answers[index]?.subQ.map((item: any, idx: number) => {
            return <>
              <div>
                <Button className={(sub.type != item.type) ? "bg-gray-400" : ""}
                  // disabled={sub.type!=item.type}
                  onClick={() => {
                    setsub(item)
                  }}>{item?.type}</Button>
                {/* {item?.topic} */}
              </div>
            </>
          })}
        </div>
        <Separator className='my-3' />
        {index != undefined && <QuestionTimer timeLeft={timeLeft}
        />}
      </div>





      <div className='row-span-3 col-span-3 overflow-y-scroll scrollbar-hide p-5'>
        {testSubmission && testSubmission?.answers[index]?.subQ.map((item: any) => {
          if (item?.type == sub?.type) {
            return <div>
              <div className='my-2 text-xl font-semibold'>
                {item?.title}
              </div>
              <div>
                <div dangerouslySetInnerHTML={{ __html: item?.content }} className='renderhtml '></div>        </div>
            </div>
          }
        })}
      </div>





      <div className='row-span-1 col-span-2 pb-5 px-5'>
        {sub && sub?.type == "TEXT" && <>
          <Input className='w-[200px]' type="text" value={answer} onChange={(e) => setanswer(e.target.value)} placeholder="Answer (Just Option)" />
        </>}
        {sub && sub?.type == "AUDIO" && <>
          <AudioAnswer AudioOp={AudioOp} setAudioOp={setAudioOp} timeLeft={timeLeft} />
        </>}
      </div>







      <div className='row-span-1 col-span-1 flex justify-end p-5'>
        {index != testSubmission.answers.length - 1 ?
          sub && sub?.type == "AUDIO" ?
            <Button onClick={handleAudioNext}>
              Next
            </Button>
            :
            <Button onClick={() => {
              handleTextAnswer(TIME - timeLeft);
              setsub({ type: "AUDIO" });
              setTimeLeft(TIME-TIME/3)
            }}>
              Next
            </Button>

          :
          <Button onClick={() => console.log("Submit")}>
            Submit</Button>}
      </div>
    </>
  )
}

export default TestPage