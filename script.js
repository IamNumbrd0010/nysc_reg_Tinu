// PAGE REFERENCES
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const jobListPage = document.getElementById("jobListPage");

// LOGIN
const loginBtn = document.getElementById("loginBtn");
const stateCodeInput = document.getElementById("stateCode");
const welcomeText = document.getElementById("welcomeText");

// PROGRESS
const dashboardProgressText = document.getElementById("dashboardProgressText");
const dashboardProgressFill = document.getElementById("dashboardProgressFill");
const jobProgressText = document.getElementById("jobProgressText");
const jobProgressFill = document.getElementById("jobProgressFill");

// NAV
const openJobList = document.getElementById("openJobList");
const backBtn = document.getElementById("backBtn");

// STEPS
const stepsContainer = document.getElementById("stepsContainer");

// STEP DATA
const steps = [
  { title: "Checking In (Bag Search)", description: "Security screening before entering camp.", location: "Camp Gate" },
  { title: "Accommodation Allocation", description: "Assignment of hostel and bed space.", location: "Ladies: Hostel A | Guys: Under the Tree" },
  { title: "Collection of Meal Tickets", description: "Receive meal tickets for camp feeding.", location: "Ticket Stand" },
  { title: "Verification of Call-Up Letter", description: "Confirmation of call-up letter.", location: "Auditorium Entrance" },
  { title: "ICT Biometric Capturing", description: "Fingerprint and biometric capture.", location: "Inside Auditorium" },
  { title: "Opening of File", description: "Creation of official NYSC file.", location: "Registration Area" },
  { title: "BVN & NIN Verification", description: "Verification of BVN and NIN.", location: "Bank Stand" },
  { title: "Submission of NIN Slip", description: "Submit NIN slip for record.", location: "Registration Desk" },
  { title: "Platoon Assignment", description: "Assignment to platoon.", location: "Platoon Stand" },
  { title: "Collection of NYSC Kits", description: "Collect khaki, boots, and kits.", location: "Platoon Officer Stand" },
  { title: "Opening of Bank Account", description: "Create account for allowance.", location: "Bank Desk" },
  { title: "Final Clearance & ID Processing", description: "Final verification and ID processing.", location: "ICT / Admin Block" }
];

let completedSteps = JSON.parse(localStorage.getItem("completedSteps")) || [];

// LOGIN
loginBtn.onclick = () => {
  const code = stateCodeInput.value.trim();
  if (!code) return alert("Enter your State Code");
  localStorage.setItem("stateCode", code);
  showDashboard();
};

// NAVIGATION
function showDashboard() {
  loginPage.classList.add("hidden");
  jobListPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");

  welcomeText.textContent = `Welcome, ${localStorage.getItem("stateCode")}`;
  updateProgress();
}

openJobList.onclick = () => {
  dashboardPage.classList.add("hidden");
  jobListPage.classList.remove("hidden");
  renderSteps();
  updateProgress();
};

backBtn.onclick = showDashboard;

// RENDER STEPS
function renderSteps() {
  stepsContainer.innerHTML = "";

  steps.forEach((step, index) => {
    const card = document.createElement("div");
    card.className = "step-card";

    const left = document.createElement("div");
    left.className = "step-left";

    // Placeholder for image
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder-img";
    placeholder.textContent = "Image";

    const text = document.createElement("div");

    const title = document.createElement("h4");
    title.textContent = step.title;

    const desc = document.createElement("p");
    desc.textContent = step.description;

    const loc = document.createElement("small");
    loc.textContent = `Location: ${step.location}`;

    text.appendChild(title);
    text.appendChild(desc);
    text.appendChild(loc);

    left.appendChild(placeholder);
    left.appendChild(text);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completedSteps.includes(index);

    checkbox.onchange = () => {
      if (checkbox.checked) {
        completedSteps.push(index);
      } else {
        completedSteps = completedSteps.filter(i => i !== index);
      }
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      updateProgress();
    };

    card.appendChild(left);
    card.appendChild(checkbox);
    stepsContainer.appendChild(card);
  });
}

// PROGRESS
function updateProgress() {
  const total = steps.length;
  const completed = completedSteps.length;
  const percent = Math.round((completed / total) * 100);

  dashboardProgressText.textContent = `${completed} of ${total} steps completed`;
  jobProgressText.textContent = `${completed} of ${total} steps completed`;

  dashboardProgressFill.style.width = percent + "%";
  jobProgressFill.style.width = percent + "%";
}

// // AUTO LOGIN
// if (localStorage.getItem("stateCode")) {
//   showDashboard();
// }
