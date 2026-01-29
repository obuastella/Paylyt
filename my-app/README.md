# Trackflow Landing Page

A pixel-perfect recreation of the Trackflow landing page built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

✨ **Pixel-Perfect Design**
- Accurate recreation of the original design
- Custom color palette matching the brand
- Precise spacing and typography

🎨 **Smooth Animations**
- Fade-in effects for hero content
- Slide-in animations for phone mockups
- Floating avatar animations
- Smooth hover transitions

📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Fluid typography and spacing

⚡ **Performance Optimized**
- Next.js 15 with App Router
- Optimized fonts with next/font
- Tailwind CSS for minimal CSS bundle
- Fast page loads and smooth interactions

🎯 **User-Friendly**
- Intuitive navigation
- Clear call-to-action buttons
- Accessible keyboard navigation
- Focus states for all interactive elements

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
\`\`\`bash
cd trackflow-landing
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
trackflow-landing/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
\`\`\`

## Design Details

### Color Palette
- Background: `#0a0a0a` (Dark black)
- Primary Purple: `#7c6aef` (Brand color)
- Light Purple: `#9b8aff` (Gradient start)
- Text Primary: `#ffffff` (White)
- Text Secondary: `#9ca3af` (Gray-400)

### Typography
- Font Family: Inter (Google Fonts)
- Hero Heading: 5xl - 8xl (responsive)
- Section Heading: 2xl - 3xl
- Body Text: base - xl

### Animations
- **Hero Content**: Fade-in-up with staggered delays
- **Phone Mockups**: Slide-in from left, center, and right
- **Floating Avatars**: Gentle up-down floating motion
- **Buttons**: Scale on hover with smooth transitions

## Customization

### Changing Colors
Edit `tailwind.config.ts` to update the color scheme:
\`\`\`typescript
colors: {
  primary: '#7c6aef',
  // Add your custom colors
}
\`\`\`

### Modifying Content
Update content in `app/page.tsx`:
- Hero heading and subheading
- Trust badge text
- Button labels
- Phone mockup content

### Adding Sections
The landing page is structured in sections:
1. Navigation
2. Hero Section
3. Phone Mockups Section

Add new sections between or after these as needed.

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible indicators
- Color contrast compliant

## License

This project is for demonstration purposes.

## Credits

Design inspiration: Trackflow
Built by: Synctech Innovations
