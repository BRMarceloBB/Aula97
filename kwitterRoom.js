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

document.getElementById("userName").innerHTML = "Bem-vindo" + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;
  firebase.database().ref("/").child(roomName).update({
  purpose : "Adicionar Sala"
  });
  localStorage.setItem("roomName", roomName);
  window.location = "kwitterPage.html";
}

function getData() { firebase.database().ref("/").on('value', function(snapshot)
{ document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
{ childKey = childSnapshot.key;
  roomName = childKey;
  console.log("Nome da sala" + roomName);
  row = "<div class='roomNames' id="+roomName+" onclick='redirectToRoomName(this.id)'> #" + roomName + "</div> <hr>";
  document.getElementById("output").innerHTML += row;
}); });
}

getData();
function redirectToRoomName(name) {
   console.log(name);
   localStorage.setItem("roomName", name);
   window.location = "kwitterPage.html";
}

function logout () {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName")
  window.location.replace = ("index.html");
}