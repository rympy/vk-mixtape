
document.addEventListener("DOMContentLoaded", function() {

    var READ_ID = document.getElementById('read'),
        TYPING_ID = document.getElementById('typing');

    READ_ID.checked = (localStorage['read_disable'] === 'true') ? false : true;
    TYPING_ID.checked = (localStorage['typing_disable'] === 'true') ? false : true;

    document.getElementById('save').addEventListener('click', function() {
        localStorage['read_disable'] = (READ_ID.checked) ? 'false' : 'true';
        localStorage['typing_disable'] = (TYPING_ID.checked) ? 'false' : 'true';
        
        chrome.runtime.reload();
        window.close();
    }, false);


    READ_ID.addEventListener('change', function() {
    	if (!this.checked) TYPING_ID.checked = true;
    }, false);

    TYPING_ID.addEventListener('change', function() {
    	if (!this.checked) READ_ID.checked = true;
    }, false);

});
