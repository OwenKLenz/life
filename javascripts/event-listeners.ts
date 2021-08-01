export const attachCellToggling = () => {
  const grid = document.getElementById("grid") as HTMLDivElement;

  grid.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (target.className.includes("cell")) {
      target.className =
        target.className.includes("alive") ? "cell" : "cell alive";
    }
  })
}
