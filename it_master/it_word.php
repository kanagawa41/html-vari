<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <title>Enjoy IT-WORD</title>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap/bootstrap-switch.js"></script>
    <link href="css/bootstrap/bootstrap-switch.css" rel="stylesheet">
    <script src="js/bootstrap/bootstrap-slider.js"></script>
    <link href="css/bootstrap/bootstrap-slider.css" rel="stylesheet">
    <script src="js/ticker.js"></script>
    <script src="js/it_master.js"></script>
    <link href="css/it_master.css" rel="stylesheet">
    </style>
  </head>

  <body>
    <div class="body-content">
      <div class="problem-area">
        <ul style="list-style-type: none;">
          <li id="title">Title</li>
          <li id="detail">Detail explanation</li>
        </ul>
      </div>
      <p style="text-align: center;">
        <label id="navi-word"></label>
      </p>
      <button id="control-btn" class="btn btn-primary btn-block glyphicon glyphicon-play" onclick="buttonTypeJudge()">Start</button>
      <br/>
      <button type="button" id="basic-btn" class="btn btn-info btn-block" data-toggle="collapse" data-target="#basic-collapse">
        <span class="glyphicon glyphicon-cog"></span>Basic
      </button>
      <div id="basic-collapse" class="panel-collapse collapse in">
        <div class="panel-body text-left">
          <div class="setting-area">
            <span class="label label-info toggle-label">Field</span>
            <select id="fields" class="form-control">
              <option value="">Selected following</option>
            </select>
            <span class="label label-info toggle-label">Display&nbsp;count</span>
            <select id="display-count" class="form-control">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span class="label label-info toggle-label">Display&nbsp;time</span>
            <select id="display-time" class="form-control">
              <option value="5000">5</option>
              <option value="10000" selected>10</option>
              <option value="15000">15</option>
              <option value="20000">20</option>
            </select>
            <h3>
              <input type="checkbox" name="study_mode">
              <span class="label label-info toggle-label">Test mode</span>
            </h3>
            <h3>
              <input type="checkbox" name="visual_mode" checked>
              <span class="label label-info toggle-label">Concentration mode</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </body>
  <script type="text/javascript">
    var dicData = <?php echo file_get_contents('json/dictionary.json'); ?>;
    var tagData = <?php echo file_get_contents('json/tag.json'); ?>;
  </script>
  <script type="text/javascript">
    commonInit();
  </script>
</html>
