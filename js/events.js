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