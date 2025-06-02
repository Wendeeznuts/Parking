const MAX_PARKING_SLOTS = 50;
const parkedCars = new Array(MAX_PARKING_SLOTS).fill(null);

function getCurrentTimestamp() {
    return new Date();
}

function isCarParkFull() {
    return parkedCars.every(slot => slot !== null);
}

function parkCar() {
    const numberPlate = document.getElementById("plateInput").value.toUpperCase();
    if (!numberPlate) return alert("Please enter a number plate.");

    if (isCarParkFull()) {
        display(`Car park is full. Cannot park ${numberPlate}.`);
        return;
    }

    for (let i = 0; i < MAX_PARKING_SLOTS; i++) {
        if (parkedCars[i] === null) {
            parkedCars[i] = {
                numberPlate,
                entryTime: getCurrentTimestamp()
            };
            display(`Car ${numberPlate} parked at slot ${i + 1}.`);
            return;
        }
    }
}

function removeCar() {
    const numberPlate = document.getElementById("plateInput").value.toUpperCase();
    if (!numberPlate) return alert("Please enter a number plate.");

    for (let i = 0; i < MAX_PARKING_SLOTS; i++) {
        if (parkedCars[i] && parkedCars[i].numberPlate === numberPlate) {
            const exitTime = getCurrentTimestamp();
            const duration = (exitTime - parkedCars[i].entryTime) / (1000 * 60 * 60);
            const hours = Math.ceil(duration);
            const fee = hours <= 1 ? 500 : 500 + (hours - 1) * 300;

            display(`Car ${numberPlate} exited from slot ${i + 1}\nParked for ${hours} hour(s)\nFee: Rwf ${fee}`);
            parkedCars[i] = null;
            return;
        }
    }

    display(`Car ${numberPlate} not found.`);
}

function showParkedCars() {
    let output = "Parked Cars:\n";
    parkedCars.forEach((car, index) => {
        if (car) output += `Slot ${index + 1}: ${car.numberPlate} (Entered at: ${car.entryTime.toLocaleTimeString()})\n`;
    });
    display(output);
}

function showAvailableSlots() {
    const free = parkedCars.filter(s => s === null).length;
    display(`Available slots: ${free}/${MAX_PARKING_SLOTS}`);
}

function display(text) {
    document.getElementById("output").textContent = text;
}