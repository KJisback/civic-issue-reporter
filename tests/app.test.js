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

test("normalizeIssue repairs malformed stored records", () => {
  const normalized = app.normalizeIssue({
    id: "",
    title: "",
    category: "Legacy unknown category",
    location: "",
    description: "",
    status: "Waiting",
    priority: "Urgent",
    createdAt: "not-a-date",
    updatedAt: "not-a-date",
    coordinates: { latitude: 900, longitude: 900 }
  });

  assert.match(normalized.id, /^issue-/);
  assert.equal(normalized.title, "Untitled civic report");
  assert.equal(normalized.category, "Other civic issue");
  assert.equal(normalized.location, "Location not specified");
  assert.equal(normalized.description, "No description supplied.");
  assert.equal(normalized.status, "Submitted");
  assert.equal(normalized.coordinates, null);
});

test("normalizeIssue preserves local desk notes", () => {
  const normalized = app.normalizeIssue({
    id: "issue-note",
    title: "Drain blocked",
    category: "Drainage",
    location: "Ward 27",
    description: "Drain blocked near community hall",
    status: "Triaged",
    priority: "Medium",
    createdAt: "2026-05-20T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z",
    notes: [
      {
        id: "note-1",
        text: "Assigned for morning inspection.",
        createdAt: "2026-05-20T09:00:00.000Z"
      },
      {
        id: "note-empty",
        text: "",
        createdAt: "2026-05-20T09:00:00.000Z"
      }
    ]
  });

  assert.equal(normalized.notes.length, 1);
  assert.equal(normalized.notes[0].text, "Assigned for morning inspection.");
});

test("teamForCategory routes common civic categories", () => {
  assert.equal(app.teamForCategory("Road damage"), "Roads maintenance");
  assert.equal(app.teamForCategory("Illegal dumping"), "Sanitation crew");
  assert.equal(app.teamForCategory("Water leakage"), "Water services");
  assert.equal(app.teamForCategory("Traffic signal"), "Lighting team");
  assert.equal(app.teamForCategory("Public safety"), "Public safety desk");
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
      updatedAt: "2026-05-20T08:00:00.000Z",
      notes: [{ text: "Crew notified", createdAt: "2026-05-20T09:00:00.000Z" }]
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
  assert.deepEqual(summary.issues[0].notes, ["Crew notified"]);
});
