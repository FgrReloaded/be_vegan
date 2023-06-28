"use client"
import React, { useEffect, useState } from "react"
import beVeganContext from "./beVeganContext";
import { Ysabeau } from "next/font/google"
const ysabeau = Ysabeau({ subsets: ["latin"] })



const BeVeganState = ({ children }) => {
    const [loaded, setLoaded] = useState(false)
    let cartInitial = [];
    const [cartLength, setCartLength] = useState(0)
    const [subTotal, setSubTotal] = useState()
    const [carts, setCarts] = useState(cartInitial);
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 2000);
    }, [])

    const createCart = async (userId, foods) => {
        const res = await fetch("/api/carts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, foods })
        })
        const result = await res.json()
        if (result.newCart) {
            setCarts(result.newCart.foods)
            setSubTotal(result.newCart.subTotal)
            setCartLength(result.newCart.foods.length)
            return { success: true }
        }
    }
    const getCart = async (userId) => {
        const res = await fetch(`/api/carts?id=${userId}`, {
            method: "GET"
        })
        const result = await res.json()
        if (result.cart.length !== 0) {
            setCarts(result.cart[0].foods)
            setSubTotal(result.cart[0].subTotal)
            setCartLength(result.cart[0].foods.length)
        }
    }
    const deleteCart = async (userId, productId) => {
        const res = await fetch(`/api/carts?id=${userId}&product=${productId}`, {
            method: "DELETE"
        })
        const result = await res.json()
        if (result.newCart) {
            if (result.newCart.foods.length !== 0) {
                setCarts(result.newCart.foods)
                setSubTotal(result.newCart.subTotal)
                setCartLength(result.newCart.foods.length)
            }
        } else {
            setCarts([])
            setSubTotal(0)
            setCartLength(0)
        }
    }
    const clearCart = async (userId) => {
        const res = await fetch(`/api/carts?id=${userId}`, {
            method: "DELETE"
        })
        const result = await res.json()
        if (result.success) {
            setCarts([])
            setSubTotal(0)
            setCartLength(0)
        }

    }
    const rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    const token = function () {
        return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
    };


    return (

        <beVeganContext.Provider value={{ createCart, subTotal, deleteCart, getCart, carts, cartLength, token,clearCart }}>
            {loaded ? children : <><h1 style={ysabeau.style} className='cookingin'>Cooking in progress..</h1>
                <div id="cooking">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div id="area">
                        <div id="sides">
                            <div id="pan"></div>
                            <div id="handle"></div>
                        </div>
                        <div id="pancake">
                            <div id="pastry"></div>
                        </div>
                    </div>
                </div></>}
        </beVeganContext.Provider>
    )
}


export default BeVeganState;