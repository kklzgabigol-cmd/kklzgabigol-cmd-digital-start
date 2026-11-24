/* Edit these values when the sales and support details are ready. Keep the WhatsApp
   phone blank until an actual number is available (international format, digits only). */
const STORE_CONFIG = {
  priceLabel: 'R$ 35,00',
  priceValue: '35,00',
  whatsappPhone: '',
  pixKey: '6437e029-2f87-4ba5-ad07-7ba09488143b',
  productName: 'Como Ganhar Dinheiro na Internet do Zero em 2026'
};

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const paymentDialog = document.querySelector('#payment-dialog');
const copyButton = document.querySelector('#copy-pix');
const pixKeyElement = document.querySelector('#pix-key');
const copyFeedback = document.querySelector('#copy-feedback');
const whatsappButton = document.querySelector('#whatsapp-button');
const whatsappStatus = document.querySelector('#whatsapp-status');
const toast = document.querySelector('#toast');
let toastTimer;

// Keep price and Pix key consistent across the sales page and checkout.
document.querySelectorAll('.price-block strong, .mobile-buy-bar b, .payment-total strong').forEach((el) => {
  el.textContent = STORE_CONFIG.priceLabel;
});
document.querySelectorAll('.payment-steps li:nth-child(3)').forEach((el) => {
  el.lastChild.textContent = `Realize o pagamento de ${STORE_CONFIG.priceLabel}.`;
});
if (pixKeyElement) pixKeyElement.textContent = STORE_CONFIG.pixKey;
document.querySelectorAll('.payment-product-name').forEach((el) => {
  el.textContent = STORE_CONFIG.productName;
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function openPayment() {
  if (!paymentDialog) return;
  if (typeof paymentDialog.showModal === 'function') paymentDialog.showModal();
  else paymentDialog.setAttribute('open', '');
}

document.querySelectorAll('[data-open-payment]').forEach((button) => {
  button.addEventListener('click', openPayment);
});
document.querySelectorAll('[data-close-payment]').forEach((button) => {
  button.addEventListener('click', () => paymentDialog?.close());
});
paymentDialog?.addEventListener('click', (event) => {
  if (event.target === paymentDialog) paymentDialog.close();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && paymentDialog?.open) paymentDialog.close();
});

menuToggle?.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  mainNav?.classList.toggle('is-open', !isExpanded);
});
mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
    mainNav.classList.remove('is-open');
  });
});

async function copyPixKey() {
  const key = STORE_CONFIG.pixKey;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(key);
    } else {
      const temporaryInput = document.createElement('textarea');
      temporaryInput.value = key;
      temporaryInput.setAttribute('readonly', '');
      temporaryInput.style.position = 'fixed';
      temporaryInput.style.opacity = '0';
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      const copied = document.execCommand('copy');
      temporaryInput.remove();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    copyFeedback.textContent = 'Chave Pix copiada com sucesso!';
    copyButton?.setAttribute('aria-label', 'Chave Pix copiada com sucesso');
  } catch (error) {
    copyFeedback.textContent = 'Não foi possível copiar automaticamente. Selecione e copie a chave acima.';
  }
}
copyButton?.addEventListener('click', copyPixKey);

const whatsappMessage = 'Olá! Tenho interesse no e-book Como Ganhar Dinheiro na Internet do Zero em 2026. Realizei o pagamento via Pix e gostaria de enviar meu comprovante para receber o material.';
function configureWhatsApp() {
  if (!whatsappButton) return;
  const phone = STORE_CONFIG.whatsappPhone.replace(/\D/g, '');
  if (phone) {
    whatsappButton.disabled = false;
    whatsappButton.addEventListener('click', () => {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    whatsappStatus.textContent = 'O atendimento será aberto no WhatsApp para você enviar o comprovante.';
    document.querySelectorAll('[data-contact-status]').forEach((el) => {
      el.textContent = 'Fale com nosso atendimento pelo WhatsApp.';
    });
    document.querySelectorAll('[data-contact-link]').forEach((link) => {
      link.href = `https://wa.me/${phone}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  } else {
    whatsappButton.addEventListener('click', () => {
      whatsappStatus.textContent = 'O canal de atendimento está sendo configurado. Guarde seu comprovante e tente novamente mais tarde.';
    });
    whatsappStatus.textContent = 'Canal de atendimento sendo configurado.';
    document.querySelectorAll('[data-contact-link]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showToast('O canal de atendimento está sendo configurado.');
      });
    });
  }
}
configureWhatsApp();

// Reveal sections on scroll without requiring an animation library.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// A compact purchase shortcut appears after the visitor moves beyond the hero.
const mobileBuyBar = document.querySelector('.mobile-buy-bar');
const hero = document.querySelector('.hero');
if (mobileBuyBar && hero && 'IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    mobileBuyBar.classList.toggle('is-visible', !entry.isIntersecting);
  }, { threshold: 0.05 });
  heroObserver.observe(hero);
}

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
