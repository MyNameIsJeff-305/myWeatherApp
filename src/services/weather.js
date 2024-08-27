const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
    }
};

const getConditionImageURL = (condition) => {
    if (condition.includes('sunny') || condition.includes('Sunny') || condition.includes('clear') || condition.includes('Clear')) { //OK
        return "src/img/sunny.jpg";
    } else if (condition.includes('cloudy') || condition.includes('Cloudy')) { //OK
        return "src/img/cloudy.jpg";
    } else if (condition.includes('rain') || condition.includes('Rain')) { //OK
        if (condition.includes('storm') || condition.includes('Storm') || condition.includes('thunder') || condition.includes('Thunder') || condition.includes('lightning') || condition.includes('Light') || condition.includes('light')) {
            return "src/img/storm.jpg";
        }
        return "src/img/rainy.jpg";
    } else if (condition.includes('snow') || condition.includes('Snow')) {
        return "src/img/snow.jpg";
    } else if (condition.includes('fog') || condition.includes('Fog')) {
        return "src/img/fog.jpg";
    } else {
        return "src/img/default.jpg";
    }
};

export async function getWeatherFrom(query) {
    const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
        options
    );

    const response_2 = await response.json();

    const { location, current } = response_2;
    const { country, localtime, name } = location;
    const { condition, humidity, feelslike_f, is_day, wind_mph, wind_kph, wind_dir, temp_f, feelslike_c, temp_c } = current;
    const { text } = condition;

    return {
        condition,
        conditionText: text,
        conditionImageURL: getConditionImageURL(text),
        country,
        localtime,
        name,
        humidity,
        isDay: is_day,
        feelsLike: { feelslike_f, feelslike_c },
        temperature: { temp_f, temp_c },
        windSpeed: { wind_mph: wind_mph, wind_kph: wind_kph },
        windDir: wind_dir
    };
}

export async function getForecast(city, days = 5) {
    const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=${days}`,
        options
    );

    const data = await response.json();

    return data;
}
