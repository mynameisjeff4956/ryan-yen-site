# Ryan Yen's website

A static site with no build step. Plain HTML, CSS and JavaScript.

```
index.html        page structure and all tabs
css/style.css     styles
js/main.js        tab switching and the typing test
assets/images/    photos
assets/video/     videos
vercel.json       Vercel settings
```

## Update the live site
This project is already connected VS Code > GitHub > Vercel, so:
1. Edit files in VS Code (right-click `index.html` > Open with Live Server to preview).
2. Commit and push to `main` (Source Control panel > Commit > Sync Changes).
3. Vercel redeploys automatically in about a minute.

If Vercel shows a 404 or a build error, open the project's Settings > General and check:
- Framework Preset is **Other**
- Build Command and Output Directory are empty
- Root Directory points to the folder that contains `index.html`

## Add your own media
- Photo: save it in `assets/images/`, then replace a placeholder like
  `<div class="slot">Game footage 1 (video)</div>` in `index.html` with
  `<div class="slot"><img src="assets/images/my-photo.jpg" alt="Describe the photo"></div>`
- Video: save an `.mp4` in `assets/video/` and use
  `<div class="slot"><video controls playsinline preload="metadata" src="assets/video/my-clip.mp4"></video></div>`
- Keep photos under about 300 KB and videos under about 20 MB so the site loads fast.
