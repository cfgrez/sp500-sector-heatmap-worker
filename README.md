# S&P 500 Sector Heatmap Live — Cloudflare Workers

Dashboard web interactivo del S&P 500 por sectores GICS, listo para GitHub y Cloudflare Workers.

## Qué corrige esta versión

La versión anterior tenía los datos pegados dentro de `public/index.html`, por eso quedaba congelada con la fecha de compilación. Esta versión mueve los precios y retornos a un endpoint dinámico:

```txt
/api/market
```

El navegador carga la interfaz estática, pero los datos de mercado se piden al Worker cada vez que abres la app. El botón **Actualizar ahora** llama a:

```txt
/api/market?fresh=1
```

para saltarse el caché interno de 15 minutos.

## Datos dinámicos

Se actualizan desde el Worker:

- precio de SPY, QQQ, IWM y ETFs sectoriales;
- YTD;
- 6M;
- 1Y;
- rango de 52 semanas.

La app intenta primero Yahoo Finance Chart y, si falla, usa Stooq EOD CSV como respaldo.

## Datos estáticos

Estos datos no se actualizan automáticamente porque normalmente requieren una fuente pagada/licenciada o scraping de fichas ETF:

- peso sectorial en S&P 500;
- rating;
- P/E FY1;
- dividend yield;
- top holdings;
- industria/subsectores;
- concentración Top 3 / Top 10.

Están en `src/index.js`, dentro de `STATIC_SECTORS`.

## Estructura

```txt
sp500-live-heatmap-worker/
├─ public/
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  └─ robots.txt
├─ src/
│  └─ index.js
├─ .github/workflows/deploy.yml
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ wrangler.jsonc
└─ README.md
```

## Correr localmente

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:8787
```

Probar API:

```txt
http://localhost:8787/api/market
```

## Deploy manual

```bash
npx wrangler login
npm run deploy
```

## Deploy desde GitHub

En GitHub, agrega el secret:

```txt
CLOUDFLARE_API_TOKEN
```

Luego haz push a `main`.

## Configuración Cloudflare

El `wrangler.jsonc` ya viene con el nombre que Cloudflare estaba esperando en tus logs:

```jsonc
"name": "sp500-sector-heatmap-worker"
```

También deja explícito:

```jsonc
"workers_dev": true,
"preview_urls": false
```

para eliminar las advertencias vistas en el deploy.

## Importante

Los datos gratuitos pueden venir con retraso, especialmente fuera de horario de mercado. Para datos realmente intradía, oficiales y con SLA, conviene conectar una API pagada como Polygon, Tiingo, Finnhub, IEX Cloud u otra similar, usando un secreto de Cloudflare.

No es recomendación de inversión.
