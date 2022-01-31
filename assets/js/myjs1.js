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
            
})
    
var selectedFile;
$(document).ready(function() {
	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(event) {    
	selectedFile = event.target.files[0];
};
function uploadImage(){
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
	
		var firebaseRef = firebase.database().ref("All-Users").child("MyChallanDetails");
		var postData ={
			data:date,
			url:downloadURL,
			selectPlans: selectPlans,
			onePinAmt: onePinAmount,
			pinNos: pinNos,
			totalAmount: totalAmount
            
		};
		firebaseRef.child(uid).push(postData);
        swal({
            type: 'successfull',
            title: 'sending successfull',
            text: 'Challan and Details Upload Succesfully.', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("epin-form-list.html");
            }, 1000)
        });
   });
}
} else {
    //   No user is signed in.
    }
});