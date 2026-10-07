import { chromium } from "playwright";
import fs from "node:fs/promises";

const OUT = "assets";
await fs.mkdir(OUT, { recursive: true });

const tokens = {
  light: { bg:"#f9fafb", ink:"#11151a", muted:"#565b61", rule:"#d2d4d7", accent:"#a93800", bar:"#11161a", empty:"#e2e5e7", career:"#5f83d4" },
  dark:  { bg:"#0f1215", ink:"#f2f3f4", muted:"#a0a5ab", rule:"#2f3338", accent:"#f7945a", bar:"#1f2428", empty:"#23272b", career:"#7195e8" }
};

const products = [
  {slug:"roleward", no:"01", name:"Roleward", tag:"Find roles that fit, then prepare and track your applications.", host:"roleward.liminzheng.com"},
  {slug:"asterline", no:"02", name:"Asterline", tag:"Turns a pile of user feedback into traceable work items.", host:"asterline.liminzheng.com"},
  {slug:"pianology", no:"03", name:"Pianology", tag:"Helps adult piano learners make short practice sessions count.", host:"pianology.liminzheng.com"},
  {slug:"allgood", no:"04", name:"AllGood", tag:"Leave your family an organized index of what they’d need.", host:"allgood.liminzheng.com"}
];

const skills = [
  {slug:"reflection-companion", name:"Reflection Companion", status:"Alpha · v0.5.6 · MIT", tag:"Turns your AI conversations into diaries, weekly reviews and questioned assumptions.", k1:"Runs in", v1:"Codex · Claude Code · Claude web", k2:"Languages", v2:"Chinese · English"},
  {slug:"roleward-job-hunting", name:"Roleward Job Hunting", status:"Public alpha · Codex-first", tag:"Decide which roles deserve attention, then prepare truthful application materials.", k1:"Runs in", v1:"Codex, as a local workspace", k2:"Related", v2:"Roleward — web app"},
  {slug:"piano-score-simplifier", name:"Score Simplifier", status:"Alpha · v0.3.7 · MIT", tag:"Makes easier solo-piano arrangements from a reliable source score, at three levels.", k1:"Runs in", v1:"Codex · Claude Code · Claude web · ChatGPT Work", k2:"Output", v2:"PDF · MusicXML · MIDI"}
];

const socials = [
  {slug:"zhenglimindesign-ing", name:"Limin Zheng", badge:"liminzheng.com", tag:"Products, agent skills and notes from building AI products end to end.", cells:["Roleward","Asterline","Pianology","AllGood"]},
  {slug:"asterline", name:"Asterline", badge:"Live demo", tag:"Turns a pile of user feedback into traceable work items.", cells:["Source grounding","Evaluation","Deterministic checks","Human review"]},
  {slug:"roleward-job-hunting", name:"Roleward Job Hunting", badge:"Agent skill", tag:"Decide which roles deserve attention, then prepare truthful application materials.", cells:["Find roles","Judge fit","Prepare materials","Track progress"]},
  {slug:"reflection-companion", name:"Reflection Companion", badge:"Agent skill", tag:"Turns your AI conversations into diaries, weekly reviews and questioned assumptions.", cells:["Diaries","Weekly reviews","Assumptions","Learning kept"]},
  {slug:"piano-score-simplifier", name:"Score Simplifier", badge:"Agent skill", tag:"Makes easier solo-piano arrangements from a reliable source score, at three levels.", cells:["Source score","Three levels","Revisions","PDF · MusicXML · MIDI"]}
];

const s1 = ["6621224111","4532632002","2035111000","0330004402","1150333333","3303533331","1122633332","2111144003","3002264465","5550004006"].join("");
// Current through S2 Day 25 (2026-10-06); Days 24–25 are Career.
const s2 = "6334441601164000416202155";
const topics = ["Understanding AI","Product & Design","Building Solo","Working with AI","Human & AI","Career","Life & Reflections"];
const topicLight = ["#cb6f6d","#b77611","#82972b","#0ca172","#079db4","#5f83d4","#aa63b7"];
const topicDark  = ["#dd7f7d","#cf8b1d","#96ad36","#1abc89","#16b3cc","#7195e8","#c176cf"];

const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1900,height:1200}, deviceScaleFactor:2});
const page = await context.newPage();

const shell = (body) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box} html,body{margin:0;padding:0;background:transparent;-webkit-font-smoothing:antialiased}
body{font-family:Geist,system-ui,sans-serif}.asset{overflow:hidden}
.mono{font-family:"Geist Mono",ui-monospace,monospace}
</style></head><body>${body}</body></html>`;

async function capture(name, body) {
  await page.setContent(shell(body), {waitUntil:"networkidle"});
  await page.evaluate(() => document.fonts.ready);
  const el = page.locator(".asset");
  await el.screenshot({path:`${OUT}/${name}.png`, omitBackground:true});
}

function header(mode) {
  const t=tokens[mode], dark=mode==="dark";
  return `<div class="asset" style="width:830px;height:230px;display:grid;grid-template-columns:1.2fr 1fr;background:${t.bg};border:1px solid ${t.rule};border-radius:8px;color:${t.ink}">
  <div style="padding:24px 28px;display:flex;flex-direction:column">
    <div class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">Profile / zhenglimindesign-ing</div>
    <div style="margin-top:14px;font-size:50px;line-height:1;font-weight:600;letter-spacing:-.045em">Limin Zheng</div>
    <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:2px 16px;font-size:15px;line-height:1.45;color:${t.muted}">
      ${[["Product manager","-3%","-5%","50%","-3deg"],["Former product designer","-2%","-3%","55%","1.5deg"],["Independent builder","-4%","-3%","47%","-1.5deg"]].map(([x,l,r,top,rot])=>`<span style="position:relative;display:inline-block">${x}<span style="position:absolute;left:${l};right:${r};top:${top};height:3px;border-radius:50%;background:${t.accent};transform:rotate(${rot})"></span></span>`).join("")}
    </div>
    <div style="margin-top:auto;padding-top:12px;font-family:Caveat,cursive;font-size:31px;line-height:1;font-weight:500;color:${t.accent};transform:rotate(-2deg);transform-origin:left center">I’d rather not be easy to define.</div>
  </div>
  <div style="border-left:1px solid ${t.rule};display:grid;grid-template-rows:repeat(5,1fr)">
    ${[["Background","Cloud security · regulated systems"],["Builds","AI products, end to end"],["Shipped","4 products · 3 agent skills"],["Writing","100 Days Building · Substack"],["Base","Dubai · UTC+4"]].map((r,i)=>`<div style="display:grid;grid-template-columns:84px 1fr;align-items:center;padding:0 20px;${i<4?`border-bottom:1px solid ${t.rule}`:""}"><span class="mono" style="font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">${r[0]}</span><span style="font-size:13.5px">${r[1]}</span></div>`).join("")}
  </div></div>`;
}

function card(p,mode) {
  const t=tokens[mode];
  return `<div class="asset" style="width:405px;height:240px;display:flex;flex-direction:column;background:${t.bg};border:1px solid ${t.rule};border-radius:8px;color:${t.ink}">
    <div style="height:36px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid ${t.rule}"><span class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">Product / ${p.no}</span><span class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.accent};display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:${t.accent}"></span>Live</span></div>
    <div style="flex:1;padding:18px 16px 0"><div style="font-size:30px;line-height:1.05;font-weight:600;letter-spacing:-.035em">${p.name}</div><div style="margin-top:8px;font-size:14.5px;line-height:1.45;color:${t.muted};max-width:350px">${p.tag}</div></div>
    <div style="flex:none;display:grid;grid-template-columns:1fr 2fr;border-top:1px solid ${t.rule}"><div style="padding:10px 16px;display:flex;flex-direction:column;gap:5px"><span class="mono" style="font-size:9.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">Form</span><span style="font-size:12.5px">Web app</span></div><div style="padding:10px 16px;display:flex;flex-direction:column;gap:5px;border-left:1px solid ${t.rule}"><span class="mono" style="font-size:9.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">URL</span><span class="mono" style="font-size:11.5px;line-height:1.15">${p.host} ↗</span></div></div>
  </div>`;
}

function days(mode) {
  const t=tokens[mode], colors=mode==="dark"?topicDark:topicLight;
  const squares = (seq, total=100) => Array.from({length:total},(_,i)=>`<span style="width:10px;height:10px;background:${i<seq.length?colors[+seq[i]]:t.empty}"></span>`).join("");
  return `<div class="asset" style="width:830px;height:211px;background:${t.bg};border:1px solid ${t.rule};border-radius:8px;color:${t.ink}">
    <div style="height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;border-bottom:1px solid ${t.rule}"><span class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.ink}">100 Days Building</span><span class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">S1 100/100 · S2 025/100 · one note a day</span></div>
    <div style="padding:20px;display:grid;grid-template-columns:72px 1fr;row-gap:16px;align-items:start">
      <div class="mono" style="font-size:10.5px;line-height:1.5;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:${t.muted}">S1<br>Done</div><div style="display:grid;grid-template-columns:repeat(50,10px);gap:4px">${squares(s1)}</div>
      <div class="mono" style="font-size:10.5px;line-height:1.5;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:${t.muted}">S2<br>Now</div><div style="display:grid;grid-template-columns:repeat(50,10px);gap:4px">${squares(s2)}</div>
    </div>
    <div style="padding:12px 20px;border-top:1px solid ${t.rule};display:flex;flex-wrap:wrap;gap:8px 18px">${topics.map((n,i)=>`<div style="display:flex;align-items:center;gap:6px" class="mono"><span style="width:8px;height:8px;background:${colors[i]}"></span><span style="font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:${mode==="dark"?"#c0c5c9":"#363b41"}">${n}</span></div>`).join("")}</div>
  </div>`;
}

function skill(s,mode) {
  const t=tokens[mode];
  return `<div class="asset" style="width:830px;height:190px;display:flex;flex-direction:column;background:${t.bg};border:1px solid ${t.rule};border-radius:8px;color:${t.ink}">
    <div style="height:34px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 18px;border-bottom:1px solid ${t.rule}"><span class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">Agent skill / ${s.slug}</span><span class="mono" style="font-size:10.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.accent}">${s.status}</span></div>
    <div style="flex:1;display:grid;grid-template-columns:1.35fr 1fr;min-height:0"><div style="padding:14px 18px;display:flex;flex-direction:column;gap:8px"><div style="font-size:32px;line-height:1;font-weight:600;letter-spacing:-.035em">${s.name}</div><div style="font-size:13.5px;line-height:1.4;color:${t.muted};max-width:480px">${s.tag}</div></div>
      <div style="border-left:1px solid ${t.rule};display:grid;grid-template-rows:1fr 1fr"><div style="display:grid;grid-template-columns:76px 1fr;align-items:center;padding:0 18px;border-bottom:1px solid ${t.rule}"><span class="mono" style="font-size:9.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">${s.k1}</span><span style="font-size:12.5px;line-height:1.35">${s.v1}</span></div><div style="display:grid;grid-template-columns:76px 1fr;align-items:center;padding:0 18px"><span class="mono" style="font-size:9.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${t.muted}">${s.k2}</span><span style="font-size:12.5px;line-height:1.35">${s.v2}</span></div></div></div>
    <div class="mono" style="height:38px;flex:none;display:flex;align-items:center;padding:0 18px;background:${t.bar};color:#f2f3f4;font-size:12px"><span style="color:${t.accent};margin-right:10px">$</span>git clone https://github.com/zhenglimindesign-ing/${s.slug}</div>
  </div>`;
}

function social(s) {
  const t=tokens.light;
  return `<div class="asset" style="width:640px;height:320px;display:flex;flex-direction:column;background:${t.bg};color:${t.ink}">
    <div style="height:40px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 22px;border-bottom:1px solid ${t.rule}"><span class="mono" style="font-size:11px;font-weight:500;letter-spacing:.04em;color:${t.muted}">zhenglimindesign-ing / ${s.slug}</span><span class="mono" style="display:flex;align-items:center;gap:6px;color:${t.accent};font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.08em"><span style="width:6px;height:6px;border-radius:50%;background:${t.accent}"></span>${s.badge}</span></div>
    <div style="flex:1;padding:28px 22px 0"><div style="font-size:50px;line-height:1;font-weight:600;letter-spacing:-.045em">${s.name}</div><div style="margin-top:12px;font-size:18px;line-height:1.4;color:${t.muted};max-width:470px">${s.tag}</div></div>
    <div style="flex:none;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid ${t.rule}">${s.cells.map((c,i)=>`<div style="padding:12px 16px;display:flex;flex-direction:column;gap:6px;${i<3?`border-right:1px solid ${t.rule}`:""}"><span class="mono" style="font-size:9.5px;font-weight:500;color:${t.accent}">0${i+1}</span><span style="font-size:12.5px">${c}</span></div>`).join("")}</div>
  </div>`;
}

for (const mode of ["light","dark"]) await capture(`header-${mode}`, header(mode));
for (const p of products) for (const mode of ["light","dark"]) await capture(`card-${p.slug}-${mode}`, card(p,mode));
for (const mode of ["light","dark"]) await capture(`100days-${mode}`, days(mode));
for (const s of skills) for (const mode of ["light","dark"]) await capture(`skill-${s.slug}-${mode}`, skill(s,mode));
for (const s of socials) await capture(`social-${s.slug}`, social(s));

await browser.close();
console.log("Rendered profile assets to", OUT);
