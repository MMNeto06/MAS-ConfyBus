$(document).ready(function(){
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
        "Camara de Ílhavo" ,
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

    var novaLInha = [];

    function drawLinhas(coordslst, nomes){
        for (var i = 0; i< coordslst.length; i++){
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

    function onMapClick(e) {
        console.log(e.latlng);
        $("#lat").val(e.latlng.lat);
        $("#lon").val(e.latlng.lng);
        alert("Coordenadas copiadas para adicionar paragem");
    }
    /*
    function resetMap(){
        map.clearLayers();
        drawParagens(paragensCoords, paragensNomes);
    }*/

    var map = L.map('map').setView([40.642224, -8.643631], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    drawParagens(paragensCoords, paragensNomes);
    drawLinhas(linhasCoords, linhasNomes);

    map.on('click', onMapClick);

    $('#paragem').click(function () {
        console.log('adicionar nova paragem');
    });

    $("#linha").click(function (){
        console.log("adicionar nova linha");
        const $container = $("#paragensChecks") 
        $container.empty();

        for(var i=0; i<paragensNomes.length; i++){
            const check = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${i}" id="paragem${i}" name="paragem"/>
                    <label class="form-check-label" for="paragem${i}">
                        <small>${paragensNomes[i]}</small>
                    </label>
                </div>
            `;
            $container.append(check);
        }

        var checkboxes = document.querySelectorAll('input[type=checkbox]');
        console.log("checkboxes", checkboxes)

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', event => {
                console.log(`Checkbox com valor ${event.target.value} foi ${(event.target.checked ? 'selecionado' : 'deselecionado')}.`);
                if (event.target.checked){
                    novaLInha.push(event.target.value);
                }
                else {
                    var remove = novaLInha.indexOf(event.target.value);
                    novaLInha.splice(remove, 1);
                }
                console.log(novaLInha)

                const $listagem = $("#paragensLista")
                $listagem.empty();
                $listagem.append('<ul class="list-group">')
                for (var i = 0; i < novaLInha.length; i++) {
                    const check = `
                        <li class="list-group-item">${paragensNomes[novaLInha[i]]}</li>
                    `;
                    $listagem.append(check);
                }
                $listagem.append('</ul>')
            });
        })

        
    })

    $('#fecharLinha').click(function () {
        novaLInha = [];
        console.log("nova linha limpado")
    })
    $('#closeLinha').click(function () {
        novaLInha = [];
        console.log("nova linha limpado")
    })

    $('#addParagem').click(function () {
        var lat = $("#lat").val();
        var lon = $("#lon").val();
        var name = $("#nameParagem").val();

        if (parseFloat(lat) && parseFloat(lon) && name != "") {
            console.log(lat, lon, name);
            var novaParagem = [parseFloat(lat), parseFloat(lon)]
            paragensCoords.push(novaParagem);
            paragensNomes.push(name);
            $("#paragemModal").modal('hide');
            L.marker(novaParagem).bindPopup(name).addTo(map);
        }
        else {
            alert("Faltam dados para adicionar a paragem")
        }
    });

    $("#addlinha").click(function () {
        var nome = $("#nameLinha").val();
        var cor = $("#corLinha").val();

        if(nome != "" && cor != "" && novaLInha.length > 1){
            console.log("nova linha", nome, cor, novaLInha);
            var novaLInhaCoords = [];
            for(var i = 0; i<novaLInha.length; i++){
                novaLInhaCoords.push(paragensCoords[novaLInha[i]]);
            }
            linhasCoords.push(novaLInhaCoords);
            linhasCores.push(cor);
            linhasNomes.push(nome);
            $("#linhaModal").modal('hide');
            L.polyline(novaLInhaCoords, { color: cor}).bindPopup(nome).addTo(map);
        }
        else{
            alert("Faltam dados para adicionar a linha")
        }
    })
});