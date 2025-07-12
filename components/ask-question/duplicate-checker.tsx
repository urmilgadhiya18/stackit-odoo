"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface DuplicateQuestion {
  id: number
  title: string
  votes: number
  answers: number
  url: string
}

interface DuplicateCheckerProps {
  isConfirmed: boolean
  onConfirmChange: (confirmed: boolean) => void
}

const suggestedQuestions: DuplicateQuestion[] = [
  {
    id: 1,
    title: "How to fix 'it is not working properly' error in JavaScript?",
    votes: 15,
    answers: 3,
    url: "#",
  },
  {
    id: 2,
    title: "Common debugging techniques when code doesn't work as expected",
    votes: 42,
    answers: 8,
    url: "#",
  },
  {
    id: 3,
    title: "Why is my function not working properly? Troubleshooting guide",
    votes: 23,
    answers: 5,
    url: "#",
  },
]

export function DuplicateChecker({ isConfirmed, onConfirmChange }: DuplicateCheckerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openQuestion = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold mb-2">
          Review questions already on Stack Overflow to see if your question is a duplicate.
        </h3>
        <p className="text-sm text-gray-600">
          Clicking on these questions will open them in a new tab for you to review. Your progress here will be saved so
          you can come back and continue.
        </p>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between h-12 text-left bg-transparent">
            <span className="text-gray-600">Do any of these posts answer your question?</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2 mt-2">
          {suggestedQuestions.map((question) => (
            <Card key={question.id} className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <button
                      onClick={() => openQuestion(question.url)}
                      className="text-blue-600 hover:text-blue-800 text-left font-medium mb-2 block"
                    >
                      {question.title}
                      <ExternalLink className="inline h-3 w-3 ml-1" />
                    </button>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{question.votes} votes</span>
                      <span>{question.answers} answers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="space-y-4">
        <h3 className="text-base font-semibold">
          Confirm that none of these existing posts on Stack Overflow answers your question.
        </h3>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="confirm-not-duplicate"
            checked={isConfirmed}
            onCheckedChange={(checked) => onConfirmChange(checked as boolean)}
          />
          <label
            htmlFor="confirm-not-duplicate"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm that none of these posts answers my question.
          </label>
        </div>
      </div>
    </div>
  )
}
