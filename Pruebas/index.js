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
      console.log(data)
      new Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'myfirstchart',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: data,
        // The name of the data record attribute that contains x-values.
        xkey: 'year',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['value'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['Value']
      });

    }).fail(() => reject());
  });
}

function obtenerTemp() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/temp/data/`;
    $.get(url, opts, function (data) {
      resolve(data);

    }).fail(() => reject());
  });
}

function obtenerHum() {
  return new Promise((resolve, reject) => {
    const url = `https://io.adafruit.com/api/v2/sebitil/feeds/hum/data/`;
    $.get(url, opts, function (data) {
      resolve(data);
    }).fail(() => reject());
  });
}

function post(data, sensor) {
  var conteo=0;
  var maximo=10;
  for (var i=0; i<maximo; i++){
    var separador = data[i].created_at.split("T");
    var hora = separador[1].slice(0, -1);
    if(parseInt(data[i].value) != 0){
      conteo=conteo+parseInt(data[i].value);
    }
    db.collection(sensor)
    .doc(`${separador[0]} at ${hora}`)
    .set({
      fecha: `${separador[0]}`,
      hora: `${hora}`,
      valor: `${data[i].value}`,
    });
  }
}



obtenerAgua();
obtenerTemp();
obtenerHum();
