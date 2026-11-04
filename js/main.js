/* ==========================================================================
   B V Sree Surya Prabha - Portfolio Main Script
   Smooth Animations, Interactivity, Project Modals, Data Canvas
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initParticleCanvas();
  initSkillFilters();
  initSqlSimulation();
  initMobileMenu();
  initScrollNav();
});

/* ----------------- 1. TYPEWRITER EFFECT ----------------- */
function initTypewriter() {
  const words = [
    'Data Analyst',
    'Python & SQL Specialist',
    'Power BI & Tableau Developer',
    'Exploratory Data Analysis (EDA)',
    'Deep Learning & CNN Enthusiast'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Pause before typing next word
    }

    setTimeout(type, delay);
  }

  type();
}

/* ----------------- 2. INTERACTIVE DATA NETWORK CANVAS ----------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('data-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect nearby particles with lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse if close
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.45;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------- 3. SKILL FILTERING ----------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active tab
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'scaleUp 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------- 4. INTERACTIVE SQL SIMULATION ----------------- */
function initSqlSimulation() {
  const runBtn = document.getElementById('run-sql-btn');
  const resultsDiv = document.getElementById('sql-results');
  if (!runBtn || !resultsDiv) return;

  runBtn.addEventListener('click', () => {
    runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing...';
    runBtn.disabled = true;

    resultsDiv.style.opacity = '0.3';

    setTimeout(() => {
      runBtn.innerHTML = '<i class="fa-solid fa-check"></i> Query Executed (1 row in 12ms)';
      resultsDiv.style.opacity = '1';
      showToast('SQL Query executed successfully (12ms)!');

      setTimeout(() => {
        runBtn.innerHTML = '<i class="fa-solid fa-play"></i> Run Query Again';
        runBtn.disabled = false;
      }, 2500);
    }, 600);
  });
}

/* ----------------- 5. MOBILE MENU TOGGLE ----------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    });
  });
}

/* ----------------- 6. ACTIVE NAVBAR SCROLL HIGHLIGHT ----------------- */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'bg-slate-800/80');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'bg-slate-800/80');
      }
    });
  });
}

/* ----------------- 7. PROJECT CASE STUDY MODAL DATA ----------------- */
const projectData = {
  rice: {
    title: 'Rice Type Classification using Deep CNN (95% Accuracy)',
    badge: 'Deep Learning & Agricultural Analytics',
    summary: 'An advanced computer vision and data preprocessing pipeline engineered to accurately distinguish and classify rice grain varieties using Convolutional Neural Networks.',
    highlights: [
      'Preprocessed large-scale high-resolution rice grain image datasets using OpenCV, NumPy, and Pandas.',
      'Implemented data augmentation (random rotation, flips, zoom, and normalizations) to prevent overfitting on under-represented classes.',
      'Architected a multi-layer Convolutional Neural Network with Batch Normalization, MaxPooling, and Dropout layers for spatial feature extraction.',
      'Achieved a verified 95.0% validation accuracy with consistent loss convergence across 20 training epochs.',
      'Generated granular classification reports, confusion matrices, and precision-recall analytics to validate model reliability.'
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'],
    metrics: [
      { label: 'Overall Accuracy', value: '95.0%' },
      { label: 'Classes Identified', value: '5 Grain Varieties' },
      { label: 'Epochs to Convergence', value: '14' }
    ]
  },
  sales: {
    title: 'Business Sales & Revenue BI Dashboard',
    badge: 'Power BI, DAX & Advanced Excel Modeling',
    summary: 'A business intelligence solution designed to convert multi-source transactional spreadsheet records into an executive decision support dashboard.',
    highlights: [
      'Ingested and structured multi-sheet sales records into a clean star schema with fact and dimension tables.',
      'Authored complex DAX calculations for Year-over-Year (YoY) revenue changes, profit margin ratios, and customer retention metrics.',
      'Built multi-tier dynamic filters for date ranges, regional territories, product hierarchies, and sales manager performance.',
      'Employed advanced Excel mechanics (XLOOKUP, nested conditional logic, and pivot cache optimization) for exploratory validation prior to BI ingest.',
      'Delivered intuitive visual storytelling with Pareto analysis charts and automated anomaly detection flags.'
    ],
    tech: ['Power BI', 'DAX Measures', 'Advanced Excel', 'Pivot Tables', 'XLOOKUP', 'Data Modeling'],
    metrics: [
      { label: 'Data Points Tracked', value: '15,000+ Records' },
      { label: 'Report Load Time', value: '< 1.5 seconds' },
      { label: 'Key KPIs Automated', value: '12 Metrics' }
    ]
  },
  webdata: {
    title: 'Relational Database & Full Stack Application Pipeline',
    badge: 'SURE ProEd 6-Month Internship • 9.7/10 GPA',
    summary: 'Production backend database structuring, endpoint integration, and structured data handling completed during the SURE ProEd internship.',
    highlights: [
      'Completed an intensive 6-month internship achieving an exceptional grade point of 9.7/10.0.',
      'Formulated normalized relational database schemas (MySQL) establishing rigorous primary/foreign key constraints to ensure referential integrity.',
      'Structured and tested RESTful API endpoints for seamless frontend-backend data serialization.',
      'Managed codebase repositories using Git and GitHub, conducting peer code reviews and merge resolutions.',
      'Enforced defensive data validation protocols to eliminate redundant records and ensure clean downstream analytics.'
    ],
    tech: ['MySQL', 'Database Architecture', 'Git & GitHub', 'RESTful APIs', 'Software Engineering'],
    metrics: [
      { label: 'Internship GPA', value: '9.7 / 10.0' },
      { label: 'Duration', value: '6 Months' },
      { label: 'Version Control', value: 'GitHub Workflows' }
    ]
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const data = projectData[projectId];

  if (!modal || !data) return;

  modalTitle.textContent = data.title;

  let metricsHtml = '<div class="grid grid-cols-3 gap-3 my-4">';
  data.metrics.forEach(m => {
    metricsHtml += `
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
        <span class="text-[11px] text-slate-400 block">${m.label}</span>
        <span class="text-base sm:text-lg font-bold font-mono text-cyan-400">${m.value}</span>
      </div>
    `;
  });
  metricsHtml += '</div>';

  let listHtml = '<ul class="space-y-2 list-disc list-inside text-slate-300 text-xs sm:text-sm">';
  data.highlights.forEach(h => {
    listHtml += `<li>${h}</li>`;
  });
  listHtml += '</ul>';

  let tagsHtml = '<div class="flex flex-wrap gap-1.5 pt-3">';
  data.tech.forEach(t => {
    tagsHtml += `<span class="tech-tag">${t}</span>`;
  });
  tagsHtml += '</div>';

  modalBody.innerHTML = `
    <div class="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
      ${data.badge}
    </div>
    <p class="text-sm text-slate-200 leading-relaxed mt-2">${data.summary}</p>
    ${metricsHtml}
    <h4 class="font-bold text-white text-sm mt-4 mb-2 flex items-center gap-2">
      <i class="fa-solid fa-list-check text-emerald-400"></i> Technical Execution & Outcomes:
    </h4>
    ${listHtml}
    <div class="mt-4 pt-3 border-t border-slate-800">
      <span class="text-xs font-mono text-slate-400 block mb-2">Technologies & Tooling:</span>
      ${tagsHtml}
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.add('hidden');
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

/* ----------------- 8. COPY TO CLIPBOARD & TOAST ----------------- */
function copyToClipboard(text, customMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(customMessage || 'Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy. Please manually copy.');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

/* ----------------- 9. CONTACT FORM SUBMISSION ----------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value || 'Portfolio Contact';
  const message = document.getElementById('contact-message').value;
  const submitBtn = document.getElementById('submit-btn');

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Note...';

  // Open default mail client with prefilled details
  setTimeout(() => {
    const mailtoUrl = `mailto:b.v.sweety25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    showToast('Opening your email client to deliver message...');
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Prepared!';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      document.getElementById('contact-form').reset();
    }, 3000);
  }, 600);
}
