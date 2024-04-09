let day;
let month;
let year;

function isDateValid(d,m,y){
    let date=new Date(y,m-1,d);
    if (date.getFullYear() == y && date.getMonth() == m-1 && date.getDate() == d) {
        return true;
    }
    return false;
}

function triggerError(msg){
    let lbl=document.querySelectorAll(".input-lbl");
    let txt=document.querySelectorAll(".input-txt");
    for(let i=0;i<lbl.length;i++){
        lbl[i].style.color="red";
    }
    for(let i=0;i<txt.length;i++){
        txt[i].style.borderColor="red";
    }
    let ipt=document.querySelector("#error-msg");
    ipt.style.color="red";
    ipt.innerText=msg;
}

function isDateFuture(d,m,y){
    let current=new Date();
    let date=new Date(y,m-1,d);
    return (current<date)
}

function undoTrigger(){
    let lbl=document.querySelectorAll(".input-lbl");
    let txt=document.querySelectorAll(".input-txt");
    for(let i=0;i<lbl.length;i++){
        lbl[i].style.color="black";
    }
    for(let i=0;i<txt.length;i++){
        txt[i].style.borderColor="hsl(0, 0%, 87%)";
    }
    let ipt=document.querySelector("#error-msg");
    ipt.style.color="black";
    ipt.innerText='';}

function calculate(d,m,y){
    let input=new Date(y,m-1,d);
    let diff=Math.abs(new Date() - input);
    diff=Math.floor(diff/86400000);
    let days=Math.floor(diff%30.4375);
    diff=Math.floor(diff/30.4375);
    let months=diff%12;
    diff=Math.floor(diff/12);
    let years=diff;
    return [days,months,years];
}

function showOutput(a,b,c){
    document.querySelector("#output-day span").innerText=a;
    document.querySelector("#output-month span").innerText=b;
    document.querySelector("#output-year span").innerText=c;
}

function operate(){
    year=document.getElementById("input-year").value;
    month=document.getElementById("input-month").value;
    day=document.getElementById("input-day").value;
    if((year=="") || (month=="") || (day=="")){
        triggerError("All fields must be filled");
    } else if(!isDateValid(day,month,year)) {
        triggerError("Invalid Date");
    } else if(isDateFuture(day,month,year)) {
        triggerError("Must be in the past");
    } else {
        undoTrigger();
        let c=calculate(day,month,year);
        showOutput(c[0],c[1],c[2]);
    }
}


let b=document.querySelector("button");

b.onclick=function(){
    operate();
}
