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
var sp = new SerialPort("/dev/ttyUSB0", 
	{
		baudrate: 9600,
		parser: SerialPort.parsers.byteLength(7)
	});
		sp.on('data', onData);

function onData(d)
	{
	
		//var buff = new Buffer(d, 'utf8');
		//var buffer_binary = new Buffer(d, 'hex')[1];
		buff = new Buffer(d, 'hex').toString('utf8');
		//console.log(buff);
	    //console.log(buffer_binary);

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

  work: function(my) 
  {
          my.wiced.getData(function(err, data) 
          {
            my.display(err, data);
         
          });
  }
}).start();
