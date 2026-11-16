'use strict';
const FINALE_SCRIPTS={
  "wukong": {
    "actionArt": "assets/wukong-action.png",
    "credit": "改編台詞 · 非原著引文",
    "creditEn": "Adapted dialogue · Not a quotation",
    "lines": [
      {
        "zh": "只有苦練七十二變，",
        "en": "Only by mastering the seventy-two transformations",
        "audio": "story-audio/finale-wukong-1.wav"
      },
      {
        "zh": "才能笑對八十一難。",
        "en": "can I face the eighty-one trials with a smile.",
        "audio": "story-audio/finale-wukong-2.wav"
      }
    ]
  },
  "nezha": {
    "actionArt": "assets/nezha-action.png",
    "credit": "改編台詞 · 非原著引文",
    "creditEn": "Adapted dialogue · Not a quotation",
    "lines": [
      {
        "zh": "若前方無路，我便踏出一條路；",
        "en": "If there is no road ahead, I will make one.",
        "audio": "story-audio/finale-nezha-1.wav"
      },
      {
        "zh": "若天理不容，我便逆轉這乾坤。",
        "en": "If Heaven denies me, I will turn this world around.",
        "audio": "story-audio/finale-nezha-2.wav"
      }
    ]
  },
  "snake-bride": {
    "credit": "原創改編台詞 · 非族群傳統語錄",
    "creditEn": "Original adapted dialogue · Not a traditional quotation",
    "lines": [
      {
        "zh": "山林記得我們的故事，",
        "en": "The mountains and forests remember our story.",
        "audio": "story-audio/finale-snake-bride-1.wav"
      },
      {
        "zh": "願每一份真心，都被溫柔相待。",
        "en": "May every sincere heart be treated with tenderness.",
        "audio": "story-audio/finale-snake-bride-2.wav"
      }
    ]
  },
  "nuwa": {
    "lines": [
      {
        "zh": "煉五色石以補蒼天，",
        "en": "I refine five-colored stones to mend the sky,",
        "audio": "story-audio/finale-nuwa-v2-1.wav"
      },
      {
        "zh": "斷鼇足以立四極，",
        "en": "use the giant turtle’s legs to support the four corners,",
        "audio": "story-audio/finale-nuwa-v2-2.wav"
      },
      {
        "zh": "殺黑龍以濟冀州，",
        "en": "slay the black dragon to save Jizhou,",
        "audio": "story-audio/finale-nuwa-v2-3.wav"
      },
      {
        "zh": "積蘆灰以止淫水",
        "en": "and heap up reed ashes to stop the floods.",
        "audio": "story-audio/finale-nuwa-v2-4.wav"
      }
    ],
    "sprite": "assets/nuwa-states.png",
    "duration": 7200,
    "voice": "Microsoft Yating",
    "rate": "78%",
    "pitch": "-5%",
    "credit": "《淮南子・覽冥訓》古文節錄 · 演出改為角色自述",
    "creditEn": "Passage from Huainanzi · Performed in the character’s voice"
  },
  "houyi": {
    "lines": [
      {
        "zh": "受天帝與堯王之託，",
        "en": "Entrusted by the Heavenly Emperor and King Yao,",
        "audio": "story-audio/finale-houyi-v2-1.wav"
      },
      {
        "zh": "我來為天下蒼生求一個公道。",
        "en": "I come to seek justice for all living beings.",
        "audio": "story-audio/finale-houyi-v2-2.wav"
      }
    ],
    "sprite": "assets/houyi-states.png",
    "duration": 6200,
    "voice": "Microsoft Zhiwei",
    "rate": "87%",
    "pitch": "-5%"
  },
  "change": {
    "lines": [
      {
        "zh": "逢蒙逼人太甚，",
        "en": "Feng Meng has gone too far!",
        "audio": "story-audio/finale-change-v2-1.wav"
      },
      {
        "zh": "這不死藥絕不能落入壞人手中！",
        "en": "This elixir must never fall into the wrong hands!",
        "audio": "story-audio/finale-change-v2-2.wav"
      }
    ],
    "sprite": "assets/change-states.png",
    "duration": 6500,
    "voice": "Microsoft Hanhan",
    "rate": "94%",
    "pitch": "+3%"
  },
  "tsou": {
    "narrator": true,
    "credit": "原創中文旁白 · 非族語或傳統語錄",
    "creditEn": "Original Mandarin narration · Not a traditional quotation",
    "lines": [
      {
        "zh": "讀懂故事，也學著尊重每一片土地的記憶。",
        "en": "As we understand stories, we learn to respect the memories of each land.",
        "audio": "story-audio/finale-tsou-1.wav"
      }
    ]
  },
  "kavalan": {
    "lines": [
      {
        "zh": "隔著海，仍然記得你；讓故事留在山海之間。",
        "en": "Across the sea, I still remember you. Let our story stay between the mountains and the sea.",
        "audio": "story-audio/finale-kavalan-1.wav"
      }
    ]
  },
  "daji": {
    "narrator": false,
    "lines": [
      {
        "zh": "禍國妖姬？",
        "en": "A temptress who ruined a kingdom?",
        "audio": "story-audio/finale-daji-v3-1.wav"
      },
      {
        "zh": "可笑！",
        "en": "Absurd!",
        "audio": "story-audio/finale-daji-v3-2.wav"
      },
      {
        "zh": "我妲己披甲執鉞、征伐四方之時，",
        "en": "When I, Daji, took up my armor and battle-axe and marched to war,",
        "audio": "story-audio/finale-daji-v2-2.wav"
      },
      {
        "zh": "天下諸侯皆為手下敗將！",
        "en": "the lords of the realm fell before me!",
        "audio": "story-audio/finale-daji-v2-3.wav"
      }
    ],
    "voice": "Microsoft Yating",
    "rate": "94%",
    "pitch": "-3%",
    "duration": 8000,
    "intro": {
      "zh": "妲己不必只有「禍國妖姬」一種面貌。黃銘崇參照婦好等商代王后的資料，推測妲己也可能領兵作戰。本作據此重塑披甲執鉞的女將，讓她為自己發聲；這是依學術推論創作的角色，並非已獲證實的完整生平。",
      "en": "Daji need not be defined as a destructive temptress. Drawing on evidence about Shang queens such as Fu Hao, Huang Ming-chong proposes that Daji may also have commanded troops. Inspired by this interpretation, we reimagine her as an armored commander who speaks for herself—not as a fully verified biography.",
      "url": "https://research.sinica.edu.tw/ancient-china-shang-woman-daji/"
    },
    "credit": "依學術推論重塑 · 台詞為創作",
    "creditEn": "Scholarly-informed reimagining · Original dialogue",
    "entranceArt": "assets/daji-illusion.png",
    "commandSprite": "assets/daji-command-states.png",
    "introAfter": true,
    "commanderArt": "assets/daji-armored.png"
  },
  "yubao": {
    "lines": [
      {
        "zh": "謝謝你把聲音帶回來。讓我們一起讀下一個故事吧！",
        "en": "Thank you for bringing the sounds back. Let’s read the next story together!",
        "audio": "story-audio/finale-yubao-1.wav"
      }
    ]
  },
  "yubao-full": {
    "voice": "Microsoft Hanhan",
    "rate": "87%",
    "pitch": "+7%",
    "duration": 7200,
    "lines": [
      {
        "zh": "九段故事，九份勇氣，都在這本書裡發光。",
        "en": "Nine stories and nine kinds of courage shine within this book.",
        "audio": "story-audio/finale-yubao-full-v2-1.wav"
      },
      {
        "zh": "謝謝你和我一起長大。下一頁，我們一起寫。",
        "en": "Thank you for growing with me. Let’s write the next page together.",
        "audio": "story-audio/finale-yubao-full-v2-2.wav"
      }
    ]
  }
};
