import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturedSectionProps {
  title: string
  posts: string[]
}

export function FeaturedSection({ title, posts }: FeaturedSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {posts.map((post, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer leading-relaxed">{post}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
