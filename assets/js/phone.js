/**
   * Set up UI event listeners and registering Firebase auth listeners.
   */
window.onload = function () {
    // Event bindings.
    document.getElementById('sign-in-form').addEventListener('submit', onSignInSubmit);
    document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
    document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
};

/**
 * Function called when clicking the Login/Logout button.
 */
function onSignInSubmit(e) {
    e.preventDefault();
    if (isPhoneNumberValid()) {
        window.signingIn = true;
        
        updateSignInButtonUI();

        var phoneNumber = getPhoneNumberFromUserInput();
        var appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                window.signingIn = false;

                updateSignInButtonUI();

                resetRecaptcha();
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                var code = window.prompt('Enter the verification code you received by SMS');
                if (code) {
                    confirmationResult.confirm(code).then(function () {
                        createData();
                      //  goHome();
                        
                    }).catch(function (error) {
                        // User couldn't sign in (bad verification code?)
                        console.error('Error while checking the verification code', error);
                        window.alert('Error while checking the verification code:\n\n'
                            + error.code + '\n\n' + error.message)
                    });
                }
            }).catch(function (error) {
                // Error; SMS not sent
                window.signingIn = false;
                console.error('Error during signInWithPhoneNumber', error);
                window.alert('Error during signInWithPhoneNumber:\n\n'
                    + error.code + '\n\n' + error.message);
                updateSignInButtonUI();
                resetRecaptcha();
            });
    }
}

/**
 * Reads the phone number from the user input.
 */
function getPhoneNumberFromUserInput() {
    return document.getElementById('phone-number').value;
}

/**
 * Returns true if the phone number is valid.
 */
function isPhoneNumberValid() {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = getPhoneNumberFromUserInput();
    return phoneNumber.search(pattern) !== -1;
}

/**
 * This resets the recaptcha widget.
 */
function resetRecaptcha() {
    return window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
    });
}

/**
 * Updates the Sign-in button state depending on ReCaptcha and form values state.
 */
function updateSignInButtonUI() {
    document.getElementById('sign-in-button').disabled = !isPhoneNumberValid() || !!window.signingIn;
}
function goHome() {
    setTimeout(function () {
        window.location.replace("Home.html");
    }, 200)
        
}

function createData() {
    var userMobile = document.getElementById("phone-number").value;

    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
        uid = user.uid;
    }
    var firebaseRef = firebase.database().ref("All-Users").child("Mobile Registered Users");
    var userData = {
        uid: user.uid,
        userFullName: createNull(),
        userMobile: userMobile,       
        userEmail: createNull(),       
        userId: userMobile + createdId(),       
        userAddress: createNull(),
    }
    firebaseRef.child(uid).set(userData);
    swal('Your Account Created','Login Sucessful.').then((value) => {
        setTimeout(function(){
            window.location.replace("Home.html");
        }, 100)
    });
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
