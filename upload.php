<?php
$selected_val = $_POST['Choice'];

switch ($selected_val) {
    case "Baby":
        uploadSelectedToTarget("rajdy/main/img/baby/", "main_baby");
        break;
    case "Bathroom":
        uploadSelectedToTarget("rajdy/main/img/bath/", "main_bathroom");
        break;
    case "Bedroom":
        uploadSelectedToTarget("rajdy/main/img/bedroom/", "main_bedroom");
        break;
    case "Color Hints":
        uploadSelectedToTarget("rajdy/main/img/colors/colorhints/", "main_colorhints");
        break;
    case "Color Schemes":
        uploadSelectedToTarget("rajdy/main/img/colors/colorschemes/", "main_colorschemes");
        break;
    case "Dining":
        uploadSelectedToTarget("rajdy/main/img/dining/", "main_dining");
        break;
    case "Entry":
        uploadSelectedToTarget("rajdy/main/img/entry/", "main_entry");
        break;
    case "Fireplace":
        uploadSelectedToTarget("rajdy/main/img/fireplace/" , "main_fireplace");
        break;
    case "Furniture":
        uploadSelectedToTarget("rajdy/main/img/furniture/", "main_furniture");
        break;
    case "Gym":
        uploadSelectedToTarget("rajdy/main/img/gym/", "main_gym");
        break;
    case "Hall":
        uploadSelectedToTarget("rajdy/main/img/hall/", "main_hall");
        break;
    case "Interior":
        uploadSelectedToTarget("rajdy/main/img/interior/", "main_interior");
        break;
    case "Kitchen":
        uploadSelectedToTarget("rajdy/main/img/kitchen/", "main_kitchen");
        break;
    case "Laundry":
        uploadSelectedToTarget("rajdy/main/img/laundry/", "main_laundry");
        break;
    case "Lighting":
        uploadSelectedToTarget("rajdy/main/img/lighting/", "main_lighting");
        break;
    case "Living":
        uploadSelectedToTarget("rajdy/main/img/living/", "main_living");
        break;
    case "Office":
        uploadSelectedToTarget("rajdy/main/img/office/" , "main_office");
        break;
    case "Outdoor":
        uploadSelectedToTarget("rajdy/main/img/outdoor/" , "main_outdoor");
        break;
    case "Pool":
        uploadSelectedToTarget("rajdy/main/img/pool/", "main_pool");
        break;
    case "Restaurant":
        uploadSelectedToTarget("rajdy/main/img/restaurant/", "main_restaurant");
        break;
    case "Staircase":
        uploadSelectedToTarget("rajdy/main/img/staircase/", "main_staircase");
        break;
    case "Storage":
        uploadSelectedToTarget("rajdy/main/img/storage/", "main_storage");
        break;
    case "Vintage":
        uploadSelectedToTarget("rajdy/main/img/vintage/", "main_vintage");
        break;
    case "Wall":
        uploadSelectedToTarget("rajdy/main/img/wall/", "main_wall");
        break;
    default:
        echo "Unrecognizable!";
}

function uploadSelectedToTarget($target_dir, $dbTable) {
    if($target_dir == ""){
        echo "You Didn't Choose Any Photos To Upload!";
    }else{
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
// Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
// Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
// Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            // Create connection
            $db_name     = 'amrfarou_rajdy';
            $db_user     = 'amrfarou_user';
            $db_password = 'user123';
            $server_url  = 'localhost';

            $mysqli = new mysqli($server_url, $db_user, $db_password, $db_name);

            if (mysql_errno())
            {
                echo "Failed to connect to MySQL: " . mysql_errno();
            }else{
                $directory = "http://amrfarouqa.website/".$target_file;
                if($stmt = $mysqli->prepare("INSERT INTO $dbTable (photo) VALUES (?)")){
                    $stmt->bind_param('s', $directory);
                    $stmt->execute();

                    if ($stmt->error) {error_log("Error: " . $stmt->error);
                        echo 'Error: ' . $stmt->error;
                    }else{
                        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
                            echo "Path To Image:   " . "http://amrfarouqa.website/".$target_file;
                        } else {
                            echo "Sorry, there was an error uploading your file.";
                        }
                    }
                    $stmt->close();
                }else{
                    echo "Error in STMT.";
                }
            }
        }
    }
}
