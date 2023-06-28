import dbConnect from "@/middleware/connectDB"
import Cart from "@/models/Cart"
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        let subTotal = 0, unique = true;
        let cart = [];
        const body = await req.json();
        const food = body.foods.foods;
        await dbConnect()
        let getCart = await Cart.findOne({ userId: body.userId })
        if (getCart) {
            for (const item of getCart.foods) {
                cart.push(item)
                if (item.slug == food.slug && JSON.stringify(item.price) == JSON.stringify(food.price)) {
                    item.qty += food.qty
                    unique = false
                }
                subTotal += item.qty * item.price[Object.keys(item.price)[0]]
            }
            if (unique) {
                cart.push(food)
                subTotal += food.qty * food.price[Object.keys(food.price)[0]]
            }
            const update = {
                foods: cart,
                subTotal
            }
            let newCart = await Cart.findOneAndUpdate({ userId: body.userId }, update, { new: true });
            return NextResponse.json({ newCart, success: true, msg: "Cart Updated Successfully" }, {
                status: 200
            })
        } else {
            cart.push(food)
            subTotal = food.price[Object.keys(food.price)[0]]
            const data = {
                userId: body.userId,
                foods: cart,
                subTotal
            }
            const newCart = new Cart(data)
            await newCart.save()
            return NextResponse.json({ newCart, subTotal, success: true, msg: "Cart Updated Successfully" }, {
                status: 200
            })
        }

    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Error", err: e.message }, {
            status: 500
        })
    }
}
export async function GET(req, res) {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        let newCart = await Cart.find({ userId: id })
        return NextResponse.json({ cart: newCart, success: true, msg: "Cart Fetched Successfully" }, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 500
        })
    }

}
export async function DELETE(req, res) {
    try {
        let cart = [], subTotal = 0;
        await dbConnect()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const productId = searchParams.get("product")
        if (productId) {
            let getCart = await Cart.findOne({ userId: id })
            if (getCart) {
                for (const item of getCart.foods) {
                    if (productId != item.slug) {
                        cart.push(item)
                        subTotal += item.qty * item.price[Object.keys(item.price)[0]]
                    }
                }
            }
            const update = {
                foods: cart,
                subTotal
            }
            let newCart = await Cart.findOneAndUpdate({ userId: id }, update, { new: true });
            if (newCart.foods.length == 0) {
                let newCart = await Cart.findOneAndDelete({ userId: id });
                return NextResponse.json({ success: true, msg: "Cart Deleted Successfully" }, {
                    status: 200
                })
            }
            return NextResponse.json({ newCart, success: true, msg: "Cart Deleted Successfully" }, {
                status: 200
            })
        }
        let getCart = await Cart.findOneAndDelete({ userId: id })
        if(!getCart){
            return NextResponse.json({success: false, msg: "Cart Not Found" }, {
                status: 404
            })
        }
        return NextResponse.json({ success: true, msg: "Cart Deleted Successfully" }, {
            status: 200
        })



    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 500
        })
    }

}