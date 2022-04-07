function setUserAgent(window, userAgent) {
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
    console.log(e.keyCode);
    if (e.keyCode === 13) {
        //setUserAgent(document.querySelector('#mini-b-pop iframe').contentWindow, 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H)');
        document.querySelector('#mini-b-pop iframe').src = e.target.value;
    }
}
window.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector("#mini-b-pop")) {
        const div = document.createElement('div');
        div.id = 'mini-b-pop';

        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.onkeydown = goToSite;

        const button = document.createElement('button');

        const iframe = document.createElement('iframe');
        iframe.src = "https://m.naver.com/";

        div.appendChild(urlInput);
        div.appendChild(iframe);
        document.body.appendChild(div);
        setUserAgent(document.querySelector('#mini-b-pop iframe').contentWindow, 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H)');
    }
});
