// import '../css/common.css';
const refs={
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
  }
  
  let int=null;
  
  refs.startBtn.addEventListener('click', onChangeBodyColor);
  
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function onChangeBodyColor(){
    //const Int=setInterval(refs.body.style.backgroundColor=getRandomHexColor(), 1000);
    refs.stopBtn.addEventListener('click', onStopBodyColorChange);
    
    int=setInterval(()=>refs.body.style.backgroundColor=getRandomHexColor(), 1000);
    
    refs.startBtn.disabled='true'; 
    //refs.stopBtn.disabled=''; 
    
  };
  
  function onStopBodyColorChange(){
    clearInterval(int);
    refs.startBtn.disabled=''; 
    //refs.stopBtn.disabled='true'; 
    
    refs.stopBtn.removeEventListener('click', onStopBodyColorChange);
  };