'use strict';
const Journey=(()=>{
 let JOURNEY=STORY_WORLDS[0];
 try{JOURNEY=STORY_WORLDS.find(w=>w.id===localStorage.getItem("bopomori-selected-story"))||JOURNEY;}catch{}
 let rules=createJourneyRules(JOURNEY);
 let progress=rules.fresh(),storageOK=true;
 try{progress=rules.normalize(JSON.parse(localStorage.getItem(JOURNEY.storageKey)));}catch{}
 let view='library',chapterIndex=0,session=null,showZhuyin=true,revision=0,busy=false,ready=false,selectedWord=null;
 const root=()=>$('journey-root'),chapter=()=>JOURNEY.chapters[chapterIndex];
 const full=()=>rules.completeBook(progress),fragments=()=>rules.pieces(progress);
 function save(){try{localStorage.setItem(JOURNEY.storageKey,JSON.stringify(progress));storageOK=true;}catch{storageOK=false;}}
 function suspend(){revision++;busy=false;ready=false;Finale.stop();}
 function leave(next){stop();status();suspend();view=next;render();}
 function wrap(tag,cls,zh,en){return node(tag,cls,zh,en);}
 function button(zh,en,fn,cls='secondary'){return action(zh,en,fn,cls);}
 function heading(zh,en){return wrap('h2','',zh,en);}
 function back(next='home'){return button('返回','Back',()=>leave(next),'back-button');}
 function hero(count=fragments()){
  const box=wrap('div','wukong-stage');box.setAttribute('role','img');box.setAttribute('aria-label',count===6?`${JOURNEY.character} / ${JOURNEY.characterEn}, complete`:`${JOURNEY.character} ${count}/6 / ${JOURNEY.characterEn} puzzle ${count}/6`);
  const base=wrap('img',count===6?'wukong-complete':'wukong-ghost');base.src=JOURNEY.art;base.alt='';box.append(base);
  if(count<6){const order=[4,5,2,3,0,1];for(let i=0;i<6;i++){if(!progress.completed.includes(JOURNEY.chapters[i].id))continue;const p=order[i],row=Math.floor(p/2),col=p%2;const piece=wrap('img','wukong-piece');piece.src=JOURNEY.art;piece.alt='';piece.style.clipPath=`inset(${row*100/3}% ${(1-col)*50}% ${(2-row)*100/3}% ${col*50}%)`;box.append(piece);}}
  return box;
 }
 function storeNotice(){if(!storageOK)root().append(wrap('p','storage-warning','此瀏覽器無法儲存進度，離開後可能遺失。','This browser cannot save progress. It may be lost when you leave.'));}
 function summary(){const row=wrap('div','journey-stats');row.append(wrap('span','',`${progress.xp} 積分`,`${progress.xp} points`),wrap('span','',`${fragments()} / 6 ${JOURNEY.pieceName}`,`${fragments()} / 6 ${JOURNEY.pieceEn}`));return row;}
 function switchWorld(id){
  const next=STORY_WORLDS.find(w=>w.id===id);if(!next)return;
  stop();status();suspend();JOURNEY=next;rules=createJourneyRules(next);progress=rules.fresh();storageOK=true;
  try{progress=rules.normalize(JSON.parse(localStorage.getItem(next.storageKey)));localStorage.setItem('bopomori-selected-story',next.id);}catch{storageOK=false;}
  chapterIndex=0;selectedWord=null;session=null;view='home';render();
 }
 function storyPicker(){const row=wrap('nav','story-picker');row.setAttribute('aria-label','選故事 / Choose a story');for(const world of STORY_WORLDS){const b=button(world.title,world.english,()=>switchWorld(world.id),'story-pick');b.setAttribute('aria-pressed',String(JOURNEY.id===world.id));row.append(b);}return row;}
 function home(){
  const nav=wrap("div","story-top");nav.append(button("所有故事","All stories",()=>leave("library"),"back-button"),button("我的收藏","My collection",()=>leave("collection"),"back-button"));root().append(nav);
  const layout=wrap('div','journey-layout'),collection=wrap('aside','collection-card');collection.append(wrap('p','eyebrow','角色收集','Character collection'),hero(),heading(JOURNEY.character,JOURNEY.characterEn),summary());
  const meter=wrap('progress','');meter.max=6;meter.value=fragments();meter.setAttribute('aria-label',`${JOURNEY.character} / Collection progress`);collection.append(meter);
  collection.append(wrap('p','small-note',full()?`${JOURNEY.character}已完成，故事書已解鎖。`:`再完成 ${6-fragments()} 章，解鎖結局動畫。`,full()?'Your collection is complete. The storybook is unlocked.':`Complete ${6-fragments()} more chapters to unlock the finale.`));
  if(full())collection.append(button('重播結局','Replay finale',()=>showFinale(),'primary'));
  const shelf=button('我的故事書','My storybook',()=>leave('book'),'book-cover');shelf.disabled=!full();shelf.append(wrap('span','book-name',JOURNEY.title,JOURNEY.english));if(!full())shelf.append(wrap('small','','集滿六片後解鎖','Unlock at six fragments'));collection.append(shelf);const nextChapter=JOURNEY.chapters.findIndex(c=>!progress.completed.includes(c.id));if(nextChapter>=0)collection.append(button(`繼續第 ${nextChapter+1} 章`,`Continue Chapter ${nextChapter+1}`,()=>openChapter(nextChapter),"primary continue-story"));
  const lessons=wrap('div','journey-route');lessons.append(wrap('p','eyebrow',JOURNEY.edition,JOURNEY.editionEn),wrap('h1','',JOURNEY.title,JOURNEY.english));
  const daily=progress.bonusDays.includes(rules.dayKey());lessons.append(wrap('p','daily-note',daily?'今天的首次完成獎勵已領取 ✓':'今天完成一組練習，額外獲得 5 分。',daily?'Today’s first-completion bonus collected ✓':'Finish a practice round today for 5 bonus points.'));
  const list=wrap('div','chapter-list');JOURNEY.chapters.forEach((c,i)=>{const unlocked=rules.unlocked(progress,i),done=progress.completed.includes(c.id);const b=button(c.title,c.en,()=>openChapter(i),'chapter-link');b.disabled=!unlocked;const icon=wrap('span','chapter-icon');icon.textContent=done?'✓':c.icon;b.prepend(icon);b.append(wrap('small','chapter-load',`${c.words.length} 個詞語`,`${c.words.length} words`));b.append(wrap('small','chapter-state',done?'可複習':unlocked?'開始':'完成上一章後開啟',done?'Review':unlocked?'Start':'Finish the previous chapter'));b.setAttribute('aria-label',`${i+1}. ${c.title} / ${c.en}${!unlocked?' / Locked':''}`);list.append(b);});lessons.append(wrap('p','learning-focus',JOURNEY.focus||'短句與詞語',JOURNEY.focusEn||'Short sentences and words'),list);
  const pointRules=wrap('details','journey-rules');pointRules.append(wrap('summary','','積分怎麼拿？','How points work'),wrap('p','','每章首次完成得 20 分；每本故事每天首次完成再加 5 分。每章首次完成固定獲得一片；完成六章才能解鎖角色、傳說之印與故事書。XP 不影響拼片。答錯可以訂正；同一天重玩已完成的章節不重複加分。','Earn 20 points the first time you finish each chapter, plus 5 for your first round in each book each day. Each chapter gives one permanent piece. Finish all six to unlock the character, Legend Seal and book. XP does not unlock pieces. Correct mistakes freely. Replaying a completed chapter on the same day gives no extra points.'));
  lessons.append(pointRules,sourceDetails());layout.append(collection,lessons);root().append(layout);
 }
 function sourceDetails(){const detail=wrap('details','story-source');detail.append(wrap('summary','','故事版本','About this version'),wrap('p','',JOURNEY.sourceNote,JOURNEY.sourceNoteEn));const link=wrap('a','',JOURNEY.sourceLabel,JOURNEY.sourceLabelEn);link.href=JOURNEY.sourceUrl;link.target='_blank';link.rel='noopener noreferrer';detail.append(link);if(JOURNEY.sourceExtra){const extra=wrap("a","",JOURNEY.sourceExtra.label,JOURNEY.sourceExtra.en);extra.href=JOURNEY.sourceExtra.url;extra.target="_blank";extra.rel="noopener noreferrer";detail.append(extra);}return detail;}
 function openChapter(index){if(!rules.unlocked(progress,index))return;chapterIndex=index;selectedWord=null;session=null;leave('read');}
 function learnedStoryWords(){const all=records(),learned=new Set();for(const world of STORY_WORLDS){const state=createJourneyRules(world).normalize(all[world.id]);for(const c of world.chapters)if(state.completed.includes(c.id))c.words.forEach(w=>learned.add(w.zh));}return learned;}
 function wordCard(w){const card=wrap('div','story-word-card');card.append(wrap('strong','',w.zh,w.en),wrap('span','word-zhuyin',w.zy,w.py));const zy=card.querySelector('.word-zhuyin');zy.innerHTML=zhuyinHTML(w.zy)+`<span class="en">${escapeHTML(w.py)}</span>`;card.append(button('聽詞語','Listen',()=>play(w.audio,w.zh),'word-listen'));return card;}
 function sentence(line){const row=wrap('div','story-line');const text=wrap('p','story-chinese');const words=chapter().words;const sorted=words.map(w=>w.zh).sort((a,b)=>b.length-a.length);const chunks=line.zh.split(new RegExp('('+sorted.join('|')+')','g'));for(const s of chunks){const w=words.find(x=>x.zh===s);if(w){const b=wrap('button','inline-word');b.type='button';b.setAttribute('aria-label',`${w.zh} / ${w.en} — 查看注音 / Show pronunciation`);if(showZhuyin)b.innerHTML=`<ruby>${escapeHTML(s)}<rt>${zhuyinHTML(w.zy)}</rt></ruby>`;else b.textContent=s;b.onclick=()=>{selectedWord=w;render();$('story-word-detail')?.scrollIntoView({block:'nearest'});};text.append(b);}else text.append(document.createTextNode(s));}
  const speech=button('聽句子','Listen',()=>play(line.audio,'故事句子 / Story sentence'),'sentence-listen');speech.setAttribute('aria-label',`聽句子：${line.zh} / Listen: ${line.en}`);row.append(text,wrap('p','story-english','',line.en),speech);return row;
 }
 async function play(file,label,conceal=false){const rev=++revision;busy=true;ready=false;if(view==='quiz')render();const word=JOURNEY.chapters.flatMap(c=>c.words).find(w=>w.audio===file);const ok=await recording(file,label,conceal,word?.slowAudio);if(rev!==revision||activeTab!=='game')return;busy=false;ready=ok;if(view==='quiz')render();}
 function reader(inBook=false){
  const c=chapter();const top=wrap('div','story-top');top.append(back(),wrap('span','',`${chapterIndex+1} / 6`,inBook?'My storybook':'Read first'));
  const label=wrap('label','zhuyin-toggle');const check=wrap('input','');check.type='checkbox';check.checked=showZhuyin;check.onchange=()=>{showZhuyin=check.checked;render();};label.append(check,wrap('span','','注音','Zhuyin'));top.append(label);root().append(top);
  if(inBook){const select=wrap('select','chapter-select');select.setAttribute('aria-label','選擇章節 / Choose a chapter');JOURNEY.chapters.forEach((x,i)=>{const o=wrap('option','');o.value=i;o.textContent=`${i+1}. ${x.title} / ${x.en}`;select.append(o);});select.value=chapterIndex;select.onchange=()=>{chapterIndex=Number(select.value);selectedWord=null;leave('book');};root().append(select);}
  const page=wrap('article','story-paper');page.append(wrap('p','eyebrow',JOURNEY.title,JOURNEY.english),heading(c.title,c.en));c.lines.forEach(line=>page.append(sentence(line)));page.append(wrap('p','culture-note',...c.culture),sourceDetails());root().append(page);
  if(selectedWord){const detail=wordCard(selectedWord);detail.id='story-word-detail';root().append(detail);}
  const learned=learnedStoryWords(),newCount=c.words.filter(w=>!learned.has(w.zh)).length;root().append(wrap('p','vocabulary-load',`${c.words.length} 個詞語 · ${newCount} 個新詞 · ${c.words.length-newCount} 個已學詞`,`${c.words.length} words · ${newCount} new · ${c.words.length-newCount} learned`));const vocab=wrap('div','story-vocabulary');c.words.forEach(w=>{const card=wordCard(w);card.prepend(wrap('small','word-status',learned.has(w.zh)?'複習':'新詞',learned.has(w.zh)?'Review':'New'));vocab.append(card);});root().append(vocab);
  const controls=wrap('div','story-actions');if(inBook){if(chapterIndex>0)controls.append(button('上一章','Previous',()=>{chapterIndex--;selectedWord=null;leave('book');}));if(chapterIndex<5)controls.append(button('下一章','Next',()=>{chapterIndex++;selectedWord=null;leave('book');},'primary'));else controls.append(button('回到書架','Back to shelf',()=>leave('home'),'primary'));}
  else controls.append(button(`開始練習 · ${c.words.length+3} 題`,`Practise · ${c.words.length+3} questions`,startQuiz,'primary'));root().append(controls);
 }
 function startQuiz(){stop();status();suspend();session=rules.quiz(chapterIndex);view='quiz';render();}
 function answer(choice){if(!session||view!=='quiz')return;const q=session.questions[session.at];if(q.kind==='listen'&&(!ready||busy))return;const result=rules.answer(q,choice,chapter());if(result===null)return;stop();status();render();}
 function quiz(){
  if(!session){view='home';home();return;}const c=chapter(),q=session.questions[session.at];const top=wrap('div','story-top');top.append(button('回故事','Back to story',()=>leave('read'),'back-button'),wrap('span','',`第 ${session.at+1} / ${session.questions.length} 題`,`Question ${session.at+1} / ${session.questions.length}`));root().append(top);
  const meter=wrap('progress','');meter.max=session.questions.length;meter.value=session.at+(q.solved?1:0);meter.setAttribute('aria-label','練習進度 Practice progress');root().append(meter);
  const panel=wrap('div','story-quiz');
  if(q.kind==='listen'){panel.append(heading('聽聲音，選詞語','Listen and choose'));const listen=button(busy?'播放中':'聽題目',busy?'Playing':'Listen',()=>play(c.words[q.word].audio,'',true),'primary story-play');listen.disabled=busy;panel.append(listen);}
  if(q.kind==='meaning'){panel.append(heading('哪個詞是這個意思？','Which word has this meaning?'),wrap('p','meaning-prompt','',c.words[q.word].en));}
  if(q.kind!=='build'){const choices=wrap('div','game-choices');q.options.forEach(w=>{const b=button(w.zh,w.en,()=>answer(w.zh),'choice story-choice');if(q.kind==='meaning')b.innerHTML=`<span>${escapeHTML(w.zh)}</span><span class="choice-zhuyin">${zhuyinHTML(w.zy)}</span><span class="en">${escapeHTML(w.py)}</span>`;else b.innerHTML=`<span>${escapeHTML(w.zh)}</span><span class="choice-zhuyin">${zhuyinHTML(w.zy)}</span><span class="en">${escapeHTML(w.py)} · ${escapeHTML(w.en)}</span>`;b.disabled=q.solved||(q.kind==='listen'&&(!ready||busy));if(q.solved&&w.zh===c.words[q.word].zh)b.classList.add('correct');choices.append(b);});panel.append(choices);}
  else{panel.append(heading('把句子排好','Build the sentence'),wrap('p','meaning-prompt','',c.buildEn));const answerRow=wrap('div','sentence-answer');answerRow.setAttribute('aria-label','你的句子 Your sentence');for(const id of q.chosen){const token=q.tiles.find(t=>t.id===id);answerRow.append(button(token.text,'',()=>{if(!q.solved){q.chosen=q.chosen.filter(x=>x!==id);render();}},'word-token chosen'));}if(!q.chosen.length)answerRow.append(wrap('span','small-note','依順序點下面的詞語','Tap the words below in order'));panel.append(answerRow);const bank=wrap('div','word-bank');q.tiles.forEach(t=>{const b=button(t.text,'',()=>{if(!q.chosen.includes(t.id)){q.chosen.push(t.id);render();}},'word-token');b.disabled=q.solved||q.chosen.includes(t.id);bank.append(b);});panel.append(bank);const check=button('檢查','Check',()=>answer(q.chosen.map(id=>q.tiles.find(t=>t.id===id).text).join('')),'primary');check.disabled=q.solved||q.chosen.length!==q.tiles.length;panel.append(check);}
  const feedback=wrap('div','story-feedback');feedback.setAttribute('role','status');if(q.solved)feedback.append(wrap('p','','答對了！','That’s right!'));else if(q.tries)feedback.append(wrap('p','','再試一次，可以看提示，不扣分。','Try again. Use the hint — no points lost.'));else if(q.kind==='listen'&&!ready)feedback.append(wrap('p','','聽完題目後，再選答案。','Listen to the whole sound before choosing.'));panel.append(feedback);
  const hint=wrap('details','lesson-hint');hint.append(wrap('summary','','看提示','Hint'),q.kind==='build'?wrap('p','build-hint',c.build.join(''),c.buildEn):wordCard(c.words[q.word]));panel.append(hint);
  if(q.solved)panel.append(button(session.at===session.questions.length-1?'收下積分':'下一題',session.at===session.questions.length-1?'Collect points':'Next',next,'primary'));root().append(panel);
 }
 function next(){if(!rules.advance(session))return;stop();status();suspend();if(session.finished){rules.award(progress,session);save();view='result';}render();if(session.finished&&full()&&!progress.awakeningSeen)showFinale();}
 function result(){const reward=session.reward;root().append(wrap('div','result-spark','✧',''),heading('這一章完成了','Chapter complete'),wrap('p','earned-points',`+${reward.earned}`,reward.earned?'points':'Already collected today'),summary());root().append(wrap('p','lesson-note',reward.first?'你已完成這一章的練習，新的碎片出現了。':'複習完成。已完成章節仍可領取每天首次完成的 5 分。',reward.first?'You completed this chapter’s practice. Your collection is growing.':'Review complete. Your first completed round each day can still earn 5 bonus points.'));if(reward.daily)root().append(wrap('p','daily-note','包含今日獎勵 +5','Includes today’s +5 bonus'));const buttons=wrap('div','story-actions');buttons.append(button('回故事地圖','Story map',()=>leave('home')));if(full()&&!progress.awakeningSeen)buttons.append(button('播放結局','Play finale',()=>showFinale(),'primary'));else if(chapterIndex<5)buttons.append(button('下一章','Next chapter',()=>openChapter(chapterIndex+1),'primary'));else buttons.append(button('打開故事書','Open storybook',()=>{chapterIndex=0;leave('book');},'primary'));root().append(buttons);}
 function showFinale(){if(!full())return;view='home';render();root().querySelector('.wukong-stage')?.scrollIntoView({block:'center'});const world=JOURNEY;const earned=progress;Finale.play({id:world.id,title:world.character,en:world.characterEn,art:world.art,target:root().querySelector('.wukong-stage'),onclose:()=>{earned.awakeningSeen=true;try{localStorage.setItem(world.storageKey,JSON.stringify(earned));}catch{storageOK=false;}if(JOURNEY===world&&activeTab==='game'){view='awaken';render();}}});}
 function awaken(){if(!full()){home();return;}root().append(wrap('p','eyebrow','角色完成','Character complete'),hero(6),heading(JOURNEY.character,JOURNEY.characterEn),wrap('p','seal-awarded','傳說之印已收藏','Legend Seal collected'),wrap('p','lesson-note',`你完成了拼圖，也解鎖《${JOURNEY.title}》入門故事書。`,`You completed the puzzle and unlocked ${JOURNEY.english}.`));root().append(button('收藏拼圖，打開故事書','Keep & open the book',()=>{progress.awakeningSeen=true;save();chapterIndex=0;leave('book');},'primary'),button('重播結局','Replay finale',()=>showFinale(),'secondary'),button('選下一本故事','Choose another story',()=>leave('library'),'secondary'),button('我的收藏','My collection',()=>leave('collection'),'secondary'),button('回故事地圖','Back to story map',()=>leave('home'),'back-button'));}
 // Collection is derived from completed chapters, so seals cannot be duplicated.
 let secret=SecretRules.fresh(),quest=null;
 try{secret=SecretRules.normalize(JSON.parse(localStorage.getItem('zhuyora-secret-v1')));}catch{}
 function records(){const values={};for(const world of STORY_WORLDS){try{values[world.id]=JSON.parse(localStorage.getItem(world.storageKey));}catch{values[world.id]=null;}}values[JOURNEY.id]=progress;return values;}
 const sealIds=()=>SecretRules.seals(records());
 function saveSecret(){try{localStorage.setItem('zhuyora-secret-v1',JSON.stringify(secret));}catch{storageOK=false;}}
 function hubNav(){const nav=wrap('div','hub-nav');nav.append(button('選故事','Choose a story',()=>leave('library'),'secondary'),button('我的收藏','My collection',()=>leave('collection'),'secondary'),button('先學注音','Learn Zhuyin first',()=>{activateTab('practice');showPracticeMode('guided');},'back-button'));if(SecretRules.awake(secret)){const pet=wrap('div','journey-companion'),image=wrap('img','');image.src=SecretRules.masterAwake(secret)?'assets/yubao-full.png':'assets/yubao.png';image.alt='';pet.append(image,wrap('span','',SecretRules.masterAwake(secret)?'語寶・完整覺醒':'小語寶',SecretRules.masterAwake(secret)?'Yubao · Fully awakened':'Little Yubao'));nav.append(pet);}const preview=wrap('a','back-button','演出預覽','Animation preview');preview.href='preview.html';nav.append(preview);return nav;}
 function library(){
  root().append(hubNav(),wrap('p','route-note','依編號由淺入深，也可以自由選故事。','Follow the numbered path, or choose any story.'));const row=wrap('div','story-library');const all=records();
  for(const world of STORY_WORLDS){const rule=createJourneyRules(world),state=rule.normalize(all[world.id]),count=rule.pieces(state);const card=wrap('article','world-card');
   const image=wrap('img','world-preview');image.src=world.art;image.alt=`${world.character} / ${world.characterEn}`;
   const counts=world.chapters.map(c=>c.words.length),range=Math.min(...counts)===Math.max(...counts)?String(counts[0]):`${Math.min(...counts)}–${Math.max(...counts)}`;
   card.append(image,heading(world.title,world.english),wrap('p','world-meta',world.category||world.edition,world.categoryEn||world.editionEn),wrap('p','world-level',`${String(world.routeIndex||1).padStart(2,'0')} · ${['','入門','基礎','閱讀進階'][world.level||1]} · 每章 ${range} 詞`,`${['','Starting out','Building skills','Growing reader'][world.level||1]} · ${range} words/chapter`),wrap('p','world-progress',`${count} / 6 章 · ${count} / 6 片`,`${count} / 6 chapters · ${count} / 6 pieces`));
   const meter=wrap('progress','');meter.max=6;meter.value=count;meter.setAttribute('aria-label',`${world.title} / Chapters completed`);card.append(meter);
   card.append(button(count===6?'查看故事':count?'繼續故事':'開始故事',count===6?'View story':count?'Continue story':'Start story',()=>switchWorld(world.id),'primary open-world'));
   card.append(wrap('p','small-note',count===6?'已獲得傳說之印':'完成六章，解鎖角色與結局動畫。',count===6?'Legend Seal collected':'Finish six chapters to unlock the character and finale.'));row.append(card);
  }
  root().append(row,secretTeaser());
 }
 function secretTeaser(){const count=SecretRules.required.filter(id=>sealIds().includes(id)).length,box=wrap('section','secret-teaser');box.append(heading('神祕書閣','The Secret Library'),wrap('p','',count===3?'三枚印記已集齊。找回書中遺失的聲音，喚醒語寶。':`已收集 ${count} / 3 枚傳說之印。完成西遊記、哪吒篇與百步蛇新娘，打開神祕書閣。`,count===3?'All three seals are yours. Restore the lost sounds and awaken Yubao.':`${count} / 3 Legend Seals. Complete Wukong, Nezha and the Snake Bride to open the Secret Library.`));const enter=button('進入書閣','Enter the library',()=>leave('secret'),'primary');enter.disabled=count!==3;box.append(enter);return box;}
 function collection(){
  root().append(hubNav(),heading('我的傳說收藏','My Legend Collection'));const owned=sealIds(),grid=wrap('div','seal-grid');
  for(const world of STORY_WORLDS){const card=wrap('article','seal-card'+(owned.includes(world.id)?' owned':''));const medal=wrap('span','seal-symbol');medal.textContent=owned.includes(world.id)?'✦':'◇';card.append(medal,heading(world.character,world.characterEn),wrap('p','',owned.includes(world.id)?'傳說之印 · 已取得':'傳說之印 · 尚未取得',owned.includes(world.id)?'Legend Seal · Collected':'Legend Seal · Locked'));
   if(owned.includes(world.id)){const image=wrap('img','collection-portrait');image.src=world.art;image.alt=world.characterEn;card.append(image,button('重播結局','Replay finale',()=>{switchWorld(world.id);showFinale();},'secondary'));}grid.append(card);
  }
  root().append(grid,secretTeaser());const box=wrap('section','yubao-gallery');box.id='yubao-gallery';const awake=SecretRules.libraryOpen(records())&&SecretRules.awake(secret);
  if(awake){const image=wrap('img','yubao-portrait');image.src='assets/yubao.png';image.alt='語寶，初語書靈 / Yubao, the Book Spirit';box.append(image,heading('語寶','Yubao, the Book Spirit'),wrap('p','','你好，謝謝你把聲音帶回來。','Hello. Thank you for bringing the sounds back.'),button('重播誕生動畫','Replay Yubao’s awakening',showYubao,'secondary'));}
  else box.append(wrap('div','book-mystery','？',''),heading('尚未甦醒的書靈','A sleeping Book Spirit'),wrap('p','','完成書閣的三個挑戰，與語寶見面。','Complete the library’s three quests to meet Yubao.'));
  root().append(box,masterGallery());
 }
 function secretHome(){
  root().append(hubNav());if(!SecretRules.libraryOpen(records())){root().append(secretTeaser());return;}
  root().append(heading('遺失的聲音','The Lost Sounds'),wrap('p','secret-intro','書打開了，裡面的字卻沒有聲音。通過三個挑戰，讓故事再次被聽見。','The book opens, but its words have lost their sounds. Complete three quests so the stories can be heard again.'));
  const names=[['聲音之門','The Sound Gate'],['文字之橋','The Word Bridge'],['記憶書庫','Memory Library']];const list=wrap('div','secret-quests');
  SecretRules.ids.forEach((id,i)=>{const done=secret.completed.includes(id),b=button(...names[i],()=>startQuest(id),'quest-link');b.disabled=!SecretRules.questOpen(secret,id);b.append(wrap('span','',done?'✓ 已完成':b.disabled?'完成上一關後開啟':'開始挑戰',done?'Completed':b.disabled?'Finish the previous quest':'Start quest'));list.append(b);});root().append(list);
  if(SecretRules.awake(secret))root().append(button('看語寶','Meet Yubao',()=>leave('collection'),'primary'),masterGallery());
 }
 function startQuest(id){if(!SecretRules.libraryOpen(records())||!SecretRules.questOpen(secret,id))return;stop();status();suspend();quest={id,at:0,solved:false,chosen:[],selected:null,matches:[],message:null};view='secret-quest';render();}
 function questDone(){if(!quest)return;const complete=quest.id==='memory'?quest.matches.length===3:quest.at===2&&quest.solved;if(!complete)return;SecretRules.complete(secret,quest.id,records());saveSecret();const reveal=SecretRules.awake(secret)&&!secret.revealSeen;leave('secret');if(reveal)showYubao();}
 function questNext(){if(!quest?.solved)return;if(quest.at===2){questDone();return;}stop();status();suspend();quest.at++;quest.solved=false;quest.chosen=[];quest.message=null;render();}
 async function gateAudio(){if(!quest||quest.id!=='sound')return;const q=quest,rev=++revision,item=SecretRules.gates[q.at];busy=true;ready=false;render();const ok=await recording(item.audio,'',true,item.slowAudio);if(q!==quest||rev!==revision||view!=='secret-quest'||activeTab!=='game')return;busy=false;ready=ok;if(!ok)q.message=['音檔未完成播放，請再試一次。','The audio did not finish. Please try again.'];render();}
 function gateAnswer(value){if(!quest||quest.solved||busy||!ready)return;const item=SecretRules.gates[quest.at];if(value===item.correct){quest.solved=true;quest.message=['門鎖亮起來了！','A lock lights up!'];}else quest.message=['再聽一次，注意聲調。','Listen again and notice the tone.'];render();}
 function bridgeCheck(){if(!quest||quest.solved)return;const item=SecretRules.bridges[quest.at];if(quest.chosen.map(i=>item.tiles[i]).join('')===item.zh){quest.solved=true;quest.message=['橋又完成了一段！','Another part of the bridge is ready!'];}else quest.message=['還差一點。點詞語可以拿回來重排。','Almost. Tap a word to return it and try a new order.'];render();}
 function matchMeaning(index){if(!quest||quest.selected===null||quest.matches.includes(index))return;if(quest.selected===index){quest.matches.push(index);quest.selected=null;quest.message=['書頁回到原來的故事了。','The page returns to its story.'];}else quest.message=['意思還不相同，再選一次。','The meanings do not match yet. Try again.'];render();}
 function secretQuest(){
  if(!quest||!SecretRules.libraryOpen(records())){view='secret';secretHome();return;}
  root().append(button('回到書閣','Back to the library',()=>leave('secret'),'back-button'));const titles={sound:['聲音之門','The Sound Gate'],bridge:['文字之橋','The Word Bridge'],memory:['記憶書庫','Memory Library']};root().append(heading(...titles[quest.id]));
  const stage=wrap('div','quest-scene quest-'+quest.id);stage.setAttribute('aria-label','挑戰進度 / Quest progress');for(let i=0;i<3;i++){const piece=wrap('span','quest-step'+((quest.id==='memory'?quest.matches.length:quest.at+(quest.solved?1:0))>i?' restored':''));piece.textContent=quest.id==='sound'?'◈':quest.id==='bridge'?'▰':'▤';stage.append(piece);}root().append(stage);
  const panel=wrap('div','quest-panel');
  if(quest.id==='sound'){
   const item=SecretRules.gates[quest.at];panel.append(wrap('p','quest-instruction','聽音，選出正確的注音與聲調。','Listen, then choose the matching Zhuyin and tone.'));
   const listen=button(busy?'播放中':'播放發音',busy?'Playing':'Play audio',gateAudio,'primary');listen.disabled=busy;panel.append(listen);const choices=wrap('div','game-choices');for(const [zy,py] of item.options){const b=button(zy,py,()=>gateAnswer(zy),'choice gate-choice');b.disabled=!ready||busy||quest.solved;choices.append(b);}panel.append(choices);
   const hint=wrap('details','lesson-hint');hint.append(wrap('summary','','提示','Hint'),wrap('p','',`${item.word} · ${item.correct}`,`${item.en} · ${item.options.find(x=>x[0]===item.correct)[1]}`));panel.append(hint);
  }else if(quest.id==='bridge'){
   const item=SecretRules.bridges[quest.at];panel.append(wrap('p','quest-instruction','排列詞語，搭好一段橋。','Put the words in order to build the bridge.'),wrap('p','meaning-prompt','',item.en));
   const answer=wrap('div','sentence-answer');quest.chosen.forEach((id,at)=>{const b=button(item.tiles[id],'',()=>{quest.chosen.splice(at,1);quest.message=null;render();},'word-token chosen');b.disabled=quest.solved;answer.append(b);});panel.append(answer);
   const bank=wrap('div','word-bank');[...item.tiles.keys()].reverse().forEach(id=>{const b=button(item.tiles[id],'',()=>{quest.chosen.push(id);render();},'word-token');b.disabled=quest.solved||quest.chosen.includes(id);bank.append(b);});panel.append(bank);const check=button('確認句子','Check sentence',bridgeCheck,'primary');check.disabled=quest.solved||quest.chosen.length!==item.tiles.length;panel.append(check);
   const hint=wrap('details','lesson-hint');hint.append(wrap('summary','','提示','Hint'),wrap('p','',item.zh,item.en));panel.append(hint);
  }else{
   panel.append(wrap('p','quest-instruction','先選中文句子，再選相同意思的英文。','Choose a Chinese sentence, then its English meaning.'));const matching=wrap('div','memory-grid');
   const left=wrap('div','memory-column');SecretRules.pairs.forEach((p,i)=>{const b=button(p.zh,'',()=>{quest.selected=i;quest.message=null;render();},'memory-card'+(quest.selected===i?' selected':''));b.disabled=quest.matches.includes(i);b.setAttribute('aria-pressed',String(quest.selected===i));left.append(b);});
   const right=wrap('div','memory-column');[2,0,1].forEach(i=>{const p=SecretRules.pairs[i],b=button('',p.en,()=>matchMeaning(i),'memory-card');b.disabled=quest.matches.includes(i);right.append(b);});matching.append(left,right);panel.append(matching);
   const hint=wrap('details','lesson-hint');hint.append(wrap('summary','','提示與發音','Hints & audio'));SecretRules.pairs.forEach(p=>{const row=wrap('div','memory-hint');row.append(wrap('p','',p.zh,p.en),button('聽句子','Listen',()=>recording(p.audio,p.zh),'secondary'));hint.append(row);});panel.append(hint);
  }
  if(quest.message)panel.append(wrap('p','quest-feedback',...quest.message));
  if(quest.id==='memory'&&quest.matches.length===3)panel.append(button('完成挑戰','Complete quest',questDone,'primary'));
  else if(quest.solved)panel.append(button(quest.at===2?'完成挑戰':'下一題',quest.at===2?'Complete quest':'Next',questNext,'primary'));
  root().append(panel);
 }
 function showYubao(){if(!SecretRules.libraryOpen(records())||!SecretRules.awake(secret))return;view='collection';render();const slot=root().querySelector('.yubao-portrait');slot?.scrollIntoView({block:'center'});Finale.play({id:'yubao',title:'語寶',en:'Yubao, the Book Spirit',art:'assets/yubao.png',target:slot,onclose:()=>{secret.revealSeen=true;saveSecret();if(activeTab==='game'){view='collection';render();}}});}

 // The advanced route adds challenge types, not time pressure or penalties.
 let master=null;
 function masterGallery(){
  const box=wrap('section','yubao-gallery master-gallery'),done=SecretRules.masterAwake(secret),open=SecretRules.masterOpen(secret,records());box.id='master-gallery';
  const count=SecretRules.masterRequired.filter(id=>sealIds().includes(id)).length;
  box.append(heading('語寶完整覺醒','Yubao’s full awakening'));
  if(done){const image=wrap('img','yubao-portrait full-yubao-portrait');image.src='assets/yubao-full.png';image.alt='完整覺醒的語寶 / Fully awakened Yubao';box.append(image,wrap('p','','九枚印記與進階挑戰已完成。','Nine seals and the final challenges are complete.'),button('重播完整覺醒','Replay full awakening',showMaster,'primary'));}
  else box.append(wrap('p','master-counter',`${count} / 9 枚印記 · ${secret.masterCompleted.length} / 3 關`,`${count} / 9 seals · ${secret.masterCompleted.length} / 3 challenges`),wrap('p','',SecretRules.awake(secret)?'集齊這九本故事的印記，再完成三關，解鎖語寶的新裝與結局。':'先喚醒小語寶，再收集這九本故事的印記。',SecretRules.awake(secret)?'Collect the nine story seals, then complete three challenges to unlock Yubao’s new outfit and finale.':'Awaken little Yubao first, then collect these nine story seals.'));
  const names=[['短句聽力','Sentence listening'],['故事排序','Story sequencing'],['詞語造句','Sentence building']];
  const quests=wrap('div','secret-quests');SecretRules.masterIds.forEach((id,i)=>{const b=button(...names[i],()=>startMaster(id),'quest-link master-link');b.disabled=!open||!SecretRules.masterQuestOpen(secret,id);b.append(wrap('small','',secret.masterCompleted.includes(id)?'✓ 已完成':b.disabled?'尚未開啟':'開始',secret.masterCompleted.includes(id)?'Completed':b.disabled?'Locked':'Start'));quests.append(b);});box.append(quests);
  const note=wrap('details','journey-rules');note.append(wrap('summary','','挑戰規則','Challenge rules'),wrap('p','','只複習這九本故事已學內容。每關三題，可重聽、看提示與重試，不計時、不扣分。每完成一關就儲存；日後新增故事不影響這次九本收藏的解鎖。','Review material from these nine books only. Each challenge has three questions. Replay, hints and retries are unlimited, with no timer or penalty. Each completed challenge is saved. Future books will not change this nine-book goal.'));box.append(note);return box;
 }
 function startMaster(id){if(!SecretRules.masterOpen(secret,records())||!SecretRules.masterQuestOpen(secret,id))return;stop();status();suspend();master={id,items:SecretRules.masterTasks(id),at:0,chosen:[],solved:false,message:null};if(master.items.length!==3)return;view='master-quest';render();}
 async function masterAudio(){if(!master||view!=='master-quest')return;const m=master,item=m.items[m.at],rev=++revision;busy=true;ready=false;render();const ok=await recording(item.audio,'',true);if(m!==master||revision!==rev||view!=='master-quest'||activeTab!=='game')return;busy=false;ready=ok;if(!ok)m.message=['音檔未完成播放，請再試一次。','The audio did not finish. Please try again.'];render();}
 function masterAnswer(value){if(!master||master.solved||view!=='master-quest')return;const item=master.items[master.at];if(master.id==='listening'&&(!ready||busy))return;
  const correct=master.id==='listening'?value===item.zh:master.id==='ordering'?master.chosen.join(',')===item.tiles.map((_,i)=>i).join(','):master.chosen.map(i=>item.tiles[i].zh).join('')===item.zh;
  master.solved=correct;master.message=correct?['答對了！','That’s right!']:['再試一次，可以看提示，不扣分。','Try again. Hints are welcome; no points lost.'];render();
 }
 function masterNext(){if(!master?.solved)return;if(master.at===2){SecretRules.completeMaster(secret,master.id,records());saveSecret();const reveal=SecretRules.masterAwake(secret)&&!secret.masterSeen;leave('collection');if(reveal)showMaster();return;}stop();status();suspend();master.at++;master.chosen=[];master.solved=false;master.message=null;render();}
 function masterQuest(){
  if(!master||!SecretRules.masterOpen(secret,records())){view='collection';collection();return;}
  const m=master,item=m.items[m.at],listening=m.id==='listening',ordering=m.id==='ordering';
  root().append(button('返回收藏','Back to collection',()=>leave('collection'),'back-button'),heading(listening?'聽句子，選出聽到的內容':ordering?'依故事順序排列':'用學過的詞語造句',listening?'Listen and choose the sentence':ordering?'Put the story in order':'Build a sentence with learned words'),wrap('p','',`${m.at+1} / 3`,'No timer · Unlimited retries'));
  const panel=wrap('div','quest-panel'+(ordering?' master-order':''));
  if(listening){const listen=button(busy?'播放中':'聽題目',busy?'Playing':'Listen',masterAudio,'primary');listen.disabled=busy;panel.append(listen);const choices=wrap('div','game-choices');[...item.options].reverse().forEach(line=>{const b=button(line.zh,line.en,()=>masterAnswer(line.zh),'choice master-choice');b.disabled=busy||!ready||m.solved;choices.append(b);});panel.append(choices);}
  else{
   panel.append(wrap('p','meaning-prompt',ordering?item.title:'',item.en));const answer=wrap('div','sentence-answer');m.chosen.forEach((id,at)=>{const tile=item.tiles[id],b=button(tile.zh,tile.en,()=>{if(m.solved)return;m.chosen.splice(at,1);m.message=null;render();},'word-token chosen');b.disabled=m.solved;answer.append(b);});panel.append(answer);
   const bank=wrap('div','word-bank');[...item.tiles.keys()].reverse().forEach(id=>{const tile=item.tiles[id],b=button(tile.zh,tile.en,()=>{if(m.solved||m.chosen.includes(id))return;m.chosen.push(id);render();},'word-token');b.disabled=m.solved||m.chosen.includes(id);bank.append(b);});panel.append(bank);const check=button('檢查答案','Check answer',()=>masterAnswer(),'primary');check.disabled=m.solved||m.chosen.length!==item.tiles.length;panel.append(check);
  }
  const hint=wrap('details','lesson-hint');hint.append(wrap('summary','','提示','Hint'));if(ordering)item.tiles.forEach((line,i)=>hint.append(wrap('p','',`${i+1}. ${line.zh}`,line.en)));else hint.append(wrap('p','',item.zh,item.en));panel.append(hint);
  if(m.message)panel.append(wrap('p','quest-feedback',...m.message));if(m.solved)panel.append(button(m.at===2?'完成挑戰':'下一題',m.at===2?'Complete challenge':'Next',masterNext,'primary'));root().append(panel);
 }
 function showMaster(){if(!SecretRules.masterAwake(secret))return;view='collection';render();const slot=root().querySelector('.full-yubao-portrait');Finale.play({id:'yubao-full',title:'語寶・完整覺醒',en:'Yubao, Fully Awakened',art:'assets/yubao-full.png',target:slot,onclose:()=>{secret.masterSeen=true;saveSecret();if(activeTab==='game'){view='collection';render();}}});}


 function render(){if(!root())return;root().replaceChildren();root().className=`journey-root journey-${view}`;if(view==='library')library();else if(view==='collection')collection();else if(view==='secret')secretHome();else if(view==='secret-quest')secretQuest();else if(view==='master-quest')masterQuest();else if(view==='home')home();else if(view==='read')reader();else if(view==='quiz')quiz();else if(view==='result')result();else if(view==='awaken')awaken();else if(view==='book'){if(full())reader(true);else{view='home';home();}}storeNotice();}
 function mode(){stop();status();suspend();$('journey-root').hidden=false;render();}
 function init(){render();window.addEventListener('storage',e=>{if(e.key===JOURNEY.storageKey){try{progress=rules.normalize(JSON.parse(e.newValue));if(['home','library','collection','secret'].includes(view))render();}catch{}}});}
 return{init,render,suspend,mode};
})();
Journey.init();
