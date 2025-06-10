import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/data/resource';
import { Amplify } from "aws-amplify";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "https://x7xgwafhwjeqbbk4qqt7jzkst4.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "apiKey",
      apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "da2-ovt6quse7nebbablwauxj3fc6y",
    },
  },
});

export const client = generateClient<Schema>();

export interface ContentItem {
  id: string;
  authorId: string;
  title: string;
  content: string;
}

export interface ListContentResponse {
  ListItems: string; // JSON string that will be parsed
}

export interface AddContentResponse {
  AddItem: string; // JSON string that will be parsed
}

export interface UpdateContentResponse {
  UpdateItem: string; // JSON string that will be parsed
}

export interface DeleteContentResponse {
  DeleteItem: string; // JSON string that will be parsed
}

export const listContent = /* GraphQL */ `
  query ListItems {
    ListItems
  }
`;

export const addContent = /* GraphQL */ `
  mutation AddItem($input: AWSJSON!) {
    AddItem(input: $input)
  }
`;

export const updateContent = /* GraphQL */ `
  mutation UpdateItem($input: AWSJSON!) {
    UpdateItem(input: $input)
  }
`;

export const deleteContent = /* GraphQL */ `
  mutation DeleteItem($id: String!) {
    DeleteItem(id: $id)
  }
`; 