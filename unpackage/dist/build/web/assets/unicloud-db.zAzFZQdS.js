import{o as t,c as e,w as o,d as i,p as n,i as a,l as s,a8 as l,C as r,W as c,J as d,A as u,D as h,a9 as p}from"./index-C_Y7Ajtv.js";import{_ as g,s as m,g as f}from"./uni-card.DsU4cJID.js";const y=g({name:"uniList","mp-weixin":{options:{multipleSlots:!1}},props:{stackFromEnd:{type:Boolean,default:!1},enableBackToTop:{type:[Boolean,String],default:!1},scrollY:{type:[Boolean,String],default:!1},border:{type:Boolean,default:!0},renderReverse:{type:Boolean,default:!1}},created(){this.firstChildAppend=!1},methods:{loadMore(t){this.$emit("scrolltolower")},scroll(t){this.$emit("scroll",t)}}},[["render",function(s,l,r,c,d,u){const h=a;return t(),e(h,{class:"uni-list uni-border-top-bottom"},{default:o((()=>[r.border?(t(),e(h,{key:0,class:"uni-list--border-top"})):i("",!0),n(s.$slots,"default",{},void 0,!0),r.border?(t(),e(h,{key:1,class:"uni-list--border-bottom"})):i("",!0)])),_:3})}],["__scopeId","data-v-c1d7c358"]]),C={en:{"uniCloud.component.add.success":"Success","uniCloud.component.update.success":"Success","uniCloud.component.remove.showModal.title":"Tips","uniCloud.component.remove.showModal.content":"是否删除该数据"},es:{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"},fr:{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"},"zh-Hans":{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"},"zh-Hant":{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否刪除數據"}},v=Array.isArray,{t:_}=s(C),b="load",S="error",w="add",D="replace",L="auto",x="manual",M=["pageCurrent","pageSize","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"];const I=g({name:"UniClouddb",setup(t){const e=t.ssrKey?t.getone?m(void 0,t.ssrKey):f([],t.ssrKey):t.getone?m(void 0,"fxaMEh+OfmRaqpHa8R3mDg=="):f([],"iCFSBS7hLGX3mmZ8xA4DLw=="),o=p();return l((()=>{e.value&&0!==e.value.length||t.manual||t.loadtime!==L||o.proxy.loadData()})),{dataList:e}},async serverPrefetch(){if(!this.manual&&this.loadtime===L)return this.loadData()},props:{options:{type:[Object,Array],default:()=>({})},spaceInfo:{type:Object,default:()=>({})},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1},ssrKey:{type:[String,Number],default:""}},data:()=>({loading:!1,hasMore:!1,paginationInternal:{},errorMessage:""}),computed:{collectionArgs(){return v(this.collection)?this.collection:[this.collection]},isLookup(){return v(this.collection)&&this.collection.length>1||"string"==typeof this.collection&&this.collection.indexOf(",")>-1},mainCollection(){if("string"==typeof this.collection)return this.collection.split(",")[0];return JSON.parse(JSON.stringify(this.collection[0])).$db[0].$param[0]}},created(){this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((()=>{var t=[];return M.forEach((e=>{t.push(this[e])})),t}),((t,e)=>{if(this.paginationInternal.size=this.pageSize,t[0]!==e[0]&&(this.paginationInternal.current=this.pageCurrent),this.loadtime===x)return;let o=!1;for(let i=2;i<t.length;i++)if(t[i]!==e[i]){o=!0;break}o&&(this.clear(),this.reset()),this._execLoadData()}))},methods:{loadData(t,e){let o=null,i=!1;return"object"==typeof t?(t.clear&&(this.pageData===D?this.clear():i=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"==typeof e&&(o=e)):"function"==typeof t&&(o=t),this._execLoadData(o,i)},loadMore(){this._isEnded||this.loading||(this.pageData===w&&this.paginationInternal.current++,this._execLoadData())},refresh(){this.clear(),this._execLoadData()},clear(){this._isEnded=!1,this.dataList=[]},reset(){this.paginationInternal.current=1},add(t,{action:e,showToast:o=!0,toastTitle:i,success:n,fail:a,complete:s,needConfirm:l=!0,needLoading:p=!0,loadingTitle:g=""}={}){p&&r({title:g});let m=c.database(this.spaceInfo);e&&(m=m.action(e)),m.collection(this.mainCollection).add(t).then((t=>{n&&n(t),o&&d({title:i||_("uniCloud.component.add.success")})})).catch((t=>{a&&a(t),l&&u({content:t.message,showCancel:!1})})).finally((()=>{p&&h(),s&&s()}))},remove(t,{action:e,success:o,fail:i,complete:n,confirmTitle:a,confirmContent:s,needConfirm:l=!0,needLoading:r=!0,loadingTitle:c=""}={}){t&&t.length&&(l?u({title:a||_("uniCloud.component.remove.showModal.title"),content:s||_("uniCloud.component.remove.showModal.content"),showCancel:!0,success:a=>{a.confirm&&this._execRemove(t,e,o,i,n,l,r,c)}}):this._execRemove(t,e,o,i,n,l,r,c))},update(t,e,{action:o,showToast:i=!0,toastTitle:n,success:a,fail:s,complete:l,needConfirm:p=!0,needLoading:g=!0,loadingTitle:m=""}={}){g&&r({title:m});let f=c.database(this.spaceInfo);return o&&(f=f.action(o)),f.collection(this.mainCollection).doc(t).update(e).then((t=>{a&&a(t),i&&d({title:n||_("uniCloud.component.update.success")})})).catch((t=>{s&&s(t),p&&u({content:t.message,showCancel:!1})})).finally((()=>{g&&h(),l&&l()}))},getTemp(t=!0){let e=c.database(this.spaceInfo);this.action&&(e=e.action(this.action)),e=e.collection(...this.collectionArgs),this.foreignKey&&(e=e.foreignKey(this.foreignKey)),this.where&&Object.keys(this.where).length&&(e=e.where(this.where)),this.field&&(e=e.field(this.field)),this.groupby&&(e=e.groupBy(this.groupby)),this.groupField&&(e=e.groupField(this.groupField)),!0===this.distinct&&(e=e.distinct()),this.orderby&&(e=e.orderBy(this.orderby));const{current:o,size:i}=this.paginationInternal,n={};this.getcount&&(n.getCount=this.getcount);const a={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(n.getTree=a),this.gettreepath&&(n.getTreePath=a),e=e.skip(i*(o-1)).limit(i),t?(e=e.getTemp(n),e.udb=this):e=e.get(n),e},setResult(t){0===t.code?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData(t,e){if(!this.loading)return this.loading=!0,this.errorMessage="",this._getExec().then((o=>{this.loading=!1,this._execLoadDataSuccess(o.result,t,e)})).catch((e=>{this.loading=!1,this._execLoadDataFail(e,t)}))},_execLoadDataSuccess(t,e,o){const{data:i,count:n}=t;this._isEnded=void 0!==n?this.paginationInternal.current*this.paginationInternal.size>=n:i.length<this.pageSize,this.hasMore=!this._isEnded;const a=this.getone?i.length?i[0]:void 0:i;this.getcount&&(this.paginationInternal.count=n),e&&e(a,this._isEnded,this.paginationInternal),this._dispatchEvent(b,a),this.getone||this.pageData===D||o?this.dataList=a:this.dataList.push(...a)},_execLoadDataFail(t,e){this.errorMessage=t,e&&e(),this.$emit(S,t)},_getExec(){return this.getTemp(!1)},_execRemove(t,e,o,i,n,a,s,l){if(!this.collection||!t)return;const d=v(t)?t:[t];if(!d.length)return;s&&r({mask:!0,title:l});const p=c.database(this.spaceInfo),g=p.command;let m=p;e&&(m=m.action(e)),m.collection(this.mainCollection).where({_id:g.in(d)}).remove().then((t=>{o&&o(t.result),this.pageData===D?this.refresh():this.removeData(d)})).catch((t=>{i&&i(t),a&&u({content:t.message,showCancel:!1})})).finally((()=>{s&&h(),n&&n()}))},removeData(t){const e=t.slice(0),o=this.dataList;for(let i=o.length-1;i>=0;i--){const t=e.indexOf(o[i]._id);t>=0&&(o.splice(i,1),e.splice(t,1))}},_dispatchEvent(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}},[["render",function(i,s,l,r,c,d){const u=a;return t(),e(u,null,{default:o((()=>[n(i.$slots,"default",{options:l.options,data:r.dataList,pagination:c.paginationInternal,loading:c.loading,hasMore:c.hasMore,error:c.errorMessage})])),_:3})}]]);export{y as _,I as a};