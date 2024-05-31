"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-section")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-load-more")+e.resolveComponent("unicloud-db")+e.resolveComponent("uni-card"))()}Math||((()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js")+(()=>"../../uni_modules/uni-card/components/uni-card/uni-card.js"))();const t={__name:"order",setup(t){const o=e.ref(e.index.getStorageSync("userinfo")),a=e.ref(!1),n=e.ref({orderDB:!1,adminDB:!1}),i=getCurrentPages().find((e=>"pages/order/order"===e.route)),r=e.Ws.database(),d=e.ref([r.collection("order").where('userId ==  "216124125"').field("chartId,x,y,userId").getTemp(),r.collection("seat-chart").field("_id,effectiveTimeRange,selectableTimeRange,title,note").getTemp()]);e.onShow((async()=>{o.value=e.index.getStorageSync("userinfo"),setTimeout((()=>{e.index.startPullDownRefresh(),a.value=!0}),100)})),e.onHide((async()=>{a.value=!1}));const s=async t=>{await i.$vm.$refs[t].loadMore(),e.index.vibrateShort()},l=async t=>{n.value[t]=!0,await i.$vm.$refs[t].loadData({clear:!0}),setTimeout((()=>{e.index.stopPullDownRefresh(),n.value[t]=!1,e.index.vibrateShort()}))};return e.onPullDownRefresh((()=>{l("orderDB"),l("adminDB")})),(t,i)=>({a:e.p({title:"我的选座",type:"line"}),b:e.w((({data:t,loading:o,hasMore:a,error:n,options:i},r,d)=>e.e({a:n},n?{b:e.t(console.log(n.message))}:{},{c:e.f(t,((t,o,a)=>{return{a:e.t(t.chartId[0].title),b:e.t(t.chartId[0].note),c:e.t((n=t.chartId[0].effectiveTimeRange,n.join(" 至 "))),d:e.t(t.x),e:e.t(t.y),f:t.chartId[0]._id,g:"e68f8a65-4-"+d+"-"+a+",e68f8a65-3-"+d,h:e.p({clickable:!0,showArrow:!0,to:"/pages/detail/detail?chartId="+t.chartId[0]._id,title:t.chartId[0].title,note:t.chartId[0].note})};var n})),d:"e68f8a65-3-"+d+",e68f8a65-2",e:"e68f8a65-5-"+d+",e68f8a65-2",f:e.p({status:o?"loading":a?"default":"no-more"}),g:d,h:r})),{name:"d",path:"b",vueId:"e68f8a65-2,e68f8a65-0"}),c:e.sr("orderDB","e68f8a65-2,e68f8a65-0"),d:e.p({"page-size":10,collection:d.value,where:`userId=='${o.value._id}'`,orderby:"orderTime desc"}),e:n.value.orderDB,f:e.o((e=>s("orderDB"))),g:e.o((e=>l("orderDB"))),h:e.p({padding:"0"}),i:e.p({title:"我的管理",type:"line"}),j:e.w((({data:t,loading:o,hasMore:a,error:n,options:i},r,d)=>e.e({a:n},n?{b:e.t(console.log(n.message))}:{},{c:e.f(t,((t,o,a)=>({a:e.t(t.title),b:e.t(t.note),c:e.t(t.administrators.length),d:t._id,e:"e68f8a65-10-"+d+"-"+a+",e68f8a65-9-"+d,f:e.p({clickable:!0,showArrow:!0,to:"/pages/detail/detail?chartId="+t._id,title:t.title,note:t.note})}))),d:"e68f8a65-9-"+d+",e68f8a65-8",e:"e68f8a65-11-"+d+",e68f8a65-8",f:e.p({status:o?"loading":a?"default":"no-more"}),g:d,h:r})),{name:"d",path:"j",vueId:"e68f8a65-8,e68f8a65-6"}),k:e.sr("adminDB","e68f8a65-8,e68f8a65-6"),l:e.p({collection:"seat-chart","page-size":10,field:"title,note,administrators",where:`in('${o.value._id}', administrators)`,orderby:"createTime desc"}),m:n.value.adminDB,n:e.o((e=>s("adminDB"))),o:e.o((e=>l("adminDB"))),p:e.p({padding:"0"}),q:e.s(a.value?"transition: all .5s ease; opacity: 1":"")})}},o=e._export_sfc(t,[["__scopeId","data-v-e68f8a65"]]);wx.createPage(o);
