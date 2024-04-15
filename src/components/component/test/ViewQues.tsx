"use client"
import React from 'react'
import NoData from '@/components/component/home/NoData';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useApiSend } from '@/hooks/network/rq';
import { generateQues } from '@/hooks/server/test/url';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FileIcon, Package2Icon } from '@/components/icons/page';
import { LoadingSpinner } from '../home/loader';
import { CustomPopUp } from '../extra/dialog-custom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import TextQuestion from '../question/TextQuestion';
import AudioQuestion from '../question/AudioQuestion';
import {
    // Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from '@/components/ui/separator';
import QuesEdit from '../question/QuesEdit';



const EditQues = ({ data, id,testId }: any) => {

    const { toast } = useToast();
    const router = useRouter();

    console.log(data);



    // const { mutate, isPending } = useApiSend(
    //     generateQues,
    //     (data: any) => {
    //         console.log(data)
    //         toast({
    //             title: "success",
    //             description: "Questions Generated!"
    //         })
    //         router.push(`/test/${id}`)
    //         router.refresh();

    //     },
    //     (e: any) => {
    //         console.log(e)
    //         toast({
    //             variant: "destructive",
    //             title: "cannot generate questions - wait for sometime and try again",
    //             description: e?.message
    //         })
    //     },
    // );

    // if (isPending) {
    //     return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
    //         <Package2Icon className="h-6 w-6" />
    //         <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
    //         <LoadingSpinner />
    //     </div>)
    // }


    // const onSubmit = async () => {
    //     if (id) {
    //         mutate({ "testId": id });
    //     }
    // }




    // if (data && data?.length == 0) {
    //     return <div className='grid grid-cols-1 items-center'>
    //         <NoData text="No Questions" />
    //         <div className='w-full flex justify-center mt-5'>

    //             <CustomPopUp
    //                 triggercomp={<Button className="max-w-[200px]">
    //                     <PlusCircledIcon className="mr-2 h-4 w-4" />
    //                     Generate New Questions
    //                 </Button>}
    //                 ok='Generate' title='Questions' todoFunction={onSubmit} description='Generate 5 Questions With 2 Sub Questions Each' />
    //         </div>
    //     </div>
    // }

    // console.log("rendered", data)







    return (
        <div className="bg-white py-24 sm:py-10">

        <div className="mx-auto max-w-7xl px-6 pb-3 lg:px-8 md:items-center gap-10 flex flex-col lg:flex-row  md:justify-between">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Test Answers</h2>
          {/* <p className="mt-2 text-lg leading-8 text-gray-600">View Tests and Evaluate Confidence </p> */}
        </div>
        <div className='max-w-[200px]'>
          {/* <Button className="w-full" onClick={() => {
            router.push("/test")
          }}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
          </Button> */}
        </div>
        <div className='p-5 flex justify-end'>
        <Button className="ml-auto" onClick={() => {
            router.push("/test/"+id+"/results")
          }}>
            <FileIcon className="mr-2 h-4 w-4" /> Check Results
          </Button>
        </div>
      </div>
        {/* <div className="items-center mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"> */}
        <Separator />
        <Separator />
        <div className='md:w-[70%] mx-auto pt-10'>{
            data &&
            <>
                <Accordion type="single" collapsible>
                    {
                        data.map((question: any, index: number) => (
                            <AccordionItem
                                key={index}
                                value={`question-${index + 1}`}
                                className="mb-4 p-3 border-2 border-slate-100"
                            >
                                <AccordionTrigger className='aria-expanded:border-slate-300 aria-expanded:border-b-4 aria-expanded:rounded-none aria-expanded:pb-5 text-md font-bold p-2 rounded-md '>
                                    {`Question ${index + 1}: ${question?.topic}`}</AccordionTrigger>
                                <Dialog>
                                    <AccordionContent className=" ">
                                        <div className='md:p-3 flex-2'>
                                            <div className='relative my-10 '>
                                                <CardHeader>
                                                    <CardTitle className='text-xl'>
                                                        {question?.topic}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        <div dangerouslySetInnerHTML={{ __html: question?.content }} className='renderhtml '></div>
                                                    </CardDescription>
                                                </CardHeader>
                                            </div>
                                        </div>

                                        <DialogTrigger className='block mx-auto p-4'>
                                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Sub Questions
                                                </span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className='overflow-y-scroll max-h-screen'>
                                            <DialogHeader>
                                                <DialogTitle>Sub Questions - ( TEXT,AUDIO )</DialogTitle>
                                                <DialogDescription>These are the sub questions for this question.</DialogDescription>
                                            </DialogHeader>
                                            <Tabs defaultValue="text" className="flex-1">
                                                <Separator />
                                                <TabsList className='my-5'>
                                                    <TabsTrigger className='text-md font-bold' value="text">Text Question</TabsTrigger>
                                                    <TabsTrigger className='text-md font-bold' value="audio">Audio  Question</TabsTrigger>
                                                </TabsList>
                                                <Separator />
                                                <TabsContent value="text" className='min-h-[350px]'><TextQuestion id={testId} question={question["subQ"]?.filter((item) => (item.type == "TEXT"))[0]} /></TabsContent>
                                                <TabsContent value="audio" className='min-h-[350px]'><AudioQuestion id={testId} question={question["subQ"]?.filter((item) => (item.type == "AUDIO"))[0]} /></TabsContent>
                                            </Tabs>
                                        </DialogContent>

                                    </AccordionContent>
                                </Dialog>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </>
        }</div>
        </div>
        // </div>
    )
}

export default EditQues







/*
[
    {
        "qid": "660d914f803d5615111cb861",
        "topic": "Remote Work Challenges",
        "content": "<p>Remote work has become increasingly prevalent in modern workplaces, presenting both opportunities and challenges for employees and organizations. One of the main challenges of remote work is maintaining effective communication and collaboration among team members who are geographically dispersed. This can lead to issues such as miscommunication, feelings of isolation, and difficulties in coordinating tasks and projects.</p>",
        "subQ": [
            {
                "sqid": "660d914f803d5615111cb867",
                "type": "AUDIO",
                "answer": "",
                "audiofileurl": "audio/660d7c3198c8557aca02acd1/0_66118a9e17bbf39851a83d6d_filename.wav",
                "audiototext": "Client Components allow you to write interactive UI that is prerendered on the server and can use client JavaScript to run in the browser. This page will go ",
                "timeTaken": "",
                "title": "Audio Analysis",
                "content": "<p>give your opinion on this?</p>"
            },
            {
                "sqid": "660d914f803d5615111cb86c",
                "type": "TEXT",
                "answer": "A",
                "audiofileurl": "",
                "audiototext": "",
                "timeTaken": "9",
                "title": "Communication Strategies",
                "content": "<p>In what ways can remote teams improve communication to overcome challenges associated with working in different locations?</p><ul><li><p>A. Utilizing communication tools such as Slack, Microsoft Teams, or Zoom for regular meetings and updates.</p></li><li><p>B. Establishing clear communication protocols and expectations regarding response times and availability.</p></li><li><p>C. Implementing virtual team-building activities and social interactions to foster a sense of connection and belonging.</p></li><li><p>D. Providing training on effective virtual communication techniques and etiquette.</p></li></ul>"
            }
        ]
    },
    {
        "qid": "660d914f803d5615111cb862",
        "topic": "Time Management Techniques",
        "content": "<p>Effective time management is crucial for productivity and success, especially in fast-paced work environments. However, many individuals struggle to prioritize tasks, manage deadlines, and avoid distractions. Implementing effective time management techniques can help individuals maximize their productivity and achieve their goals more efficiently.</p>",
        "subQ": [
            {
                "sqid": "660d914f803d5615111cb868",
                "type": "AUDIO",
                "answer": "",
                "audiofileurl": "audio/660d7c3198c8557aca02acd1/1_66118a9e17bbf39851a83d6d_filename.wav",
                "audiototext": "hello this is the transcripta",
                "timeTaken": "",
                "title": "Coping with Isolation",
                "content": "<p><strong>How can remote employees cope with feelings of isolation and maintain their mental well-being?</strong></p><p><em>Share your thoughts on how remote employees can proactively combat feelings of isolation and loneliness, based on your own experiences or observations.</em></p>"
            },
            {
                "sqid": "660d914f803d5615111cb86d",
                "type": "TEXT",
                "answer": "",
                "audiofileurl": "",
                "audiototext": "",
                "timeTaken": "60",
                "title": "Prioritization Methods",
                "content": "<p>What methods or strategies do you use to prioritize tasks and allocate time effectively?</p><ul><li><p>A. Using the Eisenhower Matrix to categorize tasks based on urgency and importance.</p></li><li><p>B. Setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals to guide task prioritization.</p></li><li><p>C. Employing the Pomodoro Technique to break work into intervals with short breaks in between.</p></li><li><p>D. Creating daily to-do lists and prioritizing tasks based on deadlines and impact.</p></li></ul>"
            }
        ]
    },
    {
        "qid": "660d914f803d5615111cb863",
        "topic": "Leadership Styles",
        "content": "<p>Leadership styles refer to the approaches or methods that leaders use to influence and guide their teams towards achieving common goals. Different leadership styles have unique strengths and weaknesses, and effective leaders often adapt their approach based on the situation, team dynamics, and organizational objectives.</p>",
        "subQ": [
            {
                "sqid": "660d914f803d5615111cb869",
                "type": "AUDIO",
                "answer": "",
                "audiofileurl": "audio/660d7c3198c8557aca02acd1/2_66118a9e17bbf39851a83d6d_filename.wav",
                "audiototext": "",
                "timeTaken": "",
                "title": " Adapting Leadership Styles",
                "content": "<p><strong>How do effective leaders adapt their leadership styles to suit different situations or challenges?</strong></p><p><em>Audio Answerable: Share your experiences or observations on how leaders can adapt their styles to effectively address diverse challenges and foster team success.</em></p>"
            },
            {
                "sqid": "660d914f803d5615111cb86e",
                "type": "TEXT",
                "answer": "",
                "audiofileurl": "",
                "audiototext": "",
                "timeTaken": "60",
                "title": "Transformational Leadership Characteristics",
                "content": "<p> What characteristics or traits are essential for transformational leaders, and how do they inspire and motivate their teams?</p><p>A. Visionary thinking and the ability to articulate a compelling vision for the future.</p><p>B. Empowering team members by delegating authority and encouraging autonomy.</p><p>C. Building trust and fostering strong relationships through open communication and transparency.</p><p>D. Modeling desired behaviors and values to inspire others to reach their full potential.</p>"
            }
        ]
    },
    {
        "qid": "660d914f803d5615111cb864",
        "topic": "Problem-Solving Techniques",
        "content": "<p>Problem-solving is a critical skill in the workplace, enabling individuals to identify, analyze, and resolve complex issues or obstacles. Effective problem-solvers employ various techniques, such as root cause analysis, brainstorming, and critical thinking, to develop innovative solutions and drive continuous improvement.</p>",
        "subQ": [
            {
                "sqid": "660d914f803d5615111cb86a",
                "type": "AUDIO",
                "answer": "",
                "audiofileurl": "audio/660d7c3198c8557aca02acd1/3_66118a9e17bbf39851a83d6d_filename.wav",
                "audiototext": "",
                "timeTaken": "",
                "title": " Creative Problem-Solving Approaches",
                "content": "<p><strong>How do you foster creativity and innovation in problem-solving processes to generate unconventional solutions?</strong></p><p></p><p><em> Share examples of creative problem-solving initiatives or projects you've been involved in, highlighting the techniques and approaches used to generate innovative solutions.</em></p>"
            },
            {
                "sqid": "660d914f803d5615111cb86f",
                "type": "TEXT",
                "answer": "",
                "audiofileurl": "",
                "audiototext": "",
                "timeTaken": "60",
                "title": "Root Cause Analysis",
                "content": "<p>Describe the process of conducting a root cause analysis to identify the underlying factors contributing to a problem or issue.</p><ul><li><p>A. Identifying the problem statement and defining its scope and impact on stakeholders.</p></li><li><p>B. Gathering data and evidence to understand the sequence of events leading up to the problem occurrence.</p></li><li><p>C. Using techniques such as the \"5 Whys\" to delve deeper into the root causes behind surface-level symptoms.</p></li><li><p>D. Developing corrective actions and preventive measures to address the root causes and prevent recurrence.</p></li></ul>"
            }
        ]
    },
    {
        "qid": "660d914f803d5615111cb865",
        "topic": " Effective Communication Skills",
        "content": "<p>Effective communication is a cornerstone of successful relationships, both personally and professionally. It involves conveying information clearly and concisely, actively listening to others, and adapting communication styles to suit different contexts and audiences. Developing strong communication skills can improve teamwork, enhance leadership abilities, and foster positive relationships.</p>",
        "subQ": [
            {
                "sqid": "660d914f803d5615111cb86b",
                "type": "AUDIO",
                "answer": "",
                "audiofileurl": "audio/660d7c3198c8557aca02acd1/4_66118a9e17bbf39851a83d6d_filename.wav",
                "audiototext": "",
                "timeTaken": "",
                "title": "Conflict Resolution Approach",
                "content": "<p><strong>Describe your approach to resolving conflicts or disagreements in a professional setting.</strong></p><p><em>Share an example of a time when you successfully resolved a conflict in the workplace, highlighting the strategies you employed and the outcome of the situation.</em></p>"
            },
            {
                "sqid": "660d914f803d5615111cb870",
                "type": "TEXT",
                "answer": "",
                "audiofileurl": "",
                "audiototext": "",
                "timeTaken": "59",
                "title": "Active Listening Techniques",
                "content": "<p>What techniques or strategies do you use to actively listen and understand others' perspectives during conversations or meetings?</p><p>A. Maintaining eye contact and nodding to show engagement and attentiveness.</p><p>B. Paraphrasing or summarizing the speaker's points to demonstrate understanding and clarify any misunderstandings.</p><p>C. Asking open-ended questions to encourage further elaboration and exploration of ideas.</p><p>D. Avoiding interruptions and distractions to focus fully on the speaker's message.</p>"
            }
        ]
    }
]
*/