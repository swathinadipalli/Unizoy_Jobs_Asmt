"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Unizoy Jobs</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Browse Jobs</Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
