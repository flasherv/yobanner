/**
 * Created by shimarulin on 03.02.14.
 */

function Activate() {
    setTimeout(function() {
        var frame = document.getElementsByClassName('frame');
        for(var i = 0; i < frame.length; ++i){
            frame[i].classList.add("active");
        }
        console.log();
    }, 0);
    setTimeout(function() {
        var frame = document.getElementsByClassName('frame');
        for(var i = 0; i < frame.length; ++i){
            frame[i].classList.remove("active");
        }
        Activate();
        console.log();
    }, 13000)
}

Activate();

