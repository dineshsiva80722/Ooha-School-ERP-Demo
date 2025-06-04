"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppLayout } from "@/components/layout/app-layout"
import { StaffManagement } from "@/components/admin/staff-management"
import { StudentManagement } from "@/components/admin/student-management"
import { EmployeeManagement } from "@/components/admin/employee-management"
import {
  Users,
  GraduationCap,
  Briefcase,
  BarChart3,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
} from "lucide-react"

export function AdminDashboard() {
  const [activeModule, setActiveModule] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const modules = [
    { id: "overview", name: "Dashboard Overview", icon: BarChart3 },
    { id: "staff", name: "Staff Management", icon: GraduationCap },
    { id: "students", name: "Student Management", icon: Users },
    { id: "employees", name: "Employee Management", icon: Briefcase },
  ]

  const adminStats = {
    totalStaff: 89,
    totalStudents: 1247,
    totalEmployees: 45,
    pendingLeaves: 12,
    attendanceRate: 94.2,
    pendingFees: 125000,
    activeGrievances: 8,
    upcomingEvents: 15,
  }

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

  return (
    <AppLayout sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header with Search and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Comprehensive school management system</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
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

        {activeModule === "overview" && <AdminOverview stats={adminStats} />}
        {activeModule === "staff" && <StaffManagement searchQuery={searchQuery} />}
        {activeModule === "students" && <StudentManagement searchQuery={searchQuery} />}
        {activeModule === "employees" && <EmployeeManagement searchQuery={searchQuery} />}
      </div>
    </AppLayout>
  )
}

function AdminOverview({ stats }: { stats: any }) {
  const quickActions = [
    { title: "Add New Staff", icon: GraduationCap, color: "bg-blue-500", module: "staff" },
    { title: "Enroll Student", icon: Users, color: "bg-green-500", module: "students" },
    { title: "Add Employee", icon: Briefcase, color: "bg-purple-500", module: "employees" },
    { title: "Schedule Event", icon: Calendar, color: "bg-orange-500", module: "events" },
  ]

  const recentActivities = [
    { id: 1, action: "New staff member added", user: "Dr. Sarah Johnson", time: "2 hours ago", type: "staff" },
    { id: 2, action: "Student fee payment received", user: "John Doe", time: "4 hours ago", type: "finance" },
    { id: 3, action: "Leave request approved", user: "Mike Wilson", time: "6 hours ago", type: "leave" },
    { id: 4, action: "Grievance resolved", user: "Emily Brown", time: "1 day ago", type: "grievance" },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +25 new admissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +2 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Above target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingLeaves}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Requires approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.pendingFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              From 125 students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Grievances</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeGrievances}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Pending resolution
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 inline mr-1" />
              Next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative functions</CardDescription>
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

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest administrative actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {activity.type === "staff" && <GraduationCap className="w-4 h-4 text-blue-600" />}
                    {activity.type === "finance" && <DollarSign className="w-4 h-4 text-green-600" />}
                    {activity.type === "leave" && <Calendar className="w-4 h-4 text-orange-600" />}
                    {activity.type === "grievance" && <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
