// Test script to verify homepage clickability
console.log('🧪 Testing Homepage Clickability...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM loaded, starting clickability tests...');
    
    // Test 1: Quick Action Buttons
    testQuickActionButtons();
    
    // Test 2: Event Cards
    testEventCards();
    
    // Test 3: Insight Cards
    testInsightCards();
    
    // Test 4: Stat Items
    testStatItems();
    
    // Test 5: Sidebar Navigation
    testSidebarNavigation();
    
    console.log('🎯 All clickability tests completed!');
});

function testQuickActionButtons() {
    console.log('🔍 Testing Quick Action Buttons...');
    
    const quickActionButtons = document.querySelectorAll('.quick-actions .btn');
    console.log(`Found ${quickActionButtons.length} quick action buttons`);
    
    quickActionButtons.forEach((button, index) => {
        const buttonText = button.textContent.trim();
        const hasOnClick = button.hasAttribute('onclick');
        console.log(`  ${index + 1}. "${buttonText}" - ${hasOnClick ? '✅ Has click handler' : '❌ No click handler'}`);
        
        // Test if button is clickable
        if (hasOnClick) {
            console.log(`     ✅ Clickable: ${buttonText}`);
        } else {
            console.log(`     ❌ Not clickable: ${buttonText}`);
        }
    });
}

function testEventCards() {
    console.log('🔍 Testing Event Cards...');
    
    const eventCards = document.querySelectorAll('.event-card');
    console.log(`Found ${eventCards.length} event cards`);
    
    eventCards.forEach((card, index) => {
        const eventTitle = card.querySelector('.event-title')?.textContent || 'Unknown Event';
        const hasOnClick = card.hasAttribute('onclick');
        console.log(`  ${index + 1}. "${eventTitle}" - ${hasOnClick ? '✅ Has click handler' : '❌ No click handler'}`);
        
        // Test if card is clickable
        if (hasOnClick) {
            console.log(`     ✅ Clickable: ${eventTitle}`);
        } else {
            console.log(`     ❌ Not clickable: ${eventTitle}`);
        }
    });
}

function testInsightCards() {
    console.log('🔍 Testing Insight Cards...');
    
    const insightCards = document.querySelectorAll('.insight-card');
    console.log(`Found ${insightCards.length} insight cards`);
    
    insightCards.forEach((card, index) => {
        const insightTitle = card.querySelector('h4')?.textContent || 'Unknown Insight';
        const hasOnClick = card.hasAttribute('onclick');
        console.log(`  ${index + 1}. "${insightTitle}" - ${hasOnClick ? '✅ Has click handler' : '❌ No click handler'}`);
        
        // Test if card is clickable
        if (hasOnClick) {
            console.log(`     ✅ Clickable: ${insightTitle}`);
        } else {
            console.log(`     ❌ Not clickable: ${insightTitle}`);
        }
    });
}

function testStatItems() {
    console.log('🔍 Testing Stat Items...');
    
    const statItems = document.querySelectorAll('.stat-item');
    console.log(`Found ${statItems.length} stat items`);
    
    statItems.forEach((item, index) => {
        const statLabel = item.querySelector('.stat-label')?.textContent || 'Unknown Stat';
        const hasOnClick = item.hasAttribute('onclick');
        console.log(`  ${index + 1}. "${statLabel}" - ${hasOnClick ? '✅ Has click handler' : '❌ No click handler'}`);
        
        // Test if item is clickable
        if (hasOnClick) {
            console.log(`     ✅ Clickable: ${statLabel}`);
        } else {
            console.log(`     ❌ Not clickable: ${statLabel}`);
        }
    });
}

function testSidebarNavigation() {
    console.log('🔍 Testing Sidebar Navigation...');
    
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    console.log(`Found ${sidebarLinks.length} sidebar navigation links`);
    
    // Check for all expected pages
    const expectedPages = [
        'Dashboard', 'Projects', 'Tasks', 'Team', 'Calendar', 'Analytics', 'Goals',
        'Collaboration Hub', 'Polls & Feedback', 'Company Culture', 'Office Map',
        'Documents', 'Knowledge Hub', 'Learning', 'Benefits',
        'Help Desk', 'Handbook', 'Profile', 'Settings'
    ];
    
    const foundPages = Array.from(sidebarLinks).map(link => link.textContent.trim());
    
    expectedPages.forEach(expectedPage => {
        if (foundPages.includes(expectedPage)) {
            console.log(`  ✅ Found: ${expectedPage}`);
        } else {
            console.log(`  ❌ Missing: ${expectedPage}`);
        }
    });
    
    // Test if links have proper href attributes
    sidebarLinks.forEach((link, index) => {
        const linkText = link.textContent.trim();
        const href = link.getAttribute('href');
        
        if (href && href !== '#') {
            console.log(`  ✅ Link "${linkText}" has href: ${href}`);
        } else {
            console.log(`  ❌ Link "${linkText}" missing or invalid href`);
        }
    });
}

// Test keyboard navigation
function testKeyboardNavigation() {
    console.log('🔍 Testing Keyboard Navigation...');
    
    const focusableElements = document.querySelectorAll('button, .btn, .event-card, .insight-card, .stat-item, .nav-link');
    console.log(`Found ${focusableElements.length} focusable elements`);
    
    focusableElements.forEach((element, index) => {
        const tabIndex = element.getAttribute('tabindex');
        const role = element.getAttribute('role');
        
        if (tabIndex !== null || role === 'button' || element.tagName === 'BUTTON') {
            console.log(`  ✅ Element ${index + 1} is keyboard accessible`);
        } else {
            console.log(`  ❌ Element ${index + 1} is not keyboard accessible`);
        }
    });
}

// Run keyboard navigation test after a delay
setTimeout(testKeyboardNavigation, 2000);

// Export test functions for manual testing
window.testClickability = {
    testQuickActionButtons,
    testEventCards,
    testInsightCards,
    testStatItems,
    testSidebarNavigation,
    testKeyboardNavigation
};

console.log('🧪 Clickability test script loaded. Use window.testClickability to run individual tests.'); 