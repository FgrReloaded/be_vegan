"use client"
import React from 'react'
import MainHero from '../components/MainHero'
import {motion} from "framer-motion"
import {Josefin_Sans, Ysabeau} from "next/font/google"
const ysabeau = Ysabeau({subsets: ["latin"]})
const josefin = Josefin_Sans({subsets: ["latin"]})
const ContactPage = () => {
    return (
        <>
            <MainHero tagline="Contact Us" tag="Contact" />

            <section className="ftco-section contact-section">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }} className="container mt-5">
                    <div className="row block-9">
                        <div className="col-md-4 contact-info ftco-animate">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <h2 className="h4 text-uppercase" style={josefin.style}>Contact Information</h2>
                                </div>
                                <div className="col-md-12 mb-3" style={josefin.style}>
                                    <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Website:</span> <a href="#">yoursite.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6 ftco-animate">
                            <form action="#" className="contact-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" style={ysabeau.style} className="form-control" placeholder="Your Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" style={ysabeau.style} className="form-control" placeholder="Your Email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" style={ysabeau.style} className="form-control" placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea name="" style={ysabeau.style} id="" cols="30" rows="7" className="form-control" placeholder="Message"></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="submit" style={ysabeau.style} value="Send Message" className="btn btn-primary py-3 px-5" />
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default ContactPage