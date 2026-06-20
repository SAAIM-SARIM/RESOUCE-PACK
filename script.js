// Small JS: menu toggle, smooth scroll, form UX
document.addEventListener('DOMContentLoaded', function() {
  // year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // mobile menu
  const toggle=document.getElementById('menu-toggle'); const nav=document.getElementById('nav');
  if(toggle && nav){
    toggle.addEventListener('click',function(){
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // HOW TO USE IT modal handling
  const howtoBtn = document.getElementById('howto-btn');
  const howtoModal = document.getElementById('howto-modal');
  if (howtoBtn && howtoModal) {
    const closeElements = howtoModal.querySelectorAll('[data-close]');
    const openModal = () => {
      howtoModal.setAttribute('aria-hidden', 'false');
      // trap focus if needed: focus the close button
      const closeBtn = howtoModal.querySelector('.modal-close'); if (closeBtn) closeBtn.focus();
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      howtoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      howtoBtn.focus();
    };

    howtoBtn.addEventListener('click', openModal);
    closeElements.forEach(el => el.addEventListener('click', closeModal));

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && howtoModal.getAttribute('aria-hidden') === 'false') closeModal();
    });

    // close when clicking overlay
    howtoModal.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('modal-overlay')) closeModal();
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav
        if(nav && nav.classList.contains('open')) nav.classList.remove('open');
      }
    })
  })

  // form submission UX (Formspree posts to action URL)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', async function(e){
      // basic UX: show sending state and allow native submit to occur if action present
      status.textContent = 'Sending…';
      // Let the browser do the real POST to the form action (Formspree). Optionally you can handle via fetch and a token.
      // We don't block the default submission so the user's Formspree integration will receive the post.
    });
  }
  
  // Copy-link CTA: copy the provided media URL to clipboard when clicked
  const downloadBtn = document.getElementById('download-cta');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async function(e) {
      const url = this.dataset.link || this.getAttribute('data-link');
      const prevText = this.textContent;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          const ta = document.createElement('textarea');
          ta.value = url;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        this.textContent = 'Copied!';
      } catch (err) {
        console.error('Copy failed:', err);
        prompt('Copy this link:', url);
      }
      setTimeout(() => { this.textContent = prevText; }, 1800);
    });
  }
});