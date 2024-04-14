"use client"
import CamView from '@/components/component/taketest/CamView';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import QuestionTimer from './QuestionTimer';
import { Input } from '@/components/ui/input';
import AudioAnswer from './Answer';




const TestPage = ({ answer,index, setindex, setanswer, test, testSubmission, handleTextAnswer, handleAudioAnswer, handleSubmit }: any) => {
  // const params = useParams()
  // console.log(params)

  const TIME = 180;
  const [timeLeft, setTimeLeft] = useState(TIME/3);
  const router = useRouter()
const [pause, setpause] = useState(false)
  // const [isOk, setisOk] = useState(false)
  const [questionData, setquestionData] = useState({ topic: "Question Topic", content: " Question Content" })
  const [sub, setsub] = useState({ type: "TEXT" });
  const [AudioOp, setAudioOp] = useState({ text: '', file: null });
const [lastQuesFilled, setLastQuesFilled] = useState(false);

  const handleQuestionChange = useCallback(
    () => {
      console.log(index)
      if (index != testSubmission.answers.length - 1)
        setindex(index + 1);
      setTimeLeft(TIME/3)
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

  const handleAudioNext= useCallback(() => {
    handleAudioAnswer(AudioOp);
    handleQuestionChange();
    setAudioOp({text:'',file:null});
  },[AudioOp]);


  const handleAudioLast= useCallback(() => {
    handleAudioAnswer(AudioOp);
    setLastQuesFilled(true);
    setAudioOp({text:'',file:null});
  },[AudioOp]);


  const handleTextNext= useCallback(() => {
    handleTextAnswer(TIME/3 - timeLeft);
    setsub({ type: "AUDIO" });
    setTimeLeft(TIME-TIME/3)
  },[answer]);


  const handleSubmitNext = () => {
    console.log("Submit");
    window.localStorage.removeItem("stopped-area");
    handleSubmit();
  }



  // run at start
  useEffect(() => {
    const data = getLocal();
    console.log(data)
    // const data = JSON.parse(d);
    setindex(data?.index || 0);
    setsub({ type: data?.subType?data.subType: "TEXT" });
    setTimeLeft(data?.time?data?.time : TIME/3);
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {

        if(pause){
          return prevTimeLeft;
        }
        
        setLocal({ index, subType: sub?.type, time: prevTimeLeft });
        // console.log({ index, subType: sub?.type, time: prevTimeLeft })
        if (prevTimeLeft === 0) {
          if (sub.type=="TEXT") {
            setsub({ type: "AUDIO" });
            return 2*TIME/3; // Reset time left for the new question
          }
          if(sub.type=="AUDIO"){
            setsub({ type: "TEXT" });
            clearInterval(interval);
            handleQuestionChange(); // Change to the next question
            return TIME/3; // Reset time left for the new question
          }
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [index,sub]);


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
  //     setpause(false);
  //     // alert("you cannot leave the page")
  //   } else {
  //     console.log("tab is inactive")
  //     alert("you cannot leave the page")
  //     setpause(true);
  //   }
  // });

  // },[])



  // get ques and subques data
  useEffect(() => {
    const qd = testSubmission?.answers[index];
    setquestionData({ topic: qd?.topic || "Subquestion Topic", content: qd?.content || "Subquestion Content" });
    // console.log(qd)
    const sq = testSubmission?.answers[index]?.subQ.filter((item: any) => item?.type == sub?.type)
    if (sq)
      setsub(sq[0]);
    // console.log(sq)
    setanswer("");
  }, [index, sub])



  // handles if time is completed
  useEffect(() => {
    if (timeLeft == 0 && index==(testSubmission.answers.length-1)) {
      console.log("submitted");
      handleSubmit();
      window.localStorage.removeItem("stopped-area");
      router.push(`/test-redirect/${test._id}/${test.title}/${test.testSecret}/secure/${testSubmission._id}/submit`)
      return
    }
    if (timeLeft < 3) {
      if (sub?.type == "TEXT") {
        handleTextAnswer(TIME/3 - timeLeft);
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
        {(index != testSubmission.answers.length - 1 || sub.type!="AUDIO") ?
          (
          sub && sub?.type == "AUDIO" ?
          <AudioOpButtons AudioOp={AudioOp} handleAudioNext={handleAudioNext}/>
            :
            ((answer==" " || answer == "") ? (<TextAlert text={"answer"} fn={handleTextNext}>
            <Button >
             Next
           </Button>
            </TextAlert>)
              : (<Button onClick={handleTextNext}>
              Next
            </Button>))
            )
          :
          ((AudioOp.text == "" || AudioOp.file == null ) && !lastQuesFilled  ? (
          <div className='flex items-center'>
          <AudioAlert text={"audio - SUBMIT TEST"} fn={handleAudioLast}>
           <Button>
            Save
          </Button>
          </AudioAlert>
          <Button className='ml-3' disabled={true}>
            Submit</Button>
          </div>)
          :
          (
          !lastQuesFilled?<>
           <Button onClick={handleAudioLast}>
            Next
          </Button>
          <Button disabled={true}>
            Submit</Button>
          </>
          :<>
          <Button onClick={handleSubmitNext}>
            Submit</Button>
            </>
            )
          )  
            
            }
      </div>


    </>
  )
}

export default TestPage;



const AudioOpButtons = ({AudioOp,handleAudioNext}:any)=>{

  return  ((AudioOp.text == "" || AudioOp.file == null)
            
  ?<AudioAlert text={"audio"} fn={handleAudioNext}>
   <Button >
    Next
  </Button>
  </AudioAlert>
  :<Button onClick={handleAudioNext}>
    Next
  </Button>)
}


const TextAlert=({children,text,fn}:any)=>{
  return <>
        <AlertDialog>
        <AlertDialogTrigger>
          {children}
        </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure to submit without {text}?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={fn}>Next</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  </>
}

const AudioAlert=({children,text,fn}:any)=>{
  return <>
        <AlertDialog>
        <AlertDialogTrigger>
          {children}
        </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure to submit {text}?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={fn}>Next</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  </>
}