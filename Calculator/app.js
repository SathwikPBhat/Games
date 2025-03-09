let display=document.querySelector(".calculator .display");
let btns=document.querySelectorAll(".calculator .button");
let operators=document.querySelectorAll(".calculator .operator");
btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(display.innerText==="0" || display.innerText==="error"){
            display.innerText=btn.innerText;
        }
        else{
            display.innerText+=btn.innerText;
        }
    })
})
const reset=()=>{
    display.innerText="0";
}

operators.forEach((operator)=>{
    
    operator.addEventListener("click",()=>{
        if(operator.innerText==="AC"){
           reset();
        }
        else if(operator.innerText==="DEL"){
           display.innerText=display.innerText.slice(0,display.innerText.length-1);
            if(display.innerText===""){reset();}
        }
        else if(operator.innerText!=="="){
            // let operand=display.innerText;
            // operand=Number(operand);
            // console.log(operand);
            // let op=operator.innerText;
            display.innerText+=operator.innerText;
           
        }
        else{ //=
            try{
           display.innerText= eval(display.innerText);
            }
            catch(exc){
                display.innerText="error";
                setTimeout(reset,1500);
            }
           
        }
    })
})