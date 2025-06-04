"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AppLayout } from "@/components/layout/app-layout"
import { useAuth } from "@/components/auth/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  FileText,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  User,
  DollarSign,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Bell,
  Target,
  BarChart3,
  CreditCard,
  FileCheck,
  Send,
  AlertTriangle,
  Info,
} from "lucide-react"

export function StudentDashboard() {
  const { user } = useAuth()
  const [activeModule, setActiveModule] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const modules = [
    { id: "overview", name: "Dashboard Overview", icon: BarChart3 },
    { id: "profile", name: "My Profile", icon: User },
    { id: "timetable", name: "Timetable", icon: Calendar },
    { id: "exams", name: "Upcoming Exams", icon: FileCheck },
    { id: "attendance", name: "Attendance", icon: CheckCircle },
    { id: "finance", name: "Finance Details", icon: DollarSign },
    { id: "homework", name: "Homework & Assessments", icon: FileText },
    { id: "materials", name: "Study Materials", icon: BookOpen },
    { id: "permissions", name: "Permissions", icon: Send },
    { id: "progress", name: "Progress Report", icon: Award },
    { id: "alerts", name: "Alert Messages", icon: Bell },
  ]

  // Mock student data - in real app, this would come from API
  const studentProfile = {
    id: user?.id || "4",
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@student.edu",
    rollNumber: "2024001",
    class: "10-A",
    section: "A",
    admissionNumber: "ADM2024001",
    dateOfBirth: "2008-05-15",
    bloodGroup: "O+",
    phone: "+1 234-567-8901",
    address: "123 Student Street, City, State - 12345",
    parentName: "Robert Doe",
    parentPhone: "+1 234-567-8902",
    parentEmail: "robert.doe@parent.com",
    emergencyContact: "Jane Doe - +1 234-567-8903",
    nationality: "American",
    religion: "Christianity",
    category: "General",
    admissionDate: "2024-01-15",
    academicYear: "2024-25",
  }

  const studentStats = {
    currentGPA: 3.8,
    attendanceRate: 96.5,
    pendingAssignments: 4,
    completedAssignments: 28,
    upcomingExams: 3,
    totalSubjects: 8,
    averageGrade: "A-",
    rank: 5,
    totalStudents: 45,
    pendingFees: 0,
    unreadAlerts: 3,
  }

  const weeklyTimetable = {
    Monday: [
      { time: "09:00-10:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
      { time: "10:00-11:00", subject: "English", teacher: "Ms. Johnson", room: "Room 102" },
      { time: "11:30-12:30", subject: "Science", teacher: "Mr. Brown", room: "Lab 1" },
      { time: "14:00-15:00", subject: "History", teacher: "Mrs. Davis", room: "Room 103" },
    ],
    Tuesday: [
      { time: "09:00-10:00", subject: "Science", teacher: "Mr. Brown", room: "Lab 1" },
      { time: "10:00-11:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
      { time: "11:30-12:30", subject: "Geography", teacher: "Mr. Wilson", room: "Room 104" },
      { time: "14:00-15:00", subject: "Physical Education", teacher: "Coach Taylor", room: "Gym" },
    ],
    Wednesday: [
      { time: "09:00-10:00", subject: "English", teacher: "Ms. Johnson", room: "Room 102" },
      { time: "10:00-11:00", subject: "Computer Science", teacher: "Mr. Tech", room: "Computer Lab" },
      { time: "11:30-12:30", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
      { time: "14:00-15:00", subject: "Art", teacher: "Ms. Creative", room: "Art Room" },
    ],
    Thursday: [
      { time: "09:00-10:00", subject: "History", teacher: "Mrs. Davis", room: "Room 103" },
      { time: "10:00-11:00", subject: "Science", teacher: "Mr. Brown", room: "Lab 1" },
      { time: "11:30-12:30", subject: "English", teacher: "Ms. Johnson", room: "Room 102" },
      { time: "14:00-15:00", subject: "Music", teacher: "Mr. Melody", room: "Music Room" },
    ],
    Friday: [
      { time: "09:00-10:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
      { time: "10:00-11:00", subject: "Geography", teacher: "Mr. Wilson", room: "Room 104" },
      { time: "11:30-12:30", subject: "Computer Science", teacher: "Mr. Tech", room: "Computer Lab" },
      { time: "14:00-15:00", subject: "Library Period", teacher: "Librarian", room: "Library" },
    ],
  }

  const upcomingExams = [
    {
      id: 1,
      subject: "Mathematics",
      date: "2024-02-25",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Exam Hall A",
      type: "Mid-term Examination",
      syllabus: "Chapters 1-5: Algebra, Geometry, Trigonometry",
      totalMarks: 100,
      instructions: "Bring calculator, ruler, and compass",
    },
    {
      id: 2,
      subject: "English",
      date: "2024-02-27",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Exam Hall B",
      type: "Mid-term Examination",
      syllabus: "Literature: Chapters 1-4, Grammar: Tenses, Voice",
      totalMarks: 100,
      instructions: "No electronic devices allowed",
    },
    {
      id: 3,
      subject: "Science",
      date: "2024-03-01",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Exam Hall A",
      type: "Mid-term Examination",
      syllabus: "Physics: Motion, Chemistry: Acids & Bases, Biology: Life Processes",
      totalMarks: 100,
      instructions: "Bring calculator and periodic table",
    },
  ]

  const attendanceData = {
    overall: {
      totalClasses: 120,
      attendedClasses: 116,
      absentClasses: 4,
      percentage: 96.7,
    },
    subjectWise: [
      { subject: "Mathematics", total: 25, attended: 24, percentage: 96.0 },
      { subject: "English", total: 20, attended: 20, percentage: 100.0 },
      { subject: "Science", total: 22, attended: 21, percentage: 95.5 },
      { subject: "History", total: 18, attended: 18, percentage: 100.0 },
      { subject: "Geography", total: 15, attended: 14, percentage: 93.3 },
      { subject: "Computer Science", total: 12, attended: 12, percentage: 100.0 },
    ],
    monthlyTrend: [
      { month: "September", percentage: 98.0 },
      { month: "October", percentage: 95.5 },
      { month: "November", percentage: 97.2 },
      { month: "December", percentage: 94.8 },
      { month: "January", percentage: 96.7 },
    ],
  }

  const financeDetails = {
    totalFees: 25000,
    paidAmount: 25000,
    pendingAmount: 0,
    nextDueDate: "2024-04-01",
    feeStructure: {
      tuitionFee: 18000,
      libraryFee: 2000,
      labFee: 3000,
      sportsFee: 1000,
      examFee: 1000,
    },
    paymentHistory: [
      {
        id: 1,
        date: "2024-01-15",
        amount: 12500,
        description: "First Installment - Tuition & Library Fee",
        method: "Online Payment",
        status: "Paid",
        receiptNumber: "RCP001",
      },
      {
        id: 2,
        date: "2024-01-15",
        amount: 12500,
        description: "Second Installment - Lab, Sports & Exam Fee",
        method: "Bank Transfer",
        status: "Paid",
        receiptNumber: "RCP002",
      },
    ],
  }

  const homeworkAssessments = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      subject: "Mathematics",
      assignedDate: "2024-02-10",
      dueDate: "2024-02-20",
      submissionDate: "2024-02-18",
      status: "Submitted",
      grade: "A",
      marks: "18/20",
      feedback: "Excellent work! Minor calculation error in question 3.",
      type: "Homework",
    },
    {
      id: 2,
      title: "Essay on Climate Change",
      subject: "English",
      assignedDate: "2024-02-08",
      dueDate: "2024-02-18",
      submissionDate: null,
      status: "Pending",
      grade: null,
      marks: null,
      feedback: null,
      type: "Assignment",
    },
    {
      id: 3,
      title: "Lab Report - Chemical Reactions",
      subject: "Science",
      assignedDate: "2024-02-05",
      dueDate: "2024-02-15",
      submissionDate: "2024-02-14",
      status: "Graded",
      grade: "B+",
      marks: "16/20",
      feedback: "Good observations. Include more detailed analysis.",
      type: "Lab Report",
    },
    {
      id: 4,
      title: "World War II Timeline",
      subject: "History",
      assignedDate: "2024-02-12",
      dueDate: "2024-02-22",
      submissionDate: null,
      status: "In Progress",
      grade: null,
      marks: null,
      feedback: null,
      type: "Project",
    },
  ]

  const studyMaterials = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2024-02-01",
      teacher: "Dr. Smith",
      description: "Complete guide to algebraic expressions and equations",
    },
    {
      id: 2,
      title: "English Grammar Rules",
      subject: "English",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-28",
      teacher: "Ms. Johnson",
      description: "Comprehensive grammar reference with examples",
    },
    {
      id: 3,
      title: "Physics Lab Manual",
      subject: "Science",
      type: "PDF",
      size: "5.2 MB",
      uploadDate: "2024-01-25",
      teacher: "Mr. Brown",
      description: "Laboratory experiments and procedures",
    },
    {
      id: 4,
      title: "World History Presentation",
      subject: "History",
      type: "PPT",
      size: "8.1 MB",
      uploadDate: "2024-02-05",
      teacher: "Mrs. Davis",
      description: "Ancient civilizations and their contributions",
    },
  ]

  const permissionRequests = [
    {
      id: 1,
      type: "Leave Request",
      reason: "Medical appointment",
      startDate: "2024-02-20",
      endDate: "2024-02-20",
      status: "Approved",
      appliedDate: "2024-02-15",
      approvedBy: "Class Teacher",
      remarks: "Medical certificate submitted",
    },
    {
      id: 2,
      type: "Sports Event Participation",
      reason: "Inter-school basketball tournament",
      startDate: "2024-02-25",
      endDate: "2024-02-27",
      status: "Pending",
      appliedDate: "2024-02-10",
      approvedBy: null,
      remarks: null,
    },
  ]

  const progressReport = {
    currentSemester: {
      gpa: 3.8,
      rank: 5,
      totalStudents: 45,
      percentage: 89.2,
    },
    subjectGrades: [
      { subject: "Mathematics", grade: "A", marks: 92, maxMarks: 100, teacher: "Dr. Smith" },
      { subject: "English", grade: "A-", marks: 88, maxMarks: 100, teacher: "Ms. Johnson" },
      { subject: "Science", grade: "A", marks: 91, maxMarks: 100, teacher: "Mr. Brown" },
      { subject: "History", grade: "B+", marks: 85, maxMarks: 100, teacher: "Mrs. Davis" },
      { subject: "Geography", grade: "A-", marks: 87, maxMarks: 100, teacher: "Mr. Wilson" },
      { subject: "Computer Science", grade: "A", marks: 94, maxMarks: 100, teacher: "Mr. Tech" },
    ],
    semesterHistory: [
      { semester: "Semester 1", gpa: 3.6, percentage: 86.5, rank: 7 },
      { semester: "Semester 2", gpa: 3.8, percentage: 89.2, rank: 5 },
    ],
    achievements: [
      { title: "Mathematics Olympiad - District Level", date: "2024-01-15", type: "Academic" },
      { title: "Best Student of the Month", date: "2024-02-01", type: "Recognition" },
      { title: "Science Fair - Second Prize", date: "2024-01-20", type: "Competition" },
    ],
  }

  const alertMessages = [
    {
      id: 1,
      title: "Mid-term Examination Schedule Released",
      message:
        "The mid-term examination schedule has been published. Please check your exam dates and prepare accordingly.",
      type: "Academic",
      priority: "High",
      date: "2024-02-15",
      read: false,
      sender: "Academic Office",
    },
    {
      id: 2,
      title: "Library Book Return Reminder",
      message: "You have 2 books due for return by February 20th. Please return them to avoid late fees.",
      type: "Library",
      priority: "Medium",
      date: "2024-02-14",
      read: false,
      sender: "Library",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      message: "Parent-Teacher meeting is scheduled for February 25th. Please inform your parents about the meeting.",
      type: "General",
      priority: "Medium",
      date: "2024-02-12",
      read: true,
      sender: "Administration",
    },
    {
      id: 4,
      title: "Sports Day Registration Open",
      message: "Registration for annual sports day is now open. Register before February 28th to participate.",
      type: "Sports",
      priority: "Low",
      date: "2024-02-10",
      read: false,
      sender: "Sports Department",
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
            {module.id === "alerts" && studentStats.unreadAlerts > 0 && (
              <Badge variant="destructive" className="ml-auto text-xs">
                {studentStats.unreadAlerts}
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
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {studentProfile.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Class {studentProfile.class}</Badge>
            <Badge variant="outline">Roll No: {studentProfile.rollNumber}</Badge>
          </div>
        </div>

        {activeModule === "overview" && (
          <StudentOverview
            stats={studentStats}
            profile={studentProfile}
            alerts={alertMessages}
            setActiveModule={setActiveModule}
          />
        )}
        {activeModule === "profile" && <StudentProfile profile={studentProfile} />}
        {activeModule === "timetable" && <StudentTimetable timetable={weeklyTimetable} />}
        {activeModule === "exams" && <UpcomingExams exams={upcomingExams} />}
        {activeModule === "attendance" && <AttendanceManagement attendance={attendanceData} />}
        {activeModule === "finance" && <FinanceDetails finance={financeDetails} />}
        {activeModule === "homework" && <HomeworkAssessments homework={homeworkAssessments} />}
        {activeModule === "materials" && <StudyMaterials materials={studyMaterials} />}
        {activeModule === "permissions" && <PermissionsModule permissions={permissionRequests} />}
        {activeModule === "progress" && <ProgressReport progress={progressReport} />}
        {activeModule === "alerts" && <AlertMessages alerts={alertMessages} />}
      </div>
    </AppLayout>
  )
}

function StudentOverview({
  stats,
  profile,
  alerts,
  setActiveModule,
}: { stats: any; profile: any; alerts: any[]; setActiveModule: any }) {
  const unreadAlerts = alerts.filter((alert) => !alert.read).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentGPA}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Rank {stats.rank} of {stats.totalStudents}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 inline mr-1" />
              Excellent attendance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Assignments due
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Next 2 weeks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModule("homework")}>
                <FileText className="w-4 h-4 mr-2" />
                Submit Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModule("timetable")}>
                <Calendar className="w-4 h-4 mr-2" />
                View Timetable
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModule("finance")}>
                <DollarSign className="w-4 h-4 mr-2" />
                Check Fees
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModule("permissions")}>
                <Send className="w-4 h-4 mr-2" />
                Request Permission
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Important notifications and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unreadAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {alert.type}
                      </Badge>
                      <span className="text-xs text-gray-400">{alert.date}</span>
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

function StudentProfile({ profile }: { profile: any }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="text-lg">
                {profile.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{profile.name}</CardTitle>
            <CardDescription>
              Class {profile.class} - Section {profile.section}
            </CardDescription>
            <Badge variant="outline" className="mt-2">
              Roll No: {profile.rollNumber}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Admission No:</span> {profile.admissionNumber}
              </p>
              <p>
                <span className="font-medium">Academic Year:</span> {profile.academicYear}
              </p>
              <p>
                <span className="font-medium">Admission Date:</span> {profile.admissionDate}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Email:</span> {profile.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {profile.phone}
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth:</span> {profile.dateOfBirth}
                    </p>
                    <p>
                      <span className="font-medium">Blood Group:</span> {profile.bloodGroup}
                    </p>
                    <p>
                      <span className="font-medium">Nationality:</span> {profile.nationality}
                    </p>
                    <p>
                      <span className="font-medium">Religion:</span> {profile.religion}
                    </p>
                    <p>
                      <span className="font-medium">Category:</span> {profile.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Address:</span> {profile.address}
                    </p>
                    <p>
                      <span className="font-medium">Parent Name:</span> {profile.parentName}
                    </p>
                    <p>
                      <span className="font-medium">Parent Phone:</span> {profile.parentPhone}
                    </p>
                    <p>
                      <span className="font-medium">Parent Email:</span> {profile.parentEmail}
                    </p>
                    <p>
                      <span className="font-medium">Emergency Contact:</span> {profile.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StudentTimetable({ timetable }: { timetable: any }) {
  const handleDownloadTimetable = () => {
    // Create a simple text representation of the timetable
    let timetableText = "WEEKLY TIMETABLE\n\n"
    Object.entries(timetable).forEach(([day, classes]) => {
      timetableText += `${day.toUpperCase()}\n`
      classes.forEach((classItem) => {
        timetableText += `${classItem.time} - ${classItem.subject} (${classItem.teacher}) - ${classItem.room}\n`
      })
      timetableText += "\n"
    })

    const blob = new Blob([timetableText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "timetable.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Timetable</h2>
        <Button variant="outline" onClick={handleDownloadTimetable}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Your complete class timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(timetable).map(([day, classes]: [string, any]) => (
              <div key={day}>
                <h3 className="font-medium text-lg mb-3 text-blue-600">{day}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {classes.map((classItem: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{classItem.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {classItem.room}
                        </Badge>
                      </div>
                      <h4 className="font-medium">{classItem.subject}</h4>
                      <p className="text-sm text-gray-500">{classItem.teacher}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UpcomingExams({ exams }: { exams: any[] }) {
  const handleDownloadSchedule = () => {
    let scheduleText = "EXAM SCHEDULE\n\n"
    exams.forEach((exam) => {
      scheduleText += `Subject: ${exam.subject}\n`
      scheduleText += `Date: ${exam.date}\n`
      scheduleText += `Time: ${exam.time}\n`
      scheduleText += `Room: ${exam.room}\n`
      scheduleText += `Syllabus: ${exam.syllabus}\n\n`
    })

    const blob = new Blob([scheduleText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "exam-schedule.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Upcoming Exams</h2>
        <Button variant="outline" onClick={handleDownloadSchedule}>
          <Download className="w-4 h-4 mr-2" />
          Download Schedule
        </Button>
      </div>

      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{exam.subject}</CardTitle>
                  <CardDescription>{exam.type}</CardDescription>
                </div>
                <Badge variant="outline">{exam.totalMarks} Marks</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">Date:</span> {exam.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">Time:</span> {exam.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">Duration:</span> {exam.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">Room:</span> {exam.room}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-sm">Syllabus:</span>
                    <p className="text-sm text-gray-600 mt-1">{exam.syllabus}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Instructions:</span>
                    <p className="text-sm text-gray-600 mt-1">{exam.instructions}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AttendanceManagement({ attendance }: { attendance: any }) {
  const handleDownloadReport = () => {
    let reportText = "ATTENDANCE REPORT\n\n"
    reportText += `Overall Attendance: ${attendance.overall.percentage}%\n`
    reportText += `Total Classes: ${attendance.overall.totalClasses}\n`
    reportText += `Attended: ${attendance.overall.attendedClasses}\n`
    reportText += `Missed: ${attendance.overall.absentClasses}\n\n`

    reportText += "SUBJECT-WISE ATTENDANCE:\n"
    attendance.subjectWise.forEach((subject) => {
      reportText += `${subject.subject}: ${subject.percentage}% (${subject.attended}/${subject.total})\n`
    })

    const blob = new Blob([reportText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "attendance-report.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <Button variant="outline" onClick={handleDownloadReport}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Overall Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
          <CardDescription>Your complete attendance summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{attendance.overall.percentage}%</div>
              <p className="text-sm text-gray-500">Overall Attendance</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{attendance.overall.attendedClasses}</div>
              <p className="text-sm text-gray-500">Classes Attended</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{attendance.overall.absentClasses}</div>
              <p className="text-sm text-gray-500">Classes Missed</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{attendance.overall.totalClasses}</div>
              <p className="text-sm text-gray-500">Total Classes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Attendance breakdown by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Total Classes</TableHead>
                <TableHead>Attended</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.subjectWise.map((subject: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{subject.subject}</TableCell>
                  <TableCell>{subject.total}</TableCell>
                  <TableCell>{subject.attended}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={subject.percentage} className="w-16" />
                      <span className="text-sm">{subject.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subject.percentage >= 95 ? "default" : subject.percentage >= 85 ? "secondary" : "destructive"
                      }
                    >
                      {subject.percentage >= 95 ? "Excellent" : subject.percentage >= 85 ? "Good" : "Poor"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function FinanceDetails({ finance }: { finance: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Finance Details</h2>
        <Button variant="outline">
          <CreditCard className="w-4 h-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Fee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{finance.totalFees.toLocaleString()}</div>
            <p className="text-sm text-gray-500">Academic Year 2024-25</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹{finance.paidAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-500">Payment Complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">₹{finance.pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-500">
              {finance.pendingAmount > 0 ? `Due: ${finance.nextDueDate}` : "All Paid"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
          <CardDescription>Breakdown of annual fees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(finance.feeStructure).map(([type, amount]: [string, any]) => (
              <div key={type} className="flex justify-between items-center p-3 border rounded-lg">
                <span className="capitalize font-medium">{type.replace(/([A-Z])/g, " $1")}</span>
                <span className="font-bold">₹{amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Record of all fee payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finance.paymentHistory.map((payment: any) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant="default">{payment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      {payment.receiptNumber}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function HomeworkAssessments({ homework }: { homework: any[] }) {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Add submit dialog and functionality:
  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmitDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Homework & Assessments</h2>
        <Button onClick={() => setShowSubmitDialog(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Submit Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {homework.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.subject} • {item.type}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    item.status === "Submitted"
                      ? "default"
                      : item.status === "Graded"
                        ? "secondary"
                        : item.status === "Pending"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">Assigned:</span> {item.assignedDate}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">Due:</span> {item.dueDate}
                    </span>
                  </div>
                  {item.submissionDate && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">
                        <span className="font-medium">Submitted:</span> {item.submissionDate}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {item.grade && (
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">
                        <span className="font-medium">Grade:</span> {item.grade} ({item.marks})
                      </span>
                    </div>
                  )}
                  {item.feedback && (
                    <div>
                      <span className="font-medium text-sm">Feedback:</span>
                      <p className="text-sm text-gray-600 mt-1">{item.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
              {item.status === "Pending" && (
                <div className="mt-4">
                  <Button size="sm" onClick={() => handleSubmitAssignment(item)}>
                    <Upload className="w-3 h-3 mr-1" />
                    Submit Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StudyMaterials({ materials }: { materials: any[] }) {
  const handleViewMaterial = (material) => {
    // Simulate viewing material
    window.open(`/placeholder-document.pdf`, "_blank")
  }

  const handleDownloadMaterial = (material) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = `/placeholder-document.pdf`
    link.download = material.title
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Study Materials</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Resources</CardTitle>
          <CardDescription>Notes, presentations, and learning materials</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{material.title}</p>
                      <p className="text-sm text-gray-500">{material.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{material.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{material.type}</Badge>
                  </TableCell>
                  <TableCell>{material.size}</TableCell>
                  <TableCell>{material.teacher}</TableCell>
                  <TableCell>{material.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewMaterial(material)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadMaterial(material)}>
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function PermissionsModule({ permissions }: { permissions: any[] }) {
  const [showRequestForm, setShowRequestForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Permissions</h2>
        <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Permission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Permission Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leave">Leave Request</SelectItem>
                    <SelectItem value="sports">Sports Event Participation</SelectItem>
                    <SelectItem value="cultural">Cultural Event Participation</SelectItem>
                    <SelectItem value="academic">Academic Event Participation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <Textarea placeholder="Enter reason for permission" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowRequestForm(false)}>Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Requests</CardTitle>
          <CardDescription>Your permission requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">{permission.type}</TableCell>
                  <TableCell>{permission.reason}</TableCell>
                  <TableCell>
                    {permission.startDate} to {permission.endDate}
                  </TableCell>
                  <TableCell>{permission.appliedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        permission.status === "Approved"
                          ? "default"
                          : permission.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {permission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{permission.approvedBy || "-"}</TableCell>
                  <TableCell>{permission.remarks || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function ProgressReport({ progress }: { progress: any }) {
  const handleDownloadReport = () => {
    let reportText = "PROGRESS REPORT\n\n"
    reportText += `Current GPA: ${progress.currentSemester.gpa}\n`
    reportText += `Class Rank: ${progress.currentSemester.rank} of ${progress.currentSemester.totalStudents}\n`
    reportText += `Percentage: ${progress.currentSemester.percentage}%\n\n`

    reportText += "SUBJECT-WISE PERFORMANCE:\n"
    progress.subjectGrades.forEach((subject) => {
      reportText += `${subject.subject}: ${subject.grade} (${subject.marks}/${subject.maxMarks}) - ${subject.teacher}\n`
    })

    const blob = new Blob([reportText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "progress-report.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Progress Report</h2>
        <Button variant="outline" onClick={handleDownloadReport}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Current Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{progress.currentSemester.gpa}</div>
            <p className="text-sm text-gray-500">Out of 4.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Class Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{progress.currentSemester.rank}</div>
            <p className="text-sm text-gray-500">Out of {progress.currentSemester.totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{progress.currentSemester.percentage}%</div>
            <p className="text-sm text-gray-500">Overall Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">A</div>
            <p className="text-sm text-gray-500">Current Grade</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Performance</CardTitle>
          <CardDescription>Your grades and marks in each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.subjectGrades.map((subject: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{subject.subject}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  <TableCell>
                    {subject.marks}/{subject.maxMarks}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subject.grade.startsWith("A")
                          ? "default"
                          : subject.grade.startsWith("B")
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {subject.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Progress value={(subject.marks / subject.maxMarks) * 100} className="w-20" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Recognition</CardTitle>
          <CardDescription>Your accomplishments and awards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.achievements.map((achievement: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">
                    {achievement.type} • {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AlertMessages({ alerts }: { alerts: any[] }) {
  const [filter, setFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unread") return !alert.read
    return alert.type.toLowerCase() === filter
  })

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert)
    setShowAlertDialog(true)
    // Mark as read
    alert.read = true
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Alert Messages</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter alerts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="library">Library</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={!alert.read ? "border-blue-200 bg-blue-50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {alert.priority === "High" ? (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    ) : alert.priority === "Medium" ? (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      {!alert.read && (
                        <Badge variant="destructive" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {alert.type}
                      </Badge>
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
                      <span className="text-xs text-gray-500">{alert.date}</span>
                      <span className="text-xs text-gray-500">• {alert.sender}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewAlert(alert)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{alert.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No alerts found for the selected filter</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAlert?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline">{selectedAlert?.type}</Badge>
              <Badge variant={selectedAlert?.priority === "High" ? "destructive" : "secondary"}>
                {selectedAlert?.priority}
              </Badge>
              <span className="text-sm text-gray-500">{selectedAlert?.date}</span>
            </div>
            <p className="text-gray-700">{selectedAlert?.message}</p>
            <div className="mt-4 text-sm text-gray-500">From: {selectedAlert?.sender}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
