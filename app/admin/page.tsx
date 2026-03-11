"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Job {
  _id: string
  title: string
  company: string
  location: string
  type: string
  description: string
  requirements: string
  salary?: string
  createdAt: string
}

interface Application {
  _id: string
  jobId: string
  jobTitle: string
  name: string
  email: string
  resumeLink: string
  appliedAt: string
}

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    salary: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/applications"),
      ])
      setJobs(await jobsRes.json())
      setApplications(await appsRes.json())
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPosting(true)

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setForm({
          title: "",
          location: "",
          type: "Full-time",
          description: "",
          requirements: "",
          salary: "",
        })
        fetchData()
      }
    } catch (error) {
      console.error("Failed to post job:", error)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="post" className="space-y-6">
          <TabsList>
            <TabsTrigger value="post">Post Job</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="Remote / Bangalore"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select
                        value={form.type}
                        onValueChange={(value) => setForm({ ...form, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary (optional)</Label>
                      <Input
                        id="salary"
                        value={form.salary}
                        onChange={(e) => setForm({ ...form, salary: e.target.value })}
                        placeholder="5-8 LPA"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      required
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      required
                      rows={4}
                      value={form.requirements}
                      onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                      placeholder="List the skills, qualifications, and experience required..."
                    />
                  </div>
                  <Button type="submit" disabled={posting}>
                    {posting ? "Posting..." : "Post Job"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : jobs.length === 0 ? (
              <p className="text-muted-foreground">No jobs posted yet.</p>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <Card key={job._id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-muted-foreground text-sm">
                            {job.location} - Posted {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : applications.length === 0 ? (
              <p className="text-muted-foreground">No applications received yet.</p>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app._id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-muted-foreground">{app.email}</p>
                          <p className="text-sm">
                            Applied for: <span className="font-medium">{app.jobTitle}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(app.appliedAt).toLocaleString()}
                          </p>
                        </div>
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
