
var ACTIVE = false,
    READ_ACTIVE = (localStorage['read_disable'] === 'true') ? false : true,
    TYPING_ACTIVE = (localStorage['typing_disable'] === 'true') ? false : true,
    JS_CODE = 'var a=document.querySelector(".top_profile_img");a.style.transition="filter .5s",""===a.style.filter?a.style.filter="grayscale(1)":a.style.filter="";';


chrome.storage.local.get({'mixtape_on': false}, function(data) { ACTIVE = data.mixtape_on });


function save_settings() {
    chrome.storage.local.get({'mixtape_on': false}, function(data) {
        var mix = (data.mixtape_on) ? false : true;
        ACTIVE = mix;
        chrome.storage.local.set({'mixtape_on': mix});
    });
}


chrome.commands.onCommand.addListener(function(command) {

    if (command === 'activate') {
        chrome.tabs.getSelected(null, function(tab){
            if (tab.url.indexOf("vk.com") != -1) {
                save_settings();

                chrome.tabs.executeScript({
                    code: JS_CODE
                });
            }
        });
    }

    if (command === 'settings') {
        chrome.tabs.create({url: "options.html", selected: true}); 
    }

});


function dec_buffer(a) {
    return new TextDecoder("utf-8").decode(a);
}


chrome.webRequest.onBeforeRequest.addListener(

    function(details) {

        if (!ACTIVE) return {cancel: false};

        if (details.requestBody !== undefined) {

            if (details.requestBody.raw !== undefined) {
                if (dec_buffer(details.requestBody.raw[0].bytes).indexOf('a_mark_read') != -1) {
                    return {cancel: READ_ACTIVE};
                }
            }

            if (details.requestBody.formData !== undefined) {
                if (details.requestBody.formData.type !== undefined && details.requestBody.formData.type[0] === 'typing') {
                    return {cancel: TYPING_ACTIVE};
                }
            }
        }

        return {cancel: false};
    },
    {urls: ["*://vk.com/al_im.php"]},
    ["blocking", "requestBody"]

);
