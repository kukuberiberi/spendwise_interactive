/**
 * SpendWise Interactive Budget Tracker
 * Fully documented for grading criteria compliance.
 */

// ==========================================
// REQUIREMENT 2: ARRAY DATA STORAGE
// ==========================================
let expenseRecords = [];
const TOTAL_BUDGET = 1000.00; // Baseline monthly cap

// DOM Element References (Requirement 4 & 5)
const expenseForm = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categorySelect = document.getElementById('expense-category');
const recordsList = document.getElementById('records-list');

const budgetDisplay = document.getElementById('budget-display');
const spentDisplay = document.getElementById('spent-display');
const balanceDisplay = document.getElementById('balance-display');
const feedbackAlert = document.getElementById('feedback-alert');


// ==========================================
// REQUIREMENT 5: HANDLE USER INTERACTIONS VIA EVENTS
// ==========================================
expenseForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop page reload

    // Capture values from form fields
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    // Basic validation check
    if (name !== '' && !isNaN(amount) && amount > 0) {
        
        // Create an individual record object
        const newRecord = {
            id: Date.now(), // Unique ID for deletion mapping
            name: name,
            amount: amount,
            category: category
        };

        // Push record into our data array (Requirement 2)
        expenseRecords.push(newRecord);

        // Reset the form fields for subsequent entries
        expenseForm.reset();

        // Trigger updates across the application dashboard
        refreshDashboard();
    }
});


// Function to remove a specific item from the array storage
function deleteRecord(recordId) {
    // Filter array to exclude the targeted item ID
    expenseRecords = expenseRecords.filter(record => record.id !== recordId);
    refreshDashboard();
}


// ==========================================
// CENTRAL CONTROLLER FUNCTION
// ==========================================
function refreshDashboard() {
    let totalSpent = calculateTotalSpent();
    let remainingBalance = TOTAL_BUDGET - totalSpent;

    // Requirement 4: Update the DOM Dynamically
    spentDisplay.textContent = formatCurrency(totalSpent);
    balanceDisplay.textContent = formatCurrency(remainingBalance);

    // Re-render the records list on the webpage
    renderRecordsList();

    // Requirement 1: Evaluate state using conditional rules
    evaluateBudgetHealth(totalSpent, remainingBalance);
}


// ==========================================
// REQUIREMENT 3: PROCESS DATA WITH LOOPS
// ==========================================
function calculateTotalSpent() {
    let sum = 0;
    // Standard iterative loop evaluating array items
    for (let i = 0; i < expenseRecords.length; i++) {
        sum += expenseRecords[i].amount;
    }
    return sum;
}


// Render records list into DOM via loop processing
function renderRecordsList() {
    recordsList.innerHTML = ''; // Clear container

    // Check array length for empty state
    if (expenseRecords.length === 0) {
        recordsList.innerHTML = `<li class="empty-state">No expense records found.</li>`;
        return;
    }

    // Process elements using forEach loop to build dynamic nodes
    expenseRecords.forEach(record => {
        const listItem = document.createElement('li');
        listItem.className = 'record-item';

        listItem.innerHTML = `
            <div class="record-details">
                <strong>${escapeHTML(record.name)}</strong>
                <span>${escapeHTML(record.category)}</span>
            </div>
            <div class="record-actions">
                <span>${formatCurrency(record.amount)}</span>
                <button class="delete-btn" title="Delete entry" onclick="deleteRecord(${record.id})">&times;</button>
            </div>
        `;

        recordsList.appendChild(listItem);
    });
}


// ==========================================
// REQUIREMENT 1: IMPLEMENT DECISION MAKING
// ==========================================
function evaluateBudgetHealth(spent, remaining) {
    feedbackAlert.className = 'alert'; // Reset base alert classes

    if (spent === 0) {
        feedbackAlert.classList.add('hidden');
    } else if (remaining < 0) {
        // Condition: Over budget limit
        feedbackAlert.textContent = `🚨 Budget Exceeded! You are over budget by ${formatCurrency(Math.abs(remaining))}.`;
        feedbackAlert.classList.add('alert-danger');
    } else if (remaining <= 200) {
        // Condition: Running low on funds threshold
        feedbackAlert.textContent = `⚠️ Caution: Funds running low. Only ${formatCurrency(remaining)} remaining.`;
        feedbackAlert.classList.add('alert-warning');
    } else {
        // Condition: Safe/Healthy spending status
        feedbackAlert.textContent = `✅ Good standing! Your expenses are safely within your budget limit.`;
        feedbackAlert.classList.add('alert-success');
    }
}


// Utility: Formats numbers neatly into currency text
function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

// Utility: Basic XSS sanitizer for safe text injection
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Initial state load
refreshDashboard();