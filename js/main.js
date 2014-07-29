$(document).ready(function(){
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		taskManager.init($(".pending"));
		taskManager.init($(".working"));
		taskManager.init($(".completed"));
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
	//attaching event for file loading
	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object

		// Loop through the FileList and render image files as thumbnails.
		for (var i = 0, f; f = files[i]; i++) {

		  var reader = new FileReader();

		  // Closure to capture the file information.
		  reader.onload = (function(theFile) {
			return function(e) {
				taskManager.loadTask(e.target.result);
			};
		  })(f);

		  reader.readAsText(f,"ISO-8859-1");
		  
		}
	}

	document.getElementById('fleTaskList').addEventListener('change', handleFileSelect, false);
	$("#btnGuardar").on("click",function(){
		var appDataString = taskManager.getAllTasks();
		window.open('data:tkl/javascript;charset=ISO-8859-1,' + escape(appDataString));
	});
});

