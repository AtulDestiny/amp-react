import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';
import { GraphQLResult } from '@aws-amplify/api';

interface FileItem {
  key: string;
  url: string;
  lastModified: string;
  size: number;
}

interface ListFilesResponse {
  ListFilesS3: {
    files: FileItem[];
  };
}

const client = generateClient<Schema>();

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.graphql({
        query: `
          query ListFilesS3($prefix: String) {
            ListFilesS3(prefix: $prefix) {
              files
            }
          }
        `,
        variables: {
          prefix: "uploads/",
        },
      }) as GraphQLResult<ListFilesResponse>;

      if (response.data) {
  let fetchedFiles = response.data.ListFilesS3.files;

  // If `files` is a string, try to parse it
  if (typeof fetchedFiles === 'string') {
    try {
      fetchedFiles = JSON.parse(fetchedFiles);
    } catch (parseErr) {
      console.error("Failed to parse files string:", parseErr);
      setError('Invalid files data format.');
      setFiles([]);
      setLoading(false);
      return;
    }
  }

  setFiles(fetchedFiles);
}

    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to load files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No files found. Upload some files to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <div
            key={file.key}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {file.key.split('/').pop()}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span>{formatFileSize(file.size)}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(file.lastModified)}</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 