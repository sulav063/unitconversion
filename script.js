const unitConversions = {
    length: {
        "Meters": 1, "Kilometers": 1000, "Centimeters": 0.01, "Millimeters": 0.001,
        "Miles": 1609.34, "Yards": 0.9144, "Feet": 0.3048, "Inches": 0.0254
    },
    weight: {
        "Kilograms": 1, "Grams": 0.001, "Milligrams": 0.000001, "Pounds": 0.453592,
        "Ounces": 0.0283495, "Tons": 1000, "Quintals": 100
    },
    volume: {
        "Liters": 1, "Milliliters": 0.001, "Cubic meters": 1000, "Cubic centimeters": 0.001,
        "Gallons": 3.78541, "Pints": 0.473176
    },
    temperature: {
        "Celsius": "Celsius", "Fahrenheit": "Fahrenheit", "Kelvin": "Kelvin"
    },
    speed: {
        "Meters per second": 1, "Kilometers per hour": 0.277778, "Miles per hour": 0.44704,
        "Knots": 0.514444
    },
    time: {
        "Seconds": 1, "Minutes": 60, "Hours": 3600, "Days": 86400,
        "Weeks": 604800, "Months": 2628000, "Years": 31536000
    },
    digital: {
        "Bits": 1, "Bytes": 8, "Kilobytes": 8000, "Megabytes": 8000000,
        "Gigabytes": 8000000000, "Terabytes": 8e12, "Petabytes": 8e15
    },
    energy: {
        "Joules": 1, "Kilojoules": 1000, "Calories": 4.184, "Kilocalories": 4184,
        "Watt-hours": 3600, "Kilowatt-hours": 3.6e6
    }
};

function populateUnits() {
    const category = document.getElementById("unitType").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    Object.keys(unitConversions[category]).forEach(unit => {
        let option1 = new Option(unit, unit);
        let option2 = new Option(unit, unit);
        fromUnit.add(option1);
        toUnit.add(option2);
    });
}

function convert() {
    let value = parseFloat(document.getElementById("valueInput").value);
    let category = document.getElementById("unitType").value;
    let fromUnit = document.getElementById("fromUnit").value;
    let toUnit = document.getElementById("toUnit").value;
    let resultField = document.getElementById("result");

    if (isNaN(value) || !fromUnit || !toUnit) {
        resultField.innerText = "Please enter a valid number and select units.";
        return;
    }

    if (category === "temperature") {
        resultField.innerText = `${value} ${fromUnit} = ${convertTemperature(value, fromUnit, toUnit)}`;
        return;
    }

    let baseValue = value * unitConversions[category][fromUnit];
    let convertedValue = baseValue / unitConversions[category][toUnit];
    resultField.innerText = `${value} ${fromUnit} = ${convertedValue.toFixed(6)} ${toUnit}`;
}

function convertTemperature(value, from, to) {
    if (from === to) return `${value} ${to}`;

    let converted;
    switch (from) {
        case "Celsius":
            converted = to === "Fahrenheit" ? (value * 9 / 5 + 32) :
                        to === "Kelvin" ? (value + 273.15) : null;
            break;
        case "Fahrenheit":
            converted = to === "Celsius" ? ((value - 32) * 5 / 9) :
                        to === "Kelvin" ? ((value - 32) * 5 / 9 + 273.15) : null;
            break;
        case "Kelvin":
            converted = to === "Celsius" ? (value - 273.15) :
                        to === "Fahrenheit" ? ((value - 273.15) * 9 / 5 + 32) : null;
            break;
    }

    return converted !== null ? `${converted.toFixed(2)} ${to}` : "Invalid conversion";
}

document.addEventListener("DOMContentLoaded", populateUnits);
