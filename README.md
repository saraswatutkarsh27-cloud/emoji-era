# Birthday Landing Page

A customizable, pink-themed birthday landing page with video background, photo gallery, music, and confetti effects.

## Features

- **Intro Cover** — A cover screen with a personalized message before entering the site
- **Video Hero** — Full-screen background video with animated text overlay
- **Photo Gallery** — Horizontal scrolling gallery with macOS Dock-style magnification (scroll vertically, photos move horizontally)
- **Music Player** — Floating play/pause button for background music
- **Confetti** — Celebrate button triggers a canvas confetti burst
- **Responsive** — Works on mobile and desktop

## How to Customize

### 1. Clone or Download

```bash
git clone https://github.com/tanmaymicrosoft2010-hash/custom-landing-page-.git
cd custom-landing-page-
```

### 2. Add Your Own Photos

Replace the images in the `images/` folder. Name them `1.png`, `2.png`, etc. (up to however many you want).

Then update the count in `script.js`:

```js
const totalImages = 22; // change to your number of photos
```

If your images are `.jpg`, update the extension in the same file:

```js
img.src = `images/${i}.jpg`;
```

### 3. Add Your Video

Place your background video in the project root as `video.mp4`. Supported formats: MP4, WebM, Ogg.

### 4. Add Music

Place an audio file (MP3, etc.) in the project root as `song.mp3`. The music auto-plays when the intro is clicked.

### 5. Change the Text

Edit `index.html` to customize:

| Element | What to edit |
|---------|-------------|
| Intro heading | `hey you` |
| Intro sub-text | `sweet asian chick` |
| Gallery title | `see your self` |
| Gallery subtitle | `and keep your standards high` |
| Message heading | `Wishing You the Happiest Birthday!` |
| Message body | The paragraphs below the heading |
| Signature | `Your family & friends` |
| Footer credit | `Made with ♥ by Tanmay` |

### 6. Change the Theme Colors

Edit `style.css` — the color palette uses these key variables:

- `#c2185b` — dark pink (headings)
- `#e91e63` — bright pink (accents)
- `#ff69b4` — medium pink (buttons, borders)
- `#fff0f5` — light pink (backgrounds)
- `#fff5f7` — very light pink (body background)

### 7. Change the Fonts

The page uses [Google Fonts](https://fonts.google.com/):
- **Playfair Display** (serif) — for headings
- **Great Vibes** (cursive) — for names and sub-text

Replace the Google Fonts link in `index.html` and update the `font-family` properties in `style.css`.

## File Structure

```
birthday-landing-page-aaliya/
├── index.html       — Main HTML
├── style.css        — All styles
├── script.js        — JavaScript interactivity
├── video.mp4        — Background video
├── song.mp3         — Background music
├── images/          — Photo gallery (1.png, 2.png, ...)
└── README.md        — This file
```

## Deployment

Push to GitHub Pages or any static host:

```bash
git add .
git commit -m "Your custom changes"
git push
```

## Credits

Made with ♥ by Tanmay
