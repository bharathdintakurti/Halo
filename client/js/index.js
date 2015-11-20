
var socket = io();
(function(){
  var hee;
  var temp1=false;
  var emer;
  var hon;
  var chat = {
   
    init: function() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function() {
      this.$chatHistory = $('.chat-history');
      this.$button = $('button');
      this.$textarea = $('#message-to-send');
	  msg = this.$textarea.val();
	  
      this.$chatHistoryList =  this.$chatHistory.find('ul');
    },
    bindEvents: function() {
      this.$button.on('click', this.addMessage.bind(this));
      this.$textarea.on('keyup', this.addMessageEnter.bind(this));
    },
    render: function() {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== '') {
        var template = Handlebars.compile( $("#message-template").html());
        var context = { 
          
          messageOutput: this.messageToSend,
          time: this.getCurrentTime()
        };
        
        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$textarea.val('');
        msg=msg.replace(/[\n?!.]/g, '');
        msg=msg.toUpperCase();
        // responses
        var templateResponse = Handlebars.compile( $("#message-response-template").html());
        var contextResponse = 
		{ 
		
          response: "Sry i didn't get you",//this.getRandomItem(this.messageResponses),
          time: this.getCurrentTime()
        };
		 
		if(msg=="HI IOT"||msg=="HI")
		{contextResponse = 
		 { 
		  
          response: "Hi Team H.B.R , How can I help you?",
          time: this.getCurrentTime()
         
         };
         
         }
		 else if(msg=="NO" && emer == true)
		{contextResponse = 
		 { 
		  
          response: "EMERGENCY ALERT: Someone entered into your house",
          time: this.getCurrentTime()
         
         };
         socket.emit('securityalert', {value: 0});  
		 
         emer=false;
         }
		 else if(msg=="YES"&& emer == true)
		{contextResponse = 
		 { 
		  
          response: "Ok sir, I will take care of you guest",
          time: this.getCurrentTime()
         
         };
        }
		else if(msg=="WHO ARE YOU"||msg=="WHO R U"||msg=="WHO R YOU")
		{contextResponse = 
		 { 
		  
          response: "I am Halo,Designed by Team H.B.R as a personal assistant to your home",
          time: this.getCurrentTime()
         
         };
         
         }
		 else if(msg=="ALL OF THEM"||msg=="START ALL")
		{contextResponse = 
		 { 
		  
          response: "All three are turned ON",
          time: this.getCurrentTime()
         
         };
         socket.emit('three', {value: 0});
         }
		  else if(msg=="OFF ALL"||msg=="OFF EVERYTHING")
		{contextResponse = 
		 { 
		  
          response: "All three are stopped",
          time: this.getCurrentTime()
         
         };
         hon=false;
         socket.emit('threeoff', {value: 0});
         }
		 else if(msg=="OFF AC"||msg=="AC OFF")
		{contextResponse = 
		 { 
		  
          response: "Ok sir, turning off the AC",
          time: this.getCurrentTime()
         
         };
         socket.emit('acoff', {value: 0});
         }
		 else if(msg=="ON AC"||msg=="AC ON")
		{contextResponse = 
		 { 
		  
          response: "ok Sir, turning on the AC",
          time: this.getCurrentTime()
         
         };
         socket.emit('acon', {value: 0});
         }
		 else if(msg=="OFF AC"||msg=="AC OFF")
		{contextResponse = 
		 { 
		  
          response: "ok Sir, turning off the AC",
          time: this.getCurrentTime()
         
         };
        }
		 else if(msg=="OVEN ON"||msg=="ON OVEN")
		{contextResponse = 
		 { 
		  
          response: "ok Sir, turning on the oven",
          time: this.getCurrentTime()
         
         };
         socket.emit('ovenoff', {value: 0});
         }
		 	 else if(msg=="OVEN OFF"||msg=="OFF OVEN")
		{contextResponse = 
		 { 
		  
          response: "ok Sir, turning off the oven",
          time: this.getCurrentTime()
         
         };
         socket.emit('ovenoff', {value: 0});
         }
		 	 else if(msg=="HEATER ON"||msg=="ON HEATER")
		{contextResponse = 
		 { 
		  
          response: "ok Sir, turning on the heater with threshold of 40`C",
          time: this.getCurrentTime()
         
         };
         socket.emit('heateront', {value: 0});
         }
		 	 else if(msg=="HEATER OFF"||msg=="OFF HEATER")
		{contextResponse = 
		 { 
		  
          response: "ok Sir, turning off the oven",
          time: this.getCurrentTime()
         
         };
         socket.emit('heateroff', {value: 0});
         hon=false;
         }
		 else if(msg=="SWITCH ON THE LED"||msg=="LED ON"||msg=="ON LED")
		 
		 { 
            contextResponse = 
		  { 
		  
          response: "Yes sir",
          time: this.getCurrentTime()
         
         };
			socket.emit('led on', {value: 0});  
      
         
         }
          else if(msg=="COMING HOME"||msg=="I AM COMING HOME"||msg=="REACHING HOME")
		 
		 { 
            contextResponse = 
		  { 
		  
          response: "Shall I turn on any of these? Heater or AC or Oven ",
          time: this.getCurrentTime()
         
         };
			
      
         
         }
		 else if(msg=="EMERGENCY ON"||msg=="SECURITY ON"||msg=="SECURITY ACTIVATE")
		  
		 { 
                if(temp1==true)
                {
                    contextResponse = 
		                  { 
		  
                            response: "Sir Did you expect someone in home this time?",
                            time: this.getCurrentTime()
                 
                            };
                        temp1=false;
                        emer=true;

                }
                else
                {
                    contextResponse = 
		                  { 
		  
                            response: "ok Sir, security is in tight",
                            time: this.getCurrentTime()
                 
                            };
                        temp1=false;
                        emer=true; 
                
                }
			}
		  else if(msg=="OFF THE LED"||msg=="LED OFF"||msg=="OFF LED")
		  
		 { 
             contextResponse = 
		 { 
		  
          response: "Yes sir",
          time: this.getCurrentTime()
                 
                 
         };
            
            socket.emit('led off', {value: 0});  
         
         
         }
          	  else if(msg=="SLOW AC" || msg=="DECREASE TEMP")
		  
		 { 
             contextResponse = 
		 { 
		  
          response: "Yes sir temperature decreased",
          time: this.getCurrentTime()
                 
                 
         };
            
            socket.emit('slow', {value: 0});  
         
         
         }
            else if(msg=="DISABLE ALERT"||msg=="DISABLE"||msg=="OFF")
		  
		 { 
             contextResponse = 
		 { 
		  
          response: "Security Disabled",
          time: this.getCurrentTime()
                 
                 
         };
            
            socket.emit('disablesecurity', {value: 0});  
         
         
         }
          else if(msg=="TEMPERATURE OF HOME"||msg=="TEMP OF HOME"||msg=="TEMP")
		  
		 { 
             contextResponse = 
		 { 
		  
          response: "The present temperature of home is   "+hee +"*C",
          time: this.getCurrentTime()         
         };
            
         }
        
          
          socket.on('burgler', function(msg) {
				temp1=true; 
         });
		  
		  
		  socket.on('tempee', function(msg) {
		 
            hee=msg.value;
                 
           
         });
		   
		  socket.on('heater', function(msg) {
		 
         if( hee>400)
		 {
			socket.emit('heateroff', {value: 0});
		 }
		 else  
		 {
			socket.emit('heateron', {value: 0});
		  }
          hon=true;  
         });
        
         setInterval(function () {
             if(hon==true)
             {
                 if( hee>400)
		 {
			socket.emit('heateroff', {value: 0});
		 }
		 else 
		 {
			socket.emit('heateron', {value: 0});
		 }
             }
         },500);
         
        
        setTimeout(function() {
          this.$chatHistoryList.append(templateResponse(contextResponse));
          this.scrollToBottom();
        }.bind(this), 1500);
        
      }
      
    },
    
    addMessage: function() {
	  msg = this.$textarea.val();
      this.messageToSend = this.$textarea.val();
      this.render(); 
      
    },
    addMessageEnter: function(event) {
        // enter was pressed
        if (event.keyCode === 13) {
          this.addMessage();
        }
    },
    scrollToBottom: function() {
       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
      return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
   
    
  };
  
  chat.init();
})();
 //socket.emit('toogle led', {value: 0});  
// socket.emit('chat message', {value: $('msg').val()});
