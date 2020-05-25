var firebaseConfig = {
  apiKey: "AIzaSyCA8-NDhlM85BMlOm_jTx6MNP46yH5RX-A",
  authDomain: "idloginpaw.firebaseapp.com",
  databaseURL: "https://idloginpaw.firebaseio.com",
  projectId: "idloginpaw",
  storageBucket: "idloginpaw.appspot.com",
  messagingSenderId: "105044088870",
  appId: "1:105044088870:web:97cf25ff2b2ae471ab2ee7",
  measurementId: "G-SJYS1XCGCY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const form = document.forms["loginForm"];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = form["email"].value;
  const password = form["password"].value;
  const isLoginOrSignup = form["isLoginOrSignup"].value;

  if (isLoginOrSignup === "isLogin") {
    return loginUser(email, password);
  }

  return createUser(email, password);
});

function createUser(email, password) {
  console.log("Creando el usuario con email " + email);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log("¡Creamos al usuario!");
    })
    .catch(function (error) {
      const de = document.getElementById("error");
      de.style.display = "block";

      de.innerHTML = `${error.message}`;
    });
}

function loginUser(email, password) {
  console.log("Loging user " + email);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      const correcto = document.getElementById("correcto");
      correcto.innerHTML = `<p>Credenciales correctas, ¡bienvenido! ${email}</p>`;
    })
    .catch(function (error) {
      const de = document.getElementById("error");
      de.style.display = "block";

      de.innerHTML = `${error.message}`;
    });
}

function signoutUser() {
  const privateInfo = document.getElementById("privateInfo");
  firebase.auth().signOut();
  privateInfo.style.display = "none";
}

firebase.auth().onAuthStateChanged(function handleAuthState(user) {
  if (user) {
    showPrivateInfo();
    return console.log("Habemus user 🎉");
  }

  showLoginForm();
  return console.log("No habemus user 😭");
});

function showPrivateInfo(user) {
  const loginForm = document.getElementById("loginFormUI");
  loginForm.style.display = "none";
  const de = document.getElementById("error");
  const privateInfo = document.getElementById("privateInfo");
  privateInfo.style.display = "block";
  de.style.display = "none";
  const buttonOut = document.getElementById("logOut");
  buttonOut.innerHTML = `<a href="https://io.adafruit.com/sebitil/dashboards/paw?kiosk=true" target="_blank" class="btn btn-succes btn-platzi">Adafruit IO</a>
                         <button id="btnLogout" class="btn btn-danger ml-2">Logout</button>`;
  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", signoutUser);
}

function showLoginForm() {
  const loginForm = document.getElementById("loginFormUI");
  loginForm.style.display = "block";

  const privateInfo = document.getElementById("privateInfo");
  privateInfo.style.display = "none";
}
