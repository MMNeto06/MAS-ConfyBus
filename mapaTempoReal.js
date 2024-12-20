$(document).ready(function(){
    
    var marker;
    var polyline;

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
    ];

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
    ];

    var linhasNomes = [
        "Linha 18: Aveiro - Figueira da Foz",
        "Linha 37: Aveiro - Sever do Vouga",
        "Linha 33: Aveiro - Ovar"
    ];

    var infoLinha = [
        ["Aveiro", "Figueira da Foz", "12h50", "Camara de Ílhavo", "2 minutos", "15420e"],
        ["Aveiro", "Sever do Vouga", "11h00", "Aveiro", "0 minutos", "wer123"],
        ["Aveiro", "Ovar", "10h30", "Estarreja", "10 minutos", "f3gs21"],
    ];

    var linhasCores = [
        "red",
        "#57a595",
        "#57a595",
    ];

    var horarios = [
        "https://busway-cira.pt/linhas/18-ida/",
        "https://busway-cira.pt/linhas/37-ida/",
        "https://busway-cira.pt/linhas/33-ida/"
    ]

    $("#autocomplete").autocomplete({
        source: linhasNomes,
        minLength: 1,
        appendTo: "body",
        select: function (event, ui) {
            console.log("Selected: " + ui.item.value);
        }
    });

    var map = L.map('map').setView([39.521111, -8.089217], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([0, 0]).bindPopup("Eu não existo estás a imaginar-me");
    var polyline = L.polyline([[0, 0], [0.0001, 0.0001]], { color: 'blue' }).bindPopup("Eu não existo estás a imaginar-me");
    map.addLayer(marker);
    map.addLayer(polyline);


    $('#button-addon1').click(function () {
        map.removeLayer(marker);
        map.removeLayer(polyline);
        console.log("a");
        var linhaNome = $("#autocomplete").val();
        console.log(linhaNome);
        if (linhasNomes.includes(linhaNome)) {
            var i = linhasNomes.indexOf(linhaNome);
            polyline = L.polyline(linhasCoords[i], { color: linhasCores[i] }).bindPopup(linhasNomes[i])
            $("#linha").text(linhasNomes[i]);
            $("#origem").text(infoLinha[i][0]);
            $("#destino").text(infoLinha[i][1]);
            $("#hora_prevista").text(infoLinha[i][2]);
            $("#paragem").text(infoLinha[i][3]);
            $("#atraso").text(infoLinha[i][4]);
            $("#id_viagem").text(infoLinha[i][5]);
            $("#horario").attr("href", horarios[i]);
            console.log(infoLinha[i][3]);
            var paragemAtual = infoLinha[i][3]
            var paragemAtualI = paragensNomes.indexOf(paragemAtual);
            console.log(paragemAtualI);
            marker = L.marker(paragensCoords[paragemAtualI])
            map.addLayer(marker);
            map.addLayer(polyline);
            map.fitBounds(polyline.getBounds());

        }
        else {
            alert("Linha não encontrada, tente novamente");
            $("#linha").text("");
            $("#origem").text("");
            $("#destino").text("");
            $("#hora_prevista").text("");
            $("#paragem").text("");
            $("#atraso").text("");
            $("#id_viagem").text("");
            $("#horario").attr("href", "#");
        }
    });
});

