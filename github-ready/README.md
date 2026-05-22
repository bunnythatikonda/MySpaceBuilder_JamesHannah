# James Hannah Auto Body & Collision Center

A modern, premium, fully responsive single-page website for an automotive collision repair shop in Wichita, KS.

Built with **pure HTML, CSS, and JavaScript** — no build step, no framework, no Node.js required.

![Hero Screenshot](https://image.pollinations.ai/prompt/Modern%20dark%20automotive%20website%20screenshot%2C%20cinematic%20collision%20repair%20center%20with%20red%20orange%20accent?width=1200&height=600&nologo=true)

---

## ✨ Features

- 🎬 Cinematic hero with Ken Burns animation and animated counters
- 🔧 10 service cards with hover animations
- 🎚️ Interactive drag before/after slider (AI-generated matched pair)
- ⭐ Auto-rotating customer reviews carousel
- 📅 Booking & free-estimate forms (client-side; show confirmation toast)
- 🖼️ Masonry gallery with lightbox
- 🏛️ Insurance partners + 4-step claim process
- 📖 About section with animated timeline
- ❓ FAQ accordion
- 📞 Floating call button + live-chat widget
- 🗺️ Embedded Google Maps
- 🌑 Premium dark/charcoal theme with red/orange fire-gradient accents
- 📱 Fully responsive (mobile / tablet / desktop)
- ⚡ SEO meta tags, Open Graph, schema-friendly

---

## 🚀 Quick Start

### Option 1 — Open Locally

Just double-click `index.html`. Done.

### Option 2 — Run a Local Server

```bash
# Python 3
python3 -m http.server 8000

# Then visit http://localhost:8000
```

Or Node.js:

```bash
npx serve .
```

---

## 📦 Deploy to GitHub Pages

```bash
# 1. Create a new GitHub repo (e.g., jameshannah-site)

# 2. Push your code:
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 3. Enable GitHub Pages:
#    Settings → Pages → Source: Deploy from a branch
#    Branch: main / (root)
#    Save

# 4. Visit: https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

## 🌐 Deploy to Netlify (1-Click)

1. Drag-and-drop the project folder into [Netlify Drop](https://app.netlify.com/drop)
2. Done. Your site is live with a free `.netlify.app` domain.

---

## 🌐 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts. Done.

---

## 🛠️ Customisation

### Change Business Info

Open `index.html` and search/replace:

| What | Where |
|------|-------|
| Business name | `JAMES HANNAH` |
| Phone number | `(316) 555-0142` and `+13165550142` |
| Email | `service@jameshannahauto.com` |
| Address | `2418 S Seneca St, Wichita, KS 67213` |
| Map | `src="https://www.google.com/maps?q=..."` |

### Change Colors

All accent colors use red `#ef4444` and orange `#f97316`. Find & replace those hex values in the `<style>` block at the top.

### Update Services / Reviews / FAQs

Scroll to the bottom of `index.html` to the `<script>` section and edit the data arrays:

- `SERVICES` — 10 service cards
- `REVIEWS` — customer testimonials
- `FAQS` — frequently asked questions
- `INSURANCE_STEPS` — claim process steps
- `INSURANCE` — partner logos
- `TIMELINE` — about-us timeline events
- `GALLERY_IMAGES` — image URLs for the masonry gallery

### Connect Forms to a Real Backend

The estimate, booking, and contact forms currently just show a confirmation toast. To actually receive submissions, replace the `handleEstimate`, `handleBooking`, and `handleContact` functions with a fetch to your endpoint — or use a no-code service:

- [**Formspree**](https://formspree.io) — easiest, free tier available
- [**Netlify Forms**](https://www.netlify.com/products/forms/) — free if you host on Netlify
- [**Web3Forms**](https://web3forms.com) — free, no signup required
- [**Google Forms** embed](https://forms.google.com) — totally free

#### Example — Formspree integration

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, copy your endpoint (e.g., `https://formspree.io/f/xyzabc123`)
3. Replace `handleBooking` in `index.html`:

```js
async function handleBooking(e) {
  e.preventDefault();
  const data = getFormData(e.target);
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  toast(`✓ Appointment confirmed! We'll contact you shortly.`);
  e.target.reset();
}
```

---

## 📂 File Structure

```
.
├── index.html       # The entire website (HTML + inline CSS + inline JS)
├── README.md        # This file
├── LICENSE          # MIT License
└── .gitignore
```

That's it. One file. Self-contained.

---

## 🎨 Tech Used (all via CDN — no install)

- [Tailwind CSS](https://tailwindcss.com) (CDN)
- [Lucide Icons](https://lucide.dev) (CDN)
- [Google Fonts](https://fonts.google.com) — Inter + Bebas Neue
- [Pollinations.ai](https://pollinations.ai) — AI-generated before/after images (free, no key)
- Unsplash + Pexels for stock photos

---

## 📄 License

MIT — see [LICENSE](./LICENSE)
