"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ContentItem {
  id: string;
  authorId: string;
  title: string;
  content: string;
}

export default function Content() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [formState, setFormState] = useState<Omit<ContentItem, "id">>({
    authorId: "",
    title: "",
    content: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const dummyItems: ContentItem[] = [
      {
        id: "1",
        authorId: "123",
        title: "Sample Title",
        content: "This is sample content.",
      },
    ];
    setItems(dummyItems);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing item
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...formState, id: editingId }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: ContentItem = {
        id: Date.now().toString(),
        ...formState,
      };
      setItems((prev) => [...prev, newItem]);
    }
    // Reset form
    setFormState({ authorId: "", title: "", content: "" });
    setEditingId(null);
  };

  const handleEdit = (item: ContentItem) => {
    setFormState({
      authorId: item.authorId,
      title: item.title,
      content: item.content,
    });
    setEditingId(item.id);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Content</h1>
              <p className="text-gray-600 mt-1">Manage your content</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
          <div className="space-y-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-6 shadow-md space-y-4"
            >
              <div>
                <label className="block font-medium text-gray-700">
                  Author ID
                </label>
                <input
                  type="text"
                  name="authorId"
                  value={formState.authorId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formState.content}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingId ? "Update Content" : "Create Content"}
              </button>
            </form>
            <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Existing Content</h2>
            {items.length === 0 ? (
              <p className="text-gray-600">No content available.</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-600">Author: {item.authorId}</p>
                        <p className="mt-2">{item.content}</p>
                      </div>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
