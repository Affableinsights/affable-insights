import { useState, useEffect } from "react";

const C = {
  teal:"#0A6B72",tealD:"#074F54",tealL:"#D6F0F2",tealM:"#7EC8CC",tealGlow:"rgba(10,107,114,0.15)",
  amber:"#D4860A",amberL:"#FFF3D6",green:"#1C7A42",greenL:"#E2F5EB",
  red:"#B5291B",redL:"#FDECEA",purple:"#5044A0",purpleL:"#EDEAF8",
  blue:"#1455A8",blueL:"#E3EEF8",ink:"#0A0F1E",ink2:"#2A3245",ink3:"#5A6278",
  smoke:"#8A90A0",mist:"#C8CEDB",fog:"#EEF0F5",snow:"#F7F8FA",white:"#FFFFFF",
  navy:"#0A1628",gold:"#B87A00",goldL:"#FFF8E0",
  sidebar:"#0D1F2D",sidebarA:"#0A6B72",
};
const F={display:"'Sora','DM Sans',sans-serif",body:"'DM Sans','Sora',sans-serif"};

const GCSS=`
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#0A1628;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(10,107,114,0.4);border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes tick{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
`;

function injectCSS(){
  if(document.getElementById("adm-css"))return;
  const s=document.createElement("style");s.id="adm-css";s.textContent=GCSS;document.head.appendChild(s);
}

// ── Primitives ──────────────────────────────────────────────────────────────
const Desktop=({children})=>(
  <div style={{width:1280,minHeight:800,background:C.snow,borderRadius:16,boxShadow:"0 40px 120px rgba(0,0,0,0.7)",overflow:"hidden",display:"flex",border:"1px solid rgba(255,255,255,0.06)"}}>
    {children}
  </div>
);

const Sidebar=({active,setScreen})=>{
  const items=[
    {id:"dashboard",icon:"⬛",label:"Dashboard"},
    {id:"rota",icon:"📅",label:"Rota Management"},
    {id:"careplan",icon:"📋",label:"Care Plans"},
    {id:"workers",icon:"👥",label:"Support Workers"},
    {id:"services",icon:"🏠",label:"Services"},
    {id:"incidents",icon:"🚨",label:"Incidents"},
    {id:"reports",icon:"📊",label:"Reports"},
    {id:"audit",icon:"🔍",label:"Audit Log"},
    {id:"settings",icon:"⚙️",label:"Settings"},
  ];
  return(
    <div style={{width:240,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.05)"}}>
      {/* Logo */}
      <div style={{padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 4px 16px ${C.tealGlow}`}}>🤝</div>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:C.white,fontFamily:F.display,letterSpacing:-0.4}}>Affable</div>
            <div style={{fontSize:11,color:C.tealM,fontFamily:F.body}}>Insights</div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{flex:1,padding:"12px 10px",display:"flex",flexDirection:"column",gap:2,overflowY:"auto"}}>
        {items.map(item=>(
          <button key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,border:"none",background:active===item.id?`linear-gradient(135deg,${C.teal},#0D9AA6)`:"transparent",color:active===item.id?C.white:"rgba(255,255,255,0.45)",cursor:"pointer",fontFamily:F.body,fontSize:13,fontWeight:active===item.id?700:400,transition:"all 0.2s",textAlign:"left",width:"100%",boxShadow:active===item.id?`0 4px 14px ${C.tealGlow}`:"none"}}>
            <span style={{fontSize:15,opacity:active===item.id?1:0.6}}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      {/* User */}
      <div style={{padding:"16px 14px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:C.white,fontFamily:F.display}}>JS</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.white,fontFamily:F.display}}>James Sega</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontFamily:F.body}}>Service Manager</div>
          </div>
          <div style={{marginLeft:"auto",width:8,height:8,borderRadius:8,background:C.green,animation:"pulse 2s infinite"}}/>
        </div>
      </div>
    </div>
  );
};

const TopBar=({title,subtitle,actions})=>(
  <div style={{height:64,background:C.white,borderBottom:`1px solid ${C.fog}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",flexShrink:0}}>
    <div>
      <div style={{fontSize:20,fontWeight:800,color:C.ink,fontFamily:F.display,letterSpacing:-0.5}}>{title}</div>
      {subtitle&&<div style={{fontSize:12,color:C.smoke,fontFamily:F.body,marginTop:1}}>{subtitle}</div>}
    </div>
    <div style={{display:"flex",gap:10,alignItems:"center"}}>{actions}</div>
  </div>
);

const Btn=({label,onClick,color,outline,sm,icon})=>(
  <button onClick={onClick} style={{background:outline?"transparent":`linear-gradient(135deg,${color||C.teal},${color?color+"CC":"#0D9AA6"})`,border:outline?`1.5px solid ${color||C.teal}`:"none",color:outline?color||C.teal:C.white,padding:sm?"7px 14px":"10px 20px",borderRadius:10,fontSize:sm?12:13,fontWeight:700,cursor:"pointer",fontFamily:F.display,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",boxShadow:outline?"none":`0 3px 12px ${C.tealGlow}`,transition:"all 0.2s"}}>
    {icon&&<span>{icon}</span>}{label}
  </button>
);

const Card=({children,style,title,action})=>(
  <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.fog}`,boxShadow:"0 2px 12px rgba(0,0,0,0.04)",...style}}>
    {title&&<div style={{padding:"14px 18px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{fontSize:13,fontWeight:700,color:C.ink3,textTransform:"uppercase",letterSpacing:0.8,fontFamily:F.display}}>{title}</div>
      {action}
    </div>}
    {children}
  </div>
);

const Tag=({label,color,bg,size})=>(
  <span style={{background:bg,color,borderRadius:20,padding:size==="sm"?"2px 8px":"4px 10px",fontSize:size==="sm"?10:12,fontWeight:700,fontFamily:F.display,whiteSpace:"nowrap"}}>{label}</span>
);

const StatCard=({value,label,icon,color,bg,trend})=>(
  <Card style={{padding:"20px 22px",flex:1}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{fontSize:32,fontWeight:800,color:color||C.teal,fontFamily:F.display,letterSpacing:-1}}>{value}</div>
        <div style={{fontSize:13,color:C.smoke,fontFamily:F.body,marginTop:4}}>{label}</div>
        {trend&&<div style={{fontSize:12,color:trend>0?C.green:C.red,fontFamily:F.body,marginTop:6,fontWeight:600}}>{trend>0?"↑":"↓"} {Math.abs(trend)}% this week</div>}
      </div>
      <div style={{width:44,height:44,borderRadius:12,background:bg||C.tealL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{icon}</div>
    </div>
  </Card>
);

// ── SCREEN: Login ────────────────────────────────────────────────────────────
function LoginScreen({onDone}){
  const [step,setStep]=useState("login");
  const [loading,setLoading]=useState(false);

  function handleLogin(){
    setLoading(true);
    setTimeout(()=>{setLoading(false);setStep("mfa");},800);
  }
  function handleMfa(){
    setLoading(true);
    setTimeout(()=>{setLoading(false);onDone();},1000);
  }

  return(
    <div style={{width:"100%",minHeight:"100vh",background:`radial-gradient(ellipse at 30% 40%, #0D2040 0%, #0A1628 70%)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{display:"flex",gap:80,alignItems:"center",maxWidth:900,width:"100%",padding:"0 40px"}}>
        {/* Brand panel */}
        <div style={{flex:1,animation:"fadeUp 0.6s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:32}}>
            <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:`0 8px 32px ${C.tealGlow}`}}>🤝</div>
            <div>
              <div style={{fontSize:28,fontWeight:800,color:C.white,fontFamily:F.display,letterSpacing:-0.8}}>Affable Insights</div>
              <div style={{fontSize:13,color:C.tealM,fontFamily:F.body}}>Health & Social Care Platform</div>
            </div>
          </div>
          <div style={{fontSize:38,fontWeight:800,color:C.white,fontFamily:F.display,letterSpacing:-1,lineHeight:1.15,marginBottom:20}}>Care management<br/><span style={{color:C.tealM}}>built differently.</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:32}}>
            {[["🔒","Rota-locked access control"],["👥","Full care cycle visibility"],["📊","Real-time compliance reporting"],["🔄","Seamless data migration"]].map(([icon,text],i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:16}}>{icon}</span>
                <span style={{fontSize:14,color:"rgba(255,255,255,0.6)",fontFamily:F.body}}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Login card */}
        <div style={{width:400,background:"rgba(255,255,255,0.04)",borderRadius:24,padding:40,border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(20px)",animation:"fadeUp 0.6s 0.1s ease both"}}>
          {step==="login"?(
            <>
              <div style={{marginBottom:28}}>
                <div style={{fontSize:22,fontWeight:800,color:C.white,fontFamily:F.display,letterSpacing:-0.5}}>Manager Sign In</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:4,fontFamily:F.body}}>Access your service dashboard</div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:0.8,marginBottom:8,fontFamily:F.display}}>Email</div>
                <input defaultValue="j.sega@affablecare.org.uk" style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.06)",color:C.white,fontSize:14,fontFamily:F.body,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:24}}>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:0.8,marginBottom:8,fontFamily:F.display}}>Password</div>
                <input type="password" placeholder="••••••••" style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C.teal}`,background:"rgba(255,255,255,0.06)",color:C.white,fontSize:14,fontFamily:F.body,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <button onClick={handleLogin} disabled={loading} style={{width:"100%",padding:"14px 0",background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,border:"none",borderRadius:12,color:C.white,fontSize:15,fontWeight:700,fontFamily:F.display,cursor:"pointer",boxShadow:`0 6px 24px ${C.tealGlow}`}}>
                {loading?"Signing in…":"Sign In →"}
              </button>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:20}}>
                <div style={{flex:1,height:1,background:"rgba(255,255,255,0.08)"}}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.25)",fontFamily:F.body}}>Role-based access</span>
                <div style={{flex:1,height:1,background:"rgba(255,255,255,0.08)"}}/>
              </div>
              <div style={{display:"flex",gap:8,marginTop:14}}>
                {[["SM","Service Manager"],["AD","Administrator"],["CM","Commissioner"]].map(([code,label])=>(
                  <div key={code} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:9,padding:"8px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.tealM,fontFamily:F.display}}>{code}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:F.body,marginTop:2}}>{label}</div>
                  </div>
                ))}
              </div>
            </>
          ):(
            <>
              <div style={{marginBottom:28,textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:12}}>🔐</div>
                <div style={{fontSize:20,fontWeight:800,color:C.white,fontFamily:F.display}}>Two-step verification</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:6,fontFamily:F.body}}>Code sent to your registered device</div>
              </div>
              <div style={{display:"flex",gap:10,marginBottom:28,justifyContent:"center"}}>
                {[0,1,2,3,4,5].map(i=>(
                  <input key={i} maxLength={1} defaultValue={i<3?["4","7","2"][i]:""} style={{width:48,height:56,borderRadius:12,border:`2px solid ${i<3?C.teal:"rgba(255,255,255,0.12)"}`,background:i<3?"rgba(10,107,114,0.15)":"rgba(255,255,255,0.04)",color:C.white,fontSize:22,fontWeight:800,textAlign:"center",fontFamily:F.display,outline:"none"}}/>
                ))}
              </div>
              <button onClick={handleMfa} disabled={loading} style={{width:"100%",padding:"14px 0",background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,border:"none",borderRadius:12,color:C.white,fontSize:15,fontWeight:700,fontFamily:F.display,cursor:"pointer",boxShadow:`0 6px 24px ${C.tealGlow}`}}>
                {loading?"Verifying…":"Verify & Enter →"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: Dashboard ────────────────────────────────────────────────────────
function DashboardScreen(){
  const alerts=[
    {type:"amber",msg:"Handover not submitted — Maple House, evening shift",time:"20 min ago"},
    {type:"red",msg:"Red visit note raised — Service User: Resident B",time:"1 hr ago"},
    {type:"amber",msg:"3 unfilled shifts this week — Domiciliary Service",time:"2 hrs ago"},
    {type:"green",msg:"New rota published — Supported Living, w/c 2 Jun",time:"3 hrs ago"},
  ];
  const workers=[
    {name:"J. Sega",shift:"On shift",status:"green",service:"Maple House"},
    {name:"A. Mensah",shift:"On shift",status:"green",service:"Dom — MK55"},
    {name:"R. Osei",shift:"Off shift",status:"red",service:"Not rostered"},
    {name:"T. Boateng",shift:"Starting 20:00",status:"amber",service:"Dom — MK55"},
    {name:"P. Asante",shift:"On shift",status:"green",service:"Oak House"},
  ];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar title="Dashboard" subtitle="Good afternoon, James — 5 June 2026"
        actions={<>
          <div style={{display:"flex",alignItems:"center",gap:6,background:C.greenL,borderRadius:20,padding:"6px 12px"}}>
            <div style={{width:7,height:7,borderRadius:7,background:C.green,animation:"pulse 1.5s infinite"}}/>
            <span style={{fontSize:12,fontWeight:700,color:C.green,fontFamily:F.display}}>All systems live</span>
          </div>
          <Btn label="+ New Shift" icon="📅" sm/>
        </>}
      />
      <div style={{flex:1,overflow:"auto",padding:24,display:"flex",flexDirection:"column",gap:20}}>
        {/* Stat cards */}
        <div style={{display:"flex",gap:16,animation:"fadeUp 0.4s ease"}}>
          <StatCard value="24" label="Active workers today" icon="👥" color={C.teal} bg={C.tealL} trend={8}/>
          <StatCard value="3" label="Open incidents" icon="🚨" color={C.red} bg={C.redL} trend={-2}/>
          <StatCard value="89%" label="Visit completion rate" icon="✅" color={C.green} bg={C.greenL} trend={3}/>
          <StatCard value="2" label="Unfilled shifts" icon="📅" color={C.amber} bg={C.amberL} trend={-5}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          {/* Alerts */}
          <Card title="Live Alerts" action={<Tag label="4 new" color={C.red} bg={C.redL} size="sm"/>}>
            <div style={{padding:"8px 0"}}>
              {alerts.map((a,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 18px",borderTop:i>0?`1px solid ${C.fog}`:"none"}}>
                  <div style={{width:8,height:8,borderRadius:8,background:a.type==="red"?C.red:a.type==="amber"?C.amber:C.green,flexShrink:0,marginTop:5}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:C.ink,fontFamily:F.body,lineHeight:1.4}}>{a.msg}</div>
                    <div style={{fontSize:11,color:C.smoke,fontFamily:F.body,marginTop:3}}>{a.time}</div>
                  </div>
                  <button style={{background:"none",border:`1px solid ${C.mist}`,borderRadius:7,padding:"4px 10px",fontSize:11,color:C.ink3,cursor:"pointer",fontFamily:F.display,whiteSpace:"nowrap"}}>View</button>
                </div>
              ))}
            </div>
          </Card>

          {/* Worker status */}
          <Card title="Worker Access Status">
            <div style={{padding:"8px 0"}}>
              {workers.map((w,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 18px",borderTop:i>0?`1px solid ${C.fog}`:"none"}}>
                  <div style={{width:32,height:32,borderRadius:9,background:C.tealL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.tealD,fontFamily:F.display,flexShrink:0}}>{w.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:F.display}}>{w.name}</div>
                    <div style={{fontSize:11,color:C.smoke,fontFamily:F.body}}>{w.service}</div>
                  </div>
                  <Tag label={w.shift} color={w.status==="green"?C.green:w.status==="red"?C.red:C.amber} bg={w.status==="green"?C.greenL:w.status==="red"?C.redL:C.amberL} size="sm"/>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Services overview */}
        <Card title="Services Overview">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,padding:"8px 0"}}>
            {[
              {name:"Domiciliary Care — Bedford MK55",type:"dom",workers:12,visits:8,completion:"92%",incidents:1},
              {name:"Maple House — Supported Living",type:"sl",workers:6,residents:4,completion:"88%",incidents:0},
            ].map((s,i)=>(
              <div key={i} style={{padding:"16px 20px",borderRight:i===0?`1px solid ${C.fog}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <span style={{fontSize:20}}>{s.type==="dom"?"🚗":"🏠"}</span>
                  <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display}}>{s.name}</div>
                  <Tag label={s.type==="dom"?"Domiciliary":"Supported Living"} color={s.type==="dom"?C.blue:C.purple} bg={s.type==="dom"?C.blueL:C.purpleL} size="sm"/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  {[[s.workers,"Workers","👥"],[s.type==="dom"?s.visits:s.residents,s.type==="dom"?"Visits today":"Residents","📍"],[s.completion,"Completion","✅"]].map(([v,l,ic],j)=>(
                    <div key={j} style={{background:C.snow,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                      <div style={{fontSize:18,fontWeight:800,color:C.teal,fontFamily:F.display}}>{v}</div>
                      <div style={{fontSize:10,color:C.smoke,fontFamily:F.body,marginTop:2}}>{ic} {l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── SCREEN: Rota Management (with drag, drop & duplicate) ──────────────────
function RotaScreen(){
  const [service,setService]=useState("dom");
  const [showModal,setShowModal]=useState(false);
  const [saved,setSaved]=useState(false);
  const [publishMsg,setPublishMsg]=useState(false);
  const [dragInfo,setDragInfo]=useState(null);  // {worker,day,shift}
  const [dragOver,setDragOver]=useState(null);  // {worker,day}
  const [copyMode,setCopyMode]=useState(false); // true = duplicate, false = move
  const [tooltip,setTooltip]=useState(null);   // {x,y,text}
  const [contextMenu,setContextMenu]=useState(null); // {x,y,worker,day,shift}

  const workers={
    dom:["James Sega","A. Mensah","T. Boateng","R. Osei","P. Asante","K. Darko"],
    sl:["J. Sega","A. Mensah","R. Osei","P. Asante"],
  };
  const days=["Mon 2","Tue 3","Wed 4","Thu 5","Fri 6","Sat 7","Sun 8"];

  const initShifts={
    dom:{
      "James Sega":   [{d:0,s:"20:00",e:"08:00",t:"N"},{d:1,s:"20:00",e:"08:00",t:"N"},{d:4,s:"20:00",e:"08:00",t:"N"}],
      "A. Mensah":    [{d:0,s:"08:00",e:"20:00",t:"D"},{d:2,s:"08:00",e:"20:00",t:"D"},{d:4,s:"08:00",e:"20:00",t:"D"}],
      "T. Boateng":   [{d:1,s:"20:00",e:"08:00",t:"N"},{d:3,s:"20:00",e:"08:00",t:"N"},{d:5,s:"20:00",e:"08:00",t:"N"}],
      "R. Osei":      [{d:2,s:"08:00",e:"20:00",t:"D"},{d:5,s:"08:00",e:"20:00",t:"D"},{d:6,s:"08:00",e:"20:00",t:"D"}],
      "P. Asante":    [{d:3,s:"20:00",e:"08:00",t:"N"},{d:4,s:"20:00",e:"08:00",t:"N"}],
      "K. Darko":     [{d:0,s:"08:00",e:"20:00",t:"D"},{d:1,s:"08:00",e:"20:00",t:"D"},{d:6,s:"08:00",e:"20:00",t:"D"}],
    },
    sl:{
      "J. Sega":      [{d:0,s:"08:00",e:"20:00",t:"D"},{d:1,s:"08:00",e:"20:00",t:"D"},{d:4,s:"08:00",e:"20:00",t:"D"}],
      "A. Mensah":    [{d:0,s:"20:00",e:"08:00",t:"N"},{d:3,s:"20:00",e:"08:00",t:"N"},{d:6,s:"20:00",e:"08:00",t:"N"}],
      "R. Osei":      [{d:1,s:"20:00",e:"08:00",t:"N"},{d:2,s:"20:00",e:"08:00",t:"N"},{d:5,s:"08:00",e:"20:00",t:"D"}],
      "P. Asante":    [{d:2,s:"08:00",e:"20:00",t:"D"},{d:4,s:"20:00",e:"08:00",t:"N"},{d:5,s:"20:00",e:"08:00",t:"N"}],
    },
  };

  const [allShifts,setAllShifts]=useState(JSON.parse(JSON.stringify(initShifts)));
  const shifts=allShifts[service];

  // ── Drag helpers ────────────────────────────────────────────────
  function onDragStart(e,worker,day,shift){
    setDragInfo({worker,day,shift});
    e.dataTransfer.effectAllowed="copyMove";
    e.dataTransfer.setData("text/plain","");
    // custom ghost - set via timeout so browser uses default first
    setTimeout(()=>{
      if(e.target) e.target.style.opacity="0.4";
    },0);
  }
  function onDragEnd(e){
    if(e.target) e.target.style.opacity="1";
    setDragOver(null);
    setDragInfo(null);
  }
  function onDragOver(e,worker,day){
    e.preventDefault();
    e.dataTransfer.dropEffect=copyMode?"copy":"move";
    setDragOver({worker,day});
  }
  function onDragLeave(){
    setDragOver(null);
  }
  function onDrop(e,targetWorker,targetDay){
    e.preventDefault();
    setDragOver(null);
    if(!dragInfo) return;
    const {worker:fromWorker,day:fromDay,shift}=dragInfo;
    // same cell — no-op
    if(fromWorker===targetWorker && fromDay===targetDay){ setDragInfo(null); return; }
    // check conflict at target
    const targetShifts=shifts[targetWorker]||[];
    if(targetShifts.find(s=>s.d===targetDay)){ setDragInfo(null); return; } // already has shift

    setAllShifts(prev=>{
      const next=JSON.parse(JSON.stringify(prev));
      const svc=service;
      // add shift to target cell
      if(!next[svc][targetWorker]) next[svc][targetWorker]=[];
      next[svc][targetWorker].push({...shift,d:targetDay});
      // if MOVE (not copy), remove from source
      if(!copyMode){
        next[svc][fromWorker]=next[svc][fromWorker].filter(s=>s.d!==fromDay);
      }
      return next;
    });
    setSaved(true);
    setTimeout(()=>setSaved(false),3000);
    setDragInfo(null);
  }

  // ── Context menu (right-click) ───────────────────────────────────
  function onRightClick(e,worker,day,shift){
    e.preventDefault();
    setContextMenu({x:e.clientX,y:e.clientY,worker,day,shift});
  }
  function closeCtx(){ setContextMenu(null); }
  function ctxDelete(){
    const {worker,day}=contextMenu;
    setAllShifts(prev=>{
      const next=JSON.parse(JSON.stringify(prev));
      next[service][worker]=next[service][worker].filter(s=>s.d!==day);
      return next;
    });
    closeCtx();
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  }
  function ctxDuplicate(targetDay){
    const {worker,shift}=contextMenu;
    if(targetDay===undefined||targetDay===null){ closeCtx(); return; }
    const already=(shifts[worker]||[]).find(s=>s.d===targetDay);
    if(already){ closeCtx(); return; }
    setAllShifts(prev=>{
      const next=JSON.parse(JSON.stringify(prev));
      if(!next[service][worker]) next[service][worker]=[];
      next[service][worker].push({...shift,d:targetDay});
      return next;
    });
    closeCtx();
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  }
  function ctxFlip(){
    const {worker,day,shift}=contextMenu;
    setAllShifts(prev=>{
      const next=JSON.parse(JSON.stringify(prev));
      next[service][worker]=next[service][worker].map(s=>{
        if(s.d!==day) return s;
        return s.t==="D"?{...s,t:"N",s:"20:00",e:"08:00"}:{...s,t:"D",s:"08:00",e:"20:00"};
      });
      return next;
    });
    closeCtx();
  }

  function handleSave(){
    setSaved(true);
    setShowModal(false);
    setTimeout(()=>setSaved(false),3000);
  }
  function handlePublish(){
    setPublishMsg(true);
    setTimeout(()=>setPublishMsg(false),4000);
  }

  const isDom=service==="dom";
  const shiftBg=(t,svc)=>t==="D"?(svc==="dom"?"#BBDEFB":"#D1C4E9"):svc==="dom"?"#90CAF9":"#B39DDB";
  const shiftBorder=(t,svc)=>t==="D"?(svc==="dom"?"#64B5F6":"#9575CD"):svc==="dom"?"#42A5F5":"#7E57C2";
  const shiftTextColor=(t,svc)=>t==="D"?(svc==="dom"?"#0D47A1":"#311B92"):svc==="dom"?"#1565C0":"#4527A0";

  const isDragOver=(w,d)=>dragOver&&dragOver.worker===w&&dragOver.day===d;
  const isBeingDragged=(w,d)=>dragInfo&&dragInfo.worker===w&&dragInfo.day===d;

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}} onClick={closeCtx}>
      <TopBar title="Rota Management" subtitle="Week commencing 2 June 2026"
        actions={<>
          <Btn label="← Prev week" outline sm/>
          <Btn label="Next week →" outline sm/>
          {/* Copy/Move toggle */}
          <div style={{display:"flex",alignItems:"center",gap:8,background:C.fog,borderRadius:10,padding:"4px 8px 4px 12px"}}>
            <span style={{fontSize:12,color:C.ink3,fontFamily:F.display,fontWeight:600}}>Drag mode:</span>
            <div style={{display:"flex",gap:4}}>
              <button onClick={()=>setCopyMode(false)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:!copyMode?C.teal:"transparent",color:!copyMode?C.white:C.smoke,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s"}}>Move</button>
              <button onClick={()=>setCopyMode(true)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:copyMode?C.green:"transparent",color:copyMode?C.white:C.smoke,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s"}}>Duplicate</button>
            </div>
          </div>
          <Btn label="+ Add Shift" icon="+" onClick={()=>setShowModal(true)} sm/>
          <Btn label="Publish Rota" icon="📤" color={C.green} sm onClick={handlePublish}/>
        </>}
      />
      <div style={{flex:1,overflow:"auto",padding:24}}>
        {saved&&<div style={{background:C.greenL,border:`1px solid ${C.green}30`,borderRadius:12,padding:"12px 18px",marginBottom:12,display:"flex",gap:10,alignItems:"center",animation:"fadeUp 0.3s ease"}}>
          <span>✅</span><span style={{fontSize:13,fontWeight:700,color:C.green,fontFamily:F.display}}>
            {copyMode?"Shift duplicated — worker notified.":"Shift moved — both workers notified of change."}
          </span>
        </div>}
        {publishMsg&&<div style={{background:C.tealL,border:`1px solid ${C.tealM}`,borderRadius:12,padding:"12px 18px",marginBottom:12,display:"flex",gap:10,alignItems:"center",animation:"fadeUp 0.3s ease"}}>
          <span>📤</span><span style={{fontSize:13,fontWeight:700,color:C.tealD,fontFamily:F.display}}>Rota published. All {workers[service].length} workers notified via push notification. Rota-lock engine updated in real time.</span>
        </div>}

        {/* Service tabs */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[["dom","🚗 Domiciliary Care — Bedford MK55"],["sl","🏠 Maple House — Supported Living"]].map(([id,label])=>(
            <button key={id} onClick={()=>setService(id)} style={{padding:"9px 18px",borderRadius:10,border:`2px solid ${service===id?id==="dom"?C.blue:C.purple:C.mist}`,background:service===id?id==="dom"?C.blueL:C.purpleL:C.white,color:service===id?id==="dom"?C.blue:C.purple:C.smoke,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s"}}>
              {label}
            </button>
          ))}
        </div>

        {/* Instruction banner */}
        <div style={{background:C.goldL,border:`1px solid ${C.gold}30`,borderRadius:12,padding:"10px 16px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:16}}>💡</span>
          <div style={{fontSize:12,color:C.ink2,fontFamily:F.body}}>
            <strong style={{color:C.gold,fontFamily:F.display}}>Drag to move</strong> a shift across workers or days.
            <strong style={{color:C.green,fontFamily:F.display}}> Switch to Duplicate</strong> mode to copy instead of move.
            <strong style={{color:C.teal,fontFamily:F.display}}> Right-click</strong> any shift for quick actions (delete, flip day/night, duplicate to specific day).
          </div>
        </div>

        {/* Rota grid */}
        <Card style={{overflow:"hidden",userSelect:"none"}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
              <thead>
                <tr style={{background:isDom?C.blueL:C.purpleL}}>
                  <th style={{padding:"12px 16px",textAlign:"left",fontSize:12,fontWeight:700,color:isDom?C.blue:C.purple,fontFamily:F.display,width:140}}>Worker</th>
                  {days.map(d=>(
                    <th key={d} style={{padding:"12px 8px",textAlign:"center",fontSize:12,fontWeight:700,color:isDom?C.blue:C.purple,fontFamily:F.display,minWidth:88}}>{d}</th>
                  ))}
                  <th style={{padding:"12px 8px",textAlign:"center",fontSize:12,fontWeight:700,color:isDom?C.blue:C.purple,fontFamily:F.display}}>Hrs</th>
                </tr>
              </thead>
              <tbody>
                {workers[service].map((worker,wi)=>{
                  const wShifts=shifts[worker]||[];
                  const hrs=wShifts.reduce((_acc,_s)=>_acc+12,0);
                  return(
                    <tr key={wi} style={{borderTop:`1px solid ${C.fog}`,background:wi%2===0?C.white:C.snow}}>
                      <td style={{padding:"10px 16px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:28,height:28,borderRadius:8,background:isDom?C.blueL:C.purpleL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:isDom?C.blue:C.purple,fontFamily:F.display}}>{worker.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                          <span style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:F.display}}>{worker}</span>
                        </div>
                      </td>
                      {days.map((_d,di)=>{
                        const cellShift=wShifts.find(sh=>sh.d===di);
                        const isOver=isDragOver(worker,di);
                        const isSrc=isBeingDragged(worker,di);
                        const hasConflict=isOver&&!!cellShift;
                        return(
                          <td key={di} style={{padding:"5px 4px",textAlign:"center"}}
                            onDragOver={(e)=>onDragOver(e,worker,di)}
                            onDragLeave={onDragLeave}
                            onDrop={(e)=>onDrop(e,worker,di)}
                          >
                            {cellShift?(
                              <div
                                draggable
                                onDragStart={(e)=>onDragStart(e,worker,di,cellShift)}
                                onDragEnd={onDragEnd}
                                onContextMenu={(e)=>onRightClick(e,worker,di,cellShift)}
                                style={{
                                  background:shiftBg(cellShift.t,service),
                                  border:`2px solid ${isSrc?"rgba(0,0,0,0.15)":shiftBorder(cellShift.t,service)}`,
                                  borderRadius:9,padding:"6px 4px",cursor:"grab",
                                  opacity:isSrc?0.4:1,
                                  transform:isSrc?"scale(0.95)":"scale(1)",
                                  transition:"opacity 0.15s,transform 0.15s",
                                  position:"relative",
                                  boxShadow:isSrc?"none":"0 1px 4px rgba(0,0,0,0.08)",
                                }}
                              >
                                {copyMode&&<div style={{position:"absolute",top:-4,right:-4,width:14,height:14,borderRadius:7,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.white,fontWeight:800}}>+</div>}
                                <div style={{fontSize:10,fontWeight:800,color:shiftTextColor(cellShift.t,service),fontFamily:F.display}}>{cellShift.t==="D"?"Day":"Night"}</div>
                                <div style={{fontSize:9,color:shiftTextColor(cellShift.t,service),fontFamily:F.body}}>{cellShift.s}–{cellShift.e}</div>
                              </div>
                            ):(
                              <div
                                style={{
                                  height:46,borderRadius:9,
                                  border:`2px dashed ${isOver?(hasConflict?C.red:C.green):C.mist}`,
                                  background:isOver?(hasConflict?C.redL:C.greenL):"transparent",
                                  display:"flex",alignItems:"center",justifyContent:"center",
                                  cursor:"pointer",
                                  transition:"all 0.15s",
                                  position:"relative",
                                }}
                                onClick={()=>setShowModal(true)}
                                onDragOver={(e)=>onDragOver(e,worker,di)}
                                onDragLeave={onDragLeave}
                                onDrop={(e)=>onDrop(e,worker,di)}
                              >
                                {isOver?(
                                  <span style={{fontSize:18,color:hasConflict?C.red:C.green}}>{hasConflict?"✗":"✓"}</span>
                                ):(
                                  <span style={{color:C.mist,fontSize:18}}>+</span>
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td style={{padding:"10px 8px",textAlign:"center"}}>
                        <span style={{fontSize:12,fontWeight:700,color:hrs>=36?C.amber:C.teal,fontFamily:F.display,background:hrs>=36?C.amberL:C.tealL,borderRadius:6,padding:"3px 8px"}}>{hrs}h</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Legend */}
        <div style={{display:"flex",gap:16,marginTop:14,flexWrap:"wrap",alignItems:"center"}}>
          {[["Day shift (08:00–20:00)",shiftBg("D",service),shiftBorder("D",service)],
            ["Night shift (20:00–08:00)",shiftBg("N",service),shiftBorder("N",service)],
          ].map(([label,bg,border],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:14,height:14,borderRadius:3,background:bg,border:`1.5px solid ${border}`}}/>
              <span style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>{label}</span>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:14,height:14,borderRadius:3,border:`1.5px dashed ${C.mist}`}}/>
            <span style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>Empty — click to add or drop a shift here</span>
          </div>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:8,height:8,borderRadius:8,background:C.green}}/>
            <span style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>Green highlight = valid drop target</span>
            <div style={{width:8,height:8,borderRadius:8,background:C.red,marginLeft:8}}/>
            <span style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>Red = conflict (slot occupied)</span>
          </div>
        </div>
      </div>

      {/* Context menu */}
      {contextMenu&&(
        <div style={{position:"fixed",top:contextMenu.y,left:contextMenu.x,background:C.white,borderRadius:12,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",border:`1px solid ${C.fog}`,zIndex:2000,minWidth:200,overflow:"hidden",animation:"fadeIn 0.15s ease"}}>
          <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.fog}`,background:C.snow}}>
            <div style={{fontSize:12,fontWeight:700,color:C.ink,fontFamily:F.display}}>{contextMenu.worker}</div>
            <div style={{fontSize:11,color:C.smoke,fontFamily:F.body}}>{days[contextMenu.day]} — {contextMenu.shift.t==="D"?"Day":"Night"} shift</div>
          </div>
          {[
            {icon:"🔄",label:"Flip to "+(contextMenu.shift.t==="D"?"Night":"Day")+" shift",action:ctxFlip,color:C.teal},
            {icon:"📋",label:"Duplicate to all remaining days",action:()=>{
              const daysLeft=days.map((_,i)=>i).filter(i=>i>contextMenu.day&&!(shifts[contextMenu.worker]||[]).find(s=>s.d===i));
              daysLeft.forEach(d=>{
                setAllShifts(prev=>{
                  const next=JSON.parse(JSON.stringify(prev));
                  if(!next[service][contextMenu.worker]) next[service][contextMenu.worker]=[];
                  if(!next[service][contextMenu.worker].find(s=>s.d===d)){
                    next[service][contextMenu.worker].push({...contextMenu.shift,d});
                  }
                  return next;
                });
              });
              closeCtx();
              setSaved(true);
              setTimeout(()=>setSaved(false),3000);
            },color:C.green},
            {icon:"📋",label:"Duplicate to same day next week",action:()=>ctxDuplicate((contextMenu.day+7)%7),color:C.blue},
          ].concat(
            days.filter((_,i)=>i!==contextMenu.day&&!(shifts[contextMenu.worker]||[]).find(s=>s.d===i)).slice(0,3).map((_,i,arr)=>({
              icon:"↪️",
              label:"Duplicate to "+days[days.indexOf(days.filter((_d,di)=>di!==contextMenu.day&&!(shifts[contextMenu.worker]||[]).find(s=>s.d===di))[i])],
              action:()=>ctxDuplicate(days.indexOf(days.filter((_d,di)=>di!==contextMenu.day&&!(shifts[contextMenu.worker]||[]).find(s=>s.d===di))[i])),
              color:C.purple,
            }))
          ).concat([
            {icon:"🗑️",label:"Delete shift",action:ctxDelete,color:C.red},
          ]).map((item,i)=>(
            <button key={i} onClick={item.action} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 14px",border:"none",background:"transparent",color:item.color,fontFamily:F.body,fontSize:13,cursor:"pointer",textAlign:"left",transition:"background 0.1s"}}>
              <span style={{fontSize:15}}>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      )}

      {/* Add Shift Modal */}
      {showModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,animation:"fadeIn 0.2s ease"}} onClick={e=>{if(e.target===e.currentTarget)setShowModal(false);}}>
          <div style={{background:C.white,borderRadius:20,padding:32,width:480,boxShadow:"0 40px 80px rgba(0,0,0,0.3)",animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:20,fontWeight:800,color:C.ink,fontFamily:F.display,marginBottom:6}}>Add New Shift</div>
            <div style={{fontSize:13,color:C.smoke,fontFamily:F.body,marginBottom:24}}>
              {isDom?"🚗 Domiciliary Care — Bedford MK55":"🏠 Maple House — Supported Living"}
            </div>
            {[
              ["Worker",<select style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",background:C.white}}>
                {workers[service].map(w=><option key={w}>{w}</option>)}
              </select>],
              ["Date",<input type="date" defaultValue="2026-06-02" style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none"}}/>],
              ["Shift Type",<select style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",background:C.white}}>
                <option>Day shift — 08:00 to 20:00</option>
                <option>Night shift — 20:00 to 08:00</option>
                <option>Custom hours</option>
              </select>],
              ["Double-Up Required",<select style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",background:C.white}}>
                <option>No — single worker</option>
                <option>Yes — 2-to-1 double up</option>
              </select>],
            ].map(([label,input],i)=>(
              <div key={i} style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:C.ink3,textTransform:"uppercase",letterSpacing:0.8,marginBottom:6,fontFamily:F.display}}>{label}</div>
                {input}
              </div>
            ))}
            <div style={{background:C.tealL,borderRadius:10,padding:"10px 14px",marginBottom:20,border:`1px solid ${C.tealM}`}}>
              <div style={{fontSize:12,color:C.tealD,fontFamily:F.body}}>⚡ Tip: After adding, you can drag shifts between workers or right-click any shift to duplicate it across multiple days.</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowModal(false)} style={{flex:1,padding:"12px 0",background:C.fog,border:"none",borderRadius:12,color:C.ink3,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:F.display}}>Cancel</button>
              <button onClick={handleSave} style={{flex:2,padding:"12px 0",background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,border:"none",borderRadius:12,color:C.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F.display,boxShadow:`0 4px 16px ${C.tealGlow}`}}>Save & Notify Worker</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SCREEN: Care Plans ───────────────────────────────────────────────────────
function CarePlanScreen(){
  const [view,setView]=useState("list");
  const [selected,setSelected]=useState(null);
  const [tab,setTab]=useState("overview");
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);

  const plans=[
    {id:1,name:"Resident A",service:"Maple House",type:"sl",status:"Active",version:"v3",updated:"Today 09:14",risk:"Low",worker:"J. Sega",needs:["Personal care","Medication support","Mobility assistance"],goals:["Increase independence with morning routine","Maintain social engagement","Monitor dietary intake"],medications:[{name:"Amlodipine 5mg",freq:"Once daily - morning",route:"Oral"},{name:"Atorvastatin 10mg",freq:"Once daily - evening",route:"Oral"}]},
    {id:2,name:"Resident B",service:"Maple House",type:"sl",status:"Review due",version:"v2",updated:"3 days ago",risk:"Medium",worker:"A. Mensah",needs:["Behaviour support","Personal care","Night monitoring"],goals:["Reduce anxiety triggers","Maintain consistent sleep routine"],medications:[{name:"Risperidone 0.5mg",freq:"Twice daily",route:"Oral"},{name:"Melatonin 3mg",freq:"Once nightly",route:"Oral"}]},
    {id:3,name:"Resident C",service:"Maple House",type:"sl",status:"Active",version:"v1",updated:"1 week ago",risk:"Low",worker:"J. Sega",needs:["Personal care","Community access","Life skills"],goals:["Independent travel training","Cooking skills development"],medications:[]},
    {id:4,name:"Service User D",service:"Dom — Bedford MK55",type:"dom",status:"Active",version:"v4",updated:"Yesterday",risk:"High",worker:"T. Boateng",needs:["Complex personal care","Manual handling","Medication management","Night care"],goals:["Maintain dignity and comfort","Prevent hospital admission"],medications:[{name:"Morphine 10mg",freq:"4-hourly as needed",route:"Oral"},{name:"Lactulose 10ml",freq:"Twice daily",route:"Oral"},{name:"Furosemide 40mg",freq:"Once daily - morning",route:"Oral"}]},
    {id:5,name:"Service User E",service:"Dom — Bedford MK55",type:"dom",status:"Active",version:"v2",updated:"2 days ago",risk:"Low",worker:"A. Mensah",needs:["Personal care","Meal preparation","Medication prompting"],goals:["Maintain independent living","Improve nutrition"],medications:[{name:"Metformin 500mg",freq:"Twice daily with meals",route:"Oral"}]},
  ];

  function handleSave(){
    setSaving(true);
    setTimeout(()=>{setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),3000);},1200);
  }

  const riskColor=r=>r==="High"?C.red:r==="Medium"?C.amber:C.green;
  const riskBg=r=>r==="High"?C.redL:r==="Medium"?C.amberL:C.greenL;

  if(selected&&view==="detail"){
    const p=plans.find(x=>x.id===selected);
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <TopBar title={p.name+" — Care Plan "+p.version} subtitle={p.service+" · Last updated: "+p.updated}
          actions={<>
            <Btn label="← Back to list" outline sm onClick={()=>{setView("list");setSelected(null);}}/>
            <Tag label={p.status} color={p.status==="Active"?C.green:C.amber} bg={p.status==="Active"?C.greenL:C.amberL}/>
            <Tag label={"Risk: "+p.risk} color={riskColor(p.risk)} bg={riskBg(p.risk)}/>
            <Btn label={saving?"Saving…":saved?"✓ Saved":"Save & Version"} icon={saved?"":""} color={saved?C.green:C.teal} onClick={handleSave} sm/>
          </>}
        />
        <div style={{flex:1,overflow:"auto",padding:24}}>
          {/* Tab nav */}
          <div style={{display:"flex",gap:4,marginBottom:20,background:C.snow,borderRadius:12,padding:4,width:"fit-content"}}>
            {["overview","needs","goals","medications","notes"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 16px",borderRadius:9,border:"none",background:tab===t?C.white:"transparent",color:tab===t?C.ink:C.smoke,fontWeight:tab===t?700:400,fontSize:13,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s",boxShadow:tab===t?"0 2px 8px rgba(0,0,0,0.06)":"none",textTransform:"capitalize"}}>
                {t}
              </button>
            ))}
          </div>

          {tab==="overview"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:16}}>Service User Details</div>
                {[["Full Name",p.name],["Service",p.service],["Care Type",p.type==="dom"?"Domiciliary":"Supported Living"],["Key Worker",p.worker],["Plan Version",p.version],["Risk Level",p.risk],["Status",p.status]].map(([k,v],i)=>(
                  <div key={i} style={{display:"flex",gap:16,padding:"8px 0",borderTop:i>0?`1px solid ${C.fog}`:"none"}}>
                    <div style={{fontSize:12,color:C.smoke,fontFamily:F.body,width:120,flexShrink:0}}>{k}</div>
                    <div style={{fontSize:13,color:C.ink,fontFamily:F.body,fontWeight:500}}>{v}</div>
                  </div>
                ))}
              </Card>
              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:16}}>Care Plan Summary</div>
                <div style={{background:C.snow,borderRadius:12,padding:16,marginBottom:16}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.smoke,textTransform:"uppercase",letterSpacing:0.8,fontFamily:F.display,marginBottom:8}}>Current Status</div>
                  <div style={{display:"flex",gap:10}}>
                    <div style={{flex:1,background:C.greenL,borderRadius:9,padding:"10px",textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:C.green,fontFamily:F.display}}>{p.needs.length}</div>
                      <div style={{fontSize:10,color:C.smoke,fontFamily:F.body}}>Care needs</div>
                    </div>
                    <div style={{flex:1,background:C.tealL,borderRadius:9,padding:"10px",textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:C.teal,fontFamily:F.display}}>{p.goals.length}</div>
                      <div style={{fontSize:10,color:C.smoke,fontFamily:F.body}}>Active goals</div>
                    </div>
                    <div style={{flex:1,background:C.amberL,borderRadius:9,padding:"10px",textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:C.amber,fontFamily:F.display}}>{p.medications.length}</div>
                      <div style={{fontSize:10,color:C.smoke,fontFamily:F.body}}>Medications</div>
                    </div>
                  </div>
                </div>
                <div style={{background:p.risk==="High"?C.redL:C.tealL,borderRadius:10,padding:"10px 14px",border:`1px solid ${riskColor(p.risk)}30`}}>
                  <div style={{fontSize:12,fontWeight:700,color:riskColor(p.risk),fontFamily:F.display}}>Risk Level: {p.risk}</div>
                  <div style={{fontSize:12,color:C.ink2,fontFamily:F.body,marginTop:4}}>{p.risk==="High"?"Requires enhanced monitoring and daily manager review.":p.risk==="Medium"?"Review care plan within 7 days.":"Plan is current and risk is well managed."}</div>
                </div>
              </Card>
            </div>
          )}

          {tab==="needs"&&(
            <Card style={{padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div style={{fontSize:16,fontWeight:800,color:C.ink,fontFamily:F.display}}>Identified Care Needs</div>
                <Btn label="+ Add Need" sm outline/>
              </div>
              {p.needs.map((need,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:12,background:C.snow,marginBottom:10,border:`1px solid ${C.fog}`}}>
                  <div style={{width:32,height:32,borderRadius:9,background:C.tealL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>✓</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:600,color:C.ink,fontFamily:F.display}}>{need}</div>
                    <div style={{fontSize:12,color:C.smoke,fontFamily:F.body,marginTop:2}}>Active need · Reviewed {["today","3 days ago","1 week ago"][i%3]}</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button style={{background:"none",border:`1px solid ${C.mist}`,borderRadius:7,padding:"5px 10px",fontSize:12,color:C.ink3,cursor:"pointer",fontFamily:F.display}}>Edit</button>
                  </div>
                </div>
              ))}
            </Card>
          )}

          {tab==="goals"&&(
            <Card style={{padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div style={{fontSize:16,fontWeight:800,color:C.ink,fontFamily:F.display}}>Care Goals</div>
                <Btn label="+ Add Goal" sm outline/>
              </div>
              {p.goals.map((goal,i)=>(
                <div key={i} style={{padding:"16px 18px",borderRadius:12,background:C.snow,marginBottom:10,border:`1px solid ${C.fog}`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{fontSize:14,fontWeight:600,color:C.ink,fontFamily:F.display}}>{goal}</div>
                    <Tag label={["On track","In progress"][i%2]} color={i%2===0?C.green:C.amber} bg={i%2===0?C.greenL:C.amberL} size="sm"/>
                  </div>
                  <div style={{height:6,background:C.fog,borderRadius:6,overflow:"hidden"}}>
                    <div style={{height:"100%",width:[65,40][i%2]+"%",background:`linear-gradient(90deg,${C.teal},#0D9AA6)`,borderRadius:6,transition:"width 0.5s ease"}}/>
                  </div>
                  <div style={{fontSize:11,color:C.smoke,fontFamily:F.body,marginTop:6}}>{[65,40][i%2]}% progress · Target: {["30 Jun 2026","15 Aug 2026"][i%2]}</div>
                </div>
              ))}
            </Card>
          )}

          {tab==="medications"&&(
            <Card style={{padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div style={{fontSize:16,fontWeight:800,color:C.ink,fontFamily:F.display}}>Medication Record</div>
                <div style={{display:"flex",gap:8}}><Btn label="Print MAR" outline sm/><Btn label="+ Add Medication" sm/></div>
              </div>
              {p.medications.length===0?(
                <div style={{textAlign:"center",padding:"40px 0",color:C.smoke,fontFamily:F.body}}>No medications recorded for this service user.</div>
              ):p.medications.map((med,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 120px 80px",gap:16,alignItems:"center",padding:"14px 18px",borderRadius:12,background:i%2===0?C.snow:C.white,marginBottom:8,border:`1px solid ${C.fog}`}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display}}>{med.name}</div>
                    <div style={{fontSize:11,color:C.smoke,fontFamily:F.body,marginTop:2}}>Route: {med.route}</div>
                  </div>
                  <div style={{fontSize:13,color:C.ink2,fontFamily:F.body}}>{med.freq}</div>
                  <Tag label="Active" color={C.green} bg={C.greenL} size="sm"/>
                  <button style={{background:"none",border:`1px solid ${C.mist}`,borderRadius:7,padding:"5px 10px",fontSize:12,color:C.ink3,cursor:"pointer",fontFamily:F.display}}>Edit</button>
                </div>
              ))}
            </Card>
          )}

          {tab==="notes"&&(
            <Card style={{padding:24}}>
              <div style={{fontSize:16,fontWeight:800,color:C.ink,fontFamily:F.display,marginBottom:20}}>Manager Notes</div>
              <textarea defaultValue={`Care plan notes for ${p.name}.\n\nReview scheduled for ${p.risk==="Review due"?"this week":"next month"}.\n\nKey observations from recent visits recorded in visit notes system.`} style={{width:"100%",minHeight:200,padding:"14px 16px",borderRadius:12,border:`1.5px solid ${C.mist}`,fontSize:14,fontFamily:F.body,color:C.ink,resize:"vertical",outline:"none",lineHeight:1.6,boxSizing:"border-box"}}/>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:12}}>
                <Btn label="Save Notes" onClick={handleSave} color={saved?C.green:C.teal} sm/>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar title="Care Plans" subtitle={`${plans.length} service users across 2 services`}
        actions={<>
          <Btn label="+ New Care Plan" icon="📋" sm/>
          <Btn label="Export All" outline sm/>
        </>}
      />
      <div style={{flex:1,overflow:"auto",padding:24}}>
        {/* Filter bar */}
        <div style={{display:"flex",gap:10,marginBottom:20,alignItems:"center"}}>
          <input placeholder="Search service users…" style={{padding:"9px 14px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",width:240,background:C.white}}/>
          {[["All",""],["Domiciliary","dom"],["Supported Living","sl"],["Review Due","review"]].map(([label,val])=>(
            <button key={label} style={{padding:"8px 14px",borderRadius:9,border:`1.5px solid ${C.mist}`,background:C.white,color:C.ink3,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:F.display}}>{label}</button>
          ))}
        </div>

        {/* Care plan cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {plans.map(p=>(
            <div key={p.id} onClick={()=>{setSelected(p.id);setView("detail");setTab("overview");}} style={{background:C.white,borderRadius:14,border:`1.5px solid ${C.fog}`,padding:20,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:40,height:40,borderRadius:12,background:p.type==="dom"?C.blueL:C.purpleL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{p.type==="dom"?"🚗":"🏠"}</div>
                  <div>
                    <div style={{fontSize:15,fontWeight:800,color:C.ink,fontFamily:F.display}}>{p.name}</div>
                    <div style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>{p.service}</div>
                  </div>
                </div>
                <Tag label={p.status} color={p.status==="Active"?C.green:C.amber} bg={p.status==="Active"?C.greenL:C.amberL} size="sm"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                {[["Version",p.version],["Risk",p.risk],["Updated",p.updated],["Worker",p.worker]].map(([k,v],i)=>(
                  <div key={i} style={{background:C.snow,borderRadius:8,padding:"8px 10px"}}>
                    <div style={{fontSize:10,color:C.smoke,fontFamily:F.body}}>{k}</div>
                    <div style={{fontSize:12,fontWeight:700,color:k==="Risk"?riskColor(v):C.ink,fontFamily:F.display,marginTop:1}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:6}}>
                <Tag label={`${p.needs.length} needs`} color={C.tealD} bg={C.tealL} size="sm"/>
                <Tag label={`${p.medications.length} meds`} color={p.medications.length>0?C.amber:C.smoke} bg={p.medications.length>0?C.amberL:C.fog} size="sm"/>
                <Tag label={`${p.goals.length} goals`} color={C.blue} bg={C.blueL} size="sm"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── SCREEN: Incidents ────────────────────────────────────────────────────────
function IncidentsScreen(){
  const [view,setView]=useState("list");
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("all");
  const [resolving,setResolving]=useState(false);
  const [resolved,setResolved]=useState(false);

  const incidents=[
    {id:"INC-047",date:"5 Jun 2026",time:"21:34",worker:"A. Mensah",user:"Resident B",service:"Maple House",type:"sl",severity:4,category:"Behaviour",status:"Open",description:"Resident B became highly agitated during the evening routine. Raised voice, attempted to push worker. No physical injury. Behaviour lasted approximately 15 minutes before de-escalation was successful using agreed support strategy.",actions:"De-escalation strategy applied. Resident settled at 21:50. Behaviour support plan reviewed. On-call manager notified at 21:40.",followUp:true,managerNote:""},
    {id:"INC-046",date:"4 Jun 2026",time:"14:12",worker:"T. Boateng",user:"Service User D",service:"Dom — Bedford MK55",type:"dom",severity:3,category:"Medical",status:"Open",description:"Service user reported increased pain during personal care. Declined medication at scheduled time. Appeared confused and disoriented for approximately 20 minutes during visit.",actions:"GP notified at 14:30. Family contact informed. Visit note raised as Red. Next visit brought forward to 18:00.",followUp:true,managerNote:""},
    {id:"INC-045",date:"3 Jun 2026",time:"09:22",worker:"J. Sega",user:"Resident A",service:"Maple House",type:"sl",severity:2,category:"Health & Wellbeing",status:"Resolved",description:"Resident A reported feeling unwell — headache and nausea. Temperature checked: 37.8°C. Did not attend planned activity session.",actions:"GP practice contacted for advice. Increased fluid intake encouraged. Monitored throughout shift. Temperature normalised by 14:00.",followUp:false,managerNote:"Resolved. No further action required. Care plan reviewed."},
    {id:"INC-044",date:"2 Jun 2026",time:"22:15",worker:"P. Asante",user:"Resident C",service:"Maple House",type:"sl",severity:1,category:"Property",status:"Resolved",description:"Resident C's mobile phone screen cracked during the evening. Resident was upset but calm. No injury.",actions:"Incident recorded. Family notified. Phone assessed — still functional.",followUp:false,managerNote:"Resolved. Family collecting phone for repair."},
    {id:"INC-043",date:"1 Jun 2026",time:"11:45",worker:"A. Mensah",user:"Service User E",service:"Dom — Bedford MK55",type:"dom",severity:2,category:"Medication",status:"Resolved",description:"Service user had taken their morning medication before worker arrived, having forgotten they had not yet been given it. Potential double dose risk identified.",actions:"GP contacted immediately. Advised to monitor for side effects. No adverse effects observed during remainder of visit.",followUp:false,managerNote:"Resolved. Medication storage reviewed with family. Additional safeguards agreed."},
  ];

  const sevColor=s=>s>=4?C.red:s>=3?C.amber:s>=2?"#D4860A":C.green;
  const sevBg=s=>s>=4?C.redL:s>=3?C.amberL:s>=2?C.goldL:C.greenL;
  const sevLabel=s=>s===5?"Critical":s===4?"High":s===3?"Moderate":s===2?"Low":"Minor";

  const filtered=filter==="all"?incidents:filter==="open"?incidents.filter(i=>i.status==="Open"):incidents.filter(i=>i.status==="Resolved");

  if(view==="detail"&&selected){
    const inc=incidents.find(i=>i.id===selected);
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <TopBar title={inc.id+" — "+inc.category} subtitle={inc.service+"  ·  "+inc.date+"  "+inc.time}
          actions={<>
            <Btn label="← All Incidents" outline sm onClick={()=>{setView("list");setSelected(null);setResolved(false);}}/>
            <Tag label={"Severity "+inc.severity+": "+sevLabel(inc.severity)} color={sevColor(inc.severity)} bg={sevBg(inc.severity)}/>
            <Tag label={inc.status} color={inc.status==="Open"?C.red:C.green} bg={inc.status==="Open"?C.redL:C.greenL}/>
            {inc.status==="Open"&&<Btn label={resolving?"Saving…":resolved?"✓ Resolved":"Mark Resolved"} color={resolved?C.green:C.teal} sm onClick={()=>{setResolving(true);setTimeout(()=>{setResolving(false);setResolved(true);},1000);}}/>}
          </>}
        />
        <div style={{flex:1,overflow:"auto",padding:24}}>
          {resolved&&<div style={{background:C.greenL,border:`1px solid ${C.green}30`,borderRadius:12,padding:"12px 18px",marginBottom:16,display:"flex",gap:10,alignItems:"center",animation:"fadeUp 0.3s ease"}}>
            <span>✅</span><span style={{fontSize:13,fontWeight:700,color:C.green,fontFamily:F.display}}>Incident marked as resolved. All parties notified. Audit record created.</span>
          </div>}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            {/* Left: Incident details */}
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:14}}>Incident Details</div>
                {[
                  ["Incident ID",inc.id],["Date & Time",inc.date+" at "+inc.time],
                  ["Category",inc.category],["Severity",inc.severity+" — "+sevLabel(inc.severity)],
                  ["Service User",inc.user],["Service",inc.service],
                  ["Reporting Worker",inc.worker],["Status",inc.status],
                ].map(([k,v],i)=>(
                  <div key={i} style={{display:"flex",gap:16,padding:"8px 0",borderTop:i>0?`1px solid ${C.fog}`:"none"}}>
                    <div style={{fontSize:12,color:C.smoke,fontFamily:F.body,width:140,flexShrink:0}}>{k}</div>
                    <div style={{fontSize:13,color:C.ink,fontFamily:F.body,fontWeight:500}}>{v}</div>
                  </div>
                ))}
              </Card>

              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:12}}>Description</div>
                <div style={{fontSize:13,color:C.ink2,fontFamily:F.body,lineHeight:1.7,background:C.snow,borderRadius:10,padding:14}}>{inc.description}</div>
              </Card>
            </div>

            {/* Right: Actions + Manager notes */}
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:12}}>Actions Taken</div>
                <div style={{fontSize:13,color:C.ink2,fontFamily:F.body,lineHeight:1.7,background:C.greenL,borderRadius:10,padding:14,border:`1px solid ${C.green}20`}}>{inc.actions}</div>
                {inc.followUp&&<div style={{marginTop:12,background:C.amberL,borderRadius:10,padding:"10px 14px",border:`1px solid ${C.amber}30`}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.amber,fontFamily:F.display}}>⚠️ Follow-up required</div>
                  <div style={{fontSize:12,color:C.ink2,fontFamily:F.body,marginTop:2}}>This incident requires a follow-up review. Check care plan and risk assessment.</div>
                </div>}
              </Card>

              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:12}}>Manager Resolution Notes</div>
                <textarea defaultValue={inc.managerNote} placeholder="Add your resolution notes here. These will be locked once the incident is resolved and form part of the permanent audit record." style={{width:"100%",minHeight:120,padding:"12px 14px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,resize:"vertical",color:C.ink,outline:"none",lineHeight:1.6,boxSizing:"border-box"}}/>
                <div style={{marginTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:11,color:C.smoke,fontFamily:F.body}}>Notes are permanently locked on resolution</div>
                  <Btn label="Save Notes" sm/>
                </div>
              </Card>

              <Card style={{padding:20}}>
                <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,marginBottom:12}}>Notifications Sent</div>
                {[
                  ["Service Manager","Notified at "+inc.time,"✅"],
                  ["On-Call Manager",inc.severity>=3?"Notified (Sev "+inc.severity+")":"Not required",inc.severity>=3?"✅":"—"],
                  ["GP / Clinician",inc.category==="Medical"?"Notified same day":"Not required",inc.category==="Medical"?"✅":"—"],
                  ["Family / Next of Kin",inc.severity>=3?"Notified":"Not required",inc.severity>=3?"✅":"—"],
                ].map(([who,status,icon],i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderTop:i>0?`1px solid ${C.fog}`:"none"}}>
                    <span style={{fontSize:16,width:20,textAlign:"center"}}>{icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:F.display}}>{who}</div>
                      <div style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>{status}</div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar title="Incidents" subtitle="All services — June 2026"
        actions={<>
          <Btn label="+ Raise Incident" icon="🚨" color={C.red} sm/>
          <Btn label="Export" outline sm/>
        </>}
      />
      <div style={{flex:1,overflow:"auto",padding:24}}>
        {/* Stats */}
        <div style={{display:"flex",gap:14,marginBottom:20,animation:"fadeUp 0.4s ease"}}>
          {[[incidents.filter(i=>i.status==="Open").length,"Open Incidents","🚨",C.red,C.redL],
            [incidents.filter(i=>i.severity>=4).length,"High / Critical","⚠️",C.amber,C.amberL],
            [incidents.filter(i=>i.followUp).length,"Follow-up Required","📋",C.purple,C.purpleL],
            [incidents.filter(i=>i.status==="Resolved").length,"Resolved This Month","✅",C.green,C.greenL],
          ].map(([v,l,ic,col,bg],i)=>(
            <StatCard key={i} value={v} label={l} icon={ic} color={col} bg={bg}/>
          ))}
        </div>

        {/* Filter */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[["all","All Incidents"],["open","Open"],["resolved","Resolved"]].map(([id,label])=>(
            <button key={id} onClick={()=>setFilter(id)} style={{padding:"7px 16px",borderRadius:9,border:`1.5px solid ${filter===id?C.teal:C.mist}`,background:filter===id?C.tealL:C.white,color:filter===id?C.tealD:C.smoke,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s"}}>
              {label}
            </button>
          ))}
          <input placeholder="Search incidents…" style={{marginLeft:"auto",padding:"7px 14px",borderRadius:9,border:`1.5px solid ${C.mist}`,fontSize:12,fontFamily:F.body,color:C.ink,outline:"none",width:220}}/>
        </div>

        {/* Incident list */}
        <Card>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:C.snow}}>
                {["ID","Date/Time","Severity","Category","Service User","Service","Worker","Status",""].map((h,i)=>(
                  <th key={i} style={{padding:"11px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:C.ink3,textTransform:"uppercase",letterSpacing:0.8,fontFamily:F.display,borderBottom:`1px solid ${C.fog}`,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc,i)=>(
                <tr key={inc.id} style={{borderBottom:`1px solid ${C.fog}`,background:i%2===0?C.white:C.snow,cursor:"pointer",transition:"background 0.15s"}}
                  onClick={()=>{setSelected(inc.id);setView("detail");setResolved(false);}}>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.teal,fontFamily:F.display}}>{inc.id}</div>
                  </td>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{fontSize:12,color:C.ink,fontFamily:F.body}}>{inc.date}</div>
                    <div style={{fontSize:11,color:C.smoke,fontFamily:F.body}}>{inc.time}</div>
                  </td>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:10,height:10,borderRadius:10,background:sevColor(inc.severity),flexShrink:0}}/>
                      <Tag label={"Sev "+inc.severity+": "+sevLabel(inc.severity)} color={sevColor(inc.severity)} bg={sevBg(inc.severity)} size="sm"/>
                    </div>
                  </td>
                  <td style={{padding:"12px 14px"}}><div style={{fontSize:13,color:C.ink,fontFamily:F.body}}>{inc.category}</div></td>
                  <td style={{padding:"12px 14px"}}><div style={{fontSize:13,fontWeight:600,color:C.ink,fontFamily:F.display}}>{inc.user}</div></td>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:14}}>{inc.type==="dom"?"🚗":"🏠"}</span>
                      <div style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>{inc.service}</div>
                    </div>
                  </td>
                  <td style={{padding:"12px 14px"}}><div style={{fontSize:12,color:C.ink,fontFamily:F.body}}>{inc.worker}</div></td>
                  <td style={{padding:"12px 14px"}}>
                    <Tag label={inc.status} color={inc.status==="Open"?C.red:C.green} bg={inc.status==="Open"?C.redL:C.greenL} size="sm"/>
                  </td>
                  <td style={{padding:"12px 14px"}}>
                    <button style={{background:"none",border:`1px solid ${C.mist}`,borderRadius:7,padding:"5px 12px",fontSize:12,color:C.teal,cursor:"pointer",fontFamily:F.display,fontWeight:600}}>View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

// ── SCREEN: Reports & Audit Log ──────────────────────────────────────────────
function ReportsScreen(){
  const [tab,setTab]=useState("reports");
  const [genReport,setGenReport]=useState(false);
  const [generated,setGenerated]=useState(false);

  const auditLog=[
    {id:"AUD-2341",time:"Today 21:34",user:"A. Mensah",role:"Support Worker",action:"Incident raised",detail:"INC-047 raised for Resident B — Severity 4",ip:"192.168.1.42",device:"iPhone 14"},
    {id:"AUD-2340",time:"Today 20:01",user:"J. Sega",role:"Service Manager",action:"Rota published",detail:"Week commencing 9 Jun 2026 — Maple House",ip:"192.168.1.10",device:"MacBook Pro"},
    {id:"AUD-2339",time:"Today 19:55",user:"T. Boateng",role:"Support Worker",action:"Visit note submitted",detail:"Green status — Service User D, Dom Bedford",ip:"192.168.1.77",device:"Samsung Galaxy S23"},
    {id:"AUD-2338",time:"Today 18:42",user:"J. Sega",role:"Service Manager",action:"Care plan updated",detail:"Resident B — v3 created from v2. Risk level changed: Low → Medium",ip:"192.168.1.10",device:"MacBook Pro"},
    {id:"AUD-2337",time:"Today 17:30",user:"R. Osei",role:"Support Worker",action:"Access denied (rota-lock)",detail:"Attempted login outside shift hours. Next shift: 6 Jun 08:00",ip:"10.0.0.88",device:"iPhone 13"},
    {id:"AUD-2336",time:"Today 16:15",user:"A. Mensah",role:"Support Worker",action:"Session terminated",detail:"Shift ended — session auto-terminated by rota-lock engine at 16:15",ip:"192.168.1.42",device:"iPhone 14"},
    {id:"AUD-2335",time:"Today 14:12",user:"T. Boateng",role:"Support Worker",action:"Incident raised",detail:"INC-046 raised for Service User D — Severity 3",ip:"192.168.1.77",device:"Samsung Galaxy S23"},
    {id:"AUD-2334",time:"Today 13:44",user:"J. Sega",role:"Service Manager",action:"Emergency override granted",detail:"Override issued to K. Darko — Reason: Care emergency. Expires 17:44",ip:"192.168.1.10",device:"MacBook Pro"},
    {id:"AUD-2333",time:"Today 08:01",user:"P. Asante",role:"Support Worker",action:"Login (MFA)",detail:"Successful authentication. Session opened. Shift active.",ip:"192.168.1.55",device:"Google Pixel 7"},
    {id:"AUD-2332",time:"Yesterday 22:50",user:"A. Mensah",role:"Support Worker",action:"House handover submitted",detail:"Maple House — Evening shift handover. All 4 residents documented.",ip:"192.168.1.42",device:"iPhone 14"},
    {id:"AUD-2331",time:"Yesterday 20:33",user:"J. Sega",role:"Service Manager",action:"Access audit log exported",detail:"CSV export — date range: 1–4 Jun 2026. 47 records.",ip:"192.168.1.10",device:"MacBook Pro"},
    {id:"AUD-2330",time:"Yesterday 14:20",user:"System",role:"Automated",action:"Scheduled report sent",detail:"Monthly commissioner report emailed to commissioner@bedfordcc.gov.uk",ip:"Internal",device:"System"},
  ];

  const actionColor=a=>{
    if(a.includes("denied")||a.includes("terminated"))return{c:C.red,bg:C.redL};
    if(a.includes("Incident"))return{c:C.amber,bg:C.amberL};
    if(a.includes("override"))return{c:C.purple,bg:C.purpleL};
    if(a.includes("Login")||a.includes("published")||a.includes("submitted"))return{c:C.green,bg:C.greenL};
    return{c:C.teal,bg:C.tealL};
  };

  const reports=[
    {name:"Monthly Service Performance",desc:"Visit completion rates, on-time %, incident rates, care plan compliance across all services.",freq:"Monthly",last:"1 Jun 2026",icon:"📊",type:"KPI"},
    {name:"Access & Rota-Lock Report",desc:"All login attempts, denied access events, emergency overrides, and session terminations.",freq:"Weekly",last:"2 Jun 2026",icon:"🔒",type:"Compliance"},
    {name:"Incident Summary Report",desc:"All incidents by severity, category, service, and outcome. Trend analysis over 90 days.",freq:"Monthly",last:"1 Jun 2026",icon:"🚨",type:"Safety"},
    {name:"Worker Hours & Rota Analysis",desc:"Hours worked vs contracted, over/under-hours, unfilled shifts, and double-up coverage.",freq:"Weekly",last:"31 May 2026",icon:"👥",type:"Workforce"},
    {name:"Care Plan Review Due Report",desc:"Service users whose care plans are due for review within the next 14 days.",freq:"Weekly",last:"2 Jun 2026",icon:"📋",type:"Clinical"},
    {name:"Commissioner KPI Dashboard",desc:"Anonymised aggregated KPIs for commissioning authority. No PII included.",freq:"Monthly",last:"1 Jun 2026",icon:"🏛️",type:"Commissioner"},
  ];

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar title="Reports & Audit Log" subtitle="All services — Affable Insights"
        actions={<>
          <Btn label="Export Audit Log" outline sm icon="⬇️"/>
          <Btn label="Generate Report" icon="📊" sm onClick={()=>setGenReport(true)}/>
        </>}
      />

      {/* Tabs */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.fog}`,padding:"0 24px",display:"flex",gap:4}}>
        {[["reports","📊 Reports"],["audit","🔍 Audit Log"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{padding:"14px 18px",border:"none",borderBottom:`3px solid ${tab===id?C.teal:"transparent"}`,background:"transparent",color:tab===id?C.teal:C.smoke,fontWeight:tab===id?700:400,fontSize:14,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{flex:1,overflow:"auto",padding:24}}>

        {tab==="reports"&&(
          <>
            <div style={{display:"flex",gap:14,marginBottom:20,animation:"fadeUp 0.4s ease"}}>
              {[["6","Scheduled Reports","📊",C.teal,C.tealL],["2","Generated Today","✅",C.green,C.greenL],["1","Pending Review","⏳",C.amber,C.amberL],["Monthly","Report Cycle","🗓️",C.purple,C.purpleL]].map(([v,l,ic,col,bg],i)=>(
                <StatCard key={i} value={v} label={l} icon={ic} color={col} bg={bg}/>
              ))}
            </div>

            {generated&&<div style={{background:C.greenL,border:`1px solid ${C.green}30`,borderRadius:12,padding:"12px 18px",marginBottom:16,display:"flex",gap:10,alignItems:"center",animation:"fadeUp 0.3s ease"}}>
              <span>✅</span><span style={{fontSize:13,fontWeight:700,color:C.green,fontFamily:F.display}}>Report generated successfully. PDF ready to download. Audit record created.</span>
            </div>}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
              {reports.map((r,i)=>(
                <Card key={i} style={{padding:20}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
                    <div style={{width:44,height:44,borderRadius:12,background:C.tealL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{r.icon}</div>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:C.ink,fontFamily:F.display,lineHeight:1.3}}>{r.name}</div>
                      <Tag label={r.type} color={C.tealD} bg={C.tealL} size="sm"/>
                    </div>
                  </div>
                  <div style={{fontSize:12,color:C.smoke,fontFamily:F.body,lineHeight:1.5,marginBottom:14}}>{r.desc}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div>
                      <div style={{fontSize:10,color:C.smoke,fontFamily:F.body}}>Frequency</div>
                      <div style={{fontSize:12,fontWeight:700,color:C.ink,fontFamily:F.display}}>{r.freq}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:10,color:C.smoke,fontFamily:F.body}}>Last generated</div>
                      <div style={{fontSize:12,fontWeight:700,color:C.ink,fontFamily:F.display}}>{r.last}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>{setGenerated(true);setTimeout(()=>setGenerated(false),5000);}} style={{flex:2,padding:"8px 0",background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,border:"none",borderRadius:9,color:C.white,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F.display}}>Generate Now</button>
                    <button style={{flex:1,padding:"8px 0",background:C.fog,border:"none",borderRadius:9,color:C.ink3,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:F.display}}>Schedule</button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {tab==="audit"&&(
          <>
            {/* Audit stats */}
            <div style={{display:"flex",gap:14,marginBottom:20,animation:"fadeUp 0.4s ease"}}>
              {[[auditLog.length+"","Events today","🔍",C.teal,C.tealL],
                [auditLog.filter(l=>l.action.includes("denied")).length,"Access denials","🔒",C.red,C.redL],
                [auditLog.filter(l=>l.action.includes("override")).length,"Overrides granted","⚡",C.purple,C.purpleL],
                [auditLog.filter(l=>l.action.includes("Login")).length,"Successful logins","✅",C.green,C.greenL],
              ].map(([v,l,ic,col,bg],i)=>(
                <StatCard key={i} value={v} label={l} icon={ic} color={col} bg={bg}/>
              ))}
            </div>

            {/* Filters */}
            <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"center"}}>
              <div style={{fontSize:12,fontWeight:700,color:C.smoke,fontFamily:F.display}}>Filter:</div>
              {["All events","Access events","Rota-lock events","Data changes","Incidents"].map((f,i)=>(
                <button key={i} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${i===0?C.teal:C.mist}`,background:i===0?C.tealL:C.white,color:i===0?C.tealD:C.smoke,fontSize:12,fontWeight:i===0?700:400,cursor:"pointer",fontFamily:F.display}}>
                  {f}
                </button>
              ))}
              <input placeholder="Search events…" style={{marginLeft:"auto",padding:"7px 14px",borderRadius:9,border:`1.5px solid ${C.mist}`,fontSize:12,fontFamily:F.body,color:C.ink,outline:"none",width:220}}/>
            </div>

            {/* Audit table */}
            <Card style={{overflow:"hidden"}}>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
                  <thead>
                    <tr style={{background:C.navy}}>
                      {["Event ID","Time","User","Role","Action","Detail","Device","IP"].map((h,i)=>(
                        <th key={i} style={{padding:"11px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:0.8,fontFamily:F.display,whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditLog.map((log,i)=>{
                      const ac=actionColor(log.action);
                      return(
                        <tr key={log.id} style={{borderBottom:`1px solid ${C.fog}`,background:i%2===0?C.white:C.snow}}>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:12,fontWeight:700,color:C.tealD,fontFamily:F.display}}>{log.id}</div></td>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:12,color:C.ink,fontFamily:F.body,whiteSpace:"nowrap"}}>{log.time}</div></td>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:12,fontWeight:600,color:C.ink,fontFamily:F.display}}>{log.user}</div></td>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:11,color:C.smoke,fontFamily:F.body}}>{log.role}</div></td>
                          <td style={{padding:"10px 14px"}}>
                            <Tag label={log.action} color={ac.c} bg={ac.bg} size="sm"/>
                          </td>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:12,color:C.ink2,fontFamily:F.body,maxWidth:280}}>{log.detail}</div></td>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:11,color:C.smoke,fontFamily:F.body,whiteSpace:"nowrap"}}>{log.device}</div></td>
                          <td style={{padding:"10px 14px"}}><div style={{fontSize:11,color:C.smoke,fontFamily:F.mono}}>{log.ip}</div></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{padding:"12px 18px",borderTop:`1px solid ${C.fog}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.snow}}>
                <div style={{fontSize:12,color:C.smoke,fontFamily:F.body}}>Showing {auditLog.length} events  ·  Audit logs retained for 7 years  ·  Append-only (no modifications permitted)</div>
                <Btn label="Export CSV" outline sm icon="⬇️"/>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Generate report modal */}
      {genReport&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,animation:"fadeIn 0.2s ease"}}>
          <div style={{background:C.white,borderRadius:20,padding:32,width:480,boxShadow:"0 40px 80px rgba(0,0,0,0.3)",animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:20,fontWeight:800,color:C.ink,fontFamily:F.display,marginBottom:6}}>Generate Report</div>
            <div style={{fontSize:13,color:C.smoke,fontFamily:F.body,marginBottom:24}}>Select the report type, date range, and output format.</div>
            {[
              ["Report Type",<select style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",background:C.white}}>
                {reports.map(r=><option key={r.name}>{r.name}</option>)}
              </select>],
              ["Service",<select style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",background:C.white}}>
                <option>All Services</option>
                <option>Domiciliary Care — Bedford MK55</option>
                <option>Maple House — Supported Living</option>
              </select>],
              ["Date Range",<div style={{display:"flex",gap:8}}><input type="date" defaultValue="2026-06-01" style={{flex:1,padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none"}}/><input type="date" defaultValue="2026-06-05" style={{flex:1,padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none"}}/></div>],
              ["Format",<select style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.mist}`,fontSize:13,fontFamily:F.body,color:C.ink,outline:"none",background:C.white}}>
                <option>PDF — formatted report</option>
                <option>CSV — raw data export</option>
                <option>Email to commissioner</option>
              </select>],
            ].map(([label,input],i)=>(
              <div key={i} style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:C.ink3,textTransform:"uppercase",letterSpacing:0.8,marginBottom:6,fontFamily:F.display}}>{label}</div>
                {input}
              </div>
            ))}
            <div style={{background:C.tealL,borderRadius:10,padding:"10px 14px",marginBottom:20,border:`1px solid ${C.tealM}`}}>
              <div style={{fontSize:12,color:C.tealD,fontFamily:F.body}}>📋 All reports are stored in the document library and logged in the audit trail. Commissioner reports contain anonymised data only — no PII included.</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setGenReport(false)} style={{flex:1,padding:"12px 0",background:C.fog,border:"none",borderRadius:12,color:C.ink3,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:F.display}}>Cancel</button>
              <button onClick={()=>{setGenReport(false);setGenerated(true);setTab("reports");setTimeout(()=>setGenerated(false),5000);}} style={{flex:2,padding:"12px 0",background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,border:"none",borderRadius:12,color:C.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F.display,boxShadow:`0 4px 16px ${C.tealGlow}`}}>Generate & Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SCREEN: Placeholder ──────────────────────────────────────────────────────
function PlaceholderScreen({name,icon}){
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <TopBar title={name}/>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,color:C.smoke}}>
        <div style={{fontSize:56,opacity:0.3}}>{icon}</div>
        <div style={{fontSize:18,fontWeight:700,color:C.mist,fontFamily:F.display}}>{name}</div>
        <div style={{fontSize:14,color:C.mist,fontFamily:F.body}}>This screen is available in the full build</div>
      </div>
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────────────
export function AdminApp(){
  useEffect(()=>{injectCSS();},[]);
  const [loggedIn,setLoggedIn]=useState(false);
  const [screen,setScreen]=useState("dashboard");

  const screenMap={
    dashboard:{label:"Dashboard",icon:"⬛"},
    rota:{label:"Rota Management",icon:"📅"},
    careplan:{label:"Care Plans",icon:"📋"},
    incidents:{label:"Incidents",icon:"🚨"},
    reports:{label:"Reports & Audit Log",icon:"📊"},
  };

  function renderMain(){
    switch(screen){
      case "dashboard": return <DashboardScreen/>;
      case "rota":      return <RotaScreen/>;
      case "careplan":  return <CarePlanScreen/>;
      case "incidents": return <IncidentsScreen/>;
      case "reports":   return <ReportsScreen/>;
      default: return <PlaceholderScreen name={screen.charAt(0).toUpperCase()+screen.slice(1)} icon="🔧"/>;
    }
  }

  return(
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 20% 20%, #0D2040 0%, #0A1628 70%)",padding:"32px 24px 60px",fontFamily:F.body}}>
      <div style={{textAlign:"center",marginBottom:28,animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(10,107,114,0.12)",border:"1px solid rgba(10,107,114,0.25)",borderRadius:20,padding:"12px 22px",backdropFilter:"blur(10px)"}}>
          <div style={{width:36,height:36,borderRadius:11,background:`linear-gradient(135deg,${C.teal},#0D9AA6)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🤝</div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:17,fontWeight:800,color:C.white,fontFamily:F.display,letterSpacing:-0.4}}>Affable Insights</div>
            <div style={{fontSize:11,color:C.tealM,fontFamily:F.body}}>Admin / Manager Desktop Prototype  ·  6 Screens</div>
          </div>
        </div>
      </div>

      {loggedIn&&(
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
          {Object.entries(screenMap).map(([id,{label,icon}])=>(
            <button key={id} onClick={()=>setScreen(id)} style={{background:screen===id?`linear-gradient(135deg,${C.teal},#0D9AA6)`:"rgba(255,255,255,0.04)",color:screen===id?C.white:"#5080C0",border:`1px solid ${screen===id?C.teal:"rgba(10,107,114,0.2)"}`,borderRadius:10,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F.display,transition:"all 0.2s",boxShadow:screen===id?`0 4px 14px ${C.tealGlow}`:"none"}}>
              {icon} {label}
            </button>
          ))}
        </div>
      )}

      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,justifyContent:"center"}}>
        <div style={{background:C.teal,color:C.white,borderRadius:8,padding:"4px 12px",fontSize:11,fontWeight:800,fontFamily:F.display}}>
          {loggedIn?`Screen: ${screenMap[screen]?.label||screen}`:"Screen: Login"}
        </div>
        <span style={{fontSize:13,color:"#8090B0",fontFamily:F.body}}>
          {!loggedIn?"Desktop manager sign-in with MFA":
           screen==="dashboard"?"Live overview — alerts, worker status, service summary":
           screen==="rota"?"Create and publish rotas for both care services":
           screen==="careplan"?"View, edit and version care plans":
           screen==="incidents"?"Log, manage and resolve incidents across all services":
           screen==="reports"?"Generate reports and view the full immutable audit log":""}
        </span>
      </div>

      <div style={{display:"flex",justifyContent:"center",animation:"fadeIn 0.4s ease"}} key={screen}>
        {!loggedIn?(
          <LoginScreen onDone={()=>setLoggedIn(true)}/>
        ):(
          <Desktop>
            <Sidebar active={screen} setScreen={setScreen}/>
            {renderMain()}
          </Desktop>
        )}
      </div>

      {loggedIn&&(
        <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:18,flexWrap:"wrap"}}>
          {Object.keys(screenMap).map((id,i)=>(
            <button key={id} onClick={()=>setScreen(id)} style={{background:screen===id?"rgba(255,255,255,0.08)":"transparent",color:screen===id?C.white:"#3A4A60",border:`1px solid ${screen===id?"rgba(255,255,255,0.1)":"transparent"}`,borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:F.display}}>
              {i+1}. {screenMap[id].label}
            </button>
          ))}
          <button onClick={()=>setLoggedIn(false)} style={{background:"transparent",color:"#3A3A50",border:"none",fontSize:12,cursor:"pointer",fontFamily:F.body,marginLeft:8}}>← Back to login</button>
        </div>
      )}

      <div style={{maxWidth:700,margin:"20px auto 0",background:"rgba(255,255,255,0.02)",borderRadius:14,padding:"14px 18px",border:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#3A4A60",textTransform:"uppercase",letterSpacing:1,marginBottom:10,fontFamily:F.display}}>Manager Flow</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,alignItems:"center"}}>
          {["Login","→","Dashboard","→","Rota","→","Care Plans","→","Incidents","→","Reports & Audit"].map((s,i)=>(
            <span key={i} style={{background:s==="→"?"transparent":"rgba(10,107,114,0.1)",color:s==="→"?"#2A3A50":C.tealM,padding:s==="→"?"0":"3px 10px",borderRadius:7,fontSize:11,fontWeight:700,fontFamily:F.display}}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
