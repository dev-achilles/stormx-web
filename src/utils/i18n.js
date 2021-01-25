import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'zh_CN': require('../assets/i18n/zh'), // 中文语言包
  'en_US': require('../assets/i18n/en'), // 英文语言包
  'ko-KR': require('../assets/i18n/korean'), // 英文语言包
  'id': require('../assets/i18n/id'), // 印度尼西亚语言包
  'ja': require('../assets/i18n/ja'), // 日语语言包
  'th': require('../assets/i18n/th') // 泰语语言包
}

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale: localStorage.language || 'en_US', // set locale 默认显示英文
  messages: messages // set locale messages
})
