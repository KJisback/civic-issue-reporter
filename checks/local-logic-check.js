const assert = require("node:assert/strict");

const {
  createDemoScenarioIssues,
  createIssueRecordExport,
  createMunicipalSummary,
  createPitchSnapshot,
  demoScenarios,
  duplicateScore,
  normalizeIssue,
  searchIssues,
  suggestPriority,
  validateImportedIssues
} = require("../src/app.js");

const priority = suggestPriority("Road damage", "Large pothole near school crossing is unsafe", "Ward 12");
assert.equal(priority.priority, "High");
assert.match(priority.reason, /school|unsafe/);

const duplicate = duplicateScore(
  {
    title: "Streetlight outage near bus stop",
    category: "Streetlight",
    location: "Ward 12 MG Road",
    ward: "Ward 12",
    landmark: "MG Road bus stop"
  },
  {
    title: "Streetlight outage near bus stop",
    category: "Streetlight",
    location: "Ward 12, MG Road",
    ward: "Ward 12",
    landmark: "MG Road bus stop"
  }
);
assert.ok(duplicate >= 4);

const normalized = normalizeIssue({
  id: "check-1",
  title: "Water leak",
  category: "Water leakage",
  location: "Ward 9",
  description: "Pipe leak",
  status: "Submitted",
  priority: "Medium",
  createdAt: "2026-06-01T00:00:00.000Z",
  updatedAt: "2026-06-01T00:00:00.000Z"
});
assert.equal(normalized.assignedTeam, "Water Works");
assert.equal(normalized.activityLog.length, 1);

const imported = validateImportedIssues({
  issues: [
    {
      title: "Garbage not collected",
      category: "Garbage collection",
      location: "Market road",
      description: "Bins are overflowing"
    }
  ]
});
assert.equal(imported.length, 1);
assert.equal(imported[0].assignedTeam, "Sanitation");

assert.throws(() => validateImportedIssues({ issues: [] }), /at least one issue/);

const summary = createMunicipalSummary();
assert.equal(summary.totals.allIssues > 0, true);
assert.equal(Array.isArray(summary.teamCounts), true);

const wardScenario = createDemoScenarioIssues("ward");
assert.equal(wardScenario.length, demoScenarios.ward.issues.length);
assert.equal(wardScenario.every((issue) => issue.activityLog.length > 0), true);

const fallbackScenario = createDemoScenarioIssues("missing");
assert.equal(fallbackScenario.length, demoScenarios.ward.issues.length);

const pitchSnapshot = createPitchSnapshot();
assert.match(pitchSnapshot.headline, /open civic records/);
assert.match(pitchSnapshot.wedge, /ward teams/);

const searchableIssues = [
  normalizeIssue({
    id: "search-1",
    title: "Drain cover broken",
    category: "Drainage",
    location: "Ward 4",
    description: "Broken cover near clinic",
    status: "Triaged",
    priority: "High",
    assignedTeam: "Drainage Crew",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z"
  }),
  normalizeIssue({
    id: "search-2",
    title: "Streetlight dim",
    category: "Streetlight",
    location: "Ward 8",
    description: "Light flickers",
    status: "Submitted",
    priority: "Low",
    assignedTeam: "Lighting Crew",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z"
  })
];
assert.equal(searchIssues("drainage crew", searchableIssues).length, 1);
assert.equal(searchIssues("ward 8", searchableIssues)[0].id, "search-2");
assert.equal(searchIssues("", searchableIssues).length, 2);

const recordExport = createIssueRecordExport(searchableIssues[0]);
assert.equal(recordExport.record.id, "search-1");
assert.equal(recordExport.record.location.ward, "Not specified");
assert.match(recordExport.disclaimer, /Local browser record/);

console.log("local logic checks passed");
