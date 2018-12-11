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
    case "put" : $result = insert($conn, $table, $data); break;
    case "get" : $result = get($conn, $table, $data); break;
    default: $result =  "Invalid action: $action";
}

echo $result;

mysqli_close($conn);

function insert($conn, $table, $data) {
    if($data == null) {
        return "No data was given";   
    } elseif (!isJson($data)) {
        return "Invalid json given";
    }
    $data = json_decode($data, true);
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

function get($conn, $table, $filter) {
    $sql = sprintf(
    'SELECT * FROM %s',
    $table
    );
    
    if($filter != null and !isJson($filter)) {
        return "Invalid json was given";   
    } else if($filter != null) {
        $filter = json_decode($filter, true);
        if ($filter['startDate'] != null and $filter['endDate'] != null) {
            $sql = $sql . ' WHERE time > "' . $filter['startDate'] . '" AND time < "' . $filter['endDate'] . '"'; 
        } else if ($filter['startDate'] != null) {
            $sql = $sql . ' WHERE time > "' . $filter['startDate'] . '"'; 
        } else if ($filter['endDate'] != null) {
            $sql = $sql . ' WHERE time < "' . $filter['endDate'] . '"'; 
        }4
    }
    

    $result = mysqli_query($conn, $sql);
    if(!$result) {
        return "error: " . mysqli_error($conn);
    } else {
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }
        $json_string = json_encode($rows);
        if($json_string == "null") {
            return "[]";
        } else {
            return $json_string;
        }
    }
}

function connect($servername, $username, $password, $dbname) {
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}   

function isJson($string) {
 return true; //TODO
}
?>
