// Displays Today's Day and Date
var todayDate = dayjs().format('dddd, MMM DD YYYY');
$("#currentDay").html(todayDate);
// console.log(todayDate);
$("#currentDay").prepend("Today is ");


$(document).ready(function() {

    // console.log( "ready!" );

    // Listener for Click Events on the Save Button
    $(".saveBtn").on("click", function() {
        // Get nearby values of the description in JQuery - EDIT THIS
        var text = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");

        // console.log(text);
        // console.log(time);

        // Saves User Input in Local Storage
        localStorage.setItem(time, text);
    })

    function timeTracker() {

        var timeNow = dayjs().hour(); // Gets Current Number of Hour
        var timeExact = dayjs().format('hh mm');
        // console.log(timeNow);
        // console.log(timeExact);

        // Loop Through Time Blocks
        $(".time-block").each(function() {
            var getTime = parseInt($(this).attr("id").split("hour")[1]);
            var blockTime = Math.abs(getTime);

            // console.log(blockTime);
            // console.log(getTime);

            // Checks Time Blocks and Adds past/present/future Classes to Apply Corresponding Styles
            if (blockTime < timeNow) {
                $(this).addClass("past");
            } else if (blockTime === timeNow) {
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            }
        })
    }

    // Checks and Displays Stored User Inputs
    $("#hour-9 .description").val(localStorage.getItem("hour-9"));
    $("#hour-10 .description").val(localStorage.getItem("hour10"));
    $("#hour-11 .description").val(localStorage.getItem("hour-11"));
    $("#hour-12 .description").val(localStorage.getItem("hour-12"));
    $("#hour-13 .description").val(localStorage.getItem("hour-13"));
    $("#hour-14 .description").val(localStorage.getItem("hour-14"));
    $("#hour-15 .description").val(localStorage.getItem("hour-15"));
    $("#hour-16 .description").val(localStorage.getItem("hour-16"));
    $("#hour-17 .description").val(localStorage.getItem("hour-17"));

    timeTracker(); // Calls the timeTracker function
})

// Function to Refresh the Webpage at the End of the Day
function refreshAt(hours, minutes, seconds) {

    var now = new Date();
    var then = new Date();

    if (now.getHours() > hours ||
        (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() {
        window.location.reload(true);
        localStorage.clear()
    }, timeout);

}

function clear() {
    localStorage.clear();
    location.reload();
    return;
}
// Clear Button
let clearBtn = $('#clearBtn');
clearBtn.on('click', clear);

// Refreshes the Page at 23:59:59
refreshAt(23, 59, 59);