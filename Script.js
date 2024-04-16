document.getElementById('quoteButton').addEventListener('click', function () {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex].quote;
            const author = quotes[randomIndex].author;
            document.getElementById('quoteDisplay').textContent = `“${quote}”`;
            document.getElementById('authorDisplay').textContent = `— ${author}`;
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
            document.getElementById('quoteDisplay').textContent = "Failed to load quotes!";
            document.getElementById('authorDisplay').textContent = "";
        });
});
function updateTwitterButton(quote, author) {
    const twitterButton = document.getElementById('twitterButton');
    const tweetText = `"${quote}" — ${author}`;
    twitterButton.setAttribute('onclick', `window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}', '_blank')`);
}

document.getElementById('copyButton').addEventListener('click', function () {
    const quote = document.getElementById('quoteDisplay').textContent;
    const author = document.getElementById('authorDisplay').textContent;
    const fullQuote = `${quote} ${author}`;
    navigator.clipboard.writeText(fullQuote).then(() => {
        alert('Quote copied to clipboard');
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
});

document.getElementById('quoteButton').addEventListener('click', function () {
    fetch('quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quoteObj = quotes[randomIndex];
            const quote = quoteObj.quote;
            const author = quoteObj.author;
            document.getElementById('quoteDisplay').textContent = `“${quote}”`;
            document.getElementById('authorDisplay').textContent = `— ${author}`;
            updateTwitterButton(quote, author);
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });
});

// Initialize the Twitter button with the first quote
window.onload = () => {
    document.getElementById('quoteButton').click();
};

document.getElementById('downloadButton').addEventListener('click', function () {
    fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
            const jsonData = JSON.stringify(data, null, 4);  // Convert JSON object to string
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'quotes.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);  // Clean up
        })
        .catch(error => {
            console.error('Failed to download quotes:', error);
        });
});
