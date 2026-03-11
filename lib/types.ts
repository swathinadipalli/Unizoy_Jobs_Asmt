import { ObjectId } from "mongodb"

export interface Job {
  _id?: ObjectId
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Internship" | "Contract"
  description: string
  requirements: string
  salary?: string
  createdAt: Date
}

export interface Application {
  _id?: ObjectId
  jobId: string
  jobTitle: string
  name: string
  email: string
  resumeLink: string
  appliedAt: Date
}
