import React, { useState } from 'react'
import { FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import OtpModal from '../../components/providerComponents/OtpModal'
const ProviderSignup = () => {


  const [Optmodal, setOtpmodal] = useState(false)
  const addServiceClose = () => setOtpmodal(false);
  // onClick={()=>setOtpmodal(true)}

  const navigate = useNavigate()
  const loginHandle = () => {
  navigate('/providerlogin')
  }


  const [providerData, setProviderData] = useState({
    companyName: "",
    description: "",
    services: "",
    place: "",
    phone: "",
    email: "",
    password: "",


  });
  const [image, setImage] = useState("")
  // console.log(providerData.certificate);
  const [err, setErr] = useState("");

  const [validation, setValidation] = useState({
    companyName: {
      status: true,
      message: "",
    },
    description: {
      status: true,
      message: "",
    },
    services: {
      status: true,
      message: "",
    },
    place: {
      status: true,
      message: "",
    },
    email: {
      status: true,
      message: "",
    },
    phone: {
      status: true,
      message: "",
    },
    password: {
      status: true,
      message: "",
    },
    signuoError: {
      status: true,
      message: "",
    },
  });

  const valueSetting = (e) => {
    setProviderData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  const nameCheck = () => {
    if (providerData.companyName.length < 3) {
      setValidation((prevState) => ({
        ...prevState,
        companyName: {
          value: false,
          message: "name must be more than 3 character",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        companyName: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const descriptionCheck = () => {
    if (providerData.description == "") {
      setValidation((prevState) => ({
        ...prevState,
        description: {
          value: false,
          message: "description must be fill",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        description: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };



  const servicesCheck = () => {

    if (providerData.services == "") {
      setValidation((prevState) => ({
        ...prevState,
        services: {
          value: false,
          message: "select one category",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        services: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const placeCheck = () => {

    if (providerData.place == "") {
      setValidation((prevState) => ({
        ...prevState,
        place: {
          value: false,
          message: "select one category",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        place: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const emailCheck = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!providerData.email.match(validRegex)) {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: false,
          message: "is this really your email ?",
        },
      }));
      // console.log("email false");

      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const PhoneCheck = () => {
    const expr = /^(91)?[0-9]{10}$/;
    if (!providerData.phone.match(expr)) {
      setValidation((prevState) => ({
        ...prevState,
        phone: {
          value: false,
          message: "is this really your phone ?",
        },
      }));
      // console.log("phone false");

      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        phone: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };



  const passwordCheck = () => {
    if (providerData.password.length < 8) {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: false,
          message: "password  must be more than 8 character",
        },
      }));
      // console.log("password false");
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };

  const signupHandle = () => { 




    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "EventManagement");
    data.append("cloud_name", "dnh79zoop");

    fetch("https://api.cloudinary.com/v1_1/dnh79zoop/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {

        const certificateUrl = data.url;



        fetch(`http://localhost:8000/provider/signupEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certificateUrl,
            providerData,

          }),   
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.message === "success") {
              setOtpmodal(true)

              setValidation((prevState) => ({
                ...prevState,
                signuoError: {
                  value: true,
                  message: "",
                },
              }));
              return true;

            } else {
              setValidation((prevState) => ({
                ...prevState,
                signuoError: {
                  value: false,
                  message: "Something wrong happened",
                },
              }));
              return false;
            }

            // open.updateEvent();
            // SetDesc("");
          });
      })
      .catch((err) => console.log(err));
  }







  return (
    <div className='w-full h-full grid lg:grid-cols-3 md:grid-cols-5 bg-white'>
    <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center mb-20'>
        <h1 className='font-Viaoda text-7xl mb-10 mt-20'>Signup</h1>
        <input
          type="text"
          name='companyName'
          placeholder='Company Name'
          onChange={valueSetting}
          onBlur={nameCheck}
          value={providerData.companyName}
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
        />
        {!validation.companyName.status && (
        <p className=" text-red-600">{validation.companyName.message}</p>
      )}
        <textarea
          name="description"
          placeholder='Description'
          onChange={valueSetting}
          onBlur={descriptionCheck}
          value={providerData.description}
          className='w-[90%] max-h-40 mt-10 text-3xl border-2 border-black rounded-3xl text-center show-scrollbar'></textarea>
        {!validation.description.status && (
        <p className=" text-red-600">{validation.description.message}</p>
      )}
        <select
          name="services"
          value={providerData.services}
          onChange={valueSetting}
          onBlur={servicesCheck}
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'>
                              <option value="">-- Choose a category --</option>
                              <option value="Wedding planning">Wedding planning</option>
                              <option value="Travels">Travels</option>
                              <option value="Photography">Photography</option>
        </select>
        {!validation.services.status && (
        <p className=" text-red-600">{validation.services.message}</p>
      )}
        <select
          name="place"
          value={providerData.place}
          onChange={valueSetting}
          onBlur={placeCheck}
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'>
                              <option value="#">-- Choose your place --</option>
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
        {!validation.place.status && (
        <p className=" text-red-600">{validation.place.message}</p>
      )}
        <input
          type="text"
          name='phone'
          value={providerData.Phone}
          onChange={valueSetting}
          onBlur={PhoneCheck}
          placeholder='Phone'
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
        />
        {!validation.phone.status && (
        <p className=" text-red-600">{validation.phone.message}</p>
      )}
        <input
          type="email"
          name='email'
          value={providerData.email}
          onChange={valueSetting}
          onBlur={emailCheck}
          placeholder='Email'
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
        />
        {!validation.email.status && (
        <p className=" text-red-600">{validation.email.message}</p>
      )}
        <input
          type="password"
          name='password'
          value={providerData.password}
          onChange={valueSetting}
          onBlur={passwordCheck}
          placeholder='Password'
          className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
        />
        {!validation.password.status && (
        <p className=" text-red-600">{validation.password.message}</p>
      )}
        <input
          type="file"
          name='certificate'
          value={providerData.certificate}
          onChange={(e)=>setImage(e.target.files[0])}
          className='w-[90%] h-20 mt-10 text-3xl p-4 border-2 border-black rounded-3xl text-center'
        />
        <label htmlFor="file">Gov.Approved Certificate</label>


        <button onClick={signupHandle} className='w-[60%] h-20 mt-10 text-3xl font-semibold border-2 border-black rounded-3xl text-center'>Signup</button>
        {!validation.signuoError.status && (
        <p className=" text-red-600">{validation.signuoError.message}</p>
      )}
        <p className='mt-5'>Already a member?<a className='text-blue-900 font-semibold cursor-pointer' onClick={loginHandle}>Login</a></p>
        <button className='w-[60%] h-20 mt-10 flex flex-row items-center pl-3 text-2xl font-medium border-2 border-black rounded-3xl text-center'><span className='w-[20%] h-20 flex items-center justify-center'><FcGoogle/></span>Login with google</button>
    </div>
    <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2'>
    <img src="plogin.jpg" alt="LOGIN" className="w-[100%] top-1 sticky" />
        <h1 className='font-Viaoda text-7xl text-black-500 absolute top-2/3 top-0 bottom-64 sticky'>Make everything easy</h1>
    </div>
      <OtpModal onClose={addServiceClose} visible={Optmodal} phone={ providerData.phone} />

</div>
  )
}

export default ProviderSignup