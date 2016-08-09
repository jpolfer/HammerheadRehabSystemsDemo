var calculations = {
    "HHLINER": {
        "Options": {
            "4:3": { "Description": "4\" (3 mil)", "Weight": 0.7616 },
            "5:3": { "Description": "5\" (3 mil)", "Weight": 0.9744 },
            "6:3": { "Description": "6\" (3 mil)", "Weight": 1.232 },
            "8:3": { "Description": "8\" (3 mil)", "Weight": 1.456 },
            "10:3": { "Description": "10\" (3 mil)", "Weight": 1.91912 },
            "10:4.5": { "Description": "10\" (4.5 mil)", "Weight": 2.867424 },
            "12:4.5": { "Description": "12\" (4.5 mil)", "Weight": 3.446912 }
        }
    },
    "HHFLEX": {
        "Options": {
            "2:3": { "Description": "2\" (3 mil)", "Weight": 0.392 },
            "3:3": { "Description": "3\" (3 mil)", "Weight": 0.56 },
            "4:4.5": { "Description": "4\" (4.5 mil)", "Weight": 0.9408 },
            "5:4.5": { "Description": "5\" (4.5 mil)", "Weight": 1.288 },
            "6:4.5": { "Description": "6\" (4.5 mil)", "Weight": 1.456 },
            "8:4.5": { "Description": "8\" (4.5 mil)", "Weight": 1.904 }
        }
    },
    "HHLINER STEAM":
    {
        "Options": {
            "6:4.5": { "Description": "6\" (4.5 mil)", "Weight": 1.232 },
            "8:4.5": { "Description": "8\" (4.5 mil)", "Weight": 1.456 },
            "10:4.5": { "Description": "10\" (4.5 mil)", "Weight": 2.867424 },
            "12:4.5": { "Description": "12\" (4.5 mil)", "Weight": 3.446912 }
        }
    },
    "HHFLEX STEAM":
    {
        "Options": {
            "4:4.5": { "Description": "4\" (4.5 mil)", "Weight": 0.7616 },
            "6:4.5": { "Description": "6\" (4.5 mil)", "Weight": 1.232 },
            "8:4.5": { "Description": "8\" (4.5 mil)", "Weight": 1.456 }
        }
    },
    "HHSCRIM": {
        "Options": {
            "4:3": { "Description": "4\" (3 mil)", "Weight": 0.7616 },
            "5:3": { "Description": "5\" (3 mil)", "Weight": 0.9744 },
            "6:3": { "Description": "6\" (3 mil)", "Weight": 1.232 },
            "8:3": { "Description": "8\" (3 mil)", "Weight": 1.456 },
            "10:3": { "Description": "10\" (3 mil)", "Weight": 1.91912 },
            "10:4.5": { "Description": "10\" (4.5 mil)", "Weight": 2.867424 },
            "12:4.5": { "Description": "12\" (4.5 mil)", "Weight": 3.446912 }
        }
    },
    "HHBRAWOLINER": {
        "Options": {
            "2:3": { "Description": "2\" HHBrawoLiner", "Weight": 0.2597401818181 },
            "3:3": { "Description": "3\" HHBrawoLiner", "Weight": 0.5454545454545 },
            "4:3": { "Description": "4\" HHBrawoLiner", "Weight": 0.8918181818181 },
            "5:3": { "Description": "5\" HHBrawoLiner", "Weight": 1.0822727272727 },
            "6:3": { "Description": "6\" HHBrawoLiner", "Weight": 1.2727272727272 },
            "8:3": { "Description": "8\" HHBrawoLiner", "Weight": 1.6363636363636 },
        }
    }
};

var resins = {
    "HL Epoxy": {
        "T": { "Description": "Standard", "Resin": 100, "Hardener": 22 },
        "S": { "Description": "Summer", "Resin": 100, "Hardener": 22 },
        "W": { "Description": "Winter", "Resin": 100, "Hardener": 22 },
        "H": { "Description": "Extended", "Resin": 100, "Hardener": 30 }
    }
};

window.onload = new function () {

    // Fill in the liner types
    var linerType = document.getElementById('linerType');
    linerType.options.length = 0;

    // Loop through the liner calculations
    for (liner in calculations)
        linerType.options[linerType.options.length] = new Option(liner, liner);

    // Make sure to set the first item
    if (linerType.options.length > 0) linerType.selectedIndex = 0;

     // Fill in the liner types
    var resinType = document.getElementById('resinType');
    resinType.options.length = 0;

   // Loop through the epoxies
    for (resin in resins)
        resinType.options[resinType.options.length] = new Option(resin, resin);

    // Make sure to set the first item
    if (resinType.options.length > 0) resinType.selectedIndex = 0;

    // Make sure to follow up with the correct pipe sizes/resin selection
    changeResin(false);
    changeLinerTyper();

    var header = document.getElementById('header');
    var answers = document.getElementById('answers').style.top = (getPosition(header) + header.offsetHeight) + 'px';
    if (parseInt('0' + answers.clientHeight, 10) < 431) {
        try { answers.style.bottom = ''; } catch (err) { }
    }

    window.setTimeout('calculate();', 10);
};

function changeLinerTyper() {

    var linerType = document.getElementById('linerType');
    var pipeSize = document.getElementById('pipeSize');

    if (linerType.selectedIndex == -1) return;

    var selectedLiner = linerType.options[linerType.selectedIndex].value;
    var selectedPipesize = null;

    // Record the original value
    if (pipeSize.selectedIndex != -1)
        selectedPipesize = pipeSize.options[pipeSize.selectedIndex].value;

    // Show all options
    pipeSize.options.length = 0;
    for (pipeOption in calculations[selectedLiner].Options) {
        pipeSize.options[pipeSize.options.length] = new Option(calculations[selectedLiner].Options[pipeOption].Description, pipeOption);
        if (selectedPipesize != null && parseFloat(selectedPipesize) == parseFloat(pipeOption))
            pipeSize.selectedIndex = pipeSize.options.length - 1;
    }

    calculate();
}

function changeResin(recalculate) {
    var resinType = document.getElementById('resinType');
    var hardenerType = document.getElementById('hardenerType');
    var resinTypeText = document.getElementById('resinTypeText');
    var hardenerTypeText = document.getElementById('hardenerTypeText');

    if (resinType.selectedIndex == -1) return;

    var selectedResin = resinType.options[resinType.selectedIndex].value;
    var selectedHardener = null;

    // Record the original value
    if (hardenerType.selectedIndex != -1)
        selectedHardener = hardenerType.options[hardenerType.selectedIndex].value;

    // Show all options
    hardenerType.options.length = 0;
    for (hardenerOption in resins[selectedResin]) {
        hardenerType.options[hardenerType.options.length] = new Option(resins[selectedResin][hardenerOption].Description, hardenerOption);
        if (selectedHardener != null && selectedHardener == hardenerOption)
            hardenerType.selectedIndex = hardenerType.options.length - 1;
    }

    if (hardenerType.selectedIndex < 0) hardenerType.selectedIndex = 0;

    resinTypeText.textContent = resinType.options[resinType.selectedIndex].text;

    changeHardener(recalculate);
}

function changeHardener(recalculate) {
    var hardenerType = document.getElementById('hardenerType');
    var hardenerTypeText = document.getElementById('hardenerTypeText');
    if (hardenerType.selectedIndex == -1) return;
    hardenerTypeText.textContent = hardenerType.options[hardenerType.selectedIndex].text;
    if (recalculate) calculate();
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key == 8) return true;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function getPosition(obj) {
    var topValue = 0;
    while (obj) {
        topValue += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return topValue;
}

function calculate(useValue) {

    try {
        var linerType = document.getElementById('linerType').value;
        var pipeSize = document.getElementById('pipeSize').value;
        var resinType = document.getElementById('resinType').value;
        var hardenerType = document.getElementById('hardenerType').value;
        var totalFeet = parseInt('0' + document.getElementById('totalFeet').value, 10);

        if (useValue != null) totalFeet = parseInt('0' + useValue);

        var lbsTotalResin = -1, lbsResin = -1, lbsHardener = -1;

        // Look up the calculation in our array (resin and weight)
        var linerObject = calculations[linerType];
        var resinObject = resins[resinType][hardenerType];
        var ResinRatio = parseFloat('0' + resinObject.Resin);
        var HardenerRatio = parseFloat('0' + resinObject.Hardener);
        var Weight = parseFloat('0' + linerObject.Options[pipeSize].Weight);

        // Make sure to make 110% to have enough
        lbsTotalResin = Weight * 1.10;

        // Calculate the resin/hardener amounts (based on ratio)
        lbsResin = (lbsTotalResin * ResinRatio / (ResinRatio + HardenerRatio));
        lbsHardener = (lbsTotalResin * HardenerRatio / (ResinRatio + HardenerRatio));

        if (lbsResin <= 0 || lbsHardener <= 0 || totalFeet <= 0) {
            document.getElementById('a2000').innerHTML = numToLbs(0);
            document.getElementById('b2000').innerHTML = numToLbs(0);
            document.getElementById('totalWeight').innerHTML = numToLbs(0);
            return;
        }

        var neededResin = parseFloat((lbsResin * totalFeet).toFixed(2));
        var neededHardener = parseFloat((lbsHardener * totalFeet).toFixed(2));

        document.getElementById('a2000').innerHTML = numToLbs(neededResin);
        document.getElementById('b2000').innerHTML = numToLbs(neededHardener);
        document.getElementById('totalWeight').innerHTML = numToLbs(neededResin + neededHardener);
    }
    catch (err) {
        document.getElementById('a2000').innerHTML = numToLbs(0);
        document.getElementById('b2000').innerHTML = numToLbs(0);
        document.getElementById('totalWeight').innerHTML = numToLbs(0);
    }
}

function numToLbs(totalLbs) {
   
    // Make sure that oz is not 15.9, because then it would be 1 lbs, 16 oz (should say 2 lbs, 0 oz instead)
    var lbsValue = Math.floor(totalLbs);
    var ozValue = (totalLbs % 1) * 16.0;

    if (ozValue > 15) {
        lbsValue++;
        ozValue = 0;
    }

    return totalLbs.toFixed(2) + ' lbs<br />' + lbsValue.toFixed(0) + ' lbs, ' + ozValue.toFixed(0) + ' oz';
}