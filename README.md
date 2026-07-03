# S&P 500 Sector Heatmap — Cloudflare Workers

Dashboard web interactivo del S&P 500 por sectores GICS, listo para subir a GitHub y desplegar en Cloudflare Workers usando **Workers Static Assets**.

## Qué incluye

- Pills YTD de S&P 500, NASDAQ 100 y Russell 2000/IWM.
- Barra de leyenda rojo → verde.
- Botones para ordenar por **YTD**, **Peso**, **P/E** y **Dividendo**.
- Cards de los 11 sectores GICS con:
  - nombre del sector,
  - ETF proxy,
  - peso en S&P 500,
  - badge YTD con color según performance,
  - rating de analistas,
  - barra de performance,
  - estadísticas P/E · Div Yield · 6M · 1Y.
- Al hacer clic en cada card se expande con:
  - top 5 holdings,
  - breakdown de market cap / concentración,
  - rango de 52 semanas,
  - breakdown por industrias/subsectores.

## Estructura

```txt
sp500-sector-heatmap-worker/
├─ public/
│  └─ index.html
├─ src/
│  └─ index.js
├─ wrangler.jsonc
├─ package.json
├─ .gitignore
└─ README.md
```

## Requisitos

- Node.js 18 o superior.
- Cuenta de Cloudflare.
- Wrangler instalado vía `npm install` o `npx wrangler`.

## Correr localmente

```bash
npm install
npm run dev
```

Luego abre la URL local que entregue Wrangler, normalmente:

```txt
http://localhost:8787
```

Endpoint de prueba:

```txt
/api/health
```

## Deploy manual a Cloudflare Workers

```bash
npm install
npx wrangler login
npm run deploy
```

Cloudflare publicará el Worker con el nombre definido en `wrangler.jsonc`:

```jsonc
"name": "sp500-sector-heatmap"
```

Puedes cambiar ese nombre antes de desplegar.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Initial S&P 500 sector heatmap dashboard"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sp500-sector-heatmap-worker.git
git push -u origin main
```

## Deploy desde GitHub en Cloudflare

1. En Cloudflare Dashboard, entra a **Workers & Pages**.
2. Crea una aplicación conectada a GitHub.
3. Selecciona el repositorio.
4. Usa estos comandos:

```txt
Build command: npm install
Deploy command: npm run deploy
```

También puedes desplegar manualmente desde tu computador con `npm run deploy`.

## Datos

Los datos están incorporados en `public/index.html` para que el dashboard funcione sin API externa ni claves. Esto permite desplegarlo gratis y rápido como app estática/Worker.

Fuentes indicadas dentro del dashboard:

- Schwab Sector Views, 26-jun-2026.
- Novel Investor, YTD sectorial al 30-jun-2026.
- State Street SPDR Select Sector ETFs.
- Datos públicos de mercado consultados el 02-jul-2026.

> No es recomendación de inversión.
