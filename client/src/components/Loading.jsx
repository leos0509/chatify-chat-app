import React from 'react'
import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex flex-col gap-2 w-full min-h-screen bg-base-content text-base-100 justify-center items-center'>
        <Loader className='size-8 animate-spin'/>
        <span>Loading</span>
    </div>
  )
}

export default Loading