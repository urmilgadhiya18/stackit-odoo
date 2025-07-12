"use client"

import { useState } from "react"
import { Header } from "@/components/header/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { MainContent } from "@/components/main/main-content"
import { RightSidebar } from "@/components/sidebar-right/right-sidebar"

export default function StackOverflowHomepage() {
  const [searchQuery, setSearchQuery] = useState("")

  const questions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js 14 with App Router?",
      votes: 15,
      answers: 3,
      views: 1200,
      tags: ["nextjs", "authentication", "app-router"],
      author: "john_dev",
      timeAgo: "2 hours ago",
      hasAcceptedAnswer: true,
    },
    {
      id: 2,
      title: "React useState not updating immediately after setState call",
      votes: 8,
      answers: 5,
      views: 890,
      tags: ["react", "hooks", "state"],
      author: "react_newbie",
      timeAgo: "4 hours ago",
      hasAcceptedAnswer: false,
    },
    {
      id: 3,
      title: "Best practices for TypeScript with Node.js backend development",
      votes: 23,
      answers: 7,
      views: 2100,
      tags: ["typescript", "nodejs", "backend"],
      author: "backend_guru",
      timeAgo: "1 day ago",
      hasAcceptedAnswer: true,
    },
  ]

  const featuredPosts = [
    {
      title: "The Overflow Blog",
      posts: ["A new era of Stack Overflow", "How your favorite movie is changing language learning technology"],
    },
    {
      title: "Featured on Meta",
      posts: [
        "Results of the June 2025 Community Asks Sprint",
        "Will you help build our new visual identity?",
        "Policy: Generative AI (e.g., ChatGPT) is banned",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="max-w-7xl mx-auto flex">
        <Sidebar />
        <MainContent questions={questions} featuredPosts={featuredPosts} />
        <RightSidebar featuredPosts={featuredPosts} />
      </div>
    </div>
  )
}
