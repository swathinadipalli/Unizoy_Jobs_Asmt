"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Clock } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: {
    _id: string
    title: string
    company: string
    location: string
    type: string
    description: string
    salary?: string
    createdAt: string
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <p className="text-muted-foreground mt-1">{job.company}</p>
          </div>
          <Badge variant="secondary">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.salary}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm line-clamp-2">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/jobs/${job._id}`} className="w-full">
          <Button className="w-full">View Details & Apply</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
