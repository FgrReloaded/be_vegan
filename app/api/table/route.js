import dbConnect from "@/middleware/connectDB"
import Table from "@/models/BookTable"
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });

        let appoint = {}
        let timing = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM", "9:00 PM", "11:00 PM"]
        await dbConnect()
        const data = await req.json()
        let date = data.date;
        let time = data.time;
        let userData = {
            name: data.fullname,
            email: data.email,
            userId: data.userId,
            phone: data.phone,
            message: data.msg
        }
        const sendMail = async (tableNo, resDate, resTime) => {
            const emailContent = `
Hello ${data.fullname},

Thank you for reserving a table at our restaurant. Below are the details of your reservation:

- Table No: ${tableNo}
- Date: ${resDate}
- Time: ${resTime}
- Phone: ${data.phone}
${data.msg.length>0?`- Special Request: ${data.msg}`:""}

We look forward to welcoming you to our restaurant. If you have any further questions or need to make any changes to your reservation, please feel free to contact us.

Best regards,
Nitish Kumar
BE Vegan
`
            const mailOptions = {
                from: "fgrreloadedprogrammer@gmail",
                to: data.email,
                subject: "Your Table Reservation at BE Vegan",
                text: emailContent
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
        let tab = await Table.find()
        for (const item of tab) {
            if (item.appoint) {
                if (item.appoint[date]) {
                    timing = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM", "9:00 PM", "11:00 PM"]
                    let bookedTime = Object.keys(item.appoint[date])
                    timing = timing.filter(val => !bookedTime.includes(val))
                    if (!time) {
                        return NextResponse.json({ timing, success: true, msg: "Timing Updates Successfully" }, {
                            status: 200
                        })
                    }
                    if (timing.length > 0 || bookedTime.includes(time)) {
                        if (!bookedTime.includes(time)) {
                            let d = {}
                            d[time] = { status: "Booked", userData }
                            appoint = item.appoint[date]
                            appoint[time] = { status: "Booked", userData }
                            item.appoint[date] = appoint
                            appoint = item.appoint
                            const updateTable = await Table.findOneAndUpdate({ table: item.table }, { appoint }, { new: true })
                            if (timing.length > 0) {
                                sendMail(updateTable.table, date, time);
                                return NextResponse.json({ updateTable, success: true, msg: "Table Updated Successfully" }, {
                                    status: 200
                                })
                            }
                        }

                    }

                } else {
                    if (!time) {
                        return NextResponse.json({ timing, success: true, msg: "Timing Updates Successfully" }, {
                            status: 200
                        })
                    }
                    let d = {}
                    d[time] = { status: "Booked", userData }
                    item.appoint[date] = d
                    appoint = item.appoint
                    const updateTable = await Table.findOneAndUpdate({ table: item.table }, { appoint }, { new: true })
                    sendMail(updateTable.table, date, time);
                    return NextResponse.json({ updateTable, success: true, msg: "Table Updated Successfully" }, {
                        status: 200
                    })
                }
            } else {
                if (!time) {
                    return NextResponse.json({ timing, success: true, msg: "Timing Updates Successfully" }, {
                        status: 200
                    })
                }
                let d = {}
                d[time] = { status: "Booked", userData }
                appoint[date] = d
                const updateTable = await Table.findOneAndUpdate({ table: item.table }, { appoint }, { new: true })
                sendMail(updateTable.table, date, time);
                return NextResponse.json({ updateTable, success: true, msg: "Table Updated Successfully" }, {
                    status: 200
                })
            }
        }
        return NextResponse.json({ success: false, msg: "No Tables Available For This Day" }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error", e: error.message }, {
            status: 500
        })
    }
}
