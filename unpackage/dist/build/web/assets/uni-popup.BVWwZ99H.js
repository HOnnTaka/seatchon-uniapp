import{Q as t,r as e,o as i,c as s,w as o,b as a,n,p as l,d as r,h,t as p,a as c,j as u,k as d,i as m,l as f,I as g,R as y,T as k,U as b,V as C,g as w}from"./index-DFhF2a5T.js";import{_,r as x,a as T}from"./uni-card.BnPeI189.js";const S=_({name:"uniCollapseItem",props:{title:{type:String,default:""},name:{type:[Number,String],default:""},disabled:{type:Boolean,default:!1},showAnimation:{type:Boolean,default:!0},open:{type:Boolean,default:!1},thumb:{type:String,default:""},titleBorder:{type:String,default:"auto"},border:{type:Boolean,default:!0},showArrow:{type:Boolean,default:!0}},data:()=>({isOpen:!1,isheight:null,height:0,elId:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,nameSync:0}),watch:{open(t){this.isOpen=t,this.onClick(t,"init")}},updated(t){this.$nextTick((()=>{this.init(!0)}))},created(){this.collapse=this.getCollapse(),this.oldHeight=0,this.onClick(this.open,"init")},unmounted(){this.__isUnmounted=!0,this.uninstall()},mounted(){this.collapse&&(""!==this.name?this.nameSync=this.name:this.nameSync=this.collapse.childrens.length+"",-1===this.collapse.names.indexOf(this.nameSync)?this.collapse.names.push(this.nameSync):console.warn(`name 值 ${this.nameSync} 重复`),-1===this.collapse.childrens.indexOf(this)&&this.collapse.childrens.push(this),this.init())},methods:{init(t){this.getCollapseHeight(t)},uninstall(){this.collapse&&(this.collapse.childrens.forEach(((t,e)=>{t===this&&this.collapse.childrens.splice(e,1)})),this.collapse.names.forEach(((t,e)=>{t===this.nameSync&&this.collapse.names.splice(e,1)})))},onClick(t,e){this.disabled||(this.isOpen=t,this.isOpen&&this.collapse&&this.collapse.setAccordion(this),"init"!==e&&this.collapse.onChange(t,this))},getCollapseHeight(e,i=0){t().in(this).select(`#${this.elId}`).fields({size:!0},(t=>{if(!(i>=10)){if(!t)return i++,void this.getCollapseHeight(!1,i);this.height=t.height,this.isheight=!0,e||this.onClick(this.isOpen,"init")}})).exec()},getNvueHwight(t){dom.getComponentRect(this.$refs["collapse--hook"],(e=>{if(e&&e.result&&e.size){if(this.height=e.size.height,this.isheight=!0,t)return;this.onClick(this.open,"init")}}))},getCollapse(t="uniCollapse"){let e=this.$parent,i=e.$options.name;for(;i!==t;){if(e=e.$parent,!e)return!1;i=e.$options.name}return e}}},[["render",function(t,f,g,y,k,b){const C=u,w=d,_=m,S=x(e("uni-icons"),T);return i(),s(_,{class:"uni-collapse-item"},{default:o((()=>[a(_,{onClick:f[0]||(f[0]=t=>b.onClick(!k.isOpen)),class:n(["uni-collapse-item__title",{"is-open":k.isOpen&&"auto"===g.titleBorder,"uni-collapse-item-border":"none"!==g.titleBorder}])},{default:o((()=>[a(_,{class:"uni-collapse-item__title-wrap"},{default:o((()=>[l(t.$slots,"title",{},(()=>[a(_,{class:n(["uni-collapse-item__title-box",{"is-disabled":g.disabled}])},{default:o((()=>[g.thumb?(i(),s(C,{key:0,src:g.thumb,class:"uni-collapse-item__title-img"},null,8,["src"])):r("",!0),a(w,{class:"uni-collapse-item__title-text"},{default:o((()=>[h(p(g.title),1)])),_:1})])),_:1},8,["class"])]),!0)])),_:3}),g.showArrow?(i(),s(_,{key:0,class:n([{"uni-collapse-item__title-arrow-active":k.isOpen,"uni-collapse-item--animation":!0===g.showAnimation},"uni-collapse-item__title-arrow"])},{default:o((()=>[a(S,{color:g.disabled?"#ddd":"#bbb",size:"14",type:"bottom"},null,8,["color"])])),_:1},8,["class"])):r("",!0)])),_:3},8,["class"]),a(_,{class:n(["uni-collapse-item__wrap",{"is--transition":g.showAnimation}]),style:c({height:(k.isOpen?k.height:0)+"px"})},{default:o((()=>[a(_,{id:k.elId,ref:"collapse--hook",class:n(["uni-collapse-item__wrap-content",{open:k.isheight,"uni-collapse-item--border":g.border&&k.isOpen}])},{default:o((()=>[l(t.$slots,"default",{},void 0,!0)])),_:3},8,["id","class"])])),_:3},8,["class","style"])])),_:3})}],["__scopeId","data-v-b2baa08b"]]);const $=_({name:"uniCollapse",emits:["change","activeItem","input","update:modelValue"],props:{value:{type:[String,Array],default:""},modelValue:{type:[String,Array],default:""},accordion:{type:[Boolean,String],default:!1}},data:()=>({}),computed:{dataValue(){let t="string"==typeof this.value&&""===this.value||Array.isArray(this.value)&&0===this.value.length;"string"==typeof this.modelValue&&""===this.modelValue||Array.isArray(this.modelValue)&&this.modelValue.length;return t?this.modelValue:this.value}},watch:{dataValue(t){this.setOpen(t)}},created(){this.childrens=[],this.names=[]},mounted(){this.$nextTick((()=>{this.setOpen(this.dataValue)}))},methods:{setOpen(t){let e="string"==typeof t,i=Array.isArray(t);this.childrens.forEach(((s,o)=>{if(e&&t===s.nameSync){if(!this.accordion)return void console.warn("accordion 属性为 false ,v-model 类型应该为 array");s.isOpen=!0}i&&t.forEach((t=>{if(t===s.nameSync){if(this.accordion)return void console.warn("accordion 属性为 true ,v-model 类型应该为 string");s.isOpen=!0}}))})),this.emit(t)},setAccordion(t){this.accordion&&this.childrens.forEach(((e,i)=>{t!==e&&(e.isOpen=!1)}))},resize(){this.childrens.forEach(((t,e)=>{t.getCollapseHeight()}))},onChange(t,e){let i=[];this.accordion?i=t?e.nameSync:"":this.childrens.forEach(((t,e)=>{t.isOpen&&i.push(t.nameSync)})),this.$emit("change",i),this.emit(i)},emit(t){this.$emit("input",t),this.$emit("update:modelValue",t)}}},[["render",function(t,e,a,n,r,h){const p=m;return i(),s(p,{class:"uni-collapse"},{default:o((()=>[l(t.$slots,"default",{},void 0,!0)])),_:3})}],["__scopeId","data-v-3aec18a2"]]),v={data:()=>({}),created(){this.popup=this.getParent()},methods:{getParent(t="uniPopup"){let e=this.$parent,i=e.$options.name;for(;i!==t;){if(e=e.$parent,!e)return!1;i=e.$options.name}return e}}},A={en:{"uni-popup.cancel":"cancel","uni-popup.ok":"ok","uni-popup.placeholder":"pleace enter","uni-popup.title":"Hint","uni-popup.shareTitle":"Share to"},"zh-Hans":{"uni-popup.cancel":"取消","uni-popup.ok":"确定","uni-popup.placeholder":"请输入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"},"zh-Hant":{"uni-popup.cancel":"取消","uni-popup.ok":"確定","uni-popup.placeholder":"請輸入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}},{t:O}=f(A);const B=_({name:"uniPopupDialog",mixins:[v],emits:["confirm","close","update:modelValue","input"],props:{inputType:{type:String,default:"text"},showClose:{type:Boolean,default:!0},modelValue:{type:[Number,String],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""},maxlength:{type:Number,default:-1},focus:{type:Boolean,default:!0}},data:()=>({dialogType:"error",val:""}),computed:{okText(){return this.confirmText||O("uni-popup.ok")},closeText(){return this.cancelText||O("uni-popup.cancel")},placeholderText(){return this.placeholder||O("uni-popup.placeholder")},titleText(){return this.title||O("uni-popup.title")}},watch:{type(t){this.dialogType=t},mode(t){"input"===t&&(this.dialogType="info")},value(t){-1!=this.maxlength&&"input"===this.mode?this.val=t.slice(0,this.maxlength):this.val=t},val(t){this.$emit("update:modelValue",t)}},created(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value,this.val=this.modelValue):this.dialogType=this.type},methods:{onOk(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog(){this.$emit("close"),this.beforeClose||this.popup.close()},close(){this.popup.close()}}},[["render",function(t,e,c,u,f,y){const k=d,b=m,C=g;return i(),s(b,{class:"uni-popup-dialog"},{default:o((()=>[a(b,{class:"uni-dialog-title"},{default:o((()=>[a(k,{class:n(["uni-dialog-title-text",["uni-popup__"+f.dialogType]])},{default:o((()=>[h(p(y.titleText),1)])),_:1},8,["class"])])),_:1}),"base"===c.mode?(i(),s(b,{key:0,class:"uni-dialog-content"},{default:o((()=>[l(t.$slots,"default",{},(()=>[a(k,{class:"uni-dialog-content-text"},{default:o((()=>[h(p(c.content),1)])),_:1})]),!0)])),_:3})):(i(),s(b,{key:1,class:"uni-dialog-content"},{default:o((()=>[l(t.$slots,"default",{},(()=>[a(C,{class:"uni-dialog-input",maxlength:c.maxlength,modelValue:f.val,"onUpdate:modelValue":e[0]||(e[0]=t=>f.val=t),type:c.inputType,placeholder:y.placeholderText,focus:c.focus},null,8,["maxlength","modelValue","type","placeholder","focus"])]),!0)])),_:3})),a(b,{class:"uni-dialog-button-group"},{default:o((()=>[c.showClose?(i(),s(b,{key:0,class:"uni-dialog-button",onClick:y.closeDialog},{default:o((()=>[a(k,{class:"uni-dialog-button-text"},{default:o((()=>[h(p(y.closeText),1)])),_:1})])),_:1},8,["onClick"])):r("",!0),a(b,{class:n(["uni-dialog-button",c.showClose?"uni-border-left":""]),onClick:y.onOk},{default:o((()=>[a(k,{class:"uni-dialog-button-text uni-button-color"},{default:o((()=>[h(p(y.okText),1)])),_:1})])),_:1},8,["class","onClick"])])),_:1})])),_:3})}],["__scopeId","data-v-dc2a088f"]]);class P{constructor(t,e){this.options=t,this.animation=y({...t}),this.currentStepAnimates={},this.next=0,this.$=e}_nvuePushAnimates(t,e){let i=this.currentStepAnimates[this.next],s={};if(s=i||{styles:{},config:{}},R.includes(t)){s.styles.transform||(s.styles.transform="");let i="";"rotate"===t&&(i="deg"),s.styles.transform+=`${t}(${e+i}) `}else s.styles[t]=`${e}`;this.currentStepAnimates[this.next]=s}_animateRun(t={},e={}){let i=this.$.$refs.ani.ref;if(i)return new Promise(((s,o)=>{nvueAnimation.transition(i,{styles:t,...e},(t=>{s()}))}))}_nvueNextAnimate(t,e=0,i){let s=t[e];if(s){let{styles:o,config:a}=s;this._animateRun(o,a).then((()=>{e+=1,this._nvueNextAnimate(t,e,i)}))}else this.currentStepAnimates={},"function"==typeof i&&i(),this.isEnd=!0}step(t={}){return this.animation.step(t),this}run(t){this.$.animationData=this.animation.export(),this.$.timer=setTimeout((()=>{"function"==typeof t&&t()}),this.$.durationTime)}}const R=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"];function V(t,e){if(e)return clearTimeout(e.timer),new P(t,e)}R.concat(["opacity","backgroundColor"],["width","height","left","right","top","bottom"]).forEach((t=>{P.prototype[t]=function(...e){return this.animation[t](...e),this}}));const I=_({name:"uniTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default:()=>"fade"},duration:{type:Number,default:300},styles:{type:Object,default:()=>({})},customClass:{type:String,default:""},onceRender:{type:Boolean,default:!1}},data:()=>({isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}),watch:{show:{handler(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject(){let t={...this.styles,"transition-duration":this.duration/1e3+"s"},e="";for(let i in t){e+=this.toLine(i)+":"+t[i]+";"}return e},transformStyles(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init(t={}){t.duration&&(this.durationTime=t.duration),this.animation=V(Object.assign(this.config,t),this)},onClick(){this.$emit("click",{detail:this.isShow})},step(t,e={}){if(this.animation){for(let e in t)try{"object"==typeof t[e]?this.animation[e](...t[e]):this.animation[e](t[e])}catch(i){console.error(`方法 ${e} 不存在`)}return this.animation.step(e),this}},run(t){this.animation&&this.animation.run(t)},open(){clearTimeout(this.timer),this.transform="",this.isShow=!0;let{opacity:t,transform:e}=this.styleInit(!1);void 0!==t&&(this.opacity=t),this.transform=e,this.$nextTick((()=>{this.timer=setTimeout((()=>{this.animation=V(this.config,this),this.tranfromInit(!1).step(),this.animation.run(),this.$emit("change",{detail:this.isShow})}),20)}))},close(t){this.animation&&this.tranfromInit(!0).step().run((()=>{this.isShow=!1,this.animationData=null,this.animation=null;let{opacity:t,transform:e}=this.styleInit(!1);this.opacity=t||1,this.transform=e,this.$emit("change",{detail:this.isShow})}))},styleInit(t){let e={transform:""},i=(t,i)=>{"fade"===i?e.opacity=this.animationType(t)[i]:e.transform+=this.animationType(t)[i]+" "};return"string"==typeof this.modeClass?i(t,this.modeClass):this.modeClass.forEach((e=>{i(t,e)})),e},tranfromInit(t){let e=(t,e)=>{let i=null;"fade"===e?i=t?0:1:(i=t?"-100%":"0","zoom-in"===e&&(i=t?.8:1),"zoom-out"===e&&(i=t?1.2:1),"slide-right"===e&&(i=t?"100%":"0"),"slide-bottom"===e&&(i=t?"100%":"0")),this.animation[this.animationMode()[e]](i)};return"string"==typeof this.modeClass?e(t,this.modeClass):this.modeClass.forEach((i=>{e(t,i)})),this.animation},animationType:t=>({fade:t?0:1,"slide-top":`translateY(${t?"0":"-100%"})`,"slide-right":`translateX(${t?"0":"100%"})`,"slide-bottom":`translateY(${t?"0":"100%"})`,"slide-left":`translateX(${t?"0":"-100%"})`,"zoom-in":`scaleX(${t?1:.8}) scaleY(${t?1:.8})`,"zoom-out":`scaleX(${t?1:1.2}) scaleY(${t?1:1.2})`}),animationMode:()=>({fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}),toLine:t=>t.replace(/([A-Z])/g,"-$1").toLowerCase()}},[["render",function(t,e,a,r,h,p){const u=m;return k((i(),s(u,{ref:"ani",animation:h.animationData,class:n(a.customClass),style:c(p.transformStyles),onClick:p.onClick},{default:o((()=>[l(t.$slots,"default")])),_:3},8,["animation","class","style","onClick"])),[[b,h.isShow]])}]]);const E=_({name:"uniPopup",components:{keypress:{name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const t={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]};document.addEventListener("keyup",(e=>{if(this.disable)return;const i=Object.keys(t).find((i=>{const s=e.key,o=t[i];return o===s||Array.isArray(o)&&o.includes(s)}));i&&setTimeout((()=>{this.$emit(i,{})}),0)}))},render:()=>{}}},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},isMaskClick:{type:Boolean,default:null},maskClick:{type:Boolean,default:null},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0},maskBackgroundColor:{type:String,default:"rgba(0, 0, 0, 0.4)"},borderRadius:{type:String}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0},isMaskClick:{handler:function(t){this.mkclick=t},immediate:!0},showPopup(t){document.getElementsByTagName("body")[0].style.overflow=t?"hidden":"visible"}},data(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{backgroundColor:"transparent",borderRadius:this.borderRadius||"0",position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:"top"}},computed:{getStyles(){let t={backgroundColor:this.bg};return this.borderRadius,t=Object.assign(t,{borderRadius:this.borderRadius}),t},isDesktop(){return this.popupWidth>=500&&this.popupHeight>=500},bg(){return""===this.backgroundColor||"none"===this.backgroundColor?"transparent":this.backgroundColor}},mounted(){(()=>{const{windowWidth:t,windowHeight:e,windowTop:i,safeArea:s,screenHeight:o,safeAreaInsets:a}=w();this.popupWidth=t,this.popupHeight=e+(i||0),s&&this.safeArea?this.safeAreaInsets=a.bottom:this.safeAreaInsets=0})()},unmounted(){this.setH5Visible()},activated(){this.setH5Visible(!this.showPopup)},deactivated(){this.setH5Visible(!0)},created(){null===this.isMaskClick&&null===this.maskClick?this.mkclick=!0:this.mkclick=null!==this.isMaskClick?this.isMaskClick:this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1,this.maskClass.backgroundColor=this.maskBackgroundColor},methods:{setH5Visible(t=!0){document.getElementsByTagName("body")[0].style.overflow=t?"visible":"hidden"},closeMask(){this.maskShow=!1},disableMask(){this.mkclick=!1},clear(t){t.stopPropagation(),this.clearPropagation=!0},open(t){if(this.showPopup)return;t&&-1!==["top","center","bottom","left","right","message","dialog","share"].indexOf(t)||(t=this.type),this.config[t]?(this[this.config[t]](),this.$emit("change",{show:!0,type:t})):console.error("缺少类型：",t)},close(t){this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout((()=>{this.showPopup=!1}),300)},touchstart(){this.clearPropagation=!1},onTap(){this.clearPropagation?this.clearPropagation=!1:(this.$emit("maskClick"),this.mkclick&&this.close())},top(t){this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0,this.$nextTick((()=>{this.messageChild&&"message"===this.type&&this.messageChild.timerClose()})))},bottom(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets+"px",backgroundColor:this.bg,borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0)},center(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center",borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0)},left(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0",display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)},right(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0",display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)}}},[["render",function(t,h,p,u,d,f){const g=x(e("uni-transition"),I),y=m,k=C("keypress");return d.showPopup?(i(),s(y,{key:0,class:n(["uni-popup",[d.popupstyle,f.isDesktop?"fixforpc-z-index":""]])},{default:o((()=>[a(y,{onTouchstart:f.touchstart},{default:o((()=>[d.maskShow?(i(),s(g,{key:"1",name:"mask","mode-class":"fade",styles:d.maskClass,duration:d.duration,show:d.showTrans,onClick:f.onTap},null,8,["styles","duration","show","onClick"])):r("",!0),a(g,{key:"2","mode-class":d.ani,name:"content",styles:d.transClass,duration:d.duration,show:d.showTrans,onClick:f.onTap},{default:o((()=>[a(y,{class:n(["uni-popup__wrapper",[d.popupstyle]]),style:c(f.getStyles),onClick:f.clear},{default:o((()=>[l(t.$slots,"default",{},void 0,!0)])),_:3},8,["style","class","onClick"])])),_:3},8,["mode-class","styles","duration","show","onClick"])])),_:3},8,["onTouchstart"]),d.maskShow?(i(),s(k,{key:0,onEsc:f.onTap},null,8,["onEsc"])):r("",!0)])),_:3},8,["class"])):r("",!0)}],["__scopeId","data-v-f0b957f8"]]);export{S as _,$ as a,B as b,E as c};