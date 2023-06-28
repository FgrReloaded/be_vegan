import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Josefin_Sans, Ysabeau } from "next/font/google"
const josefin = Josefin_Sans({ subsets: ["latin"] })
const ysabeau = Ysabeau({ subsets: ["latin"] })
import { AiOutlineClose } from "react-icons/ai"

const BookTable = () => {
    const [msg, setMsg] = useState("")
    const [time, setTime] = useState("")
    const [timing, setTiming] = useState([])
    const [loading, setLoading] = useState(false)
    const [showTime, setShowTime] = useState(false)
    const [credential, setCredential] = useState({ fullname: "", email: "", date: "", phone: "", msg: "" })
    const [placeholder, setPlaceholder] = useState({ fullname: "Full Name", email: "Email", date: "", msg: "Message(Optional)", phone: "Phone" })
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
        setPlaceholder({ fullname: "Full Name", email: "Email", date: "", phone: "Phone" });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("")
        setLoading(true);
        for (const item in credential) {
            if (credential[item] === "" && item !== "msg") {
                placeholder[item] = `${item.charAt(0).toUpperCase() + item.slice(1)}`
                setLoading(false)
                return;
            }
        }
        const res = await fetch("/api/table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
        })
        const data = await res.json()
        setTiming(data.timing)
        setShowTime(true)
        setLoading(false)
    }
    const getTable = async () => {
        credential.time = time
        const res = await fetch("/api/table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
        })
        const data = await res.json()
        if (data.success) {
            setMsg("Your Table has been successfully booked and details have been sent to you at your email address.")
            delete credential.time
            setCredential({ fullname: "", email: "", date: "", phone: "", msg: "" })
            setTime("")
        }

    }
    return (
        <>
            <section className={josefin.className}>
                <div className="container-wrap">
                    <div className="wrap d-md-flex align-items-xl-end">
                        <div className="info">
                            <div className="row no-gutters">
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ ease: "easeOut", duration: 0.3 }} className="col-md-4 d-flex ">
                                    <div className="icon"><span className="icon-phone"></span></div>
                                    <div className="text">
                                        <h3>000 (123) 456 7890</h3>
                                        <p>A small river named Duden flows by their place and supplies.</p>
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ ease: "easeOut", duration: 0.3, delay: 0.1 }} className="col-md-4 d-flex ">
                                    <div className="icon"><span className="icon-my_location"></span></div>
                                    <div className="text">
                                        <h3>198 West 21th Street</h3>
                                        <p>	203 Fake St. Mountain View, San Francisco, California, USA</p>
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ ease: "easeOut", duration: 0.3, delay: 0.2 }} className="col-md-4 d-flex ">
                                    <div className="icon"><span className="icon-clock-o"></span></div>
                                    <div className="text">
                                        <h3>Open Monday-Friday</h3>
                                        <p>8:00am - 9:00pm</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className="book bookFont p-4">
                            <h3>Book a Table</h3>
                            <form action="#" className="appointment-form">
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <input type="text" value={credential.fullname} onChange={handleChange} name='fullname' className="form-control" placeholder={placeholder.fullname} />
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <input type="email" value={credential.email} onChange={handleChange} name='email' className="form-control" placeholder={placeholder.email} />
                                    </div>
                                </div>
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <div className="input-wrap">
                                            <div className="icon"><span className="ion-md-calendar"></span></div>
                                            <input type="date" value={credential.date} onChange={handleChange} name='date' className="form-control appointment_date" placeholder={placeholder.date} />
                                        </div>
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <input type="text" value={credential.phone} onChange={handleChange} name='phone' className="form-control" placeholder={placeholder.phone} />
                                    </div>
                                </div>
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <textarea id="" value={credential.msg} onChange={handleChange} name="msg" cols="30" rows="2" className="form-control" placeholder="Message"></textarea>
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <button onClick={handleSubmit} type="submit" className="btn bookTable btn-white py-3 px-4">
                                            {loading ? <div className="lds-dual-ring"></div> : "Book"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <motion.div initial={{ opacity: 0, scale: 0 }} transition={{ ease: "easeInOut", duration: 0.3 }} animate={{ opacity: showTime ? 1 : 0, scale: showTime ? 1 : 0 }} className="timing">
                {timing.length !== 0 ? <h3 style={josefin.style} className='color-bg text-center font-25'>Available Timings </h3> : ""}
                <span onClick={() => { setShowTime(false) }} className='closeShowTime cursor-pointer'> <AiOutlineClose /> </span>
                {msg.length === 0 ?
                    <div className="timeBox">
                        {timing.length === 0 ? <p className='sorry text-center' style={ysabeau.style}>Sorry No Table Available For This Day</p> : timing.map(item => {
                            return <input key={item} readOnly onClick={() => { setTime(item) }} value={item} style={josefin.style} className={`btn bookTable ${time === item ? "active" : ""} bookTime btn-yellow py-3 px-4`} />
                        })}
                    </div> : <p style={ysabeau.style} className='sorry text-center' >{msg}</p>
                }
                {
                    timing.length !== 0 ? (msg.length === 0 ? <button style={josefin.style} onClick={getTable} className='btn setTime py-3 px-4'>Book</button> : "") : ""
                }
            </motion.div>
        </>
    )
}

const BottomTable = () => {
    const [msg, setMsg] = useState("")
    const [time, setTime] = useState("")
    const [timing, setTiming] = useState([])
    const [loading, setLoading] = useState(false)
    const [showTime, setShowTime] = useState(false)
    const [credential, setCredential] = useState({ fullname: "", email: "", date: "", phone: "", msg: "" })
    const [placeholder, setPlaceholder] = useState({ fullname: "Full Name", email: "Email", date: "", phone: "Phone", msg: "Message(Optional)" })
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
        setPlaceholder({ fullname: "Full Name", email: "Email", date: "", phone: "Phone", msg: "Message(Optional)" });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("")
        setLoading(true)
        for (const item in credential) {
            if (credential[item] === "" && item !== "msg") {
                placeholder[item] = `${item.charAt(0).toUpperCase() + item.slice(1)}`
                setLoading(false)
                return;
            }
        }
        const res = await fetch("/api/table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
        })
        const data = await res.json()
        if (data.success) {
            setTiming(data.timing)
        }
        setShowTime(true)
        setLoading(false)
    }
    const getTable = async () => {
        credential.time = time
        const res = await fetch("/api/table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
        })
        const data = await res.json()
        if (data.success) {
            setMsg("Your Table has been successfully booked and details have been sent to you at your email address.")
            delete credential.time
            setCredential({ fullname: "", email: "", date: "", phone: "", msg: "" })
            setTime("")
        }
    }
    return (
        <>
            <section className="ftco-appointment" style={josefin.style}>
                <div className="overlay"></div>
                <div className="container-wrap">
                    <div className="row no-gutters d-md-flex justify-content-center align-items-center">
                        <div className="col-md-6 appointment ftco-animate">
                            <h3 className="text-center mb-3" style={ysabeau.style}>Book a Table</h3>
                            <form action="#" className="appointment-form appointFont">
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <input style={{ color: "#ffd700 !important" }} type="text" name='fullname' onChange={handleChange} value={credential.fullname} placeholder={placeholder.fullname} className="form-control" />
                                    </div>
                                    <div className="form-group  ml-md-4">
                                        <input style={{ color: "#ffd700 !important" }} type="email" name='email' onChange={handleChange} value={credential.email} placeholder={placeholder.email} className="form-control" />
                                    </div>
                                </div>
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <div className="input-wrap">
                                            <div className="icon"><span className="ion-md-calendar"></span></div>
                                            <input style={{ color: "#ffd700 !important" }} id='d' type="date" name='date' onChange={handleChange} value={credential.date} placeholder={placeholder.date} className="form-control appointment_date" />
                                        </div>
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <div className="input-wrap">
                                            <div className="icon"><span className="ion-ios-clock"></span></div>
                                        </div>
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <input style={{ color: "#ffd700 !important" }} type="text" name='phone' onChange={handleChange} value={credential.phone} placeholder={placeholder.phone} className="form-control" />
                                    </div>
                                </div>
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <textarea style={{ color: "#ffd700 !important" }} id="" name='msg' onChange={handleChange} value={credential.msg} placeholder={placeholder.msg} cols="30" rows="2" className="form-control"></textarea>
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <button onClick={handleSubmit} type="submit" style={ysabeau.style} className="btn btn-primary py-3 px-4" >
                                            {loading ? <div className="lds-dual-ring"></div> : "Book"}

                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <motion.div initial={{ opacity: 0, scale: 0 }} transition={{ ease: "easeInOut", duration: 0.3 }} animate={{ opacity: showTime ? 1 : 0, scale: showTime ? 1 : 0 }} className="timing">
                {timing.length !== 0 ? (msg.length === 0 ? <h3 style={josefin.style} className='color-bg text-center font-25'>Available Timings </h3> : "") : ""}
                <span onClick={() => { setShowTime(false) }} className='closeShowTime cursor-pointer'> <AiOutlineClose /> </span>
                {msg.length === 0 ?
                    <div className="timeBox">
                        {timing.length === 0 ? <p className='sorry text-center' style={ysabeau.style}>Sorry No Table Available For This Day</p> : timing.map(item => {
                            return <input key={item} readOnly onClick={() => { setTime(item) }} value={item} style={josefin.style} className={`btn bookTable ${time === item ? "active" : ""} bookTime btn-yellow py-3 px-4`} />
                        })}
                    </div> : <p style={ysabeau.style} className='sorry text-center'>{msg}</p>
                }
                {
                    timing.length !== 0 ? (msg.length === 0 ? <button style={josefin.style} onClick={getTable} className='btn setTime py-3 px-4'>Book</button> : "") : ""
                }
            </motion.div>
        </>

    )
}

module.exports = { BookTable, BottomTable }