const setUserAgent = (window, userAgent) => {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = { get: function () { return userAgent; } };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}
const goToSite = (e) => {
    if (e.keyCode === 13) {
        const url = e.target.value.includes('http://') || e.target.value.includes('https://') ? e.target.value : 'https://' + e.target.value;
        document.querySelector('#mini-b-pop iframe').src = url;
    }
}
let saveUrl = "https://m.naver.com/";
chrome.storage.local.get(['mini_b_url'], (result) => {
    console.log('test',result);
    if ( result.mini_b_url ) saveUrl = result.mini_b_url;
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.current_url)
    if (document.querySelector('#mini-b-pop input')) document.querySelector('#mini-b-pop input').value = request.current_url;
});
window.addEventListener('DOMContentLoaded', () => {
    if ( self !== top ) {
        window.navigator.__defineGetter__('userAgent', function () {
            return 'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 CUSTOM';
        });
        console.log('load', location.href)
        chrome.storage.local.set({mini_b_url: location.href}, () => {});
        chrome.runtime.sendMessage({current_url: location.href}, (response) => { });
        document.querySelectorAll('[target="_blank"]').forEach((e)=>{
            e.removeAttribute('target')
        });
    }

    if (self === top && !document.querySelector("#mini-b-pop")) {
        const div = document.createElement('div');
        div.id = 'mini-b-pop';

        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.onkeydown = goToSite;

        const button = document.createElement('button');
        const iframe = document.createElement('iframe');
        iframe.src = saveUrl;

        div.appendChild(urlInput);
        div.appendChild(iframe);
        document.body.appendChild(div);
    }
});
