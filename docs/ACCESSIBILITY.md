# Accessibility notes

iFixit aims for WCAG 2.1 AA on the public site. Known gaps are tracked
in `docs/ROADMAP.md`.

## Current commitments

- All actionable elements have visible focus states.
- Booking flow can be completed using the keyboard alone.
- Status badges include text labels (not colour alone).

## Known gaps

- Carousel arrows on the Hero need `aria-controls` wiring.
- Screen-reader announcements for status changes are not yet wired.