import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Buy',
    icon: 'TradeIcon',
    items: [
      {
        label: '$COW',
        href: 'https://pancakeswap.finance/swap?outputCurrency=0x8b6fa031c7d2e60fbfe4e663ec1b8f37df1ba483',
      },
      {
        label: '$MILK',
        href: 'https://pancakeswap.finance/swap?outputCurrency=0xe5bd6c5b1c2df8f499847a545838c09e45f4a262&inputCurrency=0x8b6fa031c7d2e60fbfe4e663ec1b8f37df1ba483',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Milk Bar',
    icon: 'PoolIcon',
    href: '/milkbar',
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Blind Box',
    icon: 'NftIcon',
    href: '/blind-box'
  },
  {
    label: 'NFT Market',
    icon: 'NftIcon',
    href: '/nft-market'
  },
  {
    label: 'My NFTs',
    icon: 'NftIcon',
    href: '/myNFTs'
  },
  
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/CashCowProject',
      },
      {
        label: 'Whitepaper',
        href: 'https://cashcowprotocol.gitbook.io/cashcow/',
      },
    ],
  },
  
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/CashCowProject',
  //     },
  //     {
  //       label: 'Whitepaper',
  //       href: 'https://cashcowprotocol.gitbook.io/cashcow/',
  //     },
  //   ],
  // },
  // {
  //   label: 'Partnerships/IFO',
  //   icon: 'GooseIcon',
  //   href:
  //     'https://docs.google.com/forms/d/e/1FAIpQLSe7ycrw8Dq4C5Vjc9WNlRtTxEhFDB1Ny6jlAByZ2Y6qBo7SKg/viewform?usp=sf_link',
  // },
  // {
  //   label: 'Audit by Hacken',
  //   icon: 'AuditIcon',
  //   href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  // },
  // {
  //   label: 'Audit by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/goose-finance',
  // },
]

export default config
