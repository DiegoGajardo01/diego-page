# Projects Carousel Refresh

## Objective

Make the portfolio Projects section's carousel controls, filtering, touch interactions, and card surfaces feel reliable and visually clear.

## Problem and why

Carousel dot state and scroll positions can drift because the hook assumes a 10px gap while CSS uses 16px and calculates desktop pages from viewport center. Touch move cancels browser defaults unconditionally. Zutura is omitted from the IA filter despite its `IA` category. Cards originally used a `#1A1A1A` surface against the `#0F0F0F` section and needed a more distinct fill as well as border/shadow emphasis.

## Scope

- `hooks/useCarousel.ts`: page anchors/state synchronization and touch handling.
- `components/Projects.tsx`: category-aware IA filter.
- `components/CarouselControls.tsx`: correct dot semantics if required by the implementation.
- `app/globals.css`: card/background contrast.
- This task document and its Engram mirror.

## Constraints

- Preserve existing list data and unrelated pending changes.
- Preserve wrap behavior, autoplay, reduced-motion behavior, keyboard support, and filter-reset behavior unless correctness requires a parent decision.
- Do not invent project technologies.
- No tests exist currently; do not add a test framework just for this task.

## Tasks

- [ ] `PC-1` Correct carousel pagination/gesture behavior, filter Zutura by category, and strengthen card separation.

## Acceptance criteria

- Dot navigation targets real page anchors; active dot and progress reflect the nearest page, including the last clamped page.
- Desktop page math uses measured geometry, with no 10px/16px mismatch.
- Touch interaction no longer prevents vertical page scrolling; native horizontal scroll remains usable.
- Zutura appears in `IA & Machine Learning` based on its existing `IA` category.
- Cards use a visibly distinct `#202020` surface against `#0F0F0F` at rest; border, shadow, and hover treatment remain.
- No unrelated files or project data are changed.

## Route and estimate

- Route: delegated direct, one writer.
- Trigger evidence: implementation touches four non-trivial UI files, and reading prepares the write; one writer keeps the bounded carousel/filter/styling changes together.
- Forecast: approximately 150 authored changed lines (additions + deletions), generated files excluded.
- Delivery strategy: `ask-on-risk`.

## Checks

- Test-first exception: `package.json` has no test script and no relevant deterministic test suite exists for this UI.
- `pnpm exec prettier --check hooks/useCarousel.ts components/Projects.tsx components/CarouselControls.tsx app/globals.css odd/tasks/projects-carousel-refresh.md`
- `pnpm run build`
- Runtime scenario: manual desktop/mobile browser validation was unavailable in this worker; pending parent validation.

## Progress

- [ ] `PC-1` Implementation, build, and whitespace checks are complete; browser validation remains unavailable.

## Verification record

- Prettier normalization was attempted successfully, but its broad formatting churn was discarded and the repository's prior style restored while retaining the functional changes. The normalized check had passed before restoration; no Prettier check is being retained as a normalization step.
- The attempted formatter introduced broad churn in the four tracked sources (`app/globals.css` 1686 diff lines, `components/CarouselControls.tsx` 38, `components/Projects.tsx` 37, `hooks/useCarousel.ts` 188); the task document is untracked and was omitted from `git diff --stat`.
- `pnpm run build` after targeted restoration: exit 0; optimized production build and TypeScript checks completed successfully.
- `git diff --check` after targeted restoration: exit 0; no whitespace errors.
- Final tracked source diff scale after restoration: 46 insertions and 99 deletions across four source files (145 changed lines); the task document is untracked and excluded.
- Tests: no dedicated test command or relevant deterministic test suite exists; no test-first RED/GREEN cycle was applicable.
- Browser scenario: pending; no usable browser runtime was available in this worker.
- Structural readback: all four source files and this task record were read after edits. `components/Footer.tsx` and `lib/projects.ts` remain untouched by this task.

## Next step

- Parent reviews the targeted implementation diff, performs the required structural spot check, and completes any available browser validation before closing the work unit under ODD.

## Relevant Files

- `hooks/useCarousel.ts` — carousel state, page navigation, and gestures.
- `components/Projects.tsx` — project filtering and carousel composition.
- `components/CarouselControls.tsx` — arrows, dots, and progress UI.
- `app/globals.css` — section, card, and responsive styles.
- `odd/tasks/projects-carousel-refresh.md` — this task record and verification log.

## Key Learnings

1. Carousel pagination must clamp the final page anchor to the last full visible-card group; anchoring the final individual card cannot align it because browser scroll range ends earlier.
2. The project provides no dedicated test script, so the production build is the available automated functional check for this change.

## Commit and review status

- Work-unit commit: b02d7a4 (fix(portfolio): stabilize projects carousel).
- RDD assessment: medium risk, under_budget; no native review was due for this committed range.
- Engram mirror: unable to verify or resynchronize in the resumed context because no authoritative runtime session ID was available.
- Browser validation remains pending.

## Follow-up: prevent hover clipping

- [ ] PC-2 Reserve vertical room so project-card hover transforms and shadows are not clipped.
- Cause: .projects-carousel clips vertical overflow while .project-card:hover translates upward and enlarges its shadow.
- Change: added padding-block: 24px and raised the carousel min-height from 380px to 400px; horizontal scrolling and dot behavior remain unchanged.
- Verification: pnpm run build passed (exit 0); parent git diff --check pending.
- Browser hover validation: pending because no browser runtime is available.
- Engram mirror: unable to verify or update in this resumed context because no authoritative runtime session ID was available.
