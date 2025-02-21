// search bar details
document.querySelector('form[role="search"]').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const query = document.querySelector('input[type="search"]').value.toLowerCase();
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      if (cardText.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
  