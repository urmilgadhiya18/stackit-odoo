"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {RichTextEditor} from "@/components/rich-text-editor/rich-text-editor";

export default function QuestionPage({ params }) {
  const questionId = params.id
  const [answer, setAnswer] = useState("")

  const question = {
    id: questionId,
    title: "How to set up authorization with OAuth2 (React + FastAPI)",
    asked: "9 days ago",
    modified: "today",
    views: 39,
    details: `
      // App.tsx
      try {
        const response = await axios.get(\`\${BACKEND_URL}/auth/whoami\`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if ([400, 401, 403].includes(error.response?.status))
            setAuthError("Access denied");
          if ([500, 502].includes(error.response?.status))
            setAuthError("service unavailable");
        }
        return null;
      }
    `,
    attempt: `
      // App.tsx
      try {
        const response = await axios.get(\`\${BACKEND_URL}/auth/whoami\`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if ([400, 401, 403].includes(error.response?.status))
            setAuthError("Access denied");
          if ([500, 502].includes(error.response?.status))
            setAuthError("service unavailable");
        }
        return null;
      }
    `,
    description: "On the frontend I fetch my /whoami endpoint.\n\nThis endpoint checks cookie and if its not there, redirecting to next /login endpoint",
    answer: {
      text: "In my opinion you should use the middleware of react to check if the cookie is present or not and based on that redirect the user to auth pages or to the dashboard. You can use react router for redirecting. Once the token is found in the cookie you can then call your validation route to check if the user token is valid or not.",
      author: "Umair Ahmed",
      timeAgo: "28 mins ago",
      score: 1,
      isNewContributor: true,
    },
    featuredPosts: [
      {
        title: "The Overflow Blog",
        posts: ["A new era of Stack Overflow", "How your favorite movie is changing language learning technology"],
      },
      {
        title: "Featured on Meta",
        posts: [
          "Results of the June 2025 Community Asks Sprint",
          "Will you help build our new visual identity?",
          "Policy: Generative AI (e.g., ChatGPT) is banned",
        ],
      },
    ],
    related: [
      { id: 2371, title: "How to programmatically navigate using React Router?" },
      { id: 3451, title: "How can I change an element's class with JavaScript?" },
      { id: 3162, title: "How can I upload files asynchronously with jQuery?" },
      { id: 2872, title: "How to upgrade all Python packages with pip" },
      { id: 3263, title: "How do I change the size of figures drawn with Matplotlib?" },
      { id: 2770, title: "How to format a number with commas as thousands separators?" },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            Asked {question.asked} • Modified {question.modified} • Viewed {question.views} times
          </div>
          <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            {question.details}
          </pre>
          <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            {question.attempt}
          </pre>
          <p className="mb-4 whitespace-pre-wrap">{question.description}</p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">1 Answer</h2>
            <div className="border p-4 rounded mb-2">
              <p>{question.answer.text}</p>
              <div className="text-sm text-gray-500 mt-2">
                answered {question.answer.timeAgo} by{" "}
                <span className="font-medium">{question.answer.author}</span>{" "}
                <span className="text-blue-500">({question.answer.score} • {question.answer.isNewContributor && <span>New contributor</span>})</span>
              </div>
            </div>
            <Button variant="outline">Add a comment</Button>
          </div>
          <div className="mt-4 grid gap-2">
            <h2 className="text-lg font-semibold mb-2">Your Answer</h2>
            <RichTextEditor
              value={answer}
              onChange={setAnswer}
              placeholder="Describe your problem in detail..."
              minHeight="150px"
            />
            <Button className={"w-min"}>Post Your Answer</Button>
          </div>
        </main>
    </div>
  )
}