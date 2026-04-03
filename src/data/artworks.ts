import artwork1 from "@/assets/artwork-1.png";
import artwork2 from "@/assets/artwork-2.png";
import artwork3 from "@/assets/artwork-3.png";
import artwork4 from "@/assets/artwork-4.png";
import artwork5 from "@/assets/artwork-5.png";
import artwork6 from "@/assets/correct.png";
import artwork7 from "@/assets/artwork-7.png";
import artwork8 from "@/assets/artwork-8.png";
import artwork9 from "@/assets/artwork-9.png";
import artwork10 from "@/assets/artwork-10.png";

import voiceoverFractionsOfSoul from "@/assets/voiceover-fractions-of-soul.m4a";
import voiceoverConclave from "@/assets/voiceover-conclave.m4a";
import voiceoverKhiidya from "@/assets/voiceover-khiidya.m4a";
import voiceoverSuroor from "@/assets/voiceover-suroor.m4a";
import voiceoverKithe from "@/assets/voiceover-kithe.m4a";
import voiceoverSunn from "@/assets/voiceover-sunn.m4a";
import voiceoverVichhora from "@/assets/voiceover-vichhora.m4a";
import voiceoverSanjhiRooh from "@/assets/voiceover-sanjhi-rooh.m4a";
import voiceoverDawning from "@/assets/voiceover-dawning.m4a";
import voiceoverBesotted from "@/assets/voiceover-besotted.m4a";

export interface Artwork {
  id: string;
  title: string;
  nativeTitle?: string;
  pronunciation?: string;
  medium: string;
  detailedMedium?: string;
  dimensions: string;
  image: string;
  images: string[];
  description: string;
  artistReflection: string;
  voiceover?: string;
}

export const artworks: Artwork[] = [
  {
    id: "sunn",
    title: "Sunn",
    nativeTitle: "ਸੁੰਨ",
    pronunciation: "sun",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper plate, copper foil, semi-precious gemstone, 3D liner, gutta, silk colours, acrylic paints, watercolour and mica pigment on MDF and silk fabric",
    dimensions: "50.5 x 29 inches",
    image: artwork6,
    images: [artwork6],
    description: "It represents a state of awareness that has witnessed, thought, and absorbed all that needed to unfold. It is about a moment when experience has completed its cycle: what had to happen has happened, and the ever-watching eye has gathered the attention of the whole being. In this state, ordinary mental noise dissolves. The boundaries between the conscious and subconscious soften, and all layers of the self come together. This merger is not empty, but still, a kind of stillness that is like a void, not incomplete but filled with warmth, wholeness, and light. It is this place where nothing is lacking. The work expresses this state of pure presence, where awareness rests in itself and becomes the answer it was seeking. It is a primordial suspension.",
    artistReflection: "I was holding a stillness that already felt complete, nothing to chase, nothing to resolve. Each material was chosen very consciously, but when it all came together, it simply rested into a quiet, whole feeling.",
    voiceover: voiceoverSunn,
  },
  {
    id: "fractions-of-soul",
    title: "Fractions of Soul",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper plate and wire, copper foil, fused glass squares, CZ gemstone, 3D liner, alcohol inks, acrylic inks, watercolour and mica pigment on canvas",
    dimensions: "12 x 12 inches",
    image: artwork1,
    images: [artwork1],
    description: "Our memories, new or old, make us; sometimes they consume us. They quietly shape how we see the world. They are omnipresent, sometimes as still as air, light as a breeze, and sometimes so powerful as to liberate us. Some memories shine like gems that we keep close, treasured. Others are like whispers, yet are profoundly impactful, always lurking around.\nThey move back and forth inside us. All external things, material things, fade away, but the emotions connected to those memories always find their way back. These feelings make up every particle of our soul, whether joyful or painful. They live in the lines of one’s self, not just the body, but the emotional and psychological paths as well.",
    artistReflection: "This came from a moment of feeling everything at once and realising every fragment is still a part of my being. The scratched, weathered copper foil holds that rawness, while each element was placed with intention, yet allowed to remain slightly unresolved.",
    voiceover: voiceoverFractionsOfSoul,
  },
  {
    id: "conclave",
    title: "Conclave",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper plate, copper foil, alcohol inks, acrylic inks, acrylic colours, watercolour and mica pigment on canvas",
    dimensions: "36 x 24 inches",
    image: artwork2,
    images: [artwork2],
    description: "In the innermost sanctum of our being, the private space where all parts of us gather, there are eerie silences and bass-filled rhythms. It consists of our thoughts, doubts, conditioning, vast imagination, and desires. Everything we have absorbed from life and beyond forms this assembly. It is like a court gathered in obeisance before the ever-watching eye. Beneath the ever-watching eye, these inner voices are constantly deciding, reconsidering, and choosing again and again. These things happen within us, as if guided by forces we barely notice, as if we are in a dizzy state.\nThe many eyes in the painting symbolise this dual state. They represent watching and being watched, awareness and surveillance. Even when we feel absent or passive, something within us continues to observe. There is always a silent seer beneath the noise.",
    artistReflection: "It started simply with buying a canvas and beginning. From there, I built it layer by layer, like thoughts gathering, shaping the forms and eyes with intention, while still letting it evolve naturally.",
    voiceover: voiceoverConclave,
  },
  {
    id: "khiidya",
    title: "Khiidya",
    nativeTitle: "ਖਿੜਿਆ",
    pronunciation: "khid-yah",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper sheet, copper foil, 3D liner, alcohol inks, acrylic inks, acrylic colours, plaster and mica pigment on canvas",
    dimensions: "30 x 15 inches",
    image: artwork3,
    images: [artwork3],
    description: "This piece speaks about what lies between the ever-watching awareness and the eternal flow of energy that moves through us. In that in-between space, the emotions and thoughts we try to ignore, suppress, or escape reside. Even when we refuse to acknowledge them, they do not disappear; they settle in the shadows. Yet our mind, being so wonderful, continues to search and observe. The inner conduit calls back and resurfaces everything. The self cannot outrun itself, and that is when all that is hidden unfurls in all its glory. Shadows sink, illusions form, but awareness never sleeps.",
    artistReflection: "It may feel stark at first, but Khiidya, meaning to bloom in Punjabi, unfolds through layered surfaces, with subtle 3D textures rising beneath the copper, allowing it to open up gradually, like something unfolding on its own, but still gently guided.",
    voiceover: voiceoverKhiidya,
  },
  {
    id: "suroor",
    title: "Suroor",
    nativeTitle: "ਸਰੂਰ",
    pronunciation: "su-rour",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper sheet, copper foil, 3D liner, alcohol inks, acrylic inks, charcoal, resin and mica pigment on canvas",
    dimensions: "20 x 20 inches",
    image: artwork4,
    images: [artwork4],
    description: "Suroor reflects a moment of gentle withdrawal from reality, where the mind allows itself small doses of dreams, like a soft intoxication born of imagination, comfort, and emotional escape.\nIn this state, we build inner mirages, illusions within illusions, temporary mental spaces that feel surreal, where one truly sees and understands oneself. This detachment is not complete unconsciousness; it is more like looking through a tunnel. Reality is still present, but filtered, distant, and dream-tinted. From this space, one can experience one’s possible true self, something that only this little drunken distance can provide.",
    artistReflection: "This was about that soft, in-between state of being. I kept the composition open and intentional, so the piece could breathe, like looking at reality, but through a slightly altered lens.",
    voiceover: voiceoverSuroor,
  },
  {
    id: "kithe",
    title: "Kithe?",
    nativeTitle: "ਕਿੱਥੇ",
    pronunciation: "kit-they",
    medium: "Natural watercolours on silk fabric",
    detailedMedium: "Natural watercolours on silk fabric",
    dimensions: "9 x 5.5 inches",
    image: artwork5,
    images: [artwork5],
    description: "This art piece explores how the mind becomes captivated by its own thoughts. Thoughts, whether good or bad, carry a strange beauty and intensity that mesmerises the ever-watchful eye. They sometimes form patterns, repeating again and again. No matter how much time has passed, a single spark can bring back a long string of thoughts that carry intense emotions and feelings.\nBeneath this exists the deeper core of the self, the untamed inner energy that longs to expand beyond these patterned spaces. While consciousness admires the beauty of its own constructions, the soul strains toward something more, to see more, feel more, and move beyond what has already been experienced.",
    artistReflection: "This came from a quiet pull within, kithe? where to, like something inside trying to find its way out. I held the frame deliberately, but let certain elements push against it, carrying that urge to come through.",
    voiceover: voiceoverKithe,
  },
  {
    id: "vichhora",
    title: "Vichhora ",
    nativeTitle: "ਵਿਛੋੜਾ",
    pronunciation: "vi-cho-raa",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper sheet, copper foil, resin, alcohol inks, acrylic inks, watercolour on canvas",
    dimensions: "7.8 x 7.8 inches",
    image: artwork7,
    images: [artwork7],
    description: "This work reflects the deep urge to experience the pure, original energy that already exists within us, the universal force that lives in every particle and atom of the body, beyond the control of constant awareness, our ever-watching eye. It traps us in a loop of self-pleasing and self-correction. We perform for this awareness, trying to satisfy it and to remain composed within its gaze, until the soul grows tired. A quiet sigh rises from the soul through repetition.\nEventually, the soul tears away from consciousness in an attempt to let the pure energy come through. This is immensely uncomfortable, exhausting, and heavy, like a storm about to break, yet it is vital. From the observer’s point of view, the ever-watching eye still remains central, but the surge within the person experiencing it feels deeply personal.",
    artistReflection: "Vichhora means a longing, yearning separation, and this piece sits in that space where, when we stop watching ourselves, we truly begin.",
    voiceover: voiceoverVichhora,
  },
  {
    id: "sanjhi-rooh",
    title: "Sanjhi Rooh",
    nativeTitle: "ਸਾਂਝੀ ਰੂਹ",
    pronunciation: "saan-jhee rooh",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper foil, alcohol inks, acrylic inks, 3D liner, watercolour, silk on copper plate",
    dimensions: "75.1 x 5.3 x 3.9 inches",
    image: artwork8,
    images: [artwork8],
    description: "This work reflects the idea that we are one whole being, yet internally divided. The body remains singular, but in our minds, opposite forces are at play. One force ignites chaos, which only intensifies under the ever-watching eye that observes, judges, and amplifies inner storms. At the same time, another force exists within that calms and restores, in turn making us believe in hope again. The interaction of the two is a continuous process.\nBut neither of the two forces is negative or evil in the end; both reside within the same being. They are not enemies but essential counterparts. Their interactions shape identity. This work embraces that duality, the understanding that the chaos and the quiet, the fire and the stillness, are equally myself.",
    artistReflection: "This piece conveys the understanding that all parts of us, even in contrast, belong to the same whole. The copper plate, treated through heat and layered patinas, shifts and evolves, and the slight tilt is intentional, because balance here is not perfect; it is negotiated.",
    voiceover: voiceoverSanjhiRooh,
  },
  {
    id: "dawning",
    title: "Dawning",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: copper foil, alcohol inks, natural watercolours on silk, gutta liner, copper on deckle sheet",
    dimensions: "8.6 x 5.9 inches",
    image: artwork9,
    images: [artwork9],
    description: "Dawning explores the fragile moment when a thought or feeling begins to rupture established constructs. Our perceptions, conditioning, and evolved learning form rigid principles that are hard to change, not necessarily wrong, but rigid, and sometimes we get stuck because of them. They become roads difficult to depart from.\nYet sometimes a brief awakening occurs, where one glimpses the pure energy running through them, pure transcendence. For a moment, there is clarity, a sense of breaking free. But this very moment is fleeting, and we return to the set paths.\nThe work captures this tension, the attempt to emerge, the flash of realisation, and the gravity of returning to what has already been formed.",
    artistReflection: "This came from that feeling of something within not sitting right, like how the body pushes things out through boils. Here, those forms become that release, where our rigid perceptions and ways of thinking begin to come out, as the mind and soul try to push out what no longer belongs there.",
    voiceover: voiceoverDawning,
  },
  {
    id: "besotted",
    title: "Besotted",
    medium: "Mixed Media",
    detailedMedium: "Mixed Media: oil colours, watercolours, watercolour pencils and copper wire on paper",
    dimensions: "11.8 x 5.9 inches",
    image: artwork10,
    images: [artwork10],
    description: "The work explores the state of being consumed so deeply that clarity dissolves. A feeling or thought overtakes us, and even the raw energy moving through us feels bound to it. We begin to believe the surge is our purpose. The conscious mind convinces the subconscious, and pure energy aligns with that belief, supporting the desire. But soon, the illusion reveals itself, yet our whole being remains entangled in the pursuit.\nSo what happens then\nWhat does one do with such a feeling\nWhat does one do with this body, this vessel, after pouring all conscious and subconscious force into one pursuit\nWhere does one go after surrendering so fully",
    artistReflection: "This was very fascinating for me to draw, almost hypnotic in the process. The materials and colours feel very simple, yet there was so much that got expressed through it, making it deeply immersive to sit with and build.",
    voiceover: voiceoverBesotted,
  }
];
