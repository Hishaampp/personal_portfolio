# Add your real assets here

- **Resume**: drop your PDF at `public/resume.pdf` (exact filename). The navbar and hero "Download resume" buttons already point at `/resume.pdf`, so it works the moment the file exists — no code changes needed.
- **Project images**: drop images into `public/projects/` using the filenames already referenced in `src/data/projects.js` (e.g. `liwi.jpg`, `booking.jpg`). Until you add them, each card just shows a soft green/gold gradient instead of a broken image.
- **Case study images** (architecture diagrams, screenshots, metrics charts): add an `images` array to the relevant case study in `src/data/caseStudies.js` and render them in `CaseStudies.jsx` the same way project images are handled — happy to wire this up further if you want it.
