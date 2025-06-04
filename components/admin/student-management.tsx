"use client"

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
import {
  Plus,
  Edit,
  Eye,
  DollarSign,
  MessageSquare,
  FileText,
  CheckCircle,
  Users,
  Award,
  Filter,
  Download,
} from "lucide-react"

interface StudentManagementProps {
  searchQuery: string
}

export function StudentManagement({ searchQuery }: StudentManagementProps) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredStudents, setFilteredStudents] = useState([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState(null)
  const [activeTab, setActiveTab] = useState("list")
  const [selectedClass, setSelectedClass] = useState("all")

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [students, searchQuery, selectedClass])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/students?page=1&limit=50")
      const data = await response.json()
      if (data.students) {
        setStudents(data.students)
      } else {
        setStudents([])
        console.error("No students data received")
      }
    } catch (error) {
      console.error("Error fetching students:", error)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  const filterStudents = () => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.personalInfo?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.personalInfo?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.academicInfo?.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.academicInfo?.class?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesClass = selectedClass === "all" || student.academicInfo?.class === selectedClass

      return matchesSearch && matchesClass
    })
    setFilteredStudents(filtered)
  }

  const handleAddStudent = async (studentData) => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      })

      const data = await response.json()

      if (response.ok) {
        await fetchStudents()
        setShowAddDialog(false)
        alert("Student added successfully!")
      } else {
        alert(`Error: ${data.error || 'Failed to add student'}`)
      }
    } catch (error) {
      console.error("Add student error:", error)
      alert("Failed to add student. Please try again.")
    }
  }

  const handleEditStudent = async (studentId, updateData) => {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        await fetchStudents()
        setEditingStudent(null)
        alert("Student updated successfully!")
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error updating student:", error)
      alert("Error updating student")
    }
  }

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchStudents()
        setShowDeleteDialog(false)
        setStudentToDelete(null)
        alert("Student deleted successfully!")
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error deleting student:", error)
      alert("Error deleting student")
    }
  }

  const handleExportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Roll Number,Class,Email,Phone,Parent Name,Parent Phone,Fee Status\n" +
      filteredStudents
        .map(
          (student) =>
            `${student.personalInfo?.firstName} ${student.personalInfo?.lastName},${student.academicInfo?.rollNumber},${student.academicInfo?.class},${student.personalInfo?.email},${student.personalInfo?.phone},${student.parentInfo?.fatherName},${student.parentInfo?.parentPhone},${student.financialInfo?.feeStatus}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "students_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const feeRecords = [
    {
      id: 1,
      studentName: "John Doe",
      rollNumber: "2024001",
      class: "10-A",
      totalFees: 25000,
      paidAmount: 25000,
      pendingAmount: 0,
      lastPayment: "2024-01-15",
      status: "Paid",
      paymentMethod: "Online",
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      rollNumber: "2024002",
      class: "9-B",
      totalFees: 25000,
      paidAmount: 15000,
      pendingAmount: 10000,
      lastPayment: "2024-01-15",
      status: "Pending",
      paymentMethod: "Cash",
    },
  ]

  const grievances = [
    {
      id: 1,
      studentName: "John Doe",
      rollNumber: "2024001",
      class: "10-A",
      subject: "Exam Schedule Conflict",
      description: "Two exams scheduled on the same day",
      category: "Academic",
      priority: "Medium",
      status: "Open",
      submittedDate: "2024-02-10",
      assignedTo: "Academic Coordinator",
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      rollNumber: "2024002",
      class: "9-B",
      subject: "Library Book Issue",
      description: "Unable to access digital library resources",
      category: "Library",
      priority: "Low",
      status: "Resolved",
      submittedDate: "2024-02-08",
      assignedTo: "Librarian",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the details of the new student</DialogDescription>
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
                <label className="text-sm font-medium">Class</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
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
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="records">Student Records</TabsTrigger>
          <TabsTrigger value="fees">Fee Management</TabsTrigger>
          <TabsTrigger value="grievances">Grievances</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Profiles</CardTitle>
                  <CardDescription>Comprehensive list of all enrolled students</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading students...</div>
              ) : filteredStudents.length === 0 ? (
                <div className="text-center py-8">No students found</div>
              ) : (
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                          <AvatarFallback>
                            {`${student.personalInfo?.firstName?.[0] || ""}${student.personalInfo?.lastName?.[0] || ""}`}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {student.personalInfo?.firstName} {student.personalInfo?.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Roll: {student.academicInfo?.rollNumber} • Class: {student.academicInfo?.class}
                          </p>
                          <p className="text-xs text-gray-400">Email: {student.personalInfo?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={student.financialInfo?.feeStatus === "paid" ? "default" : "destructive"}>
                          {student.financialInfo?.feeStatus || "Pending"}
                        </Badge>
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
                                Student Profile - {student.personalInfo?.firstName} {student.personalInfo?.lastName}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-6 py-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Roll Number:</span>{" "}
                                      {student.academicInfo?.rollNumber}
                                    </p>
                                    <p>
                                      <span className="font-medium">Email:</span> {student.personalInfo?.email}
                                    </p>
                                    <p>
                                      <span className="font-medium">Phone:</span> {student.personalInfo?.phone}
                                    </p>
                                    <p>
                                      <span className="font-medium">Date of Birth:</span>{" "}
                                      {student.personalInfo?.dateOfBirth}
                                    </p>
                                    <p>
                                      <span className="font-medium">Blood Group:</span>{" "}
                                      {student.personalInfo?.bloodGroup}
                                    </p>
                                    <p>
                                      <span className="font-medium">Address:</span>{" "}
                                      {student.personalInfo?.address?.street}, {student.personalInfo?.address?.city}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Parent Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Father Name:</span> {student.parentInfo?.fatherName}
                                    </p>
                                    <p>
                                      <span className="font-medium">Mother Name:</span> {student.parentInfo?.motherName}
                                    </p>
                                    <p>
                                      <span className="font-medium">Parent Phone:</span>{" "}
                                      {student.parentInfo?.parentPhone}
                                    </p>
                                    <p>
                                      <span className="font-medium">Parent Email:</span>{" "}
                                      {student.parentInfo?.parentEmail}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Academic Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Class:</span> {student.academicInfo?.class}
                                    </p>
                                    <p>
                                      <span className="font-medium">Section:</span> {student.academicInfo?.section}
                                    </p>
                                    <p>
                                      <span className="font-medium">Academic Year:</span>{" "}
                                      {student.academicInfo?.academicYear}
                                    </p>
                                    <p>
                                      <span className="font-medium">Admission Date:</span>{" "}
                                      {student.academicInfo?.admissionDate}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Fee Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Total Fees:</span> ₹
                                      {student.financialInfo?.totalFees?.toLocaleString()}
                                    </p>
                                    <p>
                                      <span className="font-medium">Paid:</span> ₹
                                      {student.financialInfo?.paidFees?.toLocaleString()}
                                    </p>
                                    <p>
                                      <span className="font-medium">Pending:</span> ₹
                                      {student.financialInfo?.pendingFees?.toLocaleString()}
                                    </p>
                                    <p>
                                      <span className="font-medium">Status:</span>
                                      <Badge
                                        className="ml-2"
                                        variant={
                                          student.financialInfo?.feeStatus === "paid" ? "default" : "destructive"
                                        }
                                      >
                                        {student.financialInfo?.feeStatus || "Pending"}
                                      </Badge>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={() => setEditingStudent(student)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setStudentToDelete(student)
                            setShowDeleteDialog(true)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Records</CardTitle>
              <CardDescription>Access comprehensive student academic records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">{students.length}</p>
                        <p className="text-sm text-gray-500">Total Students</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">3.7</p>
                        <p className="text-sm text-gray-500">Average GPA</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-8 h-8 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">96.3%</p>
                        <p className="text-sm text-gray-500">Avg Attendance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Detailed student records interface</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Management</CardTitle>
              <CardDescription>Manage student fees and payment tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Fees</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.rollNumber}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>₹{record.totalFees.toLocaleString()}</TableCell>
                      <TableCell>₹{record.paidAmount.toLocaleString()}</TableCell>
                      <TableCell>₹{record.pendingAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Paid" ? "default" : "destructive"}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <DollarSign className="w-3 h-3 mr-1" />
                            Pay
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
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

        <TabsContent value="grievances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grievance & Query Resolution</CardTitle>
              <CardDescription>Manage student grievances and support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grievances.map((grievance) => (
                    <TableRow key={grievance.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{grievance.studentName}</p>
                          <p className="text-sm text-gray-500">
                            {grievance.rollNumber} • {grievance.class}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{grievance.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{grievance.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            grievance.priority === "High"
                              ? "destructive"
                              : grievance.priority === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {grievance.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={grievance.status === "Resolved" ? "default" : "secondary"}>
                          {grievance.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{grievance.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Reply
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
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
      </Tabs>
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {studentToDelete?.personalInfo?.firstName}{" "}
              {studentToDelete?.personalInfo?.lastName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteStudent(studentToDelete._id)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
