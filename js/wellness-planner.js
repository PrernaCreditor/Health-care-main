// Wellness Planner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const wellnessForm = document.getElementById('wellnessForm');
    const trackerResults = document.getElementById('trackerResults');
    const resultsContent = trackerResults.querySelector('.results-content');
    
    if (wellnessForm) {
        wellnessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const goal = document.getElementById('wellness-goal').value;
            const concerns = document.getElementById('health-concerns').value;
            const lifestyle = document.getElementById('lifestyle').value;
            
            // Generate recommendations based on inputs
            let recommendations = '';
            
            if (!goal && !concerns && !lifestyle) {
                recommendations = '<p>Please provide some information to get personalized recommendations.</p>';
            } else {
                recommendations = '<h4>Based on your inputs, we recommend:</h4><ul>';
                
                // General recommendations
                recommendations += '<li>Drink at least 8 glasses of water daily</li>';
                recommendations += '<li>Get 7-8 hours of quality sleep each night</li>';
                recommendations += '<li>Practice deep breathing exercises for 5-10 minutes daily</li>';
                
                // Goal-specific recommendations
                if (goal === 'stress') {
                    recommendations += '<li>Try chamomile or lavender tea before bedtime</li>';
                    recommendations += '<li>Practice yoga or meditation for 20 minutes daily</li>';
                    recommendations += '<li>Consider aromatherapy with essential oils like bergamot or ylang-ylang</li>';
                } else if (goal === 'weight') {
                    recommendations += '<li>Increase intake of fiber-rich foods like vegetables and whole grains</li>';
                    recommendations += '<li>Try intermittent fasting with a 12-14 hour overnight fast</li>';
                    recommendations += '<li>Incorporate strength training 2-3 times per week</li>';
                } else if (goal === 'digestion') {
                    recommendations += '<li>Consume probiotic-rich foods like yogurt, kefir, or sauerkraut</li>';
                    recommendations += '<li>Try ginger or peppermint tea after meals</li>';
                    recommendations += '<li>Consider a short walk after eating to aid digestion</li>';
                } else if (goal === 'immunity') {
                    recommendations += '<li>Increase vitamin C intake with citrus fruits, bell peppers, and berries</li>';
                    recommendations += '<li>Consider elderberry syrup or echinacea supplements</li>';
                    recommendations += '<li>Ensure adequate vitamin D levels through sunlight or supplements</li>';
                } else if (goal === 'sleep') {
                    recommendations += '<li>Establish a consistent bedtime routine</li>';
                    recommendations += '<li>Avoid screens 1 hour before bedtime</li>';
                    recommendations += '<li>Try magnesium-rich foods or supplements before bed</li>';
                }
                
                // Lifestyle-specific recommendations
                if (lifestyle === 'sedentary') {
                    recommendations += '<li>Start with short 10-minute walks 2-3 times daily</li>';
                    recommendations += '<li>Set reminders to stand up and stretch every hour</li>';
                } else if (lifestyle === 'active') {
                    recommendations += '<li>Maintain your activity level and consider adding variety</li>';
                } else if (lifestyle === 'very-active') {
                    recommendations += '<li>Ensure proper recovery with rest days and stretching</li>';
                    recommendations += '<li>Consider yoga or mobility work to prevent injury</li>';
                }
                
                // Concerns-specific recommendations
                if (concerns.toLowerCase().includes('headache')) {
                    recommendations += '<li>For headaches: try applying peppermint oil to temples (diluted)</li>';
                    recommendations += '<li>Ensure proper hydration and check for caffeine withdrawal</li>';
                }
                
                if (concerns.toLowerCase().includes('fatigue')) {
                    recommendations += '<li>For fatigue: check iron levels and consider iron-rich foods</li>';
                    recommendations += '<li>Try adaptogenic herbs like ashwagandha or rhodiola</li>';
                }
                
                recommendations += '</ul>';
                recommendations += '<div class="text-center"><a href="consultation.html" class="btn-primary">Book a Consultation for Personalized Plan</a></div>';
            }
            
            resultsContent.innerHTML = recommendations;
            trackerResults.scrollIntoView({ behavior: 'smooth' });
        });
    }
});