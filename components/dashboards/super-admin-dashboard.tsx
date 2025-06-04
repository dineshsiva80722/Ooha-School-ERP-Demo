"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AppLayout } from "@/components/layout/app-layout"
import { useAuth } from "@/components/auth/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  Settings,
  BarChart3,
  Shield,
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  GraduationCap,
  Briefcase,
  PieChart,
  Calendar,
  Lock,
  RefreshCw,
  Trash,
  Save,
  X,
} from "lucide-react"

export function SuperAdminDashboard() {
  const { user } = useAuth()
  const [activeModule, setActiveModule] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [addType, setAddType] = useState("")
  const [notifications, setNotifications] = useState([])

  const modules = [
    { id: "overview", name: "System Overview", icon: BarChart3 },
    { id: "staff", name: "Staff Management", icon: Briefcase },
    { id: "faculty", name: "Faculty Management", icon: GraduationCap },
    { id: "students", name: "Student Management", icon: Users },
    { id: "analytics", name: "Analytics & Reports", icon: PieChart },
    { id: "settings", name: "System Settings", icon: Settings },
    { id: "security", name: "Security & Access", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "database", name: "Database Management", icon: Database },
    { id: "monitoring", name: "System Monitoring", icon: Activity },
  ]

  // Mock data - in real app, this would come from API
  const systemStats = {
    totalUsers: 1547,
    totalStaff: 89,
    totalFaculty: 45,
    totalStudents: 1247,
    totalAdmins: 8,
    activeUsers: 1432,
    systemUptime: 99.9,
    dataStorage: 2.4,
    securityAlerts: 3,
    pendingApprovals: 12,
    newRegistrations: 25,
    systemHealth: 98.5,
  }

  const staffData = [
    {
      id: 1,
      name: "James Wilson",
      email: "james.wilson@school.edu",
      phone: "+1 234-567-8901",
      department: "Administration",
      position: "Office Manager",
      employeeId: "EMP001",
      joinDate: "2018-03-15",
      salary: 45000,
      status: "Active",
      address: "123 Admin St, City",
      emergencyContact: "Jane Wilson - +1 234-567-8902",
      qualifications: "MBA in Administration",
      experience: "6 years",
      bloodGroup: "O+",
      dateOfBirth: "1985-08-20",
      nationality: "American",
      maritalStatus: "Married",
      lastLogin: "2024-02-15 09:30 AM",
      permissions: ["staff_management", "basic_reports"],
    },
    {
      id: 2,
      name: "Lisa Martinez",
      email: "lisa.martinez@school.edu",
      phone: "+1 234-567-8902",
      department: "Maintenance",
      position: "Facility Manager",
      employeeId: "EMP002",
      joinDate: "2020-06-01",
      salary: 38000,
      status: "Active",
      address: "456 Service Ave, City",
      emergencyContact: "Carlos Martinez - +1 234-567-8903",
      qualifications: "Diploma in Facility Management",
      experience: "4 years",
      bloodGroup: "A+",
      dateOfBirth: "1988-12-10",
      nationality: "American",
      maritalStatus: "Single",
      lastLogin: "2024-02-14 02:15 PM",
      permissions: ["facility_access", "maintenance_reports"],
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@school.edu",
      phone: "+1 234-567-8903",
      department: "IT Support",
      position: "IT Technician",
      employeeId: "EMP003",
      joinDate: "2021-09-15",
      salary: 42000,
      status: "Active",
      address: "789 Tech Blvd, City",
      emergencyContact: "Mary Chen - +1 234-567-8904",
      qualifications: "BSc Computer Science",
      experience: "3 years",
      bloodGroup: "B+",
      dateOfBirth: "1990-04-25",
      nationality: "American",
      maritalStatus: "Married",
      lastLogin: "2024-02-15 11:45 AM",
      permissions: ["system_access", "technical_support"],
    },
  ]

  const facultyData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@school.edu",
      phone: "+1 234-567-8901",
      department: "Mathematics",
      position: "Head of Department",
      employeeId: "FAC001",
      joinDate: "2012-08-15",
      salary: 85000,
      status: "Active",
      address: "123 Faculty Lane, City",
      emergencyContact: "Robert Johnson - +1 234-567-8902",
      qualifications: "PhD in Mathematics",
      experience: "12 years",
      bloodGroup: "O+",
      dateOfBirth: "1980-03-15",
      nationality: "American",
      maritalStatus: "Married",
      subjects: ["Algebra", "Calculus", "Statistics"],
      classes: ["10-A", "10-B", "11-A", "12-A"],
      lastLogin: "2024-02-15 08:45 AM",
      permissions: ["class_management", "student_grades", "attendance"],
      performance: "Excellent",
      studentRating: 4.8,
    },
    {
      id: 2,
      name: "Prof. Michael Brown",
      email: "michael.brown@school.edu",
      phone: "+1 234-567-8902",
      department: "Science",
      position: "Senior Teacher",
      employeeId: "FAC002",
      joinDate: "2016-01-10",
      salary: 72000,
      status: "Active",
      address: "456 Oak Ave, City",
      emergencyContact: "Linda Brown - +1 234-567-8903",
      qualifications: "MSc in Physics",
      experience: "8 years",
      bloodGroup: "A+",
      dateOfBirth: "1982-07-22",
      nationality: "American",
      maritalStatus: "Married",
      subjects: ["Physics", "Chemistry"],
      classes: ["9-A", "9-B", "10-A"],
      lastLogin: "2024-02-14 03:20 PM",
      permissions: ["class_management", "lab_access", "student_grades"],
      performance: "Very Good",
      studentRating: 4.6,
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      email: "emily.davis@school.edu",
      phone: "+1 234-567-8903",
      department: "English",
      position: "Teacher",
      employeeId: "FAC003",
      joinDate: "2019-09-01",
      salary: 58000,
      status: "On Leave",
      address: "789 Pine St, City",
      emergencyContact: "John Davis - +1 234-567-8904",
      qualifications: "MA in English Literature",
      experience: "5 years",
      bloodGroup: "B+",
      dateOfBirth: "1985-11-30",
      nationality: "American",
      maritalStatus: "Single",
      subjects: ["English Literature", "Creative Writing"],
      classes: ["8-A", "8-B", "9-A"],
      lastLogin: "2024-02-10 10:15 AM",
      permissions: ["class_management", "library_access"],
      performance: "Good",
      studentRating: 4.4,
    },
  ]

  const studentData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@student.edu",
      phone: "+1 234-567-8901",
      rollNumber: "2024001",
      admissionNumber: "ADM2024001",
      class: "10-A",
      section: "A",
      dateOfBirth: "2008-05-15",
      bloodGroup: "O+",
      address: "123 Student St, City",
      parentName: "Robert Doe",
      parentPhone: "+1 234-567-8902",
      parentEmail: "robert.doe@parent.com",
      emergencyContact: "Jane Doe - +1 234-567-8903",
      admissionDate: "2024-01-15",
      status: "Active",
      gpa: 3.8,
      attendance: 96.5,
      feeStatus: "Paid",
      totalFees: 25000,
      paidFees: 25000,
      pendingFees: 0,
      nationality: "American",
      religion: "Christianity",
      category: "General",
      transportRoute: "Route A",
      hostelResident: false,
      medicalConditions: "None",
      lastLogin: "2024-02-15 07:30 AM",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@student.edu",
      phone: "+1 234-567-8903",
      rollNumber: "2024002",
      admissionNumber: "ADM2024002",
      class: "9-B",
      section: "B",
      dateOfBirth: "2009-03-22",
      bloodGroup: "A+",
      address: "456 Oak Ave, City",
      parentName: "Michael Wilson",
      parentPhone: "+1 234-567-8904",
      parentEmail: "michael.wilson@parent.com",
      emergencyContact: "Lisa Wilson - +1 234-567-8905",
      admissionDate: "2024-01-15",
      status: "Active",
      gpa: 3.6,
      attendance: 94.2,
      feeStatus: "Pending",
      totalFees: 25000,
      paidFees: 15000,
      pendingFees: 10000,
      nationality: "American",
      religion: "Christianity",
      category: "General",
      transportRoute: "Route B",
      hostelResident: false,
      medicalConditions: "Asthma",
      lastLogin: "2024-02-14 04:45 PM",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@student.edu",
      phone: "+1 234-567-8905",
      rollNumber: "2024003",
      admissionNumber: "ADM2024003",
      class: "11-A",
      section: "A",
      dateOfBirth: "2007-11-08",
      bloodGroup: "B+",
      address: "789 Pine St, City",
      parentName: "David Johnson",
      parentPhone: "+1 234-567-8906",
      parentEmail: "david.johnson@parent.com",
      emergencyContact: "Susan Johnson - +1 234-567-8907",
      admissionDate: "2023-01-15",
      status: "Active",
      gpa: 3.9,
      attendance: 98.1,
      feeStatus: "Paid",
      totalFees: 28000,
      paidFees: 28000,
      pendingFees: 0,
      nationality: "American",
      religion: "Christianity",
      category: "General",
      transportRoute: "Route A",
      hostelResident: true,
      medicalConditions: "None",
      lastLogin: "2024-02-15 06:15 AM",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New faculty member added",
      user: "Dr. Sarah Johnson",
      time: "2 hours ago",
      type: "faculty",
      details: "Mathematics Department",
    },
    {
      id: 2,
      action: "Student profile updated",
      user: "John Doe",
      time: "4 hours ago",
      type: "student",
      details: "Contact information changed",
    },
    {
      id: 3,
      action: "Staff member deleted",
      user: "System Admin",
      time: "6 hours ago",
      type: "staff",
      details: "Employee ID: EMP045",
    },
    {
      id: 4,
      action: "Security alert resolved",
      user: "Security Team",
      time: "8 hours ago",
      type: "security",
      details: "Unauthorized access attempt blocked",
    },
    {
      id: 5,
      action: "Database backup completed",
      user: "System",
      time: "12 hours ago",
      type: "system",
      details: "Automated backup successful",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      title: "High Memory Usage",
      message: "System memory usage is at 85%. Consider optimizing or upgrading.",
      type: "warning",
      priority: "Medium",
      timestamp: "2024-02-15 10:30 AM",
      resolved: false,
    },
    {
      id: 2,
      title: "Failed Login Attempts",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      type: "security",
      priority: "High",
      timestamp: "2024-02-15 09:15 AM",
      resolved: false,
    },
    {
      id: 3,
      title: "Database Backup Success",
      message: "Daily database backup completed successfully",
      type: "success",
      priority: "Low",
      timestamp: "2024-02-15 02:00 AM",
      resolved: true,
    },
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
            {module.id === "notifications" && systemAlerts.filter((alert) => !alert.resolved).length > 0 && (
              <Badge variant="destructive" className="ml-auto text-xs">
                {systemAlerts.filter((alert) => !alert.resolved).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </nav>
  )

  return (
    <AppLayout sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600">Complete system management and control center</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {activeModule === "overview" && (
          <SystemOverview stats={systemStats} activities={recentActivities} alerts={systemAlerts} />
        )}
        {activeModule === "staff" && (
          <StaffManagement
            data={staffData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
        {activeModule === "faculty" && (
          <FacultyManagement
            data={facultyData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
        {activeModule === "students" && (
          <StudentManagement
            data={studentData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
        {activeModule === "analytics" && <AnalyticsReports stats={systemStats} />}
        {activeModule === "settings" && <SystemSettings />}
        {activeModule === "security" && <SecurityAccess />}
        {activeModule === "notifications" && <NotificationsCenter alerts={systemAlerts} />}
        {activeModule === "database" && <DatabaseManagement />}
        {activeModule === "monitoring" && <SystemMonitoring stats={systemStats} />}
      </div>
    </AppLayout>
  )
}

function SystemOverview({ stats, activities, alerts }: { stats: any; activities: any[]; alerts: any[] }) {
  return (
    <div className="space-y-6">
      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              {stats.activeUsers.toLocaleString()} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 inline mr-1" />
              {stats.systemUptime}% uptime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.securityAlerts}</div>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              <Clock className="w-3 h-3 inline mr-1" />
              Awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
            <Progress value={80} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalFaculty}</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalStaff}</div>
            <Progress value={45} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.totalAdmins}</div>
            <Progress value={20} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system events and administrative actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "faculty"
                        ? "bg-green-100"
                        : activity.type === "student"
                          ? "bg-blue-100"
                          : activity.type === "staff"
                            ? "bg-purple-100"
                            : activity.type === "security"
                              ? "bg-red-100"
                              : "bg-gray-100"
                    }`}
                  >
                    {activity.type === "faculty" && <GraduationCap className="w-4 h-4 text-green-600" />}
                    {activity.type === "student" && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === "staff" && <Briefcase className="w-4 h-4 text-purple-600" />}
                    {activity.type === "security" && <Shield className="w-4 h-4 text-red-600" />}
                    {activity.type === "system" && <Activity className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                    {activity.details && <p className="text-xs text-gray-400">{activity.details}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === "warning"
                        ? "bg-orange-100"
                        : alert.type === "security"
                          ? "bg-red-100"
                          : "bg-green-100"
                    }`}
                  >
                    {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                    {alert.type === "security" && <Shield className="w-4 h-4 text-red-600" />}
                    {alert.type === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={
                          alert.priority === "High"
                            ? "destructive"
                            : alert.priority === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {alert.priority}
                      </Badge>
                      <span className="text-xs text-gray-400">{alert.timestamp}</span>
                    </div>
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

function StaffManagement({ data, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }: any) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState(null)

  const filteredData = data.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = selectedFilter === "all" || item.department.toLowerCase() === selectedFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Staff
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search staff by name, email, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="administration">Administration</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="it support">IT Support</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="cafeteria">Cafeteria</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Directory ({filteredData.length} members)</CardTitle>
          <CardDescription>Complete list of all non-teaching staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((staff: any) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{staff.employeeId}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{staff.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={staff.status === "Active" ? "default" : "secondary"}>{staff.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{staff.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Staff Profile - {staff.name}</DialogTitle>
                          </DialogHeader>
                          <StaffProfileView staff={staff} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => setEditingStaff(staff)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStaffToDelete(staff)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <AddStaffDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      {/* Edit Staff Dialog */}
      {editingStaff && (
        <EditStaffDialog staff={editingStaff} open={!!editingStaff} onOpenChange={() => setEditingStaff(null)} />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        item={staffToDelete}
        type="staff"
        onConfirm={() => {
          // Handle delete logic here
          setShowDeleteDialog(false)
          setStaffToDelete(null)
        }}
      />
    </div>
  )
}

function FacultyManagement({ data, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }: any) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [facultyToDelete, setFacultyToDelete] = useState(null)

  const filteredData = data.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = selectedFilter === "all" || item.department.toLowerCase() === selectedFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Faculty Management</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Faculty
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search faculty by name, email, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="geography">Geography</SelectItem>
            <SelectItem value="computer science">Computer Science</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Faculty Table */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory ({filteredData.length} members)</CardTitle>
          <CardDescription>Complete list of all teaching faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty Member</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((faculty: any) => (
                <TableRow key={faculty.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>
                          {faculty.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{faculty.employeeId}</TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>{faculty.position}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {faculty.subjects.slice(0, 2).map((subject: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {faculty.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{faculty.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          faculty.performance === "Excellent"
                            ? "default"
                            : faculty.performance === "Very Good"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {faculty.performance}
                      </Badge>
                      <span className="text-xs text-gray-500">★{faculty.studentRating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={faculty.status === "Active" ? "default" : "secondary"}>{faculty.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Faculty Profile - {faculty.name}</DialogTitle>
                          </DialogHeader>
                          <FacultyProfileView faculty={faculty} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => setEditingFaculty(faculty)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFacultyToDelete(faculty)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Faculty Dialog */}
      <AddFacultyDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      {/* Edit Faculty Dialog */}
      {editingFaculty && (
        <EditFacultyDialog
          faculty={editingFaculty}
          open={!!editingFaculty}
          onOpenChange={() => setEditingFaculty(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        item={facultyToDelete}
        type="faculty"
        onConfirm={() => {
          // Handle delete logic here
          setShowDeleteDialog(false)
          setFacultyToDelete(null)
        }}
      />
    </div>
  )
}

function StudentManagement({ data, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }: any) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState(null)

  const filteredData = data.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.class.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = selectedFilter === "all" || item.class.toLowerCase().includes(selectedFilter.toLowerCase())

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search students by name, email, roll number, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="8">Class 8</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
            <SelectItem value="11">Class 11</SelectItem>
            <SelectItem value="12">Class 12</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filter
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Student Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Directory ({filteredData.length} students)</CardTitle>
          <CardDescription>Complete list of all enrolled students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Academic Performance</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{student.rollNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{student.parentName}</p>
                      <p className="text-gray-500">{student.parentPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">GPA: {student.gpa}</p>
                      <p className="text-gray-500">Attendance: {student.attendance}%</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                      {student.feeStatus}
                    </Badge>
                    {student.pendingFees > 0 && (
                      <p className="text-xs text-red-500 mt-1">₹{student.pendingFees.toLocaleString()} pending</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Student Profile - {student.name}</DialogTitle>
                          </DialogHeader>
                          <StudentProfileView student={student} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => setEditingStudent(student)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStudentToDelete(student)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <AddStudentDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      {/* Edit Student Dialog */}
      {editingStudent && (
        <EditStudentDialog
          student={editingStudent}
          open={!!editingStudent}
          onOpenChange={() => setEditingStudent(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        item={studentToDelete}
        type="student"
        onConfirm={() => {
          // Handle delete logic here
          setShowDeleteDialog(false)
          setStudentToDelete(null)
        }}
      />
    </div>
  )
}

function AnalyticsReports({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12.5%</div>
            <p className="text-xs text-gray-500">vs last month</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">System Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">89.2%</div>
            <p className="text-xs text-gray-500">Daily active users</p>
            <Progress value={89} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <p className="text-xs text-gray-500">System reliability</p>
            <Progress value={98} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">4.7/5</div>
            <p className="text-xs text-gray-500">User rating</p>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Students</span>
                <span className="text-sm font-medium">{stats.totalStudents}</span>
              </div>
              <Progress value={80} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Faculty</span>
                <span className="text-sm font-medium">{stats.totalFaculty}</span>
              </div>
              <Progress value={15} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Staff</span>
                <span className="text-sm font-medium">{stats.totalStaff}</span>
              </div>
              <Progress value={4} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Admins</span>
                <span className="text-sm font-medium">{stats.totalAdmins}</span>
              </div>
              <Progress value={1} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health Metrics</CardTitle>
            <CardDescription>Real-time system performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Progress value={67} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Usage</span>
                <span className="text-sm font-medium">34%</span>
              </div>
              <Progress value={34} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Usage</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <Progress value={23} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Generate and download detailed system reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">User Activity Report</h4>
              <p className="text-sm text-gray-500 mb-3">Detailed analysis of user engagement and activity patterns</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-3 h-3 mr-2" />
                Generate Report
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Academic Performance Report</h4>
              <p className="text-sm text-gray-500 mb-3">
                Comprehensive analysis of student and faculty performance metrics
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-3 h-3 mr-2" />
                Generate Report
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">System Usage Report</h4>
              <p className="text-sm text-gray-500 mb-3">Technical metrics and system performance analysis</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-3 h-3 mr-2" />
                Generate Report
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Financial Report</h4>
              <p className="text-sm text-gray-500 mb-3">Fee collection, payments, and financial analytics</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-3 h-3 mr-2" />
                Generate Report
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Security Audit Report</h4>
              <p className="text-sm text-gray-500 mb-3">Security events, access logs, and threat analysis</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-3 h-3 mr-2" />
                Generate Report
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Custom Report</h4>
              <p className="text-sm text-gray-500 mb-3">Create custom reports with specific parameters</p>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-3 h-3 mr-2" />
                Create Custom
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SystemSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Maintenance Mode</h4>
                  <p className="text-sm text-gray-500">Enable maintenance mode to restrict system access</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Backup</h4>
                  <p className="text-sm text-gray-500">Automatically backup system data daily</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Timeout (minutes)</label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Login Attempts</label>
                <Input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number.parseInt(e.target.value) })}
                  className="w-32"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password Expiry (days)</label>
                <Input
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => setSettings({ ...settings, passwordExpiry: Number.parseInt(e.target.value) })}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Send system alerts via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Send critical alerts via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
              <CardDescription>Manage system backups and recovery options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Create Backup Now
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Restore from Backup
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Recent Backups</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">2024-02-15 02:00 AM - Full Backup</span>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">2024-02-14 02:00 AM - Full Backup</span>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <Select defaultValue="light">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Color</label>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer border-2 border-blue-600"></div>
                  <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                  <div className="w-8 h-8 bg-red-500 rounded cursor-pointer"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SecurityAccess() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Security & Access Control</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="access">Access Logs</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Roles & Permissions</CardTitle>
              <CardDescription>Manage user roles and their associated permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Super Admin</h4>
                    <p className="text-sm text-gray-500 mb-3">Full system access and control</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="default">8 users</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Admin</h4>
                    <p className="text-sm text-gray-500 mb-3">Administrative access to school operations</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">15 users</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Faculty</h4>
                    <p className="text-sm text-gray-500 mb-3">Teaching staff with class management access</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">45 users</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Staff</h4>
                    <p className="text-sm text-gray-500 mb-3">Non-teaching staff with limited access</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">89 users</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Student</h4>
                    <p className="text-sm text-gray-500 mb-3">Student access to academic resources</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">1247 users</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Parent</h4>
                    <p className="text-sm text-gray-500 mb-3">Parent access to student information</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">892 users</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Configure detailed permissions for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Permission management interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Logs</CardTitle>
              <CardDescription>Monitor user access and system usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Access log monitoring interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>Track security incidents and threats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Security event monitoring interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationsCenter({ alerts }: { alerts: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications Center</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={!alert.resolved ? "border-orange-200 bg-orange-50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === "warning"
                        ? "bg-orange-100"
                        : alert.type === "security"
                          ? "bg-red-100"
                          : "bg-green-100"
                    }`}
                  >
                    {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                    {alert.type === "security" && <Shield className="w-4 h-4 text-red-600" />}
                    {alert.type === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      {!alert.resolved && (
                        <Badge variant="destructive" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={
                          alert.priority === "High"
                            ? "destructive"
                            : alert.priority === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {alert.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!alert.resolved && (
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{alert.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DatabaseManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Database Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Create Backup
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">Online</div>
              <p className="text-sm text-gray-500">All systems operational</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold">2.4 TB</div>
              <p className="text-sm text-gray-500">of 10 TB used</p>
              <Progress value={24} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold">6h ago</div>
              <p className="text-sm text-gray-500">Successful backup</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Operations</CardTitle>
          <CardDescription>Manage database maintenance and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Database className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Database management interface</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SystemMonitoring({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Monitoring</h2>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <Progress value={45} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Disk Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34%</div>
            <Progress value={34} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <Progress value={23} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
          <CardDescription>Real-time system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Performance monitoring dashboard</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Profile View Components
function StaffProfileView({ staff }: { staff: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Employee ID:</span> {staff.employeeId}
            </p>
            <p>
              <span className="font-medium">Email:</span> {staff.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {staff.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {staff.address}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span> {staff.dateOfBirth}
            </p>
            <p>
              <span className="font-medium">Blood Group:</span> {staff.bloodGroup}
            </p>
            <p>
              <span className="font-medium">Nationality:</span> {staff.nationality}
            </p>
            <p>
              <span className="font-medium">Marital Status:</span> {staff.maritalStatus}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Employment Details</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Department:</span> {staff.department}
            </p>
            <p>
              <span className="font-medium">Position:</span> {staff.position}
            </p>
            <p>
              <span className="font-medium">Join Date:</span> {staff.joinDate}
            </p>
            <p>
              <span className="font-medium">Experience:</span> {staff.experience}
            </p>
            <p>
              <span className="font-medium">Qualifications:</span> {staff.qualifications}
            </p>
            <p>
              <span className="font-medium">Salary:</span> ₹{staff.salary.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Emergency Contact:</span> {staff.emergencyContact}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FacultyProfileView({ faculty }: { faculty: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Employee ID:</span> {faculty.employeeId}
            </p>
            <p>
              <span className="font-medium">Email:</span> {faculty.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {faculty.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {faculty.address}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span> {faculty.dateOfBirth}
            </p>
            <p>
              <span className="font-medium">Blood Group:</span> {faculty.bloodGroup}
            </p>
            <p>
              <span className="font-medium">Emergency Contact:</span> {faculty.emergencyContact}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Subjects Teaching</h4>
          <div className="flex flex-wrap gap-2">
            {faculty.subjects.map((subject: string, index: number) => (
              <Badge key={index} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Professional Details</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Department:</span> {faculty.department}
            </p>
            <p>
              <span className="font-medium">Position:</span> {faculty.position}
            </p>
            <p>
              <span className="font-medium">Experience:</span> {faculty.experience}
            </p>
            <p>
              <span className="font-medium">Qualifications:</span> {faculty.qualifications}
            </p>
            <p>
              <span className="font-medium">Performance:</span> {faculty.performance}
            </p>
            <p>
              <span className="font-medium">Student Rating:</span> ★{faculty.studentRating}
            </p>
            <p>
              <span className="font-medium">Salary:</span> ₹{faculty.salary.toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Classes Assigned</h4>
          <div className="flex flex-wrap gap-2">
            {faculty.classes.map((classItem: string, index: number) => (
              <Badge key={index} variant="secondary">
                {classItem}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentProfileView({ student }: { student: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Roll Number:</span> {student.rollNumber}
            </p>
            <p>
              <span className="font-medium">Admission Number:</span> {student.admissionNumber}
            </p>
            <p>
              <span className="font-medium">Email:</span> {student.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {student.phone}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span> {student.dateOfBirth}
            </p>
            <p>
              <span className="font-medium">Blood Group:</span> {student.bloodGroup}
            </p>
            <p>
              <span className="font-medium">Address:</span> {student.address}
            </p>
            <p>
              <span className="font-medium">Nationality:</span> {student.nationality}
            </p>
            <p>
              <span className="font-medium">Religion:</span> {student.religion}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Parent Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Parent Name:</span> {student.parentName}
            </p>
            <p>
              <span className="font-medium">Parent Phone:</span> {student.parentPhone}
            </p>
            <p>
              <span className="font-medium">Parent Email:</span> {student.parentEmail}
            </p>
            <p>
              <span className="font-medium">Emergency Contact:</span> {student.emergencyContact}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Academic Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Class:</span> {student.class}
            </p>
            <p>
              <span className="font-medium">Section:</span> {student.section}
            </p>
            <p>
              <span className="font-medium">Admission Date:</span> {student.admissionDate}
            </p>
            <p>
              <span className="font-medium">GPA:</span> {student.gpa}
            </p>
            <p>
              <span className="font-medium">Attendance:</span> {student.attendance}%
            </p>
            <p>
              <span className="font-medium">Transport Route:</span> {student.transportRoute}
            </p>
            <p>
              <span className="font-medium">Hostel Resident:</span> {student.hostelResident ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Fee Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Total Fees:</span> ₹{student.totalFees.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Paid:</span> ₹{student.paidFees.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Pending:</span> ₹{student.pendingFees.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Status:</span>
              <Badge className="ml-2" variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                {student.feeStatus}
              </Badge>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add/Edit Dialog Components
function AddStaffDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee ID</label>
            <Input placeholder="Enter employee ID" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="Enter email address" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input placeholder="Enter phone number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administration">Administration</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="it-support">IT Support</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Input placeholder="Enter position" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salary</label>
            <Input placeholder="Enter salary amount" type="number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Join Date</label>
            <Input type="date" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Staff Member</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddFacultyDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Faculty Member</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee ID</label>
            <Input placeholder="Enter employee ID" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="Enter email address" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input placeholder="Enter phone number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="senior-teacher">Senior Teacher</SelectItem>
                <SelectItem value="hod">Head of Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Qualifications</label>
            <Input placeholder="Enter qualifications" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salary</label>
            <Input placeholder="Enter salary amount" type="number" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Faculty Member</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddStudentDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Roll Number</label>
            <Input placeholder="Enter roll number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="Enter email address" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Section</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date of Birth</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Parent Name</label>
            <Input placeholder="Enter parent name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Parent Phone</label>
            <Input placeholder="Enter parent phone" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Student</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditStaffDialog({
  staff,
  open,
  onOpenChange,
}: { staff: any; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Staff Member - {staff.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input defaultValue={staff.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee ID</label>
            <Input defaultValue={staff.employeeId} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue={staff.email} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input defaultValue={staff.phone} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select defaultValue={staff.department.toLowerCase()}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administration">Administration</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="it support">IT Support</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Input defaultValue={staff.position} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salary</label>
            <Input defaultValue={staff.salary} type="number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue={staff.status.toLowerCase()}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditFacultyDialog({
  faculty,
  open,
  onOpenChange,
}: { faculty: any; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Faculty Member - {faculty.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input defaultValue={faculty.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee ID</label>
            <Input defaultValue={faculty.employeeId} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue={faculty.email} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input defaultValue={faculty.phone} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select defaultValue={faculty.department.toLowerCase()}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Input defaultValue={faculty.position} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Salary</label>
            <Input defaultValue={faculty.salary} type="number" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue={faculty.status.toLowerCase()}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditStudentDialog({
  student,
  open,
  onOpenChange,
}: { student: any; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Student - {student.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input defaultValue={student.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Roll Number</label>
            <Input defaultValue={student.rollNumber} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue={student.email} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input defaultValue={student.phone} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Input defaultValue={student.class} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Section</label>
            <Input defaultValue={student.section} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Parent Name</label>
            <Input defaultValue={student.parentName} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Parent Phone</label>
            <Input defaultValue={student.parentPhone} />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DeleteConfirmationDialog({
  open,
  onOpenChange,
  item,
  type,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any
  type: string
  onConfirm: () => void
}) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Are you sure you want to delete <strong>{item.name}</strong>? This action cannot be undone.
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
