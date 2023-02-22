import React, { useState ,useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'

export default function Footer() {

    //navigate 

  //react hooks

  const [footerNews, setFooterNews] = useState('');
const [category,setcategory] =useState([])





  useEffect(() => {
    getCategories();
    criketNews();
  }, []);


  const getCategories = () => {
        axios.get("https://g-news-qh78.onrender.com/getAllCategories").then((res) => {
      let datas = res.data;
      setcategory(datas);
    });
  };

  
  const criketNews = ()=>{
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=fe034bcdf85743ff848364c0f74e64ee`)
    .then((res)=>{
        // console.log(res.data)
        const newss = res.data;
        setFooterNews(newss.articles)
    })
}
// const sendData = () => {
//   navigate(`/getAllNewsByCategory/${id}`);
// };
  return (
    <div>
   
       <div className="container-fluid bg-dark pt-5 px-sm-3 px-md-5 mt-5">
        <div className="row py-4">
            <div className="col-lg-3 col-md-6 mb-5">
                <h5 className="mb-4 text-white text-uppercase font-weight-bold">Get In Touch</h5>
                <p className="font-weight-medium"><i className="fa fa-map-marker-alt mr-2"></i>T-3006,Orbit Mall,Jaipur</p>
                <p className="font-weight-medium"><i className="fa fa-phone-alt mr-2"></i>+91 63667667129</p>
                <p className="font-weight-medium"><i className="fa fa-envelope mr-2"></i>G-News.onrender.com</p>
                <h6 className="mt-4 mb-3 text-white text-uppercase font-weight-bold">Follow Us</h6>
                <div className="d-flex justify-content-start">
                    <Link  className="btn btn-lg btn-secondary btn-lg-square mr-2" to="https://twitter.com"><i className="bi bi-twitter"></i></Link>
                    <Link className="btn btn-lg btn-secondary btn-lg-square mr-2" to="https://facebook.com"><i className="bi bi-facebook"></i></Link>
                    <Link className="btn btn-lg btn-secondary btn-lg-square mr-2" to="https://instagram.com"><i className="bi bi-instagram"></i></Link>
                    <Link className="btn btn-lg btn-secondary btn-lg-square" to="https://youtube.com"><i className="bi bi-youtube"></i></Link>
                </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-5">
                <h5 className="mb-4 text-white text-uppercase font-weight-bold">Categories</h5>
                <div className="m-n1">
                  {category  ?  category.map((cat)=>{
                    
                    <div key={cat._id}>
                      <Link to={`/getAllNewsByCategory/${cat.category_name}`} 
                     className="btn btn-sm btn-secondary m-1">{cat.category_name}</Link>
                     </div>
                    
                  }):null}
                   
                </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
                <h5 className="mb-4 text-white text-uppercase font-weight-bold">Popular News</h5>
                {footerNews ? footerNews.slice(0,3).map((news)=>{
                  return(

                <div className="mb-3" key={news.title}>
                    <div className="mb-2">
                        <Link to={news.url} className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2">Read News</Link>
                        <span className="text-body" ><small>{news.publishedAt.slice(0,10)}</small></span>
                    </div>
                    <Link to={news.url} className="small text-body text-uppercase font-weight-medium" >{news.title.slice(0,50)}...</Link>
                </div>
                  )

                }):<p>no news</p>}
           
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
                <h5 className="mb-4 text-white text-uppercase font-weight-bold">Flickr Photos</h5>
                <div className="row">
                    {footerNews ? footerNews.slice(0,6).map((news)=>{
                      return (
                        <div className="col-5 mb-3" key={news.urlToImage}>

                        <img className="w-26 h-26" src={news.urlToImage || logo} alt="" />
                    </div>
                      )
                    }):<p>no data</p>}
                   
                </div>
            </div>
        </div>
        <div className="container-fluid w-full py-4 px-sm-3 px-md-5 bg-[#111111]" >
        <p className="m-0 text-center" href="G-News.onrender.com">&copy; <a href="#">G-News.com</a>. All Rights Reserved. 
		
		Design by <a href="dalpat49.github.io/DalpatPortfolio/" >Dalpat singh rathore</a> 
  </p>
    </div>
    </div>
   
    </div>
    
  );
}
