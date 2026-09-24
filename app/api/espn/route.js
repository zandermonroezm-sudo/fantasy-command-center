const HOST="https://lm-api-reads.fantasy.espn.com";
const LEAGUE="1353535746",SEASON="2026";
export async function GET(){
 const url=`${HOST}/apis/v3/games/ffl/seasons/${SEASON}/segments/0/leagues/${LEAGUE}?view=mTeam&view=mRoster&view=mSettings&view=mMatchup&view=mStatus`;
 const headers={Accept:"application/json","User-Agent":"FantasyCommandCenter/0.1"};
 if(process.env.ESPN_S2&&process.env.ESPN_SWID)headers.Cookie=`espn_s2=${process.env.ESPN_S2}; SWID=${process.env.ESPN_SWID}`;
 try{const r=await fetch(url,{headers,cache:"no-store"});if(!r.ok)return Response.json({ok:false,status:r.status,message:r.status===401||r.status===403?"Private ESPN league requires server credentials.":"ESPN request failed."},{status:200});const j=await r.json();return Response.json({ok:true,league:{id:j.id,name:j.settings?.name||"ESPN League",teams:j.teams||[],settings:j.settings,status:j.status,schedule:j.schedule||[]}})}catch(e){return Response.json({ok:false,message:"ESPN is currently unreachable."},{status:200})}
}