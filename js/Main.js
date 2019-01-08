const streams        = ['hHW1oY26kxQ', '6Stj0jKBh8M'];
const interval       = 3000; // milliseconds
current_stream = 0;


function setup() {
    let screen_width  = window.screen.width;
    let screen_height = window.screen.height;
    let stream_id     = null

    
    for(i = 0; i < streams.length; i++) {
        stream_id = streams[i];
        let iframe_str = `<iframe id="${stream_id}" width="${screen_width}" height="${screen_height}" src="https://www.youtube.com/embed/${stream_id}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>`
        document.getElementById('streams').insertAdjacentHTML('beforeend', iframe_str);
        let current = document.getElementById(streams[i])
        current.style.display = 'none';
    }
}


function nextStream() {
    let current_stream_id = streams[current_stream];
    
    // Hide the current stream
    let hide_element = document.getElementById(current_stream_id)
    hide_element.style.display = 'none';

    current_stream += 1;
    if(current_stream >= streams.length) {
        current_stream = 0;
    }

    // Show the current stream
    current_stream_id = streams[current_stream];
    let show_element = document.getElementById(current_stream_id)
    show_element.style.display = 'block';

}


setup();
setInterval(nextStream, interval);
