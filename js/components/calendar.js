// Calendar Component
class Calendar extends HTMLElement {
    constructor() {
        super();
        this.currentDate = new Date();
        this.currentView = 'month'; // Default to month view for better calendar appearance
        console.log('Calendar component created');
    }

    connectedCallback() {
        console.log('Calendar component connected');
        // Wait a bit for the DOM to be ready
        setTimeout(() => {
            this.initializeCalendar();
            this.setupEventListeners();
        }, 100);
    }

    initializeCalendar() {
        console.log('Initializing calendar');
        this.updateCalendarDisplay();
        this.updateNavigationButtons();
        // Force the month view to be displayed
        this.updateCalendarLayout();
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        // Navigation buttons
        const prevBtn = this.querySelector('.date-navigation .btn:first-child');
        const nextBtn = this.querySelector('.date-navigation .btn:last-child');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateDate(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateDate(1));
        }

        // View switcher
        const viewButtons = this.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchView(btn.textContent.toLowerCase());
            });
        });

        // New event button
        const newEventBtn = this.querySelector('.btn.primary');
        if (newEventBtn) {
            newEventBtn.addEventListener('click', () => this.showNewEventModal());
        }

        // Event cards
        const eventCards = this.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.addEventListener('click', () => this.showEventDetails(card));
        });

        // Event actions
        const editButtons = this.querySelectorAll('.event-actions .btn');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const eventItem = btn.closest('.event-item');
                if (btn.textContent === 'Edit') {
                    this.editEvent(eventItem);
                } else if (btn.textContent === 'Cancel') {
                    this.cancelEvent(eventItem);
                }
            });
        });

        // Schedule meeting buttons
        const scheduleButtons = this.querySelectorAll('.schedule-actions .btn');
        scheduleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent === 'Schedule Now') {
                    this.scheduleMeeting();
                } else if (btn.textContent === 'Find Time') {
                    this.findAvailableTime();
                }
            });
        });
    }

    navigateDate(direction) {
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        
        if (this.currentView === 'month') {
            this.currentDate.setMonth(currentMonth + direction);
        } else if (this.currentView === 'week') {
            this.currentDate.setDate(this.currentDate.getDate() + (direction * 7));
        } else if (this.currentView === 'day') {
            this.currentDate.setDate(this.currentDate.getDate() + direction);
        }
        
        this.updateCalendarDisplay();
        this.updateNavigationButtons();
    }

    switchView(view) {
        console.log('Switching to view:', view);
        this.currentView = view;
        
        // Update active button
        const viewButtons = this.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === view) {
                btn.classList.add('active');
            }
        });
        
        // Update calendar grid classes
        const calendarGrid = this.querySelector('.calendar-grid');
        if (calendarGrid) {
            calendarGrid.classList.remove('week-view', 'day-view');
            if (view === 'week') {
                calendarGrid.classList.add('week-view');
            } else if (view === 'day') {
                calendarGrid.classList.add('day-view');
            }
        }
        
        // Update calendar layout based on view
        this.updateCalendarLayout();
        this.updateCalendarDisplay();
    }

    updateCalendarLayout() {
        console.log('Updating calendar layout for view:', this.currentView);
        const calendarGrid = this.querySelector('.calendar-grid');
        
        if (!calendarGrid) {
            console.error('Calendar grid not found:', { calendarGrid });
            return;
        }
        
        if (this.currentView === 'month') {
            // Month view - show full month grid
            this.showMonthView();
        } else if (this.currentView === 'week') {
            // Week view - show current week
            this.showWeekView();
        } else if (this.currentView === 'day') {
            // Day view - show single day
            this.showDayView();
        }
    }

    showMonthView() {
        console.log('Showing month view');
        const calendarGrid = this.querySelector('.calendar-grid');
        if (!calendarGrid) {
            console.error('Calendar grid not found');
            return;
        }
        
        // Create month grid (7 days x 6 weeks for better coverage)
        calendarGrid.innerHTML = '';
        
        const monthStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const monthEnd = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - monthStart.getDay());
        
        // Add day headers as direct children of the grid
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(dayName => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = dayName;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Create all day cells as direct children of the grid
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + (week * 7) + day);
                
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-day-cell';
                
                // Check if it's today
                const today = new Date();
                const isToday = date.toDateString() === today.toDateString();
                const isCurrentMonth = date.getMonth() === this.currentDate.getMonth();
                
                if (isToday) {
                    dayDiv.classList.add('today');
                }
                
                if (!isCurrentMonth) {
                    dayDiv.classList.add('other-month');
                }
                
                // Day number
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = date.getDate();
                dayDiv.appendChild(dayNumber);
                
                // Events container
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'day-events';
                dayDiv.appendChild(eventsContainer);
                
                // Add sample events for demonstration
                if (isCurrentMonth && Math.random() > 0.7) {
                    const eventCount = Math.floor(Math.random() * 3) + 1;
                    for (let i = 0; i < eventCount; i++) {
                        const eventDot = document.createElement('div');
                        eventDot.className = 'event-indicator';
                        eventsContainer.appendChild(eventDot);
                    }
                }
                
                dayDiv.addEventListener('click', () => this.selectDate(date));
                
                calendarGrid.appendChild(dayDiv);
            }
        }
    }

    showWeekView() {
        const calendarGrid = this.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        // Clear the grid
        calendarGrid.innerHTML = '';
        
        // Add time column header
        const timeHeader = document.createElement('div');
        timeHeader.className = 'calendar-day-header';
        timeHeader.textContent = 'Time';
        calendarGrid.appendChild(timeHeader);
        
        // Add day headers
        const weekStart = this.getWeekStart();
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = date.toLocaleDateString('en-US', { weekday: 'short' });
            calendarGrid.appendChild(dayHeader);
        }
        
        // Add time slots and day columns
        for (let hour = 0; hour < 24; hour++) {
            // Time slot
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = `${hour}:00`;
            calendarGrid.appendChild(timeSlot);
            
            // Day columns for this hour
            for (let day = 0; day < 7; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day-cell';
                dayCell.style.minHeight = '60px';
                
                // Add sample events
                if (hour === 9 && day === 0) {
                    const event = document.createElement('div');
                    event.className = 'event-card';
                    event.innerHTML = `
                        <div class="event-content">
                            <h3>Team Standup</h3>
                            <p>9:00 AM - 10:00 AM</p>
                        </div>
                    `;
                    dayCell.appendChild(event);
                }
                
                calendarGrid.appendChild(dayCell);
            }
        }
    }

    showDayView() {
        const calendarGrid = this.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        // Clear the grid
        calendarGrid.innerHTML = '';
        
        // Add time column header
        const timeHeader = document.createElement('div');
        timeHeader.className = 'calendar-day-header';
        timeHeader.textContent = 'Time';
        calendarGrid.appendChild(timeHeader);
        
        // Add day header
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = this.currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        calendarGrid.appendChild(dayHeader);
        
        // Add time slots and day column
        for (let hour = 0; hour < 24; hour++) {
            // Time slot
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = `${hour}:00`;
            calendarGrid.appendChild(timeSlot);
            
            // Day column for this hour
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day-cell';
            dayCell.style.minHeight = '60px';
            
            // Add sample events
            if (hour === 9) {
                const event = document.createElement('div');
                event.className = 'event-card';
                event.innerHTML = `
                    <div class="event-content">
                        <h3>Team Standup</h3>
                        <p>9:00 AM - 10:00 AM</p>
                    </div>
                `;
                dayCell.appendChild(event);
            } else if (hour === 13) {
                const event = document.createElement('div');
                event.className = 'event-card';
                event.innerHTML = `
                    <div class="event-content">
                        <h3>Client Meeting</h3>
                        <p>1:00 PM - 2:30 PM</p>
                    </div>
                `;
                dayCell.appendChild(event);
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }

    selectDate(date) {
        // Switch to day view when a date is clicked
        this.currentView = 'day';
        this.currentDate = date;
        this.switchView('day');
        this.updateCalendarDisplay();
    }

    updateCalendarDisplay() {
        const titleElement = this.querySelector('.date-navigation h1');
        if (titleElement) {
            titleElement.textContent = this.getDisplayTitle();
        }
        
        this.updateDayHeaders();
        this.updateEventPositions();
    }

    getDisplayTitle() {
        const options = { 
            year: 'numeric', 
            month: 'long' 
        };
        
        if (this.currentView === 'month') {
            return this.currentDate.toLocaleDateString('en-US', options);
        } else if (this.currentView === 'week') {
            const weekStart = this.getWeekStart();
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            
            const startOptions = { month: 'short', day: 'numeric' };
            const endOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            
            return `${weekStart.toLocaleDateString('en-US', startOptions)} - ${weekEnd.toLocaleDateString('en-US', endOptions)}`;
        } else if (this.currentView === 'day') {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            return this.currentDate.toLocaleDateString('en-US', options);
        }
        
        return this.currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }

    getWeekStart() {
        const date = new Date(this.currentDate);
        const day = date.getDay();
        const diff = date.getDate() - day;
        return new Date(date.setDate(diff));
    }

    updateDayHeaders() {
        if (this.currentView !== 'week') return;
        
        const dayColumns = this.querySelectorAll('.day-column');
        const weekStart = this.getWeekStart();
        
        dayColumns.forEach((column, index) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + index);
            
            const dayName = column.querySelector('.day-name');
            const dayDate = column.querySelector('.day-date');
            
            if (dayName && dayDate) {
                dayName.textContent = date.toLocaleDateString('en-US', { weekday: 'short' });
                dayDate.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
        });
    }

    updateEventPositions() {
        // This would be used to dynamically position events based on their time
        // For now, we're using static positioning in the HTML
    }

    updateNavigationButtons() {
        const prevBtn = this.querySelector('.date-navigation .btn:first-child');
        const nextBtn = this.querySelector('.date-navigation .btn:last-child');
        
        if (prevBtn) {
            prevBtn.disabled = false;
        }
        
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }

    showNewEventModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Create New Event</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="new-event-form">
                        <div class="form-group">
                            <label for="event-title">Event Title</label>
                            <input type="text" id="event-title" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="event-date">Date</label>
                                <input type="date" id="event-date" required>
                            </div>
                            <div class="form-group">
                                <label for="event-time">Time</label>
                                <input type="time" id="event-time" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="event-duration">Duration (minutes)</label>
                            <input type="number" id="event-duration" value="60" min="15" step="15">
                        </div>
                        <div class="form-group">
                            <label for="event-description">Description</label>
                            <textarea id="event-description" rows="3"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                            <button type="submit" class="btn primary">Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set default date to today
        const dateInput = modal.querySelector('#event-date');
        if (dateInput) {
            dateInput.value = this.currentDate.toISOString().split('T')[0];
        }
        
        // Handle form submission
        const form = modal.querySelector('#new-event-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createEvent(form);
            modal.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    createEvent(form) {
        const formData = new FormData(form);
        const eventData = {
            title: formData.get('event-title') || form.querySelector('#event-title').value,
            date: formData.get('event-date') || form.querySelector('#event-date').value,
            time: formData.get('event-time') || form.querySelector('#event-time').value,
            duration: formData.get('event-duration') || form.querySelector('#event-duration').value,
            description: formData.get('event-description') || form.querySelector('#event-description').value
        };
        
        // Here you would typically save the event to your backend
        console.log('Creating event:', eventData);
        this.showNotification('Event created successfully!', 'success');
        
        // Refresh the calendar display
        this.updateCalendarDisplay();
    }

    showEventDetails(eventCard) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Event Details</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="event-details">
                        <h3>${eventCard.querySelector('h3').textContent}</h3>
                        <p>${eventCard.querySelector('p').textContent}</p>
                        <div class="event-actions">
                            <button class="btn secondary">Edit</button>
                            <button class="btn secondary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    editEvent(eventItem) {
        // Implementation for editing events
        console.log('Editing event:', eventItem);
    }

    cancelEvent(eventItem) {
        // Implementation for canceling events
        console.log('Canceling event:', eventItem);
    }

    scheduleMeeting() {
        // Implementation for scheduling meetings
        console.log('Scheduling meeting');
        this.showNotification('Meeting scheduling feature coming soon!', 'info');
    }

    findAvailableTime() {
        // Implementation for finding available time
        console.log('Finding available time');
        this.showNotification('Available time finder coming soon!', 'info');
    }

    closeModal(modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: var(--space-4);
            background: var(--bg-elevated);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

customElements.define('app-calendar', Calendar);

// Test the calendar component
console.log('Calendar component script loaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking for calendar component');
    const calendar = document.querySelector('app-calendar');
    if (calendar) {
        console.log('Calendar component found:', calendar);
        // Force the calendar to initialize after a short delay
        setTimeout(() => {
            if (calendar.initializeCalendar) {
                calendar.initializeCalendar();
            }
            if (calendar.updateCalendarLayout) {
                calendar.updateCalendarLayout();
            }
        }, 500);
    } else {
        console.error('Calendar component not found');
    }
}); 