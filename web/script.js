//Funciones para la geolocalización
function iniciarMap(){
    var coord = {lat: -31.42797, lng: -62.08266};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom:10,
        center: coord
    })

    var marker = new  google.maps.Marker({
        position: coord,
        map: map
      }); 
}

//Funcionalidad de las ventanas emergentes para el turno

let modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function(btn) {
  btn.onclick = function() {
    let modal = btn.getAttribute('data-modal');
    document.getElementById(modal)
      .style.display = "block";
  }
});
let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn) {
  btn.onclick = function() {
    let modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});
window.onclick = function(event) {
  if(event.target.className === "modal") {
    event.target.style.display = "none";
  }
}
/*
// Horario disponible
var horarioDisponible=”08:30-20:30″;    // Formato del horario – HH:MM-HH:MM
// Intervalos de tiempo
var periodo=180;    // Tiempo de los intervalos en minutos
// Comparamos las horas
function compararHora(hora1, hora2){
auxHora1=hora1.split(“:”);
auxHora2=hora2.split(“:”);
var h1 = parseInt(auxHora1[0], 10);
var m1 = parseInt(auxHora1[1], 10);
var h2 = parseInt(auxHora2[0], 10);
var m2 = parseInt(auxHora2[1], 10);
if (h1<h2 || (h1==h2 && m1<m2))
return true;
else
return false;
}
// Obtenemos los intervalos de tiempo de cada dia
function verHorario(horario, intervalo, verHorario, fecha){
var auxHorario=horario.split(“-“);
var horaApertura=auxHorario[0].split(“:”);
var horaCierre=auxHorario[1].split(“:”);
var hora=new Date();
hora.setHours(horaApertura[0], horaApertura[1], 0);
var intervalos=””;
while(compararHora(hora.getHours()+”:”+hora.getMinutes(), auxHorario[1])){
intervalos+=”<div>”;
if(verHorario){
intervalos+=hora.getHours()+”:”+hora.getMinutes()+”<br>&nbsp;”;
}else{
var diaReserva=fecha.getDate()+”/”+fecha.getMonth()+”/”+(fecha.getYear()+1900);
var horaReserva=hora.getHours()+”:”+hora.getMinutes();
intervalos+=”<a href=” onClick=’alert()’>”+horaReserva+”<br>”+diaReserva+”</a>”;
}
intervalos+=”</div>”;
hora.setHours(hora.getHours(), hora.getMinutes()+intervalo, 0);
}
return intervalos;
}
// Visualizamos la cabecera con el nombre del dia, la fecha y los intervalos de tiempo
function verDia(fecha){
var diasSemana=[“domingo”, “lunes”, “martes”, “miercoles”, “jueves”, “viernes”, “sabado”];
var fechaDia=fecha.getDate()+”/”+fecha.getMonth()+”/”+(fecha.getYear()+1900);
var dia=”<div class=’dia’><div>”+diasSemana[fecha.getUTCDay()]+”<br>”+fechaDia+”</div>”;
dia+=verHorario(horarioDisponible, periodo, false, fecha);
dia+=”</div>”;
document.getElementById(“calendario”).innerHTML+=dia;
}
// Visualizamos los 7 dias siguientes al actual
function verSemana(){
var fecha=new Date();
document.getElementById(“calendario”).innerHTML+=”<div class=’dia’><div>HORARIO<br>”+horarioDisponible+”</div>”+verHorario(horarioDisponible, periodo, true, fecha)+”</div>”;
for(var i=0; i<7; i++){
verDia(fecha);
fecha.setDate(fecha.getDate()+1);
}
}*/
