# Vanth Online - Development Chronicle

A public, single-page development-history site for **Vanth Online**, a custom fantasy MMORPG based on *The Saga of Vanth*.

**Live page:** https://vanthonline.github.io/

## What it is

A scrollable, reverse-chronological record of the project's milestones - newest first - with each entry labeled by how far along it is:

- **Verified in-game** - played and confirmed working
- **Built - needs testing** - running on the development server, awaiting hands-on testing
- **Designed / planned** - agreed on paper, not yet built
- **Investigating** - still being worked out
- **Decision** - owner governance decisions

The page also includes a project overview, the Blackport region map, a to-do list of pending items, and a summary of the project's design bibles.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire page |
| `styles.css` | Dark editorial "magazine" theme |
| `script.js` | Optional enhancements: scroll progress bar, status filters, back-to-top |
| `assets/` | Cover art and the Blackport region map |

Static single page: no backend, no build step. Pushes to `main` are served automatically by GitHub Pages.

## Maintenance

The canonical working copy of the site lives in the private Vanth Online development workspace and is published to this repository with `Publish-Website.ps1`. Content is summarized from the project's own development records.
