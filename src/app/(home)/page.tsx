'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export default function Component() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="w-full pt-8">
        <div className="container flex justify-center">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#F7B955]" />
            <span className="text-xl tracking-tight">trackker</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center">
        <div className="container px-4">
          <div className="max-w-[1100px] mx-auto text-center space-y-12">
            <h1 className="text-[64px] font-bold leading-none tracking-tight">
              Track, Solve & Progress
            </h1>
            <div className="flex items-center justify-center">
              <div className="relative inline-flex items-center">
                <span className="text-3xl font-light">
                  Faster with{" "}
                  <span className="font-normal">Precision</span>
                </span>
                <svg
                  width="80"
                  height="24"
                  viewBox="0 0 80 24"
                  fill="none"
                  className="absolute -right-20 top-1/2 -translate-y-1/2"
                >
                  <path
                    d="M20 12C20 12 35 4 60 12C35 20 20 12 20 12Z"
                    stroke="#F7B955"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-xl mx-auto pt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-14 px-6 bg-zinc-900 border-zinc-800 focus-visible:ring-[#F7B955] focus-visible:ring-offset-0 focus-visible:border-[#F7B955] text-base placeholder:text-zinc-500"
              />
              <Button
                className="h-14 px-8 bg-[#F7B955] hover:bg-[#F7B955]/90 text-black text-base font-medium"
              >
                JOIN
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-[#F7B955]">
        <div className="container flex justify-between items-center px-4">
          <p className="text-sm text-zinc-500">
            2024 © All rights reserved.
          </p>
          <p className="text-sm text-zinc-500">{time}</p>
        </div>
      </footer>
    </div>
  )
}