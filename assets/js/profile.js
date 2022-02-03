

// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfiles(){
    
    let userfullName = document.getElementById("userFullName").value
    let useremail = document.getElementById("userEmail").value
    let usermobile = document.getElementById("userMobile").value
    let Useraddress = document.getElementById("UserAddress").value
    
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
    
        var firebaseRef = firebase.database().ref("All-Users").child("Mobile Registered Users");
        var userData = {
            userfullName: userfullname,
            useremail:useremail,            
            usermobile: usermobile,
            Useraddress:useraddress,
        }
        firebaseRef.child(uid).update(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setTimeout(function(){
                //  document.getElementById("profileSection").style.display = "block";
                //   document.getElementById("editProfileForm").style.display = "none";
                window.location.replace("profile.html");
            }, 1000)
        });
        //show profile
        var firebaseRefKey = firebase.database().ref("All-Users").child("Mobile Registered Users").child(uid);
        firebaseRefKey.on('value',function(snapshot){		
            
            document.getElementById("userFullName").innerHTML = dataSnapShot.val().userfullname;
            document.getElementById("userEmail").innerHTML = dataSnapShot.val().useremail;
            document.getElementById("userAddress").innerHTML = dataSnapShot.val().useraddress;
            document.getElementById("userMobile").innerHTML = dataSnapShot.val().usermobile;              
					
        })
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