import dbConnect from "@/middleware/connectDB"
import Food from "@/models/Food"
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect()
        let food = await Food.find()
        return NextResponse.json({ data: food, success: true, msg: "Foods Fetched Successfully" }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, {
            status: 500
        })
    }
}