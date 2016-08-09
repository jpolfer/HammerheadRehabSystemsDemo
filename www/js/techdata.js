function changeDisplayedInfo() {
    var typeHard = document.getElementById('typeInfo');
    var curId = typeHard.options[typeHard.selectedIndex].value;
    var items = document.getElementById('infoCollection').getElementsByClassName('typeData');
    for (var item in items)
        if (items[item].id != undefined)
            items[item].style.display = (items[item].id == curId ? 'block' : 'none');
}

changeDisplayedInfo();