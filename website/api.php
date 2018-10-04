<?php


//Set up variables from post request
$servername = "localhost";
$username = $_POST["user"];
$password = $_POST["pass"];
$dbname = $_POST["db"];
$table = $_POST['table'];
$action = $_POST['action'];
$data = $_POST['data'];

// Create connection
$conn = connect($servername, $username, $password, $dbname);

$result = "";
switch ($action) {
    case "put" : $result = insert($conn, $table, json_decode($data, true)); break;
    case "get" : $result = get($conn, $table); break;
    default: $result =  "Invalid action: $action";
}

echo $result;

mysqli_close($conn);

function insert($conn, $table, $data) {
    $sql = sprintf(
    'INSERT INTO %s (%s) VALUES ("%s")',
    $table,
    implode(',',array_keys($data)),
    implode('","',array_values($data))
    );
    $result = mysqli_query($conn, $sql);
    if(!$result) {
        return "error: " . mysqli_error($conn);
    } else {
        return $result;
    }
}

function get($conn, $table) {
    $sql = sprintf(
    'SELECT * FROM %s',
    $table
    );
    $result = mysqli_query($conn, $sql);
    if(!$result) {
        return "error: " . mysqli_error($conn);
    } else {
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }
        return json_encode($rows);
    }
}

function connect($servername, $username, $password, $dbname) {
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}
?>
