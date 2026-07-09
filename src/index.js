const STATIC_SECTORS = [
  {name:"Tecnología de la información", en:"Information Technology", etf:"XLK", weight:38.6, rating:"Neutral", pe:29.30, divYield:0.39, top3:45.6, top10:68.5, wamc:1657714.40, fallback:{price:179.55,ytd:19.8,sixM:21.1,oneY:47.3,range:[126.60,198.73]}, holdings:[["NVIDIA",12.83],["Apple",11.59],["Microsoft",7.65],["Broadcom",4.69],["AMD",4.51]], industries:[["Semiconductores",47.31],["Software",21.61],["Hardware tecnológico",17.89],["Equipos comunicación",5.60],["Equipo electrónico",4.78],["Servicios TI",2.80]]},
  {name:"Industriales", en:"Industrials", etf:"XLI", weight:8.3, rating:"Más favorecido", pe:27.23, divYield:0.98, top3:14.5, top10:29.5, wamc:158179.86, fallback:{price:182.07,ytd:20.2,sixM:15.5,oneY:28.8,range:[147.14,186.09]}, holdings:[["Caterpillar",8.02],["GE Aerospace",6.87],["GE Vernova",5.35],["RTX",4.53],["Boeing",3.02]], industries:[["Aeroespacial/defensa",25.82],["Maquinaria",21.43],["Equipo eléctrico",14.26],["Transporte terrestre",9.70],["Productos construcción",5.52]]},
  {name:"Energía", en:"Energy", etf:"XLE", weight:3.1, rating:"Neutral", pe:11.88, divYield:2.84, top3:43.2, top10:64.7, wamc:205599.69, fallback:{price:53.07,ytd:19.7,sixM:21.7,oneY:24.4,range:[42.05,63.46]}, holdings:[["Exxon Mobil",20.36],["Chevron",14.49],["ConocoPhillips",5.88],["Marathon Petroleum",4.66],["Valero Energy",4.61]], industries:[["Petróleo/gas/combustibles",89.89],["Equipos y servicios energía",10.11]]},
  {name:"Materiales", en:"Materials", etf:"XLB", weight:1.8, rating:"Más favorecido", pe:17.34, divYield:1.74, top3:27.5, top10:53.4, wamc:78347.88, fallback:{price:51.46,ytd:12.0,sixM:12.7,oneY:21.3,range:[42.04,54.14]}, holdings:[["Linde",14.42],["Newmont",5.82],["Freeport-McMoRan",5.09],["Sherwin-Williams",4.95],["Corteva",4.88]], industries:[["Químicos",52.48],["Metales y minería",18.33],["Envases y embalajes",15.33],["Materiales construcción",13.86]]},
  {name:"Bienes raíces", en:"Real Estate", etf:"XLRE", weight:1.8, rating:"Menos favorecido", pe:35.96, divYield:3.23, top3:23.8, top10:48.6, wamc:64667.20, fallback:{price:44.465,ytd:11.5,sixM:10.7,oneY:9.9,range:[39.73,45.65]}, holdings:[["Welltower",11.12],["Prologis",8.73],["Equinix",6.84],["American Tower",5.29],["Simon Property Group",4.95]], industries:[["REITs especializados",38.57],["REITs salud",18.08],["REITs retail",13.59],["REITs residenciales",12.98],["REITs industriales",8.76],["Gestión/desarrollo inmob.",5.44]]},
  {name:"Consumo básico", en:"Consumer Staples", etf:"XLP", weight:4.5, rating:"Neutral", pe:20.22, divYield:2.63, top3:45.4, top10:76.5, wamc:230834.72, fallback:{price:84.565,ytd:8.0,sixM:8.2,oneY:6.7,range:[75.16,90.14]}, holdings:[["Walmart",10.36],["Costco",8.91],["Procter & Gamble",7.45],["Coca-Cola",6.83],["Philip Morris",6.01]], industries:[["Distribución/retail básico",32.81],["Bebidas",20.77],["Productos hogar",16.90],["Alimentos",15.23],["Tabaco",10.55],["Cuidado personal",3.74]]},
  {name:"Servicios públicos", en:"Utilities", etf:"XLU", weight:2.1, rating:"Menos favorecido", pe:18.61, divYield:2.67, top3:24.0, top10:52.0, wamc:70597.19, fallback:{price:45.40,ytd:7.7,sixM:6.2,oneY:14.0,range:[40.17,47.80]}, holdings:[["NextEra Energy",12.85],["Southern",7.65],["Duke Energy",6.99],["Constellation Energy",5.39],["American Electric Power",5.24]], industries:[["Eléctricas",65.03],["Multi-utilities",26.84],["IPP/renovables",4.22],["Gas utilities",2.07],["Agua utilities",1.84]]},
  {name:"Salud", en:"Health Care", etf:"XLV", weight:8.3, rating:"Más favorecido", pe:19.09, divYield:1.59, top3:28.8, top10:49.9, wamc:371254.25, fallback:{price:162.81,ytd:3.5,sixM:-3.4,oneY:14.8,range:[127.96,163.83]}, holdings:[["Eli Lilly",16.34],["Johnson & Johnson",10.59],["AbbVie",7.69],["UnitedHealth",6.71],["Merck",5.37]], industries:[["Farmacéuticas",37.59],["Servicios/proveedores salud",19.14],["Biotecnología",18.40],["Equipos salud",15.57],["Life sciences tools",8.83],["Tecnología salud",0.48]]},
  {name:"Servicios de comunicación", en:"Communication Services", etf:"XLC", weight:10.4, rating:"Más favorecido", pe:14.28, divYield:1.15, top3:83.3, top10:93.6, wamc:1200550.00, fallback:{price:108.85,ytd:0.8,sixM:5.0,oneY:33.5,range:[105.03,120.41]}, holdings:[["Meta Platforms A",17.97],["Alphabet A",10.97],["Alphabet C",8.76],["Take-Two Interactive",4.48],["Live Nation",4.46]], industries:[["Interactive media",37.76],["Entertainment",28.88],["Media",16.22],["Telecom diversificada",12.73],["Telecom inalámbrica",4.41]]},
  {name:"Consumo discrecional", en:"Consumer Discretionary", etf:"XLY", weight:9.7, rating:"Menos favorecido", pe:26.04, divYield:0.76, top3:56.5, top10:68.6, wamc:963934.50, fallback:{price:116.70,ytd:-0.8,sixM:-2.8,oneY:13.3,range:[105.19,125.01]}, holdings:[["Amazon",22.39],["Tesla",19.74],["Home Depot",5.76],["McDonald's",4.11],["TJX Companies",3.89]], industries:[["Hoteles/rest./ocio",25.26],["Retail amplio",23.64],["Automóviles",22.76],["Retail especializado",20.79],["Bienes durables hogar",3.52],["Textiles/lujo",3.03]]},
  {name:"Financieros", en:"Financials", etf:"XLF", weight:11.3, rating:"Neutral", pe:16.09, divYield:1.37, top3:25.7, top10:48.1, wamc:405489.25, fallback:{price:55.28,ytd:-1.2,sixM:-2.7,oneY:8.1,range:[47.67,56.52]}, holdings:[["Berkshire Hathaway B",11.83],["JPMorgan Chase",11.56],["Visa A",7.52],["Mastercard A",5.44],["Bank of America",4.92]], industries:[["Bancos",28.98],["Servicios financieros",27.84],["Mercados de capitales",25.29],["Seguros",13.52],["Crédito consumo",4.38]]}
];

const MARKET_PILLS = [
  { label: "S&P 500 / SPY", symbol: "SPY", sub: "proxy ETF" },
  { label: "NASDAQ 100 / QQQ", symbol: "QQQ", sub: "proxy ETF" },
  { label: "Russell 2000 / IWM", symbol: "IWM", sub: "proxy ETF" }
];

const SYMBOLS = [...MARKET_PILLS.map(x => x.symbol), ...STATIC_SECTORS.map(x => x.etf)];
const YAHOO_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const CACHE_SECONDS = 900;

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${CACHE_SECONDS}, stale-while-revalidate=600`,
      "access-control-allow-origin": "*",
      ...(init.headers || {})
    }
  });
}

function pct(now, then) {
  if (!Number.isFinite(now) || !Number.isFinite(then) || then === 0) return null;
  return ((now / then) - 1) * 100;
}

function dateOnlyFromSeconds(seconds) {
  return new Date(seconds * 1000).toISOString().slice(0, 10);
}

function pickClosestBeforeOrEqual(points, targetMs) {
  let best = null;
  for (const p of points) {
    if (p.timeMs <= targetMs) best = p;
    else break;
  }
  return best || points[0] || null;
}

function pickFirstOnOrAfter(points, targetMs) {
  return points.find(p => p.timeMs >= targetMs) || points[0] || null;
}

function computedFromPoints(symbol, meta, points) {
  if (!points.length) throw new Error(`No valid close data for ${symbol}`);
  const latest = points[points.length - 1];
  const price = Number.isFinite(meta?.regularMarketPrice) ? meta.regularMarketPrice : latest.close;
  const latestMs = latest.timeMs;
  const latestDate = dateOnlyFromSeconds(latest.timestamp);
  const latestDateObj = new Date(latestMs);
  const jan1 = Date.UTC(latestDateObj.getUTCFullYear(), 0, 1);
  const sixMonthsAgo = Date.UTC(latestDateObj.getUTCFullYear(), latestDateObj.getUTCMonth() - 6, latestDateObj.getUTCDate());
  const oneYearAgo = Date.UTC(latestDateObj.getUTCFullYear() - 1, latestDateObj.getUTCMonth(), latestDateObj.getUTCDate());
  const startYtd = pickFirstOnOrAfter(points, jan1);
  const start6M = pickClosestBeforeOrEqual(points, sixMonthsAgo);
  const start1Y = pickClosestBeforeOrEqual(points, oneYearAgo);
  const closes = points.map(p => p.close).filter(Number.isFinite);
  const min52 = Math.min(...closes, price);
  const max52 = Math.max(...closes, price);
  return {
    symbol,
    price,
    previousClose: meta?.previousClose ?? null,
    ytd: pct(price, startYtd?.close),
    sixM: pct(price, start6M?.close),
    oneY: pct(price, start1Y?.close),
    range: [min52, max52],
    asOf: latestDate,
    source: "Yahoo Finance chart"
  };
}

async function fetchYahoo(symbol) {
  const url = `${YAHOO_URL}${encodeURIComponent(symbol)}?range=1y&interval=1d&includePrePost=false&events=div%2Csplits`;
  const res = await fetch(url, {
    headers: {
      "accept": "application/json,text/plain,*/*",
      "user-agent": "Mozilla/5.0 compatible; Cloudflare Worker market dashboard"
    },
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true }
  });
  if (!res.ok) throw new Error(`Yahoo ${symbol} HTTP ${res.status}`);
  const payload = await res.json();
  const result = payload?.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const quote = result?.indicators?.quote?.[0] || {};
  const closes = quote?.close || [];
  const points = timestamps.map((ts, i) => ({
    timestamp: ts,
    timeMs: ts * 1000,
    close: Number(closes[i])
  })).filter(p => Number.isFinite(p.close)).sort((a, b) => a.timeMs - b.timeMs);
  return computedFromPoints(symbol, result?.meta || {}, points);
}

async function fetchStooq(symbol) {
  const stooqSymbol = `${symbol.toLowerCase()}.us`;
  const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(stooqSymbol)}&i=d`;
  const res = await fetch(url, {
    headers: { "accept": "text/csv,*/*", "user-agent": "Mozilla/5.0 compatible; Cloudflare Worker market dashboard" },
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true }
  });
  if (!res.ok) throw new Error(`Stooq ${symbol} HTTP ${res.status}`);
  const csv = await res.text();
  const rows = csv.trim().split(/\r?\n/).slice(1);
  const points = rows.map(line => {
    const [date, open, high, low, close] = line.split(",");
    const timeMs = Date.parse(`${date}T21:00:00Z`);
    return { timestamp: Math.floor(timeMs / 1000), timeMs, close: Number(close) };
  }).filter(p => Number.isFinite(p.close) && Number.isFinite(p.timeMs)).sort((a, b) => a.timeMs - b.timeMs);
  return { ...computedFromPoints(symbol, {}, points), source: "Stooq EOD CSV" };
}

async function loadQuote(symbol) {
  try {
    return await fetchYahoo(symbol);
  } catch (primaryError) {
    try {
      return await fetchStooq(symbol);
    } catch (secondaryError) {
      return { symbol, error: `${primaryError.message}; ${secondaryError.message}` };
    }
  }
}

function applyDynamicData(quotes) {
  const quoteMap = new Map(quotes.map(q => [q.symbol, q]));
  const sectors = STATIC_SECTORS.map(sector => {
    const quote = quoteMap.get(sector.etf);
    const fallback = sector.fallback;
    const dynamicOk = quote && !quote.error && Number.isFinite(quote.price);
    return {
      ...sector,
      price: dynamicOk ? quote.price : fallback.price,
      ytd: dynamicOk && Number.isFinite(quote.ytd) ? quote.ytd : fallback.ytd,
      sixM: dynamicOk && Number.isFinite(quote.sixM) ? quote.sixM : fallback.sixM,
      oneY: dynamicOk && Number.isFinite(quote.oneY) ? quote.oneY : fallback.oneY,
      range: dynamicOk && Array.isArray(quote.range) ? quote.range : fallback.range,
      asOf: dynamicOk ? quote.asOf : "2026-07-02",
      marketSource: dynamicOk ? quote.source : "fallback estático",
      marketError: quote?.error || null
    };
  });
  const pills = MARKET_PILLS.map(item => {
    const quote = quoteMap.get(item.symbol);
    return {
      ...item,
      price: quote && !quote.error ? quote.price : null,
      ytd: quote && !quote.error ? quote.ytd : null,
      asOf: quote && !quote.error ? quote.asOf : null,
      source: quote && !quote.error ? quote.source : "sin datos",
      error: quote?.error || null
    };
  });
  const validDates = [...pills, ...sectors].map(x => x.asOf).filter(Boolean).sort();
  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    latestMarketDate: validDates[validDates.length - 1] || null,
    cacheSeconds: CACHE_SECONDS,
    note: "Precios y retornos se calculan dinámicamente desde datos diarios de ETFs proxy. Peso, P/E, dividend yield, rating, holdings e industrias son metadata estática.",
    pills,
    sectors
  };
}

async function marketResponse(request) {
  const url = new URL(request.url);
  const forceFresh = url.searchParams.get("fresh") === "1";
  const cache = caches.default;
  const cacheKey = new Request(`${url.origin}/api/market-cache-v2`);
  if (!forceFresh) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  }
  const quotes = await Promise.all(SYMBOLS.map(loadQuote));
  const response = json(applyDynamicData(quotes));
  if (!forceFresh) await cache.put(cacheKey, response.clone());
  return response;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return json({ ok: true, app: "sp500-live-heatmap-worker", runtime: "cloudflare-workers", generatedAt: new Date().toISOString() }, { headers: { "cache-control": "no-store" } });
    }
    if (url.pathname === "/api/market") {
      return marketResponse(request);
    }
    return env.ASSETS.fetch(request);
  }
};
