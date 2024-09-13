import alcuboneImg from "@/assets/images/characters/alcubone.webp";
import amendsenImg from "@/assets/images/characters/amendsen.webp";
import annaImg from "@/assets/images/characters/anna.webp";
import attilaImg from "@/assets/images/characters/attila.webp";
import barbagooseImg from "@/assets/images/characters/barbagoose.webp";
import bobImg from "@/assets/images/characters/bob.webp";
import bruceImg from "@/assets/images/characters/bruce.webp";
import brunoImg from "@/assets/images/characters/bruno.webp";
import confusitionusImg from "@/assets/images/characters/confusitionus2.webp";
import conradImg from "@/assets/images/characters/conrad.webp";
import donaldImg from "@/assets/images/characters/donald.webp";
import donchatotImg from "@/assets/images/characters/donchatot.webp";
import fattucinoImg from "@/assets/images/characters/fattucino.webp";
import fuImg from "@/assets/images/characters/fu.webp";
import geronimoImg from "@/assets/images/characters/geronimo.webp";
import goliasImg from "@/assets/images/characters/golias.webp";
import gourmattImg from "@/assets/images/characters/gourmatt.webp";
import hankImg from "@/assets/images/characters/hank.webp";
import heathImg from "@/assets/images/characters/heath.webp";
import humbertoImg from "@/assets/images/characters/humberto.webp";
import isabellaImg from "@/assets/images/characters/isabella.webp";
import jeanImg from "@/assets/images/characters/jean.webp";
import joelImg from "@/assets/images/characters/joel.webp";
import judeImg from "@/assets/images/characters/jude.webp";
import kaliImg from "@/assets/images/characters/kali.webp";
import kungImg from "@/assets/images/characters/kung.webp";
import macImg from "@/assets/images/characters/mac.webp";
import makataiImg from "@/assets/images/characters/makatai.webp";
import nanaImg from "@/assets/images/characters/nana.webp";
import pepeImg from "@/assets/images/characters/pepe.webp";
import princessImg from "@/assets/images/characters/princess.webp";
import profBloomImg from "@/assets/images/characters/profbloom.webp";
import raphaelImg from "@/assets/images/characters/raphael.webp";
import samuelImg from "@/assets/images/characters/samuel2.webp";
import senchaImg from "@/assets/images/characters/sencha.webp";
import sheriffImg from "@/assets/images/characters/sheriff.webp";
import weeImg from "@/assets/images/characters/wee.webp";
import willyImg from "@/assets/images/characters/willy.webp";
import wingchuImg from "@/assets/images/characters/wingchu.webp";
import lordImg from "@/assets/images/characters/lord.webp";
import TomImg from "@/assets/images/characters/miner.webp";
import MichaelImg from "@/assets/images/characters/michael.webp";
import kamakawiwoImg from "@/assets/images/characters/dojo-master.webp";
import hugoImg from "@/assets/images/characters/hugo.webp";
import jasminImg from "@/assets/images/characters/jasmin.webp";
import giovanniImg from "@/assets/images/characters/giovanni.webp";
import joeyImg from "@/assets/images/characters/joey.webp";
import morrisImg from "@/assets/images/characters/morris.webp";
import tooteeImg from "@/assets/images/characters/tootee.webp";
import stuartImg from "@/assets/images/characters/stue.webp";
import daoxuanImg from "@/assets/images/characters/daoxuan.webp";
import shamanImg from "@/assets/images/characters/shaman.webp";
import kawuImg from "@/assets/images/characters/kawu.webp";
import rebeccaImg from "@/assets/images/characters/rebecca.webp";
import hughImg from "@/assets/images/characters/hugh.webp";
import robinImg from "@/assets/images/characters/robin.webp";
import grumpyImg from "@/assets/images/characters/grumpy.webp";
import salazarImg from "@/assets/images/characters/salazar.webp";
import albertImg from "@/assets/images/characters/albert.webp";
import marryImg from "@/assets/images/characters/marry.webp";

import { npcPokemons } from "../npcPokemons";
import { raphaelPokemons } from "./npcPokemon/raphaelPokemons";
import { sheriffPokemons } from "./npcPokemon/sheriffPokemon";

const generateNpcPokemons = (name: string) => {
  const data = npcPokemons.find((npc) => npc.id === name);
  return data?.pokemons;
};

export const npcData = [
  {
    id: 0,
    name: "Alcubone",
    message: "Welcome to our village! How can I assist you today?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: alcuboneImg,
  },
  {
    id: 1,
    name: "Amendsen",
    message: "It's a beautiful day for an adventure, isn't it?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: amendsenImg,
  },
  {
    id: 2,
    name: "Anna",
    message: "Have you seen the new market? It's bustling with activity!",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: annaImg,
  },
  {
    id: 3,
    name: "Attila",
    message: "Keep your friends close, and your enemies closer.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: attilaImg,
  },
  {
    id: 4,
    name: "Barbagoose",
    message: "The forest is full of secrets. Will you uncover them all?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: barbagooseImg,
  },
  {
    id: 5,
    name: "Bob",
    message: "Hey there, traveler! Need some directions?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: bobImg,
  },
  {
    id: 6,
    name: "Bruce",
    message: "Never give up, no matter how tough the journey gets.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: bruceImg,
  },
  {
    id: 7,
    name: "Bruno",
    message: "I've got some rare items for trade. Interested?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: brunoImg,
  },
  {
    id: 8,
    name: "Confusitious",
    message: "Wisdom comes with time. Be patient and learn.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: confusitionusImg,
  },
  {
    id: 9,
    name: "Conrad",
    message: "The mountains hold many mysteries. Be careful out there.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: conradImg,
  },
  {
    id: 10,
    name: "Donald",
    message: "I heard there's a treasure hidden somewhere in this town.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: donaldImg,
  },
  {
    id: 11,
    name: "Don Chatot",
    message: "Strategy is key to winning battles. Plan ahead.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: donchatotImg,
  },
  {
    id: 12,
    name: "Fattucino",
    message: "Have you tried our local cuisine? It's the best around!",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: fattucinoImg,
  },
  {
    id: 13,
    name: "Fu",
    message: "Balance is essential. Keep your mind and body in harmony.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: fuImg,
  },
  {
    id: 14,
    name: "Geronimo",
    message: "Bravery is not the absence of fear, but the triumph over it.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: geronimoImg,
  },
  {
    id: 15,
    name: "Golias",
    message: "Strength comes from within. Believe in yourself.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: goliasImg,
  },
  {
    id: 16,
    name: "Gourmatt",
    message: "Cooking is an art. Every dish tells a story.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: gourmattImg,
  },
  {
    id: 17,
    name: "Hank",
    message: "The sea is vast and full of wonders. Explore it!",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: hankImg,
  },
  {
    id: 18,
    name: "Heath",
    message: "Knowledge is power. Never stop learning.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: heathImg,
  },
  {
    id: 19,
    name: "Humberto",
    message: "Every journey begins with a single step.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: humbertoImg,
  },
  {
    id: 20,
    name: "Isabella",
    message: "Magic is real if you believe in it.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: isabellaImg,
  },
  {
    id: 21,
    name: "Jean",
    message: "Every flower has its own unique beauty.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: jeanImg,
  },
  {
    id: 22,
    name: "Joel",
    message: "Music is the language of the soul.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: joelImg,
  },
  {
    id: 23,
    name: "Jude",
    message: "Stay focused and never lose sight of your goals.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: judeImg,
  },
  {
    id: 24,
    name: "Kali",
    message: "Dance like no one is watching.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: kaliImg,
  },
  {
    id: 25,
    name: "Kung",
    message: "Train hard and you will achieve greatness.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: kungImg,
  },
  {
    id: 26,
    name: "Mac",
    message: "There's always a way, you just have to find it.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: macImg,
  },
  {
    id: 27,
    name: "Makatai",
    message: "Technology can be your greatest ally.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: makataiImg,
  },
  {
    id: 28,
    name: "Nana",
    message: "Home is where the heart is.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: nanaImg,
  },
  {
    id: 29,
    name: "Pepe",
    message: "Laughter is the best medicine.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: pepeImg,
  },
  {
    id: 30,
    name: "Princess",
    message: "Kindness is a virtue that everyone should embrace.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: princessImg,
  },
  {
    id: 31,
    name: "prof. Bloom",
    message: "Nice to hear you! How are you?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: false,
    actions: [
      {
        name: "battle",
        active: false,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: profBloomImg,
  },
  {
    id: 32,
    name: "Raphael",
    message: "Art is the expression of the soul.",
    pokemons: raphaelPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: raphaelImg,
  },
  {
    id: 33,
    name: "Samuel",
    message: "Every decision shapes your destiny.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: samuelImg,
  },
  {
    id: 34,
    name: "Sencha",
    message: "A good cup of tea can solve many problems.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: senchaImg,
  },
  {
    id: 35,
    name: "Sheriff",
    message: "Law and order must be maintained.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: false,
    actions: [
      {
        name: "battle",
        active: false,
      },
      {
        name: "quest",
        active: true,
      },
    ],
    img: sheriffImg,
  },
  {
    id: 36,
    name: "Wee",
    message: "Curiosity is the key to discovery.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: weeImg,
  },
  {
    id: 37,
    name: "Willy",
    message: "Hard work always pays off in the end.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: willyImg,
  },
  {
    id: 38,
    name: "Wingchu",
    message: "Speed and agility can turn the tide of any battle.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: wingchuImg,
  },
  {
    id: 38,
    name: "Lord",
    message: "Speed and agility can turn the tide of any battle.",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: lordImg,
  },
  {
    id: 39,
    name: "Miner Tom",
    message: "Hoy, Hoy! Do you have a shovel?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: TomImg,
  },
  {
    id: 40,
    name: "Michael",
    message: "Hoy, Hoy! Do you have a shovel?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: MichaelImg,
  },
  {
    id: 41,
    name: "Kamakawiwo",
    message: "Oh why, oh why can't I?",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: kamakawiwoImg,
  },
  {
    id: 42,
    name: "Hugo",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: hugoImg,
  },
  {
    id: 43,
    name: "Jasmin",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: jasminImg,
  },
  {
    id: 44,
    name: "Stuart",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: stuartImg,
  },
  {
    id: 45,
    name: "Morris",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: morrisImg,
  },
  {
    id: 46,
    name: "Joey",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: joeyImg,
  },
  {
    id: 47,
    name: "Giovanni",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: giovanniImg,
  },
  {
    id: 48,
    name: "Tootee",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: tooteeImg,
  },
  {
    id: 49,
    name: "Rebecca",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: true,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: rebeccaImg,
  },
  {
    id: 50,
    name: "Kawu",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: kawuImg,
  },
  {
    id: 51,
    name: "Daoxuan",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: daoxuanImg,
  },
  {
    id: 52,
    name: "Shaman",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: shamanImg,
  },
  {
    id: 52,
    name: "Hugh",
    message: "Hey",
    pokemons: sheriffPokemons.pokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: hughImg,
  },
  {
    id: 53,
    name: "Robin",
    message: "Hey",
    pokemons: raphaelPokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: robinImg,
  },
  {
    id: 53,
    name: "Grumpy",
    message: "Hey",
    pokemons: raphaelPokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: grumpyImg,
  },
  {
    id: 54,
    name: "Salazar",
    message: "Hey",
    pokemons: raphaelPokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: salazarImg,
  },
  {
    id: 55,
    name: "Albert",
    message: "Hey",
    pokemons: raphaelPokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: albertImg,
  },
  {
    id: 56,
    name: "Marry",
    message: "Hey",
    pokemons: raphaelPokemons,
    stadiumTrainer: false,
    battle: true,
    actions: [
      {
        name: "battle",
        active: true,
      },
      {
        name: "quest",
        active: false,
      },
    ],
    img: marryImg,
  },
];
