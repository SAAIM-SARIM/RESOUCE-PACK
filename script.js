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
  
  // Download CTA: ensure clicking starts a download with a fixed filename (PVP-TEXTURE.zip)
  const downloadBtn = document.getElementById('download-cta');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      const url = this.href;
      // If the page is opened via file:// protocol, skip the fetch approach
      // and let the browser handle the anchor (download attribute) natively.
      if (window.location.protocol === 'file:') {
        // allow default behavior (do not call preventDefault)
        return;
      }

      e.preventDefault();
      const prevText = this.textContent;
      this.textContent = 'Starting download…';
      fetch(url).then(resp => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.blob();
      }).then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = 'PVP-TEXTURE.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      }).catch(err => {
        console.error('Download failed, falling back to direct link:', err);
        // fallback: navigate to URL (browser will handle download if server provides content-disposition)
        window.location.href = url;
      }).finally(() => {
        this.textContent = prevText;
      });
    });
  }
});