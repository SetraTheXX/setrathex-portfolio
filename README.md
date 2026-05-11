# Setrathex Portfolio

Modern dark portfolio source for `setrathex.com.tr`

The project is structured as a single-page Next.js portfolio with Turkish and English content, project cards, writing links, command menu, CV actions, and responsive mobile navigation. Private planning notes and CV PDFs are intentionally excluded from version control.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- pnpm

## Local Development

```bash
pnpm install
pnpm dev
```

Local URL:

```text
http://localhost:3000
```

## Production Check

```bash
pnpm lint
pnpm build
pnpm start --hostname 127.0.0.1
```

## Repository

```text
https://github.com/SetraTheXX/setrathex-portfolio
```

## CV Files

CV PDFs are not committed to this repository. Add them locally or in your deploy environment:

```text
public/cv/tuncay-olmez-cv-tr.pdf
public/cv/tuncay-olmez-cv-en.pdf
```

The site expects these public paths:

```text
/cv/tuncay-olmez-cv-tr.pdf
/cv/tuncay-olmez-cv-en.pdf
```

## Privacy

The public repo should not include personal planning files, raw journey notes, private roadmaps, local context notes, or CV PDFs.

## License

MIT
