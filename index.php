<?php



// PageGen instantiation
require_once ($_SERVER['DOCUMENT_ROOT'] . "/Phplib/PageGen/Bootstrap4/Superhero.php");

$page = new Superhero(array(
    title => 'Random Boo-er',
    favicon => file_get_contents('favicon/favicon.include'),
    css => array(
        'booer.css'
    ), // Should do filectime internally
    js => array(
        'booer.js'
    ),
    additional_head => '
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/css/bootstrap-slider.min.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/bootstrap-slider.min.js"></script>
',
    additional_footer => '
  <!-- Slider control -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.9.0/bootstrap-slider.min.js"></script>
'
));

// At this point, anything that comes out is wrapped as template content :)
?>

<div class="container">
  <div class="jumbotron">
    <h1>Random Boo-er</h1>
    <p>Provides ambient booing for ongoing ego adjustment as well asl realtime booing for realtime environmental enhancement.</p>
    <p>Suitable for running in the background during conference calls.</p>
  </div>
  
  
  <?php
$sounddir = "sounds/";
$count = 0;
// while ($file = preg_grep('~\.(mp3|wav)$~', scandir($sounddir))) {
foreach (preg_grep('~\.(mp3|wav)$~', scandir($sounddir)) as $file) {
    // echo("<p>$file</p>");
    echo ("<audio class='boos' src='$sounddir$file' preload='auto'></audio>\n");
}
?>
  
  <div class="card text-white bg-success status hidden">
    <div class="card-body">
      <p>Please start with the functions below.</p>
    </div>
  </div>


  <div class="card text-white bg-primary ambientboo">
    <div class="card-body">
      <h2>Ambient Booing</h2>

      <p>Ambient background booing.</p>

      <div class="card text-white bg-info info hidden">
        <div class="card-body">
          <p class="wait-till">i last played nothing</p>
          <p class="seconds-left on-when-active">n seconds left</p>
          <button type="button" class="btn btn-warning cancel on-when-active">Cancel</button>
        </div>
      </div>


      <label>Delay range:</label>
      <div>
        <input type="text" class="slider" value="" />
        <p class="smallLabel">
          Somewhere between
          <label class="min">0 secs</label>
          and
          <label class="max">5 secs</label>
          .
        </p>
      </div>

      <button type="button" class="btn btn-primary start">Boo! &#x1F345;</button>
    </div>
  </div>


  <div class="card text-white bg-primary instaboo">
    <div class="card-body">
      <h2>Insta-booer</h2>
      <p>Instant random booing.</p>
      <button type="button" class="btn btn-primary">Boo! &#x1F345;</button>
    </div>
  </div>
</div>


