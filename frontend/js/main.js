window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  fetch("http://localhost:3031/api/movies")
    .then((response) => response.json())
    .then((peliculas) => {
      let data = peliculas.data;

      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const starIcon = document.createElement("i");
        starIcon.setAttribute("class", "fa-regular fa-star");
        starIcon.setAttribute("data-movieID", movie.id);
        starIcon.addEventListener("click", markAsFavorite);

        h1.appendChild(starIcon);

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Género: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });
    });

  // Verificar si hay películas favoritas en el storage
  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
  if (favoriteMovies && favoriteMovies.length > 0) {
    // Crear el botón de películas favoritas
    let favoritesButton = document.createElement("button");
    favoritesButton.textContent = "Mis películas favoritas";
    favoritesButton.addEventListener("click", function () {
      window.location.href = "favorites.html";
    });

    // Agregar el botón al encabezado
    let header = document.querySelector("header");
    header.appendChild(favoritesButton);
  }
};

function markAsFavorite(event) {
  const starIcon = event.target;
  const movieId = starIcon.getAttribute("data-movieID");

  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  const existingMovieIndex = favoriteMovies.findIndex((movie) => movie.id === movieId);

  if (existingMovieIndex === -1) {
    // La película no está en la lista de favoritas, la agregamos
    const movieTitle = starIcon.parentNode.textContent;
    const movieRating = starIcon.parentNode.nextElementSibling.textContent.split(":")[1].trim();
    const movieLength = starIcon.parentNode.nextElementSibling.nextElementSibling.textContent.split(":")[1].trim();

    favoriteMovies.push({
      id: movieId,
      title: movieTitle,
      rating: movieRating,
      length: movieLength
    });

    starIcon.classList.add("star-selected");
  } else {
    // La película ya está en la lista de favoritas, la quitamos
    favoriteMovies.splice(existingMovieIndex, 1);
    starIcon.classList.remove("star-selected");
  }

  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
}
