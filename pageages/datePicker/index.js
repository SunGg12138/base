import datePicker from './src/datePicker.vue';

datePicker.install = function (Vue) {
    Vue.component(datePicker.name, datePicker);
};

export default datePicker;