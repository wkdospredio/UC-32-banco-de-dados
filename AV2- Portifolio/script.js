
/**
 * ============================================================
 * PORTFÓLIO PROFISSIONAL — WEVERTON KAUÃ
 * JavaScript Vanilla | Sem bibliotecas externas
 * ============================================================
 *
 * Funcionalidades:
 * - Saudação dinâmica conforme o horário
 * - Tema claro e escuro com preferência salva
 * - Menu responsivo com acessibilidade
 * - Filtros de projetos com estado acessível
 * - Validação do formulário de contato
 * - Atualização automática do ano
 * - Código defensivo para evitar erros no console
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa todas as funcionalidades do portfólio.
  initDynamicGreeting();
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initFormValidation();
  initCurrentYear();
});

/* ============================================================
   1. SAUDAÇÃO DINÂMICA
   ============================================================ */

function initDynamicGreeting() {
  const greetingElement = document.getElementById('dynamic-greeting');

  if (!greetingElement) return;

  const hour = new Date().getHours();

  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = 'Bom dia! Bem-vindo(a) ao meu portfólio.';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Boa tarde! Bem-vindo(a) ao meu portfólio.';
  } else {
    greeting = 'Boa noite! Bem-vindo(a) ao meu portfólio.';
  }

  greetingElement.textContent = greeting;
}

/* ============================================================
   2. TEMA CLARO E ESCURO
   ============================================================ */

function initThemeToggle() {
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;

  if (!themeButton) return;

  // Lê a preferência salva sem interromper o site caso
  // o navegador bloqueie o armazenamento local.
  function getSavedTheme() {
    try {
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (error) {
      console.warn('Não foi possível ler o tema salvo.');
    }

    return 'dark';
  }

  function applyTheme(theme, savePreference = true) {
    const isLight = theme === 'light';

    if (isLight) {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    if (themeIcon) {
      themeIcon.textContent = isLight ? '☀️' : '🌙';
    }

    themeButton.setAttribute(
      'aria-label',
      isLight ? 'Ativar tema escuro' : 'Ativar tema claro'
    );

    themeButton.setAttribute('aria-pressed', String(isLight));

    if (savePreference) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.warn('Não foi possível salvar a preferência de tema.');
      }
    }
  }

  // Aplica o tema antes de registrar a interação.
  applyTheme(getSavedTheme(), false);

  themeButton.addEventListener('click', () => {
    const currentTheme =
      root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
}

/* ============================================================
   3. MENU RESPONSIVO
   ============================================================ */

function initMobileMenu() {
  const menuButton = document.getElementById('menu-btn');
  const navigation = document.getElementById('primary-nav');

  if (!menuButton || !navigation) return;

  const navLinks = navigation.querySelectorAll('.nav-link');

  function setMenuState(isOpen) {
    navigation.classList.toggle('open', isOpen);

    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );
  }

  // Garante um estado inicial consistente.
  setMenuState(false);

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    setMenuState(!isOpen);
  });

  // Fecha o menu após selecionar uma seção.
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Fecha o menu com a tecla Escape.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
      menuButton.focus();
    }
  });

  // Fecha o menu ao clicar fora dele.
  document.addEventListener('click', (event) => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    if (
      isOpen &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setMenuState(false);
    }
  });
}

/* ============================================================
   4. FILTROS DA SEÇÃO DE PROJETOS
   ============================================================ */

function initProjectFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const emptyMessage = document.getElementById('projects-empty');

  if (!filters.length || !projectCards.length) return;

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter || 'all';
      let visibleCount = 0;

      // Atualiza o estado visual e acessível dos filtros.
      filters.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle('active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });

      // Mostra apenas os projetos correspondentes.
      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const matches =
          selectedFilter === 'all' || category === selectedFilter;

        card.hidden = !matches;

        if (matches) visibleCount++;
      });

      // Exibe uma mensagem caso não existam resultados.
      if (emptyMessage) {
        emptyMessage.hidden = visibleCount > 0;
      }
    });
  });
}

/* ============================================================
   5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ============================================================ */

function initFormValidation() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const consentInput = document.getElementById('lgpd-consent');
  const statusElement = document.getElementById('form-status');

  // Evita falhas caso a estrutura do formulário esteja incompleta.
  if (
    !nameInput ||
    !emailInput ||
    !messageInput ||
    !consentInput
  ) {
    console.warn('Verifique os campos obrigatórios do formulário.');
    return;
  }

  /**
   * Valida o formato básico do e-mail.
   * A confirmação definitiva depende do serviço de envio.
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Atualiza o estado de validação do campo.
   * Mantém compatibilidade com a classe .invalid do CSS.
   */
  function validateField(input, isValid) {
    const group = input.closest('.form-group');

    if (group) {
      group.classList.toggle('invalid', !isValid);
    }

    input.setAttribute('aria-invalid', String(!isValid));

    return isValid;
  }

  function validateName() {
    return validateField(nameInput, nameInput.value.trim().length >= 3);
  }

  function validateEmail() {
    return validateField(
      emailInput,
      isValidEmail(emailInput.value.trim())
    );
  }

  function validateMessage() {
    return validateField(
      messageInput,
      messageInput.value.trim().length >= 10
    );
  }

  function validateConsent() {
    return validateField(consentInput, consentInput.checked);
  }

  function showStatus(message, type) {
    if (!statusElement) return;

    statusElement.className = `form-status ${type}`;
    statusElement.textContent = message;
    statusElement.hidden = false;
  }

  // Validação durante o preenchimento.
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);
  consentInput.addEventListener('change', validateConsent);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    const isConsentValid = validateConsent();

    const isFormValid =
      isNameValid &&
      isEmailValid &&
      isMessageValid &&
      isConsentValid;

    if (!isFormValid) {
      showStatus(
        'Verifique os campos destacados e aceite o aviso de privacidade.',
        'error'
      );

      // Leva o foco ao primeiro campo inválido.
      const firstInvalidField = form.querySelector('[aria-invalid="true"]');

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return;
    }

    /*
     * IMPORTANTE:
     * Esta validação não envia a mensagem para um servidor.
     * Para realizar o envio real, conecte o formulário a um
     * backend ou serviço de formulários confiável.
     */
    showStatus(
      'Validação concluída! O formulário ainda precisa ser conectado a um serviço para enviar sua mensagem.',
      'success'
    );
  });
}

/* ============================================================
   6. ANO AUTOMÁTICO NO RODAPÉ
   ============================================================ */

function initCurrentYear() {
  const yearElement = document.getElementById('current-year');

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}
