const yearElement = document.querySelector("#year");
const filterButtons = document.querySelectorAll(".filter");
const workCards = document.querySelectorAll(".work-card");
const emptyState = document.querySelector(".empty-state");
const toolButtons = document.querySelectorAll(".tool-rail span");
const workGrid = document.querySelector(".work-grid");

yearElement.textContent = new Date().getFullYear();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    let visibleCount = 0;

    workCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);
      card.classList.toggle("hidden", !shouldShow);
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  });
});

const toolActions = [
  { name: "top", target: "#top" },
  { name: "work", target: "#work" },
  { name: "internship", target: "#internship" },
  { name: "skills", target: "#skills" },
  { name: "about", target: "#about" },
  { name: "contact", target: "#contact" },
  { name: "zoom" },
];

toolButtons.forEach((button, index) => {
  button.setAttribute("role", "button");
  button.setAttribute("tabindex", "0");
  if (index === 0) {
    button.classList.add("active");
  }

  const runTool = () => {
    const action = toolActions[index];

    toolButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (action.name === "zoom") {
      workGrid?.classList.toggle("zoomed");
      document.querySelector("#work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    workGrid?.classList.remove("zoomed");
    document.querySelector(action.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  button.addEventListener("click", runTool);
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      runTool();
    }
  });
});
