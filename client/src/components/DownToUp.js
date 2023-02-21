import React from "react"

export default function DownToUp(){
    return(
        <>
         <div className="flex animate-bounce items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <button onClick={()=>{return window.scrollTo(0,0)}}
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12 "
          >
            <i className="bi bi-hand-index-fill text-blue-400  text-3xl animate-bounce"></i>
          </button>
        </div>
        </div>
        </>
    )
}