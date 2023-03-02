import React, { useRef, useState } from 'react'
import Footer from '../../components/Footer'
import AddCoverPhoto from '../../components/providerComponents/AddCoverPhoto'
import AddDP from '../../components/providerComponents/AddDP'
import Navebar from '../../components/providerComponents/Navebar'


const EditProfile = () => {




  return (
    <div>
          <Navebar />
          <div className='w-full'>
              <div className='max-w-[1300px]  mx-auto  mt-8 rounded-2xl flex flex-col'>
                  <AddCoverPhoto />
                  <AddDP />

                  <div className='mx-auto flex flex-col items-center justify-center mt-10 gap-6'>
                      <div>
                      <label htmlFor="companyName" className='ml-6'>Company Name</label>
                        <input type="text" className='border-2 border-black rounded-3xl h-16 w-full text-lg font-medium p-4' />
                      </div>
                      <div>
                      <label htmlFor="companyName" className='ml-6'>Description</label>
                        <textarea name="description" className='border-2 border-black rounded-3xl w-full text-lg font-medium p-4' id="" cols="30" rows="10"></textarea>
                      </div>
                      <div className='w-full'>
                      <label htmlFor="companyName" className='ml-6'>Location</label>

                          <select name="" id="" className='border-2 border-black rounded-3xl h-16 w-full text-lg font-medium p-4 ease-in-out'>
                              <option value="Alappuzha" >Alappuzha</option>
                              <option value="Ernakulam">Ernakulam</option>
                              <option value="Idukki">Idukki</option>
                              <option value="Kannur">Kannur</option>
                              <option value="Kasaragod">Kasaragod</option>
                              <option value="Kollam">Kollam</option>
                              <option value="Kottayam">Kottayam</option>
                              <option value="Kozhikode">Kozhikode</option>
                              <option value="Malappuram">Malappuram</option>
                              <option value="Palakkad">Palakkad</option>
                              <option value="Pathanamthitta">Pathanamthitta</option>
                              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                              <option value="Thrissur">Thrissur</option>
                              <option value="Wayanad">Wayanad</option>
                          </select>
                      </div>
                      <div className='w-full mb-10'>
                          <button className='bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-full text-lg font-medium mt-6 p-4 uppercase'>save</button>
                      </div>



                  </div>
              </div>
          </div>
          <Footer/>
    </div>
  )
}

export default EditProfile