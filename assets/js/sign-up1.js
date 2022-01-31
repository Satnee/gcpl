// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx


const signUp = document.getElementById('signUp');
const signInWithMail = document.getElementById('signInWithMail');
const signInWithPhone = document.getElementById('signInWithPhone');
const signInWithGoogleButton = document.getElementById('signInWithGoogle');


//google sign
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("name").text(profile.getName());
    $("email").text(profile.getEmail());
    $("image").attr('src', profile.getImageUrl());
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");

}
//google signput
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName(){
    var userFullName = document.getElementById("userFullName").value;
    var flag = false;
    if(userFullName === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSurnameError").style.display = "block";
    }else{
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// check user mobile
function checkUserMobile(){
    var userMobile = document.getElementById("userMobile").value;
    var flag = false;
    if(userMobile === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userMobileError").style.display = "block";
    }else{
        document.getElementById("userMobileError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}
//create User id 
function createdId(){
	    var dt = new Date().getTime();
		var userId2 = 'xx4yxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return userId2;
}

//Create User Pin
function createUserPin(){
    var dt = new Date().getTime();
    var uuid = 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function createNull(){
  var dt = new Date().getTime();
    var uuid = 'xxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
	var userMobile = document.getElementById("userMobile").value;
 //   var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
	

//formate	
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;  
	var userMobileFormate = /^\d{10}$/;
    
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);
	var checkUserMobile = userMobile.match(userMobileFormate);
		
    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userMobile === null){
        return checkUserMobile();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
	}else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => 
            {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref("All-Users").child("All Registered Users");
            var userData = {
				uid:user.uid,
                userFullName: userFullName,
                userMobile: userMobile,
			//	selectPlans:selectPlans,
                userEmail: userEmail,
                userPassword: userPassword,
                userId: userFullName+createdId(),				
             //   sponcerId: createNull(),
             //   userPin: createUserPin(),
             //   userMobile: createNull(),
				
		    }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("home.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
///=================Login With google===========================
 //  var googleLogin=document.getElementById("googleLogin");

  // googleLogin.onclick=function(){
     //  var provider=new firebase.auth.GoogleAuthProvider();
     //  firebase.auth().signInWithPopup(provider).then(function(response){
     //      var userobj=response.user;
     //       var token=userobj.xa;
     //       var provider="google";
     //       var email=userobj.email;
      //      if(token!=null && token!=undefined && token!=""){
      //      sendDatatoServerPhp(email,provider,token,userobj.displayName);
      //      }
      //     console.log(response);
    //   })
     //  .catch(function(error){
      //     console.log(error);
    //   })


  // }
   //=======================End Login With Google==================
   //======================Login With Facebook==========================
   var facebooklogin=document.getElementById("facebooklogin");
   facebooklogin.onclick=function(){
    var provider=new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(response){
    var userobj=response.user;
     var token=userobj.xa;
     var provider="facebook";
     var email=userobj.email;
     if(token!=null && token!=undefined && token!=""){
     sendDatatoServerPhp(email,provider,token,userobj.displayName);
     }

    console.log(response);
})
.catch(function(error){
    console.log(error);
})
}
   //======================End Login With Facebook==========================