"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { JobCard } from "@/components/job-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Job {
  _id: string
  title: string
  company: string
  location: string
  type: string
  description: string
  salary?: string
  createdAt: string
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs")
        const data = await res.json()
        setJobs(data)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Dream Job at Unizoy</h1>
          <p className="text-muted-foreground text-lg">
            Discover exciting opportunities and take the next step in your career
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, location, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {jobs.length === 0
                ? "No jobs posted yet. Check back later!"
                : "No jobs match your search."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
