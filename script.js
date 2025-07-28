
document.addEventListener("DOMContentLoaded",function(){
    const itemcontainer=document.querySelector(".item-container");
    const userinputcontainer=document.querySelector(".user-inputcontainer");
    const City_Name=document.querySelector(".user-input");
    const Searchbtn=document.querySelector(".btnSearch");
    const cloudimagecontainer=document.querySelector(".cloudimage-container");
    const sunheat=document.getElementById("sun-heat");
    const heat=document.getElementById("heat");
    const Updated_city=document.getElementById("Updatedcity");
    const humiditywindcontainer=document.querySelector(".humidity-wind-container");
    const humiditycontainer=document.querySelector(".humidity-container");
    const hw=document.querySelector(".hw");
    const humidityper=document.getElementById("humidityper");
    const humidity=document.getElementById("humidity");
    const windcontainer=document.querySelector(".wind-container");
    const winddet=document.getElementById("winddet");
    const kmsh=document.getElementById("kmh");
    const speeds=document.getElementById("speed");
    const weathericon=document.querySelector(".weather-icon");
    const btnview=document.querySelector(".btnforecast");
    
    // console.log(city);

    function check_city(cityName){
     
        if(cityName===""){
            alert("City Name could not be blank");
            return false;
        }
        const regex= /^[a-zA-Z\s\-]{3,50}$/;
        const isCityNameMatching=regex.test(cityName);
        if(!isCityNameMatching){
            alert("Enter a Valid City Name");
            return false;
        }
        return true
    }
    function sleep(ms)
    {
        return new Promise(resolve=>setTimeout(resolve,ms));
    }
    const searchIcon=`<img src="./images/icons8-search-30.png" alt="search-icon">`;

    async function FillWeather_details(name_city){
        //open weather map signin username=deepa password=shrivara@08102019 within deepa apikey and copy current date api call
        await sleep(1000);
        // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        const apikey="4ac3f4fe70a904fa121ecd623ae13b7a";
        const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        try{
            Searchbtn.disabled =true;
            Searchbtn.innerHTML=`<span class="spinner"></span>`;
            const detailsSection=document.querySelector(".details");
            const response = await fetch(apiUrl + name_city + `&appid=${apikey}`);

            if(response.status==404){
                document.getElementById("check-cty").style.display="block";
                document.querySelector(".details").style.display="none";
                  return;
            }
            else if(!response.ok)
            {
                document.querySelector(".details").style.display="none";
                throw new Error(`HTTP error! status : ${response.status}`);
                return;
            }
            const weatherData=await response.json();
            heat.textContent = Math.round(weatherData.main.temp) + "°C";
            Updated_city.textContent = weatherData.name;
            humidityper.textContent = Math.round(weatherData.main.humidity) + "%";
            kmsh.textContent = Math.round(weatherData.wind.speed) + " km/h";

            document.querySelector(".details").style.display="block";
            document.getElementById("check-cty").style.display="none"

            if(weatherData.weather[0].main=="Clear"){
                weathericon.src="images/sun.png";
            }else if(weatherData.weather[0].main=="Clouds"){
                weathericon.src="images/cloudi.png";
            }
            else if(weatherData.weather[0].main=="Rain"){
                weathericon.src="images/rain.png";
            }
            else{
                 weathericon.src="images/rain.png";
            }
            console.log(weatherData);
            // console.log(CTy);
        }
        catch(error)
        {
            humiditywindcontainer.innerHTML =`<p>No Data Found + (${error.message})</p>`;
        }
        finally{
           Searchbtn.innerHTML = searchIcon;
           Searchbtn.disabled=false;
        }
    }
    function ClearAll_inputs(){
        City_Name.value ="";
        Searchbtn.innerHTML = searchIcon;
        City_Name.focus();
    }
    City_Name.addEventListener('keydown',(event)=>{
        if(event.key=='Enter'){
      
          const pElement=humiditywindcontainer.querySelector("p");
          if(pElement)
          {
                pElement.textContent="";
          }
           Searchbtn.click();
        }
    } )
    Searchbtn.addEventListener('click', async function(){
       City_Name.value = City_Name.value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
       const nameCity=City_Name.value.trim();
       if(check_city(nameCity)){
            await FillWeather_details(nameCity);
            await sleep(2000);
            ClearAll_inputs();
       }
    })
    // async function fill_weatherforecast(viewCity){

    //     fApikey="4ac3f4fe70a904fa121ecd623ae13b7a";
    //     fUrl="https://pro.openweathermap.org/data/2.5/forecast/hourly?q=";

        // https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}
        // console.log("https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}");
        // https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Udupi&appid=f5b6ec609c86e6c65edb55ead0f51c3a


    //     http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    //     http://api.openweathermap.org/geo/1.0/direct?q=Udupi&limit=5&appid=4ac3f4fe70a904fa121ecd623ae13b7a
    //     4ac3f4fe70a904fa121ecd623ae13b7a

    //     http://api.openweathermap.org/geo/1.0/direct?q=Udupi,{state code},{country code}&limit=5&appid={API key}

    //     https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=13.3419169&lon=74.7473232&appid=4ac3f4fe70a904fa121ecd623ae13b7a
    //     http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=4ac3f4fe70a904fa121ecd623ae13b7a


    // //           "lat":51.4973206,
    // //   "lon":-0.137149


    //   https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=51.4973206&lon=-0.137149&appid=169bedc7dc3684e8e7565fda6d4ec842

    //     const fetchUrl=fUrl + viewCity + `&appid=${fApikey}`;
    //     console.log(fetchUrl);
    //     const response=await fetch(fetchUrl);
    //     try{
    //         if(response.ok)
    //         {
    //             const foreCastData=await response.json();
    //             console.log(foreCastData);
    //         }
    //         else{
    //         throw new Error(`HTTP error! status : ${response.status}`);
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.error("Fetch failed:", error.message);
    //     }

    // }
    // btnview.addEventListener("click", async function () {
    //     const viewCity=Updated_city.innerText;
    //     await sleep(1000)
    //     fill_weatherforecast(viewCity)
    // })
});