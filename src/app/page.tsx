"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const router = useRouter();

  const prompts = [
    "Generate a prompt for a product launch announcement.",
    "How to write a compelling prompt for a design brief?",
    "Craft a prompt for startup pitch deck content.",
    "Develop a research paper summary prompt.",
    "Create a prompt for a game narrative concept.",
    "Formulate a prompt for social media content ideas.",
    "Write a prompt for a compelling blog post outline.",
    "Suggest a prompt for a complex coding problem.",
    "Design a prompt for a data analysis report.",
    "Create a prompt that helps me get fit and healthy in 2 months.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [prompts.length]);

  const handleSearch = () => {
    const currentPrompt = promptInput.trim();
    if (currentPrompt) {
      router.push(`/chat?prompt=${encodeURIComponent(currentPrompt)}`);
      setPromptInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFileUpload = () => {
    // File upload functionality can be implemented here
    console.log("File upload clicked");
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Page 1 - Main Landing */}
      <div
        id="page1"
        className="flex-1 min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-black text-gray-200 w-full"
      >
        <div className="max-w-3xl w-full text-center space-y-8">
          <p className="text-lg text-gray-400 mb-6">Prompting starts here.</p>

          <div className="relative w-11/12 max-w-2xl p-4 rounded-3xl border border-gray-700 bg-gray-900 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 ease-in-out mx-auto">
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={prompts[currentPromptIndex]}
              className="w-full h-24 pt-2 pr-12 pl-2 text-base bg-transparent text-white focus:outline-none resize-none placeholder:text-left placeholder:text-sm"
            />

            <button
              onClick={handleFileUpload}
              className="absolute bottom-2 left-4 p-1.5 text-gray-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Import File"
              title="Add photos and files"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <button
              onClick={handleSearch}
              className="absolute bottom-2 right-4 p-1.5 text-gray-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800 text-xs hover:bg-gray-700 hover:text-white transition-colors duration-200 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              Trending
            </button>
            {[
              "Drug discovery",
              "Gaming character",
              "Research buddy",
              "Tutor",
              "Cinematic Video",
              "X-ray report",
            ].map((tag) => (
              <button
                key={tag}
                className="px-5 py-1.5 rounded-lg border border-gray-700 bg-gray-800 text-xs hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#page2"
              className="text-blue-400 hover:text-blue-200 text-base font-medium transition-colors duration-200"
            >
              Learn more &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Page 2 - About Section */}
      <div
        id="page2"
        className="min-h-screen flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 bg-black text-gray-200"
      >
        <div className="max-w-4xl w-full space-y-12 py-8">
          <div className="mb-8 text-left">
            <a
              href="#page1"
              className="text-blue-400 hover:text-blue-200 text-base font-medium transition-colors duration-200"
            >
              &larr; Back to Home
            </a>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white mb-3">Overview</h2>
            <p className="text-base leading-relaxed text-gray-400">
              Beta is a model that helps you write better prompts for any
              language model. It transforms simple ideas into precise,
              structured, and effective instructions—so you can get better
              results from AI systems like GPT, Claude, Gemini, or open-source
              models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white mb-3">What it does</h2>
            <ul className="list-none space-y-2 text-base text-gray-400">
              {[
                "Generates optimized prompts from plain language",
                "Explains what the prompt is doing—and why",
                "Rates prompt quality on a 1–10 scale",
                "Supports code, writing, strategy, research, and education",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-white text-xl">&rarr;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white mb-3">Example</h2>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <p className="text-base text-gray-300 mb-4">
                <span className="font-semibold text-white">You enter:</span>
                <br />
                <span className="font-mono bg-gray-800 text-gray-200 px-2.5 py-1 rounded-md inline-block mt-1.5 text-sm">
                  &quot;Write an onboarding doc for a new engineer&quot;
                </span>
              </p>
              <p className="text-base text-gray-300 mt-6">
                <span className="font-semibold text-white">Beta suggests:</span>
                <br />
                <span className="block bg-gray-800 text-gray-200 p-3 rounded-md mt-1.5 leading-relaxed text-sm border-l-4 border-[#10A37F]">
                  &quot;Create a structured onboarding checklist for a new
                  backend engineer joining a remote startup. Include key tools,
                  teammates, timelines, and codebase orientation.&quot;
                </span>
              </p>
              <p className="text-right text-sm text-gray-500 mt-5">
                <span className="font-bold text-[#10A37F]">Score: 9.3</span>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white mb-3">Try it now</h2>
            <p className="text-base leading-relaxed text-gray-400">
              No account required. Public beta is live.
            </p>
            <div className="mt-4">
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-200 text-base font-medium transition-colors duration-200 mr-4"
              >
                Sign In &rarr;
              </Link>
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-200 text-base font-medium transition-colors duration-200"
              >
                Sign Up &rarr;
              </Link>
            </div>
          </section>

          <footer className="text-center pt-8 border-t border-gray-800 space-y-1.5">
            <p className="text-sm text-gray-500">
              Built by{" "}
              <span className="font-bold text-white">NoBrainer LLMs</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
