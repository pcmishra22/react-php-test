<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM posts";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if(isset($path[4]) && is_numeric($path[4])) {
            
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $posts = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
             
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($posts);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO posts(id, title, slug, content, created_at) VALUES(null, :title, :slug, :content, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':title', $user->title);
        $stmt->bindParam(':slug', $user->slug);
        $stmt->bindParam(':content', $user->content);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE posts SET title= :title, slug =:slug, content =:content, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':title', $user->title);
        $stmt->bindParam(':slug', $user->slug);
        $stmt->bindParam(':content', $user->content);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM posts WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}