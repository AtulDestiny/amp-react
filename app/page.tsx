"use client";

import Link from "next/link";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-between font-mono text-sm">
        <div className="mt-12 flex gap-8">
          {/* Gallery Box */}
          <Link href="/gallery" className="no-underline">
            <div className="border-2 border-gray-300 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 w-48 text-center">
              <h2 className="text-xl font-semibold">Content</h2>
              <p className="text-gray-500 mt-2">View uploaded content</p>
            </div>
          </Link>

          {/* Flows Box */}
          <Link href="/flows" className="no-underline">
            <div className="border-2 border-gray-300 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 w-48 text-center">
              <h2 className="text-xl font-semibold">Flows</h2>
              <p className="text-gray-500 mt-2">Manage workflows</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
