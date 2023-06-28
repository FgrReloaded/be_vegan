import dbConnect from "@/middleware/connectDB"
import Food from "@/models/Food"
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const body = await req.json();
        await dbConnect()
        let newFood = new Food(body)
        await newFood.save()
        return NextResponse.json({ success: true, msg: "Food Uploaded Successfully" }, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 200
        })
    }
}

export async function GET(req) {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const foodId = searchParams.get("foodId")
        if(id){
            let food = await Food.find({category: id})
            return NextResponse.json({ data: food, success: true, msg: "Foods Fetched Successfully" }, {
                status: 200
            })
        }
        if(foodId){
            let food = await Food.findOne({slug: foodId});
            return NextResponse.json({food, success: true, msg: "Foods Fetched Successfully" }, {
                status: 200
            })
        }

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 500
        })
    }
}
