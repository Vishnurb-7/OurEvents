import React from 'react'
import { GrSend } from 'react-icons/gr'
import Navebar from '../../components/providerComponents/Navebar'
import ReceivedMessage from '../../components/providerComponents/ReceivedMessage '
import SenderMessage from '../../components/providerComponents/SenderMessage '

const ProviderChat = () => {
  return (
    <div>
      <Navebar />

      <div className='p-2'>

              <div className='relative mt-10 mb-10 rounded-3xl bg-white md:max-w-[980px] lg:max-w-[1100px] h-[600px] lg:h-[800px] mx-auto shadow-2xl flex flex-col'>
                  <div className='flex flex-col p-5 md:max-w-[980px] lg:max-w-[1100px] h-[500px] lg:h-[700px] overflow-y-scroll no-scrollbar'>
            <ReceivedMessage />
            <SenderMessage />
            <ReceivedMessage />
            <SenderMessage />
            <ReceivedMessage />
            <SenderMessage/>
                      </div>
              <div className='bottom-0 absolute w-full h-24 bg-white pt-6 pl-6 flex flex-row shadow-2xl rounded-b-3xl'>
                          <input type="text" className='border-2 border-gray-700 w-[90%] h-14 rounded-full shadow-2xl p-5 font-medium text-lg' />
                          <button className='w-[60px] h-[60px] bg-[#E1EDF8] border-2 border-black rounded-full ml-3 flex items-center p-4'><GrSend className='text-4xl'/></button>
                      </div>

              </div>
      </div>

    </div>
  )
}

export default ProviderChat