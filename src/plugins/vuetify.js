import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import CustomIcon from '../components/icons/CustomIcon'
import 'font-awesome/css/font-awesome.min.css'
import 'feather-icons/dist/feather'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa4",
    values: {
      custom: {
        component: CustomIcon,
      },
    },
  },
  theme: {
    themes: {
      light: {
        primary: "#362a31",
        secondary: "#282932",
        highlight: "#685865",
        dark: "#252a34",
      },
    },
  },
});
