# Zhuyora｜注音初語

角色覺醒版 · 2026-11-16

## 開啟 / Open

使用靜態 HTTP 伺服器提供此資料夾，再開啟 index.html。無帳號或後端；進度存在目前瀏覽器的 localStorage，不跨裝置同步。請保留同一網址與瀏覽器，以繼續舊進度。解壓縮後上傳整個資料夾即可供靜態網站使用；這份交付尚未發布至 GitHub Pages。

Serve this folder with a static HTTP server and open index.html. No build, backend or login is needed. Progress is local to the browser and origin; keep the same address and browser to retain it. This deliverable has not been published to GitHub Pages.

## 學習與故事 / Learning and stories

- 學拼音 Learn sounds：六個注音短課程、課後聽音小測驗、自由拼音；小測驗只使用已學讀音。
- 小遊戲 Mini games：故事書架、故事冒險、收藏與神祕書閣，不再重複放獨立的聽音練習入口。
- 注音表 Zhuyin chart：符號與聲調，可回到自由拼音探索。
- 故事由淺入深排列，也可自由選書。每章 3–8 個詞語，選項從兩個增加到三／四個；新詞與複習詞依實際完成章節判定。
- 共 9 本、54 章、190 句中英內容、444 題。詞語卡共 282 次教學項目（244 個不同詞語），不是單字字數或標準檢定分級。
- 每字的注音與聲調為不可拆行單位，多字詞可在音節之間換行；答案卡的漢字、注音、拼音／英文分行。

- 1. 西遊記 / Journey to the West — 中國古典神魔小說；每章 3–3 詞。
- 2. 女媧補天 / Nüwa Repairs the Sky — 古老中國神話；每章 3–5 詞。
- 3. 后羿射日 / Hou Yi and the Suns — 古老中國神話；每章 3–6 詞。
- 4. 封神演義：哪吒篇 / Investiture of the Gods: Nezha — 中國古典神魔小說；每章 4–6 詞。
- 5. 嫦娥奔月 / Chang’e Flies to the Moon — 古老中國神話；每章 4–6 詞。
- 6. 百步蛇新娘 / The Hundred-Pacer’s Bride — 臺灣原住民族傳說 · 排灣族；每章 5–7 詞。
- 7. 鄒族：楓樹與天神足跡 / Tsou: The Tree and Divine Footprints — 臺灣原住民族神話 · 鄒族；每章 5–7 詞。
- 8. 噶瑪蘭公主 / Princess Kavalan — 臺灣地方傳說 · 宜蘭；每章 5–8 詞。
- 9. 封神演義：蘇妲己篇 / Investiture of the Gods: Su Daji — 中國古典神魔小說；每章 6–8 詞。

## 收藏規則 / Collection rules

每章第一次完成固定獲得一片；六章全完成才解鎖角色、故事書、結局與該書印記。首次章節 +20 分，每本每天首次完成 +5 分。積分不是解鎖條件；複習、答錯和缺席不會扣除收藏。

西遊記、哪吒篇、百步蛇新娘的三枚起始印記開啟神祕書閣。聲音之門、文字之橋、記憶書庫依序完成後獲得小語寶。其餘六本印記與原有三枚合計九枚，可繼續挑戰完整覺醒；詳細條件見下方更新。舊西遊記與另外兩本進度、語寶存檔保留；舊版只靠每日積分的提早解鎖改為按已完成章節計算。

## 動畫與語音 / Animation and audio

- 悟空：蓄勢、身前快速轉金箍棒、金色殘影、雲氣、收棒定格。
- 哪吒：腳踩風火輪，雙手持火尖槍向前指，輪光旋轉。
- 百步蛇新娘：山嵐、花開、四個手勢與回望姿勢。
- 角色台詞以同一份中文文字製作錄音與中英字幕；逐句標示目前播放內容，等語音結束才進入收藏。女媧使用《淮南子・覽冥訓》節錄，其餘為指定或原創改編；皆非課程必答題。
- 以瀏覽器分層 2D 動畫、獨立道具及姿勢切換實作，不是逐格手繪影片、骨骼動畫或嘴型同步影片。
- 可靜音、略過、重播與減少動態；減少動態時保留靜態收藏與手動聽台詞。播放被瀏覽器阻擋時可按「聽台詞」重試。
- 台詞使用本機 Microsoft Zhiwei／Hanhan／Yating 臺灣華語合成語音；故事與詞語仍為合成語音，未完成逐條人工聽音審校。慢速詞語使用獨立音檔，避免再被重複降速。

## 驗證與限制 / Validation and limits

已完成所有 444 題與九本收藏的規則及 DOM 控制模型測試、三枚起始印記與語寶回歸測試、語音順序／字幕／等待／略過／靜音／錯誤恢復、777 個故事及台詞音檔完整性檢查，以及既有注音與聽音小測驗回歸測試。本機 HTTP 預覽、主要程式、新圖像及代表性新錄音均回傳 200，且與來源檔逐位元一致。無畫面 Chrome 在此環境啟動失敗，未完成新版原生瀏覽器視覺與手機實機驗證；流程模型不代表動畫流暢度或發音品質已人工驗證。

故事分級為編輯安排，未經 CEFR／TOCFL 校準或學習成效實驗。沒有麥克風錄音與口說評分。教材來源與版本限制見各書「故事版本」及 credits/stories.md；品牌見 credits/brand.md；動畫與教材來源見 credits/adventure.md。

## 完整覺醒更新 / Full awakening update

- 原有三枚起始印記＋書閣三關：小語寶甦醒；舊 version:1 存檔保留。
- 本版固定九枚印記＋短句聽力、故事排序、詞語造句三關：完整語寶新裝與專屬結局。每關三題，完成一關即儲存；未完成關卡重進會從該關第一題開始。
- 可重聽、提示、重試，不計時、不扣分。日後新增故事不增加本版九枚目標，不取消已取得完整形態。
- 女媧：捧石、舉石補天、尾部擺動、裂縫癒合；后羿：舉弓、拉弓、放箭、收弓與九日退去；嫦娥：護藥、起身升空、飛向月亮。皆用四姿勢原畫及獨立特效實作。
- 妲己：妖姬轉為披甲執鉞與盾牌造型，先演出妖姬幻象碎裂、將軍揮盾踏地，再顯示研究介紹；角色對白標示創作，未把推論改寫成已證實的完整生平。
- 角色聲線：女媧 Yating，較慢而低；后羿 Zhiwei，沉穩；嫦娥 Hanhan，較快；妲己 Yating，較堅定。合成音不能等同專業角色配音，尚需人工試聽。
- 新測試涵蓋 9 題終章、存檔遷移、未來加書、重聽失敗／重試、錯誤排序可修正、重播與重載、11 場預覽及完整台詞等待。實際動畫與手機視覺仍待原生瀏覽器確認。


## 妲己雙形象印記 / Daji’s dual portrait

演出依序為：妖姬與狐影登場 →「禍國妖姬？」→「可笑！」與幻象碎裂 → 將軍揮盾 → 抬腳蓄勢、踏地與鉞柄落地 → 研究介紹 → 彩色妖姬在前、將軍黑影在後的完整印記。主要動作依台詞段落觸發；靜音或音檔錯誤會完成無聲動作，不會卡在中途。四姿勢原畫配合獨立碎片、揮盾殘影及落地塵圈；不是影片或嘴型同步動畫。

The finale starts with the fictional enchantress. Her rebuttal shatters the illusion, revealing the armored commander sweeping her shield, lifting her foot and stamping down while planting the axe shaft. The final collectible deliberately preserves the enchantress in front with a larger commander silhouette behind her. The scholarly background is shown after the performance; reduced-motion mode presents a static dual portrait and optional audio. Existing chapter IDs, seals and saved progress are unchanged.

New artwork: assets/daji-illusion.png, assets/daji-command-states.png, assets/daji-shadow-seal.png. Generated with the built-in image_gen tool; prompts are in credits/daji-image-prompts.md.
