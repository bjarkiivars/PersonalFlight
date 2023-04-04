// Here we are using constants as this should not be updated
const API_URL = "http://localhost:3000/api/v1/";

const createTable = (obj, tableEl) => {
    let trEl = document.createElement('tr');

    let flNoEl = document.createElement('td');
    flNoEl.textContent = obj.No;

    let acTypeEl = document.createElement('td');
    acTypeEl.textContent = obj.AircraftType;

    let acEl = document.createElement('td');
    acEl.textContent = obj.Aircraft;

    let originEl = document.createElement('td');
    originEl.textContent = obj.OriginDest;

    let scheduleEl = document.createElement('td');
    scheduleEl.textContent = obj.Scheduled.slice(11, 16);

    let estimatedEl = document.createElement('td');
    if (obj.Estimated === null) {
        estimatedEl.textContent = "";
    }
    else {
        estimatedEl.textContent = obj.Estimated.slice(11, 16);
    };

    let statusEl = document.createElement('td');
    statusEl.textContent = obj.Status;

    let standEl = document.createElement('td');
    standEl.textContent = obj.Stand;

    let baggageClaimEl = document.createElement('td');
    baggageClaimEl.textContent = obj.BaggageClaim;

    let gateEl = document.createElement('td');
    gateEl.textContent = obj.Gate;

    tableEl.appendChild(trEl);

    trEl.appendChild(flNoEl);
    trEl.appendChild(acTypeEl);
    trEl.appendChild(acEl);
    trEl.appendChild(originEl);
    trEl.appendChild(scheduleEl);
    trEl.appendChild(estimatedEl);
    trEl.appendChild(statusEl);
    trEl.appendChild(standEl);
    trEl.appendChild(baggageClaimEl);
    trEl.appendChild(gateEl);
}

const removeTable = (elements) => {
    while (elements.hasChildNodes()) {
        elements.removeChild(elements.firstChild);
    }
};

// If no filter is given, we display all flights.
const getArrivals = async (filterStr = '') => {
    try {
        const response = await axios(API_URL + `arrivals/flights?${filterStr}`);
        
        let arrivalEl = document.getElementById('arrivalData');
        response.data.forEach(obj => {
            createTable(obj, arrivalEl);
        });

    } 
    catch (error) {
        console.log(error);
    }
    
};
getArrivals();
setInterval(getArrivals, 60 * 1000);

const getDepartures = async (filterStr = '') => {
    try {
        const response = await axios(API_URL + `departures/flights?${filterStr}`);

        let departureEl = document.getElementById('departureData');
        response.data.forEach(obj => {
            createTable(obj, departureEl);
        });
    }
    catch (error) {
        console.log(error);
    };
};

getDepartures();
setInterval(getDepartures, 60 * 1000);

const filterArrival = (filterKey, filterValue, checkbox) => {
    checkEl = document.getElementById(`${checkbox}`);
    let arrivalEl = document.getElementById('arrivalData');
    if (checkEl.checked) {
        let filterStr = `filter[${filterKey}]=${filterValue}`;
        removeTable(arrivalEl);
        getArrivals(filterStr);
    } else {
        removeTable(arrivalEl);
        getArrivals();
    };
};

const filterDepartures = (filterKey, filterValue, checkbox) => {
    checkEl = document.getElementById(`${checkbox}`);
    let arrivalEl = document.getElementById('departureData');
    if (checkEl.checked) {
        let filterStr = `filter[${filterKey}]=${filterValue}`;
        removeTable(arrivalEl);
        getDepartures(filterStr);
    } else {
        removeTable(arrivalEl);
        getDepartures();
    };
};