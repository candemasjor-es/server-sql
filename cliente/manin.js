//const url = prompt("Ingres Url");

//fetch(`http://localhost:8080/${url}`)
//  .then((res) => res.json())
//  .then((data) => {
//    const titulos = document.getElementById("url");
//    titulos.innerHTML = `dominio ingresado:${data.url}
//        <p>method: ${data.method}</p>
//        <p>mensajes: ${data.mensajes}</p>
//        `;
//  });
const base_url = "http://localhost:3000";
let currentEditId = null;

const getCities = () => {
  fetch(base_url + "/cities")
    .then((res) => res.json())
    .then((cities) => {
      const citiesContainer = document.getElementById("citiesContainer");
      citiesContainer.innerHTML = "";

      cities.forEach((city) => {
        const cityCard = document.createElement("div");
        cityCard.className = "city-card";
        cityCard.innerHTML = `
                    <div class="city-name">${city.name}</div>
                    <div class="city-country">País: ${city.country}</div>
                    <div class="city-actions">
                        <button class="btn btn-edit" onclick="openEditModal(${city.id}, '${city.name}', '${city.country}')">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger" onclick="deleteCities(${city.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                `;
        citiesContainer.appendChild(cityCard);
      });
    })
    .catch((error) => {
      console.error("Error al obtener ciudades:", error);
      alert("Error al cargar las ciudades. Por favor, intente nuevamente.");
    });
};

const deleteCities = (cityId) => {
  if (confirm("¿Está seguro que desea eliminar esta ciudad?")) {
    fetch(base_url + "/cities/" + cityId, {
      method: "DELETE",
    })
      .then(() => getCities())
      .catch((error) => {
        console.error("Error al eliminar ciudad:", error);
        alert("Error al eliminar la ciudad. Por favor, intente nuevamente.");
      });
  }
};

const postCities = () => {
  const citiesName = document.getElementById("nameCities").value.trim();
  const citiesCountry = document.getElementById("country").value.trim();

  if (!citiesName || !citiesCountry) {
    alert("Por favor complete todos los campos");
    return;
  }

  fetch(base_url + "/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: citiesName,
      country: citiesCountry,
    }),
  })
    .then(() => {
      getCities();

      document.getElementById("nameCities").value = "";
      document.getElementById("country").value = "";
    })
    .catch((error) => {
      console.error("Error al añadir ciudad:", error);
      alert("Error al añadir la ciudad. Por favor, intente nuevamente.");
    });
};

const openEditModal = (id, name, country) => {
  currentEditId = id;
  document.getElementById("editNameCities").value = name;
  document.getElementById("editCountry").value = country;
  document.getElementById("modal").style.display = "block";
};

const updateCity = () => {
  const nameToUpdate = document.getElementById("editNameCities").value.trim();
  const countryToUpdate = document.getElementById("editCountry").value.trim();

  if (!nameToUpdate || !countryToUpdate) {
    alert("Por favor complete todos los campos");
    return;
  }

  fetch(base_url + "/cities/" + currentEditId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameToUpdate,
      country: countryToUpdate,
    }),
  })
    .then(() => {
      getCities();
      closeModal();
    })
    .catch((error) => {
      console.error("Error al actualizar ciudad:", error);
      alert("Error al actualizar la ciudad. Por favor, intente nuevamente.");
    });
};

const closeModal = () => {
  document.getElementById("modal").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  getCities();

  document.getElementsByClassName("close")[0].onclick = closeModal;

  window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  };
});
