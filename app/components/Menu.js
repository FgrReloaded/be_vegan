import React from 'react'
import {motion} from "framer-motion"
import localFont from 'next/font/local'
import {Ysabeau, Josefin_Sans} from "next/font/google"
import Link from 'next/link'
const font_28 = localFont({src: "../fonts/28.ttf"})
const font_42 = localFont({src: "../fonts/42.ttf"})
const ysabeau = Ysabeau({subsets: ["latin"]})
const josefin = Josefin_Sans({subsets:["latin"]})




const Menu = () => {
    return (
        <>
            <section className="menu-section">
                <div className="container">
                    <div className="row align-items-center">
                        <motion.div initial={{opacity: 0, x:-50}} whileInView={{ opacity: 1, x: 0 }}
                                transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }} className="col-md-6 order-last pr-md-5">
                            <div className="heading-section text-md-right">
                                <span style={font_28.style} className="mb-1 subheading">Be Vegan</span>
                                <h2 style={font_42.style} className="mb-4">Our Menu</h2>
                                <p style={josefin.style} className="mb-4 font-weight-light">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <p className={ysabeau.className} ><Link href={"/menu"} className="btn btn-primary btn-outline-primary px-4 py-3">View Full Menu</Link></p>
                            </div>
                        </motion.div>
                        <div className="col-md-6 ">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="menu-entry">
                                        <a href="#" className="img" style={{backgroundImage: "url(images/menu-1.jpg)"}}></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="menu-entry">
                                        <a href="#" className="img" style={{backgroundImage: "url(images/menu-2.jpg)"}}></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="menu-entry">
                                        <a href="#" className="img" style={{backgroundImage: "url(images/menu-3.jpg)"}}></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="menu-entry">
                                        <a href="#" className="img" style={{backgroundImage: "url(images/menu-4.jpg)"}}></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Menu