'use client'

import * as React from "react"
import { Plus, Search, Trash2, MoreVertical, UserPlus, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Member {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive" | "On Leave"
  avatar: string
}

const statusColors = {
  Active: "bg-green-500",
  Inactive: "bg-red-500",
  "On Leave": "bg-yellow-500",
}

export default function Component() {
  const [members, setMembers] = React.useState<Member[]>([
    {
      id: "1",
      name: "Shrvan Benke",
      email: "shrvan@example.com",
      role: "Admin",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Developer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Designer",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [newMember, setNewMember] = React.useState({
    name: "",
    email: "",
    role: "",
  })

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      setMembers([
        ...members,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...newMember,
          status: "Active",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])
      setNewMember({ name: "", email: "", role: "" })
    }
  }

  const deleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-background text-foreground min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Full Name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
              />
              <Input
                placeholder="Role / Position"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button onClick={addMember} className="bg-orange-500 hover:bg-orange-600">Add to Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-md p-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none focus:ring-0"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[member.status]}`} />
                    {member.status}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteMember(member.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}