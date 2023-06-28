"use client"
import React, { useState } from 'react'
import MainHero from '../components/MainHero'
import { motion } from 'framer-motion'
import localFont from 'next/font/local'
const font_25 = localFont({src: "../fonts/25.ttf"})
import {Ysabeau} from "next/font/google"
import Coffee from '../components/Coffee'
import MainDish from '../components/MainDish'
import Drinks from '../components/Drinks'
import Dessert from '../components/Dessert'
const ysabeau = Ysabeau({subsets: ["latin"]})

const FoodPage = () => {
    const [menu, setMenu] = useState("Starter")
    return (
        <>
            <MainHero tagline="Order Online" tag="Food" />
            <section className="ftco-menu mb-5 pb-5">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ease: "easeOut", duration: 0.4 }} className="container">
                    <div className="row d-md-flex">
                        <div className="col-lg-12 ftco-animate p-md-5">
                            <div className="row">
                                <div className="col-md-12 nav-link-wrap mb-5">
                                    <div className="nav ftco-animate nav-pills justify-content-center" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={font_25.style}>
                                        <a onClick={(e)=>{setMenu(e.target.innerText)}} className={`cursor-pointer nav-link ${menu==="Starter"?"active": ""}`} role="tab" aria-controls="v-pills-0" aria-selected="true">Starter</a>

                                        <a onClick={(e)=>{setMenu(e.target.innerText)}} className={`cursor-pointer nav-link ${menu==="Main Dish"?"active": ""}`} role="tab" aria-controls="v-pills-1" aria-selected="false">Main Dish</a>

                                        <a onClick={(e)=>{setMenu(e.target.innerText)}} className={`cursor-pointer nav-link ${menu==="Drinks"?"active": ""}`} role="tab" aria-controls="v-pills-2" aria-selected="false">Drinks</a>

                                        <a onClick={(e)=>{setMenu(e.target.innerText)}} className={`cursor-pointer nav-link ${menu==="Desserts"?"active": ""}`} role="tab" aria-controls="v-pills-3" aria-selected="false">Desserts</a>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex align-items-center">

                                    <div className="tab-content ftco-animate" id="v-pills-tabContent">
                                        {menu==="Starter"?<Coffee />:""}
                                        {menu==="Main Dish"?<MainDish />:""}
                                        {menu==="Drinks"?<Drinks />:""}
                                        {menu==="Desserts"?<Dessert />:""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default FoodPage