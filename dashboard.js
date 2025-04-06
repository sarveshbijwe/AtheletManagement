// Add this near the top of your dashboard.js
const eventsData = [
    {
        date: "Jun 25, 2023",
        name: "National Championships",
        location: "Miami, FL"
    },
    {
        date: "Jul 12, 2023",
        name: "Team Training Camp",
        location: "Denver, CO"
    },
    {
        date: "Aug 5, 2023",
        name: "Sponsor Meeting",
        location: "Virtual"
    },
    // Add more events as needed
    {
        date: "Sep 15, 2023",
        name: "Regional Qualifiers",
        location: "Chicago, IL"
    },
    {
        date: "Oct 3, 2023",
        name: "Media Day",
        location: "New York, NY"
    },
    {
        date: "Nov 10, 2023",
        name: "Championship Finals",
        location: "Los Angeles, CA"
    },
    {
        date: "Dec 5, 2023",
        name: "Awards Ceremony",
        location: "Las Vegas, NV"
    }

];
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if(localStorage.getItem('isLoggedIn')!=='true') {
        window.location.href = 'index.html';
        //return;
    }
    
    // Display user info if available
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    document.getElementById('username').textContent = userName;

    // Sidebar toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
    
    // Navigation between sections
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items and sections
            navItems.forEach(navItem => navItem.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Update section title
            const sectionTitle = this.querySelector('span:last-child').textContent;
            document.getElementById('section-title').textContent = sectionTitle;
        });
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        // In a real app, this would redirect to logout endpoint
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    });
    
    // Injury report modal
    const injuryModal = document.getElementById('injury-modal');
    const reportInjuryBtn = document.getElementById('report-injury');
    const closeModalBtn = document.querySelector('.close-modal');
    
    reportInjuryBtn.addEventListener('click', function() {
        injuryModal.classList.add('active');
    });
    
    closeModalBtn.addEventListener('click', function() {
        injuryModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === injuryModal) {
            injuryModal.classList.remove('active');
        }
    });
    
    // Form submission
    const injuryForm = document.getElementById('injury-form');
    injuryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const injury = {
            date: new Date().toISOString().split('T')[0],
            type: document.getElementById('injury-type').value,
            location: document.getElementById('injury-location').value,
            severity: document.getElementById('injury-severity').value,
            notes: document.getElementById('injury-notes').value,
            status: 'recovering'
        };
    
        // Add to DOM and save
        addInjuryToDOM(injury);
        saveInjury(injury);
    
        // In a real app, this would send data to server
        alert('Injury report submitted successfully!');
        injuryModal.classList.remove('active');
        injuryForm.reset();
    });
    
    // Initialize charts
    initializeCharts();
    setupWorkoutFunctionality();
    setupMilestoneFunctionality();
    loadInjuries();
    setupEventsFunctionality();
    setupFinancialPage(); 
    setupChatAssistant(); 
    setupForum(); 
    // Notification dropdown
    const notifications = document.getElementById('notifications');
    notifications.addEventListener('click', function() {
        // In a real app, this would show notifications
        alert('You have 3 new notifications');
    });

});

function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: '40yd Dash Time (s)',
                data: [4.45, 4.42, 4.38, 4.36, 4.35, 4.32],
                borderColor: '#275360',
                backgroundColor: 'rgba(39, 83, 96, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 4.2,
                    max: 4.5
                }
            }
        }
    });
    
    // Detailed Performance Chart
    const detailedCtx = document.getElementById('detailedPerformanceChart').getContext('2d');
    const detailedChart = new Chart(detailedCtx, {
        type: 'bar',
        data: {
            labels: ['40yd Dash', 'Vertical Jump', 'Bench Press', 'Squat', 'Broad Jump'],
            datasets: [{
                label: 'Current',
                data: [4.32, 36, 185, 275, 9.2],
                backgroundColor: '#275360'
            }, {
                label: 'Previous',
                data: [4.37, 34.5, 185, 265, 8.9],
                backgroundColor: '#00bcd4'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Wellness Chart
    const wellnessCtx = document.getElementById('wellnessChart').getContext('2d');
    const wellnessChart = new Chart(wellnessCtx, {
        type: 'radar',
        data: {
            labels: ['Sleep', 'Energy', 'Stress', 'Hydration', 'Nutrition', 'Recovery'],
            datasets: [{
                label: 'Current Week',
                data: [8.2, 7.8, 6.5, 8.0, 7.5, 7.0],
                backgroundColor: 'rgba(39, 83, 96, 0.2)',
                borderColor: '#275360',
                pointBackgroundColor: '#275360',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#275360'
            }, {
                label: 'Last Week',
                data: [7.5, 7.0, 7.2, 7.8, 7.0, 6.5],
                backgroundColor: 'rgba(0, 188, 212, 0.2)',
                borderColor: '#00bcd4',
                pointBackgroundColor: '#00bcd4',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00bcd4'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }
        }
    });
    
    // Income Chart
    const incomeCtx = document.getElementById('incomeChart').getContext('2d');
    const incomeChart = new Chart(incomeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Sponsorships', 'Competitions', 'Appearance Fees', 'Other'],
            datasets: [{
                data: [52, 28, 12, 8],
                backgroundColor: [
                    '#275360',
                    '#00bcd4',
                    '#e82525',
                    '#757575'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}
function setupWorkoutFunctionality() {

    // Workout Modal functionality
    const workoutModal = document.getElementById('workout-modal');
    const addWorkoutBtn = document.querySelector('.add-workout');
    const closeWorkoutModal = workoutModal.querySelector('.close-modal');
    const workoutForm = document.getElementById('workout-form');
    const workoutList = document.querySelector('.workout-list');

    // Add Workout Modal
    addWorkoutBtn.addEventListener('click', () => {
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('workout-date').value = today;
        workoutModal.classList.add('active');
    });

    closeWorkoutModal.addEventListener('click', () => {
        workoutModal.classList.remove('active');
    });

    // Handle workout form submission
    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const type = document.getElementById('workout-type').value;
        const date = document.getElementById('workout-date').value;
        const details = document.getElementById('workout-details').value;
        const intensity = document.getElementById('workout-intensity').value;
        const heartrate = document.getElementById('workout-heartrate').value;

        // Create workout item
        const workoutItem = createWorkoutItem({
            type,
            date,
            details,
            intensity,
            heartrate
        });

        // Add to the top of the list with animation
        workoutList.insertBefore(workoutItem, workoutList.firstChild);
        
        // Close modal and reset form
        workoutModal.classList.remove('active');
        workoutForm.reset();
        
        // Save to localStorage
        saveWorkout({
            type,
            date,
            details,
            intensity,
            heartrate
        });
    });

    // Helper function to create workout item HTML
    function createWorkoutItem(workout) {
        const workoutItem = document.createElement('div');
        workoutItem.className = 'workout-item new';
        
        // Format date for display
        const displayDate = formatWorkoutDate(workout.date);
        
        workoutItem.innerHTML = `
            <div class="workout-date">${displayDate}</div>
            <div class="workout-details">
                <h4>${workout.type}</h4>
                <p>${workout.details}</p>
                <div class="workout-stats">
                    ${workout.intensity ? `<span><i class="fas fa-bolt"></i> ${workout.intensity}/10 intensity</span>` : ''}
                    ${workout.heartrate ? `<span><i class="fas fa-heartbeat"></i> ${workout.heartrate} bpm avg</span>` : ''}
                </div>
            </div>
        `;
        
        // Remove animation class after it's done
        setTimeout(() => {
            workoutItem.classList.remove('new');
        }, 300);
        
        return workoutItem;
    }

    // Format date for display
    function formatWorkoutDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }

    // Save workout to localStorage
    function saveWorkout(workout) {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        workouts.unshift(workout); // Add to beginning of array
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    // Load saved workouts on page load
    function loadWorkouts() {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        workouts.forEach(workout => {
            const workoutItem = createWorkoutItem(workout);
            workoutList.appendChild(workoutItem);
        });
    }

    // Load workouts when page loads
    loadWorkouts();
}
function setupMilestoneFunctionality() {
    const milestoneModal = document.getElementById('milestone-modal');
    const milestoneForm = document.getElementById('milestone-form');
    const timeline = document.querySelector('.timeline');

    // Open modal
    document.getElementById('add-milestone').addEventListener('click', () => {
        // Set default year to current year
        document.getElementById('milestone-year').value = new Date().getFullYear();
        milestoneModal.classList.add('active');
    });

    // Close modal
    milestoneModal.querySelector('.close-modal').addEventListener('click', () => {
        milestoneModal.classList.remove('active');
    });

    // Handle form submission
    milestoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const milestone = {
            year: document.getElementById('milestone-year').value,
            title: document.getElementById('milestone-title').value,
            description: document.getElementById('milestone-description').value
        };

        addMilestoneToDOM(milestone);
        saveMilestone(milestone);
        milestoneModal.classList.remove('active');
        milestoneForm.reset();
    });

    // Load saved milestones
    loadMilestones();
}

function addMilestoneToDOM(milestone) {
    const milestoneItem = document.createElement('div');
    milestoneItem.className = 'timeline-event new';
    milestoneItem.innerHTML = `
        <div class="event-date">${milestone.year}</div>
        <div class="event-content">
            <h4>${milestone.title}</h4>
            <p>${milestone.description}</p>
        </div>
    `;
    
    const timeline = document.querySelector('.timeline');
    
    // Find the correct position to insert (sorted by year)
    const events = Array.from(timeline.children);
    let insertBefore = null;
    for (let i = 0; i < events.length; i++) {
        const eventYear = parseInt(events[i].querySelector('.event-date').textContent);
        if (parseInt(milestone.year) > eventYear) {
            insertBefore = events[i];
            break;
        }
    }
    
    if (insertBefore) {
        timeline.insertBefore(milestoneItem, insertBefore);
    } else {
        timeline.appendChild(milestoneItem);
    }
    
    setTimeout(() => milestoneItem.classList.remove('new'), 300);
}

function saveMilestone(milestone) {
    const milestones = JSON.parse(localStorage.getItem('milestones') || '[]');
    milestones.push(milestone);
    // Sort by year (newest first)
    milestones.sort((a, b) => b.year - a.year);
    localStorage.setItem('milestones', JSON.stringify(milestones));
}

function loadMilestones() {
    const milestones = JSON.parse(localStorage.getItem('milestones') || '[]');
    milestones.forEach(milestone => addMilestoneToDOM(milestone));
}
function addInjuryToDOM(injury) {
    const injuryList = document.querySelector('.injury-list');
    const injuryItem = document.createElement('div');
    injuryItem.className = 'injury-item new';
    
    injuryItem.innerHTML = `
        <div class="injury-date">${formatInjuryDate(injury.date)}</div>
        <div class="injury-details">
            <h4>${injury.type} (${injury.location})</h4>
            <p>Severity: ${injury.severity}/10 - ${injury.notes}</p>
            <div class="injury-status ${injury.status}">
                ${injury.status === 'recovering' ? 'Recovering' : 'Recovered'}
            </div>
        </div>
    `;
    
    injuryList.prepend(injuryItem);
    setTimeout(() => injuryItem.classList.remove('new'), 300);
}

function formatInjuryDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function saveInjury(injury) {
    const injuries = JSON.parse(localStorage.getItem('injuries') || '[]');
    injuries.unshift(injury);
    localStorage.setItem('injuries', JSON.stringify(injuries));
}

function loadInjuries() {
    const injuries = JSON.parse(localStorage.getItem('injuries') || '[]');
    injuries.forEach(injury => addInjuryToDOM(injury));
}

// Add these functions to dashboard.js
function displayEvents(limit = null) {
    const eventsList = document.querySelector('.events-list');
    eventsList.innerHTML = ''; // Clear current events
    
    // Show either limited or all events based on parameter
    const eventsToShow = limit ? eventsData.slice(0, limit) : eventsData;
    
    eventsToShow.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.innerHTML = `
            <div class="event-date">${event.date}</div>
            <div class="event-name">${event.name}</div>
            <div class="event-location">${event.location}</div>
        `;
        eventsList.appendChild(eventElement);
    });
}

function setupEventsFunctionality() {
    // Initial display (showing first 3 events)
    displayEvents(3);
    
    // "View All Events" button functionality
    const viewAllBtn = document.querySelector('.view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            displayEvents(); // Show all events
            
            // Optional: Hide button after clicking
            this.style.display = 'none'; 
            
            // Optional: Add a "Show Less" button
            const showLessBtn = document.createElement('button');
            showLessBtn.className = 'view-all';
            showLessBtn.textContent = 'Show Less';
            showLessBtn.addEventListener('click', function(e) {
                e.preventDefault();
                displayEvents(3);
                this.remove();
                viewAllBtn.style.display = 'block';
            });
            this.parentNode.appendChild(showLessBtn);
        });
    }

}

// Financial Data Structure
let financialData = {
    income: {
        sponsorships: 52000,
        competitions: 28000,
        appearance: 5000,
        other: 420
    },
    expenses: {
        training: 12400,
        travel: 8750,
        equipment: 3200,
        other: 1500
    },
    contracts: [
        {
            name: "Nike Sponsorship",
            value: 45000,
            duration: "2022-2024"
        },
        {
            name: "National Team",
            value: 28000,
            duration: "2023-2023"
        }
    ]
};

// Initialize Financial Page
function setupFinancialPage() {
    updateIncomeOverview();
    updateExpenseTracking();
    updateActiveContracts();
    setupTransactionModal();
}

// Transaction Modal Setup
function setupTransactionModal() {
    const modal = document.getElementById('transaction-modal');
    const form = document.getElementById('transaction-form');
    const typeSelect = document.getElementById('transaction-type');
    
    // Show/hide fields based on transaction type
    typeSelect.addEventListener('change', function() {
        document.querySelectorAll('.transaction-fields').forEach(field => {
            field.style.display = 'none';
        });
        document.getElementById(`${this.value}-fields`).style.display = 'block';
    });
    
    // Open modal
    document.getElementById('add-transaction').addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const type = document.getElementById('transaction-type').value;
        
        if (type === 'income') {
            addIncome();
        } else if (type === 'expense') {
            addExpense();
        } else if (type === 'contract') {
            addContract();
        }
        
        modal.classList.remove('active');
        form.reset();
    });
}

// Add Income Transaction
function addIncome() {
    const source = document.getElementById('income-source').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    
    if (isNaN(amount) || amount <= 0) return;
    
    financialData.income[source] = (financialData.income[source] || 0) + amount;
    updateIncomeOverview();
}

// Add Expense Transaction
function addExpense() {
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    
    if (isNaN(amount) || amount <= 0) return;
    
    financialData.expenses[category] = (financialData.expenses[category] || 0) + amount;
    updateExpenseTracking();
}

// Add Contract Transaction
function addContract() {
    const name = document.getElementById('contract-name').value;
    const value = parseFloat(document.getElementById('contract-value').value);
    const duration = parseInt(document.getElementById('contract-duration').value);
    
    if (!name || isNaN(value) || value <= 0 || isNaN(duration) || duration <= 0) return;
    
    const currentYear = new Date().getFullYear();
    const contract = {
        name: name,
        value: value,
        duration: `${currentYear}-${currentYear + duration - 1}`
    };
    
    financialData.contracts.push(contract);
    updateActiveContracts();
}

// Update Income Overview
function updateIncomeOverview() {
    const totalIncomeElement = document.querySelector('.total-income span');
    const incomeSourcesElement = document.querySelector('.income-sources');
    
    // Calculate total income
    const totalIncome = Object.values(financialData.income).reduce((sum, amount) => sum + amount, 0);
    totalIncomeElement.textContent = `$${totalIncome.toLocaleString()}`;
    
    // Update income sources
    incomeSourcesElement.innerHTML = '';
    for (const [source, amount] of Object.entries(financialData.income)) {
        const sourceElement = document.createElement('div');
        sourceElement.className = 'source';
        sourceElement.innerHTML = `
            <span class="amount">$${amount.toLocaleString()}</span>
            <span class="label">${formatSourceName(source)}</span>
        `;
        incomeSourcesElement.appendChild(sourceElement);
    }
    
    // Update income chart
    updateIncomeChart();
}

// Update Expense Tracking
function updateExpenseTracking() {
    const expenseCategoriesElement = document.querySelector('.expense-categories');
    expenseCategoriesElement.innerHTML = '';
    
    const totalExpenses = Object.values(financialData.expenses).reduce((sum, amount) => sum + amount, 0);
    
    for (const [category, amount] of Object.entries(financialData.expenses)) {
        const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.innerHTML = `
            <span class="name">${formatCategoryName(category)}</span>
            <span class="amount">$${amount.toLocaleString()}</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
            </div>
        `;
        expenseCategoriesElement.appendChild(categoryElement);
    }
}

// Update Active Contracts
function updateActiveContracts() {
    const contractListElement = document.querySelector('.contract-list');
    contractListElement.innerHTML = '';
    
    financialData.contracts.forEach(contract => {
        const contractElement = document.createElement('div');
        contractElement.className = 'contract-item';
        contractElement.innerHTML = `
            <h4>${contract.name}</h4>
            <div class="contract-details">
                <span class="value">$${(contract.value / 1).toLocaleString()}/yr</span>
                <span class="duration">${contract.duration}</span>
            </div>
            <div class="contract-actions">
                <button class="view-btn">View</button>
                <button class="renew-btn">Renew</button>
            </div>
        `;
        contractListElement.appendChild(contractElement);
    });
}

// Helper functions
function formatSourceName(source) {
    return {
        sponsorships: 'Sponsorships',
        competitions: 'Competitions',
        appearance: 'Appearance Fees',
        other: 'Other'
    }[source] || source;
}

function formatCategoryName(category) {
    return {
        training: 'Training',
        travel: 'Travel',
        equipment: 'Equipment',
        other: 'Other'
    }[category] || category;
}

// Update Income Chart (modify your existing chart initialization)
function updateIncomeChart() {
    const incomeChart = Chart.getChart("incomeChart");
    if (incomeChart) {
        incomeChart.data.datasets[0].data = [
            financialData.income.sponsorships,
            financialData.income.competitions,
            financialData.income.appearance,
            financialData.income.other
        ];
        incomeChart.update();
    }
}

// AI Assistant Knowledge Base
const aiKnowledge = {
    training: [
        { question: /improve sprint speed/i, answer: "For sprint speed, try this workout: 6-8x30m sprints at 95% effort with 3-4 minutes rest between reps. Focus on explosive starts and proper form." },
        { question: /build endurance/i, answer: "For endurance, try interval training: 4-6x800m at 5K pace with 2 minutes rest. Gradually increase distance or decrease rest time." },
        { question: /strength workout/i, answer: "For strength, focus on compound lifts: 4 sets of 5 reps at 85% of your 1RM for squats, deadlifts, and bench press with 3 minutes rest between sets." }
    ],
    nutrition: [
        { question: /pre-workout meal/i, answer: "Eat a balanced meal 2-3 hours before training: complex carbs (oatmeal, brown rice), lean protein (chicken, fish), and healthy fats (avocado, nuts)." },
        { question: /recovery food/i, answer: "Post-workout, consume a 3:1 ratio of carbs to protein within 30 minutes. Example: Greek yogurt with berries or a protein shake with banana." },
        { question: /hydrat(e|ion)/i, answer: "Aim for 0.5-1 ounce of water per pound of body weight daily. Add electrolytes during intense training sessions lasting over 60 minutes." }
    ],
    recovery: [
        { question: /reduce muscle soreness/i, answer: "For DOMS (delayed onset muscle soreness), try light active recovery (swimming, cycling), foam rolling, and contrast showers (alternating hot/cold water)." },
        { question: /improve sleep/i, answer: "Maintain a consistent sleep schedule, keep your bedroom cool (60-67°F), and avoid screens 1 hour before bedtime. Aim for 7-9 hours nightly." },
        { question: /prevent injury/i, answer: "Follow the 10% rule (don't increase training volume more than 10% weekly), include dynamic warm-ups, and dedicate 2 days/week to mobility work." }
    ]
};

// AI Assistant Responses
const defaultResponses = [
    "I'm not sure about that. Could you rephrase your question?",
    "I specialize in training, nutrition, and recovery questions. Ask me about those topics!",
    "That's an interesting question. I'd recommend consulting your coach for specific advice on that."
];

// Setup Chat Functionality
function setupChatAssistant() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Handle sending messages
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Generate and add AI response after a short delay
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
            
            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generate AI response
    function generateResponse(question) {
        // Check each category for matches
        for (const category in aiKnowledge) {
            for (const item of aiKnowledge[category]) {
                if (item.question.test(question)) {
                    return item.answer;
                }
            }
        }
        
        // Return random default response if no match found
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    // Also allow Enter key to send message
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}
// Add typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Update sendMessage function
function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');
    chatInput.value = '';
    
    const typingIndicator = showTypingIndicator();
    
    setTimeout(() => {
        typingIndicator.remove();
        const response = generateResponse(message);
        addMessage(response, 'bot');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
}
// Forum Data Structure
const forumPosts = [
    {
        id: 1,
        user: "Sarah J.",
        avatar: "images/user1.jpg",
        title: "Recovery Techniques",
        content: "What's everyone's favorite post-workout recovery routine? Looking for new ideas...",
        date: "2 days ago",
        replies: 12,
        views: 45
    },
    {
        id: 2,
        user: "Coach Mike",
        avatar: "images/user2.jpg",
        title: "Upcoming Events",
        content: "List of qualifying events for the regional championships has been posted...",
        date: "1 week ago",
        replies: 8,
        views: 32
    },
    // Add more forum posts
    {
        id: 3,
        user: "Alex T.",
        avatar: "images/user3.jpg",
        title: "Nutrition Plans",
        content: "Anyone have experience with carb cycling during competition season?",
        date: "3 days ago",
        replies: 5,
        views: 28
    },
    {
        id: 4,
        user: "Jamie R.",
        avatar: "images/user4.jpg",
        title: "Mental Preparation",
        content: "What techniques do you use to stay focused during high-pressure competitions?",
        date: "5 days ago",
        replies: 15,
        views: 62
    }
];
// Forum Functionality
function setupForum() {
    const forumContainer = document.querySelector('.forum-posts');
    const viewFullBtn = document.querySelector('.view-forum');
    
    // Initial display (show first 2 posts)
    displayForumPosts(2);
    
    // View Full Forum button
    viewFullBtn.addEventListener('click', function(e) {
        e.preventDefault();
        displayForumPosts(); // Show all posts
        this.style.display = 'none'; // Hide the button
        
        // Optional: Add "Show Less" button
        const showLessBtn = document.createElement('button');
        showLessBtn.className = 'view-forum';
        showLessBtn.textContent = 'Show Less';
        showLessBtn.addEventListener('click', function(e) {
            e.preventDefault();
            displayForumPosts(2);
            this.remove();
            viewFullBtn.style.display = 'block';
        });
        this.parentNode.appendChild(showLessBtn);
    });
}

function displayForumPosts(limit = null) {
    const forumContainer = document.querySelector('.forum-posts');
    forumContainer.innerHTML = '';
    
    const postsToShow = limit ? forumPosts.slice(0, limit) : forumPosts;
    
    postsToShow.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'forum-post';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.user}">
                <div class="post-info">
                    <h4>${post.title}</h4>
                    <span>Posted by ${post.user} - ${post.date}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            <div class="post-stats">
                <span>${post.replies} ${post.replies === 1 ? 'reply' : 'replies'}</span>
                <span>${post.views} views</span>
            </div>
        `;
        forumContainer.appendChild(postElement);
    });
}
// Add click handler to forum posts
document.querySelectorAll('.forum-post').forEach(post => {
    post.addEventListener('click', function() {
        const postId = parseInt(this.dataset.id);
        const post = forumPosts.find(p => p.id === postId);
        showFullPost(post);
    });
});

function showFullPost(post) {
    const modal = document.getElementById('forum-modal');
    const content = document.getElementById('full-post-content');
    
    content.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}" alt="${post.user}">
            <div class="post-info">
                <h3>${post.title}</h3>
                <span>Posted by ${post.user} - ${post.date}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
        </div>
        <div class="post-actions">
            <button class="reply-btn">Reply</button>
            <div class="post-stats">
                <span>${post.replies} ${post.replies === 1 ? 'reply' : 'replies'}</span>
                <span>${post.views} views</span>
            </div>
        </div>
        <div class="post-replies">
            <!-- Replies would be loaded here -->
        </div>
    `;
    
    modal.classList.add('active');
}




