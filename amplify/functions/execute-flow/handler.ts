import type { Handler } from "aws-lambda";
import { LambdaClient, InvokeCommand, LogType } from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({});

export const handler: Handler = async (event, context) => {
  const stateMachineArn = event.arguments.stateMachineArn;
  const payload = event.arguments.payload;

  if (!stateMachineArn || !payload) {
    return {
      error: "Missing required fields: stateMachineArn and payload",
    };
  }

  const command = new InvokeCommand({
    FunctionName:
      "arn:aws:lambda:us-east-1:992382535498:function:test-dev-amplify-app",
    Payload: Buffer.from(JSON.stringify({ stateMachineArn, payload })),
    LogType: LogType.Tail,
  });

  const response = await lambda.send(command);
  const base64Log = response.LogResult;
  const decodedLog = base64Log
    ? Buffer.from(base64Log, "base64").toString("utf-8")
    : "No logs available";

  return {
    logs: decodedLog,
  };
};
