function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      fetchUserDetails();
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}

function fetchUserDetails() {
  fetch("/users/user-details", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unauthorized");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  handleLogin();
});
