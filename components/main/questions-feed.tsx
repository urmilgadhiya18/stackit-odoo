import { Button } from "@/components/ui/button"
import { QuestionCard } from "./question-card"

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

export function QuestionsFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Interesting posts for you</h2>
        <Button>Ask Question</Button>
      </div>
      <p className="text-sm text-gray-600">
        Based on your viewing history and watched tags.{" "}
        <span className="text-blue-600 cursor-pointer">Customize your feed</span>
      </p>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  )
}
