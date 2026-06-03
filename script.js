/**
 * LeaderTech — Ship Management AI
 * Website Interaction Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // ELEMENTS
  // ============================================
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const tabButtons = document.querySelectorAll('.surface-item');
  const pvTitle = document.getElementById('pvTitle');
  const pvBody = document.getElementById('pvBody');
  const pvFoot = document.getElementById('pvFoot');
  const promptForm = document.getElementById('promptForm');
  const promptInput = document.getElementById('promptInput');
  const generateBtn = document.getElementById('generateBtn');
  const hint = document.getElementById('hint');
  const toast = document.getElementById('toast');
  const sections = document.querySelectorAll('[data-layer]');

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once in case page starts scrolled

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuToggle.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('is-open') && !mobileNav.contains(e.target) && e.target !== menuToggle) {
        menuToggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile nav when clicking links
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================
  // SURFACE TABS DATA
  // ============================================
  const surfaceData = {
    ops: {
      title: 'Fleet Operations',
      foot: 'Outputs remain anchored to source messages and documents. Human review stays explicit.',
      body: `
        <div class="pv">
          <div class="pvNav">
            <p class="pvNav__h">Voyages</p>
            <button class="pvNav__item is-on" type="button">
              <span>LT DIMMARE</span>
              <span class="pvNav__badge">Active</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>LT BRIGHT</span>
              <span class="pvNav__badge">12h ETA</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>LT GLORY</span>
              <span class="pvNav__badge">Berth</span>
            </button>
          </div>
          <div class="pvMain">
            <div class="pvMain__bar">
              <strong>LT DIMMARE</strong>
              <span>Voyage 42-B</span>
            </div>
            <div class="pvMain__grid">
              <div class="pvCard">
                <p class="pvCard__t">Ops Plan</p>
                <div class="pvRow"><span>ETA Rotterdam</span><em>04 Jun 18:00</em></div>
                <div class="pvRow"><span>Speed Target</span><em>14.2 kn</em></div>
                <div class="pvRow"><span>Berth Status</span><em>Confirmed</em></div>
              </div>
              <div class="pvCard">
                <p class="pvCard__t">Exceptions</p>
                <div class="pvRow"><span>Weather Alert</span><em>Force 6 NW</em></div>
                <div class="pvRow"><span>Action Required</span><em>Route +2°S</em></div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    tech: {
      title: 'Technical Management',
      foot: 'Diagnostics reference real-time telemetry and equipment manuals.',
      body: `
        <div class="pv">
          <div class="pvNav">
            <p class="pvNav__h">Defects</p>
            <button class="pvNav__item is-on" type="button">
              <span>ME Aux Blower</span>
              <span class="pvNav__badge">Critical</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>No. 2 Gen</span>
              <span class="pvNav__badge">Pending</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>Bilge Pump</span>
              <span class="pvNav__badge">OK</span>
            </button>
          </div>
          <div class="pvMain">
            <div class="pvMain__bar">
              <strong>ME Aux Blower</strong>
              <span>ID: 411.02.01</span>
            </div>
            <div class="pvMain__grid">
              <div class="pvCard">
                <p class="pvCard__t">Maintenance Status</p>
                <div class="pvRow"><span>Job Type</span><em>Corrective</em></div>
                <div class="pvRow"><span>Parts Req.</span><em>In Transit</em></div>
                <div class="pvRow"><span>Target Date</span><em>08 Jun 2026</em></div>
              </div>
              <div class="pvCard">
                <p class="pvCard__t">AI Diagnostic</p>
                <div class="pvRow"><span>Observation</span><em>High Temp</em></div>
                <div class="pvRow"><span>Confidence</span><em>94%</em></div>
                <div class="pvRow"><span>Recommendation</span><em>Replace Bearing</em></div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    hsqe: {
      title: 'HSQE Compliance',
      foot: 'Evidence trail is fully cryptographically hash-logged for inspection security.',
      body: `
        <div class="pv">
          <div class="pvNav">
            <p class="pvNav__h">Audits</p>
            <button class="pvNav__item is-on" type="button">
              <span>SIRE 2.0 Prep</span>
              <span class="pvNav__badge">88%</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>PSC Rotterdam</span>
              <span class="pvNav__badge">Closed</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>Drill Record</span>
              <span class="pvNav__badge">Overdue</span>
            </button>
          </div>
          <div class="pvMain">
            <div class="pvMain__bar">
              <strong>SIRE 2.0 Prep</strong>
              <span>Vessel: LT DIMMARE</span>
            </div>
            <div class="pvMain__grid">
              <div class="pvCard">
                <p class="pvCard__t">Compliance Tracking</p>
                <div class="pvRow"><span>Chapters Done</span><em>11 / 12</em></div>
                <div class="pvRow"><span>Observations</span><em>1 Minor</em></div>
                <div class="pvRow"><span>Status</span><em>Ready</em></div>
              </div>
              <div class="pvCard">
                <p class="pvCard__t">Evidence Capture</p>
                <div class="pvRow"><span>Calibration Cert</span><em>Verified</em></div>
                <div class="pvRow"><span>AI Verification</span><em>Match 100%</em></div>
                <div class="pvRow"><span>Expiry Date</span><em>15 Dec 2026</em></div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    proc: {
      title: 'Purchasing & Procurement',
      foot: 'Purchase approvals match dynamic vendor pricing and ETA windows.',
      body: `
        <div class="pv">
          <div class="pvNav">
            <p class="pvNav__h">Requisitions</p>
            <button class="pvNav__item is-on" type="button">
              <span>Req 2026-881</span>
              <span class="pvNav__badge">Pending</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>Req 2026-840</span>
              <span class="pvNav__badge">Approved</span>
            </button>
            <button class="pvNav__item" type="button">
              <span>Req 2026-799</span>
              <span class="pvNav__badge">PO Sent</span>
            </button>
          </div>
          <div class="pvMain">
            <div class="pvMain__bar">
              <strong>Requisition 2026-881</strong>
              <span>Spare Parts - Main Engine</span>
            </div>
            <div class="pvMain__grid">
              <div class="pvCard">
                <p class="pvCard__t">RFQ Comparison</p>
                <div class="pvRow"><span>Vendor A (Rtd)</span><em>$12,450 (3d)</em></div>
                <div class="pvRow"><span>Vendor B (Ham)</span><em>$11,900 (5d)</em></div>
                <div class="pvRow"><span>Recommendation</span><em>Vendor A (Time)</em></div>
              </div>
              <div class="pvCard">
                <p class="pvCard__t">AI Decision Support</p>
                <div class="pvRow"><span>Budget Check</span><em>Approved</em></div>
                <div class="pvRow"><span>Lead Time Check</span><em>Matches ETA</em></div>
                <div class="pvRow"><span>Action Rec.</span><em>Approve RFQ</em></div>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // ============================================
  // TABS SWITCHING LOGIC
  // ============================================
  const switchTab = (surfaceId) => {
    const data = surfaceData[surfaceId];
    if (!data) return;

    // Update button classes
    tabButtons.forEach(btn => {
      const active = btn.getAttribute('data-surface') === surfaceId;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.setAttribute('tabindex', active ? '0' : '-1');
    });

    // Update panel HTML
    pvTitle.textContent = data.title;
    pvBody.innerHTML = data.body;
    pvFoot.textContent = data.foot;
  };

  // Add click listener for tab headers
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const surfaceId = btn.getAttribute('data-surface');
      switchTab(surfaceId);
    });
  });

  // Initialize first tab
  switchTab('ops');

  // Interactive sub-items inside preview container
  if (pvBody) {
    pvBody.addEventListener('click', (e) => {
      const navItem = e.target.closest('.pvNav__item');
      if (navItem && !navItem.classList.contains('is-on')) {
        const parent = navItem.parentNode;
        parent.querySelectorAll('.pvNav__item').forEach(item => item.classList.remove('is-on'));
        navItem.classList.add('is-on');

        const label = navItem.querySelector('span').textContent.trim();
        
        // Update bar strong text
        const barStrong = pvBody.querySelector('.pvMain__bar strong');
        if (barStrong) barStrong.textContent = label;

        // Update card metrics for premium interactivity
        const valueCells = pvBody.querySelectorAll('.pvCard .pvRow em');
        const titleCells = pvBody.querySelectorAll('.pvCard .pvCard__t');
        
        if (label === 'LT BRIGHT') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = '05 Jun 06:00';
            valueCells[1].textContent = '12.8 kn';
            valueCells[2].textContent = 'Pending Port Clear';
            valueCells[3].textContent = 'Congestion Alert';
            valueCells[4].textContent = 'Delay ETA 2h';
          }
        } else if (label === 'LT GLORY') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = '03 Jun 08:30 (Arrived)';
            valueCells[1].textContent = '0.0 kn';
            valueCells[2].textContent = 'At Berth 4';
            valueCells[3].textContent = 'Cargo Ops Started';
            valueCells[4].textContent = 'Monitor Rate';
          }
        } else if (label === 'LT DIMMARE') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = '04 Jun 18:00';
            valueCells[1].textContent = '14.2 kn';
            valueCells[2].textContent = 'Confirmed';
            valueCells[3].textContent = 'Force 6 NW';
            valueCells[4].textContent = 'Route +2°S';
          }
        } else if (label === 'No. 2 Gen') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Planned/Preventive';
            valueCells[1].textContent = 'On Board';
            valueCells[2].textContent = '10 Jun 2026';
            valueCells[3].textContent = 'Routine 1000h filter';
            valueCells[4].textContent = '99% (Low risk)';
            valueCells[5].textContent = 'Schedule at next port';
          }
        } else if (label === 'Bilge Pump') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Inspection';
            valueCells[1].textContent = 'None required';
            valueCells[2].textContent = '12 Jun 2026';
            valueCells[3].textContent = 'Flow rate normal';
            valueCells[4].textContent = '100% (Clean)';
            valueCells[5].textContent = 'Keep monitoring';
          }
        } else if (label === 'ME Aux Blower') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Corrective';
            valueCells[1].textContent = 'In Transit';
            valueCells[2].textContent = '08 Jun 2026';
            valueCells[3].textContent = 'High Temp';
            valueCells[4].textContent = '94%';
            valueCells[5].textContent = 'Replace Bearing';
          }
        } else if (label === 'PSC Rotterdam') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'All Chapters';
            valueCells[1].textContent = '0 Open Deficiencies';
            valueCells[2].textContent = 'Closed 29 May';
            valueCells[3].textContent = 'Official report logged';
            valueCells[4].textContent = 'Match verified';
            valueCells[5].textContent = 'Valid 6 Months';
          }
        } else if (label === 'Drill Record') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Fire Drill';
            valueCells[1].textContent = '1 Overdue';
            valueCells[2].textContent = 'Target: 01 Jun';
            valueCells[3].textContent = 'Crew rotation lapse';
            valueCells[4].textContent = 'Flag warning';
            valueCells[5].textContent = 'Schedule immediately';
          }
        } else if (label === 'SIRE 2.0 Prep') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = '11 / 12';
            valueCells[1].textContent = '1 Minor';
            valueCells[2].textContent = 'Ready';
            valueCells[3].textContent = 'Calibration Cert';
            valueCells[4].textContent = 'Match 100%';
            valueCells[5].textContent = '15 Dec 2026';
          }
        } else if (label === 'Req 2026-840') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Vendor B (Hamburg)';
            valueCells[1].textContent = '$11,900 (5d)';
            valueCells[2].textContent = 'Vendor B (Budget)';
            valueCells[3].textContent = 'Approved';
            valueCells[4].textContent = 'In budget range';
            valueCells[5].textContent = 'Sign-off complete';
          }
        } else if (label === 'Req 2026-799') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Vendor C (Sgp)';
            valueCells[1].textContent = '$8,400 (10d)';
            valueCells[2].textContent = 'PO Issued';
            valueCells[3].textContent = 'Sent to Shipyard';
            valueCells[4].textContent = 'Tracking active';
            valueCells[5].textContent = 'ETA aligned';
          }
        } else if (label === 'Req 2026-881') {
          if (valueCells.length >= 5) {
            valueCells[0].textContent = 'Vendor A (Rtd)';
            valueCells[1].textContent = '$12,450 (3d)';
            valueCells[2].textContent = 'Vendor A (Time)';
            valueCells[3].textContent = 'Approved';
            valueCells[4].textContent = 'Matches ETA';
            valueCells[5].textContent = 'Approve RFQ';
          }
        }
      }
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR SECTION FADE-IN
  // ============================================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback if IntersectionObserver isn't supported
    sections.forEach(section => section.classList.add('is-active'));
  }

  // ============================================
  // ASK AI DEMO PROMPT SUBMISSION
  // ============================================
  let toastTimeout;
  if (promptForm && promptInput && generateBtn && toast) {
    promptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = promptInput.value.trim();
      if (!query) return;

      // Set loading state
      const originalText = generateBtn.innerHTML;
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span class="btn-label">Analyzing...</span>';
      promptInput.disabled = true;

      // Clear any pending toast hide timeout
      clearTimeout(toastTimeout);

      setTimeout(() => {
        let responseText = "LeaderTech AI: Fleet analysis complete. 12/12 vessels reporting within safe thresholds.";
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('sire') || lowerQuery.includes('compliance')) {
          responseText = "AI Compliance: LT Dimmare SIRE 2.0 readiness is 88%. Calibration certs verified; 1 minor observation open.";
        } else if (lowerQuery.includes('blower') || lowerQuery.includes('aux') || lowerQuery.includes('defect') || lowerQuery.includes('temp')) {
          responseText = "Technical Alert: ME Aux Blower bearing temp elevated (94°C). Recommended replacement on 08 Jun arrival.";
        } else if (lowerQuery.includes('eta') || lowerQuery.includes('port') || lowerQuery.includes('ops') || lowerQuery.includes('dimmare') || lowerQuery.includes('vessel')) {
          responseText = "Operations Update: LT Dimmare ETA Rotterdam is 04 Jun 18:00. Berth confirmed; speed optimal at 14.2 kn.";
        } else if (lowerQuery.includes('req') || lowerQuery.includes('rfq') || lowerQuery.includes('purchase') || lowerQuery.includes('procure') || lowerQuery.includes('money') || lowerQuery.includes('vendor')) {
          responseText = "Purchasing Decision: RFQ 2026-881 Vendor A chosen ($12,450, 3d lead time). Selected to match port ETA window.";
        }

        // Display toast
        toast.textContent = responseText;
        toast.classList.add('show');

        // Reset elements
        generateBtn.disabled = false;
        generateBtn.innerHTML = originalText;
        promptInput.disabled = false;
        promptInput.value = '';

        // Auto hide toast after 6 seconds
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
        }, 6000);
      }, 1200);
    });

    // Populate suggestions inside helper hint row
    if (hint) {
      hint.innerHTML = `Try: 
        <button type="button" class="hint-btn" style="background:none; border:none; color:#5B87FF; text-decoration:underline; cursor:pointer; font-family:inherit; font-size:inherit; padding:0; margin:0 4px;">"Check LT Dimmare SIRE prep"</button> or 
        <button type="button" class="hint-btn" style="background:none; border:none; color:#5B87FF; text-decoration:underline; cursor:pointer; font-family:inherit; font-size:inherit; padding:0; margin:0 4px;">"ME Aux Blower status"</button>`;

      hint.addEventListener('click', (e) => {
        const btn = e.target.closest('.hint-btn');
        if (btn) {
          promptInput.value = btn.textContent.replace(/"/g, '');
          promptForm.dispatchEvent(new Event('submit'));
        }
      });
    }
  }
});
