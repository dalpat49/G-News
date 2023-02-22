import React ,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login(){
    const navigate = useNavigate() 
    const [userData,setUserData] = useState({
        email:"",
        password:"",
    })

    let name,value;

    const handleChange =(e)=>{
        name=e.target.name;
        value=e.target.value;

        setUserData({...userData ,[name]:value});
    }

    const checkLogin =(e)=>{
        // e.preventDefault()
        axios.post("https://g-news-qh78.onrender.com/userLoginCheck",userData)
        .then((res)=>{
            const data = res.data;
            const {success,msg,id,userData} = data;
            if(success === true){
              if(userData.role === "user"){
                localStorage.setItem("id",id)
                localStorage.setItem("name",userData.name);
                localStorage.setItem("email",userData.email);
                localStorage.setItem("image",userData.image);
                localStorage.setItem("role",userData.role);
                console.log(userData)
                navigate("/" )
            }
            else if(userData.role === "SpeacialSuperRoleForAdmin"){
              localStorage.setItem("AdminId",userData._id);
              localStorage.setItem("role",userData.role);
              localStorage.setItem("adminName",userData.name);
              localStorage.setItem("adminImage",userData.image);
              localStorage.setItem("admindata",userData);


              navigate("/admin/adminHome")
   
   
             }
             }
             else {
             toast.error(msg)
           }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
useEffect(()=>{
  if(!localStorage.getItem("id")){
    navigate("/Login")
    // setUserLogin(false)
  }
  else
  {
    navigate("/ ")
    // setUserLogin(true)

  }
},[])   

    return(
        <>
    

<div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <button >G-NEWS</button>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Login to get all the news of the country and world very first by you.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="underline">Register Here!</Link>
          </p>
         
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Login to G-News</h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label for="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                autoFocus
                onChange={handleChange} name="email" value={userData.email || ""}
                className="px-4 py-2 transition duration-300 text-black border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label for="password" className="text-sm font-semibold text-gray-500">Password</label>
                {/* <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a> */}
              </div>
              <input
                type="password"
                id="password"
                onChange={handleChange} name="password" value={userData.password || ""}
                className="px-4 py-2 transition duration-300 text-black border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            
            <div>
              <button
                type="button"
                onClick={checkLogin} 
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  
  
  </>
    )
}