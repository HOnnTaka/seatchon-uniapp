"use strict";const t=require("../../../../common/vendor.js"),o={name:"uniGroup",emits:["click"],props:{title:{type:String,default:""},top:{type:[Number,String],default:10},mode:{type:String,default:"default"},stat:{type:Boolean,default:!1}},data(){return{margin:!1,border:!1}},watch:{title(e){t.index.report&&this.stat&&e!==""&&t.index.report("title",e)}},created(){this.form=this.getForm(),this.form&&(this.margin=!0,this.border=this.form.border)},methods:{getForm(){let e=this.$parent,n=e.$options.name;for(;n!=="uniForms";){if(e=e.$parent,!e)return!1;n=e.$options.name}return e},onClick(){this.$emit("click")}}};function u(e,n,r,a,i,m){return t.e({a:r.title},r.title?{b:t.t(r.title),c:i.border?"30px":"15px"}:{},{d:i.border?1:"",e:t.n("uni-group--"+r.mode),f:t.n(i.margin?"group-margin":""),g:`${r.top}px`})}const s=t._export_sfc(o,[["render",u],["__file","D:/code/seatchon-uniapp/uni_modules/uni-group/components/uni-group/uni-group.vue"]]);wx.createComponent(s);
