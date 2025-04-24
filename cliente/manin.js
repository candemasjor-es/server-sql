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

const getCities = () => {
  fetch(base_url + "/cities")
    .then((res) => res.json())
    .then((cities) => {
      const citiesContainer = document.getElementById("citiesContainer");
      citiesContainer.innerHTML = "";

      cities.forEach((cities) => {
        citiesContainer.innerHTML += `
          <h2>${cities.name} - country: ${cities.country} <button onclick="deleteCities(${cities.id})">Eliminar</button> </h2>
        `;
      });
    });
};

const deleteCities = (citiesId) => {
  fetch(base_url + "/cities/" + citiesId, {
    method: "DELETE",
  }).then(() => getCities());
};

const postCities = () => {
  const citiesName = document.getElementById("nameCities").value;
  const citiesCountry = document.getElementById("country").value;

  fetch(base_url + "/Cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: citiesName,
      country: citiesCountry,
    }),
  }).then(() => getCities());
};

getCities();
