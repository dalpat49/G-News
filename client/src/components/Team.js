import React from 'react'
import dalpat from "../Images/dalpat profile.jpeg";
import loki from "../Images/lokendra.jpg";
import {Link} from 'react-router-dom'

export default function Team() {

  return (
    <div className="container my-10 px-6 mx-auto">

    <section className="mb-32 text-gray-800 text-center">
      <h2 className="text-3xl font-bold mb-32">Meet the <u className="text-blue-600">Team</u></h2>
  
      <div className="grid gap-x-6 lg:gap-x-12 md:grid-cols-3">
        <div className="mb-24 md:mb-0">
          <div className="rounded-lg shadow-lg h-full block bg-white">
            <div className="flex justify-center">
              <div className="flex justify-center" style={{marginTop: "-75px"}}>
                <img src={dalpat} className="rounded-full mx-auto shadow-lg" alt=""
                  style={{width: "150px"}} />
              </div>
            </div>
            <div className="p-6">
              <h5 className="text-2xl font-bold mb-2">Dalpat singh rathore</h5>
              <p className="mb-6 text-muted text-sm">Founder and CEO</p>
              <ul className="list-inside flex mx-auto justify-center">
                <Link to="https://instagram.com" className="px-2 ">
                 <i className="bi bi-instagram text-3xl text-[#e95950] hover:text-[#cd486b]"></i>
                </Link>
              
              </ul>
            </div>
          </div>
        </div>
  
        <div className="mb-24 md:mb-0">
          <div className="rounded-lg shadow-lg h-full block bg-white">
            <div className="flex justify-center">
              <div className="flex justify-center" style={{marginTop: "-75px" }}>
                <img src={loki} className="rounded-full mx-auto shadow-lg" alt=""
                  style={{width: "150px"}} />
              </div>
            </div>
            <div className="p-6">
              <h5 className="text-2xl font-bold mb-2">Lokendra singh rathore</h5>
              <p className="mb-6   text-muted text-sm">Co-founder</p>
              <ul className="list-inside flex mx-auto justify-center">
                <Link to="https://instagram.com" className="px-2">
                <i className="bi bi-instagram text-3xl text-[#e95950] hover:text-[#cd486b]"></i>
                </Link>
                
              </ul>
            </div>
          </div>
        </div>
  
        <div className="">
          <div className="rounded-lg shadow-lg h-full block bg-white">
            <div className="flex justify-center">
              <div className="flex justify-center" style={{marginTop:  "-75px" }}>
                <img src={loki} className="rounded-full mx-auto shadow-lg" alt=""
                  style={{width: "150px" }} />
              </div>
            </div>
            <div className="p-6">
              <h5 className="text-2xl font-bold mb-2">Krishan Saini</h5>
              <p className="mb-6  text-muted text-sm">Senior Manager</p>
              <ul className="list-inside flex mx-auto justify-center">
                <Link to="https://instagram.com" className="px-2">
                <i className="bi bi-instagram text-3xl text-[#e95950] hover:text-[#cd486b]"></i>
                </Link>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  </div>
  )
}