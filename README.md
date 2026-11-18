# Nikkah Story Invitation

HOORIQA STUDIO — VIP CINEMATIC NIKKAH INVITATION

Build a complete, premium, fully functional, cinematic digital Nikkah invitation website for HOORIQA STUDIO.

This is a complete website project, not a landing page mockup, not a static design and not a collection of screenshots.

Build the actual working experience with functional interactions, animations, navigation, forms and responsive layouts.

1. BRAND IDENTITY

Brand: HOORIQA STUDIO
Tagline: Every Invitation Tells a Story.

Design direction:

Ultra-premium VIP wedding experience.

Royal emerald green, champagne gold, ivory and subtle burgundy.

Cinematic lighting and elegant floral decoration.

Luxury editorial typography with beautiful calligraphy-inspired accents.

Sophisticated visual hierarchy.

Realistic-looking decorative elements.

Soft shadows, gold foil, glass effects and refined textures.

Avoid childish graphics, cheap gradients, excessive rounded cards and generic website templates.

The design must feel like an expensive custom digital wedding experience.

2. FIRST SCREEN — FLYING LANTERN CINEMATIC INTRO

This is the most important feature.

Create a full-screen cinematic opening scene.

Scene:

Deep midnight emerald sky.

Tiny glowing stars.

Floating golden dust particles.

Soft atmospheric fog.

A beautiful, realistic 3D-style golden lantern floating in the center.

Warm light glowing from inside the lantern.

Animation sequence:

The lantern appears in the distance.

It slowly floats through the night sky.

The camera smoothly zooms towards the flying lantern.

The lantern moves closer to the screen.

Its golden light becomes brighter.

The lantern gracefully transforms into a luxurious wedding invitation card.

The card rotates gently towards the viewer.

The card opens with a realistic 3D unfolding animation.

Reveal the couple's initials: A & Z.

Show a beautiful invitation message.

Add a button: ENTER INVITATION.

When clicked, transition smoothly into the main scrolling wedding website.

Important:

The lantern must actually animate.

The camera zoom must be visible.

The card transformation must be animated.

The card must actually open.

Do not replace this sequence with a simple fade-in.

Use CSS 3D transforms, Framer Motion and layered visual elements.

If realistic 3D assets are unavailable, create a sophisticated layered CSS/SVG lantern with convincing depth and lighting.

Include a small Skip Intro option.

3. MAIN WEBSITE — LONG SCROLLING EXPERIENCE

After the intro, create a beautiful, continuous, long-scrolling invitation website.

Use smooth scrolling and elegant scroll-triggered animations.

Section 1 — Hero

Full-screen luxury wedding hero.

Large couple initials A & Z.

Names: Ayaan & Zara.

Nikkah announcement.

Beautiful background with floral decorations.

Floating golden particles.

Animated scroll indicator.

Section 2 — Wedding Announcement

Display an elegant message:

"With the blessings of Allah and the love of our families, we invite you to celebrate the beginning of our forever."

Use beautiful typography and animated text reveals.

Section 3 — Meet the Couple

Create separate bride and groom introduction sections.

Bride: Zara
Groom: Ayaan

Use elegant portrait placeholders that can later be replaced with uploaded photographs.

Add gentle image zoom, reveal animations and decorative floral frames.

Section 4 — Family Invitation

Create a beautiful family invitation message.

Include editable bride and groom family names.

Use an elegant ivory and gold layout.

Section 5 — Nikkah Details

Show:

Nikkah date.

Day.

Time.

Venue.

Address.

Use a luxury invitation-card design.

Make all details editable from a central configuration file.

Section 6 — Countdown

Create a live countdown timer showing:

Days.

Hours.

Minutes.

Seconds.

Use the editable event date.

The countdown must update every second and show a special completed state after the event date.

Section 7 — Event Schedule

Create elegant individual event cards for:

Mehndi

Nikkah

Baraat

Walima

Each card should have:

Its own decorative image.

Event date and time.

Venue.

Description.

Animated reveal.

Unique visual styling.

Section 8 — Venue Experience

Create a premium venue section.

Include:

Venue photograph.

Venue name.

Full address.

Get Directions button.

The Google Maps button must open the correct editable map URL.

Use a clearly marked sample map URL until the actual venue is provided.

Section 9 — Wedding Gallery

Create an elegant photo gallery.

Features:

Responsive image grid.

Click-to-open lightbox.

Next and previous image navigation.

Close button.

Smooth image transitions.

Use replaceable sample images.

Section 10 — Guest RSVP

Create a working RSVP form.

Fields:

Guest name.

Attendance confirmation.

Number of guests.

Optional message.

Requirements:

Validate required fields.

Display helpful error messages.

Show confirmation after successful submission.

Prevent accidental duplicate submissions.

Save demo submissions in localStorage.

Keep data handling clearly identified as local demo storage, not a real online database.

Section 11 — Guest Wishes

Create a beautiful wishes and greetings section.

Guests can enter:

Their name.

Their wishes.

Save demo wishes locally and display submitted wishes on the page.

Clearly explain that wishes are stored on this device only until a real database is connected.

Section 12 — Final Thank You

Create a cinematic closing section with:

Couple initials.

Elegant thank-you message.

Floating golden particles.

Floral decoration.

Back-to-top button.

4. ADVANCED ANIMATION SYSTEM

Use Framer Motion where appropriate.

Implement:

Smooth scrolling.

Scroll-triggered reveals.

Parallax backgrounds.

Floating flower petals.

Golden dust particles.

Soft glowing light.

Image reveal transitions.

3D card tilt.

Elegant section transitions.

Animated typography.

Hover effects.

Subtle background movement.

Animations should feel smooth and luxurious, not excessive.

Respect reduced-motion accessibility settings.

5. FUNCTIONAL FEATURES

Implement all of these:

Background music toggle.

Visible music ON/OFF status.

Smooth scrolling navigation.

Working countdown.

Functional RSVP form.

Functional guest wishes form.

Gallery lightbox.

Venue directions link.

Copy invitation link button.

Native sharing where supported, with clipboard fallback.

Downloadable calendar invitation (.ics).

Back-to-top button.

Mobile navigation menu.

Skip intro button.

Enter invitation button.

For music:

Do not autoplay audio without user interaction.

Use a replaceable audio file.

Provide a graceful fallback if no audio file is available.

For calendar:

Generate a valid downloadable ICS file using the editable event details.

For sharing:

Use the Web Share API when available.

Otherwise copy the website URL.

Every visible button must have a real action.

Never create decorative buttons that do nothing.

6. TECHNICAL STRUCTURE

Use:

React.

TypeScript.

Tailwind CSS.

Framer Motion.

Lucide icons.

Organize the project into reusable components.

Suggested components:

LanternIntro

InvitationCard

HeroSection

CoupleSection

FamilySection

NikkahDetails

Countdown

EventSchedule

VenueSection

WeddingGallery

RSVPForm

GuestWishes

MusicController

Footer

Create a central editable wedding configuration file containing:

Couple names.

Initials.

Date.

Time.

Venue.

Address.

Maps URL.

Family names.

Event details.

Gallery images.

Music file path.

Do not hardcode wedding details in multiple components.

7. MOBILE AND PERFORMANCE

The website must work properly on:

Mobile phones.

Tablets.

Desktop computers.

Requirements:

Responsive layouts.

Touch-friendly controls.

Optimized images.

Smooth animations.

No horizontal overflow.

No broken images.

No console errors.

Accessible labels and keyboard navigation.

Reduced-motion support.

8. DEMO CONTENT

Use these editable sample details:

Bride: Zara
Groom: Ayaan
Initials: A & Z
Nikkah date: 12 December 2027
Venue: Royal Wedding Venue (sample)
Location: Karachi, Pakistan

Clearly mark sample details so they can be replaced later.

9. FINAL QUALITY REQUIREMENTS

Before completing the project:

Test the entire lantern animation.

Test the card-opening interaction.

Test the transition into the scrolling website.

Test every navigation link.

Test all buttons.

Test countdown accuracy.

Test RSVP validation.

Test guest wishes.

Test image gallery.

Test mobile responsiveness.

Fix broken layouts and runtime errors.

Do not stop after creating the visual design.

Build the complete working website.

FINAL CREATIVE DIRECTION:

The guest should feel that they are entering a magical royal wedding experience. The flying lantern should be the memorable signature opening of HOORIQA STUDIO. After the cinematic opening, the invitation should unfold into a beautiful, premium, interactive scrolling Nikkah website.

Make it visually exceptional, technically functional and original.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nikkah-story-invitation.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/973ef5fb-6408-58e1-9fde-48f2d5840af6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
