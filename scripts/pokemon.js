var moves = 0
var eggMoves = 0

Array.prototype.clean = function (deleteValue) {
    for (var i = 0, j = this.length; i < j; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

function addMove() {

    $("#moves").append(`
        <!-- Move -->
        <div id="move-${moves}" class="row">

            <label class="col-md-6 col-form-label">Nombre interno del ataque :</label>

            <div class="col-md-5">
                <input type="text" id="name-move-${moves}" class="form-control" name="move-name" placeholder="Nombre interno del ataque.">
            </div>

            <div class="col-md-1">
                <button id="remove-move-${moves}" class="btn btn-block" onclick="removeParent(this)" style="border-width: 0"><i class="fas fa-trash"></i></button>
            </div>

            <label class="col-md-6 col-form-label">Nivel al que lo aprende :</label>

            <div class="col-md-5">
                <input type="text" id="level-move-${moves}" class="form-control btn-block" name="move-level" placeholder="Nivel al que lo aprende.">
            </div>

        </div>`
    );

    moves++;

}

function addEggMove() {

    $("#egg-moves").append(`
        <!-- Move -->
        <div id="egg-move-${eggMoves}" class="row">

            <label class="col-md-6 col-form-label">Nombre interno del ataque :</label>

            <div class="col-md-5">
                <input type="text" id="name-egg-move-${eggMoves}" class="form-control" name="egg-move-name" placeholder="Nombre interno del ataque.">
            </div>

            <div class="col-md-1">
                <button id="remove-move-${moves}" class="btn btn-block" onclick="removeParent(this)" style="border-width: 0"><i class="fas fa-trash"></i></button>
            </div>
            
        </div>`
    );

    eggMoves++;

}

function removeParent(element) {
    $("#" + element.id).parent().parent().remove();
}

function generatePBS() {

    abilities = [$("#ability-1").val(), $("#ability-2").val()]
    abilities = abilities.clean("");
    hiddenAbilities = [$("#hidden-ability-1").val(), $("#hidden-ability-2").val(), $("#hidden-ability-3").val(), $("#hidden-ability-4").val()]
    hiddenAbilities = hiddenAbilities.clean("");
    baseStats = [$("#health-points").val(), $("#atack").val(), $("#defense").val(), $("#speed").val(), $("#special-atack").val(), $("#special-defense").val()]
    effortPoints = [$("#effort-health-points").val(), $("#effort-atack").val(), $("#effort-defense").val(), $("#effort-speed").val(), $("#effort-special-atack").val(), $("#effort-special-defense").val()]
    listMoves = []
    listEggMoves = []

    console.log(moves)
    for (inc = 0; inc <= moves; inc++) {
        var name = "#level-move-" + inc;
        var level = "#name-move-" + inc
        console.log(name + " " + level + " " + moves)
        listMoves.push($(name).val())
        listMoves.push($(level).val())
    }

    listMoves = listMoves.clean("");

    for (inc = 0; inc <= eggMoves; inc++) {
        var name = "#name-egg-move-" + inc;
        listEggMoves.push($(name).val())
    }

    listEggMoves.clean("");

    var pbs = "[" + $("#id").val() + "]" + "<br>" +
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
        "Moves=" + listMoves.join().substring(0, listMoves.join().length - 2) + "<br>" +
        "Compatibility=" + $("#compatibility").val() + "<br>" +
        "StepsToHatch=" + $("#steps-to-hatch").val() + "<br>" +
        "Height=" + $("#height").val() + "<br>" +
        "Weight=" + $("#weight").val() + "<br>" +
        "Color=" + $("#color").val() + "<br>" +
        "Kind=" + $("#kind").val() + "<br>" +
        "Pokedex=" + $("#pokedex").val() + "<br>" +
        "Abilities=" + abilities.join() + "<br>" +
        "HiddenAbilities=" + hiddenAbilities.join() + "<br>" +
        "EggMoves=" + listEggMoves.join().substring(0, listEggMoves.join().length - 1);

    Swal.fire({
        type: 'success',
        title: 'PBS :',
        html: pbs,
    })

}
