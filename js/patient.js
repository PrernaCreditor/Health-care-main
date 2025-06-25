document.addEventListener('DOMContentLoaded', function() {
    // Initialize patient dashboard
    
    // Simulate loading user data
    loadUserData();
    
    // Initialize charts
    initHealthChart();
    
    // Set up event listeners
    setupEventListeners();
});

function loadUserData() {
    // In a real app, this would come from an API
    const userData = {
        name: "Alex Johnson",
        wellnessScore: 72,
        activeDays: 8,
        waterIntake: 96,
        recentOrders: [
            { name: "Organic Multivitamin", date: "Jun 12, 2023", status: "delivered" },
            { name: "Probiotic Complex", date: "Jun 5, 2023", status: "shipped" }
        ],
        upcomingAppointments: [
            { doctor: "Dr. Sarah Johnson", date: "15 Jun", time: "10:30 AM - 11:15 AM" }
        ]
    };
    
    // Update UI with user data
    document.getElementById('userName').textContent = userData.name;
    
    // Update wellness metrics
    document.querySelector('.health-metrics .metric:nth-child(1) .metric-value').textContent = userData.wellnessScore;
    document.querySelector('.health-metrics .metric:nth-child(2) .metric-value').textContent = userData.activeDays;
    document.querySelector('.health-metrics .metric:nth-child(3) .metric-value').textContent = userData.waterIntake;
}

function initHealthChart() {
    // This would initialize a real chart library like Chart.js
    console.log("Initializing health chart...");
    
    // Simulated chart data
    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Wellness Score',
            data: [65, 68, 70, 72, 71, 73, 72],
            backgroundColor: 'rgba(74, 140, 94, 0.2)',
            borderColor: 'rgba(74, 140, 94, 1)',
            borderWidth: 2,
            tension: 0.4
        }]
    };
    
    // In a real implementation:
    // const ctx = document.querySelector('.health-chart').getContext('2d');
    // new Chart(ctx, { type: 'line', data: chartData, options: {...} });
}

function setupEventListeners() {
    // Logout button
    document.querySelector('.btn-logout').addEventListener('click', function() {
        // In a real app, this would call a logout API
        alert("You have been logged out");
        window.location.href = "../index.html";
    });
    
    // Notification bell
    document.querySelector('.notification-bell').addEventListener('click', function() {
        alert("You have 3 new notifications");
    });
    
    // Responsive sidebar toggle for mobile
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="icon-menu"></i>';
    document.querySelector('.main-header').prepend(sidebarToggle);
    
    sidebarToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('sidebar-open');
    });
}

// Simulated API functions
function fetchHealthData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                wellnessScore: 72,
                activeDays: 8,
                waterIntake: 96
            });
        }, 500);
    });
}

function fetchRecentOrders() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: "Organic Multivitamin", date: "Jun 12, 2023", status: "delivered" },
                { name: "Probiotic Complex", date: "Jun 5, 2023", status: "shipped" }
            ]);
        }, 500);
    });
}

function fetchUpcomingAppointments() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { doctor: "Dr. Sarah Johnson", date: "15 Jun", time: "10:30 AM - 11:15 AM" }
            ]);
        }, 500);
    });
}