"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-search-bar")+e.resolveComponent("uni-fab")+e.resolveComponent("uni-section")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-load-more")+e.resolveComponent("unicloud-db"))()}Math||((()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js")+(()=>"../../uni_modules/uni-fab/components/uni-fab/uni-fab.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js"))();const n={__name:"index",setup(n){const o=e.ref("");e.ref([]);const t=e.ref({});e.onLoad((async()=>{})),e.onShow((async()=>{var n;t.value=e.index.getStorageSync("userinfo"),null==(n=getCurrentPages()[0].$vm.$refs.udb)||n.loadData({clear:!0})})),e.onPullDownRefresh((async()=>{var n;await(null==(n=getCurrentPages()[0].$vm.$refs.udb)?void 0:n.loadData({clear:!0})),e.index.stopPullDownRefresh(),e.index.showToast({title:"刷新成功",icon:"success"})}));const a=e=>e.join(" 至 "),i=e=>{const n=(new Date).getTime(),{selectableTimeRange:o,effectiveTimeRange:t}=e,a=[new Date(o[0]).getTime(),new Date(o[1]).getTime()],i=[new Date(t[0]).getTime(),new Date(t[1]).getTime()];return n>i[0]&&n<i[1]?"生效中":n>a[0]&&n<a[1]?"选座中":n<a[0]?"未开始":n>i[1]?"已结束":void 0},s=async()=>{},l=()=>{e.index.navigateTo({url:"/pages/createSeatChart/createSeatChart"})};return(n,r)=>e.e({a:e.o(s),b:e.o((e=>o.value=e)),c:e.p({bgColor:"#fff",placeholder:"请输入搜索内容",modelValue:o.value}),d:1==t.value.type},1==t.value.type?{e:e.sr("fab","d8f6fa42-1"),f:e.o(l),g:e.p({pattern:{buttonColor:"#2979ff"},horizontal:"right",vertical:"bottom"})}:{},{h:e.p({title:"全部课室",type:"line"}),i:e.w((({data:n,loading:o,hasMore:s,error:l,options:r},u,d)=>e.e({a:l},l?{b:e.t(l.message)}:{},{c:e.f(n,((n,o,s)=>({a:e.t(n.title),b:e.t(n.note),c:e.t(a(n.selectableTimeRange)),d:e.t(a(n.effectiveTimeRange)),e:e.t(i(n)),f:n._id,g:e.o((o=>(async n=>{t.value?(e.index.showLoading({title:"加载中"}),e.index.navigateTo({url:`/pages/detail/detail?chartId=${n._id}`})):(await e.index.showModal({title:"提示",content:"还未登录，是否前往登录？",showCancel:!0,confirmText:"前往登录"})).confirm&&e.index.switchTab({url:"/pages/user/user"})})(n)),n._id),h:"d8f6fa42-5-"+d+"-"+s+",d8f6fa42-4-"+d,i:e.p({clickable:!0,link:!0,title:n.title,note:n.note})}))),d:"d8f6fa42-4-"+d+",d8f6fa42-3",e:"d8f6fa42-6-"+d+",d8f6fa42-3",f:e.p({status:o?"loading":s?"default":"no-more"}),g:d,h:u})),{name:"d",path:"i",vueId:"d8f6fa42-3"}),j:e.sr("udb","d8f6fa42-3"),k:e.p({options:n.options,collection:"seat-chart",orderby:"createdTime desc"})})}},o=e._export_sfc(n,[["__scopeId","data-v-d8f6fa42"]]);wx.createPage(o);