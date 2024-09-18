# Github Contributions Widget

Generates beautiful banner images using the user's Github contributions as the background

![Example image](https://github-contributions-widget.vercel.app?username=aapzu&imageFormat=png)

## Development

- Create a Github Personal Access Token (PAT)
  - The token can be a fine-grained token with only the `public_repo` scope
- Add the token into `.env` as `GITHUB_PERSONAL_ACCESS_TOKEN`
- `pnpm install`
- `pnpm dev`
