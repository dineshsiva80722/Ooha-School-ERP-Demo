"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/components/auth/auth-context"
import { User, DollarSign, Clock, CheckCircle, FileText, Edit, Download, Plus, TrendingUp, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function StaffMonitor() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  // Mock faculty data - in real app, this would come from API
  const facultyProfile = {
    id: user?.id || "3",
    name: user?.name || "Dr. Sarah Johnson",
    email: user?.email || "sarah.johnson@school.edu",
    employeeId: "FAC001",
    department: user?.department || "Mathematics",
    position: "Head of Department",
    qualification: "PhD in Mathematics",
    experience: "12 years",
    joinDate: "2012-08-15",
    phone: "+1 234-567-8901",
    address: "123 Faculty Lane, City",
    emergencyContact: "Robert Johnson - +1 234-567-8902",
    bloodGroup: "O+",
    subjects: ["Algebra", "Calculus", "Statistics", "Advanced Mathematics"],
    classes: ["10-A", "10-B", "11-A", "12-A"],
  }

  const salaryDetails = {
    currentSalary: 85000,
    basicSalary: 70000,
    allowances: {
      houseRent: 8000,
      transport: 3000,
      medical: 2000,
      special: 2000,
    },
    deductions: {
      tax: 8500,
      providentFund: 7000,
      insurance: 1500,
    },
    netSalary: 76500,
    paymentDate: "Last Friday of every month",
  }

  const salaryHistory = [
    {
      month: "January 2024",
      basicSalary: 70000,
      allowances: 15000,
      deductions: 8500,
      netSalary: 76500,
      status: "Paid",
      paymentDate: "2024-01-31",
    },
    {
      month: "December 2023",
      basicSalary: 70000,
      allowances: 15000,
      deductions: 8500,
      netSalary: 76500,
      status: "Paid",
      paymentDate: "2023-12-29",
    },
    {
      month: "November 2023",
      basicSalary: 70000,
      allowances: 15000,
      deductions: 8500,
      netSalary: 76500,
      status: "Paid",
      paymentDate: "2023-11-30",
    },
  ]

  const attendanceData = {
    currentMonth: {
      totalDays: 22,
      presentDays: 21,
      absentDays: 1,
      leaveDays: 0,
      percentage: 95.5,
    },
    leaveBalance: {
      annual: 18,
      sick: 8,
      casual: 5,
      maternity: 0,
    },
    recentAttendance: [
      { date: "2024-02-15", status: "Present", checkIn: "08:30 AM", checkOut: "04:30 PM" },
      { date: "2024-02-14", status: "Present", checkIn: "08:25 AM", checkOut: "04:35 PM" },
      { date: "2024-02-13", status: "Present", checkIn: "08:35 AM", checkOut: "04:25 PM" },
      { date: "2024-02-12", status: "Leave", checkIn: "-", checkOut: "-" },
      { date: "2024-02-11", status: "Present", checkIn: "08:20 AM", checkOut: "04:40 PM" },
    ],
  }

  const leaveRequests = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-02-20",
      endDate: "2024-02-22",
      days: 3,
      reason: "Family vacation",
      status: "Pending",
      appliedDate: "2024-02-10",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-02-12",
      endDate: "2024-02-12",
      days: 1,
      reason: "Medical appointment",
      status: "Approved",
      appliedDate: "2024-02-10",
    },
  ]

  const weeklyTimetable = {
    Monday: [
      { time: "09:00-10:00", subject: "Mathematics", class: "10-A", room: "Room 101" },
      { time: "11:00-12:00", subject: "Advanced Math", class: "12-A", room: "Room 102" },
      { time: "14:00-15:00", subject: "Statistics", class: "11-A", room: "Room 101" },
    ],
    Tuesday: [
      { time: "09:00-10:00", subject: "Mathematics", class: "10-B", room: "Room 101" },
      { time: "10:00-11:00", subject: "Calculus", class: "12-A", room: "Room 102" },
      { time: "15:00-16:00", subject: "Mathematics", class: "10-A", room: "Room 101" },
    ],
    Wednesday: [
      { time: "10:00-11:00", subject: "Mathematics", class: "10-A", room: "Room 101" },
      { time: "11:00-12:00", subject: "Statistics", class: "11-A", room: "Room 101" },
      { time: "14:00-15:00", subject: "Advanced Math", class: "12-A", room: "Room 102" },
    ],
    Thursday: [
      { time: "09:00-10:00", subject: "Mathematics", class: "10-B", room: "Room 101" },
      { time: "11:00-12:00", subject: "Calculus", class: "12-A", room: "Room 102" },
      { time: "15:00-16:00", subject: "Mathematics", class: "10-A", room: "Room 101" },
    ],
    Friday: [
      { time: "10:00-11:00", subject: "Statistics", class: "11-A", room: "Room 101" },
      { time: "11:00-12:00", subject: "Advanced Math", class: "12-A", room: "Room 102" },
      { time: "14:00-15:00", subject: "Mathematics", class: "10-B", room: "Room 101" },
    ],
  }

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState(facultyProfile)

  // Add edit profile function:
  const handleEditProfile = () => {
    if (isEditingProfile) {
      // Save changes
      alert("Profile updated successfully!")
    }
    setIsEditingProfile(!isEditingProfile)
  }

  const handleDownloadSalarySlip = () => {
    let slipText = "SALARY SLIP\n\n"
    slipText += `Employee: ${facultyProfile.name}\n`
    slipText += `Employee ID: ${facultyProfile.employeeId}\n`
    slipText += `Department: ${facultyProfile.department}\n\n`
    slipText += `Basic Salary: ₹${salaryDetails.basicSalary.toLocaleString()}\n`
    slipText += `Allowances: ₹${Object.values(salaryDetails.allowances)
      .reduce((a, b) => a + b, 0)
      .toLocaleString()}\n`
    slipText += `Deductions: ₹${Object.values(salaryDetails.deductions)
      .reduce((a, b) => a + b, 0)
      .toLocaleString()}\n`
    slipText += `Net Salary: ₹${salaryDetails.netSalary.toLocaleString()}\n`

    const blob = new Blob([slipText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "salary-slip.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const [showLeaveRequestDialog, setShowLeaveRequestDialog] = useState(false)

  // Add leave request function:
  const handleRequestLeave = () => {
    setShowLeaveRequestDialog(true)
  }

  const [isEditingTimetable, setIsEditingTimetable] = useState(false)
  const [timetableData, setTimetableData] = useState(weeklyTimetable)

  // Add timetable editing function:
  const handleEditTimetable = () => {
    setIsEditingTimetable(!isEditingTimetable)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Staff Monitor</h2>
        <Button variant="outline" onClick={handleEditProfile}>
          <Edit className="w-4 h-4 mr-2" />
          {isEditingProfile ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="salary">Salary Details</TabsTrigger>
          <TabsTrigger value="attendance">Attendance & Leave</TabsTrigger>
          <TabsTrigger value="timetable">My Timetable</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user?.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {facultyProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{facultyProfile.name}</CardTitle>
                <CardDescription>{facultyProfile.position}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  {facultyProfile.department}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Employee ID:</span> {facultyProfile.employeeId}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span> {facultyProfile.experience}
                  </p>
                  <p>
                    <span className="font-medium">Join Date:</span> {facultyProfile.joinDate}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Email:</span> {facultyProfile.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {facultyProfile.phone}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span> {facultyProfile.address}
                        </p>
                        <p>
                          <span className="font-medium">Emergency Contact:</span> {facultyProfile.emergencyContact}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Blood Group:</span> {facultyProfile.bloodGroup}
                        </p>
                        <p>
                          <span className="font-medium">Qualification:</span> {facultyProfile.qualification}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Subjects Teaching</h4>
                      <div className="flex flex-wrap gap-2">
                        {facultyProfile.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Classes Assigned</h4>
                      <div className="flex flex-wrap gap-2">
                        {facultyProfile.classes.map((classItem, index) => (
                          <Badge key={index} variant="secondary">
                            {classItem}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Salary Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Current Salary Breakdown</CardTitle>
                <CardDescription>Monthly salary components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Basic Salary</span>
                    <span className="font-bold text-green-600">₹{salaryDetails.basicSalary.toLocaleString()}</span>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Allowances</h4>
                    <div className="space-y-2">
                      {Object.entries(salaryDetails.allowances).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span>₹{value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Deductions</h4>
                    <div className="space-y-2">
                      {Object.entries(salaryDetails.deductions).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span>-₹{value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-t">
                    <span className="font-bold">Net Salary</span>
                    <span className="font-bold text-blue-600">₹{salaryDetails.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salary Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Information</CardTitle>
                <CardDescription>Payment details and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <DollarSign className="w-8 h-8 mx-auto text-green-500 mb-2" />
                      <p className="text-2xl font-bold">₹{salaryDetails.currentSalary.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Annual Salary</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-500">Years Experience</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Payment Schedule</h4>
                    <p className="text-sm text-gray-600">{salaryDetails.paymentDate}</p>
                  </div>

                  <Button className="w-full" onClick={handleDownloadSalarySlip}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Current Salary Slip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Salary History */}
          <Card>
            <CardHeader>
              <CardTitle>Salary History</CardTitle>
              <CardDescription>Previous salary payments and records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.month}</TableCell>
                      <TableCell>₹{record.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>₹{record.allowances.toLocaleString()}</TableCell>
                      <TableCell>₹{record.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">₹{record.netSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">{record.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
                <CardDescription>February 2024 attendance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{attendanceData.currentMonth.percentage}%</div>
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{attendanceData.currentMonth.presentDays}</div>
                      <div className="text-gray-500">Present</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="font-bold text-red-600">{attendanceData.currentMonth.absentDays}</div>
                      <div className="text-gray-500">Absent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Balance */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance</CardTitle>
                <CardDescription>Available leave days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(attendanceData.leaveBalance).map(([type, days]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="capitalize text-sm">{type.replace(/([A-Z])/g, " $1")}</span>
                      <Badge variant="outline">{days} days</Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" onClick={handleRequestLeave}>
                  <Plus className="w-4 h-4 mr-2" />
                  Request Leave
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Overall attendance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-medium">Excellent</p>
                      <p className="text-sm text-gray-500">Attendance Record</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="font-medium">12 Years</p>
                      <p className="text-sm text-gray-500">Service Record</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Last 5 days attendance record</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.recentAttendance.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Present" ? "default" : "secondary"}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.status === "Present" ? "8 hours" : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Recent and pending leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.type}</TableCell>
                      <TableCell>
                        {request.startDate} to {request.endDate} ({request.days} days)
                      </TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.appliedDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "default"
                              : request.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-6">
                <CardTitle>My Weekly Timetable</CardTitle>
                <Button variant="outline" onClick={handleEditTimetable}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditingTimetable ? "Save Changes" : "Edit Timetable"}
                </Button>
              </div>
              <CardDescription>Class schedules and teaching commitments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(weeklyTimetable).map(([day, classes]) => (
                  <div key={day}>
                    <h3 className="font-medium text-lg mb-3 text-blue-600">{day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {classes.map((classItem, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{classItem.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {classItem.room}
                            </Badge>
                          </div>
                          {isEditingTimetable ? (
                            <Input
                              defaultValue={classItem.subject}
                              className="text-sm"
                              onChange={(e) => {
                                // Update timetable data
                              }}
                            />
                          ) : (
                            <h4 className="font-medium">{classItem.subject}</h4>
                          )}
                          <p className="text-sm text-gray-500">Class {classItem.class}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timetable Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-sm text-gray-500">Classes per Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-gray-500">Different Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-gray-500">Subjects Teaching</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={showLeaveRequestDialog} onOpenChange={setShowLeaveRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Leave Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason</label>
              <Textarea placeholder="Enter reason for leave" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowLeaveRequestDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowLeaveRequestDialog(false)}>Submit Request</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
