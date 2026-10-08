# KAB Foundation — Next.js prototype

A complete frontend prototype for **Kassim Alli-Balogun Foundation**, Lagos, Nigeria. This is the same design and functionality as the presentation website, converted to standard Next.js App Router code for deployment on Vercel.

## Run locally

Install Node.js 22 LTS and npm, then open a terminal in this project folder:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The demo content editor is at http://localhost:3000/admin.

## Deploy on Vercel

1. Extract this ZIP. Put the contents of `kab-foundation-nextjs` in a GitHub repository. Upload the source files, `public` assets and `package-lock.json`; do not upload `node_modules` or `.next`.
2. In Vercel, select **Add New → Project** and import that repository.
3. Use **Next.js** as the framework preset. Set the root directory to the folder containing `package.json`.
4. Keep the default build command, **`npm run build`**, and default output directory. Use Node.js **22.x**. No environment variables are required for this prototype.
5. Select **Deploy**. Test `/about`, `/programmes`, `/stories`, `/contact`, `/support` and `/admin` on the new address.

If the repository contains a parent folder, select `kab-foundation-nextjs` as Vercel’s root directory.

Official references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Build and verify

```bash
npm run typecheck
npm run build
npm run test:routes
```

The route check starts a temporary production Next.js server, verifies all 17 pages and internal link destinations, checks image/CSS/JavaScript assets, verifies the custom 404, then stops the server. It checks server-rendered routes and asset delivery; it does not simulate browser clicks.

To run a production build locally:

```bash
npm run build
npm start
```

## Included pages and interactions

| Route                           | Purpose                                                            |
| ------------------------------- | ------------------------------------------------------------------ |
| `/`                             | Homepage, programme highlights, impact figures and stories         |
| `/about`                        | Foundation overview, purpose and partnerships                      |
| `/programmes`                   | Programme directory with category filters                          |
| `/programmes/education`         | Education details and FAQs                                         |
| `/programmes/healthcare`        | Healthcare details and FAQs                                        |
| `/programmes/youth-development` | Stated area of focus and interest registration                     |
| `/programmes/women-empowerment` | Stated area of focus and interest registration                     |
| `/impact`                       | Programme figures, timeline and coverage links                     |
| `/stories`                      | Story directory with education/healthcare filters                  |
| `/stories/education`            | UTME support story                                                 |
| `/stories/healthcare`           | Medical outreach story                                             |
| `/opportunities`                | Volunteer, partnership and support tabs                            |
| `/get-involved`                 | Alternate entry to the opportunities page                          |
| `/contact`                      | Validated demo enquiry form; URL parameters preselect the interest |
| `/support`                      | Demo pledge selection, review and confirmation                     |
| `/privacy`                      | Prototype data handling and image credits                          |
| `/admin`                        | Demo content editor, colours, imagery, enquiries and export        |

Navigation uses ordinary page links, so pages also open directly and in new tabs. The site includes a mobile menu, programme submenu, breadcrumbs, related programme links and a helpful 404.

## Where to edit

- `app/site.tsx` — shared website layout, homepage, about, impact, stories, contact form, demo editor and default content.
- `app/experiences.tsx` — programme data, programme directory/details, opportunities and demo pledge flow.
- `app/globals.css` — colours, typography, layouts and responsive styling.
- `app/layout.tsx` — site-wide metadata and favicon references.
- `app/**/page.tsx` — explicit route entry points and page metadata.
- `public/images/` — programme photographs; use the same filenames or update the image paths in the source.
- `components/ui/` — reused accessible UI primitives.
- `tests/routes.mjs` — production route/asset check.

Run `npm run format` after making edits to format the code.

## What the prototype stores

The demo uses browser `localStorage`:

- `kab-content` — content and brand changes made in the editor.
- `kab-enquiries` — demo enquiries and support pledges, including review status.

Changes are specific to the browser and website origin. They are not shared between visitors, devices or deployments. An enquiry is not emailed to the foundation; a support pledge does not process a payment. Use sample information for demonstrations.

The `/admin` page is an open demonstration editor, **not an authenticated production CMS**. For an official launch, connect a database and protected administrator access, image uploads, enquiry delivery and the foundation’s confirmed donation process. There are no API keys or backend credentials in this package.

## Content and photography

The education and healthcare pages use reported 2026 initiatives. Youth development and women’s empowerment are presented as stated focus areas; no unverified active programmes or application windows are advertised. Official contact details, legal registration information and donation arrangements still need the foundation’s confirmation.

See `ASSET_SOURCES.md` for the photographs’ original source pages. Confirm publication permission or replace those photos with foundation-supplied assets before the official public launch.
