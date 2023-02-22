import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {   Link,useNavigate } from "react-router-dom";

export default function NewsSidebar({ allnews }) {
  const [input, setinput] = useState({
    email: "",
  });
  // const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const [sideNews, setSideNews] = useState("");

  // console.log(location.state.allnews.Title)
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setinput({ ...input, [name]: value });
  };

  const Subscribed = async (e) => {
    e.preventDefault();
    axios
      .post("/newsLetterSubscription", input)
      .then((res) => {
        if(localStorage.getItem("id")){
        let result = res.data;
        const { success, msg } = result;
        if (success === true) {
          toast.success(msg);
        } else {
          toast.error("some error occured");
        }}
        else{
          navigate("/Login")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    getData();
    
  }, []);

  const getData = async () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=fe034bcdf85743ff848364c0f74e64ee",
        {
          method: "GET",
        }
      )
      .then((res) => {
        const allnewss = res.data;
        setSideNews(allnewss.articles);
      });
  };

  



  return (
    <>
      <div className="mb-3">
        <div className="section-title mb-0">
          <h4 className="m-0 text-uppercase font-weight-bold">Live News</h4>
        </div>
        <div className="bg-white text-center border border-top-0 p-3">
          <div>
            <iframe
            width="320" height="240"
              src="https://www.youtube.com/embed/Nq2wYlWFucg?autoplay=1"
           title="youtube video"
              frameBorder="0"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>


      {/* //whether api */}
  


      {/* <!-- Popular News Start --> */}
      <div className="mb-3">
        <div className="section-title mb-0">
          <h4 className="m-0 text-uppercase font-weight-bold">Tranding News</h4>
        </div>
        <div className="bg-white border border-top-0 p-3">
          {sideNews ? (
            sideNews.slice(0, 5).map((news) => {
              return (
                <div
                  className="d-flex align-items-center bg-white mb-3"
                  style={{ height: "110px" }}
                  key={news.title}
                >
                  <img className="w-20 h-20" src={news.urlToImage || logo} alt="" />
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <Link
                        to={news.url}
                        target="_blank"
                        className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                        href=""
                      >
                        Read News
                      </Link>
                    </div>
                    <Link
                      to={news.url}
                      className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                      href=""
                    >
                      {news.title.slice(0, 40)}...
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>no data</p>
          )}
        </div>
      </div>
      {/* <!-- Popular News End --> */}

      <div className="mb-3">
        <div className="section-title mb-0">
          <h4 className="m-0 text-uppercase font-weight-bold">Newsletter</h4>
        </div>
        <div className="bg-white text-center border border-top-0 p-3">
          <p>
            Subscribe to our newsLetter so that you can get the latest at very
            first.
          </p>
          <div className="input-group mb-2" style={{ width: " 100%" }}>
            <input
              type="email"
              name="email"
              id="email"
              value={localStorage.getItem("email") || input.email}
              onChange={handleChange}
              className="form-control form-control-lg text-md"
              placeholder="Your Email"
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary font-weight-bold px-3"
                onClick={Subscribed}
              >
                Subscribe
              </button>
            </div>
          </div>
          <small></small>
        </div>
      </div>

      <div className="mb-3">
        <div className="section-title mb-0">
          <h4 className="m-0 text-uppercase font-weight-bold">Tags</h4>
        </div>
        <div className="bg-white border border-top-0 p-3">
          <div className="d-flex flex-wrap m-n1">
            <button className="btn btn-sm btn-outline-secondary m-1">
              Politics
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Business
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Corporate
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Business
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Health
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Education
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Science
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Business
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Foods
            </button>
            <button className="btn btn-sm btn-outline-secondary m-1">
              Travel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
