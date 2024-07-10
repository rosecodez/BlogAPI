const { DateTime } = luxon;

function displayPosts(array) {
  const posts = document.getElementById("posts");
  array.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");

    const title = document.createElement("h4");
    title.setAttribute("id", "title");
    postContainer.appendChild(title);

    const text = document.createElement("p");
    text.setAttribute("id", "text");
    postContainer.appendChild(text);

    const timestamp = document.createElement("p");
    timestamp.setAttribute("id", "timestamp");
    postContainer.appendChild(timestamp);

    const published = document.createElement("p");
    published.setAttribute("id", "published");
    postContainer.appendChild(published);

    title.textContent = post.title;
    text.textContent = post.text;

    if (post.timestamp) {
      timestamp.textContent = DateTime.fromISO(post.timestamp).toLocaleString(
        DateTime.DATE_MED
      );
    }

    posts.appendChild(postContainer);
  });
}

fetch("http://localhost:3000/posts", { mode: "cors" })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displayPosts(data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

const jwtToken = localStorage.getItem("token");

async function loginUser() {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    window.location.href = "/users/user-details";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}

// Form submission handler
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    await loginUser();
  });
