<?php
//main work is to take all sensors data of wiced sense from get method via URL, and stores the data to mysql table .
//takes request from temp.php(form data) and insert the threshold temperature data to mysql table.

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "wiced";
	// Create connection
	$conn = new mysqli($servername, $username, $password,$dbname);

	// Check connection
	if ($conn->connect_error)
		{
			die("Connection failed: " . $conn->connect_error);
		} 
		$q = 1;	
		
//if request is from temp.php page than settemp variable get sets and the data passed inside it is updated in mysql database.
	if (isset($_POST["settemp"]) && !empty($_POST["settemp"]))
		{
			$settemp = intval($_POST['settemp']);

			$sql = "UPDATE data 
			SET thirteen='$settemp'
			WHERE id=$q"; 

			if ($conn->query($sql) === TRUE) 
				{
   
					header('Location:/wiced_web/temp.html');    
				} 


		}
// if request from wiced sense cylon code than others variable realated to wiced data gets set 
//and data inside them are stored/updated in mysql at respective places
	else
		{

			$acc_x = intval($_GET['acc_x']);
			$acc_y= intval($_GET['acc_y']);
			$acc_z = intval($_GET['acc_z']);
			$gyr_x= intval($_GET['gyr_x']);
			$gyr_y= intval($_GET['gyr_y']);
			$gyr_z= intval($_GET['gyr_z']);
			$mag_x= intval($_GET['mag_x']);
			$mag_y= intval($_GET['mag_y']);
			$mag_z= intval($_GET['mag_z']);
			$hum= intval($_GET['hum']);
			$pre= intval($_GET['pre']);
			$temp= intval($_GET['temp']);
			$EncoderL= intval($_GET['EncoderL']);
			$EncoderR= intval($_GET['EncoderR']);

			$sql = "UPDATE data 
			SET one='$acc_x',two='$acc_y',three='$acc_z',four='$gyr_x',five='$gyr_y',six='$gyr_z',seven='$mag_x',eight='$mag_y',nine='$mag_z',ten='$hum',eleven='$pre',twelve='$temp',EncoderL='$EncoderL',EncoderR='$EncoderR'
			WHERE id=1";

			if ($conn->query($sql) === TRUE) 
				{
				//do nothing
				} 


		}

$conn->close();

?>