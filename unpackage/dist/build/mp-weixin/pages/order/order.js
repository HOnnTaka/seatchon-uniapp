"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-section")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-load-more")+e.resolveComponent("unicloud-db")+e.resolveComponent("uni-card"))()}Math||((()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js")+(()=>"../../uni_modules/uni-card/components/uni-card/uni-card.js"))();const o={__name:"order",setup(o){const n=e.ref(e.index.getStorageSync("userinfo"));return e.onShow((()=>{var o;n.value=e.index.getStorageSync("userinfo"),console.log(getCurrentPages()),null==(o=getCurrentPages()[0].$vm.$refs.udb)||o.loadData({clear:!0})})),e.onPullDownRefresh((async()=>{if(!n.value)return e.index.stopPullDownRefresh();await getCurrentPages()[0].$vm.$refs.udb.loadData({clear:!0},(()=>{e.index.stopPullDownRefresh(),e.index.showToast({title:"刷新成功",icon:"success"})}))})),(o,t)=>({a:e.p({title:"我的预定",type:"line"}),b:e.w((({data:o,loading:n,hasMore:t,error:i,options:s},r,u)=>e.e({a:i},i?{b:e.t(i.message)}:{},{c:e.f(o,((o,n,t)=>{return{a:e.t(o.title),b:e.t(o.note),c:e.t((i=o.effectiveTimeRange,i.join(" 至 "))),d:e.t(o.x),e:e.t(o.y),f:o.chartId,g:"b5879f73-4-"+u+"-"+t+",b5879f73-3-"+u,h:e.p({clickable:!0,link:!0,to:"/pages/detail/detail?chartId="+o.chartId,title:o.title,note:o.note})};var i})),d:"b5879f73-3-"+u+",b5879f73-2",e:"b5879f73-5-"+u+",b5879f73-2",f:e.p({status:n?"loading":t?"default":"no-more"}),g:u,h:r})),{name:"d",path:"b",vueId:"b5879f73-2,b5879f73-0"}),c:e.sr("udb","b5879f73-2,b5879f73-0"),d:e.p({options:o.options,collection:"order",where:`userId=='${n.value._id}'`,orderby:"orderTime desc"}),e:e.p({padding:"0"})})}},n=e._export_sfc(o,[["__scopeId","data-v-b5879f73"]]);wx.createPage(n);
