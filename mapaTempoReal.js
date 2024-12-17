var map = L.map('map').setView([39.521111, -8.089217], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var paragensCoords = [
    [40.643959, -8.638941], //aveiro
    [40.600178, -8.666425], //ílhavo
    [40.552929, -8.678053], //vagos
    [40.428381, -8.736320], //mira
    [40.148324, -8.848864], //figueira da foz 
    [40.725848, -8.366410], //sever do vouga
    [40.689300, -8.475258], //Albergaria
    [40.751342, -8.574918], //Estarreja
    [40.834232, -8.580066], //Valega
    [40.860998, -8.622156], //Ovar
];
var paragensNomes = [
    "Aveiro",
    "Camara de Ílhavo",
    "Bombeiros Vagos",
    "Mira",
    "Figueira da Foz",
    "Sever do Vouga",
    "Albergaria",
    "Estarreja",
    "Válega",
    "Ovar",
]
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

var infoLinha = [
    ["Aveiro", "Figueira da Foz", "12h50", "Camara de Ílhavo", "2 minutos", "15420e"],
    ["Aveiro", "Sever do Vouga", "11h00", "Aveiro", "0 minutos", "wer123"],
    ["Aveiro", "Ovar", "10h30", "Estarreja", "10 minutos", "f3gs21"],
]

var linhasCores = [
    "red",
    "#57a595",
    "#57a595",
]

var marker = L.marker(paragensCoords[0]).addTo(map);
var polyline = L.polyline(linhasCoords[0], { color: linhasCores[0] }).bindPopup(linhasNomes[0]).addTo(map);

$("#autocomplete").autocomplete({
    source: linhasNomes
});

$('#button-addon1').click(function(){
    map.removeLayer(marker)
    map.removeLayer(polyline)
    console.log("a")
    var linhaNome = $("#autocomplete").val();
    console.log(linhaNome)
    if (linhasNomes.includes(linhaNome)){
        $("#card").addClass("d-block");
        $("#card").removeClass("d-none");
        var i = linhasNomes.indexOf(linhaNome);
        polyline = L.polyline(linhasCoords[i], {color: linhasCores[i]}).bindPopup(linhasNomes[i]).addTo(map);
        $("#linha").text(linhasNomes[i]);

        $("#origem").text(infoLinha[i][0])
        $("#destino").text(infoLinha[i][1])
        $("#hora_prevista").text(infoLinha[i][2])
        $("#paragem").text(infoLinha[i][3])
        $("#atraso").text(infoLinha[i][4])
        $("#id_viagem").text(infoLinha[i][5])
        
        console.log(paragensNomes.indexOf[infoLinha[i][3]])
        var paragemAtual = paragensNomes.indexOf[infoLinha[i][3]];
        marker = L.marker(paragensCoords[paragemAtual]).addTo(map);
        
    }
    else{
        $("#card").addClass("d-none");
        $("#card").removeClass("d-block");
        alert("Linha não encontrada, tente novamente");
    }
});
