const $login = document.getElementById("login_input");
const $password = document.getElementById("password_input");
const $loginButton = document.getElementById("login_button");
const $loginError = document.getElementById("login_error");
// https://login-service-wsb-wj.netlify.app/.netlify/functions/login

// const loginHandler = async () => {
//   const password = $password.value;
//   const login = $login.value;

//   const response = await fetch(
//     "https://login-service-wsb-wj.netlify.app/.netlify/functions/login",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         login,
//         password,
//       }),
//     }
//   );

//   const responseParsed = await response.json();

//   if (responseParsed.isLogged) {
//     window.location.href = "./mainScreen.html";
//   } else {
//     $loginError.classList.remove("not_visible");
//   }
// };

const loginHandler = () => {
  const password = $password.value;
  const login = $login.value;

  //body
  //'login':login
  //'password': password

  fetch("https://login-service-wsb-wj.netlify.app/.netlify/functions/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.isLogged) {
        localStorage.setItem("isLoggedIn", "yes");
        window.location.href = "./mainScreen.html";
      } else {
        $loginError.classList.remove("not_visible");
      }

      /// przekierowac jak poprawny login
      /// jak niepoprawny - pokazac login z #login_error

      //window.location.href ="./mainScreen.html");
    });

  //if(password ==="asd" && login ==="007"){
  //console.log: ("jestem");

  //window.location.href ="/.mainScreen.html:)"

  //alert(`Login to: ${login}, a hasło ma ${password.length} liter`)
};

$loginButton.addEventListener("click", loginHandler);

//$password.addEventListener("keydown", (e) => {
//if (else.key ==="Enter"){
//     loginHandler();
//   };
//});
