// scripts/update-jira.ts

import JiraClient  from 'jira-client';

// Extract environment variables
const {
  GIT_COMMIT_MESSAGE,
  JIRA_HOST,
  JIRA_EMAIL,
  JIRA_API_TOKEN,
} = process.env;
console.log('GIT_COMMIT_MESSAGE', GIT_COMMIT_MESSAGE);
console.log('JIRA_HOST', JIRA_HOST);
// Validate required environment variables
if (!GIT_COMMIT_MESSAGE || !JIRA_HOST || !JIRA_EMAIL || !JIRA_API_TOKEN) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

// Extract JIRA issue key from commit message
const issueKeyRegex = /([A-Z]+-\d+)/;
const match = GIT_COMMIT_MESSAGE.match(issueKeyRegex);

if (!match) {
  console.error('No JIRA issue key found in commit message.');
  process.exit(0); // Exit gracefully if no issue key is found
}

const issueKey = match[1];

// Initialize JIRA client
const jira = new JiraClient({
  protocol: 'https',
  host: JIRA_HOST,
  username: JIRA_EMAIL,
  password: JIRA_API_TOKEN,
  apiVersion: '2',
  strictSSL: true,
});

(async () => {
  try {
    // Get available transitions for the issue
    const transitionsResponse = await jira.listTransitions(issueKey);
    const transitions = transitionsResponse.transitions;

    // Define the target status to transition to
    const targetStatus = 'Done'; // Replace 'Done' with your desired status

    // Find the transition that matches the target status
    const transition = transitions.find(
      (t: { to: { name: string } }) => t.to.name.toLowerCase() === targetStatus.toLowerCase()
    );

    if (!transition) {
      console.error(`Cannot find transition to status "${targetStatus}".`);
      process.exit(1);
    }

    // Perform the transition
    await jira.transitionIssue(issueKey, {
      transition: { id: transition.id },
    });

    console.log(`Issue ${issueKey} transitioned to "${targetStatus}".`);
  } catch (err) {
    console.error('Failed to update JIRA issue:', err);
    process.exit(1);
  }
})();
