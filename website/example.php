<style>
    table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
</style>

<?php
$url = 'INSERT URL HERE';
$data = array('user' => 'INSERT USERNAME HERE', 'pass' => 'INSERT PASSWORD HERE', 'db' => 'mydatabase', 'table' => 'location', 'action' => 'get');
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

/*
Puts data from database into HTML table
*/

$json_array = json_decode($result);
echo '<center><table style="width:20%">';
echo '<tr><td>Longitude:</td><td>Latitude:</td></tr>';
      
        foreach($json_array as $result){
          echo '<tr>';
            echo '<td>'.$result->latitude.'</td>';
            echo '<td>'.$result->longitude.'</td>';
          echo '</tr>';
        }
        echo '</table></center>';
?>