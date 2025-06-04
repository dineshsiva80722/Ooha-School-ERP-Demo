"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Award,
  Filter,
  Download,
  Clock,
  MessageSquare,
  Bell,
  BookOpen,
  BarChart3,
  User,
  LayoutDashboard,
  File,
  Clock2,
  CalendarClock,
  MessageSquareClock,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

interface DailyReportProps {
  searchQuery: string
}

export function StudentManagement({ searchQuery }: DailyReportProps) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredReports, setFilteredReports] = useState([])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchReports()
  }, [])

  useEffect(() => {
    filterReports()
  }, [reports, searchQuery])

  const fetchReports = async () => {
    try {
      setLoading(true)
      // Simulated data for demonstration
      const simulatedReports = [
        {
          id: 1,
          title: "Class Attendance Report",
          date: new Date().toISOString().split('T')[0],
          type: "attendance",
          status: "completed",
          details: {
            totalStudents: 30,
            present: 28,
            absent: 2,
            percentage: 93.33
          }
        },
        {
          id: 2,
          title: "Academic Performance",
          date: new Date().toISOString().split('T')[0],
          type: "performance",
          status: "in-progress",
          details: {
            avgGPA: 3.7,
            improvedStudents: 15,
            declinedStudents: 3
          }
        },
        {
          id: 3,
          title: "Behavior Report",
          date: new Date().toISOString().split('T')[0],
          type: "behavior",
          status: "completed",
          details: {
            goodBehavior: 25,
            needsImprovement: 5
          }
        },
        {
          id: 4,
          title: "Classroom Issues",
          date: new Date().toISOString().split('T')[0],
          type: "issues",
          status: "pending",
          details: {
            reportedIssues: 3,
            resolved: 1,
            pending: 2
          }
        }
      ]
      setReports(simulatedReports)
    } catch (error) {
      console.error("Error fetching reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterReports = () => {
    const filtered = reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.type.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDate = report.date === selectedDate

      return matchesSearch && matchesDate
    })
    setFilteredReports(filtered)
  }

  const dailyStats = {
    attendance: {
      total: 30,
      present: 28,
      absent: 2,
      percentage: 93.33
    },
    performance: {
      avgGPA: 3.7,
      improved: 15,
      declined: 3
    },
    behavior: {
      good: 25,
      needsImprovement: 5
    },
    issues: {
      reported: 3,
      resolved: 1,
      pending: 2
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daily Report Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Calendar className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          {/* <TabsTrigger value="issues">Issues</TabsTrigger> */}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Attendance Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.attendance.percentage}%</div>
                <p className="text-xs text-muted-foreground">
                  {dailyStats.attendance.present}/{dailyStats.attendance.total}
                </p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-green-500">Present</div>
                    <div className="text-xs font-medium text-green-500">
                      {dailyStats.attendance.present}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-red-500">Absent</div>
                    <div className="text-xs font-medium text-red-500">
                      {dailyStats.attendance.absent}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.performance.avgGPA}</div>
                <p className="text-xs text-muted-foreground">Average GPA</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-green-500">Improved</div>
                    <div className="text-xs font-medium text-green-500">
                      {dailyStats.performance.improved}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-red-500">Declined</div>
                    <div className="text-xs font-medium text-red-500">
                      {dailyStats.performance.declined}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Behavior Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Behavior</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.behavior.good}</div>
                <p className="text-xs text-muted-foreground">Good Behavior</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-green-500">Good</div>
                    <div className="text-xs font-medium text-green-500">
                      {dailyStats.behavior.good}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-yellow-500">Needs Improvement</div>
                    <div className="text-xs font-medium text-yellow-500">
                      {dailyStats.behavior.needsImprovement}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dailyStats.issues.reported}</div>
                <p className="text-xs text-muted-foreground">Total Issues</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-green-500">Resolved</div>
                    <div className="text-xs font-medium text-green-500">
                      {dailyStats.issues.resolved}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-red-500">Pending</div>
                    <div className="text-xs font-medium text-red-500">
                      {dailyStats.issues.pending}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Reports</CardTitle>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value={new Date().toISOString().split('T')[0]}>Today</SelectItem>
                    <SelectItem value={new Date(Date.now() - 86400000).toISOString().split('T')[0]}>Yesterday</SelectItem>
                    <SelectItem value={new Date(Date.now() - 172800000).toISOString().split('T')[0]}>2 Days Ago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Type:</span> {report.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Status:</span>
                        <Badge
                          variant={
                            report.status === "completed" ? "default" :
                            report.status === "in-progress" ? "secondary" :
                            "destructive"
                          }
                        >
                          {report.status}
                        </Badge>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Report</CardTitle>
              <CardDescription>Track student attendance for today</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Simulated attendance data */}
                  {[1, 2, 3, 4, 5].map((student) => (
                    <TableRow key={student}>
                      <TableCell>John Doe</TableCell>
                      <TableCell>202400{student}</TableCell>
                      <TableCell>10-A</TableCell>
                      <TableCell>
                        <Badge variant={student % 2 === 0 ? "default" : "destructive"}>
                          {student % 2 === 0 ? "Present" : "Absent"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Clock2 className="w-3 h-3 mr-1" />
                          Mark
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Monitor academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((student) => (
                    <TableRow key={student}>
                      <TableCell>John Doe</TableCell>
                      <TableCell>202400{student}</TableCell>
                      <TableCell>10-A</TableCell>
                      <TableCell>3.8</TableCell>
                      <TableCell>
                        <Badge variant={student % 2 === 0 ? "default" : "destructive"}>
                          {student % 2 === 0 ? <ArrowUp /> : <ArrowDown />}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <BookOpen className="w-3 h-3 mr-1" />
                          View Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Behavior</CardTitle>
              <CardDescription>Track student behavior and conduct</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Behavior</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((student) => (
                    <TableRow key={student}>
                      <TableCell>John Doe</TableCell>
                      <TableCell>202400{student}</TableCell>
                      <TableCell>10-A</TableCell>
                      <TableCell>
                        <Badge variant={student % 2 === 0 ? "default" : "destructive"}>
                          {student % 2 === 0 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Note
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Issues</CardTitle>
              <CardDescription>Track and resolve classroom issues</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue Title</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((issue) => (
                    <TableRow key={issue}>
                      <TableCell>Issue {issue}</TableCell>
                      <TableCell>10-A</TableCell>
                      <TableCell>
                        <Badge variant={issue % 2 === 0 ? "default" : "destructive"}>
                          {issue % 2 === 0 ? "Resolved" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <MessageSquareClock className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
