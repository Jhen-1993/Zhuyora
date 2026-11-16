'use strict';
// Layered browser animation. No remote video, prize calculation or save mutation lives here.
const Finale=(()=>{
 let current=null,muted=false,reduced=false;
 try{muted=localStorage.getItem('zhuyora-finale-sound')==='off';reduced=localStorage.getItem('zhuyora-reduce-motion')==='true';}catch{}
 const systemReduced=()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 function stop(){current?.close();}
 function play(spec){
  stop();let closed=false;const dialog=document.createElement('dialog');dialog.className=`finale-dialog finale-${spec.id}`;
  const script=typeof FINALE_SCRIPTS==='undefined'?{}:FINALE_SCRIPTS[spec.id]||{};
  const isYubao=spec.id==='yubao'||spec.id==='yubao-full',isFull=spec.id==='yubao-full';
  const rewardZh=spec.preview?'演出完成':isFull?'語寶完整覺醒！':isYubao?'語寶誕生了！':'傳說之印，收藏完成';
  const rewardEn=spec.preview?'Performance complete':isFull?'Yubao is fully awakened!':isYubao?'Yubao has awakened!':'Your Legend Seal is collected.';
  dialog.setAttribute('aria-label',`${spec.title} / ${spec.en}`);
  const make=(tag,cls,zh,en)=>node(tag,cls,zh,en);
  const controls=make('div','finale-controls');
  const sound=action(muted?'開啟聲音':'靜音',muted?'Sound on':'Mute',()=>{muted=!muted;try{localStorage.setItem('zhuyora-finale-sound',muted?'off':'on');}catch{}bilingual(sound,muted?'開啟聲音':'靜音',muted?'Sound on':'Mute');if(muted){audioCtx?.close().catch(()=>{});stopSpeech();speechDone=true;dajiSilent();finishAct();}else{chime();if(['act','complete'].includes(dialog.dataset.phase))speak();}},'finale-control');
  const motionLabel=make('label','finale-motion');const motion=make('input','');motion.type='checkbox';motion.checked=reduced||systemReduced();motionLabel.append(motion,make('span','','減少動態','Reduce motion'));
  const skip=action('略過動畫','Skip',()=>close(),'finale-control');controls.append(sound,motionLabel,skip);
  const scene=make('div','finale-scene');const target=make('div','finale-character');
  const img=make('img','finale-main');img.src=script.entranceArt||spec.art;img.alt=`${spec.title} / ${spec.en}`;target.append(img);
  for(let i=0;i<6;i++){const part=make('img','finale-piece');part.src=script.entranceArt||spec.art;part.alt='';part.style.setProperty('--piece',i);const row=Math.floor(i/2),col=i%2;part.style.clipPath=`inset(${row*100/3}% ${(1-col)*50}% ${(2-row)*100/3}% ${col*50}%)`;part.style.setProperty('--px',`${(col?1:-1)*(80+row*25)}vw`);part.style.setProperty('--py',`${(row-1)*80}vh`);target.append(part);}
  if(script.actionArt){
   const rig=make('div','finale-action-rig');rig.setAttribute('aria-hidden','true');
   const pose=make('img','finale-action');pose.alt='';pose.onload=()=>{if(!closed)dialog.classList.add('action-ready');};pose.onerror=()=>dialog.classList.remove('action-ready');pose.src=script.actionArt;rig.append(pose);
   if(spec.id==='wukong'){const pivot=make('div','staff-pivot');for(const name of ['staff-trail trail-one','staff-trail trail-two','hero-staff'])pivot.append(make('span',name));rig.append(pivot);const arc=make('div','staff-arc');rig.append(arc);}
   if(spec.id==='nezha'){for(let i=0;i<2;i++){const wheel=make('div','action-wheel');wheel.style.setProperty('--wheel',i);rig.append(wheel);}}
   target.append(rig);
  }
  if(spec.id==='yubao'){const sprite=make('div','yubao-sprite');sprite.setAttribute('aria-hidden','true');target.append(sprite);const probe=new Image();probe.onload=()=>dialog.classList.add('sprite-ready');probe.src='assets/yubao-states.png';}
  if(spec.id==='snake-bride'){const sprite=make('div','bride-sprite');sprite.setAttribute('aria-hidden','true');target.append(sprite);const probe=new Image();probe.onload=()=>dialog.classList.add('sprite-ready');probe.src='assets/snake-bride-states.png';}
  if(script.sprite){
   const rig=make('div','character-sprite-rig');rig.setAttribute('aria-hidden','true');
   for(const cls of spec.id==='nuwa'?['character-sprite sprite-upper','character-sprite sprite-tail']:['character-sprite']){const layer=make('div',cls);layer.style.backgroundImage=`url("${script.sprite}")`;rig.append(layer);}
   target.append(rig);const probe=new Image();probe.onload=()=>{if(!closed)dialog.classList.add('character-sprite-ready');};probe.onerror=()=>dialog.classList.remove('character-sprite-ready');probe.src=script.sprite;
  }
  if(script.commandSprite){
   const rig=make('div','daji-performance');rig.setAttribute('aria-hidden','true');
   const veil=make('img','daji-illusion');veil.src=script.entranceArt;veil.alt='';rig.append(veil);
   const fighter=make('div','daji-fighter');fighter.style.backgroundImage=`url("${script.commandSprite}")`;rig.append(fighter);
   const probe=new Image();probe.onload=()=>{if(!closed)dialog.classList.add('daji-rig-ready');};probe.onerror=()=>dialog.classList.remove('daji-rig-ready');probe.src=script.commandSprite;
   for(let i=0;i<12;i++){const shard=make('img','daji-shard');shard.src=script.entranceArt;shard.alt='';const col=i%3,row=Math.floor(i/3);shard.style.clipPath=`inset(${row*25}% ${(2-col)*100/3}% ${(3-row)*25}% ${col*100/3}%)`;shard.style.setProperty('--sx',`${(col-1)*85+(i%2?20:-20)}%`);shard.style.setProperty('--sy',`${(row-1.5)*60}%`);shard.style.setProperty('--sr',`${(i%2?1:-1)*(25+i*5)}deg`);rig.append(shard);}
   for(const cls of ['daji-break-ring','daji-shield-trail','daji-ground-ring'])rig.append(make('span',cls));
   for(let i=0;i<8;i++){const dust=make('span','daji-dust');dust.style.setProperty('--dust',i);rig.append(dust);}target.append(rig);
  }
  const decorations=make('div','finale-decor');decorations.setAttribute('aria-hidden','true');
  const names=spec.id==='wukong'?['cloud','cloud']:spec.id==='nezha'?['lotus','ribbon']:spec.id==='snake-bride'?['mountain','mountain','mist','flower','flower','flower']:isYubao?['open-book','page','page','star',...(isFull?Array(9).fill('orbit-seal'):[])]:spec.id==='nuwa'?['sky-rift','stone','stone','stone','stone','stone']:spec.id==='houyi'?[...Array(10).fill('sun'),'arrow']:spec.id==='change'?['moon','cloud']:spec.id==='tsou'?['leaf','leaf','leaf']:spec.id==='kavalan'?['wave','wave']:['commander-banner','commander-banner'];
  names.forEach((name,i)=>{const el=make('div','fx-'+name);el.style.setProperty('--n',i);decorations.append(el);});
  for(let i=0;i<16;i++){const star=make('span','finale-spark');star.textContent=i%3?'✧':'ㄅ';star.style.setProperty('--n',i);star.style.setProperty('--x',`${8+i*5.5}%`);star.style.setProperty('--y',`${15+(i%4)*15}%`);star.style.setProperty('--size',`${15+(i%3)*8}px`);decorations.append(star);}
  const seal=make('div','finale-seal',rewardZh,rewardEn);
  const caption=make('div','finale-caption');caption.setAttribute('aria-live','polite');
  const dialogue=make('div','finale-dialogue');dialogue.hidden=true;
  const quote=make('div','finale-quote');quote.setAttribute('aria-label',script.narrator?'旁白 / Narration':'角色台詞 / Character dialogue');
  const quoteLines=(script.lines||[]).map(l=>{const p=make('p','finale-quote-line',l.zh,l.en);quote.append(p);return p;});
  const voiceStatus=make('p','finale-voice-status');voiceStatus.setAttribute('role','status');
  const listen=action('聽台詞','Listen to dialogue',()=>{if(closed)return;if(['seal','return'].includes(dialog.dataset.phase)){clear();stage('complete',spec.title,spec.en);endActions.hidden=false;skip.hidden=true;}muted=false;try{localStorage.setItem('zhuyora-finale-sound','on');}catch{}bilingual(sound,'靜音','Mute');speak();},'finale-control');
  dialogue.append(quote,make('small','finale-credit',script.credit||'原創改編台詞 · 非原著引文',script.creditEn||'Original adapted dialogue · Not a quotation'),voiceStatus,listen);
  const fallback=make('p','finale-fallback','圖片暫時無法載入，收藏已解鎖。','The image could not load. Your collection is still unlocked.');fallback.hidden=true;img.onerror=()=>{fallback.hidden=false;dialog.classList.add('asset-failed');};
  const introduction=make('section','finale-introduction');introduction.hidden=true;
  if(script.intro){
   introduction.append(make('h2','','另一種妲己','Another perspective on Daji'),make('p','',script.intro.zh,script.intro.en));
   const source=make('a','','研究來源：中央研究院〈研之有物〉','Source: Academia Sinica');source.href=script.intro.url;source.target='_blank';source.rel='noopener noreferrer';
   introduction.append(source,action(script.introAfter?'完成演出':'繼續演出',script.introAfter?'Finish performance':'Continue performance',()=>{if(!closed&&dialog.dataset.phase==='intro'){introduction.hidden=true;if(script.introAfter)showSeal();else beginAct();}},'primary'));
  }
  scene.append(decorations,target,seal);dialog.append(controls,scene,caption,introduction,dialogue,fallback);
  const endActions=make('div','finale-end');const replay=action('重播','Replay',()=>start(),'secondary');const done=action(spec.preview?'關閉預覽':'查看收藏',spec.preview?'Close preview':'View collection',()=>close(),'primary');endActions.append(replay,done);dialog.append(endActions);endActions.hidden=true;
  let timers=[],animation=null,audioCtx=null,voice=null,voiceTimer=null,voiceToken=0,actReady=false,speechDone=true;const previousFocus=document.activeElement;
  const later=(fn,ms)=>{timers.push(setTimeout(()=>{if(!closed)fn();},ms));};
  const dajiBeats=['illusion','shatter','shield','raise','stomp','hold'];let dajiAt=-1,dajiDone=!script.commandSprite,dajiFallback=false;
  function dajiCue(beat){
   if(closed||!script.commandSprite||motion.checked||dialog.dataset.phase!=='act')return;
   const at=dajiBeats.indexOf(beat);if(at<=dajiAt)return;dajiAt=at;dialog.dataset.dajiBeat=beat;
   if(at>=1)img.src=script.commanderArt||spec.art;
   if(beat==='hold'){dajiDone=true;finishAct();}
  }
  function dajiSilent(){
   if(!script.commandSprite||motion.checked||dialog.dataset.phase!=='act'||dajiFallback||dajiDone)return;
   dajiFallback=true;dajiBeats.slice(dajiAt+1).forEach((beat,i)=>later(()=>dajiCue(beat),1000+i*1200));
  }
  function dajiLine(index){
   if(!script.commandSprite||motion.checked||dialog.dataset.phase!=='act')return;
   if(index===0)dajiCue('illusion');
   if(index===1){dajiCue('shatter');later(()=>dajiCue('shield'),1100);}
   if(index===3){dajiCue('raise');later(()=>dajiCue('stomp'),750);later(()=>dajiCue('hold'),1800);}
  }
  function stopSpeech(){voiceToken++;clearTimeout(voiceTimer);voiceTimer=null;if(voice){voice.onended=voice.onerror=null;voice.pause();voice=null;}quoteLines.forEach(p=>p.classList.remove('is-speaking'));}
  const clear=()=>{timers.forEach(clearTimeout);timers=[];animation?.cancel();animation=null;stopSpeech();};
  function speak(){
   if(closed)return;stopSpeech();speechDone=false;voiceStatus.textContent='';const token=voiceToken;let at=0;
   const finish=()=>{if(closed||token!==voiceToken)return;stopSpeech();speechDone=true;finishAct();};
   const failed=()=>{if(closed||token!==voiceToken)return;bilingual(voiceStatus,'語音未播放，請按「聽台詞」重試。','Audio did not play. Press Listen to dialogue to retry.');dajiSilent();finish();};
   const next=()=>{
    if(closed||token!==voiceToken)return;clearTimeout(voiceTimer);quoteLines.forEach(p=>p.classList.remove('is-speaking'));
    if(at>=(script.lines||[]).length){finish();return;}
    const l=script.lines[at];dajiLine(at);quoteLines[at].classList.add('is-speaking');at++;
    try{voice=new Audio(l.audio);voice.playbackRate=1;voice.onended=next;voice.onerror=failed;voiceTimer=setTimeout(failed,25000);const pending=voice.play();pending?.catch(failed);}catch{failed();}
   };next();
  }
  function showSeal(){img.src=spec.art;stage('seal',rewardZh,rewardEn);chime();later(spec.preview?finish:flyHome,2500);}
  function finishAct(){if(closed||dialog.dataset.phase!=='act'||!actReady||!speechDone||!dajiDone)return;if(script.introAfter){stage('intro',spec.title,spec.en);introduction.hidden=false;introduction.querySelector('button').focus();return;}showSeal();}
  function chime(){if(muted||closed)return;try{if(!audioCtx||audioCtx.state==='closed')audioCtx=new (window.AudioContext||window.webkitAudioContext)();audioCtx.resume().catch(()=>{});[523.25,659.25,783.99].forEach((hz,i)=>{const osc=audioCtx.createOscillator(),gain=audioCtx.createGain(),t=audioCtx.currentTime+i*.12;osc.frequency.value=hz;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.035,t+.02);gain.gain.exponentialRampToValueAtTime(.001,t+.42);osc.connect(gain);gain.connect(audioCtx.destination);osc.start(t);osc.stop(t+.45);});}catch{}}
  function stage(name,zh,en){dialog.dataset.phase=name;bilingual(caption,zh,en);}
  function finish(){clear();stage('complete',spec.title,spec.en);endActions.hidden=false;skip.hidden=true;replay.focus();}
  function flyHome(){
   stage('return','收藏完成','Added to your collection');
   // Measure the actual destination after all responsive layout has settled.
   const destination=spec.target?.getBoundingClientRect?.(),from=target.getBoundingClientRect();
   if(destination&&destination.width>0&&destination.height>0&&typeof target.animate==='function'){
    const dx=destination.left+destination.width/2-(from.left+from.width/2),dy=destination.top+destination.height/2-(from.top+from.height/2),scale=Math.min(destination.width/from.width,destination.height/from.height);
    animation=target.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx}px,${dy}px) scale(${scale})`,opacity:1}],{duration:1100,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
   }
   later(()=>close(),1300);
  }
  function beginAct(){stage('act',spec.title,spec.en);dajiCue('illusion');dialogue.hidden=!quoteLines.length;if(!muted&&quoteLines.length)speak();else dajiSilent();later(()=>{actReady=true;finishAct();},script.duration||4200);}
  function start(){
   if(closed)return;
   clear();dajiAt=-1;dajiDone=!script.commandSprite;dajiFallback=false;dialog.dataset.dajiBeat='';img.src=script.entranceArt||spec.art;actReady=false;speechDone=true;dialogue.hidden=true;introduction.hidden=true;voiceStatus.textContent='';endActions.hidden=true;skip.hidden=false;dialog.classList.remove('reduced');
   if(motion.checked){img.src=spec.art;dialog.classList.add('reduced');stage('complete',spec.title,spec.en);dialogue.hidden=!quoteLines.length;endActions.hidden=false;skip.hidden=true;introduction.hidden=!script.intro;if(script.intro)introduction.querySelector('button').hidden=true;return;}
   if(script.intro)introduction.querySelector('button').hidden=false;
   stage('assemble',isFull?'九枚印記，點亮新的篇章':isYubao?'三枚印記打開了書':'六片拼圖回到原位',isFull?'Nine seals light up a new chapter.':isYubao?'Three seals open the book.':'Six pieces come together.');
   later(()=>stage('light','故事中的光，亮起來了','The story comes to life.'),1800);
   later(()=>{stage('reveal',spec.title,spec.en);chime();},3000);
   later(()=>{if(script.intro&&!script.introAfter){stage('intro',spec.title,spec.en);introduction.hidden=false;introduction.querySelector('button').focus();}else beginAct();},4300);
  }
  function close(){if(closed)return;closed=true;clear();audioCtx?.close().catch(()=>{});if(current?.dialog===dialog)current=null;dialog.close();dialog.remove();previousFocus?.focus?.();spec.onclose?.();}
  motion.onchange=()=>{reduced=motion.checked;try{localStorage.setItem('zhuyora-reduce-motion',String(reduced));}catch{}start();};
  dialog.addEventListener('cancel',e=>{e.preventDefault();close();});dialog.addEventListener('close',()=>{if(!closed)close();});
  document.body.append(dialog);current={dialog,close};try{dialog.showModal();skip.focus();start();}catch{close();}
  return {close,dialog};
 }
 return{play,stop};
})();
