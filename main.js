function toggleStyle(id) {
  // Get all three buttons
  const buttons = document.querySelectorAll(
    "#all-filter-btn, #open-filter-btn, #closed-filter-btn"
  );

    // Remove  style from all buttons
  for (const btn of buttons) {
    btn.classList.remove("bg-blue-800", "text-white");
    btn.classList.add("bg-white", "text-gray-500");
  }

  // Add  style to clicked button
  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.remove("bg-white", "text-gray-500");
  selectedBtn.classList.add("bg-blue-800", "text-white");
};

// 1 Load All Issues
async function loadAllIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  displayIssues(data.data); 
}

loadAllIssues();

// 2 Display Issues as Cards
function displayIssues(issues) {

  const container = document.getElementById("issues-container");
  container.innerHTML = "";

  issues.forEach(issue => {
    let borderColor = "";
    if(issue.priority === "high" || issue.priority === "medium"){
      borderColor = "border-green-700";
    } else {
      borderColor = "border-purple-500"; 
    }

    const card = document.createElement("div");
    card.className = `border-t-4 ${borderColor} rounded-lg p-4 cursor-pointer`;

   

card.innerHTML = `

<div class="bg-white rounded-lg p-4 shadow-sm space-y-3">

  <!-- Top Row -->
  <div class="flex justify-between items-center">
<span class="badge badge-soft badge-warning">${issue.priority == "high" || issue.priority =="medium" ? `<img src="./assets/Open-Status.png" alt=""> </img>`: `<img src="./assets/Closed- Status .png" alt=""></img> ` }</span>

<span class="badge badge-soft badge-warning">${issue.priority ? issue.priority.toUpperCase() : ""}</span>
</div>

<div class="">
    <h3 class="font-bold text-xl">${issue.title}</h3>
    <p class="text-[12px] text-[#647488] line-clamp-2">${issue.description}</p>

</div>

<div class="flex justify-center">
<span class="badge badge-soft badge-warning rounded-lg inline-block bg-yellow-200 text-xs">
  ${issue.labels[0] ? issue.labels[0].toUpperCase() : ""}
</span>

<span class="badge badge-soft badge-warning rounded-lg inline-block bg-yellow-200 text-xs">
  ${issue.labels[1] ? issue.labels[1].toUpperCase() : ""}
</span>

</div>

<div class ="border-t-2 mt-10 border-gray-200">
<p># ${issue.id} by ${issue.author}</p>
<p>${issue.assignee}</p> 
</div>
<div class ="border-t-2 mt-5 border-gray-200 gap-3">
<p>${new Date(issue.createdAt).toLocaleDateString()}</p>
<p>${new Date(issue.updatedAt).toLocaleDateString()}</p>
</div>



`;

    card.addEventListener("click", () => loadSingleIssue(issue.id));

    container.appendChild(card);
  });
}

// 3 Load Single Issue (Modal)
async function loadSingleIssue(id) {

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json();

  const issue = data.data;

  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-description").innerText = issue.description;
const statusElement = document.getElementById("modal-status");

statusElement.innerText = issue.status;

if (issue.status === "open") {
  statusElement.className = "bg-green-300 px-2 py-1 rounded";
} else {
  statusElement.className = "bg-purple-300 px-2 py-1 rounded";
}
  

  // format date
  const date = new Date(issue.createdAt).toLocaleDateString();
  document.getElementById("modal-date").innerText = date;

  // labels
  const labelsContainer = document.getElementById("modal-labels");
  labelsContainer.innerHTML = "";

  issue.labels.forEach(label => {
    const span = document.createElement("span");
    span.className = "px-2 py-1 bg-yellow-200 rounded text-xs";
    span.innerText = label;
    labelsContainer.appendChild(span);})

    document.getElementById("modal-assignee").innerText = issue.assignee;
    document.getElementById("modal-priority").innerText = issue.priority;
  document.getElementById("issue-modal").classList.remove("hidden");
  
  
}

function closeModal(){
  document.getElementById("issue-modal").classList.add("hidden");
}

// 4 Search Issues
async function searchIssues() {

  const text = document.getElementById("search-input").value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
  );

  const data = await res.json();

  displayIssues(data.data);
}
