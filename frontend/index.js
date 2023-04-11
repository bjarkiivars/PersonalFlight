// Here we are using constants as this should not be updated
const API_URL = "http://localhost:3000/api/v1/";

// Populate the DOM with table elements
const createTable = (obj, tableEl) => {
    // table row element
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
    
    // Apply animation to the addition of my DOM elements
    setTimeout(() => {
        trEl.classList.add('show');
    }, 100);

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

// Needs some adjustment, we are trying to remove elements that do not exist
// if we click too fast
const removeTable = (elements) => {
    return new Promise((resolve) => {
        const rows = Array.from(elements.children);

        if (rows.length === 0) {
            resolve();
            return;
        }

        rows.forEach((row, index) => {
            row.classList.remove('show');

            setTimeout(() => {
                elements.removeChild(row);

                // Resolve the promise when the last row has been removed
                if (index === rows.length - 1) {
                    resolve();
                }
            }, 300 + (index * 50));
        });
    });
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
// If I want to refresh data, I call to this function
//setInterval(getArrivals, 60 * 1000);

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
// if I want to refresh data, I call to this function
//setInterval(getDepartures, 60 * 1000);

// Filter array, that corresponds to the items being selected
const callQuery = [
    { id: "1", query : "filter[AirlineIATA]=FI"},
    { id: "2", query : "filter[Gate]=D"},
    { id: "3", query : "filter[Gate]=A"},
    { id: "4", query : "filter[Gate]=C"},
    { id: "5", query : "filter[Stand]=outside"}
];

// Called upon whenever the DOM has finished loading
const initialize = async () => {
    // Arrival filtering
    const checkContainerArr = document.getElementById('checkContainerArr');
    const checkboxesArr = checkContainerArr.querySelectorAll("input[type='checkbox']");
    const arrivalEl = document.getElementById('arrivalData');

    // async is here so that we can wait for the DOM removal of elements to be finished.
    const filterArrivals = async () => {
        const checked = Array.from(checkboxesArr)
            .filter(checkbox => checkbox.checked);
        
            let filterStr = "";

            checked.forEach(checkbox => {
                let filterQuery = callQuery.find(item => item.id === checkbox.id);
                filterStr += filterQuery.query + '&';
            });

            await removeTable(arrivalEl);
            getArrivals(filterStr);
    };

    checkboxesArr.forEach(checkbox => {
        checkbox.addEventListener("change", filterArrivals);
    });

    // Departure filtering
    const checkContainerDep = document.getElementById('checkContainerDep');
    const checkboxes = checkContainerDep.querySelectorAll("input[type='checkbox']");
    const departureEl = document.getElementById('departureData');
    
    const filterDepartures = () => {
        // Create an array containing all the checkboxes that have the status 'checked'
        const checked = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked);
        
        let filterStr = "";

        // Iterate each checkbox that is checked, and find the query in the callQuery Array, to assign the correct query to a retrn str
        checked.forEach(checkbox => {
            let filterQuery = callQuery.find(item => item.id === checkbox.id);
            filterStr += filterQuery.query + '&';
        });
        
        // Repopulate the table
        removeTable(departureEl);
        getDepartures(filterStr);
    };
    
    checkboxes.forEach(checkbox => {
        // Listen out for the checkboxes if they're being checked or unchecked
        checkbox.addEventListener("change", filterDepartures);
    });

    let arrDisplayed = true;

    // Once the minimize departures button is pressed, we hide the arrivals
    $( "#minArr" ).click(function() {
        if(arrDisplayed === true) {
            $( "#arrivalData" ).hide( "slow", () => {
                arrDisplayed = false;
                document.getElementById('minArr').src = '/img/maximize.png';
            });
        } else {
            $('#arrivalData').show("sæpw", () => {
                arrDisplayed = true;
                document.getElementById('minArr').src='/img/minimize.png';
            })
        }
        
      });
    
    let depDisplayed = true;

    // Once we minimize the minimize button on departures we hide departures
    $( "#minDep" ).click(function() {
        if(depDisplayed === true) {
            $( "#departureData" ).hide( "slow", () => {
                depDisplayed = false;
                document.getElementById('minDep').src = '/img/maximize.png';
            });
        } else {
            $('#departureData').show("slow", () => {
                depDisplayed = true;
                document.getElementById('minDep').src = '/img/minimize.png';
            });
        }
        
    });
    
};  

// Ensure the DOM has loaded before calling this function, ensure we're able to access the DOM elements correctly
window.addEventListener("DOMContentLoaded", initialize);

