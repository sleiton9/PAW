$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// TODO: Replace the following with your app's Firebase project configuration
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
var db = firebase.firestore();

const opts = { crossDomain: true };


function obtenerAgua() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/water/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postLast(data, "Water");
    }).fail(() => reject());
  });
}

function obtenerTemp() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/temp/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postLast(data, "Temperature");
    }).fail(() => reject());
  });
}

function obtenerHum() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/hum/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
      postLast(data, "Humidity");
    }).fail(() => reject());
  });
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

function allSensor(){
  obtenerAgua();
  obtenerTemp();
  obtenerHum();
}

setInterval('allSensor()',30000);