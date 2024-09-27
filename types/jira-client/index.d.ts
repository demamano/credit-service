
declare module 'jira-client' {
  import * as fs from 'fs';
  export interface JiraApiOptions {
    protocol: string;
    host: string;
    username: string;
    password: string;
    apiVersion?: string;
    strictSSL?: boolean;
    base?: string;
    intermediatePath?: string;
    port?: number;
  }

  export interface Transition {
    id: string;
    name: string;
    to: {
      id: string;
      name: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }

  export interface TransitionsResponse {
    transitions: Transition[];
  }

  class JiraClient {
    constructor(options: JiraApiOptions);
    listTransitions(issueKey: string): Promise<TransitionsResponse>;
    transitionIssue(issueKey: string, transition: unknown): Promise<unknown>;
    addAttachmentOnIssue(issueKey: string, readStream: fs.ReadStream | string): Promise<unknown>;
    addComment(issueKey: string, comment: { body: string }): Promise<unknown>;
    // Add other methods as needed
  }

  export default JiraClient;
}
