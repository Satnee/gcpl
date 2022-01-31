var selectedFile;
$( document ).ready(function() {
	document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(event) {
	selectedFile = event.target.files[0];
};
			
function uploadImage() {
	var metadata = {
		contentType: 'image',
		customMetadata: {
			'title': $("#imgTitle").val(),
			'caption': $("#imgDesc").val()
		},
	};
	var uploadTask = firebase.storage().ref().child('Challans/' + selectedFile.name).put(selectedFile, metadata);
	uploadTask.on('state_changed', function(snapshot){
	}, function(error) {
	}, function() {

	});
}


