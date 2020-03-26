const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=aee52151b6cc7c7556030fdb68db7347";
fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    //console.log(jsObject)//
    document.getElementById('currently').textContent = jsObject.weather[0].main; 
    document.getElementById('current-temp').textContent = jsObject.main.temp + " ˚F"; 
    document.getElementById('humidity').textContent = jsObject.main.humidity + " %"; 
    document.getElementById('wind-speed').textContent = jsObject.wind.speed + " mph"; 

    let t = jsObject.main.temp;
    let s = jsObject.wind.speed;

    if (t <= 50 && s > 3) {
      let chill = 35.74 + 0.6215 * t - 35.75 * Math.pow(s, .16) + 0.4275 * t * Math.pow(s, .16);
      document.getElementById("windchill").textContent = chill.toFixed(2) + " ˚F";
    } else {
      document.getElementById("windchill").textContent = "N/A"; //W1nd Ch177
    }
  });

//Forcast// The url and all five days

const apiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=aee52151b6cc7c7556030fdb68db7347";
fetch(apiURL2)
  .then((response) => response.json())
  .then((jsObject2) => {
    

    let fivedayforecast = [];
    let day = 1;
    let weekday = [];
    var days = new Array('Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat');

    for (let i = 0; i < jsObject2.list.length && day < 6; i++) {
      if (jsObject2.list[i].dt_txt.includes("18:00:00")) {
        fivedayforecast[i] = jsObject2.list[i].main.temp;
        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject2.list[i].weather[0].icon + '.png';
        const desc = jsObject2.list[i].weather[0].description; 

        let now = new Date(jsObject2.list[i].dt_txt);
        weekday = days[now.getDay()];
        document.getElementById("day" + day).innerHTML = weekday;
        document.getElementById("forecast" + day).innerHTML = fivedayforecast[i] + "&deg; F";
        document.getElementById("icon" + day).setAttribute("src", imagesrc); 
        document.getElementById("icon" + day).setAttribute("alt", desc);
        day++;
      }
    }
  });

  const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })  
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];
    
    for (let i = 0; i < towns.length; i++) {
      if (towns[i].name == "Preston") {
        let eventul = document.createElement('ul');
        let eventdiv = document.createElement('div');
        for (let cont = 0; cont < towns[i].events.length; cont++) {
          let list = document.createElement('li');
          
          list.setAttribute('class', 'eventlist');
          list.textContent = towns[i].events[cont];
          eventul.appendChild(list);
        }

        eventdiv.appendChild(eventul);
        document.querySelector('div.eventdiv').appendChild(eventdiv);
      }
    }
});