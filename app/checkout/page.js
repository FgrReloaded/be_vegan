"use client"
import React, { useContext, useEffect, useState } from 'react'
import beVeganContext from '../context/beVeganContext'
import MainHero from '../components/MainHero'
import localFont from "next/font/local"
import { Josefin_Sans, Ysabeau } from "next/font/google"
import Confetti from '../components/Confetti'
import { useRouter } from 'next/navigation'
const josefin = Josefin_Sans({ subsets: ["latin"] })
const ysabeau = Ysabeau({ subsets: ["latin"] })


const CheckoutPage = () => {
  const router = useRouter()
  const [user, setUser] = useState("")
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [credential, setCredential] = useState({ firstname: "", lastname: "", address: "", appart: "", phone: "", email: "" })
  const [placeholder, setPlaceholder] = useState({ firstname: "", lastname: "", address: "House number and street name", appart: "Appartment, suite, unit etc:", phone: "", email: "" })
  const [saveAddress, setSaveAddress] = useState(false)
  const context = useContext(beVeganContext);
  const { subTotal, carts, getCart, clearCart } = context;
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
    setPlaceholder({ ...credential, [e.target.name]: e.target.value });
    setSaveAddress(false)
  }
  useEffect(() => {
    let userId = localStorage.getItem("userId")
    if (userId) {
      setUser(userId)
    } else {
      localStorage.setItem("userId", token())
    }
    getCart(userId)
    let data = JSON.parse(localStorage.getItem("address"))
    if (data) {
      for (const item in data.address) {
        credential[item] = data.address[item]
      }
    }
  }, [])

  const setAddress = (e) => {
    let unique = true
    let ans = e.target.value
    for (const item in credential) {
      if (credential[item] === "") {
        placeholder[item] = `Please provide your ${item}`
        setSaveAddress(false)
        unique = false
      }
    }
    if (unique) {
      setSaveAddress(true)
      let data = localStorage.getItem("address");
      if (!data) {
        localStorage.setItem("address", JSON.stringify({ address: credential }))
      } else {
        localStorage.removeItem("address")
        localStorage.setItem("address", JSON.stringify({ address: credential }))
      }
    }
  }

  // Payment Handlers
  const makePayment = async () => {
    setLoading(true)
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const data = await fetch(`/api/razorpay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: carts })
    });
    let result = await data.json();
    const { id, amount, currency } = result
    setLoading(false)
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: credential.name,
      currency: currency,
      amount: amount,
      order_id: id,
      description: "Payment For Food Order From BeVegan",
      image: "",
      handler: async function (response) {
        const data = {
          amount: amount / 100,
          carts,
          phone: credential.phone,
          appart: credential.appart,
          address: credential.address,
          name: credential.firstname + credential.lastname,
          email: credential.email,
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        setLoading(true)
        const res = await fetch('/api/postpayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        const r = await res.json()
        setLoading(false)
        if (r.success) {
          setShowConfetti(true);
          setTimeout(() => {
            clearCart(user)
            router.push("/")
          }, 8000);

        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <>
      <MainHero tagline="Checkout" tag="Checkout" />
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 ftco-animate">
              <form action="#" className="billing-form ftco-bg-dark p-3 p-md-5">
                <h3 className="mb-4 billing-heading" style={josefin.style}>Billing Details</h3>
                <div className="row align-items-end">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstname" style={ysabeau.style}>Firt Name</label>
                      <input type="text" style={ysabeau.style} required onChange={handleChange} value={credential.firstname} name='firstname' className="form-control" placeholder={placeholder.firstname} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastname" style={ysabeau.style}>Last Name</label>
                      <input type="text" style={ysabeau.style} required onChange={handleChange} value={credential.lastname} name='lastname' className="form-control" placeholder={placeholder.lastname} />
                    </div>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="country" style={ysabeau.style}>State / Country</label>
                      <div className="select-wrap">
                        <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                        <input value={"India"} readOnly className="form-control" style={ysabeau.style} />

                      </div>
                    </div>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="streetaddress" style={ysabeau.style}>Street Address</label>
                      <input type="text" required onChange={handleChange} value={credential.address} name='address' style={ysabeau.style} className="form-control" placeholder={placeholder.address} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" required onChange={handleChange} value={credential.appart} name='appart' style={ysabeau.style} className="form-control" placeholder={placeholder.appart} />
                    </div>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="towncity" style={ysabeau.style}>Town / City</label>
                      <input type="text" style={ysabeau.style} value={"Sasaram"} readOnly className="form-control" placeholder="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="postcodezip" style={ysabeau.style}>Postcode / ZIP *</label>
                      <input type="text" style={josefin.style} readOnly value={"821115"} className="form-control" placeholder="" />
                    </div>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone" style={ysabeau.style}>Phone</label>
                      <input type="text" style={josefin.style} required onChange={handleChange} value={credential.phone} name='phone' className="form-control" placeholder={placeholder.phone} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="emailaddress" style={ysabeau.style}>Email Address</label>
                      <input type="email" required style={ysabeau.style} onChange={handleChange} value={credential.email} name='email' className="form-control" placeholder={placeholder.email} />
                    </div>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-12">
                    <div className="form-group mt-4">
                      <div className="radio" style={ysabeau.style}>
                        <label className="mr-3" htmlFor='optradio'>Save Address: </label>
                        <label className="mr-3"><input required onChange={setAddress} checked={saveAddress ? true : false} value={true} type="checkbox" name="optradio" /> Yes</label>
                        <label className="mr-3"><input required onChange={setAddress} checked={saveAddress ? false : true} value={false} type="checkbox" name="optradio" />No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>



              <div className="row mt-5 pt-3 d-flex">
                <div className="col-md-6 d-flex">
                  <div className="cart-detail cart-total ftco-bg-dark p-3 p-md-4">
                    <h3 className="billing-heading mb-4" style={josefin.style}>Cart Total</h3>
                    <p className="d-flex" style={ysabeau.style}>
                      <span>Subtotal</span>
                      <span style={josefin.style}>₹{subTotal}</span>
                    </p>
                    <p className="d-flex" style={ysabeau.style}>
                      <span>Delivery</span>
                      <span style={josefin.style}>₹0.00</span>
                    </p>
                    <p className="d-flex" style={ysabeau.style}>
                      <span>Discount</span>
                      <span style={josefin.style}>₹0.00</span>
                    </p>
                    <hr />
                    <p className="d-flex total-price" style={josefin.style}>
                      <span>Total</span>
                      <span>₹{subTotal}</span>
                    </p>
                    <div className="form-group">
                      <div className="col-md-12">
                        <div className="checkbox">
                          <label style={ysabeau.style}><input type="checkbox" onChange={() => { setCheck(!check) }} checked={check ? true : false} value={false} style={ysabeau.style} /> I have read and accept the terms and conditions</label>
                        </div>
                      </div>
                    </div>
                    <p style={ysabeau.style}><button disabled={!check} onClick={makePayment} className="btn btn-primary py-3 px-4">
                      {loading ? <div className="lds-dual-ring"></div> : "Place an Order"}
                    </button></p>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 sidebar ftco-animate">
                <div className="sidebar-box">
                  <form action="#" className="search-form">
                    <div className="form-group">
                      <div className="icon">
                        <span className="icon-search"></span>
                      </div>
                      <input style={ysabeau.style} type="text" className="form-control" placeholder="Search..." />
                    </div>
                  </form>
                </div>
                <div className="sidebar-box ftco-animate">
                  <div className="categories">
                    <h3 style={josefin.style}>Categories</h3>
                    <li><a style={ysabeau.style} href="#">Main Dishes <span style={josefin.style}>(12)</span></a></li>
                    <li><a style={ysabeau.style} href="#">Coffee <span style={josefin.style}>(22)</span></a></li>
                    <li><a style={ysabeau.style} href="#">Desserts <span style={josefin.style}>(37)</span></a></li>
                    <li><a style={ysabeau.style} href="#">Drinks <span style={josefin.style}>(42)</span></a></li>
                  </div>
                </div>
              </div>

              <div className="sidebar-box ftco-animate">
                <h3 style={josefin.style}>Tag Cloud</h3>
                <div className="tagcloud" style={ysabeau.style}>
                  <a href="#" className="tag-cloud-link">dish</a>
                  <a href="#" className="tag-cloud-link">food</a>
                  <a href="#" className="tag-cloud-link">sweet</a>
                  <a href="#" className="tag-cloud-link">tasty</a>
                  <a href="#" className="tag-cloud-link">delicious</a>
                  <a href="#" className="tag-cloud-link">desserts</a>
                  <a href="#" className="tag-cloud-link">drinks</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      {showConfetti && <Confetti />
      }
    </>
  )
}

export default CheckoutPage