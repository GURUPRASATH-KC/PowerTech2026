# PowerTech 2026 - Technical Symposium

Welcome to the official frontend repository for **PowerTech 2026**, a national-level technical symposium hosted by ABC Engineering College.

This project is a **standalone, serverless frontend application** designed to look like a premium, futuristic product launch page. It draws heavy design inspiration from the ASUS TUF gaming aesthetic, featuring deep dark backgrounds, vibrant neon accents (Red & Electric Cyan), and high-performance interactive canvas animations.

## 🌟 Key Features

*   **Interactive Lightning Effect:** A custom-built, hardware-accelerated canvas layer that generates branching, jagged lightning forks dynamically as the user moves their mouse.
*   **Immersive Hero Section:** Features a background of floating particle energy orbs and a real-time countdown timer to the event launch.
*   **Glassmorphism UI:** Premium frosted-glass effect applied to event cards, schedules, and modals to create a modern depth-of-field look.
*   **Dynamic Event Modals:** Clicking any event card opens a sleek, animated popup modal containing detailed rules, guidelines, and registration links.
*   **Client-Side Validation:** A complete registration form that validates user input (Email Regex, 10-digit Phone numbers) and simulates an API submission with animated loaders and success states.
*   **Scroll-Reveal Animations:** Elements smoothly fade and slide into view as the user scrolls down the page using the `IntersectionObserver` API.
*   **Fully Responsive:** Flawless layout adaptation across Mobile, Tablet, and Desktop, including a custom mobile hamburger navigation menu.

## 🛠️ Technology Stack

This project was built from scratch without any heavy frontend frameworks to ensure maximum performance and easiest deployment:
*   **HTML5:** Semantic structuring.
*   **CSS3:** Custom variables, Flexbox/Grid layouts, keyframe animations, and media queries.
*   **Vanilla JavaScript (ES6):** DOM manipulation, Canvas API rendering, and event handling.
*   **FontAwesome:** For premium scalable iconography.
*   **Google Fonts:** Utilizing *Orbitron* (Headings) and *Inter* (Body).

## 🚀 How to Run

Because this is a pure frontend application, there are no build steps, Node modules, or databases required.

### Option 1: Direct File Open
Simply double-click the `index.html` file to open it in your default web browser. All animations and scripts will function normally.

### Option 2: Local Server (Recommended for Best Experience)
If you have Node.js installed, you can serve the directory to test it exactly as it would behave on a live server:
```bash
npx serve .
```
Then navigate to `http://localhost:3000` (or whichever port is provided).

## 📁 Directory Structure

```text
PowerTech2026-FrontendOnly/
├── css/
│   └── style.css       # All styles, themes, and animations
├── images/
│   ├── logo.png        # College/Symposium Logo
│   ├── about_tech.png  # AI Hologram Image
│   └── gallery_X.png   # Event placeholder images
├── js/
│   └── script.js       # Animations, Canvas logic, and Form handling
├── index.html          # Main application structure
└── README.md           # Project documentation
```

## 🎨 Customization

*   **Colors:** To change the color scheme, simply edit the CSS variables located at the top of `css/style.css` (`--primary-red`, `--electric-cyan`, etc.).
*   **Countdown Date:** Open `js/script.js` and modify the `eventDate` variable in the Countdown Timer section to your actual event date.

---
*Designed & Developed for ABC Engineering College.*
