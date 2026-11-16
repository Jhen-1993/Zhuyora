'use strict';
// Pure quiz rules. Audio and UI are handled separately in app.js.
const Quiz=(()=>{
 function shuffle(values,rng=Math.random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function create(pool,count=10,rng=Math.random,optionCount=4){const unique=[...new Set(pool)];optionCount=Math.min(optionCount,unique.length);if(optionCount<2)throw Error('At least two unique syllables are required.');const targets=shuffle(unique,rng).slice(0,Math.min(count,unique.length));return{questions:targets.map(key=>{const base=key.split('|')[0];const similar=shuffle(unique.filter(x=>x!==key&&x.split('|')[0]===base),rng).slice(0,optionCount-1);const other=shuffle(unique.filter(x=>x!==key&&!similar.includes(x)),rng).slice(0,optionCount-1-similar.length);return{key,options:shuffle([key,...similar,...other],rng),choice:null};}),index:0,score:0,finished:false};}
 function answer(game,choice){const q=game.questions[game.index];if(game.finished||q.choice!==null||!q.options.includes(choice))return null;q.choice=choice;const correct=choice===q.key;if(correct)game.score++;return correct;}
 function next(game){if(game.finished||game.questions[game.index].choice===null)return false;if(game.index===game.questions.length-1)game.finished=true;else game.index++;return true;}
 return{shuffle,create,answer,next};
})();
