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
    .then()
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
    showPrivateInfo(user);
    allSensorAll();
    const nameUser = document.getElementById("nameUser");
    nameUser.innerHTML = `<a class="nav-link" style="color:white">${user.email}</a>`;
    const agua = document.getElementById("agua1");
    agua.style.display = "flex";
    const temp = document.getElementById("temp1");
    temp.style.display = "flex";
    const hum = document.getElementById("hum1");
    hum.style.display = "flex";
    if (user.email == "sebas_garzon@hotmail.com") {
      const admin = document.getElementById("admin");
      admin.innerHTML = `
      <div class="col text-center text-uppercase">
        <small>${user.email}</small>
        <h2>Bienvenido Admin!</h2>
      </div>`;
      admin.className += " border-bottom";
      admin.className += " border-info";
      admin.style.display = "flex";
    } else {
      const admin = document.getElementById("admin");
      admin.innerHTML = "";
      admin.style.display = "none";
    }
    return console.log("Sesion iniciada");
  }

  const agua = document.getElementById("agua1");
  agua.style.display = "none";
  const temp = document.getElementById("temp1");
  temp.style.display = "none";
  const hum = document.getElementById("hum1");
  hum.style.display = "none";
  showLoginForm();
  nameUser.innerHTML = `<a class="nav-link" style="color:white">Inicia sesion</a>`;
  privateInfo.innerHTML = `No hay nada privado que ver`;
  return console.log("No hay una sesion");
});

function showPrivateInfo(user) {
  const loginForm = document.getElementById("loginFormUI");
  loginForm.style.display = "none";
  const de = document.getElementById("error");
  const privateInfo = document.getElementById("privateInfo");
  privateInfo.style.display = "block";
  privateInfo.innerHTML = `
  
  <section class="medidas" id="agua">

  

  <div class="container measu border-bottom border-info">

  <div class="row mt-4 d-flex justify-content-center" id="admin">
     
  </div>
    <div class="row mt-4 d-flex justify-content-center " id="logOut" >
     
    </div>
    <div class="row mt-4 d-flex justify-content-center " id="dangerW" >
     
    </div>
    <div class="row mt-4 d-flex justify-content-center " id="dangerT" >
     
    </div>
    <div class="row mt-4 d-flex justify-content-center " id="asd" >

    <h2>Valores promedio:</h2><br>

    </div>

    <div class="row mt-4 d-flex justify-content-center " id="analisis" >
    </div>
    <div class="row mt-4 d-flex justify-content-center " id="analisist" >
    </div>
    <div class="row mt-4 d-flex justify-content-center " id="analisish" >
    </div>
    <div class="row mt-4">
      <div class="col text-center text-uppercase">
        <small>Medidas en tiempo real</small>
        <h2>del sensor de agua</h2>
      </div>
    </div>

    <div class="row mt-2">
      <div
        class="offset-xl-1 offset-lg-3 offset-md-2 col-12 col-xl-5 mb-4"
      >
        <div class="card">
          <iframe
            class="grafica"
            style="border: 1px solid #cccccc;"
            src="https://thingspeak.com/channels/1026873/widgets/165485"
          ></iframe>
          <div class="card-body">
            <h5 class="card-title mb-1">
              Data actual del nivel de agua
            </h5>
          </div>
        </div>
      </div>
      <div
        class="offset-xl-0 offset-lg-3 offset-md-2 col-12 col-xl-5 mb-4"
      >
        <div class="card">
          <iframe
            class="grafica"
            style="border: 1px solid #cccccc;"
            src="https://thingspeak.com/channels/1026873/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
          ></iframe>
          <div class="card-body">
            <h5 class="card-title mb-1">
              Data diaria del nivel de agua
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="medidas mt-4" id="temp">
  <div class="container border-bottom border-info">
    <div class="row mt-2">
      <div class="col text-center text-uppercase">
        <small>Medidas en tiempo real</small>
        <h2>de la temperatura</h2>
      </div>
    </div>

    <div class="row mt-2">
      <div
        class="offset-xl-1 offset-lg-3 offset-md-2 col-12 col-xl-5 mb-4"
      >
        <div class="card">
          <iframe
            class="grafica"
            style="border: 1px solid #cccccc;"
            src="https://thingspeak.com/channels/1026873/widgets/165780"
          ></iframe>
          <div class="card-body">
            <h5 class="card-title mb-1">
              Data actual de temperatura
            </h5>
          </div>
        </div>
      </div>
      <div
        class="offset-xl-0 offset-lg-3 offset-md-2 col-12 col-xl-5 mb-4"
      >
        <div class="card">
          <iframe
            class="grafica"
            style="border: 1px solid #cccccc;"
            src="https://thingspeak.com/channels/1026873/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Temperatura&type=line&xaxis=Date&yaxis=%C2%B0C"
          ></iframe>
          <div class="card-body">
            <h5 class="card-title mb-1">
              Data diaria de temperatura
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="medidas mt-4" id="hum">
  <div class="container">
    <div class="row mt-2">
      <div class="col text-center text-uppercase">
        <small>Medidas en tiempo real</small>
        <h2>de la humedad</h2>
      </div>
    </div>

    <div class="row mt-2">
      <div
        class="offset-xl-1 offset-lg-3 offset-md-2 col-12 col-xl-5 mb-4"
      >
        <div class="card">
          <iframe
            class="grafica"
            style="border: 1px solid #cccccc;"
            src="https://thingspeak.com/channels/1026873/widgets/165779"
          ></iframe>
          <div class="card-body">
            <h5 class="card-title mb-1">
              Data actual de humedad
            </h5>
          </div>
        </div>
      </div>
      <div
        class="offset-xl-0 offset-lg-3 offset-md-2 col-12 col-xl-5 mb-4"
      >
        <div class="card">
          <iframe
            class="grafica"
            style="border: 1px solid #cccccc;"
            src="https://thingspeak.com/channels/1026873/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Humedad&type=line&xaxis=Date&yaxis=Humedad+relativa"
          ></iframe>
          <div class="card-body">
            <h5 class="card-title mb-1">
              Data diaria de humedad
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  de.style.display = "none";
  const buttonOut = document.getElementById("logOut");
  if(user.email == "sebas_garzon@hotmail.com"){
    buttonOut.innerHTML = `<a href="https://io.adafruit.com/sebitil/dashboards/paw?kiosk=true" target="_blank" class="btn btn-succes btn-platzi">Adafruit IO</a>
                           <button id="btnLoad" class="btn btn-primary ml-2">Cargar datos</button>                     
                           <button id="btnLogout" class="btn btn-danger ml-2">Logout</button>`;
    const btnLoad = document.getElementById("btnLoad");
    btnLoad.addEventListener("click", allSensorAll);
  }else{
    buttonOut.innerHTML = `<a href="https://io.adafruit.com/sebitil/dashboards/paw?kiosk=true" target="_blank" class="btn btn-succes btn-platzi">Adafruit IO</a>
                         <button id="btnLogout" class="btn btn-danger ml-2">Logout</button>`;
  }
  
  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", signoutUser);
  const princi = document.getElementById("princi");
  princi.addEventListener("click", signoutUser);
  const home = document.getElementById("home");
  home.addEventListener("click", signoutUser);
}

function showLoginForm() {
  const loginForm = document.getElementById("loginFormUI");
  loginForm.style.display = "block";

  const privateInfo = document.getElementById("privateInfo");
  privateInfo.style.display = "none";
}

var db = firebase.firestore();

const opts = { crossDomain: true };

function obtenerAguaLast() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/water/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postLast(data, "Water");
    }).fail(() => reject());
  });
}

function obtenerTempLast() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/temp/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postLast(data, "Temperature");
    }).fail(() => reject());
  });
}

function obtenerHumLast() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/hum/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postLast(data, "Humidity");
    }).fail(() => reject());
  });
}

function obtenerAguaAll() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/water/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postAll(data, "Water");
    }).fail(() => reject());
  });
}

function obtenerTempAll() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/temp/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postAll(data, "Temperature");
    }).fail(() => reject());
  });
}

function obtenerHumAll() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/hum/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postAll(data, "Humidity");
    }).fail(() => reject());
  });
}

function postAll(data, sensor) {
  var conteo=0;
  var maximo=0;
  for (var i=0; i<data.length; i++){
  if(parseInt(data[i].value) != 0){
    conteo=conteo+parseInt(data[i].value);
  }
}
  for (var i=0; i<maximo; i++){
    var separador = data[i].created_at.split("T");
    var hora = separador[1].slice(0, -1);
    console.log(hora);
    console.log(data[i].value);
    console.log(separador[0]);
    
    db.collection(sensor)
    .doc(`${separador[0]} at ${hora}`)
    .set({
      fecha: `${separador[0]}`,
      hora: `${hora}`,
      valor: `${data[i].value}`,
    });
  }
  var promedio=conteo/data.length;
  console.log(promedio)
  const analisis = document.getElementById("analisis");
  const analisist = document.getElementById("analisist");
  const analisish = document.getElementById("analisish");

  const dangerW = document.getElementById("dangerW");
  const dangerT = document.getElementById("dangerT");

  if(data[0].feed_key == 'water'){
    analisis.innerHTML += `<p> Agua: ${promedio.toFixed(2)}%  </p>`+`<br>`;
    if(parseInt(data[0].value)<15){
      dangerW.innerHTML += `<div class="alert alert-danger" role="alert">
      Cuidado valor de agua bajo ${data[0].value}%
    </div>`;
    }
  }
  if(data[0].feed_key == 'temp'){
    analisist.innerHTML += `<p>Temperatura: ${promedio.toFixed(2)}°C </p>`;
 
    if(parseInt(data[0].value)>26){
      dangerT.innerHTML += `<div class="alert alert-danger" role="alert">
      Cuidado temperatura muy alta, ${data[0].value}°C
    </div>`;
    }
  }
  if(data[0].feed_key == 'hum'){
    analisish.innerHTML += `<p> Humedad: ${promedio.toFixed(2)}%  </p>`;

  }

}

function postLast(data, sensor) {
    var separador = data[0].created_at.split("T");
    var hora = separador[1].slice(0, -1);
    console.log(hora);
    console.log(data[0].value);
    console.log(separador[0]);
    db.collection(sensor)
    .doc(`${separador[0]} at ${hora}`)
    .set({
      fecha: `${separador[0]}`,
      hora: `${hora}`,
      valor: `${data[0].value}`,
    }); 
}

function allSensorLast(){
  obtenerAguaLast();
  obtenerTempLast();
  obtenerHumLast();
}

function allSensorAll(){
  obtenerAguaAll();
  obtenerTempAll();
  obtenerHumAll();
}

setInterval('allSensorLast()',30000);
