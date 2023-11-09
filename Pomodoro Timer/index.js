import Pomodoro from './Pomodoro.js'
import Flowtime from './Flowtime.js'

const pomodoro = document.getElementById('pomodoro')
const flowtime = document.getElementById('flowtime')
document.getElementById('pomodoroId').style.display = "none"  
document.getElementById('flowtimeId').style.display = "none"  

flowtime.addEventListener("click", function(){
    document.getElementById('pomodoroId').style.display = "none"
    document.getElementById("flowtimeId").style.display = ""
    new Flowtime(
        document.querySelector(".flowtime-timer")
    )
})

pomodoro.addEventListener("click", function(){
    document.getElementById('flowtimeId').style.display = "none"
    document.getElementById('pomodoroId').style.display = ""
    new Pomodoro(
    document.querySelector(".pomodoro-timer")
    )
})


