import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "andy22";

    Object.keys(VeeValidateRules).forEach(rule => {
        if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
        }
    });

    VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

    // Activate the locale
    VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
    });

const app = createApp({
    data(){
        return{
            cartData : {},
            products : [],
            user: {
                  name: '',
                  email: '',
                  tel: '',
                  address: '',
                },
              
        };
    },
    methods:{
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{
                console.log(res);
                this.products = res.data.products;
            })
            .catch((err)=>{
                console.log(err.res.data);
            })
        },
        isPhone(value){
            const phoneNumber = /^(09)[0-9]{8}$/;
            return phoneNumber.test(value) ? true : '需要正確的電話號碼';
          },
        createOrder() {  
            axios.post(`${apiUrl}/api/${apiPath}/order`, { data: this.form })
            .then((res) => {
             alert(res.data.message);
             this.$refs.form.resetForm();
            }).catch((err) => {
               alert(err.data.message);
        });
      },
    },
    mounted(){
        this.getProducts();
    },
})

//註冊元件
app.component('VForm',VeeValidate.Form);
app.component('VField',VeeValidate.Field);
app.component('ErrorMessage',VeeValidate.ErrorMessage);


app.mount("#app");