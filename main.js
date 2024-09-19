const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const block = button.closest(".deserts-block"); // Znajdujemy najbliższego rodzica 'deserts-block'
    const img = block.querySelector(".desert-img"); // Znajdujemy obrazek w tym samym bloku
    img.style.border = "1px solid var(--red)"; // Zmieniamy tylko ten border
  });
});
