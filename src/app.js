const STORAGE_KEY = "civicIssueReporter.stable.v1";
const BACKUP_TYPE = "civicIssueReporter.backup";
const BACKUP_VERSION = 2;

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

const STATUSES = ["Submitted", "Triaged", "In progress", "Resolved"];
const PRIORITIES = ["Low", "Medium", "High"];
const TEAMS = ["Unassigned", "Sanitation Team", "Roads Team", "Water Supply Team", "Electrical Team", "Public Safety Desk"];

const sampleIssues = [
  {
    id: "ISS-2048",
    title: "Garbage not collected",
    category: "Garbage collection",
    location: "Shanti Nagar, Community Hall",
    ward: "Ward 27 - Shanti Nagar",
    landmark: "Community Hall",
    description: "Garbage not collected since 3 days. Overflowing near the community hall.",
    status: "Submitted",
    priority: "High",
    team: "Sanitation Team",
    coordinates: { latitude: 12.971599, longitude: 77.594566 },
    notes: [],
    createdAt: "2026-05-20T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z",
    activity: [{ label: "Report submitted", at: "2026-05-20T08:00:00.000Z" }]
  },
  {
    id: "ISS-2047",
    title: "Streetlight not working",
    category: "Streetlight",
    location: "Lane 3, Shanti Nagar",
    ward: "Ward 27 - Shanti Nagar",
    landmark: "Bus stop",
    description: "Streetlight not working near bus stop, unsafe after dark.",
    status: "Triaged",
    priority: "High",
    team: "Electrical Team",
    coordinates: { latitude: 12.975221, longitude: 77.603287 },
    notes: [],
    createdAt: "2026-05-20T09:10:00.000Z",
    updatedAt: "2026-05-20T10:00:00.000Z",
    activity: [
      { label: "Report submitted", at: "2026-05-20T09:10:00.000Z" },
      { label: "Status changed to Triaged", at: "2026-05-20T10:00:00.000Z" }
    ]
  },
  {
    id: "ISS-2046",
    title: "Road damaged near school",
    category: "Road damage",
    location: "Shanti Nagar Main Road",
    ward: "Ward 27 - Shanti Nagar",
    landmark: "Primary School",
    description: "Pothole near school crossing blocks traffic and creates risk for children.",
    status: "In progress",
    priority: "High",
    team: "Roads Team",
    coordinates: null,
    notes: [],
    createdAt: "2026-05-20T11:30:00.000Z",
    updatedAt: "2026-05-20T13:00:00.000Z",
    activity: [
      { label: "Report submitted", at: "2026-05-20T11:30:00.000Z" },
      { label: "Status changed to In progress", at: "2026-05-20T13:00:00.000Z" }
    ]
  }
];

const state = {
  issues: [],
  selectedId: null,
  filters: { category: "All", status: "Open", priority: "All" }
};

function $(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function nowIso() {
  return new Date().toISOString();
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isValidDate(value) {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

function normalizeCoordinates(value) {
  if (!isPlainObject(value)) return null;
  const latitude = Number(value.latitude);
  const longitude = Number(value.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

function normalizeIssue(issue) {
  const fallbackTime = nowIso();
  const category = CATEGORIES.includes(issue?.category) ? issue.category : "Other civic issue";
  const status = STATUSES.includes(issue?.status) ? issue.status : "Submitted";
  const priority = PRIORITIES.includes(issue?.priority) ? issue.priority : suggestPriority(category, issue?.description || "", issue?.location || "").priority;
  const team = TEAMS.includes(issue?.team) ? issue.team : teamForCategory(category);
  return {
    id: typeof issue?.id === "string" && issue.id ? issue.id : createIssueId(),
    title: typeof issue?.title === "string" && issue.title.trim() ? issue.title.trim() : "Untitled civic issue",
    category,
    location: typeof issue?.location === "string" && issue.location.trim() ? issue.location.trim() : "Location not specified",
    ward: typeof issue?.ward === "string" ? issue.ward : "Ward 27 - Shanti Nagar",
    landmark: typeof issue?.landmark === "string" ? issue.landmark : "",
    description: typeof issue?.description === "string" && issue.description.trim() ? issue.description.trim() : "No description provided.",
    status,
    priority,
    team,
    coordinates: normalizeCoordinates(issue?.coordinates),
    notes: Array.isArray(issue?.notes) ? issue.notes.filter(Boolean).map(String) : [],
    activity: Array.isArray(issue?.activity) ? issue.activity.filter((item) => item?.label).map((item) => ({
      label: String(item.label),
      at: isValidDate(item.at) ? item.at : fallbackTime
    })) : [{ label: "Report submitted", at: fallbackTime }],
    createdAt: isValidDate(issue?.createdAt) ? issue.createdAt : fallbackTime,
    updatedAt: isValidDate(issue?.updatedAt) ? issue.updatedAt : fallbackTime
  };
}

function createIssueId() {
  return `ISS-${Math.floor(2000 + Math.random() * 8000)}`;
}

function loadIssues() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(parsed) && parsed.length) {
      return parsed.map(normalizeIssue);
    }
  } catch {
    // Fall through to seeded demo data.
  }
  return sampleIssues.map(normalizeIssue);
}

function saveIssues() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.issues));
}

function toast(message, type = "success") {
  const node = $("#toast");
  node.textContent = message;
  node.className = `toast is-visible ${type === "error" ? "is-error" : "is-success"}`;
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => {
    node.className = "toast";
  }, 3500);
}

function setFeedback(message, type = "error") {
  const node = $("#formFeedback");
  node.textContent = message;
  node.className = `feedback wide ${type === "success" ? "is-success" : "is-error"}`;
  toast(message, type);
}

function suggestPriority(category, description, location) {
  const text = `${category} ${description} ${location}`.toLowerCase();
  const highWords = ["unsafe", "school", "injury", "danger", "blocked", "fire", "collapse", "accident", "leak"];
  const mediumCategories = ["Garbage collection", "Drainage", "Water leakage", "Sewage overflow", "Illegal dumping", "Public toilet", "Tree hazard"];
  const signal = highWords.find((word) => text.includes(word));
  if (signal) return { priority: "High", reason: `High priority because "${signal}" was detected.` };
  if (mediumCategories.includes(category)) return { priority: "Medium", reason: `${category} usually needs timely civic action.` };
  return { priority: "Low", reason: "No urgent safety or public health signal detected." };
}

function teamForCategory(category) {
  if (["Streetlight", "Traffic signal"].includes(category)) return "Electrical Team";
  if (["Road damage", "Footpath obstruction", "Tree hazard", "Park maintenance"].includes(category)) return "Roads Team";
  if (["Drainage", "Water leakage", "Sewage overflow"].includes(category)) return "Water Supply Team";
  if (["Garbage collection", "Illegal dumping", "Public toilet", "Stray animal concern"].includes(category)) return "Sanitation Team";
  if (["Public safety", "Noise complaint"].includes(category)) return "Public Safety Desk";
  return "Unassigned";
}

function readForm() {
  const latitude = $("#latitude").value.trim();
  const longitude = $("#longitude").value.trim();
  return {
    title: $("#title").value.trim(),
    category: $("#category").value,
    location: $("#location").value.trim(),
    ward: $("#ward").value,
    landmark: $("#landmark").value.trim(),
    description: $("#description").value.trim(),
    coordinates: latitude && longitude ? { latitude: Number(latitude), longitude: Number(longitude) } : null,
    latitude,
    longitude
  };
}

function clearErrors() {
  ["title", "location", "description", "latitude", "longitude"].forEach((field) => {
    $(`#${field}`).removeAttribute("aria-invalid");
    $(`#${field}Error`).textContent = "";
  });
}

function setFieldError(field, message) {
  $(`#${field}`).setAttribute("aria-invalid", "true");
  $(`#${field}Error`).textContent = message;
}

function validateForm(data) {
  clearErrors();
  const errors = [];
  if (!data.title) errors.push(["title", "Add an issue title."]);
  if (!data.location) errors.push(["location", "Add a recognizable location."]);
  if (!data.description) errors.push(["description", "Add a short description."]);
  if ((data.latitude && !data.longitude) || (!data.latitude && data.longitude)) {
    errors.push(["latitude", "Add both latitude and longitude, or leave both blank."]);
    errors.push(["longitude", "Add both latitude and longitude, or leave both blank."]);
  }
  if (data.latitude && (Number.isNaN(Number(data.latitude)) || Number(data.latitude) < -90 || Number(data.latitude) > 90)) {
    errors.push(["latitude", "Latitude must be between -90 and 90."]);
  }
  if (data.longitude && (Number.isNaN(Number(data.longitude)) || Number(data.longitude) < -180 || Number(data.longitude) > 180)) {
    errors.push(["longitude", "Longitude must be between -180 and 180."]);
  }
  errors.forEach(([field, message]) => setFieldError(field, message));
  return errors;
}

function submitIssue(event) {
  event?.preventDefault();
  const data = readForm();
  const errors = validateForm(data);
  if (errors.length) {
    setFeedback(`Cannot submit: ${errors[0][1]}`, "error");
    $(`#${errors[0][0]}`).focus();
    return;
  }
  const timestamp = nowIso();
  const assistance = suggestPriority(data.category, data.description, data.location);
  const issue = normalizeIssue({
    ...data,
    id: createIssueId(),
    priority: assistance.priority,
    team: teamForCategory(data.category),
    status: "Submitted",
    activity: [{ label: "Report submitted", at: timestamp }],
    createdAt: timestamp,
    updatedAt: timestamp
  });
  state.issues.unshift(issue);
  state.selectedId = issue.id;
  saveIssues();
  $("#issueForm").reset();
  clearErrors();
  setFeedback(`Submitted ${issue.id}: ${issue.title}`, "success");
  render();
  scrollToPanel("issues");
}

function getFilteredIssues() {
  return state.issues.filter((issue) => {
    const statusMatch = state.filters.status === "All" || (state.filters.status === "Open" ? issue.status !== "Resolved" : issue.status === state.filters.status);
    const categoryMatch = state.filters.category === "All" || issue.category === state.filters.category;
    const priorityMatch = state.filters.priority === "All" || issue.priority === state.filters.priority;
    return statusMatch && categoryMatch && priorityMatch;
  });
}

function updateIssue(id, patch, label) {
  const timestamp = nowIso();
  state.issues = state.issues.map((issue) => {
    if (issue.id !== id) return issue;
    return normalizeIssue({
      ...issue,
      ...patch,
      updatedAt: timestamp,
      activity: [...issue.activity, { label, at: timestamp }]
    });
  });
  saveIssues();
  render();
  toast(label);
}

function addNote(id, note) {
  if (!note.trim()) {
    toast("Write a note before saving.", "error");
    return;
  }
  const issue = state.issues.find((item) => item.id === id);
  updateIssue(id, { notes: [...issue.notes, note.trim()] }, "Desk note added");
}

function renderSelect(id, options, selected = "") {
  const select = $(id);
  select.innerHTML = options.map((option) => `<option value="${escapeHtml(option)}"${option === selected ? " selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

function renderControls() {
  renderSelect("#category", CATEGORIES, $("#category").value || CATEGORIES[0]);
  renderSelect("#categoryFilter", ["All", ...CATEGORIES], state.filters.category);
  renderSelect("#statusFilter", ["Open", "All", ...STATUSES], state.filters.status);
  renderSelect("#priorityFilter", ["All", ...PRIORITIES], state.filters.priority);
}

function renderMetrics() {
  const counts = {
    Open: state.issues.filter((issue) => issue.status !== "Resolved").length,
    Triaged: state.issues.filter((issue) => issue.status === "Triaged").length,
    "In progress": state.issues.filter((issue) => issue.status === "In progress").length,
    Resolved: state.issues.filter((issue) => issue.status === "Resolved").length
  };
  $("#metrics").innerHTML = Object.entries(counts).map(([label, count]) => `
    <button class="metric" type="button" data-status-jump="${escapeHtml(label)}">
      <strong>${count}</strong>
      <span>${escapeHtml(label)}</span>
    </button>
  `).join("");
}

function renderIssues() {
  const issues = getFilteredIssues();
  $("#queueCount").textContent = `${issues.length} shown / ${state.issues.length} total`;
  $("#issueList").innerHTML = issues.length ? issues.map((issue) => `
    <article class="issue-card ${issue.id === state.selectedId ? "is-selected" : ""}">
      <div>
        <span class="issue-id">${escapeHtml(issue.id)}</span>
        <h3>${escapeHtml(issue.title)}</h3>
        <p>${escapeHtml(issue.location)}</p>
        <div class="tags">
          <span>${escapeHtml(issue.category)}</span>
          <span class="priority-${issue.priority.toLowerCase()}">${escapeHtml(issue.priority)}</span>
          <span>${escapeHtml(issue.status)}</span>
          <span>${escapeHtml(issue.team)}</span>
        </div>
      </div>
      <div class="card-controls">
        <select data-action="status" data-id="${escapeHtml(issue.id)}">${STATUSES.map((status) => `<option${status === issue.status ? " selected" : ""}>${status}</option>`).join("")}</select>
        <select data-action="priority" data-id="${escapeHtml(issue.id)}">${PRIORITIES.map((priority) => `<option${priority === issue.priority ? " selected" : ""}>${priority}</option>`).join("")}</select>
        <select data-action="team" data-id="${escapeHtml(issue.id)}">${TEAMS.map((team) => `<option${team === issue.team ? " selected" : ""}>${team}</option>`).join("")}</select>
        <button class="secondary-button" type="button" data-action="detail" data-id="${escapeHtml(issue.id)}">Open</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No reports match the current filters.</div>`;
}

function renderDetail() {
  const issue = state.issues.find((item) => item.id === state.selectedId);
  const panel = $("#detail");
  if (!issue) {
    panel.hidden = true;
    $("#detailContent").innerHTML = "";
    return;
  }
  panel.hidden = false;
  $("#detailContent").innerHTML = `
    <div class="panel-heading">
      <div>
        <h2>${escapeHtml(issue.title)}</h2>
        <p>${escapeHtml(issue.id)} · ${escapeHtml(issue.status)} · ${escapeHtml(issue.priority)}</p>
      </div>
      <button class="secondary-button" type="button" data-action="close-detail">Close</button>
    </div>
    <div class="detail-grid">
      <section>
        <h3>Report Context</h3>
        <p>${escapeHtml(issue.description)}</p>
        <p><strong>Location:</strong> ${escapeHtml(issue.location)}</p>
        <p><strong>Ward:</strong> ${escapeHtml(issue.ward)}</p>
        <p><strong>Landmark:</strong> ${escapeHtml(issue.landmark || "Not specified")}</p>
        <p><strong>Coordinates:</strong> ${issue.coordinates ? `${issue.coordinates.latitude.toFixed(6)}, ${issue.coordinates.longitude.toFixed(6)}` : "Not added"}</p>
      </section>
      <section>
        <h3>Notes</h3>
        <ul>${issue.notes.length ? issue.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("") : "<li>No notes yet.</li>"}</ul>
        <textarea id="noteText" rows="3" placeholder="Add desk note"></textarea>
        <button type="button" data-action="save-note" data-id="${escapeHtml(issue.id)}">Save Note</button>
      </section>
      <section>
        <h3>Activity</h3>
        <ol>${issue.activity.map((item) => `<li>${escapeHtml(item.label)} <span>${new Date(item.at).toLocaleString()}</span></li>`).join("")}</ol>
      </section>
    </div>
  `;
}

function renderQueues() {
  const high = state.issues.filter((issue) => issue.priority === "High" && issue.status !== "Resolved").slice(0, 5);
  $("#priorityQueue").innerHTML = high.length ? high.map((issue) => `<button type="button" data-action="detail" data-id="${escapeHtml(issue.id)}">${escapeHtml(issue.title)} <span>${escapeHtml(issue.team)}</span></button>`).join("") : "<p>No high-priority open reports.</p>";
  const teamCounts = TEAMS.map((team) => ({ team, count: state.issues.filter((issue) => issue.team === team && issue.status !== "Resolved").length })).filter((item) => item.count);
  $("#assignmentQueue").innerHTML = teamCounts.length ? teamCounts.map((item) => `<p><strong>${escapeHtml(item.team)}</strong> ${item.count}</p>`).join("") : "<p>No active assignments.</p>";
}

function renderMap() {
  const mapped = state.issues.filter((issue) => issue.coordinates).slice(0, 10);
  $("#mapCanvas").innerHTML = mapped.length ? mapped.map((issue, index) => {
    const left = 12 + ((index * 17) % 76);
    const top = 18 + ((index * 23) % 64);
    return `<button class="map-marker priority-${issue.priority.toLowerCase()}" style="left:${left}%;top:${top}%" type="button" data-action="detail" data-id="${escapeHtml(issue.id)}" title="${escapeHtml(issue.title)}">${index + 1}</button>`;
  }).join("") : "<p>No reports with coordinates yet.</p>";
}

function createSummary() {
  return {
    generatedAt: nowIso(),
    totals: {
      total: state.issues.length,
      open: state.issues.filter((issue) => issue.status !== "Resolved").length,
      high: state.issues.filter((issue) => issue.priority === "High").length,
      mapped: state.issues.filter((issue) => issue.coordinates).length
    },
    issues: state.issues
  };
}

function renderSummary() {
  const summary = createSummary();
  $("#summaryPreview").innerHTML = `
    <div class="summary-grid">
      <div><strong>${summary.totals.total}</strong><span>Total</span></div>
      <div><strong>${summary.totals.open}</strong><span>Open</span></div>
      <div><strong>${summary.totals.high}</strong><span>High priority</span></div>
      <div><strong>${summary.totals.mapped}</strong><span>Mapped</span></div>
    </div>
    <p>Generated ${new Date(summary.generatedAt).toLocaleString()} from local browser data.</p>
  `;
}

function renderAssistance() {
  const data = readForm();
  if (!data.title && !data.location && !data.description) {
    $("#assistPanel").textContent = "Local priority and duplicate assistance appears while typing.";
    return;
  }
  const priority = suggestPriority(data.category, data.description, data.location);
  const duplicates = state.issues.filter((issue) => issue.category === data.category && data.location && issue.location.toLowerCase().includes(data.location.toLowerCase().split(",")[0])).length;
  $("#assistPanel").textContent = `${priority.reason} ${duplicates ? `${duplicates} possible duplicate report(s) found.` : "No likely duplicate yet."}`;
}

function render() {
  renderControls();
  renderMetrics();
  renderIssues();
  renderDetail();
  renderQueues();
  renderMap();
  renderSummary();
}

function scrollToPanel(id) {
  const panel = $(`#${id}`);
  if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setFilters(nextFilters) {
  state.filters = { ...state.filters, ...nextFilters };
  render();
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportBackup() {
  downloadJson(`civic-issue-backup-${new Date().toISOString().slice(0, 10)}.json`, {
    backupType: BACKUP_TYPE,
    version: BACKUP_VERSION,
    exportedAt: nowIso(),
    issues: state.issues
  });
  toast("Backup exported.");
}

function importBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || ""));
      if (payload.backupType !== BACKUP_TYPE || payload.version !== BACKUP_VERSION || !Array.isArray(payload.issues)) {
        throw new Error("Unsupported backup file.");
      }
      state.issues = payload.issues.map(normalizeIssue);
      state.selectedId = state.issues[0]?.id || null;
      saveIssues();
      render();
      toast("Backup imported.");
    } catch (error) {
      toast(error.message, "error");
    }
  };
  reader.readAsText(file);
}

function bulkTriage() {
  const submitted = state.issues.filter((issue) => issue.status === "Submitted");
  submitted.forEach((issue) => updateIssue(issue.id, { status: "Triaged" }, "Bulk triaged"));
  toast(submitted.length ? `${submitted.length} report(s) triaged.` : "No submitted reports to triage.");
}

function autoReassign() {
  state.issues.forEach((issue) => {
    if (issue.status !== "Resolved") {
      issue.team = teamForCategory(issue.category);
      issue.updatedAt = nowIso();
      issue.activity.push({ label: `Assigned to ${issue.team}`, at: issue.updatedAt });
    }
  });
  saveIssues();
  render();
  toast("Open reports reassigned by category.");
}

function resetDemo() {
  state.issues = sampleIssues.map(normalizeIssue);
  state.selectedId = state.issues[0].id;
  state.filters = { category: "All", status: "Open", priority: "All" };
  saveIssues();
  render();
  toast("Demo data reset.");
}

function cleanupQueryString() {
  if (!window.location.search) return;
  const params = new URLSearchParams(window.location.search);
  const formKeys = ["title", "category", "location", "ward", "landmark", "description", "latitude", "longitude"];
  const keys = Array.from(params.keys());
  if (keys.length && keys.every((key) => formKeys.includes(key)) && keys.every((key) => !params.get(key))) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function bindEvents() {
  $("#issueForm").addEventListener("submit", submitIssue);
  $("#submitIssue").addEventListener("click", submitIssue);
  $("#clearForm").addEventListener("click", () => {
    $("#issueForm").reset();
    clearErrors();
    setFeedback("Form cleared.", "success");
  });
  $("#issueForm").addEventListener("input", renderAssistance);
  $("#categoryFilter").addEventListener("change", (event) => setFilters({ category: event.target.value }));
  $("#statusFilter").addEventListener("change", (event) => setFilters({ status: event.target.value }));
  $("#priorityFilter").addEventListener("change", (event) => setFilters({ priority: event.target.value }));
  $("#resetFilters").addEventListener("click", () => setFilters({ category: "All", status: "Open", priority: "All" }));
  $("#bulkTriage").addEventListener("click", bulkTriage);
  $("#reassign").addEventListener("click", autoReassign);
  $("#addNote").addEventListener("click", () => {
    const firstOpen = state.issues.find((issue) => issue.status !== "Resolved");
    if (!firstOpen) return toast("No open report for a note.", "error");
    addNote(firstOpen.id, "Quick desk review completed.");
  });
  $("#exportSummary").addEventListener("click", () => {
    downloadJson(`civic-issue-summary-${new Date().toISOString().slice(0, 10)}.json`, createSummary());
    toast("Summary exported.");
  });
  $("#exportBackup").addEventListener("click", exportBackup);
  $("#importBackup").addEventListener("click", () => $("#backupFile").click());
  $("#backupFile").addEventListener("change", (event) => importBackup(event.target.files[0]));
  $("#printSummary").addEventListener("click", () => {
    window.print();
    toast("Print dialog opened.");
  });
  $("#resetDemo").addEventListener("click", resetDemo);
  $("#focusMap").addEventListener("click", () => scrollToPanel("map"));
  $("#menuToggle").addEventListener("click", () => $("#sidebar").classList.toggle("is-hidden"));
  $("#useLocation").addEventListener("click", () => {
    if (!navigator.geolocation) return toast("Browser location is unavailable; enter coordinates manually.", "error");
    navigator.geolocation.getCurrentPosition((position) => {
      $("#latitude").value = position.coords.latitude.toFixed(6);
      $("#longitude").value = position.coords.longitude.toFixed(6);
      toast("Location captured locally.");
    }, () => toast("Location permission denied. Manual location still works.", "error"));
  });
  document.body.addEventListener("click", (event) => {
    const view = event.target.closest("[data-view]")?.dataset.view;
    if (view) scrollToPanel(view);
    const status = event.target.closest("[data-filter-status]")?.dataset.filterStatus;
    if (status) {
      setFilters({ status: status === "open" ? "Open" : status, category: "All", priority: "All" });
      scrollToPanel("issues");
    }
    const priority = event.target.closest("[data-filter-priority]")?.dataset.filterPriority;
    if (priority) {
      setFilters({ priority, status: "Open", category: "All" });
      scrollToPanel("issues");
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    const id = event.target.closest("[data-id]")?.dataset.id;
    if (action === "detail" && id) {
      state.selectedId = id;
      renderDetail();
      scrollToPanel("detail");
    }
    if (action === "close-detail") {
      state.selectedId = null;
      renderDetail();
    }
    if (action === "save-note" && id) {
      addNote(id, $("#noteText").value);
    }
  });
  document.body.addEventListener("change", (event) => {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    const id = control.dataset.id;
    if (control.dataset.action === "status") updateIssue(id, { status: control.value }, `Status changed to ${control.value}`);
    if (control.dataset.action === "priority") updateIssue(id, { priority: control.value }, `Priority changed to ${control.value}`);
    if (control.dataset.action === "team") updateIssue(id, { team: control.value }, `Assigned to ${control.value}`);
  });
  $("#metrics").addEventListener("click", (event) => {
    const status = event.target.closest("[data-status-jump]")?.dataset.statusJump;
    if (status) {
      setFilters({ status, category: "All", priority: "All" });
      scrollToPanel("issues");
    }
  });
}

function init() {
  cleanupQueryString();
  state.issues = loadIssues();
  state.selectedId = state.issues[0]?.id || null;
  bindEvents();
  render();
}

if (typeof document !== "undefined") {
  init();
}

if (typeof module !== "undefined") {
  module.exports = {
    BACKUP_TYPE,
    BACKUP_VERSION,
    CATEGORIES,
    PRIORITIES,
    STATUSES,
    TEAMS,
    normalizeIssue,
    suggestPriority,
    teamForCategory,
    createSummaryFrom(issues) {
      const previous = state.issues;
      state.issues = issues.map(normalizeIssue);
      const summary = createSummary();
      state.issues = previous;
      return summary;
    }
  };
}
