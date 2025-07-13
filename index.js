let pomodoro=document.getElementById("pomodoro");
let shortBreak=document.getElementById("short");
let longBreak=document.getElementById("long");
let pause=document.getElementById("pausing");

let minuteTens = document.getElementById("minuteTens");
let minuteTensTop = minuteTens.querySelector(".top");
let minuteTensBottom = minuteTens.querySelector(".bottom");
let minuteTensFlipTop = minuteTens.querySelector(".flip-top");
let minuteTensFlipBottom = minuteTens.querySelector(".flip-bottom");

let minuteOnes = document.getElementById("minuteOnes");
let minuteOnesTop = minuteOnes.querySelector(".top");
let minuteOnesBottom = minuteOnes.querySelector(".bottom");
let minuteOnesFlipTop = minuteOnes.querySelector(".flip-top");
let minuteOnesFlipBottom = minuteOnes.querySelector(".flip-bottom");

let secondTens = document.getElementById("secondTens");
let secondTensTop = secondTens.querySelector(".top");
let secondTensBottom = secondTens.querySelector(".bottom");
let secondTensFlipTop = secondTens.querySelector(".flip-top");
let secondTensFlipBottom = secondTens.querySelector(".flip-bottom");

let secondOnes = document.getElementById("secondOnes");
let secondOnesTop = secondOnes.querySelector(".top");
let secondOnesBottom = secondOnes.querySelector(".bottom");
let secondOnesFlipTop = secondOnes.querySelector(".flip-top");
let secondOnesFlipBottom = secondOnes.querySelector(".flip-bottom");

let interval;
let remainingSeconds = 1500;
  
shortBreak.addEventListener("click",function(){
    shortBreak.classList.add("selected");
    pomodoro.classList.remove("selected");
    longBreak.classList.remove("selected");
    pause.classList.remove("selected");
    calculates(300);

})
longBreak.addEventListener("click",function(){
    longBreak.classList.add("selected");
    pomodoro.classList.remove("selected");
    shortBreak.classList.remove("selected");
    pause.classList.remove("selected");
    calculates(600);
})
pomodoro.addEventListener("click",function(){
    pomodoro.classList.add("selected");
    longBreak.classList.remove("selected");
    shortBreak.classList.remove("selected");
    pause.classList.remove("selected");
    if(pause.classList.contains("started"))
    calculates(1500);
})
pause.addEventListener("click", function () {
    if(!pause.classList.contains("started")){
        pause.classList.add("started");
        pause.innerHTML="pause";
        calculates(remainingSeconds)
    }
    else{
        if (!pause.classList.contains("selected")) {
            clearInterval(interval);
            pause.classList.add("selected");
            pause.innerHTML = "paused";
          } else {
            pause.classList.remove("selected");
            pause.innerHTML = "pause";
            calculates(remainingSeconds);
          }
    }
  });

function start(){
    pomodoro.classList.add("selected");

    minuteTensTop.querySelector("span").innerText = 2;
    minuteOnesTop.querySelector("span").innerText = 5;
    secondTensTop.querySelector("span").innerText = 0;
    secondOnesTop.querySelector("span").innerText = 0;
}


function change(sec) {
    let mins = Math.floor(sec / 60);
    let secs = sec % 60;

    let mT = Math.floor(mins / 10);
    let mO = mins % 10;
    let sT = Math.floor(secs / 10);
    let sO = secs % 10;

    flipDigit(minuteTens, mT);
    flipDigit(minuteOnes, mO);
    flipDigit(secondTens, sT);
    flipDigit(secondOnes, sO);
}
  
function flipDigit(card, newDigit) {
    const top = card.querySelector(".top");
    const bottom = card.querySelector(".bottom");
    const flipTop = card.querySelector(".flip-top");
    const flipBottom = card.querySelector(".flip-bottom");

    const current = top.innerText;
    if (current == newDigit) return;

    flipTop.innerText = current;
    flipBottom.innerText = newDigit;
    top.querySelector("span").innerText = current;
    bottom.querySelector("span").innerText = newDigit;


    card.querySelector('.flip-animation').style.visibility = 'visible';
    card.classList.add("flipping");
    setTimeout(() => {
        top.querySelector("span").innerText = newDigit;
        bottom.querySelector("span").innerText = newDigit;

    }, 250);
    setTimeout(() => {
        card.querySelector('.flip-animation').style.visibility = 'hidden';
        card.classList.remove("flipping");
        top.querySelector("span").innerText = newDigit;
        bottom.querySelector("span").innerText = newDigit;
        bottom.querySelector("span").innerText = newDigit;
    },500);
}

function calculates(seconds) {
    clearInterval(interval);
    remainingSeconds = seconds;
    change(remainingSeconds);
    interval = setInterval(() => {
        if (!pause.classList.contains("selected")) {
        remainingSeconds--;
        change(remainingSeconds);
        if (remainingSeconds <= 0) clearInterval(interval);
        }
    }, 1000);
}
start();
change(1500);