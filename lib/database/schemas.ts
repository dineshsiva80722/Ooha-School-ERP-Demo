import type { ObjectId } from "mongodb"

// Base User Schema
export interface User {
  _id?: ObjectId
  email: string
  password: string
  name: string
  role: "student" | "faculty" | "staff" | "admin" | "super_admin"
  status: "active" | "inactive" | "suspended"
  profileImage?: string
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

// Student Schema
export interface Student {
  _id?: ObjectId
  userId: ObjectId
  personalInfo: {
    rollNumber: string
    admissionNumber: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: "male" | "female" | "other"
    bloodGroup: string
    nationality: string
    religion?: string
    category: string
    phone: string
    email: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  academicInfo: {
    class: string
    section: string
    academicYear: string
    admissionDate: Date
    rollNumber: string
    studentId: string
  }
  parentInfo: {
    fatherName: string
    motherName: string
    guardianName?: string
    fatherOccupation?: string
    motherOccupation?: string
    parentPhone: string
    parentEmail: string
    emergencyContact: string
  }
  financialInfo: {
    totalFees: number
    paidFees: number
    pendingFees: number
    feeStatus: "paid" | "pending" | "overdue"
    paymentHistory: Array<{
      amount: number
      date: Date
      method: string
      receiptNumber: string
      description: string
    }>
  }
  transportInfo?: {
    busRoute: string
    busNumber: string
    pickupPoint: string
    pickupTime: string
    dropTime: string
  }
  medicalInfo?: {
    allergies?: string[]
    medications?: string[]
    emergencyContact: string
    bloodGroup: string
  }
  createdAt: Date
  updatedAt: Date
}

// Faculty Schema
export interface Faculty {
  _id?: ObjectId
  userId: ObjectId
  personalInfo: {
    employeeId: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: "male" | "female" | "other"
    bloodGroup: string
    nationality: string
    phone: string
    email: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
    emergencyContact: string
  }
  professionalInfo: {
    department: string
    position: string
    qualification: string
    experience: string
    joinDate: Date
    subjects: string[]
    classes: string[]
    specialization?: string
  }
  salaryInfo: {
    basicSalary: number
    allowances: {
      houseRent: number
      transport: number
      medical: number
      special: number
    }
    deductions: {
      tax: number
      providentFund: number
      insurance: number
    }
    netSalary: number
    paymentSchedule: string
  }
  attendanceInfo: {
    totalWorkingDays: number
    presentDays: number
    absentDays: number
    leaveDays: number
    attendancePercentage: number
  }
  leaveBalance: {
    annual: number
    sick: number
    casual: number
    maternity: number
  }
  createdAt: Date
  updatedAt: Date
}

// Staff Schema
export interface Staff {
  _id?: ObjectId
  userId: ObjectId
  personalInfo: {
    employeeId: string
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: "male" | "female" | "other"
    bloodGroup: string
    nationality: string
    phone: string
    email: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
    emergencyContact: string
  }
  employmentInfo: {
    department: string
    position: string
    joinDate: Date
    workType: "full-time" | "part-time" | "contract"
    shift: "morning" | "evening" | "night"
  }
  salaryInfo: {
    basicSalary: number
    allowances: Record<string, number>
    deductions: Record<string, number>
    netSalary: number
  }
  createdAt: Date
  updatedAt: Date
}

// Assignment Schema
export interface Assignment {
  _id?: ObjectId
  title: string
  description: string
  subject: string
  class: string
  section?: string
  facultyId: ObjectId
  assignedDate: Date
  dueDate: Date
  totalMarks: number
  instructions?: string
  attachments?: Array<{
    fileName: string
    fileUrl: string
    fileSize: number
  }>
  submissions: Array<{
    studentId: ObjectId
    submissionDate: Date
    content?: string
    attachments?: Array<{
      fileName: string
      fileUrl: string
      fileSize: number
    }>
    status: "submitted" | "late" | "graded"
    grade?: string
    marks?: number
    feedback?: string
  }>
  status: "active" | "closed" | "draft"
  createdAt: Date
  updatedAt: Date
}

// Exam Schema
export interface Exam {
  _id?: ObjectId
  subject: string
  class: string
  section?: string
  examType: "unit-test" | "mid-term" | "final" | "practical"
  date: Date
  startTime: string
  endTime: string
  duration: number
  totalMarks: number
  room: string
  instructions?: string
  syllabus?: string
  facultyId: ObjectId
  results?: Array<{
    studentId: ObjectId
    marks: number
    grade: string
    rank?: number
    absent?: boolean
  }>
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

// Attendance Schema
export interface Attendance {
  _id?: ObjectId
  class: string
  section: string
  subject?: string
  date: Date
  facultyId: ObjectId
  students: Array<{
    studentId: ObjectId
    status: "present" | "absent" | "late" | "excused"
    checkInTime?: Date
    remarks?: string
  }>
  totalStudents: number
  presentCount: number
  absentCount: number
  attendancePercentage: number
  createdAt: Date
  updatedAt: Date
}

// Study Material Schema
export interface StudyMaterial {
  _id?: ObjectId
  title: string
  description?: string
  subject: string
  class: string
  section?: string
  facultyId: ObjectId
  fileType: "pdf" | "doc" | "ppt" | "video" | "image" | "other"
  fileName: string
  fileUrl: string
  fileSize: number
  downloads: number
  tags?: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

// Online Session Schema
export interface OnlineSession {
  _id?: ObjectId
  title: string
  description?: string
  subject: string
  class: string
  section?: string
  facultyId: ObjectId
  sessionType: "live" | "recorded"
  scheduledDate: Date
  startTime: string
  endTime: string
  meetingLink?: string
  recordingUrl?: string
  participants: Array<{
    studentId: ObjectId
    joinTime?: Date
    leaveTime?: Date
    duration?: number
  }>
  maxParticipants?: number
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

// Leave Request Schema
export interface LeaveRequest {
  _id?: ObjectId
  userId: ObjectId
  userType: "student" | "faculty" | "staff"
  leaveType: "sick" | "casual" | "annual" | "maternity" | "emergency" | "other"
  startDate: Date
  endDate: Date
  totalDays: number
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedDate: Date
  approvedBy?: ObjectId
  approvedDate?: Date
  rejectedBy?: ObjectId
  rejectedDate?: Date
  remarks?: string
  attachments?: Array<{
    fileName: string
    fileUrl: string
  }>
  createdAt: Date
  updatedAt: Date
}

// Notification Schema
export interface Notification {
  _id?: ObjectId
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  priority: "low" | "medium" | "high" | "urgent"
  sender: ObjectId
  recipients: Array<{
    userId: ObjectId
    userType: "student" | "faculty" | "staff" | "admin"
    read: boolean
    readAt?: Date
  }>
  category: "academic" | "administrative" | "emergency" | "general" | "fee" | "transport"
  expiryDate?: Date
  attachments?: Array<{
    fileName: string
    fileUrl: string
  }>
  createdAt: Date
  updatedAt: Date
}

// Timetable Schema
export interface Timetable {
  _id?: ObjectId
  class: string
  section: string
  academicYear: string
  schedule: {
    [day: string]: Array<{
      period: number
      startTime: string
      endTime: string
      subject: string
      facultyId: ObjectId
      room: string
      type: "regular" | "lab" | "library" | "sports" | "break"
    }>
  }
  effectiveFrom: Date
  effectiveTo?: Date
  isActive: boolean
  createdBy: ObjectId
  createdAt: Date
  updatedAt: Date
}

// Fee Structure Schema
export interface FeeStructure {
  _id?: ObjectId
  class: string
  academicYear: string
  feeComponents: Array<{
    name: string
    amount: number
    type: "mandatory" | "optional"
    dueDate: Date
  }>
  totalAmount: number
  installments?: Array<{
    installmentNumber: number
    amount: number
    dueDate: Date
    description: string
  }>
  discounts?: Array<{
    type: string
    percentage?: number
    amount?: number
    criteria: string
  }>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Transport Schema
export interface Transport {
  _id?: ObjectId
  routeName: string
  routeNumber: string
  busNumber: string
  driverName: string
  driverPhone: string
  conductorName?: string
  conductorPhone?: string
  capacity: number
  stops: Array<{
    stopName: string
    pickupTime: string
    dropTime: string
    fare: number
  }>
  students: Array<{
    studentId: ObjectId
    stopName: string
    pickupTime: string
    dropTime: string
    monthlyFee: number
  }>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Audit Log Schema
export interface AuditLog {
  _id?: ObjectId
  userId: ObjectId
  userType: string
  action: string
  resource: string
  resourceId?: ObjectId
  details: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}

// System Settings Schema
export interface SystemSettings {
  _id?: ObjectId
  category: string
  key: string
  value: any
  description?: string
  isEditable: boolean
  createdBy: ObjectId
  createdAt: Date
  updatedAt: Date
}

// Grade Schema
export interface Grade {
  _id?: ObjectId
  studentId: ObjectId
  class: string
  section: string
  academicYear: string
  semester: string
  subjects: Array<{
    subject: string
    facultyId: ObjectId
    assessments: Array<{
      type: "assignment" | "test" | "exam" | "project"
      name: string
      maxMarks: number
      obtainedMarks: number
      date: Date
    }>
    totalMarks: number
    obtainedMarks: number
    grade: string
    percentage: number
  }>
  overallPercentage: number
  overallGrade: string
  rank?: number
  totalStudents?: number
  remarks?: string
  createdAt: Date
  updatedAt: Date
}
