"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Eye, Calendar, Clock, CheckCircle, AlertCircle, Users, Filter, Trash2 } from "lucide-react"

interface StaffManagementProps {
  searchQuery: string
}

export function StaffManagement({ searchQuery }: StaffManagementProps) {
  const [activeTab, setActiveTab] = useState("list")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredStaff, setFilteredStaff] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState(null)

  useEffect(() => {
    fetchStaff()
  }, [])

  useEffect(() => {
    filterStaff()
  }, [staff, searchQuery, selectedDepartment])

  const fetchStaff = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/faculty")
      const data = await response.json()
      setStaff(data.faculty || [])
    } catch (error) {
      console.error("Error fetching staff:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterStaff = () => {
    const filtered = staff.filter((member) => {
      const matchesSearch =
        member.personalInfo?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.personalInfo?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.professionalInfo?.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.professionalInfo?.position?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment =
        selectedDepartment === "all" || member.professionalInfo?.department?.toLowerCase() === selectedDepartment

      return matchesSearch && matchesDepartment
    })
    setFilteredStaff(filtered)
  }

  const handleDeleteStaff = async (staffId) => {
    try {
      const response = await fetch(`/api/faculty/${staffId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchStaff()
        setShowDeleteDialog(false)
        setStaffToDelete(null)
        alert("Staff member deleted successfully!")
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error deleting staff:", error)
      alert("Error deleting staff member")
    }
  }

  const staffMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@school.edu",
      department: "Mathematics",
      position: "Head of Department",
      experience: "12 years",
      salary: 85000,
      status: "Active",
      joinDate: "2012-08-15",
      phone: "+1 234-567-8901",
      address: "123 Main St, City",
      qualifications: "PhD in Mathematics",
      subjects: ["Algebra", "Calculus", "Statistics"],
      attendance: 96.5,
      leaveBalance: 18,
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Prof. Michael Brown",
      email: "michael.brown@school.edu",
      department: "Science",
      position: "Senior Teacher",
      experience: "8 years",
      salary: 72000,
      status: "Active",
      joinDate: "2016-01-10",
      phone: "+1 234-567-8902",
      address: "456 Oak Ave, City",
      qualifications: "MSc in Physics",
      subjects: ["Physics", "Chemistry"],
      attendance: 94.2,
      leaveBalance: 15,
      performance: "Very Good",
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      email: "emily.davis@school.edu",
      department: "English",
      position: "Teacher",
      experience: "5 years",
      salary: 58000,
      status: "On Leave",
      joinDate: "2019-09-01",
      phone: "+1 234-567-8903",
      address: "789 Pine St, City",
      qualifications: "MA in English Literature",
      subjects: ["English Literature", "Creative Writing"],
      attendance: 92.8,
      leaveBalance: 8,
      performance: "Good",
    },
  ]

  const leaveRequests = [
    {
      id: 1,
      staffName: "Dr. Sarah Johnson",
      type: "Sick Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      days: 3,
      reason: "Medical treatment",
      status: "Pending",
      appliedDate: "2024-02-10",
    },
    {
      id: 2,
      staffName: "Prof. Michael Brown",
      type: "Casual Leave",
      startDate: "2024-02-20",
      endDate: "2024-02-22",
      days: 3,
      reason: "Personal work",
      status: "Approved",
      appliedDate: "2024-02-08",
    },
  ]

  const salaryData = [
    {
      id: 1,
      staffName: "Dr. Sarah Johnson",
      basicSalary: 70000,
      allowances: 15000,
      deductions: 8500,
      netSalary: 76500,
      month: "January 2024",
      status: "Paid",
    },
    {
      id: 2,
      staffName: "Prof. Michael Brown",
      basicSalary: 60000,
      allowances: 12000,
      deductions: 7200,
      netSalary: 64800,
      month: "January 2024",
      status: "Paid",
    },
  ]

  const timetableData = [
    {
      id: 1,
      staffName: "Dr. Sarah Johnson",
      monday: ["Math 10A (9:00-10:00)", "Math 12B (11:00-12:00)"],
      tuesday: ["Math 10B (9:00-10:00)", "Statistics (2:00-3:00)"],
      wednesday: ["Math 10A (10:00-11:00)", "Calculus (3:00-4:00)"],
      thursday: ["Math 12A (9:00-10:00)", "Math 10B (2:00-3:00)"],
      friday: ["Statistics (10:00-11:00)", "Calculus (11:00-12:00)"],
    },
  ]

  // const filteredStaff = staffMembers.filter(
  //   (staff) =>
  //     staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     staff.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     staff.position.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Enter the details of the new staff member</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="Enter email address" />
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
                    <SelectItem value="principal">Principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary</label>
                <Input placeholder="Enter salary amount" type="number" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Staff Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="list">Staff List</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Faculty Members</CardTitle>
                  <CardDescription>Comprehensive list of all teaching staff</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <p>Loading staff members...</p>
                ) : filteredStaff.length === 0 ? (
                  <p>No staff members found.</p>
                ) : (
                  filteredStaff.map((staff) => (
                    <div key={staff._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                          <AvatarFallback>
                            {staff.personalInfo?.firstName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {staff.personalInfo?.firstName} {staff.personalInfo?.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {staff.professionalInfo?.position} • {staff.professionalInfo?.department}
                          </p>
                          {/* <p className="text-xs text-gray-400">
                            {staff.experience} experience • ₹{staff.salary.toLocaleString()}/month
                          </p> */}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={staff.status === "Active" ? "default" : "secondary"}>{staff.status}</Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>
                                Staff Profile - {staff.personalInfo?.firstName} {staff.personalInfo?.lastName}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-6 py-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Email:</span> {staff.personalInfo?.email}
                                    </p>
                                    <p>
                                      <span className="font-medium">Phone:</span> {staff.personalInfo?.phone}
                                    </p>
                                    <p>
                                      <span className="font-medium">Address:</span> {staff.personalInfo?.address}
                                    </p>
                                    {/* <p>
                                      <span className="font-medium">Join Date:</span> {staff.joinDate}
                                    </p> */}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Professional Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Department:</span>{" "}
                                      {staff.professionalInfo?.department}
                                    </p>
                                    <p>
                                      <span className="font-medium">Position:</span> {staff.professionalInfo?.position}
                                    </p>
                                    {/* <p>
                                      <span className="font-medium">Qualifications:</span> {staff.qualifications}
                                    </p>
                                    <p>
                                      <span className="font-medium">Experience:</span> {staff.experience}
                                    </p> */}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                {/* <div>
                                  <h4 className="font-medium mb-2">Subjects Teaching</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {staff.subjects.map((subject, index) => (
                                      <Badge key={index} variant="outline">
                                        {subject}
                                      </Badge>
                                    ))}
                                  </div>
                                </div> */}
                                <div>
                                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                                  <div className="space-y-2 text-sm">
                                    {/* <p>
                                      <span className="font-medium">Attendance:</span> {staff.attendance}%
                                    </p>
                                    <p>
                                      <span className="font-medium">Leave Balance:</span> {staff.leaveBalance} days
                                    </p>
                                    <p>
                                      <span className="font-medium">Performance:</span> {staff.performance}
                                    </p>
                                    <p>
                                      <span className="font-medium">Salary:</span> ₹{staff.salary.toLocaleString()}
                                    </p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setShowDeleteDialog(true)
                            setStaffToDelete(staff._id)
                          }}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>Manage staff leave requests and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Name</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.staffName}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>
                        {request.startDate} to {request.endDate} ({request.days} days)
                      </TableCell>
                      <TableCell>{request.reason}</TableCell>
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
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Attendance</CardTitle>
              <CardDescription>Track and manage staff attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">94.2%</p>
                        <p className="text-sm text-gray-500">Overall Attendance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">84</p>
                        <p className="text-sm text-gray-500">Present Today</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-8 h-8 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-gray-500">On Leave</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Detailed attendance tracking interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Salary Management</CardTitle>
              <CardDescription>Manage staff salaries and payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Name</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.map((salary) => (
                    <TableRow key={salary.id}>
                      <TableCell className="font-medium">{salary.staffName}</TableCell>
                      <TableCell>₹{salary.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>₹{salary.allowances.toLocaleString()}</TableCell>
                      <TableCell>₹{salary.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">₹{salary.netSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">{salary.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Slip
                        </Button>
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
              <CardTitle>Timetable Management</CardTitle>
              <CardDescription>Manage staff teaching schedules and timetables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Interactive timetable management interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Progress Tracking</CardTitle>
              <CardDescription>Monitor staff performance and professional development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffMembers.map((staff) => (
                  <Card key={staff.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-sm">{staff.name}</h3>
                          <p className="text-xs text-gray-500">{staff.department}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attendance</span>
                          <span className="font-medium">{staff.attendance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <Badge variant="outline" className="text-xs">
                            {staff.performance}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Experience</span>
                          <span className="font-medium">{staff.experience}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this staff member?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowDeleteDialog(false)
                setStaffToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => handleDeleteStaff(staffToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
