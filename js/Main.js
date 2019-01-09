// For youtube add yt: infront of id, for twitch add tw: infront of channel
const streams        = [ 'yt:LvfaMv9nbJc', 'tw:gamesdonequick'];
const interval       = 3000; // milliseconds
current_stream = 0;


function setup() {
    let screen_width  = window.screen.width;
    let screen_height = window.screen.height;
    let stream_id     = null

    
    for(i = 0; i < streams.length; i++) {
        stream_info = streams[i].split(":");
        stream_type = stream_info[0];
        stream_id = stream_info[1];
        if (stream_type == "yt"){
            iframe_str = `<iframe id="${streams[i]}" width="${screen_width}" height="${screen_height}" src="https://www.youtube.com/embed/${stream_id}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`
        } else if (stream_type == "tw") {
            iframe_str = `<iframe id="${streams[i]}" src="https://player.twitch.tv/?channel=${stream_id}" frameborder="0" allowfullscreen="true" scrolling="no" height="${screen_height}" width="${screen_width}" ></iframe>`
        } else {
            continue
        }
        document.getElementById('streams').insertAdjacentHTML('beforeend', iframe_str);
        let current = document.getElementById(streams[i])
        current.style.display = 'none';
    }
}


function nextStream() {
    let current_stream_id = streams[current_stream];

    if (streams[current_stream].includes(':')){
      // Hide the current stream
      let hide_element = document.getElementById(current_stream_id)
      hide_element.style.display = 'none';
    }

    
    current_stream += 1;
    if(current_stream >= streams.length) {
        current_stream = 0;
    }
    
    while (!(streams[current_stream].includes(':'))){
        current_stream += 1;
        if(current_stream >= streams.length) {
            current_stream = 0;
        }
    }
    
    // Show the current stream
    current_stream_id = streams[current_stream];
    let show_element = document.getElementById(current_stream_id)
    show_element.style.display = 'block';

}


setup();
setInterval(nextStream, interval);
