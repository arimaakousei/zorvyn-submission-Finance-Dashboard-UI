export const CATEGORY_COLORS = {
  Food: '#639922',
  Transport: '#ba7517',
  Shopping: '#d4537e',
  Health: '#378add',
  Entertainment: '#7f77dd',
  Utilities: '#1d9e75',
  Salary: '#185fa5',
  Freelance: '#0f6e56',
  Other: '#888780',
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

export const INITIAL_TRANSACTIONS = [
  { id: 1,  date: '2025-03-01', desc: 'Grocery Store',     cat: 'Food',          type: 'expense', amount: 2400  },
  { id: 2,  date: '2025-03-03', desc: 'Salary Credit',     cat: 'Salary',        type: 'income',  amount: 75000 },
  { id: 3,  date: '2025-03-05', desc: 'Uber Cab',          cat: 'Transport',     type: 'expense', amount: 850   },
  { id: 4,  date: '2025-03-08', desc: 'Amazon Order',      cat: 'Shopping',      type: 'expense', amount: 3200  },
  { id: 5,  date: '2025-03-10', desc: 'Doctor Visit',      cat: 'Health',        type: 'expense', amount: 1500  },
  { id: 6,  date: '2025-03-12', desc: 'Netflix',           cat: 'Entertainment', type: 'expense', amount: 649   },
  { id: 7,  date: '2025-03-14', desc: 'Electricity Bill',  cat: 'Utilities',     type: 'expense', amount: 2100  },
  { id: 8,  date: '2025-03-16', desc: 'Freelance Project', cat: 'Freelance',     type: 'income',  amount: 18000 },
  { id: 9,  date: '2025-03-18', desc: 'Restaurant',        cat: 'Food',          type: 'expense', amount: 1800  },
  { id: 10, date: '2025-03-20', desc: 'Zomato',            cat: 'Food',          type: 'expense', amount: 620   },
  { id: 11, date: '2025-03-22', desc: 'Gym Membership',    cat: 'Health',        type: 'expense', amount: 1200  },
  { id: 12, date: '2025-03-24', desc: 'Ola Auto',          cat: 'Transport',     type: 'expense', amount: 320   },
  { id: 13, date: '2025-03-25', desc: 'Salary Credit',     cat: 'Salary',        type: 'income',  amount: 75000 },
  { id: 14, date: '2025-03-26', desc: 'Myntra',            cat: 'Shopping',      type: 'expense', amount: 4500  },
  { id: 15, date: '2025-03-28', desc: 'Swiggy',            cat: 'Food',          type: 'expense', amount: 780   },
  { id: 16, date: '2025-02-01', desc: 'Grocery Store',     cat: 'Food',          type: 'expense', amount: 2100  },
  { id: 17, date: '2025-02-03', desc: 'Salary Credit',     cat: 'Salary',        type: 'income',  amount: 75000 },
  { id: 18, date: '2025-02-07', desc: 'Shopping Mall',     cat: 'Shopping',      type: 'expense', amount: 5500  },
  { id: 19, date: '2025-02-14', desc: 'Valentine Dinner',  cat: 'Food',          type: 'expense', amount: 3200  },
  { id: 20, date: '2025-02-20', desc: 'Freelance',         cat: 'Freelance',     type: 'income',  amount: 12000 },
  { id: 21, date: '2025-02-22', desc: 'Internet Bill',     cat: 'Utilities',     type: 'expense', amount: 999   },
  { id: 22, date: '2025-02-25', desc: 'Movie Tickets',     cat: 'Entertainment', type: 'expense', amount: 800   },
];
