"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface QuestionTitleProps {
  value: string
  onChange: (value: string) => void
}

export function QuestionTitle({ value, onChange }: QuestionTitleProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-base font-semibold">
        Title
      </Label>
      <p className="text-sm text-gray-600">Be specific and imagine you're asking a question to another person.</p>
      <Input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        className="text-base"
      />
    </div>
  )
}
