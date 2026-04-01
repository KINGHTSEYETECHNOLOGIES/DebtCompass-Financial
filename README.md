# DebtCompass Financial — Debt Relief Matcher

A free, interactive web application that matches users to debt relief and credit-building solutions in under 60 seconds based on their financial situation.

## Features

- **3-Question Quiz Flow**: Gathers debt level, credit score range, and financial goals
- **Real-Time Matching**: Routes users to appropriate debt relief or credit-building products
- **Responsive Design**: Mobile-first, works seamlessly across all devices
- **Affiliate Integration**: Built-in support for multiple partner programs (National Debt Relief, OpenSky®)
- **GTM Analytics**: Google Tag Manager integration for conversion tracking
- **No Credit Pull**: Initial assessment requires no credit check
- **Processing Animation**: Professional UX with step-by-step processing feedback

## Project Structure

```
debtcompassfinancial/
├── index.html              # Main quiz application
├── legal.html              # Privacy, Terms, and Advertiser Disclosure
├── direct-ndr.html         # Direct link to National Debt Relief
├── direct-jg.html          # Direct link to JG Wentworth
├── direct-freedom.html     # Direct link to Freedom Financial
├── direct-template.html    # Template for adding additional partners
├── favicon.svg             # Brand icon
├── robots.txt              # SEO robots directives
├── sitemap.xml             # XML sitemap for search engines
└── README.md               # This file
```

## How It Works

### User Flow
1. **Landing Screen**: User sees value proposition and trust indicators
2. **Debt Assessment** (Q1): Asks about unsecured debt level ($0–$10k+)
3. **Credit Score** (Q2): Collects approximate credit score range
4. **Financial Goal** (Q3): Identifies primary objective (reduce debt, build credit, or both)
5. **Processing**: Shows animated processing steps
6. **Results**: Displays personalized recommendation with key benefits and affiliate link

### Routing Logic
- **Debt Relief Track**: Recommended for users with $10k+ debt, or $2–10k debt seeking reduction
- **Credit Building Track**: Recommended for users with lower debt seeking credit improvement

## Technical Stack

- **HTML5**: Semantic markup with embedded CSS and vanilla JavaScript
- **CSS3**: Modern layout with flexbox, animations, and responsive design
- **JavaScript**: Vanilla (no frameworks) — quiz logic, DOM manipulation, screen transitions
- **Google Tag Manager**: Event tracking (GTM-PNBV6TXX)

## Key Components

### JavaScript Functions
- `startQuiz()` — Initialize quiz flow
- `goTo(screenId)` — Screen navigation with smooth scrolling
- `selectOpt(el, key, val)` — Option selection and button state management
- `showProcessing()` — Animated processing sequence
- `showResult()` — Render personalized offer based on routing logic

### Color Scheme (CSS Variables)
- Navy (`#0f2342`) — Primary brand color
- Teal (`#0d9488`) — Accent / CTA color
- Cream (`#faf8f4`) — Background
- Muted (`#64748b`) — Secondary text
- Success (`#059669`) — Validation / checkmarks

## Customization

### Adding Affiliate Partners
1. Edit the `offers` object in the `showResult()` function
2. Add new offer keys with logo, name, type, benefits, and affiliate links
3. Adjust routing logic if needed

### Updating GTM Container ID
Replace `GTM-PNBV6TXX` in:
- Google Tag Manager script (head)
- Google Tag Manager noscript (body)

### Styling
All styles are in the `<style>` block. Update CSS variables in `:root` for quick theme changes.

## Compliance & Legal

- **Privacy Policy**: See [legal.html#privacy](legal.html#privacy)
- **Terms of Service**: See [legal.html#terms](legal.html#terms)
- **Advertiser Disclosure**: See [legal.html#disclosure](legal.html#disclosure)
- **Disclaimer**: No credit checks are performed; results are for informational purposes only

## Performance

- **Page Load**: < 100ms (inline CSS, no external scripts except GTM)
- **Time to Interactive**: < 500ms
- **Mobile Optimization**: Fully responsive, tested down to 320px width
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## Security

- **No Data Storage**: User responses not retained on device after session
- **External Links**: All affiliate links open in new tabs with `rel="noopener"` for security
- **No API Dependencies**: Fully client-side routing and rendering

## Deployment

### Local Testing
Simply open `index.html` in a web browser.

### Production Deployment
1. Update affiliate links in the `offers` object
2. Replace GTM container ID if using different account
3. Update domain in `robots.txt` and `sitemap.xml`
4. Host on any static hosting provider (GitHub Pages, Netlify, Vercel, AWS S3, etc.)

## License

Proprietary — All rights reserved by DebtCompass Financial

## Support

For issues, feature requests, or questions, please contact: [support email]

---

**Last Updated**: April 2025  
**Version**: 1.0  
**Status**: Production-Ready
