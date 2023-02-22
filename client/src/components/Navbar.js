import React ,{useEffect , useState}from "react"
import {NavLink ,useNavigate,Outlet} from "react-router-dom"
import Buttons from "./Buttons";
import SearchBar from "./SearchBar";
import cookie from 'js-cookie'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export default function Navbar(props) {
const navigate = useNavigate()

const [loggedIn, setLoggedIn] = useState(false);
       
        

   useEffect(() => {
    if(localStorage.getItem("id"))
    {
     return setLoggedIn(true)
    }
 
   }, [])
   

    



       const logout =()=>{
        axios.get("/logout")
        .then((res)=>{
            const data = res.data;
            const {success} =  data
            if(success === true){
                cookie.remove('id')
                cookie.remove('email')
                localStorage.clear()
               setLoggedIn(false)
               toast.success("User Logout")

                navigate("/")

            }
            else
        {}
        })
       }

    return (
        <>
           {/* <!-- Topbar Start --> */}
     
    
      
        <div className="bg-white border-gray-200  dark:bg-gray-800 border-b ">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className="flex items-center text-yellow-600">
                    <img src={props.logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl text-center text-yellow-400 font-semibold whitespace-nowrap dark:text-white">G-News</span>
                </div>
                <div className="flex items-center lg:order-2">
                    {loggedIn && (
                        
                        <>
      <div className="relative border-b-4 border-transparent py-3  mr-3 " >
        <div className="flex justify-center items-center space-x-3 cursor-pointer">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
            <img src={localStorage.getItem("image") === undefined ? `.../Images/avatar.png` :  `/images/${localStorage.getItem("image")}` }  alt="" className="w-full h-full object-cover" />
          </div>
          <div className="font-semibold dark:text-white text-gray-900 text-lg">
            <div className="cursor-pointer">{localStorage.getItem("name")}</div>
          </div>
        
  </div>
  </div>


                    </>
                    )

                    }
                    {loggedIn ? 
                              <button onClick={logout} className="text-white dark:text-white border bg-green-400 border-green-700  hover:bg-green-800 focus:ring-4 focus:ring-green-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log Out</button> :
                              <NavLink to="/Login"  className="text-gray-800 dark:text-white border border-green-700  hover:bg-green-100 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</NavLink>

                        }
                 
                   
                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <NavLink to="/"   className="block py-2 pr-4 pl-3 text-blue-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/About"   className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-blue-500 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</NavLink>
                        </li>
               

                    </ul>
                </div>
                
            </div>
            <ToastContainer />
            </div>
            
            <SearchBar></SearchBar>
            {/* <Buttons></Buttons>     */}
           
            <Outlet />
      
      
  
   
   

    </>
    );
}

