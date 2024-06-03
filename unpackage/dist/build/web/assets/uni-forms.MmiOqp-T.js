import{_ as e,r as t,a as r}from"./uni-card.DsU4cJID.js";import{r as i,o as a,c as s,w as l,b as n,n as o,a as u,d as h,p as c,e as d,F as m,a5 as f,I as p,i as g,J as y,A as b,h as v,t as _,k as S,a6 as x,a7 as w}from"./index-C_Y7Ajtv.js";function k(e){let t="";for(let r in e){t+=`${r}:${e[r]};`}return t}const M=e({name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm","clear","eyes","change","keyboardheightchange"],model:{prop:"modelValue",event:"update:modelValue"},options:{virtualHost:!0},inject:{form:{from:"uniForm",default:null},formItem:{from:"uniFormItem",default:null}},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:{type:String,default:" "},placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:24},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!1},cursorSpacing:{type:Number,default:0},passwordIcon:{type:Boolean,default:!0},adjustPosition:{type:Boolean,default:!0},primaryColor:{type:String,default:"#2979ff"},styles:{type:Object,default:()=>({color:"#333",backgroundColor:"#fff",disableColor:"#F7F6F6",borderColor:"#e5e5e5"})},errorMessage:{type:[String,Boolean],default:""}},data:()=>({focused:!1,val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1,focusShow:!1,localMsg:"",isEnter:!1}),computed:{isVal(){const e=this.val;return!(!e&&0!==e)},msg(){return this.localMsg||this.errorMessage},inputMaxlength(){return Number(this.maxlength)},boxStyle(){return`color:${this.inputBorder&&this.msg?"#e43d33":this.styles.color};`},inputContentClass(){return function(e){let t="";for(let r in e)e[r]&&(t+=`${r} `);return t}({"is-input-border":this.inputBorder,"is-input-error-border":this.inputBorder&&this.msg,"is-textarea":"textarea"===this.type,"is-disabled":this.disabled,"is-focused":this.focusShow})},inputContentStyle(){const e=this.focusShow?this.primaryColor:this.styles.borderColor;return k({"border-color":(this.inputBorder&&this.msg?"#dd524d":e)||"#e5e5e5","background-color":this.disabled?this.styles.disableColor:this.styles.backgroundColor})},inputStyle(){return k({"padding-right":"password"===this.type||this.clearable||this.prefixIcon?"":"10px","padding-left":this.prefixIcon?"":"10px"})}},watch:{value(e){this.val=e},modelValue(e){this.val=e},focus(e){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))}},created(){this.init(),this.form&&this.formItem&&this.$watch("formItem.errMsg",(e=>{this.localMsg=e}))},mounted(){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))},methods:{init(){this.value||0===this.value?this.val=this.value:this.modelValue||0===this.modelValue||""===this.modelValue?this.val=this.modelValue:this.val=null},onClickIcon(e){this.$emit("iconClick",e)},onEyes(){this.showPassword=!this.showPassword,this.$emit("eyes",this.showPassword)},onInput(e){let t=e.detail.value;this.trim&&("boolean"==typeof this.trim&&this.trim&&(t=this.trimStr(t)),"string"==typeof this.trim&&(t=this.trimStr(t,this.trim))),this.errMsg&&(this.errMsg=""),this.val=t,this.$emit("input",t),this.$emit("update:modelValue",t)},onFocus(){this.$nextTick((()=>{this.focused=!0})),this.$emit("focus",null)},_Focus(e){this.focusShow=!0,this.$emit("focus",e)},onBlur(){this.focused=!1,this.$emit("blur",null)},_Blur(e){if(e.detail.value,this.focusShow=!1,this.$emit("blur",e),!1===this.isEnter&&this.$emit("change",this.val),this.form&&this.formItem){const{validateTrigger:e}=this.form;"blur"===e&&this.formItem.onFieldChange()}},onConfirm(e){this.$emit("confirm",this.val),this.isEnter=!0,this.$emit("change",this.val),this.$nextTick((()=>{this.isEnter=!1}))},onClear(e){this.val="",this.$emit("input",""),this.$emit("update:modelValue",""),this.$emit("clear")},onkeyboardheightchange(e){this.$emit("keyboardheightchange",e)},trimStr:(e,t="both")=>"both"===t?e.trim():"left"===t?e.trimLeft():"right"===t?e.trimRight():"start"===t?e.trimStart():"end"===t?e.trimEnd():"all"===t?e.replace(/\s+/g,""):e}},[["render",function(e,y,b,v,_,S){const x=t(i("uni-icons"),r),w=f,k=p,M=g;return a(),s(M,{class:o(["uni-easyinput",{"uni-easyinput-error":S.msg}]),style:u(S.boxStyle)},{default:l((()=>[n(M,{class:o(["uni-easyinput__content",S.inputContentClass]),style:u(S.inputContentStyle)},{default:l((()=>[b.prefixIcon?(a(),s(x,{key:0,class:"content-clear-icon",type:b.prefixIcon,color:"#c0c4cc",onClick:y[0]||(y[0]=e=>S.onClickIcon("prefix")),size:"22"},null,8,["type"])):h("",!0),c(e.$slots,"left",{},void 0,!0),"textarea"===b.type?(a(),s(w,{key:1,class:o(["uni-easyinput__content-textarea",{"input-padding":b.inputBorder}]),name:b.name,value:_.val,placeholder:b.placeholder,placeholderStyle:b.placeholderStyle,disabled:b.disabled,"placeholder-class":"uni-easyinput__placeholder-class",maxlength:S.inputMaxlength,focus:_.focused,autoHeight:b.autoHeight,"cursor-spacing":b.cursorSpacing,"adjust-position":b.adjustPosition,onInput:S.onInput,onBlur:S._Blur,onFocus:S._Focus,onConfirm:S.onConfirm,onKeyboardheightchange:S.onkeyboardheightchange},null,8,["class","name","value","placeholder","placeholderStyle","disabled","maxlength","focus","autoHeight","cursor-spacing","adjust-position","onInput","onBlur","onFocus","onConfirm","onKeyboardheightchange"])):(a(),s(k,{key:2,type:"password"===b.type?"text":b.type,class:"uni-easyinput__content-input",style:u(S.inputStyle),name:b.name,value:_.val,password:!_.showPassword&&"password"===b.type,placeholder:b.placeholder,placeholderStyle:b.placeholderStyle,"placeholder-class":"uni-easyinput__placeholder-class",disabled:b.disabled,maxlength:S.inputMaxlength,focus:_.focused,confirmType:b.confirmType,"cursor-spacing":b.cursorSpacing,"adjust-position":b.adjustPosition,onFocus:S._Focus,onBlur:S._Blur,onInput:S.onInput,onConfirm:S.onConfirm,onKeyboardheightchange:S.onkeyboardheightchange},null,8,["type","style","name","value","password","placeholder","placeholderStyle","disabled","maxlength","focus","confirmType","cursor-spacing","adjust-position","onFocus","onBlur","onInput","onConfirm","onKeyboardheightchange"])),"password"===b.type&&b.passwordIcon?(a(),d(m,{key:3},[S.isVal?(a(),s(x,{key:0,class:o(["content-clear-icon",{"is-textarea-icon":"textarea"===b.type}]),type:_.showPassword?"eye-slash-filled":"eye-filled",size:22,color:_.focusShow?b.primaryColor:"#c0c4cc",onClick:S.onEyes},null,8,["class","type","color","onClick"])):h("",!0)],64)):h("",!0),b.suffixIcon?(a(),d(m,{key:4},[b.suffixIcon?(a(),s(x,{key:0,class:"content-clear-icon",type:b.suffixIcon,color:"#c0c4cc",onClick:y[1]||(y[1]=e=>S.onClickIcon("suffix")),size:"22"},null,8,["type"])):h("",!0)],64)):(a(),d(m,{key:5},[b.clearable&&S.isVal&&!b.disabled&&"textarea"!==b.type?(a(),s(x,{key:0,class:o(["content-clear-icon",{"is-textarea-icon":"textarea"===b.type}]),type:"clear",size:b.clearSize,color:S.msg?"#dd524d":_.focusShow?b.primaryColor:"#c0c4cc",onClick:S.onClear},null,8,["class","size","color","onClick"])):h("",!0)],64)),c(e.$slots,"right",{},void 0,!0)])),_:3},8,["class","style"])])),_:3},8,["class","style"])}],["__scopeId","data-v-5763a810"]]);const C=e({name:"uniFormsItem",options:{virtualHost:!0},provide(){return{uniFormItem:this}},inject:{form:{from:"uniForm",default:null}},props:{rules:{type:Array,default:()=>null},name:{type:[String,Array],default:""},required:{type:Boolean,default:!1},label:{type:String,default:""},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:""},errorMessage:{type:[String,Boolean],default:""},leftIcon:String,iconColor:{type:String,default:"#606266"}},data:()=>({errMsg:"",userRules:null,localLabelAlign:"left",localLabelWidth:"70px",localLabelPos:"left",border:!1,isFirstBorder:!1}),computed:{msg(){return this.errorMessage||this.errMsg}},watch:{"form.formRules"(e){this.init()},"form.labelWidth"(e){this.localLabelWidth=this._labelWidthUnit(e)},"form.labelPosition"(e){this.localLabelPos=this._labelPosition()},"form.labelAlign"(e){}},created(){this.init(!0),this.name&&this.form&&this.$watch((()=>this.form._getDataValue(this.name,this.form.localData)),((e,t)=>{if(!this.form._isEqual(e,t)){const t=this.itemSetValue(e);this.onFieldChange(t,!1)}}),{immediate:!1})},unmounted(){this.__isUnmounted=!0,this.unInit()},methods:{setRules(e=null){this.userRules=e,this.init(!1)},setValue(){},async onFieldChange(e,t=!0){const{formData:r,localData:i,errShowType:a,validateCheck:s,validateTrigger:l,_isRequiredField:n,_realName:o}=this.form,u=o(this.name);e||(e=this.form.formData[u]);const h=this.itemRules.rules&&this.itemRules.rules.length;if(!this.validator||!h||0===h)return;const c=n(this.itemRules.rules||[]);let d=null;return"bind"===l||t?(d=await this.validator.validateUpdate({[u]:e},r),c||void 0!==e&&""!==e||(d=null),d&&d.errorMessage?("undertext"===a&&(this.errMsg=d?d.errorMessage:""),"toast"===a&&y({title:d.errorMessage||"校验错误",icon:"none"}),"modal"===a&&b({title:"提示",content:d.errorMessage||"校验错误"})):this.errMsg="",s(d||null)):this.errMsg="",d||null},init(e=!1){const{validator:t,formRules:r,childrens:i,formData:a,localData:s,_realName:l,labelWidth:n,_getDataValue:o,_setDataValue:u}=this.form||{};if(this.localLabelAlign=this._justifyContent(),this.localLabelWidth=this._labelWidthUnit(n),this.localLabelPos=this._labelPosition(),this.form&&e&&i.push(this),!t||!r)return;this.form.isFirstBorder||(this.form.isFirstBorder=!0,this.isFirstBorder=!0),this.group&&(this.group.isFirstBorder||(this.group.isFirstBorder=!0,this.isFirstBorder=!0)),this.border=this.form.border;const h=l(this.name),c=this.userRules||this.rules;"object"==typeof r&&c&&(r[h]={rules:c},t.updateSchema(r));const d=r[h]||{};this.itemRules=d,this.validator=t,this.itemSetValue(o(this.name,s))},unInit(){if(this.form){const{childrens:e,formData:t,_realName:r}=this.form;e.forEach(((e,i)=>{e===this&&(this.form.childrens.splice(i,1),delete t[r(e.name)])}))}},itemSetValue(e){const t=this.form._realName(this.name),r=this.itemRules.rules||[],i=this.form._getValue(t,e,r);return this.form._setDataValue(t,this.form.formData,i),i},clearValidate(){this.errMsg=""},_isRequired(){return this.required},_justifyContent(){if(this.form){const{labelAlign:e}=this.form;let t=this.labelAlign?this.labelAlign:e;if("left"===t)return"flex-start";if("center"===t)return"center";if("right"===t)return"flex-end"}return"flex-start"},_labelWidthUnit(e){return this.num2px(this.labelWidth?this.labelWidth:e||(this.label?70:"auto"))},_labelPosition(){return this.form&&this.form.labelPosition||"left"},isTrigger:(e,t,r)=>"submit"!==e&&e?"bind":void 0===e?"bind"!==t?t?"submit":""===r?"bind":"submit":"bind":"submit",num2px:e=>"number"==typeof e?`${e}px`:e}},[["render",function(e,t,r,i,d,m){const f=S,p=g;return a(),s(p,{class:o(["uni-forms-item",["is-direction-"+d.localLabelPos,d.border?"uni-forms-item--border":"",d.border&&d.isFirstBorder?"is-first-border":""]])},{default:l((()=>[c(e.$slots,"label",{},(()=>[n(p,{class:o(["uni-forms-item__label",{"no-label":!r.label&&!r.required}]),style:u({width:d.localLabelWidth,justifyContent:d.localLabelAlign})},{default:l((()=>[r.required?(a(),s(f,{key:0,class:"is-required"},{default:l((()=>[v("*")])),_:1})):h("",!0),n(f,null,{default:l((()=>[v(_(r.label),1)])),_:1})])),_:1},8,["class","style"])]),!0),n(p,{class:"uni-forms-item__content"},{default:l((()=>[c(e.$slots,"default",{},void 0,!0),n(p,{class:o(["uni-forms-item__error",{"msg--active":m.msg}])},{default:l((()=>[n(f,null,{default:l((()=>[v(_(m.msg),1)])),_:1})])),_:1},8,["class"])])),_:3})])),_:3},8,["class"])}],["__scopeId","data-v-ab882ba0"]]);var F={email:/^\S+?@\S+?\.\S+?$/,idcard:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,url:new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i")};const $={int:"integer",bool:"boolean",double:"number",long:"number",password:"string"};function I(e,t=""){["label"].forEach((t=>{void 0===e[t]&&(e[t]="")}));let r=t;for(let i in e){let t=new RegExp("{"+i+"}");r=r.replace(t,e[i])}return r}const j={integer:e=>j.number(e)&&parseInt(e,10)===e,string:e=>"string"==typeof e,number:e=>!isNaN(e)&&"number"==typeof e,boolean:function(e){return"boolean"==typeof e},float:function(e){return j.number(e)&&!j.integer(e)},array:e=>Array.isArray(e),object:e=>"object"==typeof e&&!j.array(e),date:e=>e instanceof Date,timestamp(e){return!(!this.integer(e)||Math.abs(e).toString().length>16)},file:e=>"string"==typeof e.url,email:e=>"string"==typeof e&&!!e.match(F.email)&&e.length<255,url:e=>"string"==typeof e&&!!e.match(F.url),pattern(e,t){try{return new RegExp(e).test(t)}catch(r){return!1}},method:e=>"function"==typeof e,idcard:e=>"string"==typeof e&&!!e.match(F.idcard),"url-https"(e){return this.url(e)&&e.startsWith("https://")},"url-scheme":e=>e.startsWith("://"),"url-web":e=>!1};const V={required:(e,t,r)=>e.required&&function(e,t){return null==e||"string"==typeof e&&!e||!(!Array.isArray(e)||e.length)||"object"===t&&!Object.keys(e).length}(t,e.format||typeof t)?I(e,e.errorMessage||r.required):null,range(e,t,r){const{range:i,errorMessage:a}=e;let s=new Array(i.length);for(let n=0;n<i.length;n++){const e=i[n];j.object(e)&&void 0!==e.value?s[n]=e.value:s[n]=e}let l=!1;return Array.isArray(t)?l=new Set(t.concat(s)).size===s.length:s.indexOf(t)>-1&&(l=!0),l?null:I(e,a||r.enum)},rangeNumber(e,t,r){if(!j.number(t))return I(e,e.errorMessage||r.pattern.mismatch);let{minimum:i,maximum:a,exclusiveMinimum:s,exclusiveMaximum:l}=e,n=s?t<=i:t<i,o=l?t>=a:t>a;return void 0!==i&&n?I(e,e.errorMessage||r.number[s?"exclusiveMinimum":"minimum"]):void 0!==a&&o?I(e,e.errorMessage||r.number[l?"exclusiveMaximum":"maximum"]):void 0!==i&&void 0!==a&&(n||o)?I(e,e.errorMessage||r.number.range):null},rangeLength(e,t,r){if(!j.string(t)&&!j.array(t))return I(e,e.errorMessage||r.pattern.mismatch);let i=e.minLength,a=e.maxLength,s=t.length;return void 0!==i&&s<i?I(e,e.errorMessage||r.length.minLength):void 0!==a&&s>a?I(e,e.errorMessage||r.length.maxLength):void 0!==i&&void 0!==a&&(s<i||s>a)?I(e,e.errorMessage||r.length.range):null},pattern:(e,t,r)=>j.pattern(e.pattern,t)?null:I(e,e.errorMessage||r.pattern.mismatch),format(e,t,r){var i=Object.keys(j),a=$[e.format]?$[e.format]:e.format||e.arrayType;return i.indexOf(a)>-1&&!j[a](t)?I(e,e.errorMessage||r.typeError):null},arrayTypeFormat(e,t,r){if(!Array.isArray(t))return I(e,e.errorMessage||r.typeError);for(let i=0;i<t.length;i++){const a=t[i];let s=this.format(e,a,r);if(null!==s)return s}return null}};class A extends class{constructor(e){this._message=e}async validateRule(e,t,r,i,a){var s=null;let l=t.rules;if(l.findIndex((e=>e.required))<0){if(null==r)return s;if("string"==typeof r&&!r.length)return s}var n=this._message;if(void 0===l)return n.default;for(var o=0;o<l.length;o++){let u=l[o],h=this._getValidateType(u);if(Object.assign(u,{label:t.label||`["${e}"]`}),V[h]&&null!=(s=V[h](u,r,n)))break;if(u.validateExpr){let e=Date.now();if(!1===u.validateExpr(r,a,e)){s=this._getMessage(u,u.errorMessage||this._message.default);break}}if(u.validateFunction&&null!==(s=await this.validateFunction(u,r,i,a,h)))break}return null!==s&&(s=n.TAG+s),s}async validateFunction(e,t,r,i,a){let s=null;try{let l=null;const n=await e.validateFunction(e,t,i||r,(e=>{l=e}));(l||"string"==typeof n&&n||!1===n)&&(s=this._getMessage(e,l||n,a))}catch(l){s=this._getMessage(e,l.message,a)}return s}_getMessage(e,t,r){return I(e,t||e.errorMessage||this._message[r]||t.default)}_getValidateType(e){var t="";return e.required?t="required":e.format?t="format":e.arrayType?t="arrayTypeFormat":e.range?t="range":void 0!==e.maximum||void 0!==e.minimum?t="rangeNumber":void 0!==e.maxLength||void 0!==e.minLength?t="rangeLength":e.pattern?t="pattern":e.validateFunction&&(t="validateFunction"),t}}{constructor(e,t){super(A.message),this._schema=e,this._options=t||null}updateSchema(e){this._schema=e}async validate(e,t){let r=this._checkFieldInSchema(e);return r||(r=await this.invokeValidate(e,!1,t)),r.length?r[0]:null}async validateAll(e,t){let r=this._checkFieldInSchema(e);return r||(r=await this.invokeValidate(e,!0,t)),r}async validateUpdate(e,t){let r=this._checkFieldInSchema(e);return r||(r=await this.invokeValidateUpdate(e,!1,t)),r.length?r[0]:null}async invokeValidate(e,t,r){let i=[],a=this._schema;for(let s in a){let l=a[s],n=await this.validateRule(s,l,e[s],e,r);if(null!=n&&(i.push({key:s,errorMessage:n}),!t))break}return i}async invokeValidateUpdate(e,t,r){let i=[];for(let a in e){let s=await this.validateRule(a,this._schema[a],e[a],e,r);if(null!=s&&(i.push({key:a,errorMessage:s}),!t))break}return i}_checkFieldInSchema(e){var t=Object.keys(e),r=Object.keys(this._schema);if(new Set(t.concat(r)).size===r.length)return"";var i=t.filter((e=>r.indexOf(e)<0));return[{key:"invalid",errorMessage:I({field:JSON.stringify(i)},A.message.TAG+A.message.defaultInvalid)}]}}A.message=new function(){return{TAG:"",default:"验证错误",defaultInvalid:"提交的字段{field}在数据库中并不存在",validateFunction:"验证无效",required:"{label}必填",enum:"{label}超出范围",timestamp:"{label}格式无效",whitespace:"{label}不能为空",typeError:"{label}类型无效",date:{format:"{label}日期{value}格式无效",parse:"{label}日期无法解析,{value}无效",invalid:"{label}日期{value}无效"},length:{minLength:"{label}长度不能少于{minLength}",maxLength:"{label}长度不能超过{maxLength}",range:"{label}必须介于{minLength}和{maxLength}之间"},number:{minimum:"{label}不能小于{minimum}",maximum:"{label}不能大于{maximum}",exclusiveMinimum:"{label}不能小于等于{minimum}",exclusiveMaximum:"{label}不能大于等于{maximum}",range:"{label}必须介于{minimum}and{maximum}之间"},pattern:{mismatch:"{label}格式不匹配"}}};const B=(e,t,r)=>{const i=r.find((e=>{return e.format&&("int"===(t=e.format)||"double"===t||"number"===t||"timestamp"===t);var t})),a=r.find((e=>e.format&&"boolean"===e.format||"bool"===e.format));return i&&(t=t||0===t?T(Number(t))?Number(t):t:null),a&&(t=!!E(t)&&t),t},N=(e,t)=>P(t,e),R=(e,t={})=>{const r=L(e);if("object"==typeof r&&Array.isArray(r)&&r.length>1){return r.reduce(((e,t)=>e+`#${t}`),"_formdata_")}return r[0]||e},O=e=>{let t=e.replace("_formdata_#","");return t=t.split("#").map((e=>T(e)?Number(e):e)),t},D=(e,t,r)=>("object"!=typeof e||L(t).reduce(((e,t,i,a)=>i===a.length-1?(e[t]=r,null):(t in e||(e[t]=/^[0-9]{1,}$/.test(a[i+1])?[]:{}),e[t])),e),e);function L(e){return Array.isArray(e)?e:e.replace(/\[/g,".").replace(/\]/g,"").split(".")}const P=(e,t,r="undefined")=>{let i=L(t).reduce(((e,t)=>(e||{})[t]),e);return i&&void 0===i?r:i},T=e=>!isNaN(Number(e)),E=e=>"boolean"==typeof e;const q=e({name:"uniForms",emits:["validate","submit"],options:{virtualHost:!0},props:{value:{type:Object,default:()=>null},modelValue:{type:Object,default:()=>null},model:{type:Object,default:()=>null},rules:{type:Object,default:()=>({})},errShowType:{type:String,default:"undertext"},validateTrigger:{type:String,default:"submit"},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:"left"},border:{type:Boolean,default:!1}},provide(){return{uniForm:this}},data:()=>({formData:{},formRules:{}}),computed:{localData(){const e=this.model||this.modelValue||this.value;return e?(t=e,JSON.parse(JSON.stringify(t))):{};var t}},watch:{rules:{handler:function(e,t){this.setRules(e)},deep:!0,immediate:!0}},created(){x().$vm.$.appContext.config.globalProperties.binddata||(x().$vm.$.appContext.config.globalProperties.binddata=function(e,t,r){if(r)this.$refs[r].setValue(e,t);else{let r;for(let e in this.$refs){const t=this.$refs[e];if(t&&t.$options&&"uniForms"===t.$options.name){r=t;break}}if(!r)return console.error("当前 uni-froms 组件缺少 ref 属性");r.setValue(e,t)}}),this.childrens=[],this.inputChildrens=[],this.setRules(this.rules)},methods:{setRules(e){this.formRules=Object.assign({},this.formRules,e),this.validator=new A(e)},setValue(e,t){let r=this.childrens.find((t=>t.name===e));return r?(this.formData[e]=B(0,t,this.formRules[e]&&this.formRules[e].rules||[]),r.onFieldChange(this.formData[e])):null},validate(e,t){return this.checkAll(this.formData,e,t)},validateField(e=[],t){e=[].concat(e);let r={};return this.childrens.forEach((t=>{const i=R(t.name);-1!==e.indexOf(i)&&(r=Object.assign({},r,{[i]:this.formData[i]}))})),this.checkAll(r,[],t)},clearValidate(e=[]){e=[].concat(e),this.childrens.forEach((t=>{if(0===e.length)t.errMsg="";else{const r=R(t.name);-1!==e.indexOf(r)&&(t.errMsg="")}}))},submit(e,t,r){for(let i in this.dataValue){this.childrens.find((e=>e.name===i))&&void 0===this.formData[i]&&(this.formData[i]=this._getValue(i,this.dataValue[i]))}return r||console.warn("submit 方法即将废弃，请使用validate方法代替！"),this.checkAll(this.formData,e,t,"submit")},async checkAll(e,t,r,i){if(!this.validator)return;let a,s=[];for(let u in e){const e=this.childrens.find((e=>R(e.name)===u));e&&s.push(e)}r||"function"!=typeof t||(r=t),!r&&"function"!=typeof r&&Promise&&(a=new Promise(((e,t)=>{r=function(r,i){r?t(r):e(i)}})));let l=[],n=JSON.parse(JSON.stringify(e));for(let u in s){const e=s[u];let t=R(e.name);const r=await e.onFieldChange(n[t]);if(r&&(l.push(r),"toast"===this.errShowType||"modal"===this.errShowType))break}Array.isArray(l)&&0===l.length&&(l=null),Array.isArray(t)&&t.forEach((e=>{let t=R(e),r=N(e,this.localData);void 0!==r&&(n[t]=r)})),"submit"===i?this.$emit("submit",{detail:{value:n,errors:l}}):this.$emit("validate",l);let o={};return o=((e={},t)=>{let r=JSON.parse(JSON.stringify(e)),i={};for(let a in r){let e=O(a);D(i,e,r[a])}return i})(n,this.name),r&&"function"==typeof r&&r(l,o),a&&r?a:null},validateCheck(e){this.$emit("validate",e)},_getValue:B,_isRequiredField:e=>{let t=!1;for(let r=0;r<e.length;r++){if(e[r].required){t=!0;break}}return t},_setDataValue:(e,t,r)=>(t[e]=r,r||""),_getDataValue:N,_realName:R,_isRealName:e=>/^_formdata_#*/.test(e),_isEqual:(e,t)=>{if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;var r=toString.call(e);if(r!==toString.call(t))return!1;switch(r){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t}if("[object Object]"==r){var i=Object.getOwnPropertyNames(e),a=Object.getOwnPropertyNames(t);if(i.length!=a.length)return!1;for(var s=0;s<i.length;s++){var l=i[s];if(e[l]!==t[l])return!1}return!0}return"[object Array]"==r?e.toString()==t.toString():void 0}}},[["render",function(e,t,r,i,o,u){const h=w,d=g;return a(),s(d,{class:"uni-forms"},{default:l((()=>[n(h,null,{default:l((()=>[c(e.$slots,"default",{},void 0,!0)])),_:3})])),_:3})}],["__scopeId","data-v-a2a9907e"]]);export{M as _,C as a,q as b};