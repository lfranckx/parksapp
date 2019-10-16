'use strict';

const key = 'VcNMYhRXfM7Z4ek8UEZ5rdjXmbloaaoAwrwOkVyP';
const baseURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    // get keys from params object
    const queryItems = Object.keys(params)
    // map object into a string and turn : into =
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    // join string together with &
    return queryItems.join('&');
}

function getResults(query, maxResults) {
    const params = {
        limit: maxResults,
        q: query,
        api_key: key
    }
    const queryString = formatQueryParams(params)
    const url = baseURL + '?' + queryString;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err=> {
            $('#js-error-message').text(`Error: ${err.message}`);
        })
}

function displayResults(responseJson) {
    console.log(responseJson);

    // remove any prior results on page
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        // for each object in the array
        // add list item to display park name, description, URL
        // try adding park's address as well
        $('#results-list').append(
            `<li>${responseJson.data[i].fullName}</li>
            <li>${responseJson.data[i].description}</li>
            <li>${responseJson.data[i].url}</li>`
        )
    }
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getResults(searchTerm, maxResults);
    });
}

$(watchForm);