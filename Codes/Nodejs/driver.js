/*
takes the sensor data from wiced sense module and arrange them in an array of results,
these data are than extracted by wiced sense.js file to further send it to mysql database tables.

*/
"use strict";

var Cylon = require("cylon");

var WICEDService = "739298b687b64984a5dcbdc18b068985",
    WICEDCharacteristic = "33ef91133b55413eb553fea1eaada459",
    BIT_ACCELEROMETER = 1,
    BIT_GYROSCOPE = 2,
    BIT_HUMIDITY = 4,
    BIT_MAGNETOMETER = 8,
    BIT_PRESSURE = 16,
    BIT_TEMPERATURE = 32;

var WICEDSense = module.exports = function WICEDSense(opts) 
{
    WICEDSense.__super__.constructor.apply(this, arguments);

    this.serviceId = opts.serviceId || WICEDService;

    this.commands = 
    {

         getData: this.getData
    };
};

Cylon.Utils.subclass(WICEDSense, Cylon.Driver);

/**
 * Starts the driver
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
WICEDSense.prototype.start = function(callback)
  {
    callback();
  };

/**
 * Stops the driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
WICEDSense.prototype.halt = function(callback) 
{
  callback();
};

/**
 * Gets data from the WICED Sense device.
 *
 * This includes the following sensor data:
 *
 * - temperature
 * - pressure
 * - magnetometer
 * - humidity
 * - gyroscope
 * - accelerometer
 *
 * @param {Function} callback to be triggered when data is retrieved
 * @return {void}
 * @publish
 */
WICEDSense.prototype.getData = function(callback) 
{
    this.connection.notifyServiceCharacteristic
  (
    this.serviceId,
    WICEDCharacteristic,
    true,
    function(err, data) 
      {
        if (data !== null) 
          {
             data = this._parseData(data);
          }

        callback(err, data);
      }.bind(this)
  );
};

/*
   function input = data of wiced sense in a string each 2 byte
   output     =  result (parsed every data and stored in an array data)
*/
WICEDSense.prototype._parseData = function(data) 
{
      var bitMask = data[0],
      result = [], pos = 1,test=true,
      x, y, z;

  

    if (bitMask & BIT_ACCELEROMETER) 
      {
          x = data.readInt16LE(pos);
          pos += 2;
          y = data.readInt16LE(pos);
          pos += 2;
          z = data.readInt16LE(pos);
          pos += 2;
         result[0]=x;
         result[1]=y;
         result[2]=z;

      }

    if (bitMask & BIT_GYROSCOPE) 
      {
          x = data.readInt16LE(pos);
          pos += 2;
         y = data.readInt16LE(pos);
          pos += 2;
          z = data.readInt16LE(pos);
          pos += 2;


        result[3]=x;
        result[4]=y;
         result[5]=z;
     }


   if (bitMask & BIT_MAGNETOMETER) 
      {
        x = data.readInt16LE(pos);
        pos += 2;
        y = data.readInt16LE(pos);
        pos += 2;
        z = data.readInt16LE(pos);
        pos += 2;


        result[6]=x;
        result[7]=y;
         result[8]=z;
      }
 
  if (bitMask & BIT_HUMIDITY) 
      {
           x = data.readInt16LE(pos);
          pos += 2;

          result[9]=x;

      }

  if (bitMask & BIT_PRESSURE)   
      {
           x = data.readInt16LE(pos);
          pos += 2;

         result[10]=x;
      }

  if (bitMask & BIT_TEMPERATURE)
      {
          x= data.readInt16LE(pos);
          pos += 2;
      result[11]=x;
       }
  return result;
};

WICEDSense.prototype._getServiceCharacteristic = function(id, callback) {
  this.connection.readServiceCharacteristic(this.serviceId, id, callback);
};

