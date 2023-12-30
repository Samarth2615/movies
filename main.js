


// var frames = document.getElementsByTagName('iframe');
// for (var frame of frames) {
//     frame.setAttribute("sandbox", "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms");
// }

// window.onload = function(){
//     var button = document.getElementsByName("sandbox")[0]
//     var iframe = document.getElementsByName("framez")[0]
//     button.addEventListener('click',sndbx,false);

//     function sndbx(){
//     var nibba = document.getElementById("framez").src;
//     if(iframe.sandbox == 'allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation'){
//     document.getElementById("framez").removeAttribute("sandbox"); 
//     }
//     frames['framez'].location.href=nibba;
//     iframe.sandbox = 'allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation';
//     }
// } 

function getMovieSuggestions() {

    const movieName = document.getElementById('movieName').value;

    const apiKey = '69a6237ce6938d2fb74092f8ff3a8f16'; // Replace with your TMDb API key



    if (movieName.trim() === '') {

        clearMovieSuggestions();

        return;

    }



    // Make a request to TMDb API for movie suggestions

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)

        .then(response => response.json())

        .then(data => {

            const movieSuggestionsList = document.getElementById('movieSuggestions');

            movieSuggestionsList.innerHTML = '';



            if (data.results && data.results.length > 0) {

                data.results.slice(0, 5).forEach(result => {

                    const listItem = document.createElement('li');

                    listItem.textContent = result.title;

                    listItem.onclick = function () {

                        document.getElementById('movieName').value = result.title;

                        clearMovieSuggestions();

                    };

                    movieSuggestionsList.appendChild(listItem);

                });

            }

        })

        .catch(error => {

            console.error('Error fetching movie suggestions:', error);

            clearMovieSuggestions();

        });

}


function searchMovie() {
    const movieName = document.getElementById('movieName').value;
    const apiKey = '69a6237ce6938d2fb74092f8ff3a8f16'; // Replace with your TMDb API key

    // Make a request to TMDb API for movie details
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
        .then(response => response.json())
        .then(data => {
            const movieResultElement = document.getElementById('movieResult');
            const movieCopyButton = document.getElementById('movieCopyButton');

            if (data.results && data.results.length > 0) {
                const movieTmdbId = data.results[0].id;

                // Construct the URL for embedding the movie
                const movieUrl = `https://vidsrc.xyz/embed/movie/${movieTmdbId}`;

                //Create an iframe element
                const iframe = document.createElement('iframe');
                iframe.src = movieUrl; 
                iframe.allowfullscreen = true;
                // iframe.width = '800';
                // iframe.height = '600';
                

                // Clear previous content
                movieResultElement.innerHTML = '';

                // Display the generated URL as a clickable link
                const linkElement = document.createElement('a');
                linkElement.href = movieUrl;
                linkElement.target = '_blank';
                linkElement.textContent = "Generated URL:" + movieUrl;

                // Append the link and iframe to the result element
                movieResultElement.appendChild(linkElement);
                movieResultElement.appendChild(iframe);

                // Enable the copy button for the movie
                movieCopyButton.disabled = false;

                // Store the URL for the movie in a global variable for copying
                window.generatedMovieUrl = movieUrl;
            } else {
                movieResultElement.innerHTML = 'Movie not found';
                // Disable the copy button for the movie if no movie is found
                movieCopyButton.disabled = true;
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            document.getElementById('movieResult').innerHTML = 'Error fetching movie data';
            // Disable the copy button for the movie in case of an error
            document.getElementById('movieCopyButton').disabled = true;
        });
}





function copyMovieToClipboard() {
    const generatedMovieUrl = window.generatedMovieUrl;

    if (!generatedMovieUrl) {
        console.error('No generated movie URL to copy.');
        return;
    }

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = generatedMovieUrl;

    // Append it to the body
    document.body.appendChild(textarea);

    // Select the text
    textarea.select();

    try {
        // Use the Clipboard API to copy the text to the clipboard
        document.execCommand('copy');
        console.log('URL copied to clipboard:', generatedMovieUrl);
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    } finally {
        // Remove the temporary textarea
        document.body.removeChild(textarea);
    }
}




function clearMovieSuggestions() {

    document.getElementById('movieSuggestions').innerHTML = '';

}



// Series Section

function getSeriesSuggestions() {

    const seriesName = document.getElementById('seriesName').value;

    const apiKey = '69a6237ce6938d2fb74092f8ff3a8f16'; // Replace with your TMDb API key



    if (seriesName.trim() === '') {

        clearSeriesSuggestions();

        return;

    }



    // Make a request to TMDb API for series suggestions

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(seriesName)}`)

        .then(response => response.json())

        .then(data => {

            const seriesSuggestionsList = document.getElementById('seriesSuggestions');

            seriesSuggestionsList.innerHTML = '';



            if (data.results && data.results.length > 0) {

                data.results.slice(0, 5).forEach(result => {

                    const listItem = document.createElement('li');

                    listItem.textContent = result.name;

                    listItem.onclick = function () {

                        document.getElementById('seriesName').value = result.name;

                        clearSeriesSuggestions();

                    };

                    seriesSuggestionsList.appendChild(listItem);

                });

            }

        })

        .catch(error => {

            console.error('Error fetching series suggestions:', error);

            clearSeriesSuggestions();

        });

}






function searchSeries() {
    const seriesName = document.getElementById('seriesName').value;
    const apiKey = '69a6237ce6938d2fb74092f8ff3a8f16'; // Replace with your TMDb API key

    // Make a request to TMDb API for series details
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(seriesName)}`)
        .then(response => response.json())
        .then(data => {
            const seriesResultElement = document.getElementById('seriesResult');
            const seriesCopyButton = document.getElementById('seriesCopyButton');

            if (data.results && data.results.length > 0) {
                const seriesTmdbId = data.results[0].id;

                // Construct the URL for embedding the series
                const seriesUrl = `https://vidsrc.xyz/embed/tv/${seriesTmdbId}`;

                // Create an iframe element
                const iframe = document.createElement('iframe');
                iframe.src = seriesUrl;
                // iframe.id = "framez";
                // iframe.name = "framez";
                iframe.allowfullscreen = true;
                // iframe.width = '800';
                // iframe.height = '600';
                // seriesResultElement.innerHTML = `<iframe src="${seriesUrl}"></iframe>`;

                // Clear previous content
                seriesResultElement.innerHTML = '';

                // Display the generated URL as a clickable link
                const linkElement = document.createElement('a');
                linkElement.href = seriesUrl;
                linkElement.target = '_blank';
                linkElement.textContent = 'Generated URL: ' + seriesUrl;

                // Append the link and iframe to the result element
                seriesResultElement.appendChild(linkElement);
                seriesResultElement.appendChild(iframe);

                // Enable the copy button for the series
                seriesCopyButton.disabled = false;

                // Store the URL for the series in a global variable for copying
                window.generatedSeriesUrl = seriesUrl;
            } else {
                seriesResultElement.innerHTML = 'Series not found';
                // Disable the copy button for the series if no series is found
                seriesCopyButton.disabled = true;
            }
        })
        .catch(error => {
            console.error('Error fetching series data:', error);
            document.getElementById('seriesResult').innerHTML = 'Error fetching series data';
            // Disable the copy button for the series in case of an error
            document.getElementById('seriesCopyButton').disabled = true;
        });
}



function copySeriesToClipboard() {
    const generatedSeriesUrl = window.generatedSeriesUrl;

    if (!generatedSeriesUrl) {
        console.error('No generated series URL to copy.');
        return;
    }

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = generatedSeriesUrl;

    // Append it to the body
    document.body.appendChild(textarea);

    // Select the text
    textarea.select();

    try {
        // Use the Clipboard API to copy the text to the clipboard
        document.execCommand('copy');
        console.log('URL copied to clipboard:', generatedSeriesUrl);
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    } finally {
        // Remove the temporary textarea
        document.body.removeChild(textarea);
    }
}



function clearSeriesSuggestions() {

    document.getElementById('seriesSuggestions').innerHTML = '';

}



