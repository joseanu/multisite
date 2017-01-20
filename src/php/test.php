<?php

function saveImage($base64img){
  define('UPLOAD_DIR', './');

  $file = UPLOAD_DIR . 'test.jpg';

  echo $base64img;
  echo '<br><br>';
  list($type, $data) = explode(';', $base64img);
  echo $type;
  echo '<br><br>';
  echo $data;
  echo '<br><br>';
  list(,$extension) = explode('/',$type);
  echo $extension;
  echo '<br><br>';
  list(, $data)      = explode(',', $data);
  echo $data;
  echo '<br><br>';
  
//  $data = preg_replace('#^data:image/\w+;base64,#i', '', $base64img);
  $imageData = base64_decode($data);
  echo $imageData;
//  $source = imagecreatefromstring($imageData);
//  $imageSave = imagejpeg($source, $file);
//  imagedestroy($source);
}

saveImage("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAhAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDlbSJDgVsW0KelcLZeKBwML/30K2rLxISeQCP98V+Q18biI9D7+OWRZ2tvbrgcVp21svHArkrXxGpxwB/wIVtWniBCwBK/99V5VXNK8eh0QymLOqtLRePlrZtLJCRxXNWuvR4HKfnW7Y61GcfNH/30f8K8+pnlVdzsp5MjpbHTkOOBXT6VpKMR8ufwrmNO1iLGMxf99H/Cuz0DU4y6nMR59f8A61cjz2beprUwDoRukdz4b8JJdFcpXodp8PrVoATEOlYfhHUE2qR5f4E16PbatF5POMgcYr6zIHg8c28XNpHx+ZYjEU5Wgfz2w+Ob6IjEhx9avwfEHVAMi46n8q8uj1E9gAc8HNW01EngL39a++qYClL7JMMdVXU9dsviNqa4H2r7o5BOM1rWPxQ1FCd8xO45+9047V4tFqLA8Z6cc8VetL24lbERlcngBASc/wCc/ka86tlVGX2TvpZjPue92nxUuwMeeTz2Nbdl8XLhcAzN19cV88x3d7GR5sMqBlVgXG0bWOAcnjB9enFbunwarcR+dbbJEBIysyHkDOMg14+IyTD2u0j1aGYybPo7Tfi/P8o89/zrs9F+MkyFf9JbP1r5gsNO1oytH9ot48Acs7YPv0rqdH0q9OftOqpGc5BjQv8AnkjFfN4zIsP0Pcw+OctGfYXh344XtsocSyBVbaW5wD6Zrtof2jLlINv2kEAY618baTpVwzYXXSSCekH/ANlXvnwx/Z1/4T3QLjVrvxvdWfkjOI7MSBuM8/ONox9e9fN1cCsLLljUav6nTWp4KUPbV4Ky6/8ADH5URfe/A/yq3D3+g/lRRX9Bs/J0XoP9WPrXcWf3x9I/5NRRXn4jY7MPuayfdP0rF8Qf6u0/35f6UUVwR3PSO78E/wDIJtvpJ/6G1dRbf65v99v50UV4ON+OR7mF+FHUaP8A6xP896+2f2av+RPuv+vZv5miivis1/iQ9X+R6mL/ANxn8vzR/9k=");
