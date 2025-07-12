"use client"

import { Label } from "@/components/ui/label"
import { RichTextEditor } from "../rich-text-editor/rich-text-editor"

interface QuestionDetailsProps {
  value: string
  onChange: (value: string) => void
}

export function QuestionDetails({ value, onChange }: QuestionDetailsProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">What are the details of your problem?</Label>
      <p className="text-sm text-gray-600">
        Introduce the problem and expand on what you put in the title. Minimum 20 characters.
      </p>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder="Describe your problem in detail..."
        minHeight="150px"
      />
    </div>
  )
}
