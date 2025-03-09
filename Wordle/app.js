const wordList = [
    "apple", "brave", "charm", "delta", "eagle", "flame", "grape", "honey", "ivory", "jolly",
    "knack", "lemon", "mango", "noble", "ocean", "pearl", "quilt", "raven", "sunny", "tiger",
    "ultra", "vivid", "whale", "xenon", "yacht", "zebra", "abide", "bliss", "crane", "dwarf",
    "elite", "frost", "globe", "haste", "inbox", "jumpy", "kneel", "lunar", "mirth", "ninja",
    "orbit", "piano", "quack", "reign", "sugar", "truce", "unite", "vocal", "waltz", "xerox",
    "yield", "zesty", "angel", "bloom", "cider", "daisy", "ember", "fable", "giant", "hover",
    "irony", "jewel", "koala", "lyric", "motto", "nudge", "otter", "plume", "quill", "rider",
    "siren", "tulip", "urban", "vigor", "wheat", "xylem", "youth", "azure", "bacon", "cabin",
    "dodge", "eager", "fancy", "gloom", "hatch", "imply", "jolly", "knead", "latch", "mango",
    "noble", "oasis", "pouch", "quilt", "ranch", "sheep", "tiger", "ultra", "vivid", "whale"
  ];
let ans=wordList[(Math.floor(Math.random()*100))].toUpperCase();
// console.log(ans);
let guess=document.querySelectorAll(".guess");
let submitBtn=document.querySelector(".submit-btn");
let inputBox=document.querySelector(".user-ans");
let boxes=document.querySelectorAll(".box");
let game=document.querySelector(".game");
let userField=document.querySelector(".user-field");
let settings=document.querySelector(".settings");
let help=document.querySelector(".help");

// userField.classList.add("hide");
let reset=document.createElement("button");
reset.innerText="New game"
reset.style.backgroundColor="hsl(169, 82%, 27%)";
reset.style.color="white";
reset.style.borderRadius="1rem";
reset.style.padding="0.5rem";

let msg=document.createElement("p");
msg.style.fontSize="2rem";

let f;

let firstBox=0;
let lastBox=4;
let offset=0;

let mode="light";
let helpState="unclicked";

settings.addEventListener("click",()=>{
    if(mode==="light"){
        game.style.backgroundColor="black";
        mode="dark";
    }
    else{
        game.style.backgroundColor="#AEC5EB";
        mode="light";
    }
})

let img=document.createElement("img");

help.addEventListener("click",()=>{
    if(helpState==="unclicked"){
        img.src="help.jpg";
        img.style.height="8rem";
        img.style.backgroundRepeat="no-repeat";
        help.append(img);
        helpState="clicked";
    }
    else{
        img.remove();
        helpState="unclicked";
    }

})

const clearBox=()=>{
    inputBox.value="";
}

const colourBoxes=()=>{
    for(let i=firstBox+offset;i<=lastBox+offset;i++){
       if(ans.includes(boxes[i].innerText)){
            boxes[i].style.backgroundColor="yellow";
        }
        else {
            boxes[i].style.backgroundColor="grey";
        }
    }
    f=1;
    for(let i=firstBox+offset;i<=lastBox+offset;i++){
       
        
        if(ans[i-offset]===boxes[i].innerText){
            boxes[i].style.backgroundColor="hsl(169, 82%, 27%)";
        }
        else{
            f=0;
        }
    }
        if(f==1){
            printSuccessMessage();
        }
    
}

const addResetBtn=()=>{
    userField.classList.add("hide");
    reset.classList.remove("hide");
    userField.after(reset);
    ans=wordList[(Math.floor(Math.random()*100))].toUpperCase();
    console.log(ans);
}

reset.addEventListener("click",()=>{
    offset=0;
    firstBox=0;
    lastBox=4;
    submitBtn.disabled=false;
    boxes.forEach((box)=>{
        box.innerText="";
        box.style.backgroundColor="#FFB86F";
    })
    userField.classList.remove("hide");
    msg.classList.add("hide");
    reset.classList.add("hide");

})

const printSuccessMessage=()=>{
    msg.classList.remove("hide");
   msg.innerText="You guessed the word!!";
   msg.style.color="green";
    game.prepend(msg);
    submitBtn.disabled=true;
    addResetBtn();
}

const printFailureMessage=()=>{
    msg.classList.remove("hide");
    msg.innerText=`You failed!!The word was ${ans}`;
    msg.style.color="red";
     game.prepend(msg);
     submitBtn.disabled=true;
     addResetBtn();
 }

 const printErrorMessage=()=>{
    msg.classList.remove("hide");
    msg.innerText=`Invalid!!`;
    msg.style.color="red";
     game.prepend(msg);
    setTimeout(()=>{
        msg.classList.add("hide");
    },2000);
 }
submitBtn.addEventListener("click",()=>{
    let userAns=inputBox.value;
    console.log(userAns);
    console.log(offset);
    if(userAns.length!=5 || !(/^[A-Z]+$/i.test(userAns))){
        console.log("Invalid");
        printErrorMessage();
        clearBox();
        
    }
    else{
        clearBox();
        let j=0;
        if(offset>20){
            submitBtn.disabled=true;
            addResetBtn();
            return;   
        }
        for(let i=firstBox+offset;i<=lastBox+offset;i++){
            boxes[i].innerText=userAns[j].toUpperCase();
            j++;
        }
        colourBoxes();
        offset+=5;
        if(offset>20 && f==0){
            console.log("You failed!!The word was ",ans);
            printFailureMessage();
        }
    }
})
