$(document).ready(function () {
  //retrieve date and time from moment.js
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
  var currentHour = moment().hour();

  //color-code time blocks
  $(".time-block").each(function () {
    var blockTime = parseInt($(this).attr("data-time"));
    if (blockTime < currentHour) {
      $(this).children("div>textarea").addClass("past");
    } else if (blockTime === currentHour) {
      $(this).children("div>textarea").addClass("present");
    } else {
      $(this).children("div>textarea").addClass("future");
    }
  });

  //array in which to store appointments

  //store appointments
  $(".saveBtn").on("click", function () {
    //debugger;
    var appointments = JSON.parse(localStorage.getItem("appointments"));
    var appmt = {
      task: $(this).siblings("textarea").val(),
      time: parseInt($(this).parent().attr("data-time")),
    };
    appointments.push(appmt);
    localStorage.setItem("appointments", JSON.stringify(appointments));
  });

  //show saved appointments
  //update storage to save items into array
  function showAppointments() {
    var savedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if (!savedAppointments == []) {
      $(".time-block").each(function () {
        var blockTime = parseInt($(this).attr("data-time"));
        for (var i = 0; i < savedAppointments.length; i++) {
          if (blockTime === savedAppointments[i].time) {
            $(this).children("div>textarea").text(savedAppointments[i].task);
          }
        }
      });
    }
  }
  //loop through stored array to display items
  //find div where attr("data-time") = appmnt time
  //render appmt as inner html of div>text area
  //console.log(savedAppointments);
  //   savedAppointments.forEach( (appmt) => {
  //     if (appmt.time=)
  //   })

  showAppointments();
});
