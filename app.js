const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const KEY="mindpath_ai_clean_v1";
const defaults={xp:0,streak:0,lastStudy:null,completed:0,tests:0,englishDone:0,week:[0,0,0,0,0,0,0],dark:false};
let state={...defaults,...(JSON.parse(localStorage.getItem(KEY)||"null")||{})};
const subjects=["Mathematics","English","Reasoning","Science","Hindi","Social Science","General Knowledge","Computer Science","Physics","Chemistry","Biology"];
const icons={Mathematics:"➗",English:"🇬🇧",Reasoning:"🧠",Science:"🔬",Hindi:"अ","Social Science":"🌍","General Knowledge":"🌐","Computer Science":"💻",Physics:"⚛️",Chemistry:"🧪",Biology:"🧬"};
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>x.classList.remove("show"),2200)}
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}function pick(a){return a[rand(0,a.length-1)]}function shuffle(a){return [...a].sort(()=>Math.random()-.5)}function mcq(q,o,a,e){return{q,o,a,e}}function num(a,b){return rand(a,b)}
function shuffledMCQ(q,correct,distractors,e){const c=String(correct),o=shuffle([c,...distractors.map(String)]);return mcq(q,o,o.indexOf(c),e)}
function mathQ(level="Medium"){const hard=level==="Hard",easy=level==="Easy",type=rand(0,4);if(type===0){const a=num(easy?2:5,hard?30:18),b=num(easy?2:5,hard?30:18),op=pick(["+","−","×"]),ans=op==="+"?a+b:op==="−"?a-b:a*b;return shuffledMCQ(`What is ${a} ${op} ${b}?`,ans,[ans+2,ans-3,ans+7],`Calculate ${a} ${op} ${b}.`)}if(type===1){const p=num(5,90),base=num(40,500),ans=Number((base*p/100).toFixed(2));return shuffledMCQ(`What is ${p}% of ${base}?`,ans,[ans+p,Math.round(ans/2),ans*2],`${p}% = ${p}/100, so ${base} × ${p}/100 = ${ans}.`)}if(type===2){const a=num(2,12),x=num(2,15),b=num(1,20),c=a*x+b;return shuffledMCQ(`Solve: ${a}x + ${b} = ${c}.`,`x = ${x}`,[`x = ${x+1}`,`x = ${x-1}`,`x = ${a+x}`],`Subtract ${b}, then divide by ${a}.`)}if(type===3){const w=num(4,20),h=num(3,18),ans=w*h;return shuffledMCQ(`A rectangle is ${w} cm wide and ${h} cm long. What is its area?`,`${ans} cm²`,[`${w+h} cm²`,`${2*(w+h)} cm²`,`${ans+10} cm²`],`Area = length × width = ${h} × ${w} = ${ans} cm².`)}const n=num(2,9),ans=n*n;return shuffledMCQ(`What is ${n}²?`,ans,[n*2,ans+n,ans+n+2],`${n}² means ${n} × ${n} = ${ans}.`)}
function englishQ(){return pick([mcq("Choose the correct sentence.",["She go to school.","She goes to school.","She going school.","She gone school."],1,"With she/he/it in the simple present, use goes."),mcq("Choose the synonym of “happy”.",["angry","joyful","careless","quiet"],1,"Joyful has a similar meaning to happy."),mcq("Choose the correct article: ___ apple a day.",["A","An","The","No article"],1,"Use “an” before a vowel sound."),mcq("What is the past tense of “write”?",["writed","written","wrote","writing"],2,"The simple past of write is wrote."),mcq("Choose the correct word: They ___ playing.",["is","am","are","be"],2,"They takes the plural verb are.")])}
function reasoningQ(){const n=num(2,12),step=num(2,9),seq=[n,n+step,n+2*step,n+3*step],ans=n+4*step;return shuffledMCQ(`Find the next number: ${seq.join(", ")}, ?`,ans,[ans+step,ans-step,ans+2],`The pattern adds ${step} each time.`)}
function scienceQ(){return pick([mcq("Which organ helps humans breathe?",["Heart","Lungs","Kidney","Stomach"],1,"The lungs exchange oxygen and carbon dioxide."),mcq("Which gas do plants mainly use during photosynthesis?",["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],2,"Plants use carbon dioxide during photosynthesis."),mcq("Which form of energy is associated with motion?",["Kinetic","Chemical","Nuclear","Potential"],0,"Kinetic energy is energy of motion.")])}
function hindiQ(){return pick([mcq("“जल” का पर्यायवाची क्या है?",["अग्नि","पानी","आकाश","वायु"],1,"जल और पानी समान अर्थ वाले शब्द हैं।"),mcq("“दिन” का विलोम क्या है?",["सुबह","रात","समय","प्रकाश"],1,"दिन का विलोम रात है।")])}
function sstQ(){return pick([mcq("भारत का संविधान कब लागू हुआ?",["15 August 1947","26 January 1950","2 October 1950","26 November 1949"],1,"The Constitution came into force on 26 January 1950."),mcq("Which is a renewable source of energy?",["Coal","Petroleum","Solar energy","Natural gas"],2,"Solar energy is naturally replenished.")])}
function gkQ(){return pick([mcq("How many continents are commonly recognized?",["5","6","7","8"],2,"There are seven continents."),mcq("Which planet is known as the Red Planet?",["Venus","Mars","Jupiter","Mercury"],1,"Mars is commonly called the Red Planet."),mcq("How many days are in a leap year?",["364","365","366","367"],2,"A leap year has 366 days.")])}
function computerQ(){return pick([mcq("Which device is mainly used to type text?",["Monitor","Keyboard","Speaker","Printer"],1,"A keyboard is an input device."),mcq("CPU stands for:",["Central Processing Unit","Computer Power Unit","Central Program Utility","Control Processing User"],0,"CPU means Central Processing Unit.")])}
function physicsQ(){const m=num(2,10),a=num(2,8),f=m*a;return shuffledMCQ(`If mass = ${m} kg and acceleration = ${a} m/s², what is force?`,`${f} N`,[`${m+a} N`,`${f+2} N`,`${a} N`],`F = ma = ${m} × ${a} = ${f} N.`)}
function biologyQ(){return pick([mcq("The basic unit of life is the:",["Tissue","Organ","Cell","Atom"],2,"The cell is the basic structural and functional unit of life."),mcq("Which organ pumps blood around the body?",["Lung","Heart","Liver","Brain"],1,"The heart pumps blood.")])}
function chemistryQ(){return pick([mcq("A substance with pH below 7 is generally:",["Acidic","Neutral","Basic","Metallic"],0,"A pH below 7 is acidic."),mcq("Which particle has a negative charge?",["Proton","Neutron","Electron","Nucleus"],2,"Electrons have negative charge."),mcq("Water has the chemical formula:",["CO₂","H₂O","O₂","NaCl"],1,"Water is H₂O.")])}
function questionFor(s,l="Medium"){return({Mathematics:()=>mathQ(l),English:englishQ,Reasoning:reasoningQ,Science:scienceQ,Hindi:hindiQ,"Social Science":sstQ,"General Knowledge":gkQ,"Computer Science":computerQ,Physics:physicsQ,Chemistry:chemistryQ,Biology:biologyQ}[s]||(()=>mathQ(l)))()}
function questionKey(q){return`${q.q}||${q.o.join("|")}||${q.a}`.toLowerCase()}
function generate(subject,count=10,level="Medium",forTest=false){const keyName=`used_${subject}`,used=forTest?(state[keyName]||[]):[],out=[],seen=new Set(used);for(let tries=0;out.length<count&&tries<count*300;tries++){const q=questionFor(subject,level),key=questionKey(q);if(seen.has(key))continue;seen.add(key);q.id=crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`;out.push(q)}if(forTest){state[keyName]=[...used,...out.map(questionKey)].slice(-5000);save()}return out}
function questionHTML(q,i){return`<article class="question" data-qid="${q.id}"><div class="qtop"><span>Question ${i+1}</span><span>+10 XP</span></div><h3>${q.q}</h3><div class="opts">${q.o.map((o,j)=>`<button class="opt" type="button" data-opt="${j}">${String.fromCharCode(65+j)}. ${o}</button>`).join("")}</div><div class="explain hidden" data-exp>💡 ${q.e}</div></article>`}
function studyActivity(xp=5){state.xp+=xp;state.completed++;const d=new Date().toISOString().slice(0,10);if(state.lastStudy!==d){state.streak=Math.max(1,state.streak+1);state.lastStudy=d;const idx=(new Date().getDay()+6)%7;state.week[idx]=Math.min(12,(state.week[idx]||0)+1)}save();renderDashboard()}
function bindQuestions(qs,id){const container=$("#"+id);container.querySelectorAll("[data-qid]").forEach(card=>{const q=qs.find(x=>x.id===card.dataset.qid);card.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{if(card.dataset.done==="1")return;const selected=Number(btn.dataset.opt),ok=selected===q.a;card.dataset.done="1";card.dataset.correct=ok?"1":"0";card.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(Number(x.dataset.opt)===q.a)x.classList.add("correct")});if(!ok)btn.classList.add("wrong");card.querySelector("[data-exp]").classList.remove("hidden");studyActivity(ok?10:3);toast(ok?"Correct • +10 XP":"Answer checked • +3 XP")})})}
function renderPractice(){const s=$("#subjectSelect").value,c=Number($("#countSelect").value),l=$("#levelSelect").value,qs=generate(s,c,l,false);$("#setMeta").innerHTML=`<span>${icons[s]} ${s}</span><span>${c} fresh questions</span><span>${l}</span>`;$("#practiceList").innerHTML=qs.map(questionHTML).join("");bindQuestions(qs,"practiceList")}
function bindTest(qs){$("#testQs").querySelectorAll("[data-qid]").forEach((card,i)=>{const q=qs[i];card.querySelectorAll(".opt").forEach(btn=>btn.onclick=()=>{if(card.dataset.done==="1")return;const selected=Number(btn.dataset.opt),ok=selected===q.a;card.dataset.done="1";card.dataset.correct=ok?"1":"0";card.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(Number(x.dataset.opt)===q.a)x.classList.add("correct")});if(!ok)btn.classList.add("wrong");card.querySelector("[data-exp]").classList.remove("hidden");$("#testProgress").textContent=`${$("#testQs").querySelectorAll("[data-done='1']").length} / ${qs.length} answered`})})}
function startTest(subject){const qs=generate(subject,30,"Medium",true);if(qs.length<30){toast("Could not create 30 unique questions for this subject.");return}const area=$("#testArea");area.classList.remove("hidden");let seconds=1800,submitted=false;area.innerHTML=`<div class="test-head"><div><span class="eyebrow">FREE MOCK TEST</span><h2>${icons[subject]} ${subject}</h2><p>30 fresh questions • 30 minutes</p></div><div class="timer" id="testTimer">30:00</div><button class="btn secondary" id="closeTest">Close</button></div><div class="test-progress"><span id="testProgress">0 / 30 answered</span><span>Submit when ready</span></div><div id="testQs" class="question-list">${qs.map(questionHTML).join("")}</div><button class="btn primary" id="submitTest">Submit Test</button><div id="testResult"></div>`;bindTest(qs);const timer=setInterval(()=>{if(submitted){clearInterval(timer);return}seconds--;$("#testTimer").textContent=`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;if(seconds<=0)submit()},1000);$("#closeTest").onclick=()=>{clearInterval(timer);area.classList.add("hidden")};$("#submitTest").onclick=()=>{clearInterval(timer);submit()};function submit(){if(submitted)return;submitted=true;let score=0,answered=0;qs.forEach((q,i)=>{const card=$("#testQs").querySelectorAll("[data-qid]")[i];if(card.dataset.done==="1"){answered++;if(card.dataset.correct==="1")score++}});const wrong=answered-score,unanswered=30-answered,percent=Math.round(score/30*100),xp=score*5;state.tests++;state.xp+=xp;save();renderDashboard();$("#testResult").innerHTML=`<div class="result"><div class="score-ring"><b>${percent}%</b><small>${score}/30</small></div><div><strong>Test completed</strong><div>${score} correct • ${wrong} wrong • ${unanswered} unanswered</div><small>+${xp} XP</small></div><button class="btn primary small" id="newTest">New Test</button></div>`;$("#submitTest").disabled=true;toast(`Test submitted • ${score}/30`);$("#newTest").onclick=()=>startTest(subject)}}
const courses=[["📚","School Foundations","Class 1–5","Maths, English, EVS and fun practice."],["🎓","School Mastery","Class 6–10","Concepts, revision and board-style practice."],["🏆","Senior Secondary","Class 11–12","Subject-focused practice."],["🎯","Competitive Prep","Reasoning + aptitude","Timed practice for common patterns."],["🇬🇧","English Journey","30-day challenge","Vocabulary, grammar and reading."],["💻","Digital Skills","Computer basics","Practical computer concepts."]];
function renderCourses(){$("#courseGrid").innerHTML=courses.map(x=>`<article class="course-card"><div class="course-icon">${x[0]}</div><span class="tag">${x[2]}</span><h3>${x[1]}</h3><p>${x[3]}</p><a class="text-link" href="#practice">Explore →</a></article>`).join("")}
const lessonTopics=["Greetings & introductions","Everyday vocabulary","Present simple","Pronouns","Articles","Daily routines","Questions & answers","Past simple","Future forms","Adjectives","Prepositions","Comparatives","Reading mini-story","Listening-style practice","Common verbs","Modal verbs","Countable & uncountable","Sentence building","Synonyms","Antonyms","Conversation practice","Grammar mix","Short writing","Error spotting","Revision 1","Revision 2","Reading challenge","Speaking prompts","Final practice","Day 30 review"];
const englishBank={
 grammar:[mcq("Choose the correct sentence.",["She go to school.","She goes to school.","She going school.","She gone school."],1,"With she/he/it in the simple present, use goes."),mcq("Choose the correct word: They ___ playing.",["is","am","are","be"],2,"They takes the plural verb are."),mcq("Choose the past tense of write.",["writed","written","wrote","writing"],2,"The simple past of write is wrote.")],
 vocabulary:[mcq("Choose the synonym of happy.",["angry","joyful","careless","quiet"],1,"Joyful has a similar meaning to happy."),mcq("Choose the antonym of early.",["late","fast","quick","soon"],0,"The opposite of early is late."),mcq("Which word means very small?",["tiny","huge","heavy","wide"],0,"Tiny means very small.")],
 reading:[mcq("Read: Riya studies for 30 minutes every evening. What does she do every evening?",["Plays football","Studies","Sleeps","Travels"],1,"The passage says she studies every evening."),mcq("Read: The sky was dark, so Aman carried an umbrella. Why did Aman carry it?",["It was sunny","The sky was dark","He was swimming","He was late"],1,"The dark sky suggests possible rain.")],
 speaking:[mcq("Which is a polite way to ask for help?",["Give me that.","Help now!","Could you please help me?","You help me."],2,"“Could you please…” is a polite request."),mcq("Choose the best greeting for a teacher in the morning.",["Hey dude!","Good morning, ma'am/sir.","What's up bro?","Yo!"],1,"A respectful greeting is appropriate at school.")],
 mixed:[]
};
englishBank.mixed=[...englishBank.grammar,...englishBank.vocabulary,...englishBank.reading,...englishBank.speaking];
function englishLessonQSet(skill="mixed",level="Medium"){
  let bank=[...(englishBank[skill]||englishBank.mixed)];
  if(level==="Hard" && skill==="grammar") bank.push(
    mcq("Choose the correct sentence.",["If I had known, I would have called you.","If I know, I would called you.","If I had knew, I will call you.","If I knowed, I would call you."],0,"The third conditional uses had + past participle and would have + past participle."),
    mcq("Choose the correct reported speech.",["She said that she was tired.","She said that she is tired yesterday.","She say that she was tired.","She said she tired."],0,"After a past reporting verb, the tense commonly shifts back: was tired."),
    mcq("Choose the correct conditional.",["If it rains, we will stay home.","If it will rain, we stay home.","If it rained, we will stayed home.","If it rain, we would stays home."],0,"The first conditional uses if + present simple, then will + base verb.")
  );
  bank=shuffle(bank);
  const out=[];const seen=new Set();
  for(const q of bank){const k=questionKey(q);if(!seen.has(k)){seen.add(k);out.push({...q,o:[...q.o]});}if(out.length===5)break;}
  while(out.length<5){const q=pick(bank);out.push({...q,o:[...q.o]});}
  return out;
}
function fillEnglishDaySelect(){
  const el=$("#englishDay");
  el.innerHTML=lessonTopics.map((t,i)=>`<option value="${i+1}">Day ${i+1} — ${t}</option>`).join("");
  const wanted=Number(el.dataset.pending||Math.min(state.englishDone+1,30));
  el.value=String(Math.max(1,Math.min(30,wanted)));
}
function renderEnglishLesson(qs,day){
  const box=$("#englishLesson"); box.classList.remove("hidden"); box.dataset.done="0";
  let score=0,answered=0;
  box.innerHTML=`<div class="english-lesson-head"><div><span class="tag">DAY ${day} • 5 QUESTIONS</span><h3>${lessonTopics[day-1]}</h3><p>Answer all 5 questions. You can choose any day from the selector.</p></div><button class="btn secondary small" id="closeEnglish" type="button">Close</button></div><div class="english-progress-row"><span id="engLessonCount">0 / 5 answered</span><span id="engLessonScore">Score: 0/5</span></div><div class="english-q-list">${qs.map((q,qi)=>`<article class="english-q" data-eng-card="${qi}"><div class="qtop"><span>Question ${qi+1}</span><span>+10 XP</span></div><h3>${q.q}</h3><div class="opts">${q.o.map((o,i)=>`<button class="opt" type="button" data-eng-opt="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}</div><div class="explain hidden" data-eng-exp>💡 ${q.e}</div></article>`).join("")}<div class="english-result hidden" id="englishResult"><strong id="englishResultTitle"></strong><p id="englishResultText"></p><div><button class="btn secondary small" id="retryEnglish" type="button">Retry lesson</button> <button class="btn primary small" id="nextEnglish" type="button">Next day →</button></div></div></div>`;
  box.querySelectorAll("[data-eng-card]").forEach((card,qi)=>{
    const q=qs[qi];
    card.querySelectorAll("[data-eng-opt]").forEach(btn=>btn.onclick=()=>{
      if(card.dataset.done==="1") return;
      card.dataset.done="1"; answered++;
      const idx=Number(btn.dataset.engOpt),ok=idx===q.a;
      if(ok) score++;
      card.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(Number(x.dataset.engOpt)===q.a)x.classList.add("correct")});
      if(!ok) btn.classList.add("wrong");
      card.querySelector("[data-eng-exp]").classList.remove("hidden");
      $("#engLessonCount").textContent=`${answered} / 5 answered`;
      $("#engLessonScore").textContent=`Score: ${score}/5`;
      if(answered===5){
        state.englishDone=Math.max(state.englishDone,day); state.xp+=score*5+10; save(); renderLessons(); renderDashboard();
        $("#englishResultTitle").textContent=score>=4?"Great work! 🎉":score>=3?"Nice effort! 👍":"Good practice — keep going! 💪";
        $("#englishResultText").textContent=`You scored ${score}/5. Review the explanations above, then continue to another day.`;
        $("#englishResult").classList.remove("hidden");
        toast(`English Day ${day} complete • +${score*5+10} XP`);
      }
    });
  });
  $("#closeEnglish").onclick=()=>box.classList.add("hidden");
  $("#retryEnglish").onclick=()=>startEnglishLesson();
  $("#nextEnglish").onclick=()=>{const next=Math.min(30,day+1);$("#englishDay").dataset.pending=String(next);$("#englishDay").value=String(next);startEnglishLesson();};
}
function startEnglishLesson(){
  const day=Math.max(1,Math.min(30,Number($("#englishDay").value)||1));
  const skill=$("#englishSkill").value,level=$("#englishLevel").value;
  renderEnglishLesson(englishLessonQSet(skill,level),day);
}
function renderLessons(){
  const done=state.englishDone;
  $("#englishProgress").textContent=`${Math.min(done+1,30)} / 30 recommended next day`;
  $("#engStreak").textContent=`${state.streak} day streak`;
  $("#engBar").style.width=`${Math.min(done/30*100,100)}%`;
  $("#lessonGrid").innerHTML=lessonTopics.map((t,i)=>{const n=i+1,complete=n<=done;return`<button class="lesson ${complete?"complete":""}" data-day="${n}" type="button"><span>${complete?"✓":n}</span><div><b>Day ${n}</b><small>${t}</small></div><em>${complete?"✓":"→"}</em></button>`}).join("");
  $("#lessonGrid").querySelectorAll("[data-day]").forEach(btn=>btn.onclick=()=>{$("#englishDay").dataset.pending=btn.dataset.day;$("#englishDay").value=btn.dataset.day;startEnglishLesson();});
  fillEnglishDaySelect();
}

// Question-paper library: broad board catalogue with official-source links where known.
const boardCatalog=[
 {name:"CBSE",classes:[10,12],years:[2004,2026],url:"https://www.cbse.gov.in/cbsenew/question-paper.html",note:"Official CBSE previous-year paper page"},
 {name:"Maharashtra SSC",classes:[10],years:[2007,2026],url:"https://www.mahahsscboard.in/en/questionPaper",note:"Official Maharashtra Board question-paper portal"},
 {name:"Maharashtra HSC",classes:[12],years:[2007,2026],url:"https://www.mahahsscboard.in/en/questionPaper",note:"Official Maharashtra Board question-paper portal"},
 {name:"ICSE",classes:[9,10],years:[2005,2026],url:"https://cisce.org/",note:"Official CISCE portal"},
 {name:"ISC",classes:[11,12],years:[2010,2026],url:"https://cisce.org/",note:"Official CISCE portal"},
 {name:"Tamil Nadu State Board",classes:[10,12],years:[2010,2026],url:"https://www.dge.tn.gov.in/",note:"Directorate of Government Examinations"},
 {name:"Karnataka State Board",classes:[10,12],years:[2010,2026],url:"https://kseab.karnataka.gov.in/",note:"Karnataka School Examination and Assessment Board"},
 {name:"Kerala State Board",classes:[10,12],years:[2010,2026],url:"https://pareekshabhavan.kerala.gov.in/",note:"Kerala Pareeksha Bhavan"},
 {name:"Gujarat State Board",classes:[10,12],years:[2010,2026],url:"https://www.gseb.org/",note:"Gujarat Secondary and Higher Secondary Education Board"},
 {name:"Rajasthan Board",classes:[10,12],years:[2010,2026],url:"https://rajeduboard.rajasthan.gov.in/",note:"Board of Secondary Education Rajasthan"},
 {name:"Madhya Pradesh Board",classes:[10,12],years:[2010,2026],url:"https://mpbse.nic.in/",note:"MP Board official portal"},
 {name:"Uttar Pradesh Board",classes:[10,12],years:[2010,2026],url:"https://upmsp.edu.in/",note:"UPMSP official portal"},
 {name:"Bihar Board",classes:[10,12],years:[2010,2026],url:"https://biharboardonline.bihar.gov.in/",note:"Bihar Board official portal"},
 {name:"West Bengal Board",classes:[10,12],years:[2010,2026],url:"https://wbbse.wb.gov.in/",note:"West Bengal Board official portal"},
 {name:"Punjab Board",classes:[10,12],years:[2010,2026],url:"https://www.pseb.ac.in/",note:"Punjab School Education Board"},
 {name:"Haryana Board",classes:[10,12],years:[2010,2026],url:"https://bseh.org.in/",note:"Board of School Education Haryana"},
 {name:"Telangana Board",classes:[10,12],years:[2010,2026],url:"https://bse.telangana.gov.in/",note:"Telangana board portal"},
 {name:"Andhra Pradesh Board",classes:[10,12],years:[2010,2026],url:"https://bse.ap.gov.in/",note:"AP board portal"},
 {name:"Odisha Board",classes:[10,12],years:[2010,2026],url:"https://bseodisha.ac.in/",note:"Board of Secondary Education Odisha"},
 {name:"Jharkhand Board",classes:[10,12],years:[2010,2026],url:"https://jac.jharkhand.gov.in/",note:"Jharkhand Academic Council"},
 {name:"Chhattisgarh Board",classes:[10,12],years:[2010,2026],url:"https://cgbse.nic.in/",note:"Chhattisgarh Board official portal"}
];
const paperSubjects=["Mathematics","Science","English","Hindi","Social Science","Physics","Chemistry","Biology","Computer Science","Accountancy","Economics","Business Studies","History","Geography","Political Science"];
const papers=[];for(const b of boardCatalog){for(const cls of b.classes)for(let year=b.years[1];year>=b.years[0];year--)for(const subject of paperSubjects)papers.push({board:b.name,cls:`Class ${cls}`,subject,year:String(year),source:b.url,note:b.note});}
function renderPapers(){const b=$("#boardFilter").value,c=$("#paperClass").value,s=$("#paperSubject").value,y=$("#paperYear").value,search=($("#paperSearch")?.value||"").toLowerCase().trim();const arr=papers.filter(p=>(b==="All Boards"||p.board===b)&&(c==="All Classes"||p.cls===c)&&(s==="All Subjects"||p.subject===s)&&(y==="All Years"||p.year===y)&&(!search||`${p.board} ${p.cls} ${p.subject} ${p.year}`.toLowerCase().includes(search)));$("#paperCount").textContent=`${arr.length.toLocaleString()} catalogue entries`;$("#paperGrid").innerHTML=arr.slice(0,150).map(p=>`<article class="paper-row"><div><span class="paper-board">${p.board}</span><h3>${p.subject} — ${p.cls}</h3><p>${p.year} • ${p.note}</p></div><div class="paper-meta"><span>Previous paper</span><span>Source linked</span></div><div class="paper-actions"><a class="btn secondary small" href="${p.source}" target="_blank" rel="noopener">Official source</a><a class="btn primary small" href="#practice" data-paper-subject="${p.subject}">Practice</a></div></article>`).join("");if(!arr.length)$("#paperGrid").innerHTML=`<div class="paper-row"><div><h3>No paper found</h3><p>Try another board, class, subject or year.</p></div></div>`;$("#paperGrid").querySelectorAll("[data-paper-subject]").forEach(b=>b.onclick=()=>{if(subjects.includes(b.dataset.paperSubject))$("#subjectSelect").value=b.dataset.paperSubject;renderPractice();});}
function fillPaperFilters(){const boards=$("#boardFilter");boards.innerHTML='<option>All Boards</option>'+boardCatalog.map(x=>`<option>${x.name}</option>`).join("");$("#paperClass").innerHTML='<option>All Classes</option>'+Array.from({length:12},(_,i)=>`<option>Class ${i+1}</option>`).join("");$("#paperSubject").innerHTML='<option>All Subjects</option>'+paperSubjects.map(x=>`<option>${x}</option>`).join("");$("#paperYear").innerHTML='<option>All Years</option>'+Array.from({length:23},(_,i)=>`<option>${2026-i}</option>`).join("");}
function solveArithmetic(s){let m=s.match(/^\s*(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)\s*\??$/i);if(m)return`Step 1: ${m[1]}% = ${m[1]}/100.\nStep 2: (${m[1]}/100) × ${m[2]}.\nAnswer: ${Number(m[1])*Number(m[2])/100}.`;m=s.match(/^\s*(-?\d+(?:\.\d+)?)\s*([+\-×*/])\s*(-?\d+(?:\.\d+)?)\s*\??$/);if(m){const a=+m[1],b=+m[3],op=m[2];if(op==="/"&&b===0)return"Division by zero is not defined.";const ans=op==="+"?a+b:op==="-"?a-b:op==="×"||op==="*"?a*b:a/b;return`Calculate ${a} ${op} ${b}.\nAnswer: ${ans}.`}return null}
function tutorExplain(s){const low=s.toLowerCase();if(low.includes("photosynthesis"))return"Photosynthesis is the process by which green plants make food using light energy, carbon dioxide and water. Oxygen is released as a product. In simple form: light + carbon dioxide + water → glucose + oxygen.";if(low.includes("newton"))return"Newton’s laws describe motion. The second law is F = ma, meaning force depends on mass and acceleration.";if(low.includes("fraction"))return"A fraction represents part of a whole. In 3/4, 3 is the numerator and 4 is the denominator.";if(low.includes("grammar"))return"Grammar is the system of rules used to form sentences. Start by checking the subject, verb, tense and punctuation.";return`Here is a simple explanation:\n1. Identify the main concept in the question.\n2. Break it into smaller steps.\n3. Apply the relevant rule or formula.\n4. Check the final answer.\n\nIf you paste the exact question, I can explain it step by step.`}
let activeAiQuiz=null;
function quizAnswer(s){
  if(activeAiQuiz && /(?:^|\s)\d+\s*[abcd](?:\s|,|$)/i.test(s)){
    const answers={}; for(const m of s.matchAll(/(\d+)\s*([abcd])/gi)) answers[Number(m[1])]=m[2].toUpperCase();
    let score=0; const review=[];
    activeAiQuiz.forEach((q,i)=>{const n=i+1,got=answers[n];const correct=String.fromCharCode(65+q.a);if(got===correct)score++;if(got)review.push(`${n}. ${got===correct?"✓":"✗ (correct: "+correct+")"}`)});
    return `Quiz checked: ${score}/${activeAiQuiz.length} correct.\n${review.join("\n")}\n\nWant another quiz? Say “make 5 science questions”.`;
  }
  const n=(s.match(/\b(\d+)\b/)||[])[1]||5;const count=Math.max(1,Math.min(10,Number(n)));
  const subjectMatch=s.match(/(?:about|on|for)\s+(math(?:ematics)?|science|english|reasoning|physics|chemistry|biology|history|geography)/i);
  const subject=subjectMatch?({math:"Mathematics",mathematics:"Mathematics",science:"Science",english:"English",reasoning:"Reasoning",physics:"Physics",chemistry:"Chemistry",biology:"Biology",history:"Social Science",geography:"Social Science"}[subjectMatch[1].toLowerCase()]||$("#subjectSelect").value):$("#subjectSelect").value;
  activeAiQuiz=generate(subject,count,"Medium",false);
  return `Here is a ${count}-question ${subject} quiz:\n\n`+activeAiQuiz.map((q,i)=>`${i+1}. ${q.q}\nA. ${q.o[0]}  B. ${q.o[1]}  C. ${q.o[2]}  D. ${q.o[3]}`).join("\n\n")+"\n\nSend answers like 1B, 2A, 3D and I’ll check them.";
}
function grammarAnswer(s){if(/she go/i.test(s))return'Correction: “She goes to school.” With he/she/it in the simple present, the verb usually takes -s/-es.';if(/i has|he have|she have/i.test(s))return'Check subject–verb agreement: “I have”, “he has”, “she has”.';return'Grammar check: look at the subject, verb tense, agreement, article, preposition and punctuation. Paste the sentence you want corrected.'}
function translateAnswer(s){const m=s.match(/translate(?: this)?(?: to)?\s+(hindi|english|marathi)\s*[:\-]?\s*(.+)/i);if(m){const text=m[2];if(m[1].toLowerCase()==="hindi"&&/good morning/i.test(text))return'हिंदी: सुप्रभात।';if(m[1].toLowerCase()==="marathi"&&/good morning/i.test(text))return'मराठी: शुभ प्रभात.';if(m[1].toLowerCase()==="english")return`English: ${text}`;}return'Use: “translate to Hindi: Good morning” or paste the sentence you want translated.'}
function summaryAnswer(s){return'Quick summary method:\n• Topic: identify the main idea.\n• Key points: keep 3–5 important facts.\n• Evidence/examples: retain only what helps understanding.\n• Final line: state the takeaway.\n\nPaste your chapter or paragraph for a focused summary.'}
function planAnswer(s){return'Personal study plan:\n1. 25 min — learn one concept.\n2. 20 min — solve 5–10 questions.\n3. 10 min — check mistakes.\n4. 5 min — write a quick recap.\n\nTell me your class, subjects and exam date for a more specific plan.'}
function flashcardAnswer(s){return'Flashcard starter:\nFront: What is photosynthesis?\nBack: The process by which green plants make food using light, carbon dioxide and water.\n\nFront: What is kinetic energy?\nBack: Energy associated with motion.\n\nAsk for a topic to generate a focused set.'}
let aiMode='explain';const aiLabels={explain:'Explain mode',solve:'Solve mode',quiz:'Quiz maker',grammar:'Grammar coach',translate:'Translator',summary:'Summarizer',plan:'Study planner',flashcards:'Flashcard maker'};
function tutorAnswer(input){
  const text=input.trim(),low=text.toLowerCase(),calc=solveArithmetic(text);
  if(aiMode==='solve' || (!aiMode && calc)) return calc||solveWordProblem(text);
  if(aiMode==='explain'){
    if(calc) return calc;
    if(/what is|define|meaning|explain/i.test(text)) return tutorExplain(text);
    return tutorExplain(text);
  }
  if(aiMode==='solve') return solveWordProblem(text);
  if(aiMode==='quiz') return quizAnswer(text);
  if(aiMode==='grammar') return grammarAnswer(text);
  if(aiMode==='translate') return translateAnswer(text);
  if(aiMode==='summary') return summaryAnswer(text);
  if(aiMode==='plan') return planAnswer(text);
  if(aiMode==='flashcards') return flashcardAnswer(text);
  return tutorExplain(text);
}
function solveWordProblem(s){
  let m=s.match(/(?:total|altogether|in all)\\s+(?:is\\s+)?(\\d+)\\s*(?:and|\\+)\\s*(\\d+)/i);
  if(m)return`Add the two quantities: ${m[1]} + ${m[2]} = ${Number(m[1])+Number(m[2])}.`;
  m=s.match(/(\\d+(?:\\.\\d+)?)\\s*(?:km|kilometers?)\\s+.*?(\\d+(?:\\.\\d+)?)\\s*(?:km|kilometers?)/i);
  if(m)return`You have two distances: ${m[1]} km and ${m[2]} km. Their total is ${Number(m[1])+Number(m[2])} km.`;
  return'For a word problem, paste the complete question. I’ll identify the known values, choose the formula/operation, show the steps, and give the final answer.';
}
function addMessage(text,who='bot'){const box=$("#messages"),d=document.createElement('div');d.className=`bubble ${who}`;d.innerHTML=who==='bot'?'<b>Mindpath AI</b><p></p>':'<p></p>';d.querySelector('p').textContent=text;box.appendChild(d);box.scrollTop=box.scrollHeight}
function askTutor(){const input=$("#chatInput"),q=input.value.trim();if(!q)return;addMessage(q,'user');input.value='';setTimeout(()=>{addMessage(tutorAnswer(q));studyActivity(5)},80)}
function renderDashboard(){$("#xpTotal").textContent=state.xp;$("#heroXp").textContent=state.xp;$("#dashStreak").textContent=state.streak;$("#heroStreak").textContent=`${state.streak} day streak`;$("#completed").textContent=state.completed;$("#testsDone").textContent=state.tests;$("#weekBars").innerHTML=state.week.map((v,i)=>`<i style="height:${20+Math.min(v,10)*8}px"><small>${["M","T","W","T","F","S","S"][i]}</small></i>`).join("")}
$("#subjectSelect").innerHTML=subjects.map(s=>`<option>${s}</option>`).join("");$("#generateSet").onclick=renderPractice;$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");$("#themeBtn").onclick=()=>{state.dark=!state.dark;document.body.classList.toggle("dark",state.dark);save()};if(state.dark)document.body.classList.add("dark");
$("#testGrid").innerHTML=subjects.map(s=>`<article class="test-card"><div class="icon2">${icons[s]}</div><div><span class="tag">FREE • TIMED</span><h3>${s}</h3><p>30 questions • 30 min</p></div><button class="btn primary small" data-test="${s}">Start</button></article>`).join("");$("#testGrid").querySelectorAll("[data-test]").forEach(b=>b.onclick=()=>startTest(b.dataset.test));
["boardFilter","paperClass","paperSubject","paperYear"].forEach(id=>$("#"+id).onchange=renderPapers); $("#paperSearch").addEventListener("input",renderPapers);$$(".ai-tool").forEach(b=>b.onclick=()=>{$$(".ai-tool").forEach(x=>x.classList.remove("active"));b.classList.add("active");aiMode=b.dataset.mode;$("#aiModeLabel").textContent=aiLabels[aiMode]||"Study mode";});$("#startEnglish").onclick=startEnglishLesson;$("#sendChat").onclick=askTutor;$("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")askTutor()});$$("[data-prompt]").forEach(b=>b.onclick=()=>{$("#chatInput").value=b.dataset.prompt;askTutor()});$("#resetBtn").onclick=()=>{if(confirm("Reset all Mindpath progress on this browser?")){state={...defaults};save();location.reload()}};
renderCourses();fillPaperFilters();renderPapers();renderLessons();renderPractice();renderDashboard();
