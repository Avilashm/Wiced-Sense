//vriables == 
//JSONObject[0]["twelve"]=== is the current temperature from database.
var fixedtemp;
setInterval("loadDoc(1) ",10);

/*
function = loadDoc(int);
input    = 1(integer);
output   = no output;
logic    = sets the threshold temperture via html form and submit it to test.php,
			test.php then update the threshold temp value to mysql database,
			function asynchronously (every 10ms) calls the new.php page for current temp sensors value using AJAX,
		   new.php page extract the current temp sensors values from database tables and  returns back to this function in JSON format,
		   json value of sensors data is parsed and temp sensors data are calculated  and compared from fixed/selected threshold temperature value,
		   as soon as the current temp crosses above fixed temp a pop alarm is raised using javascript alert .
		   


*/

     function loadDoc(int) 
		{
		 
            
            if (window.XMLHttpRequest) 
				{
					// code for IE7+, Firefox, Chrome, Opera, Safari
					var xhttp=new XMLHttpRequest();
				} 
			else 
				{  // code for IE6, IE5
					var xhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
            
            
				xhttp.onreadystatechange = function()
				{
					if (xhttp.readyState == 4 && xhttp.status == 200) 
						{
							var jsonObj = xhttp.responseText;
							var JSONObject = JSON.parse(jsonObj);

							document.getElementById("fixedtemp").innerHTML = (JSONObject[0]["thirteen"])+"&nbsp"+"C";  

							fixedtemp = (JSONObject[0]["thirteen"]);
								//compares the fixed temperature with current temperature which is (JSONObject[0]["twelve"]);
							if(JSONObject[0]["twelve"] > 0)
								{
								   
									var  currenttemp = (JSONObject[0]["twelve"])/10 ;
									if(currenttemp > fixedtemp)
										{

											window.alert("Temperature is high:"+currenttemp+"c\n Above dangerous level");


										}
		 
								}
					  

						}
				};
					xhttp.open("GET","/controller/new.php?q="+int,true);
					xhttp.send();
        }