var statsArray = [];

function getStateStats() {
	var options = { 
		enableHighAccuracy: true, 
		timeout: 5000, 
		maximumAge: 0 
	}; 
	var coordinates = new Array;
	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		coordinates = [lat, lng]
        getCity(coordinates);
        // console.log("statsarray: ", statsArray);
        return statsArray;
        //console.log(coordinates);
	}

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error, options); 
} 

// Step 2: Get city name 
function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 

	// Paste your LocationIQ token below. 
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?" + 
	lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 
	var count = 0;
	function processRequest(e) { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			  var response = JSON.parse(xhr.responseText); 
			  nativestate = response.address.state; 
			if(count == 0){
			  	return CasesNearYou(nativestate);
			}
			count++;
			  return; 
		} 
	}
}

function CasesNearYou(s){
 	let map = new Map();
	 map.set("Andhra Pradesh" , "2");
	     map.set("Arunachal Pradesh" , "27");
	     map.set("Assam" , "14");
	     map.set("Bihar" , "11");
	     map.set("Chhattisgarh" , "12");
	     map.set("Goa" , "21");
		 map.set("Karnataka" , "1");
	     map.set("Gujarat" ,"15");
	     map.set("Telangana" , "9");
	     map.set("Haryana" , "IN-HR");
	     map.set("Himachal Pradesh", "22");
	     map.set("Jammu and Kashmir" , "19");
	     map.set("Jharkhand" , "18");
	     map.set("Karnataka" ,"1");
	     map.set("Kerala" ,"4");
	     map.set("Madhya Pradesh" , "16");
	     map.set("Mizoram" , "33");
	     map.set("Nagaland" , "29");
	     map.set("Orissa" , "8");
	     map.set("Punjab" ,  "17");
	     map.set("Rajasthan" , "10");
	     map.set("Sikkim" , "31");
	     map.set("Tamil Nadu" , "3");
	     map.set("Tripura" , "24");
	     map.set("Uttarakhand" , "20");
	     map.set("Uttar Pradesh" , "6");
	     map.set("West Bengal" , "7");
	     map.set("Tamil Nadu" , "3");
	     map.set("Tripura"   , "IN-TR");
	     map.set("Andaman and Nicobar Islands" , "32");
	     map.set("Daman and Diu" , "34");
	     map.set("Delhi" , "25");
		 map.set("Manipur" , "5");
	     map.set("Lakshadweep" , "36");
	     map.set("Pondicherry" , "23");

	var x = map.get(s);
		// console.log(s);
		fetch('https://api.covidindiatracker.com/state_data.json')
			.then(function (response) {
			return response.json();
		})
		
		.then(function(data){
            
            var p = data[x];
            // console.log("ye wala: "+ p)
			// console.log("idhar aa raha h")
            var confirmed = (p["confirmed"]).toString() + "<br>";
            var active = p["active"].toString() + "<br>";
            var recovered = p["recovered"].toString() + "<br>";
            var deaths = p["deaths"].toString() + "<br>";
            window.statsArray = [confirmed, active, recovered, deaths];
			// return [confirmed, active, recovered, deaths]
		});
}

function returner(arr) {
    return arr;
}
