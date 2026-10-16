/**
 * KREATIV - Modern Youth & Student Tech Landing Page
 * Script File (ES6+ & Anime.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DOM Elements & State
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const toastContainer = document.getElementById('toastContainer');
  const themeModeToggle = document.getElementById('themeModeToggle');
  const themeModeIcon = document.getElementById('themeModeIcon');

  // Interactive Widgets Elements
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const newQuoteBtn = document.getElementById('newQuoteBtn');
  const quoteContainer = document.getElementById('quoteContainer');

  const counterVal = document.getElementById('counterVal');
  const incCounterBtn = document.getElementById('incCounterBtn');
  const decCounterBtn = document.getElementById('decCounterBtn');
  const resetCounterBtn = document.getElementById('resetCounterBtn');

  const colorBtns = document.querySelectorAll('.color-btn');
  const themeStatusText = document.getElementById('themeStatusText');

  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  const taskProgressBar = document.getElementById('taskProgressBar');
  const taskStatusText = document.getElementById('taskStatusText');
  const celebrateTaskBtn = document.getElementById('celebrateTaskBtn');

  const ctaActionBtn = document.getElementById('ctaActionBtn');

  // State
  let currentGoalCount = 0;

  // Sample Quotes Data
  const quotesList = [
    {
      text: "Cách tốt nhất để bắt đầu là ngừng nói và bắt đầu làm.",
      author: "Walt Disney"
    },
    {
      text: "Lập trình không phải là về những gì bạn biết, mà là về những gì bạn có thể tìm ra.",
      author: "Chris Pine"
    },
    {
      text: "Mọi chuyên gia đều từng là một người mới bắt đầu đầy bỡ ngỡ.",
      author: "Helen Hayes"
    },
    {
      text: "Đơn giản là đỉnh cao của sự tinh tế và hiện đại.",
      author: "Leonardo da Vinci"
    },
    {
      text: "Cách duy nhất để làm được điều tuyệt vời là yêu những gì bạn làm.",
      author: "Steve Jobs"
    },
    {
      text: "Đừng sợ thất bại. Hãy sợ việc năm sau bạn vẫn ở đúng chỗ của ngày hôm nay.",
      author: "Khuyết danh"
    }
  ];
  let currentQuoteIndex = 0;

  // Theme descriptions
  const themeNames = {
    indigo: "Indigo Vibe (Mặc định)",
    cyan: "Ocean Tech (Xanh biển)",
    purple: "Cyber Violet (Tím sáng tạo)",
    emerald: "Fresh Mint (Xanh lá tươi mới)"
  };

  // ------------------------------------------------------------------------
  // 2. Toast Notification Helper
  // ------------------------------------------------------------------------
  function showToast(message, iconClass = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove after 3.2 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  // ------------------------------------------------------------------------
  // 2b. Light / Dark Mode Toggle Logic
  // ------------------------------------------------------------------------
  function setDarkMode(isDark) {
    if (isDark) {
      document.body.setAttribute('data-mode', 'dark');
      if (themeModeIcon) {
        themeModeIcon.className = 'fa-solid fa-sun';
      }
      localStorage.setItem('kreativ_theme_mode', 'dark');
    } else {
      document.body.removeAttribute('data-mode');
      if (themeModeIcon) {
        themeModeIcon.className = 'fa-solid fa-moon';
      }
      localStorage.setItem('kreativ_theme_mode', 'light');
    }

    // Smooth rotate & pop animation for theme mode icon
    if (typeof anime !== 'undefined' && themeModeIcon) {
      anime({
        targets: themeModeIcon,
        rotate: '+=360deg',
        scale: [0.7, 1.15, 1],
        duration: 450,
        easing: 'easeOutBack'
      });
    }
  }

  // Initialize theme mode: check localStorage first, then system preference
  const savedMode = localStorage.getItem('kreativ_theme_mode');
  if (savedMode === 'dark') {
    setDarkMode(true);
  } else if (!savedMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkMode(true);
  }

  if (themeModeToggle) {
    themeModeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.body.getAttribute('data-mode') === 'dark';
      setDarkMode(!isCurrentlyDark);
    });
  }

  // ------------------------------------------------------------------------
  // 3. Navbar Scroll & Active Section Highlighting (ScrollSpy)
  // ------------------------------------------------------------------------
  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy for Active Nav Link
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // ------------------------------------------------------------------------
  // 4. Mobile Menu Navigation
  // ------------------------------------------------------------------------
  function toggleMobileMenu(forceClose = false) {
    const isOpen = forceClose ? false : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', isOpen);
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      toggleMobileMenu(true);
    }
  });

  // ------------------------------------------------------------------------
  // 5. Anime.js Entrance & Ambient Animations
  // ------------------------------------------------------------------------
  function initAnimeAnimations() {
    if (typeof anime === 'undefined') {
      console.warn('Anime.js CDN chưa được tải, sử dụng giao diện tĩnh.');
      return;
    }

    // 5.1 Hero Section Entrance Animation
    anime.timeline({
      easing: 'easeOutQuart',
      duration: 800
    })
    .add({
      targets: '.hero-badge',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600
    })
    .add({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700
    }, '-=400')
    .add({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 700
    }, '-=500')
    .add({
      targets: '.hero-buttons .btn',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(120),
      duration: 600
    }, '-=400')
    .add({
      targets: '.highlight-item',
      opacity: [0, 1],
      translateY: [15, 0],
      delay: anime.stagger(100),
      duration: 500
    }, '-=300')
    .add({
      targets: '#heroMainCard',
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [30, 0],
      duration: 900,
      easing: 'easeOutCubic'
    }, '-=600')
    .add({
      targets: '.floating-badge',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(150),
      duration: 700,
      easing: 'easeOutBack'
    }, '-=500');

    // 5.2 Floating Badges Continuous Gentle Ambient Motion
    anime({
      targets: '.float-anim-1',
      translateY: [-6, 6],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3200
    });

    anime({
      targets: '.float-anim-2',
      translateY: [5, -7],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3800,
      delay: 300
    });

    anime({
      targets: '.float-anim-3',
      translateY: [-5, 7],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3500,
      delay: 600
    });
  }

  // ------------------------------------------------------------------------
  // 6. Scroll Reveal Observer for Cards & Sections
  // ------------------------------------------------------------------------
  function initScrollReveal() {
    // Feature Cards Stagger Reveal
    const featuresSection = document.getElementById('features');
    if (featuresSection && typeof anime !== 'undefined') {
      let featuresAnimated = false;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !featuresAnimated) {
            featuresAnimated = true;
            anime({
              targets: '.feature-card',
              opacity: [0, 1],
              translateY: [40, 0],
              delay: anime.stagger(100),
              duration: 700,
              easing: 'easeOutQuad'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(featuresSection);
    }

    // Number Counter Animation in About Section
    const statsElements = document.querySelectorAll('.counter-anim');
    if (statsElements.length > 0 && typeof anime !== 'undefined') {
      let statsAnimated = false;
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statsElements.forEach(el => {
              const target = parseInt(el.getAttribute('data-target'), 10) || 0;
              const isPercent = el.innerText.includes('%');
              const isK = el.innerText.includes('k');
              const obj = { val: 0 };

              anime({
                targets: obj,
                val: target,
                round: 1,
                duration: 1600,
                easing: 'easeOutQuart',
                update: () => {
                  el.innerText = `${obj.val}${isK ? 'k+' : isPercent ? '%' : '+'}`;
                }
              });
            });
            statsObserver.disconnect();
          }
        });
      }, { threshold: 0.3 });

      const aboutSection = document.getElementById('about');
      if (aboutSection) statsObserver.observe(aboutSection);
    }
  }

  // ------------------------------------------------------------------------
  // 7. Interactive Widget 1: Quote Generator
  // ------------------------------------------------------------------------
  if (newQuoteBtn && quoteText && quoteAuthor) {
    newQuoteBtn.addEventListener('click', () => {
      // Button click micro-animation
      if (typeof anime !== 'undefined') {
        anime({
          targets: newQuoteBtn,
          scale: [0.95, 1],
          duration: 250,
          easing: 'easeOutElastic(1, .8)'
        });

        // Quote switch animation
        anime({
          targets: quoteContainer,
          opacity: [1, 0],
          translateY: [0, -8],
          duration: 200,
          easing: 'easeInQuad',
          complete: () => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
            const newQuote = quotesList[currentQuoteIndex];
            quoteText.textContent = `"${newQuote.text}"`;
            quoteAuthor.textContent = `— ${newQuote.author}`;

            anime({
              targets: quoteContainer,
              opacity: [0, 1],
              translateY: [8, 0],
              duration: 350,
              easing: 'easeOutQuad'
            });
          }
        });
      } else {
        // Fallback without Anime.js
        currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
        const newQuote = quotesList[currentQuoteIndex];
        quoteText.textContent = `"${newQuote.text}"`;
        quoteAuthor.textContent = `— ${newQuote.author}`;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. Interactive Widget 2: Study Streak Counter
  // ------------------------------------------------------------------------
  function updateCounter(newVal) {
    if (newVal < 0) newVal = 0;
    currentGoalCount = newVal;
    counterVal.textContent = currentGoalCount;

    if (typeof anime !== 'undefined') {
      anime({
        targets: counterVal,
        scale: [1.3, 1],
        duration: 300,
        easing: 'easeOutBack'
      });
    }

    if (currentGoalCount === 5) {
      showToast('Tuyệt vời! Bạn đã hoàn thành 5 mục tiêu! 🎉', 'fa-solid fa-fire');
    } else if (currentGoalCount === 10) {
      showToast('Xuất sắc! Bứt phá 10 mục tiêu học tập! 🚀', 'fa-solid fa-trophy');
    }
  }

  if (incCounterBtn) {
    incCounterBtn.addEventListener('click', () => updateCounter(currentGoalCount + 1));
  }

  if (decCounterBtn) {
    decCounterBtn.addEventListener('click', () => updateCounter(currentGoalCount - 1));
  }

  if (resetCounterBtn) {
    resetCounterBtn.addEventListener('click', () => {
      updateCounter(0);
      showToast('Đã đặt lại bộ đếm mục tiêu về 0.');
    });
  }

  // ------------------------------------------------------------------------
  // 9. Interactive Widget 3: Color Palette & Theme Changer
  // ------------------------------------------------------------------------
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme');

      // Update Active class
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Set theme attribute on body
      if (selectedTheme === 'indigo') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', selectedTheme);
      }

      // Update text
      if (themeStatusText) {
        themeStatusText.innerHTML = `Đang dùng: <strong>${themeNames[selectedTheme] || selectedTheme}</strong>`;
      }

      // Feedback animation & Toast
      if (typeof anime !== 'undefined') {
        anime({
          targets: btn,
          scale: [0.94, 1],
          duration: 300,
          easing: 'easeOutElastic(1, .6)'
        });
      }

      showToast(`Đã chuyển phong cách sang ${themeNames[selectedTheme]}! ✨`, 'fa-solid fa-palette');
    });
  });

  // ------------------------------------------------------------------------
  // 10. Interactive Widget 4: Mini Tasks & Confetti Celebration
  // ------------------------------------------------------------------------
  function updateTaskProgress() {
    const total = taskCheckboxes.length;
    let completed = 0;

    taskCheckboxes.forEach(cb => {
      const parentLabel = cb.closest('.task-item');
      if (cb.checked) {
        completed++;
        if (parentLabel) parentLabel.classList.add('completed');
      } else {
        if (parentLabel) parentLabel.classList.remove('completed');
      }
    });

    const percentage = Math.round((completed / total) * 100);
    if (taskProgressBar) {
      taskProgressBar.style.width = `${percentage}%`;
    }
    if (taskStatusText) {
      taskStatusText.textContent = `Đã hoàn thành ${completed}/${total} mục tiêu`;
    }

    if (completed === total) {
      showToast('Chúc mừng! Bạn đã hoàn thành toàn bộ mục tiêu hôm nay! 🌟', 'fa-solid fa-medal');
      triggerConfetti();
    }
  }

  taskCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateTaskProgress);
  });
  updateTaskProgress(); // Initial check

  // Celebration Fireworks / Confetti using Anime.js
  function triggerConfetti() {
    const widget = document.querySelector('.task-widget');
    if (!widget) return;

    // Lấy màu từ CSS variables (đọc trên <body> để ăn theo data-theme đang chọn)
    const bodyStyle = getComputedStyle(document.body);
    const colors = ['--color-primary', '--color-secondary', '--purple', '--emerald', '--amber', '--rose']
      .map(name => bodyStyle.getPropertyValue(name).trim());
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.position = 'absolute';
      p.style.width = `${Math.floor(Math.random() * 8 + 6)}px`;
      p.style.height = `${Math.floor(Math.random() * 8 + 6)}px`;
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.pointerEvents = 'none';
      p.style.zIndex = '100';
      widget.appendChild(p);

      if (typeof anime !== 'undefined') {
        anime({
          targets: p,
          translateX: (Math.random() - 0.5) * 360,
          translateY: (Math.random() - 0.5) * 280,
          scale: [0.2, Math.random() * 1.2 + 0.8],
          rotate: () => Math.random() * 720,
          opacity: [1, 0],
          duration: 1200 + Math.random() * 600,
          easing: 'easeOutExpo',
          complete: () => {
            if (p.parentNode) p.parentNode.removeChild(p);
          }
        });
      } else {
        setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 1000);
      }
    }
  }

  if (celebrateTaskBtn) {
    celebrateTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerConfetti();
      showToast('Bắn pháo hoa ăn mừng thành công rực rỡ! 🎆');
    });
  }

  // ------------------------------------------------------------------------
  // 11. CTA Action Button
  // ------------------------------------------------------------------------
  if (ctaActionBtn) {
    ctaActionBtn.addEventListener('click', () => {
      if (typeof anime !== 'undefined') {
        anime({
          targets: ctaActionBtn,
          scale: [0.92, 1.05, 1],
          duration: 400,
          easing: 'easeOutElastic(1, .5)'
        });
      }

      showToast('Chào mừng bạn đến với Kreativ! Hãy cuộn lên và thử nghiệm ngay 🚀', 'fa-solid fa-rocket');

      // Smooth scroll to interactive playground
      const interactiveSection = document.getElementById('interactive');
      if (interactiveSection) {
        interactiveSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ------------------------------------------------------------------------
  // 11b. Full-Screen Dual-Pane Studio Window (View Modes & Live Interactivity)
  // ------------------------------------------------------------------------
  const heroTabs = document.querySelectorAll('.win-tab');
  const studioDualBody = document.getElementById('studioDualBody');
  const runHeroCodeBtn = document.getElementById('runHeroCodeBtn');
  const heroTerminalLogs = document.getElementById('heroTerminalLogs');
  const terminalTimestamp = document.getElementById('terminalTimestamp');
  const heroBoostBtn = document.getElementById('heroBoostBtn');
  const heroClickHint = document.getElementById('heroClickHint');
  const heroConfidenceScore = document.getElementById('heroConfidenceScore');
  const heroMeterBar = document.getElementById('heroMeterBar');

  let heroClickCount = 0;

  function getFormattedTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  if (terminalTimestamp) {
    terminalTimestamp.textContent = getFormattedTime();
    setInterval(() => {
      terminalTimestamp.textContent = getFormattedTime();
    }, 1000);
  }

  // Handle Studio View Mode Switching (Split / Code / Preview)
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewMode = tab.getAttribute('data-view');
      heroTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (studioDualBody) {
        studioDualBody.classList.remove('view-code', 'view-preview');
        if (viewMode === 'code') {
          studioDualBody.classList.add('view-code');
        } else if (viewMode === 'preview') {
          studioDualBody.classList.add('view-preview');
        }

        if (typeof anime !== 'undefined') {
          anime({
            targets: '#studioDualBody',
            opacity: [0.7, 1],
            duration: 250,
            easing: 'easeOutQuad'
          });
        }
      }
    });
  });

  // Handle Interactive Widget Button Click inside Live Preview
  if (heroBoostBtn) {
    heroBoostBtn.addEventListener('click', () => {
      heroClickCount++;
      if (heroClickHint) {
        heroClickHint.textContent = `Đã trải nghiệm: ${heroClickCount} lần!`;
      }

      // Boost Confidence meter
      const newScore = Math.min(100, 98 + (heroClickCount % 3));
      if (heroConfidenceScore) {
        heroConfidenceScore.textContent = `${newScore}%`;
      }
      if (heroMeterBar) {
        heroMeterBar.style.width = `${newScore}%`;
      }

      // Anime.js Button pop & pulse
      if (typeof anime !== 'undefined') {
        anime({
          targets: heroBoostBtn,
          scale: [0.92, 1.08, 1],
          duration: 300,
          easing: 'easeOutBack'
        });

        // Hiệu ứng glow dùng CSS keyframes (.is-glowing) + biến màu, không hard-code trong JS
        const heroWidget = document.getElementById('heroInteractiveWidget');
        if (heroWidget) {
          heroWidget.classList.remove('is-glowing');
          void heroWidget.offsetWidth; // khởi động lại animation
          heroWidget.classList.add('is-glowing');
        }
      }

      // Log event to Terminal
      const timeStr = getFormattedTime();
      if (heroTerminalLogs) {
        const newRow = document.createElement('div');
        newRow.className = 'term-log-row highlight-log';
        newRow.innerHTML = `<span class="t-yellow">⚡</span> <span class="t-msg">[${timeStr}] Sự kiện UI: Người dùng kích hoạt tương tác (Click #${heroClickCount}).</span>`;
        heroTerminalLogs.appendChild(newRow);

        while (heroTerminalLogs.children.length > 4) {
          heroTerminalLogs.removeChild(heroTerminalLogs.firstChild);
        }

        if (typeof anime !== 'undefined') {
          anime({
            targets: newRow,
            opacity: [0, 1],
            translateX: [-10, 0],
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      }
    });
  }

  // Handle "Khởi chạy ▶" Run Code Action
  if (runHeroCodeBtn) {
    runHeroCodeBtn.addEventListener('click', () => {
      if (typeof anime !== 'undefined') {
        anime({
          targets: runHeroCodeBtn,
          scale: [0.9, 1.08, 1],
          duration: 300,
          easing: 'easeOutBack'
        });

        anime({
          targets: '#heroMainCard',
          scale: [0.995, 1],
          duration: 350,
          easing: 'easeOutQuad'
        });
      }

      const timeStr = getFormattedTime();
      if (heroTerminalLogs) {
        const newRow = document.createElement('div');
        newRow.className = 'term-log-row highlight-log';
        newRow.innerHTML = `<span class="t-green">🚀</span> <span class="t-msg">[${timeStr}] Khởi chạy thành công! Không gian làm việc sẵn sàng bứt phá.</span>`;
        heroTerminalLogs.appendChild(newRow);

        while (heroTerminalLogs.children.length > 4) {
          heroTerminalLogs.removeChild(heroTerminalLogs.firstChild);
        }

        if (typeof anime !== 'undefined') {
          anime({
            targets: newRow,
            opacity: [0, 1],
            translateX: [-10, 0],
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      }

      showToast('Khởi chạy toàn màn hình thành công trong 6ms! ⚡', 'fa-solid fa-circle-check');
    });
  }

  // ------------------------------------------------------------------------
  // 12. Initialize Everything
  // ------------------------------------------------------------------------
  initAnimeAnimations();
  initScrollReveal();
});
