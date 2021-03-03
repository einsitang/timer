import Vue from 'vue'
import Popup from './AppMain'
import './element'
import i18n from '../common/vue-i18n'

new Vue({
    el: '#app',
    i18n,
    render: (h) => h(Popup),
})