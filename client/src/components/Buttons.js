import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Buttons() {
  const navigate = useNavigate();
  const [Id, setId] = useState({});
  
  var id;
  useEffect(() => {
    getCategories();
  }, []);
  
  const [category, setCategory] = useState([]);

  const getCategories = () => {
    axios.get("https://g-news-qh78.onrender.com/getAllCategories").then((res) => {
      let datas = res.data;
      setCategory(datas);
    });
  };
  

  const sendData = () => {
    navigate(`/getAllNewsByCategory/${id}`);
  };

  return (
    <div className="align-center text-center mb-4">
      <div className="mt-8 md:flex md:items-center md:justify-center ">
          <div className="flex items-center space-x-4 overflow-y-auto md:max-w-lg xl:max-w-5xl 2xl:max-w-7xl lg:max-w-3xl whitespace-nowrap">
          {category  ? category.map((cat) => {
              return (
                  <Link to={`/getAllNewsByCategory/${cat.category_name}`}                
                key={cat._id}
                className="px-3 py-1.5 bg-gray-200 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-400 hover:text-white rounded-lg capitalize"
              >
                
                {cat.category_name}
              </Link>
            );
        }):<p>no data</p>}
        </div>
        <div className="relative inline-block w-auto"></div>
      </div>
    </div>




  );
}
