// Student information display
document.addEventListener('DOMContentLoaded', function() {
    // TODO: Replace with your actual student ID and name
    const studentId = "200601285";
    const studentName = "Jasmin kaur";
    
    const studentInfoElement = document.getElementById('student-info');
    studentInfoElement.innerHTML = `<p>Student ID: ${studentId} | Name: ${studentName}</p>`;
    
    // Set default date to today
    const today = new Date();
    const dateInput = document.getElementById('date-picker');
    dateInput.valueAsDate = today;
    
    // Initial load with today's date
    fetchAPOD(formatDate(today));
    
    // Add event listener to the fetch button
    document.getElementById('fetch-button').addEventListener('click', function() {
        const selectedDate = document.getElementById('date-picker').value;
        fetchAPOD(selectedDate);
    });
});

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Fetch data from NASA APOD API
function fetchAPOD(date) {
    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('apod-container').style.display = 'none';

    const apiKey = 'Mga1jsvJxJSxTXVL0MrhXJ2IOrHIgTWZ9VUUdJeP'; 
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayAPOD(data);
        })
        .catch(error => {
            console.error('Error fetching APOD data:', error);
            document.getElementById('loading').textContent = 'Error loading data. Please try again.';
        });
}

// Display the APOD data on the page
function displayAPOD(data) {
    // Hide loading indicator
    document.getElementById('loading').style.display = 'none';
    document.getElementById('apod-container').style.display = 'block';
    
    // Set title and date
    document.getElementById('title').textContent = data.title;
    document.getElementById('date').textContent = `Date: ${data.date}`;
    
    // Set explanation
    document.getElementById('explanation').textContent = data.explanation;
    
    // Clear previous media
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';
    
    // Add the media (image or video)
    if (data.media_type === 'image') {
        const img = document.createElement('img');
        img.src = data.url;
        img.alt = data.title;
        mediaContainer.appendChild(img);
    } else if (data.media_type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = data.url;
        iframe.title = data.title;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        mediaContainer.appendChild(iframe);
    }
}