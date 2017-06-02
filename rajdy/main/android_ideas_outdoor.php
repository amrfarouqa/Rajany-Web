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
$result = mysql_query("SELECT * FROM `main_outdoor` WHERE 1") or die(mysql_error());
 
// check for empty result
if (mysql_num_rows($result) > 0) {
    // looping through all results
    // products node
    $response = array();
 
    while ($row = mysql_fetch_object($result)) {
        // temp user array
        $item = new item();
        $item->url->small = $row->photo;
        $item->url->medium = $row->photo;
        $item->url->large = $row->photo;
		$item->name = 'Outdoor';
		$item->timestamp = 'Mar 24, 2017';
        array_push($response, $item);
    }
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