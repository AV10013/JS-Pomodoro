// export default class Settings {
//     constructor(root){
//         root.innerHTML = getSettingsHTML()
//     }


//     static getSettingsHTML() {
//         return(
//             ` `
//         )
//     }
// }
var button1 = document.getElementById("overlayButton")
var button2 = document.getElementById("overlayButtonOff")
var active = false

button1.addEventListener("click", function(){
    on()

})

button2.addEventListener("click", function(){
    off()
    
})

function on() {
    document.getElementById("settings__overlay").style.display = "block"
}

function off() {
    document.getElementById("settings__overlay").style.display = "none"
}
