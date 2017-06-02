<?php
$feed_type = $_POST['FeedType'];
$feed_text = $_POST['FeedText'];

switch ($feed_type) {
    case "Home Feed":
        uploadSelectedToTarget("rajdy/main/img/homefeed/", "main_home_feed", $feed_text);
        break;
    case "Color Feed":
        uploadSelectedToTarget("rajdy/main/img/colorfeed/", "main_color_feed", $feed_text);
        break;
    default:
        echo "Unrecognizable!";
}

function uploadSelectedToTarget($target_dir, $dbTable, $feed_text) {
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
                $name = "Admin";
                $status = $feed_text;
                $profilePic = "http://amrfarouqa.website/images/logo.png";
                $timestamp = strtotime("now");
                $directory = "http://amrfarouqa.website/".$target_file;
                if($stmt = $mysqli->prepare("INSERT INTO $dbTable (name, status, profilePic, timeStamp, image) VALUES (?, ?, ?, ?, ?)")){
                    $stmt->bind_param('sssss', $name, $status, $profilePic, $timestamp, $directory);
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
