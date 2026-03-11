import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Application } from "@/lib/types"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const applications = await db
      .collection("applications")
      .find({})
      .sort({ appliedAt: -1 })
      .toArray()
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    
    const application: Application = {
      jobId: body.jobId,
      jobTitle: body.jobTitle,
      name: body.name,
      email: body.email,
      resumeLink: body.resumeLink,
      appliedAt: new Date(),
    }

    const result = await db.collection("applications").insertOne(application)
    return NextResponse.json({ ...application, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
