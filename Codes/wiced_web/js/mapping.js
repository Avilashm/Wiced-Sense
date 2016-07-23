 /*variables :-
 ax,ay,az = variable to store accelerometer value 
 mx,my = variables to store magnetovalues,
 targetx,targety = default value 0 to calculate with magneto readings,
 JSONObject[0]["one"] -to- JSONObject[0]["twelve"] == sensors values from database ,
 values of arrays - actual values .
 one  			  - accelerometer x,
 two 			  - accelerometer y,
 three			  - accelerometer z,
 seven			  - magnetometer x,
 eight			  - magnetometer y,
 ten 			  - humidity,
 eleven			   - pressure,
 twelve			 - temperature,
 JSONObject[0]["EncoderL"] = encoder left tyre value,
 JSONObject[0]["EncoderR"] =  encoder right tyre value,
 pastsvgx= to store the very recent data of forward calculation in x axis;
 pastsvgy= to store the very recent data of forward calculation in y axis;
 refdeg= to store the initial degree of bot when started,
 deocderdb = to store the current encoder reading(reading after average),
 prevsvgx = to store last value increased in x axis,
 prevsvgy = o store last value increased in y axis,
 vx,vy = to store the current positive x axis and y axis(in here gui positive y axis is considered downwards) increased values respectively(eventually these values are stored further in prevsvgx, prevsvgy)
 upaxis,leftaxis== to store the current negative x axis and y axis(in here gui negative y axis is considered upwards) increased values respectively(eventually these values are stored further in prevsvgx, prevsvgy)

 svgx ,svgy = to store the total calculated value of x and y axis with calculations of hypotaeneous and right angles,
 olddecoder == is the very previous encoder value of bot ;
 newdecoder == is the very newest encoder vakue of bot;
 */
setInterval("loadDoc(1)",100);

var fixedaxis=100;
var humid=0,pressure=0,temp=0;
var ax=0,ay=0,az=0;
var gx=0,gy=0,gz=0;
var mx=0,my=0,sum=0,finalaverage=0;
var average =[0,0];
var targetx=0,targety=0,w=0,totaladd =0;
var once=1;
var refdeg =0;
var decoderdb = 0;
var pastsvgx = 0;
var pastsvgy = 0;
var upaxis =0;
var leftaxis =0;
var vx = 0;
var vy=0;
var prevsvgx = 100;
var prevsvgy = 100;
var  svgx = 0;
var  svgy = 0;
var set = 0;
var value =0;
var roundoff=0;
var takedeg=0;
var newdecoder=0;
var olddecoder=0;

var takedecoder=0;
var encoderleft =0;
var encoderright=0 ;

/*
function = loadDoc(int);
input    = 1(integer);
output   = no output;
logic    = function asynchronously (every 10ms) calls the new.php page for current sensors value using AJAX,
		   new.php page extract the current sensors values of encoder of bot and magnetometer  from database tables and  returns back to this function in JSON format,
		   json value of sensors data is parsed and different sensors data are calculated seperately to plot/change the GUI dynamically.
		   magnetometer angle and bot encoder readings is used to achieve SLAM and perform bot path mapping with HTML SVG's,
		   


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
						if((JSONObject[0]["seven"] > 0)  ||  (JSONObject[0]["seven"] < 0))
							{
                        
								mx = JSONObject[0]["seven"] ; 
							}

                        if((JSONObject[0]["eight"] > 0)  ||  (JSONObject[0]["eight"] < 0))
                            {
                                 
                                my = JSONObject[0]["eight"] ;
                            }

								  var deltaX = mx - targetx;
								  var deltaY = my - targety;
								  var rad = Math.atan2(deltaY, deltaX);
								  var deg = rad * (180 / Math.PI)
								  var angle=deg+Math.ceil(-deg/360)*360;
								  roundoff = Math.ceil(angle * 1) / 1;


						encoderleft = (JSONObject[0]["EncoderL"]);
						encoderright = (JSONObject[0]["EncoderR"]);

						takedecoder = Math.round(( parseInt(encoderleft)+ parseInt(encoderright))/2);
                            
						//mapping algorithm;
						///////////////////////////////////////////////////////////////////
						//  window.alert(roundoff);
						decoderdb = takedecoder;
						//  window.alert(decoderdb);
						if(once >0)
							{
								refdeg = roundoff;
								//   window.alert(refdeg);
								once--;

							}

								//  window.alert("finalaverage");

						if( (refdeg-roundoff)==(0) || (roundoff-refdeg) == (90) || (roundoff-refdeg)==(180) || (roundoff-refdeg)==(270) || (roundoff-refdeg)==(360))
							{

								//    window.alert(1);
								var diffdeg = (roundoff-refdeg);
								//    window.alert(diffdeg);

								var rad = diffdeg * Math.PI / 180;

								// window.alert(rad);
 

								var  svgx = decoderdb*Math.round(Math.cos(rad));

								var  svgy = decoderdb*Math.round(Math.sin(rad));
								  //   window.alert(svgx);
								  //    window.alert(svgy);
								olddecoder=decoderdb;
     

     
								//window.alert("beginif");

								if((svgx==0 ) && (svgy>0))//Yincrease
									{
										//   window.alert(2);
										//   window.alert(vx);
										vy = (svgy-vx);
										vy= (parseInt(fixedaxis)+parseInt(vy));

										var finalstore="L"+prevsvgx+","+vy+"";
										//   window.alert(finalstore);
										prevsvgx = prevsvgx;//30
										prevsvgy = vy;//20
										set = document.getElementById("path");

										value = set.getAttribute('d');
										//     window.alert(value);

										set.setAttribute('d'," "+ value +""+finalstore+"" );
									}
								else if((svgy== 0 ) && (svgx>0))//xincrease
									{
										//    window.alert(3);
										if(diffdeg==360)
											{
												vx =  prevsvgx +(svgx-(Math.abs(pastsvgx-pastsvgy)));

											}
										else
											{
												vx = (svgx-vy);
												vx = (parseInt(fixedaxis)+parseInt(vx));
											}
					  
					   
												var finalstore="L"+vx+","+prevsvgy+"";
												//    window.alert(finalstore);
												 prevsvgx = vx;//70
												 prevsvgy = prevsvgy;//0
												 set = document.getElementById("path");
												 value = set.getAttribute('d');
												//window.alert(value);

												set.setAttribute('d'," "+ value +" "+finalstore+"" );
									}
								else if((svgx == 0) && (svgy <  0))//
									{
										//     window.alert(4);
										svgy = -svgy;
										//      window.alert(vy);
										upaxis = vy-(svgy-(Math.abs(pastsvgx-pastsvgy)));

										var finalstore="L"+prevsvgx+","+upaxis+"";
										//      window.alert(finalstore);
										prevsvgx = prevsvgx;//30
										prevsvgy = upaxis;//20

										vy = upaxis;//20
										set = document.getElementById("path");

										value = set.getAttribute('d');
										//        window.alert(value);

										set.setAttribute('d'," "+ value +""+finalstore+"" );
									}
								else if((svgy == 0) && (svgx <  0))//
									{
										//      window.alert(5);
										svgx = -svgx;
										//      window.alert(svgx);
										leftaxis = vx-(svgx-(pastsvgy+pastsvgx));
					   

										finalstore="L"+leftaxis+","+prevsvgy+"";
										//        window.alert(finalstore);
										prevsvgx = leftaxis;//20
										vx = prevsvgx;
										prevsvgy = prevsvgy;//
										set = document.getElementById("path");
										value = set.getAttribute('d');
										//       window.alert(value);

										set.setAttribute('d'," "+ value +""+finalstore+"" );
									}
										//   window.alert(6);
										//window.alert(pastsvgx);
										//window.alert(pastsvgy);
										pastsvgx = svgx;
										pastsvgy = svgy;
										//      window.alert(pastsvgx);
										//window.alert(pastsvgy);


							}

							else
							{

								//      window.alert(11);
								var diffdeg = (roundoff-refdeg);
								//     window.alert(diffdeg);

								var rad = diffdeg * Math.PI / 180;

								// window.alert(rad);
 
								newdecoder=decoderdb-olddecoder;
								olddecoder=decoderdb;
								// window.alert(newdecoder);

								var  svgx = newdecoder*Math.cos(rad);

								var  svgy = newdecoder*Math.sin(rad);
								//     window.alert(svgx);
								//      window.alert(svgy);
								var xnew= prevsvgx+svgx;

								var ynew = prevsvgy+svgy;
								var finalstore="L"+xnew+","+ynew+"";
								//          window.alert(finalstore);
								prevsvgx = xnew;//30
								prevsvgy = ynew;//20
								set = document.getElementById("path");

								value = set.getAttribute('d');
								//            window.alert(value);

								set.setAttribute('d'," "+ value +""+finalstore+"" );


								//window.alert("check");

							}

					}
			};
            xhttp.open("GET","controller/select-data-from-db.php?q="+int,true);
            xhttp.send();
    }


