import { logRoles } from "@testing-library/react";
import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios'
import logo from '../Images/logo.png'

export default function Allnews({ allnews }) {
  const [RawData, setRawData] = useState([]);
  const navigate = useNavigate()
  const [viewNews, setviewNews] = useState(false);
  const viewNewsShow = () => {
    setviewNews(true);
  };
  const viewNewsClose = () => {
    setviewNews(false);
  };

  const [postCommentView, setpostCommentView] = useState(false);
  const viewPostComment = () => {
    setpostCommentView(true);
  };
  const viewPostCommentClose = () => {
    setpostCommentView(false);
  };

  const [shareBtn, setshareBtn] = useState(false);

  const viewShareButton = () => {
    setshareBtn(true);
  };

  const viewShareButtonClose = () => {
    setshareBtn(false);
  };

  const [comments, setcomment] = useState({
    comment: "",
  });
  const [commentss, setcommentss] = useState("");
  const [Id, setId] = useState('');
  const [count, setcount] = useState()

  const handleLike = () => {
   setcount(count+1)
   console.log(count)
    
  };
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setcomment({ ...comments, [name]: value });
    setcommentss(value);
  };


  const [apiData ,setapiData] = useState()



  return (


  <>
                        <div className="col-lg-6">
                            <div className="position-relative mb-3">
                                <img className="w-100 h-90 " src={`/images/${allnews.image}` || {logo}} style={{objectFit: "cover"}} />
                                <div className="bg-white border border-top-0 p-4">
                                    <div className="mb-2">
                                        <button className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                            href="">{allnews.category}</button>
                                        <span  className="text-body"><small>{allnews.date.slice(0,10)}</small></span>
                                    </div>
                                    <Link to={`/NewsDetail/${allnews._id}`} className="h4 d-block mb-3 text-secondary text-uppercase text-left font-weight-bold" >{allnews.Title.slice(0,35)}...</Link>
                                    <p className="m-0">{allnews.short_description.slice(0,100)}...</p>
                                </div>
                                <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                                    <div className="d-flex align-items-center">
                                        <small>{allnews.author_name}</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <small className="ml-3"><i className="far fa-comment mr-2"></i>{allnews.comments.length}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                     
                    
                        
                       
                     </>
                       
                       
                   
 
 
  );
}
