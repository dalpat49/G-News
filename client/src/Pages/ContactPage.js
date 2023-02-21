import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import DownToUp from '../components/DownToUp';
import logo from "../Images/logo.png";


export default function ContactPage(){
    return(
        <>
    {/* <Navbar logo={logo}></Navbar> */}
    <DownToUp ></DownToUp>
    <Contact></Contact>
    <Footer></Footer>
        </>
    )
}