import { connectToDatabase } from "../mongodb"
import type {
  User,
  Student,
  Faculty,
  Staff,
  Assignment,
  Exam,
  Attendance,
  StudyMaterial,
  OnlineSession,
  LeaveRequest,
  Notification,
  Timetable,
  AuditLog,
} from "./schemas"

// User Operations
export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const user = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const result = await db.collection("users").insertOne(user)
  return result
}

export async function getUserById(userId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("users").findOne({ _id: userId })
}

export async function getUserByEmail(email: string) {
  const { db } = await connectToDatabase()
  return await db.collection("users").findOne({ email })
}

export async function updateUser(userId: string, updateData: Partial<User>) {
  const { db } = await connectToDatabase()
  return await db.collection("users").updateOne(
    { _id: userId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteUser(userId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("users").deleteOne({ _id: userId })
}

// Student Operations
export async function createStudent(studentData: Omit<Student, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const student = {
    ...studentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("students").insertOne(student)
}

export async function getStudentById(studentId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("students").findOne({ _id: studentId })
}

export async function getStudentsByClass(className: string) {
  const { db } = await connectToDatabase()
  return await db.collection("students").find({ "academicInfo.class": className }).toArray()
}

export async function updateStudent(studentId: string, updateData: Partial<Student>) {
  const { db } = await connectToDatabase()
  return await db.collection("students").updateOne(
    { _id: studentId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteStudent(studentId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("students").deleteOne({ _id: studentId })
}

// Faculty Operations
export async function createFaculty(facultyData: Omit<Faculty, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const faculty = {
    ...facultyData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("faculty").insertOne(faculty)
}

export async function getFacultyById(facultyId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("faculty").findOne({ _id: facultyId })
}

export async function getFacultyByDepartment(department: string) {
  const { db } = await connectToDatabase()
  return await db.collection("faculty").find({ "professionalInfo.department": department }).toArray()
}

export async function updateFaculty(facultyId: string, updateData: Partial<Faculty>) {
  const { db } = await connectToDatabase()
  return await db.collection("faculty").updateOne(
    { _id: facultyId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteFaculty(facultyId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("faculty").deleteOne({ _id: facultyId })
}

// Staff Operations
export async function createStaff(staffData: Omit<Staff, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const staff = {
    ...staffData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("staff").insertOne(staff)
}

export async function getStaffById(staffId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("staff").findOne({ _id: staffId })
}

export async function getStaffByDepartment(department: string) {
  const { db } = await connectToDatabase()
  return await db.collection("staff").find({ "employmentInfo.department": department }).toArray()
}

export async function updateStaff(staffId: string, updateData: Partial<Staff>) {
  const { db } = await connectToDatabase()
  return await db.collection("staff").updateOne(
    { _id: staffId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteStaff(staffId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("staff").deleteOne({ _id: staffId })
}

// Assignment Operations
export async function createAssignment(assignmentData: Omit<Assignment, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const assignment = {
    ...assignmentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("assignments").insertOne(assignment)
}

export async function getAssignmentsByClass(className: string) {
  const { db } = await connectToDatabase()
  return await db.collection("assignments").find({ class: className }).toArray()
}

export async function getAssignmentsByFaculty(facultyId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("assignments").find({ facultyId }).toArray()
}

export async function submitAssignment(assignmentId: string, submission: any) {
  const { db } = await connectToDatabase()
  return await db.collection("assignments").updateOne(
    { _id: assignmentId },
    {
      $push: { submissions: submission },
      $set: { updatedAt: new Date() },
    },
  )
}

export async function gradeAssignment(assignmentId: string, studentId: string, gradeData: any) {
  const { db } = await connectToDatabase()
  return await db.collection("assignments").updateOne(
    {
      _id: assignmentId,
      "submissions.studentId": studentId,
    },
    {
      $set: {
        "submissions.$.grade": gradeData.grade,
        "submissions.$.marks": gradeData.marks,
        "submissions.$.feedback": gradeData.feedback,
        "submissions.$.status": "graded",
        updatedAt: new Date(),
      },
    },
  )
}

// Exam Operations
export async function createExam(examData: Omit<Exam, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const exam = {
    ...examData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("exams").insertOne(exam)
}

export async function getExamsByClass(className: string) {
  const { db } = await connectToDatabase()
  return await db.collection("exams").find({ class: className }).toArray()
}

export async function updateExamResults(examId: string, results: any[]) {
  const { db } = await connectToDatabase()
  return await db.collection("exams").updateOne(
    { _id: examId },
    {
      $set: {
        results,
        status: "completed",
        updatedAt: new Date(),
      },
    },
  )
}

// Attendance Operations
export async function markAttendance(attendanceData: Omit<Attendance, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const attendance = {
    ...attendanceData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("attendance").insertOne(attendance)
}

export async function getAttendanceByClass(className: string, startDate: Date, endDate: Date) {
  const { db } = await connectToDatabase()
  return await db
    .collection("attendance")
    .find({
      class: className,
      date: { $gte: startDate, $lte: endDate },
    })
    .toArray()
}

export async function getStudentAttendance(studentId: string, startDate: Date, endDate: Date) {
  const { db } = await connectToDatabase()
  return await db
    .collection("attendance")
    .find({
      "students.studentId": studentId,
      date: { $gte: startDate, $lte: endDate },
    })
    .toArray()
}

// Study Material Operations
export async function uploadStudyMaterial(materialData: Omit<StudyMaterial, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const material = {
    ...materialData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("study_materials").insertOne(material)
}

export async function getStudyMaterialsByClass(className: string) {
  const { db } = await connectToDatabase()
  return await db.collection("study_materials").find({ class: className }).toArray()
}

export async function incrementDownloadCount(materialId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("study_materials").updateOne(
    { _id: materialId },
    {
      $inc: { downloads: 1 },
      $set: { updatedAt: new Date() },
    },
  )
}

// Online Session Operations
export async function createOnlineSession(sessionData: Omit<OnlineSession, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const session = {
    ...sessionData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("online_sessions").insertOne(session)
}

export async function getOnlineSessionsByClass(className: string) {
  const { db } = await connectToDatabase()
  return await db.collection("online_sessions").find({ class: className }).toArray()
}

export async function joinOnlineSession(sessionId: string, studentId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("online_sessions").updateOne(
    { _id: sessionId },
    {
      $push: {
        participants: {
          studentId,
          joinTime: new Date(),
        },
      },
      $set: { updatedAt: new Date() },
    },
  )
}

// Leave Request Operations
export async function createLeaveRequest(leaveData: Omit<LeaveRequest, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const leave = {
    ...leaveData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("leave_requests").insertOne(leave)
}

export async function getLeaveRequestsByUser(userId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("leave_requests").find({ userId }).toArray()
}

export async function approveLeaveRequest(leaveId: string, approvedBy: string, remarks?: string) {
  const { db } = await connectToDatabase()
  return await db.collection("leave_requests").updateOne(
    { _id: leaveId },
    {
      $set: {
        status: "approved",
        approvedBy,
        approvedDate: new Date(),
        remarks,
        updatedAt: new Date(),
      },
    },
  )
}

// Notification Operations
export async function createNotification(notificationData: Omit<Notification, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const notification = {
    ...notificationData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("notifications").insertOne(notification)
}

export async function getNotificationsByUser(userId: string, userType: string) {
  const { db } = await connectToDatabase()
  return await db
    .collection("notifications")
    .find({
      recipients: {
        $elemMatch: {
          userId,
          userType,
        },
      },
    })
    .toArray()
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  const { db } = await connectToDatabase()
  return await db.collection("notifications").updateOne(
    {
      _id: notificationId,
      "recipients.userId": userId,
    },
    {
      $set: {
        "recipients.$.read": true,
        "recipients.$.readAt": new Date(),
        updatedAt: new Date(),
      },
    },
  )
}

// Timetable Operations
export async function createTimetable(timetableData: Omit<Timetable, "_id" | "createdAt" | "updatedAt">) {
  const { db } = await connectToDatabase()
  const timetable = {
    ...timetableData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return await db.collection("timetables").insertOne(timetable)
}

export async function getTimetableByClass(className: string, section: string) {
  const { db } = await connectToDatabase()
  return await db.collection("timetables").findOne({ class: className, section })
}

export async function updateTimetable(timetableId: string, schedule: any) {
  const { db } = await connectToDatabase()
  return await db.collection("timetables").updateOne(
    { _id: timetableId },
    {
      $set: {
        schedule,
        updatedAt: new Date(),
      },
    },
  )
}

// Audit Log Operations
export async function createAuditLog(logData: Omit<AuditLog, "_id">) {
  const { db } = await connectToDatabase()
  const log = {
    ...logData,
    timestamp: new Date(),
  }
  return await db.collection("audit_logs").insertOne(log)
}

export async function getAuditLogs(filters: any = {}, limit = 100) {
  const { db } = await connectToDatabase()
  return await db.collection("audit_logs").find(filters).sort({ timestamp: -1 }).limit(limit).toArray()
}

// Analytics and Reports
export async function getSystemStats() {
  const { db } = await connectToDatabase()

  const [totalUsers, totalStudents, totalFaculty, totalStaff, activeUsers, pendingLeaveRequests, unreadNotifications] =
    await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("students").countDocuments(),
      db.collection("faculty").countDocuments(),
      db.collection("staff").countDocuments(),
      db.collection("users").countDocuments({ status: "active" }),
      db.collection("leave_requests").countDocuments({ status: "pending" }),
      db.collection("notifications").countDocuments({ "recipients.read": false }),
    ])

  return {
    totalUsers,
    totalStudents,
    totalFaculty,
    totalStaff,
    activeUsers,
    pendingLeaveRequests,
    unreadNotifications,
  }
}

export async function getAttendanceStats(className?: string, startDate?: Date, endDate?: Date) {
  const { db } = await connectToDatabase()

  const matchStage: any = {}
  if (className) matchStage.class = className
  if (startDate && endDate) {
    matchStage.date = { $gte: startDate, $lte: endDate }
  }

  const pipeline = [
    { $match: matchStage },
    { $unwind: "$students" },
    {
      $group: {
        _id: "$students.status",
        count: { $sum: 1 },
      },
    },
  ]

  return await db.collection("attendance").aggregate(pipeline).toArray()
}

export async function getPerformanceStats(className?: string) {
  const { db } = await connectToDatabase()

  const matchStage: any = {}
  if (className) matchStage.class = className

  const pipeline = [
    { $match: matchStage },
    { $unwind: "$results" },
    {
      $group: {
        _id: "$results.grade",
        count: { $sum: 1 },
        averageMarks: { $avg: "$results.marks" },
      },
    },
  ]

  return await db.collection("exams").aggregate(pipeline).toArray()
}
