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
  // "ping" �C�x���g�𖈕b���M
  
  echo "event: ping\n";
  $curDate = date(DATE_ISO8601);
  echo 'data: {"time": "' . $curDate . '"}';
  echo "\n\n";

  ob_end_flush();
  flush();
  
  // �V���v���ȃ��b�Z�[�W�������_���ȊԊu�ő��M
  
  $counter++;
  
  echo "event: count\n";
  echo 'data:' . $counter . "\n\n";

  ob_end_flush();
  flush();
  sleep(1);
}