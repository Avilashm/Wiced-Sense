<?php
/* 
takes request from webpages(AJAX calls) and extract sensors data accordingly,return extracted/requested data using echo

*/
	$q = intval($_GET['q']);

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "wiced";
	// Create connection to database
	$conn = new mysqli($servername, $username, $password,$dbname);

	// Check connection
	if ($conn->connect_error)
		{
			die("Connection failed: " . $conn->connect_error);
		} 
				

	//select sensors data from database
	$sql = "SELECT one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve ,thirteen, EncoderL,EncoderR
			FROM data
			WHERE id=$q";
	$result = $conn->query($sql);
	$array = array();
	//return/sends out data using echo after converting to JSON format to the page from where AJAX calls raised.
	if ($result->num_rows > 0) 
		{
			// output data of each row
			while($row = $result->fetch_assoc()) 
				{
					$array[] = $row;
				}
			echo json_encode($array);
		}


	$conn->close();
?>

	
