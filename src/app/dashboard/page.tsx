"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome back, {session.user.name}!
            </h1>
            <p className="text-text-secondary">
              Ready to continue your AI capability learning journey?
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-muted rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Overall Score</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Completed Assessments</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Learning Streak</span>
                <span className="font-medium">0 days</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-muted rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                📊 Take Capability Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🎯 Set Learning Goals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📚 Explore Learning Paths
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-muted rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="text-center py-8">
              <p className="text-text-secondary">No recent activity</p>
              <p className="text-sm text-text-secondary mt-2">
                Complete your first assessment to get started!
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <span className="text-success-foreground text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium text-success">Authentication Working!</p>
              <p className="text-sm text-text-secondary">
                You're successfully logged in. The capability assessment and learning features will be built next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
