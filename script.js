/* ARTEMIS-RCL — Advanced interactive system with particles, animations, and enhanced simulator */

// DOM ready helper
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // 1. PARTICLE SYSTEM
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
  }

  // 2. FOOTER YEAR
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // 3. REVEAL ON SCROLL
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });
  reveals.forEach((el) => io.observe(el));

  // 4. ANIMATED NUMBER COUNTERS
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.floor(eased * target);
          entry.target.textContent = current.toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        statsIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statValues.forEach(el => statsIO.observe(el));

  // 5. FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });

  // 6. ENHANCED SIMULATOR WITH 12 WASTE TYPES
  const items = Array.from(document.querySelectorAll('.inv-item'));
  const machine = document.querySelector('.machine');
  const batchEl = document.querySelector('.batch');
  const recEl = document.querySelector('.recommendations');
  const clearBtn = document.querySelector('.btn-sim.clear');
  const processBtn = document.querySelector('.btn-sim.process');
  const totalWeightEl = document.getElementById('total-weight');
  const itemsCountEl = document.getElementById('items-count');
  const efficiencyScoreEl = document.getElementById('efficiency-score');
  const machineStatus = document.querySelector('.machine-status');
  const energyFill = document.querySelector('[data-metric="energy"]');
  const recoveryFill = document.querySelector('[data-metric="recovery"]');
  const efficiencyFill = document.querySelector('[data-metric="efficiency"]');
  const energyValue = document.querySelectorAll('.metric-value')[0];
  const recoveryValue = document.querySelectorAll('.metric-value')[1];
  const efficiencyValue = document.querySelectorAll('.metric-value')[2];

  const iconFor = (type) => {
    const icons = {
      aluminum: '#icon-can',
      textiles: '#icon-fabric',
      eva: '#icon-helmet',
      packaging: '#icon-box',
      'plastic-film': '#icon-plastic',
      'carbon-fiber': '#icon-composite',
      electronics: '#icon-chip',
      glass: '#icon-glass',
      rubber: '#icon-rubber',
      composite: '#icon-structure',
      insulation: '#icon-insulation',
      filters: '#icon-filter',
      batteries: '#icon-battery',
      wiring: '#icon-wire',
      carbon: '#icon-carbon'
    };
    return icons[type] || '#icon-gear';
  };

  const recipes = {
    aluminum: [
      { label: 'Metal Containers', icon: '#icon-bin' },
      { label: 'Structural Brackets', icon: '#icon-wrench' },
      { label: 'Heat Exchangers', icon: '#icon-gear' },
      { label: 'Tool Handles', icon: '#icon-utensils' },
    ],
    textiles: [
      { label: 'Thermal Insulation', icon: '#icon-insulation' },
      { label: 'Storage Bags', icon: '#icon-bin' },
      { label: 'Decorative Fabric', icon: '#icon-fabric' },
      { label: 'Filter Media', icon: '#icon-filter' },
    ],
    eva: [
      { label: 'Seal Gaskets', icon: '#icon-wrench' },
      { label: 'Filter Housing', icon: '#icon-bin' },
      { label: 'Ergonomic Grips', icon: '#icon-utensils' },
      { label: 'Vibration Dampers', icon: '#icon-rubber' },
    ],
    packaging: [
      { label: 'Modular Organizers', icon: '#icon-bin' },
      { label: 'Plant Containers', icon: '#icon-chair' },
      { label: 'Wall Panels', icon: '#icon-insulation' },
      { label: 'Storage Boxes', icon: '#icon-box' },
    ],
    'plastic-film': [
      { label: 'Waterproof Liners', icon: '#icon-plastic' },
      { label: 'Protective Covers', icon: '#icon-fabric' },
      { label: 'Sealant Strips', icon: '#icon-wrench' },
      { label: 'Temporary Partitions', icon: '#icon-structure' },
    ],
    'carbon-fiber': [
      { label: 'Structural Beams', icon: '#icon-structure' },
      { label: 'Reinforcement Plates', icon: '#icon-composite' },
      { label: 'Tool Fixtures', icon: '#icon-wrench' },
      { label: 'Bracket Supports', icon: '#icon-gear' },
    ],
    electronics: [
      { label: 'Circuit Boards', icon: '#icon-chip' },
      { label: 'Sensor Housings', icon: '#icon-bin' },
      { label: 'Connector Parts', icon: '#icon-wire' },
      { label: 'Control Panels', icon: '#icon-gear' },
    ],
    glass: [
      { label: 'Observation Windows', icon: '#icon-glass' },
      { label: 'Light Diffusers', icon: '#icon-lightning' },
      { label: 'Lab Equipment', icon: '#icon-gear' },
      { label: 'Decorative Elements', icon: '#icon-utensils' },
    ],
    rubber: [
      { label: 'Seal Rings', icon: '#icon-rubber' },
      { label: 'Vibration Mounts', icon: '#icon-wrench' },
      { label: 'Gaskets', icon: '#icon-gear' },
      { label: 'Protective Caps', icon: '#icon-bin' },
    ],
    composite: [
      { label: 'Habitat Panels', icon: '#icon-structure' },
      { label: 'Storage Shelves', icon: '#icon-chair' },
      { label: 'Work Surfaces', icon: '#icon-utensils' },
      { label: 'Equipment Mounts', icon: '#icon-gear' },
    ],
    insulation: [
      { label: 'Thermal Blankets', icon: '#icon-insulation' },
      { label: 'Acoustic Panels', icon: '#icon-structure' },
      { label: 'Pipe Wraps', icon: '#icon-wrench' },
      { label: 'Wall Liners', icon: '#icon-fabric' },
    ],
    filters: [
      { label: 'Air Purifiers', icon: '#icon-filter' },
      { label: 'Water Filters', icon: '#icon-gear' },
      { label: 'Vent Covers', icon: '#icon-bin' },
      { label: 'Dust Collectors', icon: '#icon-insulation' },
    ],
    batteries: [
      { label: 'Power Cells', icon: '#icon-battery' },
      { label: 'Energy Storage', icon: '#icon-lightning' },
      { label: 'Backup Systems', icon: '#icon-chip' },
      { label: 'Portable Power', icon: '#icon-wire' },
    ],
    wiring: [
      { label: 'Electrical Conduit', icon: '#icon-wire' },
      { label: 'Data Cables', icon: '#icon-chip' },
      { label: 'Connection Harnesses', icon: '#icon-gear' },
      { label: 'Sensor Wiring', icon: '#icon-lightning' },
    ],
    carbon: [
      { label: 'Reinforcement Fibers', icon: '#icon-carbon' },
      { label: 'Filter Media', icon: '#icon-filter' },
      { label: 'Conductive Paste', icon: '#icon-wire' },
      { label: 'Lubricant Additive', icon: '#icon-gear' },
    ]
  };

  const batch = [];
  let processing = false;

  function capitalize(s) { 
    return s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); 
  }

  function updateStats() {
    const totalWeight = batch.reduce((sum, item) => {
      const el = document.querySelector(`[data-type="${item.type}"]`);
      return sum + (parseInt(el?.getAttribute('data-weight')) || 0);
    }, 0);
    const itemsCount = batch.length;

    if (totalWeightEl) totalWeightEl.textContent = `${totalWeight} g`;
    if (itemsCountEl) itemsCountEl.textContent = itemsCount;

    // Calculate efficiency based on material diversity
    const uniqueTypes = new Set(batch.map(item => item.type)).size;
    const efficiency = Math.min(95, 60 + (uniqueTypes * 3) + (itemsCount * 2));
    
    if (efficiencyScoreEl) efficiencyScoreEl.textContent = `${efficiency}%`;

    // Enable/disable process button
    if (processBtn) {
      processBtn.disabled = itemsCount === 0 || processing;
    }

    // Update energy and recovery metrics
    const energyKw = Math.min(18, (totalWeight / 1000) * 2.5).toFixed(1);
    const recovery = Math.min(91, 75 + (uniqueTypes * 2) + (itemsCount * 1.5));

    if (energyFill) energyFill.style.width = `${(energyKw / 18) * 100}%`;
    if (recoveryFill) recoveryFill.style.width = `${recovery}%`;
    if (efficiencyFill) efficiencyFill.style.width = `${efficiency}%`;
    if (energyValue) energyValue.textContent = `${energyKw} kW`;
    if (recoveryValue) recoveryValue.textContent = `${recovery}%`;
    if (efficiencyValue) efficiencyValue.textContent = `${efficiency}%`;
  }

  function renderBatch() {
    if (!batchEl) return;
    batchEl.innerHTML = '';
    if (batch.length === 0) {
      batchEl.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center;">No items in batch yet.<br>Drag materials from the inventory.</p>';
      return;
    }
    for (const item of batch) {
      const el = document.createElement('div');
      el.className = 'badge';
      el.innerHTML = `<svg width="20" height="20" aria-hidden="true"><use href="${iconFor(item.type)}"/></svg><span>${capitalize(item.type)}</span>`;
      batchEl.appendChild(el);
    }
  }

  function renderRecommendations() {
    if (!recEl) return;
    recEl.innerHTML = '';
    if (batch.length === 0) {
      recEl.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 12px; text-align: center;">Process materials to see output products.</p>';
      return;
    }

    const seen = new Set();
    const materialCounts = {};
    
    // Count materials for weighted recommendations
    batch.forEach(item => {
      materialCounts[item.type] = (materialCounts[item.type] || 0) + 1;
    });

    // Sort materials by count (most abundant first)
    const sortedMaterials = Object.entries(materialCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    for (const [materialType] of sortedMaterials) {
      const opts = recipes[materialType] || [];
      for (const o of opts) {
        const key = `${o.label}|${o.icon}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const entry = document.createElement('div');
        entry.className = 'rec';
        entry.innerHTML = `<svg width="24" height="24" aria-hidden="true"><use href="${o.icon}"/></svg><span>${o.label}</span>`;
        recEl.appendChild(entry);
        
        // Limit to 8 recommendations
        if (seen.size >= 8) break;
      }
      if (seen.size >= 8) break;
    }
  }

  function addToBatch(type) {
    if (!type || processing) return;
    batch.push({ type, id: Date.now() });
    renderBatch();
    updateStats();
    machine?.classList.add('dragover');
    setTimeout(() => machine?.classList.remove('dragover'), 300);
  }

  function processBatch() {
    if (batch.length === 0 || processing) return;
    processing = true;
    machine?.classList.add('processing');
    if (machineStatus) machineStatus.textContent = 'PROCESSING';
    if (processBtn) processBtn.disabled = true;

    setTimeout(() => {
      processing = false;
      machine?.classList.remove('processing');
      if (machineStatus) machineStatus.textContent = 'COMPLETE';
      renderRecommendations();

      setTimeout(() => {
        if (machineStatus) machineStatus.textContent = 'READY';
      }, 2000);
    }, 3500);
  }

  function clearBatch() {
    batch.length = 0;
    processing = false;
    machine?.classList.remove('processing', 'dragover');
    if (machineStatus) machineStatus.textContent = 'READY';
    renderBatch();
    renderRecommendations();
    updateStats();
  }

  // Drag and drop
  items.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer?.setData('text/plain', item.getAttribute('data-type') || '');
      item.setAttribute('aria-grabbed', 'true');
      item.style.opacity = '0.4';
    });
    item.addEventListener('dragend', () => {
      item.setAttribute('aria-grabbed', 'false');
      item.style.opacity = '1';
    });
    // Keyboard support
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        addToBatch(item.getAttribute('data-type'));
      }
    });
  });

  if (machine) {
    ['dragenter', 'dragover'].forEach((ev) => machine.addEventListener(ev, (e) => {
      e.preventDefault();
      if (!processing) machine.classList.add('dragover');
    }));

    ['dragleave', 'drop'].forEach((ev) => machine.addEventListener(ev, () => {
      if (!processing) machine.classList.remove('dragover');
    }));

    machine.addEventListener('drop', (e) => {
      e.preventDefault();
      const type = e.dataTransfer?.getData('text/plain');
      addToBatch(type || undefined);
    });
  }

  // Buttons
  processBtn?.addEventListener('click', processBatch);
  clearBtn?.addEventListener('click', clearBatch);

  // 7. NASA RESOURCE LINK TRACKING
  document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // You can add analytics tracking here
      console.log('Resource accessed:', e.target.href);
    });
  });

  // 8. NASA BADGE ANIMATION
  function createNASABadgeAnimation() {
    const badges = document.querySelectorAll('.nasa-badge');
    badges.forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.1)';
      });
      badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1)';
      });
    });
  }
  createNASABadgeAnimation();

  // Initial render
  renderBatch();
  renderRecommendations();
  updateStats();
});
