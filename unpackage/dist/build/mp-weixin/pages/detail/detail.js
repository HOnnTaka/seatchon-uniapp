"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-section")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-collapse-item")+e.resolveComponent("uni-collapse")+e.resolveComponent("uni-card")+e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-popup-dialog")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js")+(()=>"../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js")+(()=>"../../uni_modules/uni-card/components/uni-card/uni-card.js")+(()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"))();const a={__name:"detail",setup(a){const l=getCurrentPages().find((e=>"pages/detail/detail"===e.route)),t=e.ref(null),i=e.ref(null),n=e.ref(),u=e.ref(!1),o=e.ref(e.index.getStorageSync("userinfo")),s=e.ref(!1),v=e.ref(!0),d=e.ref(!1),r=e.ref("将使用以下信息选座：");e.onLoad((async a=>{i.value=a.chartId,await m(a.chartId),d.value=!0,e.index.hideLoading()})),e.onShow((async()=>{o.value=e.index.getStorageSync("userinfo"),await m(i.value)})),e.onReady((()=>{})),e.onPullDownRefresh((async()=>{await m(i.value),e.index.stopPullDownRefresh()}));const c=e.computed((()=>{var e;return null==(e=n.value)?void 0:e.administrators.includes(o.value._id)})),p=e.computed((()=>{var e;return(null==(e=n.value)?void 0:e.administrators[0])==o.value._id})),m=async a=>{u.value=!0;const l=e.Ws.database(),{result:t}=await l.collection("seat-chart").doc(a).get();n.value=t.data[0],e.index.setNavigationBarTitle({title:n.value.title}),await g(),u.value=!1},f=e.ref([]),g=async()=>{var a,l;if(!(null==(a=n.value)?void 0:a.administrators))return"";const t=e.Ws.database(),{result:i}=await t.collection("user").where({_id:t.command.in(n.value.administrators)}).field("nickName").get(),u=null==(l=n.value)?void 0:l.administrators.map((e=>{const a=i.data.find((a=>a._id==e));if(a)return a.nickName}));f.value=u},h=()=>{var e;if(!n.value)return!1;const a=null==(e=n.value)?void 0:e.selectableTimeRange,l=(new Date).getTime(),t=new Date(a[0]).getTime(),i=new Date(a[1]).getTime();return t<=l&&l<=i},w=async(a=!0)=>{var l;await m(i.value),a&&e.index.showToast({title:"刷新成功",icon:"success"}),t.value=n.value.seats[(null==(l=t.value)?void 0:l.index)-1]},x=async()=>{var e;v.value=(null==(e=t.value.stuInfo)?void 0:e.id)!=o.value._id,r.value=v.value?"将使用以下信息选座：":"将撤销以下选座：",s.value=!0},y=async()=>{e.index.showLoading({title:"加载中",mask:!0}),u.value=!0;const{result:a}=await e.Ws.callFunction({name:"select-seat",data:{chartId:i.value,seatIndex:t.value.index,userinfo:c.value?W.value:o.value,isSelectSubmit:v.value,orderId:t.value.orderId,edit:c.value}});s.value=!1,200==a.code?e.index.showToast({title:c.value?"修改成功":"选座成功",icon:"success"}):201==a.code?e.index.showToast({title:"撤销成功",icon:"success"}):e.index.showToast({title:a.message,icon:"error"}),w(!1)},T=e.ref({value:"",title:"",placeholder:""}),_=e.ref(!1),I=async()=>{T.value={type:"addAdmin",title:"添加管理员(仅当前课室)",placeholder:"请输入管理员学号/id",value:""},_.value=!0,setTimeout((()=>{l.$vm.$refs.inputDialog.open()}))},b=async()=>{T.value={type:"deleteAdmin",title:"删除管理员(仅当前课室)",placeholder:"请输入管理员学号/id",value:""},_.value=!0,setTimeout((()=>{l.$vm.$refs.inputDialog.open()}))},j=async(e,a)=>{T.value={type:e,title:"编辑"+e,placeholder:"请输入"+e,value:a},_.value=!0,setTimeout((()=>{l.$vm.$refs.inputDialog.open()}))},k={"姓名":"name","班级":"class","学号":"id"},C=async a=>{console.log(T.value);const l=a.trim();if(0===l.length)return void e.index.showToast({title:"内容不能为空",icon:"none"});const{type:t}=T.value;if("addAdmin"==t)return D(l);if("deleteAdmin"==t)return R(l);if("学号"==t){u.value=!0,e.index.showLoading({title:"加载中",mask:!0});const a=e.Ws.database(),{result:i}=await a.collection("user").doc(l).field("_id,name,class").get();if(console.log(i),e.index.hideLoading(),u.value=!1,0==i.data.length)return void e.index.showToast({title:"用户不存在",icon:"none"});W.value[k[t]]=i.data[0]._id,W.value.name=i.data[0].name||"",W.value.class=i.data[0].class||""}else{if(!(await e.index.showModal({title:"提示",content:"单独修改姓名或班级不会同步到相应用户",confirmText:"继续"})).confirm)return;W.value[k[t]]=l}},D=async a=>{e.index.showLoading({title:"加载中",mask:!0}),u.value=!0;const{administrators:l}=n.value;if(l.includes(a))return e.index.showToast({title:"该用户已是管理员",icon:"none"}),void(u.value=!1);const t=e.Ws.database(),{result:o}=await t.collection("user").doc(a).field("_id").get();0!=o.data.length?(l.push(a),n.value.administrators=l,await t.collection("seat-chart").doc(i.value).update({administrators:l}),await g(),u.value=!1,e.index.showToast({title:"添加成功",icon:"success"}),_.value=!1):e.index.showToast({title:"用户不存在",icon:"none"})},R=async a=>{e.index.showLoading({title:"加载中",mask:!0}),u.value=!0;const{administrators:l}=n.value;if(!l.includes(a))return e.index.showToast({title:"该用户不是管理员",icon:"none"}),void(u.value=!1);const t=l.indexOf(a);l.splice(t,1);const o=e.Ws.database();await o.collection("seat-chart").doc(i.value).update({administrators:l}),await g(),n.value.administrators=l,e.index.showToast({title:"删除成功",icon:"success"}),u.value=!1,_.value=!1},S=()=>{e.index.navigateTo({url:"/pages/createSeatChart/createSeatChart?type=edit&chartId="+i.value})},L=async()=>{if(!(await e.index.showModal({title:"提示",content:"确定删除该课室吗？"})).confirm)return;e.index.showLoading({title:"加载中",mask:!0});const a=e.Ws.database(),{result:l}=await a.collection("seat-chart").doc(i.value).remove();console.log(l),e.index.showToast({title:"删除成功",icon:"success"}),setTimeout((()=>{e.index.navigateBack()}),1e3)},W=e.ref({}),$=async()=>{var e,a,l;v.value=!0,r.value="将修改以下选座：",W.value={id:(null==(e=t.value.stuInfo)?void 0:e.id)||o.value._id,name:(null==(a=t.value.stuInfo)?void 0:a.name)||o.value.name,class:(null==(l=t.value.stuInfo)?void 0:l.class)||o.value.class},s.value=!0},A=async()=>{v.value=!1,r.value="将撤销以下选座：",s.value=!0},B=a=>{e.index.setClipboardData({data:a,success:function(){e.index.showToast({title:"复制成功",icon:"none"})}})};return(a,l)=>{var i,d,m,g,k,D,R,M,P,N,V,q,F,O,z,E,G,H,J,K,Q,U,X,Y,Z,ee,ae,le,te,ie,ne,ue,oe,se;return e.e({a:c.value},(c.value,{}),{b:e.p({title:"课室信息",type:"line"}),c:e.t(null==(i=n.value)?void 0:i.title),d:e.o((e=>{var a;return B(null==(a=n.value)?void 0:a.title)})),e:e.p({title:"课室"}),f:e.t(null==(d=n.value)?void 0:d.note),g:e.o((e=>{var a;return B(null==(a=n.value)?void 0:a.note)})),h:e.p({title:"备注"}),i:e.t(null==(m=n.value)?void 0:m.selectableTimeRange.join(" 至 ")),j:e.o((e=>{var a;return B(null==(a=n.value)?void 0:a.selectableTimeRange.join(" 至 "))})),k:e.p({title:"选座时间"}),l:e.t(null==(g=n.value)?void 0:g.effectiveTimeRange.join(" 至 ")),m:e.o((e=>{var a;return B(null==(a=n.value)?void 0:a.effectiveTimeRange.join(" 至 "))})),n:e.p({title:"生效时间"}),o:c.value},c.value?e.e({p:e.o(S),q:u.value,r:p.value},p.value?{s:e.o(L),t:u.value}:{}):{},{v:e.p({open:null!=n.value,titleBorder:"none"}),w:e.p({padding:"0"}),x:e.p({title:"课室管理员",type:"line"}),y:e.f(null==(k=n.value)?void 0:k.administrators,((a,l,t)=>({a:e.t(a),b:e.o((e=>B(a)),l),c:l,d:"23f862e4-12-"+t+",23f862e4-10",e:e.p({ellipsis:"1",title:f.value[l]})}))),z:p.value},p.value?{A:e.o(I),B:u.value,C:e.o(b),D:u.value}:{},{E:e.p({open:null!=n.value,titleBorder:"none"}),F:e.p({padding:"0"}),G:e.p({title:"座位表",type:"line"}),H:e.f(null==(D=n.value)?void 0:D.seats,((a,l,i)=>{var n,u,s,v;return{a:e.t(a.stuInfo?(null==(n=null==a?void 0:a.stuInfo)?void 0:n.id)!=o.value._id?"":"你":"空"),b:l,c:2==a.status?1:"",d:a.index==(null==(u=t.value)?void 0:u.index)?1:"",e:e.s((null==(s=null==a?void 0:a.stuInfo)?void 0:s.id)!=o.value._id?`background-image:url(${null==(v=a.stuInfo)?void 0:v.avatar});`:"background:#333;"),f:e.o((()=>t.value=a),l)}})),I:e.s(`--col:${null==(R=n.value)?void 0:R.col};--row:${null==(M=n.value)?void 0:M.row};`),J:e.o(w),K:u.value,L:e.p({padding:"0"}),M:t.value},t.value?e.e({N:e.p({title:"座位信息",type:"line"}),O:e.t(null==(P=t.value)?void 0:P.x),P:e.t(null==(N=t.value)?void 0:N.y),Q:e.p({title:"座位"}),R:(null==(V=t.value)?void 0:V.stuInfo)&&(n.value.stuInfoVisible||1==o.value.type)},(null==(q=t.value)?void 0:q.stuInfo)&&(n.value.stuInfoVisible||1==o.value.type)?{S:e.t(null==(O=null==(F=t.value)?void 0:F.stuInfo)?void 0:O.name),T:e.p({title:"姓名"}),U:e.t(null==(E=null==(z=t.value)?void 0:z.stuInfo)?void 0:E.id),V:e.p({title:"学号"}),W:e.t(null==(H=null==(G=t.value)?void 0:G.stuInfo)?void 0:H.class),X:e.p({title:"班级"})}:{},{Y:null==(J=t.value)?void 0:J.selectTime},(null==(K=t.value)?void 0:K.selectTime)?{Z:e.p({date:new Date(null==(Q=t.value)?void 0:Q.selectTime)-3e4,format:"M月d日 h时m分",threshold:[0,36e5]}),aa:e.p({title:"选择时间"})}:{},{ab:e.p({padding:"0"})}):{},{ac:c.value},c.value?{ad:!t.value,ae:e.o($),af:u.value,ag:3!=(null==(U=t.value)?void 0:U.status),ah:e.o(A),ai:u.value}:e.e({aj:h()},h()?{ak:e.t((null==(Y=null==(X=t.value)?void 0:X.stuInfo)?void 0:Y.id)==o.value._id?"撤销选座":3==(null==(Z=t.value)?void 0:Z.status)?"已被选择":"选择座位"),al:e.o(x),am:3==(null==(ee=t.value)?void 0:ee.status)&&(null==(le=null==(ae=t.value)?void 0:ae.stuInfo)?void 0:le.id)!=o.value._id||!t.value,an:(null==(ie=null==(te=t.value)?void 0:te.stuInfo)?void 0:ie.id)==o.value._id?"warn":"primary",ao:u.value}:{},{ap:!h()},(h(),{})),{aq:e.t(r.value),ar:e.p({title:"课室信息",type:"line"}),as:e.t(null==(ne=n.value)?void 0:ne.title),at:e.p({title:"课室"}),av:e.t(null==(ue=t.value)?void 0:ue.x),aw:e.t(null==(oe=t.value)?void 0:oe.y),ax:e.p({title:"座位"}),ay:e.t(null==(se=n.value)?void 0:se.effectiveTimeRange.join(" 至 ")),az:e.p({title:"生效时间"}),aA:e.p({title:"学生信息",type:"line"}),aB:e.t(c.value?W.value.id:o.value._id),aC:e.o((e=>j("学号",W.value.id))),aD:e.p({title:"学号",link:c.value&&v.value}),aE:e.t(c.value?W.value.name:o.value.name),aF:e.o((e=>j("姓名",W.value.name))),aG:e.p({title:"姓名",link:c.value&&v.value}),aH:e.t(c.value?W.value.class:o.value.class),aI:e.o((e=>j("班级",W.value.class))),aJ:e.p({title:"班级",link:c.value&&v.value}),aK:e.p({padding:"0"}),aL:e.o(y),aM:v.value?"primary":"warn",aN:u.value,aO:e.o((()=>{})),aP:e.o((()=>s.value=!1)),aQ:s.value?"":1,aR:_.value},_.value?{aS:e.sr("inputClose","23f862e4-34,23f862e4-33"),aT:e.o(C),aU:e.o((e=>_.value=!1)),aV:e.o((e=>T.value.value=e)),aW:e.p({mode:"input",title:T.value.title,placeholder:T.value.placeholder,modelValue:T.value.value}),aX:e.sr("inputDialog","23f862e4-33"),aY:e.p({type:"dialog"})}:{},{aZ:e.s(null!=n.value?"transition: all .5s ease; opacity: 1":"")})}}},l=e._export_sfc(a,[["__scopeId","data-v-23f862e4"]]);wx.createPage(l);
