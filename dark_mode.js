(function(){
    'use strict';
    require.config({
        paths: {
            CerosSDK: '//sdk.ceros.com/standalone-player-sdk-v5.min'
        }
    });
    require(['CerosSDK'], function (CerosSDK) {
        CerosSDK.findExperience()
            .fail(function (error) {
                console.error(error);
            })
            .done(function (experience) {
                window.myExperience = experience;
                var darkMode = experience.findLayersByTag("dark-mode");
                var pageComponents = experience.findAllComponents().layers;
                var dontInvert = experience.findLayersByTag("dont-invert").layers;

                darkMode.on(CerosSDK.EVENTS.CLICKED, componentClickedCallback);
                function componentClickedCallback(){
                    toggleMode(pageComponents, dontInvert);
                }
            })
    });
})();
function toggleMode(pageComps, dontInv){
    var cerosClasses = [".canvas-background", ".shape", ".text", ".image"];
    var invertList = [];

    for(let i = 0; i < cerosClasses.length; i++){
        if(i < (cerosClasses.length-1)){
            invertList[i] = document.querySelectorAll(cerosClasses[i]);
            $(invertList[i]).toggleClass('dark');
        }
        else{
            for(let pageComponent of pageComps){
                if(pageComponent.type == "image"){
                    let pageComp = document.getElementById(pageComponent.id);
                    $(pageComp).toggleClass('dark');
                }
            }
        }
    }
    dontInv.forEach(dont => {
        let no = document.getElementById(dont.id);
        $(no).removeClass('dark');
    });
}