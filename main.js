    /*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
The Web Sockets Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to use the socket.io NodeJS module to enable real time communication between clients and the development board via a web browser to toggle the state of the onboard LED.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing/updating MRAA & UPM Library on Intel IoT Platforms with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

OR
In Intel XDK IoT Edition under the Develop Tab (for Internet of Things Embedded Application)
Develop Tab
1. Connect to board via the IoT Device Drop down (Add Manual Connection or pick device in list)
2. Press the "Settings" button
3. Click the "Update libraries on board" option

Review README.md file for in-depth information about web sockets communication

*/
var mraa = require('mraa'); //require mraa
function startSensorWatch(socket) {
	

	var touch_sensor_value = 0;
    var last_t_sensor_value;
    var digital_pin_D2 = new mraa.Gpio(2);
    digital_pin_D2.dir(mraa.DIR_IN);
    
    var analogPin0 = new mraa.Aio(0);
    

    setInterval(function () {
		var temp_value = analogPin0.read();
        var temp_value1= (temp_value/1024.0)*5000; 
        temp_value1=temp_value1/10;
        touch_sensor_value = digital_pin_D2.read();
		 socket.emit('tempee', {value: temp_value1 });
        if (touch_sensor_value === 1 && last_t_sensor_value === 0) {
            
            console.log('hi' );
             socket.emit('burgler', {value: 0 });
            
        } else if (touch_sensor_value === 0 && last_t_sensor_value === 1) {
            
          
            console.log('hello' );
           
        }
        last_t_sensor_value = touch_sensor_value;
    }, 500);
}

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
 var emergency_red = new mraa.Gpio(7);
 emergency_red.dir(mraa.DIR_OUT);
 emergency_red.write(0);
 var ac = new mraa.Gpio(8);
 ac.dir(mraa.DIR_OUT);
 
 var heater= new mraa.Gpio(5);
 heater.dir(mraa.DIR_OUT);
 heater.write(0);
 var oven = new mraa.Gpio(6);
 oven.dir(mraa.DIR_OUT);
 oven.write(0);
var pwm3 = new mraa.Pwm(3);

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    //Join all arguments together and normalize the resulting path.
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});



//Allow use of files in client folder
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/js'));
app.use(express.static(__dirname + '/client/facebook'));
app.use(express.static(__dirname + '/client/facebook/js'));
app.use(express.static(__dirname + '/client/gmail'));
app.use(express.static(__dirname + '/client/gmail/js'));
app.use(express.static(__dirname + '/client/twitter'));
app.use(express.static(__dirname + '/client/twitter/js'));
app.use(express.static(__dirname + '/client/sensex'));
app.use(express.static(__dirname + '/client/sensex/js'));
app.use(express.static(__dirname + '/client/weather'));
app.use(express.static(__dirname + '/client/weather/js'));


app.use('/client', express.static(__dirname + '/client'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/client/sensex', express.static(__dirname + '/client/sensex'));
app.use('/client/sensex/js', express.static(__dirname + '/client/sensex/js'));
app.use('/client/gmail', express.static(__dirname + '/client/gmail'));
app.use('/client/gmail/js', express.static(__dirname + '/client/gmail/js'));
app.use('/client/facebook', express.static(__dirname + '/client/facebook'));
app.use('/client/facebook/js', express.static(__dirname + '/client/facebook/js'));
app.use('/client/weather', express.static(__dirname + '/client/weather'));
app.use('/client/weather/js', express.static(__dirname + '/client/weather/js'));
app.use('/client/twitter', express.static(__dirname + '/client/twitter'));
app.use('/client/twitter/js', express.static(__dirname + '/client/twitter/js'));

//Socket.io Event handlers
io.on('connection', function(socket) {
    
    startSensorWatch(socket);
    socket.on('chat message', function(msg) {
        console.log('hello');
    });
	 socket.on('chat', function(msg) {
        console.log('hi');
    });
    
   socket.on('securityalert', function(msg) {
         emergency_red.write(1); 
      });
	 socket.on('disablesecurity', function(msg) {
          emergency_red.write(0);
      });
	  socket.on('three', function(msg) {
        ac.write(1);
		oven.write(1);
		socket.emit('heater',{value: 0 });
      });
	  socket.on('threeoff', function(msg) {
        ac.write(0);
		oven.write(0);
		heater.write(0);
      });
	  socket.on('heateront', function(msg) {
       socket.emit('heater',{value: 0 });
      });
	  socket.on('heateron', function(msg) {
          heater.write(1);
      });
	 
	  socket.on('heateroff', function(msg) {
          heater.write(0);
      });
	   socket.on('acon', function(msg) {
          ac.write(1);
      });
	  socket.on('acoff', function(msg) {
          ac.write(0);
      });
	  socket.on('ovenon', function(msg) {
          oven.write(1);
      });
	   socket.on('ovenoff', function(msg) {
          oven.write(0);
      });
	  
	  
    	 socket.on('slow', function(msg) {
          //pwm3.period_us(2000);
          pwm3.enable(true);
          pwm3.write(0.5)
          emergency_red.write(1); 

    });
    
});
 

http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});