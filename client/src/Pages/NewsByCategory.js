import React, { useState, useEffect } from "react";
import Allnews from "../components/Allnews";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Buttons from "../components/Buttons";
import DownToUp from "../components/DownToUp";

import logo from "../Images/logo.png";
import axios from "axios";
import FeaturedNews from "../components/FeaturedNews";
import NewsSidebar from "../components/NewsSidebar";
import NewsSectionByCategory from "../components/NewsSectionByCategory"
import {useLocation,useParams,useNavigate,Link} from 'react-router-dom'
import SearchBar from "../components/SearchBar";

export default function NewsByCategory (){
    const navigate = useNavigate();
    const location = useLocation()
    const params = useParams()
    // console.log(params.id)
    const [news,setnews]= useState([]);

    // console.log(location.state)

    useEffect(()=>{
        
            window.scrollTo(0, 0)
       
    const getdata =()=>{
        axios.get(`https://g-news-qh78.onrender.com/getAllNews`)
        .then((res)=>{
            // console.log(res.data.getNewsByCategory)
            console.log(res.data)
            const allNews = res.data.filter( e=>{
              return e.category === params.id} )
                
            setnews(allNews)
// window.location.reload()
            // window.location.reload()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
                   
    getdata()
        
        
    },[params.id])







    // console.log(news)
let id;
    const SendData =()=>{
        navigate(`/NewsDetail/${id}`,)
      }

    return(
        <>
{/* <Navbar logo={logo} /> */}
{/* <SearchBar></SearchBar> */}
{/* <Buttons></Buttons> */}
<DownToUp></DownToUp>


<div className="container-fluid mt-5">
  <div className="container">   
    <div className="row">
      <div className="col-lg-8">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h4 className="m-0 text-uppercase font-weight-bold">
                News By {params.id}
              </h4>
              
            </div>
          </div>

          {news ? news.map((allnews) => {
           
            return(
                <>
           <div className="col-lg-6" key={allnews._id}>  
           <div className="position-relative mb-3" >
               <img className="img-fluid w-100" src={`/images/${allnews.image}`} style={{objectFit: "cover"}} alt="" />
               <div className="bg-white border border-top-0 p-4">
                   <div className="mb-2">
                       <button className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                          >{allnews.category}</button>
                       <span  className="text-body"><small>{allnews.date}</small></span>
                   </div>
                   <Link to={`/NewsDetail/${allnews._id}`} className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" >{allnews.Title.slice(0,35)}...</Link>
                   <p className="m-0">{allnews.short_description.slice(0,100)}...</p>
               </div>
               <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                   <div className="d-flex align-items-center">
                       <img className="rounded-circle mr-2" src={logo} width="25" height="25" alt="" />
                       <small>{allnews.author_name}</small>
                   </div>
                   <div className="d-flex align-items-center">
                       <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                       <small className="ml-3"><i className="far fa-comment mr-2"></i>{allnews.comments.length}</small>
                   </div>
               </div>
           </div>
       </div>
       </>
            )
          }):<p>no data to show</p>}


        </div>
      </div>
        <div className="col-lg-4">
          <NewsSidebar></NewsSidebar>
        </div>
    </div>
  </div>
</div>
<div className="container-fluid bg-slate-300">
  {/* <Footer /> */}
</div>
</>
    )
}