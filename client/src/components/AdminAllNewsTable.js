import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

export default function AdminAllNewsTable() {
  //all hooks
  const [showModal, setShowModal] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);
//   for statuis buttons
  const Navigate =useNavigate();

  const [user, setUser] = useState({
    title: "",
    shortDesc: "",
    description: "",
    author: "",
    category: "",
    newsImage: "",
    selectedFile:null
  });
  const [alluser, setallUser] = useState([]);
  //   /Raw data of useer
  const [RawData, setRawData] = useState([]);

  //view User data hooks
  const [ViewShow, setViewShow] = useState(false);
  const handeleViewShow = () => {
    setViewShow(true);
  };
  const handeleViewClose = () => {
    setViewShow(false);
  };

  //edit user data hooks
  const [ViewEdit, setEditShow] = useState(false);
  const handeleEditShow = () => {
    setEditShow(true);
  };
  const handeleEditClose = () => {
    setEditShow(false);
  };
  const [EditUser, setEditUser] = useState([]);

  //DELETE user data hooks
  const [ViewDelete, setDeleteShow] = useState(false);
  const handeleDeleteShow = () => {
    setDeleteShow(true);
  };
  const handeleDeleteClose = () => {
    setDeleteShow(false);
  };

  //is for update and delete
  const [Id, setId] = useState("");

  //handle inputs
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };


  const handleImage = (e)=>{
    
    const file = e.target.files[0].name
    setUser({ ...user, selectedFile:e.target.files[0], newsImage: file});
    // document.getElementById("newsImage").value = file
  }




  //edit user data
  //send user data to server
  const newUserRegister = async (e) => {
    // e.preventDefault();
    
   

    const data = new FormData() 
    data.append('description',user.description)
    data.append('category',user.category)
    data.append('title',user.title)
    data.append('shortDesc',user.shortDesc)
    data.append('author',user.author)
    data.append('newsImage',user.selectedFile)

    axios.post("/admin/addNewNewsFromAdminPanel",data )
      .then((res) => {
        const newresult = res.data;
        const { success, msg } = newresult;
        if (success === true) {
          toast.success(msg);

          Navigate("/admin/allNews")
        } else {
          alert("data not");
          // window.location.reload;
          // window.location.reload()
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //reacts hooks
  useEffect(() => {
    getData();
  }, []);

  let editName, EditValue;
  const handleEditChange = (e) => {
    editName = e.target.name;
    EditValue = e.target.value;

    setEditUser({ ...EditUser, [editName]: EditValue });
  };
  const [dates, setNewdates] = useState([]);


  //get all data
  const getData = async () => {
    await axios.get("/admin/getAllNewsFromAdminPanel").then((datas) => {
      let allDatas = datas.data;
      setallUser(allDatas);

      setNewdates(allDatas);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios.get("/getAllCategories").then((res) => {
      let datas = res.data;
      setNewsCategory(datas);
    });
  };

  //edit user data
  const handleEdit = async () => {
    axios
      .put(`/admin/updateNewsFromAdminPanel/${Id}`, EditUser)
      .then((response) => {
        const result = response.data;
        const { success, msg } = result;
        if (success === true) {
          toast.success(msg);

          window.location.reload();
        } else {
          alert("dta updated");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delet user data
  const handleDelete = () => {
    const dltUrl = `/admin/dltNewsFromAdminPanel/${Id}`;
    axios
      .delete(dltUrl)
      .then((response) => {
        const result = response.data;
        const { success, msg } = result;
        if (success === true) {
          //   alert(msg);
          toast.success(msg);
          window.location.reload(false);
        } else {
          alert("error occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const search = () => {
    let input, filter, table, tr, td, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("allNewsTable");
    tr = document.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0 ];
      if (td) {
        txtValue = td.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const findByDate = () => {
    let newData = dates.filter((e) => {
      let createDate = e.date.slice(0, 10);

      return createDate >= fromDate && createDate <= toDate;
    });
    setallUser(newData);

  };

  useEffect(() => {
    findByDate();
  }, [setToDate]);

//   useEffect(() => {
//     changeNewsStatus();
    
//   }, []);

  const changeNewsStatus =()=>{
   
      axios.put(`/admin/changeNewsStatus/${Id}`)
      .then((response) => {
        const result = response.data;
        const { success, msg } = result;
        if (success === true) {
          toast.success(msg);
          if(msg ==="News unpublished" )
          {

              document.getElementById("statusBtn").classList.add("bg-rose-400")
          }
          else
          {
            document.getElementById("statusBtn").classList.add("bg-green-400")

          }
          window.location.reload();
        } else {
          alert("dta updated");
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  const [start,setStart] = useState(0)
  const [end,setEnd] = useState(5)

  useEffect(()=>{
    nextValues()
  },[])
 

  const nextValues = ()=>{
    
        setStart(start + 2) //2
        setEnd(end+ 2) // 4

  }
  const preValues = ()=>{

    
    
        setStart(start - 2  ) //2

        setEnd(end  - 2) // 4

  }
  
  return (
    <div>
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <h1 className="text-center italic font-mono">All news</h1>
        <div className="overflow-x-auto">
          <div className="min-w-screen   flex justify-center font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  data-modal-target="authentication-modal"
                  data-modal-toggle="authentication-modal"
                  className="text-white  bg-red-700 hover:bg-red-800  focus:outline-none  focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Add news
                </button>
                <br />
                <lable htmlFor="from" className="ml-3">
                  From
                </lable>
                <input
                  type="date"
                  className="rounded ml-1 text-black "
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="search news"
                />
                <lable htmlFor="from" className="ml-3">
                  To
                </lable>
                <input
                  type="date"
                  className="rounded ml-3  text-black"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="search news"
                />
                <button
                  type="button"
                  onClick={() => findByDate()}
                  className="rounded bg-blue-500 text-white w-20 h-10 ml-3 "
                >
                  Search
                </button>
                <input
                  type="search"
                  className="rounded-full ml-5"
                  placeholder="search Title "
                  id="search"
                  onKeyUp={search}
                />

                {showModal ? (
                  <>
                    <div
                      id="authentication-modal"
                      aria-hidden="true"
                      className="fixed top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                    >
                      <div className="relative top-14 left-32 w-full h-full  mx-auto max-w-2xl md:h-auto">
                        <form
                          action="/admin/addNewNewsFromAdminPanel"
                          method="POST"
                          className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                          encType='multipart/form-data'
                        >
                          <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Add news
                            </h3>
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                              data-modal-hide="authentication-modal"
                              onClick={() => setShowModal(false)}
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>

                          <div className="p-6 space-y-6">
                            <div className="grid grid-cols-3 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="category"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Category:
                                </label>
                                <select
                                  id="category"
                                  name="category"
                                  onChange={handleChange}
                                  
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option selected>Choose a category</option>
                                  {newsCategory.map((cat) => {
                                    return (
                                      <option  key={cat._id} value={cat.category_name}>
                                        {cat.category_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="title"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Title:
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  value={user.title || ""}
                                  onChange={handleChange}
                                  className="shadow-sm bg-gray-50 whitespace-normal border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="joe doe"
                                  required=""
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="shortDesc"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Short Description:
                                </label>
                                <textarea
                                  name="shortDesc"
                                  id="shortDesc"
                                  onChange={handleChange}
                                  value={user.shortDesc || ""}
                                  rows="1"
                                  cols="2"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required=""
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="description"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Description:
                                </label>
                                <textarea
                                  name="description"
                                  id="description"
                                  onChange={handleChange}
                                  value={user.description || ""}
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  required=""
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="author"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Author
                                </label>
                                <input
                                  type="text"
                                  name="author"
                                  id="author"
                                  onChange={handleChange}
                                  value={user.author || ""}
                                  autoComplete="off"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                                                <label
                                                                    htmlFor="newsImage"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    image
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    filename={user.newsImage}
                                                                    id="Image"
                                                                    onChange={handleImage}
                                                                      defaultValue={user.newsImage || ""}
                                                                    // autoComplete="off"
                                                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                />
                                                            </div>

                              <div className=" items-center col-span-3 mt-6  space-x-2  rounded-b dark:border-gray-600">
                                <button
                                  type="submit"
                                  onClick={newUserRegister}
                                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  Add news
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="bg-white shadow-md rounded my-6">
                  <table
                    className="min-w-max w-full table-auto table tsble-responsive"
                    id="allNewsTable"
                  >
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">Title</th>
                        <th className="py-3 px-6 text-center">Category</th>
                        <th className="py-3 px-6 text-center">Date</th>
                        <th className="py-3 px-6 text-center">Author </th>
                        <th className="py-3 px-6 text-center">Likes </th>
                        <th className="py-3 px-6 text-center">Dislikes</th>
                        <th className="py-3 px-6 text-center">Status </th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {alluser.map((data) => {
                        return (
                            <>
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={data._id}
                          >
                            <td className="py-3 px-6 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                <span id={data._id} data-tooltip-content={data.Title} className="font-medium">
                                  {data.Title.slice(0, 20)}...

                                </span>
                                
                            <Tooltip  anchorId={data._id} place="top" />
</div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center  justify-center">
                                <span>{data.category}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center  justify-center">
                                <span>{data.date.slice(0, 10)}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center  justify-center">
                                <span>{data.author_name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center  justify-center">
                                <span>{data.Likes || 0}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center  justify-center">
                                <span>{data.dislikes || 0}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center  justify-center">
                                <button type="button"  onClick={() =>
                                    changeNewsStatus(
                                      setId(data._id)
                                    ) }
                                    
                                    className="px-4 py-1 bg-green-400 rounded fw-bold hover:bg-green-600  text-white " id="statusBtn">{data.status || "Published"}
                                 
                                     </button>
                              </div>
                            </td>

                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handeleViewShow(setRawData(data))
                                  }
                                >
                                  {" "}
                                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handeleEditShow(
                                      setRawData(data),
                                      setId(data._id)
                                    )
                                  }
                                >
                                  {" "}
                                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handeleDeleteShow(
                                      setRawData(data),
                                      setId(data._id)
                                    )
                                  }
                                >
                                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </div>
                                </button>
                              </div>
                            </td>
                          </tr>
</>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

<div>
                <button
                // onClick = {preValues}
                  className="inline-flex items-center px-4 py-2 mt-1 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Previous
                </button>
                <button
                    // onClick={nextValues}
                  className="inline-flex items-center  px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                </div>
              </div>
            </div>
          </div>

          {/* //View user data */}
          {ViewShow ? (
            <>
              <div
                id="authentication-modal"
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
              >
                <div className="relative top-36 left-32 w-full h-full  mx-auto max-w-2xl md:h-auto">
                  <form
                    method="POST"
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        User Details
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={handeleViewClose}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={RawData.Title}
                            onChange={handleChange}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="joe doe"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            category:
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={RawData.category}
                            onChange={handleChange}
                            readOnly
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="joe doe"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="author"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            author name:
                          </label>
                          <input
                            type="text"
                            name="author"
                            id="author"
                            readOnly
                            onChange={handleChange}
                            value={RawData.author_name || ""}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="shiv@company.com"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="shortDesc"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Short description:
                          </label>
                          <textarea
                            type="text"
                            name="shortDesc"
                            id="shortDesc"
                            readOnly
                            onChange={handleChange}
                            value={RawData.short_description || ""}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="shiv@company.com"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description:
                          </label>
                          <textarea
                            type="text"
                            name="description"
                            id="description"
                            readOnly
                            onChange={handleChange}
                            value={RawData.description || ""}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="shiv@company.com"
                            required=""
                          />
                        </div>

                        <div className=" items-center col-span-3 mt-6  space-x-2  rounded-b dark:border-gray-600">
                          <button
                            type="button"
                            onClick={handeleViewClose}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : null}

          {/* /// edit user data modal    */}
          {ViewEdit ? (
            <>
              <div
                id="authentication-modal"
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
              >
                <div className="relative top-36 left-32 w-full h-full  mx-auto max-w-2xl md:h-auto">
                  <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Nes Details
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={handeleEditClose}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Category:
                          </label>
                          <select
                            id="category"
                            name="category"
                            onChange={handleEditChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected>Choose a category</option>
                            {newsCategory.map((cat) => {
                              return (
                                <option key={cat._id} value={cat.category_name}>
                                  {cat.category_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={RawData.Title || ""}
                            onChange={handleEditChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="shiv@company.com"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="shortDesc"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Short description:
                          </label>
                          <input
                            type="text"
                            name="shortDesc"
                            id="shortDesc"
                            defaultValue={RawData.short_description || ""}
                            onChange={handleEditChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123456789"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description:
                          </label>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            defaultValue={RawData.description || ""}
                            onChange={handleEditChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123456789"
                            required=""
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="author"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Author name:
                          </label>
                          <input
                            type="text"
                            name="author"
                            id="author"
                            defaultValue={RawData.author_name || ""}
                            onChange={handleEditChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123456789"
                            required=""
                          />
                        </div>

                        <div className=" items-center col-span-3 mt-6  space-x-2  rounded-b dark:border-gray-600">
                          <button
                            type="submit"
                            onClick={handleEdit}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update News
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : null}

          {/* //user delet modal */}
          {ViewDelete ? (
            <>
              <div
                tabIndex="-1"
                className="fixed  top-0 left-0 right-0 flex justify-center item-center place-self-center z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
              >
                <div className="relative top-56 w-full h-full max-w-md md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                      onClick={handeleDeleteClose}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this user?
                      </h3>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        onClick={handleDelete}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        onClick={handeleDeleteClose}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
}
