import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from '../utils/axios';
import { userAuthChange } from '../features/userAuthSlice';


const LoginWithGoogle = () => {
    // const [user, setUser] = useState("");
    const dispatch = useDispatch()
    const navigate =  useNavigate()

    const handleCallBackResponse = async(response) => { 
        // console.log("Encoded JWT ID Token" + response.credential);
        const userObject = jwtDecode(response.credential);

        const data = { email: userObject.email};
    try {
      const response = await axios.post("/googleLogin", data);
      console.log("it is working ", response);



      if (response.status === 201) {
        const { accessToken, refreshToken, user } = response.data



        const disp = dispatch(userAuthChange({ accessToken, refreshToken, user }))
        if (disp) {
            navigate('/')
        }
        setValidation((prevState) => ({
            ...prevState,
            signupError: {
              value: true,
              message: "",
            },
          }));
          return true;
  
        } else {
          setValidation((prevState) => ({
            ...prevState,
            signupError: {
              value: false,
              message: "Something wrong happened",
            },
          }));
          return false;
        }
  
  
      } catch (error) {
        console.log(error);
        // setError(true);
    }

}


    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "1046487536601-b55jhi0uh6edbfujs6pm5n68nmcu19r6.apps.googleusercontent.com",
            callback : handleCallBackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("loginDiv"),
            {theme:"outline",size:"large",width:310,text: "continue_with", shape: "pill",}
        )
    }, []);
  return (
    <div id='loginDiv' className='mt-8'>

    </div>
  )
}

export default LoginWithGoogle