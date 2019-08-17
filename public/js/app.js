const weatherForm =document.querySelector('form');
const search=document.querySelector('input');
const lang=document.querySelector('#Language');
const message=document.querySelector('#message');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    const language=lang.value;
    console.log(language);
    message.textContent='Loading.'
  
    fetch('/weather?address='+location+'&lang='+language).then((response)=>{
    response.json().then((data)=>{
       
        if(data.error){
      message.textContent=data.error;
        }
        else{
            message.textContent=data.WeatherResult;
        }
    })
})
    
})