/* ===== EDIT THESE ===== */
const PHRASES = ["Computer Science Student","Aspiring Software Developer","Web Development Learner","Problem Solver"];
const CV_PATH = "david-chilengwa-cv.pdf";
// Add flyers here: {src:"flyer1.jpg", title:"Title", desc:"Short description"}
const FLYERS = [{src:"business-promotional-flyer.jpg",title:"Business Promotional Flyer",desc:"A promotional flyer created for a business, presenting its information through graphic design.",role:"Designed the flyer."}];
const PHONE = "260768409033";
/* ====================== */
const $ = id => document.getElementById(id);
$("year").textContent = new Date().getFullYear();

// Typing animation
(function(){
  const el=$("typed"); if(!el)return; const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){el.textContent=PHRASES[0];return;}
  let p=0,c=0,del=false;
  (function tick(){
    const w=PHRASES[p];
    el.textContent=w.slice(0,c);
    let d=del?40:85;
    if(!del&&c===w.length){del=true;d=1400;}
    else if(del&&c===0){del=false;p=(p+1)%PHRASES.length;d=400;}
    else c+=del?-1:1;
    setTimeout(tick,d);
  })();
})();

// Flyer gallery
(function(){
  const grid=$("flyerGrid"); if(!grid)return;
  if(!FLYERS.length){grid.innerHTML='<div class="col-lg-8"><div class="empty-state"><i class="bi bi-image fs-1"></i><p class="mb-0 mt-2">Flyer designs will appear here soon.<br><small>Add flyers to  and list them in script.js.</small></p></div></div>';return;}
  FLYERS.forEach(f=>{
    const col=document.createElement("div");col.className="col-md-6 col-lg-4 reveal";
    col.innerHTML=`<button class="flyer-card" type="button" aria-label="Preview flyer: ${f.title||"Flyer"}"><img src="${f.src}" alt="${f.title||"Flyer design"}" loading="lazy"><div class="body"><strong>${f.title||""}</strong><p>${f.desc||""}</p>${f.role?`<p class="small"><strong>My role:</strong> ${f.role}</p>`:""}<span class="btn btn-shine btn-outline-dc btn-sm">View Flyer</span></div></button>`;
    col.querySelector("button").onclick=()=>{$("flyerBig").src=f.src;$("flyerBig").alt=f.title||"Flyer design";$("flyerTitle").textContent=f.title||"Flyer";new bootstrap.Modal($("flyerModal")).show();};
    grid.appendChild(col);
  });
})();

// CV modal: only offer the file if it exists
(function(){
  const body=$("cvBody"),foot=$("cvFooter"); if(!body)return;
  const noCv='<p class="muted text-center my-5">The CV has not been added yet.<br>Place the file at <code>'+CV_PATH+'</code>.</p>';
  body.innerHTML=noCv;
  fetch(CV_PATH,{method:"HEAD"}).then(r=>{
    if(!r.ok)return;
    $("cvDownload").classList.remove("d-none");
    body.innerHTML=`<iframe src="${CV_PATH}#view=FitH" title="David Chilengwa CV"></iframe><p class="small muted mt-2 mb-0">If the preview doesn't load, use the buttons below.</p>`;
    foot.innerHTML=`<a class="btn btn-shine btn-outline-dc" href="${CV_PATH}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Open in new tab</a><a class="btn btn-shine btn-primary-dc" href="${CV_PATH}" download><i class="bi bi-download"></i> Download CV</a>`;
  }).catch(()=>{});
})();

// Close mobile menu after selecting a link
document.querySelectorAll("#navMenu .nav-link").forEach(a=>a.addEventListener("click",()=>{
  const m=$("navMenu");if(m.classList.contains("show"))bootstrap.Collapse.getOrCreateInstance(m).hide();
}));

// Contact form -> WhatsApp
if($("contactForm"))$("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const v=id=>$(id).value.trim();
  const fullName=v("fullName"),email=v("email"),subject=v("subject"),userMessage=v("message");
  const errs={
    fullName:fullName?"":"Please enter your full name.",
    email:!email?"Please enter your email address.":/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)?"":"Please enter a valid email address.",
    subject:subject?"":"Please enter a subject.",
    message:userMessage?"":"Please enter your message."
  };
  let ok=true;
  for(const k in errs){$(k+"Err").textContent=errs[k];$(k).classList.toggle("invalid",!!errs[k]);$(k).setAttribute("aria-invalid",!!errs[k]);if(errs[k]){if(ok)$(k).focus();ok=false;}}
  if(!ok)return;
  const message=`Hello David Chilengwa,

I am contacting you through your portfolio website.

Full Name: ${fullName}
Email: ${email}
Subject: ${subject}

Message:
${userMessage}

I look forward to hearing from you.`;
  window.location.href=`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
});

// Scroll reveal + back-to-top
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(n=>io.observe(n));
addEventListener("scroll",()=>$("toTop").classList.toggle("show",scrollY>600),{passive:true});
