document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.querySelector('input[type="search"]').value.toLowerCase().trim();
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    searchResultsContainer.innerHTML = '';
    if (!query) return;
    const cards = document.querySelectorAll('.tab-pane .card');
    let matchCount = 0;
    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(query)) {
            const clonedCard = card.cloneNode(true);
            const colDiv = document.createElement('div');
            colDiv.className = "col-12 col-md-3 mb-4";
            colDiv.appendChild(clonedCard);
            searchResultsContainer.appendChild(colDiv);
            matchCount++;
        }
    });
    if (matchCount === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
    }
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active', 'show');
    });
    document.querySelectorAll('#myTab button').forEach(btn => {
        btn.classList.remove('active');
    });
    const searchResultsTab = document.getElementById('search-results');
    searchResultsTab.classList.add('active', 'show');
});

document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tabBtn => {
    tabBtn.addEventListener('shown.bs.tab', function (event) {
        if (event.target.getAttribute('data-bs-target') !== '#search-results') {
            document.getElementById('searchResultsContainer').innerHTML = '';
            document.getElementById('search-results').classList.remove('active', 'show');
        }
    });
});

document.querySelectorAll('#myTab button').forEach(tabBtn => {
    tabBtn.addEventListener('click', function (e) {
        const searchTabPane = document.getElementById('search-results');
        if (searchTabPane.classList.contains('active')) {
            document.getElementById('searchResultsContainer').innerHTML = '';
            searchTabPane.classList.remove('active', 'show');
            document.querySelectorAll('#myTab button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active', 'show'));
            let targetSelector = tabBtn.getAttribute('data-bs-target');
            let targetPane = document.querySelector(targetSelector);
            tabBtn.classList.add('active');
            targetPane.classList.add('active', 'show');
        }
    });
});