# 遊戲與角色演出 / Adventure and performances

This implementation follows the user-provided Zhuyora gamification proposal and subsequent requested edits. Progress and XP are local, not account-backed. All learning animations can be skipped; reward state is saved before a finale starts. Animation/image/audio failure does not revoke earned rewards.

## 台詞 / Dialogue

Wukong: 只有苦練七十二變，才能笑對八十一難。

Nezha: 若前方無路，我便踏出一條路；若天理不容，我便逆轉這乾坤。

These two lines were supplied/requested by the user. They are presented as adapted dialogue, not attributed to the classical novels.

Snake bride: 山林記得我們的故事，願每一份真心，都被溫柔相待。

Except for Nüwa’s public-domain Huainanzi passage, finale dialogue is supplied or original adaptation. The Tsou finale uses explicitly labeled Mandarin narration rather than inventing a traditional deity quotation or an Indigenous-language performance.

## 圖像 / Artwork

The user supplied the original Zhuyora logo and the Yubao book-spirit image. Original user files remain unchanged. The website contains a simplified logo asset, the supplied Yubao portrait and a generated four-pose Yubao sprite sheet.

New artwork was generated with the image-generation tool: Wukong's separate empty-hand action pose, Nezha holding a Fire-Tipped Spear while standing on wind-fire wheels, a four-pose bride/snake sheet, and six new story collectibles (Nüwa, Hou Yi, Chang'e, Tsou tree/footprints, Princess Kavalan with Turtle Island, Daji as an armored commander). Source images remain in their original generated-images location; copies are included under assets/.

The bride's plain clothes are symbolic, not reconstructed Paiwan ceremonial dress. The Tsou image deliberately depicts a tree, mountain and footprints, without invented divine portraits, clothing or ritual designs. Princess Kavalan is labeled as a Yilan local-legend illustration. Daji’s collectible is an original scholarly-inspired commander design; the novel’s fictional fox episode remains clearly labeled in the reader.

## 實作與驗證 / Implementation and validation

Finales combine CSS transforms, layered art, a separately rotating staff, wheel highlights, four-pose sprite sheets, local Mandarin voice clips and bilingual subtitles. This is 2D web animation, not full character rigging, frame-by-frame cinema or lip-synchronized video. Phrase-level subtitles follow audio events. Collection return measures the destination element rather than relying on fixed screen coordinates. Reduced motion uses a static reward screen with optional manual voice playback.

All 54 chapters and 444 practice questions passed rule and rendered-control model checks. Voice tests cover sequence, completion gating, replay, blocked audio, timeout, mute, skip and cancellation. These checks do not replace native animation review, mobile-device checks or listening review. Headless Chrome failed to start in this environment, so those visual checks remain unverified.

## 2026-11-16 character revision

Added new transparent four-pose sheets for Nüwa, Hou Yi and Chang’e; original armored Daji artwork; and full-awakening Yubao artwork derived from the supplied mascot. All original source files are preserved. New layered choreography is in character-motion.css. No museum illustration was copied.

Daji’s bilingual introduction cites [Academia Sinica’s interview with Huang Ming-chong](https://research.sinica.edu.tw/ancient-china-shang-woman-daji/). It labels the commander as a contextual scholarly reconstruction, with original fictional dialogue, rather than a proven complete biography.

Nüwa’s four clauses are from the public-domain Huainanzi, Lanmingxun. She speaks the passage in a dramatized first-person performance. The translation uses “floods” for 淫水; no graphic injury is illustrated. Hou Yi’s and Chang’e’s new lines are user-specified adapted dialogue. Chang’e’s chapter 3 and source note now use the elixir-coercion variant.

All finale speech is synthesized locally with the installed zh-TW Microsoft Hanhan, Yating or Zhiwei voice. Voice, speed and pitch are specified per character; this is not professional acting or lip synchronization. New filenames distinguish revised speech from cached recordings.

Two-stage Yubao progression uses the original zhuyora-secret-v1 save. Its additional masterCompleted/masterSeen fields do not reset the original completed/revealSeen fields. The nine-book requirement is a fixed edition constant. Each of the three final challenges saves only after all three questions are answered correctly, with unlimited retries. Preview mode writes only sound/motion preferences, never learning progress or rewards.

## Daji transformation and dual collectible

The updated performance uses an initial fictional fox-enchantress portrait, a four-pose commander sheet (shield wind-up, shield sweep, raised foot, foot-and-axe-shaft impact), image-fragment shattering and impact effects. Dialogue is split into four clips to cue the rebuttal and actions. A completed seal shows the colored enchantress in front and a larger dark commander silhouette behind her in assets/daji-shadow-seal.png; the performance’s commander pose remains separate from the reward artwork. The research introduction now appears after the action, without interrupting the transformation. See daji-image-prompts.md for exact built-in image_gen prompts.

All four old progress fields and the fixed-nine-book rule remain unchanged. Browser automation was unavailable in this chat; control-model tests do not certify on-device visual smoothness.
