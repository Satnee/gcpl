// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx

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


// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in', 
            }).then((value) => {
                setTimeout(function(){
                    window.location.replace("Home.html");
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
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
	    let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref("All-Users").child("All Registered Users").child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
			
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;            
            document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
            
            document.getElementById("userPfEmail").innerHTML = dataSnapShot.val().userEmail;
            // userPassword = dataSnapShot.val().userPassword;
            document.getElementById("userPfId").innerHTML = dataSnapShot.val().userId;
            document.getElementById("sponcerPfId").innerHTML = dataSnapShot.val().sponcerId;
            document.getElementById("userPfPin").innerHTML = dataSnapShot.val().userPin;
          	document.getElementById("userPfMobile").innerHTML = dataSnapShot.val().userMobile;
	     })
    } else {
    //   No user is signed in.
    }
});

	

function showEditBankForm(){
    document.getElementById("profileSection").style.display = 'none'
    document.getElementById("editProfileForm").style.display = 'block'
	
    var bankMyName = document.getElementById("bankMyName").innerHTML;
    var accMyNumber = document.getElementById("accMyNumber").innerHTML;
    var accMyBank = document.getElementById("accMyBank").innerHTML;	
    var accMyIFSC = document.getElementById("accMyIFSC").innerHTML;
    var accMyPaytm = document.getElementById("accMyPaytm").innerHTML;
    var accMyBhim = document.getElementById("accMyBhim").innerHTML;
    var accMyGoogle = document.getElementById("accMyGoogle").innerHTML;
    var accMyPhone = document.getElementById("accMyPhone").innerHTML;
	
    document.getElementById("accName").value = bankMyName; 
    document.getElementById("accNo").value = accMyNumber;
    document.getElementById("bankName").value = accMyBank;	
    document.getElementById("ifscNo").value = accMyIFSC; 
    document.getElementById("paytmNo").value = accMyPaytm; 
    document.getElementById("bhimUpi").value = accMyBhim; 
    document.getElementById("googlePay").value = accMyGoogle; 
    document.getElementById("phonePay").value = accMyPhone; 
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditBankForm(){
    document.getElementById("profileSection").style.display = 'block';
    document.getElementById("editProfileForm").style.display = 'none';
}
//update Bank details
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function submitBankDetails(){
    let accName = document.getElementById("accName").value 
    let accNo = document.getElementById("accNo").value
    let bankName = document.getElementById("bankName").value	
    let ifscNo = document.getElementById("ifscNo").value 
    let paytmNo = document.getElementById("paytmNo").value 
    let bhimUpi = document.getElementById("bhimUpi").value 
    let googlePay = document.getElementById("googlePay").value
    let phonePay = document.getElementById("phonePay").value
    
	    let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref("All-Users").child("My Bank Details");
        var userData = {
            accName: accName,
            accNo: accNo,
			bankName:bankName,
            ifscNo: ifscNo,
            paytmNo: paytmNo,
            bhimUpi: bhimUpi,
            googlePay: googlePay,
            phonePay: phonePay,
        }
        firebaseRef.child(uid).update(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Bank Details updated.', 
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = 'block';
                document.getElementById("editProfileForm").style.display = 'none';
            }, 1000)
        });
    }
//Show My Bank Details
window.onload = function() {
  document.getElementById('editProfileForm').style.display = 'none';
};
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
	    let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref("All-Users").child("My Bank Details").child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{		
            
            document.getElementById("bankMyName").innerHTML = dataSnapShot.val().accName;
            document.getElementById("accMyNumber").innerHTML = dataSnapShot.val().accNo;
            document.getElementById("accMyBank").innerHTML = dataSnapShot.val().bankName;
            document.getElementById("accMyIFSC").innerHTML = dataSnapShot.val().ifscNo;
            document.getElementById("accMyPaytm").innerHTML = dataSnapShot.val().paytmNo;
            document.getElementById("accMyBhim").innerHTML = dataSnapShot.val().bhimUpi;
            document.getElementById("accMyGoogle").innerHTML = dataSnapShot.val().googlePay;
            document.getElementById("accMyPhone").innerHTML = dataSnapShot.val().phonePay;
					
        })
    } else {
    //   No user is signed in.
	           
    }
});

// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
	
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    var userPfPlans = document.getElementById("userPfPlans").innerHTML;
    var userPfEmail = document.getElementById("userPfEmail").innerHTML;	
    var userPfId = document.getElementById("userPfId").innerHTML;
    var sponcerPfId = document.getElementById("sponcerPfId").innerHTML;
    var userPfPin = document.getElementById("userPfPin").innerHTML;
    var userPfMobile = document.getElementById("userPfMobile").innerHTML;
	
    document.getElementById("userFullName").value = userPfFullName; 
    document.getElementById("userSurname").value = userPfSurname;
    document.getElementById("selectPlans").value = userPfPlans;	
    document.getElementById("userEmail").value = userPfEmail;	
    document.getElementById("userId").value = userPfId; 
    document.getElementById("sponcerId").value = sponcerPfId; 
    document.getElementById("userPin").value = userPfPin; 
    document.getElementById("userMobile").value = userPfMobile; 
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}

// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile1(){
    let sponcerId = document.getElementById("sponcerId").value 
    let userMobile = document.getElementById("userMobile").value
    
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref("All-Users").child("All Registered Users");
        var userData = {
            sponcerId: sponcerId,
            userMobile: userMobile,
        }
        firebaseRef.child(uid).update(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = "block";
                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }

//show profile
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
	    let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref("All-Users").child("All Registered Users").child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{		
            
            document.getElementById("userPfEmail").innerHTML = dataSnapShot.val().userEmail;
            document.getElementById("userPfId").innerHTML = dataSnapShot.val().userId;
            document.getElementById("sponcerPfId").innerHTML = dataSnapShot.val().sponcerId;
            document.getElementById("userPfPin").innerHTML = dataSnapShot.val().userPin;
            document.getElementById("userPfMobile").innerHTML = dataSnapShot.val().userMobile;            
					
        })
    } else {
    //   No user is signed in.
	           
    }
});


//select plan details and challans
function uploadImage12(){	
//image Upload
    var selectedFile;
	$(document).ready(function() {
	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(event) {    
	selectedFile = event.target.files[0];
};
var filename = selectedFile.name;
	 var storageRef=firebase.storage().ref('Challans/'+ filename);
	 var uploadTask = storageRef.put(selectedFile);
	 
	 	 
		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
	uploadTask.on('stage_changed',function(snapshot){
	 
	 },function(error){
		 // Handle unsuccessful uploads
		 
	 },function (){
		 		 
		 // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	     var downloadURL = uploadTask.snapshot.downloadURL;    
		 
	var today = new Date();
	var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
	
	var selectPlans = document.getElementById("selectPlans").value
	var onePinAmount = document.getElementById("onePinAmount").value
	var pinNos = document.getElementById("pinNos").value
    var totalAmount = document.getElementById("totalAmount").value
	 {    
        var user = firebase.auth().currentUser;
        var uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref("All-Users").child("MyChallanDetails");		           
		var userData = {
            selectPlans: selectPlans,
			pinNos:pinNos,
            totalAmount: totalAmount, 
			date:date,
			url:downloadURL
		//file:uploadFile()
        }
        firebaseRef.child(uid).push(userData);
        swal({
            type: 'successfull',
            title: 'sending successfull',
            text: 'Challan and Details Upload Succesfully.', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("#");
            }, 1000)
        });
    }
});
}


 //change Password
  //Forgot Password
  $("#btn-resetPassword").click(function()
  {
	  var auth = firebase.auth();
	  var email = $("#email").val();
	  if(email != "")
	  {
		  auth.sendPasswordResetEmail(email).then(function()		  
		  {
			swal({
            type: 'successfull',
            title: 'Change Password successfull',
            text: 'Your New Password has been changed successfully', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("Home.html");
            }, 1000)
        });
	  }).catch(function(error)
		  {			
	       var errorMessage=error.message;
			swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })		   
	    });
	  }
	  else{
		window.alert("Please write your email first");  
	  }
});
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}

