/** In-game tribute to Marga, 1935-2026. Known to family as Oma Marga. */
export const OMA_MARGA = {
  id: 'oma-marga',
  name: 'Oma Marga',
  birthYear: 1935,
  deathYear: 2026,
  title: 'The Straight Shooter',
  emoji: '📚',
  /** Short line shown before the full tribute is revealed. */
  tagline: 'A woman of languages, lifelong curiosity, and deep roots.',
  /** Full tribute, revealed on tap. */
  tributeParagraphs: [
    'She kept plants thriving, friendships alive well into her ninetieth year, and a home that was always a joy to visit, organized meticulously in labelled boxes. She made spargelsuppe especially for me, knitted socks, and sewed bags, bed sheets, clothes, and even a costume for me as a child, all by hand. She helped run a boat shop in her youth, and even in old age kept traveling the world with her friends. In her later years, she learned to send emails just to stay in touch.',
    'She was direct, strong, and caring in her own way, full of quirks, and not afraid to defend the people she loved, including standing up to a rude fabric shop owner in my birth town who had no patience for curious little kids. She left behind things made by hand, handwritten letters in her famously difficult-to-decipher handwriting, emails written in her own voice, and a green thumb that touched everything around her.',
  ],
  tributeClosing: 'Remembered with love.',
} as const;

/** Her words, preserved as she wrote them in email. */
export const OMA_MARGA_EMAIL_QUOTES = {
  emailCelebration:
    'Ich wünsche Dir weiterhin viel Spaß und Erfolg. Ein Hoch auf email!!!!',
  lifeChanges:
    'Das Leben besteht oft aus Veränderungen, und jeder Tag muss neu entschieden werden.',
  germanPride:
    "Wir haben auch darüber gesprochen, das Du so ein gutes 'Deutsch' sprichst und schreibst. Das kann ich nur bewundern.",
} as const;

/** English translations of her words, shown alongside the German. */
export const OMA_MARGA_EMAIL_TRANSLATIONS = {
  emailCelebration: 'I wish you continued joy and success. Here\'s to email!',
  lifeChanges: 'Life is often made of changes, and each day must be decided anew.',
  germanPride:
    'We also talked about how well you speak and write German. I can only admire that.',
  admire: 'I can only admire that.',
} as const;
