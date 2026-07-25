export type Episode = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  videoLabel: string;
  passages: string[];
  outline: string[];
  reflectionQuestions: string[];
};

export type StudyPage = {
  book: string;
  chapter: string;
  title: string;
  translation: string;
  summary: string;
  outline: string[];
  reflection: string[];
  prayerPrompt: string;
  relatedEpisodes: string[];
};

export const episodes: Episode[] = [
  {
    slug: "romans-8",
    title: "Romans 8 — The Spirit and the Believer",
    date: "May 2026",
    summary:
      "A deep dive into the life of the Spirit, hope, and the believer’s identity in Christ.",
    videoLabel: "Romans 8:1-17",
    passages: ["Romans 8", "Galatians 5", "John 15"],
    outline: [
      "The believer is no longer under condemnation",
      "The Spirit teaches the people of God how to live",
      "Hope carries the church through suffering",
    ],
    reflectionQuestions: [
      "What part of your life feels burdened by guilt right now?",
      "How does the Spirit help you live in obedience?",
      "Where do you need to lean into hope instead of fear?",
    ],
  },
  {
    slug: "psalm-23",
    title: "Psalm 23 — Shepherding the Soul",
    date: "April 2026",
    summary:
      "A pastoral exploration of comfort, guidance, and peace in the middle of uncertainty.",
    videoLabel: "Psalm 23:1-6",
    passages: ["Psalm 23", "Isaiah 40", "John 10"],
    outline: [
      "God gives rest to the weary soul",
      "The Lord leads us through fear and darkness",
      "We find courage in the goodness of His presence",
    ],
    reflectionQuestions: [
      "Where do you most need rest today?",
      "What fear is making you want to avoid the stillness of God?",
      "How can you carry the peace of Psalm 23 into your week?",
    ],
  },
];

export const studies: StudyPage[] = [
  {
    book: "romans",
    chapter: "8",
    title: "Romans 8 Study Guide",
    translation: "ESV",
    summary:
      "A chapter about living in the Spirit rather than in fear, with a vision of hope and adoption.",
    outline: [
      "The life of the believer is shaped by the Spirit",
      "God’s promises are stronger than our weakness",
      "The future glory of Christ is the anchor of our hope",
    ],
    reflection: [
      "The chapter teaches that being in Christ changes the posture of the soul.",
      "The Gospel does not simply save us; it reshapes our daily life.",
    ],
    prayerPrompt: "Lord, help me to live by Your Spirit today and not by fear.",
    relatedEpisodes: ["romans-8"],
  },
  {
    book: "psalms",
    chapter: "23",
    title: "Psalm 23 Study Guide",
    translation: "NIV",
    summary:
      "A meditation on the shepherd’s care, the valley, and the table prepared in the presence of enemies.",
    outline: [
      "The Lord is a shepherd who provides and guides",
      "Darkness is not the end of the story",
      "God’s presence turns fear into trust",
    ],
    reflection: [
      "The chapter offers a simple but profound invitation into rest.",
      "It teaches that God’s presence is more powerful than the circumstances around us.",
    ],
    prayerPrompt: "Father, teach me to rest in Your presence and trust Your guidance.",
    relatedEpisodes: ["psalm-23"],
  },
];

export const devotionals = [
  {
    title: "A Breath of Hope",
    theme: "Rest",
    blurb: "A short reflection for those who need stillness before they can move forward.",
  },
  {
    title: "When the Room Feels Heavy",
    theme: "Encouragement",
    blurb: "A devotional prompt for seasons when the soul feels dry and worn down.",
  },
];

export const starterPrompts = [
  "Explain Romans 8 in simple language.",
  "Give me a prayer based on Psalm 23.",
  "Summarize the main idea of this passage for a small group.",
];

export function getEpisodeBySlug(slug: string) {
  return episodes.find((episode) => episode.slug === slug);
}

export function getStudyByPath(book: string, chapter: string) {
  return studies.find((study) => study.book === book && study.chapter === chapter);
}
