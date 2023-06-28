"use client"
import React, { useContext, useEffect, useState } from 'react'
import beVeganContext from '../context/beVeganContext'
import MainHero from '../components/MainHero'
import { motion } from 'framer-motion'
import { Josefin_Sans, Ysabeau } from "next/font/google"
const ysabeau = Ysabeau({ subsets: ["latin"] })
const josefin = Josefin_Sans({ subsets: ["latin"] })
import { AiOutlineClose } from "react-icons/ai"
import Link from 'next/link'
import { RiSubtractLine, RiAddLine } from "react-icons/ri"


const CartPage = () => {
    const [user, setUser] = useState("")
    const context = useContext(beVeganContext);
    const { createCart, getCart, deleteCart, carts, subTotal, token } = context;
    useEffect(() => {
        let userId = localStorage.getItem("userId")
        if (userId) {
            setUser(userId)
        } else {
            localStorage.setItem("userId", token())
        }
        getCart(userId)
    }, [])

    const addItem = async (product) => {
        let foods = {
            name: product.name,
            slug: product.slug,
            category: product.category,
            image: product.image,
            price: product.price,
            qty: product.qty
        }
        let data = await createCart(user, { foods })
    }
    return (
        <>
            <MainHero tagline="Cart" tag="Cart" />
            <section className="ftco-section ftco-cart">
                {!carts.length ? <p style={josefin.style} className='text-uppercase text-center font-25'>Oops Your Plate is empty. <br /> Add some foods to your plate and enjoy it</p> :
                    <motion.div initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.4 }} className="container">
                        <div className="row">
                            <div className="col-md-12 ftco-animate">
                                <div className="blog-entry">
                                    <table className="table">
                                        <thead className="thead-primary">
                                            <tr className="text-center">
                                                <th>&nbsp;</th>
                                                <th>Image</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.map(item => {
                                                return <tr key={`${item.slug}${item.price[Object.keys(item.price)[0]]}`} className="text-center">
                                                    <td className="product-remove"><a onClick={() => { deleteCart(user, item.slug) }} style={{ display: "flex", cursor: 'pointer', width: "fit-content", margin: "auto" }}><span className="icon-close"><AiOutlineClose /></span></a></td>
                                                    <td className="image-prod"><div className="img" style={{ backgroundImage: `url(${item.image})` }}></div></td>
                                                    <td className="product-name">
                                                        <h3 style={josefin.style}><Link href={`/food/${item.slug}`} >{item.name}</Link> ({Object.keys(item.price)[0]})</h3>
                                                    </td>
                                                    <td className="price" style={josefin.style} >₹{item.price[Object.keys(item.price)[0]]}</td>
                                                    <td className="quantity">
                                                        {
                                                            item.qty<=1?"":
                                                            <RiSubtractLine onClick={() => { addItem({ slug: item.slug, price: item.price, name: item.name, image: item.image, category: item.category, qty: -1}) }} className=' cursor-pointer' />
                                                        }
                                                        <div className="input-group mb-3">
                                                            <input type="text" style={ysabeau.style} name="quantity" readOnly className="quantity form-control input-number" value={item.qty} min="1" max="100" />
                                                        </div>
                                                        <RiAddLine onClick={() => { addItem({ slug: item.slug, price: item.price, name: item.name, image: item.image, category: item.category, qty: 1}) }} className=' cursor-pointer' />
                                                    </td>
                                                    <td className="total" style={josefin.style}>₹{item.price[Object.keys(item.price)[0]] * item.qty}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col col-lg-3 col-md-6 mt-5 cart-wrap ftco-animate">
                                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ ease: "easeInOut", duration: 0.4 }} className="cart-total mb-3">
                                    <h3 style={josefin.style} className='text-uppercase'>Cart Totals</h3>
                                    <p className="d-flex" style={josefin.style}>
                                        <span>SubTotal</span>
                                        <span>₹{subTotal}</span>
                                    </p>
                                    <p className="d-flex" style={josefin.style}>
                                        <span>Delivery</span>
                                        <span>₹0.00</span>
                                    </p>
                                    <p className="d-flex" style={josefin.style}>
                                        <span>Discount</span>
                                        <span>₹0.00</span>
                                    </p>
                                    <hr />
                                    <p className="d-flex total-price" style={josefin.style}>
                                        <span>Total</span>
                                        <span>₹{subTotal}</span>
                                    </p>
                                </motion.div>
                                <p style={ysabeau.style} className="text-center"><Link href={"/checkout"} className="btn btn-primary py-3 px-4">Proceed to Checkout</Link></p>
                            </div>
                        </div>
                    </motion.div>
                }

            </section>
        </>
    )
}

export default CartPage