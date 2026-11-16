'use strict';
function node(tag,cls,zh,en){const el=document.createElement(tag);el.className=cls;if(zh!==undefined)bilingual(el,zh,en);return el;}
function action(zh,en,fn,cls='secondary'){const el=node('button',cls,zh,en);el.type='button';el.onclick=fn;return el;}
for(const [id,title,en] of [['wukong','孫悟空','Sun Wukong'],['nuwa','女媧補天','Nüwa'],['houyi','后羿射日','Hou Yi'],['nezha','哪吒','Nezha'],['change','嫦娥奔月','Chang’e'],['snake-bride','百步蛇新娘','The Hundred-Pacer’s Bride'],['tsou','鄒族：楓樹與足跡','Tsou: Tree & footprints'],['kavalan','噶瑪蘭公主','Princess Kavalan'],['daji','妲己・破除妖姬形象','Daji · Breaking the illusion'],['yubao','小語寶甦醒','Little Yubao awakens'],['yubao-full','語寶完整覺醒','Yubao’s full awakening']]){
 const card=node('article','world-card'),image=node('img','world-preview');card.id=`preview-${id}`;image.src=`assets/${id==='daji'?'daji-dual-seal':id}.png`;image.alt=`${title} / ${en}`;
 card.append(image,node('h2','',title,en),action('觀看演出','Watch & listen',()=>Finale.play({id,title,en,art:image.src,target:image,preview:true}),'primary'));
 document.getElementById('preview-cards').append(card);
}
window.addEventListener('pagehide',()=>Finale.stop());
