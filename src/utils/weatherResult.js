const request=require('request');

const weather=(latitude,longitude,lang,callback)=>{
    const url="https://api.darksky.net/forecast/58c8b3e23a86d14b0492572c6f5fd921/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"?lang="+lang+"&units=si"
    request({url:url,json:true},(error,response)=>{
    //const data=JSON.parse(response.body);

    if(error){
        callback("Unable to Get the Weather",undefined);
        //console.log(); //If response does not come means server does not get connected
    }
    else if(response.body.error){
        callback("Error Message from the server"+response.body.error,undefined)
 // error recieved if Wrong /Faulty Inpput Given
    }
    else{ // If proper Recieved
    const data=response.body;   
    const location=data.timezone;
    const weekSummary=data.daily.data[0].summary;
    const currentWeather=data.currently.temperature;
    const precipitation=data.currently.precipProbability;
    const weatherResult=` ${weekSummary} The Current Temperature  is
    ${currentWeather} The high today is ${data.daily.data[0].temperatureHigh}, with a low of ${data.daily.data[0].temperatureLow} .There will be ${precipitation} Rain Chances`
    callback(undefined,weatherResult);    
    }
}
)
}

module.exports=weather;