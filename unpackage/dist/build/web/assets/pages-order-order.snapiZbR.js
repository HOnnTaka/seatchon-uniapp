import{s as e,v as t,q as a,W as r,u as s,r as l,o,c as i,w as d,a as n,x as c,y as u,i as f,b as m,h as _,t as h,d as g,e as p,f as y,F as b,S as v,k as w}from"./index-DFhF2a5T.js";import{_ as B}from"./uni-section.CDRn9Yxk.js";import{_ as I,b as D,c as k,d as T,r as x,e as j}from"./uni-card.BnPeI189.js";import{_ as $}from"./uni-list-item.z9NokECt.js";import{_ as R,a as S}from"./unicloud-db.dxu9bvWm.js";import{_ as M}from"./uni-load-more.CkLD1KdY.js";const z=I({__name:"order",setup(I){const z=e(t("userinfo")),A=e(!1),q=e({orderDB:!1,adminDB:!1}),F=a().find((e=>"pages/order/order"===e.route)),W=r.database(),C=e([W.collection("order").where('userId ==  "216124125"').field("chartId,x,y,userId").getTemp(),W.collection("seat-chart").field("_id,effectiveTimeRange,selectableTimeRange,title,note").getTemp()]);D((async()=>{z.value=t("userinfo"),s(),setTimeout((()=>{A.value=!0}),100)})),k((async()=>{A.value=!1}));const E=async e=>{await F.$vm.$refs[e].loadMore(),u()},G=async e=>{q.value[e]=!0,await F.$vm.$refs[e].loadData({clear:!0}),setTimeout((()=>{c(),q.value[e]=!1,u()}))};return T((()=>{G("orderDB"),G("adminDB")})),(e,t)=>{const a=x(l("uni-section"),B),r=f,s=w,c=x(l("uni-list-item"),$),u=x(l("uni-list"),R),I=x(l("uni-load-more"),M),D=x(l("unicloud-db"),S),k=v,T=x(l("uni-card"),j);return o(),i(r,{class:"container",style:n([{transition:"all 1s ease",opacity:"0"},A.value?"transition: all .5s ease; opacity: 1":""])},{default:d((()=>[m(r,{style:{"margin-bottom":"-10px"}},{default:d((()=>[m(T,{class:"order-card",padding:"0"},{title:d((()=>[m(a,{title:"我的选座",type:"line"})])),default:d((()=>[m(k,{class:"orderScrollBox","scroll-y":"","refresher-enabled":"","enable-back-to-top":"","scroll-with-animation":"","refresher-triggered":q.value.orderDB,onScrolltolower:t[0]||(t[0]=e=>E("orderDB")),onRefresherrefresh:t[1]||(t[1]=e=>G("orderDB"))},{default:d((()=>[m(D,{ref:"orderDB","page-size":10,collection:C.value,where:`userId=='${z.value._id}'`,orderby:"orderTime desc"},{default:d((({data:e,loading:t,hasMore:a,error:l,options:n})=>[l?(o(),i(r,{key:0,class:"error"},{default:d((()=>[_(h(console.log(l.message))+"获取列表失败,下拉刷新试试？",1)])),_:2},1024)):g("",!0),m(u,null,{default:d((()=>[(o(!0),p(b,null,y(e,((e,t)=>(o(),i(c,{key:e.chartId[0]._id,clickable:"",showArrow:"",to:"/pages/detail/detail?chartId="+e.chartId[0]._id,title:e.chartId[0].title,note:e.chartId[0].note},{body:d((()=>[m(r,{class:"item-body"},{default:d((()=>[m(r,{class:"item-content"},{default:d((()=>[m(s,{class:"item-title"},{default:d((()=>[_(h(e.chartId[0].title),1)])),_:2},1024),m(s,{class:"item-note"},{default:d((()=>[_(h(e.chartId[0].note),1)])),_:2},1024)])),_:2},1024),m(r,{class:"item-time"},{default:d((()=>[m(s,null,{default:d((()=>{return[_(h((t=e.chartId[0].effectiveTimeRange,t.join(" 至 "))),1)];var t})),_:2},1024)])),_:2},1024)])),_:2},1024)])),footer:d((()=>[m(r,{class:"item-footer"},{default:d((()=>[_("第"+h(e.x)+"列 第"+h(e.y)+"行",1)])),_:2},1024)])),_:2},1032,["to","title","note"])))),128))])),_:2},1024),m(I,{status:t?"loading":a?"default":"no-more"},null,8,["status"])])),_:1},8,["collection","where"])])),_:1},8,["refresher-triggered"])])),_:1})])),_:1}),m(T,{class:"admin-card",padding:"0"},{title:d((()=>[m(a,{title:"我的管理",type:"line"})])),default:d((()=>[m(k,{class:"adminScrollBox","scroll-y":"","refresher-enabled":"","enable-back-to-top":"","scroll-with-animation":"","refresher-triggered":q.value.adminDB,onScrolltolower:t[2]||(t[2]=e=>E("adminDB")),onRefresherrefresh:t[3]||(t[3]=e=>G("adminDB"))},{default:d((()=>[m(D,{ref:"adminDB",collection:"seat-chart","page-size":10,field:"title,note,administrators",where:`in('${z.value._id}', administrators)`,orderby:"createTime desc"},{default:d((({data:e,loading:t,hasMore:a,error:l,options:n})=>[l?(o(),i(r,{key:0,class:"error"},{default:d((()=>[_(h(console.log(l.message))+"获取列表失败,下拉刷新试试？",1)])),_:2},1024)):g("",!0),m(u,null,{default:d((()=>[(o(!0),p(b,null,y(e,((e,t)=>(o(),i(c,{key:e._id,clickable:"",showArrow:"",to:"/pages/detail/detail?chartId="+e._id,title:e.title,note:e.note},{body:d((()=>[m(r,{class:"item-body"},{default:d((()=>[m(r,{class:"item-content"},{default:d((()=>[m(s,{class:"item-title"},{default:d((()=>[_(h(e.title),1)])),_:2},1024),m(s,{class:"item-note"},{default:d((()=>[_(h(e.note),1)])),_:2},1024)])),_:2},1024),m(r,{class:"item-time"})])),_:2},1024)])),footer:d((()=>[m(r,{class:"item-footer"},{default:d((()=>[_(h(e.administrators.length)+"人管理",1)])),_:2},1024)])),_:2},1032,["to","title","note"])))),128))])),_:2},1024),m(I,{status:t?"loading":a?"default":"no-more"},null,8,["status"])])),_:1},8,["where"])])),_:1},8,["refresher-triggered"])])),_:1})])),_:1},8,["style"])}}},[["__scopeId","data-v-9e7aff03"]]);export{z as default};
