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