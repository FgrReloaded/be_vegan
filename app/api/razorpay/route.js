import Razorpay from "razorpay";
import shortid from "shortid";
import Food from "@/models/Food";
import { NextResponse } from "next/server";
import dbConnect from "@/middleware/connectDB";


export async function POST(req) {
	// Verifying Price and Subtotal of product
	let { cart } = await req.json()
	let subTotal = 0, food;
	await dbConnect();
	for (const item of cart) {
		food = await Food.findOne({ slug: item.slug })
		if (food) {
			let prices = Object.keys(item.price)[0]
			for (const items of food.price) {
				if (Object.keys(items)[0] == prices) {
					subTotal += Number(items[Object.keys(items)[0]]) * item.qty
				}
			}
		}
	}

	// Initialize razorpay object
	const razorpay = new Razorpay({
		key_id: process.env.RAZORPAY_KEY,
		key_secret: process.env.RAZORPAY_SECRET,
	});

	const payment_capture = 1;
	const amount = subTotal;
	const currency = "INR";
	const options = {
		amount: (amount * 100).toString(),
		currency,
		receipt: shortid.generate(),
		payment_capture,
	};

	try {
		const response = await razorpay.orders.create(options);
		return NextResponse.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
		}, {
			status: 200
		})
	} catch (error) {
		return NextResponse.json({ success: false, msg: "Internal Server Error", e: error.message }, {
			status: 500
		})
	}

}