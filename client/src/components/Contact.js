import React ,{useState} from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate()
       const [message,setmessage]=  useState({
        name:"",
        email:"",
        message:""
       })
       let name,value;

       const handleChange =(e)=>{
        name = e.target.name;
        value= e.target.value;

        setmessage({...message , [name]:value})
       }
       const sendMessage=()=>{
        axios.post("https://g-news-qh78.onrender.com/getComplaintFromUser",message)
        .then((res)=>{
          if(localStorage.getItem("id")){
            const result = res.data;
            const {success,msg} = result;
            if(success === true){
                toast.success(msg)
                setmessage({
                    name:"",
                    email:"",
                    message:""
                })
            }
          }
            else{
              navigate("/Login")
                toast.error("Message not sent.")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
       }



  return (
    <>
      <div
        className="flex justify-center items-center w-screen  "
        style={{
          background: "hsla(0, 0%, 100%, 0.55)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div className="flex">
              <h1 className="fw-semibold uppercase text-5xl">
                Send us a <br /> message
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                value={ localStorage.getItem("name") || message.name }
                onChange={handleChange}
                placeholder="Name*"
                required
              />

              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={localStorage.getItem("email") || message.email }
                onChange={handleChange}
                placeholder="Email*"
                required
              />
            </div>
            <div className="my-4">
              <textarea
              name="message"
              value={message.message || ''}
                onChange={handleChange}
                placeholder="Message*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
              onClick={sendMessage}
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-2 hover:bg-blue-500 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold text-white uppercase text-4xl my-4">
                Drop in our office
              </h1>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                tincidunt arcu diam, eu feugiat felis fermentum id. Curabitur
                vitae nibh viverra, auctor turpis sed, scelerisque ex.
              </p>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-map-marker-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl text-white">Main Office</h2>
                  <p className="text-gray-400">
                   T-3006,Orbit mall,civil lines,Jaipur,Rajasthan
                  </p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl text-white">Call Us</h2>
                  <p className="text-gray-400">+91 6367667129</p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <a
                  href="https://www.facebook.com/dalpat singh rathore"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-facebook-f text-blue-900" />
                </a>
                <a
                  href="https://wa.me/916367667129"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="bi bi-whatsapp text-green-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <ToastContainer />
    </>
  );
}
