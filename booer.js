
var ambientTimer, ambientCountdownTimer;

function playRandomBoo() {
  var $boos = $("audio.boos"),
  i = Math.round(Math.random() * ($boos.length - 1)),
  $boo = $boos[i];
  message("Last played: " + $($boo).attr('src'))
  $boo.play();
  console.log(i);
}

$("document").ready(function() {
  $(".instaboo button").click(playRandomBoo);
  $(".ambientboo button.start").click(startAmbientBoo);
  $(".ambientboo .info button.cancel").click(cancelAmbient);

  // http://seiyria.com/bootstrap-slider/
  // Refernce: https://github.com/seiyria/bootstrap-slider

  $slider = $(".ambientboo input.slider").slider({
    // Tooltip apparently clashes with 4.0 ? :|
    tooltip: 'never',
    // tooltip_split: true,
    min: 10,
    max: 300,
    range: true, // FER YEAH, BUT WHERE'S MY KLASSES?!?
    value: [30, 80],
    step: 10,
  }).on("change", function() { 
    var vals = $(".ambientboo input.slider").val().split(',');
    $(".ambientboo label.min").text(fmtCountdown(vals[0]));
    $(".ambientboo label.max").text(fmtCountdown(vals[1]));
});
  
  
function startAmbientBoo() {
  console.log("AMBIENT BOO.  YIKLES!!");
  randomAmbientWait();
}

function randomAmbientWait() {
  var vals = $(".ambientboo input.slider").val().split(','),
  range = vals[1] - vals[0],
  nextInterval = parseInt(vals[0]) + Math.round(Math.random() * range),
  now = new Date(),
  then = new Date(nextInterval * 1000 + now.getTime());;
  playRandomBoo();

  ambientMessage("Next boo will execute at " + then.toTimeString() + ".");
  ambientCountDown(nextInterval);
  ambientTimer = setTimeout(function() {randomAmbientWait(1)}, nextInterval * 1000);
}

function ambientCountDown(interval) {
  $(".ambientboo .info p.seconds-left").text("Booing in " + fmtCountdown(interval) + ".");
  ambientCountdownTimer = setTimeout(function() {
    $(".ambientboo .info p.seconds-left").text(--interval +  " seconds left");
    if (interval > 0) {
      ambientCountDown(interval); 
    }
  },
				     1000
				    );
}

function fmtCountdown(interval) {
  var minutes = Math.floor(interval / 60),
  seconds = interval - (minutes * 60), 
  timeStr = '';

  
  if (minutes > 1) {
    timeStr = minutes + " minutes, "
  } else if (minutes === 1) {
    timeStr = "1 minute, "
  }
  if (seconds > 1) {
    timeStr = timeStr + seconds + " seconds";
  } else if (seconds === 1) {
    timeStr = timeStr + "1 second";
  } else {
    timeStr = timeStr + "exactly";
  }
 
  return timeStr;
}

function ambientMessage(msg) {
  $(".ambientboo .info p.wait-till").text(msg);
  $(".ambientboo .info").fadeIn();
  $(".ambientboo .info :hidden").fadeIn();
  $(".ambientboo .btn-primary").fadeOut(); // Hide activate button again
}

function message(msg) {
  $(".card.status p").text(msg).closest('.card').show();
}

function clearTimers() {
  clearTimeout(ambientCountdownTimer);
  clearTimeout(ambientTimer);
}


function cancelAmbient() {
  ambientMessage("Ambient playback stopped.");
  $(".ambientboo .info .on-when-active").fadeOut();
  $(".ambientboo .btn-primary").fadeIn(); // Show activate button again
  clearTimers();
}
