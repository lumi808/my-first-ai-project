import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          navbar: {
            signin: "Sign In",
            signout: "Sign Out",
            signgoogle: "Sign In with Google"
          },
          landing: {
            title: "Meet your AI Date Assistant",
            description: "AI-powered date expert that can plan an ideal date in Almaty for you.",
            button: "Plan Your Perfect Date",
            about: {
              title: "About WeDate",
              text1: "aims to foster",
              text2: "love and healthy relationships", 
              text3: "by facilitating quality time spent together, fostering deeper connections, and enhancing communication between partners. It provides an avenue for individuals to create meaningful experiences, strengthen their bond, and grow closer, ultimately leading to more fulfilling and harmonious relationships."
            },
            getstarted: {
              title: "How to Plan Date",
              text: "Get started with just a few clicks",
              features: {
                first: "Just tell your preferences and specify budget",
                second: "Choose the option of date plan that suits you",
                third: "No need to beat around the bush, just invite your partner and have fun"
              }
            },
            footer: {
              rights: "© 2023 WeDate™. All Rights Reserved.",
              about: "About",
              privacy: "Privacy Policy",
              licensing: "Licensing",
              author: "Author"
            }
          },
          chat: {
            firstmessage: "Hi! I am a Date Assistant. Tell me about your and your partner's preferences. Also it would be helpful to specify your budget and stage of relationship with your partner.",
            examples: {
              first: "I like walking in parks, while my girlfriend enjoys restaraunts. My budget for the date is 100 dollars. We are couple.",
              second: "I enjoy active outdoor activities. My wife likes cozy places, like coffee chops with breakfasts and books. Our budget for the date is $50. We are married couple.",
              third: "I like eastern food and it would be great to visit restaurants with this type of food. My partner is Chinese food enjoyer, also she likes sports like tennis, golf. I can spend $70 for this date. We are just friends, but I want her to be my girlfriend.",
              fourth: "I like night clubs and bars. Girl that I like loves fancy restaurants with unusual servings. My budget is unlimited. I like her, but we are strangers.",
              fifth: "I love swimming. She likes breakfasts and coffee shops. My budget is pretty limited, only $30. We are engaged."
            },
            buttons: {
              examplebutton: "Generate a Sample question for me"
            }
          }
        }
      },
      ru: {
        translation: {
          navbar: {
            signin: "Войти",
            signout: "Выйти",
            signgoogle: "Войти с Google"
          },
          landing: {
            title: "Встречай своего ассистента по свиданиям",
            description: "Эксперт по свиданиям с искусственным интеллектом, который может спланировать для вас идеальное свидание в Алматы.",
            button: "Спланировать идеальное свидание",
            about: {
              title: "О WeDate",
              text1: "стремится способствовать",
              text2: "любви и здоровым отношениям", 
              text3: ", способствуя качественному проведению времени вместе, способствуя более глубоким связям и улучшая общение между партнерами. Это дает людям возможность создавать значимые переживания, укреплять свою связь и становиться ближе, что в конечном итоге приводит к более полноценным и гармоничным отношениям."
            },
            getstarted: {
              title: "Как спланировать свидение",
              text: "Начните всего за несколько кликов",
              features: {
                first: "Просто напишите о своих предпочтениях и укажите бюджет",
                second: "Выберите вариант плана свиданий, который вам подходит",
                third: "Не нужно ходить вокруг да около, просто пригласите своего партнера и получайте удовольствие"
              }
            },
            footer: {
              rights: "© 2023 WeDate™. Все права защищены.",
              about: "О нас",
              privacy: "Политика Конфиденциальности",
              licensing: "Лицензирование",
              author: "Автор"
            }
          },
          chat: {
            firstmessage: "Привет! Я ваш личный ассистент по планированию свиданий. Расскажите мне о своих предпочтениях и предпочтениях вашего партнера. Также было бы полезно узнать ваш бюджет и стадию отношений с вашим партнером.",
            examples: {
              first: "Я люблю гулять в парках, а моя девушка любит рестораны. Мой бюджет на свидание 100 долларов. Мы пара.",
              second: "Мне нравится активный отдых на свежем воздухе. Моя жена любит уютные места, например, кафе с завтраками и книгами. Наш бюджет на свидание составляет 50 долларов. Мы женатая пара.",
              third: "Мне нравится восточная кухня, и было бы здорово посетить рестораны с такой едой. Мой партнер любит китайскую еду, а также любит спорт, например, теннис, гольф. Я могу потратить 70 долларов на это свидание. Мы просто друзья, но я хочу, чтобы она была моей девушкой.",
              fourth: "Я люблю ночные клубы и бары. Девушка, которая мне нравится, любит модные рестораны с необычной подачей. Мой бюджет неограничен. Она мне нравится, но мы незнакомы.",
              fifth: "Я люблю плавать. Она любит завтраки и кофейни. Мой бюджет довольно ограничен, всего 30 долларов. Мы помолвлены."
            },
            buttons: {
              examplebutton: "Сгенерируй для меня пример вопроса"
            }
          }
        }
      }

    }
  });

export default i18n;