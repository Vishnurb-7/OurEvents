import React from 'react'

const UserMessage = (props) => {
  return (
    <div className='w-full bg-gray-300 rounded-2xl p-4  hover:shadow-md hover:shadow-black'>
          <h2 className='text-2xl font-medium'>{ props.email}</h2>
          <p className='h-7 mt-2 text-sm overflow-hidden'>{ props.chat}</p>
          <div className='w-full mt-3 flex flex-row-reverse'>{ props.time}</div>
    </div>
  )
}

export default UserMessage