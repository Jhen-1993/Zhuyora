# Journey to the West — Zhuyora beginner edition

This is an original six-chapter short retelling for beginning Mandarin learners. It selects the main story arc from the public-domain novel attributed to Wu Cheng'en. It is not the complete hundred-chapter original, a word-for-word translation, or an accredited language-level reader. English translations and practice sentences were written for this edition. The current release also includes Nezha and a Paiwan snake-bride retelling; see stories.md for those editions.

本版為六章、30 句的中英入門短篇改寫，涵蓋石猴出生、成為猴王、學本領、大鬧天宮、同行取經及取經歸來。非百回原著全文。每章選三個故事內的詞語，含注音、拼音、英文與語音。故事中的關鍵詞可點選；注音開關只控制關鍵詞注音，並非全文逐字注音。

Reference texts:

- https://zh.wikisource.org/wiki/西遊記/第001回
- https://zh.wikisource.org/wiki/西遊記/第100回
- https://zh.wikisource.org/wiki/西遊記

## Rules and storage

First completion of a chapter awards 20 points and one fixed puzzle piece. The first completed round per local calendar day awards 5 bonus points. All six chapters, rather than an XP threshold, unlock Wukong and the beginner book. Each question allows unlimited corrections before rewards are stored. See stories.md and adventure.md for the current edition.

Progress uses the browser's localStorage key `bopomori-journey-v1`. It is local only, without account synchronization or server-side anti-cheat. The device's local date controls the daily bonus. Clearing browser storage removes the collection. Separate browser tabs receive storage updates; simultaneous completion writes are not a transactional multi-device system.

## Audio

66 active locally generated Mandarin audio files: 18 whole-word vocabulary recordings, 18 separately synthesized slow vocabulary recordings, and 30 sentences. Vocabulary revision 2 reads complete Chinese words rather than forcing individual phonemes; a final pause is retained. Slow vocabulary files play at their native speed to avoid additional browser time stretching. Microsoft Hanhan (zh-TW). The global speed and repeat settings apply. Synthetic pronunciation has not been individually audited by a Mandarin instructor. Spoken connected tones may differ from dictionary citation tones; 一起 is shown with its spoken yì qǐ form.

## Wukong art

Original character generated with the built-in image generation tool, 2026-11-16. Asset: `assets/wukong.png`. Transparent PNG. The website's six-piece reveal uses CSS clipping of the same original image.

Generation prompt:

Create one original collectible character asset for Zhuyora, a warm and cute Mandarin learning website for adult beginners. A little Sun Wukong / Monkey King, full body, friendly expressive monkey face with warm caramel fur and peach face, small rounded ears, cheerful confident smile, golden headband, simple cream-and-golden tunic, muted coral red scarf, dark plum boots, holding his golden staff upright beside his body. Soft hand-painted storybook illustration, refined pastel gouache texture with clean readable silhouette, rounded proportions, charming rather than infantile. All body parts and staff fully within the canvas, generous transparent margin, standing frontal three-quarter pose. Isolated on true transparent background, no scene, no floor, no typography, no borders, no other characters. Square composition, premium game collectible artwork. This is an original interpretation of the public-domain literary character, not any existing film or game design.

## Validation

Rules and rendered-control model tests cover all 36 questions, wrong-answer correction, audio failure and completion gating, the daily date boundary, repeat-award prevention, progress normalization, chapter locking, all-six-chapter character reveal, the awakening screen, all-six-chapter book navigation, and all active audio files. Browser visual testing of this addition was unavailable in this turn. Prior mobile tests apply to the earlier beginner interface, not this new story interface.
