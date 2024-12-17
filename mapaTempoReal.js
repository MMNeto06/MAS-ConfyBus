var marker;
var polyline;

var linhasCoords = [
    [
        [40.643959, -8.638941],
        [40.600178, -8.666425],
        [40.552929, -8.678053],
        [40.428381, -8.736320],
        [40.148324, -8.848864]
    ],
    [
        [40.725848, -8.366410],
        [40.689300, -8.475258],
        [40.643959, -8.638941],
    ],
    [
        [40.860998, -8.622156],
        [40.834232, -8.580066],
        [40.751342, -8.574918],
        [40.643959, -8.638941],
    ]
]

var linhasNomes = [
    "Linha 18: Aveiro - Figueira da Foz",
    "Linha 37: Aveiro - Sever do Vouga",
    "Linha 33: Aveiro - Ovar"
]

var linhasCores = [
    "red",
    "#57a595",
    "#57a595",
]

var linhasIds = [
    "15420e",
    "wer123",
    "f3gs21",
]

var map = L.map('map').setView([39.521111, -8.089217], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$("#autocomplete").autocomplete({
    source: linhasNomes
});

$('#button-addon1').click(function(){
    console.log("a")
    var linhaNome = $("#autocomplete").val();
    console.log(linhaNome)
    if (linhasNomes.includes(linhaNome)){
        $("#card").addClass("d-block");
        $("#card").removeClass("d-none");
        var indexLst = linhasNomes.indexOf(linhaNome);
        polyline = L.polyline(linhasCoords[indexLst], {color: linhasCores[indexLst]}).bindPopup(linhasNomes[indexLst]).addTo(map);
        $("#linha")
    }
    else{
        $("#card").addClass("d-none");
        $("#card").removeClass("d-block");
        alert("Linha não encontrada, tente novamente");
    }
});
