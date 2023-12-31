"use client"
import React, { useContext, useEffect, useState } from 'react'
import beVeganContext from '../context/beVeganContext'
import Link from 'next/link'
import { FaShoppingCart } from "react-icons/fa"
import { usePathname } from 'next/navigation'
import {BiFoodMenu} from "react-icons/bi"
import { Josefin_Sans } from 'next/font/google'
const josefin = Josefin_Sans({subsets:["latin"]})


const Navbar = () => {
    const [scrolled, setScrolled] = useState("")
    const [collapse, setCollapse] = useState(true)
    const context = useContext(beVeganContext);
    const { getCart, cartLength, token } = context;
    const pathname = usePathname()
    useEffect(() => {
        let userId = localStorage.getItem("userId")
        if (!userId) {
            localStorage.setItem("userId", token())
        }
        getCart(userId)
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 300) {
                setScrolled("scrolled awake")
            } else {
                setScrolled("")
            }
        })

    }, [])
  

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light ${scrolled}`} id="ftco-navbar">
                <div className="container">
                    <Link className="navbar-brand" href={"/"}>Be<small>Vegan</small></Link>
                    <button onClick={()=>{setCollapse(!collapse)}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> <BiFoodMenu/>
                    </button>
                    <div className={`navbar-collapse collapse`} id="ftco-nav">
                        <ul className="navbar-nav m-auto">
                            <li className={`${pathname === "/" ? "active" : ""} nav-item`}><Link href={`/`} className="nav-link">Home</Link></li>
                            <li className={`${pathname === "/menu" ? "active" : ""} nav-item`}><Link href={`/menu`} className="nav-link">Menu</Link></li>
                            <li className={`${pathname === "/food" ? "active" : ""} nav-item`}><Link className="nav-link" href={`/food`}>Food</Link></li>
                            <li className={`${pathname === "/about" ? "active" : ""} nav-item`}><Link href={`/about`} className="nav-link">About</Link></li>
                            <li className={`${pathname === "/contact" ? "active" : ""} nav-item`}><Link href={`/contact`} className="nav-link">Contact</Link></li>
                            <li className="nav-item cart"><Link href={`/cart`} className="nav-link"> <FaShoppingCart /> <span className="bag d-flex justify-content-center align-items-center"><small>{cartLength}</small></span></Link></li>
                        </ul>
                    </div>
                    <div className={`mobile-nav ${collapse?"":"showMobile"}`} id="ftco-nav">
                        <ul className="m-auto">
                            <li style={josefin.style} className={`${pathname === "/" ? "active" : ""} nav-item`}><Link href={`/`} className="nav-link">Home</Link></li>
                            <li style={josefin.style} className={`${pathname === "/menu" ? "active" : ""} nav-item`}><Link href={`/menu`} className="nav-link">Menu</Link></li>
                            <li style={josefin.style} className={`${pathname === "/food" ? "active" : ""} nav-item`}><Link className="nav-link" href={`/food`}>Food</Link></li>
                            <li style={josefin.style} className={`${pathname === "/about" ? "active" : ""} nav-item`}><Link href={`/about`} className="nav-link">About</Link></li>
                            <li style={josefin.style} className={`${pathname === "/contact" ? "active" : ""} nav-item`}><Link href={`/contact`} className="nav-link">Contact</Link></li>
                            <li style={josefin.style} className="nav-item cart"><Link href={`/cart`} className="nav-link"> <FaShoppingCart /> <span className="bag d-flex justify-content-center align-items-center"><small>{cartLength}</small></span></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar