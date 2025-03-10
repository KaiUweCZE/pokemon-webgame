import alertIcon from "@/images/icons/alert.webp";
import bagIcon from "@/images/icons/bagIcon.webp";
import closeNpcIcon from "@/images/icons/close-npc.webp";
import close2Icon from "@/images/icons/close2.webp";
import coinsIcon from "@/images/icons/coins.webp";
import emailIcon from "@/images/icons/email.webp";
import envelopeIcon from "@/images/icons/envelope.webp";
import heartbeatIcon from "@/images/icons/heartbeat.webp";
import hourglassIcon from "@/images/icons/hourglass.webp";
import mapIcon from "@/images/icons/mapIcon.webp";
import mapIcon1 from "@/images/icons/mapIcon1.webp";
import phoneIcon from "@/images/icons/phoneIcon.webp";
import pokedexIcon from "@/images/icons/pokedex.webp";
import pokedex1Icon from "@/images/icons/pokedex1.webp";
import pokedex from "@/images/icons/pokedex-icon.webp";
import rightIcon from "@/images/icons/right.webp";
import starIcon from "@/images/icons/star.webp";
import pokecenterIcon from "@/images/icons/pokecenter.webp";
import talkIcon from "@/images/icons/talk2.webp";
import shopIcon from "@/images/icons/shop2.webp";
import exploreIcon from "@/images/icons/explore2.webp";
import travelIcon from "@/images/icons/travel.webp";

export const icons = {
  alert: {
    src: alertIcon,
    alt: "Alert icon",
    size: 24,
  },
  bag: {
    src: bagIcon,
    alt: "Bag icon",
    size: 24,
  },
  closeNpc: {
    src: closeNpcIcon,
    alt: "Close NPC icon",
    size: 24,
  },
  close2: {
    src: close2Icon,
    alt: "Close icon",
    size: 24,
  },
  coins: {
    src: coinsIcon,
    alt: "Coins icon",
    size: 24,
  },
  email: {
    src: emailIcon,
    alt: "Email icon",
    size: 24,
  },
  envelope: {
    src: envelopeIcon,
    alt: "Envelope icon",
    size: 24,
  },
  heartbeat: {
    src: heartbeatIcon,
    alt: "Heartbeat icon",
    size: 24,
  },
  hourglass: {
    src: hourglassIcon,
    alt: "Hourglass icon",
    size: 24,
  },
  map: {
    src: mapIcon,
    alt: "Map icon",
    size: 24,
  },
  map1: {
    src: mapIcon1,
    alt: "Map icon alternative",
    size: 24,
  },
  phone: {
    src: phoneIcon,
    alt: "Phone icon",
    size: 24,
  },
  pokedex: {
    src: pokedexIcon,
    alt: "Pokedex icon",
    size: 24,
  },
  pokedex1: {
    src: pokedex1Icon,
    alt: "Pokedex icon alternative",
    size: 24,
  },
  right: {
    src: rightIcon,
    alt: "Right arrow icon",
    size: 24,
  },
  star: {
    src: starIcon,
    alt: "Star icon",
    size: 24,
  },
  "pokedex-icon": {
    src: pokedex,
    alt: "Pokedex icon alternative",
    size: 24,
  },
  pokecenter: {
    src: pokecenterIcon,
    alt: "Pokecenter icon",
    size: 24,
  },
  talk: {
    src: talkIcon,
    alt: "Talk icon",
    size: 24,
  },
  shop: {
    src: shopIcon,
    alt: "Shop icon",
    size: 24,
  },
  explore: {
    src: exploreIcon,
    alt: "Explore icon",
    size: 24,
  },
  travel: {
    src: travelIcon,
    alt: "Travel icon",
    size: 24,
  },
} as const;

export type IconName = keyof typeof icons;
