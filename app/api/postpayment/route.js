import Razorpay from "razorpay";
import shortid from "shortid";
import Food from "@/models/Food";
const crypto = require("crypto")
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import dbConnect from "@/middleware/connectDB";
import nodemailer from "nodemailer"


export async function POST(req) {
    await dbConnect();
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    });
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        email,
        carts,
        amount,
        name,
        phone,
        appart,
        address
    } = await req.json();

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });
        let date = new Date().toDateString()

        const sendMail = async (payMeth, message) => {
            const emailContent =
                `
Dear ${name},

Thank you for choosing BE Vegan! We are pleased to inform you that your order has been successfully placed and is now being cooked. Below are the details of your order:

Order ID: ${(razorpayOrderId.split("_"))[1]}
Order Date: ${date}
Shipping Address: ${appart} ${address}
Phone Number: ${phone}

Order Summary:
-----------------------------------------------------------------------
Item                   Quantity        Price
-----------------------------------------------------------------------
${carts.map(item => {
                    return (
                        `${item.name}             ${item.qty}         ${item.price[Object.keys(item.price)[0]]}`
                    )
                })}    
-----------------------------------------------------------------------
Subtotal:                           ${amount}.00
Shipping:                           0.00
Tax:                                   0.00
Total:                                 ${amount}.00

Payment Method: ${payMeth}
            
Please note that the above order details are for your reference. If you have any questions or concerns regarding your order, please don't hesitate to contact our customer support team at nitishsr14@gmail.com. 

Once your food has been cooked, you will receive a your food under 20 minutes.

We appreciate your business and are committed to providing you with the best possible service. Thank you for choosing BE Vegan. We look forward to serving you again in the future.

Best regards,

Nitish Kumar
BE Vegan
9430566516`
            const pendContent =
                `
Dear ${name},

We regret to inform you that there has been a delay in processing your order. Due to a technical issue, the payment for your order has not been received by our bank, and as a result, your order is currently pending.

We apologize for any inconvenience caused by this delay. Rest assured, our team is working diligently to resolve the issue and ensure that your payment is processed as soon as possible. Once we receive the payment, our chefs will start cooking your food promptly.

To expedite the process, we kindly request your cooperation in refraining from engaging in any conversational behavior regarding the pending status of your order. Our team is fully aware of the situation and is actively working on resolving it. Any additional inquiries or discussions may cause delays in addressing the issue promptly.

We understand that you are eagerly awaiting your order, and we assure you that we are doing everything in our power to rectify the situation. Your satisfaction is of utmost importance to us, and we appreciate your patience and understanding during this time.

Should you have any further queries or concerns, please feel free to reach out to our customer support team. They are available to assist you and provide updates on the progress of your order.

Once again, we sincerely apologize for the inconvenience caused by this delay. We value your business and look forward to serving you with delicious food soon.

Thank you for your understanding.

Best regards,

Nitish Kumar

Customer Support Representative
`
            let subject = `${message == "success" ? "Your Ordered Food details from BE Vegan" : "Delay in Processing Your Order"}`
            const mailOptions = {
                from: "fgrreloadedprogrammer@gmail",
                to: email,
                subject: subject,
                text: `${message == "success" ? emailContent : pendContent}`
            }


                await transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  } else {
                    resolve(info);
                  }
                });

        }
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature)
            return NextResponse.json({ msg: "Transaction not legit!" }, {
                status: 400
            })
        const data = await razorpay.payments.fetch(razorpayPaymentId);
        let message;
        let orderState = "cooking";
        if (data.status === "captured") {
            message = "success"
        } else if (data.status === "authorized") {
            message = "pending"
            orderState = "pending"
        } else {
            message = "failed"
        }

        if (message == "success" || message == "pending") {
            let orderData = {
                name,
                email,
                orderId: (razorpayOrderId.split("_"))[1],
                foods: carts,
                address: `${appart}, ${address}`,
                amount: amount,
                status: orderState,
                paymentState: message,
                paymentInfo: data
            }
            let order = new Order(orderData)
            await order.save()
        }
        sendMail(data.method, message);
        return NextResponse.json({ success: true, msg: "Order Placed Successfully" }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error", e: error.message }, {
            status: 500
        })
    }

}