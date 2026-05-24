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
  assert.match(result.reason, /unsafe|school|blocked/);
});

test("teamForCategory routes common civic categories", () => {
  assert.equal(app.teamForCategory("Streetlight"), "Electrical Team");
  assert.equal(app.teamForCategory("Road damage"), "Roads Team");
  assert.equal(app.teamForCategory("Water leakage"), "Water Supply Team");
  assert.equal(app.teamForCategory("Illegal dumping"), "Sanitation Team");
  assert.equal(app.teamForCategory("Public safety"), "Public Safety Desk");
});

test("normalizeIssue repairs malformed records", () => {
  const normalized = app.normalizeIssue({
    title: "",
    category: "Mystery",
    location: "",
    description: "",
    status: "Waiting",
    priority: "Urgent",
    team: "Nobody",
    coordinates: { latitude: 900, longitude: 900 },
    notes: ["Desk reviewed"]
  });

  assert.match(normalized.id, /^ISS-/);
  assert.equal(normalized.title, "Untitled civic issue");
  assert.equal(normalized.category, "Other civic issue");
  assert.equal(normalized.status, "Submitted");
  assert.ok(app.PRIORITIES.includes(normalized.priority));
  assert.equal(normalized.team, "Unassigned");
  assert.equal(normalized.coordinates, null);
  assert.deepEqual(normalized.notes, ["Desk reviewed"]);
});

test("createSummaryFrom counts issues and mapped reports", () => {
  const summary = app.createSummaryFrom([
    {
      id: "ISS-1",
      title: "Streetlight unsafe",
      category: "Streetlight",
      location: "Ward 27",
      description: "Unsafe dark street",
      status: "Submitted",
      priority: "High",
      coordinates: { latitude: 12.97, longitude: 77.59 }
    },
    {
      id: "ISS-2",
      title: "Garbage cleared",
      category: "Garbage collection",
      location: "Ward 27",
      description: "Done",
      status: "Resolved",
      priority: "Low"
    }
  ]);

  assert.equal(summary.totals.total, 2);
  assert.equal(summary.totals.open, 1);
  assert.equal(summary.totals.high, 1);
  assert.equal(summary.totals.mapped, 1);
});
