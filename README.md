# FinTrack – Finance Dashboard

A clean, interactive finance dashboard built with React for tracking income, expenses, and financial insights.

---

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## Features

### Dashboard Overview
- Summary cards: Total Balance, Income, Expenses, Transaction count
- Line chart showing monthly income vs expenses trend (Recharts)
- Doughnut chart showing spending by category

### Transactions
- Full transaction list with Date, Amount, Category, Type
- Search by description or category
- Filter by type (income/expense) and category
- Sort by date, amount, or category (asc/desc)
- Export filtered transactions to CSV

### Role-Based UI
- Toggle between **Viewer** and **Admin** using the badge in the top right
- **Viewer**: read-only access to all data
- **Admin**: can add new transactions, edit existing ones, and delete them

### Insights
- Savings rate with health indicator
- Top spending category
- Expense ratio (% of income spent)
- Category breakdown with progress bars
- Monthly income vs expenses comparison

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool / dev server |
| Recharts | Charts (line, doughnut) |
| Context API | Global state management |
| localStorage | Data persistence |

---

## Project Structure

```
src/
├── components/
│   ├── Charts/
│   │   ├── LineChart.jsx       # Monthly trend line chart
│   │   └── PieChart.jsx        # Spending category doughnut
│   ├── Insights.jsx            # Insights tab content
│   ├── RoleSwitcher.jsx        # Role toggle button
│   ├── SummaryCard.jsx         # Metric summary card
│   ├── TransactionModal.jsx    # Add/Edit transaction modal
│   └── TransactionTable.jsx    # Sortable transaction list
├── context/
│   └── AppContext.jsx          # Global state (transactions, role, theme, filters)
├── data/
│   └── mockData.js             # Initial mock transactions + category colors
├── pages/
│   └── Dashboard.jsx           # Dashboard tab page
│   └── Transactions.jsx        # Transactions tab page
├── App.jsx                     # Root layout with topbar + tab routing
├── main.jsx                    # Entry point
└── index.css                   # Global styles with dark mode CSS variables
```

---

## Assumptions

- No backend — all data is mock and persisted via `localStorage`
- Role switching is UI-only for demonstration purposes
- Amounts are in Indian Rupees (₹)
- Dark mode is toggled via the sun/moon icon in the topbar

---

## Optional Features Included

- Dark mode toggle
- localStorage persistence (survives page refresh)
- CSV export for filtered transactions
- Responsive layout for mobile screens
