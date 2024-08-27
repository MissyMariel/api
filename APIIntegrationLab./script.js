// Select the button, user container, and search input elements
const fetchUsersBtn = document.getElementById('fetchUsersBtn');
const userContainer = document.getElementById('userContainer');
const searchInput = document.getElementById('searchInput');

// Store users data
let users = [];

// Function to fetch and display user data
function fetchAndDisplayUsers() {
    // Clear the container before fetching new data
    userContainer.innerHTML = '';

    // Fetch data from the JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            users = data; // Store the fetched users data
            displayUsers(users); // Display all users initially
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userContainer.innerHTML = '<p style="color:red;">Failed to fetch user data. Please try again later.</p>';
        });
}

// Function to display users based on a filtered list
function displayUsers(usersList) {
    userContainer.innerHTML = ''; // Clear existing content

    usersList.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;

        userContainer.appendChild(userCard);
    });
}

// Function to handle search input
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.website.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
    );
    displayUsers(filteredUsers);
}

// Attach event listeners
fetchUsersBtn.addEventListener('click', fetchAndDisplayUsers);
searchInput.addEventListener('input', handleSearch);
