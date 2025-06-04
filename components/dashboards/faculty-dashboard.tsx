"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AppLayout } from "@/components/layout/app-layout"
import { StudentsMonitor } from "@/components/faculty/students-monitor"
import { StaffMonitor } from "@/components/faculty/staff-monitor"
import { useAuth } from "@/components/auth/auth-context"
import { Users, User, Calendar, BookOpen, CheckCircle, AlertTriangle, Search, Bell, Video, Bus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function FacultyDashboard() {
  const { user } = useAuth()
  const [activeModule, setActiveModule] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAlertsDialog, setShowAlertsDialog] = useState(false)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "New Assignment Submission",
      message: "5 students have submitted their mathematics assignment",
      type: "info",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "Parent Meeting Request",
      message: "Mrs. Johnson has requested a meeting regarding her child's progress",
      type: "important",
      time: "1 hour ago",
    },
  ])

  const modules = [
    { id: "overview", name: "Dashboard Overview", icon: Calendar },
    { id: "students", name: "Students Monitor", icon: Users },
    { id: "staff", name: "Staff Monitor", icon: User },
  ]

  const facultyStats = {
    totalStudents: 180,
    myClasses: 6,
    todayClasses: 3,
    pendingAssignments: 12,
    avgAttendance: 92.5,
    upcomingExams: 2,
    onlineSessionsToday: 1,
    emergencyAlerts: 0,
  }

  const todaySchedule = [
    {
      id: 1,
      subject: "Mathematics",
      class: "10-A",
      time: "09:00 AM - 10:00 AM",
      room: "Room 101",
      students: 30,
      type: "Regular Class",
    },
    {
      id: 2,
      subject: "Mathematics",
      class: "10-B",
      time: "11:00 AM - 12:00 PM",
      room: "Room 101",
      students: 28,
      type: "Regular Class",
    },
    {
      id: 3,
      subject: "Advanced Math",
      class: "12-A",
      time: "02:00 PM - 03:00 PM",
      room: "Room 102",
      students: 25,
      type: "Online Session",
    },
  ]

  const quickActions = [
    { title: "Mark Attendance", icon: CheckCircle, color: "bg-green-500", module: "attendance" },
    { title: "Start Online Class", icon: Video, color: "bg-blue-500", module: "online" },
    { title: "Emergency Alert", icon: AlertTriangle, color: "bg-red-500", module: "emergency" },
    { title: "View Transport", icon: Bus, color: "bg-orange-500", module: "transport" },
  ]

  const sidebar = (
    <nav className="p-4">
      <div className="space-y-2">
        {modules.map((module) => (
          <Button
            key={module.id}
            variant={activeModule === module.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveModule(module.id)}
          >
            <module.icon className="w-4 h-4 mr-2" />
            {module.name}
          </Button>
        ))}
      </div>
    </nav>
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search logic based on current active module
    if (activeModule === "students") {
      // Filter students based on search query
    }
  }

  const handleShowAlerts = () => {
    setShowAlertsDialog(true)
  }

  return (
    <AppLayout sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header with Search and Quick Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search students, classes..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleShowAlerts}>
              <Bell className="w-4 h-4 mr-2" />
              Alerts
              {alerts.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {alerts.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {activeModule === "overview" && (
          <FacultyOverview stats={facultyStats} schedule={todaySchedule} quickActions={quickActions} />
        )}
        {activeModule === "students" && <StudentsMonitor searchQuery={searchQuery} />}
        {activeModule === "staff" && <StaffMonitor />}
      </div>
      <Dialog open={showAlertsDialog} onOpenChange={setShowAlertsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Faculty Alerts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <span className="text-xs text-gray-400">{alert.time}</span>
                  </div>
                  <Badge variant={alert.type === "important" ? "destructive" : "secondary"}>{alert.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}

function FacultyOverview({ stats, schedule, quickActions }: { stats: any; schedule: any[]; quickActions: any[] }) {
  return (
    <div className="space-y-6">
      {/* Faculty Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across {stats.myClasses} classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayClasses}</div>
            <p className="text-xs text-muted-foreground">{stats.onlineSessionsToday} online session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">Above school average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes and sessions for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {classItem.type === "Online Session" ? (
                        <Video className="w-6 h-6 text-blue-600" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{classItem.subject}</h3>
                      <p className="text-sm text-gray-500">
                        {classItem.class} • {classItem.time}
                      </p>
                      <p className="text-xs text-gray-400">
                        {classItem.room} • {classItem.students} students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={classItem.type === "Online Session" ? "secondary" : "outline"}>
                      {classItem.type}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {classItem.type === "Online Session" ? "Join" : "Start"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="w-full justify-start h-12">
                  <div className={`w-8 h-8 rounded ${action.color} flex items-center justify-center mr-3`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  {action.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
