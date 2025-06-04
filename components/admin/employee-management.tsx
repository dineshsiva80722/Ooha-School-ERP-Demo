"use client"

import { useState } from "react"
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
import { Plus, Edit, Eye, Clock, CheckCircle, AlertCircle, Users, Filter } from "lucide-react"

interface EmployeeManagementProps {
  searchQuery: string
}

export function EmployeeManagement({ searchQuery }: EmployeeManagementProps) {
  const [activeTab, setActiveTab] = useState("list")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const employees = [
    {
      id: 1,
      name: "James Wilson",
      email: "james.wilson@school.edu",
      department: "Administration",
      position: "Office Manager",
      experience: "6 years",
      salary: 45000,
      status: "Active",
      joinDate: "2018-03-15",
      phone: "+1 234-567-8901",
      address: "123 Admin St, City",
      employeeId: "EMP001",
      attendance: 95.8,
      leaveBalance: 20,
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Lisa Martinez",
      email: "lisa.martinez@school.edu",
      department: "Maintenance",
      position: "Facility Manager",
      experience: "4 years",
      salary: 38000,
      status: "Active",
      joinDate: "2020-06-01",
      phone: "+1 234-567-8902",
      address: "456 Service Ave, City",
      employeeId: "EMP002",
      attendance: 93.2,
      leaveBalance: 15,
      performance: "Good",
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@school.edu",
      department: "IT Support",
      position: "IT Technician",
      experience: "3 years",
      salary: 42000,
      status: "Active",
      joinDate: "2021-09-15",
      phone: "+1 234-567-8903",
      address: "789 Tech Blvd, City",
      employeeId: "EMP003",
      attendance: 97.1,
      leaveBalance: 18,
      performance: "Very Good",
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@school.edu",
      department: "Security",
      position: "Security Guard",
      experience: "2 years",
      salary: 32000,
      status: "On Leave",
      joinDate: "2022-01-10",
      phone: "+1 234-567-8904",
      address: "321 Guard Lane, City",
      employeeId: "EMP004",
      attendance: 91.5,
      leaveBalance: 12,
      performance: "Good",
    },
  ]

  const employeeLeaveRequests = [
    {
      id: 1,
      employeeName: "James Wilson",
      employeeId: "EMP001",
      type: "Annual Leave",
      startDate: "2024-02-20",
      endDate: "2024-02-25",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
      appliedDate: "2024-02-10",
    },
    {
      id: 2,
      employeeName: "Lisa Martinez",
      employeeId: "EMP002",
      type: "Sick Leave",
      startDate: "2024-02-15",
      endDate: "2024-02-16",
      days: 2,
      reason: "Medical appointment",
      status: "Approved",
      appliedDate: "2024-02-12",
    },
  ]

  const employeeSalaryData = [
    {
      id: 1,
      employeeName: "James Wilson",
      employeeId: "EMP001",
      basicSalary: 38000,
      allowances: 7000,
      deductions: 4500,
      netSalary: 40500,
      month: "January 2024",
      status: "Paid",
    },
    {
      id: 2,
      employeeName: "Lisa Martinez",
      employeeId: "EMP002",
      basicSalary: 32000,
      allowances: 6000,
      deductions: 3800,
      netSalary: 34200,
      month: "January 2024",
      status: "Paid",
    },
  ]

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the details of the new employee</DialogDescription>
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
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="cafeteria">Cafeteria</SelectItem>
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
              <Button variant="outline">Cancel</Button>
              <Button>Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="list">Employee List</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>Comprehensive list of all non-teaching staff</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="it-support">IT Support</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="cafeteria">Cafeteria</SelectItem>
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
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-gray-500">
                          {employee.position} • {employee.department}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {employee.employeeId} • {employee.experience} experience • ₹
                          {employee.salary.toLocaleString()}/month
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Employee Profile - {employee.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-6 py-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Personal Information</h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="font-medium">Employee ID:</span> {employee.employeeId}
                                  </p>
                                  <p>
                                    <span className="font-medium">Email:</span> {employee.email}
                                  </p>
                                  <p>
                                    <span className="font-medium">Phone:</span> {employee.phone}
                                  </p>
                                  <p>
                                    <span className="font-medium">Address:</span> {employee.address}
                                  </p>
                                  <p>
                                    <span className="font-medium">Join Date:</span> {employee.joinDate}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Employment Details</h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="font-medium">Department:</span> {employee.department}
                                  </p>
                                  <p>
                                    <span className="font-medium">Position:</span> {employee.position}
                                  </p>
                                  <p>
                                    <span className="font-medium">Experience:</span> {employee.experience}
                                  </p>
                                  <p>
                                    <span className="font-medium">Status:</span> {employee.status}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Performance Metrics</h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="font-medium">Attendance:</span> {employee.attendance}%
                                  </p>
                                  <p>
                                    <span className="font-medium">Leave Balance:</span> {employee.leaveBalance} days
                                  </p>
                                  <p>
                                    <span className="font-medium">Performance:</span> {employee.performance}
                                  </p>
                                  <p>
                                    <span className="font-medium">Salary:</span> ₹{employee.salary.toLocaleString()}
                                  </p>
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Leave Management</CardTitle>
              <CardDescription>Manage employee leave requests and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeLeaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employeeName}</TableCell>
                      <TableCell>{request.employeeId}</TableCell>
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
              <CardTitle>Employee Attendance</CardTitle>
              <CardDescription>Track and manage employee attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">94.4%</p>
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
                        <p className="text-2xl font-bold">42</p>
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
                        <p className="text-2xl font-bold">3</p>
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
              <CardTitle>Employee Salary Management</CardTitle>
              <CardDescription>Manage employee salaries and payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeSalaryData.map((salary) => (
                    <TableRow key={salary.id}>
                      <TableCell className="font-medium">{salary.employeeName}</TableCell>
                      <TableCell>{salary.employeeId}</TableCell>
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

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Progress Tracking</CardTitle>
              <CardDescription>Monitor employee performance and development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((employee) => (
                  <Card key={employee.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-sm">{employee.name}</h3>
                          <p className="text-xs text-gray-500">{employee.department}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attendance</span>
                          <span className="font-medium">{employee.attendance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <Badge variant="outline" className="text-xs">
                            {employee.performance}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Experience</span>
                          <span className="font-medium">{employee.experience}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Leave Balance</span>
                          <span className="font-medium">{employee.leaveBalance} days</span>
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
    </div>
  )
}
