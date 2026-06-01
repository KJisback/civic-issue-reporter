const STORAGE_KEY = "civicIssueReporter.issues.v1";
const STATUSES = ["Submitted", "Triaged", "In progress", "Resolved"];
const PRIORITIES = ["Low", "Medium", "High"];
const DUPLICATE_REVIEW_STATUSES = ["Needs review", "Linked", "Dismissed"];
const DEFAULT_DUPLICATE_REVIEW_STATUS = "Needs review";
const TEAMS = ["Unassigned", "Lighting Crew", "Roads Maintenance", "Sanitation", "Drainage Crew", "Water Works", "Public Safety"];
const CATEGORIES = [
  "Streetlight",
  "Road damage",
  "Garbage collection",
  "Drainage",
  "Water leakage",
  "Public safety"
];
const TEAM_BY_CATEGORY = {
  Streetlight: "Lighting Crew",
  "Road damage": "Roads Maintenance",
  "Garbage collection": "Sanitation",
  Drainage: "Drainage Crew",
  "Water leakage": "Water Works",
  "Public safety": "Public Safety"
};
const CATEGORY_ICONS = {
  Streetlight: "L",
  "Road damage": "R",
  "Garbage collection": "G",
  Drainage: "D",
  "Water leakage": "W",
  "Public safety": "S"
};

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
    assignedTeam: "Lighting Crew",
    activityLog: [
      {
        id: "sample-streetlight-001-activity-1",
        label: "Reported",
        detail: "Citizen submitted the outage report.",
        createdAt: "2026-05-20T08:00:00.000Z"
      }
    ],
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
    assignedTeam: "Sanitation",
    activityLog: [
      {
        id: "sample-garbage-002-activity-1",
        label: "Reported",
        detail: "Citizen submitted the sanitation report.",
        createdAt: "2026-05-20T09:15:00.000Z"
      },
      {
        id: "sample-garbage-002-activity-2",
        label: "Triaged",
        detail: "Marked for sanitation review.",
        createdAt: "2026-05-20T09:30:00.000Z"
      }
    ],
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
    assignedTeam: "Roads Maintenance",
    activityLog: [
      {
        id: "sample-road-003-activity-1",
        label: "Reported",
        detail: "Citizen submitted the road damage report.",
        createdAt: "2026-05-20T10:30:00.000Z"
      },
      {
        id: "sample-road-003-activity-2",
        label: "In progress",
        detail: "Roads team dispatched for local inspection.",
        createdAt: "2026-05-20T11:15:00.000Z"
      }
    ],
    reporterContactOptional: null,
    isSample: true
  }
];

const demoScenarios = {
  ward: {
    label: "Ward operations",
    focus: "Balanced civic operations view for municipal pitch demos.",
    issues: [
      {
        id: "demo-ward-light-001",
        title: "Streetlight outage beside metro exit",
        category: "Streetlight",
        location: "Ward 12, Metro Exit B",
        ward: "Ward 12",
        landmark: "Metro Exit B",
        status: "Triaged",
        priority: "High",
        description: "Commuters report unsafe lighting after evening service near the metro exit.",
        createdAt: "2026-05-29T08:00:00.000Z",
        updatedAt: "2026-05-29T10:10:00.000Z",
        coordinates: { latitude: 12.971599, longitude: 77.594566 },
        assignedTeam: "Lighting Crew",
        priorityReason: "High because the report mentions unsafe commuter access.",
        duplicateHints: [],
        activityLog: [
          {
            id: "demo-ward-light-001-a1",
            label: "Reported",
            detail: "Citizen submitted the lighting report.",
            createdAt: "2026-05-29T08:00:00.000Z"
          },
          {
            id: "demo-ward-light-001-a2",
            label: "Triaged",
            detail: "Lighting crew assigned from the civic vault.",
            createdAt: "2026-05-29T10:10:00.000Z"
          }
        ]
      },
      {
        id: "demo-ward-road-002",
        title: "Pothole blocking school pickup lane",
        category: "Road damage",
        location: "Ward 12, Lake Road School",
        ward: "Ward 12",
        landmark: "Lake Road School gate",
        status: "In progress",
        priority: "High",
        description: "A deep pothole slows buses and creates risk for students during pickup.",
        createdAt: "2026-05-30T09:30:00.000Z",
        updatedAt: "2026-05-30T12:00:00.000Z",
        coordinates: { latitude: 12.975221, longitude: 77.603287 },
        assignedTeam: "Roads Maintenance",
        priorityReason: "High because the report mentions school access risk.",
        duplicateHints: [],
        activityLog: [
          {
            id: "demo-ward-road-002-a1",
            label: "Reported",
            detail: "Citizen submitted the road damage report.",
            createdAt: "2026-05-30T09:30:00.000Z"
          },
          {
            id: "demo-ward-road-002-a2",
            label: "In progress",
            detail: "Roads team dispatched for local inspection.",
            createdAt: "2026-05-30T12:00:00.000Z"
          }
        ]
      },
      {
        id: "demo-ward-water-003",
        title: "Water leakage near clinic lane",
        category: "Water leakage",
        location: "Ward 12, Clinic Lane",
        ward: "Ward 12",
        landmark: "Primary clinic",
        status: "Resolved",
        priority: "Medium",
        description: "Water seepage reported beside the clinic lane and cleared by Water Works.",
        createdAt: "2026-05-27T07:10:00.000Z",
        updatedAt: "2026-05-28T16:45:00.000Z",
        coordinates: null,
        assignedTeam: "Water Works",
        priorityReason: "Medium because water leakage can affect public health or access.",
        duplicateHints: [],
        activityLog: [
          {
            id: "demo-ward-water-003-a1",
            label: "Reported",
            detail: "Citizen submitted the water leakage report.",
            createdAt: "2026-05-27T07:10:00.000Z"
          },
          {
            id: "demo-ward-water-003-a2",
            label: "Resolved",
            detail: "Water Works marked the local record resolved.",
            createdAt: "2026-05-28T16:45:00.000Z"
          }
        ]
      }
    ]
  },
  safety: {
    label: "Safety sprint",
    focus: "High-priority safety queue for rapid-response hackathon demos.",
    issues: [
      {
        id: "demo-safety-drain-001",
        title: "Open drain near evening market",
        category: "Drainage",
        location: "Central Market Road",
        ward: "Central Market",
        landmark: "Evening market entrance",
        status: "Submitted",
        priority: "High",
        description: "Open drain is unsafe for pedestrians and blocks a busy market path.",
        createdAt: "2026-06-01T06:30:00.000Z",
        updatedAt: "2026-06-01T06:30:00.000Z",
        coordinates: { latitude: 12.9721, longitude: 77.5992 },
        assignedTeam: "Drainage Crew",
        priorityReason: "High because the report mentions unsafe pedestrian access.",
        duplicateHints: [],
        activityLog: [
          {
            id: "demo-safety-drain-001-a1",
            label: "Reported",
            detail: "Citizen submitted the safety report.",
            createdAt: "2026-06-01T06:30:00.000Z"
          }
        ]
      },
      {
        id: "demo-safety-road-002",
        title: "Loose divider after minor accident",
        category: "Public safety",
        location: "Ring Road signal",
        ward: "Ring Road",
        landmark: "Northbound signal",
        status: "Triaged",
        priority: "High",
        description: "Loose road divider remains after an accident and narrows the turn lane.",
        createdAt: "2026-06-01T07:40:00.000Z",
        updatedAt: "2026-06-01T08:05:00.000Z",
        coordinates: null,
        assignedTeam: "Public Safety",
        priorityReason: "High because the report mentions accident risk.",
        duplicateHints: [],
        activityLog: [
          {
            id: "demo-safety-road-002-a1",
            label: "Reported",
            detail: "Citizen submitted the public safety report.",
            createdAt: "2026-06-01T07:40:00.000Z"
          },
          {
            id: "demo-safety-road-002-a2",
            label: "Triaged",
            detail: "Public Safety team assigned the report.",
            createdAt: "2026-06-01T08:05:00.000Z"
          }
        ]
      }
    ]
  },
  sanitation: {
    label: "Sanitation drive",
    focus: "Clean-city campaign scenario with duplicate review and service load.",
    issues: [
      {
        id: "demo-sanitation-market-001",
        title: "Garbage overflow near flower market",
        category: "Garbage collection",
        location: "Flower Market Lane",
        ward: "Market Ward",
        landmark: "Flower market south gate",
        status: "In progress",
        priority: "Medium",
        description: "Bins have overflowed for two days near a busy pedestrian path.",
        createdAt: "2026-05-31T07:10:00.000Z",
        updatedAt: "2026-06-01T09:00:00.000Z",
        coordinates: { latitude: 12.9684, longitude: 77.6011 },
        assignedTeam: "Sanitation",
        priorityReason: "Medium because garbage collection issues can affect public health or access.",
        duplicateHints: [
          {
            id: "demo-sanitation-market-002",
            title: "Waste beside market gate",
            location: "Flower Market Lane",
            score: 6,
            reviewStatus: "Needs review",
            reviewedAt: null
          }
        ],
        activityLog: [
          {
            id: "demo-sanitation-market-001-a1",
            label: "Reported",
            detail: "Citizen submitted the sanitation report.",
            createdAt: "2026-05-31T07:10:00.000Z"
          },
          {
            id: "demo-sanitation-market-001-a2",
            label: "In progress",
            detail: "Sanitation team assigned for pickup.",
            createdAt: "2026-06-01T09:00:00.000Z"
          }
        ]
      },
      {
        id: "demo-sanitation-park-002",
        title: "Overflowing bins at children's park",
        category: "Garbage collection",
        location: "Green Park",
        ward: "Park Ward",
        landmark: "Children's play area",
        status: "Triaged",
        priority: "Medium",
        description: "Park bins are full after the weekend and need collection before evening use.",
        createdAt: "2026-06-01T05:30:00.000Z",
        updatedAt: "2026-06-01T08:30:00.000Z",
        coordinates: null,
        assignedTeam: "Sanitation",
        priorityReason: "Medium because garbage collection issues can affect public health or access.",
        duplicateHints: [],
        activityLog: [
          {
            id: "demo-sanitation-park-002-a1",
            label: "Reported",
            detail: "Citizen submitted the park sanitation report.",
            createdAt: "2026-06-01T05:30:00.000Z"
          },
          {
            id: "demo-sanitation-park-002-a2",
            label: "Triaged",
            detail: "Sanitation team acknowledged the local report.",
            createdAt: "2026-06-01T08:30:00.000Z"
          }
        ]
      }
    ]
  }
};

let issues = typeof localStorage === "undefined" ? sampleIssues.map(normalizeIssue) : loadIssues();
let filters = {
  category: "All",
  status: "All",
  priority: "All",
  query: ""
};
let selectedIssueId = null;
let lastDetailTriggerId = null;

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
    assignedTeam: suggestedTeam(category),
    activityLog: [
      {
        id: `activity-${Date.now()}`,
        label: "Reported",
        detail: "Citizen submitted the report in this browser.",
        createdAt: now
      }
    ],
    reporterContactOptional: null,
    isSample: false
  };
}

function suggestedTeam(category) {
  return TEAM_BY_CATEGORY[category] || "Unassigned";
}

function categoryIcon(category) {
  return CATEGORY_ICONS[category] || "I";
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
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIssues));
}

function normalizeIssue(issue) {
  const duplicateHints = normalizeDuplicateHints(issue.duplicateHints);
  const createdAt = issue.createdAt || new Date().toISOString();
  const assignedTeam = TEAMS.includes(issue.assignedTeam) ? issue.assignedTeam : suggestedTeam(issue.category);

  return {
    ward: "",
    landmark: "",
    coordinates: null,
    priorityReason: "",
    ...issue,
    assignedTeam,
    activityLog: normalizeActivityLog(issue.activityLog, createdAt),
    duplicateHints
  };
}

function createDemoScenarioIssues(scenarioKey) {
  const scenario = demoScenarios[scenarioKey] || demoScenarios.ward;

  return scenario.issues.map((issue) =>
    normalizeIssue({
      photo: null,
      reporterContactOptional: null,
      isSample: false,
      ...issue
    })
  );
}

function normalizeActivityLog(activityLog, createdAt) {
  if (Array.isArray(activityLog) && activityLog.length > 0) {
    return activityLog.map((item, index) => ({
      id: item.id || `activity-${createdAt}-${index}`,
      label: item.label || "Updated",
      detail: item.detail || "Local record updated.",
      createdAt: item.createdAt || createdAt
    }));
  }

  return [
    {
      id: `activity-${createdAt}`,
      label: "Reported",
      detail: "Report created in local browser storage.",
      createdAt
    }
  ];
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
    const searchMatches = !filters.query || issueSearchText(issue).includes(filters.query);

    return categoryMatches && statusMatches && priorityMatches && searchMatches;
  });
}

function issueSearchText(issue) {
  return [
    issue.id,
    issue.title,
    issue.category,
    issue.location,
    issue.ward,
    issue.landmark,
    issue.status,
    issue.priority,
    issue.assignedTeam,
    issue.description,
    formatCoordinates(issue.coordinates),
    duplicateReviewSummary(issue)
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function searchIssues(query, collection = issues) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return collection;
  }

  return collection.filter((issue) => issueSearchText(issue).includes(normalizedQuery));
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

function percentOf(count, total) {
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

function daysOpen(issue) {
  const end = issue.status === "Resolved" ? new Date(issue.updatedAt) : new Date();
  const start = new Date(issue.createdAt);
  return Math.max(0, Math.floor((end - start) / 86400000));
}

function staleOpenIssues() {
  return issues.filter((issue) => issue.status !== "Resolved" && daysOpen(issue) >= 3);
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
  const teamCounts = countBy(issues, TEAMS, "assignedTeam");
  const staleIssues = staleOpenIssues();

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      allIssues: issues.length,
      openIssues: openIssues.length,
      highPriority: highPriority.length,
      coordinateReady: issuesWithCoordinates.length,
      duplicateHints: duplicateHints.length,
      linkedDuplicates: linkedDuplicates.length,
      duplicateHintsNeedingReview: needsDuplicateReview.length,
      staleOpenIssues: staleIssues.length
    },
    statusCounts,
    priorityCounts,
    categoryCounts,
    teamCounts,
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
      assignedTeam: issue.assignedTeam || "Unassigned",
      daysOpen: daysOpen(issue),
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
      <div><strong>${summary.totals.staleOpenIssues}</strong><span>Open 3+ days</span></div>
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
      <section>
        <h4>Team</h4>
        ${summaryCountMarkup(summary.teamCounts.filter((item) => item.count > 0))}
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
  document.querySelector("#searchSummary").textContent = filters.query
    ? `${filteredIssues.length} matching local record${filteredIssues.length === 1 ? "" : "s"} for "${filters.query}".`
    : "Search covers ID, title, location, status, priority, service team, and duplicate review text.";

  if (filteredIssues.length === 0) {
    list.innerHTML = `<div class="empty-state">No reports match the current filters.</div>`;
    return;
  }

  list.innerHTML = filteredIssues
    .map(
      (issue) => `
        <article class="issue-card" data-issue-id="${escapeHtml(issue.id)}">
          <div class="issue-main">
            <div class="issue-title-row">
              <span class="category-mark" aria-hidden="true">${escapeHtml(categoryIcon(issue.category))}</span>
              <div>
                <h3>${escapeHtml(issue.title)}</h3>
                <time datetime="${issue.createdAt}">Reported ${formatDate(issue.createdAt)}</time>
              </div>
            </div>
            <div class="card-meta">
              <span class="tag">${escapeHtml(issue.category)}</span>
              <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)}</span>
              <span class="tag status-${statusClass(issue.status)}">${escapeHtml(issue.status)}</span>
              <span class="tag tag-info">${escapeHtml(issue.assignedTeam || "Unassigned")}</span>
              ${issue.duplicateHints.length > 0 ? `<span class="tag tag-warning">${escapeHtml(duplicateReviewSummary(issue))}</span>` : ""}
            </div>
            <p>${escapeHtml(issue.description)}</p>
            <button class="secondary-button details-button" type="button" data-action="view-detail" data-issue-id="${escapeHtml(issue.id)}" aria-controls="issueDetail" aria-expanded="${selectedIssueId === issue.id ? "true" : "false"}">View details</button>
          </div>
          <div class="issue-side">
            <div class="photo-strip" aria-label="Photo evidence status">
              <span class="photo-slot has-placeholder">${escapeHtml(categoryIcon(issue.category))}</span>
              <span class="photo-slot">Photo planned</span>
            </div>
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
            <label>
              Team
              <select data-action="assignment" data-issue-id="${escapeHtml(issue.id)}">
                ${optionMarkup(TEAMS, issue.assignedTeam || "Unassigned")}
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

function activityTimelineMarkup(issue) {
  return `
    <ol class="timeline activity-timeline">
      ${issue.activityLog
        .slice()
        .sort((left, right) => new Date(left.createdAt) - new Date(right.createdAt))
        .map(
          (activity) => `
            <li class="is-complete">
              <span></span>
              <div>
                <strong>${escapeHtml(activity.label)}</strong>
                <p>${escapeHtml(activity.detail)} ${formatDate(activity.createdAt)}</p>
              </div>
            </li>
          `
        )
        .join("")}
    </ol>
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
        <h2 id="issueDetailTitle">${escapeHtml(issue.title)}</h2>
        <div class="card-meta">
          <span class="tag">${escapeHtml(issue.category)}</span>
          <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)}</span>
          <span class="tag status-${statusClass(issue.status)}">${escapeHtml(issue.status)}</span>
          <span class="tag tag-info">${escapeHtml(issue.assignedTeam || "Unassigned")}</span>
        </div>
      </div>
      <button class="secondary-button" type="button" data-action="close-detail" aria-label="Close issue detail">Close</button>
    </div>

    <div class="detail-grid">
      <div class="detail-section">
        <h3>Report context</h3>
        <div class="photo-strip" aria-label="Photo evidence placeholder">
          <span class="photo-slot has-placeholder">${escapeHtml(categoryIcon(issue.category))}</span>
          <span class="photo-slot">Photo evidence planned</span>
          <span class="photo-slot">Privacy review needed</span>
        </div>
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
        <h3>Workflow timeline</h3>
        <ol class="timeline">
          ${timelineMarkup(issue)}
        </ol>
        ${activityTimelineMarkup(issue)}
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
        <label>
          Team
          <select data-action="assignment" data-issue-id="${escapeHtml(issue.id)}">
            ${optionMarkup(TEAMS, issue.assignedTeam || "Unassigned")}
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

  const staleCount = staleOpenIssues().length;
  const metrics = [
    [String(openIssues), "Open issues", `${percentOf(openIssues, issues.length)}% of total`],
    [String(highPriority), "High priority", `${staleCount} open 3+ days`],
    [String(categories), "Categories", `${issues.filter((issue) => issue.coordinates).length} map-ready`],
    [String(submittedToday), "Submitted today", "Local browser data"]
  ];

  document.querySelector("#metrics").innerHTML = metrics
    .map(
      ([value, label, note]) => `
        <div class="metric">
          <strong>${value}</strong>
          <span>${label}</span>
          <small>${note}</small>
        </div>
      `
    )
    .join("");
}

function barListMarkup(items, total) {
  return items
    .filter((item) => item.count > 0)
    .map(
      (item) => `
        <div class="bar-row">
          <span>${escapeHtml(item.label)}</span>
          <div class="bar-track"><span style="width: ${percentOf(item.count, total)}%"></span></div>
          <strong>${item.count}</strong>
        </div>
      `
    )
    .join("");
}

function renderAnalyticsBoard() {
  const summary = createMunicipalSummary();
  const priorityQueue = issues
    .filter((issue) => issue.status !== "Resolved")
    .sort((left, right) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[left.priority] - priorityOrder[right.priority] || new Date(left.createdAt) - new Date(right.createdAt);
    })
    .slice(0, 5);

  document.querySelector("#analyticsBoard").innerHTML = `
    <section>
      <h3>Priority queue</h3>
      <ul class="compact-list">
        ${
          priorityQueue.length > 0
            ? priorityQueue
                .map(
                  (issue) => `
                    <li>
                      <span class="category-mark small-mark" aria-hidden="true">${escapeHtml(categoryIcon(issue.category))}</span>
                      <div>
                        <strong>${escapeHtml(issue.title)}</strong>
                        <span>${escapeHtml(issue.assignedTeam || "Unassigned")} · ${daysOpen(issue)} days open</span>
                      </div>
                      <span class="tag ${priorityClass(issue.priority)}">${escapeHtml(issue.priority)}</span>
                    </li>
                  `
                )
                .join("")
            : `<li class="empty-state">No open reports need attention.</li>`
        }
      </ul>
    </section>
    <section>
      <h3>Status mix</h3>
      ${barListMarkup(summary.statusCounts, summary.totals.allIssues)}
    </section>
    <section>
      <h3>Team load</h3>
      ${barListMarkup(summary.teamCounts, summary.totals.allIssues)}
    </section>
  `;
}

function latestActivities(limit = 5) {
  return issues
    .flatMap((issue) =>
      issue.activityLog.map((activity) => ({
        ...activity,
        issueId: issue.id,
        issueTitle: issue.title,
        category: issue.category
      }))
    )
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    .slice(0, limit);
}

function createPitchSnapshot() {
  const summary = createMunicipalSummary();
  const resolutionRate = percentOf(
    summary.statusCounts.find((item) => item.label === "Resolved")?.count || 0,
    summary.totals.allIssues
  );
  const mapReadyRate = percentOf(summary.totals.coordinateReady, summary.totals.allIssues);
  const topTeam = summary.teamCounts
    .filter((item) => item.count > 0)
    .sort((left, right) => right.count - left.count)[0];

  return {
    headline: `${summary.totals.openIssues} open civic records, ${summary.totals.highPriority} high-priority.`,
    proof: `${mapReadyRate}% map-ready, ${resolutionRate}% resolved, ${summary.totals.duplicateHintsNeedingReview} duplicate hints awaiting review.`,
    wedge: `Built for ward teams that need a trusted civic report vault before backend rollout.`,
    buyer: topTeam ? `${topTeam.label} has the largest current workload.` : "No active team workload yet."
  };
}

function moduleStatMarkup(value, label, detail) {
  return `
    <div class="module-stat">
      <strong>${escapeHtml(String(value))}</strong>
      <span>${escapeHtml(label)}</span>
      <small>${escapeHtml(detail)}</small>
    </div>
  `;
}

function renderVaultModules() {
  const summary = createMunicipalSummary();
  const resolvedReports = issues.filter((issue) => issue.status === "Resolved");
  const evidencePending = issues.filter((issue) => !issue.photo);
  const newestIssue = issues
    .slice()
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))[0];
  const activeServices = summary.teamCounts
    .filter((item) => item.label !== "Unassigned" && item.count > 0)
    .slice(0, 4);
  const activities = latestActivities(5);

  document.querySelector("#vaultModules").innerHTML = `
    <section class="vault-card vault-card-primary" aria-labelledby="issuedReportsTitle">
      <div>
        <p class="eyebrow">Issued reports</p>
        <h2 id="issuedReportsTitle">Civic report vault</h2>
        <p>Locally stored reports are grouped like records: open, resolved, evidence-ready, and exportable.</p>
      </div>
      <div class="module-stat-grid">
        ${moduleStatMarkup(summary.totals.allIssues, "Total records", "Saved in this browser")}
        ${moduleStatMarkup(resolvedReports.length, "Resolved", "Issued closure records")}
        ${moduleStatMarkup(summary.totals.openIssues, "Open", "Awaiting municipal action")}
      </div>
      <a class="module-link" href="#issues">Open report vault</a>
    </section>

    <section class="vault-card" aria-labelledby="evidenceVaultTitle">
      <p class="eyebrow">Uploaded evidence</p>
      <h3 id="evidenceVaultTitle">Evidence placeholders</h3>
      <p>${evidencePending.length} records are ready for future photo slots after privacy approval.</p>
      <div class="evidence-slots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>

    <section class="vault-card" aria-labelledby="servicesTitle">
      <p class="eyebrow">Municipal services</p>
      <h3 id="servicesTitle">Service workload</h3>
      <ul class="module-list">
        ${
          activeServices.length > 0
            ? activeServices
                .map((service) => `<li><span>${escapeHtml(service.label)}</span><strong>${service.count}</strong></li>`)
                .join("")
            : `<li><span>No active service load</span><strong>0</strong></li>`
        }
      </ul>
    </section>

    <section class="vault-card" aria-labelledby="retrieveTitle">
      <p class="eyebrow">Retrieve report</p>
      <h3 id="retrieveTitle">Latest local record</h3>
      ${
        newestIssue
          ? `<p><strong>${escapeHtml(newestIssue.id)}</strong></p><p>${escapeHtml(newestIssue.title)} · ${escapeHtml(newestIssue.status)}</p>`
          : `<p>No local records available.</p>`
      }
      <a class="module-link" href="#issues">Search with filters</a>
    </section>

    <section class="vault-card activity-module" aria-labelledby="activityTitle">
      <p class="eyebrow">Activity</p>
      <h3 id="activityTitle">Recent vault activity</h3>
      <ol class="module-activity">
        ${
          activities.length > 0
            ? activities
                .map(
                  (activity) => `
                    <li>
                      <span class="category-mark small-mark" aria-hidden="true">${escapeHtml(categoryIcon(activity.category))}</span>
                      <div>
                        <strong>${escapeHtml(activity.label)}</strong>
                        <p>${escapeHtml(activity.issueTitle)} · ${formatDate(activity.createdAt)}</p>
                      </div>
                    </li>
                  `
                )
                .join("")
            : `<li class="empty-state">No local activity yet.</li>`
        }
      </ol>
    </section>
  `;
}

function renderPitchSnapshot() {
  const snapshot = createPitchSnapshot();

  document.querySelector("#pitchSnapshot").innerHTML = `
    <div>
      <span>Pitch line</span>
      <strong>${escapeHtml(snapshot.headline)}</strong>
    </div>
    <div>
      <span>Demo proof</span>
      <strong>${escapeHtml(snapshot.proof)}</strong>
    </div>
    <div>
      <span>Market wedge</span>
      <strong>${escapeHtml(snapshot.wedge)}</strong>
    </div>
    <div>
      <span>Buyer signal</span>
      <strong>${escapeHtml(snapshot.buyer)}</strong>
    </div>
  `;
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
  renderVaultModules();
  renderPitchSnapshot();
  renderIssues();
  renderMetrics();
  renderLocationPreview();
  renderWorkflowBoard();
  renderAnalyticsBoard();
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

function setSummaryStatus(message, type = "success") {
  const status = document.querySelector("#summaryStatus");
  status.textContent = message;
  status.classList.toggle("is-success", type === "success");
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

function focusFirstInvalidField() {
  const invalidField = document.querySelector("[aria-invalid='true']");

  if (invalidField) {
    invalidField.focus();
  }
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
  setStatus("Report submitted and saved in this browser.", "success");
}

function resetDemoData() {
  issues = sampleIssues.map(normalizeIssue);
  selectedIssueId = null;
  filters = {
    category: "All",
    status: "All",
    priority: "All",
    query: ""
  };
  saveIssues(issues);
  document.querySelector("#reportSearch").value = "";
  renderApp();
  clearValidation();
  renderAssistance();
  setSummaryStatus("");
  setStatus("Demo data restored.", "success");
}

function loadDemoScenario(scenarioKey) {
  const scenario = demoScenarios[scenarioKey] || demoScenarios.ward;

  issues = createDemoScenarioIssues(scenarioKey);
  selectedIssueId = null;
  filters = {
    category: "All",
    status: "All",
    priority: "All",
    query: ""
  };
  saveIssues(issues);
  document.querySelector("#reportSearch").value = "";
  renderApp();
  clearValidation();
  renderAssistance();
  setSummaryStatus("");
  setStatus(`${scenario.label} scenario loaded for local pitch demo.`, "success");
}

function activityForPatch(patch) {
  if (patch.status) {
    return {
      label: patch.status,
      detail: `Status changed to ${patch.status}.`
    };
  }

  if (patch.priority) {
    return {
      label: "Priority updated",
      detail: `Priority changed to ${patch.priority}.`
    };
  }

  if (patch.assignedTeam) {
    return {
      label: "Assignment updated",
      detail: `Assigned to ${patch.assignedTeam}.`
    };
  }

  return {
    label: "Updated",
    detail: "Local record updated."
  };
}

function updateIssue(issueId, patch) {
  const now = new Date().toISOString();
  const activity = activityForPatch(patch);

  issues = issues.map((issue) =>
    issue.id === issueId
      ? {
          ...issue,
          ...patch,
          priorityReason: patch.priority ? "Priority was manually adjusted by staff." : issue.priorityReason,
          activityLog: [
            ...issue.activityLog,
            {
              id: `activity-${Date.now()}`,
              ...activity,
              createdAt: now
            }
          ],
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
          activityLog: [
            ...issue.activityLog,
            {
              id: `activity-${Date.now()}`,
              label: "Duplicate review",
              detail: `Duplicate hint marked ${reviewStatus}.`,
              createdAt: now
            }
          ],
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

  if (action === "assignment") {
    updateIssue(issueId, { assignedTeam: control.value });
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
    lastDetailTriggerId = selectedIssueId;
    renderIssueDetail();
    const detailPanel = document.querySelector("#issueDetail");
    detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    detailPanel.focus({ preventScroll: true });
  }
}

function handleDetailClick(event) {
  const control = event.target.closest("[data-action]");

  if (!control) {
    return;
  }

  if (control.dataset.action === "close-detail") {
    const detailTrigger = Array.from(document.querySelectorAll('[data-action="view-detail"]')).find(
      (button) => button.dataset.issueId === lastDetailTriggerId
    );

    selectedIssueId = null;
    renderIssueDetail();
    lastDetailTriggerId = null;

    if (detailTrigger) {
      detailTrigger.focus();
    }
  }
}

function handleDemoScenarioClick(event) {
  const control = event.target.closest('[data-action="demo-scenario"]');

  if (!control) {
    return;
  }

  loadDemoScenario(control.dataset.scenario);
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

function handleSearchInput(event) {
  filters.query = event.target.value.trim().toLowerCase();
  renderIssues();
}

function clearReportSearch() {
  filters.query = "";
  document.querySelector("#reportSearch").value = "";
  renderIssues();
  document.querySelector("#reportSearch").focus();
}

function printSummary() {
  window.print();
  setSummaryStatus("Print dialog opened for the local summary.");
}

function exportSummary() {
  const summary = createMunicipalSummary();
  const payload = JSON.stringify(summary, null, 2);
  downloadJson(payload, `civic-issue-summary-${new Date().toISOString().slice(0, 10)}.json`);
  setSummaryStatus("JSON summary exported from local browser data.");
}

function downloadJson(payload, filename) {
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createBackupPayload() {
  return {
    app: "civic-issue-reporter",
    version: 1,
    exportedAt: new Date().toISOString(),
    issues
  };
}

function exportBackup() {
  const payload = JSON.stringify(createBackupPayload(), null, 2);
  downloadJson(payload, `civic-issue-backup-${new Date().toISOString().slice(0, 10)}.json`);
  setSummaryStatus("Full local backup exported. This is not an official record.");
}

function validateImportedIssues(value) {
  const importedIssues = Array.isArray(value) ? value : value && Array.isArray(value.issues) ? value.issues : null;

  if (!importedIssues || importedIssues.length === 0) {
    throw new Error("Backup must include at least one issue.");
  }

  return importedIssues.map((issue) => {
    if (!issue || typeof issue !== "object") {
      throw new Error("Every backup issue must be an object.");
    }

    if (!issue.title || !issue.category || !issue.location || !issue.description) {
      throw new Error("Every backup issue needs title, category, location, and description.");
    }

    return normalizeIssue({
      ...issue,
      id: issue.id || `issue-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      status: STATUSES.includes(issue.status) ? issue.status : "Submitted",
      priority: PRIORITIES.includes(issue.priority) ? issue.priority : inferPriority(issue.category, issue.description),
      createdAt: issue.createdAt || new Date().toISOString(),
      updatedAt: issue.updatedAt || issue.createdAt || new Date().toISOString()
    });
  });
}

function importBackup(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(reader.result);
      issues = validateImportedIssues(parsed);
      selectedIssueId = null;
      filters = {
        category: "All",
        status: "All",
        priority: "All"
      };
      saveIssues(issues);
      renderApp();
      setSummaryStatus(`Restored ${issues.length} local reports from backup.`);
    } catch (error) {
      setSummaryStatus(`Backup restore failed: ${error.message}`, "error");
    } finally {
      event.target.value = "";
    }
  });

  reader.addEventListener("error", () => {
    setSummaryStatus("Backup restore failed: the selected file could not be read.", "error");
    event.target.value = "";
  });

  reader.readAsText(file);
}

if (typeof document !== "undefined") {
  document.querySelector("#reportForm").addEventListener("submit", handleSubmit);
  document.querySelector("#resetDemoData").addEventListener("click", resetDemoData);
  document.querySelector("#printSummary").addEventListener("click", printSummary);
  document.querySelector("#exportSummary").addEventListener("click", exportSummary);
  document.querySelector("#exportBackup").addEventListener("click", exportBackup);
  document.querySelector("#importBackup").addEventListener("change", importBackup);
  document.querySelector("#issueList").addEventListener("change", handleTriageChange);
  document.querySelector("#issueList").addEventListener("click", handleIssueClick);
  document.querySelector("#issueDetail").addEventListener("change", handleTriageChange);
  document.querySelector("#issueDetail").addEventListener("click", handleDetailClick);
  document.querySelector("#categoryFilter").addEventListener("change", handleFilterChange);
  document.querySelector("#statusFilter").addEventListener("change", handleFilterChange);
  document.querySelector("#priorityFilter").addEventListener("change", handleFilterChange);
  document.querySelector("#reportSearch").addEventListener("input", handleSearchInput);
  document.querySelector("#clearReportSearch").addEventListener("click", clearReportSearch);
  document.querySelector("#reportForm").addEventListener("input", renderAssistance);
  document.querySelector("#demoScenarioButtons").addEventListener("click", handleDemoScenarioClick);

  renderApp();
}

if (typeof module !== "undefined") {
  module.exports = {
    CATEGORIES,
    PRIORITIES,
    STATUSES,
    TEAMS,
    createMunicipalSummary,
    createDemoScenarioIssues,
    createPitchSnapshot,
    demoScenarios,
    duplicateScore,
    findPotentialDuplicates,
    inferPriority,
    normalizeIssue,
    searchIssues,
    suggestPriority,
    validateImportedIssues
  };
}
