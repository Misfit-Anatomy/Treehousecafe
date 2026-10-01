const D = {
  cafe: {
    title: "Tree House Cafe",
    loc: "CP28+QC7, Leopards Hill Rd, Lusaka",
    desc: "Coffee, artisanal food, and the main veranda. Start and end here for all valley trails.",
    time: "Trailhead & Base",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tree+House+Cafe,+CP28%2BQC7,+Leopards+Hill+Rd,+Lusaka"
  },
  spots: {
    title: "Tent spots",
    loc: "Treehouse Grounds, below Leopards Hill",
    desc: "Flat grass pitches below the hill. Bring your own tent or ask about hire.",
    time: "About 10 min walk",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tree+House+Cafe,+CP28%2BQC7,+Leopards+Hill+Rd,+Lusaka"
  },
  camp: {
    title: "Camping area",
    loc: "Treehouse Valley Campsite",
    desc: "Shared fire area, fresh water and the starting point for the evening cave walk.",
    time: "About 15 min walk",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tree+House+Cafe,+CP28%2BQC7,+Leopards+Hill+Rd,+Lusaka"
  },
  hill: {
    title: "Leopards Hill",
    loc: "Leopards Hill Summit Trail",
    desc: "The pointed hill seen from the veranda. A steady climb with a wide 360° panoramic view at the top.",
    time: "About 45 min round trip",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Leopards+Hill,+Lusaka"
  },
  caves: {
    title: "Leopards Hill caves",
    loc: "9PWC+57C, Chisotoka",
    desc: "Historic bat caves in Chisotoka. Walk out near dusk to watch the bats leave. A local guide is recommended.",
    time: "About 1.5 hr round trip",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Leopards+Hill+caves,+9PWC%2B57C,+Chisotoka"
  }
};

const pins = [...document.querySelectorAll('.pin')];
const it = document.getElementById('it');
const id = document.getElementById('id');
const im = document.getElementById('im');
const ilocText = document.getElementById('iloc-text');
const imapbtn = document.getElementById('imapbtn');

function show(k) {
  const item = D[k];
  if (!item) return;
  if (it) it.textContent = item.title;
  if (ilocText) ilocText.textContent = item.loc;
  if (id) id.textContent = item.desc;
  if (im) im.textContent = `Trail info: ${item.time}`;
  if (imapbtn) {
    imapbtn.href = item.mapsUrl;
    imapbtn.textContent = `Open in Google Maps →`;
  }
  pins.forEach(p => p.classList.toggle('on', p.dataset.k === k));
  if (bt) {
    [...bt.children].forEach(b => b.classList.toggle('on', b.dataset.k === k));
  }
}

const bt = document.createElement('div');
bt.className = 'pins';
Object.keys(D).forEach(k => {
  const b = document.createElement('button');
  b.textContent = D[k].title;
  b.dataset.k = k;
  b.onclick = () => show(k);
  bt.appendChild(b);
});

const mapGrid = document.querySelector('.mapgrid');
if (mapGrid) {
  mapGrid.after(bt);
}

pins.forEach(p => {
  p.onclick = () => show(p.dataset.k);
  p.onkeydown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      show(p.dataset.k);
    }
  };
});
show('cafe');

// Map View Switcher: Illustrated Trail Map vs Google Maps
const viewTrailBtn = document.getElementById('viewTrailBtn');
const viewGoogleBtn = document.getElementById('viewGoogleBtn');
const mapTrailView = document.getElementById('mapTrailView');
const mapGoogleView = document.getElementById('mapGoogleView');

if (viewTrailBtn && viewGoogleBtn && mapTrailView && mapGoogleView) {
  viewTrailBtn.onclick = () => {
    viewTrailBtn.classList.add('active');
    viewGoogleBtn.classList.remove('active');
    mapTrailView.style.display = 'block';
    mapGoogleView.classList.remove('active');
  };

  viewGoogleBtn.onclick = () => {
    viewGoogleBtn.classList.add('active');
    viewTrailBtn.classList.remove('active');
    mapTrailView.style.display = 'none';
    mapGoogleView.classList.add('active');
  };
}

// Store carousel navigation
const r = document.getElementById('rail');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
if (prev && r) prev.onclick = () => r.scrollBy({ left: -320, behavior: 'smooth' });
if (next && r) next.onclick = () => r.scrollBy({ left: 320, behavior: 'smooth' });

// Artwork Enquire links helper
document.querySelectorAll('.enquire-link').forEach(link => {
  link.addEventListener('click', e => {
    const itemName = link.dataset.item;
    const form = document.getElementById('f');
    if (form && itemName) {
      if (form.t) form.t.value = 'Ask about an artwork';
      if (form.m) form.m.value = `Enquiring about: ${itemName}`;
    }
  });
});

// Form and WhatsApp booking handling
const f = document.getElementById('f');
const ok = document.getElementById('ok');
const waDirectBtn = document.getElementById('waDirectBtn');
const WHATSAPP_PHONE = '260970000000'; // Treehouse Cafe WhatsApp contact

function generateWhatsAppMessage() {
  const name = (f && f.n && f.n.value) ? f.n.value.trim() : 'Guest';
  const contact = (f && f.c && f.c.value) ? f.c.value.trim() : '';
  const type = (f && f.t && f.t.value) ? f.t.value : 'Reservation';
  const date = (f && f.d && f.d.value) ? f.d.value : 'Upcoming';
  const guests = (f && f.g && f.g.value) ? f.g.value : '2';
  const notes = (f && f.m && f.m.value) ? f.m.value.trim() : '';

  let message = `Hello Treehouse Cafe! 🌲\n\nI'd like to make an enquiry / booking:\n`;
  message += `• Name: ${name}\n`;
  if (contact) message += `• Contact: ${contact}\n`;
  message += `• Type: ${type}\n`;
  message += `• Date: ${date}\n`;
  message += `• Number of guests: ${guests}\n`;
  if (notes) message += `• Notes: ${notes}\n`;

  return encodeURIComponent(message);
}

if (waDirectBtn) {
  waDirectBtn.addEventListener('click', () => {
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
    window.open(url, '_blank');
  });
}

if (f) {
  f.onsubmit = e => {
    e.preventDefault();
    const name = f.n.value || 'Friend';
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
    
    if (ok) {
      ok.style.display = 'block';
      ok.innerHTML = `
        <h4 style="margin:0 0 0.5rem;color:var(--forest)">Request received, ${name}!</h4>
        <p style="margin:0 0 0.8rem;color:var(--muted)">We have noted your details. For the quickest confirmation, send your booking request directly to our veranda team on WhatsApp:</p>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="margin-top:0.3rem">
          <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.66.74 5.15 2.03 7.28L2.5 29.5l6.43-1.48A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55c-2.3 0-4.46-.66-6.3-1.8l-.45-.28-4.22.97.99-4.11-.3-.47A11.48 11.48 0 0 1 4.45 16C4.45 9.63 9.63 4.45 16 4.45c6.37 0 11.55 5.18 11.55 11.55 0 6.37-5.18 11.55-11.55 11.55zm6.34-8.66c-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.17-.79.18-.23.35-.91 1.13-1.11 1.36-.2.23-.41.26-.76.09-.35-.17-1.48-.55-2.82-1.74-1.04-.93-1.74-2.08-1.95-2.43-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.79-1.9-1.08-2.6-.28-.68-.57-.59-.79-.6l-.67-.01c-.23 0-.61.09-.93.44-.32.35-1.22 1.2-1.22 2.92s1.25 3.39 1.43 3.62c.17.23 2.46 3.76 5.96 5.27.83.36 1.48.57 1.99.73.84.27 1.6.23 2.2.14.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.5.2-1.65-.08-.14-.32-.23-.67-.4z"/></svg>
          <span>Send Booking to WhatsApp</span>
        </a>
      `;
      ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
}

// Interactive Header Image file upload
const headerImgInput = document.getElementById('headerImgInput');
const heroBgImg = document.getElementById('heroBgImg');

if (headerImgInput) {
  headerImgInput.addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async event => {
      const base64 = event.target.result;
      if (heroBgImg) {
        heroBgImg.src = base64;
      }

      try {
        await fetch('/api/upload-header', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 })
        });
      } catch (err) {
        console.error('Failed to sync header image to server:', err);
      }
    };
    reader.readAsDataURL(file);
  });
}
