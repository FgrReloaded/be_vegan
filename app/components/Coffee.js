import React, { useContext, useEffect, useState } from 'react'
import beVeganContext from '../context/beVeganContext'
import Link from 'next/link'
import { Josefin_Sans, Ysabeau } from "next/font/google"
import localFont from 'next/font/local'
import { motion } from 'framer-motion'
const font_36 = localFont({ src: "../fonts/36.otf" })
const ysabeau = Ysabeau({ subsets: ["latin"] })
const josefin = Josefin_Sans({ subsets: ["latin"] })


const Coffee = () => {
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState("")
  const context = useContext(beVeganContext);
  const { createCart, token } = context;
  const [starter, setStarter] = useState([])
  useEffect(() => {
    let userId = localStorage.getItem("userId")
    if (userId) {
      setUser(userId)
    } else {
      localStorage.setItem("userId", token())
    }
    const fetchData = async () => {
      const res = await fetch("/api/food?id=Starter", {
        method: "GET"
      });
      const data = await res.json()
      setStarter(data.data)
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
      <div className="tab-pane fade show active" role="tabpanel" aria-labelledby="v-pills-0-tab">
        {loaded ?
          <div className="row">
            {starter.map(item => {
              return <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }} key={item.slug} className="col-md-3">
                <div className="menu-entry">
                  <a className="img" style={{ backgroundImage: `url(${item.image})` }}></a>
                  <div className="text text-center pt-4">
                    <h3 style={font_36.style}><Link className='foodTitle' href={`/food/${item.slug}`} >{item.name}</Link></h3>
                    <p style={ysabeau.style}>{item.desc}</p>
                    <p className="price" style={josefin.style}><span>₹{item.price[0].small}</span></p>
                    <button style={ysabeau.style} onClick={(e) => {
                      newProduct(e, { foods: { name: item.name, slug: item.slug, category: item.category, image: item.image, price: item.price[0], qty: 1 } });
                    }} className="button btn btn-primary btn-outline-primary">
                      <span>
                        <div className="lds-dual-ring hide"></div>
                        <div>Add To Cart</div>
                      </span>                      <div className="cart">
                        <svg viewBox="0 0 36 26">
                          <polyline
                            points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"
                          ></polyline>
                          <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                        </svg>
                      </div>
                    </button>                </div>
                </div>
              </motion.div>
            })}
          </div> : <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        }

      </div>
    </>
  )
}

export default Coffee