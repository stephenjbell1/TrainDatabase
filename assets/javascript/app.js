
var config = {
    apiKey: "AIzaSyDNQ5Bwg8KHjhjGh_MA2csuv76NazTtYKE",
    authDomain: "firstdatabase-e461d.firebaseapp.com",
    databaseURL: "https://firstdatabase-e461d.firebaseio.com",
    projectId: "firstdatabase-e461d",
    storageBucket: "firstdatabase-e461d.appspot.com",
    messagingSenderId: "944341465273"
  };
    firebase.initializeApp(config);

  var database = firebase.database();   // reference to db service


  $(".time").html(moment().toString()); // note:REAL time, not year ago


  $("#addTrain").on("click", function(){

    // Get inputs from 'form'
    train = $('#nameinput').val().trim(); 
    dest= $('#destinput').val().trim(); 
    firstT = $('#firstTinput').val().trim(); 
    freq = $('#freqinput').val().trim(); 

    

    alert(train + " Has been added to the schedule.");
    // Change what is saved in firebase
    database.ref().push({  //database.ref().set({??? difference? 
      train: train,
      dest: dest,
      firstT: firstT,
      freq:freq
    });

    $("#nameinput").val("");  
    $("#destinput").val("");
    $("#firstTinput").val("");
    $("#freqinput").val("");

    return false;
  });


  var uhoh= database.ref().on("child_added", function(childSnapshot) {

    

    var train = childSnapshot.val().train;
    var dest = childSnapshot.val().dest;
    var firstT= childSnapshot.val().firstT;
    var freq = childSnapshot.val().freq;


    var firstTConverted = moment(firstT, "hh:mm").subtract(1, "years");
      
    var currentTime = moment();
      
    var diffTime = moment().diff(moment(firstTConverted, "hh:mm"), "minutes");
     
    var tRemainder = diffTime % freq;
      
    var minAway = freq - tRemainder;
     
    var next = moment().add(minAway, "minutes").format("hh:mm")
     

    

$("#trainTable > tbody").append("<tr><td>"+ train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + minAway + "</td></tr>");

},  function (errorObject){
    console.log("The read failed" + errorObject.code);
    setInterval (uhoh, 60000);
  
});