"use client"
import React, { useDeferredValue, useEffect, useState } from 'react'
import { DropDown } from '../extra/dropdown'
import { getSearch } from '@/hooks/server/test/url';
import { useApiSend } from '@/hooks/network/rq';
import Loading from '@/app/(dashboard)/test/loading';
import { useToast } from '@/components/ui/use-toast';

const TakeTestForm = ({selected,setSelected}:any) => {

    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = searchQuery;

    const [data, setData] = useState([]);

    useEffect(() => {
      handleSubmit(deferredSearchQuery);
    }, [deferredSearchQuery])
    
    
    const { mutate:getTestSearch } = useApiSend(
      getSearch,
      (data: any) => {
          console.log(data);
          setData(data);
      },
      (e: any) => {
          console.log(e)
          toast({
              variant: "destructive",
              title: "cannot get tests",
              description: e?.message
          })
      },
  )

  const handleSubmit = (searchquery:string) => {
    const payload = {
      searchquery:searchquery
    }
    getTestSearch({ ...payload } as any);
}



  return (
    <div>   
       {data!=undefined && <DropDown searchQuery={searchQuery} setSearchQuery={setSearchQuery} departments={data as any} value={selected} setValue={(e:any) => setSelected(e)} />}
    </div>
  )
}

export default TakeTestForm;