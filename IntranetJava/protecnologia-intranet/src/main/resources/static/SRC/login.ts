async function login(): Promise<void> {
    const emailInput = document.getElementById("loginUser") as HTMLInputElement;
    const passInput = document.getElementById("loginPass") as HTMLInputElement;

    const email = emailInput.value;
    const password = passInput.value;

    console.log("login ejecutándose");

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "panel.html";
    } else {
        alert("Error en login");
    }
}

(window as any).login = login;