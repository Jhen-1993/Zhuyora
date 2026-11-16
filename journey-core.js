'use strict';
function createJourneyRules(JOURNEY){return (()=>{
 const fresh=()=>({version:1,completed:[],xp:0,bonusDays:[],awakeningSeen:false});
 function normalize(raw){const s=fresh();if(!raw||raw.version!==1)return s;s.completed=[...new Set((Array.isArray(raw.completed)?raw.completed:[]).filter(id=>JOURNEY.chapters.some(c=>c.id===id)))];s.bonusDays=[...new Set((Array.isArray(raw.bonusDays)?raw.bonusDays:[]).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)))];s.xp=s.completed.length*20+s.bonusDays.length*5;s.awakeningSeen=completeBook(s)&&raw.awakeningSeen===true;return s;}
 const pieces=s=>JOURNEY.chapters.filter(c=>s.completed.includes(c.id)).length;
 const completeBook=s=>pieces(s)===JOURNEY.chapters.length;
 function dayKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
 function unlocked(s,index){return index===0||s.completed.includes(JOURNEY.chapters[index-1]?.id);}
 function complete(s,index,day=dayKey()){
  const c=JOURNEY.chapters[index];if(!c||!unlocked(s,index))return null;
  const first=!s.completed.includes(c.id),daily=!s.bonusDays.includes(day);
  if(first)s.completed.push(c.id);if(daily)s.bonusDays.push(day);const earned=(first?20:0)+(daily?5:0);s.xp+=earned;
  return{earned,first,daily,piece:first?index:null,full:completeBook(s)};
 }
 function quiz(index,rng=Math.random){const c=JOURNEY.chapters[index];const questions=[];
  const choiceCount=Math.min(c.words.length,(JOURNEY.level||1)+1);
  const options=i=>Quiz.shuffle([c.words[i],...Quiz.shuffle(c.words.filter((_,j)=>j!==i),rng).slice(0,choiceCount-1)],rng);
  for(let i=0;i<c.words.length;i++)questions.push({kind:'listen',word:i,options:options(i),solved:false,tries:0});
  for(const i of [0,c.words.length-1])questions.push({kind:'meaning',word:i,options:options(i),solved:false,tries:0});
  questions.push({kind:'build',tiles:Quiz.shuffle(c.build.map((text,id)=>({text,id})),rng),chosen:[],solved:false,tries:0});return{index,at:0,questions,finished:false,reward:null};}
 function answer(q,choice,chapter){if(q.solved)return null;q.tries++;const correct=q.kind==='build'?choice===chapter.build.join(''):choice===chapter.words[q.word].zh;if(correct)q.solved=true;return correct;}
 function advance(session){if(session.finished||!session.questions[session.at].solved)return false;if(session.at===session.questions.length-1)session.finished=true;else session.at++;return true;}
 function award(s,session,day){if(!session.finished||session.reward||session.questions.some(q=>!q.solved))return null;session.reward=complete(s,session.index,day);return session.reward;}
 return{fresh,normalize,pieces,completeBook,dayKey,unlocked,complete,quiz,answer,advance,award};
})();}
const JourneyRules=createJourneyRules(JOURNEY);
