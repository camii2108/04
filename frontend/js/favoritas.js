window.onload = () => {
  const favoritesContainer = document.getElementById("favoritesContainer");

  // Obtener las películas favoritas del almacenamiento local
  const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));

  if (favoriteMovies === null || favoriteMovies.length === 0) {
    // Si no hay películas favoritas, mostrar un mensaje indicando que no hay nada
    favoritesContainer.innerHTML = "<p>Aún no tienes películas favoritas.</p>";
  } else {
    // Si hay películas favoritas, crear elementos HTML para cada una y agregarlos al contenedor
    favoriteMovies.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(duracion);

      favoritesContainer.appendChild(card);
    });
  }
};
