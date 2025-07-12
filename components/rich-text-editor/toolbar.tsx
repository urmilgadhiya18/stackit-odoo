"use client"

import {
  Bold,
  Italic,
  Code,
  ImageIcon,
  Link,
  List,
  ListOrdered,
  AlignLeft,
  MoreHorizontal,
  HelpCircle,
  Eye,
  FileText,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ToolbarProps {
  onFormat: (format: string) => void
}

export function Toolbar({ onFormat }: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("bold")}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("italic")}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("code")}>
        <Code className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("image")}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("link")}>
        <Link className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("unordered-list")}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("ordered-list")}>
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("align")}>
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("more")}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("help")}>
        <HelpCircle className="h-4 w-4" />
      </Button>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
