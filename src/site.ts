// Global settings. Everything here is used across sections.

export const site = {
  name: 'Camilo Brown-Pinilla',
  description:
    'Camilo Brown-Pinilla — research in representation learning, neural architectures, and interpretability.',

  // Social buttons in the header. Leave a url empty ('') to hide that button.
  socials: {
    github: 'https://github.com/camilobrownpinilla',
    linkedin: 'https://www.linkedin.com/in/cbrownpinilla/',
    twitter: 'https://x.com/brownpinilla',
    scholar: 'https://scholar.google.com/citations?hl=en&user=hJCZMocAAAAJ',
  },

  // Last.fm username for the Music section (top albums of the last month).
  // The API key goes in .env as PUBLIC_LASTFM_API_KEY (see .env.example).
  lastfmUser: 'bpinilla',
};

// Tabs in the window header. `href` points at a section id on the home page.
export const nav = [
  { label: 'about', href: '/#about' },
  { label: 'research', href: '/#research' },
  { label: 'publications', href: '/#publications' },
  { label: 'misc', href: '/#misc' },
];
