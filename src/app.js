form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input");
  const usuario = inputs[0].value;
  const password = inputs[1].value;

  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usuario, password })
  });

  const data = await response.json();

  if (response.ok) {
    // 🔥 REDIRECCIÓN
    window.location.href = "dashboard.html";
  } else {
    alert(data.mensaje);
  }
});