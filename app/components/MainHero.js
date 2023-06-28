import React from 'react'
import { motion } from "framer-motion"
import localFont from 'next/font/local'
const font_16 = localFont({src: "../fonts/16.ttf"})
import {Ysabeau} from "next/font/google"
import Link from 'next/link'
const ysabeau = Ysabeau({subsets: ["latin"]})


const MainHero = ({ tagline, tag }) => {
    return (
        <>
            <section className="home-slider owl-carousel">
                <div className="slider-item" style={{ backgroundImage: "url(/images/bg_3.jpg)" }} data-stellar-background-ratio="0.5">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row slider-text justify-content-center align-items-center">

                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.4 }} className="col-md-7 col-sm-12 text-center">
                                <h1 style={font_16.style} className="mb-3 mt-5 font-tag bread">{tagline}</h1>
                                <p className="breadcrumbs" style={ysabeau.style}><span className="mr-2"><Link href={"/"}>Home</Link></span> <span>{tag}</span></p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainHero