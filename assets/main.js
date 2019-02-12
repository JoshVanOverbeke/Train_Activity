
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhqpvQ3s2HBFbO-mngp_6hbHWtw0A4MRU",
    authDomain: "inclass-79b1d.firebaseapp.com",
    databaseURL: "https://inclass-79b1d.firebaseio.com",
    projectId: "inclass-79b1d",
    storageBucket: "inclass-79b1d.appspot.com",
    messagingSenderId: "612915633247"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();
  // Initial Values
  var train       = "";
  var destination = "";
  var train0      = "";
  var frequency   = 0;
  var minutesAway = 0;
  var nextArrival = "";


  $("#add-train").on("click", function(event) {
    event.preventDefault();

    train       = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    train0      = $("#train0-input").val().trim();
    frequency   = $("#frequency-input").val().trim();
    //math for time minutes away and next arrival by using moment
    minutesAway = frequency - (Math.abs(moment().diff(moment(train0, 'HH:mm'), 'minutes')) % frequency);
    nextArrival = moment(moment().add(minutesAway, "minutes")).format('h:mm A');
    
    console.log(minutesAway);
    console.log(nextArrival);
    // Code for the push
    dataRef.ref().push({
      train: train,
      destination: destination,
      train0: train0,
      frequency: frequency,
      minutesAway: minutesAway,
      nextArrival: nextArrival,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#train0-input").val("");
    $("#frequency-input").val("");
  });

  dataRef.ref().on("child_added", function(snapshot) {
    //dynamic table created from firebase values
    $("#train-list").prepend(
      "<tr>"  +
        "<td>" + snapshot.val().train    + "</td>" +
        "<td>"  + snapshot.val().destination   + "</td>"  +
        "<td>"  + snapshot.val().frequency     + "</td>"  +
        "<td>"  + snapshot.val().nextArrival + "</td>"  +
        "<td>"  + snapshot.val().minutesAway + "</td>"  + 
      "</tr>"
    )

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });