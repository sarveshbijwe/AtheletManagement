document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('athleteProfileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const profileData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                bio: document.getElementById('bio').value,
                sport: document.getElementById('sport').value,
                position: document.getElementById('position').value,
                level: document.getElementById('level').value,
                team: document.getElementById('team').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                country: document.getElementById('country').value,
                city: document.getElementById('city').value
            };
            
            // Save to localStorage
            localStorage.setItem('athleteProfile', JSON.stringify(profileData));
            
            // Show success message
            alert('Profile saved successfully!');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
        // Check if this is a registration flow
if (document.referrer.includes('index.html')) {
    // Show a welcome message or any special treatment for new registrations
    const profileHeader = document.querySelector('.profile-header h1');
    if (profileHeader) {
        profileHeader.textContent = 'Complete Your Athlete Profile Registration';
    }
}
        // Load saved profile if exists
        const savedProfile = localStorage.getItem('athleteProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            for (const key in profile) {
                const element = document.getElementById(key);
                if (element) {
                    element.value = profile[key];
                }
            }
        }
    }
});