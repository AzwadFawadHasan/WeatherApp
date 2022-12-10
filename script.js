//gathering all the element through by get element by id
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

//now we need to update all our data
//first we will do it without the use of weather api
//using a setinterval function will be called after a particular interval till the interval is cleared
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//const API_KEY = '4a56f5f786f5452554fd6c63b1928d87';//my API KEY
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

//for api we need to call the url which contains the lat, lon and path that we want to explore
//to call this api we will use a different fucntion

setInterval(()=>{//this setInterval function is a call-back function
    //this function will be called every 1 second

    //creating an array for days and months



    const time = new Date();//creating a variable called time, using the DAte class
    //now we need to format this date, to get the different values
    const month = time.getMonth();// here we are getting the values from 0-11 we need to convert these later
    const date = time.getDate();// here we are getting the values from 0-6 we need to convert these later
    const day = time.getDay();
    const hour = time.getHours();//this hour give hour in 24 hour format
    const hoursIn12HrFormat = hour>=13? hour%12: hour;
    const minutes = time.getMinutes();
    const ampm = hour>= 12?'PM':'AM';


    //setting up the Time and date
    //using string concatination
    timeEl.innerHTML = hoursIn12HrFormat + ':' +  minutes + ':' + `<span id="am-pm">${ampm}</span>`;

    //updating the date
    dateEl.innerHTML = days[day]+', '+date+' '+months[month];
 


},1000);


getWeatherData()
function getWeatherData () {
    // we will use the navigator to get the geo location and based on that we will get the latitude and longnitude
    navigator.geolocation.getCurrentPosition((success) => {//getCurrentPosition() will have a successcallback, error callback
        //after getting the lat and long we will fetch the api
        //this whole api then returns a response using the . operator
         //now we have gotten a response from the api
        // so now we will use this data response to call the data below using the function
        //showWeatherData(data);this will show the humidity, speed, time etc
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })


    })
}

/*
getWeatherData();

function getWeatherData(){
    // we will use the navigator to get the geo location and based on that we will get the latitude and longnitude
    navigator.geolocation.getCurrentPosition((success) =>{//getCurrentPosition() will have a successcallback, error callback
        console.log(success);
        let {latitude, longnitude} = success.coords;
        //after getting the lat and long we will fetch the api
        //this whole api then returns a response using the . operator
         //now we have gotten a response from the api
        // so now we will use this data response to call the data below using the function
        //showWeatherData(data);this will show the humidity, speed, time etc
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longnitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(
            data=>{
       
        console.log(data);
        showWeatherData(data);
    })



    })
}
*/

//this will show the humidity, speed, time etc
function showWeatherData (data){
    //making all the variables for humidity,humidity, pressure, sunrise, sunset, wind_speed
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'
    //taking elements from html
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;


    
}



/*
function showWeatherData(){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;



}*/