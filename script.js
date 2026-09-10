const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const projects = {
  healthkart:{
    kicker:"01 / FULL STACK",
    title:"HealthKart",
    desc:"A full-stack e-commerce project combining an Angular frontend with a Spring Boot backend and relational persistence.",
    boxes:[
      ["Problem","Create a complete shopping flow with product discovery, authentication, cart, checkout and order history."],
      ["Architecture","Angular 20 + TypeScript frontend, Spring Boot 3.5.x + Java 21 backend, JPA/Hibernate, H2/MySQL and Docker."],
      ["Engineering","REST APIs, Spring Security/JWT, DTO-based responses, validation and separation between persistence models and API payloads."],
      ["Focus","A practical software system that demonstrates full-stack integration and production-minded API design."]
    ]
  },
  uniguide:{
    kicker:"02 / iOS · EDUCATION",
    title:"UniGuide",
    desc:"An iOS application concept designed to make college and course discovery easier for students.",
    boxes:[
      ["Core idea","Students start with their study interests and receive a focused way to explore colleges, programs and course options."],
      ["Experience","Search and filter programs, compare college/course information, save interesting choices and review requirements before deciding."],
      ["Technology","Designed around Swift/SwiftUI with CoreData for saved preferences/data and MapKit/JSON patterns for location and structured content."],
      ["Design goal","Reduce the friction between 'what do I want to study?' and 'which program is a good fit?'."]
    ]
  },
  rag:{
    kicker:"03 / GENERATIVE AI",
    title:"RAG Intelligence Layer",
    desc:"A reusable architecture for grounded LLM applications over unstructured documents.",
    boxes:[
      ["Pipeline","Document ingestion → text chunking → embeddings → vector storage → semantic retrieval → context augmentation → LLM generation."],
      ["Tools","RAG, FAISS/ChromaDB, LangChain, LangGraph, OpenAI/Azure OpenAI APIs and prompt engineering."],
      ["Evaluation","RAG quality can be evaluated across retrieval relevance, answer quality, latency and model cost."],
      ["Serving","FastAPI/Flask can expose retrieval and generation workflows as application services."]
    ]
  },
  cloud:{
    kicker:"04 / CLOUD · DEVOPS",
    title:"Cloud Infrastructure Automation",
    desc:"Infrastructure-as-code exercises focused on repeatable AWS networking and compute environments.",
    boxes:[
      ["Networking","VPC architecture with public/private subnets, routing, NAT gateway and security groups."],
      ["Compute","EC2-based workloads with controlled network access and reusable configuration."],
      ["Automation","Terraform and CloudFormation patterns for repeatable infrastructure provisioning."],
      ["Mindset","Treat infrastructure as code so environments are easier to review, reproduce and change."]
    ]
  },
  analytics:{
    kicker:"05 / DATA · ANALYTICS",
    title:"Predictive Analytics Lab",
    desc:"A data workflow covering the lifecycle from raw data to evaluated predictive models.",
    boxes:[
      ["Prepare","Profile, cleanse, transform and validate structured/unstructured datasets."],
      ["Model","Classification, regression, clustering and time-series forecasting with feature engineering and tuning."],
      ["Evaluate","Cross-validation, feature selection, model evaluation and statistical analysis."],
      ["Communicate","Translate model outputs and KPIs into dashboards and actionable analytical views."]
    ]
  }
};

function openProject(key){
  const p=projects[key]; if(!p)return;
  $("#modal-kicker").textContent=p.kicker;
  $("#modal-title").textContent=p.title;
  $("#modal-desc").textContent=p.desc;
  $("#modal-content").innerHTML=`<div class="case-grid">${p.boxes.map(x=>`<div class="case-box"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join("")}</div>`;
  $("#modal").classList.add("open"); $("#modal").setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
function closeModal(){ $("#modal").classList.remove("open"); $("#modal").setAttribute("aria-hidden","true"); document.body.style.overflow=""; }
$$("[data-project]").forEach(el=>el.addEventListener("click",()=>openProject(el.dataset.project)));
$(".modal-close").addEventListener("click",closeModal);
$(".modal-backdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.1});
$$(".reveal").forEach(x=>obs.observe(x));

$("#themeToggle").addEventListener("click",()=>document.body.classList.toggle("light"));

const canvas=$("#network"),ctx=canvas.getContext("2d");
let pts=[];
function resize(){canvas.width=canvas.clientWidth*devicePixelRatio;canvas.height=canvas.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);pts=Array.from({length:55},()=>({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}))}
function draw(){
  ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
  for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.clientWidth)p.vx*=-1;if(p.y<0||p.y>canvas.clientHeight)p.vy*=-1}
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<105){ctx.globalAlpha=(1-d/105)*.28;ctx.strokeStyle="#b8ff54";ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
  ctx.globalAlpha=.7;for(const p of pts){ctx.fillStyle="#b8ff54";ctx.fillRect(p.x,p.y,2,2)}ctx.globalAlpha=1;requestAnimationFrame(draw)
}
addEventListener("resize",resize);resize();draw();
