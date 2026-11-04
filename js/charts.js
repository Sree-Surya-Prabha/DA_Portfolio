/* ==========================================================================
   B V Sree Surya Prabha - Interactive Analytics Lab Charts (Chart.js)
   Renders dynamic data visualizations showcasing data analysis acumen
   ========================================================================== */

let currentChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize default chart
  renderModelChart();
});

// Switch chart handler
function switchChart(type) {
  // Update button active state
  const buttons = document.querySelectorAll('.chart-switcher-btn');
  buttons.forEach(b => b.classList.remove('active'));

  const activeBtn = document.getElementById(`btn-chart-${type}`);
  if (activeBtn) activeBtn.classList.add('active');

  const caption = document.getElementById('chart-caption');

  if (type === 'model') {
    if (caption) {
      caption.innerHTML = '<i class="fa-solid fa-chart-line text-cyan-400"></i> CNN Training & Validation Accuracy across 20 Epochs (Final: 95.0%)';
    }
    renderModelChart();
  } else if (type === 'skills') {
    if (caption) {
      caption.innerHTML = '<i class="fa-solid fa-asterisk text-emerald-400"></i> Multidisciplinary Competency Distribution (Radar Matrix)';
    }
    renderSkillsChart();
  } else if (type === 'eda') {
    if (caption) {
      caption.innerHTML = '<i class="fa-solid fa-chart-column text-amber-400"></i> ETL & Data Cleaning Pipeline Processing Speed (Records / Sec)';
    }
    renderEdaChart();
  }
}

/* ----------------- 1. MODEL PERFORMANCE (CNN 95% ACCURACY) ----------------- */
function renderModelChart() {
  const canvas = document.getElementById('interactive-analytics-chart');
  if (!canvas) return;

  if (currentChartInstance) {
    currentChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');

  const epochs = Array.from({ length: 20 }, (_, i) => `Epoch ${i + 1}`);
  const trainAcc = [
    54.2, 61.8, 68.4, 74.1, 79.2, 82.5, 85.1, 87.8, 89.4, 91.0,
    92.2, 93.1, 94.0, 94.8, 95.5, 96.0, 96.4, 96.8, 97.2, 97.5
  ];
  const valAcc = [
    52.0, 59.5, 66.2, 72.8, 77.0, 80.9, 83.7, 86.4, 88.0, 89.5,
    90.8, 91.9, 92.8, 93.5, 94.1, 94.4, 94.6, 94.8, 94.9, 95.0
  ];

  // Gradients
  const cyanGradient = ctx.createLinearGradient(0, 0, 0, 350);
  cyanGradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
  cyanGradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

  const emeraldGradient = ctx.createLinearGradient(0, 0, 0, 350);
  emeraldGradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  emeraldGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  currentChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: epochs,
      datasets: [
        {
          label: 'Validation Accuracy (%)',
          data: valAcc,
          borderColor: '#10b981',
          backgroundColor: emeraldGradient,
          fill: true,
          tension: 0.38,
          borderWidth: 2.5,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#10b981'
        },
        {
          label: 'Training Accuracy (%)',
          data: trainAcc,
          borderColor: '#06b6d4',
          backgroundColor: cyanGradient,
          fill: true,
          tension: 0.38,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: '#06b6d4'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e1',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 },
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(51, 65, 85, 0.25)' },
          ticks: {
            color: '#64748b',
            font: { family: 'JetBrains Mono', size: 10 },
            maxTicksLimit: 10
          }
        },
        y: {
          min: 45,
          max: 100,
          grid: { color: 'rgba(51, 65, 85, 0.25)' },
          ticks: {
            color: '#64748b',
            font: { family: 'JetBrains Mono', size: 10 },
            callback: value => `${value}%`
          }
        }
      }
    }
  });
}

/* ----------------- 2. TECHNICAL COMPETENCY RADAR ----------------- */
function renderSkillsChart() {
  const canvas = document.getElementById('interactive-analytics-chart');
  if (!canvas) return;

  if (currentChartInstance) {
    currentChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');

  currentChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'SQL / MySQL',
        'Python & Pandas',
        'Advanced Excel',
        'Power BI & DAX',
        'Data Cleaning (EDA)',
        'Machine Learning / CNN',
        'Git & CI/CD Pipelines'
      ],
      datasets: [
        {
          label: 'Proficiency Benchmark',
          data: [92, 90, 95, 88, 93, 85, 87],
          fill: true,
          backgroundColor: 'rgba(6, 182, 212, 0.25)',
          borderColor: '#06b6d4',
          pointBackgroundColor: '#06b6d4',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#06b6d4',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e1',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 }
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(51, 65, 85, 0.35)' },
          grid: { color: 'rgba(51, 65, 85, 0.35)' },
          pointLabels: {
            color: '#e2e8f0',
            font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 }
          },
          ticks: {
            display: false,
            min: 0,
            max: 100
          }
        }
      }
    }
  });
}

/* ----------------- 3. DATA CLEANING & ETL PIPELINE THROUGHPUT ----------------- */
function renderEdaChart() {
  const canvas = document.getElementById('interactive-analytics-chart');
  if (!canvas) return;

  if (currentChartInstance) {
    currentChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');

  currentChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Schema Ingestion',
        'Deduplication',
        'Null Imputation',
        'Outlier Truncation',
        'Feature Scaling',
        'Aggregation & Export'
      ],
      datasets: [
        {
          label: 'Records Processed / Sec (Pandas vs Python Pure)',
          data: [125000, 94000, 110000, 87000, 142000, 105000],
          backgroundColor: [
            'rgba(6, 182, 212, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(99, 102, 241, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(20, 184, 166, 0.8)'
          ],
          borderRadius: 8,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e1',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 }
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return ` Throughput: ${context.parsed.y.toLocaleString()} rows/sec`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 10, weight: 500 }
          }
        },
        y: {
          grid: { color: 'rgba(51, 65, 85, 0.25)' },
          ticks: {
            color: '#64748b',
            font: { family: 'JetBrains Mono', size: 10 },
            callback: value => `${(value / 1000).toFixed(0)}k/s`
          }
        }
      }
    }
  });
}
