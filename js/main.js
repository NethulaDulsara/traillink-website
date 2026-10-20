/**
 * TrailLink Academic Research Portal - Master Apple Interaction Logic
 * Features:
 * - Real-time Scroll Progress Bar
 * - IntersectionObserver Scroll Reveal Animations
 * - Interactive Apple App Showcase (Smooth Phone Screen Switcher)
 * - Sticky Header Glassmorphism on scroll
 * - Milestone Dropdown Filter
 * - Interactive Slide Deck Viewer
 * - Document Inspector & Email Template Helper
 */

function removeLegacyDocumentsNav() {
  // Retained for backwards compatibility; documents.html is now active
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveals();
  initHeaderGlass();
  initAppleShowcase();
  initMobileNav();
  initMilestoneDropdown();
  initSlideViewer();
  initDocumentViewer();
  initContactForm();
  initEmailTemplateCopy();
});

/* -----------------------------------------------------------------------------
 * 1. Scroll Progress Bar (Top of Viewport)
 * -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* -----------------------------------------------------------------------------
 * 2. IntersectionObserver Scroll Reveals (Physics-based Apple easing)
 * -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-up');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01,
    rootMargin: '0px 0px 50px 0px'
  });

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50) {
      el.classList.add('active');
    } else {
      observer.observe(el);
    }
  });
}

/* -----------------------------------------------------------------------------
 * 3. Header Scrolled State Glassmorphism
 * -------------------------------------------------------------------------- */
function initHeaderGlass() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* -----------------------------------------------------------------------------
 * 4. Apple App Showcase Switcher (Interactive 3D Phone Screen)
 * -------------------------------------------------------------------------- */
const showcaseData = {
  home: {
    title: "Trip Management & Offline Mode Portal",
    lead: "TrailLink Core • Unprivileged COTS Handset Architecture",
    desc: "The primary control dashboard establishing disconnected wilderness sessions. Generates offline trip identifiers (e.g. TL-OFF-QG4J), isolates cryptographic broadcast channels, and caches all trip state locally with zero internet dependency.",
    img: "images/app_screen_home.jpg",
    features: [
      "Offline Trip Initialization (e.g. Ella wilderness expedition TL-OFF-QG4J)",
      "Instant unprivileged mode verification without root access or kernel patches",
      "Local cryptographic profile & multi-peer cluster join orchestration",
      "One-tap rapid navigation to Map, Chat, SOS, and Central Radio Radar"
    ]
  },
  map: {
    title: "Offline Geospatial Vector Mapping",
    lead: "Component 1 • Fused GNSS & Dynamic Freshness Decay",
    desc: "Provides 100% disconnected situational awareness using locally stored MBTiles vector tile archives. Continuously computes the mathematical temporal freshness function &fnof;<sub>freshness</sub>(&Delta;t) to color-code teammate locations.",
    img: "images/app_screen_map.jpg",
    features: [
      "Offline MBTiles vector & raster rendering with zero network latency",
      "Live GPS fix coordinates (6.914671, 79.973145) with 17m precision tracking",
      "Dynamic 3-tier temporal freshness badges: Fresh (&le;5m), Old (5-15m), Stale (>15m)",
      "High-precision GNSS telemetry overlay without Android root privileges"
    ]
  },
  sos: {
    title: "Priority Emergency SOS & Distress Siren",
    lead: "Component 1 • Out-of-Order Queue Preemption & Cloud Reconciliation",
    desc: "A life-critical panic trigger mechanism that immediately interrupts ongoing conversational queues. Propagates bounded multi-hop distress packets with idempotent loop suppression and acoustic siren actuation.",
    img: "images/app_screen_sos.jpg",
    features: [
      "Sub-850 ms transmission latency traversing multi-wall reinforced concrete",
      "Out-of-order priority queue preemption halting background text and voice traffic",
      "Embedded distress telemetry packaging location (6.91468, 79.97315) and text",
      "Bidirectional peer acknowledgments (sos_ack) and BridgeEngine cloud reconciliation"
    ]
  },
  text: {
    title: "Offline Store-and-Forward Text Messaging",
    lead: "Component 2 • Delay-Tolerant Network (DTN) Gossip Protocol",
    desc: "Facilitates reliable asynchronous peer-to-peer text communication across disconnected mesh partitions. Features local transactional SQLite outbox queues, cryptographic channel isolation, and multi-hop epidemic gossip relaying with zero internet dependency.",
    img: "images/app_screen_offline_chat.jpg",
    features: [
      "Trip-scoped cryptographic channel isolation (e.g. channel TL-OFF-QG4J)",
      "Persistent SQLite outbox queue caching unsent messages during zero-peer isolation",
      "End-to-end cryptographic delivery status indicators (Sent &rarr; Delivered &rarr; Acknowledged)",
      "High-priority SOS preemption: automatic conversational queue yielding on distress alerts"
    ]
  },
  voice: {
    title: "Dual-Pipeline Voice Radio & Push-to-Talk (PTT)",
    lead: "Component 3 • Delay-Tolerant Voice & Jitter-Buffered Radio",
    desc: "Enables natural conversational communications over ad-hoc Wi-Fi Direct and BLE mesh links without mobile cellular infrastructure, supporting both compressed voice notes and live PCM-16 streaming.",
    img: "images/app_screen_chat_ptt.jpg",
    features: [
      "Tactile 'Hold to Stream' live radio floor arbitration with token locking",
      "Asynchronous compressed AAC-LC voice memos for low-bandwidth links",
      "Adaptive Splay-Tree Jitter Buffer eliminating acoustic playback jitter",
      "SOS emergency queue yielding: instant audio muting on distress alerts"
    ]
  },
  chat: {
    title: "Offline Store-and-Forward Text Messaging",
    lead: "Component 2 • Delay-Tolerant Network (DTN) Gossip Protocol",
    desc: "Facilitates reliable asynchronous peer-to-peer text communication across disconnected mesh partitions. Features local transactional SQLite outbox queues, cryptographic channel isolation, and multi-hop epidemic gossip relaying with zero internet dependency.",
    img: "images/app_screen_offline_chat.jpg",
    features: [
      "Trip-scoped cryptographic channel isolation (e.g. channel TL-OFF-QG4J)",
      "Persistent SQLite outbox queue caching unsent messages during zero-peer isolation",
      "End-to-end cryptographic delivery status indicators (Sent &rarr; Delivered &rarr; Acknowledged)",
      "High-priority SOS preemption: automatic conversational queue yielding on distress alerts"
    ]
  },
  link: {
    title: "Network Compass & Direction Finder",
    lead: "Component 4 • Link Health Index Q &in; [0, 100] & Backhaul Radar",
    desc: "Monitors physical radio frequency propagation conditions and guides users toward historical internet connectivity hotspots to facilitate cloud synchronization upon backhaul re-entry.",
    img: "images/app_screen_compass.jpg",
    features: [
      "Interactive 180° RF directional compass needle with live Mbps gauge",
      "Continuous moving-average RSSI and RTT probe telemetry calculation",
      "Historical connectivity hotspot logging with timestamped breadcrumbs",
      "Cadence scaling: 60s in robust links vs. 180s in fringe links (Q < 40)"
    ]
  }
};

function initAppleShowcase() {
  const tabBtns = document.querySelectorAll('.showcase-tab-btn');
  const screenImg = document.getElementById('showcaseScreenImg');
  const titleEl = document.getElementById('showcaseTitle');
  const leadEl = document.getElementById('showcaseLead');
  const descEl = document.getElementById('showcaseDesc');
  const listEl = document.getElementById('showcaseList');

  if (!tabBtns.length || !screenImg) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetKey = btn.getAttribute('data-showcase');
      const data = showcaseData[targetKey];
      if (!data) return;

      // Smooth crossfade transition on phone screen
      screenImg.style.opacity = '0.3';
      screenImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        screenImg.src = data.img;
        if (titleEl) titleEl.textContent = data.title;
        if (leadEl) leadEl.innerHTML = data.lead;
        if (descEl) descEl.innerHTML = data.desc;
        if (listEl) {
          listEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        }
        screenImg.style.opacity = '1';
        screenImg.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

/* -----------------------------------------------------------------------------
 * 5. Mobile Navigation
 * -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('mobile-open');
    const isExpanded = mainNav.classList.contains('mobile-open');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('mobile-open');
    }
  });
}

/* -----------------------------------------------------------------------------
 * 6. Milestones Dropdown Filter (Slide 11 Requirement)
 * -------------------------------------------------------------------------- */
function initMilestoneDropdown() {
  const dropdown = document.getElementById('milestoneSelect');
  if (!dropdown) return;

  const milestoneCards = document.querySelectorAll('.milestone-card');

  dropdown.addEventListener('change', (e) => {
    const selectedVal = e.target.value;

    milestoneCards.forEach((card) => {
      const cardMilestone = card.getAttribute('data-milestone');
      if (selectedVal === 'all' || cardMilestone === selectedVal) {
        card.style.display = 'grid';
        if (selectedVal !== 'all') {
          card.classList.add('active-target');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          card.classList.remove('active-target');
        }
      } else {
        card.style.display = 'none';
        card.classList.remove('active-target');
      }
    });
  });
}

/* -----------------------------------------------------------------------------
 * 7. Interactive Slide Viewer (Slide 13 Requirement)
 * -------------------------------------------------------------------------- */
const slideDecks = {
  proposal: [
    {
      title: "Slide 1: Research Project Proposal",
      subtitle: "TrailLink: Infrastructure-Independent Mobile Mesh Collaboration Platform",
      points: [
        "Problem: Breakdown of cellular communications during disasters & deep wilderness expeditions",
        "Challenge: Stock Android OS forbids Layer-3 packet injection without root privileges",
        "Solution: Unprivileged hybrid BLE discovery promoted to Wi-Fi Direct socket mesh",
        "Target Audience: Backcountry hikers, search-and-rescue teams, disaster responders"
      ]
    },
    {
      title: "Slide 2: Proposed 4-Component Architecture",
      subtitle: "Unified Multi-Modal Architecture",
      points: [
        "Component 1: Offline Spatial Awareness & Bounded Priority SOS (Lead: Nethula Dulsara)",
        "Component 2: Store-and-Forward Text Messaging & Asynchronous Relay (Lead: Pabodhana D M D I)",
        "Component 3: Dual-Mode Voice Radio (PTT Voice Notes & Low-Latency PCM Stream)",
        "Component 4: Link Quality & Mesh Health Assessment Index Q in [0, 100]"
      ]
    },
    {
      title: "Slide 3: Research Methodology & Feasibility",
      subtitle: "Design Science Research Methodology (DSRM)",
      points: [
        "Strict adherence to DSRM 6-stage lifecycle for IT artifacts",
        "Empirical physical testing on Google Pixel 7 handsets in 3 propagation environments",
        "Zero hardware accessories needed; 100% COTS unrooted hardware",
        "Milestones, timeline, and risk mitigation strategies"
      ]
    }
  ],
  pp1: [
    {
      title: "Slide 1: Progress Presentation 1 (PP1)",
      subtitle: "Architecture Formalization & P2P Prototype",
      points: [
        "Core protocol design completed: BLE neighbor discovery + Wi-Fi Direct promotion",
        "SQLite Write-Ahead Logging (WAL) relational schema formalized for zero data loss",
        "Initial offline map rendering with flutter_map & MBTiles vector tile extracts",
        "Inter-component data bus interfaces established between text, voice, and spatial layers"
      ]
    },
    {
      title: "Slide 2: P2P Socket Promotion & MTU Framing",
      subtitle: "Overcoming Operating System Sandboxes",
      points: [
        "Google Nearby Connections P2P_CLUSTER implementation confirmed",
        "Payloads framed into compact JSON payloads under 512 bytes",
        "Initial latency benchmarks: < 350ms for point-to-point text packets",
        "Supervisor feedback integrated for spatial coordinate validation"
      ]
    }
  ],
  pp2: [
    {
      title: "Slide 1: Progress Presentation 2 (PP2)",
      subtitle: "Subsystem Integration & Emergency Priority Queuing",
      points: [
        "Out-of-order priority queue implemented for SOS alert dispatching",
        "Broadcast storm suppression active with processed_offline_packets deduplication ledger",
        "Dynamic temporal freshness decay function F_freshness(Δt) color-coding pins on offline map",
        "Voice radio jitter buffer & link health scoring integrated into common session"
      ]
    },
    {
      title: "Slide 2: Multi-Hop Relaying & Dual-State Cloud Sync",
      subtitle: "BridgeEngine & Field Testing Setup",
      points: [
        "Bounded TTL=8 routing prevents looping packets across multi-hop chains",
        "Automated BridgeEngine batches offline records to remote MongoDB upon internet return",
        "Field test procedure finalized for Open Area, Forest Canopy, and Academic Classrooms",
        "Monsoon power monitor setup configured for current draw benchmarking"
      ]
    }
  ],
  final: [
    {
      title: "Slide 1: Final Research Defense & Viva",
      subtitle: "Comprehensive Empirical Findings & Research Contributions",
      points: [
        "Full empirical validation: 750 physical trials across 3 environments",
        "Packet Delivery Ratio: 99.5% at 20m in Open Area, 86.4% across 2 concrete walls",
        "End-to-End Latency: 184ms to 842ms (comfortably within the 1,500ms safety limit)",
        "Power Longevity: 52.8 hours active tracking on standard 4,355 mAh smartphone cell",
        "BridgeEngine Cloud Sync: 100/100 records committed with 0% data loss and 0% duplication"
      ]
    },
    {
      title: "Slide 2: System Contributions & Viva Defense",
      subtitle: "Scientific and Practical Significance",
      points: [
        "First production-grade offline mesh platform delivering offline vector maps + SOS priority on stock Android",
        "Eliminates reliance on expensive proprietary satellite trackers ($350-$600 + monthly fees)",
        "Published IEEE/Springer conference paper draft and complete 77-page thesis dissertation",
        "Aligned with UN Sustainable Development Goals: SDG 3 (Health), SDG 9 (Infrastructure), SDG 11 (Resilience)"
      ]
    }
  ]
};

let currentDeck = 'final';
let currentSlideIndex = 0;

const deckExternalLinks = {
  proposal: {
    url: "https://mysliit.sharepoint.com/:p:/s/CDAPSubmissionCloud/IQC15Bek_uIVSIOEgPkZGYOIATdTR-P4vl9fgC8nMhyUMdo?e=iXcJzA",
    label: "🚀 Open Proposal Deck (.pptx) &nearr;"
  },
  pp1: {
    url: "https://mysliit.sharepoint.com/:p:/s/CDAPSubmissionCloud/IQD188hyQa2QQ5qhWTpDg05fAec-mhogsgdaYyhh0Opthes?e=thUgjJ",
    label: "🚀 Open PP1 Deck (.pptx) &nearr;"
  },
  pp2: {
    url: "https://mysliit.sharepoint.com/:p:/s/CDAPSubmissionCloud/IQDB-FjbmU2WSJPV8QAsLF9UARYEhjuR_JwZ-eSzOdaPLUQ?e=oGb8f1",
    label: "🚀 Open PP2 Deck (.pptx) &nearr;"
  },
  final: {
    url: "docs/R26-IT-135_Research_Paper.pdf",
    label: "📄 View Research Paper (PDF) &nearr;"
  }
};

function initSlideViewer() {
  const container = document.getElementById('slidePreviewContainer');
  if (!container) return;

  const deckButtons = document.querySelectorAll('.deck-btn');
  const prevBtn = document.getElementById('slidePrevBtn');
  const nextBtn = document.getElementById('slideNextBtn');
  const indicator = document.getElementById('slideCounterIndicator');
  const sharepointLink = document.getElementById('deckSharepointBtn');

  function renderSlide() {
    const deck = slideDecks[currentDeck];
    if (!deck) return;
    const slide = deck[currentSlideIndex];

    container.innerHTML = `
      <div class="slide-card-preview">
        <span class="notice-badge" style="margin-bottom: 1rem; display: inline-block;">${slide.title}</span>
        <h2 style="color: #ffffff; font-size: 1.75rem; margin-bottom: 0.5rem;">${slide.subtitle}</h2>
        <p style="color: #34d399; font-weight: 600; margin-bottom: 1.5rem; font-size: 0.95rem;">TrailLink Research Project | SLIIT CDAP 2026</p>
        <ul style="text-align: left; list-style: none; padding: 0;">
          ${slide.points.map(pt => `
            <li style="color: #e2e8f0; font-size: 1rem; margin-bottom: 0.85rem; display: flex; align-items: flex-start; gap: 0.75rem;">
              <span style="color: #34d399; font-weight: bold;">▸</span> ${pt}
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    if (indicator) {
      indicator.textContent = `Slide ${currentSlideIndex + 1} of ${deck.length}`;
    }
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === deck.length - 1;

    if (sharepointLink && deckExternalLinks[currentDeck]) {
      sharepointLink.href = deckExternalLinks[currentDeck].url;
      sharepointLink.innerHTML = deckExternalLinks[currentDeck].label;
    }
  }

  deckButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deckButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDeck = btn.getAttribute('data-deck');
      currentSlideIndex = 0;
      renderSlide();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const deck = slideDecks[currentDeck];
      if (currentSlideIndex < deck.length - 1) {
        currentSlideIndex++;
        renderSlide();
      }
    });
  }

  renderSlide();
}

/* -----------------------------------------------------------------------------
 * 8. Document Viewer Modals & Notifications
 * -------------------------------------------------------------------------- */
function initDocumentViewer() {
  const viewBtns = document.querySelectorAll('.btn-view-doc');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc-name');
      const docDesc = btn.getAttribute('data-doc-desc');
      alert(`[Academic Document Viewer]\n\nDocument: ${docName}\n\nDescription: ${docDesc}\n\nStatus: Official SLIIT CDAP Milestone Deliverable. Available for inspection during final project defense and viva.`);
    });
  });
}

/* -----------------------------------------------------------------------------
 * 9. Contact Form Validation
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('researchContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName')?.value;
    const email = document.getElementById('senderEmail')?.value;
    const subject = document.getElementById('messageSubject')?.value;

    if (!name || !email || !subject) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    const feedback = document.getElementById('formFeedback');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <div style="background: #dcfce7; color: #15803d; padding: 1rem; border-radius: 8px; border: 1px solid #bbf7d0;">
          <strong>Message Prepared Successfully!</strong><br>
          Thank you, ${name}. Your message regarding "${subject}" has been queued. Our research team and project supervisor will review and respond promptly.
        </div>
      `;
      form.reset();
    }
  });
}

/* -----------------------------------------------------------------------------
 * 10. Email Template Helper (Slide 15 Requirement)
 * -------------------------------------------------------------------------- */
function initEmailTemplateCopy() {
  const copyBtn = document.getElementById('copyEmailTemplateBtn');
  const templatePre = document.getElementById('emailTemplateText');
  if (!copyBtn || !templatePre) return;

  copyBtn.addEventListener('click', () => {
    const text = templatePre.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const origText = copyBtn.textContent;
      copyBtn.textContent = '✓ Template Copied to Clipboard!';
      setTimeout(() => {
        copyBtn.textContent = origText;
      }, 2500);
    }).catch(() => {
      alert('Please manually select and copy the email template above.');
    });
  });
}

/* -----------------------------------------------------------------------------
 * 11. Individual Project Proposal Reports - Interactive Folder Card Logic
 * -------------------------------------------------------------------------- */
function toggleProposalFolder(e) {
  // If clicked on an action link/button inside the tray, allow default link action without collapsing
  if (e && (e.target.closest('a') || (e.target.closest('button') && !e.target.closest('.folder-toggle-bar')))) {
    return;
  }
  
  const folder = document.getElementById('individualProposalFolder');
  const label = document.getElementById('folderToggleLabel');
  if (!folder) return;

  const isOpen = folder.classList.toggle('is-open');
  if (label) {
    label.innerHTML = isOpen ? '&#128194; Close Folder' : '&#128194; Click to Open Folder (4 Documents)';
  }
}

function closeProposalFolder(e) {
  if (e) e.stopPropagation();
  const folder = document.getElementById('individualProposalFolder');
  const label = document.getElementById('folderToggleLabel');
  if (folder) {
    folder.classList.remove('is-open');
    if (label) {
      label.innerHTML = '&#128194; Click to Open Folder (4 Documents)';
    }
  }
}

function openAndScrollToProposalFolder(e) {
  if (e) e.preventDefault();
  const folder = document.getElementById('individualProposalFolder');
  const label = document.getElementById('folderToggleLabel');
  if (folder) {
    folder.classList.add('is-open');
    if (label) {
      label.innerHTML = '&#128194; Close Folder';
    }
    folder.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

