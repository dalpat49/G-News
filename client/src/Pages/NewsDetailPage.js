import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Buttons from '../components/Buttons';
import NewsDetail from '../components/NewsDetail'
import DownToUp from '../components/DownToUp'
import NewsSidebar from '../components/NewsSidebar'
import logo from  '../Images/logo.png'

export default function NewsDetailPage() {
  return (
    <div>
        {/* <Navbar logo={logo}></Navbar> */}
        <DownToUp />
        {/* <Buttons></Buttons> */}
        <div className="container-fluid mt-5 mb-3 pt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
        <NewsDetail></NewsDetail>
        </div>
        <div class="col-lg-4">
                <NewsSidebar></NewsSidebar>
              </div>
        </div>
        </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
