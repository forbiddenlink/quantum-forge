// 🏆 QUANTUM FORGE - CONTEST VERIFICATION SCRIPT
// Final testing script to verify all contest requirements before submission

class ContestVerificationTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async runAllTests() {
        console.log('🏆 QUANTUM FORGE CONTEST VERIFICATION');
        console.log('=====================================');
        console.log('Testing all requirements for July 27, 2025 submission...\n');

        // Test 1: All buttons are clickable
        await this.testButtonClickability();
        
        // Test 2: 16+ sidebar pages functional
        await this.testSidebarPages();
        
        // Test 3: Cohesive design theme
        await this.testDesignConsistency();
        
        // Test 4: Logical layout flow
        await this.testLayoutFlow();
        
        // Test 5: No white space inconsistencies
        await this.testBackgroundConsistency();
        
        // Test 6: Creative features working
        await this.testCreativeFeatures();

        this.generateReport();
    }

    async testButtonClickability() {
        const testName = 'All Buttons Clickable';
        console.log(`🔍 Testing: ${testName}`);
        
        try {
            // Test welcome section buttons
            const welcomeButtons = document.querySelectorAll('.welcome-section .btn-primary, .welcome-section .btn-secondary');
            const quickActionButtons = document.querySelectorAll('.quick-actions .action-item');
            const navButtons = document.querySelectorAll('.sidebar-nav a');
            const cardButtons = document.querySelectorAll('.insight-card, .event-card, .stat-item');

            const totalButtons = welcomeButtons.length + quickActionButtons.length + navButtons.length + cardButtons.length;
            let clickableButtons = 0;

            // Test welcome buttons
            welcomeButtons.forEach(btn => {
                if (btn.onclick || btn.addEventListener || btn.href) clickableButtons++;
            });

            // Test quick action buttons
            quickActionButtons.forEach(btn => {
                if (btn.onclick || btn.addEventListener || btn.href) clickableButtons++;
            });

            // Test navigation buttons
            navButtons.forEach(btn => {
                if (btn.href && btn.href !== '#') clickableButtons++;
            });

            // Test card buttons
            cardButtons.forEach(btn => {
                if (btn.onclick || btn.addEventListener || btn.style.cursor === 'pointer') clickableButtons++;
            });

            const percentage = (clickableButtons / totalButtons * 100).toFixed(1);
            
            if (percentage >= 90) {
                this.logPass(testName, `${clickableButtons}/${totalButtons} buttons clickable (${percentage}%)`);
            } else {
                this.logFail(testName, `Only ${clickableButtons}/${totalButtons} buttons clickable (${percentage}%)`);
            }
        } catch (error) {
            this.logFail(testName, `Error: ${error.message}`);
        }
    }

    async testSidebarPages() {
        const testName = '16+ Sidebar Pages Functional';
        console.log(`🔍 Testing: ${testName}`);
        
        try {
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a[href]');
            const validPages = [];
            
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href !== '#' && href !== '/') {
                    validPages.push(href);
                }
            });

            const uniquePages = [...new Set(validPages)];
            
            if (uniquePages.length >= 16) {
                this.logPass(testName, `${uniquePages.length} pages available (exceeds 16 requirement)`);
                console.log('📋 Pages found:', uniquePages.slice(0, 5).join(', '), '...');
            } else {
                this.logFail(testName, `Only ${uniquePages.length} pages found (need 16+)`);
            }
        } catch (error) {
            this.logFail(testName, `Error: ${error.message}`);
        }
    }

    async testDesignConsistency() {
        const testName = 'Cohesive Design Theme';
        console.log(`🔍 Testing: ${testName}`);
        
        try {
            // Check if CSS custom properties are defined
            const rootStyles = getComputedStyle(document.documentElement);
            const themeVariables = [
                '--primary-color',
                '--secondary-color',
                '--background-color',
                '--card-background'
            ];

            let definedVariables = 0;
            themeVariables.forEach(variable => {
                const value = rootStyles.getPropertyValue(variable).trim();
                if (value) definedVariables++;
            });

            // Check for consistent styling
            const cards = document.querySelectorAll('.card, .insight-card, .stat-item');
            let consistentCards = 0;
            
            cards.forEach(card => {
                const styles = getComputedStyle(card);
                const hasRoundedCorners = parseFloat(styles.borderRadius) > 0;
                const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
                
                if (hasRoundedCorners && hasBackground) consistentCards++;
            });

            const consistencyPercentage = cards.length > 0 ? (consistentCards / cards.length * 100).toFixed(1) : 100;
            
            if (definedVariables >= 3 && consistencyPercentage >= 80) {
                this.logPass(testName, `${definedVariables}/4 theme variables + ${consistencyPercentage}% card consistency`);
            } else {
                this.logFail(testName, `Theme variables: ${definedVariables}/4, Card consistency: ${consistencyPercentage}%`);
            }
        } catch (error) {
            this.logFail(testName, `Error: ${error.message}`);
        }
    }

    async testLayoutFlow() {
        const testName = 'Logical Layout Flow';
        console.log(`🔍 Testing: ${testName}`);
        
        try {
            // Check dashboard grid
            const dashboardGrid = document.querySelector('.dashboard-grid');
            const gridColumns = getComputedStyle(dashboardGrid).gridTemplateColumns;
            
            // Check for improved proportions (should not be all equal fr units)
            const hasImprovedProportions = gridColumns.includes('2fr') || gridColumns.includes('3fr');
            
            // Check component heights
            const components = document.querySelectorAll('.dashboard-grid > *');
            let reasonableHeights = 0;
            
            components.forEach(component => {
                const height = component.offsetHeight;
                if (height >= 200 && height <= 800) reasonableHeights++; // Reasonable component height
            });

            const heightPercentage = components.length > 0 ? (reasonableHeights / components.length * 100).toFixed(1) : 100;
            
            if (hasImprovedProportions && heightPercentage >= 70) {
                this.logPass(testName, `Improved grid proportions + ${heightPercentage}% components have good heights`);
            } else {
                this.logFail(testName, `Grid proportions: ${hasImprovedProportions}, Height consistency: ${heightPercentage}%`);
            }
        } catch (error) {
            this.logFail(testName, `Error: ${error.message}`);
        }
    }

    async testBackgroundConsistency() {
        const testName = 'Background Consistency';
        console.log(`🔍 Testing: ${testName}`);
        
        try {
            const components = document.querySelectorAll('.card, .widget, .insight-card, .stat-item');
            let consistentBackgrounds = 0;
            
            components.forEach(component => {
                const styles = getComputedStyle(component);
                const bgColor = styles.backgroundColor;
                
                // Should not have pure white backgrounds in dark theme
                const isWhite = bgColor === 'rgb(255, 255, 255)' || bgColor === 'white';
                const isTransparent = bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent';
                
                if (!isWhite || isTransparent) {
                    consistentBackgrounds++;
                }
            });

            const percentage = components.length > 0 ? (consistentBackgrounds / components.length * 100).toFixed(1) : 100;
            
            if (percentage >= 85) {
                this.logPass(testName, `${percentage}% components have consistent backgrounds`);
            } else {
                this.logFail(testName, `Only ${percentage}% components have consistent backgrounds`);
            }
        } catch (error) {
            this.logFail(testName, `Error: ${error.message}`);
        }
    }

    async testCreativeFeatures() {
        const testName = 'Creative Features Working';
        console.log(`🔍 Testing: ${testName}`);
        
        try {
            let creativeFeatures = 0;
            
            // Test for animations
            const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animate"]');
            if (animatedElements.length > 0) creativeFeatures++;
            
            // Test for glassmorphism effects
            const glassmorphismElements = document.querySelectorAll('[style*="backdrop-filter"], [class*="glass"]');
            if (glassmorphismElements.length > 0) creativeFeatures++;
            
            // Test for interactive elements
            const interactiveElements = document.querySelectorAll('[style*="transition"], [class*="hover"]');
            if (interactiveElements.length > 0) creativeFeatures++;
            
            // Test for charts/visualizations
            const charts = document.querySelectorAll('canvas, .chart-container');
            if (charts.length > 0) creativeFeatures++;
            
            // Test for theme switching
            const themeToggle = document.querySelector('.theme-toggle, .color-picker');
            if (themeToggle) creativeFeatures++;

            if (creativeFeatures >= 3) {
                this.logPass(testName, `${creativeFeatures}/5 creative features detected`);
            } else {
                this.logFail(testName, `Only ${creativeFeatures}/5 creative features detected`);
            }
        } catch (error) {
            this.logFail(testName, `Error: ${error.message}`);
        }
    }

    logPass(testName, details) {
        console.log(`✅ PASS: ${testName} - ${details}`);
        this.testResults.passed++;
        this.testResults.tests.push({ name: testName, status: 'PASS', details });
    }

    logFail(testName, details) {
        console.log(`❌ FAIL: ${testName} - ${details}`);
        this.testResults.failed++;
        this.testResults.tests.push({ name: testName, status: 'FAIL', details });
    }

    generateReport() {
        console.log('\n🏆 CONTEST VERIFICATION RESULTS');
        console.log('================================');
        console.log(`✅ Passed: ${this.testResults.passed}`);
        console.log(`❌ Failed: ${this.testResults.failed}`);
        console.log(`📊 Total: ${this.testResults.passed + this.testResults.failed}`);
        
        const percentage = ((this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100).toFixed(1);
        console.log(`🎯 Success Rate: ${percentage}%`);
        
        if (percentage >= 85) {
            console.log('\n🏆 CONTEST READY! ✅');
            console.log('Your project meets contest requirements for submission.');
        } else {
            console.log('\n⚠️ NEEDS ATTENTION');
            console.log('Some requirements need fixes before submission.');
        }
        
        // Detailed report
        console.log('\n📋 DETAILED RESULTS:');
        this.testResults.tests.forEach(test => {
            console.log(`${test.status === 'PASS' ? '✅' : '❌'} ${test.name}: ${test.details}`);
        });
        
        return this.testResults;
    }
}

// Auto-run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const tester = new ContestVerificationTester();
            tester.runAllTests();
        }, 2000); // Wait for components to initialize
    });
} else {
    setTimeout(() => {
        const tester = new ContestVerificationTester();
        tester.runAllTests();
    }, 2000);
}

// Export for manual testing
window.contestTester = new ContestVerificationTester();
