import React from 'react'
import {Ysabeau, Josefin_Sans} from "next/font/google"
const ysabeau = Ysabeau({subsets: ["latin"]})
const josefin = Josefin_Sans({subsets:["latin"]})
import {BsTwitter, BsFacebook,BsInstagram} from "react-icons/bs"

const Footer = () => {
    return (
        <>
            <footer className="ftco-footer ftco-section img">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2" style={josefin.style}>About Us</h2>
                                <p className='font-weight-light' style={ysabeau.style}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li className="ftco-animate"><a target='_blank' href="https://www.twitter.com"><span className="icon-twitter"><BsTwitter/></span></a></li>
                                    <li className="ftco-animate"><a target='_blank' href="https://www.facebook.com"><span className="icon-facebook"><BsFacebook/></span></a></li>
                                    <li className="ftco-animate"><a target='_blank' href="https://www.instagram.com"><span className="icon-instagram"><BsInstagram/></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5 mb-md-5">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2" style={josefin.style}>Recent Blog</h2>
                                <div className="block-21 mb-4 d-flex">
                                    <a className="blog-img mr-4" style={{ backgroundImage: "url(/images/image_1.jpg)" }}></a>
                                    <div className="text">
                                        <h3 className="heading font-weight-light" style={ysabeau.style}><a>Even the all-powerful Pointing has no control about</a></h3>
                                        <div className="meta" style={ysabeau.style}>
                                            <div><a><span className="icon-calendar"></span> June 23, 2023</a></div>
                                            <div><a><span className="icon-person"></span> Admin</a></div>
                                            <div><a><span className="icon-chat"></span> 19</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-21 mb-4 d-flex">
                                    <a className="blog-img mr-4" style={{ backgroundImage: "url(/images/image_2.jpg)" }}></a>
                                    <div className="text">
                                        <h3 className="heading font-weight-light" style={ysabeau.style}><a>Even the all-powerful Pointing has no control about</a></h3>
                                        <div className="meta" style={ysabeau.style}>
                                            <div><a><span className="icon-calendar"></span> June 23, 2023</a></div>
                                            <div><a><span className="icon-person"></span> Admin</a></div>
                                            <div><a><span className="icon-chat"></span> 19</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-5 mb-md-5">
                            <div className="ftco-footer-widget mb-4 ml-md-4">
                                <h2 className="ftco-heading-2" style={josefin.style}>Services</h2>
                                <ul className="list-unstyled" style={ysabeau.style}>
                                    <li><a className="py-2 d-block">Cooked</a></li>
                                    <li><a className="py-2 d-block">Deliver</a></li>
                                    <li><a className="py-2 d-block">Quality Foods</a></li>
                                    <li><a className="py-2 d-block">Mixed</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2" style={josefin.style}>Have a Questions?</h2>
                                <div className="block-23 mb-3" style={ysabeau.style}>
                                    <ul>
                                        <li><span className="icon icon-map-marker"></span><span className="text">Rouza Road, Sasaram, Bihar, India</span></li>
                                        <li><a href="#"><span className="icon icon-phone"></span><span className="text">+91 9430XXXXX6</span></a></li>
                                        <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@bevegan.com</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p className={ysabeau.className}>
                                Copyright &copy;2023 www.bevegan.com All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer