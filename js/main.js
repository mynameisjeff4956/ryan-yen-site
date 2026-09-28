// ----- tabs (URL hash keeps the current tab on refresh) -----
const tabs=[...document.querySelectorAll('[data-tab]')],panes=[...document.querySelectorAll('main > section')];
function show(id){
  if(!document.getElementById(id))id='home';
  panes.forEach(p=>p.hidden=p.id!==id);
  tabs.forEach(t=>t.setAttribute('aria-selected',t.dataset.tab===id));
  try{history.replaceState(null,'','#'+id)}catch(e){}
  window.scrollTo(0,0);
  if(id==='typing')document.getElementById('typeIn').focus();
}
tabs.forEach(t=>t.onclick=()=>show(t.dataset.tab));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
show(location.hash.slice(1)||'home');

// ----- typing test -----
const texts=[
 "I was born in Taiwan and now I live in Vancouver. I like badminton, games and building cool things with AI.",
 "Every big win starts with a small habit. Keep practicing, keep playing, and never stop building.",
 "The bed is safe, the bridge is built, and the last fight is about to begin. Stay calm and swing."
];
const prompt_=document.getElementById('prompt'),input=document.getElementById('typeIn'),
      wpm=document.getElementById('wpm'),acc=document.getElementById('acc');
let text,start,typed,best=0;
function reset(){
  text=texts[Math.floor(Math.random()*texts.length)];start=null;typed=0;input.value='';input.disabled=false;
  wpm.textContent=0;acc.textContent=100;render('');input.focus();
}
function render(v){
  prompt_.innerHTML=[...text].map((c,i)=>{
    const cls=i<v.length?(v[i]===c?'ok':'bad'):(i===v.length?'cur':'');
    return `<span class="${cls}">${c===' '&&cls==='bad'?'&nbsp;':c}</span>`;
  }).join('');
}
input.addEventListener('input',()=>{
  const v=input.value;if(!start)start=Date.now();
  if(v.length>text.length){input.value=v.slice(0,text.length);return}
  render(v);
  let right=0;for(let i=0;i<v.length;i++)if(v[i]===text[i])right++;
  const mins=(Date.now()-start)/60000||1/60000;
  wpm.textContent=Math.round((right/5)/mins);
  acc.textContent=v.length?Math.round(right/v.length*100):100;
  if(v.length===text.length){
    input.disabled=true;
    best=Math.max(best,+wpm.textContent);document.getElementById('best').textContent=best;
  }
});
document.getElementById('again').onclick=reset;
reset();

// ----- ryan quiz -----
const quiz=document.getElementById('ryanQuiz'),quizResult=document.getElementById('quizResult'),quizSubmit=document.getElementById('quizSubmit'),quizReset=document.getElementById('quizReset');
if(quiz&&quizResult&&quizSubmit&&quizReset){
  quiz.addEventListener('click',e=>{
    const btn=e.target.closest('.quiz-option');
    if(!btn)return;
    const q=btn.closest('.quiz-q');
    if(!q)return;
    q.querySelectorAll('.quiz-option').forEach(o=>{
      o.setAttribute('aria-pressed','false');
      o.classList.remove('correct','wrong');
    });
    btn.setAttribute('aria-pressed','true');
  });

  quizSubmit.onclick=()=>{
    const qs=[...quiz.querySelectorAll('.quiz-q')];
    let score=0,answered=0;
    qs.forEach(q=>{
      const selected=q.querySelector('.quiz-option[aria-pressed="true"]');
      if(!selected)return;
      answered++;
      const ok=selected.dataset.correct==='true';
      if(ok){score++;selected.classList.add('correct');}
      else selected.classList.add('wrong');
    });
    if(answered<qs.length){
      quizResult.textContent=`You answered ${answered}/${qs.length}. Pick one option for every question.`;
      return;
    }
    const pct=Math.round(score/qs.length*100);
    quizResult.textContent=`Score: ${score}/${qs.length} (${pct}%). ${score===qs.length?'Perfect! You know Ryan really well.':'Nice run! Try reset and go for a perfect score.'}`;
  };

  quizReset.onclick=()=>{
    quiz.querySelectorAll('.quiz-option').forEach(o=>{
      o.setAttribute('aria-pressed','false');
      o.classList.remove('correct','wrong');
    });
    quizResult.textContent='Pick one answer for each question, then check your score.';
  };
}
