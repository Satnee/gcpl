// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx

firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
            document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
            document.getElementById("userPfEmail").innerHTML = dataSnapShot.val().userEmail;
            // userPassword = dataSnapShot.val().userPassword;
            document.getElementById("userPfId").innerHTML= dataSnapShot.val().userId;
            document.getElementById("sponcerPfId").innerHTML = dataSnapShot.val().sponcerId;
            document.getElementById("userPfPin").innerHTML= dataSnapShot.val().userPin;
            document.getElementById("userPfMobile").innerHTML = dataSnapShot.val().userMobile;
        })
    } else {
    //   No user is signed in.
    }
});

// xxxxxxxxxx Save sending Data and update database xxxxxxxxxx
function savePH(){
    let receiveName = document.getElementById("receiveName").value	
    let receiveId = document.getElementById("receiveId").value 
    let amount = document.getElementById("amount").value 
    let rdate = document.getElementById("rdate").value
	
     let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
    		receiveName:receiveName,
            receiveId: receiveId,
            amount: amount,
            rdate: rdate,            
        }
        firebaseRef.child(uid).update(userData);
        swal({
            type: 'successfull',
            title: 'Send successfull',
            text: 'updated Details.', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("./pages/home.html");
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("../index.html");
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