import React from 'react'
import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex flex-col gap-2 w-full min-h-screen bg-blue-600 text-white justify-center items-center'>
        <Loader className='size-8 animate-spin'/>
        <span>Loading</span>
    </div>
  )
}

export default Loading