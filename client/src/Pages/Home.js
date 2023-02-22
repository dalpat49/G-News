import React, { useState, useEffect } from "react";
import Buttons from "../components/Buttons";
import Allnews from "../components/Allnews";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../Images/logo.png";
import axios from "axios";
import FeaturedNews from "../components/FeaturedNews";
import NewsSidebar from "../components/NewsSidebar";
import DownToUp from "../components/DownToUp";
import SearchBar from "../components/SearchBar";
import {useNavigate } from 'react-router-dom';

export default function Home() {

  const [news, getnews] = useState([]);
  const [loadNews,setLoadNews] = useState(6)

 
  const fetchPopular = async () => {
    axios.get(`/getAllNews`).then((res) => {
      const data = res.data;
      const newnews = data;
      getnews(data);
    });
  };
  useEffect(() => {
    fetchPopular();
  }, []);


  const loadMoreData = ()=>{
    setLoadNews(loadNews+5)
  }




  return (
    <>
      <DownToUp></DownToUp>

      <FeaturedNews></FeaturedNews>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h4 className="m-0 text-uppercase font-weight-bold">
                      Latest News
                    </h4>
                    
                  </div>
                </div>

                {news ? news.slice(0,loadNews).map((allnews) => {
                  return <Allnews allnews={allnews} key={allnews._id} />;
                }):
                <p>loading</p>
                }


              </div>
                    <button onClick={loadMoreData} className="text-white w-full h-10 mb-3  mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg--700 focus:outline-none dark:focus:ring-primary-800"> <i className="bi bi-arrow-down animate-bounce"></i> Load more</button>
            </div>
              <div className="col-lg-4">
                <NewsSidebar></NewsSidebar>
              </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-slate-300">
        <Footer />
      </div>
    </>
  );
}
