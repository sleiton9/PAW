var salida= document.getElementById("parrafo");

function onError(id){
  var texto= document.createTextNode(`Error 404, no se encuentra el personaje ${id}`);
    var br= document.createElement("br");
    salida.appendChild(texto)
    salida.appendChild(br)
}

const API_URL="https://swapi.co/api/"
const PEOPLE_URL="people/:id"
const opts = { crossDomain: true }

function obtenerPersonaje (id){
  return new Promise((resolve, reject) =>{
      const url =`${API_URL}${PEOPLE_URL.replace(":id", id)}`
      $
      .get(url, opts, function(data){
        resolve(data)
      })
      .fail(()=>reject(id))
  })
}

async function obtenerPersonajes(){
  var ids = [1,2,3,4,5,6,7,8]
  var promesas= ids.map(id=>obtenerPersonaje(id))
  try{
    var personaje = await Promise.all(promesas)
    for(var i=0; i<personaje.length; i++){
      var texto= document.createTextNode(`Hola, yo soy ${personaje[i].name}`);
      var br= document.createElement("br");
      salida.appendChild(texto)
      salida.appendChild(br)
      }
  }catch(id){
    onError(id)
  }

}

obtenerPersonajes()
