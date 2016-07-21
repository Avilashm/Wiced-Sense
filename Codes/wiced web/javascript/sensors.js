 /*variables :-
 ax,ay,az = variable to store accelerometer value 
 mx,my = variables to store magnetovalues,
 targetx,targety = default value 0 to calculate with magneto readings,
 JSONObject[0]["one"]-to-JSONObject[0]["twelve"] == sensors values from database ,
 values of arrays - actual values .
 one  			  - accelerometer x,
 two 			  - accelerometer y,
 three			  - accelerometer z,
 seven			  - magnetometer x,
 eight			  - magnetometer y,
 ten 			  - humidity,
 eleven			   - pressure,
 twelve			 - temperature,
 
 */
setInterval("loadDoc(1) ",100);
var humid=0,pressure=0,temp=0;
var ax=0,ay=0,az=0;
var gx=0,gy=0,gz=0;
var mx=0,my=0; 
var targetx=0,targety=0;

/*
function = loadDoc(int);
input    = 1(integer);
output   = no output;
logic    = function asynchronously (every 100ms) calls the new.php page for current sensors value using AJAX,
		   new.php page extract the all current sensors values from database tables and  returns back to this function in JSON format,
		   json value of sensors data is parsed and different sensors data are calculated seperately to plot/change the GUI dynamically.
		   


*/

    function loadDoc(int) 
		{
            
            if (window.XMLHttpRequest) 
				{
					// code for IE7+, Firefox, Chrome, Opera, Safari
					var xhttp=new XMLHttpRequest();
				} 
			else 
				{  	
					// code for IE6, IE5
					var xhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}

					xhttp.onreadystatechange = function() 
						{
						
							if (xhttp.readyState == 4 && xhttp.status == 200) 
								{
									var jsonObj = xhttp.responseText;
									var JSONObject = JSON.parse(jsonObj);
										
										/*accelerometer calculation discription:-
										raw data x and y is taken and mapped to 150 by 150 of square in GUI.
										below shows the pre calculated formula for mapping accelerometer reading from +-90 to +-150
										
										*/
									if((JSONObject[0]["one"] > 0)  ||  (JSONObject[0]["one"] < 0))
										{
												//code for calculating
											var axelx = (JSONObject[0]["one"]); 
											var sss = axelx*(-1);
											ax = (sss-90)*(-1);
											 
											ax=1.6666666666666667*(ax);
											ax=ax-150;
							
										}

									if((JSONObject[0]["two"] > 0)  ||  (JSONObject[0]["two"] < 0))
										{
												//code for calculating
											var axely = (JSONObject[0]["two"]); 
											var sss = axely*(-1);

											ay = (sss-90)*(-1);
									  

											ay=1.6666666666666667*(ay);
									 

											ay=ay-150;
											ay=(ay)*(-1);
										}
											//code for manupulating calculated code according to our GUI.		
											var UI=document.getElementById("ball");
											UI.style.transform = "translate("+ax+"px,"+ay+"px)";
										
											/*magnetometer calculation discription:-
											raw value of magneto which is x and y is subtracted from 0(targetx/y),
											arc tangent is taken by atan2 method,
											converted into degree by math.PI,
											to convert the negative degree into positive and roundoff (deg+Math.ceil(-deg/360)*360) this method is used,
											
										
											*/
									if((JSONObject[0]["seven"] > 0)  ||  (JSONObject[0]["seven"] < 0))
										{
								
											mx = JSONObject[0]["seven"] ;
							  
							 
										}
					  
					  
									if((JSONObject[0]["eight"] > 0)  ||  (JSONObject[0]["eight"] < 0))
										{
										 
											my = JSONObject[0]["eight"] ;
										}
											//code for calculating
											var deltaX = mx - targetx;
											var deltaY = my - targety;
											var rad = Math.atan2(deltaY, deltaX);
											var deg = rad * (180 / Math.PI)
											var angle=deg+Math.ceil(-deg/360)*360;
										 	//code for manupulating calculated code according to our GUI.
											var UI=document.getElementById("needle");
											UI.style.transform = "rotate(" + angle + "deg ";

										
										/*humidity calculation discription:-
											raw value is divided by 10 to get the humidity value from 0 to 100 %,
										
										*/

									if(JSONObject[0]["ten"] > 0)
										{	//code for calculating
											humid = ((JSONObject[0]["ten"])/10) ;

											document.getElementById("hdisp").innerHTML =humid +"%"+"<br>"+"humidity";  
											//code for manupulating calculated code according to our GUI.
											var top  = 100-humid;
											var height = 100-top;  
											var UI=document.getElementById("inner2");
											UI.style.top = top + "%";
											UI.style.height = height + "%"; 
										}
										/*pressure calculation discription:-
											raw value is divided by 10 to get the pressure value from 800 to 1200 hPa,
											
										
										*/

									if(JSONObject[0]["eleven"] > 0)
										{
											//code for calculating
											var pressure1 = (JSONObject[0]["eleven"])/10 ;

											document.getElementById("pdisp").innerHTML = pressure1 +"hPa"+"<br>"+"pressure";  
											//code for manupulating calculated code according to our GUI.
											pressure = 0.25*(pressure1-800);
											var top  = 100-pressure;
											var height = 100-top;  
								   
											var UI1=document.getElementById("inner1");
											UI1.style.top = top + "%";
											UI1.style.height = height + "%"; 
					  
										}
										/*temperature calculation discription:-
											raw value is divided by 10 to get the temperature value from 0 to 100 C
										
										*/
									if(JSONObject[0]["twelve"] > 0)
										{
											//code for calculating
											document.getElementById("tdisp").innerHTML = (JSONObject[0]["twelve"])/10  +"C"+"<br>"+"temperature";  
											
											//code for manupulating calculated code according to our GUI.
											temp = 2*((JSONObject[0]["twelve"])/10) ;

											var top  = 100-temp;
											var height = 100-top;  

											var UI=document.getElementById("inner");
											UI.style.top = top + "%";
											UI.style.height = height + "%"; 
										}
								  
							  
								}
						};
					xhttp.open("GET","/controller/new.php?q="+int,true);
					xhttp.send();
		}
          