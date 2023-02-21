import React from 'react';
import Buttons from "../components/Buttons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FeaturedNews from "../components/FeaturedNews";
import AboutComponent from "../components/AboutComponent";
import Team from "../components/Team";
import logo from "../Images/logo.png";
import DownToUp from '../components/DownToUp';


export default function About(){
    return(
        <>
        {/* <Navbar logo={logo} /> */}
        <DownToUp></DownToUp>
<AboutComponent /><hr/>
<Team></Team>

<Footer />
        
        </>
    )
}