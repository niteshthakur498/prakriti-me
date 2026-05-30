---
name: Vedic Vitality System
colors:
  surface: '#fff8f6'
  surface-dim: '#f8d2c4'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ec'
  surface-container: '#ffe9e2'
  surface-container-high: '#ffe2d8'
  surface-container-highest: '#ffdbce'
  on-surface: '#2a170f'
  on-surface-variant: '#534434'
  inverse-surface: '#422b22'
  inverse-on-surface: '#ffede7'
  outline: '#857462'
  outline-variant: '#d8c3ae'
  surface-tint: '#865300'
  primary: '#865300'
  on-primary: '#ffffff'
  primary-container: '#f4a023'
  on-primary-container: '#623c00'
  inverse-primary: '#ffb960'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#904d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff993a'
  on-tertiary-container: '#6a3700'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb960'
  on-primary-fixed: '#2b1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#fff8f6'
  on-background: '#2a170f'
  surface-variant: '#ffdbce'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  sanskrit-quote:
    fontFamily: Noto Serif Devanagari
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: auto
  max-width-content: 1200px
---

## Brand & Style
The design system is rooted in the concept of *Prana*—the vital life force. It captures the essence of a sunlit morning in an Indian botanical garden, blending traditional Ayurvedic wisdom with a modern, high-energy digital experience. 

The visual style is **Warm Modernism**. It avoids the clinical coldness of typical health apps, instead opting for a "Tactile-Luxe" approach. This combines organic shapes, rich earth-toned shadows, and the clarity of contemporary SaaS layouts. The emotional goal is to feel professional and data-driven yet deeply nurturing and uplifting, similar to the inviting nature of premium wellness retreats.

## Colors
The palette is built on "Saffron Light." The primary brand colors use high-energy warm tones to drive action and focus. 

- **Primary & Secondary:** Saffron and Turmeric are reserved for interactive elements, CTAs, and vital status indicators.
- **Balance Tones:** Forest and Sage provide a grounding contrast, used for navigation, success states, and calming content sections.
- **Backgrounds:** Use `--cream` for the main canvas and `--warm-white` for elevated card surfaces to create subtle tonal depth without relying on harsh greys.
- **Dosha System:** Specific colors (Sky, Coral, Forest) function as semantic identifiers. When a user’s constitution is active, the UI can subtly shift its accent color to match their dominant Dosha.
- **Typography:** Avoid pure black. Use the deep brown `--text-primary` to maintain the warm, organic feel.

## Typography
The typographic scale emphasizes a "Literary-Modern" hybrid. 

- **Headlines:** Playfair Display provides a premium, authoritative, and editorial feel. It should be used for all major page titles and section headers.
- **Body:** Inter ensures maximum readability for complex health data and long-form wellness guides.
- **Sanskrit:** Noto Serif Devanagari is used specifically for Vedic terms and traditional quotes, integrated seamlessly into the layout to honor the source culture.
- **Formatting:** Use generous line heights (1.5x for body) to maintain a sense of "breath" and whitespace within the text.

## Layout & Spacing
The design system employs a strict **8px linear grid** to ensure harmony across all components.

- **Grid:** A 12-column fluid grid for desktop and a 4-column grid for mobile.
- **Container:** Content is centered with a max-width of 1200px.
- **Rhythm:** Use `md` (24px) for standard padding inside cards and `lg` (40px) for vertical section spacing to maintain an airy, "sunlit" atmosphere.
- **Mobile:** Margins are set to 20px to prevent content from touching the screen edges, maintaining a premium "framed" look.

## Elevation & Depth
Depth in this design system is created through **Tonal Warmth** rather than neutral shadows.

- **Shadows:** Use a unique "Sun-Tinted" shadow: `0px 10px 30px rgba(244, 160, 35, 0.12)`. This creates an organic glow that feels like light passing through saffron-colored fabric.
- **Glassmorphism:** Navigation bars and floating action menus should utilize a frosted glass effect (`backdrop-filter: blur(12px)`) with a `rgba(255, 250, 243, 0.8)` background.
- **Surface Tiers:**
  1. **Level 0 (Base):** `--cream` background.
  2. **Level 1 (Cards):** `--warm-white` with a 1px border of `#E8D5C0`.
  3. **Level 2 (Hover/Active):** Apply the Sun-Tinted shadow and a subtle -4px vertical lift.

## Shapes
The shape language is organic and approachable. Sharp corners are avoided to maintain a "gentle" user experience.

- **Cards:** 16px radius creates a modern, soft container.
- **Interactive Elements:** Buttons use a 24px (Pill) radius to invite interaction and feel "squishy" and friendly.
- **Tags/Chips:** A smaller 8px radius provides enough distinction from buttons while remaining cohesive with the system's softness.

## Components
- **Buttons:** Primary buttons use the Saffron gradient to Turmeric. They should have a subtle inner glow on the top edge to simulate a 3D tactile feel.
- **Cards:** Large "Constitution Cards" feature the Dosha-specific background color at 10% opacity, with a bold Playfair Display title. On hover, the card lifts and the border color intensifies.
- **Progress Bars:** Use a "Segmented Flow" design. As a user completes a journey (e.g., from Vata to Kapha balance), the progress bar color should dynamically transition between the Dosha palette colors.
- **Pill-style Tabs:** The active state should be a high-contrast Saffron with white text, while inactive tabs use a `--warm-white` background with a subtle border.
- **Inputs:** Text fields should have a soft `--cream` fill and an `#E8D5C0` border that transforms to Saffron on focus.
- **Dosha Badges:** Small, circular avatars or icons with the Dosha color used for "Quick-Glance" constitution tracking in the header.