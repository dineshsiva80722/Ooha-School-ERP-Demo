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
  Trash2,
} from "lucide-react"

interface StudentsMonitorProps {
  searchQuery: string
}

interface UploadItem {
  id: number;
  title: string;
  type: string;
  size: string;
  uploadDate: string;
  downloads: number;
  status: string;
  fileUrl: string;
}

export default function NotesSection({ searchQuery }: StudentsMonitorProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [files, setFiles] = useState<UploadItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState("all")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  // Load files from local storage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('uploadedFiles')
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles))
    }
    setLoading(false)
  }, [])

  // Save files to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(files))
  }, [files])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError("")

    try {
      // Create a unique ID for the file
      const fileId = Date.now()
      
      // Get file details
      const fileData = {
        id: fileId,
        title: file.name,
        type: file.type.split('/')[0].toUpperCase(),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        status: "Active",
        fileUrl: URL.createObjectURL(file)
      } as UploadItem

      // Add the new file to the list
      setFiles(prev => [...prev, fileData])

      // Reset the file input and close dialog
      event.target.value = ""
      setUploadDialogOpen(false)
    } catch (error) {
      setUploadError("Failed to upload file")
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = (file: UploadItem) => {
    if (window.confirm(`Are you sure you want to delete ${file.title}?`)) {
      setFiles(prev => prev.filter(f => f.id !== file.id))
      URL.revokeObjectURL(file.fileUrl)
    }
  }

  const filteredFiles = files.filter((file) => {
    if (selectedType === "all") return true
    return file.type.toLowerCase() === selectedType.toLowerCase()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">File Upload System</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setUploadDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {uploadError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select File</label>
              <input
                type="file"
                className="mt-1 block w-full"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && (
                <div className="mt-2 text-sm text-gray-500">Uploading...</div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              {/* <Button disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pdfs">PDFs</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="trash">Trash</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>File Dashboard</CardTitle>
                  <CardDescription>Upload, manage, and share files</CardDescription>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Files</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.type}</Badge>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.uploadDate}</TableCell>
                      <TableCell>{file.downloads}</TableCell>
                      <TableCell>
                        <Badge variant={file.status === "Active" ? "default" : "secondary"}>
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(file)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
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

        <TabsContent value="pdfs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PDF Files</CardTitle>
              <CardDescription>View and manage PDF documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.filter(f => f.type === "PDF").map((file) => (
                  <Card key={file.id}>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{file.title}</h3>
                          <Badge variant="outline">PDF</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Size: {file.size}</p>
                        <p className="text-sm text-gray-500">Downloads: {file.downloads}</p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(file)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Files</CardTitle>
              <CardDescription>Manage video content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.filter(f => f.type === "VIDEO").map((file) => (
                  <Card key={file.id}>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{file.title}</h3>
                          <Badge variant="outline">Video</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Duration: 30:00</p>
                        <p className="text-sm text-gray-500">Downloads: {file.downloads}</p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(file)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Files</CardTitle>
              <CardDescription>Manage audio content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.filter(f => f.type === "AUDIO").map((file) => (
                  <Card key={file.id}>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{file.title}</h3>
                          <Badge variant="outline">Audio</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Duration: 15:00</p>
                        <p className="text-sm text-gray-500">Downloads: {file.downloads}</p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(file)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Image Files</CardTitle>
              <CardDescription>Manage image content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.filter(f => f.type === "IMAGE").map((file) => (
                  <Card key={file.id}>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{file.title}</h3>
                          <Badge variant="outline">Image</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Resolution: 1920x1080</p>
                        <p className="text-sm text-gray-500">Downloads: {file.downloads}</p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(file)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>All document types</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.type}</Badge>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDelete(file)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
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
    </div>
  )
}