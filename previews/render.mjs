// Generated source for the 84-style atlas. Not needed to view the gallery.
import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import sharp from "sharp";

const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const rgb = h => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix = (a,b,k) => '#'+rgb(a).map((v,i)=>Math.round(v*(1-k)+rgb(b)[i]*k).toString(16).padStart(2,'0')).join('');
const lum = h => rgb(h).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const contrast = (a,b) => (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
const onColor = (bg, preferred) => contrast(bg,preferred)>=4.5?preferred:(contrast(bg,'#FFFFFF')>contrast(bg,'#111111')?'#FFFFFF':'#111111');
const fontMap = {"sans":"Arial,Helvetica,sans-serif","serif":"Georgia,Times New Roman,serif","mono":"Menlo,Consolas,monospace","condensed":"Impact,Arial Narrow,Arial,sans-serif"};
const baseRenderSvg = function(p, index=0) {
 const W=1600,H=1000,R=p.radius, dark=lum(p.bg)<.15;
 const sans='Arial,Helvetica,PingFang SC,Microsoft YaHei,sans-serif', mono='Menlo,Consolas,monospace';
 const F=fontMap[p.font]||fontMap.sans, I=p.ink;
 const M=contrast(p.bg,p.muted)>=3?p.muted:mix(p.bg,p.ink,.64);
 const A=p.accent,S=p.secondary,AI=onColor(A,p.accentInk),SI=onColor(p.surface,I);
 const edge=contrast(p.bg,p.border)<1.06?mix(p.bg,I,.14):p.border;
 const xs=[]; const add=s=>xs.push(s);
 const rect=(x,y,w,h,f,rx=R,stroke='',extra='')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+f+'"'+(stroke?' stroke="'+stroke+'"':'')+' '+extra+'/>';
 const line=(x1,y1,x2,y2,col=edge,w=1,extra='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="'+w+'" '+extra+'/>';
 const tx=(x,y,t,size=18,col=I,weight=400,font=sans,anchor='start',extra='')=>'<text x="'+x+'" y="'+y+'" fill="'+col+'" font-family="'+esc(font)+'" font-size="'+size+'" font-weight="'+weight+'" text-anchor="'+anchor+'" '+extra+'>'+esc(t)+'</text>';
 const button=(x,y,w,label,filled=true)=>rect(x,y,w,54,filled?A:p.bg,Math.min(R,27),filled?'':edge)+tx(x+w/2,y+34,label,16,filled?AI:I,600,sans,'middle');
 const pill=(x,y,w,label)=>rect(x,y,w,30,mix(p.bg,S,.12),15)+tx(x+w/2,y+21,label,12,onColor(mix(p.bg,S,.12),M),600,sans,'middle','letter-spacing="1.2"');
 const headline=(x,y,center=false,size=86)=>tx(x,y,'Make room for',p.font==='mono'?size*.8:size,I,p.weight,F,center?'middle':'start','letter-spacing="-2.5"')+tx(x,y+size*1.05,'better work.',p.font==='mono'?size*.8:size,I,p.weight,F,center?'middle':'start','letter-spacing="-2.5"');
 const desc=(x,y,center=false)=>tx(x,y,'One calm space for your ideas, projects and people.',19,M,400,sans,center?'middle':'start')+tx(x,y+29,'Less friction. More possibility.',19,M,400,sans,center?'middle':'start');
 const nav=(border=true)=>{add(tx(64,55,p.name,25,I,700,F));[['Product',650],['Solutions',754],['Resources',882]].forEach(([t,x])=>add(tx(x,53,t,15,M,500)));add(tx(1235,53,'Log in',15,I,500));add(button(1350,20,186,'Get started'));if(border)add(line(64,97,1536,97));};
 const featureCards=(y=678)=>{['Clarity, by design','Made to move','Better together'].forEach((t,j)=>{let x=64+j*497;add(rect(x,y,478,144,p.surface,R,edge));add(tx(x+24,y+38,'0'+(j+1),13,onColor(p.surface,M),500,mono));add(tx(x+24,y+76,t,24,SI,600,F));add(tx(x+24,y+108,['Everything in its right place.','From the first idea to done.','A shared space for good work.'][j],15,onColor(p.surface,M)));});};
 const miniBoard=(x,y,w=600,h=450)=>{
   let c=onColor(p.surface,I),m=onColor(p.surface,M),soft=mix(p.surface,S,.15);
   let out=rect(x,y,w,h,p.surface,Math.max(4,R),edge);
   out+=tx(x+28,y+44,'Your workspace',22,c,600,F)+tx(x+w-28,y+43,'•••',18,m,500,sans,'end')+line(x+24,y+65,x+w-24,y+65,mix(p.surface,c,.12));
   const gap=16,cw=(w-72)/2;
   [0,1].forEach(j=>{let cx=x+28+j*(cw+16),cy=y+90;out+=rect(cx,cy,cw,112,j?soft:mix(p.surface,A,.09),Math.min(R,14));out+=tx(cx+18,cy+31,j?'In progress':'Completed',14,c)+tx(cx+18,cy+78,j?'08':'24',40,c,600,F);});
   [0,1,2].forEach(j=>{let cy=y+237+j*59;out+=rect(x+28,cy,w-56,47,p.bg,Math.min(R,10),edge);out+=rect(x+43,cy+15,17,17,j===0?A:'none',4,j===0?'':edge);out+=tx(x+74,cy+29,['Brand exploration','Website launch','Product direction'][j],15,I,500);out+=rect(x+w-103,cy+13,56,22,mix(p.bg,S,.18),11)+tx(x+w-75,cy+28,['Ready','Review','Draft'][j],10,onColor(mix(p.bg,S,.18),I),600,sans,'middle');});
   return out;
 };
 add('<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-labelledby="title desc">');
 add('<title id="title">'+esc(p.name)+' — 设计风格示意图</title><desc id="desc">'+esc(p.caption)+'。依据 DESIGN.md 演绎，非官网截图。通用字体近似，统一虚构内容用于比较。</desc>');
 add('<defs><linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+mix(p.bg,S,dark?.35:.24)+'"/><stop offset=".55" stop-color="'+mix(p.bg,A,dark?.18:.09)+'"/><stop offset="1" stop-color="'+p.bg+'"/></linearGradient><linearGradient id="orb" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+S+'"/><stop offset="1" stop-color="'+mix(S,p.bg,.68)+'"/></linearGradient><clipPath id="stage"><rect width="1600" height="880"/></clipPath></defs>');
 add(rect(0,0,W,H,p.bg,0)); add('<g clip-path="url(#stage)">');
 if(p.layout==='split'){
  nav();add(pill(64,159,214,'A LITTLE MORE POSSIBLE'));add(headline(64,301,false,89));add(desc(67,470));add(button(64,558,190,'Start creating'));add(button(270,558,160,'Explore more',false));
  add(rect(822,142,714,482,'url(#hero)',Math.max(16,R)));add('<circle cx="1426" cy="212" r="116" fill="url(#orb)" opacity=".7"/>');add(miniBoard(850,183,610,420));
  featureCards(680);
 }else if(p.layout==='center'){
  nav();add(pill(685,137,230,'WELCOME TO WHAT’S NEXT'));add(headline(800,256,true,83));add(desc(800,415,true));add(button(612,486,190,'Start creating'));add(button(818,486,170,'Explore more',false));
  add(rect(160,589,1280,260,'url(#hero)',Math.max(16,R)));add('<circle cx="266" cy="720" r="98" fill="'+S+'" opacity=".35"/><circle cx="1334" cy="667" r="123" fill="'+A+'" opacity=".1"/>');
  [0,1,2].forEach(j=>{let x=377+j*294;add(rect(x,625,272,184,p.surface,R,edge));add(tx(x+22,661,['IDEAS','PROJECTS','PEOPLE'][j],12,onColor(p.surface,M),600,mono));add(tx(x+22,710,['A fresh start.','Keep it moving.','In good company.'][j],22,SI,600,F));add(line(x+22,736,x+247,736,mix(p.surface,I,.15)));add(tx(x+22,775,['Capture something good','Find your next milestone','Make space for everyone'][j],13,onColor(p.surface,M)));});
 }else if(p.layout==='editorial'){
  nav();add(tx(64,164,'A NEW PERSPECTIVE / VOL. 01',13,M,600,mono,'start','letter-spacing="2"'));add(headline(60,288,false,p.font==='serif'?100:92));add(desc(67,507));add(button(64,590,202,'Find your next idea'));
  add(rect(1030,148,506,464,S,0));add(tx(1062,233,'THE SHAPE',44,onColor(S,I),p.weight,F));add(tx(1062,286,'OF THINGS',44,onColor(S,I),p.weight,F));add(tx(1062,339,'TO COME.',44,onColor(S,I),p.weight,F));add('<circle cx="1390" cy="489" r="94" fill="'+p.bg+'"/>');add(line(1070,558,1496,402,onColor(S,I),3));
  add(line(64,710,1536,710,I));['Good ideas deserve space.','A different kind of focus.','Designed around you.'].forEach((t,j)=>{let x=64+j*497;add(tx(x,751,'0'+(j+1),13,M,500,mono));add(tx(x,799,t,23,I,500,F));});
 }else if(p.layout==='dashboard'){
  nav();add(rect(46,130,1508,708,p.surface,R,edge));add(line(276,130,276,838,edge));add(tx(74,180,'WORKSPACE',12,SI,700,mono,'start','letter-spacing="1.5"'));
  ['Overview','Projects','Team','Reports','Settings'].forEach((t,j)=>{let y=219+j*57;if(j===0)add(rect(62,y-26,194,44,mix(p.surface,A,.13),Math.min(9,R)));add(tx(83,y,t,16,SI,j===0?700:400));});
  add(tx(310,188,'Workspace overview',34,SI,p.weight,F));add(tx(310,221,'Good morning. Here is where things stand.',16,onColor(p.surface,M)));add(button(1303,158,210,'Create a project'));
  ['Projects delivered','Active members','On-time delivery'].forEach((t,j)=>{let x=310+j*400;add(rect(x,251,376,133,p.bg,R,edge));add(tx(x+22,286,t,14,M));add(tx(x+22,339,['24','128','98.4%'][j],39,I,600,F));add(tx(x+341,341,['+12%','+8%','+4.2%'][j],12,onColor(p.bg,A),600,sans,'end'));});
  add(rect(310,410,776,380,p.bg,R,edge));add(tx(336,452,'Progress over time',21,I,600,F));add(tx(1056,451,'This month',13,M,400,sans,'end'));
  [0,1,2,3].forEach(j=>{let y=503+j*70;add(line(372,y,1051,y,edge));add(tx(350,y+5,['100','75','50','25'][j],11,M,400,mono,'end'));});
  add('<path d="M382 705 C440 705 466 650 515 665 S600 578 652 608 S740 530 790 552 S883 478 936 505 S1006 462 1047 482" fill="none" stroke="'+A+'" stroke-width="5" stroke-linecap="round"/>');['W1','W2','W3','W4'].forEach((v,j)=>add(tx(382+j*214,764,v,11,M,400,mono)));
  add(rect(1110,410,400,380,p.bg,R,edge));add(tx(1136,452,'Recent activity',21,I,600,F));['Brand exploration','Website launch','Product direction','Team workspace'].forEach((t,j)=>{let y=499+j*68;add(rect(1136,y,32,32,mix(p.bg,S,.2),Math.min(R,8)));add(tx(1183,y+13,t,14,I,600));add(tx(1183,y+34,['Ready for review','Milestone completed','New ideas added','Welcome, Alex'][j],12,M));});
 }else if(p.layout==='terminal'){
  nav();add(tx(64,171,'// GOOD WORK STARTS HERE',13,onColor(p.bg,S),500,mono));add(headline(64,285,false,81));add(desc(64,455));add(button(64,547,199,'Start building'));add(tx(67,653,'$ create something-good',20,M,500,mono));
  add(rect(802,149,734,536,p.surface,Math.max(4,R),edge));add(rect(802,149,734,49,mix(p.surface,I,.055),Math.max(4,R)));add(tx(829,181,'○  ○  ○',16,onColor(p.surface,M),400,mono));add(tx(1169,180,'workspace / main',13,onColor(p.surface,M),400,mono,'middle'));
  var codes=[['01','// A space for your next idea',M],['02','const workspace = {',SI],['03','  focus: "what matters",',SI],['04','  people: "in sync",',onColor(p.surface,S)],['05','  possibilities: Infinity,',SI],['06','};',SI],['07','',SI],['08','> build better, together',onColor(p.surface,S)],['09','✓ Ready when you are.',SI]];
  codes.forEach((r,j)=>{let y=248+j*42;add(tx(829,y,r[0],14,onColor(p.surface,M),400,mono));add(tx(875,y,r[1],18,r[2],400,mono));});
  add(line(64,747,1536,747));['ONE SHARED SPACE','LESS FRICTION','MORE POSSIBILITY'].forEach((t,j)=>add(tx(64+j*497,803,t,16,M,500,mono)));
 }else if(p.layout==='retro'){
  add(rect(18,18,1564,842,p.bg,0,I,'stroke-width="4"'));add(rect(35,35,1530,61,p.surface,0,I,'stroke-width="2"'));add(tx(56,76,p.name.toUpperCase(),30,SI,700,F));['HOME','PRODUCTS','ABOUT','CONTACT'].forEach((t,j)=>add(tx(858+j*164,74,t,16,SI,700,sans)));
  add(tx(60,194,'Make room for better work.',p.font==='mono'?60:71,I,p.weight,F));add(tx(64,238,'A new home for your ideas, projects and people.',23,I));add(rect(1373,135,140,82,S,0,I,'stroke-width="3"'));add(tx(1443,186,'NEW!',31,onColor(S,I),900,F,'middle'));
  add(rect(60,283,941,513,p.surface,0,I,'stroke-width="3"'));add(rect(60,283,941,49,A,0,I,'stroke-width="2"'));add(tx(78,316,'WORKSPACE.EXE',21,AI,700,mono));add(tx(963,316,'×',24,AI,700,mono));
  add(rect(92,365,875,100,p.bg,0,I));add(tx(117,406,'WELCOME TO YOUR WORKSPACE',24,I,700,F));add(tx(117,439,'Click a project and make something great.',18,I));
  [0,1,2].forEach(j=>{let x=92+j*302;add(rect(x,494,272,194,p.bg,0,I,'stroke-width="2"'));add(rect(x+17,511,238,62,j===1?S:A,0));add(tx(x+136,552,['IDEAS','PROJECTS','PEOPLE'][j],26,onColor(j===1?S:A,I),700,F,'middle'));add(tx(x+18,624,['A fresh start.','Keep it moving.','Better together.'][j],20,I,700,F));add(tx(x+18,659,'Explore this section >>',15,I,400,sans));});
  add(rect(92,721,225,47,A,0,I,'stroke-width="3"'));add(line(94,723,315,723,'#FFFFFF',2));add(tx(204,752,'ENTER HERE >>',17,AI,700,mono,'middle'));
  add(rect(1034,283,479,513,p.surface,0,I,'stroke-width="3"'));add(tx(1060,328,'WHAT’S NEW',27,SI,700,F));add(line(1060,350,1486,350,SI,3));
  ['24 projects completed','08 ideas in motion','01 shared workspace'].forEach((t,j)=>add(tx(1060,405+j*58,t,23,SI,700,F)));
  for(let yy=0;yy<5;yy++)for(let xx=0;xx<10;xx++)if((xx+yy)%3!==0)add(rect(1080+xx*36,610+yy*24,32,20,(xx+yy)%2?A:S,0));
 }else if(p.layout==='cinema'){
  nav(false);add(rect(32,112,1536,727,'url(#hero)',Math.min(R,28)));add('<ellipse cx="1223" cy="436" rx="252" ry="250" fill="url(#orb)" opacity=".9"/>');add('<ellipse cx="1223" cy="436" rx="145" ry="250" fill="none" stroke="'+mix(S,I,.2)+'" stroke-width="2" opacity=".45"/><ellipse cx="1223" cy="436" rx="252" ry="74" fill="none" stroke="'+mix(S,I,.2)+'" stroke-width="2" opacity=".45"/>');
  add('<path d="M980 716 L1360 180 M1060 760 L1440 224" fill="none" stroke="'+p.bg+'" stroke-width="14" opacity=".45"/>');
  add(tx(70,186,'A DIFFERENT PERSPECTIVE',12,M,600,mono,'start','letter-spacing="2"'));add(headline(66,329,false,96));add(desc(70,531));add(button(70,634,198,'Explore the possible'));add(tx(72,783,'01 / CLARITY    02 / POSSIBILITY    03 / PROGRESS',12,M,500,mono,'start','letter-spacing="1.3"'));
 }else{
  nav();add(tx(62,166,'OPEN UP WHAT’S NEXT',13,M,700,mono,'start','letter-spacing="2"'));add(headline(56,299,false,101));add(desc(64,535));add(button(64,622,201,'Make your next move'));
  add(rect(1014,141,522,531,S,Math.min(R,20)));var sci=onColor(S,I);add('<circle cx="1275" cy="398" r="176" fill="'+p.bg+'"/><path d="M1115 505 L1275 208 L1435 505 Z" fill="'+A+'"/>');add(rect(1170,374,210,210,mix(S,p.bg,.48),0));add(tx(1043,636,'MAKE / BUILD / SHARE',15,sci,700,mono));
  add(rect(64,742,1472,87,A,Math.min(R,12)));add(tx(94,798,'GOOD WORK STARTS WITH A LITTLE SPACE.',31,AI,600,F));add(tx(1495,797,'→',40,AI,500,sans,'end'));
 }
 add('</g>');
 add(rect(0,880,1600,120,'#F7F8FA',0));add(line(0,880,1600,880,'#DDE1E7'));
 add(tx(40,911,'STYLE ATLAS  /  '+String(index+1).padStart(2,'0')+' OF 84',11,'#667085',600,mono,'start','letter-spacing="1.2"'));
 add(tx(40,951,p.name,29,'#101828',700,sans));add(tx(40,978,'规范演绎 · 非官网截图',13,'#667085',400,sans));
 add(tx(400,934,p.caption,18,'#344054',500,sans));let sf=p.sourceFont.length>53?p.sourceFont.slice(0,50)+'…':p.sourceFont;add(tx(400,965,'字体参考：'+sf+' · 画面使用通用字体近似',12,'#667085',400,sans));
 [p.bg,p.surface,p.accent,p.secondary].forEach((c,j)=>{let x=1205+j*88;add(rect(x,904,66,33,c,5,'#D0D5DD'));add(tx(x,960,c.toUpperCase(),11,'#475467',500,mono));add(tx(x,980,['底色','表面','行动色','辅助色'][j],11,'#667085',400,sans));});
 add('</svg>');return xs.join('');
};
const renderSvg = function(p,i){let svg=baseRenderSvg(p,i);if(p.slug==='opencode.ai'){let a=svg.indexOf('<rect x="802" y="149"'),b=svg.indexOf('<line x1="64" y1="747"');let map={[p.surface.toUpperCase()]:p.ink,[p.ink.toUpperCase()]:'#F5F3F0',[p.muted.toUpperCase()]:'#A5A1A0',[p.border.toUpperCase()]:'#4A4646'};let segment=svg.slice(a,b).replace(/#[0-9A-Fa-f]{6}/g,c=>map[c.toUpperCase()]||c);segment=segment.replace(/(<rect x="802" y="149" width="734" height="49" rx="[^"]*" fill=")[^"]+/,(_,a)=>a+mix(p.ink,'#FFFFFF',.08));segment=segment.replace(/<text [^>]*>/g,tag=>tag.replace(/fill="(#[0-9A-Fa-f]{6})"/,(_,c)=>'fill="'+(contrast(p.ink,c)>=3?c:'#D5D0CE')+'"'));svg=svg.slice(0,a)+segment+svg.slice(b);}if(p.slug==='nike')svg=svg.replace(/height="54" rx="0"/g,'height="54" rx="27"');return svg;};

const root=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(await fs.readFile(path.join(root,"profiles.json"),"utf8"));
await fs.mkdir(path.join(root,"svg"),{recursive:true});
await fs.mkdir(path.join(root,"png"),{recursive:true});
for (const [i,p] of manifest.profiles.entries()){
 const svg=renderSvg(p,i);
 await fs.writeFile(path.join(root,"svg",p.slug+".svg"),svg);
 await sharp(Buffer.from(svg)).png().toFile(path.join(root,"png",p.slug+".png"));
}
console.log("Rendered "+manifest.profiles.length+" styles.");
