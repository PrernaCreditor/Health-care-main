document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Functionality
    const navItems = document.querySelectorAll('.main-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items and tab contents
            navItems.forEach(navItem => navItem.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize Wellness Chart
    const wellnessChartCtx = document.getElementById('wellnessChart').getContext('2d');
    const wellnessChart = new Chart(wellnessChartCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Sleep (hrs)',
                    data: [6.5, 7, 7.5, 6.8, 7.2, 8, 7.5],
                    borderColor: '#4F8A8B',
                    backgroundColor: 'rgba(79, 138, 139, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Hydration',
                    data: [7, 8, 9, 8, 7, 8, 9],
                    borderColor: '#FBD46D',
                    backgroundColor: 'rgba(251, 212, 109, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Activity %',
                    data: [65, 70, 80, 75, 85, 60, 70],
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
    
    // Quick Action Buttons
    document.getElementById('log-meal').addEventListener('click', function() {
        alert('Meal logging feature coming soon!');
    });
    
    document.getElementById('track-workout').addEventListener('click', function() {
        alert('Workout tracking feature coming soon!');
    });
    
    document.getElementById('journal-entry').addEventListener('click', function() {
        alert('Journal feature coming soon!');
    });
    
    document.getElementById('meditate-now').addEventListener('click', function() {
        alert('Meditation player feature coming soon!');
    });
    
    // Chatbot Functionality
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('open');
    });
    
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('open');
    });
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'bot');
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        messageDiv.appendChild(messageP);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleChatbotSend() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                const responses = [
                    "I understand you're asking about wellness. Can you be more specific?",
                    "That's a great question about your health journey!",
                    "I recommend checking our wellness resources for more information.",
                    "Have you tried our meditation exercises for that?",
                    "Let me find the best resources for you..."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 1000);
        }
    }
    
    sendBtn.addEventListener('click', handleChatbotSend);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleChatbotSend();
        }
    });
    
    // Simulate dynamic wellness scores
    function updateWellnessScores() {
        const scores = {
            sleep: (7 + Math.random()).toFixed(1),
            hydration: Math.floor(6 + Math.random() * 4),
            activity: Math.floor(70 + Math.random() * 30),
            stress: Math.floor(20 + Math.random() * 30)
        };
        
        document.getElementById('sleep-score').textContent = scores.sleep;
        document.getElementById('hydration-score').textContent = scores.hydration;
        document.getElementById('activity-score').textContent = scores.activity + '%';
        document.getElementById('stress-score').textContent = scores.stress + '%';
        
        // Update chart data
        wellnessChart.data.datasets[0].data = wellnessChart.data.datasets[0].data.map(() => 
            (5 + Math.random() * 3).toFixed(1)
        );
        wellnessChart.data.datasets[1].data = wellnessChart.data.datasets[1].data.map(() => 
            Math.floor(6 + Math.random() * 4)
        );
        wellnessChart.data.datasets[2].data = wellnessChart.data.datasets[2].data.map(() => 
            Math.floor(60 + Math.random() * 40)
        );
        wellnessChart.update();
    }
    
    // Update scores every 10 seconds for demo purposes
    setInterval(updateWellnessScores, 10000);
    updateWellnessScores(); // Initial update
});

// Mood selection functionality
document.querySelectorAll('.mood-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all options
        document.querySelectorAll('.mood-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Save mood to local storage
        const mood = this.dataset.mood;
        localStorage.setItem('currentMood', mood);
        
        // Update mood chart
        updateMoodChart(mood);
    });
});

// Initialize with saved mood if available
const savedMood = localStorage.getItem('currentMood');
if (savedMood) {
    document.querySelector(`.mood-option[data-mood="${savedMood}"]`).classList.add('active');
}

// Audio player functionality
const audioPlayer = new Audio('path/to/meditation-track.mp3');
const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
    }
});

//Profile
const profileTrigger = document.getElementById('profileTrigger');
  const profileModal = document.getElementById('profileModal');
  const closeBtn = document.getElementById('closeProfileModal');

  // Open modal on click
  profileTrigger.addEventListener('click', () => {
    profileModal.style.display = 'block';
  });

  // Close modal on close button
  closeBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target === profileModal) {
      profileModal.style.display = 'none';
    }
  });

   // Get the user object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.name) {
    // Optional: Just use first name
    const firstName = user.name.split(' ')[0];
    
    // Update the welcome text
    document.getElementById('welcomeUser').innerText = `Welcome Back, ${firstName}!`;
  } else {
    // Fallback text if user not logged in
    document.getElementById('welcomeUser').innerText = 'Welcome Back!';
  }


 //Logout
 document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // if you're storing token

        // Optional: clear all
        // localStorage.clear();

        // Redirect to index.html
        window.location.href = 'index.html';
      });
    } else {
      console.warn('Logout button not found.');
    }
  });
  //Profile Data Fetching
  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // You should store JWT token in localStorage after login
    if (!token) {
      console.warn('User not logged in');
      return;
    }

    fetch('https://health-care-main.onrender.com/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(user => {
      document.querySelector('.profile-name').textContent = user.name;
      document.querySelector('.detail-value.email').textContent = user.email;
      document.querySelector('.detail-value.location').textContent = user.location || 'Not set';
      document.querySelector('.detail-value.birthday').textContent = user.birthday || 'Not set';
      document.querySelector('.detail-value.goals').textContent = user.healthGoals || 'Not set';
    })
    .catch(error => {
      console.error('Error loading profile:', error);
    });
  });