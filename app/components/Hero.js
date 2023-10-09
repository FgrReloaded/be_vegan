import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import localFont from "next/font/local"
import {Josefin_Sans, Ysabeau} from "next/font/google"
const font_26 = localFont({src: "../fonts/26.ttf"})
const josefin = Josefin_Sans({subsets:["latin"]})
const ysabeau = Ysabeau({subsets: ["latin"]})
import { EffectFade, Autoplay } from "swiper";
import Link from 'next/link';

const Hero = () => {

    return (
        <>
            <section className="home-slider owl-carousel">
                <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    loop={true}
                    speed={2000}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectFade, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide><div className={`slider-item`} style={{ backgroundImage: "url(images/bg_1.jpg)", transition: "ease-in-out 0.5s" }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">
                                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ ease: "easeInOut", duration: 0.4 }} className="col-md-8 col-sm-12 text-center">
                                    <div style={font_26.style} className="subheading">BeVegan Welcomes You</div>
                                    <h1 style={josefin.style} className="mb-4 text-uppercase">The Best Coffee Testing Experience</h1>
                                    <p style={josefin.style} className="mb-2 font-weight-light  mb-md-3">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                    <p style={ysabeau.style}><Link href={"/food"} className="btn btn-primary p-3 px-xl-4 py-xl-3 border-radius">Order Now</Link></p>
                                </motion.div>

                            </div>
                        </div>
                    </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider-item slide-active" style={{ backgroundImage: "url(images/bg_2.jpg)", opacity: "1", transition: "ease-in-out 0.5s" }}>
                            <div className="overlay"></div>
                            <div className="container">
                                <div className="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">

                                    <div className="col-md-8 col-sm-12 text-center ">
                                        <span style={font_26.style} className="subheading">Welcome</span>
                                        <h1 style={josefin.style} className="mb-4 text-uppercase">Amazing Taste &amp; Beautiful Place</h1>
                                        <p style={josefin.style} className="mb-2 font-weight-light  mb-md-3">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p style={ysabeau.style}><Link href={"/food"} className="btn btn-primary p-3 px-xl-4 py-xl-3">Order Now</Link></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider-item slide-active" style={{ backgroundImage: "url(images/bg_3.jpg)", opacity: "1", transition: "ease-in-out 0.5s" }}>
                            <div className="overlay"></div>
                            <div className="container">
                                <div className="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">

                                    <div className="col-md-8 col-sm-12 text-center ">
                                        <span style={font_26.style} className="subheading">Welcome</span>
                                        <h1 style={josefin.style} className="mb-4 text-uppercase">Creamy Hot and Ready to Serve</h1>
                                        <p style={josefin.style} className="mb-2 font-weight-light  mb-md-3">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p style={ysabeau.style}><Link href={"/food"} className="btn btn-primary p-3 px-xl-4 py-xl-3">Order Now</Link></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </>
    )
}

export default Hero
