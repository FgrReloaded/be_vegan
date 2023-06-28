"use client"
import React, { useEffect, useState } from 'react'
import { BookTable } from '../components/BookTable'
import MainHero from '../components/MainHero'
import localFont from 'next/font/local'
const font_31 = localFont({ src: "../fonts/31.otf" })
import { Josefin_Sans, Ysabeau } from "next/font/google"
const josefin = Josefin_Sans({ subsets: ["latin"] })
const ysabeau = Ysabeau({ subsets: ["latin"] })

const MenuPage = () => {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/menu", {
        method: "GET"
      });
      const data = await res.json()
      setMenu(data.data)
    }
    fetchData()
  }, [])
  return (
    <>
      <MainHero tagline="Our Menu" tag="Menu" />
      <BookTable />
      <section className="ftco-section">
        <div className="container">

          <div className="row">
            <div className="col-md-6 mb-5 pb-3">
              <h3 className="mb-5 heading-pricing ftco-animate" style={josefin.style}>Starter</h3>
              {menu.filter(i => { return i.category === "Starter" }).map(item => {
                return <div key={item.slug} className="pricing-entry d-flex ftco-animate">
                  <div className="img" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="desc pl-3">
                    <div className="d-flex text align-items-center">
                      <h3 style={font_31.style}><span>{item.name}</span></h3>
                      <span className="price" style={josefin.style}>₹{item.price[0].small}</span>
                    </div>
                    <div className="d-block" style={ysabeau.style}>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>

            <div className="col-md-6 mb-5 pb-3">
              <h3 className="mb-5 heading-pricing ftco-animate" style={josefin.style}>Main Dish</h3>
              {menu.filter(i => { return i.category === "MainDish" }).map(item => {
                return <div key={item.slug} className="pricing-entry d-flex ftco-animate">
                  <div className="img" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="desc pl-3">
                    <div className="d-flex text align-items-center">
                      <h3 style={font_31.style}><span>{item.name}</span></h3>
                      <span className="price" style={josefin.style}>₹{item.price[0].small}</span>
                    </div>
                    <div className="d-block" style={ysabeau.style}>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              })}

            </div>
            <div className="col-md-6">
              <h3 className="mb-5 heading-pricing ftco-animate" style={josefin.style}>Desserts</h3>
              {menu.filter(i => { return i.category === "Desserts" }).map(item => {
                return <div key={item.slug} className="pricing-entry d-flex ftco-animate">
                  <div className="img" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="desc pl-3">
                    <div className="d-flex text align-items-center">
                      <h3 style={font_31.style}><span>{item.name}</span></h3>
                      <span className="price" style={josefin.style}>₹{item.price[0].small}</span>
                    </div>
                    <div className="d-block" style={ysabeau.style}>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>

            <div className="col-md-6">
              <h3 className="mb-5 heading-pricing ftco-animate" style={josefin.style}>Drinks</h3>
              {menu.filter(i => { return i.category === "Drinks" }).map(item => {
                return <div key={item.slug} className="pricing-entry d-flex ftco-animate">
                  <div className="img" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="desc pl-3">
                    <div className="d-flex text align-items-center">
                      <h3 style={font_31.style}><span>{item.name}</span></h3>
                      <span className="price" style={josefin.style}>₹{item.price[0].small}</span>
                    </div>
                    <div className="d-block" style={ysabeau.style}>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>


          </div>

        </div>
      </section>
    </>
  )
}

export default MenuPage