// Here we are using constants as this should not be updated
const API_URL = "http://localhost:3000/api/v1/";

const getFlights = async () => {
    // GET request for all flights
    try {
        const response = await axios(API_URL + 'flights');
        console.log('Successfully retrived data: ' + response.data);
        
        let dataOutEl = document.getElementById('arrivalData');
        response.data.forEach(obj => {
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
            estimatedEl.textContent = obj.Estimated.slice(11, 16);

            let statusEl = document.createElement('td');
            statusEl.textContent = obj.Status;

            let standEl = document.createElement('td');
            standEl.textContent = obj.Stand;

            let baggageClaimEl = document.createElement('td');
            baggageClaimEl.textContent = obj.BaggageClaim;

            let gateEl = document.createElement('td');
            gateEl.textContent = obj.Gate;

            dataOutEl.appendChild(trEl);

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
        });

            /*

                <th>Flight</th> No
                <th>A/C Type</th> AircraftType
                <th>A/C Reg</th> Aircraft
                <th>Origin</th> OriginDest
                <th>STA</th> Scheduled
                <th>ETA</th> Estimated
                <th>Status</th> Status
                <th>Stand</th> Stand
                <th>Belt</th> BaggageClaim
                <th>Gate</th> Gate
*/
    } 
    catch (error) {
        console.log(error);
    }
    
};


getFlights();
