
const streamtypes = {
    youtube: {
        makeElement: (id, screen_width, screen_height, screen_obj) => {
            document.getElementById('streams').insertAdjacentHTML('beforeend', `<div id=${id}></div>`);
            screen_obj.elem2 = new YT.Player(id, {
                width: screen_width,
                height: screen_height,
                videoId: id,
                modestbranding: 1,
                autohide: 1,
                showinfo: 1,
                controls: 0,
                autoplay: 0,
                enablejsapi: 1
            });
            screen_obj.elem = {};
            screen_obj.elem.play = () => { screen_obj.elem2.playVideo.bind(screen_obj.elem2)() };
            screen_obj.elem.pause = () => { screen_obj.elem2.pauseVideo.bind(screen_obj.elem2)() };
        }
    },
    twitch: {
        makeElement: (id, screen_width, screen_height, screen_obj) => {
            screen_obj.elem = {};
            document.getElementById('streams').insertAdjacentHTML('beforeend', `<div id=${id}></div>`);
            screen_obj.elem = new Twitch.Embed(id, {
                width: screen_width,
                height: screen_height,
                channel: id,
                layout: "video",
                autoplay: false,
                theme: "dark"
            });
            screen_obj.elem.addEventListener(Twitch.Embed.VIDEO_READY, function () {
                //patch play and pause to do our bidding.
                screen_obj.elem.play = () => { screen_obj.elem.getPlayer().play.bind(screen_obj.elem.getPlayer())() };
                screen_obj.elem.pause = () => { screen_obj.elem.getPlayer().pause.bind(screen_obj.elem.getPlayer())() };
            });
        },
    }
};

const streams        = [ {streamtype: streamtypes.youtube, url: 'LvfaMv9nbJc'}, {streamtype: streamtypes.twitch, url: 'harbleu'} ];
const interval       = 10000; // milliseconds

var current_stream = -1;


function setup() {
    let screen_width  = window.screen.width;
    let screen_height = window.screen.height;
    for(var stream of streams) {
        stream.streamtype.makeElement(stream.url, screen_width, screen_height, stream);
        document.getElementById(stream.url).style.display = 'none';
    }
}


function nextStream() {
    let current_stream_id = streams[current_stream];
    if(current_stream !== -1) {
        current_stream_id = current_stream_id.url;
        let hide_element = document.getElementById(current_stream_id);
        streams[current_stream].elem.pause();
        if (hide_element) {
            hide_element.style.display = 'none';
        }
    }

    current_stream += 1;
    if(current_stream >= streams.length) {
        current_stream = 0;
    }

    // Show the current stream
    current_stream_id = streams[current_stream].url;
    let show_element = document.getElementById(current_stream_id);
    streams[current_stream].elem.play();
    show_element.style.display = 'block';
}

function onYouTubeIframeAPIReady() {
    setup();
    setInterval(nextStream, interval);
}