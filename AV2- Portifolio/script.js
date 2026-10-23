/**
 * Portfólio Profissional - Weverton Kauã
 * JavaScript Vanilla (Sem bibliotecas externas)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. SAUDAÇÃO DINÂMICA
     ========================================================================== */
  function setDynamicGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let greetingText = '';

    if (currentHour >= 5 && currentHour < 12) {
      greetingText = '☀️ Bom dia! Bem-vindo(a) ao meu portfólio';
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingText = '🌤️ Boa tarde! Bem-vindo(a) ao meu portfólio';
    } else {
      greetingText = '🌙 Boa noite! Bem-vindo(a) ao meu portfólio';
    }

    greetingElement.textContent = greetingText;
  }

  /* ==========================================================================
     2. MODO CLARO / ESCURO (DARK / LIGHT THEME) + LOCALSTORAGE
     ========================================================================== */
  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '☀️';
      }
    });
  }

  /* ==========================================================================
     3. MENU HAMBÚRGUER (MOBILE)
     ========================================================================== */
  function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const primaryNav = document.getElementById('primary-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     4. FILTRO DE PROJETOS
     ========================================================================== */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO (COM LGPD)
     ========================================================================== */
  function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const lgpdConsent = document.getElementById('lgpd-consent');
    const statusDiv = document.getElementById('form-status');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkInput(input, condition) {
      const parent = input.closest('.form-group');
      if (!condition) {
        parent.classList.add('invalid');
        return false;
      } else {
        parent.classList.remove('invalid');
        return true;
      }
    }

    nameInput.addEventListener('input', () => checkInput(nameInput, nameInput.value.trim().length > 2));
    emailInput.addEventListener('input', () => checkInput(emailInput, validateEmail(emailInput.value.trim())));
    messageInput.addEventListener('input', () => checkInput(messageInput, messageInput.value.trim().length >= 10));
    lgpdConsent.addEventListener('change', () => checkInput(lgpdConsent, lgpdConsent.checked));

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkInput(nameInput, nameInput.value.trim().length > 2);
      const isEmailValid = checkInput(emailInput, validateEmail(emailInput.value.trim()));
      const isMessageValid = checkInput(messageInput, messageInput.value.trim().length >= 10);
      const isLgpdValid = checkInput(lgpdConsent, lgpdConsent.checked);

      if (isNameValid && isEmailValid && isMessageValid && isLgpdValid) {
        statusDiv.className = 'form-status success';
        statusDiv.textContent = '✅ Mensagem enviada com sucesso! Em breve entrarei em contato.';
        form.reset();

        setTimeout(() => {
          statusDiv.style.display = 'none';
        }, 5000);
      } else {
        statusDiv.className = 'form-status error';
        statusDiv.textContent = '❌ Por favor, preencha corretamente todos os campos obrigatórios.';
      }
    });
  }

  /* ==========================================================================
     6. ANO AUTOMÁTICO NO RODAPÉ
     ========================================================================== */
  function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // Inicialização de todas as funções
  setDynamicGreeting();
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initFormValidation();
  setCurrentYear();
});