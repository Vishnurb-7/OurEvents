import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import OtpInput from "react18-input-otp";
import axios from '../../utils/axios';
import Countdown, { zeroPad } from 'react-countdown';


const renderer = ({ hours, minutes, seconds }) => (
  <span className='text-xl text-right'>
    {zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);


const ManagerForgotOTPModal = ({ visible, onClose, phone }) => {
  
  
  const handleOnClose = (e) => {
    if(e.target.id ==="container") onClose()
  };
  
  if (!visible) return null;
  
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [resend, setresend] = useState(false);
  
  const resendHandler = () => {
    setresend(true);
  }
  
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const otpSentButtonHandler = async() => {
    if (otp.length < 6) {
      console.log("invalid otp");
      setError(true);
    } else {
      setError(false);
      console.log("it is working with otp", otp);

      const data = { mobile: phone, otp: otp };
      try {
        const response = await axios.post("/provider/ChangePasswordOtp", data);
        console.log("it is working with otp", response);
        if (response.status === 201) {
          console.log("response data ", response.data);
          console.log("response password token ", response.data.passwordToken);

          const token = response.data.passwordToken;
          const userId = response.data.userId;
          navigate(`/managerChangePassword/${userId}/${token}`)
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }

    
    }
  };
    
  const otpResendHandler = async() => {
    const data = { mobile: phone };
    try {
      const response = await axios.post("/resendOtp", data);
      console.log("it is working with otp", response);
      if (response.status === 201) {
        setresend(false)
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div id='container' onClick={handleOnClose} className='z-10 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
          
              <div className='bg-slate-300 w-[700px] h-[700px] flex flex-col rounded-3xl m-2'>
                  <div className='flex flex-row-reverse text-4xl p-4 border-b-2 border-black'>
                      <button onClick={onClose} ><AiFillCloseCircle/></button>
              </div>
              <div className='h-full w-full flex items-center justify-center flex-col'>
          <h1 className='text-3xl font-medium mb-8'>Enter OTP</h1>
          <p>OTP was send to +91 { phone}</p>
                  <OtpInput
                       value={otp}
                       onChange={handleChange}
                       separator={<span className="p-4 shadow-2xl"> </span>}
                       inputStyle="md:text-7xl text-4xl shadow-2xl border-2   rounded-xl"
                       numInputs={6}
                       isInputNum={true}
                  >
                      
                  </OtpInput>
          {error && <p className="text-red-600 text-xl pt-5">invalid otp</p>}
          <div className='w-full flex justify-end p-10'>
          {!resend && <Countdown date={Date.now() + 100000} renderer={renderer} onComplete={resendHandler} className="text-xl text-right w-[65%]  mt-5" />}
            {resend && <p className="text-xl text-right w-[65%] cursor-pointer underline mt-5" onClick={otpResendHandler} >Resend Otp ?</p>}
            </div>
                  <button  onClick={otpSentButtonHandler} className='bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-[60%] text-lg font-medium mt-6 p-4 uppercase'>done</button>
              </div>
              </div>
          
      
    </div>
  )
}

export default ManagerForgotOTPModal