import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSubResults, getTestSubmissions } from '@/hooks/server/test/results';
import Image from 'next/image';
import React from 'react'
import Loading from '../../loading';
import Emotions from '@/components/component/results/Emotions';
import Reports from '@/components/component/results/Reports';

const Results = async ({ params, searchParams }: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const data = await getSubResults(params?.id);
  // console.log(data);
  const results = data["eval"]["results"];
  // console.log(results);

  if(!data){
    return <Loading />
  }

  if( data && typeof data == "object" && Object.keys(data).length==0){
    <div>No Data Found</div>
  }
  const quesl = data["questions"].length;
  const tt = results.reduce((acc,item)=>parseInt(item.time)+acc,0);
  const avgTime = tt/quesl;

  let correctAns = 0;
  let incorrectAns = 0;
  let notPartial = results.every((item:any)=>{
    if(item.correctAnswer!=''){
      return true;
    }
    else{
      return false;
    }
  });

  results.forEach((item:any) => {
    if(item.correctAnswer=="true" || item.correctAnswer==true){
      correctAns+=1
    }
    if(item.correctAnswer!='' && (item.correctAnswer=="false" || item.correctAnswer==false)){
      console.log("item.correctAnswer")
      incorrectAns+=1
    }
  });



  /*
    {
    question_confidence: 0.24,
    correctAnswer: '',
    audioEmotion: '',
    videoEmotion: 'neutral',
    audiotextRelevancy: '',
    time: '3'
    }
  */


  return (
    <div>
      <div className="md:hidden">
      </div>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Test Results</h2>
            <div className="flex items-center space-x-2">
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="reports" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="confidence analytics" >
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" >
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Questions
                    </CardTitle>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{quesl}</div>
                    <p className="text-xs text-muted-foreground">
                      100% of actual questions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Correct Answers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">{correctAns }</div>
                    <p className="text-xs text-muted-foreground">
                      +{correctAns*100/quesl}% of actual questions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Incorrect Answers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{incorrectAns}</div>
                    <p className="text-xs text-muted-foreground">
                      +{incorrectAns*100/quesl}% of actual questions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg Time Taken
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgTime}</div>
                    <p className="text-xs text-muted-foreground">
                      +{avgTime*100/60}% of total time
                    </p>
                  </CardContent>
                </Card>
                {!notPartial && <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold py-3">
                      These results are partially evaluated
                    </CardTitle>
                  </CardHeader>
                </Card>}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              </div>
            </TabsContent>
            <TabsContent value="confidence analytics" className="space-y-4">
              <Emotions data={results}/>
</TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Reports Eval={data} Data={results} />
</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Results