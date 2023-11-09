



export default class Pomodoro{
    constructor(root){
        this.studyTime = 1500
        this.shortBreak = 300
        this.longBreak = 1800

        root.innerHTML = Pomodoro.getHTML()
        this.el= {
            hours: root.querySelector(".timer__part__hours"),
            minutes: root.querySelector(".timer__part__minutes"),
            seconds: root.querySelector(".timer__part__seconds"),
            control: root.querySelector(".timer__btn__play"),
            reset: root.querySelector(".timer__btn__reset")
        }

        this.interval = null
        this.remaningMinutes = 0
        this.remainingSeconds = this.studyTime;    
        this.status = document.getElementById("timer__title")
        this.breakActive = false
        this.cycles = 4

        this.el.control.addEventListener("click", () =>{
            if (this.interval === null){
                this.countdown(this.remainingSeconds)
                this.updateInterfaceControls()
            } 
            else{
                this.stop()
            }
        })

        this.el.reset.addEventListener("click", () =>{
            const inputApproval = prompt("Are you sure you want to reset the timer and cycles? (Enter YES if so)") 

            if (inputApproval === "YES") {
                this.stop();
                this.remainingSeconds = this.studyTime
                this.breakActive = false
                this.cycles = 4 
                this.updateInterfaceTime()
            }
        })
        this.status.textContent = `Cycles Remaining: ${this.cycles}`
    }


    updateInterfaceTime() {
        const hours = Math.floor(this.remaningMinutes / 60)
        const minutes = Math.floor(this.remainingSeconds / 60)
        const seconds = this.remainingSeconds % 60
        this.el.hours.textContent = hours.toString().padStart(2, "0")
        this.el.minutes.textContent = minutes.toString().padStart(2, "0")
        this.el.seconds.textContent = seconds.toString().padStart(2, "0")
    }

    updateInterfaceControls() {
        if(this.interval === null){
            this.el.control.innerHTML = `<span class="material-icons"> play_arrow </span>`;
            this.el.control.classList.add("timer__btn__play")
            this.el.control.classList.remove("timer__btn__pause")
            this.status.textContent = `Cycles Remaining: ${this.cycles}`
        }   
        else{
            this.el.control.innerHTML = `<span class="material-icons"> pause </span>`;
            this.el.control.classList.add("timer__btn__pause")
            this.el.control.classList.remove("timer__btn__play")
            this.status.textContent = `Cycles Remaining: ${this.cycles}`
        }
    }

    start(){
        if (this.breakActive === false)
        {
            this.remainingSeconds = this.studyTime
            this.countdown(this.remainingSeconds && this.cycles > 0)
        } else if (this.breakActive === true && this.cycles > 0){
            this.remainingSeconds = this.shortBreak
            this.countdown(this.remainingSeconds)
        } else if (this.breakActive === true && this.cycles <= 0)
        {
            this.remainingSeconds = this.longBreak
            this.cycles = 4
            this.countdown(this.remainingSeconds)
        }
        this.updateInterfaceControls();
    }

    countdown(newValue){
        this.interval = setInterval(()=>{
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if (this.remainingSeconds === 0) {
                clearInterval(this.interval)
                if (this.breakActive === false){
                    this.cycles--
                }
                console.log(this.cycles)
                this.breakActive = !this.breakActive
                this.start()
            }
        }, 1000)
    }



    stop(){
        clearInterval(this.interval)
        this.interval = null;
        this.updateInterfaceControls();
    }


    static getHTML(){
        return `
            <div class="timer__status" id="pomodoro__timer__status">
                <h1 class="timer__title" id="timer__title"></h1>
            </div>
            <span class="timer__part__hours">00</span> 
            <span class="timer__part">:</span>
            <span class="timer__part__minutes">25</span>
            <span class="timer__part">:</span>
            <span class="timer__part__seconds">00</span>

            <button type="button" class="timer__btn__play">
                <span class="material-icons"> play_arrow </span>
            </button>

            <button type="button" class="timer__btn__reset">
                <span class="material-icons"> timer </span>
            </button>`
    }
}