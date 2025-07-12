import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Question {
  id: number
  title: string
  votes: number
  answers: number
  views: number
  tags: string[]
  author: string
  timeAgo: string
  hasAcceptedAnswer: boolean
}

interface QuestionCardProps {
  question: Question
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          {/* Vote/Answer Stats */}
          <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[80px]">
            <div className="text-center">
              <div className="font-medium">{question.votes}</div>
              <div>votes</div>
            </div>
            <div
              className={`text-center px-2 py-1 rounded ${
                question.hasAcceptedAnswer ? "bg-green-100 text-green-800" : "bg-gray-100"
              }`}
            >
              <div className="font-medium">{question.answers}</div>
              <div>answers</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{question.views}</div>
              <div>views</div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer mb-2">
              {question.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Avatar className="w-4 h-4">
                  <AvatarFallback className="text-xs">{question.author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{question.author}</span>
                <span>{question.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
