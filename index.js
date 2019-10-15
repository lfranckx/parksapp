'use strict';

const key = 'VcNMYhRXfM7Z4ek8UEZ5rdjXmbloaaoAwrwOkVyP';
const baseURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    // get keys from params and turn into an array
    const queryItems = Object.keys(params)
    // for each key value pair turn : into =
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    // join string together with &
    return queryItems.join('&');
}

function getResults(query, maxResults) {
    console.log(query);
    const params = {
        stateCode: query,
        api_key: key
    }
    const queryString = formatQueryParams(params)
    const url = baseURL + '?' + queryString;
    console.log(url);
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