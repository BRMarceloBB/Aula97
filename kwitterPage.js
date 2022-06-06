const firebaseConfig = {
      apiKey: "AIzaSyAHLE6wgKN4SFDPwPuEDd5BXQUlvVUU8nI",
      authDomain: "vamosconversar-aee23.firebaseapp.com",
      databaseURL: "https://vamosconversar-aee23-default-rtdb.firebaseio.com",
      projectId: "vamosconversar-aee23",
      storageBucket: "vamosconversar-aee23.appspot.com",
      messagingSenderId: "350030129338",
      appId: "1:350030129338:web:2da23f95ec868b2bae3a83"
    };
    
    firebase.initializeApp(firebaseConfig); 
    
    userName = localStorage.getItem("userName");
    roomName = localStorage.getItem("roomName");

function send () {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
      name : userName,
      mensagem:msg, 
      like:0         
      });
      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
         console.log(firebaseMessageId);
         console.log(messageData);
         name = messageData['name'];
         message = messageData['message'];
         like = messageData['like'];
         nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
         messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
         likeButton = "<button class='btn btn-warning' id="+ firebaseMessageId +" value="+ like +" onclick='updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up' > like:"+ like +"> </span> </button> <hr>";
         row = nameWithTag + spanWithTag + likeButton + messageWithTag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function updateLike (messageId) {
      console.log("Botão like pressionado" + messageId);
      buttonId = messageId;
      likes = document.getElementById(buttonId).value;
      updatedLikes = Number(likes)+1;
      console.log(updatedLikes);
      firebase.database().ref(roomName).child(messageId).update({
            like: updatedLikes
      });
}

function logout () {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName")
      window.location.replace = ("index.html");
    }