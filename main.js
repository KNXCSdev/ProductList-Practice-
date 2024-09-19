const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const block = button.closest(".deserts-block"); // Znajdujemy najbliższego rodzica 'deserts-block'
    const img = block.querySelector(".desert-img"); // Znajdujemy obrazek w tym samym bloku
    img.classList.toggle("borderchange"); // Zmieniamy tylko ten border
    button.classList.toggle("clicked");
  });
});
