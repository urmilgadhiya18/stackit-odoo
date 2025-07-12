import { Button } from "@/components/ui/button"
import { QuestionCard } from "./question-card"
import { useRouter } from "next/navigation"

const questions = [
	{
		id: 1,
		title: "How to implement authentication in Next.js 14 with App Router?",
		description:
			"I'm trying to set up authentication in my Next.js 14 application using the new App Router. I've looked at various solutions like NextAuth.js and Clerk, but I'm not sure which approach is best for my use case. Can someone guide me through the implementation steps?",
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
		description:
			"I'm having an issue where my React component's state doesn't seem to update immediately after calling setState. I'm console.logging the state value right after the setState call, but it shows the old value. Is this normal behavior and how can I work around it?",
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
		description:
			"I'm starting a new Node.js backend project and want to use TypeScript from the beginning. What are the current best practices for project structure, type definitions, error handling, and testing? Any recommended tools or libraries I should consider?",
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

    const router = useRouter();
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">Interesting posts for you</h2>
				<Button className={"cursor-pointer"} onClick={() => router.push("/questions/ask")}>Ask Question</Button>
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
