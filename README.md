# Portfolio-Website
The repo for my portfolio website

## Development

This project uses pnpm, not npm. `npm install` fails against pnpm's `node_modules` layout.

```bash
pnpm install
pnpm dev
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format`.

Page content lives in `src/content/`. The build plan lives in [PLAN.md](PLAN.md).

## Contact form

The form emails messages through [Resend](https://resend.com). It needs `RESEND_API_KEY` and `CONTACT_TO_EMAIL`; see `.env.example`. Without them the form is hidden.
