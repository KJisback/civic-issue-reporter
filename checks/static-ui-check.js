const assert = require("node:assert/strict");
const fs = require("node:fs");

const html = fs.readFileSync("src/index.html", "utf8");
const js = fs.readFileSync("src/app.js", "utf8");
const staticSource = `${html}\n${js}`;

const requiredIds = [
  "analyticsBoard",
  "assistPanel",
  "categoryFilter",
  "dashboard",
  "demoMode",
  "demoScenarioButtons",
  "exportBackup",
  "exportSummary",
  "formStatus",
  "importBackup",
  "issueCategory",
  "issueDescription",
  "issueDetail",
  "issueLandmark",
  "issueLatitude",
  "issueList",
  "issueLocation",
  "issueLongitude",
  "issueTitle",
  "issueWard",
  "locationPreview",
  "metrics",
  "printSummary",
  "pitchSnapshot",
  "priorityFilter",
  "queueCount",
  "report",
  "reportForm",
  "resetDemoData",
  "statusFilter",
  "summary",
  "summaryPreview",
  "summaryStatus",
  "vaultModules",
  "workflowBoard"
];

requiredIds.forEach((id) => {
  assert.match(html, new RegExp(`id="${id}"`), `Missing #${id} in index.html`);
});

const queriedIds = [...js.matchAll(/querySelector\("#([^"]+)"\)/g)]
  .map((match) => match[1])
  .filter((selector) => !selector.includes(" "));

queriedIds.forEach((id) => {
  assert.match(html, new RegExp(`id="${id}"`), `app.js queries #${id}, but index.html does not define it`);
});

[
  "CivicVault",
  "Skip to report form",
  "Report vault",
  "Municipal services",
  "Issued reports",
  "Uploaded evidence",
  "Retrieve report",
  "Pitch demo mode",
  "Ward operations",
  "Safety sprint",
  "Sanitation drive",
  "Pitch line",
  "Backup and exports",
  "Verified local reports",
  "Backup data",
  "Restore backup",
  "Print summary",
  "Export JSON",
  "Reset demo data"
].forEach((text) => {
  assert.match(staticSource, new RegExp(text), `Missing visible control text: ${text}`);
});

assert.doesNotMatch(html, /https?:\/\//, "Static MVP should not load external network assets");
assert.match(html, /<script src="app\.js"><\/script>/, "index.html should load local app.js");
assert.match(html, /<link rel="stylesheet" href="styles\.css">/, "index.html should load local styles.css");

console.log("static ui checks passed");
