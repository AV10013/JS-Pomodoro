export default class Flowtime {
    constructor(root){
        root.innerHTML = Flowtime.getHTML()
        this.mainDiv = document.getElementById('flowtime__container')
        this.timerDiv = document.getElementById('flowtime__timer__container')
        this.timerDiv.style.display = "none"
        this.breakSeconds = 0
        this.workSeconds = 0 
        this.interval = null

        this.el = {
            playButton: root.querySelector(".flowtime__timer__btn__play"),
            flowtimeTimer: root.querySelector(".flowtime__timer__title"),
            minutes: root.querySelector(".timer__part__minutes"),
            seconds: root.querySelector(".timer__part__seconds"),
            div: root.querySelector(".flowtime-timer"),
            timerButton: root.querySelector(".timer__btn__play")
        }

        this.flowtimeTitle = document.getElementById('flowtime__title')
        this.flowtimeTitle.innerHTML = "Click the Button to Start the Flowtime Method: "

        this.el.playButton.addEventListener("click", () =>{
            if(this.interval === null){
                this.countUp()
                this.updateInterfaceControls()
            } 
            else {
                this.stop()
            }
        })

        this.el.timerButton.addEventListener("click", () =>{
            if(this.interval === null){
                this.countdown()
                this.updateInterfaceControls()
            } 
            else {
                clearInterval(this.interval)
                this.interval = null
                this.updateInterfaceControls()
            }
        })

    }

    
    countUp(){
        this.flowtimeTitle.innerHTML = "Press the Pause Button When You are Done Studying: "
        this.interval = setInterval(()=>{
            this.workSeconds++;
        }, 1000)
    }

    stop(){
        clearInterval(this.interval)
        this.flowtimeTitle.innerHTML = "Click the Button to Start the Flowtime Method: "
        this.interval = null
        this.updateInterfaceControls()
        this.calculateBreakTime()
        this.workSeconds = 0
    }

    calculateBreakTime(){

        if (this.workSeconds <= 1500){
            this.breakSeconds = 300
        } else if( this.workSeconds > 1501 && this.workSeconds <= 3000){
            this.breakSeconds = 480
        } else if (this.workSeconds > 3001 && this.workSeconds <= 5400){
            this.breakSeconds = 600
        } else if(this.workSeconds >= 5401){
            this.breakSeconds = 1200
        }
       this.countdown()
    }

    updateTime(){
        const minutes = Math.floor(this.breakSeconds / 60)
        const seconds = this.breakSeconds % 60
        this.el.minutes.textContent = minutes.toString().padStart(2, "0")
        this.el.seconds.textContent = seconds.toString().padStart(2, "0")
    }

    centerTimerDiv(){
        document.getElementById('flowtimeId').style.left = "56%"
        document.getElementById('flowtimeId').style.top = "45%"
    }
    countdown(){
        clearInterval(this.interval)
        this.interval = null
        this.mainDiv.style.display = "none"
        this.timerDiv.style.display = ""
        this.centerTimerDiv()
        this.interval = setInterval(()=>{
            this.breakSeconds--;
            if (this.breakSeconds === 0) {
                clearInterval(this.interval)
                this.interval = null
                this.workSeconds = 0
                this.mainDiv.style.display = ""
                this.timerDiv.style.display = "none"
                this.updateInterfaceControls()
            }
            this.updateTime()
        }, 1000)
        this.updateInterfaceControls()
    }

    updateInterfaceControls() {
        if(this.interval === null){
            this.el.playButton.innerHTML = `<span class="material-icons"> play_arrow </span>`;
            this.el.timerButton.innerHTML = `<span class="material-icons"> play_arrow </span>`
            this.el.playButton.classList.add("flowtime__timer__btn__play")
            this.el.playButton.classList.remove("flowtime__timer__btn__pause")

        }   
        else {
            this.el.playButton.innerHTML = `<span class="material-icons"> pause </span>`;
            this.el.timerButton.innerHTML = `<span class="material-icons"> pause </span>`
            this.el.playButton.classList.add("flowtime__timer__btn__pause")
            this.el.playButton.classList.remove("flowtime__timer__btn__play")
        }
    }


    
   static getHTML(){
        return(` 
        <div id="flowtime__container"> 
        <h1 class="flowtime__timer__title" id="flowtime__title"></h1>
        <button type="button" class="flowtime__timer__btn__play">
            <span class="material-icons"> play_arrow </span>
        </button>
        </div>
        <div id="flowtime__timer__container">
                <div class="flowtime__timer__status" id="pomodoro__timer__status">
                    <h1 class="timer__title" id="timer__title">Break Time!</h1>
                </div>
                    <span class="timer__part__hours">00</span> 
                    <span class="timer__part">:</span>
                    <span class="timer__part__minutes">00</span>
                    <span class="timer__part">:</span>
                    <span class="timer__part__seconds">00</span>
                    <button type="button" class="timer__btn__play">
                        <span class="material-icons"> pause </span>
                    </button>
                </div>
        `)
    }

    
}