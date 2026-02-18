# Cloudflare Pages Migration Guide

This document outlines the steps to migrate the **Midnight Media Studio** website from a Linux VM + Cloudflare Tunnel to Cloudflare Pages with D1 and R2.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Cloudflare Resource Setup](#cloudflare-resource-setup)
3. [GitHub Actions Configuration](#github-actions-configuration)
4. [Deployment Workflow](#deployment-workflow)
5. [Parallel Testing Strategy](#parallel-testing-strategy)
6. [Zero-Downtime Cutover](#zero-downtime-cutover)
7. [Rollback Strategy](#rollback-strategy)

---

## 1. Prerequisites
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed locally (`npm install -g wrangler`).
- Cloudflare API Token with `Cloudflare Pages: Edit`, `D1: Edit`, and `R2: Edit` permissions.
- Project upgraded to Next.js 15 (Done in `migration/cloudflare-pages` branch).

## 2. Cloudflare Resource Setup

Run these commands to create the necessary resources:

### A. Create D1 Database
```bash
npx wrangler d1 create midnight-media-db
```
**Important:** Copy the `database_id` from the output and update it in `wrangler.toml`.

### B. Create R2 Buckets
```bash
npx wrangler r2 bucket create midnight-media-storage
npx wrangler r2 bucket create midnight-media-storage-preview
```

### C. Run Initial Migration
```bash
npx wrangler d1 migrations apply midnight-media-db --remote
```

## 3. GitHub Actions Configuration

Add the following secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (Found in Cloudflare Dashboard URL or via `npx wrangler whoami`).

## 4. Deployment Workflow

### Preview Deployment
Every push to a branch (other than `main`) or a Pull Request will trigger a **Preview Deployment**. The URL will be available in the GitHub Action logs or your Cloudflare Dashboard.

### Production Deployment
Pushing to the `main` branch will trigger the **Production Deployment** to Cloudflare Pages.

---

## 5. Parallel Testing Strategy

Before cutting over DNS:
1. **Verify Preview URL**: Test the auto-generated `.pages.dev` URL.
2. **Database Integration**: Ensure API routes at `/api/projects` work (D1).
3. **Storage Integration**: Ensure API routes at `/api/upload` work (R2).
4. **Environment Variables**: Verify all secrets are configured in the Cloudflare Pages Dashboard.

---

## 6. Zero-Downtime Cutover

1. **Keep Tunnel Active**: Do NOT stop the `cloudflared` service on your VM.
2. **Update DNS**:
   - In Cloudflare DNS, find the record currently pointing to your Tunnel (CNAME to `.cfargotunnel.com`).
   - Change the record to a **Cloudflare Pages** target:
     - Go to `Workers & Pages > midnight-media-studio > Custom Domains`.
     - Add your production domain (e.g., `midnightmedia.studio`).
     - Cloudflare will automatically handle the DNS update and SSL certificate.
3. **Propagation**: DNS changes within Cloudflare are near-instant.
4. **Validation**: Test the production domain. If issues occur, you can revert the CNAME back to the tunnel.

## 7. Rollback Strategy

If production on Pages fails:
1. Go to Cloudflare DNS.
2. Update the CNAME record for your domain to point back to the original Tunnel address (`<uuid>.cfargotunnel.com`).
3. The Linux VM is still running and will immediately resume serving traffic.

---

## Migration Checklist
- [ ] Upgrade Next.js to v15 & install `@cloudflare/next-on-pages` (DONE)
- [ ] Create `wrangler.toml` with D1/R2 bindings (DONE)
- [ ] Implement Cloudflare utility for D1/R2 access (DONE)
- [ ] Create D1 database via CLI (TODO)
- [ ] Create R2 buckets via CLI (TODO)
- [ ] Configure GitHub Secrets (TODO)
- [ ] Deploy first version to Pages (TODO)
- [ ] Verify functionality on `.pages.dev` (TODO)
- [ ] Add Custom Domain and Cutover DNS (TODO)
