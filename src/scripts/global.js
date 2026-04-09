// Theme toggle
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  var next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  document.getElementById('themeToggle').textContent = next === 'light' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
}
(function() {
  var saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('themeToggle').textContent = '☀️';
  }
})();

// Main tab switching
function switchMainTab(idx) {
  document.querySelectorAll('.main-panel').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.main-tab').forEach(function(t) { t.classList.remove('active'); });
  document.getElementById('panel-' + idx).classList.add('active');
  document.querySelectorAll('.main-tab')[idx].classList.add('active');
  // 패널 상단으로 즉시 스크롤
  var panel = document.getElementById('panel-' + idx);
  var tabsEl = document.getElementById('mainTabs');
  var tabsHeight = tabsEl.offsetHeight;
  window.scrollTo(0, panel.offsetTop - tabsHeight);

  // Re-trigger reveal animations for newly visible content
  setTimeout(function() {
    document.querySelectorAll('#panel-' + idx + ' .reveal').forEach(function(el) {
      el.classList.add('visible');
    });
  }, 100);
}

// Functions from Vibe Coding
function toggleDetail(btn){var d=btn.nextElementSibling;d.classList.toggle('open');btn.textContent=d.classList.contains('open')?'▴ 접기':'▾ 더 보기'}
function togglePopup(trigger){event.stopPropagation();var popup=trigger.nextElementSibling;document.querySelectorAll('.tip-popup.show').forEach(function(p){if(p!==popup)p.classList.remove('show')});popup.classList.toggle('show')}
document.addEventListener('click',function(e){if(!e.target.closest('.term-tip')){document.querySelectorAll('.tip-popup.show').forEach(function(p){p.classList.remove('show')})}})
function toggleWf(step){var detail=step.querySelector('.wf-detail');var arrow=step.querySelector('.wf-arrow');var isOpen=detail.style.display==='block';document.querySelectorAll('.wf-step .wf-detail').forEach(function(d){d.style.display='none'});document.querySelectorAll('.wf-step .wf-arrow').forEach(function(a){a.style.transform='rotate(0deg)'});if(!isOpen){detail.style.display='block';arrow.style.transform='rotate(180deg)'}}
function switchTab(e,id){var c=e.target.closest('.tabs');c.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active')});c.querySelectorAll('.tab-pane').forEach(function(p){p.classList.remove('active')});e.target.classList.add('active');document.getElementById(id).classList.add('active')}

const layerHTML=[
`<div style="font-family:sans-serif;padding:24px;background:#fff;color:#111"><h1>프로젝트 대시보드</h1><p>현재 진행 중인 프로젝트 목록</p><hr><h2>디지털 전환 Phase 2</h2><p>클라이언트: 현대자동차</p><p>상태: 진행중 | 진행률: 68%</p><hr><h2>AI 도입 전략 수립</h2><p>클라이언트: 삼성전자</p><p>상태: 진행중 | 진행률: 42%</p><hr><button>새 프로젝트</button> <button>필터</button></div>`,

`<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0f1117;color:#e4e6f0;padding:24px}h1{font-size:22px;margin-bottom:4px;color:#fff}.sub{font-size:13px;color:#7d8298;margin-bottom:20px}.card{background:#1a1e2c;border:1px solid #2a2f45;border-radius:12px;padding:16px 20px;margin-bottom:12px}.card h2{font-size:15px;color:#fff;margin-bottom:8px}.row{display:flex;justify-content:space-between;font-size:12px;color:#7d8298;margin-bottom:10px}.bar-bg{height:8px;background:#252a3a;border-radius:4px;overflow:hidden}.bar-fill{height:100%;border-radius:4px}.bar-68{width:68%;background:linear-gradient(90deg,#7c6cf0,#a59cf8)}.bar-42{width:42%;background:linear-gradient(90deg,#2dd4bf,#5eead4)}.status{display:inline-block;font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(74,222,128,.12);color:#4ade80}.btns{display:flex;gap:8px;margin-top:16px}.btns button{font-size:12px;padding:8px 16px;border-radius:8px;border:none;cursor:pointer}.btn-p{background:#7c6cf0;color:#fff}.btn-s{background:#252a3a;color:#7d8298;border:1px solid #2a2f45}</style><h1>프로젝트 대시보드</h1><p class="sub">현재 진행 중인 프로젝트 목록</p><div class="card"><h2>디지털 전환 Phase 2</h2><div class="row"><span>현대자동차</span><span class="status">진행중</span></div><div class="row"><span>진행률</span><span>68%</span></div><div class="bar-bg"><div class="bar-fill bar-68"></div></div></div><div class="card"><h2>AI 도입 전략 수립</h2><div class="row"><span>삼성전자</span><span class="status">진행중</span></div><div class="row"><span>진행률</span><span>42%</span></div><div class="bar-bg"><div class="bar-fill bar-42"></div></div></div><div class="btns"><button class="btn-p">+ 새 프로젝트</button><button class="btn-s">필터</button></div>`,

`<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0f1117;color:#e4e6f0;padding:24px}h1{font-size:22px;margin-bottom:4px;color:#fff}.sub{font-size:13px;color:#7d8298;margin-bottom:16px}.filters{display:flex;gap:6px;margin-bottom:16px}.filters button{font-size:11px;padding:5px 12px;border-radius:16px;border:1px solid #2a2f45;background:#1a1e2c;color:#7d8298;cursor:pointer;transition:all .3s}.filters button:hover,.filters button.active{background:#7c6cf0;color:#fff;border-color:#7c6cf0}.card{background:#1a1e2c;border:1px solid #2a2f45;border-radius:12px;padding:16px 20px;margin-bottom:12px;transition:all .3s;cursor:pointer}.card:hover{border-color:#7c6cf0;transform:translateY(-2px);box-shadow:0 4px 15px rgba(0,0,0,.3)}.card h2{font-size:15px;color:#fff;margin-bottom:8px}.row{display:flex;justify-content:space-between;font-size:12px;color:#7d8298;margin-bottom:10px}.bar-bg{height:8px;background:#252a3a;border-radius:4px;overflow:hidden}.bar-fill{height:100%;border-radius:4px;transition:width 1s ease}.status{display:inline-block;font-size:11px;padding:2px 8px;border-radius:10px}.s-a{background:rgba(74,222,128,.12);color:#4ade80}.s-c{background:rgba(96,165,250,.12);color:#60a5fa}.btns{display:flex;gap:8px;margin-top:16px}.btns button{font-size:12px;padding:8px 16px;border-radius:8px;border:none;cursor:pointer;transition:all .2s}.btn-p{background:#7c6cf0;color:#fff}.btn-p:hover{background:#6c5ce7;transform:scale(1.03)}.toast{position:fixed;bottom:20px;right:20px;background:#1a1e2c;border:1px solid #4ade80;color:#4ade80;padding:10px 16px;border-radius:10px;font-size:12px;display:none;animation:fi .3s}@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}</style><h1>프로젝트 대시보드</h1><p class="sub">현재 진행 중인 프로젝트 목록</p><div class="filters"><button class="active" onclick="fa()">전체</button><button onclick="fs(this,'a')">진행중</button><button onclick="fs(this,'c')">완료</button></div><div id="cards"></div><div class="btns"><button class="btn-p" onclick="st('✨ 새 프로젝트가 추가되었습니다!')">+ 새 프로젝트</button></div><div class="toast" id="toast"></div><script>const P=[{n:'디지털 전환 Phase 2',cl:'현대자동차',s:'a',p:68,co:'linear-gradient(90deg,#7c6cf0,#a59cf8)'},{n:'AI 도입 전략 수립',cl:'삼성전자',s:'a',p:42,co:'linear-gradient(90deg,#2dd4bf,#5eead4)'},{n:'클라우드 마이그레이션',cl:'LG화학',s:'c',p:100,co:'linear-gradient(90deg,#60a5fa,#93c5fd)'}];function r(l){const c=document.getElementById('cards');c.innerHTML='';l.forEach((x,i)=>{const d=document.createElement('div');d.className='card';d.onclick=()=>st(x.n+' 상세 페이지로 이동');const sl=x.s==='a'?'s-a':'s-c';const sn=x.s==='a'?'진행중':'완료';d.innerHTML='<h2>'+x.n+'</h2><div class=row><span>'+x.cl+'</span><span class="status '+sl+'">'+sn+'</span></div><div class=row><span>진행률</span><span>'+x.p+'%</span></div><div class=bar-bg><div class=bar-fill style="width:0;background:'+x.co+'"></div></div>';c.appendChild(d);setTimeout(()=>d.querySelector('.bar-fill').style.width=x.p+'%',80+i*150)})}function fa(){document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));document.querySelector('.filters button').classList.add('active');r(P)}function fs(b,s){document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');r(P.filter(x=>x.s===s))}function st(m){const t=document.getElementById('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2500)}r(P)<\/script>`
];

const layerExp=[
'<strong style="color:var(--teal)">1단계: HTML만</strong> — 구조만 있고 디자인이 전혀 없는 상태입니다. 브라우저 기본 스타일만 적용되어 1990년대 웹사이트 느낌이에요. 제목, 문단, 버튼 등 <strong>"무엇이 있는지"</strong>만 정의합니다. 못생겼지만, 웹페이지의 핵심 뼈대가 여기에 다 있어요.',
'<strong style="color:var(--accent-light)">2단계: + CSS</strong> — 같은 HTML에 CSS를 입히자 완전히 다른 모습이 됩니다! 다크 모드 배경, 카드 레이아웃, 진행률 바, 정돈된 여백... <strong>"어떻게 보이는지"</strong>를 CSS가 결정합니다. 내용은 1단계와 완전히 똑같은데 디자인만 바뀐 겁니다.',
'<strong style="color:var(--amber)">3단계: + JavaScript</strong> — 이제 <strong>클릭하면 반응하는 살아있는 페이지</strong>가 됩니다! 위의 필터 버튼(진행중/완료)을 눌러보세요. 진행률 바가 애니메이션으로 채워지고, 카드를 클릭하면 알림이 뜹니다. <strong>"어떻게 동작하는지"</strong>를 JavaScript가 담당합니다.'
];

function switchLayer(i,btn){document.querySelectorAll('.layer-tab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');document.getElementById('layerFrame').srcdoc=layerHTML[i];document.getElementById('layerExplain').innerHTML=layerExp[i]}
document.getElementById('layerFrame').srcdoc=layerHTML[0];document.getElementById('layerExplain').innerHTML=layerExp[0];

// Checklist handler
document.querySelectorAll('.chk').forEach(function(c){
  c.addEventListener('click',function(){
    c.classList.toggle('on');
    c.querySelector('.chk-box').textContent=c.classList.contains('on')?'✓':'';
  });
});

// Smooth scroll for nav links
document.querySelectorAll('.part-nav a, .ch-nav a, .hero-nav a').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Progress bar + scroll-top
window.addEventListener('scroll', function() {
  var s = document.documentElement.scrollTop;
  var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById('progressBar').style.width = (s / h * 100) + '%';
  document.getElementById('scrollTop').classList.toggle('visible', s > 500);
});

// IntersectionObserver for reveal animations
var obs = new IntersectionObserver(function(e) {
  e.forEach(function(x) { if (x.isIntersecting) x.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .diagram, .compare-card, .callout, .quote-block').forEach(function(el) { obs.observe(el); });
// Make overview panel elements visible immediately
document.querySelectorAll('#panel-0 .reveal').forEach(function(el) { el.classList.add('visible'); });
