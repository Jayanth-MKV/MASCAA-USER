"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'

const SubmitTestPage = () => {


      useEffect(()=>{
      history.pushState(null, "", location.href);
      window.onpopstate = function () {
          history.go(1);
      };

  },[])




  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
    Test submitted  
      <div className='m-5'>
      <Button>
    <a href="/home" rel="noopener noreferrer">
      Go Home
      </a>
      </Button>
      </div>
      <div>
        Just Wait for the results , you can find them in the results section once they are evaluated
      </div>
    </div>  )
}

export default SubmitTestPage