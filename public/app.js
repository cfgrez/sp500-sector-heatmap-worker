let currentSort = 'ytd';
let state = { sectors: [], pills: [], latestMarketDate: null, generatedAt: null, note: '' };

const grid = document.getElementById('grid');
const pillsEl = document.getElementById('pills');
const chip = document.getElementById('data-chip');
const refreshBtn = document.getElementById('refresh-btn');

function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function mix(a,b,t){
  const ah=parseInt(a.slice(1),16), ar=ah>>16&255, ag=ah>>8&255, ab=ah&255;
  const bh=parseInt(b.slice(1),16), br=bh>>16&255, bg=bh>>8&255, bb=bh&255;
  const rr=Math.round(ar+(br-ar)*t), rg=Math.round(ag+(bg-ag)*t), rb=Math.round(ab+(bb-ab)*t);
  return `rgb(${rr},${rg},${rb})`;
}
function perfColor(v){
  if(!Number.isFinite(v)) return '#94a3b8';
  const min=-25, max=35; const t=clamp((v-min)/(max-min),0,1);
  if(t<.33){return mix('#991b1b','#ef4444',t/.33)}
  if(t<.58){return mix('#ef4444','#f59e0b',(t-.33)/.25)}
  if(t<.78){return mix('#f59e0b','#84cc16',(t-.58)/.20)}
  return mix('#84cc16','#16a34a',(t-.78)/.22)
}
function fmtPct(v){return Number.isFinite(v) ? `${v>0?'+':''}${v.toFixed(Math.abs(v)>=10?1:2)}%` : 'N/D';}
function fmtPrice(v){return Number.isFinite(v) ? `US$ ${v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}` : 'N/D';}
function fmtNum(v){return Number.isFinite(v) ? v.toLocaleString('en-US',{maximumFractionDigits:2}) : 'N/D';}
function fmtDate(d){
  if(!d) return 'sin fecha';
  const date = new Date(`${d}T12:00:00Z`);
  return date.toLocaleDateString('es-CL', { day:'2-digit', month:'short', year:'numeric', timeZone:'America/Santiago' });
}
function fmtTs(ts){
  if(!ts) return '';
  return new Date(ts).toLocaleString('es-CL', { dateStyle:'medium', timeStyle:'short' });
}
function ratingColor(r){return r.includes('Más')?'#22c55e':r.includes('Menos')?'#f59e0b':'#60a5fa';}
function cardSize(w){ if(w>=20) return 'big'; if(w>=8) return 'med'; return 'small'; }
function pctPos(price,range){return Array.isArray(range) && range[1] > range[0] ? clamp(((price-range[0])/(range[1]-range[0]))*100,0,100) : 50;}
function performanceBarWidth(v){return clamp((v + 25) / 60 * 100, 0, 100);}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function renderPills(){
  pillsEl.innerHTML = state.pills.map(p=>`
    <div class="pill">
      <div class="label">${escapeHtml(p.label)}</div>
      <div class="value" style="color:${perfColor(p.ytd)}">${fmtPct(p.ytd)}</div>
      <div class="price">${fmtPrice(p.price)}</div>
      <div class="sub">${escapeHtml(p.sub)} · ${fmtDate(p.asOf)}</div>
    </div>
  `).join('');
}

function render(){
  const sorted=[...state.sectors].sort((a,b)=>{
    if(currentSort==='ytd') return (b.ytd ?? -999)-(a.ytd ?? -999);
    if(currentSort==='weight') return b.weight-a.weight;
    if(currentSort==='pe') return b.pe-a.pe;
    if(currentSort==='divYield') return b.divYield-a.divYield;
    return 0;
  });
  document.getElementById('empty').style.display = sorted.length ? 'none' : 'block';
  grid.innerHTML = sorted.map(s=>{
    const col=perfColor(s.ytd), barWidth=performanceBarWidth(s.ytd), rpos=pctPos(s.price,s.range);
    const rest = Math.max(0,100-s.top10);
    const marketSource = s.marketSource ? `Mercado: ${s.marketSource} · ${fmtDate(s.asOf)}` : `Mercado: ${fmtDate(s.asOf)}`;
    return `<article class="card ${cardSize(s.weight)}" onclick="this.classList.toggle('open')">
      <div class="card-inner">
        <div class="sector-head"><div><div class="sector-name">${escapeHtml(s.name)}</div><div class="sector-en">${escapeHtml(s.en)}</div></div><div class="etf">${escapeHtml(s.etf)}</div></div>
        <div class="metrics-row"><div class="weight">Peso S&P <b>${s.weight.toFixed(1)}%</b></div><div class="badge" style="background:${col}">YTD ${fmtPct(s.ytd)}</div></div>
        <div class="rating"><span class="dot" style="background:${ratingColor(s.rating)}"></span>Rating: <b>${escapeHtml(s.rating)}</b></div>
        <div class="perf-wrap"><div class="perf-label"><span>Performance YTD</span><span>${fmtPct(s.ytd)}</span></div><div class="bar-bg"><div class="bar" style="width:${barWidth}%;background:${col}"></div></div></div>
        <div class="stat-grid">
          <div class="stat"><div class="k">Precio</div><div class="v">${fmtPrice(s.price)}</div></div>
          <div class="stat"><div class="k">P/E FY1</div><div class="v">${s.pe.toFixed(2)}x</div></div>
          <div class="stat"><div class="k">Div Yield</div><div class="v">${s.divYield.toFixed(2)}%</div></div>
          <div class="stat"><div class="k">6M</div><div class="v" style="color:${perfColor(s.sixM)}">${fmtPct(s.sixM)}</div></div>
          <div class="stat"><div class="k">1Y</div><div class="v" style="color:${perfColor(s.oneY)}">${fmtPct(s.oneY)}</div></div>
          <div class="stat"><div class="k">Fecha</div><div class="v">${fmtDate(s.asOf)}</div></div>
        </div>
        <div class="tiny">${escapeHtml(marketSource)}</div>
      </div>
      <div class="expand">
        <div class="expand-grid">
          <div class="box"><h3>Top 5 holdings</h3>${s.holdings.map(h=>`<div class="holding"><span>${escapeHtml(h[0])}</span><b>${h[1].toFixed(2)}%</b><div class="mini-bar"><span style="width:${Math.min(100,h[1]*4)}%"></span></div></div>`).join('')}</div>
          <div class="box"><h3>Breakdown market cap / concentración</h3><div class="break">
            <div class="break-row"><span>Top 3</span><div class="break-bg"><span style="width:${s.top3}%"></span></div><b>${s.top3.toFixed(1)}%</b></div>
            <div class="break-row"><span>Top 10</span><div class="break-bg"><span style="width:${s.top10}%"></span></div><b>${s.top10.toFixed(1)}%</b></div>
            <div class="break-row"><span>Resto</span><div class="break-bg"><span style="width:${rest}%"></span></div><b>${rest.toFixed(1)}%</b></div>
            <div class="note">Wtd. avg. market cap: US$ ${fmtNum(s.wamc)} MM</div>
            <div class="range"><h3 style="margin-top:12px">Rango 52 semanas ${escapeHtml(s.etf)}</h3><div class="range-line"><span class="knob" style="left:${rpos}%"></span></div><div class="range-label"><span>${fmtPrice(s.range?.[0])}</span><span>Actual ${fmtPrice(s.price)}</span><span>${fmtPrice(s.range?.[1])}</span></div></div>
          </div></div>
        </div>
        <div class="box" style="margin-top:14px"><h3>Industria / subsectores</h3>${s.industries.map(i=>`<div class="break-row"><span style="min-width:135px">${escapeHtml(i[0])}</span><div class="break-bg"><span style="width:${Math.min(100,i[1])}%"></span></div><b>${i[1].toFixed(2)}%</b></div>`).join('')}</div>
      </div>
    </article>`;
  }).join('');
}

function updateChip(error){
  chip.classList.remove('ok','warn');
  if(error){
    chip.classList.add('warn');
    chip.textContent = `Error usando datos live; revisa /api/market`;
    return;
  }
  chip.classList.add('ok');
  chip.textContent = `Mercado actualizado al ${fmtDate(state.latestMarketDate)} · API generada ${fmtTs(state.generatedAt)}`;
}

async function loadMarket(forceFresh=false){
  refreshBtn.disabled = true;
  refreshBtn.textContent = forceFresh ? 'Actualizando...' : 'Cargando...';
  document.body.classList.add('loading');
  try{
    const url = forceFresh ? `/api/market?fresh=1&ts=${Date.now()}` : `/api/market?ts=${Date.now()}`;
    const res = await fetch(url, { cache:'no-store' });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state = data;
    renderPills();
    render();
    updateChip(false);
  }catch(err){
    console.error(err);
    updateChip(true);
    grid.innerHTML = `<div class="empty" style="display:block;grid-column:1/-1">No se pudo cargar /api/market. Detalle: ${escapeHtml(err.message)}</div>`;
  }finally{
    refreshBtn.disabled = false;
    refreshBtn.textContent = 'Actualizar ahora';
    document.body.classList.remove('loading');
  }
}

document.querySelectorAll('button[data-sort]').forEach(btn=>btn.addEventListener('click',()=>{
  currentSort=btn.dataset.sort;
  document.querySelectorAll('button[data-sort]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  render();
}));
refreshBtn.addEventListener('click', () => loadMarket(true));
loadMarket();
