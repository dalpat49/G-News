import React from "react";
import flag from "../Images/flag.jpg"

export default function AboutComponent() {
  return (
    <div className="container my-12 px-6 mx-auto">
      <section className="mb-30 text-gray-800">
        <div className="container mx-auto xl:px-32 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 flex items-center">
            <div className="mb-12 lg:mb-0">
              <div
                className="block rounded-lg shadow-lg px-6 py-12 lg:py-6 xl:py-12 md:px-12 lg:-mr-14"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <h3 className="text-2xl font-bold mb-3">Welcome to Gnews</h3>
                

                <p className="font-bold mb-4">
                  Starting of G-News
                </p>
                <p className="text-gray-500 indent-10 mb-6 text-justify">
                  G-News was first broadcast on DD Metro of Doordarshan in the
                  year 2021. This was then broadcast as a news program of 10 to
                  20 minutes. G-News came into existence in December 2022 as an
                  independent news channel and then it became the first complete
                  Hindi news channel in the country to be broadcast twenty-four
                  hours. One of the anchors at the time was Dalpat Pratap Singh.
                  The tagline for G-News was "Yeh thi news aaj tak, Intzar
                  kijiye kal tak". G-News was the first news channel in India to
                  use OB vans. By the time the channel came into existence, it
                  had a reach of 52 lakh households and since then it has become
                  the channel to broadcast in three crore households and its
                  viewership in news channels is 56%. On 14 December 2022,
                  G-News launched India's first Hindi high-definition channel,
                  G-News HD. A channel rebranding took place in January 2021.
                </p>

                <p className="font-bold mb-4">
                    Special about G-News
                </p>
                <p className="text-gray-500 text-justify indent-10 mb-6">
                  The NBSA said that the media has "complete freedom to report on
                  the Covid pandemic", but "such reporting must be done with
                  accuracy, impartiality and neutrality", and added "NBSA noted
                  that the broadcaster had admitted that there may have been
                  chances that there were some miscalculations as pointed out by
                  the complaint, which were inadvertent, and the broadcaster had
                  no intention to communalize the issue or malign any
                  community."
                </p>

                
               
              </div>
            </div>

            <div>
              <img
                src={flag}
                className="w-full rounded-lg shadow-lg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
