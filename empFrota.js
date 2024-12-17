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
        "green",
    ]

    google.load("visualization", "1", { packages: ["corechart"] });
    google.setOnLoadCallback(drawChartAutocarros);
    google.setOnLoadCallback(drawChartAutocarrosLinha);
    google.setOnLoadCallback(drawChartKmLinha);
    google.setOnLoadCallback(drawChartCustos);
    google.setOnLoadCallback(drawChartCustosLinha);
    google.setOnLoadCallback(drawChartCustosMês);
    google.setOnLoadCallback(drawChartLucros);
    google.setOnLoadCallback(drawChartLucrosLinha);
    google.setOnLoadCallback(drawChartLucrosMês);
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
            ['Linha', 'Número'], ['Linha 18', 10], ['Linha 37', 8], ['Linha 33', 4],
        ]);
        var options = {
            slices: {
                0: { color: 'red' }, 1: { color: '#57a595' }, 2: { color: 'green' }
            }
        };
        var chart = new google.visualization.PieChart(document.getElementById('autocarrosLinhaChart'));
        chart.draw(data, options);
    }
    function drawChartKmLinha() {
        var data = google.visualization.arrayToDataTable([
            ['Linha', 'Km'], ['Linha 18', 15236], ['Linha 37', 18547], ['Linha 33', 9684],
        ]);
        var options = {
            bars: 'vertical', // Required for Material Bar Charts.
            axes: {
                x: {
                    0: { side: 'top', label: 'Percentage' } // Top x-axis.
                }
            },
            bar: { groupWidth: "90%" }
        };
        var chart = new google.visualization.BarChart(document.getElementById('kmLinhaChart'));
        chart.draw(data, options);
    }
    function drawChartCustos() {
        var data = google.visualization.arrayToDataTable([
            ['Area', 'Custo'], ['Manutenção', 1000000], ['Motoristas', 800000], ['Combustível', 950000], ['Gestão', 200000], ['Limpeza', 300000],
        ]);
        var options = {
            bars: 'vertical', // Required for Material Bar Charts.
            axes: {
                x: {
                    0: { side: 'top', label: 'Percentage' } // Top x-axis.
                }
            },
            bar: { groupWidth: "90%" }
        };
        var chart = new google.visualization.BarChart(document.getElementById('custosChart'));
        chart.draw(data, options);
    }
    function drawChartCustosLinha() {
        var data = google.visualization.arrayToDataTable([
            ['Linha', 'Custo'], ['Linha 18', 1110000], ['Linha 37', 1100000], ['Linha 33', 1040000],
        ]);
        var options = {
            bars: 'vertical', // Required for Material Bar Charts.
            axes: {
                x: {
                    0: { side: 'top', label: 'Percentage' } // Top x-axis.
                }
            },
            bar: { groupWidth: "90%" }
        };
        var chart = new google.visualization.BarChart(document.getElementById('custosLinhaChart'));
        chart.draw(data, options);
    }
    function drawChartCustosMês() {
        var data = google.visualization.arrayToDataTable([
            ['Mês', 'Linha 18', 'Linha 37', 'Linha 33'],
            ['07/24', 200000, 300000, 240000], 
            ['08/24', 290000, 230000, 230000], 
            ['09/24', 210000, 240000, 180000], 
            ['10/24', 230000, 180000, 200000], 
            ['11/24', 180000, 250000, 290000], 
        ]);
        var options = {
            vAxis: { title: 'Mês' },
            hAxis: { title: 'Custos' },
            seriesType: 'bars',
            series: { 5: { type: 'line' } }
        };
        var chart = new google.visualization.BarChart(document.getElementById('custosMêsChart'));
        chart.draw(data, options);
    }
    function drawChartLucros() {
        var data = google.visualization.arrayToDataTable([
            ['Area', 'Valor'], ['Custos totais', 3250000], ['Produto Bruto', 5000000], ['Lucro', 1750000],
        ]);
        var options = {
            bars: 'vertical', // Required for Material Bar Charts.
            axes: {
                x: {
                    0: { side: 'top', label: 'Percentage' } // Top x-axis.
                }
            },
            bar: { groupWidth: "90%" }
        };
        var chart = new google.visualization.BarChart(document.getElementById('lucrosChart'));
        chart.draw(data, options);
    }
    function drawChartLucrosLinha() {
        var data = google.visualization.arrayToDataTable([
            ['Linha', 'Lucro'], ['Linha 18', 635000], ['Linha 37', 610000], ['Linha 33', 505000],
        ]);
        var options = {
            slices: {
                0: { color: 'red' }, 1: { color: '#57a595' }, 2: { color: 'green' }
            }
        };
        var chart = new google.visualization.PieChart(document.getElementById('lucrosLinhaChart'));
        chart.draw(data, options);
    }
    function drawChartLucrosMês() {
        var data = google.visualization.arrayToDataTable([
            ['Mês', 'Linha 18', 'Linha 37', 'Linha 33'],
            ['07/24', 110000, 140000, 0],
            ['08/24', 110000, 110000, 129000],
            ['09/24', 130000, 130000, 120000],
            ['10/24', 140000, 120000, 127000],
            ['11/24', 145000, 110000, 130000],
        ]);
        var options = {
            vAxis: { title: 'Mês' },
            hAxis: { title: 'Lucros' },
            seriesType: 'bars',
            series: { 5: { type: 'line' } }
        };
        var chart = new google.visualization.BarChart(document.getElementById('lucrosMêsChart'));
        chart.draw(data, options);
    }
    
})