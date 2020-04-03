'use strict';
const axios = require("axios");

const key = "3c4c52694850c00cef05dd5111e9c111";

module.exports.getWeather = async (event) => {
  const ciudad = event.currentIntent.slots["Ciudad"];
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&units=metric&APPID=" + key + "";

  try {
    const response = await axios.get(url);
    const data = response.data;

    const answer = "La temperatura es " + data.main.temp + "° C y la humedad es " 
                    + data.main.humidity + "% y " + data.weather[0].description + " se espera.";
    
    return {
      "sessionAttributes": {},
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": answer
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
