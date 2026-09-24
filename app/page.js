"use client";
import {useEffect,useState} from "react";
const seed=["Josh Allen","Chase Brown","Breece Hall","Ladd McConkey","Parker Washington","Dalton Kincaid","Justin Jefferson","Kansas City D/ST","Evan McPherson","Mark Andrews","Saquon Barkley","Zay Flowers","Tee Higgins","Chuba Hubbard","Malik Nabers","Kyren Williams"];
const modes={
"Safe / Balanced":["Josh Allen","Breece Hall","Chuba Hubbard","Justin Jefferson","Parker Washington","Dalton Kincaid","Kyren Williams"],
"Risk / High Payoff":["Josh Allen","Kyren Williams","Breece Hall","Justin Jefferson","Malik Nabers","Dalton Kincaid","Zay Flowers"],
"Strong Predictions":["Josh Allen","Breece Hall","Kyren Williams","Justin Jefferson","Parker Washington","Dalton Kincaid","Chuba Hubbard"]};
export default function Home(){
 const [tab,setTab]=useState("Team"),[data,setData]=useState(null),[status,setStatus]=useState("Checking ESPN…");
 async function sync(){setStatus("Syncing…");try{let r=await fetch("/api/espn");let j=await r.json();setData(j);setStatus(j.ok?"League connected":"Private league — add ESPN credentials to server");}catch{setStatus("Sync unavailable")}}
 useEffect(()=>{sync()},[]);
 return <main className="wrap"><div className="top"><div><div className="muted">ESPN LEAGUE 1353535746</div><h1>Fantasy Command Center</h1><div className="muted">Roster-aware decisions, not generic projections.</div></div><div className="pill">{status}</div></div>
 <div className="tabs">{["Team","Lineups","Waivers","Trades","Matchups","Reports"].map(x=><button className={tab===x?"on":""} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
 {tab==="Team"&&<section className="card accent"><h2>Your Team</h2><p className="muted">{data?.league?.name||"Seeded roster until authenticated ESPN sync is configured."}</p><div className="grid">{seed.map((p,i)=><div className="player" key={p}><b>{p}</b><span className={i<9?"good":"muted"}>{i<9?"START":"BENCH"}</span></div>)}</div><button onClick={sync}>Sync ESPN</button></section>}
 {tab==="Lineups"&&<div className="grid">{Object.entries(modes).map(([m,ps])=><section className="card" key={m}><h3>{m}</h3>{ps.map((p,i)=><div className="player" key={p}><span>{["QB","RB","RB","WR","WR","TE","FLEX"][i]}</span><b>{p}</b></div>)}<p className="muted">{m==="Safe / Balanced"?"Prioritizes role stability, volume and floor.":m==="Risk / High Payoff"?"Prioritizes explosive ceilings and volatile matchups.":"Model-weighted best call using usage, matchup and availability."}</p></section>)}</div>}
 {tab==="Waivers"&&<Tool title="Waiver Wire" text="Ranks actual available players after ESPN sync. Scores role growth, targets/carries, red-zone work, matchup and who on your roster is expendable."/>}
 {tab==="Trades"&&<Tool title="Trade Analyzer" text="Compares both sides using your league scoring, roster construction, positional replacement value and rest-of-season role — not a generic player-value chart."/>}
 {tab==="Matchups"&&<Tool title="Matchup Intelligence" text="Opponent strength by position, recent defensive performance, usage, snap share, OL injuries, expected game script and weather hooks."/>}
 {tab==="Reports"&&<Tool title="Player Reports" text="Injury/practice status, depth-chart movement and recent news with timestamps. Recommendations are recalculated when inputs change."/>}
 </main>}
function Tool({title,text}){return <section className="card accent"><h2>{title}</h2><p>{text}</p><p className="warn">Live recommendation engine scaffolded; ESPN authentication/data adapters are the next connection step.</p></section>}
