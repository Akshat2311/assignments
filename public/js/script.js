document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const title = button.getAttribute("data-title");
      const year = button.getAttribute("data-year");
      const poster = button.getAttribute("data-poster");

      try {
        const response = await axios.post("/favorite", { title, year, poster });
        alert(response.data.message);
      } 
      catch (error) {
        console.error(error);
        alert("An error occurred while adding to favorites.");
      }
    });
  });
});
