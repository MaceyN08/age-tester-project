document.addEventListener("", function () {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const list = document.getElementById("list");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
      input.value = "";
    }
  });
});