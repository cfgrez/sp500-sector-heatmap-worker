# S&P 500 Sector Heatmap Live — Cloudflare Workers

Dashboard web interactivo del S&P 500 por sectores GICS (ETFs Select Sector SPDR como proxy), listo para GitHub y Cloudflare Workers.

## Arquitectura

- `public/` — interfaz estática (heatmap con cards expandibles, sorting por YTD / 1 año / peso / P/E / dividendo, pills SPY-QQQ-IWM).
- `src/index.js` — Worker que sirve los assets y expone el endpoint dinámico:

```txt
/api/market        → datos con caché interno de 15 min
/api/market?fresh=1 → salta el caché (botón "Actualizar ahora")
/api/health        → healthcheck
```

El Worker intenta **Yahoo Finance Chart** y, si falla, **Stooq EOD CSV**. Si ambas fallan, responde con el **fallback estático embebido**.

## Datos

**Dinámicos (por Worker):** precio, YTD, 6M, 1Y y rango 52 semanas de SPY, QQQ, IWM y los 11 ETFs sectoriales.

**Fallback estático embebido** (se usa solo si ambas fuentes fallan) — snapshot al **cierre del 07-jul-2026**:
- Retornos sectoriales (precio): The Trading Tools — Sector Performance.
- QQQ / IWM: retorno total al 02-jul-2026 (Total Real Returns); precios 07/09-jul-2026.
- Rangos 52 semanas: Yahoo Finance al 02-jul-2026 (XLV ajustado al cierre 07-jul).

**Metadata estática** (no se actualiza sola; en `STATIC_SECTORS` de `src/index.js`): peso sectorial, rating, P/E FY1, dividend yield, top holdings, industrias, concentración Top 3 / Top 10. Consolidada al 02-jul-2026 desde fichas de los Select Sector SPDR. Revisar periódicamente.

## Correr localmente

```bash
npm install
npm run dev
# abrir http://localhost:8787  ·  probar http://localhost:8787/api/market
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "S&P 500 sector heatmap worker — snapshot 2026-07-07"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sp500-sector-heatmap-worker.git
git push -u origin main
```

## Deploy en Cloudflare Workers

### Opción A — desde GitHub (recomendada)
1. En GitHub → Settings → Secrets and variables → Actions, crea el secret `CLOUDFLARE_API_TOKEN` (token con permiso *Workers Scripts: Edit*).
2. Haz push a `main`: el workflow `.github/workflows/deploy.yml` ejecuta `wrangler deploy` automáticamente.

También puedes conectar el repo directo en el panel de Cloudflare (Workers & Pages → Create → conectar repositorio):
- Build / deploy command: `npx wrangler deploy`
- Install command: por defecto, o `npm install --no-package-lock --progress=false`
- Root directory: raíz del repositorio

Este repo **no incluye `package-lock.json`** a propósito, para evitar que Cloudflare Builds ejecute `npm ci` con un lockfile de otro entorno. Si un build previo falló instalando dependencias: **Retry deployment → Clear cache and retry**.

### Opción B — manual
```bash
npx wrangler login
npm run deploy
```

El `wrangler.jsonc` ya trae `"name": "sp500-sector-heatmap-worker"`, `"workers_dev": true` y `"preview_urls": false`.

## Versión standalone

`standalone.html` es una copia autocontenida en un solo archivo (snapshot embebido del 07-jul-2026). Puede abrirse sin servidor; opcionalmente, editando la constante `WORKER_URL` al inicio de su script con la URL del Worker desplegado, consume datos live (el Worker envía CORS `*`).

## Importante

Los datos gratuitos pueden venir con retraso, especialmente fuera de horario de mercado. Para datos intradía oficiales con SLA, conecta una API pagada (Polygon, Tiingo, Finnhub, etc.) mediante un secreto de Cloudflare. **No es recomendación de inversión.**
