'use strict';
const initialSymbols = [...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ'];
const initialWords = ['包子','葡萄','媽媽','飛機','大象','兔子','牛奶','老師','哥哥','開心','喝水','積木','氣球','西瓜','蜘蛛','吃飯','書本','日出','早安','草地','森林'];
const initialTips = ['雙唇閉合，輕輕放開','雙唇放開，送出氣流','雙唇閉合，聲音從鼻腔出來','上齒輕碰下唇，送出氣流','舌尖抵住上齒齦，再放開','舌尖放開，送出氣流','舌尖抵住上齒齦，從鼻腔出聲','舌尖抵住上齒齦，氣從兩側出來','舌根抬起，再放開','舌根放開，送出氣流','舌根附近留窄縫，呼出氣流','舌面前部抬起，再放開','舌面前部放開，送出氣流','舌面前部留窄縫，送出氣流','舌尖翹起，再放開','舌尖翹起，送出氣流','舌尖翹起，氣流摩擦','舌尖翹起，聲帶振動','舌尖向前，放開窄縫','舌尖向前，送出氣流','舌尖向前，氣流摩擦'];
const initials = initialSymbols.map((s,i)=>({s,word:initialWords[i],tip:initialTips[i],audio:i+1}));
initials.push({s:'∅',word:'不加聲母',tip:'例如：ㄞˋ → 愛'});
const medials = [
 {s:'ㄧ',word:'衣服',tip:'嘴角向兩側展開',audio:35},
 {s:'ㄨ',word:'屋子',tip:'嘴唇收圓，向前突出',audio:36},
 {s:'ㄩ',word:'魚',tip:'先發 ㄧ，再把嘴唇收圓',audio:37},
 {s:'∅',word:'不加介音',tip:'例如：ㄇ＋ㄚ → 媽'}
];
const finalSymbols = [...'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'];
const finalWords = ['阿姨','喔','鵝','耶','愛心','欸','凹','歐洲','安心','恩情','昂首','哼','耳朵'];
const finals = finalSymbols.map((s,i)=>({s,word:finalWords[i],tip:'聽一聽，跟著念',audio:i+22}));
finals.push({s:'∅',word:'不加韻母',tip:'例如：ㄋ＋ㄧ → 你'});
const tones = [
 {s:'ˉ',name:'一聲',detail:'高高平平，聲音不轉彎',word:'媽',speech:'媽',note:'一聲不標調號',path:'M 12 14 L 110 14'},
 {s:'ˊ',name:'二聲',detail:'往上爬，聲音往上揚',word:'麻',speech:'麻',note:'從中間往上升',path:'M 12 44 L 110 10'},
 {s:'ˇ',name:'三聲',detail:'先低下去，再往上走',word:'馬',speech:'馬',note:'單念時先降後升',path:'M 12 25 L 56 48 L 110 10'},
 {s:'ˋ',name:'四聲',detail:'溜滑梯，聲音往下降',word:'罵',speech:'罵',note:'從高處往下降',path:'M 12 10 L 110 46'},
 {s:'˙',name:'輕聲',detail:'輕輕短短，跟在詞句裡',word:'嗎',speech:'好嗎',note:'聽「好嗎」的最後一字',path:'M 60 30 L 62 30'}
];
// Optional English examples. Playback is indexed separately by SYLLABLES.
const examples = {};
function add(base, chars){[...chars].forEach((word,t)=>{if(word!=='－')examples[`${base}|${t}`]={word,speech:word};});}
add('ㄇㄚ','媽麻馬罵嗎'); examples['ㄇㄚ|4'].speech='好嗎';
add('ㄅㄚ','八拔把爸吧'); examples['ㄅㄚ|4'].speech='好吧';
add('ㄆㄚ','趴爬－怕－'); add('ㄉㄚ','搭達打大－'); add('ㄊㄚ','他－塔踏－'); add('ㄋㄚ','－拿哪那－'); add('ㄌㄚ','拉－喇辣啦');examples['ㄌㄚ|4'].speech='好啦';
add('ㄈㄚ','發罰法－－'); add('ㄍㄜ','哥格葛各－'); add('ㄎㄜ','科咳可課－'); add('ㄏㄜ','喝河－賀－');
add('ㄐㄧ','雞急幾記－'); add('ㄑㄧ','七旗起氣－'); add('ㄒㄧ','西習洗細－'); add('ㄋㄧ','－泥你逆－'); add('ㄇㄧ','咪迷米密－'); add('ㄌㄧ','－梨李力－');
add('ㄅㄛ','波伯跛播－'); add('ㄆㄛ','坡婆頗破－'); add('ㄇㄛ','摸魔抹墨－'); add('ㄈㄛ','－佛－－－');
add('ㄓ','知直紙至－'); add('ㄔ','吃池尺翅－'); add('ㄕ','詩十史是－'); add('ㄖ','－－－日－');
add('ㄗ','資－子字－');add('ㄘ','疵詞此次－');add('ㄙ','絲－死四－');
add('ㄓㄨ','豬竹主住－');add('ㄔㄨ','初除楚觸－');add('ㄕㄨ','書熟鼠樹－');add('ㄖㄨ','－如乳入－');add('ㄗㄨ','租足祖－－');
add('ㄘㄨ','粗－－醋－');add('ㄙㄨ','蘇俗－速－');
add('ㄅㄠ','包雹寶抱－');add('ㄆㄠ','拋袍跑泡－');add('ㄇㄠ','貓毛卯帽－');add('ㄉㄠ','刀－島到－');add('ㄊㄠ','滔桃討套－');add('ㄋㄠ','－撓腦鬧－');add('ㄌㄠ','撈勞老烙－');add('ㄏㄠ','蒿毫好號－');
add('ㄇㄢ','－饅滿慢－');add('ㄊㄤ','湯糖躺燙－');add('ㄈㄥ','風逢－鳳－');add('ㄍㄨㄛ','鍋國果過－');add('ㄏㄨㄚ','花華－畫－');add('ㄒㄧㄠ','消－小笑－');add('ㄊㄧㄢ','天田舔－－');add('ㄋㄧㄠ','－－鳥尿－');add('ㄒㄩㄝ','靴學雪－－');
add('ㄩ','迂魚雨玉－');add('ㄨ','屋無五物－');add('ㄧ','衣移椅意－');add('ㄞ','哀癌矮愛－');add('ㄦ','－兒耳二－');add('ㄢ','安－俺暗－');add('ㄨㄢ','彎玩碗萬－');
add('ㄅㄧㄝ','－別－－－');
const groups=[initials,medials,finals,tones], labels=['聲母','介音','韻母','聲調'];
let state=[2,3,0,0],auto=true;
try{const saved=JSON.parse(localStorage.getItem('zhuyin-flip-v2'));if(saved&&Array.isArray(saved.state)&&saved.state.length===4&&saved.state.every((n,i)=>Number.isInteger(n)&&n>=0&&n<groups[i].length)){state=saved.state;auto=typeof saved.auto==='boolean'?saved.auto:true;}}catch{}
let activeAudio=null,generation=0,activeTab='practice',game=null,gameReady=false,gameBusy=false,gameRevision=0;
const $=id=>document.getElementById(id);
function persist(){try{localStorage.setItem('zhuyin-flip-v2',JSON.stringify({state,auto}));}catch{}}
function status(zh='',en=''){if(!zh)$('audio-status').replaceChildren();else bilingual($('audio-status'),zh,en);}
let playbackSession=null;
let audioPrefs={rate:.75,repeat:true};
try{const saved=JSON.parse(localStorage.getItem('bopomori-audio-v1'));if(saved){if([.75,1].includes(saved.rate))audioPrefs.rate=saved.rate;if(typeof saved.repeat==='boolean')audioPrefs.repeat=saved.repeat;}}catch{}
function saveAudioPrefs(){try{localStorage.setItem('bopomori-audio-v1',JSON.stringify(audioPrefs));}catch{}}
function stop(){generation++;if(playbackSession)playbackSession.cancel();if(activeAudio){activeAudio.pause();activeAudio=null;}if('speechSynthesis'in window)window.speechSynthesis.cancel();return generation;}
function recording(path,label,conceal=false,slowPath=null){
 const id=stop(),audio=new Audio(slowPath&&audioPrefs.rate<1?slowPath:path);activeAudio=audio;
 audio.playbackRate=slowPath?1:audioPrefs.rate;audio.preservesPitch=true;audio.webkitPreservesPitch=true;audio.mozPreservesPitch=true;
 const total=audioPrefs.repeat?2:1;
 return new Promise(resolve=>{
  let ended=false,pass=1,replayTimer=null,stallTimer=null;
  const finish=ok=>{if(ended)return;ended=true;clearTimeout(replayTimer);clearTimeout(stallTimer);audio.onended=null;audio.onerror=null;audio.pause();if(activeAudio===audio)activeAudio=null;if(playbackSession?.id===id)playbackSession=null;if(id===generation||!playbackSession)$('audio-stop').hidden=true;resolve(ok);};
  playbackSession={id,cancel:()=>finish(false)};
  const fail=()=>{if(ended||id!==generation)return;finish(false);if(activeTab==='practice'&&!$('quick-game').hidden){gameReady=false;gameBusy=false;if(game&&!game.finished)paintQuestion();}if(lessonSession){lessonSession.ready=false;lessonSession.busy=false;paintLesson();}status('錄音無法播放，請重試。','Could not play the recording. Please try again.');};
  const begin=()=>{if(ended||id!==generation)return;status(conceal?`播放題目 ${pass} / ${total}`:`播放：${label} · ${pass} / ${total}`,conceal?`Playing sound ${pass} / ${total}`:`Playing: ${label} · ${pass} / ${total}`);$('audio-stop').hidden=false;stallTimer=setTimeout(fail,15000);audio.play().catch(fail);};
  audio.onerror=fail;
  audio.onended=()=>{if(ended||id!==generation)return;clearTimeout(stallTimer);if(pass<total){pass++;status('稍停後再聽一次','Listen again after a short pause');replayTimer=setTimeout(()=>{if(ended||id!==generation)return;audio.currentTime=0;begin();},650);}else{status();finish(true);}};
  begin();
 });
}
function initAudioControls(){
 $('audio-speed').value=String(audioPrefs.rate);$('audio-repeat').checked=audioPrefs.repeat;
 $('audio-speed').onchange=e=>{audioPrefs.rate=Number(e.target.value)===1?1:.75;saveAudioPrefs();stop();status();};
 $('audio-repeat').onchange=e=>{audioPrefs.repeat=e.target.checked;saveAudioPrefs();stop();status();};
 $('audio-stop').onclick=()=>{stop();status();};
}

function speak(text,label){const id=stop();return new Promise(resolve=>{if(!('speechSynthesis'in window)){status('此音節需裝置中文語音，但瀏覽器不支援。','This syllable needs a device Mandarin voice, which this browser does not support.');resolve(false);return;}
 const run=()=>{if(id!==generation){resolve(false);return;}const voices=speechSynthesis.getVoices();const voice=voices.find(v=>/^zh[-_]TW$/i.test(v.lang))||voices.find(v=>/^zh|^cmn/i.test(v.lang));if(!voice){status('此音節沒有錄音，請安裝裝置中文語音後重試。','No recording is available for this syllable. Install a Mandarin voice on your device and try again.');resolve(false);return;}const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=.8;u.onstart=()=>{if(id===generation){status(`裝置語音：${label}`,`Device voice: ${label}`);resolve(true);}else resolve(false);};u.onend=()=>{if(id===generation)status();};u.onerror=e=>{if(id===generation&&e.error!=='interrupted'&&e.error!=='canceled')status('中文語音無法播放，請重試。','Could not play the Mandarin voice. Please try again.');resolve(false);};speechSynthesis.speak(u);};if(speechSynthesis.getVoices().length)run();else setTimeout(run,250);});}
function key(){return groups.slice(0,3).map((items,i)=>items[state[i]].s.replace('∅','')).join('');}
function notation(base,t){return t===4?'˙'+base:base+(t===0?'':tones[t].s);}
function keyLabel(value){const [base,t]=value.split('|');return notation(base,Number(t));}
async function playSyllable(value,conceal=false){const item=SYLLABLES[value];if(!item){status('字音庫未收錄這個組合。','This combination is not listed in the syllable library.');return false;}const label=keyLabel(value);if(PURE_AUDIO[value])return recording(PURE_AUDIO[value],label,conceal);status("此讀音的語音暫時無法使用。","Audio for this sound is unavailable.");return false;}
function play(g){const item=groups[g][state[g]];if(item.audio)return recording(`audio/F${item.audio}.WAV`,item.s);if(g===3)return playSyllable(`ㄇㄚ|${state[3]}`);stop();status();return Promise.resolve(false);}
function renderCard(g){const item=groups[g][state[g]],el=$(`card-${g}`);el.querySelector('.card-count').textContent=`${state[g]+1}/${groups[g].length}`;const symbol=el.querySelector('.symbol');if(item.s==='∅')bilingual(symbol,'空白');else symbol.textContent=item.s;symbol.className='symbol'+(item.s==='∅'?' empty':'');bilingual(el.querySelector('.listen-label'),item.s==='∅'?'不發音':'發音',item.s==='∅'?'Silent':'Listen');let tip=el.querySelector('.card-inline-tip');if(!tip){tip=document.createElement('p');tip.className='card-inline-tip';el.append(tip);}tip.hidden=item.s==='∅'||item.tip==='聽一聽，跟著念';if(!tip.hidden){if(g===3)bilingual(tip,...toneDescriptions[state[3]]);else bilingual(tip,item.tip);}el.querySelector('.symbol-button').setAttribute('aria-label',`播放${labels[g]} ${item.s} / Play ${english(labels[g])} ${item.s==='∅'?'blank':item.s}`);}
function render(){groups.forEach((_,g)=>renderCard(g));const base=key(),value=`${base}|${state[3]}`,sound=SYLLABLES[value],example=examples[value];if(base)$('assembled').textContent=notation(base,state[3]);else bilingual($('assembled'),'空白','Blank');$('example').replaceChildren();$('combo-note').replaceChildren();
 if(sound){const pronunciation=document.createElement('span');pronunciation.className='pinyin';pronunciation.textContent=sound.pinyin;$('example').append(pronunciation);}
 if(base&&!sound)bilingual($('combo-note'),'字音庫未收錄此組合，可調整符號或聲調。','This combination is not listed. Try changing a symbol or the tone.');
 $('speak-combo').disabled=!sound;bilingual($('speak-combo'),sound?'聽組合發音':base?'未收錄此音節':'請選擇注音',sound?'Play syllable':base?'Syllable not listed':'Choose a sound');
 renderHomophones(value);
 document.querySelectorAll('.symbol-chip').forEach(b=>b.classList.toggle('chosen',state[Number(b.dataset.group)]===Number(b.dataset.index)));persist();}
function select(g,index,shouldPlay=auto){state[g]=index;render();const card=$(`card-${g}`);card.classList.remove('flipping');void card.offsetWidth;card.classList.add('flipping');if(shouldPlay)play(g);else{stop();status();}}
function turn(g,dir){select(g,(state[g]+dir+groups[g].length)%groups[g].length);}
function setExample(a,b,t,playNow=true){const medial=[...'ㄧㄨㄩ'].includes(b[0])?b[0]:'∅';const final=(medial==='∅'?b:b.slice(1))||'∅';const next=[initials.findIndex(x=>x.s===a),medials.findIndex(x=>x.s===medial),finals.findIndex(x=>x.s===final),t];if(next.some(n=>n<0)||t<0||t>4)return;state=next;render();if(playNow)playCombo();}
function setFromKey(value,playNow=true){const [base,t]=value.split('|');const a=initialSymbols.includes(base[0])?base[0]:'∅';setExample(a,(a==='∅'?base:base.slice(1))||'∅',Number(t),playNow);}
function playCombo(){return playSyllable(`${key()}|${state[3]}`);}
function activateTab(name,updateHash=true){if(typeof Journey!=='undefined')Journey.suspend();if(!['practice','game','reference'].includes(name))name='practice';stop();status();invalidateLesson();gameRevision++;gameReady=false;gameBusy=false;activeTab=name;if(name==='game'){if(typeof Journey!=='undefined')Journey.render();}if(name==='practice'&&lessonSession)paintLesson();document.querySelectorAll('[data-tab]').forEach(b=>{const selected=b.dataset.tab===name;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});['practice','game','reference'].forEach(n=>$(`panel-${n}`).hidden=n!==name);if(name==='practice'&&!$('quick-game').hidden&&game&&!game.finished)paintQuestion();if(updateHash&&location.hash!=='#'+name)history.replaceState(null,'','#'+name);}
const GAME_POOL=['ㄇㄚ|0','ㄇㄚ|1','ㄇㄚ|2','ㄇㄚ|3','ㄅㄚ|0','ㄅㄚ|1','ㄅㄚ|2','ㄅㄚ|3','ㄆㄚ|0','ㄆㄚ|1','ㄆㄚ|3','ㄉㄚ|0','ㄉㄚ|1','ㄉㄚ|2','ㄉㄚ|3','ㄊㄚ|0','ㄊㄚ|2','ㄊㄚ|3','ㄋㄧ|2','ㄇㄧ|2','ㄌㄧ|3','ㄅㄠ|0','ㄅㄠ|2','ㄇㄠ|0','ㄇㄠ|1','ㄇㄠ|3','ㄏㄠ|2','ㄒㄧㄠ|2','ㄏㄨㄚ|0','ㄍㄨㄛ|2','ㄊㄧㄢ|0','ㄩ|1','ㄩ|2','ㄩ|3','ㄨ|2','ㄅㄧㄝ|1'].filter(k=>SYLLABLES[k]?.audio&&examples[k]);
function closeListeningCheck(){if(!$('quick-game'))return;stop();gameRevision++;gameReady=false;gameBusy=false;$('quick-game').hidden=true;showPracticeMode('guided');}
function openListeningCheck(){activateTab('practice');stop();status();invalidateLesson();$('guided-practice').hidden=true;$('free-practice').hidden=true;$('quick-game').hidden=false;$('game-intro').hidden=false;$('game-round').hidden=true;$('game-result').hidden=true;updateGameIntro();$('quick-game').scrollIntoView({block:'start'});}
function startGame(){const pool=learnedPool();if(pool.length<2){activateTab('practice');showPracticeMode('guided');startLesson(learning.last);return;}activateTab('practice');$('guided-practice').hidden=true;$('free-practice').hidden=true;$('quick-game').hidden=false;stop();status();gameRevision++;game=Quiz.create(pool,6,Math.random,2);$('game-meter').max=game.questions.length;gameReady=false;gameBusy=false;$('game-intro').hidden=true;$('game-result').hidden=true;$('game-round').hidden=false;paintQuestion();listenQuestion();}
function paintQuestion(){const q=game.questions[game.index];bilingual($('game-progress'),`第 ${game.index+1} / ${game.questions.length} 題`,`Question ${game.index+1} / ${game.questions.length}`);bilingual($('game-score'),`答對 ${game.score} 題`,`${game.score} correct`);$('game-meter').value=game.index+(q.choice!==null?1:0);$('game-choices').replaceChildren();$('game-feedback').replaceChildren();$('game-next').hidden=q.choice===null;$('game-listen').disabled=gameBusy;for(const value of q.options){const b=document.createElement('button');b.className='choice';b.textContent=keyLabel(value);b.dataset.answer=value;b.setAttribute('aria-label',keyLabel(value));b.disabled=!gameReady||q.choice!==null;b.onclick=()=>answerQuestion(value);if(q.choice!==null){if(value===q.key){b.classList.add('correct');const mark=document.createElement('span');mark.className='choice-mark';bilingual(mark,'✓ 正解','Correct answer');b.append(mark);}else if(value===q.choice){b.classList.add('wrong');const mark=document.createElement('span');mark.className='choice-mark';bilingual(mark,'× 你的答案','Your answer');b.append(mark);}}$('game-choices').append(b);}if(q.choice!==null){const correct=q.choice===q.key;bilingual($('game-feedback'),correct?'答對了':'正確答案',correct?'Correct':'Correct answer');const detail=document.createElement('span');detail.className='answer-detail';const e=LESSONS.flatMap(l=>l.items).find(x=>x.key===q.key)||{char:SYLLABLES[q.key].sourceWord,en:''};detail.textContent=`${keyLabel(q.key)} · 例字 / Example: ${e.char}`;const meaning=document.createElement('span');meaning.className='en';meaning.lang='en';meaning.textContent=e.en;detail.append(meaning);$('game-feedback').append(detail);bilingual($('game-next'),game.index===game.questions.length-1?'查看結果':'下一題',game.index===game.questions.length-1?'Results':'Next');}else if(!gameReady)bilingual($('game-feedback'),'先播放題目，再選答案。','Play the sound, then choose an answer.');}
async function listenQuestion(){if(!game||game.finished||gameBusy)return;const revision=gameRevision;gameBusy=true;paintQuestion();const ok=await playSyllable(game.questions[game.index].key,true);if(revision!==gameRevision||activeTab!=='practice'||$('quick-game').hidden)return;gameBusy=false;gameReady=ok;paintQuestion();}
function answerQuestion(value){if(!gameReady||gameBusy)return;if(Quiz.answer(game,value)===null)return;stop();status();paintQuestion();}
function nextQuestion(){if(!Quiz.next(game))return;gameRevision++;gameReady=false;gameBusy=false;stop();status();if(game.finished){showResult();return;}paintQuestion();listenQuestion();}
function showResult(){$('game-round').hidden=true;$('game-result').hidden=false;$('game-total').textContent=`${game.score} / ${game.questions.length}`;$('game-review').replaceChildren();const missed=game.questions.filter(q=>q.choice!==q.key);if(missed.length){const title=document.createElement('h3');bilingual(title,'複習錯題','Review missed sounds');$('game-review').append(title);const items=document.createElement('div');items.className='review-items';missed.forEach(q=>{const b=document.createElement('button');b.textContent=keyLabel(q.key);const label=document.createElement('span');label.className='en';label.lang='en';label.textContent='Practice';b.append(label);b.setAttribute('aria-label',`練習 ${keyLabel(q.key)} / Practice`);b.onclick=()=>{activateTab('practice');showPracticeMode('free');setFromKey(q.key);};items.append(b);});$('game-review').append(items);}else{const p=document.createElement('p');bilingual(p,'全部答對','All answers correct');$('game-review').append(p);}}
// UI initialization
groups.forEach((_,g)=>{const card=document.createElement('article');card.id=`card-${g}`;card.className='flip-card';card.setAttribute('aria-label',`${labels[g]}翻頁卡 / ${english(labels[g])} flip card`);card.innerHTML=`<div class="card-top"><span>${bilingualHTML(labels[g])}</span><span class="card-count"></span></div><button class="symbol-button"><span class="symbol"></span><span class="listen-label"></span></button><div class="card-controls"><button class="page-button prev" aria-label="上一個${labels[g]} / Previous ${english(labels[g])}">‹</button><button class="page-button next" aria-label="下一個${labels[g]} / Next ${english(labels[g])}">›</button></div>`;$('cards').append(card);card.querySelector('.symbol-button').onclick=()=>play(g);card.querySelector('.prev').onclick=()=>turn(g,-1);card.querySelector('.next').onclick=()=>turn(g,1);card.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();turn(g,e.key==='ArrowRight'?1:-1);}});let start=null;card.addEventListener('touchstart',e=>{start=[e.changedTouches[0].clientX,e.changedTouches[0].clientY];},{passive:true});card.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start[0],dy=e.changedTouches[0].clientY-start[1];if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))turn(g,dx<0?1:-1);start=null;},{passive:true});});
[['ㄇ','ㄚ',0,'媽'],['ㄅ','ㄧㄝ',1,'別'],['ㄋ','ㄧ',2,'你'],['ㄒ','ㄧㄠ',2,'小']].forEach(([a,b,t,label])=>{const el=document.createElement('button');el.className='preset';bilingual(el,label);el.setAttribute('aria-label',`練習 ${notation(a+b,t)} / Practice ${english(label)}`);el.onclick=()=>setExample(a,b,t);$('presets').append(el);});
const toneDescriptions=[['高平','High and level'],['上升','Rising'],['先降後升','Dipping, then rising'],['下降','Falling'],['輕短','Light and short']];
tones.forEach((t,i)=>{const b=document.createElement('button');b.className='tone-tile';b.setAttribute('aria-label',`播放${t.name} / Play ${english(t.name)}`);b.innerHTML=`<div class="tone-title">${bilingualHTML(t.name)}</div><svg class="tone-curve" viewBox="0 0 122 58" aria-hidden="true"><path d="M 8 50 H 114" stroke="#e5e8df" stroke-dasharray="3 5"/><path d="${t.path}" stroke="currentColor" fill="none" stroke-width="${i===4?10:4}" stroke-linecap="round" stroke-linejoin="round"/></svg><div><span class="tone-word">${t.word}</span>${notation('ㄇㄚ',i)}<span class="en" lang="en">${english(t.word)}</span></div><p>${bilingualHTML(...toneDescriptions[i])}</p>`;b.onclick=()=>playSyllable(`ㄇㄚ|${i}`);$('tone-grid').append(b);});
[[0,initials,'聲母'],[1,medials,'介音'],[2,finals,'韻母']].forEach(([g,items,title])=>{const row=document.createElement('div');row.className='symbol-row';const h=document.createElement('h3');bilingual(h,title);const list=document.createElement('div');list.className='symbol-list';items.forEach((item,j)=>{const b=document.createElement('button');b.className='symbol-chip';if(item.s==='∅')bilingual(b,'空白');else b.textContent=item.s;b.dataset.group=g;b.dataset.index=j;b.setAttribute('aria-label',`選擇${title} ${item.s} / Select ${english(title)} ${item.s==='∅'?'blank':item.s}`);b.onclick=()=>{activateTab('practice');showPracticeMode('free');select(g,j,true);};list.append(b);});row.append(h,list);$('library-content').append(row);});
$('auto').checked=auto;$('auto').onchange=e=>{auto=e.target.checked;persist();};$('speak-combo').onclick=playCombo;$('reset').onclick=()=>{stop();status();state=[2,3,0,0];render();};
document.querySelectorAll('[data-tab]').forEach(b=>{b.onclick=()=>activateTab(b.dataset.tab);b.onkeydown=e=>{const names=['practice','game','reference'],index=names.indexOf(b.dataset.tab);let target;if(e.key==='ArrowRight')target=(index+1)%3;else if(e.key==='ArrowLeft')target=(index+2)%3;else if(e.key==='Home')target=0;else if(e.key==='End')target=2;else return;e.preventDefault();activateTab(names[target]);$(`tab-${names[target]}`).focus();};});
$('quiz-back').onclick=()=>learningHome();$('game-review-lesson').onclick=()=>{activateTab('practice');showPracticeMode('guided');startLesson(learning.last);};$('game-start').onclick=startGame;$('game-restart').onclick=startGame;$('game-listen').onclick=listenQuestion;$('game-next').onclick=nextQuestion;
$('help-open').onclick=()=>{$('help-dialog').showModal();};$('help-close').onclick=()=>{$('help-dialog').close();};$('help-dialog').addEventListener('click',e=>{if(e.target!==$('help-dialog'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();});
window.addEventListener('hashchange',()=>activateTab(location.hash.slice(1),false));document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();status();if(typeof Journey!=='undefined'){Journey.suspend();Journey.render();}invalidateLesson();if(lessonSession)paintLesson();gameRevision++;gameBusy=false;gameReady=false;if(game&&!game.finished)paintQuestion();}});initAudioControls();learningInit();render();activateTab(location.hash.slice(1)||'practice',false);

