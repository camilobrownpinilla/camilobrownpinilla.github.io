document.addEventListener('DOMContentLoaded', function() {
    // Select spotify button
    let spotifyButton = document.querySelector('#spotify_button');

    //Redirect to my spotify profile on click
    spotifyButton.addEventListener('click', function() {
        window.location.href = 'https://open.spotify.com/user/316xnhfulk3bvq4enrynw3rbj27i'
    });
});