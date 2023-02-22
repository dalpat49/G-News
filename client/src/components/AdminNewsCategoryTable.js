import React,{ useState, useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminNewsCategoryTable() {

  
    //all hooks
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({
        catName:'',
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

    //edit user data
    //send user data to server
    const newUserRegister = async (e) => {
        e.preventDefault();
        const data = await axios
            .post("/admin/addNewNewsCategory", user)
            .then((res) => {
                console.log(res.data);
                const newresult = res.data;
                const { success, msg } = newresult;
                if (success == true) {
                    toast.success(msg);
                    window.location.reload();

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

        setEditUser({ ...EditUser, [editName]:EditValue });
    };
    //get all data
    const getData = async () => {
        await axios.get("/admin/getAllTheNewsCategories").then((datas) => {
            let allDatas = datas.data.getAllNewsCat;
            setallUser(allDatas);
        });
    };

    //edit user data
    const handleEdit = async () => {
        axios
            .put(`/admin/EditCategoryFromAdminPanel/${Id}`, EditUser)
            .then((response) => {
                const result = response.data;
                const { success, msg } = result;
                if (success == true) {
                    toast.success(msg)

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
        const dltUrl = `/admin/dltCategoryFromAdminPanel/${Id}`;
        axios
            .delete(dltUrl)
            .then((response) => {
                const result = response.data;
                const { success, msg } = result;
                if (success == true) {
                    toast.success(msg)
                    window.location.reload(false);
                } else {
                    alert("data  not updated");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleStatus =async()=>{
    
            const statusUrl =  `/admin/changeStatusOfCategory/${Id}`;
            console.log(statusUrl)
            await axios.put(statusUrl)
            .then((response) => {
                const result = response.data;
                const { success, msg } = result;
                if (success == true) {
                    toast.success(msg)
                } else {
                    alert("data  not updated");
                }
            })
            .catch((err) => {
                console.log(err);
            });

        
    }
    const search = () => {
        let input, filter, table, tr, td, txtValue;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("allNewsTable");
        tr = document.getElementsByTagName("tr");
    
        for (let i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
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

    return (
        <div>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <h1 className="text-center italic font-mono">All Categories</h1>

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
                                    Add new category
                                </button>
                                <input
                  type="search"
                  className="rounded-full ml-5  float-right"
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
                                            <div className="relative top-20 left-32 w-full h-full  mx-auto max-w-2xl md:h-auto">
                                                <form
                                                    action="/admin/addNewNewsCategory"
                                                    method="POST"
                                                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                                                >
                                                    <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                            Add new newsCategory
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
                                                                    fill-rule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                    clip-rule="evenodd"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="p-6 space-y-6">
                                                        <div className="grid grid-cols-6 gap-6">
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label
                                                                    htmlFor="catName"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    Full name:
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="catName"
                                                                    id="catName"
                                                                    value={user.catName || ""}
                                                                    onChange={handleChange}
                                                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="joe doe"
                                                                    required=""
                                                                />
                                                            </div>
                                                            
                                                          

                                                            

                                                            <div className=" items-center col-span-3 mt-6  space-x-2  rounded-b dark:border-gray-600">
                                                                <button
                                                                    type="submit"
                                                                    onClick={newUserRegister}
                                                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                >
                                                                    Add Category
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
                                    <table className="min-w-max w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-center">Name</th>
                                                <th className="py-3 px-6 text-center">Status</th>
                                                <th className="py-3 px-6 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                            {alluser.map((data) => {
                                                return (
                                                    <tr
                                                        className="border-b border-gray-200 hover:bg-gray-100"
                                                        key={data._id}
                                                    >
                                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                                            <div className="flex items-center justify-center">
                                                                <span className="font-medium">{data.category_name}</span>
                                                            </div>
                                                        </td>
                                                       
                                                        
                                                        <td className="py-3 px-6 text-center justify-center">
                                                        <button type='button' onClick={()=>handleStatus(setId(data._id))} > <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                              {data.Status}
                                                            </span></button>
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
                                                );
                                            })}
                                        </tbody>
                                    </table>
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
                                        action="/admin/newUserRegistration"
                                        method="POST"
                                        className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Category:
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
                                                        fill-rule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Category Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={RawData.category_name}
                                                        onChange={handleChange}
                                                        readOnly
                                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="joe doe"
                                                        required=""
                                                    />
                                                </div>
                                             
                                              

                                                <div className=" items-center col-span-3 mt-6  space-x-2  rounded-b dark:border-gray-600">
                                                    <button
                                                        type="submit"
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
                                    <form
                                        className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                                    >
                                        <div className="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Edit Category
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
                                                        fill-rule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="catName"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Full name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="catName"
                                                        id="catName"
                                                        defaultValue={RawData.category_name || ""}
                                                        onChange={handleEditChange}
                                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="joe doe"
                                                        required=""
                                                    />
                                                </div>
                                            
                                           

                                                <div className=" items-center col-span-3 mt-6  space-x-2  rounded-b dark:border-gray-600">
                                                    <button
                                                        type="submit"
                                                        onClick={handleEdit}
                                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Update data
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
                                                    fill-rule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
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