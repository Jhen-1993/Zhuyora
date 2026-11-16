'use strict';
// Original short beginner retelling of the public-domain Journey to the West.
// Simplifies and selects the main story arc; it is not the unabridged original.
const JOURNEY={title:'西遊記',english:'Journey to the West',version:1,chapters:[
 {id:'stone',title:'石猴出生',en:'A monkey is born',icon:'石',words:[
  {zh:'山',en:'mountain',zy:'ㄕㄢ',py:'shān'},
  {zh:'石頭',en:'rock',zy:'ㄕˊ ㄊㄡ˙',py:'shí tou'},
  {zh:'猴子',en:'monkey',zy:'ㄏㄡˊ ㄗ˙',py:'hóu zi'}],lines:[
  ['山上有一塊大石頭。','There is a big rock on the mountain.'],
  ['有一天，石頭裂開了。','One day, the rock breaks open.'],
  ['一隻猴子跳了出來！','A monkey jumps out!'],
  ['猴子看著天空，也看著大海。','The monkey looks at the sky and the sea.'],
  ['猴子住在山上。','The monkey lives on the mountain.']],build:['猴子','住在','山上。'],buildEn:'The monkey lives on the mountain.',culture:['石猴是故事中的神奇角色。','The stone monkey is a magical character in this story.']},
 {id:'home',title:'猴王的家',en:'A home for the monkeys',icon:'水',words:[
  {zh:'水',en:'water',zy:'ㄕㄨㄟˇ',py:'shuǐ'},
  {zh:'家',en:'home',zy:'ㄐㄧㄚ',py:'jiā'},
  {zh:'朋友',en:'friend',zy:'ㄆㄥˊ ㄧㄡˇ',py:'péng yǒu'}],lines:[
  ['猴子和朋友一起玩。','The monkey plays with his friends.'],
  ['他們看見很多水從山上流下來。','They see a lot of water flowing down the mountain.'],
  ['猴子跳過瀑布，找到一個洞。','The monkey jumps through the waterfall and finds a cave.'],
  ['這是大家的新家。','This is everyone’s new home.'],
  ['朋友叫他「美猴王」。','His friends call him the Handsome Monkey King.']],build:['這是','大家的','新家。'],buildEn:'This is everyone’s new home.',culture:['這個洞叫「水簾洞」，在花果山。','The cave is called Water Curtain Cave, on Flower-Fruit Mountain.']},
 {id:'learn',title:'悟空學本領',en:'Wukong learns new skills',icon:'學',words:[
  {zh:'老師',en:'teacher',zy:'ㄌㄠˇ ㄕ',py:'lǎo shī'},
  {zh:'學',en:'learn',zy:'ㄒㄩㄝˊ',py:'xué'},
  {zh:'飛',en:'fly',zy:'ㄈㄟ',py:'fēi'}],lines:[
  ['猴王離開家，去找老師。','The Monkey King leaves home to find a teacher.'],
  ['老師給他一個名字：孫悟空。','His teacher gives him a name: Sun Wukong.'],
  ['悟空每天學新的本領。','Wukong learns new skills every day.'],
  ['他會變成不同的東西。','He can turn into different things.'],
  ['悟空會飛。','Wukong can fly.']],build:['悟空','會','飛。'],buildEn:'Wukong can fly.',culture:['教悟空本領的老師是菩提祖師。','Wukong’s teacher is the Patriarch Subhuti.']},
 {id:'heaven',title:'天宮裡的麻煩',en:'Trouble in Heaven',icon:'天',words:[
  {zh:'天',en:'sky; heaven',zy:'ㄊㄧㄢ',py:'tiān'},
  {zh:'大',en:'big',zy:'ㄉㄚˋ',py:'dà'},
  {zh:'佛',en:'Buddha',zy:'ㄈㄛˊ',py:'fó'}],lines:[
  ['悟空有一根神奇的金箍棒。','Wukong has a magical golden staff.'],
  ['他覺得自己很厲害。','He thinks he is very powerful.'],
  ['他到天宮，闖了大禍。','He goes to Heaven and causes great trouble.'],
  ['佛祖把悟空壓在山下。','The Buddha traps Wukong beneath a mountain.'],
  ['很多年過去了。','Many years pass.']],build:['很多年','過去','了。'],buildEn:'Many years pass.',culture:['這一段故事常被稱為「大鬧天宮」。','This part of the story is often called “Havoc in Heaven.”']},
 {id:'friends',title:'一起去西方',en:'A journey together',icon:'西',words:[
  {zh:'一起',en:'together',zy:'ㄧˋ ㄑㄧˇ',py:'yì qǐ'},
  {zh:'走',en:'walk; go',zy:'ㄗㄡˇ',py:'zǒu'},
  {zh:'幫忙',en:'help',zy:'ㄅㄤ ㄇㄤˊ',py:'bāng máng'}],lines:[
  ['唐僧來了，救出悟空。','Tang Sanzang arrives and frees Wukong.'],
  ['悟空和唐僧一起去西方。','Wukong and Tang Sanzang travel west together.'],
  ['豬八戒、沙僧和白龍馬也加入了。','Zhu Bajie, Sha Wujing and the White Dragon Horse join them.'],
  ['大家一起走。','They walk together.'],
  ['路上有很多困難，大家互相幫忙。','There are many difficulties along the way, and they help one another.']],build:['大家','一起','走。'],buildEn:'They walk together.',culture:['他們去西方取經。「經」是佛教的經書。','They travel west to obtain Buddhist scriptures. Here, 經 means Buddhist sacred texts.']},
 {id:'return',title:'帶著經書回家',en:'Bringing the scriptures home',icon:'書',words:[
  {zh:'書',en:'book',zy:'ㄕㄨ',py:'shū'},
  {zh:'回家',en:'go home',zy:'ㄏㄨㄟˊ ㄐㄧㄚ',py:'huí jiā'},
  {zh:'開心',en:'happy',zy:'ㄎㄞ ㄒㄧㄣ',py:'kāi xīn'}],lines:[
  ['他們走了很遠的路。','They travel a very long way.'],
  ['最後，他們到了西方，取得經書。','At last, they reach the West and receive the scriptures.'],
  ['這些書要帶回去給更多的人看。','They will bring these books back for more people to read.'],
  ['大家帶著經書回家。','They bring the scriptures home.'],
  ['悟空很開心，大家完成了這段旅程。','Wukong is happy. Together, they have completed their journey.']],build:['悟空','很','開心。'],buildEn:'Wukong is happy.',culture:['原著中，悟空最後成為「鬥戰勝佛」。這裡是主要情節的入門短篇改寫。','In the original, Wukong becomes the Victorious Fighting Buddha. This short retelling selects the main story arc.']}
]};
// Reuse exact authored text as audio jobs; no dictionary explanations.
JOURNEY.chapters.forEach((c,i)=>{c.words.forEach((w,j)=>{w.audio=`story-audio/c${i+1}-w${j+1}-v2.wav`;w.slowAudio=`story-audio/c${i+1}-w${j+1}-slow-v2.wav`;});c.lines=c.lines.map(([zh,en],j)=>({zh,en,audio:`story-audio/c${i+1}-s${j+1}.wav`}));});
