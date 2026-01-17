// Simulated live data
let isConnected = false;
let interval;

const commonCodes = [
  { code: "P0300", desc: "Random/Multiple Cylinder Misfire Detected", fix: "Check spark plugs, ignition coils, fuel injectors." },
  { code: "P0420", desc: "Catalyst System Efficiency Below Threshold", fix: "Catalytic converter may need replacement." },
  { code: "P0171", desc: "System Too Lean (Bank 1)", fix: "Check for vacuum leaks, clean MAF sensor." },
  { code: "P0440", desc: "Evaporative Emission Control System Malfunction", fix: "Check gas cap, purge valve, charcoal canister." }
];

// Connect simulation
document.getElementById('scan-btn').addEventListener('click', () => {
  if (!isConnected) {
    isConnected = true;
    document.body.classList.add('connected');
    document.getElementById('connection-status').textContent = 'Connected';
    document.querySelector('.status-icon').style.color = '#27ae60';
    startLiveData();
    scanForCodes();
    document.getElementById('clear-btn').disabled = false;
  } else {
    scanForCodes();
  }
});

document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('codes-list').innerHTML = '<p>All codes cleared! Vehicle ready.</p>';
  document.getElementById('clear-btn').disabled = true;
});

function startLiveData() {
  interval = setInterval(() => {
    document.getElementById('rpm').textContent = Math.floor(Math.random() * 4000 + 800);
    document.getElementById('speed').textContent = Math.floor(Math.random() * 160);
    document.getElementById('coolant').textContent = Math.floor(Math.random() * 40 + 70);
    document.getElementById('voltage').textContent = (12 + Math.random() * 2.4).toFixed(1);
  }, 1000);
}

function scanForCodes() {
  const list = document.getElementById('codes-list');
  list.innerHTML = '<p>Scanning vehicle...</p>';
  
  setTimeout(() => {
    const numCodes = Math.floor(Math.random() * 4);
    if (numCodes === 0) {
      list.innerHTML = '<p style="color:#27ae60;">No fault codes detected. Vehicle is healthy!</p>';
    } else {
      list.innerHTML = '';
      for (let i = 0; i < numCodes; i++) {
        const code = commonCodes[Math.floor(Math.random() * commonCodes.length)];
        const div = document.createElement('div');
        div.className = 'code-item';
        div.innerHTML = `
          <h3>${code.code}</h3>
          <p><strong>Description:</strong> ${code.desc}</p>
          <p><strong>Possible Fix:</strong> ${code.fix}</p>
        `;
        list.appendChild(div);
      }
    }
  }, 2000);
}