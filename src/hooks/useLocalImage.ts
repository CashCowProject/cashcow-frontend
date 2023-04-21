const commonLands = {
  Hills: '/images/land/common-hills.png',
  Jungle: '/images/land/common-jungle.png',
  Mountains: '/images/land/common-mountain.png',
  Plains: '/images/land/common-plains.png',
  Woods: '/images/land/common-woods.png',
}

const holyLands = {
  Hills: '/images/land/holy-hills.png',
  Jungle: '/images/land/holy-jungle.png',
  Mountains: '/images/land/holy-mountain.png',
  Plains: '/images/land/holy-plains.png',
  Woods: '/images/land/holy-woods.png',
}

const rareLands = {
  Hills: '/images/land/rare-hills.png',
  Jungle: '/images/land/rare-jungle.png',
  Mountains: '/images/land/rare-mountain.png',
  Plains: '/images/land/rare-plains.png',
  Woods: '/images/land/rare-woods.png',
}

const uncommonLands = {
  Hills: '/images/land/uncommon-hills.png',
  Jungle: '/images/land/uncommon-jungle.png',
  Mountains: '/images/land/uncommon-mountain.png',
  Plains: '/images/land/uncommon-plains.png',
  Woods: '/images/land/uncommon-woods.png',
}

const landImages = {
  Common: commonLands,
  Uncommon: commonLands,
}

const useLocalImage = (nft: any) => {
  console.log('NFT from HOOK: ', nft)
  const nftAttributes = nft.attributes
  const nftRarity = nft.attributes[0].value
  const nftBreed = nft.attributes[1].value
  switch (nft.name) {
    case 'Cow':
      console.log('COW HOOK')
      console.log(nft.attributes)
      return '/images/close.png'
      break
    case 'Land':
      return landImages[nftRarity][nftBreed]
      break
  }
}

export default useLocalImage
