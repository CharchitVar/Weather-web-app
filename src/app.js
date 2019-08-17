const path=require('path');
const express =require('express');
const app=express();
const hbs=require('hbs'); //For Partials these are the part of the view which cpuld be common for every page like footer or headers
const weather=require('./utils/weatherResult');
const geoCode=require('./utils/geoCode');
const port=process.env.PORT || 4500;

//Define path for express config
const publicDirectorypath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');     
hbs.registerPartials(partialsPath);

//setup handlerbars engines and views location
app.set('view engine','hbs');
app.set('views',viewPath);


//setup static directory to serve
app.use(express.static(publicDirectorypath));



//------main code starts from here
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Charchit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Charchit',
        location:'Aligarh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'Provide an Help message here buddy !!!!',
        name:'Charchit'
        
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Weather',
        errorMessage:'404 Help Page Not Found'

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address && !req.query.lang){
        return res.send({
            error:'You must Provide a Addres and also select a language'
        })
    }
    if(!req.query.address){
        return res.send({
            error:'You must Provide a Address !'
        })
    }
    if(!req.query.lang){
        return res.send({
            error:'You must Provide a Language'
        })
    }
    geoCode(req.query.address,(error,geoCodeResult)=>{
        if(error){
             res.send({
                error:error
            })
        }
        else if(geoCodeResult){
        weather(geoCodeResult.latitude,geoCodeResult.longitude,req.query.lang,(error,weatherResult)=>{
            if(error){
                res.send({
                    error:error
                })
            }
            else if(weatherResult){
                res.send({
                    WeatherResult:`The Weather Result of ${geoCodeResult.location} is ${weatherResult}`
                })
              
            }
        })
            }
        }
        )
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'Weather',
        errorMessage:'404 Page Not Found'

    })
})




app.listen(port,()=>{
    console.log('server is up on Port '+port);
});