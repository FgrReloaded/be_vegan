import dbConnect from "@/middleware/connectDB"
import Food from "@/models/Food";
import WeekSpecial from "@/models/WeekSpecial"
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        const body = await req.json();
        await dbConnect()
        let newWeek = new WeekSpecial(body)
        await newWeek.save()
        return NextResponse.json({ success: true, msg: "New Week Special Updated Successfully" }, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 500
        })
    }
}

export async function GET(request) {
    try {
        await dbConnect()
        let foods = []
        let weekSpecial = await WeekSpecial.find()
        for (const item of weekSpecial) {
            let food = await Food.findOne({slug: item.foodId})
            foods.push(food)
        }
        return NextResponse.json({ data: foods, success: true, msg: "New Week Special Updated Successfully" }, {
            status: 200
        })
        
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 500
        })
    }
}