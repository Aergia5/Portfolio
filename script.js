const yearElement = document.querySelector("#year");
const filterButtons = document.querySelectorAll(".filter");
const workCards = document.querySelectorAll(".work-card");
const emptyState = document.querySelector(".empty-state");

yearElement.textContent = new Date().getFullYear();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    let visibleCount = 0;

    workCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
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
