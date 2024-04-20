import React from 'react'
import { DropDown } from '../extra/dropdown'
import { getAllTests } from '@/hooks/server/test/url';
import { useApiGet } from '@/hooks/network/rq';
import Loading from '@/app/(dashboard)/test/loading';
import { useToast } from '@/components/ui/use-toast';

const TakeTestForm = ({selected,setSelected}:any) => {

    const { toast } = useToast();

    
  const { data,
    isLoading,
    isError,
    isSuccess,
    isLoadingError,
  } = useApiGet(
    ["alltests"],
    getAllTests,
    {
      enabled: true,
      refetchOnWindowFocus: true,
      retry: 1
    }
  );

  if (isError || isLoadingError)
    toast({
      variant: "destructive",
      title: "Error",
      description: "Cannot get tests"
    })

  console.log(data);



  if (isLoading) {
    return <Loading />
  }



  return (
    <div>   
       {data!=undefined && isSuccess && <DropDown departments={data as any} value={selected} setValue={(e:any) => setSelected(e)} />}
    </div>
  )
}

export default TakeTestForm