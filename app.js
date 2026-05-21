const STORAGE_KEY = "civicIssueReporter.issues.v1";
const STATUSES = ["Submitted", "Triaged", "In progress", "Resolved"];
const PRIORITIES = ["Low", "Medium", "High"];
const DUPLICATE_REVIEW_STATUSES = ["Needs review", "Linked", "Dismissed"];
const DEFAULT_DUPLICATE_REVIEW_STATUS = "Needs review";
const CATEGORIES = [
  "Streetlight",
  "Road damage",
  "Garbage collection",
  "Drainage",
  "Water leakage",
  "Public safety"
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
    reporterContactOptional: null,
    isSample: false
  };
}

function inferPriority(category, description) {
  return suggestPriority(category, description, "").priority;
}

function suggestPriority(category, description, location) {
  const highSignals = ["danger", "unsafe", "school", "leak", "accident", "blocked", "injury", "fire", "collapse"];
  const mediumCategories = ["Garbage collection", "Drainage", "Water leakage"];
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
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.map(normalizeIssue) : sampleIssues.map(normalizeIssue);
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
  const duplicateHints = normalizeDuplicateHints(issue.duplicateHints);

  return {
    ward: "",
    landmark: "",
    coordinates: null,
    priorityReason: "",
    ...issue,
    duplicateHints
  };
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

function priorityClass(priority) {
  return `priority-${priority.toLowerCase()}`;
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
    const statusMatches = filters.status === "All" || issue.status === filters.status;
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
  return value.replace(/[&<>"']/g, (character) => {
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
      duplicateReview: duplicateReviewSummary(issue) || "No duplicate hints",
      reportedAt: issue.createdAt,
      updatedAt: issue.updatedAt
    }))
  };
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
  document.querySelector("#queueCount").textContent = `${filteredIssues.length} of ${issues.length} shown`;

  if (filteredIssues.length === 0) {
    list.innerHTML = `<div class="empty-state">No reports match the current filters.</div>`;
    return;
  }

  list.innerHTML = filteredIssues
    .map(
      (issue) => `
        <article class="issue-card" data-issue-id="${escapeHtml(issue.id)}">
          <div class="issue-main">
            <div class="card-meta">
              <span class="tag">${escapeHtml(issue.category)}</span>
              <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)}</span>
              <span class="tag status-${statusClass(issue.status)}">${escapeHtml(issue.status)}</span>
              ${issue.duplicateHints.length > 0 ? `<span class="tag tag-warning">${escapeHtml(duplicateReviewSummary(issue))}</span>` : ""}
            </div>
            <h3>${escapeHtml(issue.title)}</h3>
            <p>${escapeHtml(issue.description)}</p>
            <time datetime="${issue.createdAt}">Reported ${formatDate(issue.createdAt)}</time>
            <button class="secondary-button details-button" type="button" data-action="view-detail" data-issue-id="${escapeHtml(issue.id)}">View details</button>
          </div>
          <div class="issue-side">
            <div class="location-block">
              <p><strong>Location:</strong> ${escapeHtml(issue.location)}</p>
              <span class="location-detail">Area: ${escapeHtml(issue.ward || "Not specified")}</span>
              <span class="location-detail">Landmark: ${escapeHtml(issue.landmark || "Not specified")}</span>
              <span class="location-detail">Map-ready: ${escapeHtml(formatCoordinates(issue.coordinates))}</span>
            </div>
            <p><strong>Priority note:</strong> ${escapeHtml(issue.priorityReason || "Priority can be adjusted by staff.")}</p>
            ${issue.duplicateHints.length > 0 ? `<p><strong>Duplicate hint:</strong> ${escapeHtml(duplicateReviewSummary(issue))}. Closest match: ${escapeHtml(issue.duplicateHints[0].title)} near ${escapeHtml(issue.duplicateHints[0].location)}.</p>` : ""}
          </div>
          <div class="triage-controls" aria-label="Triage controls for ${escapeHtml(issue.title)}">
            <label>
              Status
              <select data-action="status" data-issue-id="${escapeHtml(issue.id)}">
                ${optionMarkup(STATUSES, issue.status)}
              </select>
            </label>
            <label>
              Priority
              <select data-action="priority" data-issue-id="${escapeHtml(issue.id)}">
                ${optionMarkup(PRIORITIES, issue.priority)}
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
        <span></span>
        <div>
          <strong>${escapeHtml(status)}</strong>
          <p>${isCurrent ? `Current status, updated ${formatDate(issue.updatedAt)}` : isComplete ? "Completed in local workflow" : "Pending"}</p>
        </div>
      </li>
    `;
  }).join("");
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
                <select data-action="duplicate-review" data-issue-id="${escapeHtml(issue.id)}" data-duplicate-id="${escapeHtml(hint.id)}">
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

function renderIssueDetail() {
  const panel = document.querySelector("#issueDetail");
  const issue = issues.find((item) => item.id === selectedIssueId);

  if (!issue) {
    panel.hidden = true;
    panel.innerHTML = "";
    return;
  }

  panel.hidden = false;
  panel.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Issue detail</p>
        <h2>${escapeHtml(issue.title)}</h2>
        <div class="card-meta">
          <span class="tag">${escapeHtml(issue.category)}</span>
          <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)}</span>
          <span class="tag status-${statusClass(issue.status)}">${escapeHtml(issue.status)}</span>
        </div>
      </div>
      <button class="secondary-button" type="button" data-action="close-detail">Close</button>
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
        <h3>Review signals</h3>
        <p><strong>Priority:</strong> ${escapeHtml(issue.priorityReason || "Priority can be adjusted by staff.")}</p>
        <p><strong>Duplicate review:</strong></p>
        ${duplicateListMarkup(issue)}
      </div>

      <div class="detail-section detail-controls">
        <h3>Triage controls</h3>
        <label>
          Status
          <select data-action="status" data-issue-id="${escapeHtml(issue.id)}">
            ${optionMarkup(STATUSES, issue.status)}
          </select>
        </label>
        <label>
          Priority
          <select data-action="priority" data-issue-id="${escapeHtml(issue.id)}">
            ${optionMarkup(PRIORITIES, issue.priority)}
          </select>
        </label>
      </div>
    </div>
  `;
}

function renderMetrics() {
  const openIssues = issues.filter((issue) => issue.status !== "Resolved").length;
  const highPriority = issues.filter((issue) => issue.priority === "High").length;
  const categories = new Set(issues.map((issue) => issue.category)).size;
  const submittedToday = issues.filter((issue) => {
    const created = new Date(issue.createdAt);
    const today = new Date();
    return created.toDateString() === today.toDateString();
  }).length;

  const metrics = [
    [String(openIssues), "Open issues"],
    [String(highPriority), "High priority"],
    [String(categories), "Categories"],
    [String(submittedToday), "Submitted today"]
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
  document.querySelector("#statusFilter").innerHTML = `<option value="All">All statuses</option>${optionMarkup(STATUSES, filters.status)}`;
  document.querySelector("#priorityFilter").innerHTML = `<option value="All">All priorities</option>${optionMarkup(PRIORITIES, filters.priority)}`;
}

function renderApp() {
  renderFilters();
  renderIssues();
  renderMetrics();
  renderLocationPreview();
  renderWorkflowBoard();
  renderIssueDetail();
  renderSummaryPreview();
}

function clearValidation() {
  ["issueTitle", "issueLocation", "issueDescription", "issueLatitude", "issueLongitude"].forEach((fieldId) => {
    document.querySelector(`#${fieldId}`).removeAttribute("aria-invalid");
  });

  ["titleError", "locationError", "descriptionError", "latitudeError", "longitudeError"].forEach((errorId) => {
    document.querySelector(`#${errorId}`).textContent = "";
  });
}

function setStatus(message, type = "error") {
  const status = document.querySelector("#formStatus");
  status.textContent = message;
  status.classList.toggle("is-success", type === "success");
}

function setSummaryStatus(message) {
  document.querySelector("#summaryStatus").textContent = message;
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
    document.querySelector(`#issue${field.charAt(0).toUpperCase()}${field.slice(1)}`).setAttribute("aria-invalid", "true");
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
    return;
  }

  const issue = createIssue(formData);
  issues = [issue, ...issues];
  saveIssues(issues);
  renderApp();
  event.target.reset();
  clearValidation();
  renderAssistance();
  setStatus("Report submitted and saved in this browser.", "success");
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
      ? {
          ...issue,
          ...patch,
          priorityReason: patch.priority ? "Priority was manually adjusted by staff." : issue.priorityReason,
          updatedAt: now
        }
      : issue
  );
  saveIssues(issues);
  renderApp();
}

function updateDuplicateHintReview(issueId, duplicateId, reviewStatus) {
  const now = new Date().toISOString();

  issues = issues.map((issue) =>
    issue.id === issueId
      ? {
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
          updatedAt: now
        }
      : issue
  );
  saveIssues(issues);
  renderApp();
}

function handleTriageChange(event) {
  const control = event.target.closest("[data-action]");

  if (!control) {
    return;
  }

  const { issueId, action } = control.dataset;

  if (action === "status") {
    updateIssue(issueId, { status: control.value });
  }

  if (action === "priority") {
    updateIssue(issueId, { priority: control.value });
  }

  if (action === "duplicate-review") {
    updateDuplicateHintReview(issueId, control.dataset.duplicateId, control.value);
  }
}

function handleIssueClick(event) {
  const control = event.target.closest("[data-action]");

  if (!control) {
    return;
  }

  if (control.dataset.action === "view-detail") {
    selectedIssueId = control.dataset.issueId;
    renderIssueDetail();
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
}

function printSummary() {
  window.print();
  setSummaryStatus("Print dialog opened for the local summary.");
}

function exportSummary() {
  const summary = createMunicipalSummary();
  const payload = JSON.stringify(summary, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `civic-issue-summary-${date}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setSummaryStatus("JSON summary exported from local browser data.");
}

document.querySelector("#reportForm").addEventListener("submit", handleSubmit);
document.querySelector("#resetDemoData").addEventListener("click", resetDemoData);
document.querySelector("#printSummary").addEventListener("click", printSummary);
document.querySelector("#exportSummary").addEventListener("click", exportSummary);
document.querySelector("#issueList").addEventListener("change", handleTriageChange);
document.querySelector("#issueList").addEventListener("click", handleIssueClick);
document.querySelector("#issueDetail").addEventListener("change", handleTriageChange);
document.querySelector("#issueDetail").addEventListener("click", handleDetailClick);
document.querySelector("#categoryFilter").addEventListener("change", handleFilterChange);
document.querySelector("#statusFilter").addEventListener("change", handleFilterChange);
document.querySelector("#priorityFilter").addEventListener("change", handleFilterChange);
document.querySelector("#reportForm").addEventListener("input", renderAssistance);

renderApp();
