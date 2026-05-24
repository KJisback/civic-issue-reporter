const STORAGE_KEY = "civicIssueReporter.issues.v1";
const BACKUP_TYPE = "civicIssueReporter.fullBackup";
const BACKUP_VERSION = 1;
const STATUSES = ["Submitted", "Triaged", "In progress", "Resolved"];
const STATUS_FILTERS = ["Open", ...STATUSES];
const PRIORITIES = ["Low", "Medium", "High"];
const ASSIGNMENT_TEAMS = [
  "Unassigned",
  "Roads maintenance",
  "Sanitation crew",
  "Water services",
  "Lighting team",
  "Public safety desk"
];
const DUPLICATE_REVIEW_STATUSES = ["Needs review", "Linked", "Dismissed"];
const DEFAULT_DUPLICATE_REVIEW_STATUS = "Needs review";
const DEFAULT_QUEUE_NOTE = "Local desk note";
const CATEGORIES = [
  "Streetlight",
  "Road damage",
  "Garbage collection",
  "Drainage",
  "Water leakage",
  "Public safety",
  "Sewage overflow",
  "Footpath obstruction",
  "Illegal dumping",
  "Traffic signal",
  "Tree hazard",
  "Public toilet",
  "Park maintenance",
  "Stray animal concern",
  "Noise complaint",
  "Other civic issue"
];

const sampleIssues = [
  {
    id: "sample-streetlight-001",
    title: "Streetlight outage near bus stop",
    category: "Streetlight",
    location: "Ward 12, MG Road",
    ward: "Ward 12",
    landmark: "MG Road bus stop",
    status: "Submitted",
    priority: "High",
    description: "Dark stretch near a busy stop after 8 PM. Residents report safety concerns.",
    createdAt: "2026-05-20T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z",
    coordinates: { latitude: 12.971599, longitude: 77.594566 },
    photo: null,
    assignedTeam: null,
    activityTimeline: [],
    reporterContactOptional: null,
    isSample: true
  },
  {
    id: "sample-garbage-002",
    title: "Garbage overflow beside market",
    category: "Garbage collection",
    location: "Central Market Lane",
    ward: "Central Market",
    landmark: "Market east gate",
    status: "Triaged",
    priority: "Medium",
    description: "Waste has overflowed for two days and blocks the pedestrian path.",
    createdAt: "2026-05-20T09:15:00.000Z",
    updatedAt: "2026-05-20T09:15:00.000Z",
    coordinates: null,
    photo: null,
    assignedTeam: null,
    activityTimeline: [],
    reporterContactOptional: null,
    isSample: true
  },
  {
    id: "sample-road-003",
    title: "Pothole at school crossing",
    category: "Road damage",
    location: "Lake Road school gate",
    ward: "Lake Road",
    landmark: "School front crossing",
    status: "In progress",
    priority: "High",
    description: "Large pothole slows traffic and creates risk for students during pickup time.",
    createdAt: "2026-05-20T10:30:00.000Z",
    updatedAt: "2026-05-20T10:30:00.000Z",
    coordinates: { latitude: 12.975221, longitude: 77.603287 },
    photo: null,
    assignedTeam: null,
    activityTimeline: [],
    reporterContactOptional: null,
    isSample: true
  }
];

let issues = loadIssues();
let filters = {
  category: "All",
  status: "All",
  priority: "All"
};
let selectedIssueId = null;
let lastDetailTriggerIssueId = null;
let pendingFocusTarget = null;

function createIssue({ title, category, location, ward, landmark, description, coordinates }) {
  const now = new Date().toISOString();
  const priorityAssistance = suggestPriority(category, description, location);
  const duplicateAssistance = findPotentialDuplicates({ title, category, location, ward, landmark, description });

  return {
    id: `issue-${Date.now()}`,
    title,
    category,
    location,
    ward,
    landmark,
    status: "Submitted",
    priority: priorityAssistance.priority,
    priorityReason: priorityAssistance.reason,
    duplicateHints: duplicateAssistance,
    description,
    createdAt: now,
    updatedAt: now,
    coordinates,
    photo: null,
    assignedTeam: null,
    notes: [],
    activityTimeline: [
      createActivityEvent({
        type: "created",
        label: "Report submitted",
        to: "Submitted",
        happenedAt: now,
        note: "Created in local browser storage."
      })
    ],
    reporterContactOptional: null,
    isSample: false
  };
}

function inferPriority(category, description) {
  return suggestPriority(category, description, "").priority;
}

function suggestPriority(category, description, location) {
  const highSignals = ["danger", "unsafe", "school", "leak", "accident", "blocked", "injury", "fire", "collapse"];
  const mediumCategories = [
    "Garbage collection",
    "Drainage",
    "Water leakage",
    "Sewage overflow",
    "Illegal dumping",
    "Public toilet",
    "Tree hazard"
  ];
  const text = `${category} ${description} ${location}`.toLowerCase();
  const matchedSignal = highSignals.find((word) => text.includes(word));

  if (matchedSignal) {
    return {
      priority: "High",
      reason: `High because the report mentions "${matchedSignal}".`
    };
  }

  if (mediumCategories.includes(category)) {
    return {
      priority: "Medium",
      reason: `Medium because ${category.toLowerCase()} issues can affect public health or access.`
    };
  }

  return {
    priority: "Low",
    reason: "Low because no urgent safety, blockage, or public health signal was detected."
  };
}

function wordsFrom(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4);
}

function sharedWordCount(left, right) {
  const rightWords = new Set(wordsFrom(right));
  return wordsFrom(left).filter((word) => rightWords.has(word)).length;
}

function duplicateScore(candidate, issue) {
  let score = 0;

  if (candidate.category === issue.category) {
    score += 2;
  }

  score += Math.min(sharedWordCount(candidate.location, issue.location), 3);
  score += Math.min(sharedWordCount(candidate.ward, issue.ward || ""), 2);
  score += Math.min(sharedWordCount(candidate.landmark, issue.landmark || ""), 2);
  score += Math.min(sharedWordCount(candidate.title, issue.title), 2);

  return score;
}

function findPotentialDuplicates(candidate) {
  return issues
    .map((issue) => ({
      id: issue.id,
      title: issue.title,
      location: issue.location,
      score: duplicateScore(candidate, issue),
      reviewStatus: DEFAULT_DUPLICATE_REVIEW_STATUS,
      reviewedAt: null
    }))
    .filter((match) => match.score >= 4)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function loadIssues() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    const normalizedSamples = sampleIssues.map(normalizeIssue);
    saveIssues(normalizedSamples);
    return normalizedSamples;
  }

  try {
    const parsed = JSON.parse(stored);
    const normalized = Array.isArray(parsed)
      ? parsed.map(normalizeIssue).filter(Boolean)
      : [];

    if (normalized.length > 0) {
      saveIssues(normalized);
      return normalized;
    }

    const normalizedSamples = sampleIssues.map(normalizeIssue);
    saveIssues(normalizedSamples);
    return normalizedSamples;
  } catch {
    const normalizedSamples = sampleIssues.map(normalizeIssue);
    saveIssues(normalizedSamples);
    return normalizedSamples;
  }
}

function saveIssues(nextIssues) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIssues));
}

function normalizeIssue(issue) {
  if (!isPlainObject(issue)) {
    return null;
  }

  const fallbackNow = new Date().toISOString();
  const duplicateHints = normalizeDuplicateHints(issue.duplicateHints);
  const assignedTeam = ASSIGNMENT_TEAMS.includes(issue.assignedTeam) ? issue.assignedTeam : "Unassigned";
  const activityTimeline = normalizeActivityTimeline(issue.activityTimeline);
  const notes = normalizeNotes(issue.notes);
  const category = CATEGORIES.includes(issue.category) ? issue.category : "Other civic issue";
  const status = STATUSES.includes(issue.status) ? issue.status : "Submitted";
  const priority = PRIORITIES.includes(issue.priority) ? issue.priority : inferPriority(category, issue.description || "");
  const coordinates = isValidCoordinates(issue.coordinates) ? issue.coordinates || null : null;

  return {
    ...issue,
    id: typeof issue.id === "string" && issue.id.trim() ? issue.id : `issue-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: typeof issue.title === "string" && issue.title.trim() ? issue.title : "Untitled civic report",
    category,
    location: typeof issue.location === "string" && issue.location.trim() ? issue.location : "Location not specified",
    description: typeof issue.description === "string" && issue.description.trim() ? issue.description : "No description supplied.",
    status,
    priority,
    createdAt: isValidIsoDate(issue.createdAt) ? issue.createdAt : fallbackNow,
    updatedAt: isValidIsoDate(issue.updatedAt) ? issue.updatedAt : fallbackNow,
    ward: typeof issue.ward === "string" ? issue.ward : "",
    landmark: typeof issue.landmark === "string" ? issue.landmark : "",
    coordinates,
    priorityReason: "",
    assignedTeam,
    duplicateHints,
    notes,
    activityTimeline
  };
}

function normalizeNotes(notes) {
  if (!Array.isArray(notes)) {
    return [];
  }

  return notes
    .map((note) => ({
      id: note.id || `note-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: typeof note.text === "string" && note.text.trim() ? note.text.trim() : "",
      createdAt: isValidIsoDate(note.createdAt) ? note.createdAt : new Date().toISOString()
    }))
    .filter((note) => note.text);
}

function normalizeDuplicateHints(duplicateHints) {
  if (!Array.isArray(duplicateHints)) {
    return [];
  }

  return duplicateHints.map((hint) => {
    const reviewStatus = DUPLICATE_REVIEW_STATUSES.includes(hint.reviewStatus)
      ? hint.reviewStatus
      : DEFAULT_DUPLICATE_REVIEW_STATUS;

    return {
      id: hint.id,
      title: hint.title || "Untitled report",
      location: hint.location || "Location not specified",
      score: Number(hint.score) || 0,
      reviewStatus,
      reviewedAt: hint.reviewedAt || null
    };
  });
}

function normalizeActivityTimeline(activityTimeline) {
  if (!Array.isArray(activityTimeline)) {
    return [];
  }

  return activityTimeline
    .map((event) => ({
      id: event.id || `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type: event.type || "change",
      label: event.label || "Local change recorded",
      from: event.from || null,
      to: event.to || null,
      happenedAt: event.happenedAt || event.createdAt || new Date().toISOString(),
      note: event.note || "Recorded locally in this browser."
    }))
    .filter((event) => !Number.isNaN(new Date(event.happenedAt).getTime()));
}

function createActivityEvent({ type, label, from = null, to = null, happenedAt, note }) {
  const timestamp = happenedAt || new Date().toISOString();

  return {
    id: `activity-${timestamp}-${Math.random().toString(16).slice(2)}`,
    type,
    label,
    from,
    to,
    happenedAt: timestamp,
    note
  };
}

function priorityClass(priority) {
  return `priority-${priority.toLowerCase()}`;
}

function categoryClass(category) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function duplicateStatusClass(status) {
  return `duplicate-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function statusIndex(status) {
  return STATUSES.indexOf(status);
}

function getFilteredIssues() {
  return issues.filter((issue) => {
    const categoryMatches = filters.category === "All" || issue.category === filters.category;
    const statusMatches =
      filters.status === "All" ||
      (filters.status === "Open" && issue.status !== "Resolved") ||
      issue.status === filters.status;
    const priorityMatches = filters.priority === "All" || issue.priority === filters.priority;

    return categoryMatches && statusMatches && priorityMatches;
  });
}

function optionMarkup(options, selectedValue) {
  return options
    .map((option) => `<option value="${escapeHtml(option)}"${option === selectedValue ? " selected" : ""}>${escapeHtml(option)}</option>`)
    .join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

function formatDate(isoDate) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoDate));
}

function formatCoordinates(coordinates) {
  if (!coordinates) {
    return "Coordinates not added";
  }

  return `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`;
}

function photoEvidenceLabel(issue) {
  return issue.photo ? "Photo evidence attached" : "Photo evidence not stored";
}

function photoEvidenceNote() {
  return "Photo uploads are planned for a later privacy-approved ticket.";
}

function assignmentLabel(issue) {
  return issue.assignedTeam || "Unassigned";
}

function formatDateTime(isoDate) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoDate));
}

function duplicateReviewSummary(issue) {
  const linked = issue.duplicateHints.filter((hint) => hint.reviewStatus === "Linked").length;
  const dismissed = issue.duplicateHints.filter((hint) => hint.reviewStatus === "Dismissed").length;
  const needsReview = issue.duplicateHints.filter((hint) => hint.reviewStatus === "Needs review").length;

  if (linked > 0) {
    return `${linked} linked duplicate${linked > 1 ? "s" : ""}`;
  }

  if (needsReview > 0) {
    return `${needsReview} duplicate hint${needsReview > 1 ? "s" : ""} need review`;
  }

  if (dismissed > 0) {
    return `${dismissed} duplicate hint${dismissed > 1 ? "s" : ""} dismissed`;
  }

  return "";
}

function countBy(collection, values, key) {
  return values.map((value) => ({
    label: value,
    count: collection.filter((item) => item[key] === value).length
  }));
}

function percentOfTotal(count, total) {
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

function openAgeDays(issue) {
  const referenceDate = new Date(issue.updatedAt || issue.createdAt);
  const ageMs = Date.now() - referenceDate.getTime();
  return Math.max(0, Math.floor(ageMs / 86400000));
}

function createMunicipalSummary() {
  const openIssues = issues.filter((issue) => issue.status !== "Resolved");
  const highPriority = issues.filter((issue) => issue.priority === "High");
  const duplicateHints = issues.flatMap((issue) => issue.duplicateHints);
  const linkedDuplicates = duplicateHints.filter((hint) => hint.reviewStatus === "Linked");
  const needsDuplicateReview = duplicateHints.filter((hint) => hint.reviewStatus === "Needs review");
  const issuesWithCoordinates = issues.filter((issue) => issue.coordinates);
  const statusCounts = countBy(issues, STATUSES, "status");
  const priorityCounts = countBy(issues, PRIORITIES, "priority");
  const categoryCounts = countBy(issues, CATEGORIES, "category");

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      allIssues: issues.length,
      openIssues: openIssues.length,
      highPriority: highPriority.length,
      coordinateReady: issuesWithCoordinates.length,
      duplicateHints: duplicateHints.length,
      linkedDuplicates: linkedDuplicates.length,
      duplicateHintsNeedingReview: needsDuplicateReview.length
    },
    statusCounts,
    priorityCounts,
    categoryCounts,
    issues: issues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      category: issue.category,
      status: issue.status,
      priority: issue.priority,
      location: issue.location,
      ward: issue.ward || "Not specified",
      landmark: issue.landmark || "Not specified",
      coordinates: formatCoordinates(issue.coordinates),
      assignedTeam: assignmentLabel(issue),
      notes: issue.notes.map((note) => note.text),
      duplicateReview: duplicateReviewSummary(issue) || "No duplicate hints",
      reportedAt: issue.createdAt,
      updatedAt: issue.updatedAt
    }))
  };
}

function createFullBackup() {
  return {
    backupType: BACKUP_TYPE,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    source: "Civic Issue Reporter local browser backup",
    warning: "This backup is browser-local demo data and is not an official municipal record.",
    issues: issues.map(normalizeIssue)
  };
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isValidIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

function isValidCoordinates(coordinates) {
  if (coordinates === null || coordinates === undefined) {
    return true;
  }

  return (
    isPlainObject(coordinates) &&
    typeof coordinates.latitude === "number" &&
    typeof coordinates.longitude === "number" &&
    coordinates.latitude >= -90 &&
    coordinates.latitude <= 90 &&
    coordinates.longitude >= -180 &&
    coordinates.longitude <= 180
  );
}

function validateBackupIssue(issue) {
  return (
    isPlainObject(issue) &&
    typeof issue.id === "string" &&
    typeof issue.title === "string" &&
    CATEGORIES.includes(issue.category) &&
    typeof issue.location === "string" &&
    typeof issue.description === "string" &&
    STATUSES.includes(issue.status) &&
    PRIORITIES.includes(issue.priority) &&
    isValidIsoDate(issue.createdAt) &&
    isValidIsoDate(issue.updatedAt) &&
    isValidCoordinates(issue.coordinates)
  );
}

function parseBackupPayload(text) {
  let payload;

  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error("Backup file must be valid JSON.");
  }

  if (!isPlainObject(payload) || payload.backupType !== BACKUP_TYPE || payload.version !== BACKUP_VERSION) {
    throw new Error("Backup file is not a supported Civic Issue Reporter backup.");
  }

  if (!Array.isArray(payload.issues) || payload.issues.length === 0) {
    throw new Error("Backup file must include at least one issue.");
  }

  const ids = new Set();
  const invalidIssue = payload.issues.find((issue) => {
    if (!validateBackupIssue(issue) || ids.has(issue.id)) {
      return true;
    }

    ids.add(issue.id);
    return false;
  });

  if (invalidIssue) {
    throw new Error("Backup file contains invalid or duplicate issue records.");
  }

  return payload.issues.map(normalizeIssue);
}

function summaryCountMarkup(items) {
  return items
    .map((item) => `<span><strong>${item.count}</strong> ${escapeHtml(item.label)}</span>`)
    .join("");
}

function renderSummaryPreview() {
  const summary = createMunicipalSummary();
  const priorityFocus = summary.issues
    .filter((issue) => issue.priority === "High" || issue.status !== "Resolved")
    .slice(0, 6);

  document.querySelector("#summaryPreview").innerHTML = `
    <div class="summary-header">
      <div>
        <p class="eyebrow">Printable snapshot</p>
        <h3>Civic issue summary</h3>
        <p>Generated ${formatDateTime(summary.generatedAt)} from local browser data.</p>
      </div>
      <div class="summary-total">
        <strong>${summary.totals.openIssues}</strong>
        <span>open reports</span>
      </div>
    </div>
    <div class="summary-stat-grid">
      <div><strong>${summary.totals.allIssues}</strong><span>Total reports</span></div>
      <div><strong>${summary.totals.highPriority}</strong><span>High priority</span></div>
      <div><strong>${summary.totals.coordinateReady}</strong><span>Map-ready</span></div>
      <div><strong>${summary.totals.duplicateHintsNeedingReview}</strong><span>Duplicate hints to review</span></div>
    </div>
    <div class="summary-breakdown">
      <section>
        <h4>Status</h4>
        ${summaryCountMarkup(summary.statusCounts)}
      </section>
      <section>
        <h4>Priority</h4>
        ${summaryCountMarkup(summary.priorityCounts)}
      </section>
      <section>
        <h4>Category</h4>
        ${summaryCountMarkup(summary.categoryCounts)}
      </section>
    </div>
    <div class="summary-issue-table" role="table" aria-label="Priority issue summary">
      <div role="row" class="summary-row summary-row-head">
        <span role="columnheader">Issue</span>
        <span role="columnheader">Status</span>
        <span role="columnheader">Priority</span>
        <span role="columnheader">Team</span>
        <span role="columnheader">Location</span>
      </div>
      ${
        priorityFocus.length > 0
          ? priorityFocus
              .map(
                (issue) => `
                  <div role="row" class="summary-row">
                    <span role="cell">${escapeHtml(issue.title)}</span>
                    <span role="cell">${escapeHtml(issue.status)}</span>
                    <span role="cell">${escapeHtml(issue.priority)}</span>
                    <span role="cell">${escapeHtml(issue.assignedTeam)}</span>
                    <span role="cell">${escapeHtml(issue.location)}</span>
                  </div>
                `
              )
              .join("")
          : `<div class="empty-state">No open or high-priority reports to highlight.</div>`
      }
    </div>
  `;
}

function renderIssues() {
  const list = document.querySelector("#issueList");
  const filteredIssues = getFilteredIssues();
  document.querySelector("#queueCount").textContent = `${filteredIssues.length} shown / ${issues.length} total`;

  if (filteredIssues.length === 0) {
    list.innerHTML = `<div class="empty-state">No reports match the current filters. Use View All Issues to reset the queue.</div>`;
    return;
  }

  list.innerHTML = filteredIssues
    .slice(0, 8)
    .map(
      (issue) => `
        <article class="issue-card" data-issue-id="${escapeHtml(issue.id)}">
          <span class="issue-symbol ${categoryClass(issue.category)}" aria-hidden="true"></span>
          <div class="issue-main">
            <div class="issue-number-row">
              <span>#${escapeHtml(issue.id.replace("sample-", "ISS-").replace("issue-", "ISS-").slice(0, 8))}</span>
              <time datetime="${issue.createdAt}">${openAgeDays(issue)}d ago</time>
            </div>
            <h3>${escapeHtml(issue.title)}</h3>
            <p>${escapeHtml(issue.location)}</p>
            <div class="card-meta">
              <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)} Priority</span>
              <span class="tag status-${statusClass(issue.status)}">${escapeHtml(issue.status)}</span>
              <span class="tag tag-info">${issue.notes.length} note${issue.notes.length === 1 ? "" : "s"}</span>
            </div>
          </div>
          <div class="triage-controls" aria-label="Triage controls for ${escapeHtml(issue.title)}">
            <button class="secondary-button details-button" type="button" data-action="view-detail" data-issue-id="${escapeHtml(issue.id)}" aria-label="View details for ${escapeHtml(issue.title)}">View</button>
            <label>
              Status
              <select data-action="status" data-issue-id="${escapeHtml(issue.id)}" aria-label="Status for ${escapeHtml(issue.title)}">
                ${optionMarkup(STATUSES, issue.status)}
              </select>
            </label>
            <label>
              Priority
              <select data-action="priority" data-issue-id="${escapeHtml(issue.id)}" aria-label="Priority for ${escapeHtml(issue.title)}">
                ${optionMarkup(PRIORITIES, issue.priority)}
              </select>
            </label>
            <label>
              Assigned team
              <select data-action="assignment" data-issue-id="${escapeHtml(issue.id)}" aria-label="Assigned team for ${escapeHtml(issue.title)}">
                ${optionMarkup(ASSIGNMENT_TEAMS, assignmentLabel(issue))}
              </select>
            </label>
          </div>
        </article>
      `
    )
    .join("");
}

function timelineMarkup(issue) {
  const currentIndex = statusIndex(issue.status);

  return STATUSES.map((status, index) => {
    const isComplete = index <= currentIndex;
    const isCurrent = index === currentIndex;

    return `
      <li class="${isComplete ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}">
        <span aria-hidden="true"></span>
        <div>
          <strong>${escapeHtml(status)}</strong>
          <p>${isCurrent ? `Current status, updated ${formatDate(issue.updatedAt)}` : isComplete ? "Completed in local workflow" : "Pending"}</p>
        </div>
      </li>
    `;
  }).join("");
}

function activityTimelineMarkup(issue) {
  if (issue.activityTimeline.length === 0) {
    return `<p>No local activity changes have been recorded for this report yet.</p>`;
  }

  return `
    <ol class="activity-timeline">
      ${issue.activityTimeline
        .slice()
        .sort((left, right) => new Date(right.happenedAt) - new Date(left.happenedAt))
        .map(
          (event) => `
            <li>
              <div>
                <strong>${escapeHtml(event.label)}</strong>
                <time datetime="${escapeHtml(event.happenedAt)}">${formatDate(event.happenedAt)}</time>
              </div>
              ${event.from || event.to ? `<p>${event.from ? `From ${escapeHtml(event.from)} ` : ""}${event.to ? `to ${escapeHtml(event.to)}` : ""}</p>` : ""}
              <span>${escapeHtml(event.note)}</span>
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}

function duplicateListMarkup(issue) {
  if (issue.duplicateHints.length === 0) {
    return `<p>No possible duplicates are currently attached to this report.</p>`;
  }

  return `
    <ul class="detail-list duplicate-review-list">
      ${issue.duplicateHints
        .map(
          (hint) => `
            <li>
              <div>
                <strong>${escapeHtml(hint.title)}</strong>
                <span>${escapeHtml(hint.location)}</span>
                <span>Match score: ${hint.score}</span>
                ${hint.reviewedAt ? `<span>Reviewed ${formatDate(hint.reviewedAt)}</span>` : ""}
              </div>
              <label>
                Review action
                <select data-action="duplicate-review" data-issue-id="${escapeHtml(issue.id)}" data-duplicate-id="${escapeHtml(hint.id)}" aria-label="Review action for possible duplicate ${escapeHtml(hint.title)}">
                  ${optionMarkup(DUPLICATE_REVIEW_STATUSES, hint.reviewStatus)}
                </select>
              </label>
              <span class="tag ${duplicateStatusClass(hint.reviewStatus)}">${escapeHtml(hint.reviewStatus)}</span>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

function notesMarkup(issue) {
  if (issue.notes.length === 0) {
    return `<p>No local desk notes have been added yet.</p>`;
  }

  return `
    <ul class="detail-list">
      ${issue.notes
        .slice()
        .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
        .map(
          (note) => `
            <li>
              <strong>${escapeHtml(note.text)}</strong>
              <span>${formatDate(note.createdAt)}</span>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

function renderIssueDetail() {
  const panel = document.querySelector("#issueDetail");
  const issue = issues.find((item) => item.id === selectedIssueId);

  if (!issue) {
    panel.hidden = true;
    panel.removeAttribute("aria-labelledby");
    panel.innerHTML = "";
    return;
  }

  panel.hidden = false;
  panel.setAttribute("aria-labelledby", "issueDetailTitle");
  panel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Issue detail</p>
        <div class="detail-title-row">
          <span class="issue-symbol ${categoryClass(issue.category)}" aria-hidden="true"></span>
          <h2 id="issueDetailTitle">${escapeHtml(issue.title)}</h2>
        </div>
        <div class="card-meta">
          <span class="tag">${escapeHtml(issue.category)}</span>
          <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)}</span>
          <span class="tag status-${statusClass(issue.status)}">${escapeHtml(issue.status)}</span>
          <span class="tag tag-assignment">${escapeHtml(assignmentLabel(issue))}</span>
        </div>
      </div>
      <button class="secondary-button" type="button" data-action="close-detail" aria-label="Close issue detail for ${escapeHtml(issue.title)}">Close</button>
    </div>

    <div class="detail-grid">
      <div class="detail-section">
        <h3>Report context</h3>
        <p>${escapeHtml(issue.description)}</p>
        <div class="location-block">
          <p><strong>Location:</strong> ${escapeHtml(issue.location)}</p>
          <span class="location-detail">Area: ${escapeHtml(issue.ward || "Not specified")}</span>
          <span class="location-detail">Landmark: ${escapeHtml(issue.landmark || "Not specified")}</span>
          <span class="location-detail">Map-ready: ${escapeHtml(formatCoordinates(issue.coordinates))}</span>
        </div>
        <div class="evidence-block evidence-block-detail">
          <div class="evidence-thumbnail" aria-hidden="true"></div>
          <div>
            <strong>${escapeHtml(photoEvidenceLabel(issue))}</strong>
            <p>${escapeHtml(photoEvidenceNote())} Future storage must define redaction, retention, and visibility rules first.</p>
          </div>
        </div>
        <p><strong>Reported:</strong> ${formatDate(issue.createdAt)}</p>
        <p><strong>Last updated:</strong> ${formatDate(issue.updatedAt)}</p>
      </div>

      <div class="detail-section">
        <h3>Status timeline</h3>
        <ol class="timeline">
          ${timelineMarkup(issue)}
        </ol>
      </div>

      <div class="detail-section">
        <h3>Local activity</h3>
        <p>These events are stored only in this browser and are not an official staff audit log.</p>
        ${activityTimelineMarkup(issue)}
      </div>

      <div class="detail-section">
        <h3>Desk notes</h3>
        ${notesMarkup(issue)}
      </div>

      <div class="detail-section">
        <h3>Review signals</h3>
        <p><strong>Priority:</strong> ${escapeHtml(issue.priorityReason || "Priority can be adjusted by staff.")}</p>
        <p><strong>Assigned team:</strong> ${escapeHtml(assignmentLabel(issue))}. This is a local routing label only and does not identify a staff member.</p>
        <p><strong>Duplicate review:</strong></p>
        ${duplicateListMarkup(issue)}
      </div>

      <div class="detail-section detail-controls">
        <h3>Triage controls</h3>
        <label>
          Status
          <select data-action="status" data-issue-id="${escapeHtml(issue.id)}" aria-label="Status for ${escapeHtml(issue.title)}">
            ${optionMarkup(STATUSES, issue.status)}
          </select>
        </label>
        <label>
          Priority
          <select data-action="priority" data-issue-id="${escapeHtml(issue.id)}" aria-label="Priority for ${escapeHtml(issue.title)}">
            ${optionMarkup(PRIORITIES, issue.priority)}
          </select>
        </label>
        <label>
          Assigned team
          <select data-action="assignment" data-issue-id="${escapeHtml(issue.id)}" aria-label="Assigned team for ${escapeHtml(issue.title)}">
            ${optionMarkup(ASSIGNMENT_TEAMS, assignmentLabel(issue))}
          </select>
        </label>
        <label>
          Add local note
          <textarea data-note-input="${escapeHtml(issue.id)}" rows="3" placeholder="Add a local desk note for this issue"></textarea>
        </label>
        <button class="secondary-button" type="button" data-action="add-note" data-issue-id="${escapeHtml(issue.id)}">Save Note</button>
      </div>
    </div>
  `;
}

function renderMetrics() {
  const openIssues = issues.filter((issue) => issue.status !== "Resolved").length;
  const triaged = issues.filter((issue) => issue.status === "Triaged").length;
  const inProgress = issues.filter((issue) => issue.status === "In progress").length;
  const resolved = issues.filter((issue) => issue.status === "Resolved").length;

  const metrics = [
    [String(openIssues), "Open issues"],
    [String(triaged), "Triage"],
    [String(inProgress), "In Progress"],
    [String(resolved), "Resolved"]
  ];

  document.querySelector("#metrics").innerHTML = metrics
    .map(
      ([value, label]) => `
        <div class="metric">
          <strong>${value}</strong>
          <span>${label}</span>
        </div>
      `
    )
    .join("");
}

function renderWorkflowBoard() {
  const board = document.querySelector("#workflowBoard");

  board.innerHTML = STATUSES.map((status) => {
    const matchingIssues = issues.filter((issue) => issue.status === status);
    const highPriorityCount = matchingIssues.filter((issue) => issue.priority === "High").length;

    return `
      <div class="workflow-column">
        <strong>${escapeHtml(status)}</strong>
        <span>${matchingIssues.length} reports</span>
        <span>${highPriorityCount} high priority</span>
      </div>
    `;
  }).join("");
}

function analyticsBarMarkup(items, total) {
  return items
    .map((item) => {
      const percent = percentOfTotal(item.count, total);

      return `
        <div class="analytics-bar-row">
          <span>${escapeHtml(item.label)}</span>
          <div class="analytics-bar" aria-hidden="true"><span style="width: ${percent}%"></span></div>
          <strong>${item.count}</strong>
        </div>
      `;
    })
    .join("");
}

function renderAnalyticsSnapshot() {
  const totalIssues = issues.length;
  const openIssues = issues.filter((issue) => issue.status !== "Resolved");
  const staleOpenIssues = openIssues.filter((issue) => openAgeDays(issue) >= 1);
  const priorityQueue = [...openIssues]
    .sort((left, right) => {
      const priorityDelta = PRIORITIES.indexOf(right.priority) - PRIORITIES.indexOf(left.priority);
      return priorityDelta || new Date(left.updatedAt) - new Date(right.updatedAt);
    })
    .slice(0, 5);
  const assignmentCounts = countBy(issues, ASSIGNMENT_TEAMS, "assignedTeam").filter(
    (item) => item.count > 0 || item.label === "Unassigned"
  );
  const statusCounts = countBy(issues, STATUSES, "status");
  const categoryCounts = countBy(issues, CATEGORIES, "category").filter((item) => item.count > 0);

  document.querySelector("#analyticsSnapshot").innerHTML = `
    <section class="analytics-panel analytics-priority">
      <div class="analytics-heading">
        <h3>Priority queue</h3>
        <span>${openIssues.length} open</span>
      </div>
      ${
        priorityQueue.length > 0
          ? `<ol class="analytics-list">
              ${priorityQueue
                .map(
                  (issue) => `
                    <li>
                      <strong>${escapeHtml(issue.title)}</strong>
                      <span>${escapeHtml(issue.priority)} &middot; ${escapeHtml(assignmentLabel(issue))} &middot; ${openAgeDays(issue)}d open</span>
                    </li>
                  `
                )
                .join("")}
            </ol>`
          : `<p class="analytics-empty">No open reports in the local queue.</p>`
      }
    </section>
    <section class="analytics-panel">
      <div class="analytics-heading">
        <h3>Status mix</h3>
        <span>Local data</span>
      </div>
      ${analyticsBarMarkup(statusCounts, totalIssues)}
    </section>
    <section class="analytics-panel">
      <div class="analytics-heading">
        <h3>Category load</h3>
        <span>${categoryCounts.length} active</span>
      </div>
      ${analyticsBarMarkup(categoryCounts, totalIssues)}
    </section>
    <section class="analytics-panel">
      <div class="analytics-heading">
        <h3>Team load</h3>
        <span>Local labels</span>
      </div>
      ${analyticsBarMarkup(assignmentCounts, totalIssues)}
    </section>
    <section class="analytics-panel analytics-stale">
      <div class="analytics-heading">
        <h3>Stale open reports</h3>
        <span>${staleOpenIssues.length} need review</span>
      </div>
      <p>${staleOpenIssues.length} open report${staleOpenIssues.length === 1 ? "" : "s"} have not changed in at least one day.</p>
      <span class="tag tag-warning">Local indicator only</span>
    </section>
  `;
}

function renderLocationPreview() {
  const issuesWithCoordinates = issues.filter((issue) => issue.coordinates).length;
  const issuesWithLandmarks = issues.filter((issue) => issue.landmark).length;

  document.querySelector("#locationPreview").innerHTML = `
    <div>
      <p class="eyebrow">Location readiness</p>
      <h3>${issuesWithCoordinates} reports have coordinates</h3>
      <p>${issuesWithLandmarks} reports include landmarks. Coordinates remain manual and optional until a map provider is approved.</p>
    </div>
    <div class="map-placeholder" aria-hidden="true"></div>
  `;
}

function renderWardMap() {
  const dashboard = document.querySelector("#dashboard");
  let mapPanel = document.querySelector("#wardMap");

  if (!mapPanel && dashboard) {
    mapPanel = document.createElement("div");
    mapPanel.id = "wardMap";
    mapPanel.className = "ward-map-panel";
    mapPanel.setAttribute("aria-label", "Interactive local ward map");
    dashboard.insertBefore(mapPanel, document.querySelector("#analyticsSnapshot"));
  }

  if (!mapPanel) {
    return;
  }

  const mappedIssues = issues.filter((issue) => issue.coordinates).slice(0, 8);

  mapPanel.innerHTML = `
    <div class="map-toolbar">
      <div>
        <p class="eyebrow">Ward map</p>
        <h3>Local map preview</h3>
      </div>
      <span>${mappedIssues.length} coordinate-ready</span>
    </div>
    <div class="interactive-map" role="img" aria-label="Local ward map preview with issue markers">
      ${mappedIssues
        .map((issue, index) => {
          const left = 18 + ((index * 17) % 66);
          const top = 20 + ((index * 23) % 58);
          return `<button class="map-marker ${priorityClass(issue.priority)}" type="button" style="left: ${left}%; top: ${top}%;" data-action="view-detail" data-issue-id="${escapeHtml(issue.id)}" aria-label="Open ${escapeHtml(issue.title)} on map">${index + 1}</button>`;
        })
        .join("")}
    </div>
    <p>Google Maps integration needs an approved API key, billing/project owner, and privacy policy. This preview stays local and uses stored report coordinates only.</p>
  `;
}

function renderAssistance() {
  const formData = readForm();
  const panel = document.querySelector("#assistPanel");

  if (!formData.title && !formData.location && !formData.description) {
    panel.innerHTML = "";
    return;
  }

  const priorityAssistance = suggestPriority(formData.category, formData.description, formData.location);
  const duplicateAssistance = findPotentialDuplicates(formData);

  panel.innerHTML = `
    <h3>Local assistance</h3>
    <p>${escapeHtml(priorityAssistance.reason)}</p>
    <div class="assist-items">
      <span class="tag ${priorityClass(priorityAssistance.priority)}">Suggested priority: ${escapeHtml(priorityAssistance.priority)}</span>
      ${
        duplicateAssistance.length > 0
          ? `<span class="tag tag-warning">${duplicateAssistance.length} possible duplicate${duplicateAssistance.length > 1 ? "s" : ""}</span>`
          : `<span class="tag tag-info">No likely duplicate yet</span>`
      }
    </div>
    ${
      duplicateAssistance.length > 0
        ? `<p>Closest match: ${escapeHtml(duplicateAssistance[0].title)} near ${escapeHtml(duplicateAssistance[0].location)}.</p>`
        : ""
    }
  `;
}

function renderFilters() {
  document.querySelector("#categoryFilter").innerHTML = `<option value="All">All categories</option>${optionMarkup(CATEGORIES, filters.category)}`;
  document.querySelector("#statusFilter").innerHTML = `<option value="All">All statuses</option>${optionMarkup(STATUS_FILTERS, filters.status)}`;
  document.querySelector("#priorityFilter").innerHTML = `<option value="All">All priorities</option>${optionMarkup(PRIORITIES, filters.priority)}`;
}

function renderCategorySelect() {
  const categorySelect = document.querySelector("#issueCategory");

  if (categorySelect) {
    categorySelect.innerHTML = optionMarkup(CATEGORIES, categorySelect.value || CATEGORIES[0]);
  }
}

function renderApp() {
  renderCategorySelect();
  renderFilters();
  renderIssues();
  renderMetrics();
  renderLocationPreview();
  renderWorkflowBoard();
  renderWardMap();
  renderAnalyticsSnapshot();
  renderIssueDetail();
  renderSummaryPreview();
  restorePendingFocus();
}

function clearValidation() {
  ["issueTitle", "issueLocation", "issueDescription", "issueLatitude", "issueLongitude"].forEach((fieldId) => {
    document.querySelector(`#${fieldId}`).removeAttribute("aria-invalid");
    document.querySelector(`#${fieldId}`).removeAttribute("aria-errormessage");
  });

  ["titleError", "locationError", "descriptionError", "latitudeError", "longitudeError"].forEach((errorId) => {
    document.querySelector(`#${errorId}`).textContent = "";
  });
}

function setStatus(message, type = "error") {
  const status = document.querySelector("#formStatus");
  status.textContent = message;
  status.classList.toggle("is-success", type === "success");
  showToast(message, type);
}

function setSummaryStatus(message, type = "success") {
  const status = document.querySelector("#summaryStatus");
  status.textContent = message;
  status.classList.toggle("is-success", type === "success");

  if (message) {
    showToast(message, type);
  }
}

function showToast(message, type = "success") {
  if (!message || typeof document === "undefined") {
    return;
  }

  let region = document.querySelector("#toastRegion");

  if (!region) {
    region = document.createElement("div");
    region.id = "toastRegion";
    region.className = "toast-region";
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.appendChild(region);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type === "error" ? "error" : "success"}`;
  toast.textContent = message;
  region.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 4200);
}

function validateForm(formData) {
  clearValidation();

  const errors = {};

  if (!formData.title) {
    errors.title = "Add a short issue title.";
  }

  if (!formData.location) {
    errors.location = "Add a location citizens or staff can recognize.";
  }

  if (!formData.description) {
    errors.description = "Add a brief description of the issue.";
  }

  if (formData.latitude && (Number.isNaN(Number(formData.latitude)) || Number(formData.latitude) < -90 || Number(formData.latitude) > 90)) {
    errors.latitude = "Latitude must be between -90 and 90.";
  }

  if (formData.longitude && (Number.isNaN(Number(formData.longitude)) || Number(formData.longitude) < -180 || Number(formData.longitude) > 180)) {
    errors.longitude = "Longitude must be between -180 and 180.";
  }

  if ((formData.latitude && !formData.longitude) || (!formData.latitude && formData.longitude)) {
    errors.latitude = "Add both latitude and longitude, or leave both blank.";
    errors.longitude = "Add both latitude and longitude, or leave both blank.";
  }

  Object.entries(errors).forEach(([field, message]) => {
    const fieldControl = document.querySelector(`#issue${field.charAt(0).toUpperCase()}${field.slice(1)}`);
    fieldControl.setAttribute("aria-invalid", "true");
    fieldControl.setAttribute("aria-errormessage", `${field}Error`);
    document.querySelector(`#${field}Error`).textContent = message;
  });

  return Object.keys(errors).length === 0;
}

function readForm() {
  const latitude = document.querySelector("#issueLatitude").value.trim();
  const longitude = document.querySelector("#issueLongitude").value.trim();

  return {
    title: document.querySelector("#issueTitle").value.trim(),
    category: document.querySelector("#issueCategory").value,
    location: document.querySelector("#issueLocation").value.trim(),
    ward: document.querySelector("#issueWard").value.trim(),
    landmark: document.querySelector("#issueLandmark").value.trim(),
    latitude,
    longitude,
    coordinates: latitude && longitude ? { latitude: Number(latitude), longitude: Number(longitude) } : null,
    description: document.querySelector("#issueDescription").value.trim()
  };
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = readForm();

  if (!validateForm(formData)) {
    setStatus("Please complete the highlighted fields.");
    focusFirstInvalidField();
    return;
  }

  const issue = createIssue(formData);
  issues = [issue, ...issues];
  saveIssues(issues);
  renderApp();
  event.target.reset();
  clearValidation();
  renderAssistance();
  selectedIssueId = issue.id;
  renderIssueDetail();
  setStatus("Report submitted and saved in this browser. It is now visible in Open Issues.", "success");
}

function resetDemoData() {
  issues = sampleIssues.map(normalizeIssue);
  selectedIssueId = null;
  filters = {
    category: "All",
    status: "All",
    priority: "All"
  };
  saveIssues(issues);
  renderApp();
  clearValidation();
  renderAssistance();
  setSummaryStatus("");
  setStatus("Demo data restored.", "success");
}

function updateIssue(issueId, patch) {
  const now = new Date().toISOString();
  issues = issues.map((issue) =>
    issue.id === issueId
      ? applyIssuePatch(issue, patch, now)
      : issue
  );
  saveIssues(issues);
  renderApp();
}

function applyIssuePatch(issue, patch, now) {
  const activityEvents = [];

  if (patch.status && patch.status !== issue.status) {
    activityEvents.push(
      createActivityEvent({
        type: "status",
        label: "Status changed",
        from: issue.status,
        to: patch.status,
        happenedAt: now,
        note: "Local workflow status updated in this browser."
      })
    );
  }

  if (patch.priority && patch.priority !== issue.priority) {
    activityEvents.push(
      createActivityEvent({
        type: "priority",
        label: "Priority changed",
        from: issue.priority,
        to: patch.priority,
        happenedAt: now,
        note: "Local priority adjusted without backend review."
      })
    );
  }

  if (Object.prototype.hasOwnProperty.call(patch, "assignedTeam") && patch.assignedTeam !== assignmentLabel(issue)) {
    activityEvents.push(
      createActivityEvent({
        type: "assignment",
        label: "Assigned team changed",
        from: assignmentLabel(issue),
        to: patch.assignedTeam,
        happenedAt: now,
        note: "Local routing label changed; no staff identity is attached."
      })
    );
  }

  if (Object.prototype.hasOwnProperty.call(patch, "note")) {
    const noteText = String(patch.note || "").trim();

    if (noteText) {
      activityEvents.push(
        createActivityEvent({
          type: "note",
          label: "Desk note added",
          to: "Note",
          happenedAt: now,
          note: noteText
        })
      );
    }
  }

  if (activityEvents.length === 0) {
    return issue;
  }

  const nextNotes = Object.prototype.hasOwnProperty.call(patch, "note") && String(patch.note || "").trim()
    ? [
        ...issue.notes,
        {
          id: `note-${now}-${Math.random().toString(16).slice(2)}`,
          text: String(patch.note).trim(),
          createdAt: now
        }
      ]
    : issue.notes;

  const { note, ...persistedPatch } = patch;

  return {
    ...issue,
    ...persistedPatch,
    notes: nextNotes,
    priorityReason: patch.priority ? "Priority was manually adjusted by staff." : issue.priorityReason,
    activityTimeline: [...issue.activityTimeline, ...activityEvents],
    updatedAt: now
  };
}

function updateDuplicateHintReview(issueId, duplicateId, reviewStatus) {
  const now = new Date().toISOString();

  issues = issues.map((issue) =>
    issue.id === issueId ? applyDuplicateReviewPatch(issue, duplicateId, reviewStatus, now) : issue
  );
  saveIssues(issues);
  renderApp();
}

function applyDuplicateReviewPatch(issue, duplicateId, reviewStatus, now) {
  const matchingHint = issue.duplicateHints.find((hint) => hint.id === duplicateId);

  if (!matchingHint || matchingHint.reviewStatus === reviewStatus) {
    return issue;
  }

  return {
    ...issue,
    duplicateHints: issue.duplicateHints.map((hint) =>
      hint.id === duplicateId
        ? {
            ...hint,
            reviewStatus,
            reviewedAt: now
          }
        : hint
    ),
    activityTimeline: [
      ...issue.activityTimeline,
      createActivityEvent({
        type: "duplicate-review",
        label: "Duplicate review changed",
        from: matchingHint.reviewStatus,
        to: reviewStatus,
        happenedAt: now,
        note: `Local duplicate hint reviewed for "${matchingHint.title}".`
      })
    ],
    updatedAt: now
  };
}

function handleTriageChange(event) {
  const control = event.target.closest("[data-action]");

  if (!control) {
    return;
  }

  const { issueId, action } = control.dataset;
  pendingFocusTarget = {
    action,
    issueId,
    duplicateId: control.dataset.duplicateId || null
  };

  if (action === "status") {
    updateIssue(issueId, { status: control.value });
    setSummaryStatus(`Status updated to ${control.value}.`);
  }

  if (action === "priority") {
    updateIssue(issueId, { priority: control.value });
    setSummaryStatus(`Priority updated to ${control.value}.`);
  }

  if (action === "assignment") {
    updateIssue(issueId, { assignedTeam: control.value });
    setSummaryStatus(`Assigned team updated to ${control.value}.`);
  }

  if (action === "duplicate-review") {
    updateDuplicateHintReview(issueId, control.dataset.duplicateId, control.value);
    setSummaryStatus(`Duplicate review marked ${control.value}.`);
  }
}

function handleIssueClick(event) {
  const control = event.target.closest("[data-action]");

  if (!control) {
    return;
  }

  if (control.dataset.action === "view-detail") {
    selectedIssueId = control.dataset.issueId;
    lastDetailTriggerIssueId = selectedIssueId;
    renderIssueDetail();
    document.querySelector("#issueDetail").focus({ preventScroll: true });
    document.querySelector("#issueDetail").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleDetailClick(event) {
  const control = event.target.closest("[data-action]");

  if (!control) {
    return;
  }

  if (control.dataset.action === "close-detail") {
    selectedIssueId = null;
    renderIssueDetail();
    focusLastDetailTrigger();
  }

  if (control.dataset.action === "add-note") {
    const input = document.querySelector(`[data-note-input="${control.dataset.issueId}"]`);
    const note = input ? input.value.trim() : "";

    if (!note) {
      setSummaryStatus("Add note text before saving.", "error");
      input?.focus();
      return;
    }

    updateIssue(control.dataset.issueId, { note });
    setSummaryStatus("Local desk note saved.");
  }
}

function handleDetailKeydown(event) {
  if (event.key === "Escape" && selectedIssueId) {
    selectedIssueId = null;
    renderIssueDetail();
    focusLastDetailTrigger();
  }
}

function handleFilterChange(event) {
  if (event.target.id === "categoryFilter") {
    filters.category = event.target.value;
  }

  if (event.target.id === "statusFilter") {
    filters.status = event.target.value;
  }

  if (event.target.id === "priorityFilter") {
    filters.priority = event.target.value;
  }

  renderIssues();
  renderSummaryPreview();
}

function setFilters(nextFilters) {
  filters = {
    ...filters,
    ...nextFilters
  };
  renderApp();
}

function focusSection(selector) {
  const section = document.querySelector(selector);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setActiveNav(action) {
  document.querySelectorAll("[data-nav-action]").forEach((control) => {
    control.classList.toggle("active-link", control.dataset.navAction === action);
  });
}

function handleNavigationAction(event) {
  const control = event.target.closest("[data-nav-action]");

  if (!control) {
    return;
  }

  const action = control.dataset.navAction;
  setActiveNav(action);

  if (action === "dashboard" || action === "analytics" || action === "triage") {
    if (action === "triage") {
      setFilters({ status: "Triaged", category: "All", priority: "All" });
      setSummaryStatus("Triage view applied.");
    } else {
      focusSection("#dashboard");
      setSummaryStatus(action === "analytics" ? "Analytics panel focused." : "Dashboard focused.");
    }
    focusSection("#dashboard");
    return;
  }

  if (action === "report" || action === "citizens") {
    focusSection("#report");
    setSummaryStatus(action === "citizens" ? "Citizen intake form focused. Reporter identity remains local and anonymous." : "Report form focused.");
    return;
  }

  if (action === "open") {
    setFilters({ status: "Open", category: "All", priority: "All" });
    focusSection("#issues");
    setSummaryStatus("Open issue queue showing all local reports.");
    return;
  }

  if (action === "resolved") {
    setFilters({ status: "Resolved", category: "All", priority: "All" });
    focusSection("#issues");
    setSummaryStatus("Resolved reports filter applied.");
    return;
  }

  if (action === "my-tasks") {
    setFilters({ status: "Open", category: "All", priority: "High" });
    focusSection("#issues");
    setSummaryStatus("My Tasks shows high-priority local desk work.");
    return;
  }

  if (action === "ward-map") {
    focusSection("#wardMap");
    setSummaryStatus("Ward map focused. Markers open local issue details.");
    return;
  }

  if (action === "settings" || action === "backup") {
    focusSection("#summary");
    setSummaryStatus("Local settings and backup actions focused.");
    return;
  }

  if (action === "ward-desk") {
    setFilters({ status: "All", category: "All", priority: "All" });
    focusSection("#dashboard");
    setSummaryStatus("Ward 27 desk context is active for this local demo.");
    return;
  }

  if (action === "operator") {
    setSummaryStatus("Operator mode is local-only; no staff identity or login is attached.");
  }
}

function bulkTriageSubmitted() {
  const submittedIssues = issues.filter((issue) => issue.status === "Submitted");

  if (submittedIssues.length === 0) {
    setSummaryStatus("No submitted reports need bulk triage.");
    return;
  }

  const now = new Date().toISOString();
  issues = issues.map((issue) =>
    issue.status === "Submitted"
      ? applyIssuePatch(issue, { status: "Triaged" }, now)
      : issue
  );
  saveIssues(issues);
  renderApp();
  setSummaryStatus(`${submittedIssues.length} submitted report${submittedIssues.length === 1 ? "" : "s"} moved to Triaged.`);
}

function reassignOpenQueue() {
  const openIssues = issues.filter((issue) => issue.status !== "Resolved");

  if (openIssues.length === 0) {
    setSummaryStatus("No open reports need reassignment.");
    return;
  }

  const now = new Date().toISOString();
  issues = issues.map((issue) =>
    issue.status !== "Resolved" && assignmentLabel(issue) === "Unassigned"
      ? applyIssuePatch(issue, { assignedTeam: teamForCategory(issue.category) }, now)
      : issue
  );
  saveIssues(issues);
  renderApp();
  setSummaryStatus("Unassigned open reports routed to local teams by category.");
}

function teamForCategory(category) {
  if (["Road damage", "Footpath obstruction", "Tree hazard", "Park maintenance"].includes(category)) {
    return "Roads maintenance";
  }

  if (["Garbage collection", "Illegal dumping", "Public toilet", "Stray animal concern"].includes(category)) {
    return "Sanitation crew";
  }

  if (["Drainage", "Water leakage", "Sewage overflow"].includes(category)) {
    return "Water services";
  }

  if (["Streetlight", "Traffic signal"].includes(category)) {
    return "Lighting team";
  }

  if (category === "Public safety" || category === "Noise complaint") {
    return "Public safety desk";
  }

  return "Unassigned";
}

function addQueueNote() {
  const targetIssue = issues.find((issue) => issue.status !== "Resolved") || issues[0];

  if (!targetIssue) {
    setSummaryStatus("No reports are available for a local note.", "error");
    return;
  }

  const now = new Date().toISOString();
  issues = issues.map((issue) =>
    issue.id === targetIssue.id
      ? applyIssuePatch(issue, { note: `${DEFAULT_QUEUE_NOTE}: reviewed from quick actions.` }, now)
      : issue
  );
  selectedIssueId = targetIssue.id;
  saveIssues(issues);
  renderApp();
  focusSection("#issueDetail");
  setSummaryStatus(`Local note added to ${targetIssue.title}.`);
}

function viewAllIssues() {
  setFilters({ category: "All", status: "All", priority: "All" });
  focusSection("#issues");
  setSummaryStatus("All local reports are visible.");
}

function printSummary() {
  window.print();
  setSummaryStatus("Print dialog opened for the local summary.");
}

function downloadJsonFile(fileName, data) {
  const payload = JSON.stringify(data, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportSummary() {
  const summary = createMunicipalSummary();
  const date = new Date().toISOString().slice(0, 10);

  downloadJsonFile(`civic-issue-summary-${date}.json`, summary);
  setSummaryStatus("JSON summary exported from local browser data.");
}

function exportBackup() {
  const backup = createFullBackup();
  const date = new Date().toISOString().slice(0, 10);

  downloadJsonFile(`civic-issue-backup-${date}.json`, backup);
  setSummaryStatus("Full local backup exported. Keep it private because it contains report details.");
}

function requestBackupImport() {
  document.querySelector("#backupFileInput").click();
}

function useBrowserLocation() {
  if (!navigator.geolocation) {
    setStatus("This browser does not support device location. You can still enter location details manually.");
    return;
  }

  setStatus("Requesting browser location permission...", "success");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      document.querySelector("#issueLatitude").value = position.coords.latitude.toFixed(6);
      document.querySelector("#issueLongitude").value = position.coords.longitude.toFixed(6);

      if (!document.querySelector("#issueLocation").value.trim()) {
        document.querySelector("#issueLocation").value = "Current device location";
      }

      clearValidation();
      renderAssistance();
      setStatus("Location captured locally. Coordinates are not sent anywhere.", "success");
    },
    () => {
      setStatus("Location permission was denied or unavailable. Manual location entry is still available.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}

function toggleNavigation() {
  const sidebar = document.querySelector(".sidebar");
  const menuButton = document.querySelector(".menu-button");
  const appGrid = document.querySelector(".app-grid");

  if (!sidebar || !menuButton) {
    return;
  }

  const collapsed = sidebar.classList.toggle("is-collapsed");
  appGrid?.classList.toggle("nav-collapsed", collapsed);
  menuButton.setAttribute("aria-expanded", String(!collapsed));
  showToast(collapsed ? "Navigation collapsed." : "Navigation expanded.");
}

function relabelQuickActions() {
  const quickLabels = [
    ["#exportSummary", "Export Summary"],
    ["#printSummary", "Print Summary"],
    [".ward-map-button", "View Ward Map"]
  ];

  quickLabels.forEach(([selector, label]) => {
    const control = document.querySelector(selector);

    if (control) {
      control.textContent = label;
    }
  });
}

function restoreIssuesFromBackup(restoredIssues) {
  issues = restoredIssues;
  selectedIssueId = null;
  filters = {
    category: "All",
    status: "All",
    priority: "All"
  };
  saveIssues(issues);
  renderApp();
}

function handleBackupFileSelected(event) {
  const file = event.target.files[0];
  event.target.value = "";

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const restoredIssues = parseBackupPayload(String(reader.result || ""));
      const confirmed = window.confirm(
        `Import ${restoredIssues.length} issues from this backup? This will replace the current local browser data.`
      );

      if (!confirmed) {
        setSummaryStatus("Backup import cancelled.");
        return;
      }

      restoreIssuesFromBackup(restoredIssues);
      setSummaryStatus(`Backup imported. ${restoredIssues.length} local issue records restored.`);
    } catch (error) {
      setSummaryStatus(error.message, "error");
    }
  });

  reader.addEventListener("error", () => {
    setSummaryStatus("Backup file could not be read.", "error");
  });

  reader.readAsText(file);
}

function focusFirstInvalidField() {
  const invalidField = document.querySelector("[aria-invalid='true']");

  if (invalidField) {
    invalidField.focus();
  }
}

function findControlByTarget(target) {
  if (!target) {
    return null;
  }

  return Array.from(document.querySelectorAll(`[data-action="${target.action}"]`)).find((control) => {
    const duplicateMatches = target.duplicateId ? control.dataset.duplicateId === target.duplicateId : true;
    return control.dataset.issueId === target.issueId && duplicateMatches;
  });
}

function restorePendingFocus() {
  const control = findControlByTarget(pendingFocusTarget);
  pendingFocusTarget = null;

  if (control) {
    control.focus();
  }
}

function focusLastDetailTrigger() {
  if (!lastDetailTriggerIssueId) {
    return;
  }

  const trigger = Array.from(document.querySelectorAll("[data-action='view-detail']")).find(
    (control) => control.dataset.issueId === lastDetailTriggerIssueId
  );

  if (trigger) {
    trigger.focus();
  }
}

function bind(selector, eventName, handler) {
  const element = document.querySelector(selector);

  if (!element) {
    showToast(`Local UI control ${selector} is unavailable in this browser view.`, "error");
    return;
  }

  element.addEventListener(eventName, handler);
}

if (typeof document !== "undefined") {
  relabelQuickActions();
  bind(".topbar", "click", handleNavigationAction);
  bind("#sidebarNav", "click", handleNavigationAction);
  bind("#reportForm", "submit", handleSubmit);
  bind("#resetDemoData", "click", resetDemoData);
  bind(".menu-button", "click", toggleNavigation);
  bind(".compact-button", "click", useBrowserLocation);
  bind("#printSummary", "click", printSummary);
  bind("#exportSummary", "click", exportSummary);
  bind("#exportBackup", "click", exportBackup);
  bind("#importBackup", "click", requestBackupImport);
  bind("#bulkTriage", "click", bulkTriageSubmitted);
  bind("#reassignQueue", "click", reassignOpenQueue);
  bind("#addQueueNote", "click", addQueueNote);
  bind("#viewWardMap", "click", () => {
    focusSection("#wardMap");
    setSummaryStatus("Ward map focused. Click a marker to open issue detail.");
  });
  bind("#viewAllIssues", "click", viewAllIssues);
  bind("#showAllDashboard", "click", viewAllIssues);
  bind("#backupFileInput", "change", handleBackupFileSelected);
  bind("#issueList", "change", handleTriageChange);
  bind("#issueList", "click", handleIssueClick);
  bind("#dashboard", "click", handleIssueClick);
  bind("#issueDetail", "change", handleTriageChange);
  bind("#issueDetail", "click", handleDetailClick);
  bind("#issueDetail", "keydown", handleDetailKeydown);
  bind("#categoryFilter", "change", handleFilterChange);
  bind("#statusFilter", "change", handleFilterChange);
  bind("#priorityFilter", "change", handleFilterChange);
  bind("#reportForm", "input", renderAssistance);

  renderApp();
}

if (typeof module !== "undefined") {
  module.exports = {
    BACKUP_TYPE,
    BACKUP_VERSION,
    STATUSES,
    PRIORITIES,
    ASSIGNMENT_TEAMS,
    CATEGORIES,
    createActivityEvent,
    createFullBackup,
    createIssue,
    createMunicipalSummaryFrom(nextIssues) {
      const previousIssues = issues;
      issues = nextIssues.map(normalizeIssue).filter(Boolean);
      const summary = createMunicipalSummary();
      issues = previousIssues;
      return summary;
    },
    duplicateScore,
    findPotentialDuplicates,
    inferPriority,
    normalizeIssue,
    parseBackupPayload,
    suggestPriority,
    teamForCategory,
    validateBackupIssue
  };
}
