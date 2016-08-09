var viewPortWidth = 470;

function setViewport() {
    if ((navigator.userAgent.toLowerCase().indexOf("android")!=-1)) {
        var wW0 = window.screen.width;
        var scale = viewPortWidth / wW0;
        var vPort = "width=" + viewPortWidth + "px, maximum-scale=" + scale.toFixed(5) + ", minimum-scale=" + scale.toFixed(5) + ", initial-scale=" + scale.toFixed(5) + ", user-scalable=no;";
        document.getElementById("viewport").setAttribute("content", vPort);
    }
}

setViewport();