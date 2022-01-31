firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
   }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
      alertMessage('User signed in!');
    }) 
    .catch(function(error) {
      // Handle second factor sign-in.
      if (error.code ==='auth/multi-factor-auth-required') {
        mfaResolver = error.resolver;
        showMfaDialog();
		window.open('home.aspx');
        return;
      }
      displayError(error);
    });
}
/**
 * Creates a user with email and password.
 */
function signUp() {
  var email = document.getElementById('email_field').value;
  var password = document.getElementById('password_field').value;
  // Sign up with email and password.
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      alertMessage('New user created!');
    }).catch(displayError);
}
/**
 * Sends a password reset email to the user.
 */
function sendPasswordReset() {
  var email = document.getElementById('email_field').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alertMessage('Password Reset Email Sent!');
  }).catch(displayError);
}

function signOut() {
  firebase.auth().signOut().then(function() {
    alertMessage('User signed out!');
  }).catch(displayError);
}
/**
 * Displays the multi-factor dialog.
 */
function showMfaDialog() {
  updateMfaDialog();
  document.getElementById('mfa-modal').show();
}