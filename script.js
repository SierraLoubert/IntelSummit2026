console.log("Script is running");

const form = document.getElementById("checkInForm");
const greeting = document.getElementById("greeting");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const waterCountDisplay = document.getElementById("waterCount");
const zeroCountDisplay = document.getElementById("zeroCount");
const powerCountDisplay = document.getElementById("powerCount");
const progressBar = document.getElementById("progressBar");
const celebrationMessage = document.getElementById("celebrationMessage");

let attendeeCount = parseInt(localStorage.getItem("attendeeCount"), 10) || 0;
let waterCount = parseInt(localStorage.getItem("waterCount"), 10) || 0;
let zeroCount = parseInt(localStorage.getItem("zeroCount"), 10) || 0;
let powerCount = parseInt(localStorage.getItem("powerCount"), 10) || 0;

updateDisplay();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const attendeeName = document.getElementById("attendeeName").value;
  const team = document.getElementById("teamSelect").value;

  attendeeCount++;

  if (team === "water") {
    waterCount++;
  } else if (team === "zero") {
    zeroCount++;
  } else if (team === "power") {
    powerCount++;
  }

  greeting.style.display = "block";
  greeting.classList.add("success-message");
  greeting.textContent = `Welcome ${attendeeName}! You checked in with ${getTeamName(team)}.`;

  saveProgress();
  updateDisplay();
  addAttendee(attendeeName, team);
  checkGoal();

  form.reset();
});

function updateDisplay() {
  attendeeCountDisplay.textContent = attendeeCount;
  waterCountDisplay.textContent = waterCount;
  zeroCountDisplay.textContent = zeroCount;
  powerCountDisplay.textContent = powerCount;

  const progress = (attendeeCount / 50) * 100;
  progressBar.style.width = `${progress}%`;
}

function saveProgress() {
  localStorage.setItem("attendeeCount", attendeeCount);
  localStorage.setItem("waterCount", waterCount);
  localStorage.setItem("zeroCount", zeroCount);
  localStorage.setItem("powerCount", powerCount);
}

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

    celebrationMessage.classList.add(
      "show-celebration"
    );

    celebrationMessage.textContent =
      `🎉 Attendance Goal Reached! Congratulations ${winningTeam}! You had the highest turnout with ${highestCount} attendees.`;

    greeting.textContent = `Attendance goal reached! ${winningTeam} has the highest turnout!`;
  }
}

function addAttendee(name, team) {
  const attendeeList = document.getElementById("attendeeList");

  if (!attendeeList) {
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = `${name} - ${getTeamName(team)}`;
  attendeeList.appendChild(listItem);
}

function getTeamName(team) {
  if (team === "water") {
    return "Team Water Wise";
  }

  if (team === "zero") {
    return "Team Net Zero";
  }

  return "Team Renewables";
}