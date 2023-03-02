import React from 'react'
import { GrStar } from 'react-icons/gr'


const ProvidersCard = (props) => {
  const viewClickHandler = () => { 
     props.moreClick()
  }
  return (
    <div className='bg-white rounded-xl mb-7 ml-1 lg:w-[500px] lg:h-[400px] w-[365px] h-[480px]  pt-5 flex-col shadow-2xl'>
          <div className='w-full grid lg:grid-cols-5'>
              <div className='lg:col-span-2'></div>
              <div className='lg:col-span-3 flex justify-center flex-col items-center lg:block'>
                  <h3 className='font-semibold text-3xl mt-6 ml-4 text-center lg:text-left'>Company Name</h3>
                  <p className='ml-4 mt-6 text-xl font-lightn text-center lg:text-left'>2 years of experience</p>
                  <div className='w-32 h-9 mt-4 ml-4 rounded-full border-2 border-black flex flex-row items-center text-xl font-medium p-3 justify-center'>5 <GrStar className='text-2xl'/>Rating </div>
              </div>

      </div>
          <div className='m-5 overflow-y-scroll no-scrollbar w-[90%] lg:h-[110px]'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,</div>
          <div className='w-full flex items-center justify-center'>

          <button onClick={viewClickHandler} className='w-36 h-8 bg-blue-400 rounded-full'>View more</button>
          </div>
    </div>
  )
}

export default ProvidersCard