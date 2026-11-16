'use strict';
// Beginner examples written for Bopomori. Ordering is pedagogical, not a frequency ranking.
const CURATED_USAGE={};
function usage(key,entries){CURATED_USAGE[key]=entries.map(([char,en,word,py,meaning,zh,sentenceEn])=>({char,en,common:true,words:[{word,pinyin:py,en:meaning}],sentence:[zh,sentenceEn]}));}
usage('ㄈㄛ|1', [['佛','Buddha','佛教','fó jiào','Buddhism','這座寺廟裡有佛像。','There is a Buddha statue in this temple.']]);
CURATED_USAGE['ㄈㄛ|1'][0].words.push({word:'佛像',pinyin:'fó xiàng',en:'Buddha statue'});
usage('ㄚ|0', [['啊','ah','啊！','ā','ah; an exclamation','啊，我知道了！','Ah, I see!']]);
usage('ㄧ|0', [['一','one','第一','dì yī','first','這是第一課。','This is lesson one.'],['衣','clothing','衣服','yī fu','clothes','這件衣服很好看。','These clothes look nice.'],['醫','medical; to treat','醫生','yī shēng','doctor','她是醫生。','She is a doctor.']]);
usage('ㄨ|0', [['屋','house; room','房屋','fáng wū','house; building','這間房屋很小。','This house is small.'],['烏','black; dark','烏鴉','wū yā','crow','那是一隻烏鴉。','That is a crow.'],['污','dirty; to pollute','污染','wū rǎn','pollution','我們要減少污染。','We need to reduce pollution.']]);
usage('ㄇㄚ|0', [['媽','mom','媽媽','mā ma','mom; mother','媽媽在家。','Mom is at home.']]);
usage('ㄇㄚ|1', [['麻','numb; hemp','麻煩','má fan','trouble; troublesome','麻煩你幫我。','Please help me.']]);
usage('ㄇㄚ|2', [['馬','horse','騎馬','qí mǎ','ride a horse','他喜歡騎馬。','He likes riding horses.'],['碼','code; number','密碼','mì mǎ','password','請輸入密碼。','Please enter your password.'],['瑪','used in names and the word for agate','瑪瑙','mǎ nǎo','agate','這是瑪瑙做的。','This is made of agate.']]);
usage('ㄇㄚ|3', [['罵','scold','責罵','zé mà','scold; reprimand','請不要罵人。','Please do not scold people.']]);
usage('ㄇㄚ|4', [['嗎','question particle','好嗎','hǎo ma','is that OK?','你喜歡中文嗎？','Do you like Chinese?']]);
usage('ㄅㄚ|0', [['八','eight','八個','bā ge','eight (items)','我有八本書。','I have eight books.'],['巴','used in words such as bus and chin','巴士','bā shì','bus','我們坐巴士。','We take the bus.'],['疤','scar','傷疤','shāng bā','scar','他的手上有一道疤。','He has a scar on his hand.']]);
usage('ㄆㄚ|0', [['趴','lie face down','趴下','pā xià','lie down on your front','貓趴在椅子上。','The cat is lying on the chair.']]);
usage('ㄧ|2', [['椅','chair','椅子','yǐ zi','chair','請坐在椅子上。','Please sit on the chair.'],['以','with; by; used in function words','可以','kě yǐ','can; may','我可以進來嗎？','May I come in?'],['已','already','已經','yǐ jīng','already','我已經吃飯了。','I have already eaten.']]);
usage('ㄨ|2', [['五','five','五個','wǔ ge','five (items)','我有五個杯子。','I have five cups.'],['午','noon','中午','zhōng wǔ','noon','我們中午見。','See you at noon.'],['舞','dance','跳舞','tiào wǔ','dance','她喜歡跳舞。','She likes dancing.']]);
usage('ㄩ|2', [['雨','rain','下雨','xià yǔ','rain; be raining','今天下雨了。','It is raining today.'],['語','language; speech','華語','huá yǔ','Mandarin','我在學華語。','I am learning Mandarin.'],['與','and; with (often written)','我與你','wǒ yǔ nǐ','you and I','「我與你」的「與」讀 ㄩˇ。','In “我與你” (you and I), 與 is pronounced yǔ.']]);
usage('ㄋㄧ|2', [['你','you','你好','nǐ hǎo','hello','你叫什麼名字？','What is your name?'],['妳','you, written when addressing a woman','妳好','nǐ hǎo','hello (addressing a woman)','妳好，很高興認識妳。','Hello, nice to meet you.'],['擬','draft; plan','擬定','nǐ dìng','draw up a plan','我們正在擬定計畫。','We are drawing up a plan.']]);
usage('ㄏㄠ|2', [['好','good; well','好吃','hǎo chī','delicious','這個很好吃。','This is delicious.']]);
usage('ㄅㄧㄝ|1', [['別','do not; other; to part','別人','bié rén','other people','別走，等一下。','Do not leave. Wait a moment.']]);
usage('ㄕ|3', [['是','be; is; am; are','是的','shì de','yes; that is right','我是學生。','I am a student.'],['事','matter; thing; event','事情','shì qíng','matter; thing','我有事情要做。','I have something to do.'],['市','city; market','市場','shì chǎng','market','媽媽去市場買菜。','Mom goes to the market to buy groceries.']]);
usage('ㄌㄧ|3', [['力','strength; power','力氣','lì qi','physical strength','他很有力氣。','He is very strong.'],['立','stand; establish','站立','zhàn lì','stand upright','請站立。','Please stand up.'],['利','benefit; favorable','順利','shùn lì','smooth; successful','祝你一切順利。','I hope everything goes smoothly for you.']]);
