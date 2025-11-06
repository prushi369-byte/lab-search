// Dataset of lab results.  Each object has an id, date, test name, value and optional flag.
const labs = [
  { id: 1, date: "2025-05-27 04:36", test: "SODIUM,S", value: 137 },
  { id: 2, date: "2025-05-27 04:36", test: "Potassium", value: 3.8 },
  { id: 3, date: "2025-05-27 04:36", test: "CHLORIDE", value: 105 },
  { id: 4, date: "2025-05-27 04:36", test: "CO2", value: 23 },
  { id: 5, date: "2025-05-27 04:36", test: "GLUCOSE", value: 109, flag: "H" },
  { id: 6, date: "2025-05-27 04:36", test: "BUN", value: 14 },
  { id: 7, date: "2025-05-27 04:36", test: "CREATININE,S", value: 0.68 },
  { id: 8, date: "2025-05-27 04:36", test: "eGFR (NO RACE)", value: 123 },
  { id: 9, date: "2025-05-27 04:36", test: "ANION GAP", value: 13 },
  { id: 10, date: "2025-05-27 04:36", test: "Calcium, Total", value: 8.8 },
  { id: 11, date: "2025-05-27 04:36", test: "PROTEIN,TOTAL", value: 7.0 },
  { id: 12, date: "2025-05-27 04:36", test: "ALBUMIN,S", value: 3.5 },
  { id: 13, date: "2025-05-27 04:36", test: "Globulin", value: 3.5 },
  { id: 14, date: "2025-05-27 04:36", test: "Alkaline phosphatase", value: 117, flag: "H" },
  { id: 15, date: "2025-05-27 04:36", test: "AST", value: 17 },
  { id: 16, date: "2025-05-27 04:36", test: "ALT", value: 21 },
  { id: 17, date: "2025-05-27 04:36", test: "BILIRUBIN, TOTAL", value: 0.3 }
];

// Retrieve saved results from localStorage or start empty
let myResults = JSON.parse(localStorage.getItem('myResults') || '[]');

// DOM elements
const searchInput = document.getElementById('search');
const allLabsContainer = document.getElementById('all-labs');
const myResultsContainer = document.getElementById('my-results');
const actionsContainer = document.getElementById('my-results-actions');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');

// Render the list of labs based on the current search term
function renderLabs() {
  const query = searchInput.value.trim().toLowerCase();
  allLabsContainer.innerHTML = '';
  const filtered = labs.filter(item => {
    if (!query) return true;
    return (
      item.date.toLowerCase().includes(query) ||
      item.test.toLowerCase().includes(query) ||
      String(item.value).toLowerCase().includes(query)
    );
  });
  if (filtered.length === 0) {
    const p = document.createElement('p');
    p.className = 'italic text-gray-500';
    p.textContent = 'No results match your search.';
    allLabsContainer.appendChild(p);
    return;
  }
  filtered.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between border p-2 rounded';
    const left = document.createElement('div');
    const testName = document.createElement('p');
    testName.className = 'font-medium';
    testName.textContent = item.test;
    const date = document.createElement('p');
    date.className = 'text-sm text-gray-600';
    date.textContent = item.date;
    left.appendChild(testName);
    left.appendChild(date);
    const right = document.createElement('div');
    right.className = 'flex items-center space-x-4';
    const value = document.createElement('span');
    value.textContent = item.value;
    if (item.flag) {
      const flag = document.createElement('span');
      flag.className = 'text-red-600 font-bold';
      flag.textContent = ` (${item.flag})`;
      value.appendChild(flag);
    }
    const addBtn = document.createElement('button');
    addBtn.className = 'bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700';
    addBtn.textContent = 'Add';
    addBtn.onclick = () => addResult(item);
    right.appendChild(value);
    right.appendChild(addBtn);
    row.appendChild(left);
    row.appendChild(right);
    allLabsContainer.appendChild(row);
  });
}

// Render saved results
function renderMyResults() {
  myResultsContainer.innerHTML = '';
  if (myResults.length === 0) {
    const p = document.createElement('p');
    p.className = 'italic text-gray-500';
    p.textContent = 'No saved results yet.';
    myResultsContainer.appendChild(p);
    actionsContainer.classList.add('hidden');
    return;
  }
  myResults.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between border p-2 rounded';
    const left = document.createElement('div');
    const testName = document.createElement('p');
    testName.className = 'font-medium';
    testName.textContent = item.test;
    const date = document.createElement('p');
    date.className = 'text-sm text-gray-600';
    date.textContent = item.date;
    left.appendChild(testName);
    left.appendChild(date);
    const right = document.createElement('div');
    right.className = 'flex items-center space-x-4';
    const value = document.createElement('span');
    value.textContent = item.value;
    if (item.flag) {
      const flag = document.createElement('span');
      flag.className = 'text-red-600 font-bold';
      flag.textContent = ` (${item.flag})`;
      value.appendChild(flag);
    }
    const removeBtn = document.createElement('button');
    removeBtn.className = 'bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeResult(item.id);
    right.appendChild(value);
    right.appendChild(removeBtn);
    row.appendChild(left);
    row.appendChild(right);
    myResultsContainer.appendChild(row);
  });
  actionsContainer.classList.remove('hidden');
}

// Add a result to My Results
function addResult(item) {
  if (!myResults.some(i => i.id === item.id)) {
    myResults.push(item);
    saveMyResults();
    renderMyResults();
  }
}

// Remove a result by id
function removeResult(id) {
  myResults = myResults.filter(item => item.id !== id);
  saveMyResults();
  renderMyResults();
}

// Save My Results to localStorage
function saveMyResults() {
  localStorage.setItem('myResults', JSON.stringify(myResults));
}

// Export My Results to CSV
function exportCSV() {
  const header = ['Date', 'Test', 'Value', 'Flag'];
  const rows = myResults.map(item => [item.date, item.test, item.value, item.flag || '']);
  const lines = [header, ...rows].map(row => row.join(','));
  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'my_results.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Clear all saved results
function clearAll() {
  myResults = [];
  saveMyResults();
  renderMyResults();
}

// Event listeners
searchInput.addEventListener('input', renderLabs);
exportBtn.addEventListener('click', exportCSV);
clearBtn.addEventListener('click', clearAll);

// Initial render
renderLabs();
renderMyResults();