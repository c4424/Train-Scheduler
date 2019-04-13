// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the trains database.
// 4. Create a way to calculate the minute frequency. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate how many minutes until the next train

    // 1. Initialize Firebase
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyALONC2AjselI12SeOlCwPadEehn28IqQY",
    authDomain: "train-scheduler-95b23.firebaseapp.com",
    databaseURL: "https://train-scheduler-95b23.firebaseio.com",
    projectId: "train-scheduler-95b23",
    storageBucket: "train-scheduler-95b23.appspot.com",
    messagingSenderId: "961404484545"
};

    firebase.initializeApp(config);

    var randomTime = "12:00";
    var randomFrequency = "HH:mm";
    var convertedDate = moment(randomTime, randomFrequency);

    // 2. Button for adding Employees
    document.querySelector("#add-train-btn").addEventListener("click", function(event) {
    event.preventDefault();
  

    // Grabs user input
    var trainName = document.querySelector("#train-name-input").value.trim();
    var trainDestination = document.querySelector("#train-destination-input").value.trim();
    var firstTrainTime = moment(document.querySelector("#first-train-time-input").value.trim(), "hh:mm").format("hh:mm");
    var trainFrequency = document.querySelector("#frequency-input").value.trim();


    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first_train_time: firstTrainTime,
      frequency: trainFrequency,
    };
  

    // Uploads train data to the database
    database.ref().push(newTrain);

  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first_train_time);
    console.log(newTrain.frequency);
  
    
    // Clears all of the text-boxes
    document.querySelector("#train-name-input").value = "";
    document.querySelector("#train-destination-input").value = "";
    document.querySelector("#first-train-time-input").value = "";
    document.querySelector("#frequency-input").value = "";
});


    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first_train_time;
    var trainFrequency = childSnapshot.val().frequency;
   
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    // create a temp object of our values
    let tempTrainData = {
    name: trainName,
    destination: trainDestination,
  };

    // Calculate next train arrival using MOMENT JS format-------------------------------------------------------------    
    var nextArrival = moment().add(10, 'minutes').calendar();
    console.log(nextArrival);


    // Calculate the total of how many minutes until the next train arrives--------------------------------------------
    var MinutesAway = trainFrequency + parseInt(trainFrequency.replace(',', ''));
    console.log(trainFrequency);

    tempTrainData.minutes_away = MinutesAway;
    console.log(tempTrainData);


    
    for (let prop of Object.values(tempTrainData)) {
        let newTd = document.createElement("td");
            newTd.innerText = prop;
            newRow.appendChild(newTd);
    }

    // Append the new row to the "train table"
    document.querySelector("#train-table > tbody").appendChild(newRow);

});
