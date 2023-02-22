import React, { useState ,useEffect} from "react";
import {  Link ,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewsDetail() {
    const params = useParams()
    const [news,setNews] = useState([])
    //user input types
    const [comment, setcomment] = useState({
        personName: "",
        comments: "",
    });
    //   console.log(location.state.allnews)
    
    const navigate = useNavigate();

   
    const [Id, setId] = useState("");

    //    (each person in )
    //   console.log(location.state.allnews.comments)

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setcomment({ ...comment, [name]: value });
    };
   

    const sendCommentToServer = (e) => {
        e.preventDefault();
        if(!localStorage.getItem("id"))
        {
            navigate("/Login")
        }
        else{
            
            axios
                .post(`https://g-news-qh78.onrender.com/getCommentByUser/${params.id}`, comment)
                .then((response) => {
                    const result = response.data;
                    const { success, msg } = result;
                    if (success === true) {
                        toast.success(msg);
                    } else {
                        alert("dta updated");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
  window.scrollTo(0, 0)
}, [])

    useEffect(() => {
  getData();
}, [params.id])


// console.log(params.id)


    const getData =()=>{
        axios.get("https://g-news-qh78.onrender.com/getAllNews").then((res) => {
            const data = res.data;
            const newnews = data.filter((e)=>{
                if(e._id === params.id)
                {
                   return e
                }
            })
            setNews(newnews);
          }).catch((err)=>{
            console.log(err)
          })

    }

    const serverLikes = news.map((e)=>{
        let likes = e.Likes
          return likes
})

    const [likeCount, setLikeCount] = useState(serverLikes)
    console.log(likeCount)
    const [dislikeCount, setDislikeCount] = useState(
        news.dislike
    );
       
    let Likebtn = document.getElementById("likeBtn");
    const handleLike = (e) => {
        // e.preventDefault();
        console.log(Id);
        setLikeCount(likeCount + 1)


        axios.put(`https://g-news-qh78.onrender.com/updateLikesForNews/${Id}`, { likes: likeCount })
            .then((res) => {
                const result = res.data;
                const { success, msg } = result;
                if (success === true) {
                    toast.success(msg)
                    document.getElementById("likeBtn").setAttribute("disabled", "true");
                    document.getElementById("disLikeBtn").setAttribute("disabled", "true");


                }
                else {
                    toast.error("error occured")
                }
            })
            .catch((err) => {
                console.log(err)
            })

        Likebtn.classList.add("bg-blue-800");
        Likebtn.classList.add("text-white");
    }

    let disLikebtn = document.getElementById("disLikeBtn");

    const handleDisLike = (e) => {
        setDislikeCount(dislikeCount + 1);
        axios.put(`https://g-news-qh78.onrender.com/updateDislikesForNews/${Id}`, { dislike: dislikeCount })
            .then((res) => {
                const result = res.data;
                const { success, msg } = result;
                if (success === true) {
                    toast.success(msg)
                    document.getElementById("likeBtn").disabled = true;
                    document.getElementById("disLikeBtn").disabled =true;


                }
                else {
                    toast.error("error occured")
                }
            })
            .catch((err) => {
                console.log(err)
            })

        disLikebtn.classList.add("bg-red-800");
        disLikebtn.classList.add("text-white");
        // document.getElementById("disLikeBtn").disabled = true;
        // document.getElementById("likeBtn").disabled = true;
    };

    


    return (
        <>
        {news ? news.map((news)=>{
            return(
<>

                <div className="position-relative mb-3">
                    {/* <img
                        className="img-fluid w-100"
                        src=""
                        style={{ objectFit: "cover;" }}
                    /> */}
                    <div className="bg-white border border-top-0 p-4">
                        <div className="mb-3">
                            <button
                                className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                            
                            >
                                {news.category}
                            </button>
                            <span className="text-body" >
                                {news.date.slice(0,10)}
                            </span>
                        </div>
                        <h1 className="mb-3 text-secondary  antialiased whitespace-pre-line font-medium">
                            {news.Title.replace(/\s+/g, ' ')}
                        </h1>
                        <p className="text-justify indent-12">{news.description}</p>
                        <p></p>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap bg-white border border-top-0 p-4">
                        <div className="d-flex flex-wrap align-items-center">
                           
                            <span>Published By {news.author_name}</span>
                            <button
                                type="button"
                               
                                id="likeBtn"
                                className="text-green-400 hover:text-white bg-gray-300 border border-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ml-2 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 "
                            >
                                <i className="bi bi-hand-thumbs-up"></i> Like {likeCount}{" "}
                            </button>
                            <button
                                type="button"
                                onClick={() => {handleDisLike(setId(news._id))}}
                                id="disLikeBtn"
                                className="text-red-400  hover:text-white bg-gray-300 border  border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2  "
                            >
                                <i className="bi bi-hand-thumbs-down"></i> Disike {dislikeCount}
                            </button>
                        </div>
                        <div className="d-flex align-items-center text-xl">
                            <Link to="https://instagram.com" className="ml-3 text-rose-400 ">
                                <i className="bi bi-instagram text-red hover:text-[#E1306C] cursor-pointer "></i>
                            </Link>
                            <Link
                                to="https://web.whatsapp.com/"
                                className="ml-3 text-green-300"
                            >
                                <i className="bi bi-whatsapp hover:text-[#25D366] cursor-pointer"></i>
                            </Link>
                            <Link to="https://twitter.com" className="ml-3 text-blue-300">
                                <i className="bi bi-twitter  hover:text-[#1DA1F2] cursor-pointer"></i>
                            </Link>
    
                            <span className="ml-3">
                                <i className="fa fa-comment mr-2"></i>
                                {news.comments.length}
                            </span>
                        </div>
                    </div>
                </div>
    
                <div className="mb-3">
                    <div className="section-title mb-0">
                        <h4 className="m-0 text-uppercase font-weight-bold">
                            {news.comments.length} Comments
                        </h4>
                    </div>
    
                    {news.comments.slice(0, 5).map((e) => {
                        return (
                            <div className="bg-white border border-top-0 pt-4 pl-10">
                                <div className="media mb-4">
                                    <div className="media-body">
                                        <h6>
                                            <span className="text-secondary font-weight-bold" href="">
                                                {e.PersonName}
                                            </span>{" "}
                                        </h6>
    
                                        <p>{e.comment}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* <!-- Comment Form Start --> */}
                    <div className="mb-3 mt-3">
                        <div className="section-title mb-0">
                            <h4 className="m-0 text-uppercase font-weight-bold">
                                Leave a comment
                            </h4>
                        </div>
                        <div className="bg-white border border-top-0 p-4">
                            <form method="POST">
                                <div className="form-row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="personName">Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="personName"
                                                name="personName"
                                                value={localStorage.getItem("name") || comment.personName}
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="comments">Comment *</label>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        cols="30"
                                        rows="5"
                                        className="form-control"
                                        value={comment.comments || ""}
                                        onChange={handleInput}
                                    ></textarea>
                                </div>
                                <div className="form-group mb-0">
                                    <button
                                        type="submit"
                                        onClick={sendCommentToServer}
                                        className="btn btn-primary font-weight-semi-bold py-2 px-3"
                                    >
                                        Leave a comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    
                <ToastContainer />
                </>
            )
        }):<p>no data</p>}
        </>

    );
}
