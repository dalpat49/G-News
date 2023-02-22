import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

export default function SearchedResult() {
  const params = useParams();
  const [allnews, setSearch] = useState("");
  useEffect(() => {
    getSearchResult();
  }, [params.id]);

//   console.log(params.id);
  const getSearchResult = () => {
    axios.get("/getAllNews").then((res) => {
      const data = res.data;
    //   console.log(data);
      const allnews = data.filter((e) => {
        if (
          e.Title.toLowerCase().includes(params.id) ||
          e.short_description.toLowerCase().includes(params.id) ||
          e.description.toLowerCase().includes(params.id) ||
          e.category.toLowerCase().includes(params.id) ||
          e.author_name.toLowerCase().includes(params.id)
        ) {
          return e;
        }
      });
      setSearch(allnews);
    });
  };
    
  return (
    <>
      <h4 className="text-sm">"{allnews.length}"<span className="text-blue-400 text-md"> result for</span> "{params.id}"<span className="text-blue-400"> by G-News</span></h4>
        {allnews ? (
            allnews.map((allnews) => {
                return (
                    <>
                <div className="col-lg-6">
              

              <div className="position-relative mb-3">
                <img
                  className="img-fluid w-100"
                  src={`/images/${allnews.image}`}
                  style={{ objectFit: "cover" }}
                  alt=""
                />
                <div className="bg-white border border-top-0 p-4">
                  <div className="mb-2">
                    <button
                      className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                     
                    >
                      {allnews.category}
                    </button>
                    <button className="text-body">
                      <small>{allnews.date.slice(0,10)}</small>
                    </button>
                  </div>
                  <Link to={`/NewsDetail/${allnews._id}`}   className="h4 d-block mb-3 text-secondary text-uppercase text-left font-weight-bold">
                    {allnews.Title.slice(0, 35)}...
                  </Link>
                  <p className="m-0">
                    {allnews.short_description.slice(0, 100)}...
                  </p>
                </div>
                <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                  <div className="d-flex align-items-center">
                    
                    <small>{allnews.author_name}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="ml-3">
                      <i className="far fa-comment mr-2"></i>
                      {allnews.comments.length}
                    </small>
                  </div>
                </div>
              </div>
      </div>
              </>
            );
          })
        ) : (
          <p>No data found</p>
        )}
    </>
  );
}
