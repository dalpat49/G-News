import React from "react"
import logo from "../Images/logo.png"
import {useNavigate} from 'react-router-dom'

export default function NewsSectionByCategory({allnews}) {

    const navigate = useNavigate()
    const SendData =()=>{
        navigate("/NewsDetail",{state:{allnews}})
      }

    return(
      
               <div className="col-lg-6">
                            <div className="position-relative mb-3">
                                <img className="img-fluid w-100" src={logo} style={{objectFit: "cover"}}  alt="logo-img" />
                                <div className="bg-white border border-top-0 p-4">
                                    <div className="mb-2">
                                        <span className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                            >{allnews.category}</span>
                                        <span  className="text-body"><small>{allnews.date.slice(0,10)}</small></span>
                                    </div>
                                    <button  onClick={SendData} className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" >{allnews.Title.slice(0,35)}...</button>
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
                       
            
     
    )
}