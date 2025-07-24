function calculateWindChill(temperatureC, windSpeedKmh) {
    if (temperatureC > 10 || windSpeedKmh < 4.8) {
        return "N/A";
    }

    const windChill = 13.12 + (0.6215 * temperatureC)
        - (11.37 * Math.pow(windSpeedKmh, 0.16))
        + (0.3965 * temperatureC * Math.pow(windSpeedKmh, 0.16));

    return windChill.toFixed(1);
}

const temperatureC = 22;
const windSpeedKmh = 3;

let wc = document.getElementById("wc");

wc.textContent = calculateWindChill(temperatureC, windSpeedKmh) + " °C";