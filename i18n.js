'use strict';
// Translations affect display only. Mandarin audio and saved selections stay separate.
const EN={
'別':'do not; other',
'聲母':'Initial','介音':'Medial','韻母':'Final','聲調':'Tone','空白':'Blank','不加聲母':'No initial','不加介音':'No medial','不加韻母':'No final',
'包子':'steamed bun','葡萄':'grapes','媽媽':'mom','飛機':'airplane','大象':'elephant','兔子':'rabbit','牛奶':'milk','老師':'teacher','哥哥':'older brother','開心':'happy','喝水':'drink water','積木':'building blocks','氣球':'balloon','西瓜':'watermelon','蜘蛛':'spider','吃飯':'eat a meal','書本':'book','日出':'sunrise','早安':'good morning','草地':'grass','森林':'forest',
'衣服':'clothes','屋子':'house','阿姨':'aunt','喔':'oh','鵝':'goose','耶':'yay','愛心':'love; a heart','欸':'hey','凹':'concave','歐洲':'Europe','安心':'at ease','恩情':'kindness','昂首':'hold your head high','哼':'hum','耳朵':'ear','你好':'hello','小小':'little','花朵':'flower',
'雙唇閉合，輕輕放開':'Close your lips, then release gently.',
'雙唇放開，送出氣流':'Release your lips with a puff of air.',
'雙唇閉合，聲音從鼻腔出來':'Close your lips and let sound pass through your nose.',
'上齒輕碰下唇，送出氣流':'Touch your upper teeth to your lower lip and blow.',
'舌尖抵住上齒齦，再放開':'Touch your tongue tip to the ridge behind your upper teeth, then release.',
'舌尖放開，送出氣流':'Release your tongue tip with a puff of air.',
'舌尖抵住上齒齦，從鼻腔出聲':'Touch the ridge behind your upper teeth; let sound pass through your nose.',
'舌尖抵住上齒齦，氣從兩側出來':'Touch the ridge behind your upper teeth; let air flow around the sides.',
'舌根抬起，再放開':'Raise the back of your tongue, then release.',
'舌根放開，送出氣流':'Release the back of your tongue with a puff of air.',
'舌根附近留窄縫，呼出氣流':'Leave a narrow gap at the back of your tongue and breathe out.',
'舌面前部抬起，再放開':'Raise the front surface of your tongue, then release.',
'舌面前部放開，送出氣流':'Release the front surface of your tongue with a puff of air.',
'舌面前部留窄縫，送出氣流':'Leave a narrow gap above the front of your tongue and blow.',
'舌尖翹起，再放開':'Curl your tongue tip slightly back, then release.',
'舌尖翹起，送出氣流':'Curl your tongue tip slightly back and release a puff of air.',
'舌尖翹起，氣流摩擦':'Curl your tongue tip slightly back; let air flow through a narrow gap.',
'舌尖翹起，聲帶振動':'Curl your tongue tip slightly back and use your voice.',
'舌尖向前，放開窄縫':'Keep your tongue tip forward and release through a narrow gap.',
'舌尖向前，送出氣流':'Keep your tongue tip forward and release a puff of air.',
'舌尖向前，氣流摩擦':'Keep your tongue tip forward; let air flow through a narrow gap.',
'嘴角向兩側展開':'Spread the corners of your mouth.','嘴唇收圓，向前突出':'Round your lips and push them forward.','先發 ㄧ，再把嘴唇收圓':'Start with ㄧ, then round your lips.','聽一聽，跟著念':'Listen, then repeat.',
'例如：ㄞˋ → 愛':'Example: ㄞˋ → love.','例如：ㄇ＋ㄚ → 媽':'Example: ㄇ + ㄚ → mom.','例如：ㄋ＋ㄧ → 你':'Example: ㄋ + ㄧ → you (with Tone 3).',
'一聲':'Tone 1','二聲':'Tone 2','三聲':'Tone 3','四聲':'Tone 4','輕聲':'Neutral tone','高高平平，聲音不轉彎':'Keep your pitch high and level.','往上爬，聲音往上揚':'Let your pitch rise.','先低下去，再往上走':'Let your pitch dip, then rise.','溜滑梯，聲音往下降':'Let your pitch fall sharply.','輕輕短短，跟在詞句裡':'Keep it light and short within a phrase.','一聲不標調號':'Tone 1 is usually unmarked.','從中間往上升':'Rise from a middle pitch.','單念時先降後升':'Dip then rise when spoken alone.','從高處往下降':'Fall from a high pitch.','聽「好嗎」的最後一字':'Listen to the last syllable of 好嗎 (okay?).',
'媽':'mom','麻':'hemp; numb','馬':'horse','罵':'scold','嗎':'question particle','八':'eight','拔':'pull out','把':'hold','爸':'dad','吧':'suggestion particle','趴':'lie face down','爬':'climb','怕':'be afraid','搭':'put up; take a ride','達':'reach','打':'hit','大':'big','他':'he','塔':'tower','踏':'step on','拿':'take','哪':'which','那':'that','拉':'pull','喇':'as in 喇叭 (trumpet)','辣':'spicy','啦':'sentence-ending particle',
'發':'send out','罰':'punish','法':'method; law','哥':'older brother','格':'grid; pattern','葛':'kudzu','各':'each','科':'subject','咳':'cough','可':'can; may','課':'lesson','喝':'drink','河':'river','賀':'congratulate','雞':'chicken','急':'urgent','幾':'how many','記':'remember','七':'seven','旗':'flag','起':'rise','氣':'air','西':'west','習':'practice','洗':'wash','細':'fine; thin','泥':'mud','你':'you','逆':'against; reverse','咪':'meow','迷':'be lost','米':'rice','密':'dense','梨':'pear','李':'plum','力':'strength',
'波':'wave','伯':'uncle','跛':'lame; limp','播':'broadcast; sow','坡':'slope','婆':'elderly woman','頗':'quite','破':'broken','摸':'touch','魔':'demon','抹':'wipe','墨':'ink','佛':'Buddha','知':'know','直':'straight','紙':'paper','至':'arrive; to','吃':'eat','池':'pond','尺':'ruler','翅':'wing','詩':'poem','十':'ten','史':'history','是':'be; yes','日':'sun; day','資':'resources','子':'child','字':'character','疵':'flaw','詞':'word','此':'this','次':'time; occurrence','絲':'silk','死':'die','四':'four',
'豬':'pig','竹':'bamboo','主':'main; host','住':'live; stay','初':'beginning','除':'remove','楚':'clear; distinct','觸':'touch','書':'book','熟':'cooked; familiar','鼠':'mouse','樹':'tree','如':'like; as','乳':'milk','入':'enter','租':'rent','足':'foot; enough','祖':'ancestor','粗':'coarse; thick','醋':'vinegar','蘇':'revive','俗':'custom; common','速':'speed','包':'bag; wrap','雹':'hail','寶':'treasure','抱':'hug','拋':'throw','袍':'robe','跑':'run','泡':'bubble; soak','貓':'cat','毛':'hair; fur','卯':'fourth Earthly Branch','帽':'hat','刀':'knife','島':'island','到':'arrive','滔':'surging','桃':'peach','討':'ask for','套':'set; cover','撓':'scratch','腦':'brain','鬧':'make noise','撈':'scoop up','勞':'labor','老':'old','烙':'sear','蒿':'mugwort','毫':'a tiny amount','好':'good','號':'number',
'饅':'as in 饅頭 (steamed bun)','滿':'full','慢':'slow','湯':'soup','糖':'sugar; candy','躺':'lie down','燙':'scalding hot','風':'wind','逢':'meet','鳳':'phoenix','鍋':'pot','國':'country','果':'fruit','過':'pass','花':'flower','華':'splendid','畫':'draw; painting','消':'disappear','小':'small','笑':'smile; laugh','天':'sky; day','田':'field','舔':'lick','鳥':'bird','尿':'urine','靴':'boot','學':'learn','雪':'snow','迂':'roundabout','魚':'fish','雨':'rain','玉':'jade','屋':'house','無':'without','五':'five','物':'thing','衣':'clothing','移':'move','椅':'chair','意':'meaning; intention','哀':'sorrow','癌':'cancer','矮':'short','愛':'love','兒':'child','耳':'ear','二':'two','安':'peaceful','俺':'I (colloquial)','暗':'dark','彎':'bend; curved','玩':'play','碗':'bowl','萬':'ten thousand'
};
function english(zh){if(!Object.hasOwn(EN,zh))throw new Error('Missing English translation: '+zh);return EN[zh];}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function bilingualHTML(zh,en=english(zh)){return `<span class="zh">${escapeHTML(zh)}</span><span class="en" lang="en">${escapeHTML(en)}</span>`;}
function bilingual(el,zh,en=english(zh)){el.innerHTML=bilingualHTML(zh,en);}

// Keep each character's full Zhuyin syllable and tone together.
function zhuyinHTML(text){return String(text).trim().split(/\s+/).map(s=>`<span class="zhuyin-syllable">${escapeHTML(s)}</span>`).join(" ");}
