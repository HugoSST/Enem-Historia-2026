const $=id=>document.getElementById(id);
let pool,i,score,miss,filt="Todas";
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chip").forEach(c=>c.classList.remove("on"));b.classList.add("on");filt=b.dataset.f});
function show(id){["start","quiz","end"].forEach(s=>$(s).hidden=s!==id)}
function start(){
 pool=Q.filter(q=>filt==="Todas"||q.m===filt);
 if($("shuf").checked)pool.sort(()=>Math.random()-.5);
 i=0;score=0;miss=[];show("quiz");render();
}
function render(){
 const q=pool[i];
 $("mat").textContent=q.m;$("prog").textContent=`${i+1} de ${pool.length}`;$("pts").textContent=`Acertos: ${score}`;
 $("barI").style.width=(i/pool.length*100)+"%";
 $("num").textContent=`Questão ${q.n}`;$("txt").textContent=q.t;
 $("fb").hidden=true;$("next").hidden=true;
 $("next").textContent=i===pool.length-1?"Ver resultado":"Próxima";
 const box=$("alts");box.innerHTML="";
 q.o.forEach((o,k)=>{
  const b=document.createElement("button");b.className="alt";
  b.innerHTML=`<b>${"ABCDE"[k]}</b><span></span>`;b.lastChild.textContent=o;
  b.onclick=()=>answer(k);box.appendChild(b);
 });
}
function answer(k){
 const q=pool[i],bs=[...document.querySelectorAll(".alt")];
 bs.forEach((b,j)=>{b.disabled=true;if(j===q.c)b.classList.add("ok")});
 if(k===q.c){score++;celebrate()}else{bs[k].classList.add("bad");miss.push(q)}
 $("pts").textContent=`Acertos: ${score}`;
 $("fb").innerHTML="<b>"+(k===q.c?"Correto. ":"Resposta: "+"ABCDE"[q.c]+". ")+"</b>";
 $("fb").append(q.r);$("fb").hidden=false;$("next").hidden=false;$("next").focus();
}
$("next").onclick=()=>{i++;i<pool.length?render():finish()};
function finish(){
 show("end");const n=pool.length,p=Math.round(score/n*100);
 $("score").textContent=`${score} / ${n} (${p}%)`;
 $("msg").textContent=p>=80?"Excelente! Digno de uma cátedra na Academia.":p>=50?"Bom caminho. Revise as questões abaixo.":"Hora de reler os clássicos e tentar de novo.";
 const by={};pool.forEach(q=>{by[q.m]=by[q.m]||[0,0];by[q.m][1]++});
 pool.forEach(q=>{if(!miss.includes(q))by[q.m][0]++});
 $("byM").innerHTML=Object.entries(by).map(([m,v])=>`<p><b>${m}:</b> ${v[0]}/${v[1]}</p>`).join("");
 $("errs").hidden=!miss.length;
 $("errList").innerHTML=miss.map(q=>`<li><b>Q${q.n}</b> (${q.m}): resposta ${"ABCDE"[q.c]}</li>`).join("");
}
$("go").onclick=start;$("again").onclick=()=>show("start");
function celebrate(){
 const cols=["#b8863b","#e8b95a","#3f7f78","#8a2f3d","#ece6d6"];
 for(let n=0;n<70;n++){
  const l=document.createElement("i");l.className="leaf";
  const w=8+Math.random()*10;
  Object.assign(l.style,{left:Math.random()*100+"vw",width:w+"px",height:w*1.8+"px",background:cols[n%5],
   borderRadius:"0 100% 0 100%",animationDuration:(1.8+Math.random()*1.6)+"s",animationDelay:Math.random()*.4+"s"});
  l.style.setProperty("--dx",(Math.random()*160-80)+"px");l.style.setProperty("--r",(Math.random()*900-450)+"deg");
  document.body.appendChild(l);setTimeout(()=>l.remove(),4000);
 }
 const e=document.createElement("div");e.className="eureka";
 e.innerHTML='<svg viewBox="0 0 200 200"><g fill="#3f7f78" stroke="#b8863b" stroke-width="2"><path id="h" d="M100 180C50 170 20 130 28 80c14 30 34 50 72 60z"/><use href="#h" transform="matrix(-1 0 0 1 200 0)"/></g><circle cx="100" cy="100" r="46" fill="#101c27" stroke="#b8863b" stroke-width="4"/></svg><b>Eureka!</b>';
 document.body.appendChild(e);setTimeout(()=>e.remove(),1700);
}
