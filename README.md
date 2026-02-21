# ⚡ AETHERON — Anime Game Launch Landing Page

A production-grade anime RPG launch page built with React + Vite, Tailwind CSS, Framer Motion, and Supabase.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Backend | Supabase (PostgreSQL) |
| Fonts | Orbitron, Rajdhani, Exo 2 (Google Fonts) |

## Project Structure

```
src/
├── lib/
│   └── supabase.js          # Supabase client + submitPreRegistration()
├── components/
│   ├── Navbar.jsx            # Sticky blur navbar with mobile menu
│   ├── ParticleField.jsx     # Canvas particle animation
│   └── CountdownTimer.jsx    # Animated flip countdown
└── sections/
    ├── Hero.jsx              # Full-screen hero with parallax
    ├── Trailer.jsx           # YouTube embed with scroll fade-in
    ├── Characters.jsx        # Character cards with hover glow
    ├── Countdown.jsx         # Launch countdown section
    ├── PreRegister.jsx       # Email form → Supabase
    └── Footer.jsx            # Social links + neon divider
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE pre_register (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  created_at  timestamp WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE pre_register ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (pre-registration)
CREATE POLICY "Allow anon insert" ON pre_register
  FOR INSERT TO anon WITH CHECK (true);
```

3. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

4. Fill in your credentials from **Project Settings → API**:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Customization

### Change the game title / branding
- Update `AETHERON` in `Navbar.jsx`, `Hero.jsx`, `Footer.jsx`, and `index.html`

### Change the launch date
- In `src/sections/Countdown.jsx`:
  ```js
  const LAUNCH_DATE = '2025-12-31T00:00:00'
  ```

### Change the trailer video
- In `src/sections/Trailer.jsx`, replace the YouTube embed URL:
  ```html
  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ... />
  ```

### Add real character images
- Replace `image` URLs in `src/sections/Characters.jsx` with your actual artwork
- Recommended dimensions: `400×500px` PNG with transparent background

### Hero background image
- In `src/sections/Hero.jsx`, replace the CSS gradient background with:
  ```jsx
  <img src="/hero-bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
  ```

## Production Build

```bash
npm run build
npm run preview
```

## Design System

| Token | Value |
|---|---|
| `neon-purple` | `#bf5fff` |
| `neon-blue` | `#00d4ff` |
| `neon-pink` | `#ff2d78` |
| `neon-cyan` | `#00ffe7` |
| `neon-gold` | `#ffd700` |
| Base BG | `#050816` |

---

Built with ❤️ by AETHERON Studios
