"use client"
import React, { useContext, useEffect, useState } from 'react'
import beVeganContext from '../../context/beVeganContext'
import MainHero from '@/app/components/MainHero'
import localFont from 'next/font/local'
const font_36 = localFont({ src: "../../fonts/36.otf" })
import { Josefin_Sans, Ysabeau } from "next/font/google"
const ysabeau = Ysabeau({ subsets: ["latin"] })
const josefin = Josefin_Sans({ subsets: ["latin"] })
import { RiSubtractLine, RiAddLine } from "react-icons/ri"

const SingleFoodPage = ({ params }) => {
    const [user, setUser] = useState()
    const context = useContext(beVeganContext);
    const { createCart, token } = context;
    const [food, setFood] = useState([])
    const [price, setPrice] = useState()
    const [size, setSize] = useState()
    const [qty, setQty] = useState(1)
    useEffect(() => {
        let userId = localStorage.getItem("userId")
        if (userId) {
            setUser(userId)
        } else {
            localStorage.setItem("userId", token())
        }
        const fetchData = async () => {
            const res = await fetch(`/api/food?foodId=${params.slug}`, {
                method: "GET"
            });
            const data = await res.json()
            setFood(data.food)
            setPrice(data.food.price[0].small)
            setSize(Object.keys(data.food.price[0])[0])
        }
        fetchData()
    }, [params, token])

    const handleChange = (e) => {
        let sizes = e.target.value
        setSize(sizes)
        for (const item of food.price) {
            if (Object.keys(item)[0] === sizes) {
                setPrice(item[sizes])
            }
        }
    }

    const incre = () => {
        setQty(qty + 1)
    }
    const decre = () => {
        if (qty !== 1) {
            setQty(qty - 1)
        }
    }

    const addCart = async (e) => {
        const prices = {}
        prices[size] = price
        let foods = {
            name: food.name,
            slug: food.slug,
            category: food.category,
            image: food.image,
            price: prices,
            qty
        }

        let data = await createCart(user, { foods })
        if (data.success) {
            if (!e.target.classList.contains("loading")) {
                e.target.classList.add("loading");
                setTimeout(() => e.target.classList.remove("loading"), 3700);
            }
        }
    }

    return (
        <>
            <MainHero tagline={food.name} tag={food.category} />
            <section className="ftco-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-5 order-lg-last ftco-animate">
                            <a href="images/menu-2.jpg" className="image-popup"><img src={food.image} className="img-fluid" alt="Colorlib Template" /></a>
                        </div>
                        <div className="col-lg-6 product-details pl-md-5 ftco-animate">
                            <h3 style={font_36.style}>{food.name}</h3>
                            <p className="price" style={josefin.style}><span>₹{price} ({size})</span></p>
                            <p style={josefin.style}>{food.desc}</p>
                            <p style={ysabeau.style}>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word  and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
                            </p>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="form-group d-flex">
                                        <div className="select-wrap">
                                            <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                                            <select onChange={handleChange} name="size" id="size" className="form-control" style={ysabeau.style}>
                                                <option value="small">Small</option>
                                                <option value="regular">Regular</option>
                                                <option value="large">Large</option>
                                                <option value="extra large">Extra Large</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="input-group col-md-6 d-flex mb-3" style={ysabeau.style}>
                                    <span className="input-group-btn mr-2">
                                        <button onClick={decre} type="button" className="quantity-left-minus btn" data-type="minus" data-field="">
                                            <RiSubtractLine />
                                        </button>
                                    </span>
                                    <input type="text" id="quantity" name="quantity" readOnly className="form-control input-number" value={qty} min="1" max="100" />
                                    <span className="input-group-btn ml-2">
                                        <button onClick={incre} type="button" className="quantity-right-plus btn" data-type="plus" data-field="">
                                            <RiAddLine />
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <button style={ysabeau.style} onClick={addCart} className="button btn btn-primary btn-outline-primary">
                                <span>Add To Cart</span>
                                <div className="cart">
                                    <svg viewBox="0 0 36 26">
                                        <polyline
                                            points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"
                                        ></polyline>
                                        <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleFoodPage