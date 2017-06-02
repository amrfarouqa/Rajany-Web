<?php
 
/*
 * Following code will list all the products
 */
 
// array for JSON response
$response = array();
 
// include db connect class
require_once __DIR__ . '/hive/db_connect.php';
ini_set('error_reporting', E_STRICT);

// connecting to db
$db = new DB_CONNECT();


class item
{
    public $name;
    public $timestamp;
}

 
// get all products from products table
$result = mysql_query("SELECT * FROM `main_colorhints` WHERE 1") or die(mysql_error());
 
// check for empty result
if (mysql_num_rows($result) > 0) {
    // looping through all results
    // products node
    $response["hints"] = array();
 
    while ($row = mysql_fetch_array($result)) {
        // temp user array
        $product = array();
        $product["pid"] = $row["pid"];
        $product["item"] = $row["photo"];
        
 
        // push single product into final response array
        array_push($response["hints"], $product);
    }
    // success
    $response["success"] = 1;
 
    // echoing JSON response
    echo json_encode($response);
} else {
    // no products found
    $response["success"] = 0;
    $response["message"] = "No Items found";
 
    // echo no users JSON
    echo json_encode($response);
}
?>