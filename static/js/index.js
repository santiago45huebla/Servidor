//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
  //alert("led on");
  console.log("led on");
  //document.getElementById("sensor").innerHTML="led on";
  message = new Paho.MQTT.Message("ON");
      message.destinationName = "santiago.huebla@unach.edu.ec/test";
      client.send(message);
  
}
function LED1_Off(){  
  //alert("led off");
  console.log("led off");
  message = new Paho.MQTT.Message("OFF");
      message.destinationName = "santiago.huebla@unach.edu.ec/test";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  //otroPrograma
  //client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "web_" + parseInt(Math.random() * 100, 10));

  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "santiago.huebla@unach.edu.ec",
    password: "santiago.huebla",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
  
    client.subscribe("santiago.huebla@unach.edu.ec/test1");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "santiago.huebla@unach.edu.ec/test";
    client.send(message);
  
  }

  function doFail(e){
    console.log(e);
  
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    var MensajeRecibido=message.payloadString;
    var la=message.payloadString.split("-");
    document.getElementById("sensor").innerHTML=la[0];
    document.getElementById("sensor1").innerHTML=la[1];

  }

function leerArchivo(e) {
  var archivo = e.target.files[0];

  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  document.getElementById('contenido-archivo').innerHTML=contenido;
}
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
