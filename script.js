function fetchGitHubRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        // Handle case where user is not found
        throw new Error("User not found. Please check the username.");
      } else {
        // Handle other network response errors
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      if (data.length === 0) {
        // Handle case where user has no repositories
        console.warn("User has no repositories.");
      }

      // Save the data in sessionStorage
      localStorage.setItem(`${username}Repos`, JSON.stringify(data));

      // Redirect to results page with userName as a search parameter
      window.location.href = `results.html?user=${encodeURIComponent(
        username
      )}`;
    })
    .catch((error) => {
      // Handle general fetch error
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );

      // Handle specific error cases
      if (error.message.includes("User not found")) {
        // Display user-friendly message for user not found
        alert("User not found. Please check the username.");
        document
          .getElementById("transitionBoxSearchPage")
          .classList.remove("translate-x-0");
        document
          .getElementById("transitionBoxSearchPage")
          .classList.add("-translate-x-[2000px]");
      } else {
        // Display a generic error message for other errors
        alert("An error occurred while fetching data. Please try again later.");
        document
          .getElementById("transitionBoxSearchPage")
          .classList.remove("translate-x-0");
        document
          .getElementById("transitionBoxSearchPage")
          .classList.add("-translate-x-[2000px]");
      }
    });
}

// transition animation logic for transitionBoxSearchPage
document.getElementById("searchButton").addEventListener("click", function () {
  // Get the input field value
  var userName = document.getElementById("userNameInput").value;

  if (!userName.trim()) {
    // Handle case where input field is empty
    alert("Please enter a GitHub username.");
    return;
  }

  // Remove the initial translate class
  document
    .getElementById("transitionBoxSearchPage")
    .classList.remove("-translate-x-[2000px]");
  document
    .getElementById("transitionBoxSearchPage")
    .classList.add("translate-x-0");

  // Pass the userName to the fetchGitHubRepos function
  fetchGitHubRepos(userName);
});
