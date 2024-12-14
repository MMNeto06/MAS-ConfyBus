$(document).ready(function(){
    var paragens = [];

    var map = L.map('map').setView([39.521111, -8.089217], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var mapParagem = L.map('mapParagem').setView([39.521111, -8.089217], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapParagem);

    $('#paragem').click(function () {
        console.log('adiconar nova paragem');
    });

    $("#paragemModal").modal.on('shown.bs.modal', function () {
        setTimeout(function () {
            mapParagem.invalidateSize();
        }, 1);
    });

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng)
        console.log(e.latlng);
    }

    map.on('click', onMapClick)
    mapParagem.on('click', onMapClick);


    $('#addParagem').click(function () {
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var name = $("#name").val();

        if (parseFloat(lat) && parseFloat(lon) && name != "") {
            console.log(lat, lon, name);
            $("#paragemModal").modal('hide');
        }
        else {
            alert("Faltam dados para adicionar a paragem")
        }
    });
});
