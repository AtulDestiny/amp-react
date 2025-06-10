"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client, listContent, addContent, updateContent, deleteContent, type ContentItem, type ListContentResponse, type AddContentResponse, type UpdateContentResponse, type DeleteContentResponse } from "../lib/graphql";
import { GraphQLResult } from "@aws-amplify/api";

export default function Content() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [formState, setFormState] = useState<Omit<ContentItem, "id">>({
    authorId: "",
    title: "",
    content: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string | null; title: string }>({
    show: false,
    id: null,
    title: ""
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await client.graphql({
        query: listContent
      }) as GraphQLResult<ListContentResponse>;

      if (response.data) {
        const jsonData = JSON.parse(response.data.ListItems);
        setItems(Array.isArray(jsonData) ? jsonData : []);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch content items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const inputData = editingId
        ? { id: editingId, ...formState }
        : { id: Date.now().toString(), ...formState };

      if (editingId) {
        // Update existing item
        const response = await client.graphql({
          query: updateContent,
          variables: {
            input: JSON.stringify(inputData)
          }
        }) as GraphQLResult<UpdateContentResponse>;

        if (!response.data) {
          throw new Error('Failed to update content');
        }

        const updatedItem = JSON.parse(response.data.UpdateItem);
        if (!updatedItem) {
          throw new Error('Invalid response from update operation');
        }
      } else {
        // Add new item
        const response = await client.graphql({
          query: addContent,
          variables: {
            input: JSON.stringify(inputData)
          }
        }) as GraphQLResult<AddContentResponse>;

        if (!response.data) {
          throw new Error('Failed to add content');
        }

        const newItem = JSON.parse(response.data.AddItem);
        if (!newItem) {
          throw new Error('Invalid response from add operation');
        }
      }
      // Reset form and refresh items
      setFormState({ authorId: "", title: "", content: "" });
      setEditingId(null);
      await fetchItems();
    } catch (err) {
      setError("Failed to save content");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setFormState({
      authorId: item.authorId,
      title: item.title,
      content: item.content,
    });
    setEditingId(item.id);
  };

  const handleDeleteClick = (item: ContentItem) => {
    setDeleteConfirm({
      show: true,
      id: item.id,
      title: item.title
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    try {
      const response = await client.graphql({
        query: deleteContent,
        variables: { id: deleteConfirm.id }
      }) as GraphQLResult<DeleteContentResponse>;

      if (!response.data) {
        throw new Error('Failed to delete content');
      }

      const deletedItem = JSON.parse(response.data.DeleteItem);
      if (!deletedItem) {
        throw new Error('Invalid response from delete operation');
      }

      await fetchItems();
    } catch (err) {
      setError("Failed to delete content");
      console.error(err);
    } finally {
      setDeleteConfirm({ show: false, id: null, title: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null, title: "" });
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  editingId ? "Update Content" : "Create Content"
                )}
              </button>
            </form>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Existing Content</h2>
              {loading ? (
                <p className="text-gray-600">Loading content...</p>
              ) : items.length === 0 ? (
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
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
