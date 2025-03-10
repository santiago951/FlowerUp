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

document.getElementById("switch-to-signin").addEventListener("click", function () {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("signin-form").style.display = "block";
    document.getElementById("switch-to-signup").style.display = "block";
    document.getElementById("switchPrompt").style.display = "block";
    document.getElementById("authModalLabel").textContent = "Sign In";
});


// SIGN UP FORM SUBMISSION (API Integration)

document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get user input values
    let name = document.getElementById('signup-name').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    let confirmPassword = document.getElementById('signup-confirm-password').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const data = {
        fullName: name,
        email: email,
        password: password
    };

    try {
        // Adjust the port to match your API (e.g., 7081)
        const response = await fetch('https://localhost:7081/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Registration failed');
        }

        const result = await response.json();
        alert(result.message || 'Account created successfully!');
        // Optionally switch to the sign-in form after registration
        document.getElementById("switch-to-signin").click();

    } catch (error) {
        console.error('Registration error:', error);
        alert("Registration failed: " + error.message);
    }
});


//  SIGN IN FORM SUBMISSION (API Integration)

document.getElementById('signin-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get user input values
    let email = document.getElementById('signin-email').value;
    let password = document.getElementById('signin-password').value;

    const data = {
        email: email,
        password: password
    };

    try {
        // Adjust the port to match your API (e.g., 7081)
        const response = await fetch('https://localhost:7081/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Sign in successful!");
            // Hide the Sign In/Sign Up button and display user info
            document.getElementById('authButton').classList.add('d-none');
            document.getElementById('user-name').textContent = "Welcome, " + (result.fullName || email);
            document.getElementById('user-info').classList.remove('d-none');

            // Close the modal if using Bootstrap's modal component
            let modalElement = document.getElementById('authModal');
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        } else {
            alert(result.message || "Invalid credentials!");
        }

    } catch (error) {
        console.error('Sign in error:', error);
        alert("Sign in failed: " + error.message);
    }
});