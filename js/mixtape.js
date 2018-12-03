

document.addEventListener("DOMContentLoaded", function() {

	chrome.storage.local.get({'mixtape_on': false}, function(data) {
	    if (data.mixtape_on) document.querySelector(".top_profile_img").style.filter = 'grayscale(1)';
	});

});

