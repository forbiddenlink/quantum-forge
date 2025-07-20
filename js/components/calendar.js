// Calendar Component - Simple Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calendar script loaded - CLEAN VERSION');
    
    // Check if we're on the calendar page
    const calendarGrid = document.getElementById('calendar-grid');
    console.log('Calendar grid element:', calendarGrid);
    
    if (calendarGrid) {
        console.log('Calendar grid found, initializing calendar');
        initializeCalendar();
    } else {
        console.log('Not on calendar page or calendar grid not found');
        console.log('Available elements with calendar in ID:', document.querySelectorAll('[id*="calendar"]'));
    }
});

function initializeCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) {
        console.error('Calendar grid not found');
        return;
    }

    console.log('Initializing calendar grid');
    
    // Get current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Update the month title
    const monthTitle = document.getElementById('current-month');
    if (monthTitle) {
        monthTitle.textContent = currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    // Generate calendar days
    generateCalendarDays(calendarGrid, currentYear, currentMonth);
    
    // Setup navigation buttons
    setupCalendarNavigation();
}

function generateCalendarDays(container, year, month) {
    console.log('Generating calendar days for:', year, month);
    container.innerHTML = '';
    
    // Add day headers first
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach((dayName) => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = dayName;
        container.appendChild(dayHeader);
        console.log('Added day header:', dayName);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generate 6 weeks of days (42 total)
    for (let week = 0; week < 6; week++) {
        for (let day = 0; day < 7; day++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + (week * 7) + day);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-cell';
            
            // Check if it's today
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const isCurrentMonth = date.getMonth() === month;
            
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            if (!isCurrentMonth) {
                dayElement.classList.add('other-month');
            }
            
            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = date.getDate();
            dayElement.appendChild(dayNumber);
            
            // Events container
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'day-events';
            dayElement.appendChild(eventsContainer);
            
            // Add sample events for demonstration
            if (isCurrentMonth && Math.random() > 0.7) {
                const eventCount = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < eventCount; i++) {
                    const eventDot = document.createElement('div');
                    eventDot.className = 'event-indicator';
                    if (Math.random() > 0.5) {
                        eventDot.classList.add('urgent');
                    }
                    eventsContainer.appendChild(eventDot);
                }
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                selectDate(date);
            });
            
            container.appendChild(dayElement);
        }
    }
    
    console.log('Calendar generation complete. Total children:', container.children.length);
}

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateMonth(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateMonth(1));
    }
}

let currentDisplayDate = new Date();

function navigateMonth(direction) {
    currentDisplayDate.setMonth(currentDisplayDate.getMonth() + direction);
    
    // Update title
    const monthTitle = document.getElementById('current-month');
    if (monthTitle) {
        monthTitle.textContent = currentDisplayDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    // Regenerate calendar
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        generateCalendarDays(calendarGrid, currentDisplayDate.getFullYear(), currentDisplayDate.getMonth());
    }
}

function selectDate(date) {
    console.log('Selected date:', date.toDateString());
    
    // Show event panel
    const eventPanel = document.getElementById('event-panel');
    if (eventPanel) {
        eventPanel.classList.add('active');
    }
    
    // Update event details with the selected date
    const eventTitle = eventPanel?.querySelector('.event-title');
    if (eventTitle) {
        eventTitle.textContent = `Event on ${date.toLocaleDateString()}`;
    }
}

// Close event panel
document.addEventListener('DOMContentLoaded', function() {
    const closePanelBtn = document.getElementById('close-panel');
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', () => {
            const eventPanel = document.getElementById('event-panel');
            if (eventPanel) {
                eventPanel.classList.remove('active');
            }
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        const eventPanel = document.getElementById('event-panel');
        if (eventPanel && !eventPanel.contains(e.target) && !e.target.closest('.calendar-day-cell')) {
            eventPanel.classList.remove('active');
        }
    });
});

console.log('Calendar script loaded - CLEAN VERSION'); 