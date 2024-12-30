import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'translation'
export const resources = {
  en: {
    translation: {
      selectLanguage: 'Select Language',
      continue: 'Continue',
      intro1: {
        title: 'Hey',
        subtitle: 'Welcome to Packy Games'
      },
      intro2: {
        title: 'Endless Earnings',
        subtitle: 'Play, invite, & earn for lifetime'
      },
      intro3: {
        title: '100% safe',
        subtitle: 'Safe & Secure Powered by TON'
      },
      intro4: {
        title: "Let's gooo",
        subtitle: 'Ready to Puff around & find out?'
      },
      languages: {
        en: 'English',
        'tl-PH': 'Tagalog',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        ja: 'Japanese',
        it: 'Italian',
        ko: 'Korean',
        'zh-CN': 'Chinese'
      },
      navigation: {
        home: 'Home',
        booking: 'Booking',
        game: 'Game',
        earn: 'earn',
        profile: 'Profile',
        comingSoon: 'coming soon'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1:'Packy Game',
          subtitle: 'tap & win',
          action: 'Play now'
        },
        packyBookings: {
          title: 'packy',
          title1:'bookings',
          action: 'Coming Soon'
        },
        packyReferEarn: {
          title: 'packy',
          title1:' refer & earn',
          action: 'Book now'
        }
      },
      header: {
        title: 'Packy Games'
      },
      game: {
        title: 'Nub Packy',
        packies: 'Packies',
        lightning: 'Lightning',
        leaderboard: 'Leaderboard'
      },
      profile: {
        title: "Unpaid founder (99% unpaid)",
        goToProfile: "Go to profile",
        selectLanguage: "Select Language",
        claimReward: "Claim Reward (Spin)",
        additionalItems: "Additional Items",
        inviteEarn: "Invite and earn",
        helpSupport: "Help & Support",
        telegramChannel: "Telegram Channel",
        support: "Support",
        madeWith: "Made with",
        version: "V 1.0.1"
      },
      earn: {
        title: "Adrena Games",
        claimNow: "Claim now", 
        inviteFriends: "Invite Friends",
        completeNow: "Complete Now",
        followPackyX: "Follow packy on X",
        packyCommunity: "Join packy's Telegram Community",
        followAdrena: "Follow Adrena on Instagram",
        points: "{{amount}} Packy points"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  },
  es: {
    translation: {
      selectLanguage: 'Seleccionar idioma',
      continue: 'Continuar',
      intro1: {
        title: 'Hola',
        subtitle: 'Bienvenido a Packy Games'
      },
      intro2: {
        title: 'Ganancias Infinitas',
        subtitle: 'Juega, invita y gana de por vida'
      },
      intro3: {
        title: '100% seguro',
        subtitle: 'Seguro y protegido por TON'
      },
      intro4: {
        title: '¡Vamos!',
        subtitle: '¿Listo para explorar y descubrir?'
      },
      languages: {
        en: 'Inglés',
        'tl-PH': 'Tagalo',
        es: 'Español',
        fr: 'Francés',
        de: 'Alemán',
        ja: 'Japonés',
        it: 'Italiano',
        ko: 'Coreano',
        'zh-CN': 'Chino'
      },
      navigation: {
        home: 'Inicio',
        booking: 'Reservas',
        game: 'Juego',
        earn: 'Ganar',
        profile: 'Perfil',
        comingSoon: 'próximamente'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: 'Gira y Gana',
          action: 'Jugar ahora'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: 'Reservar ahora'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: 'Reservar ahora'
        }
      },
      header: {
        title: 'Juegos Adrena'
      },
      game: {
        title: "Nub Packy",
        packies: "Paquetes",
        lightning: "Relámpago",
        leaderboard: "Tabla de clasificación"
      },
      profile: {
        title: "Unpaid founder (99% unpaid)",
        goToProfile: "Go to profile",
        selectLanguage: "Select Language",
        claimReward: "Claim Reward (Spin)",
        additionalItems: "Additional Items",
        inviteEarn: "Invite and earn",
        helpSupport: "Help & Support",
        telegramChannel: "Telegram Channel",
        support: "Support",
        madeWith: "Made with",
        version: "V 1.0.1"
      },
      earn: {
        title: "Jeux Adrena",
        claimNow: "Réclamer maintenant",
        inviteFriends: "Inviter des amis",
        completeNow: "Terminer maintenant",
        followPackyX: "Suivre packy sur X",
        packyCommunity: "Rejoindre la communauté Discord de packy",
        followAdrena: "Suivre Adrena sur Instagram",
        points: "{{amount}} points Adrena"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  },
  fr: {
    translation: {
      selectLanguage: 'Sélectionner la langue',
      continue: 'Continuer',
      intro1: {
        title: 'Salut',
        subtitle: 'Bienvenue sur Packy Games'
      },
      intro2: {
        title: 'Gains illimités',
        subtitle: 'Jouez, invitez et gagnez à vie'
      },
      intro3: {
        title: '100% sécurisé',
        subtitle: 'Sûr et sécurisé propulsé par TON'
      },
      intro4: {
        title: 'Allons-y',
        subtitle: 'Prêt à explorer et découvrir?'
      },
      languages: {
        en: 'Anglais',
        'tl-PH': 'Tagalog',
        es: 'Espagnol',
        fr: 'Français',
        de: 'Allemand',
        ja: 'Japonais',
        it: 'Italien',
        ko: 'Coréen',
        'zh-CN': 'Chinois'
      },
      navigation: {
        home: 'Accueil',
        booking: 'Réservation',
        game: 'Jeu',
        earn: 'Gagner',
        profile: 'Profil',
        comingSoon: 'à venir'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: 'Tournez et Gagnez',
          action: 'Jouer maintenant'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: 'Réserver maintenant'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: 'Réserver maintenant'
        }
      },
      header: {
        title: 'Jeux Adrena'
      },
      game: {
        title: "Nub Packy",
        packies: "Paquets",
        lightning: "Éclair",
        leaderboard: "Classement"
      },
      profile: {
        title: "Fondateur non rémunéré (99% non payé)",
        goToProfile: "Voir le profil",
        selectLanguage: "Choisir la langue",
        claimReward: "Réclamer la récompense (Tour)",
        additionalItems: "Articles supplémentaires",
        inviteEarn: "Inviter et gagner",
        helpSupport: "Aide & Support",
        telegramChannel: "Canal Telegram",
        support: "Support",
        madeWith: "Fait avec",
        version: "V 1.0.1"
       },
       earn: {
        title: "Jeux Adrena",
        claimNow: "Réclamer maintenant",
        inviteFriends: "Inviter des amis",
        completeNow: "Terminer maintenant",
        followPackyX: "Suivre packy sur X",
        packyCommunity: "Rejoindre la communauté Discord de packy",
        followAdrena: "Suivre Adrena sur Instagram",
        points: "{{amount}} points Adrena"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  },
  de: {
    translation: {
      selectLanguage: 'Sprache auswählen',
      continue: 'Weiter',
      intro1: {
        title: 'Hallo',
        subtitle: 'Willkommen bei Packy Games'
      },
      intro2: {
        title: 'Endlose Gewinne',
        subtitle: 'Spielen, einladen & lebenslang verdienen'
      },
      intro3: {
        title: '100% sicher',
        subtitle: 'Sicher & geschützt durch TON'
      },
      intro4: {
        title: 'Los geht\'s',
        subtitle: 'Bereit zum Erkunden?'
      },
      languages: {
        en: 'Englisch',
        'tl-PH': 'Tagalog',
        es: 'Spanisch',
        fr: 'Französisch',
        de: 'Deutsch',
        ja: 'Japanisch',
        it: 'Italienisch',
        ko: 'Koreanisch',
        'zh-CN': 'Chinesisch'
      },
      navigation: {
        home: 'Startseite',
        booking: 'Buchung',
        game: 'Spiel',
        earn: 'Verdienen',
        profile: 'Profil',
        comingSoon: 'demnächst'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: 'Drehen und Gewinnen',
          action: 'Jetzt spielen'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: 'Jetzt buchen'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: 'Jetzt buchen'
        }
      },
      header: {
        title: 'Adrena Spiele'
      },
      game: {
        title: "Nub Packy",
        packies: "Pakete",
        lightning: "Blitz",
        leaderboard: "Bestenliste"
      },
      profile: {
        title: "Unbezahlter Gründer (99% unbezahlt)",
        goToProfile: "Zum Profil",
        selectLanguage: "Sprache wählen",
        claimReward: "Belohnung einfordern (Drehen)",
        additionalItems: "Zusätzliche Artikel",
        inviteEarn: "Einladen und verdienen",
        helpSupport: "Hilfe & Support",
        telegramChannel: "Telegram-Kanal",
        support: "Support",
        madeWith: "Gemacht mit",
        version: "V 1.0.1"
       },
       earn: {
        title: "Adrena Spiele",
        claimNow: "Jetzt einlösen",
        inviteFriends: "Freunde einladen",
        completeNow: "Jetzt abschließen",
        followPackyX: "Packy auf X folgen",
        packyCommunity: "Packys Discord-Community beitreten",
        followAdrena: "Adrena auf Instagram folgen",
        points: "{{amount}} Adrena-Punkte"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  },
  "tl-PH": {
    translation: {
      selectLanguage: 'Piliin ang Wika',
      continue: 'Magpatuloy',
      intro1: {
        title: 'Kumusta',
        subtitle: 'Maligayang pagdating sa Packy Games'
      },
      intro2: {
        title: 'Walang Hanggang Kita',
        subtitle: 'Maglaro, mag-imbita, at kumita habambuhay'
      },
      intro3: {
        title: '100% ligtas',
        subtitle: 'Ligtas at Secure na Pinapagana ng TON'
      },
      intro4: {
        title: 'Tara na',
        subtitle: 'Handa na bang mag-explore?'
      },
      languages: {
        en: 'Ingles',
        'tl-PH': 'Tagalog',
        es: 'Espanyol',
        fr: 'Pranses',
        de: 'Aleman',
        ja: 'Hapones',
        it: 'Italyano',
        ko: 'Koreano',
        'zh-CN': 'Tsino'
      },
      navigation: {
        home: 'Home',
        booking: 'Booking',
        game: 'Laro',
        earn: 'Kumita',
        profile: 'Profile',
        comingSoon: 'malapit na'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: 'Ikutin at Manalo',
          action: 'Maglaro ngayon'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: 'Mag-book ngayon'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: 'Mag-book ngayon'
        }
      },
      header: {
        title: 'Adrena Games'
      },
      game: {
        title: "Nub Packy",
        packies: "Mga Packy",
        lightning: "Kidlat",
        leaderboard: "Leaderboard"
      },
      profile: {
        title: "Hindi bayad na founder (99% hindi bayad)",
        goToProfile: "Pumunta sa profile",
        selectLanguage: "Piliin ang Wika",
        claimReward: "Kunin ang Gantimpala (Ikot)",
        additionalItems: "Karagdagang mga Item",
        inviteEarn: "Mag-imbita at kumita",
        helpSupport: "Tulong at Suporta",
        telegramChannel: "Telegram Channel",
        support: "Suporta",
        madeWith: "Ginawa gamit ang",
        version: "V 1.0.1"
       },
       earn: {
        title: "Mga Larong Adrena",
        claimNow: "Kunin ngayon",
        inviteFriends: "Mag-imbita ng Kaibigan",
        completeNow: "Kumpletuhin Ngayon",
        followPackyX: "Sundan si packy sa X",
        packyCommunity: "Sumali sa Discord Community ni packy",
        followAdrena: "Sundan ang Adrena sa Instagram",
        points: "{{amount}} Adrena points"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
       
    }
  },
  ja: {
    translation: {
      selectLanguage: '言語を選択',
      continue: '続ける',
      intro1: {
        title: 'こんにちは',
        subtitle: 'Packy Gamesへようこそ'
      },
      intro2: {
        title: '無限の収益',
        subtitle: 'プレイ、招待、生涯稼ぐ'
      },
      intro3: {
        title: '100%安全',
        subtitle: 'TONによる安全な保護'
      },
      intro4: {
        title: 'さあ、始めよう',
        subtitle: '探検する準備はできましたか？'
      },
      languages: {
        en: '英語',
        'tl-PH': 'タガログ語',
        es: 'スペイン語',
        fr: 'フランス語',
        de: 'ドイツ語',
        ja: '日本語',
        it: 'イタリア語',
        ko: '韓国語',
        'zh-CN': '中国語'
      },
      navigation: {
        home: 'ホーム',
        booking: '予約',
        game: 'ゲーム',
        earn: '稼ぐ',
        profile: 'プロフィール',
        comingSoon: '近日公開'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: '回して勝とう',
          action: '今すぐプレイ'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: '今すぐ予約'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: '今すぐ予約'
        }
      },
      header: {
        title: 'アドレナゲームズ'
      },
      game: {
        title: "Nub Packy",
        packies: "パッキー",
        lightning: "ライトニング",
        leaderboard: "リーダーボード"
      },
      profile: {
        title: "無給創業者（99%無給）",
        goToProfile: "プロフィールへ",
        selectLanguage: "言語選択",
        claimReward: "報酬を受け取る（スピン）",
        additionalItems: "追加アイテム",
        inviteEarn: "招待して稼ぐ",
        helpSupport: "ヘルプ＆サポート",
        telegramChannel: "Telegramチャンネル",
        support: "サポート",
        madeWith: "制作",
        version: "V 1.0.1"
       },
       earn: {
        title: "アドレナゲーム",
        claimNow: "今すぐ受け取る",
        inviteFriends: "友達を招待",
        completeNow: "今すぐ完了",
        followPackyX: "Xでpackyをフォロー",
        packyCommunity: "加入packyのDiscordコミュニティに参加",
        followAdrena: "InstagramでAdrenaをフォロー",
        points: "{{amount}}アドレナポイント"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  },
  ko: {
    translation: {
      selectLanguage: '언어 선택',
      continue: '계속하기',
      intro1: {
        title: '안녕하세요',
        subtitle: 'Packy Games에 오신 것을 환영합니다'
      },
      intro2: {
        title: '무한 수익',
        subtitle: '플레이하고, 초대하고, 평생 수익을 얻으세요'
      },
      intro3: {
        title: '100% 안전',
        subtitle: 'TON이 제공하는 안전하고 보안된 서비스'
      },
      intro4: {
        title: '시작해볼까요',
        subtitle: '탐험할 준비가 되셨나요?'
      },
      languages: {
        en: '영어',
        'tl-PH': '타갈로그어',
        es: '스페인어',
        fr: '프랑스어',
        de: '독일어',
        ja: '일본어',
        it: '이탈리아어',
        ko: '한국어',
        'zh-CN': '중국어'
      },
      navigation: {
        home: '홈',
        booking: '예약',
        game: '게임',
        earn: '수익',
        profile: '프로필',
        comingSoon: '출시 예정'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: '돌리고 승리하세요',
          action: '지금 플레이'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: '지금 예약'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: '지금 예약'
        }
      },
      header: {
        title: '아드레나 게임즈'
      },
      game: {
        title: "Nub Packy",
        packies: "패키",
        lightning: "번개",
        leaderboard: "리더보드"
      },
      profile: {
        title: "무급 창업자 (99% 무급)",
        goToProfile: "프로필로 가기",
        selectLanguage: "언어 선택",
        claimReward: "보상 받기 (스핀)",
        additionalItems: "추가 아이템",
        inviteEarn: "초대하고 수익 얻기",
        helpSupport: "도움말 & 지원",
        telegramChannel: "텔레그램 채널",
        support: "지원",
        madeWith: "제작",
        version: "V 1.0.1"
       },
       earn: {
        title: "아드레나 게임",
        claimNow: "지금 받기",
        inviteFriends: "친구 초대",
        completeNow: "지금 완료",
        followPackyX: "X에서 packy 팔로우",
        packyCommunity: "packy의 Discord 커뮤니티 가입",
        followAdrena: "Instagram에서 Adrena 팔로우",
        points: "{{amount}} 아드레나 포인트"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  },
  'zh-CN': {
    translation: {
      selectLanguage: '选择语言',
      continue: '继续',
      intro1: {
        title: '你好',
        subtitle: '欢迎来到Packy Games'
      },
      intro2: {
        title: '无限收益',
        subtitle: '玩游戏、邀请好友、终身收益'
      },
      intro3: {
        title: '100%安全',
        subtitle: '由TON提供安全保障'
      },
      intro4: {
        title: '开始吧',
        subtitle: '准备好探索了吗？'
      },
      languages: {
        en: '英语',
        'tl-PH': '他加禄语',
        es: '西班牙语',
        fr: '法语',
        de: '德语',
        ja: '日语',
        it: '意大利语',
        ko: '韩语',
        'zh-CN': '中文'
      },
      navigation: {
        home: '主页',
        booking: '预订',
        game: '游戏',
        earn: '赚取',
        profile: '个人资料',
        comingSoon: '即将推出'
      },
      cards: {
        packySpin: {
          title: 'packy',
          title1: 'spin',
          subtitle: '转盘赢大奖',
          action: '立即游戏'
        },
        packyBookings: {
          title: 'packy',
          title1: 'bookings',
          action: '立即预订'
        },
        packyReferEarn: {
          title: 'packy',
          title1: 'refer & earn',
          action: '立即预订'
        }
      },
      header: {
        title: 'Adrena 游戏'
      },
      game: {
        title: "Nub Packy",
        packies: "包裹",
        lightning: "闪电",
        leaderboard: "排行榜"
      },
      profile: {
        title: "无薪创始人（99%无薪）",
        goToProfile: "前往个人资料",
        selectLanguage: "选择语言",
        claimReward: "领取奖励（转盘）",
        additionalItems: "附加项目",
        inviteEarn: "邀请赚取",
        helpSupport: "帮助与支持",
        telegramChannel: "Telegram频道",
        support: "支持",
        madeWith: "制作工具",
        version: "V 1.0.1"
       },
       earn: {
        title: "阿德雷娜游戏",
        claimNow: "立即领取",
        inviteFriends: "邀请好友",
        completeNow: "立即完成",
        followPackyX: "在X上关注packy",
        packyCommunity: "加入packy的Discord社区",
        followAdrena: "在Instagram上关注Adrena",
        points: "{{amount}}阿德雷娜积分"
       },
       levels: {
        title: "Packy levels & Perks",
        currentLevel: "You're at this level",
        levelBronze: "Level 1 - Bronze",
        nubPacky: "Nub Packy",
        needMore: "Need {{amount}} Packy more to upgrade",
        tabs: {
          all: "All",
          completed: "Completed"
        },
        upcomingLevels: "Upcoming Levels",
        bronze: "Bronze",
        levels: {
          gm: "GM Packy",
          captain: "Captain Packy",
          gn: "GN Packy",
          qt: "QT Packy"
        },
        unlockWith: "Unlock with {{amount}} Packy"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;