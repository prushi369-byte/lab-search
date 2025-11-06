// Dataset of lab results. Each object has an id, test name, value and optional flag.
// Dates are intentionally removed so that labs are hidden until searched. Additional labs
// provided by the user have been added. Values may be numeric or string; flags mark
// abnormally high results ("H").
const labs = [
  // Basic metabolic panel
  { id: 1, test: "SODIUM,S", value: 137 },
  { id: 2, test: "Potassium", value: 3.8 },
  { id: 3, test: "CHLORIDE", value: 105 },
  { id: 4, test: "CO2", value: 23 },
  { id: 5, test: "GLUCOSE", value: 109, flag: "H" },
  { id: 6, test: "BUN", value: 14 },
  { id: 7, test: "CREATININE,S", value: 0.68 },
  { id: 8, test: "eGFR (NO RACE)", value: 123 },
  { id: 9, test: "ANION GAP", value: 13 },
  { id: 10, test: "Calcium, Total", value: 8.8 },
  { id: 11, test: "PROTEIN,TOTAL", value: 7.0 },
  { id: 12, test: "ALBUMIN,S", value: 3.5 },
  { id: 13, test: "Globulin", value: 3.5 },
  { id: 14, test: "Alkaline phosphatase", value: 117, flag: "H" },
  { id: 15, test: "AST", value: 17 },
  { id: 16, test: "ALT", value: 21 },
  { id: 17, test: "BILIRUBIN, TOTAL", value: 0.3 },
  // Nutrient and vitamin labs
  { id: 18, test: "Folate", value: 9.0 },
  { id: 19, test: "PARIETAL CELL ABS", value: "NEGATIVE" },
  // Updated values per user request: Homocystine 17 (high), Methylmalonic acid 1493 (high)
  { id: 20, test: "HOMOCYSTINE", value: 17, flag: "H" },
  { id: 21, test: "METHYLMALONIC ACID", value: 1493, flag: "H" },
  { id: 22, test: "Copper,Ser", value: 115 },
  { id: 23, test: "Thiamine", value: 162 },
  // Updated B12: <150, remove high flag
  { id: 24, test: "Vitamin B12", value: "<150" },
  { id: 25, test: "VITAMIN B6", value: 8.1 },
  { id: 26, test: "Magnesium", value: 1.8 },
  // Hormonal and metabolic tests
  { id: 27, test: "HEMOGLOBIN A1C", value: 5.0 },
  { id: 28, test: "TSH", value: 1.05 },
  { id: 29, test: "ACTH", value: 9 },
  { id: 30, test: "Cortisol, AM", value: 6.8 },
  { id: 31, test: "Pregnancy test, Urine", value: "Negative" },
  // Autoimmune antibodies
  { id: 32, test: "ANA W/Rfl To IFA Titer/Pattern", value: "Negative" },
  { id: 33, test: "DNA (DS) ANTIBODIES", value: 3 },
  { id: 34, test: "SCL-70 ANTIBODY", value: "<0.2" },
  { id: 35, test: "SJOGREN'S AB A", value: "<0.2" },
  { id: 36, test: "SJOGREN'S AB B", value: "<0.2" },
  { id: 37, test: "SM ANTIBODY", value: "<0.2" },
  { id: 38, test: "Sm/Rnp Antibody", value: "<0.2" },
  { id: 39, test: "SCL-70 Ab Interpretation", value: "Negative" },
  { id: 40, test: "Sjogren's Antibody (SS-A) Interpretation", value: "Negative" },
  { id: 41, test: "Sjogren's Antibody (SS-B) Interpretation", value: "Negative" },
  { id: 42, test: "SM Antibody Interpretation", value: "Negative" },
  { id: 43, test: "SM/RNP Antibody Interpretation", value: "Negative" },
  // Inflammatory markers and globulins
  { id: 44, test: "Cardio CRP", value: 8.1, flag: "H" },
  { id: 45, test: "Alpha-1-Globulin", value: 0.23 },
  { id: 46, test: "Alpha-2-Globulin", value: 0.49 },
  { id: 47, test: "Beta Globulin", value: 1.10 },
  { id: 48, test: "GAMMA GLOBULIN", value: 0.78 },
  { id: 49, test: "Electrophoresis Interpretation", value: "No paraprotein detected by serum protein electrophoresis" },
  { id: 50, test: "Interpretation", value: "See Comment" },
  // Cerebrospinal fluid (CSF) studies
  { id: 51, test: "Glucose CSF", value: 77, flag: "H" },
  { id: 52, test: "IGG,CSF", value: 2.4 },
  { id: 53, test: "OLIGOCLONAL BAND,CSF", value: "Absent" },
  { id: 54, test: "Protein,Total,CSF", value: 31 },
  { id: 55, test: "CSF Tube Number", value: "Tube 3" },
  { id: 56, test: "CSF Color", value: "Colorless" },
  { id: 57, test: "CSF Appearance", value: "Clear" },
  { id: 58, test: "CSF Nucleated Cells", value: 6, flag: "H" },
  { id: 59, test: "CSF RBCs", value: 288, flag: "H" },
  { id: 60, test: "CSF Neutrophils", value: 11, flag: "H" },
  { id: 61, test: "CSF Lymphocytes", value: 64 },
  { id: 62, test: "CSF Monocytes", value: 25 },
  { id: 63, test: "CSF Total Cells Counted", value: 100 },
  // PCR panels for infectious agents
  { id: 64, test: "ESCHERICHIA COLI K1 PCR", value: "Not Detected" },
  { id: 65, test: "HAEMOPHILUS INFLUENZAE PCR", value: "Not Detected" },
  { id: 66, test: "LISTERIA MONOCYTOGENES PCR", value: "Not Detected" },
  { id: 67, test: "Streptococcus agalactiae PCR", value: "Not Detected" },
  { id: 68, test: "STREPTOCOCCUS PNEUMONIAE PCR", value: "Not Detected" },
  { id: 69, test: "CYTOMEGALOVIRUS PCR", value: "Not Detected" },
  { id: 70, test: "ENTEROVIRUS PCR", value: "Not Detected" },
  { id: 71, test: "HERPES SIMPLEX VIRUS 1 PCR", value: "Not Detected" },
  { id: 72, test: "HERPES SIMPLEX VIRUS 2 PCR", value: "Not Detected" },
  { id: 73, test: "HUMAN HERPESVIRUS 6 PCR", value: "Not Detected" },
  { id: 74, test: "HUMAN PARECHOVIRUS PCR", value: "Not Detected" },
  { id: 75, test: "VARICELLA ZOSTER VIRUS PCR", value: "Not Detected" },
  { id: 76, test: "Neisseria meningitidis, PCR", value: "Not Detected" },
  { id: 77, test: "Cryptococcus neoformans/gattii PCR", value: "Not Detected" },
  // Viral serology and screening
  { id: 78, test: "HEPATITIS C AB", value: "Non-Reactive" },
  { id: 79, test: "HIV-1 Antibody", value: "Non-Reactive" },
  { id: 80, test: "HIV 1/2 Antigen / Antibody", value: "Non-Reactive" },
  { id: 81, test: "HIV 2 Ab", value: "Non-Reactive" },
  { id: 82, test: "HIV-1 P24 Ag", value: "Non-Reactive" },
  { id: 83, test: "SARS CoV-2 (Cepheid)", value: "Negative" },
  // Other infection and autoimmune panels
  { id: 84, test: "LYME AB SCREEN", value: "<0.90" },
  { id: 85, test: "RPR (DX) W/REFL TITER AND CONFIRMATORY TESTING", value: "NON-REACTIVE" },
  { id: 86, test: "CMV DNA, QN PCR", value: "Not Detected" },
  { id: 87, test: "EBV DNA, QL PCR", value: "Not Detected" },
  // Cardiac and miscellaneous tests
  { id: 88, test: "EF Teicholz", value: 54 },
  { id: 89, test: "EJ ANTIBODY", value: "<11" },
  { id: 90, test: "Source", value: "CSF" },
  { id: 91, test: "Jo-1 Ab", value: "<11" },
  { id: 92, test: "LVID dias", value: 4.52 },
  { id: 93, test: "MDA-5 Ab", value: "<11" },
  { id: 94, test: "Methods", value: "See Comment" },
  { id: 95, test: "MI-2 Alpha Ab", value: "<11" },
  { id: 96, test: "MI-2 Beta Ab", value: "<11" },
  { id: 97, test: "NXP-2 Ab", value: "<11" },
  { id: 98, test: "OJ Ab", value: "<11" },
  { id: 99, test: "Pediatric Cardiac Event Monitor", value: "Rpt" },
  { id: 100, test: "PL-12 Ab", value: "<11" },
  { id: 101, test: "PL-7 AB", value: "<11" },
  { id: 102, test: "PV Acceleration Time", value: 100 },
  { id: 103, test: "References", value: "See Comment" },
  { id: 104, test: "SRP Ab", value: "<11" },
  { id: 105, test: "MA Vel - Ea, Medial", value: 14.0 },
  { id: 106, test: "Technical Results", value: "See Comment" },
  { id: 107, test: "TIF-1y Ab", value: "<11" },
  { id: 108, test: "Varicella zoster virus Ab.IgM", value: "<1:1" },
  { id: 109, test: "Varicella zoster virus Ab", value: "<1:2" },
  { id: 110, test: "Intrinsic factor", value: "Negative" },
  { id: 111, test: "Aquaporin-4 (AQP4) AB (NMO-IgG), Elisa", value: "Negative" },
  { id: 112, test: "MRI brain", value: "No acute finding" },
  { id: 113, test: "MRI thoracic spine", value: "No acute finding" },
  { id: 114, test: "MRI cervical spine", value: "Long segment nonenhancing intramedullary T2 hyperintensity, predominantly in the posterior aspect of cervical cord seen from C2-C3 intervertebral level to C7 vertebral level" }

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
  // Clear previous results
  allLabsContainer.innerHTML = '';
  // If the search query is empty, don't show any labs (quiz mode)
  if (!query) {
    return;
  }
  // Filter labs by test name, value or flag
  const filtered = labs.filter(item => {
    return (
      item.test.toLowerCase().includes(query) ||
      String(item.value).toLowerCase().includes(query) ||
      (item.flag && String(item.flag).toLowerCase().includes(query))
    );
  });
  // Show a message if nothing matches
  if (filtered.length === 0) {
    const p = document.createElement('p');
    p.className = 'italic text-gray-500';
    p.textContent = 'No results match your search.';
    allLabsContainer.appendChild(p);
    return;
  }
  // Render each matching lab
  filtered.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between border p-2 rounded';
    const left = document.createElement('div');
    const testName = document.createElement('p');
    testName.className = 'font-medium';
    testName.textContent = item.test;
    left.appendChild(testName);
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
    // Only display the test name; dates are omitted in quiz mode
    left.appendChild(testName);
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
  // Export only the test, value and flag columns (dates removed)
  const header = ['Test', 'Value', 'Flag'];
  const rows = myResults.map(item => [item.test, item.value, item.flag || '']);
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
