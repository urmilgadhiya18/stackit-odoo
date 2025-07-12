"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { QuestionTitle } from "@/components/ask-question/question-title"
import { QuestionDetails } from "@/components/ask-question/question-details"
import { AttemptDetails } from "@/components/ask-question/attempt-details"
import { TagsInput } from "@/components/ask-question/tags-input"
import { DuplicateChecker } from "@/components/ask-question/duplicate-checker"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [attempts, setAttempts] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isNotDuplicate, setIsNotDuplicate] = useState(false)

  const canSubmit =
    title.length >= 10 && details.length >= 20 && attempts.length >= 20 && tags.length > 0 && isNotDuplicate

  const handleSubmit = () => {
    if (canSubmit) {
      console.log("Submitting question:", {
        title,
        details,
        attempts,
        tags,
        isNotDuplicate,
      })
      // Handle form submission
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-6 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Ask a public question</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="font-semibold mb-2">Writing a good question</h2>
              <p className="text-sm text-gray-700 mb-2">
                You're ready to ask a programming-related question and this form will help guide you through the
                process.
              </p>
              <p className="text-sm text-gray-700">
                Looking to ask a non-programming question? See the topics here to find a relevant site.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <QuestionTitle value={title} onChange={setTitle} />

            <QuestionDetails value={details} onChange={setDetails} />

            <AttemptDetails value={attempts} onChange={setAttempts} />

            <TagsInput tags={tags} onChange={setTags} />

            <DuplicateChecker isConfirmed={isNotDuplicate} onConfirmChange={setIsNotDuplicate} />

            <div className="flex gap-4">
              <Button onClick={handleSubmit} disabled={!canSubmit} className="bg-blue-600 hover:bg-blue-700">
                Review your question
              </Button>
            </div>
          </div>
        </main>

        <aside className="w-80 p-6">

          <div className="mt-6 space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">Step 1: Draft your question</h3>
              <p className="text-xs text-gray-600">
                The community is here to help you with specific coding, algorithm, or language problems.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">Step 2: Review and publish</h3>
              <p className="text-xs text-gray-600">Review your question and publish it to the community.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
