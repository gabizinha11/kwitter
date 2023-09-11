const firebaseConfig = {
  apiKey: "AIzaSyCCvS1Q9_wh8nk9ni6pgOnSu3wjhhV5HRs",
  authDomain: "kwitter-83efd.firebaseapp.com",
  databaseURL: "https://kwitter-83efd-default-rtdb.firebaseio.com",
  projectId: "kwitter-83efd",
  storageBucket: "kwitter-83efd.appspot.com",
  messagingSenderId: "506067172909",
  appId: "1:506067172909:web:cd5addaa687e68ada142a4"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    link: 0
  })
  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on("value", function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: " + like + "</span></button><hr>";
        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
      }
    })
  })
}

getData()

function
updateLike(message_id){
  console.log("clicou no botão curtir - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
    like:updated_likes
  })

}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}