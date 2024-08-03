const express = require("express");  
const request = require("request");  

const app = express();  

app.get("/", (req, res) => {  
    const city = req.query.city || "New Delhi"; // Default to New Delhi if no city provided  
    request(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=d597083d0558fe30ca67fe9a3ad3794a&units=metric`, function (error, response, body) {  
        if (error) {  
            return res.status(500).send("Internal Server Error");  
        }  

        let data;  
        try {  
            data = JSON.parse(body);  
        } catch (e) {  
            return res.status(500).send("Error parsing response");  
        }  

        if (response.statusCode === 200) {  
            // Check if weather data is present  
            if (data.weather && data.weather.length > 0) {  
                res.send(`The Current Weather in your City ${city} is ${data.weather[0].description}. Temperature: ${data.main.temp}°C`);  
            } else {  
                res.send(`Weather data not available for ${city}.`);  
            }  
        } else {  
            res.send(`Error: ${data.message}`);  
        }  
    });  
});  

app.listen(4000, () => console.log("Server is running on port 4000"));