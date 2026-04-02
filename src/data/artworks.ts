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
import voiceoverEmberAndGold from "@/assets/voiceover-ember-and-gold.m4a";

export interface Artwork {
  id: string;
  title: string;
  nativeTitle?: string;
  pronunciation?: string;
  year: string;
  medium: string;
  dimensions: string;
  image: string;
  images: string[]; // gallery images (main + detail shots)
  description: string;
  meaning: string;
  voiceover?: string; // optional audio URL
}

export const artworks: Artwork[] = [
  {
    id: "sunn",
    title: "Sunn",
    nativeTitle: "ਸੁੰਨ",
    pronunciation: "sun",
    year: "2024",
    medium: "Charcoal and pigment on cotton",
    dimensions: "137 × 107 cm",
    image: artwork6,
    images: [artwork6],
    description:
      "A figure emerges from the grain of the paper itself, as though the medium remembered a body it once held. The lines are not drawn so much as discovered — traces of movement left behind like footprints in sand before the tide returns.",
    meaning:
      "The body is the first landscape we ever know. This work explores the boundary between self and surface, between the person we present and the one who exists beneath. The whisper is not the figure itself, but the space around it — the silence that gives the form its voice.",
    voiceover: voiceoverSunn,
  },
  {
    id: "fractions-of-soul",
    title: "Fractions of Soul",
    year: "2024",
    medium: "Oil and gold leaf on canvas",
    dimensions: "152 × 152 cm",
    image: artwork1,
    images: [artwork1],
    description:
      "A meditation on the moment before fire becomes ash. The gold catches light the way memory catches time — briefly, desperately, beautifully. There is a violence in the warmth, a tenderness in the burning. This piece lives in the space between surrender and defiance, where every brushstroke is both a whisper and a scream.",
    meaning:
      "This work emerged from months of sitting with loss. Not the dramatic kind, but the quiet erosion of things once certain. The gold is not decoration — it is the part of us that refuses to dim. It speaks to the universal truth that our most luminous moments often arise from our deepest darkness, and that beauty is never more profound than when it is fragile.",
    voiceover: voiceoverFractionsOfSoul,
  },
  {
    id: "conclave",
    title: "Conclave",
    year: "2024",
    medium: "Mixed media on handmade paper",
    dimensions: "91 × 91 cm",
    image: artwork2,
    images: [artwork2],
    description:
      "A landscape that exists only in the space between waking and dreaming. The horizon line dissolves before it can be named. Layers of pigment and paper create a depth that shifts with the viewer's breath, as if the painting itself is alive, breathing in the quiet of the room.",
    meaning:
      "I wanted to paint silence. Not emptiness, but the kind of silence that holds everything — the moment before a word is spoken, when all meaning is still possible. This work is an invitation to linger in that threshold, to resist the urge to name what you see, and instead to simply feel the weight of possibility.",
    voiceover: voiceoverConclave,
  },
  {
    id: "khiidya",
    title: "Khiidya",
    nativeTitle: "ਖਿੜਿਆ",
    pronunciation: "khid-yah",
    year: "2023",
    medium: "Oil on linen",
    dimensions: "183 × 152 cm",
    image: artwork3,
    images: [artwork3],
    description:
      "The third in a series exploring the textures of darkness. Amber light emerges not as illumination, but as warmth remembered. The surface carries the trace of every gesture — visible brushwork that reveals the hand behind the vision, the human behind the mystery.",
    meaning:
      "Darkness is not absence — it is a presence, a companion. These nocturnes are love letters to the hours when the world stops performing and simply breathes. In the stillness of the night, we become most ourselves, shedding the masks that daylight demands. This painting holds space for that sacred vulnerability.",
    voiceover: voiceoverKhiidya,
  },
  {
    id: "suroor",
    title: "Suroor",
    nativeTitle: "ਸਰੂਰ",
    pronunciation: "su-rour",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "122 × 122 cm",
    image: artwork4,
    images: [artwork4],
    description:
      "A single gesture divides warm light from deep shadow. The stroke is both a boundary and a bridge — a threshold between what was and what could be. The paint moves with a certainty that belies the uncertainty of its subject, each edge trembling between resolution and dissolution.",
    meaning:
      "Every life has these moments — standing at the edge of transformation, one foot in the familiar, one reaching toward the unknown. This painting is that breath before the leap. It does not promise safe landing, only the courage to leave the ground. The threshold is not a place; it is a decision.",
    voiceover: voiceoverSuroor,
  },
  {
    id: "kithe",
    title: "Kithe?",
    nativeTitle: "ਕਿੱਥੇ",
    pronunciation: "kit-they",
    year: "2024",
    medium: "Oil and gold leaf on canvas",
    dimensions: "102 × 76 cm",
    image: artwork5,
    images: [artwork5],
    description:
      "Crimson pigment meets gold in a dialogue between rupture and repair. Inspired by the Japanese art of kintsugi — mending with gold what has been broken. The surface is both wound and wonder, both scar and song.",
    meaning:
      "We are most beautiful at our seams. This work honors the cracks we carry, the breaks that let the light enter. The gold is not a fix — it is a celebration. It speaks to the radical idea that our damage is not something to hide but to illuminate, that our fractures are the very places where our humanity shines through.",
    voiceover: voiceoverKithe,
  },

  {
    id: "vichhora",
    title: "Vichhora ",
    nativeTitle: "ਵਿਛੋੜਾ",
    pronunciation: "vi-cho-raa",
    year: "2023",
    medium: "Watercolor and ink on Arches paper",
    dimensions: "76 × 56 cm",
    image: artwork7,
    images: [artwork7],
    description:
      "Water carries pigment the way air carries prayer — outward, upward, beyond reach. This piece captures the exact moment of release, when color surrenders to gravity and intention dissolves into something larger than itself.",
    meaning:
      "Prayer, for me, is not about asking. It is about releasing. This painting is the visual record of that release — the moment when control becomes trust, when desire becomes acceptance. The dissolving is not a loss; it is a homecoming.",
    voiceover: voiceoverVichhora,
  },
  {
    id: "sanjhi-rooh",
    title: "Sanjhi Rooh",
    nativeTitle: "ਸਾਂਝੀ ਰੂਹ",
    pronunciation: "saan-jhee rooh",
    year: "2024",
    medium: "Oil and wax on panel",
    dimensions: "152 × 122 cm",
    image: artwork8,
    images: [artwork8],
    description:
      "Translucent layers of wax trap light within the surface, creating a luminescence that shifts throughout the day. The meridian — that invisible line dividing one hemisphere from another — becomes a metaphor for the boundaries we carry within.",
    meaning:
      "We all contain invisible lines — between who we were and who we are becoming, between what we show and what we protect. The veil in this work is not concealment; it is tenderness. It is the gentle way we hold our most sacred truths, visible only to those who look with patience.",
    voiceover: voiceoverSanjhiRooh,
  },
  {
    id: "dawning",
    title: "Dawning",
    year: "2023",
    medium: "Mixed media and found textile on canvas",
    dimensions: "168 × 137 cm",
    image: artwork9,
    images: [artwork9],
    description:
      "Fragments of fabric — once worn, once held, once loved — are embedded into the painting's surface. The textile carries the memory of touch, while the paint carries the memory of vision. Together, they sing a remnant song — incomplete, honest, alive.",
    meaning:
      "We are all composed of remnants — of people we have loved, places we have left, versions of ourselves we have outgrown. This work is a tribute to the fragments that refuse to be forgotten, the echoes that insist on being heard. The song is never finished; it only changes key.",
    voiceover: voiceoverDawning,
  },
  {
    id: "besotted",
    title: "Besotted",
    year: "2024",
    medium: "Acrylic and natural pigment on raw canvas",
    dimensions: "183 × 152 cm",
    image: artwork10,
    images: [artwork10],
    description:
      "Waves of color move across the raw canvas like breath across skin — rhythmic, involuntary, essential. The natural pigments shift in tone depending on the light, making the painting a living surface that changes with the hours.",
    meaning:
      "The tide is the earth's most faithful rhythm — relentless, patient, indifferent to our watching. This work mirrors the inner tides we all carry: the rising and falling of emotion, the pull of memory, the undertow of longing. It asks nothing of the viewer except presence.",
    voiceover: voiceoverBesotted,
  },

];
