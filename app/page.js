"use client"
import React, { useContext, useEffect, useState } from 'react'
import beVeganContext from './context/beVeganContext'
import Hero from './components/Hero'
import Service from './components/Service'
import Menu from './components/Menu'
import Link from 'next/link'
import Testimonial from './components/Testimonial'
import { BookTable, BottomTable } from './components/BookTable'
import { PiCoffeeThin } from "react-icons/pi"
import { motion } from 'framer-motion'
import CountUp from "react-countup"
import localFont from 'next/font/local'
import { Ysabeau, Josefin_Sans } from "next/font/google"
const font_28 = localFont({ src: "./fonts/28.ttf" })
const font_42 = localFont({ src: "./fonts/42.ttf" })
const font_36 = localFont({ src: "./fonts/36.otf" })
const ysabeau = Ysabeau({ subsets: ["latin"] })
const josefin = Josefin_Sans({ subsets: ["latin"] })



const Home = () => {
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState("")
  const context = useContext(beVeganContext);
  const { createCart, token } = context;
  const [weekSpecial, setWeekSpecial] = useState([])
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 1400) {
        setVisible(true)
      }
    })
    let userId = localStorage.getItem("userId")
    if (userId) {
      setUser(userId)
    } else {
      localStorage.setItem("userId", token())
    }
    const fetchData = async () => {
      const res = await fetch("/api/weekspecial", {
        method: "GET"
      });
      const data = await res.json()
      setWeekSpecial(data.data)
    }
    setLoaded(false)
    fetchData()
    setLoaded(true)
  }, [])
  const newProduct = async (e, product) => {
    e.target.children[0].children[0].classList.remove("hide")
    e.target.children[0].children[1].classList.add("hide")
    let data = await createCart(user, product)
    e.target.children[0].children[0].classList.add("hide")
    e.target.children[0].children[1].classList.remove("hide")
    if (data.success) {
      if (!e.target.classList.contains("loading")) {
        e.target.classList.add("loading");
        setTimeout(() => e.target.classList.remove("loading"), 3700);
      }
    }
  }

  return (
    <>
      <Hero />
      <BookTable />
      <Menu />
      <section className="img ftco-counter" id="section-counter" style={{ backgroundImage: "url(images/bg_2.jpg)" }} data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                  <div className="block-18 text-center">
                    <div className="text">
                      <div className="icon"><PiCoffeeThin style={{ fontWeight: "400 !important" }} ></PiCoffeeThin></div>
                      <strong style={ysabeau.style} className="number" data-number="100">
                        {visible ?
                          <CountUp end={10} duration={2} /> : 0
                        }
                      </strong>
                      <span className={josefin.className}>Coffee Branches</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                  <div className="block-18 text-center">
                    <div className="text">
                      <div className="icon"><PiCoffeeThin style={{ fontWeight: "400 !important" }} ></PiCoffeeThin></div>
                      <strong style={ysabeau.style} className="number" data-number="100">
                        {visible ?
                          <CountUp end={21} duration={2} /> : 0
                        }
                      </strong>
                      <span className={josefin.className}>Number of Awards</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                  <div className="block-18 text-center">
                    <div className="text">
                      <div className="icon"><PiCoffeeThin style={{ fontWeight: "400 !important" }} ></PiCoffeeThin></div>
                      <strong style={ysabeau.style} className="number" data-number="100">
                        {visible ?
                          <CountUp end={650} duration={2} /> : 0
                        }
                      </strong>
                      <span className={josefin.className}>Happy Customer</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                  <div className="block-18 text-center">
                    <div className="text">
                      <div className="icon"><PiCoffeeThin style={{ fontWeight: "400 !important" }} ></PiCoffeeThin></div>
                      <strong style={ysabeau.style} className="number" data-number="100">
                        {visible ?
                          <CountUp end={25} duration={2} /> : 0
                        }
                      </strong>
                      <span className={josefin.className}>Staff</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.4, delay: 0.4 }} className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section text-center">
              <span style={font_28.style} className="mb-1 subheading">Be Vegan</span>
              <h2 style={font_42.style} className="mb-4">This Week Special</h2>
              <p style={josefin.style} className='font-weight-light'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </motion.div>
          <div className="row">
            {loaded ? weekSpecial.map(item => {
              return <div key={item.slug} className="col-md-3">
                <div className="menu-entry">
                  <a href="#" className="img" style={{ backgroundImage: `url(${item.image})` }}></a>
                  <div className="text text-center pt-4">
                    <h3 style={font_36.style}><Link className='foodTitle' href={`/food/${item.slug}`}>{item.name}</Link></h3>
                    <p className='font-weight-light' style={josefin.style}>{item.desc}</p>
                    <p className="price" style={josefin.style}><span>₹{item.price[0].small}</span></p>
                    <button style={ysabeau.style} onClick={(e) => {
                      newProduct(e, { foods: { name: item.name, slug: item.slug, category: item.category, image: item.image, price: item.price[0], qty: 1 } });
                    }} className="button btn btn-primary btn-outline-primary">
                      <span>
                        <div className="lds-dual-ring hide"></div>
                        <div>Add To Cart</div>
                      </span>
                      <div className="cart">
                        <svg viewBox="0 0 36 26">
                          <polyline
                            points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"
                          ></polyline>
                          <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            }) : <div className="lds-grid">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>}
          </div>
        </div>
      </section >
      <Service />
      <Testimonial />
      <BottomTable />
    </>

  )
}

export default Home