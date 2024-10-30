"use client"
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { GalleryHorizontalEnd, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


export default function Page() {
  return <>
    <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-50 ">
      <div className="logo flex gap-3 items-center">
        <span>
          <GalleryHorizontalEnd className="h-10 w-10 text-accent" />
        </span>
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>
      <div className="Avater pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black text-[#ffffffe6] shadow-lg rounded-md">
            <DropdownMenuItem >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
    <main className="w-full flex">
      <div className="create w-[35%]   py-7 px-4">
        <Button className="bg-[#FEBD6B] ml-5 text-xl">
          <span>
            <Plus className="h-10 w-10 color-black p-0" />
          </span>
          create project
        </Button>
        <div className="card ml-5 mt-[60px]">
          <span>Recent issues</span>
          <div className="my-2">
            <Card className="border border-white w-[400px]">
              <CardContent className="py-2 border-b border-white">
                <h4 >ISSUE #1</h4>
                <div className="flex gap-2 py-3">
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">PRIORITY</Button>
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">DEADLINE-DEADLINE</Button>
                </div>
              </CardContent>
              <CardContent className="py-2 border-b border-white">
                <h4 >ISSUE #1</h4>
                <div className="flex gap-2 py-3">
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">PRIORITY</Button>
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">DEADLINE-DEADLINE</Button>
                </div>
              </CardContent>
              <CardContent className="py-2 border-b border-white">
                <h4 >ISSUE #1</h4>
                <div className="flex gap-2 py-3">
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">PRIORITY</Button>
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">DEADLINE-DEADLINE</Button>
                </div>
              </CardContent>
              <CardContent className="py-2">
                <h4 >ISSUE #1</h4>
                <div className="flex gap-2 py-3">
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">PRIORITY</Button>
                  <Button className="bg-gray-200 px-1 text-[11px] rounded-xl">DEADLINE-DEADLINE</Button>
                </div>
              </CardContent>

            </Card>
          </div>
        </div>
      </div>
      <div className="project w-[65%]">
        <h3 className="mt-40 ml-10 font-bold text-[#ffffffe6]text-[#ffffffe6] text-xl">Your Project</h3>
        <div className="project mt-5 ml-10 grid grid-cols-4 gap-[300px]">
          <div className="1 w-[300px] h-[180px] border  border-white rounded-xl ">
            <div className="flex justify-between items-center px-3 pt-3 text-[#ffffffe6]" >
              <div>
                <h3>Project #1</h3>
                <h4 className="text-[14px]">personal</h4>
              </div>
              <div className="logo">
                <ChevronRight className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-[70px] ml-5">
              <span className=" text-sm">18/09/2024</span>
            </div>
          </div>
          <div className="1 w-[300px] h-[180px] border  border-white rounded-xl ">
            <div className="flex justify-between items-center px-3 pt-3 text-[#ffffffe6]" >
              <div>
                <h3>Project #1</h3>
                <h4 className="text-[14px]">personal</h4>
              </div>
              <div className="logo">
                <ChevronRight className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-[70px] ml-5">
              <span className=" text-sm">18/09/2024</span>
            </div>
          </div>
          <div className="1 w-[300px] h-[180px] border  border-white rounded-xl ">
            <div className="flex justify-between items-center px-3 pt-3 text-[#ffffffe6]" >
              <div>
                <h3>Project #1</h3>
                <h4 className="text-[14px]">personal</h4>
              </div>
              <div className="logo">
                <ChevronRight className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-[70px] ml-5">
              <span className=" text-sm">18/09/2024</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
}
