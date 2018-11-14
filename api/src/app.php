<?php
namespace jess\api;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
// use JeremyKendall\Password\PasswordValidator;
require './vendor/autoload.php';

class App{

  private $app;
  public function __construct($db) {

    $config['db']['host']   = 'localhost';
    $config['db']['user']   = 'root';
    $config['db']['pass']   = 'root';
    $config['db']['dbname'] = 'usersdb';

    $app = new \Slim\App(['settings' => $config]);
    //login
    // $app->add(new Tuupola\Middleware\HttpBasicAuthentication([
    //     "path" => "/admin",
    //     "realm" => "Protected",
    //     "authenticator" => function ($arguments) {
    //         $
    //     }
    // ]));

    //Hash
    // fix username = to equal a variable that is being called
    // $pass = $this->db->query('SELECT * from users where username =')->fetch('password');
    // $hash = password_hash($pass, PASSWORD_DEFAULT);
    //
    //
    // $hash = password_hash($plainTextPassword, PASSWORD_DEFAULT);
    // $isValid = password_verify($plainTextPassword, $hashedPassword);
    // $needsRehash = password_needs_rehash($hashedPassword, PASSWORD_DEFAULT);

    // $validator = new PasswordValidator();
    // $result = $validator->isValid($_POST['password'], $hashedPassword);
    //
    // if ($result->isValid()) {
    // // password is valid
    // }



    $container = $app->getContainer();
    $container['db'] = $db;
    //loggs
    $container['logger'] = function($c) {
        $logger = new \Monolog\Logger('my_logger');
        $file_handler = new \Monolog\Handler\StreamHandler('./logs/app.log');
        $logger->pushHandler($file_handler);
        return $logger;
    };
    //creates new log file in the directory and loggs entries

    // $app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    //     $name = $args['name'];
    //     $this->logger->addInfo('get request to /hello/'.$name);
    //     $response->getBody()->write("Hello, $name");
    //
    //     return $response;
    // });

    //gets whole databse when u search for users
    $app->get('/users', function (Request $request, Response $res){
      $this->logger->addInfo("get /users");
      $users = $this->db->query('SELECT * from users')->fetchAll();
      $jsonRes = $res->withJson($users);
      return $jsonRes;
    });
    // go to http://192.168.33.10/users ^
    $app->get('/users/{id}', function (Request $request, Response $response, array $args) {
      $id = $args['id'];
      //makes the id into a $id (idk the technical terms)
      $this->logger->addInfo("get /users".$id);
      //loggs
      $users = $this->db->query('SELECT * from users where id ='.$id)->fetch();
      //goes to db and fetches the users by id
      //if else statment in case of failure
      if($users){
        $response = $response->withJson($users);
      } else {
        $errorData = array('status' => 404, 'message' => 'not found');
        $response = $response->withJson($errorData, 404);
      }
      return $response;
      //returns users you search for with an id
      // go to http://192.168.33.10/users/1 ext
    });
    // $app->put('/users/{id}', function (Request $request, Response $response, array $args){
    //   $id = $args['id'];
    //   $this->logger->addInfo("GET /users/".$id);
    //   $users = $this->db->query('SELECT * from users where id='.$id)->fetch();
    //
    //   if($users){
    //     $response =  $response->withJson($users);
    //   } else {
    //     $errorData = array('status' => 404, 'message' => 'not found');
    //     $response = $response->withJson($errorData, 404);
    //   }
    //   return $response;
    // });
    $app->post('/users', function (Request $request, Response $response) {
        $this->logger->addInfo("POST /users/");

        // check that users exists
        //$users = $this->db->query('SELECT * from users where id='.$id)->fetch();
        // if(!$users){
        //   $errorData = array('status' => 404, 'message' => 'not found');
        //   $response = $response->withJson($errorData, 404);
        //   return $response;
        // }

        $createString = "INSERT INTO users ";
        $fields = $request->getParsedBody();
        $keysArray = array_keys($fields);
        $last_key = end($keysArray);
        $values = '(';
        $fieldNames = '(';
        foreach($fields as $field => $value) {
          $values = $values . "'"."$value"."'";
          $fieldNames = $fieldNames . "$field";
          if ($field != $last_key) {
            // conditionally add a comma to avoid sql syntax problems
            $values = $values . ", ";
            $fieldNames = $fieldNames . ", ";
          }
        }
        $values = $values . ')';
        $fieldNames = $fieldNames . ') VALUES ';
        $createString = $createString . $fieldNames . $values . ";";
        // execute query
        // try {
          $this->db->exec($createString);
        // } catch (\PDOException $e) {
        //   var_dump($e);
        //   $errorData = array('status' => 400, 'message' => 'Invalid data provided to create this users');
        //   return $response->withJson($errorData, 400);
        // }
        // return updated record
        $users = $this->db->query('SELECT * from users ORDER BY id desc LIMIT 1')->fetch();
        $jsonResponse = $response->withJson($users);

        return $jsonResponse;
    });

    $app->put('/users/{id}', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $this->logger->addInfo("PUT /users/".$id);

        // check that users exists
        $users = $this->db->query('SELECT * from users where id='.$id)->fetchAll();
        if(!$users){
          $errorData = array('status' => 404, 'message' => 'not found');
          $response = $response->withJson($errorData, 404);
          return $response;
        }

        // build query string
        $updateString = "UPDATE users SET ";
        $fields = $request->getParsedBody();
        $keysArray = array_keys($fields);
        $last_key = end($keysArray);
        foreach($fields as $field => $value) {
          $updateString = $updateString . "$field = '$value'";
          if ($field != $last_key) {
            // conditionally add a comma to avoid sql syntax problems
            $updateString = $updateString . ", ";
          }
        }
        $updateString = $updateString . " WHERE id = $id;";

        // execute query
        try {
          $this->db->exec($updateString);
        } catch (\PDOException $e) {
          $errorData = array('status' => 400, 'message' => 'Invalid data provided to update');
          return $response->withJson($errorData, 400);
        }
        // return updated record
        $users = $this->db->query('SELECT * from users where id='.$id)->fetch();
        $jsonResponse = $response->withJson($users);

        return $jsonResponse;
    });
    $app->delete('/users/{id}', function (Request $request, Response $response, array $args) {
      $id = $args['id'];
      //changes id to $id
      $this->logger->addInfo("DELETE /users/".$id);
      //loggs the deletion
      $deleteSuccessful = $this->db->exec('DELETE FROM users where id='.$id);
      //looks though db to find the users and deletes from that part
      if($deleteSuccessful){
        $response = $response->withStatus(200);
        //on success
      } else {
        $errorData = array('status' => 404, 'message' => 'not found');
        $response = $response->withJson($errorData, 404);
      }
      //on error
      return $response;
    });

    $this->app = $app;
    }

    /**
    * Get an instance of the application.
    *
    * @return \Slim\App
    */
  public function get()
  {
    return $this->app;
  }
}
