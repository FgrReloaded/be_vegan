import React from 'react'
import {motion} from "framer-motion"
import localFont from 'next/font/local'
import {Ysabeau, Josefin_Sans} from "next/font/google"
const font_28 = localFont({src: "../fonts/28.ttf"})
const font_42 = localFont({src: "../fonts/42.ttf"})
const ysabeau = Ysabeau({subsets: ["latin"]})
const josefin = Josefin_Sans({subsets:["latin"]})

const Testimonial = () => {
    return (
        <>
            <section className="ftco-section img" id="ftco-testimony" style={{backgroundImage: "url(images/bg_1.jpg)"}} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <motion.div initial={{opacity: 0, scale:0}} whileInView={{ opacity: 1, scale:1 }}
                                transition={{ ease: "easeInOut", duration: 0.5,delay: 0.3 }} className="row justify-content-center mb-5">
                        <div className="col-md-7 heading-section text-center ftco-animate">
                        <span style={font_28.style} className="mb-1 subheading">Be Vegan</span>
                            <h2 className="mb-4" style={font_42.style}>Customers Says</h2>
                            <p className='font-weight-light' style={josefin.style}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </motion.div>
                </div>
                <div className="container-wrap">
                    <div className="row d-flex no-gutters">
                        <motion.div initial={{opacity: 0, y:-50}} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.5,delay: 0.3 }} className="col-lg align-self-sm-end ftco-animate">
                            <div className="testimony">
                                <blockquote>
                                    <p style={ysabeau.style}>&ldquo;Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small.&rdquo;</p>
                                </blockquote>
                                <div className="author d-flex mt-4">
                                    <div className="image mr-3 align-self-center">
                                        <img src="/images/person_4.jpg" alt="" />
                                    </div>
                                    <div style={ysabeau.style} className="name align-self-center">Louise Kelly <span className="position">Illustrator Designer</span></div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{opacity: 0, y:50}} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.5,delay: 0.3 }} className="col-lg align-self-sm-end">
                            <div className="testimony overlay">
                                <blockquote>
                                    <p style={ysabeau.style}>&ldquo;Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.&rdquo;</p>
                                </blockquote>
                                <div className="author d-flex mt-4">
                                    <div className="image mr-3 align-self-center">
                                        <img src="/images/person_2.jpg" alt=""/>
                                    </div>
                                    <div style={ysabeau.style} className="name align-self-center">Louise Kelly <span className="position">Illustrator Designer</span></div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{opacity: 0, y:-50}} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.5,delay: 0.3 }} className="col-lg align-self-sm-end ftco-animate">
                            <div className="testimony">
                                <blockquote>
                                    <p style={ysabeau.style}>&ldquo;Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small  line of blind text by the name. &rdquo;</p>
                                </blockquote>
                                <div className="author d-flex mt-4">
                                    <div className="image mr-3 align-self-center">
                                        <img src="/images/person_3.jpg" alt=""/>
                                    </div>
                                    <div style={ysabeau.style} className="name align-self-center">Louise Kelly <span className="position">Illustrator Designer</span></div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{opacity: 0, y:50}} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.5,delay: 0.3 }} className="col-lg align-self-sm-end">
                            <div className="testimony overlay">
                                <blockquote>
                                    <p style={ysabeau.style}>&ldquo;Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however.&rdquo;</p>
                                </blockquote>
                                <div className="author d-flex mt-4">
                                    <div className="image mr-3 align-self-center">
                                        <img src="/images/person_2.jpg" alt="" />
                                    </div>
                                    <div style={ysabeau.style} className="name align-self-center">Louise Kelly <span className="position">Illustrator Designer</span></div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{opacity: 0, scale:0}} whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }} className="col-lg align-self-sm-end ftco-animate">
                            <div className="testimony">
                                <blockquote>
                                    <p style={ysabeau.style}>&ldquo;Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small  line of blind text by the name. &rdquo;</p>
                                </blockquote>
                                <div className="author d-flex mt-4">
                                    <div className="image mr-3 align-self-center">
                                        <img src="/images/person_3.jpg" alt="" />
                                    </div>
                                    <div style={ysabeau.style} className="name align-self-center">Louise Kelly <span className="position">Illustrator Designer</span></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonial