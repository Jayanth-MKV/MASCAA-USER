import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import React from 'react'
import step1 from "@/img/step-1.png"
import step2 from "@/img/step-2.png"
import step3 from "@/img/step-3.png"
import step4 from "@/img/step-4.png"
import step41 from "@/img/step-41.png"
import step5 from "@/img/step-5.png"
import step6 from "@/img/step-6.png"
import step7 from "@/img/step-7.png"
import Image from 'next/image';

const steps = [
    {
      title: 'Step-1',
      description: 'Read the test instructions & click on START',
      img:step1
    },
    {
      title: 'Step-2',
      description: 'Give Permissions for camera & microphone & click on START TEST',
      img:step2

    },
    {
      title: 'Step-3',
      description: 'Answer the MCQ (TEXT QUESTION) - Just give the option eg:C &  Click on NEXT to submit the answer',
      img:step3

    },
    {
      title: 'Step-4',
      description: 'Answer the (AUDIO QUESTION) by speaking - Click on Start to speak and stop to end',
      img:step4

    },
    {
      title: 'Step-5',
      description: 'Check the transcript after speaking - Click on next to submit the audio',
      img:step5

    },
    {
      title: 'Step-6',
      description: 'Click on submit to finish the test',
      img:step6

    },
    {
      title: 'Step-7',
      description: 'Test Completed',
      img:step7

    },
  ];

  const Roadmap = () => {
    return (
      <>
        <h1 className='lg:text-2xl text-center font-bold mb-5'> Steps For Taking Test</h1>
        <div className='flex flex-col flex-wrap items-center gap-5 justify-start md:w-[70%] mx-auto'>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Card className='w-[500px]'>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription className='py-3'>
                    {step?.img && <Image src={step?.img} alt={step?.title}/>}
                  </CardDescription>
                  {index==3 && <CardDescription className='py-3'>
                    {step?.img && <Image src={step41} alt={step?.title}/>}
                  </CardDescription>}
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
              {index < steps.length - 1 && <ArrowDown />}
            </React.Fragment>
          ))}
        </div>
      </>
    );
  };

export default Roadmap;