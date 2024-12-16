$(document).ready(function () {
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

    var linhasCores = [
        "red",
        "#57a595",
        "#57a595",
    ]

    function drawLinhas(coordslst, nomes) {
        for (var i = 0; i < coordslst.length; i++) {
            var polyline = L.polyline(coordslst[i], { color: linhasCores[i] }).bindPopup(nomes[i]).addTo(map);
            console.log(nomes[i], coordslst[i])
        }
    }

    function drawParagens(coords, nomes) {
        for (var i = 0; i < coords.length; i++) {
            var marker = L.marker([coords[i][0], coords[i][1]]).bindPopup(nomes[i]).addTo(map);
            console.log(coords[i], nomes[i])
        }
    }

    var map = L.map('map').setView([40.642224, -8.643631], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    drawParagens(paragensCoords, paragensNomes);
    drawLinhas(linhasCoords, linhasNomes);

    google.load("visualization", "1", { packages: ["corechart"] });
    google.setOnLoadCallback(drawChartAutocarros);
    google.setOnLoadCallback(drawChartAutocarrosLinha);
    function drawChartAutocarros() {
        var data = google.visualization.arrayToDataTable([
            ['Autocarros', 'Percentagem'], ['Em serviço', 85], ['Fora de serviço', 15],
        ]);
        var options = {
            slices: {
                0: { color: 'blue' }, 1: { color: 'red' }
            }
        };
        var chart = new google.visualization.PieChart(document.getElementById('autocarrosChart'));
        chart.draw(data, options);
    }
    function drawChartAutocarrosLinha() {
        var data = google.visualization.arrayToDataTable([
            ['Autocarros', 'Percentagem'], ['Em serviço', 85], ['Fora de serviço', 15],
        ]);
        var options = {
            slices: {
                0: { color: 'blue' }, 1: { color: 'red' }
            }
        };
        var chart = new google.visualization.PieChart(document.getElementById('autocarrosChart'));
        chart.draw(data, options);
    }
})