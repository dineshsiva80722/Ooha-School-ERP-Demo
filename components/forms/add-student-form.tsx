"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddStudentFormProps {
  onSubmit: (studentData: any) => void
  onCancel: () => void
}

export function AddStudentForm({ onSubmit, onCancel }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      nationality: "Indian",
      religion: "",
      category: "",
      phone: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
      },
    },
    academicInfo: {
      class: "",
      section: "",
      academicYear: "2024-25",
      admissionDate: "",
      rollNumber: "",
      studentId: "",
    },
    parentInfo: {
      fatherName: "",
      motherName: "",
      guardianName: "",
      fatherOccupation: "",
      motherOccupation: "",
      parentPhone: "",
      parentEmail: "",
      emergencyContact: "",
    },
    financialInfo: {
      totalFees: 0,
      paidFees: 0,
      pendingFees: 0,
      feeStatus: "pending",
      paymentHistory: [],
    },
    transportInfo: {
      busRoute: "",
      busNumber: "",
      pickupPoint: "",
      pickupTime: "",
      dropTime: "",
    },
    medicalInfo: {
      allergies: [],
      medications: [],
      emergencyContact: "",
      bloodGroup: "",
    },
  })

  const handleInputChange = (section: string, field: string, value: any) => {
    if (section === "address") {
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          address: {
            ...prev.personalInfo.address,
            [field]: value,
          },
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calculate pending fees
    const pendingFees = formData.financialInfo.totalFees - formData.financialInfo.paidFees
    const updatedFormData = {
      ...formData,
      financialInfo: {
        ...formData.financialInfo,
        pendingFees,
        feeStatus: pendingFees > 0 ? "pending" : "paid",
      },
      medicalInfo: {
        ...formData.medicalInfo,
        bloodGroup: formData.personalInfo.bloodGroup,
      },
    }

    onSubmit(updatedFormData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Student</CardTitle>
        <CardDescription>Enter complete student information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    required
                    value={formData.personalInfo.firstName}
                    onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    required
                    value={formData.personalInfo.lastName}
                    onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth *</label>
                  <Input
                    required
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender *</label>
                  <Select
                    required
                    value={formData.personalInfo.gender}
                    onValueChange={(value) => handleInputChange("personalInfo", "gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Group</label>
                  <Select
                    value={formData.personalInfo.bloodGroup}
                    onValueChange={(value) => handleInputChange("personalInfo", "bloodGroup", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    required
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    required
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Religion</label>
                  <Input
                    value={formData.personalInfo.religion}
                    onChange={(e) => handleInputChange("personalInfo", "religion", e.target.value)}
                    placeholder="Enter religion"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Street Address *</label>
                    <Textarea
                      required
                      value={formData.personalInfo.address.street}
                      onChange={(e) => handleInputChange("address", "street", e.target.value)}
                      placeholder="Enter street address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City *</label>
                    <Input
                      required
                      value={formData.personalInfo.address.city}
                      onChange={(e) => handleInputChange("address", "city", e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State *</label>
                    <Input
                      required
                      value={formData.personalInfo.address.state}
                      onChange={(e) => handleInputChange("address", "state", e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ZIP Code *</label>
                    <Input
                      required
                      value={formData.personalInfo.address.zipCode}
                      onChange={(e) => handleInputChange("address", "zipCode", e.target.value)}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class *</label>
                  <Select
                    required
                    value={formData.academicInfo.class}
                    onValueChange={(value) => handleInputChange("academicInfo", "class", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-A">Class 9-A</SelectItem>
                      <SelectItem value="9-B">Class 9-B</SelectItem>
                      <SelectItem value="10-A">Class 10-A</SelectItem>
                      <SelectItem value="10-B">Class 10-B</SelectItem>
                      <SelectItem value="11-A">Class 11-A</SelectItem>
                      <SelectItem value="11-B">Class 11-B</SelectItem>
                      <SelectItem value="12-A">Class 12-A</SelectItem>
                      <SelectItem value="12-B">Class 12-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Section *</label>
                  <Select
                    required
                    value={formData.academicInfo.section}
                    onValueChange={(value) => handleInputChange("academicInfo", "section", value)}
                  >
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
                  <label className="text-sm font-medium">Roll Number *</label>
                  <Input
                    required
                    value={formData.academicInfo.rollNumber}
                    onChange={(e) => handleInputChange("academicInfo", "rollNumber", e.target.value)}
                    placeholder="Enter roll number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student ID *</label>
                  <Input
                    required
                    value={formData.academicInfo.studentId}
                    onChange={(e) => handleInputChange("academicInfo", "studentId", e.target.value)}
                    placeholder="Enter student ID"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admission Date *</label>
                  <Input
                    required
                    type="date"
                    value={formData.academicInfo.admissionDate}
                    onChange={(e) => handleInputChange("academicInfo", "admissionDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Academic Year</label>
                  <Input
                    value={formData.academicInfo.academicYear}
                    onChange={(e) => handleInputChange("academicInfo", "academicYear", e.target.value)}
                    placeholder="2024-25"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parent" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Father's Name *</label>
                  <Input
                    required
                    value={formData.parentInfo.fatherName}
                    onChange={(e) => handleInputChange("parentInfo", "fatherName", e.target.value)}
                    placeholder="Enter father's name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mother's Name *</label>
                  <Input
                    required
                    value={formData.parentInfo.motherName}
                    onChange={(e) => handleInputChange("parentInfo", "motherName", e.target.value)}
                    placeholder="Enter mother's name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Guardian Name</label>
                  <Input
                    value={formData.parentInfo.guardianName}
                    onChange={(e) => handleInputChange("parentInfo", "guardianName", e.target.value)}
                    placeholder="Enter guardian name (if different)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Father's Occupation</label>
                  <Input
                    value={formData.parentInfo.fatherOccupation}
                    onChange={(e) => handleInputChange("parentInfo", "fatherOccupation", e.target.value)}
                    placeholder="Enter father's occupation"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mother's Occupation</label>
                  <Input
                    value={formData.parentInfo.motherOccupation}
                    onChange={(e) => handleInputChange("parentInfo", "motherOccupation", e.target.value)}
                    placeholder="Enter mother's occupation"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Phone *</label>
                  <Input
                    required
                    value={formData.parentInfo.parentPhone}
                    onChange={(e) => handleInputChange("parentInfo", "parentPhone", e.target.value)}
                    placeholder="Enter parent phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Email</label>
                  <Input
                    type="email"
                    value={formData.parentInfo.parentEmail}
                    onChange={(e) => handleInputChange("parentInfo", "parentEmail", e.target.value)}
                    placeholder="Enter parent email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Emergency Contact *</label>
                  <Input
                    required
                    value={formData.parentInfo.emergencyContact}
                    onChange={(e) => handleInputChange("parentInfo", "emergencyContact", e.target.value)}
                    placeholder="Enter emergency contact number"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Fees *</label>
                  <Input
                    required
                    type="number"
                    value={formData.financialInfo.totalFees}
                    onChange={(e) =>
                      handleInputChange("financialInfo", "totalFees", Number.parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter total fees amount"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paid Fees</label>
                  <Input
                    type="number"
                    value={formData.financialInfo.paidFees}
                    onChange={(e) =>
                      handleInputChange("financialInfo", "paidFees", Number.parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter paid amount"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transport" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bus Route</label>
                  <Input
                    value={formData.transportInfo.busRoute}
                    onChange={(e) => handleInputChange("transportInfo", "busRoute", e.target.value)}
                    placeholder="Enter bus route"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bus Number</label>
                  <Input
                    value={formData.transportInfo.busNumber}
                    onChange={(e) => handleInputChange("transportInfo", "busNumber", e.target.value)}
                    placeholder="Enter bus number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Point</label>
                  <Input
                    value={formData.transportInfo.pickupPoint}
                    onChange={(e) => handleInputChange("transportInfo", "pickupPoint", e.target.value)}
                    placeholder="Enter pickup point"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Time</label>
                  <Input
                    type="time"
                    value={formData.transportInfo.pickupTime}
                    onChange={(e) => handleInputChange("transportInfo", "pickupTime", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
