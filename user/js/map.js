let map = new L.Map("myMap", {center: [40.633258,-8.659097],zoom: 15});
let osmUrl="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let osmAttrib="Map data OpenStreetMap contributors";
let osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
map.addLayer(osm);

function showCoordinates(e){
    var s = document.getElementById("coordinates");
    s.innerHTML = "Latitude = "+e.latlng.lat+", Longitude = "+e.latlng.lng;
}


map.on("click", showCoordinates)