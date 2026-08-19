# Ferrous — Documentation Index

This folder documents how the prompt pack's 7 prompts map onto this repo.
Prompt 1 (creative direction) and its 6 pages are the codebase itself —
everything else here is either implemented in code (linked inline) or an
audit finding against that code.

1. [Technical Build Plan](./01-technical-build-plan.md) — stack, component
   architecture, state management, routing, data-fetching strategy, file tree.
2. [Performance Audit](./02-performance-audit.md) — images, fonts, JS,
   critical rendering path, caching/ISR, targets.
3. [SEO](./03-seo.md) — structured data, metadata template, URL structure,
   content strategy, sitemap/robots.
4. [CRO Findings](./04-cro-findings.md) — Issue → Why → Fix, PDP through
   post-purchase.
5. [Accessibility Audit](./05-accessibility.md) — WCAG 2.2 AA, with the one
   contrast issue found and fixed during the build.
6. [Analytics & Experimentation](./06-analytics-and-experimentation.md) —
   GA4-shaped event tracking, funnel dashboards, A/B testing scaffold,
   Core Web Vitals monitoring.
