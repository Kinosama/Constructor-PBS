// Variables
var moves = 0
var eggMoves = 0
var evolutions = 0
var regionalNumbers = 0
var formNames = 0
var hideShapeWarning = false

// Functions
function addMove() {
    
    $("#moves").append(`
    <!-- Move ${moves} -->
    <div id="move-${moves}" class="row">
    
    <div class="col-md-5">
    <input type="text" id="name-move-${moves}" class="form-control" placeholder="Nombre interno del ataque.">
    </div>
    
    <div class="col-md-5">
    <input type="text" id="level-move-${moves}" class="form-control btn-block" placeholder="Nivel al que lo aprende.">
    </div>
    
    <div class="col-md-2">
    <button id="remove-move-${moves}" class="btn btn-block" onclick="removeParent(this)"><i class="fas fa-trash"></i></button>
    </div>
    
    </div>`
    );
    
    moves++;
    
}

function addEggMove() {
    
    $("#egg-moves").append(`
    <!-- Egg move ${eggMoves} -->
    <div id="egg-move-${eggMoves}" class="row">
    
    <div class="col-md-10">
    <input type="text" id="name-egg-move-${eggMoves}" class="form-control" placeholder="Nombre interno del ataque.">
    </div>
    
    <div class="col-md-2">
    <button id="remove-move-${moves}" class="btn btn-block" onclick="removeParent(this)"><i class="fas fa-trash"></i></button>
    </div>
    
    </div>`
    );
    
    eggMoves++;
    
}

function addRegionalNumber() {
    
    $("#regional-numbers").append(`
    <!-- Regional number ${regionalNumbers} -->
    <div id="regional-number-${regionalNumbers}" class="row">
    
    <div class="col-md-10">
    <input type="text" id="number-regional-number-${regionalNumbers}" class="form-control" placeholder="Numero de la Pokédex regional.">
    </div>
    
    <div class="col-md-2">
    <button id="remove-regional-number-${regionalNumbers}" class="btn btn-block" onclick="removeParent(this)"><i class="fas fa-trash"></i></button>
    </div>
    
    </div>`
    );
    
    regionalNumbers++;
    
}

function addEvolution() {
    
    $("#evolutions").append(`
    <!-- Evolution ${evolutions} -->
    <div id="evolution-${evolutions}" class="row">
    
    <div class="col-md-4">
    <input type="text" id="name-evolution-${evolutions}" class="form-control" placeholder="Pokemon al que evoluciona.">
    </div>
    
    <div class="col-md-3">
    <input type="text" id="method-evolution-${evolutions}" class="form-control btn-block" placeholder="Metodo de evolución.">
    </div>
    
    <div class="col-md-3">
    <input type="text" id="condition-evolution-${evolutions}" class="form-control btn-block" placeholder="Condidicon de evolución.">
    </div>
    
    <div class="col-md-2">
    <button id="remove-evolution-${evolutions}" class="btn btn-block" onclick="removeParent(this)"><i class="fas fa-trash"></i></button>
    </div>
    
    </div>`
    );
    
    evolutions++;
    
}

function addFormName() {
    
    $("#form-names").append(`
    <!-- Form name ${formNames} -->
    <div id="form-name-${formNames}" class="row">
    
    <div class="col-md-10">
    <input type="text" id="form-name-${formNames}" class="form-control" placeholder="Nombre de la forma.">
    </div>
    
    <div class="col-md-2">
    <button id="remove-form-name-${formNames}" class="btn btn-block" onclick="removeParent(this)"><i class="fas fa-trash"></i></button>
    </div>
    
    </div>`
    );
    
    formNames++;
    
}

function removeParent(element) {
    $("#" + element.id).parent().parent().remove();
}

function cleanArray(array) {
    var newArray = []
    for (var element in array) {
        if (array[element] != null && array[element] != "") {
            newArray.push(array[element])
        }
    }
    return newArray
}

function validatePBS() {
    
    var baseStats = [$("#health-points").val(), $("#atack").val(), $("#defense").val(), $("#speed").val(), $("#special-atack").val(), $("#special-defense").val()];
    var effortPoints = [$("#effort-health-points").val(), $("#effort-atack").val(), $("#effort-defense").val(), $("#effort-speed").val(), $("#effort-special-atack").val(), $("#effort-special-defense").val()];
    
    var listMoves = [];
    for (inc = 0; inc <= moves; inc++) {
        var name = "#name-move-" + inc;
        var level = "#level-move-" + inc;
        if (name != null && $(name).val() != "" && level != null && $(level).val() != "") {
            listMoves.push($(level).val());
            listMoves.push($(name).val());
        }
    }
    
    var elements = [
        $("#id").val(),
        $("#name").val(),
        $("#internal-name").val(),
        $("#primary-type").val(),
        cleanArray(baseStats).join(),
        $("#gender-rate").val(),
        $("#growth-rate").val(),
        $("#exp-points").val(),
        cleanArray(effortPoints).join(),
        $("#rareness").val(),
        $("#happiness").val(),
        cleanArray(listMoves).join(),
        $("#compatibility").val(),
        $("#steps-to-hatch").val(),
        $("#height").val(),
        $("#weight").val(),
        $("#color").val(),
        $("#kind").val(),
        $("#pokedex").val()
    ];
    
    var valid = true;
    for (var element in elements) {
        if (elements[element] == null || elements[element] == "" || elements[element] == " ") {
            valid = false;
            Swal.fire({
                type: 'error',
                title: "Por favor, rellena los campos obligatorios." 
            })
        }
    }
    
    return valid;
    
}

async function generatePBS() {
    
    if (validatePBS()) {
        
        var baseStats = [$("#health-points").val(), $("#atack").val(), $("#defense").val(), $("#speed").val(), $("#special-atack").val(), $("#special-defense").val()];
        var effortPoints = [$("#effort-health-points").val(), $("#effort-atack").val(), $("#effort-defense").val(), $("#effort-speed").val(), $("#effort-special-atack").val(), $("#effort-special-defense").val()];
        var listMoves = [];
        for (inc = 0; inc <= moves; inc++) {
            var name = "#name-move-" + inc;
            var level = "#level-move-" + inc;
            if (name != null && $(name).val() != "" && level != null && $(level).val() != "") {
                listMoves.push($(level).val());
                listMoves.push($(name).val());
            }
        }
        listMoves = cleanArray(listMoves);
        
        var pbs = 
        "<div id='pbs'>[" + $("#id").val() + "]" + "<br>" +
        "Name=" + $("#name").val() + "<br>" +
        "InternalName=" + $("#internal-name").val() + "<br>" +
        "Type1=" + $("#primary-type").val() + "<br>" +
        "Type2=" + $("#secondary-type").val() + "<br>" +
        "BaseStats=" + baseStats.join() + "<br>" +
        "GenderRate=" + $("#gender-rate").val() + "<br>" +
        "GrowthRate=" + $("#growth-rate").val() + "<br>" +
        "BaseEXP=" + $("#exp-points").val() + "<br>" +
        "EffortPonts=" + effortPoints.join() + "<br>" +
        "Rareness=" + $("#rareness").val() + "<br>" +
        "Happiness=" + $("#happiness").val() + "<br>" +
        "Moves=" + cleanArray(listMoves).join() + "<br>" +
        "Compatibility=" + $("#compatibility").val() + "<br>" +
        "StepsToHatch=" + $("#steps-to-hatch").val() + "<br>" +
        "Height=" + $("#height").val() + "<br>" +
        "Weight=" + $("#weight").val() + "<br>" +
        "Color=" + $("#color").val() + "<br>" +
        "Kind=" + $("#kind").val() + "<br>" +
        "Pokedex=" + $("#pokedex").val();
        
        textShape = $("#shape").val();
        if (textShape != "") {
            pbs += "<br>" + "Shape=" + textShape;
        } else if (!hideShapeWarning) {
            
            const {value: accept} = await Swal.fire({
                type: 'warning',
                title: 'No has definido Shape.',
                text: 'Este campo es necesario a partir de la version 17.',
                input: 'checkbox',
                inputValue: 0,
                inputPlaceholder:'No volver a mostrar.',
            })
            
            if (accept) {
                hideShapeWarning = true;
            }

        }
        
        var abilities = [$("#ability-1").val(), $("#ability-2").val()];
        textAbilities = cleanArray(abilities).join();
        if (textAbilities != "") {
            pbs += "<br>" + "Abilities=" + textAbilities;
            
        }
        
        var hiddenAbilities = [$("#hidden-ability-1").val(), $("#hidden-ability-2").val(), $("#hidden-ability-3").val(), $("#hidden-ability-4").val()];
        textHiddenAbilities = cleanArray(hiddenAbilities).join();
        if (textHiddenAbilities != "") {
            pbs += "<br>" + "HiddenAbilities=" + textHiddenAbilities;
            
        }
        
        var listEggMoves = [];
        for (inc = 0; inc <= eggMoves; inc++) {
            var name = "#name-egg-move-" + inc;
            if (name != null && $(name).val() != "") {
                listEggMoves.push($(name).val())
            }
        }
        textEggMoves = cleanArray(listEggMoves).join();
        if (textEggMoves != "") {
            pbs += "<br>" + "EggMoves=" + textEggMoves;
            
        }
        
        textHabitat = $("#habitat").val();
        if (textHabitat != "") {
            pbs += "<br>" + "Habitat=" + textHabitat;
            
        }
        
        var listRegionalNumbers = [];
        for (inc = 0; inc <= regionalNumbers; inc++) {
            var regionalNumber = "#number-regional-number-" + inc;
            if (regionalNumber != null && $(regionalNumber).val() != "") {
                listRegionalNumbers.push($(regionalNumber).val());
            }
        }
        textRegionalNumbers = cleanArray(listRegionalNumbers).join();
        if (textRegionalNumbers != "") {
            pbs += "<br>" + "RegionalNumbers=" + textRegionalNumbers;
            
        }
        
        textWildItemCommon = $("#wild-item-common").val();
        if (textWildItemCommon != "") {
            pbs += "<br>" + "WildItemCommon=" + textWildItemCommon;
            
        }
        
        textWildItemUncommon = $("#wild-item-uncommon").val();
        if (textWildItemUncommon != "") {
            pbs += "<br>" + "WildItemUncommon=" + textWildItemUncommon;
            
        }
        
        textWildItemRare = $("#wild-item-rare").val();
        if (textWildItemRare != "") {
            pbs += "<br>" + "WildItemRare=" + textWildItemRare;
            
        }
        
        var listEvoluions = [];
        for (inc = 0; inc <= evolutions; inc++) {
            var name = "#name-evolution-" + inc;
            var method = "#method-evolution-" + inc;
            var condition = "#condition-evolution-" + inc;
            if (name != null && $(name).val() != "" && method != null && $(method).val() != "" && condition != null && $(condition).val() != "") {
                listEvoluions.push($(name).val());
                listEvoluions.push($(method).val());
                listEvoluions.push($(condition).val());
            }
        }
        textEvoluions = cleanArray(listEvoluions).join();
        if (textEvoluions != "") {
            pbs += "<br>" + "Evolutions=" + textEvoluions;
            
        }
        
        var listFormNames = [];
        for (inc = 0; inc <= formNames; inc++) {
            var name = "#fomr-name-" + inc;
            if (name  != null && $(name ).val() != "") {
                listFormNames.push($(name).val());
            }
        }
        textFormNames = cleanArray(listFormNames).join();
        if (textFormNames != "") {
            pbs += "<br>" + "FormNames=" + textFormNames;
            
        }

        pbs += "</div>"
        
        Swal.fire({
            type: 'success',
            title: 'PBS :',
            html: pbs
        });
        
    }
    
}