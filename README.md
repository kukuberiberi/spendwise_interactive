# SpendWise Interactive Budget Tracker

## Project Summary
SpendWise is an interactive web-based personal budget management application. It allows users to log expenses, dynamically calculate totals, monitor spending limits in real-time, and manage ongoing financial records safely within the browser.

---

## Rubric Fulfillment Breakdown

### 1. Decision Making (Conditionals)
- **Where it is:** Located in the `evaluateBudgetHealth()` function inside `script.js`.
- **How it works:** Uses `if`, `else if`, and `else` statements to inspect mathematical conditions against the remaining budget value, instantly altering alert styles and visual feedback messages (Success, Warning, and Danger thresholds).

### 2. Working with Arrays (Data Storage)
- **Where it is:** Declared globally as `let expenseRecords = [];` in `script.js`.
- **How it works:** All entries captured via the web form are packaged into structured objects and pushed into this array as a single source of truth. Items are safely removed using native array filtration (`.filter()`) during user deletions.

### 3. Processing Data with Loops
- **Where it is:** Located in `calculateTotalSpent()` and `renderRecordsList()`.
- **How it works:** Employs standard `for` loops to accumulate totals across records and `.forEach()` array loops to loop through entries and build live HTML nodes dynamically.

### 4. Dynamic Dashboard DOM Updates
- **Where it is:** Handled inside `refreshDashboard()`.
- **How it works:** Uses native JavaScript element selectors (`document.getElementById`) and node injection to immediately push state changes onto the webpage layout (updating counters and lists instantly without page refreshes).

### 5. Handling User Interactions via Events
- **Where it is:** Attached globally to the input form via `.addEventListener('submit', ...)`.
- **How it works:** Intercepts default browser submission protocols (`event.preventDefault()`) to process data locally, alongside inline click listeners attached to generated items for immediate deletion handling.

---

## How to Run Locally
1. Clone or download this repository to your local machine.
2. Open the folder in a code editor like **Visual Studio Code**.
3. Launch `index.html` via **Live Server** or open it directly in any modern web browser.
