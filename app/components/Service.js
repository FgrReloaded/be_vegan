import React from 'react'
import {LuClipboardList} from "react-icons/lu"
import {TbTruckDelivery} from "react-icons/tb"
import {GiCoffeeBeans} from "react-icons/gi"
import { motion } from 'framer-motion'
import {Josefin_Sans} from "next/font/google"
const josefin = Josefin_Sans({subsets:["latin"]})

const Service = () => {
    return (
        <>
            <section className="ftco-section ftco-services">
                <div className="container">
                    <div className="row">
                        <motion.div initial={{opacity: 0, x:-50}} whileInView={{ opacity: 1, x: 0 }}
                                transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }} className="col-md-4">
                            <div className="media d-block text-center block-6 services">
                                <div className="icon d-flex justify-content-center align-items-center mb-5">
                                <LuClipboardList/>
                                </div>
                                <div className="media-body">
                                    <h3 className="heading" style={josefin.style}>Easy to Order</h3>
                                    <p className='font-weight-light' style={josefin.style}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{opacity: 0, y:50}} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }} className="col-md-4">
                            <div className="media d-block text-center block-6 services">
                                <div className="icon d-flex justify-content-center align-items-center mb-5">
                                    <TbTruckDelivery />
                                </div>
                                <div className="media-body">
                                    <h3 style={josefin.style} className="heading">Fastest Delivery</h3>
                                    <p className='font-weight-light' style={josefin.style}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div initial={{opacity: 0, x:50}} whileInView={{ opacity: 1, x: 0 }}
                                transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }} className="col-md-4 ">
                            <div className="media d-block text-center block-6 services">
                                <div className="icon d-flex justify-content-center align-items-center mb-5">
                                   <GiCoffeeBeans/></div>
                                <div className="media-body">
                                    <h3 style={josefin.style} className="heading">Quality Coffee</h3>
                                    <p className='font-weight-light' style={josefin.style}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Service