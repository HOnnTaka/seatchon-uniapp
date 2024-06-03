import{q as e,s as l,v as a,r as t,o,c as u,w as d,a as i,i as s,b as n,h as r,t as c,d as p,L as m,y as v,C as f,N as w,W as g,D as y,J as _,O as h,P as b,B as V,A as k,k as $,j as U,M as x}from"./index-C_Y7Ajtv.js";import{_ as C}from"./uni-section.Ctt9htVn.js";import{_ as q,b as F,c as T,o as P,f as A,r as M,e as N}from"./uni-card.DsU4cJID.js";import{_ as R}from"./uni-list-item.BrZZhRWY.js";import{_ as L,a as j,b as B,c as D}from"./uni-popup.CziwDEKg.js";import{_ as W,a as Z,b as I}from"./uni-forms.MmiOqp-T.js";const O=q({__name:"user",setup(q){const O=e().find((e=>"pages/user/user"===e.route)),S=l(a("userinfo")),K=l(!1),z=l(!1);F((async()=>{setTimeout((()=>{K.value=!0}),100)})),T((async()=>{K.value=!1}));const J=e=>{console.log(e),m({data:e,showToast:!0,success:function(){v()}})},E=l({id:"",pwd:"",adminpwd:"",newpwd:"",newpwd2:""}),G=l({id:"",name:"",class:""}),H=l({id:""});P((()=>{}));const Q={id:{rules:[{required:!0,errorMessage:"请输入学号/id"}]},pwd:{rules:[{required:!0,errorMessage:"请输入密码"}]},adminpwd:{rules:[{required:!0,errorMessage:"请输入管理密码"}]},newpwd:{rules:[{required:!0,errorMessage:"请输入新密码"},{validateFunction:function(e,l,a,t){/^[a-zA-Z0-9]{8,20}$/.test(l)||t("密码必须为8-20位字母、数字")}}]},newpwd2:{rules:[{required:!0,errorMessage:"请确认新密码"},{validateFunction:function(e,l,a,t){l!=E.value.newpwd&&t("两次密码输入不一致")}}]}},X={name:{rules:[{required:!0,errorMessage:"请输入姓名"}]},class:{rules:[{required:!0,errorMessage:"请输入班级"}]}};A((async()=>{var e,l,a,t,o;null==(e=O.$vm.$refs.form)||e.setRules(Q),null==(l=O.$vm.$refs.form1)||l.setRules(Q),null==(a=O.$vm.$refs.adminform)||a.setRules(Q),null==(t=O.$vm.$refs.addStudentForm)||t.setRules(X),null==(o=O.$vm.$refs.resetPwdForm)||o.setRules(Q)}));const Y=async e=>{f({title:"加载中",mask:!0}),z.value=!0;try{let a=await O.$vm.$refs[e].validate();if("adminform"==e){try{const{code:e}=await w(),{result:l}=await g.callFunction({name:"login",data:{adminpwd:a.adminpwd,code:e}});y(),console.log(l),_({title:l.message,icon:1==l.code?"error":"success"}),0==l.code&&(h("userinfo",l.userinfo),b({url:"/pages/user/user"}))}catch(l){_({title:"请使用微信小程序打开",icon:"none",duration:2e3}),z.value=!1}return}S.value&&(a.id=S.value._id);try{console.log(a,S.value);const{result:e}=await g.callFunction({name:"login",data:a});y(),console.log(e),_({title:e.message,icon:1==e.code?"error":"success"}),1!=e.code&&(3!=e.code&&(console.log(e.userinfo),S.value=e.userinfo,h("userinfo",e.userinfo),h("token",e.token),V({url:"/pages/user/user"}),setTimeout((()=>{K.value=!0})),2==e.code&&_({title:"请尽快修改默认密码",icon:"none",duration:4e3})),E.value={id:"",pwd:"",adminpwd:"",newpwd:"",newpwd2:""})}catch(l){console.log(l),_({title:l.message,icon:"none",duration:2e3}),z.value=!1}}catch(l){return console.log(l),_({title:l[0].errorMessage,icon:"error",duration:2e3}),y(),void(z.value=!1)}z.value=!1},ee=async()=>{z.value=!0;const e=await g.callFunction({name:"logout"});console.log(e),e&&(h("userinfo",""),S.value="",_({title:"退出登录成功",icon:"success"}),z.value=!1)},le=l({value:"",title:"",placeholder:""}),ae=async(e,l)=>{le.value={type:e,title:"编辑"+e,placeholder:"请输入"+e,value:l},se.value=!0,setTimeout((()=>{O.$vm.$refs.inputDialog.open()}))},te={"昵称":"nickName","姓名":"name","班级":"class"},oe=async e=>{const l=e.trim();if(0===l.length)return void _({title:"内容不能为空",icon:"none"});const{type:a}=le.value,{result:t}=await g.database().collection("user").doc(S.value._id).update({[`${te[a]}`]:l});if(0==t.errCode)return"昵称"==a?S.value.nickName=l:S.value[te[a].replace("stuInfo.","")]=l,h("userinfo",S.value),le.value={},_({title:"修改成功",icon:"success"}),se.value=!0,void O.$vm.$refs.inputDialog.close();_({title:"修改失败",icon:"none"})},ue=l(0),de=async()=>{if(ue.value++,console.log(ue.value),ue.value>=5){console.log(S.value.type);const{result:e}=await g.database().collection("user").doc(S.value._id).update({type:0==S.value.type?1:0});console.log(e),0==e.errCode&&(S.value.type=0==S.value.type?1:0,h("userinfo",S.value),b({url:"/pages/index/index"}))}},ie=async e=>{const l=e.detail.avatarUrl;f({title:"上传中",mask:!0}),z.value=!0;try{const{fileID:e}=await g.uploadFile({filePath:l,cloudPath:"avatar/"+S.value._id+".png",fileType:"image"}),{fileList:a}=await g.getTempFileURL({fileList:[e]}),{result:t}=await g.database().collection("user").doc(S.value._id).update({avatarUrl:a[0].tempFileURL});if(t.updated>0)return S.value.avatarUrl=a[0].tempFileURL,h("userinfo",S.value),_({title:"上传成功",icon:"success"}),void(z.value=!1)}catch(a){console.log(a)}z.value=!1,_({title:"上传失败",icon:"none"})},se=l(!1),ne=async(e=0)=>{f({title:"加载中",mask:!0}),z.value=!0;try{let l=0==e?await O.$vm.$refs.addStudentForm.validate():await O.$vm.$refs.addAdminForm.validate();""!=l.id&&(l._id=l.id),delete l.id,console.log(l);const a=g.database(),{result:t}=await a.collection("user").doc(l._id).field("_id").get();if(t.data.length>0)return _({title:"该id已存在",icon:"none"}),void(z.value=!1);const{result:o}=await a.collection("user").add({...l,avatarUrl:"",pwd:"$2a$10$WOW5NsssssCKafZZNDt9PO54RS1ZgoulTWhPl/1c5TTTnUI/w34Pq",type:e});if(console.log(o.id),o.id){const{result:e}=await a.collection("user").doc(o.id).update({avatarUrl:`https://api.multiavatar.com/${o.id}.png`,nickName:`微信管理员${o.id}`});console.log(e);const l=await k({title:"添加成功",content:"id:"+o.id,showCancel:!0,confirmText:"复制"});G.value={},l.confirm&&m({data:o.id,showToast:!0})}}catch(l){console.log(l),_({title:l[0].errorMessage,icon:"none"})}z.value=!1,y()},re=async e=>{f({title:"加载中",mask:!0}),z.value=!0;try{let e=await O.$vm.$refs.resetPwdForm.validate();console.log(e);const l=g.database(),{result:a}=await l.collection("user").doc(e.id).update({pwd:"$2a$10$WOW5NsssssCKafZZNDt9PO54RS1ZgoulTWhPl/1c5TTTnUI/w34Pq"});if(a.updated>0)return _({title:"重置成功",icon:"success"}),void(z.value=!1)}catch(l){console.log(l),_({title:l[0].errorMessage,icon:"none"})}z.value=!1,y()};return(e,l)=>{const a=M(t("uni-section"),C),m=$,v=U,f=M(t("uni-list-item"),R),w=x,g=s,y=M(t("uni-collapse-item"),L),_=M(t("uni-collapse"),j),h=M(t("uni-card"),N),b=M(t("uni-easyinput"),W),V=M(t("uni-forms-item"),Z),k=M(t("uni-forms"),I),q=M(t("uni-popup-dialog"),B),F=M(t("uni-popup"),D);return o(),u(g,{class:"container",style:i([{transition:"all 1s ease",opacity:"0"},K.value?"transition: all .5s ease; opacity: 1":""])},{default:d((()=>[S.value?(o(),u(h,{key:0,padding:"0"},{default:d((()=>[n(_,null,{default:d((()=>[n(y,{open:K.value,titleBorder:"none"},{title:d((()=>[n(a,{title:"我的信息",type:"line"})])),default:d((()=>[n(w,{onLongpress:de,onChooseavatar:ie,"open-type":"chooseAvatar","hover-class":"hover",class:"edit-avatar"},{default:d((()=>[n(f,{clickable:"",showArrow:""},{header:d((()=>[n(m,{class:"title"},{default:d((()=>[r("头像")])),_:1})])),footer:d((()=>[n(v,{src:S.value.avatarUrl},null,8,["src"])])),_:1})])),_:1}),n(f,{clickable:"",onClick:l[0]||(l[0]=e=>ae("昵称",S.value.nickName)),showArrow:"",title:"昵称"},{footer:d((()=>[n(g,{class:"title"},{default:d((()=>[r(c(S.value.nickName),1)])),_:1})])),_:1}),n(f,{clickable:1==S.value.type,showArrow:1==S.value.type,onClick:l[1]||(l[1]=e=>ae("姓名",S.value.name)),onLongpress:l[2]||(l[2]=e=>J(S.value.name)),title:"姓名"},{footer:d((()=>[n(m,{"user-select":"",selectable:""},{default:d((()=>[r(c(S.value.name),1)])),_:1})])),_:1},8,["clickable","showArrow"]),n(f,{onLongpress:l[3]||(l[3]=e=>J(S.value._id)),title:1==S.value.type?"学号/id":"学号"},{footer:d((()=>[n(m,{"user-select":"",selectable:""},{default:d((()=>[r(c(S.value._id),1)])),_:1})])),_:1},8,["title"]),n(f,{clickable:1==S.value.type,showArrow:1==S.value.type,onClick:l[4]||(l[4]=e=>ae("班级",S.value.class)),title:"班级"},{footer:d((()=>[n(m,{"user-select":"",selectable:""},{default:d((()=>[r(c(S.value.class),1)])),_:1})])),_:1},8,["clickable","showArrow"])])),_:1},8,["open"])])),_:1})])),_:1})):p("",!0),S.value?p("",!0):(o(),u(h,{key:1,padding:"0"},{title:d((()=>[n(a,{title:"登录",type:"line"})])),default:d((()=>[n(g,{style:{padding:"10px"}},{default:d((()=>[n(k,{ref:"form",modelValue:E.value},{default:d((()=>[n(V,{label:"账号",required:"",name:"id"},{default:d((()=>[n(b,{modelValue:E.value.id,"onUpdate:modelValue":l[5]||(l[5]=e=>E.value.id=e),placeholder:"请输入账号/学号"},null,8,["modelValue"])])),_:1}),n(V,{label:"密码",required:"",name:"pwd"},{default:d((()=>[n(b,{modelValue:E.value.pwd,"onUpdate:modelValue":l[6]||(l[6]=e=>E.value.pwd=e),type:"password",placeholder:"请输入密码"},null,8,["modelValue"])])),_:1})])),_:1},8,["modelValue"]),n(w,{loading:z.value,type:"primary",onClick:l[7]||(l[7]=e=>Y("form"))},{default:d((()=>[r("登录")])),_:1},8,["loading"])])),_:1})])),_:1})),S.value?(o(),u(h,{key:2,padding:"0"},{default:d((()=>[n(_,null,{default:d((()=>[n(y,{titleBorder:"none"},{title:d((()=>[n(a,{title:"修改密码",type:"line"})])),default:d((()=>[n(g,{style:{padding:"10px"}},{default:d((()=>[n(k,{ref:"form1",modelValue:E.value,"label-width":"80px"},{default:d((()=>[n(V,{label:"旧密码",required:"",name:"pwd"},{default:d((()=>[n(b,{trim:"both",modelValue:E.value.pwd,"onUpdate:modelValue":l[8]||(l[8]=e=>E.value.pwd=e),type:"password",placeholder:"请输入密码"},null,8,["modelValue"])])),_:1}),n(V,{label:"新密码",required:"",name:"newpwd"},{default:d((()=>[n(b,{trim:"both",modelValue:E.value.newpwd,"onUpdate:modelValue":l[9]||(l[9]=e=>E.value.newpwd=e),type:"password",placeholder:"请输入新密码"},null,8,["modelValue"])])),_:1}),n(V,{label:"确认密码",required:"",name:"newpwd2"},{default:d((()=>[n(b,{trim:"both",modelValue:E.value.newpwd2,"onUpdate:modelValue":l[10]||(l[10]=e=>E.value.newpwd2=e),type:"password",placeholder:"请确认新密码"},null,8,["modelValue"])])),_:1})])),_:1},8,["modelValue"]),n(w,{loading:z.value,type:"primary",onClick:l[11]||(l[11]=e=>Y("form1"))},{default:d((()=>[r("确认")])),_:1},8,["loading"])])),_:1})])),_:1})])),_:1})])),_:1})):p("",!0),1==S.value.type?(o(),u(h,{key:3,padding:"0"},{default:d((()=>[n(_,null,{default:d((()=>[n(y,{titleBorder:"none"},{title:d((()=>[n(a,{title:"添加学生（管理员）",type:"line"})])),default:d((()=>[n(g,{style:{padding:"10px"}},{default:d((()=>[n(k,{ref:"addStudentForm",modelValue:G.value,"label-width":"80px"},{default:d((()=>[n(V,{label:"学号/id",name:"id"},{default:d((()=>[n(b,{trim:"both",modelValue:G.value.id,"onUpdate:modelValue":l[12]||(l[12]=e=>G.value.id=e),placeholder:"输入学号/id（留空自动生成id）"},null,8,["modelValue"])])),_:1}),n(V,{label:"姓名",required:"",name:"name"},{default:d((()=>[n(b,{trim:"both",modelValue:G.value.name,"onUpdate:modelValue":l[13]||(l[13]=e=>G.value.name=e),placeholder:"请输入姓名"},null,8,["modelValue"])])),_:1}),n(V,{label:"班级",required:"",name:"class"},{default:d((()=>[n(b,{trim:"both",modelValue:G.value.class,"onUpdate:modelValue":l[14]||(l[14]=e=>G.value.class=e),placeholder:"请输入班级"},null,8,["modelValue"])])),_:1}),n(g,{style:{"margin-bottom":"5px","text-align":"center",color:"#ccc"}},{default:d((()=>[r("初始密码为123456")])),_:1})])),_:1},8,["modelValue"]),n(w,{loading:z.value,type:"primary",onClick:ne},{default:d((()=>[r("确认")])),_:1},8,["loading"])])),_:1})])),_:1})])),_:1})])),_:1})):p("",!0),1==S.value.type?(o(),u(h,{key:4,padding:"0"},{default:d((()=>[n(_,null,{default:d((()=>[n(y,{titleBorder:"none"},{title:d((()=>[n(a,{title:"重置密码（管理员）",type:"line"})])),default:d((()=>[n(g,{style:{padding:"10px"}},{default:d((()=>[n(k,{ref:"resetPwdForm",modelValue:H.value,"label-width":"80px"},{default:d((()=>[n(V,{required:"",label:"学号/id",name:"id"},{default:d((()=>[n(b,{trim:"both",modelValue:H.value.id,"onUpdate:modelValue":l[15]||(l[15]=e=>H.value.id=e),placeholder:"输入学号/id"},null,8,["modelValue"])])),_:1}),n(g,{style:{"margin-bottom":"5px","text-align":"center",color:"#ccc"}},{default:d((()=>[r("初始密码为123456")])),_:1})])),_:1},8,["modelValue"]),n(w,{loading:z.value,type:"primary",onClick:re},{default:d((()=>[r("确认")])),_:1},8,["loading"])])),_:1})])),_:1})])),_:1})])),_:1})):p("",!0),1==S.value.type?(o(),u(h,{key:5,padding:"0"},{default:d((()=>[n(_,null,{default:d((()=>[n(y,{titleBorder:"none"},{title:d((()=>[n(a,{title:"添加全局管理员（管理员）",type:"line"})])),default:d((()=>[n(g,{style:{padding:"10px"}},{default:d((()=>[n(k,{ref:"addAdminForm",modelValue:G.value,"label-width":"80px"},{default:d((()=>[n(V,{label:"id",name:"id"},{default:d((()=>[n(b,{trim:"both",modelValue:G.value.id,"onUpdate:modelValue":l[16]||(l[16]=e=>G.value.id=e),placeholder:"输入学号/id（留空自动生成id）"},null,8,["modelValue"])])),_:1}),n(g,{style:{"margin-bottom":"5px","text-align":"center",color:"#ccc"}},{default:d((()=>[r("初始密码为123456")])),_:1})])),_:1},8,["modelValue"]),n(w,{loading:z.value,type:"primary",onClick:l[17]||(l[17]=e=>ne(1))},{default:d((()=>[r("确认")])),_:1},8,["loading"])])),_:1})])),_:1})])),_:1})])),_:1})):p("",!0),se.value?(o(),u(F,{key:6,ref:"inputDialog",type:"dialog"},{default:d((()=>[n(q,{ref:"inputClose",mode:"input",title:le.value.title,placeholder:le.value.placeholder,modelValue:le.value.value,"onUpdate:modelValue":l[18]||(l[18]=e=>le.value.value=e),onConfirm:oe,onCancel:l[19]||(l[19]=e=>se.value=!1)},null,8,["title","placeholder","modelValue"])])),_:1},512)):p("",!0),S.value?(o(),u(w,{key:7,loading:z.value,class:"uni-mx-5",type:"warn",onClick:ee},{default:d((()=>[r("退出登录")])),_:1},8,["loading"])):p("",!0),n(g,{class:"edgeInsetBottom"})])),_:1},8,["style"])}}},[["__scopeId","data-v-ff675c80"]]);export{O as default};