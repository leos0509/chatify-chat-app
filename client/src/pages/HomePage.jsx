import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer";


const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="w-full max-w-[1440px] md:container-p h-[90%] md:h-full bg-base-200">
      <div className="flex items-start md:items-center h-full justify-center md:pt-20 md:p-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full h-full md:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage