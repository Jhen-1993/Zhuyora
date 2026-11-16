# Zhuyora learning data / 學習資料

## Pronunciation / 發音

`pronunciation/*.wav` contains 1,224 single-syllable synthetic recordings produced locally with Microsoft Hanhan (zh-TW), using explicit SAPI Zhuyin phonemes and tones in SSML. These are synthesized speech, not human teacher recordings. Each file is approximately 0.78–1.29 seconds. They contain no dictionary explanation. Sound quality and unusual syllables have not all been reviewed by a Mandarin instructor. Neutral tone in isolation is only a demonstration; its natural pitch depends on context.

`audio/F1.WAV`–`F37.WAV` retain the original Ministry of Education symbol recordings. The original dictionary attribute recordings are no longer used as the syllable player or quiz audio. No Ministry recordings were cropped or modified to make the synthetic clips.

音節語音為 Microsoft Hanhan 臺灣華語合成音，依明確的注音與聲調產生，非教師真人錄音。單一符號使用教育部原始錄音。原字典單字屬性錄音不再用於組合發音或測驗；未裁切或改作教育部錄音。尚未逐音經華語教師聽審。

Microsoft SSML phoneme reference: https://learn.microsoft.com/azure/ai-services/speech-service/speech-ssml-phonetic-sets

## Homophones and English / 同音字與英文

`homophones.js` is an adapted selection of CC-CEDICT (MDBG / CC-CEDICT contributors, release 2026-11-14), with phonetic matching checked against the Taiwan Ministry of Education dictionary. English senses were selected and shortened; entries were ordered using FrequencyWords traditional Chinese subtitle counts (2018). Both CC-CEDICT and FrequencyWords content use **CC BY-SA 4.0**. This derived `homophones.js` is distributed under the same license.

- CC-CEDICT: https://www.mdbg.net/chinese/dictionary?page=cc-cedict
- FrequencyWords, Hermit Dave: https://github.com/hermitdave/FrequencyWords
- Data: https://github.com/hermitdave/FrequencyWords/blob/master/content/2018/zh_tw/zh_tw_50k.txt
- License: https://creativecommons.org/licenses/by-sa/4.0/

Frequency is a guide drawn from subtitles, not a representative universal ranking of everyday Taiwanese Mandarin. Character counts cannot distinguish pronunciations, so polyphonic character ranking uses matching word usages rather than total character counts. Rare readings may have only dictionary examples. Dictionary English can contain advanced senses and is not a graded curriculum.

同音字排序參考字幕詞頻，並非通用字頻排名；多音字優先使用符合目前讀音的詞語。部分讀音只有少量例字，無足夠常用例字時不硬湊三個。英文詞庫涵蓋較進階字義。

`usage-curated.js` and `lessons.js` contain Zhuyora's beginner teaching choices and original bilingual examples. The selected characters are learning suggestions, not statistical “top three” claims. Word pronunciation appears in pinyin as supplementary reading help. Connected speech may change tones, for example 你好 nǐ hǎo is usually spoken ní hǎo. Written citation tones remain visible.

## Curriculum design / 課程設計

Six introductory lessons use visible examples and articulatory cues, followed by two-choice practice, unlimited replay, hints, and retries. Mini games draw only from completed lessons. This is an introductory sequence, not a complete Mandarin course or a validated proficiency assessment. Self-repetition does not record the microphone or automatically grade pronunciation.

Design reference: ACTFL Proficiency Guidelines 2024, Novice listening (familiar and rehearsed material, repetition, visual support). https://www.actfl.org/uploads/files/general/Resources-Publications/ACTFL_Proficiency_Guidelines_2024.pdf

## Ministry data / 教育部資料

Source: Ministry of Education, R.O.C., Concised Mandarin Dictionary, 2014_20260929. https://language.moe.gov.tw/001/Upload/Files/site_content/M0001/respub/dict_concised_download.html

Original selected records and original terms are retained in this credits directory. The Ministry data remains under its own CC BY-ND 3.0 TW terms. Zhuyora is an independent website.

Playback update: default 0.75x speed with pitch preservation, two complete passes separated by 650 ms. Speed and repetition are adjustable. Lessons and quizzes wait for the playback sequence to finish. Capitalized CC-CEDICT readings are retained, including 佛 (fo2). Background is solid cream.
