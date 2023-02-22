import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function FeaturedNews() {
  const [FeaturedNews, setFeaturedNews] = useState();
  const [run, setRun] = useState(true);
  useEffect(() => {
    getdata();
  }, []);

  const onMouseEnter = (e) => {
    // console.log("mouse enter");
    setRun(false);
}

const onMouseLeave = (e) => {
    // console.log("mouse leave");
    setRun(true);
}
  const getdata = async () => {
    axios
      .get(
        "/getAllNews",
        {
          method: "GET",
        }
      )
      .then((res) => {
        const fNews = res.data;
        setFeaturedNews(fNews);
      });
  };

  return (
    <>
      
      <div className="container mt-3 mb-3 " >
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center breaking-news bg-white">
              <div className="d-flex flex-row flex-grow-1 flex-fill justify-content-center bg-danger py-2 text-white px-1 news w-60 lg:w-40 ">
                <span className="d-flex align-items-center fw-semibold ">&nbsp;Breaking News</span>
              </div>
              <marquee
                className="news-scroll"
                behavior="scroll"
                direction="left"
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
              >
                {" "}
                {FeaturedNews ? FeaturedNews.map((news)=>{
                    return(
<>
                        <Link to={`newsDetail/${news._id}`} key={news._id} target="_blank" className="text-blue-700">
                          {news.Title +"   "} {"    "}
                         <span className="ml-3"> ||</span>{" "}
                                                  </Link>{" "}
                </>       

                    )
                }):null}
                
              </marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
