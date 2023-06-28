"use client"
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import localFont from 'next/font/local'
const font_23 = localFont({ src: "../fonts/23.otf" })
const font_11 = localFont({ src: "../fonts/11.ttf" })
const font_29 = localFont({ src: "../fonts/29.ttf" })


const Confetti = () => {
    const [seconds, setSeconds] = useState(9);
    useEffect(() => {
            if (seconds > 0) {
                const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
                return () => clearTimeout(timer);
            }
    }, [seconds]);


    return (<>

        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className="confet">
            <ReactConfetti numberOfPieces={500} className='confeti' tweenDuration={1000} />
            <div className="pushpop">
                <motion.div style={font_23.style} initial={{ y: 1000, scale: 0 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 1 }} className="text-center congrat"><a>Congratulations</a></motion.div>
                <motion.div style={font_11.style} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 3 }} className="subText text-center">Your Order has been successfully placed and order details has been sent to your email address</motion.div>
                <motion.div style={font_29.style} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeInOut", delay: 4 }} className='text-center' >Redirecting To Homepage in {seconds}s</motion.div>
            </div>
        </motion.div>
    </>
    )
}

export default Confetti