<?php
header("Content-Type: text/event-stream; charset=UTF-8");
header('Cache-Control: no-cache');

$room_hash = $_GET["room"];
echo "event: room\n";
echo 'data: {"your room": "' . $room_hash . '"}';
echo "\n\n";

ob_end_flush();
flush();

$counter = 0;
while (1) {
  // "ping" イベントを毎秒送信
  
  echo "event: ping\n";
  $curDate = date(DATE_ISO8601);
  echo 'data: {"time": "' . $curDate . '"}';
  echo "\n\n";

  ob_end_flush();
  flush();
  
  // シンプルなメッセージをランダムな間隔で送信
  
  $counter++;
  
  echo "event: count\n";
  echo 'data:' . $counter . "\n\n";

  ob_end_flush();
  flush();
  sleep(1);
}