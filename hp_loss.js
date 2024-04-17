function calculateHP() {
    var atk = parseFloat(document.getElementById('atk').value);
    var def = parseFloat(document.getElementById('def').value);
    var enemyAtk = parseFloat(document.getElementById('enemyAtk').value);
    var enemyDef = parseFloat(document.getElementById('enemyDef').value);
    var enemyHp = parseFloat(document.getElementById('enemyHp').value);


    var result = calculateHPLoss(atk, def, enemyAtk, enemyDef, enemyHp);
    document.getElementById('result').innerHTML = 'HP Loss: ' + result.hpLoss;
}

function calculateHPLoss(attack, defense, enemyAtk, enemyDef, enemyHp) {
    if (enemyDef - attack === 0) {
        return { hpLoss: "0" };
    }

    // Damage = enemy defense - attack, turns is how many damages fit in enemy hp rounded up
    const nTurns = Math.ceil(enemyHp / (-(enemyDef - attack)));

    const dmgPerTurn = defense - enemyAtk;

    const hpLoss = -(nTurns * dmgPerTurn);

    if (hpLoss < 0) {
        return { hpLoss: "???" };
    } else if (isNaN(hpLoss)) {
        return {hpLoss: ""}
    }

    return { hpLoss: hpLoss.toString() };
}

// Add event listeners to input fields to recalculate HP loss when values change
document.getElementById('atk').addEventListener('input', calculateHP);
document.getElementById('def').addEventListener('input', calculateHP);
document.getElementById('enemyAtk').addEventListener('input', calculateHP);
document.getElementById('enemyDef').addEventListener('input', calculateHP);
document.getElementById('enemyHp').addEventListener('input', calculateHP);
