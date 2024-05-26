"use strict";const e=require("../../common/vendor.js");if(!Array){e.resolveComponent("uni-dateformat")()}const l=()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";Math||(e.unref(a)+l)();const a=()=>"../../component/CardList/CardList.js",t={__name:"detail",setup(l){const a=e.ref(null),t=e.ref(null),u=e.ref(),n=e.ref(!1),i=e.ref(e.index.getStorageSync("userinfo")),o=e.ref(!1),v=e.ref(!0),s=e.ref(!1);e.onLoad((async l=>{t.value=l.chartId,await d(l.chartId),s.value=!0,e.index.hideLoading()})),e.onShow((async()=>{i.value=e.index.getStorageSync("userinfo")})),e.onReady((()=>{})),e.onPullDownRefresh((async()=>{await d(t.value),e.index.stopPullDownRefresh(),e.index.showToast({title:"刷新成功",icon:"success"})}));const d=async l=>{n.value=!0;const a=e.Ws.database(),{result:t}=await a.collection("seat-chart").doc(l).get();u.value=t.data[0],await c(),e.index.setNavigationBarTitle({title:u.value.title}),n.value=!1},r=e.ref(""),c=async()=>{var l;if(!(null==(l=u.value)?void 0:l.administrator))return"";const a=e.Ws.database(),{result:t}=await a.collection("user").where({_id:a.command.in(u.value.administrator)}).field("name").get();r.value=t.data.map((e=>e.name)).join("、")},f=()=>{var e;if(!u.value)return!1;const l=null==(e=u.value)?void 0:e.selectableTimeRange,a=(new Date).getTime(),t=new Date(l[0]).getTime(),n=new Date(l[1]).getTime();return t<=a&&a<=n},m=async(l=!0)=>{var n;await d(t.value),l&&e.index.showToast({title:"刷新成功",icon:"success"}),a.value=u.value.seats[(null==(n=a.value)?void 0:n.index)-1]},w=async()=>{var e;i.value,v.value=(null==(e=a.value.stuInfo)?void 0:e.id)!=i.value._id,o.value=!0},I=async()=>{e.index.showLoading({title:"加载中",mask:!0});const{result:l}=await e.Ws.callFunction({name:"select-seat",data:{chartId:t.value,seatIndex:a.value.index,userinfo:i.value,isSelectSubmit:v.value,orderId:a.value.orderId}});o.value=!1,200==l.code?e.index.showToast({title:"选座成功",icon:"success"}):201==l.code?e.index.showToast({title:"撤销成功",icon:"success"}):e.index.showToast({title:l.message,icon:"error"}),m(!1)};return(l,t)=>{var s,d,c,g,p,y,x,h,T,_,b,j,R,S,D,L,k,C,P,U,W,M,V,$,q,A,B,F,N,z,E,G,H;return e.e({a:null==(s=u.value)?void 0:s.title,b:null==(d=u.value)?void 0:d.note,c:r.value,d:null==(c=u.value)?void 0:c.selectableTimeRange.join(" 至 "),e:null==(g=u.value)?void 0:g.effectiveTimeRange.join(" 至 "),f:e.p({title:"课室列表"}),g:e.f(null==(p=u.value)?void 0:p.seats,((l,t,u)=>{var n,o,v,s;return{a:e.t(l.stuInfo?(null==(n=null==l?void 0:l.stuInfo)?void 0:n.id)!=i.value._id?"":"你":"空"),b:t,c:2==l.status?1:"",d:l.index==(null==(o=a.value)?void 0:o.index)?1:"",e:e.s((null==(v=null==l?void 0:l.stuInfo)?void 0:v.id)!=i.value._id?`background-image:url(${null==(s=l.stuInfo)?void 0:s.avatar});`:"background:#2979ff;"),f:e.o((()=>a.value=l),t)}})),h:e.s(`--col:${null==(y=u.value)?void 0:y.col};--row:${null==(x=u.value)?void 0:x.row};`),i:e.o(m),j:n.value,k:e.p({title:"座位表"}),l:a.value},a.value?e.e({m:e.t(null==(h=a.value)?void 0:h.x),n:e.t(null==(T=a.value)?void 0:T.y),o:(null==(_=a.value)?void 0:_.stuInfo)&&(u.value.stuInfoVisible||1==i.value.type)},(null==(b=a.value)?void 0:b.stuInfo)&&(u.value.stuInfoVisible||1==i.value.type)?{p:e.t(null==(R=null==(j=a.value)?void 0:j.stuInfo)?void 0:R.name),q:e.t(null==(D=null==(S=a.value)?void 0:S.stuInfo)?void 0:D.id),r:e.t(null==(k=null==(L=a.value)?void 0:L.stuInfo)?void 0:k.class)}:{},{s:e.t(1==(null==(C=a.value)?void 0:C.status)?"空闲":"已被选择"),t:null==(P=a.value)?void 0:P.selectTime},(null==(U=a.value)?void 0:U.selectTime)?{v:e.p({date:new Date(null==(W=a.value)?void 0:W.selectTime)-3e4,format:"M月d日 h时m分",threshold:[0,36e5]})}:{},{w:e.p({title:"座位信息"})}):{},{x:f()},f()?{y:e.t((null==(V=null==(M=a.value)?void 0:M.stuInfo)?void 0:V.id)==i.value._id?"撤销选座":3==(null==($=a.value)?void 0:$.status)?"已被选择":"选择座位"),z:e.o(w),A:3==(null==(q=a.value)?void 0:q.status)&&(null==(B=null==(A=a.value)?void 0:A.stuInfo)?void 0:B.id)!=i.value._id||!a.value,B:(null==(N=null==(F=a.value)?void 0:F.stuInfo)?void 0:N.id)==i.value._id?"warn":"primary",C:n.value}:{},{D:e.t(v.value?"将使用以下信息选座：":"将撤销以下选座："),E:e.t(null==(z=u.value)?void 0:z.title),F:e.t(null==(E=a.value)?void 0:E.x),G:e.t(null==(G=a.value)?void 0:G.y),H:e.t(null==(H=u.value)?void 0:H.effectiveTimeRange.join(" 至 ")),I:e.p({title:"课室信息"}),J:e.t(i.value.name),K:1==i.value.type,L:e.o((e=>l.editUserInfo("name"))),M:e.t(i.value._id),N:1==i.value.type,O:e.o((e=>l.editUserInfo("id"))),P:e.t(i.value.class),Q:1==i.value.type,R:e.o((e=>l.editUserInfo("class"))),S:e.p({title:"个人信息"}),T:e.o(I),U:v.value?"primary":"warn",V:n.value,W:e.o((()=>{})),X:e.o((()=>o.value=!1)),Y:o.value?"":1})}}},u=e._export_sfc(t,[["__scopeId","data-v-cd4b8c7c"]]);wx.createPage(u);
