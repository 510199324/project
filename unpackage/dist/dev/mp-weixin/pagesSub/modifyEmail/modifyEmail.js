(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesSub/modifyEmail/modifyEmail"],{52:
/*!*********************************************************************************************!*\
  !*** D:/userInfo/uni-app/JoyLiving/main.js?{"page":"pagesSub%2FmodifyEmail%2FmodifyEmail"} ***!
  \*********************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){n(/*! uni-pages */4);i(n(/*! vue */2));var t=i(n(/*! ./pagesSub/modifyEmail/modifyEmail.vue */53));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createPage"])},53:
/*!**************************************************************************!*\
  !*** D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue ***!
  \**************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var i=n(/*! ./modifyEmail.vue?vue&type=template&id=61e3f8d0& */54),a=n(/*! ./modifyEmail.vue?vue&type=script&lang=js& */56);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n(/*! ./modifyEmail.vue?vue&type=style&index=0&lang=css& */58);var r,u=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),c=Object(u["default"])(a["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],r);c.options.__file="pagesSub/modifyEmail/modifyEmail.vue",t["default"]=c.exports},54:
/*!*********************************************************************************************************!*\
  !*** D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue?vue&type=template&id=61e3f8d0& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var i=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./modifyEmail.vue?vue&type=template&id=61e3f8d0& */55);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},55:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue?vue&type=template&id=61e3f8d0& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return r})),n.d(t,"recyclableRender",(function(){return o})),n.d(t,"components",(function(){return i}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=!1,r=[];a._withStripped=!0},56:
/*!***************************************************************************************************!*\
  !*** D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var i=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./modifyEmail.vue?vue&type=script&lang=js& */57),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},57:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(/*! ../../api/users/user.js */37),a=n(/*! @/utlis/getToken.js */36),o={data:function(){return{token:"",newEmail:"",newEmailFlag:!1,count:60,codeFlag:!0,emailFlag:!1,emailReg:/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,email:"",code:"",flag:!0}},onShow:function(){var e=this;(0,a.getCode)().then((function(t){e.token=t.token}))},methods:{protocol:function(){e.redirectTo({url:"../protocol/protocol"})},privacy:function(){e.redirectTo({url:"../privacy/privacy"})},newEmailHandel:function(e){this.emailReg.test(e.target.value)?this.newEmailFlag=!1:this.newEmailFlag=!0},emailHandel:function(e){this.emailReg.test(e.target.value)?this.emailFlag=!1:this.emailFlag=!0},getCode:function(){var e=this;if(this.emailReg.test(this.newEmail)&&this.emailReg.test(this.email)){var t=null;this.codeFlag=!1,(0,i.sendEmail)({email:this.email,type:"upemail"}),t=setInterval((function(){e.count--,0==e.count&&(e.codeFlag=!0,clearInterval(t),e.count=60)}),1e3)}},registerHandel:function(){var t=this;this.flag&&(this.flag=!1,(0,i.modifyEmail)({newemail:this.newEmail,code:this.code,type:"upemail",email:this.email},this.token).then((function(n){var i=n[1],a=i.data;204==a.code?(t.Toast("修改成功","success"),setTimeout((function(){e.switchTab({url:"../../pages/home/home"})}),2e3)):505==a.code?t.Toast("邮箱验证码错误","none"):591==a.code?t.Toast("邮箱验证码过期","none"):592==a.code&&t.Toast("旧邮箱错误","none")})),setTimeout((function(){t.flag=!0}),5e3))},Toast:function(t,n){e.showToast({title:t,icon:n}),setTimeout((function(){e.hideToast()}),2e3)}}};t.default=o}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},58:
/*!***********************************************************************************************************!*\
  !*** D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var i=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./modifyEmail.vue?vue&type=style&index=0&lang=css& */59),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},59:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/userInfo/uni-app/JoyLiving/pagesSub/modifyEmail/modifyEmail.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}},[[52,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesSub/modifyEmail/modifyEmail.js.map