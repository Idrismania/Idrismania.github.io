function calculateHP() {
    // Get the player's attack and defense values from the form
    var playerAtk = parseFloat(document.getElementById('atk').value);
    var playerDef = parseFloat(document.getElementById('def').value);

    // Loop through each row in the enemy table
    var rows = document.querySelectorAll('#enemyTable tbody tr');
    rows.forEach(function(row) {
        // Get the enemy stats from the data-enemy-stats attribute
        var enemyStats = JSON.parse(row.querySelector('.enemy-stats').getAttribute('data-enemy-stats'));
        
        // Calculate the HP loss based on player's attack and enemy defense
        var hpLoss = calculateHPLoss(playerAtk, playerDef, enemyStats.atk, enemyStats.def, enemyStats.hp);
        console.log(hpLoss)
        // Update the HP loss value in the table
        row.querySelector('.hp-loss-stat').textContent = hpLoss.hpLoss;
    });
}

function calculateHPLoss(attack, defense, enemyAtk, enemyDef, enemyHp) {

    if (attack < 0 || defense < 0){
        return { hpLoss: "???"}
    }

    if ((enemyDef - attack) >= 0) {
        return { hpLoss: "???" };
    }

    // Damage = enemy defense - attack, turns is how many damages fit in enemy hp rounded up
    const nTurns = Math.ceil(enemyHp / (-(enemyDef - attack)));

    const dmgPerTurn = defense - enemyAtk;

    const hpLoss = -(nTurns * dmgPerTurn);

    if (hpLoss < 0) {
        return { hpLoss: "0" };
    } else if (isNaN(hpLoss)) {
        return {hpLoss: "???"}
    }

    return { hpLoss: hpLoss.toString() };
}

// Add event listeners to input fields to recalculate HP loss when values change
document.getElementById('atk').addEventListener('input', calculateHP);
document.getElementById('def').addEventListener('input', calculateHP);
