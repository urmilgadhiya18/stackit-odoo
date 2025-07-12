import { FeaturedSection } from "./featured-section"

const featuredPosts = [
    {
    title: "Featured Post",
    posts: [
      "Results of the June 2025 Community Asks Sprint",
      "Will you help build our new visual identity?",
      "Policy: Generative AI (e.g., ChatGPT) is banned",
    ],
  },
]

export function RightSidebar() {
  return (
    <aside className="w-80 p-6 space-y-6">
      {featuredPosts.map((section, index) => (
        <FeaturedSection key={index} title={section.title} posts={section.posts} />
      ))}
    </aside>
  )
}
