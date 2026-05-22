const assert = require("node:assert/strict");

const storage = new Map();

global.localStorage = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null;
  },
  setItem(key, value) {
    storage.set(key, String(value));
  }
};

const app = require("../src/app.js");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test("suggestPriority promotes safety language to high priority", () => {
  const result = app.suggestPriority("Road damage", "Blocked school crossing is unsafe", "Shanti Nagar");

  assert.equal(result.priority, "High");
  assert.match(result.reason, /unsafe|blocked|school/);
});

test("duplicateScore rewards matching category and location context", () => {
  const candidate = {
    title: "Garbage overflow near community hall",
    category: "Garbage collection",
    location: "Shanti Nagar community hall",
    ward: "Shanti Nagar",
    landmark: "Community Hall"
  };
  const issue = {
    title: "Garbage not collected",
    category: "Garbage collection",
    location: "Near Community Hall, Shanti Nagar",
    ward: "Shanti Nagar",
    landmark: "Community Hall"
  };

  assert.ok(app.duplicateScore(candidate, issue) >= 4);
});

test("normalizeIssue supplies assignment, duplicate, and activity defaults", () => {
  const normalized = app.normalizeIssue({
    id: "issue-test",
    title: "Water leak",
    category: "Water leakage",
    location: "Ward 27",
    description: "Water leak near park",
    status: "Submitted",
    priority: "Medium",
    createdAt: "2026-05-20T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z"
  });

  assert.equal(normalized.assignedTeam, "Unassigned");
  assert.deepEqual(normalized.duplicateHints, []);
  assert.deepEqual(normalized.activityTimeline, []);
});

test("parseBackupPayload accepts valid backups and rejects duplicate ids", () => {
  const issue = app.normalizeIssue({
    id: "issue-backup",
    title: "Streetlight outage",
    category: "Streetlight",
    location: "Ward 27",
    description: "Streetlight not working",
    status: "Submitted",
    priority: "High",
    createdAt: "2026-05-20T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z",
    coordinates: { latitude: 12.971599, longitude: 77.594566 }
  });
  const validPayload = JSON.stringify({
    backupType: app.BACKUP_TYPE,
    version: app.BACKUP_VERSION,
    issues: [issue]
  });
  const duplicatePayload = JSON.stringify({
    backupType: app.BACKUP_TYPE,
    version: app.BACKUP_VERSION,
    issues: [issue, issue]
  });

  assert.equal(app.parseBackupPayload(validPayload).length, 1);
  assert.throws(() => app.parseBackupPayload(duplicatePayload), /invalid or duplicate/);
});

test("createMunicipalSummaryFrom counts open and high-priority reports", () => {
  const summary = app.createMunicipalSummaryFrom([
    {
      id: "issue-open",
      title: "Road damaged",
      category: "Road damage",
      location: "Ward 27",
      description: "Pothole near main road",
      status: "Submitted",
      priority: "High",
      createdAt: "2026-05-20T08:00:00.000Z",
      updatedAt: "2026-05-20T08:00:00.000Z"
    },
    {
      id: "issue-resolved",
      title: "Garbage cleared",
      category: "Garbage collection",
      location: "Ward 27",
      description: "Resolved garbage issue",
      status: "Resolved",
      priority: "Low",
      createdAt: "2026-05-20T08:00:00.000Z",
      updatedAt: "2026-05-20T08:00:00.000Z"
    }
  ]);

  assert.equal(summary.totals.allIssues, 2);
  assert.equal(summary.totals.openIssues, 1);
  assert.equal(summary.totals.highPriority, 1);
});
