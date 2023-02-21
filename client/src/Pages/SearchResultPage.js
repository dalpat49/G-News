import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SearchedResult from "../components/SearchedResult";
import NewsSidebar from "../components/NewsSidebar";
import {useParams} from 'react-router-dom'
import Footer from "../components/Footer";
import logo from "../Images/logo.png"

export default function SearchResultPage() {
    const params = useParams()
  return (
    <>
      {/* <Navbar logo={logo}></Navbar> */}
      {/* <SearchBar></SearchBar> */}

      <div class="container-fluid mt-3">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="row">
                <div class="col-12">
                  <div class="section-title">
                    <h4 class="m-0 text-uppercase font-weight-bold">
                    Searched result for {params.id}
                    </h4>
                  </div>
                </div>
                        <SearchedResult></SearchedResult>
                        
                </div>
              </div>
                <div class="col-lg-4">
                  <NewsSidebar></NewsSidebar>
                </div>
            </div>
          </div>
        </div>
        <Footer></Footer>

    </>
  );
}
