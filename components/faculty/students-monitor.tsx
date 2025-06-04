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
  CheckCircle,
  Calendar,
  Bus,
  Video,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Download,
  Upload,
  Play,
  Award,
  Filter,
} from "lucide-react"

interface StudentsMonitorProps {
  searchQuery: string
}

export function StudentsMonitor({ searchQuery }: StudentsMonitorProps) {
  const [activeTab, setActiveTab] = useState("profiles")
  const [emergencyAlert, setEmergencyAlert] = useState(false)

  // Add filter functionality:
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [feeFilter, setFeeFilter] = useState("all")

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/students")
      const data = await response.json()
      setStudents(data.students || [])
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const attendanceData = [
    { date: "2024-02-15", present: 28, absent: 2, total: 30, percentage: 93.3 },
    { date: "2024-02-14", present: 29, absent: 1, total: 30, percentage: 96.7 },
    { date: "2024-02-13", present: 27, absent: 3, total: 30, percentage: 90.0 },
  ]

  const examSchedule = [
    {
      id: 1,
      subject: "Mathematics",
      date: "2024-02-25",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Exam Hall A",
      type: "Mid-term",
      syllabus: "Chapters 1-5",
    },
    {
      id: 2,
      subject: "Physics",
      date: "2024-02-27",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Exam Hall B",
      type: "Mid-term",
      syllabus: "Chapters 1-4",
    },
  ]

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      subject: "Mathematics",
      class: "10-A",
      assignedDate: "2024-02-10",
      dueDate: "2024-02-20",
      status: "Active",
      submissions: 25,
      totalStudents: 30,
      description: "Solve the given quadratic equations using different methods",
    },
    {
      id: 2,
      title: "Essay on Climate Change",
      subject: "English",
      class: "10-A",
      assignedDate: "2024-02-08",
      dueDate: "2024-02-18",
      status: "Grading",
      submissions: 30,
      totalStudents: 30,
      description: "Write a 500-word essay on the impact of climate change",
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
      downloads: 45,
    },
    {
      id: 2,
      title: "Physics Lab Manual",
      subject: "Physics",
      type: "PDF",
      size: "5.2 MB",
      uploadDate: "2024-01-28",
      downloads: 38,
    },
    {
      id: 3,
      title: "Chemistry Presentation",
      subject: "Chemistry",
      type: "PPT",
      size: "8.1 MB",
      uploadDate: "2024-02-05",
      downloads: 32,
    },
  ]

  const onlineSessions = [
    {
      id: 1,
      title: "Advanced Mathematics Review",
      subject: "Mathematics",
      date: "2024-02-20",
      time: "02:00 PM - 03:00 PM",
      participants: 25,
      status: "Scheduled",
      meetingLink: "https://meet.school.edu/math-review",
    },
    {
      id: 2,
      title: "Physics Lab Discussion",
      subject: "Physics",
      date: "2024-02-18",
      time: "10:00 AM - 11:00 AM",
      participants: 22,
      status: "Completed",
      meetingLink: "https://meet.school.edu/physics-lab",
    },
  ]

  // Update filtered students logic:
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClass = selectedClass === "all" || student.class === selectedClass

    return matchesSearch && matchesClass
  })

  // Update the emergency alert button to be functional:
  const handleEmergencyAlert = () => {
    setEmergencyAlert(true)
    // In a real application, this would trigger actual emergency protocols
    setTimeout(() => setEmergencyAlert(false), 5000)
  }

  // Add exam management functions:
  const [showAddExamDialog, setShowAddExamDialog] = useState(false)
  const [editingExam, setEditingExam] = useState(null)

  const handleAddExam = () => {
    setShowAddExamDialog(true)
  }

  const handleEditExam = (exam) => {
    setEditingExam(exam)
  }

  const handleViewExam = (exam) => {
    // Show exam details
    alert(`Viewing exam: ${exam.subject}`)
  }

  const [showCreateAssignmentDialog, setShowCreateAssignmentDialog] = useState(false)
  const [showSubmissionsDialog, setShowSubmissionsDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Add assignment management functions:
  const handleCreateAssignment = () => {
    setShowCreateAssignmentDialog(true)
  }

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmissionsDialog(true)
  }

  const handleGradeAssignment = (assignment) => {
    // Navigate to grading interface
    alert(`Grading assignment: ${assignment.title}`)
  }

  const [showUploadDialog, setShowUploadDialog] = useState(false)

  // Add material management functions:
  const handleUploadMaterial = () => {
    setShowUploadDialog(true)
  }

  const handleDownloadMaterial = (material) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = `/placeholder-document.pdf`
    link.download = material.title
    link.click()
  }

  const handleEditMaterial = (material) => {
    alert(`Editing material: ${material.title}`)
  }

  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false)
  const [showUploadVideoDialog, setShowUploadVideoDialog] = useState(false)

  // Add session management functions:
  const handleCreateLiveSession = () => {
    setShowCreateSessionDialog(true)
  }

  const handleUploadVideo = () => {
    setShowUploadVideoDialog(true)
  }

  const handleJoinSession = (session) => {
    // Simulate joining session
    window.open(session.meetingLink, "_blank")
  }

  const [editingAttendance, setEditingAttendance] = useState(null)

  // Add mark attendance functionality:
  const handleMarkAttendance = () => {
    // Simulate marking attendance
    alert("Attendance marked successfully!")
  }

  // Filter students by fee status:
  const filteredStudentsByFee = filteredStudents.filter((student) => {
    if (feeFilter === "all") return true
    return student.feeStatus.toLowerCase() === feeFilter
  })

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      {emergencyAlert && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Emergency alert has been sent to administration and security. Help is on the way.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Students Monitor</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="destructive" size="sm" onClick={handleEmergencyAlert}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency Alert
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="profiles">Profiles</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="online">Online Sessions</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Profiles</CardTitle>
                  <CardDescription>Detailed student information and academic records</CardDescription>
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="10-A">10-A</SelectItem>
                    <SelectItem value="10-B">10-B</SelectItem>
                    <SelectItem value="11-A">11-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div>Loading students...</div>
                ) : (
                  filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-gray-500">
                            Roll: {student.rollNumber} • Class: {student.class}
                          </p>
                          <p className="text-xs text-gray-400">
                            GPA: {student.gpa} • Attendance: {student.attendance}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                          {student.feeStatus}
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
                              <DialogTitle>Student Profile - {student.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-6 py-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Roll Number:</span> {student.rollNumber}
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
                                      <span className="font-medium">GPA:</span> {student.gpa}
                                    </p>
                                    <p>
                                      <span className="font-medium">Attendance:</span> {student.attendance}%
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Transport Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <span className="font-medium">Route:</span> {student.transportRoute}
                                    </p>
                                    <p>
                                      <span className="font-medium">Bus Number:</span> {student.busNumber}
                                    </p>
                                    <p>
                                      <span className="font-medium">Pickup Time:</span> {student.pickupTime}
                                    </p>
                                    <p>
                                      <span className="font-medium">Drop Time:</span> {student.dropTime}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attendance Tracking</CardTitle>
                  <CardDescription>Record and monitor student attendance</CardDescription>
                </div>
                <Button onClick={handleMarkAttendance}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.present}</TableCell>
                      <TableCell>{record.absent}</TableCell>
                      <TableCell>{record.total}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.percentage >= 95 ? "default" : record.percentage >= 90 ? "secondary" : "destructive"
                          }
                        >
                          {record.percentage}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setEditingAttendance(record)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
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
              <CardTitle>Student Timetables</CardTitle>
              <CardDescription>Class schedules and exam dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Interactive timetable view for students</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Exam Schedules & Results</CardTitle>
                  <CardDescription>Manage exam schedules and view results</CardDescription>
                </div>
                <Button onClick={handleAddExam}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Exam
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examSchedule.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.subject}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>{exam.room}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{exam.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewExam(exam)}>
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditExam(exam)}>
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
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

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Homework & Assignments</CardTitle>
                  <CardDescription>Assign, collect, and review student work</CardDescription>
                </div>
                <Button onClick={handleCreateAssignment}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <Badge variant={assignment.status === "Active" ? "default" : "secondary"}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Subject:</span> {assignment.subject} •
                        <span className="font-medium"> Class:</span> {assignment.class}
                      </div>
                      <div>
                        <span className="font-medium">Due:</span> {assignment.dueDate}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm">
                        <span className="font-medium">Submissions:</span> {assignment.submissions}/
                        {assignment.totalStudents}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewSubmissions(assignment)}>
                          <Eye className="w-3 h-3 mr-1" />
                          View Submissions
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGradeAssignment(assignment)}>
                          <Award className="w-3 h-3 mr-1" />
                          Grade
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Study Materials</CardTitle>
                  <CardDescription>Notes, presentations, and learning resources</CardDescription>
                </div>
                <Button onClick={handleUploadMaterial}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Material
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studyMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.title}</TableCell>
                      <TableCell>{material.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{material.type}</Badge>
                      </TableCell>
                      <TableCell>{material.size}</TableCell>
                      <TableCell>{material.uploadDate}</TableCell>
                      <TableCell>{material.downloads}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadMaterial(material)}>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditMaterial(material)}>
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
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

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Fee Details</CardTitle>
                <CardDescription>Payment status and outstanding dues</CardDescription>
                <Select value={feeFilter} onValueChange={setFeeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Fee Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudentsByFee.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-500">Roll: {student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{student.totalFees.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        Paid: ₹{student.paidFees.toLocaleString()} | Pending: ₹{student.pendingFees.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                      {student.feeStatus}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transport Tracking</CardTitle>
              <CardDescription>Monitor student transportation details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Bus className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.transportRoute}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{student.busNumber}</p>
                      <p className="text-sm text-gray-500">
                        Pickup: {student.pickupTime} | Drop: {student.dropTime}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Track
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="online" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Online Sessions</CardTitle>
                  <CardDescription>Virtual classes and meetings</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreateLiveSession}>
                    <Video className="w-4 h-4 mr-2" />
                    Create Live Session
                  </Button>
                  <Button variant="outline" onClick={handleUploadVideo}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video Class
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onlineSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{session.title}</h3>
                        <p className="text-sm text-gray-500">
                          {session.subject} • {session.date} • {session.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{session.participants} participants</p>
                        <Badge variant={session.status === "Scheduled" ? "default" : "secondary"}>
                          {session.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleJoinSession(session)}>
                        {session.status === "Scheduled" ? (
                          <>
                            <Play className="w-3 h-3 mr-1" />
                            Join
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Alert System</CardTitle>
              <CardDescription>Quick alert system for emergency situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="destructive" size="lg" className="h-20" onClick={handleEmergencyAlert}>
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Medical Emergency
                </Button>
                <Button variant="destructive" size="lg" className="h-20" onClick={handleEmergencyAlert}>
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Security Alert
                </Button>
                <Button variant="destructive" size="lg" className="h-20" onClick={handleEmergencyAlert}>
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Fire Emergency
                </Button>
                <Button variant="destructive" size="lg" className="h-20" onClick={handleEmergencyAlert}>
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  General Emergency
                </Button>
              </div>
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Emergency Procedures:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Click the appropriate emergency button above</li>
                  <li>• Alert will be sent to administration, security, and medical staff</li>
                  <li>• Follow school emergency protocols</li>
                  <li>• Ensure student safety is the top priority</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
