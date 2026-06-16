javascript
// Attendance counters
let attendeeCount =
  parseInt(localStorage.getItem("attendeeCount")) || 0;

let waterCount =
  parseInt(localStorage.getItem("waterCount")) || 0;

let zeroCount =
  parseInt(localStorage.getItem("zeroCount")) || 0;

let powerCount =
  parseInt(localStorage.getItem("powerCount")) || 0;

// Get page elements
const form = document.getElementById("checkInForm");
const greeting = document.getElementById("greeting");

const attendeeCountDisplay =
  document.getElementById("attendeeCount");

const waterCountDisplay =
  document.getElementById("waterCount");

const zeroCountDisplay =
  document.getElementById("zeroCount");

const powerCountDisplay =
  document.getElementById("powerCount");

const progressBar =
  document.getElementById("progressBar");

// Update page when loaded
updateDisplay();

// Listen for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const attendeeName =
    document.getElementById("attendeeName").value;

  const team =
    document.getElementById("teamSelect").value;

  // Increase total attendance
  attendeeCount++;

  // Increase selected team count
  if (team === "water") {
    waterCount++;
  } else if (team === "zero") {
    zeroCount++;
  } else if (team === "power") {
    powerCount++;
  }

  // Greeting message
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  greeting.textContent =
    `Welcome ${attendeeName}! You checked in with ${
      team === "water"
        ? "Team Water Wise"
        : team === "zero"
        ? "Team Net Zero"
        : "Team Renewables"
    }.`;

  // Save counts
  saveProgress();

  // Update page
  updateDisplay();

  // Add attendee to list
  addAttendee(attendeeName, team);

  // Check celebration
  checkGoal();

  // Clear form
  form.reset();
});

// Update all counters and progress bar
function updateDisplay() {
  attendeeCountDisplay.textContent = attendeeCount;
  waterCountDisplay.textContent = waterCount;
  zeroCountDisplay.textContent = zeroCount;
  powerCountDisplay.textContent = powerCount;

  const progress = (attendeeCount / 50) * 100;
  progressBar.style.width = `${progress}%`;
}

// Save counts to local storage
function saveProgress() {
  localStorage.setItem(
    "attendeeCount",
    attendeeCount
  );

  localStorage.setItem(
    "waterCount",
    waterCount
  );

  localStorage.setItem(
    "zeroCount",
    zeroCount
  );

  localStorage.setItem(
    "powerCount",
    powerCount
  );
}

// Celebration feature
function checkGoal() {
  if (attendeeCount >= 50) {
    let winningTeam = "Team Water Wise";
    let highestCount = waterCount;

    if (zeroCount > highestCount) {
      highestCount = zeroCount;
      winningTeam = "Team Net Zero";
    }

    if (powerCount > highestCount) {
      highestCount = powerCount;
      winningTeam = "Team Renewables";
    }

    greeting.textContent =
      `🎉 Attendance goal reached! ${winningTeam} has the highest turnout!`;
  }
}

// Attendee list feature
function addAttendee(name, team) {
  const attendeeList =
    document.getElementById("attendeeList");

  if (!attendeeList) return;

  const listItem =
    document.createElement("li");

  let teamName = "";

  if (team === "water") {
    teamName = "Team Water Wise";
  } else if (team === "zero") {
    teamName = "Team Net Zero";
  } else {
    teamName = "Team Renewables";
  }

  listItem.textContent =
    `${name} - ${teamName}`;

  attendeeList.appendChild(listItem);
}
```
html
<div class="attendee-list">
  <h3>Attendee List</h3>
  <ul id="attendeeList"></ul>
</div>
```
