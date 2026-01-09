# Vantage Tech Labs

![Vantage Tech Labs](logo-horizontal.png)

A modern, bilingual landing page for Vantage Tech Labs - showcasing custom software solutions and IoT hardware services for restaurants, bakeries, and retail businesses.

## 🌟 Features

- **Bilingual Support**: Seamless switching between English and Spanish
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI**: Glassmorphism effects, smooth animations, and premium aesthetics
- **Lead Generation**: Interactive quote request form
- **Fast Performance**: Optimized static site with minimal dependencies

## 🚀 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript**: Vanilla JS for interactivity and language switching
- **Fonts**: Google Fonts (Inter, Orbitron)

## 📦 Project Structure

```
VantageTechLabs/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
├── logo.png            # Square logo
├── logo-horizontal.png # Horizontal logo
├── Vangatetechlabs.png # Brand image
├── assets/             # Additional assets
│   ├── software.png
│   └── iot.png
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/VantageTechLabs.git
cd VantageTechLabs
```

2. Open `index.html` in your browser:
```bash
open index.html
# or
python -m http.server 8000
```

3. Make changes and refresh the browser to see updates

## 🌐 Deployment

This site is deployed on [Vercel](https://vercel.com).

### Deploy Your Own

1. Fork this repository
2. Sign up for [Vercel](https://vercel.com)
3. Import your forked repository
4. Vercel will automatically deploy your site

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📝 Customization

### Changing Content

- **Text Content**: Edit `index.html` and update the `translations` object in `script.js`
- **Styles**: Modify `styles.css` - CSS variables are defined at the top for easy theming
- **Images**: Replace images in the root and `assets/` directory

### Adding Languages

1. Add a new language object in `script.js`:
```javascript
const translations = {
  en: { /* ... */ },
  es: { /* ... */ },
  fr: { /* ... */ }  // Add new language
};
```

2. Update the language toggle logic in `script.js`

## 📧 Contact

- **Email**: info@vantagetechlabs.com
- **Website**: [vantagetechlabs.com](https://vantagetechlabs.com)
- **Operating in**: USA & Chile 🌎

## 📄 License

© 2026 Vantage Tech Labs. All rights reserved.

---

Built with ❤️ by Vantage Tech Labs
