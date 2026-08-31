# Yasam Panel — Vercel

Private personal panel for GitHub repository/file management and Cloudflare DNS.

## 1. Install
```bash
npm install
```

## 2. Create admin password hash
```bash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync(process.argv[1],12))" "GANTI_PASSWORD"
```
Copy the output to `ADMIN_PASSWORD_HASH`.

## 3. Vercel environment variables
Required:
- `GITHUB_TOKEN`: GitHub fine-grained PAT with only the repositories/permissions you intend to manage. For private repo administration, grant the required repository permissions.
- `GITHUB_USERNAME`: your GitHub username.
- `SESSION_SECRET`: long random secret.
- `ADMIN_PASSWORD_HASH`: bcrypt hash.

Optional for real DNS management:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ZONE_ID`

Cloudflare token should have DNS edit permission for the intended zone only.

## 4. Deploy
Push this folder to GitHub, import it into Vercel, add environment variables, then Deploy.

## Notes
- GitHub token never goes to the browser.
- Authentication uses an HttpOnly, Secure, SameSite cookie containing a signed JWT.
- GitHub file API is best suited to normal text files. The upload endpoint accepts base64 and intentionally rejects payloads above ~6 MB because serverless request limits vary.
- GitHub does not have a native empty-folder object; creating a folder creates `.gitkeep` inside it.
- A "rename folder" operation is not implemented as a single GitHub API call. Files in a folder can be moved/renamed individually.
- `repo.html` supports text editing and image/video links can be previewed by extending the UI; binary editing should use the upload/download flow rather than a text editor.
