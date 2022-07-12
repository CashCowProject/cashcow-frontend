import { MenuEntry } from 'cashcow-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
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
    label: 'Earn',
    icon: 'PoolIcon',
    items: [
      {
        label: 'Farms',
        href: '/farms',
      },
      {
        label: 'Milk Bar',
        href: '/milkbar',
      },
    ],
  },


  // {
  //   label: 'Farms',
  //   icon: 'FarmIcon',
  //   href: '/farms',
  // },

  {
    label: 'NFT Blind Box',
    // icon: 'NftIcon',
    icon: 'TicketIcon',
    href: '/blind-box'
  },
  
  {
    label: 'My Farm',
    icon: 'FarmIcon',
    items: [
      {
        label: 'Map',
        href: '/farm/map',
      },
      {
        label: 'Dashboard',
        href: '/farm/dashboard',
      },
      {
        label: 'Breeding',
        href: '/farm/breeding',
      }
    ]
  },
  { 
    label: "FARM MANAGE",
    icon: 'TicketIcon',
    items: [
      {
        label:"COW",
        href:"/management/cow"
      },
      {
        label:"BULL",
        href:"/management/bull"
      },
      {
        label:"LAND",
        href:"/management/land"
      }

    ]
  },
  {
    label: 'NFT Staking',
    icon: 'TicketIcon',
    items: [
      {
        label: 'HappyCows',
        href: '/stakes/1',
      },
      {
        label: 'Genesis',
        href: '/stakes/2',
      }
    ]
  },
  // {
  //   label: 'Milk Bar',
  //   icon: 'PoolIcon',
  //   href: '/milkbar',
  // },


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
    label: 'NFT Market',
    icon: 'TicketIcon',
    href: '/market',
    // items:[
    //   {
    //     label: "HAPPY COWS",
    //     href: '/market/HappyCows'  
    //   },
    //   {
    //     label: "GENESIS",
    //     href: '/market/airnft'  
    //   },
    //   {
    //     label: "LANDS",
    //     href: '/market/land'  
    //   },
    //   {
    //     label: "COWS",
    //     href: '/market/cow'  
    //   },
    //   {
    //     label: "BULLS",
    //     href: '/market/bull'  
    //   }
    // ]
  },
  {
    label: 'My NFTs',
    icon: 'NftIcon',
    // icon: 'TicketIcon',
    href: '/myNFTs'
    // items: [
    //   {
    //     label: 'My NFTs',
    //     href: '/myNFTs'
    //   },
    //   {
    //     label: 'My Lands',
    //     href: '/lands',
    //   },
    //   {
    //     label: 'My Cows',
    //     href: '/cows',
    //   },
    //   {
    //     label: 'My Bulls',
    //     href: '/bulls',
    //   }
    // ]
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
        href: 'https://cashcow-protocol.gitbook.io/cashcow-protocol/',
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
