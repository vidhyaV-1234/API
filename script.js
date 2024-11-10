document.getElementById('fetch-prices').addEventListener('click', fetchCryptoPrices);

function fetchCryptoPrices() {
    const url = 'https://rest.coinapi.io/v1/exchangerate/BTC/USD'; // Replace BTC with the desired cryptocurrency symbol
    const apiKey = 'BC92B469-7D04-4C02-8528-D839002A16CF';

    fetch(url, {
        method: 'GET',
        headers: {
            'X-CoinAPI-Key': apiKey,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayPrices(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('prices').innerText = '';
            document.getElementById('error-message').innerText = `Error: ${error.message}`;
        });
}

function displayPrices(data) {
    document.getElementById('error-message').innerText = '';

    let priceHTML = `<h2>Current Price:</h2>`;
    priceHTML += `<p>${data.asset_id_base} to ${data.asset_id_quote}: $${data.rate.toFixed(2)}</p>`;
    document.getElementById('prices').innerHTML = priceHTML;
}
