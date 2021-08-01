export const attachCellToggling = () => {
    const grid = document.getElementById("grid");
    grid.addEventListener("click", (e) => {
        const target = e.target;
        if (target.className.includes("cell")) {
            target.className =
                target.className.includes("alive") ? "cell" : "cell alive";
        }
    });
};
//# sourceMappingURL=event-listeners.js.map