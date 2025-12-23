# Quantum Forge — Next-Gen Design Vision

Enterprise-grade intranet evolving from the contest build (`index.html`, 16+ legacy pages) into the modern Next.js/Tailwind/Shadcn stack defined in `.github/copilot-instructions.md` and `MODERNIZATION_PLAN.md`. This document is the single source of truth for how the new system should look, feel, and behave.

---

## 1. Objectives & Guiding Principles

| Principle | Description |
| --- | --- |
| **Modern Enterprise Polish** | Pair cinematic gradients + glass layering (Dribbble “Enterprise OS” inspiration) with pragmatic layout discipline so the UI feels premium without being frivolous. |
| **Productivity-First** | Every artifact must surface the most important information within 3 seconds; whitespace + hierarchy over decoration. |
| **AI Copilot Native** | Copilot lives everywhere (dock, inline suggestions, proactive cards). Treat it as a core navigation paradigm, not an add-on. |
| **Accessibility & Trust** | WCAG 2.1 AA, reduced motion pathways, keyboard navigation, transparent system feedback. |
| **Composable System** | Start with semantic tokens → Tailwind v4 config → Shadcn overrides; engineering should assemble experiences from a consistent kit. |

---

## 2. Visual Language

### 2.1 Color & Light System

| Token | Hex | Semantic Usage |
| --- | --- | --- |
| `--brand-900` | `#0B1021` | App shell background, high-depth modals. |
| `--brand-800` | `#121935` | Sidebar, top nav, command bar. |
| `--brand-700` | `#1F2852` | Primary card surfaces (glass layer with 8–12% transparency). |
| `--brand-100` | `#F5F7FB` | Light-mode shell background. |
| `--accent-primary` | `#7367F0` | Primary actions, navigation highlights, hero stats. |
| `--accent-secondary` | `#3BC9F3` | Informational highlights, AI/system signals, focus rings. |
| `--accent-success` | `#36D399` | Positive KPI trends, success alerts. |
| `--accent-warning` | `#F8C572` | Deadlines, attention states. |
| `--accent-critical` | `#F47280` | Blocking issues, SLA breaches. |
| `--neutral-200` | `#E2E8F0` | Borders in light mode, dividers. |
| `--neutral-400` | `#94A3B8` | Secondary text, icon fills. |
| `--neutral-50` | `#F8FAFC` | Text on dark backgrounds, skeleton shimmer. |

#### Light Mode Mirroring

| Token | Hex | Notes |
| --- | --- | --- |
| `--lm-surface` | `#FFFFFF` | Card background w/ subtle drop shadow (`0 20px 48px rgba(11,16,33,0.07)`). |
| `--lm-shell` | `#F5F7FB` | Root background; maintain 8px border radius on cards for continuity. |
| `--lm-text-primary` | `#0B1021` | Body text. |
| `--lm-text-secondary` | `#475569` | Muted text, captions. |

#### Gradient Tokens

```css
:root {
  --gradient-hero: linear-gradient(135deg, var(--brand-900) 0%, var(--brand-700) 100%);
  --gradient-ai-glow: radial-gradient(circle, rgba(115,103,240,0.25) 0%, transparent 70%);
  --gradient-accent: linear-gradient(120deg, var(--accent-primary), var(--accent-secondary));
  --gradient-success: linear-gradient(135deg, #1EB980, var(--accent-success));
}
```

### 2.2 Typography Scale & Rhythm

| Token | Size | Line Height | Weight | Use Case |
| --- | --- | --- | --- | --- |
| `display-1` | 56px | 1.1 | 600 | Dashboard hero stats, motivational numbers. |
| `display-2` | 40px | 1.2 | 600 | AI Copilot briefing titles, large KPI card. |
| `heading-1` | 32px | 1.3 | 600 | Section headers on primary pages. |
| `heading-2` | 24px | 1.3 | 500 | Card titles, sidebar section labels. |
| `body-lg` | 18px | 1.6 | 400 | Descriptive copy, onboarding text. |
| `body` | 16px | 1.6 | 400/500 | Default paragraph text. |
| `label` | 14px | 1.5 | 500 | Form labels, badges, column headers. |
| `caption` | 12px | 1.4 | 400 | Metadata, timestamps, helper text. |

Typeface pairing: **Space Grotesk** (display/headers), **Inter** (body/UI), **Geist Mono** (data, code, metric sub-labels). Track letter-spacing at `0` for display, `0.02em` for captions.

### 2.3 Iconography, Imagery, & Illustration

- **Icons**: Lucide duotone style; base fill `var(--neutral-400)` w/ accent stroke on hover. Maintain 20/24/32px sets.
- **Avatars**: Soft gradient rings using `--gradient-accent`, drop shadow `0 0 25px rgba(59,201,243,0.35)`.
- **Photography**: Use desaturated office imagery with gradient overlays (#0B1021 w/ 40% opacity) for consistency.
- **Illustrations**: Minimal line/shape combos referencing Humanloop/Intercom style; avoid cartoon mascots.

### 2.4 Data Visualization Guidelines

| Chart Type | Usage | Styling Notes |
| --- | --- | --- |
| Line / Area | Trend monitoring (engagement, SLA). | 3px stroke, rounded joints, gradient fill to transparent. |
| Bar / Column | Comparisons (team performance). | Rounded caps, 8px gap, consistent color mapping (success = green, warning = amber). |
| Donut / Radial | Goal progress, capacity. | 12px inner shadow, center label using `display-2`. |
| Heatmap | Calendar productivity, wellness trends. | 5-step color ramp from `#1F2852` to `#36D399`. |
| Sparkline | Secondary context on KPI cards. | Minimal gridlines (#FFFFFF08), animate draw on load. |

Legends should be pill-based, 12px text, color swatch radius 999px. Provide data labels only when necessary to avoid clutter.

### 2.5 Content & Voice

- Tone: confident, calm, collaborative (Linear meets Superhuman).  
- Copilot voice: proactive but concise, e.g., “I drafted a wellness reminder—you can send or tweak.”  
- Error copy: action-oriented (“Reconnect to update stats”).  
- Avoid jargon; focus on verbs (“Review tasks”, “Launch sprint”).

---

## 3. Inspiration & Moodboard Directions

| Source | Takeaway |
| --- | --- |
| **Dribbble – Enterprise OS dashboards** | Layered cards with aurora gradients, pill navigation. |
| **Dribbble – AI copilot explorations** | Neon accent glows, conversational layouts. |
| **CodePen – Glassmorphism dashboards** | Implementation references for frosted surfaces & gradient meshes. |
| **Linear / Notion Calendar / Superhuman** | Typographic restraint, crisp command bars, purposeful whitespace. |

Action: compile a shared moodboard (12–15 references: 6 hero dashboards, 3 AI/collab explorations, 3 motion/micro-interaction clips, 3 data viz exemplars). Annotate each with “use this for…” notes.

---

## 4. Layout System & Responsive Strategy

### 4.1 Structural Grid

| Layer | Details |
| --- | --- |
| **Macro Layout** | 1440px reference, 12-column grid (24px gutter). Sidebar 72px collapsed / 256px expanded. Top bar 64px height with command input. |
| **Panels** | Border radius 28px, inner border `rgba(255,255,255,0.08)`, 3 elevation tiers (surface, raised, floating). |
| **Spacing Scale** | `4 / 8 / 12 / 16 / 24 / 32 / 40 / 64`. Vertical rhythm anchored to 16px multiples. |
| **Background** | Animated gradient mesh limited to hero + welcome sections; degrade to static image for reduced motion. |

### 4.2 Responsive Behavior

| Breakpoint | Layout Behavior | Copilot Behavior |
| --- | --- | --- |
| `>=1440px` (Desktop) | 3-column dashboard grid, sidebar expanded by default. | Docked right rail with chat + suggestions. |
| `1024–1439px` (Laptop) | 2-column grid, sidebar collapses to icon rail when content width <1200px, top bar remains. | Copilot toggles to floating panel triggered via FAB. |
| `768–1023px` (Tablet) | Single-column stack, horizontal scroll lists replaced with carousels, top bar condenses. | Copilot becomes bottom sheet; quick actions appear as chips. |
| `<=767px` (Mobile) | Cards stacked, quick action drawer at top, bottom navigation replaces sidebar. | Copilot accessible via persistent FAB; responses occupy full-height sheet. |

Touch targets: min 48x48px; maintain 16px padding around interactive icons. Long text wraps to 2 lines max before truncating with tooltip.

---

## 5. Component Blueprint & Composition Patterns

### 5.1 Component Inventory (Shadcn/Tailwind)

| Category | Components | Notes |
| --- | --- | --- |
| **Navigation** | Sidebar, workspace switcher, breadcrumb chips, top command bar, quick action ribbon. | Use Shadcn `navigation-menu`, `command`, `dropdown` primitives. |
| **Data & Analytics** | KPI card, metric group, sparkline, combo chart, table/list hybrid, anomaly alert card. | Provide skeleton + empty states for each. |
| **Collaboration & AI** | Copilot dock, chat bubbles, suggestion pills, mention list, notification tray. | Distinguish proactive vs reactive visuals. |
| **Productivity Tools** | Kanban column, timeline row, calendar card, document tile, checklist. | Support drag handles + inline editing cues. |
| **Wellness & Culture** | Spotlight card, kudos ticker, sentiment meter, participation tracker. | Use warmer accent gradients. |
| **Forms & Inputs** | Multi-step form container, segmented controls, tags, status pills. | Map to Shadcn form primitives, include validation states. |

### 5.2 Composition Patterns

```text
Dashboard KPI Card =
  <Card elevation="raised">
    <TrendIcon size="32" />
    <StatDisplay typography="display-2" />
    <Sparkline trend="positive" />
  </Card>

Copilot Summary Block =
  <Card elevation="floating">
    <CopilotAvatar glow="hero" />
    <Body textStyle="body-lg">Generated summary text…</Body>
    <ActionChips count="3" />
  </Card>

Task Lane =
  <SectionHeader actions=[filters/search] />
  <ScrollableRow>
    repeat(TaskCard with status tags + assignee chips)
  </ScrollableRow>
```

Document 5–7 of these in Storybook with props so devs understand the assembly logic rather than just individual parts.

---

## 6. Page Experience Blueprints

Each page defines hierarchy (primary action, scannable elements, AI touchpoints).

### Dashboard `/`

- **Primary action**: Review Copilot daily briefing → accept suggested quick actions.  
- **Hierarchy**:  
  1. Hero stat (focus score) + Copilot summary block  
  2. Quick action ribbon (Create task, Book focus time, Post update)  
  3. KPI grid (Productivity, Engagement, SLA, Sentiment)  
  4. Secondary modules (news, meetings, wellness nudge)  
- **Scannable elements**: KPI numbers, sparkline color cues.  
- **Copilot surface**: Inline summary card + right-rail suggestions for follow-ups.

### Analytics `/analytics`

- **Primary action**: Identify anomalies + share insights.  
- **Hierarchy**: Exec summary, revenue vs cost chart, capacity grid, alert stack.  
- **Scannable**: Alert color bars, top/bottom performers list.  
- **Copilot**: Auto-generates “Anomalies I spotted” card with share CTA.

### Tasks/Projects `/tasks`, `/projects`

- **Primary action**: Reprioritize tasks across kanban + timeline.  
- **Hierarchy**: Copilot priority callouts, kanban lanes, timeline toggle, backlog.  
- **Scannable**: Status chips, due-date badges.  
- **Copilot**: Suggests “Auto-triage 5 tasks” plus inline reorder recommendations.

### Team/Culture/News `/team`, `/culture`, `/news`

- **Primary action**: Celebrate wins + monitor engagement.  
- **Hierarchy**: Spotlight hero, kudos feed, participation stats, stories carousel.  
- **Copilot**: Drafts recognition posts, surfaces “3 people to shout out”.  
- Scannable: Photo cards, participation percentages, heatmap.

### Wellness/Benefits `/wellness`, `/benefits`

- **Primary action**: Start recommended program or book focus timer.  
- **Hierarchy**: Wellness index gauge, focus timer, benefits quick actions, recommended programs.  
- **Copilot**: Suggests break reminders, prefilled benefit forms.  
- Scannable: Gauge color, progress bars, success badges.

### Training/Resources `/training`, `/resources`

- **Primary action**: Continue top learning track.  
- **Hierarchy**: Learning track cards, certification progress, resource list.  
- **Copilot**: Recommends modules based on role, offers summary of last session.  
- Scannable: Progress dots, file type badges.

### Office/Calendar `/office`, `/calendar`

- **Primary action**: Book workspace or schedule meeting.  
- **Hierarchy**: 3D map / booking grid, calendar view, meeting insights.  
- **Copilot**: Suggests optimal space/time based on past behavior, warns of conflicts.  
- Scannable: Availability color coding, event list.

### Helpdesk/Support `/helpdesk`

- **Primary action**: Resolve or escalate tickets.  
- **Hierarchy**: SLA board, ticket table, knowledge base quick answers.  
- **Copilot**: Proposes replies, auto-triage tags.  
- Scannable: Severity chips, SLA timers.

### Settings/Profile `/settings`

- **Primary action**: Update preferences + notification rules.  
- **Hierarchy**: Profile hero, preference tabs, device list.  
- **Copilot**: Recommends focus modes, alerts about unusual logins.

---

## 7. Copilot Interaction Patterns

| Aspect | Guidance |
| --- | --- |
| **Invocation** | Keyboard: `Cmd/Ctrl K` for command bar, `/` to focus search, `Cmd/Ctrl Shift C` for Copilot panel. UI: floating FAB bottom-right, inline CTA chips, “Ask Copilot” buttons on empty states. Voice optional later. |
| **Context Awareness** | Copilot receives route + selected entity (e.g., current task, analytics filter). Provide breadcrumbs within the chat (“You’re editing Sprint Alpha”). |
| **Proactive vs Reactive** | Proactive suggestions triggered by: new day (daily briefing), detected anomaly, stalled task, wellness reminder. Reactive when user opens Copilot or highlights text. |
| **Surface Types** | Docked right rail (desktop), floating card attached to component, bottom sheet (mobile). Each shares visual styling (glow ring + gradient accent). |
| **Dismissal** | Close button, swipe (mobile), auto-hide after task completion with toast confirmation. Provide “Mute this suggestion” link to train system. |
| **Conversation History** | Persist last 5 interactions per page; show timeline chips for quick jump. |

---

## 8. Interaction, Motion & Micro-UX

### 8.1 Motion Tokens

```css
:root {
  --ease-bounce: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-linear: cubic-bezier(0.25, 0.25, 0.75, 0.75);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --duration-xslow: 700ms;
}
```

- Button press: `--ease-smooth` + `--duration-fast`.  
- Card hover lift: `--ease-bounce` + `--duration-base`.  
- Page transition: `--ease-smooth` + `--duration-slow`.  
- Copilot thinking pulse: `--ease-bounce` loop w/ `--duration-base`.  
- Gradient background shift: `--ease-linear` + `--duration-xslow`.

### 8.2 Micro-UX Patterns

- Sequenced loading: hero → primary cards → secondary modules.  
- Skeletons for loads >500ms; spinners reserved for cases where progress is unknown.  
- Toast stack with accent-colored edge; auto-dismiss after 4s, focusable for screen readers.  
- Command palette uses typeahead, keyboard hints displayed as pill badges.

---

## 9. Accessibility & Inclusive Design

- **Color contrast**: maintain ≥4.5:1; provide `data-theme="contrast"` variant boosting border/text intensity.  
- **Keyboard UX**: logical tab order, skip links, focus trap in dialogs, `Esc` closes overlays.  
- **Screen reader**: Landmarks (`main`, `nav`, `aside`, `complementary`), aria-live for Copilot responses.  
- **Motion safe**: disable parallax/mesh animations and use fade transitions when `prefers-reduced-motion`.  
- **Text scaling**: support up to 200%; wrap long labels, provide overflow scroll for tables with accessible descriptions.  
- **Touch gestures**: double-check vertical Scroll vs drag handles; provide handles with `aria-grabbed`.  

---

## 10. States & Edge Cases

| State | Pattern |
| --- | --- |
| **Empty** | Show illustration or gradient icon, short headline, Copilot-suggested action (e.g., “No tasks yet—ask Copilot to create one”). |
| **Loading** | Glass skeleton cards with diagonal shimmer; for operations >3s, show progress bar with percentage. |
| **Error** | Use inline alert with `--accent-critical` border, clear action (“Retry”, “Contact support”). Copilot offers troubleshooting steps. |
| **Offline / Stale Data** | Badge the top bar (“Working offline”). Show timestamp of last sync + CTA to refresh. |
| **Overflow** | Truncate with ellipsis + tooltip; tables gain horizontal scroll w/ sticky headers; badges wrap into vertical stack for small screens. |

---

## 11. Do's & Don'ts

```text
✅ DO: Reserve gradients for hero sections, Copilot surfaces, and key CTAs.
❌ DON'T: Apply gradients to body text, table rows, or dense copy blocks.

✅ DO: Limit card content to 3 information layers (title, stat, supporting detail).
❌ DON'T: Nest cards within cards or embed scroll areas inside small panels.

✅ DO: Use skeleton loaders for waits longer than 500ms.
❌ DON'T: Flash spinners for quick, synchronous updates.

✅ DO: Keep icon buttons at least 48px touch area.
❌ DON'T: Place actionable icons closer than 8px to reduce mis-taps.
```

---

## 12. Implementation Roadmap

1. **Tokenization**  
   - Encode color/typography/motion tokens in Tailwind v4 config and CSS variables (light/dark/high-contrast).  
   - Create living token table in Storybook + Figma (before/after examples).

2. **UI Kit / Shadcn Customization**  
   - Generate Shadcn primitives, apply tokens, document states (default/hover/disabled/loading).  
   - Build 5 composition patterns in Storybook to demonstrate assembly.

3. **Foundational Layouts**  
   - Implement `AppShell`, `DashboardGrid`, `SectionHeader`, `Card` primitives with responsive behaviors baked in.

4. **Copilot Surfaces**  
   - Build chat dock, floating action button, suggestion overlay components; wire invocation shortcuts and context props.

5. **Page Templates**  
   - Deliver Dashboard, Analytics, Tasks high-fidelity Figma mocks → translate into Next.js routes.  
   - Subsequent sprints: Team/Culture, Wellness, Helpdesk, Office, Settings.

6. **Motion Prototypes**  
   - Produce 3 GIF/video refs (page transition, Copilot thinking, card hover) for guidance.

7. **States & QA**  
   - Validate empty/loading/error states + responsive breakpoints; run accessibility checks (light/dark/high-contrast).  
   - Capture Chromatic snapshots for regression protection.

8. **Documentation & Handoff**  
   - Maintain Figma library synced with code (Tokens Studio/Style Dictionary).  
   - Publish usage guidelines in `apps/docs` or Notion, linking directly to Storybook stories.

---

By following this design vision, Copilot-assisted implementation will inherit a premium, consistent system that feels modern, intentional, and production-ready. Designers and engineers should reference this document alongside the moodboard and Storybook kit before starting new work.

