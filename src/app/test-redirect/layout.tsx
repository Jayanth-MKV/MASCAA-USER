import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='w-screen h-screen overflow-y-scroll scrollbar-hide '>
        
        {children}

    </div>
  )
}

export default layout