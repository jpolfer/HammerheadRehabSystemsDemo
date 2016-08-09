function changeHardener() {
    var typeHard = document.getElementById('typeHard');
    var curId = typeHard.options[typeHard.selectedIndex].value;
    var items = document.getElementById('pElement').getElementsByClassName('typeData');
    for (var item in items)
        if (items[item].id != undefined)
            items[item].style.display = (items[item].id == curId ? 'block' : 'none');
}

changeHardener();