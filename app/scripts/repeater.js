/**
 * Created by shimarulin on 03.02.14.
 */

function Activate() {
    setTimeout(function() {
        var f1 = document.getElementsByClassName('frame');
        for(var i = 0; i < f1.length; ++i){
            f1[i].classList.add("active");
        }
        console.log();
    }, 0);
    setTimeout(function() {
        var f1 = document.getElementsByClassName('frame');
        for(var i = 0; i < f1.length; ++i){
            f1[i].classList.remove("active");
        }
        Activate();
        console.log();
    }, 13000)
}

Activate();

