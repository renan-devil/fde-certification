// Polymex Industries: Plant Pulse v1 dataset generator (facilitator only). Deterministic, no randomness.
// Run: node generate_polymex_v1.mjs  -> writes ../participant/polymex-plant-pulse-v1/data/*.csv, evals and answer_key_v1.json
function generate() {
  const products = [
    ['PPN-1010','PPN','PP natural','natural'],['PPN-1020','PPN','PP natural','natural'],
    ['PPW-2010','PPW','PP white','white'],['PPW-2030','PPW','PP white','white'],
    ['PPC-3110','PPC','PP colored','blue'],['PPC-3120','PPC','PP colored','red'],['PPC-3140','PPC','PP colored','green'],
    ['PPK-4010','PPK','PP black','black'],['PPK-4040','PPK','PP black','black'],
    ['PPG-5030','PPG','PP glass-filled 30%','black'],['PPG-5031','PPG','PP glass-filled 30%','natural'],
    ['PA6-6010','PA6','Polyamide 6','natural'],['PA6-6040','PA6','Polyamide 6','black']];
  const P = Object.fromEntries(products.map(([c,f,n,col]) => [c,{code:c,family:f,name:n,color:col}]));
  const caps = { M01:'PPN PPW PPC PPK PPG', M02:'PPN PPW PPC PPK PPG', M03:'PPN PPW PPC PPK PA6', M04:'PPN PPW PPC PPK', M05:'PPN PPW PPC PPK PPG', M06:'PPN PPW PPC PPK PA6', M07:'PPN PPW PPC PPK' };
  const F = ['PPN','PPW','PPC','PPK','PPG','PA6'];
  const M = { PPN:[25,30,35,30,45,150], PPW:[75,25,40,30,45,150], PPC:[110,90,60,35,60,150], PPK:[240,180,120,25,60,150], PPG:[90,null,100,90,25,null], PA6:[150,150,150,150,null,25] };
  const note = (a,b) => a==='PPK'&&b==='PPN' ? 'screw pull' : a==='PPG'&&b==='PPW' ? 'forbidden: glass streaks' : (a==='PA6')!==(b==='PA6') ? 'polymer change, full purge' : M[a][F.indexOf(b)]===null ? 'no line runs both' : '';
  const co = (a,b) => a===b ? 0 : P[a].family===P[b].family ? (P[a].family==='PPC' ? 60 : 25) : M[P[a].family][F.indexOf(P[b].family)];
  const RATE = 2.30 * 0.88, H = 3600e3, T0 = Date.UTC(2026,4,4,6,0), WEEK_END = T0 + 168*H, ERP = 60;
  const fmt = (t) => new Date(t).toISOString().slice(0,16).replace('T',' ');
  const shiftOf = (t) => { const d = new Date(t), h = d.getUTCHours(); const day = new Date(t - (h < 6 ? 24*H : 0)).toISOString().slice(0,10); return { day, shift: h>=6&&h<14?'A':h>=14&&h<22?'B':'C' }; };
  const dow = (t) => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(t).getUTCDay()];
  const cust = { PPN:'Alvena Packaging', PPW:'Duval Home', PPC:'Brisol Automotive', PPK:'Estrel Pipes', PPG:'Brisol Automotive', PA6:'Kerno Electrics' };
  const S = {
    M01: [['PPK-4010',30],['PPW-2010',25],['PPC-3120',20],['PPN-1020',30],['PPK-4040',25],['PPC-3110',20],['PPW-2030',25],['PPG-5030',30],['PPK-4010',30],['PPC-3140',20],['PPN-1010',30],['PPK-4040',27]],
    M02: [['PPN-1010',30],['PPW-2010',25],['PPC-3110',25],['PPK-4010',30],['PPN-1020',30],['PPG-5031',30],['PPC-3120',20],['PPK-4040',25],['PPK-4010',20]],
    M03: [['PPN-1010',30],['PPW-2030',20],['PPC-3140',20],['PPN-1020',15],['PA6-6010',25],['PA6-6040',25],['PPK-4010',30],['PPK-4040',25],['PPC-3120',20]],
    M04: [['PPN-1010',30],['PPW-2010',30],['PPC-3120',25],['PPK-4040',30],['PPG-5030',20],['PPK-4010',25],['PPC-3110',20],['PPW-2030',20]],
    M05: [['PPN-1020',30],['PPW-2030',25],['PPC-3110',25],['PPK-4040',30],['PPG-5030',30],['PPW-2010',25],['PPC-3120',20],['PPK-4010',25]],
    M06: [['PPN-1010',45],['PPW-2010','tuneA'],['PA6-6010',25],['PA6-6040',20],['PPK-4010',30],['PPK-4040','tuneB'],['PPN-1010',20],['PPW-2030',25],['PPC-3110',20]],
    M07: [['PPN-1010',40],['PPW-2010',35],['PPC-3120','tuneC'],['PPC-3110',0.5],['PPC-3140',0.5],['PPW-2030',0.6],['PPN-1020',0.5],['PPC-3120',0.5],['PPK-4040',30],['PPK-4010',25]] };
  const retail = new Set(['M07:3','M07:4','M07:5','M07:6','M07:7']);
  function plan(seq, targets) {
    const rows = []; let t = T0;
    seq.forEach(([p, tn], i) => {
      const coStart = i ? t : null; if (i) t += ERP*60e3;
      let tonnes = tn;
      if (typeof tn === 'string') { const tgt = targets[tn]; const nextCo = i+1 < seq.length; tonnes = Math.round(((tgt - t) / H - (tn==='tuneA' ? ERP/60 : 0)) * RATE * 10) / 10; }
      const start = t, end = t + tonnes / RATE * H; t = end;
      rows.push({ p, tonnes, coStart, start, end });
    });
    return rows;
  }
  const plans = {};
  for (const m of ['M01','M02','M03','M04','M05']) plans[m] = plan(S[m], {});
  const m03pa6 = plans.M03.find((r) => P[r.p].family==='PA6').start;
  // tuneA: M06 first PA6 order starts 2.5 h after M03's; tuneB: M06 black-to-natural changeover starts Saturday 07:00; tuneC: M07 micro-orders start Thursday 14:00
  plans.M06 = plan(S.M06, { tuneA: m03pa6 + 2.5*H, tuneB: Date.UTC(2026,4,9,7,0) });
  plans.M07 = plan(S.M07, { tuneC: Date.UTC(2026,4,7,14,0) });
  let oid = 58800; const sched = [];
  for (const m of Object.keys(plans)) plans[m].forEach((r, i) => { oid++; const c = retail.has(m+':'+i) ? (i%2 ? 'Codra Retail' : 'Lumen Retail') : cust[P[r.p].family]; sched.push({ week:'2026-W19', machine:m, seq:i+1, order_id:'O'+oid, customer:c, product_code:r.p, tonnes:r.tonnes, planned_changeover_start: r.coStart===null?'':fmt(r.coStart), planned_start:fmt(r.start), planned_end:fmt(r.end), _r:r }); });
  // checker (ground truth)
  const V = [];
  for (const m of Object.keys(plans)) {
    const rows = sched.filter((s) => s.machine===m);
    const perShift = {};
    rows.forEach((s, i) => {
      const fam = P[s.product_code].family;
      if (!caps[m].split(' ').includes(fam)) V.push({ rule:'R02/R03', machine:m, order_id:s.order_id, product:s.product_code, customer:s.customer, at:s.planned_start, detail: m+' cannot run '+fam });
      if (!i) return;
      const prev = rows[i-1], a = P[prev.product_code], b = P[s.product_code], t = s._r.coStart, sh = shiftOf(t);
      perShift[sh.day+' '+sh.shift] = (perShift[sh.day+' '+sh.shift] || 0) + 1;
      if (a.color==='black' && b.color==='natural' && !(dow(t)==='Sat' && sh.shift==='A')) V.push({ rule:'R01', machine:m, order_id:s.order_id, from:prev.product_code, to:s.product_code, at:fmt(t), detail:'black to natural on '+dow(t)+' shift '+sh.shift+'; allowed only Saturday shift A' });
      if (a.family==='PPG' && b.family==='PPW') V.push({ rule:'R05', machine:m, order_id:s.order_id, from:prev.product_code, to:s.product_code, at:fmt(t), detail:'white directly after glass-filled' });
    });
    for (const [k, n] of Object.entries(perShift)) if (n > 4) V.push({ rule:'R06', machine:m, shift:k, changeovers:n, detail:n+' changeovers in one shift, maximum 4' });
  }
  const pa6 = sched.filter((s) => P[s.product_code].family==='PA6' && (s.seq===1 || P[sched.find((x)=>x.machine===s.machine&&x.seq===s.seq-1).product_code].family!=='PA6'));
  for (let i = 0; i < pa6.length; i++) for (let j = i+1; j < pa6.length; j++) { const a = pa6[i], b = pa6[j]; const gap = Math.abs(a._r.start - b._r.start)/H; if (a.machine!==b.machine && gap < 4) V.push({ rule:'R04', machines:[a.machine,b.machine], orders:[a.order_id,b.order_id], at:[a.planned_start,b.planned_start], gap_h:Math.round(gap*10)/10, detail:'two PA6 starts '+(Math.round(gap*10)/10)+' h apart; the dryer needs 4 h' }); }
  const fit = {};
  for (const m of Object.keys(plans)) {
    const rows = plans[m]; let real = 0, erp = 0;
    rows.forEach((r, i) => { if (i) { real += co(rows[i-1].p, r.p) ?? 0; erp += ERP; } });
    const run = rows.reduce((a, r) => a + r.tonnes / RATE, 0);
    const realEnd = T0 + (run + real/60) * H;
    fit[m] = { orders: rows.length, tonnes: Math.round(rows.reduce((a,r)=>a+r.tonnes,0)*10)/10, changeover_min_erp: erp, changeover_min_real: real, planned_end_erp: fmt(rows[rows.length-1].end), end_with_real_changeovers: fmt(realEnd), fits_week: realEnd <= WEEK_END, overrun_h: Math.max(0, Math.round((realEnd - WEEK_END)/H*10)/10) };
  }
  const csv = (rows, cols) => [cols.join(',')].concat(rows.map((r) => cols.map((c) => r[c]).join(','))).join('\n') + '\n';
  const files = {};
  files['products.csv'] = csv(products.map(([c,f,n,col]) => ({product_code:c,family:f,description:n,color:col})), ['product_code','family','description','color']);
  files['machines.csv'] = 'machine,families_listed_in_erp\n' + Object.keys(caps).map((m) => m + ',PPN PPW PPC PPK PPG PA6').join('\n') + '\n';
  const mrows = []; for (const a of F) for (const b of F) mrows.push({ from_family:a, to_family:b, minutes: a===b ? (a==='PPC'?'25 (same product 0; other color 60)':'25 (same product 0)') : (M[a][F.indexOf(b)] ?? ''), note: a===b ? '' : note(a,b) });
  files['changeover_matrix.csv'] = csv(mrows.map((r) => ({...r, minutes: String(r.minutes).includes(',') ? '"'+r.minutes+'"' : r.minutes})), ['from_family','to_family','minutes','note']);
  files['erp_changeover_master.csv'] = 'product_code,standard_changeover_min\n' + products.map(([c]) => c + ',60').join('\n') + '\n';
  files['schedule_week19.csv'] = csv(sched, ['week','machine','seq','order_id','customer','product_code','tonnes','planned_changeover_start','planned_start','planned_end']);
  const key = { schedule_rows: sched.length, violations: V, line_fit: fit, rules: {
    R01:'Black to natural: screw pull, 240 min, only Saturday shift A when maintenance is on site', R02:'Glass-filled (PPG) only on M01, M02, M05', R03:'PA6 only on M03 and M06', R04:'Shared dryer: no two PA6 starts on M03 and M06 within 4 h', R05:'Never white directly after glass-filled', R06:'Maximum 4 changeovers per line per shift' },
    decoy: 'M06 Saturday 07:00 PPK-4040 to PPN-1010 is allowed (R01 Saturday shift A); a checker that flags it is wrong' };
  return { files, key, sched, fit, V, P };
}
if (typeof process !== 'undefined' && process.argv && process.versions && process.versions.node) {
  (async () => { const fs = await import('node:fs'); const g = generate(); const dir = '../participant/polymex-plant-pulse-v1/data/';
    for (const [n, c] of Object.entries(g.files)) fs.writeFileSync(dir + n, c); fs.writeFileSync('answer_key_v1.json', JSON.stringify(g.key, null, 2)); console.log(JSON.stringify(g.key, null, 2)); })();
}
