"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TagsInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
}

export function TagsInput({ tags, onChange }: TagsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      onChange([...tags, tag.trim()])
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">Tags</Label>
      <p className="text-sm text-gray-600">
        Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
      </p>

      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. (typescript python-3.x javascript)"
        disabled={tags.length >= 5}
      />
    </div>
  )
}
