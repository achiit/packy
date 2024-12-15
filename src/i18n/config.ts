import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      selectLanguage: 'Select Language',
      continue: 'Continue',
      intro1: {
        title: 'Hey Name',
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
      }
    }
  },
  'tl-PH': {
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
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // recommended for handling loading state
    }
  })

export default i18n