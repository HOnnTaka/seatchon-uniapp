"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-search-bar")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-fab"))()}Math||((()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-fab/components/uni-fab/uni-fab.js"))();const t={__name:"index",setup(t){const n=e.ref(""),a=e.ref([]),i=e.ref(e.index.getStorageSync("userinfo"));e.onShow((async()=>{o()}));const o=async(t=!0)=>{t&&e.index.showLoading({title:"加载中"});const n=e.Ws.database(),i=await n.collection("seat-chart").aggregate().project({_id:1,title:1,note:1,creator:1,creatorId:1,selectableTimeRange:1,effectiveTimeRange:1}).end();a.value=i.result.data,e.index.hideLoading()},s=e=>e.join(" 至 "),r=async()=>{},c=()=>{e.index.navigateTo({url:"/pages/createSeatChart/createSeatChart"})};return(t,o)=>{var l,u;return e.e({a:e.o(r),b:e.o((e=>n.value=e)),c:e.p({placeholder:"请输入搜索内容",modelValue:n.value}),d:e.f(a.value,((t,n,a)=>({a:e.t(t.title),b:e.t(t.note),c:e.t(s(t.selectableTimeRange)),d:e.t(s(t.effectiveTimeRange)),e:e.t("选座中"),f:t.chartId,g:"cf464fc4-2-"+a+",cf464fc4-1",h:e.p({clickable:!0,link:!0,to:"/pages/detail/detail?chartId="+t._id,title:t.title,note:t.note})}))),e:1==(null==(l=i.value)?void 0:l.type)},1==(null==(u=i.value)?void 0:u.type)?{f:e.sr("fab","cf464fc4-3"),g:e.o(c),h:e.p({pattern:{buttonColor:"#07c160"},horizontal:"right",vertical:"bottom"})}:{})}}},n=e._export_sfc(t,[["__scopeId","data-v-cf464fc4"]]);wx.createPage(n);
