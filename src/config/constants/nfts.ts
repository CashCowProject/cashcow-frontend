import { Nft } from './types'

export const RABBIT_MINTING_FARM_ADDRESS = '0x7c8b60d2b859a38c8B9b5B6CB4565485cb637c7a'
export const PANCAKE_RABBITS_ADDRESS = '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07'

export const PINATA_BASE_URI = 'https://cashcowprotocol.mypinata.cloud/ipfs/'
export const PINATA_METADATA_CID = 'QmQNivyb2MZzxw1iJ2zUKMiLd4grG5KnzDkd8f5Be7R5hB'

export const CASH_COWNFT_IMAGE_BASEURI = "https://ipfs.io/ipfs/QmV1knDCzLBaAu6gA4fXbzk3k5rGjVBfHtCxKYmcCdaZdU/"
export const CASH_BULLNFT_IMAGE_BASEURI = "https://ipfs.io/ipfs/QmbWoWJsKNRQwmgbp3BkDpcspDomBt5q2zcbeKHp224b5v/"
export const COW_BREED = ["highlands", "holstein", "hereford", "brahman", 'angus'];
export const BULL_BREED = ["highland", "holstein", "hereford", "brahman", 'angus'];
export const CATTLE_RARITY = ["common", "uncommon", "rare", "legendary","holy"];

// export const CASH_LANDNFT_IMAGE_BASEURI = "https://ipfs.io/ipfs/QmXB1rJH69ZoBRcPR5or3DtPNAhxWFJh9E4rYRpzi3Ux6D/"
export const CASH_LANDNFT_IMAGE_BASEURI = "/images/land/"
export const LAND_KIND = ["mountain", "plains", "woods", "jungle", 'hills'];
export const LAND_RARITY = ["common", "uncommon", "rare", "legendary","holy"];
export const BASE_MILKPOWER = ["2k", "3k", "5k", "8k" , "13k"];
export const BASE_RECOVERYTIME = ["180H","90H", "48K", "24H", "12H" ]
const Nfts: Nft[] = [
  {
    name: 'Swapsies',
    description: 'These bunnies love nothing more than swapping pancakes. Especially on BSC.',
    originalImage: `${PINATA_BASE_URI}QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/swapsies.png`,
    previewImage: 'swapsies-preview.png',
    blurImage: 'swapsies-blur.png',
    sortOrder: 999,
    bunnyId: 0,
  },
  {
    name: 'Drizzle',
    description: "It's raining syrup on this bunny, but he doesn't seem to mind. Can you blame him?",
    originalImage: `${PINATA_BASE_URI}QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/drizzle.png`,
    previewImage: 'drizzle-preview.png',
    blurImage: 'drizzle-blur.png',
    sortOrder: 999,
    bunnyId: 1,
  },
  {
    name: 'Blueberries',
    description: "These bunnies like their pancakes with blueberries. What's your favorite topping?",
    originalImage: `${PINATA_BASE_URI}QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/blueberries.png`,
    previewImage: 'blueberries-preview.png',
    blurImage: 'blueberries-blur.png',
    sortOrder: 999,
    bunnyId: 2,
  },
  {
    name: 'Circular',
    description: "Love makes the world go 'round... but so do pancakes. And these bunnies know it.",
    originalImage: `${PINATA_BASE_URI}QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/circular.png`,
    previewImage: 'circular-preview.png',
    blurImage: 'circular-blur.png',
    sortOrder: 999,
    bunnyId: 3,
  },
  {
    name: 'Sparkle',
    description: 'It’s sparkling syrup, pancakes, and even lottery tickets! This bunny really loves it.',
    originalImage: `${PINATA_BASE_URI}QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/sparkle.png`,
    previewImage: 'sparkle-preview.png',
    blurImage: 'sparkle-blur.png',
    sortOrder: 999,
    bunnyId: 4,
  },
]

export default Nfts
