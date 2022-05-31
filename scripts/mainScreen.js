const $logout = document.getElementById("logout");
const $countryButton = document.getElementById("country_button");
const $countryInput = document.getElementById("country_input");
const $generateButton = document.getElementById("generate_id");
const $toggleButton = document.getElementById("toggle_screen");

$toggleButton.addEventListener("click", () => {
  document.getElementById("general_screen").classList.toggle("hidden");
  document.getElementById("notes_screen").classList.toggle("hidden");
});

var map = L.map("map").setView([0, 0], 4);
L.tileLayer(
  "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=koI3Eq6h6YytdTjBWVbH",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);
//var marker = L.marker([51.5, -0.09]).addTo(map);

const logout = () => {
  localStorage.setItem("isLoggedIn", "no");
  window.location.href = "/";
};

const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "yes") {
  logout();
}

const searchCountry = () => {
  const country = $countryInput.value;
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.json())
    .then((res) => {
      const country = res[0];

      //debugger// mozemy przejsc krok po kroku po apce w dev toolsach
      if (country) {
        const capital = country.capital.join(","); //join. łączy nam w stringa wszystkie wartsci//
        const fulllName = country.name.official;
        const population = country.population;

        document.getElementById("country_fullname").innerText = fulllName;
        document.getElementById("country_population").innerText = population;
        document.getElementById("country_capital").innerText = capital;

        map.panTo(country.latlng, { animate: true, duration: 1.0 });
      }
      console.log(res);
    });
};
$generateButton.addEventListener("click", () => {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const newName =
        res.results[0].name.first + " " + res.results[0].name.last;
      const email = res.results[0].email;
      const avatar = res.results[0].picture.medium;

      document.getElementById("new_email").innerText = email;
      document.getElementById("new_name").innerText = newName;
      document.getElementById("new_picture").src = avatar;
    });
});
$logout.addEventListener("click", logout);
$countryButton.addEventListener("click", searchCountry);
