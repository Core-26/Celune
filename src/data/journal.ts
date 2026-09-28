export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
  quote?: string;
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'understanding-moon-phases',
    title: 'Understanding Moon Phases in High Jewelry',
    category: 'Celestial Craft',
    readTime: '4 min read',
    date: 'Autumn Equinox',
    excerpt: 'How the perpetual shift between light and shadow shapes our sculptural silhouettes and gemstone selections.',
    image: '/src/assets/images/celune_hero_necklace_1790578543506.jpg',
    quote: '"The moon does not fight the darkness; it simply allows the light to find its natural geometry."',
    content: [
      'For millennia, humanity has looked upward to measure time not by ticking hands, but by the quiet expansion and contraction of lunar silver. Each phase carries its own architectural language.',
      'A Waxing Crescent asks for minimal, tapered metalwork that holds a sharp crescent silhouette, inviting anticipation. A Full Moon calls for spherical cabochons—natural moonstone, South Sea pearls—illuminated by seamless 360-degree pavé collars.',
      'In our Paris and Tokyo ateliers, our jewelers study the optical diffusion of moonlight through high-purity water to match the exact refraction index of our brilliant-cut diamonds.'
    ]
  },
  {
    id: 'moon-and-tides-connection',
    title: 'The Relationship Between Moon and Tides',
    category: 'Philosophy & Water',
    readTime: '5 min read',
    date: 'Full Moon Cycle',
    excerpt: 'Liquid reflections in precious metals: tracing the unseen gravitational pulse connecting ocean swells to celestial paths.',
    image: '/src/assets/images/celune_pearl_water_1790578580617.jpg',
    quote: '"Water remembers every movement, yet never holds a rigid posture."',
    content: [
      'The moon pulls upon the vast waters of our planet twice daily with patient, inescapable devotion. It is the most tangible proof that things separated by unimaginable distance remain intimately bonded.',
      'Our Water collection translates this gravitational dialogue into undulating platinum contours. Rather than static geometric bands, our rings and cuffs ripple organically, mimicking water surface tension.',
      'When paired with celestial constellation pendants, the pieces complete a cosmic dialogue: the starlight above reflected in the undulating tide below.'
    ]
  },
  {
    id: 'stories-behind-constellations',
    title: 'Ancient Starlight in Contemporary Forms',
    category: 'Constellation Archive',
    readTime: '6 min read',
    date: 'Solstice Night',
    excerpt: 'The mythology and astrometry behind Orion, Cassiopeia, and the twin stars of Gemini.',
    image: '/src/assets/images/celune_orion_pendant_1790578557354.jpg',
    quote: '"To look at a constellation is to read a map drawn by our ancestors across millions of light years."',
    content: [
      'When sailors steered across open oceans without compass or shore in sight, the stars were not mere decoration; they were life, destination, and sanctuary.',
      'In Célune’s Lunar Constellation collection, each diamond is mapped to the relative astronomical magnitude of the star it honors. Betelgeuse in Orion is rendered with a slightly warmer facet angle; Vega in Lyra is framed in pure, icy platinum.',
      'Wearing your personal constellation is not an embrace of superstitious fortune, but an acknowledgment of your place within an ancient, enduring continuum.'
    ]
  },
  {
    id: 'art-of-the-matching-set',
    title: 'How to Choose a Matching Set: Beyond the Identical',
    category: 'Bonds & Relationships',
    readTime: '3 min read',
    date: 'New Moon',
    excerpt: 'Why the most meaningful paired jewelry pieces are complementary rather than carbon copies.',
    image: '/src/assets/images/celune_bonds_pair_1790578569137.jpg',
    quote: '"Two people who share a bond do not possess identical souls; they offer each other what the other admires."',
    content: [
      'Traditional matching jewelry often relies on duplicate pieces—two identical rings or twin necklaces. At Célune, our Bonds philosophy takes inspiration from the cosmos.',
      'A crescent moon cannot exist without the shadow of the earth; the tide cannot rise without the gravitational call of the moon. In the same way, our Bonds pieces are designed to converse.',
      'One partner wears the star, the other the constellation it completes. One wears the wave contour, the other the pearl it carries safely to shore.'
    ]
  }
];
