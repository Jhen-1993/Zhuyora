'use strict';
const SecretRules=(()=>{
 const ids=['sound','bridge','memory'];
 const required=['wukong','nezha','snake-bride'];
 // A fixed edition: adding a future book must not move this goal or revoke its reward.
 const masterRequired=['wukong','nuwa','houyi','nezha','change','snake-bride','tsou','kavalan','daji'];
 const masterIds=['listening','ordering','sentences'];
 const fresh=()=>({version:1,completed:[],revealSeen:false,masterCompleted:[],masterSeen:false,masterEdition:'nine-v1'});
 function normalize(raw){const s=fresh();if(raw?.version===1){s.completed=[...new Set((Array.isArray(raw.completed)?raw.completed:[]).filter(x=>ids.includes(x)))];s.revealSeen=s.completed.length===3&&raw.revealSeen===true;s.masterCompleted=s.completed.length===3?[...new Set((Array.isArray(raw.masterCompleted)?raw.masterCompleted:[]).filter(x=>masterIds.includes(x)))]:[];s.masterSeen=s.masterCompleted.length===3&&raw.masterSeen===true;}return s;}
 function seals(records){return STORY_WORLDS.filter(w=>createJourneyRules(w).completeBook(createJourneyRules(w).normalize(records[w.id]))).map(w=>w.id);}
 function questOpen(s,id){const i=ids.indexOf(id);return i>=0&&(i===0||s.completed.includes(ids[i-1]));}
 const libraryOpen=records=>required.every(id=>seals(records).includes(id));
 function complete(s,id,records){if(!libraryOpen(records)||!questOpen(s,id))return false;const first=!s.completed.includes(id);if(first)s.completed.push(id);return first;}
 const awake=s=>ids.every(id=>s.completed.includes(id));
 // Previously learned sounds and sentences only. No new speech engine is introduced.
 const gates=[
  {word:'山',en:'mountain',audio:JOURNEY.chapters[0].words[0].audio,slowAudio:JOURNEY.chapters[0].words[0].slowAudio,correct:'ㄕㄢ',options:[['ㄕㄢ','shān'],['ㄕㄢˇ','shǎn']]},
  {word:'花',en:'flower',audio:NEZHA.chapters[4].words[0].audio,slowAudio:NEZHA.chapters[4].words[0].slowAudio,correct:'ㄏㄨㄚ',options:[['ㄏㄨㄚˋ','huà'],['ㄏㄨㄚ','huā']]},
  {word:'飛',en:'fly',audio:NEZHA.chapters[5].words[2].audio,slowAudio:NEZHA.chapters[5].words[2].slowAudio,correct:'ㄈㄟ',options:[['ㄈㄟ','fēi'],['ㄈㄟˊ','féi']]}
 ];
 const bridges=[JOURNEY.chapters[0],NEZHA.chapters[4],SNAKE_BRIDE.chapters[0]].map(c=>({tiles:c.build,zh:c.build.join(''),en:c.buildEn,audio:c.lines.find(l=>l.zh===c.build.join(''))?.audio}));
 const pairs=[{zh:'悟空會飛。',en:'Wukong can fly.',book:JOURNEY.title,audio:JOURNEY.chapters[2].lines[4].audio},{zh:'媽媽很難過。',en:'His mom is very sad.',book:NEZHA.title,audio:NEZHA.chapters[3].lines[2].audio},{zh:'兩個人一起生活。',en:'The two live together.',book:SNAKE_BRIDE.title,audio:SNAKE_BRIDE.chapters[3].lines[1].audio}];
 const masterAwake=s=>awake(s)&&masterIds.every(id=>s.masterCompleted.includes(id));
 const masterOpen=(s,records)=>masterAwake(s)||(awake(s)&&masterRequired.every(id=>seals(records).includes(id)));
 function masterQuestOpen(s,id){const i=masterIds.indexOf(id);return i>=0&&(i===0||s.masterCompleted.includes(masterIds[i-1]));}
 function completeMaster(s,id,records){if(!masterOpen(s,records)||!masterQuestOpen(s,id))return false;const first=!s.masterCompleted.includes(id);if(first)s.masterCompleted.push(id);return first;}
 // All challenge material is drawn directly from these nine books, never from unlearned vocabulary.
 function masterTasks(id){
  const get=(book,ch)=>STORY_WORLDS.find(w=>w.id===book)?.chapters[ch];
  const build=(book,ch)=>{const c=get(book,ch);return c&&{tiles:c.build.map(zh=>({zh,en:''})),zh:c.build.join(''),en:c.buildEn,audio:c.lines.find(l=>l.zh===c.build.join(''))?.audio};};
  if(id==='listening')return [['nuwa',3],['change',4],['daji',5]].map(([book,ch])=>{const c=get(book,ch);if(!c)return null;const target=c.lines.find(l=>l.zh===c.build.join(''))||c.lines[0];return{...target,options:[target,...c.lines.filter(l=>l.zh!==target.zh).slice(0,2)]};}).filter(Boolean);
  if(id==='ordering')return [['houyi',[0,2,5]],['change',[1,3,5]],['snake-bride',[0,3,5]]].map(([book,chs])=>{const w=STORY_WORLDS.find(w=>w.id===book);if(!w)return null;return {title:w.title,en:w.english,tiles:chs.map(i=>w.chapters[i].lines[0])};}).filter(Boolean);
  if(id==='sentences')return [['tsou',5],['kavalan',4],['daji',5]].map(([book,ch])=>build(book,ch)).filter(Boolean);
  return [];
 }
 return{ids,required,fresh,normalize,seals,libraryOpen,questOpen,complete,awake,gates,bridges,pairs,masterRequired,masterIds,masterOpen,masterAwake,masterQuestOpen,completeMaster,masterTasks};
})();
