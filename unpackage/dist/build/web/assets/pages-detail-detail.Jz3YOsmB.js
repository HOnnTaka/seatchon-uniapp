import{o as e,c as a,w as l,h as t,t as n,k as u,q as i,s,v as o,D as r,y as d,x as v,E as c,W as f,G as m,r as y,a as h,i as p,d as _,b as g,e as k,f as b,F as w,H as I,n as M,J as C,C as S,A as T,z as x,K as D,L as j,M as R,N as L,O as $}from"./index-C1E6qCqQ.js";import{_ as A}from"./uni-section.DlRahpOj.js";import{_ as N,o as F,b as z,f as O,d as V,r as U,e as B}from"./uni-card.DdPDNA1Z.js";import{_ as E}from"./uni-list-item.B2p1jpto.js";import{_ as H,a as P,b as q,c as G}from"./uni-popup.Cc2-dYcG.js";function J(e,a=2){for(e+="";e.length<a;)e="0"+e;return e.slice(-a)}const K={yyyy:e=>J(e.year,4),yy:e=>J(e.year),MM:e=>J(e.month),M:e=>e.month,dd:e=>J(e.day),d:e=>e.day,hh:e=>J(e.hour),h:e=>e.hour,mm:e=>J(e.minute),m:e=>e.minute,ss:e=>J(e.second),s:e=>e.second,SSS:e=>J(e.millisecond,3),S:e=>e.millisecond};function W(e){return e instanceof Date?e:"string"==typeof e?e.indexOf("T")>-1?new Date(e):new Date(e.replace(/-/g,"/")):new Date(e)}function Y(e,{locale:a="zh",threshold:l=[6e4,36e5],format:t="yyyy/MM/dd hh:mm:ss"}){if("-"===e)return e;if(!e&&0!==e)return"";const n={zh:{year:"年",month:"月",day:"天",hour:"小时",minute:"分钟",second:"秒",ago:"前",later:"后",justNow:"刚刚",soon:"马上",template:"{num}{unit}{suffix}"},en:{year:"year",month:"month",day:"day",hour:"hour",minute:"minute",second:"second",ago:"ago",later:"later",justNow:"just now",soon:"soon",template:"{num} {unit} {suffix}"}},u=n[a]||n.zh;let i,s,o=W(e),r=o.getTime()-Date.now(),d=Math.abs(r);if(d<l[0])return r<0?u.justNow:u.soon;if(d>=l[1])return function(e,a="yyyy/MM/dd hh:mm:ss"){if(!e&&0!==e)return"";const l={year:(e=W(e)).getFullYear(),month:e.getMonth()+1,day:e.getDate(),hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds(),millisecond:e.getMilliseconds()},t=/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/;let n=!0,u=a;for(;n;)n=!1,u=u.replace(t,(function(e){return n=!0,K[e](l)}));return u}(o,t);let v=u.later;r<0&&(v=u.ago,r=-r);const c=Math.floor(r/1e3),f=Math.floor(c/60),m=Math.floor(f/60),y=Math.floor(m/24),h=Math.floor(y/30),p=Math.floor(h/12);switch(!0){case p>0:i=p,s=u.year;break;case h>0:i=h,s=u.month;break;case y>0:i=y,s=u.day;break;case m>0:i=m,s=u.hour;break;case f>0:i=f,s=u.minute;break;default:i=c,s=u.second}return"en"===a&&(1===i?i="a":s+="s"),u.template.replace(/{\s*num\s*}/g,i+"").replace(/{\s*unit\s*}/g,s).replace(/{\s*suffix\s*}/g,v)}const Q=N({name:"uniDateformat",props:{date:{type:[Object,String,Number],default:()=>"-"},locale:{type:String,default:"zh"},threshold:{type:Array,default:()=>[0,0]},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:()=>({refreshMark:0}),computed:{dateShow(){return this.refreshMark,Y(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler(){this.setAutoRefresh()},immediate:!0}},methods:{refresh(){this.refreshMark++},setAutoRefresh(){clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((()=>{this.refresh()}),parseInt(this.refreshRate)))}}},[["render",function(i,s,o,r,d,v){const c=u;return e(),a(c,null,{default:l((()=>[t(n(v.dateShow),1)])),_:1})}]]),X=N({__name:"detail",setup(N){const J=i().find((e=>"pages/detail/detail"===e.route)),K=s(null),W=s(null),Y=s(),X=s(!1),Z=s(o("userinfo")),ee=s(!1),ae=s(!0),le=s(!1),te=s("将使用以下信息选座：");F((async e=>{W.value=e.chartId,await ie(e.chartId),le.value=!0,r()})),z((async()=>{Z.value=o("userinfo"),await ie(W.value)})),O((()=>{})),V((async()=>{await ie(W.value),d(),v()}));const ne=c((()=>{var e;return null==(e=Y.value)?void 0:e.administrators.includes(Z.value._id)})),ue=c((()=>{var e;return(null==(e=Y.value)?void 0:e.administrators[0])==Z.value._id})),ie=async e=>{X.value=!0;const a=f.database(),{result:l}=await a.collection("seat-chart").doc(e).get();Y.value=l.data[0],m({title:Y.value.title}),await oe(),X.value=!1},se=s([]),oe=async()=>{var e,a;if(!(null==(e=Y.value)?void 0:e.administrators))return"";const l=f.database(),{result:t}=await l.collection("user").where({_id:l.command.in(Y.value.administrators)}).field("nickName").get(),n=null==(a=Y.value)?void 0:a.administrators.map((e=>{const a=t.data.find((a=>a._id==e));if(a)return a.nickName}));se.value=n},re=()=>{var e;if(!Y.value)return!1;const a=null==(e=Y.value)?void 0:e.selectableTimeRange,l=new Date((new Date).toISOString().substring(0,10)).getTime(),t=new Date(a[0]).getTime(),n=new Date(a[1]).getTime();return t<=l&&l<=n},de=async()=>{ee.value=!1,Ce.value={value:"",title:"",placeholder:""}},ve=async(e=!0)=>{var a;await ie(W.value),e&&C({title:"刷新成功",icon:"success"}),K.value=Y.value.seats[(null==(a=K.value)?void 0:a.index)-1]},ce=async()=>{var e;ae.value=(null==(e=K.value.stuInfo)?void 0:e.id)!=Z.value._id,te.value=ae.value?"将使用以下信息选座：":"将撤销以下选座：",ee.value=!0},fe=async()=>{S({title:"加载中",mask:!0}),X.value=!0;const{result:e}=await f.callFunction({name:"select-seat",data:{chartId:W.value,seatIndex:K.value.index,userinfo:ne.value?Ce.value:Z.value,isSelectSubmit:ae.value,orderId:K.value.orderId,edit:ne.value}});ee.value=!1,200==e.code?C({title:ne.value?"修改成功":"选座成功",icon:"success"}):201==e.code?C({title:"撤销成功",icon:"success"}):C({title:e.message,icon:"error"}),ve(!1)},me=s({value:"",title:"",placeholder:""}),ye=s(!1),he=async()=>{me.value={type:"addAdmin",title:"添加管理员(仅当前课室)",placeholder:"请输入管理员学号/id",value:""},ye.value=!0,setTimeout((()=>{J.$vm.$refs.inputDialog.open()}))},pe=async()=>{me.value={type:"deleteAdmin",title:"删除管理员(仅当前课室)",placeholder:"请输入管理员学号/id",value:""},ye.value=!0,setTimeout((()=>{J.$vm.$refs.inputDialog.open()}))},_e=async(e,a)=>{me.value={type:e,title:"编辑"+e,placeholder:"请输入"+e,value:a},ye.value=!0,setTimeout((()=>{J.$vm.$refs.inputDialog.open()}))},ge={"姓名":"name","班级":"class","学号":"id"},ke=async e=>{console.log(me.value);const a=e.trim();if(0===a.length)return void C({title:"内容不能为空",icon:"none"});const{type:l}=me.value;if("addAdmin"==l)return be(a);if("deleteAdmin"==l)return we(a);if("学号"==l){X.value=!0,S({title:"加载中",mask:!0});const e=f.database(),{result:t}=await e.collection("user").doc(a).field("_id,name,class").get();if(console.log(t),r(),X.value=!1,0==t.data.length)return void C({title:"用户不存在",icon:"none"});Ce.value[ge[l]]=t.data[0]._id,Ce.value.name=t.data[0].name||"",Ce.value.class=t.data[0].class||""}else{if(!(await T({title:"提示",content:"单独修改姓名或班级不会同步到相应用户",confirmText:"继续"})).confirm)return;Ce.value[ge[l]]=a}},be=async e=>{S({title:"加载中",mask:!0}),X.value=!0;const{administrators:a}=Y.value;if(a.includes(e))return C({title:"该用户已是管理员",icon:"none"}),void(X.value=!1);const l=f.database(),{result:t}=await l.collection("user").doc(e).field("_id").get();if(0==t.data.length)return C({title:"用户不存在",icon:"none"}),void(X.value=!1);a.push(e),Y.value.administrators=a,await l.collection("seat-chart").doc(W.value).update({administrators:a}),await oe(),X.value=!1,C({title:"添加成功",icon:"success"}),ye.value=!1},we=async e=>{S({title:"加载中",mask:!0}),X.value=!0;const{administrators:a}=Y.value;if(!a.includes(e))return C({title:"该用户不是管理员",icon:"none"}),void(X.value=!1);if(e==Z.value._id)return C({title:"不能删除自己",icon:"none"}),void(X.value=!1);const l=a.indexOf(e);a.splice(l,1);const t=f.database();await t.collection("seat-chart").doc(W.value).update({administrators:a}),await oe(),Y.value.administrators=a,C({title:"删除成功",icon:"success"}),X.value=!1,ye.value=!1},Ie=()=>{x({url:"/pages/createSeatChart/createSeatChart?type=edit&chartId="+W.value})},Me=async()=>{if(!(await T({title:"提示",content:"确定删除该课室吗？"})).confirm)return;S({title:"加载中",mask:!0});const e=f.database(),{result:a}=await e.collection("seat-chart").doc(W.value).remove();console.log(a),C({title:"删除成功",icon:"success"}),setTimeout((()=>{D()}),1e3)},Ce=s({}),Se=async()=>{xe(!0)},Te=async()=>{xe(!1)},xe=async e=>{var a,l,t;ae.value=e,te.value=e?"将修改以下选座：":"将撤销以下选座：",Ce.value={id:(null==(a=K.value.stuInfo)?void 0:a.id)||Z.value._id,name:(null==(l=K.value.stuInfo)?void 0:l.name)||Z.value.name,class:(null==(t=K.value.stuInfo)?void 0:t.class)||Z.value.class},ee.value=!0},De=e=>{console.log(e),j({data:e,showToast:!0,success:function(){d()}})},je=async()=>{S({title:"加载中",mask:!0}),X.value=!0,f.callFunction({name:"exportExcel",data:{chartId:W.value},success:function(e){e.result.fileID&&f.getTempFileURL({fileList:[e.result.fileID],success:function(e){if(e.fileList.length>0){const a=e.fileList[0].tempFileURL;R({url:a,success:async function(e){X.value=!1,r(),200===e.statusCode&&L({filePath:e.tempFilePath,showMenu:!0})}})}}})},fail:function(e){console.error(e),r(),X.value=!1}})};return(i,s)=>{const o=p,r=U(y("uni-section"),A),d=u,v=U(y("uni-list-item"),E),c=$,f=U(y("uni-collapse-item"),H),m=U(y("uni-collapse"),P),C=U(y("uni-card"),B),S=U(y("uni-dateformat"),Q),T=U(y("uni-popup-dialog"),q),x=U(y("uni-popup"),G);return e(),a(o,{class:"contaioner",style:h([{transition:"all 1s ease",opacity:"0"},null!=Y.value?"transition: all .5s ease; opacity: 1":""])},{default:l((()=>[ne.value?(e(),a(o,{key:0,class:"admin-tag"},{default:l((()=>[t("管理员")])),_:1})):_("",!0),g(C,{padding:"0"},{default:l((()=>[g(m,null,{default:l((()=>[g(f,{open:null!=Y.value&&!X.value,titleBorder:"none"},{title:l((()=>[g(r,{title:"课室信息",type:"line"})])),default:l((()=>[g(v,{title:"课室",onLongpress:s[0]||(s[0]=e=>{var a;return De(null==(a=Y.value)?void 0:a.title)})},{footer:l((()=>[g(d,null,{default:l((()=>{var e;return[t(n(null==(e=Y.value)?void 0:e.title),1)]})),_:1})])),_:1}),g(v,{title:"备注",onLongpress:s[1]||(s[1]=e=>{var a;return De(null==(a=Y.value)?void 0:a.note)})},{footer:l((()=>[g(d,null,{default:l((()=>{var e;return[t(n(null==(e=Y.value)?void 0:e.note),1)]})),_:1})])),_:1}),g(v,{title:"选座时间",onLongpress:s[2]||(s[2]=e=>{var a;return De(null==(a=Y.value)?void 0:a.selectableTimeRange.join(" 至 "))})},{footer:l((()=>[g(d,{"user-select":""},{default:l((()=>{var e;return[t(n(null==(e=Y.value)?void 0:e.selectableTimeRange.join(" 至 ")),1)]})),_:1})])),_:1}),g(v,{title:"生效时间",onLongpress:s[3]||(s[3]=e=>{var a;return De(null==(a=Y.value)?void 0:a.effectiveTimeRange.join(" 至 "))})},{footer:l((()=>[g(d,null,{default:l((()=>{var e;return[t(n(null==(e=Y.value)?void 0:e.effectiveTimeRange.join(" 至 ")),1)]})),_:1})])),_:1}),ne.value?(e(),a(o,{key:0,class:"edit-chart-btns"},{default:l((()=>[g(c,{class:"btn",onClick:Ie,type:"primary",loading:X.value},{default:l((()=>[t(" 编辑课室 ")])),_:1},8,["loading"]),ue.value?(e(),a(c,{key:0,class:"btn",onClick:Me,type:"warn",loading:X.value},{default:l((()=>[t(" 删除课室 ")])),_:1},8,["loading"])):_("",!0)])),_:1})):_("",!0),ne.value?(e(),a(o,{key:1,class:"edit-chart-btns"},{default:l((()=>[g(c,{class:"btn",onClick:je,type:"primary",loading:X.value},{default:l((()=>[t("导出excel")])),_:1},8,["loading"])])),_:1})):_("",!0)])),_:1},8,["open"])])),_:1})])),_:1}),g(C,{padding:"0"},{default:l((()=>[g(m,null,{default:l((()=>[g(f,{open:null!=Y.value&&!X.value,titleBorder:"none"},{title:l((()=>[g(r,{title:"课室管理员",type:"line"})])),default:l((()=>{var u;return[(e(!0),k(w,null,b(null==(u=Y.value)?void 0:u.administrators,((u,i)=>(e(),a(v,{class:"admin-item",ellipsis:"1",title:se.value[i],key:i},{header:l((()=>[0==i?(e(),a(o,{key:0,class:"admin-item-tag"},{default:l((()=>[t("主")])),_:1})):_("",!0)])),footer:l((()=>[g(d,{onLongpress:e=>De(u),"user-select":""},{default:l((()=>[t(n(u),1)])),_:2},1032,["onLongpress"])])),_:2},1032,["title"])))),128)),ue.value?(e(),a(o,{key:0,class:"edit-chart-btns"},{default:l((()=>[g(c,{class:"btn",onClick:he,type:"primary",loading:X.value},{default:l((()=>[t("添加管理员")])),_:1},8,["loading"]),g(c,{class:"btn",onClick:pe,type:"warn",loading:X.value},{default:l((()=>[t("删除管理员")])),_:1},8,["loading"])])),_:1})):_("",!0)]})),_:1},8,["open"])])),_:1})])),_:1}),g(C,{padding:"0"},{title:l((()=>[g(r,{title:"座位表",type:"line"})])),default:l((()=>{var u,i;return[g(o,{class:"seatTable",style:h(`--col:${null==(u=Y.value)?void 0:u.col};--row:${null==(i=Y.value)?void 0:i.row};`)},{default:l((()=>{var u;return[(e(!0),k(w,null,b(null==(u=Y.value)?void 0:u.seats,((u,i)=>{var s,r,v;return e(),a(o,{key:i,class:M(["seat",{hide:2==u.status,selected:u.index==(null==(s=K.value)?void 0:s.index)}]),style:h((null==(r=null==u?void 0:u.stuInfo)?void 0:r.id)!=Z.value._id?`background-image:url(${null==(v=u.stuInfo)?void 0:v.avatar});`:"background:#333;"),onClick:()=>K.value=u},{default:l((()=>[g(d,null,{default:l((()=>{var e;return[t(n(u.stuInfo?(null==(e=null==u?void 0:u.stuInfo)?void 0:e.id)!=Z.value._id?"":"你":"空"),1)]})),_:2},1024)])),_:2},1032,["class","style","onClick"])})),128))]})),_:1},8,["style"]),g(c,{class:"refresh-btn",onClick:ve,type:"default",size:"mini",loading:X.value},{default:l((()=>[t(" 刷新 ")])),_:1},8,["loading"])]})),_:1}),K.value?(e(),a(C,{key:1,class:"order-card",padding:"0"},{title:l((()=>[g(r,{title:"座位信息",type:"line"})])),default:l((()=>[g(o,{class:"detail"},{default:l((()=>{var u,i;return[g(v,{title:"座位"},{footer:l((()=>[g(d,null,{default:l((()=>{var e,a;return[t("第"+n(null==(e=K.value)?void 0:e.x)+"列 第"+n(null==(a=K.value)?void 0:a.y)+"行",1)]})),_:1})])),_:1}),(null==(u=K.value)?void 0:u.stuInfo)&&(Y.value.stuInfoVisible||1==Z.value.type)?(e(),a(o,{key:0},{default:l((()=>[g(v,{title:"姓名"},{footer:l((()=>[g(d,null,{default:l((()=>{var e,a;return[t(n(null==(a=null==(e=K.value)?void 0:e.stuInfo)?void 0:a.name),1)]})),_:1})])),_:1}),g(v,{title:"学号"},{footer:l((()=>[g(d,null,{default:l((()=>{var e,a;return[t(n(null==(a=null==(e=K.value)?void 0:e.stuInfo)?void 0:a.id),1)]})),_:1})])),_:1}),g(v,{title:"班级"},{footer:l((()=>[g(d,null,{default:l((()=>{var e,a;return[t(n(null==(a=null==(e=K.value)?void 0:e.stuInfo)?void 0:a.class),1)]})),_:1})])),_:1})])),_:1})):_("",!0),(null==(i=K.value)?void 0:i.selectTime)?(e(),a(v,{key:1,title:"选择时间"},{footer:l((()=>{var e;return[g(S,{date:new Date(null==(e=K.value)?void 0:e.selectTime)-3e4,format:"M月d日 h时m分",threshold:[0,36e5]},null,8,["date"])]})),_:1})):_("",!0)]})),_:1})])),_:1})):_("",!0),ne.value?(e(),a(o,{key:2,class:"btns"},{default:l((()=>{var e;return[g(c,{class:"btn",disabled:!K.value,onClick:Se,type:"primary",loading:X.value},{default:l((()=>[t(" 编辑选座 ")])),_:1},8,["disabled","loading"]),g(c,{class:"btn",disabled:3!=(null==(e=K.value)?void 0:e.status),onClick:Te,type:"warn",loading:X.value},{default:l((()=>[t(" 删除选座 ")])),_:1},8,["disabled","loading"])]})),_:1})):(e(),a(o,{key:3,class:"btns"},{default:l((()=>{var u,i,s,o,r;return[re()?(e(),a(c,{key:0,class:"btn",onClick:ce,disabled:3==(null==(u=K.value)?void 0:u.status)&&(null==(s=null==(i=K.value)?void 0:i.stuInfo)?void 0:s.id)!=Z.value._id||!K.value,type:(null==(r=null==(o=K.value)?void 0:o.stuInfo)?void 0:r.id)==Z.value._id?"warn":"primary",loading:X.value},{default:l((()=>{var e,a,l;return[t(n((null==(a=null==(e=K.value)?void 0:e.stuInfo)?void 0:a.id)==Z.value._id?"撤销选座":3==(null==(l=K.value)?void 0:l.status)?"已被选择":"选择座位"),1)]})),_:1},8,["disabled","type","loading"])):_("",!0),re()?_("",!0):(e(),a(c,{key:1,class:"btn",disabled:""},{default:l((()=>[t("未开放或选座时间已过")])),_:1}))]})),_:1})),g(o,{onClick:de,class:M(["drawer",{hide:!ee.value}])},{default:l((()=>[g(o,{onClick:s[7]||(s[7]=I((()=>{}),["stop","prevent"])),class:"drawer-content"},{default:l((()=>[g(o,{class:"title"},{default:l((()=>[t(n(te.value),1)])),_:1}),g(C,{class:"roomInfo"},{title:l((()=>[g(r,{title:"课室信息",type:"line"})])),default:l((()=>[g(v,{title:"课室"},{footer:l((()=>[g(d,null,{default:l((()=>{var e;return[t(n(null==(e=Y.value)?void 0:e.title),1)]})),_:1})])),_:1}),g(v,{title:"座位"},{footer:l((()=>[g(d,null,{default:l((()=>{var e,a;return[t("第"+n(null==(e=K.value)?void 0:e.x)+"列 第"+n(null==(a=K.value)?void 0:a.y)+"行",1)]})),_:1})])),_:1}),g(v,{title:"生效时间"},{footer:l((()=>[g(d,null,{default:l((()=>{var e;return[t(n(null==(e=Y.value)?void 0:e.effectiveTimeRange.join(" 至 ")),1)]})),_:1})])),_:1})])),_:1}),g(C,{padding:"0"},{title:l((()=>[g(r,{title:"学生信息",type:"line"})])),default:l((()=>[g(v,{title:"学号",onClick:s[4]||(s[4]=e=>_e("学号",Ce.value.id)),link:ne.value&&ae.value},{footer:l((()=>[g(d,null,{default:l((()=>[t(n(ne.value?Ce.value.id:Z.value._id),1)])),_:1})])),_:1},8,["link"]),g(v,{title:"姓名",onClick:s[5]||(s[5]=e=>_e("姓名",Ce.value.name)),link:ne.value&&ae.value},{footer:l((()=>[g(d,null,{default:l((()=>[t(n(ne.value?Ce.value.name:Z.value.name),1)])),_:1})])),_:1},8,["link"]),g(v,{title:"班级",onClick:s[6]||(s[6]=e=>_e("班级",Ce.value.class)),link:ne.value&&ae.value},{footer:l((()=>[g(d,null,{default:l((()=>[t(n(ne.value?Ce.value.class:Z.value.class),1)])),_:1})])),_:1},8,["link"])])),_:1}),g(c,{onClick:fe,type:ae.value?"primary":"warn",loading:X.value},{default:l((()=>[t(" 确认 ")])),_:1},8,["type","loading"])])),_:1})])),_:1},8,["class"]),ye.value?(e(),a(x,{key:4,ref:"inputDialog",type:"dialog"},{default:l((()=>[g(T,{ref:"inputClose",mode:"input",title:me.value.title,placeholder:me.value.placeholder,modelValue:me.value.value,"onUpdate:modelValue":s[8]||(s[8]=e=>me.value.value=e),onConfirm:ke,onCancel:s[9]||(s[9]=e=>ye.value=!1)},null,8,["title","placeholder","modelValue"])])),_:1},512)):_("",!0)])),_:1},8,["style"])}}},[["__scopeId","data-v-944e73a1"]]);export{X as default};