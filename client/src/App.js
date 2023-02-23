import React ,{useEffect,useState}from 'react'
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Buttons from "./components/Buttons";
import Footer from "./components/Footer";
import { HashRouter, Routes, Route,useNavigate, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import AdminHome from "./Pages/AdminHome";
import AdminUsers from "./Pages/AdminUsers";
import AdminNewsCategrory from "./Pages/AdminNewsCategrory";
import AdminAllNews from "./Pages/AdminAllNews";
import NewsDetailPage from "./Pages/NewsDetailPage";
import AdminProfile from "./Pages/AdminProfile";
import NewsByCategory from "./Pages/NewsByCategory";
import About from "./Pages/About";
import ContactPage from "./Pages/ContactPage";
import SearchResultPage from "./Pages/SearchResultPage";
import Login from "./components/Login";
import cookie from 'js-cookie'
import AdminSidebar from './components/AdminSidebar'
import logo from "./Images/logo.png"




function App() {
  const navigate = useNavigate()
  const [isUserLogin,setUserLogin] = useState(false)
  const [isadminLogin,setadminLogin] = useState(false)

  const ifLogin =()=>{
    return  cookie.get("Id") === true
   }



useEffect(()=>{
  if(localStorage.getItem("role","user")){
    // setUserLogin(true)
    navigate("/")
  }
  else if(localStorage.getItem("role","SpeacialSuperRoleForAdmin"))
  {
    // setadminLogin(true)
    navigate("/admin/adminHome")
  }


},[])   

useEffect(()=>{
  if(!localStorage.getItem("AdminId")){
    navigate("/")
  }
  else
  {
    navigate("admin/adminHome")
  }

},[])


// },[])   

  return (
    <>
    <HashRouter>
      <main>
   
  
    {/* user routes */}
   
    <Route exact  path="Login" element={<Login />}></Route>
    <Route exact  path="register" element={<Register />}></Route>
      <Route exact  path="/"  element={<Navbar logo={logo}></Navbar>}>
        
    <Route exact  path="/"  element={<Home></Home>}></Route>
    <Route exact  path="/newsDetail/:id"element={<NewsDetailPage></NewsDetailPage>}></Route>
    <Route exact  path="/getAllNewsByCategory/:id" element={<NewsByCategory></NewsByCategory>}></Route>
    <Route exact  path="/about" element={<About></About>}></Route>
    <Route exact  path="/contact" element={<ContactPage></ContactPage>}></Route>
    <Route exact  path="/allSearchResultFor/:id" element={<SearchResultPage></SearchResultPage>}></Route>

    </Route>
   

        <Route exact  path="/admin/adminHome" element={<AdminHome></AdminHome>} />
        <Route exact  path="/admin/users" element={<AdminUsers ></AdminUsers>} ></Route>
        <Route exact  path="/admin/newsCategory" element={<AdminNewsCategrory />}/>
         <Route exact  path="/admin/allNews" element={<AdminAllNews />} />
         <Route exact  path="/admin/adminProfile" element={<AdminProfile />} />
       
       
      


      </main>
      </HashRouter>
    </>
  );
}


export default App;
