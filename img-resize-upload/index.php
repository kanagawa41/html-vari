<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <input type="file" onchange="onInputChanged(event)">
  <hr>�I���W�i���T�C�Y:<br>
  <img id="previewLarge">
  <hr>�k���T�C�Y:<br>
  <img id="previewSmall">
  
  <script>
    function onInputChanged(e) {
      var file = e.target.files && e.target.files[0];
      if (file != null) {
        var reader = new FileReader();
        reader.onload = onImageLoad;
        reader.readAsDataURL(file);
      }
    }
    function onImageLoad(e) {
      var largeData = e.target.result;
      var smallData = makeSmall(largeData);
      previewLarge.src = largeData;
      previewSmall.src = smallData;
    }
    
    // �摜�f�[�^(DataURL)���k�����ĕԂ�
    function makeSmall(data) {
      // �摜�f�[�^�̏c���T�C�Y���擾����
      var image = document.createElement('img');
      image.src = data;
      var width = image.naturalWidth;
      var height = image.naturalHeight;

      // �k������B����͏c�����ꂼ��1/2
      var canvas = document.createElement('canvas');
      canvas.width = width / 2;
      canvas.height = height / 2;
      canvas.getContext("2d").drawImage(image, 0, 0, width / 2, height / 2);
      return canvas.toDataURL();
    }
  </script>
</body>
</html>