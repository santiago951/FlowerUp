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
// sign in/sign up button
document.getElementById("switch-to-signup").addEventListener("click", function () {
    document.getElementById("signin-form").style.display = "none";
    document.getElementById("switch-to-signup").style.display = "none";
    document.getElementById("switchPrompt").style.display = "none";
  
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("authModalLabel").textContent = "Sign Up";
  });
  
  // Switch back to Sign In form
  document.getElementById("switch-to-signin").addEventListener("click", function () {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("signin-form").style.display = "block";
    document.getElementById("switch-to-signup").style.display = "block";
    document.getElementById("switchPrompt").style.display = "block";
    document.getElementById("authModalLabel").textContent = "Sign In";
  });
  
  // Sign Up Simulation
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('signup-name').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    let confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    // Store credentials in localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    
    alert('Account created successfully!');
    
    // Switch back to Sign In form
    document.getElementById("switch-to-signin").click();
  });
  
  // AFTER: Sign In Simulation
  document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById('signin-email').value;
    let password = document.getElementById('signin-password').value;
    
    // Retrieve credentials from localStorage
    let storedEmail = localStorage.getItem('userEmail');
    let storedPassword = localStorage.getItem('userPassword');
    let storedName = localStorage.getItem('userName');
    
    if (email === storedEmail && password === storedPassword) {
      alert("Sign in successful!");
      // Update navbar: hide auth button, show user info
      document.getElementById('authButton').classList.add('d-none');
      document.getElementById('user-name').textContent = "Welcome, " + storedName;
      document.getElementById('user-info').classList.remove('d-none');
      
      // Hide the modal
      let modalElement = document.getElementById('authModal');
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    } else {
      alert("Invalid credentials!");
    }
  });
  
  // AFTER: Check for an already "logged in" user on page load
  window.addEventListener('DOMContentLoaded', function() {
    let storedName = localStorage.getItem('userName');
    if (storedName) {
      document.getElementById('authButton').classList.add('d-none');
      document.getElementById('user-name').textContent = "Welcome, " + storedName;
      document.getElementById('user-info').classList.remove('d-none');
    }
  });
  
  // Sign Out Functionality
  document.getElementById('signout-button').addEventListener('click', function() {
    // Clear credentials from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    
    // Update the navbar: hide user info, show auth button
    document.getElementById('user-info').classList.add('d-none');
    document.getElementById('authButton').classList.remove('d-none');
    
    alert("You have been signed out.");
  });
  