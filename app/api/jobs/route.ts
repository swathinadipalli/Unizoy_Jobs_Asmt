import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Job } from "@/lib/types"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    
    const job: Job = {
      title: body.title,
      company: body.company || "Unizoy",
      location: body.location,
      type: body.type,
      description: body.description,
      requirements: body.requirements,
      salary: body.salary,
      createdAt: new Date(),
    }

    const result = await db.collection("jobs").insertOne(job)
    return NextResponse.json({ ...job, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
