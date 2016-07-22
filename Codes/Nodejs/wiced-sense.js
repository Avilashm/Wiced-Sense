/*
codes below will take the data of wiced sense from driver.js file in abn array ,
also takes encoder data of bot from serial port where xbee is attached,
this array of data and bot encoder data will be converted into query string using nodejs querystring,
further these data is posted to mysql database vua URL using  http POST method.
*/
"use strict";
var querystring = require('querystring');
var http = require('http');

var Cylon = require("cylon");

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var buff =0;
var datae = [];
var i=0;
var leftShaft = 0;
var rightShaft =0;

//set the serial port and parses the data up to 7 byte 
var sp = new SerialPort("/dev/ttyUSB0", 
	{
		baudrate: 9600,
		parser: SerialPort.parsers.byteLength(7)
	});
		sp.on('data', onData);//calls the function onData whenever data is available to port ,





/*
function onData,
input = d (serial data),
output = leftShaft (encoder left value),rightShaft(encoder right value)
logic= converts hex data to string,data are in three parts (start,left,right) so 1st index of array is left and other two are taken

*/
function onData(d)
	{
	
		
		buff = new Buffer(d, 'hex').toString('utf8');
		

	    datae[i] = buff;
	    i++;
	    if(i>2)
	    	{
	    		i=0;
	    	}

	 	if(i==0)
	 		{

		 		leftShaft = datae[1];
		 		rightShaft = datae[2];
 		
 
	 		}

	}


Cylon.robot
({
  connections: 
  {
    bluetooth: { adaptor: "ble", uuid: "20737a156537" }
  },

  devices: 
  {
    battery: { driver: "ble-battery-service" },
    deviceInfo: { driver: "ble-device-information" },
    generic: { driver: "ble-generic-access" },
    wiced: { driver: "wiced-sense" }
  },



/*
function display
input = sensor data 
output = query string of data
logic = takes the data and converts it into query string
		connects to the mysql database server 
		sends the generated query string of data to a php page (test.php)via http post method

*/
  display: function(err, data)
    {
			    if (err) 
			    {
			      console.log("error:", err);
			      return;
		    	}



				var data1= querystring.stringify
				({
			      acc_x: data[0],acc_y: data[1],acc_z: data[2],
			      gyr_x: data[3],gyr_y: data[4],gyr_z: data[5],
			      mag_x: data[6],mag_y: data[7],mag_z: data[8],
			      hum: data[9],pre: data[10],temp:data[11],EncoderL:leftShaft,EncoderR:rightShaft,
			    });


			var options = 
				{
				    host: 'localhost',
				    port: 80,
				    path: '/wiced/test.php?'+data1,
				    method: 'POST',
				    headers: 
				    {
				        'Content-Type': 'application/x-www-form-urlencoded',
				        'Content-Length': Buffer.byteLength(data1)
			    	}
				};

			var req = http.request(options, function(res) 
				{
		    		res.setEncoding('utf8');

				});

				req.write(data1);
				req.end();
		   		console.log(data1);
    },

    
//code inside work function runs continously.
  work: function(my) 
  {
          my.wiced.getData(function(err, data) 
          {
            my.display(err, data);//passes the sensors data to the display function
         
          });
  }
}).start();
