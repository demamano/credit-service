import JiraClient from 'jira-client';
import fs from 'fs';
import path from 'path';

// Environment variables
const {
  GIT_COMMIT_MESSAGE,
  JIRA_HOST,
  JIRA_EMAIL,
  JIRA_API_TOKEN,
  TEST_OUTCOME,
} = process.env;

// Validate environment variables
if (!GIT_COMMIT_MESSAGE || !JIRA_HOST || !JIRA_EMAIL || !JIRA_API_TOKEN || !TEST_OUTCOME) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

// Extract JIRA issue key from commit message
const issueKeyRegex = /([A-Z]+-\d+)/;
const match = GIT_COMMIT_MESSAGE.match(issueKeyRegex);

if (!match) {
  console.error('No JIRA issue key found in commit message.');
  process.exit(0);
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
    // Path to test results
    const testResultsPath = path.resolve('test-results', 'test-report.json');

    if (!fs.existsSync(testResultsPath)) {
      console.error('Test results file not found.');
      process.exit(1);
    }

    // Read test results
    const testResultsData = fs.readFileSync(testResultsPath, 'utf-8');
    const testResults = JSON.parse(testResultsData);

    // Generate test summary
    const testSummary = generateTestSummary(testResults);

    // Prepare comment based on test outcome
    let commentBody = '';

    if (TEST_OUTCOME === 'success') {
      commentBody = `Automated tests passed successfully.\n\n${testSummary}`;
    } else {
      commentBody = `Automated tests failed.\n\n${testSummary}`;
    }

    // Add a comment with the test summary
    await jira.addComment(issueKey, commentBody);

    // Create a read stream for the attachment
    const attachmentStream = fs.createReadStream(testResultsPath);

    // Attach the test results JSON file to the JIRA issue
    await jira.addAttachmentOnIssue(issueKey, attachmentStream);

    console.log(`Test results attached to issue ${issueKey}.`);
  } catch (err) {
    console.error('Failed to attach test results to JIRA issue:', err);
    process.exit(1);
  }
})();

// Function to generate a test summary from JSON results
function generateTestSummary(results: any): string {
  // Customize this function based on your test results structure
  // For example, if using Jest:

  const totalTests = results.numTotalTests;
  const failedTests = results.numFailedTests;
  const passedTests = results.numPassedTests;
  const testResultsArray = results.testResults;

  let summary = `Total Tests: ${totalTests}\nPassed: ${passedTests}\nFailed: ${failedTests}\n\n`;

  if (failedTests > 0) {
    summary += `Failed Test Details:\n`;
    testResultsArray.forEach((testSuite: any) => {
      testSuite.assertionResults.forEach((test: any) => {
        if (test.status === 'failed') {
          summary += `- ${test.fullName}\n  Message: ${test.failureMessages.join('\n')}\n\n`;
        }
      });
    });
  }

  return summary;
}
