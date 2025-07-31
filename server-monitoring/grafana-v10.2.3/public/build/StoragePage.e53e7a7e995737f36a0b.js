"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[7675],{24047:(Y,U,n)=>{n.r(U),n.d(U,{default:()=>be});var i=n(66681),e=n(85960),N=n(81445),j=n(45878),J=n(91),T=n(47257),z=n(75682),M=n(49199),R=n(74042),Z=n(42202),s=n(29165),u=n(70523),S=n(94439),O=n(60484),w=n(20989),P=n(6119),X=n(14914);function k({onPathChange:t}){return e.createElement("div",null,e.createElement("div",null,"TODO... Add ROOT"),e.createElement(s.zx,{variant:"secondary",onClick:()=>t("/")},"Cancel"))}var H=n(56375),V=n(97666);function q({pathName:t,onPathChange:r,rootIcon:m}){const a=(0,T.wW)(_),l=t.split("/").filter(Boolean);return e.createElement("ul",{className:a.breadCrumb},m&&e.createElement("li",null,e.createElement(V.J,{name:m,onClick:()=>r("")})),l.map((o,F)=>{let g="/"+l.slice(0,F+1).join("/");const p=()=>r(g),x=F===l.length-1;return e.createElement("li",{key:(0,H.uniqueId)(o),onClick:x?void 0:p},o)}))}function _(t){return{breadCrumb:(0,i.css)`
      list-style: none;
      padding: ${t.spacing(2,1)};

      li {
        display: inline;

        :not(:last-child) {
          color: ${t.colors.text.link};
          cursor: pointer;
        }
        + li:before {
          content: '>';
          padding: ${t.spacing(1)};
          color: ${t.colors.text.secondary};
        }
      }
    `}}var K=n(7288),ee=n(66596),te=n(20519),ne=n(24956);const ae={folderName:""};function re({validate:t,onDismiss:r,onSubmit:m}){return e.createElement(K.u,{onDismiss:r,isOpen:!0,title:"New Folder"},e.createElement(ee.l,{defaultValues:ae,onSubmit:m,maxWidth:"none"},({register:a,errors:l})=>e.createElement(e.Fragment,null,e.createElement(te.g,{label:"Folder name",invalid:!!l.folderName,error:l.folderName&&l.folderName.message},e.createElement(ne.I,{id:"folder-name-input",...a("folderName",{required:"Folder name is required.",validate:{validate:t}})})),e.createElement(K.u.ButtonRow,null,e.createElement(s.zx,{type:"submit"},"Create")))))}var G=n(53565),se=n(62577),le=n(91861),D=n(55635),C=(t=>(t.Data="data",t.Config="config",t.Perms="perms",t.History="history",t.AddRoot="add",t))(C||{}),oe=(t=>(t.Save="save",t.PR="pr",t.Push="push",t))(oe||{});function ie({listing:t,path:r,onPathChange:m,view:a}){const l=(0,T.wW)(de),o=(0,e.useMemo)(()=>ce(r),[r]),F=(0,N.Z)(async()=>{if(o.category==="text"){const p=await(0,D.$)().get(r);return(0,H.isString)(p)?p:JSON.stringify(p,null,2)}return null},[o,r]);switch(a){case C.Config:return e.createElement("div",null,"CONFIGURE?");case C.Perms:return e.createElement("div",null,"Permissions");case C.History:return e.createElement("div",null,"TODO... history")}let g=`api/storage/read/${r}`;switch(g.endsWith("/")&&(g=g.substring(0,g.length-1)),o.category){case"svg":return e.createElement("div",null,e.createElement(le.V,{src:g,className:l.icon}));case"image":return e.createElement("div",null,e.createElement("a",{target:"_self",href:g},e.createElement("img",{src:g,alt:"File preview",className:l.img})));case"text":return e.createElement("div",{className:l.tableWrapper},e.createElement(G.Z,null,({width:p,height:x})=>e.createElement(se.p,{width:p,height:x,value:F.value??"",showLineNumbers:!1,readOnly:!0,language:o.language??"text",showMiniMap:!1,onBlur:h=>{console.log("CHANGED!",h)}})))}return e.createElement("div",null,"FILE: ",e.createElement("a",{href:g},r))}function ce(t){const r=t.lastIndexOf(".");if(r<0)return{};switch(t.substring(r+1).toLowerCase()){case"svg":return{category:"svg"};case"jpg":case"jpeg":case"png":case"webp":case"gif":return{category:"image"};case"geojson":case"json":return{category:"text",language:"json"};case"text":case"go":case"md":return{category:"text"}}return{}}const de=t=>({wrapper:(0,i.css)`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,tableControlRowWrapper:(0,i.css)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${t.spacing(2)};
  `,tableWrapper:(0,i.css)`
    border: 1px solid ${t.colors.border.medium};
    height: 100%;
  `,uploadSpot:(0,i.css)`
    margin-left: ${t.spacing(2)};
  `,border:(0,i.css)`
    border: 1px solid ${t.colors.border.medium};
    padding: ${t.spacing(2)};
  `,img:(0,i.css)`
    max-width: 100%;
    // max-height: 147px;
    // fill: ${t.colors.text.primary};
  `,icon:(0,i.css)`
    // max-width: 100%;
    // max-height: 147px;
    // fill: ${t.colors.text.primary};
  `});var ue=n(63510);function me({listing:t,view:r}){const m=(0,T.wW)(ge);switch(r){case C.Config:return e.createElement("div",null,"CONFIGURE?");case C.Perms:return e.createElement("div",null,"Permissions")}return e.createElement("div",{className:m.tableWrapper},e.createElement(G.Z,null,({width:a,height:l})=>e.createElement("div",{style:{width:`${a}px`,height:`${l}px`}},e.createElement(ue.i,{height:l,width:a,data:t,noHeader:!1,showTypeIcons:!1,resizable:!1}))))}const ge=t=>({wrapper:(0,i.css)`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,tableControlRowWrapper:(0,i.css)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${t.spacing(2)};
  `,tableWrapper:(0,i.css)`
    border: 1px solid ${t.colors.border.medium};
    height: 100%;
  `,uploadSpot:(0,i.css)`
    margin-left: ${t.spacing(2)};
  `,border:(0,i.css)`
    border: 1px solid ${t.colors.border.medium};
    padding: ${t.spacing(2)};
  `});var B=n(72435),fe=n(7042),pe=n(84933),he=n(96535);function Ee({root:t,onPathChange:r}){const m=(0,T.wW)(ve),a=(0,N.Z)((0,D.$)().getConfig),[l,o]=(0,e.useState)("");let F=location.pathname;F.endsWith("/")||(F+="/");const g=(0,e.useMemo)(()=>{let x=a.value??[];if(l?.length){const E=l.toLowerCase();x=x.filter(b=>{const d=b.config;return d.name.toLowerCase().indexOf(E)>=0||d.description.toLowerCase().indexOf(E)>=0})}const h=[],c=[];for(const E of x??[])E.config.underContentRoot?c.push(E):E.config.prefix!=="content"&&h.push(E);return{base:h,content:c}},[l,a]),p=(x,h)=>e.createElement(R.wc,null,h.map(c=>{const E=c.ready;return e.createElement(B.Z,{key:c.config.prefix,href:E?`admin/storage/${x}${c.config.prefix}/`:void 0},e.createElement(B.Z.Heading,null,c.config.name),e.createElement(B.Z.Meta,{className:m.clickable},c.config.description,c.config.git?.remote&&e.createElement("a",{href:c.config.git?.remote},c.config.git?.remote)),c.notice?.map(b=>e.createElement(M.b,{key:b.text,severity:b.severity,title:b.text})),e.createElement(B.Z.Tags,{className:m.clickable},e.createElement(R.Lh,null,e.createElement(fe.P,{tags:ye(c)}))),e.createElement(B.Z.Figure,{className:m.clickable},e.createElement(V.J,{name:xe(c.config.type),size:"xxxl",className:m.secondaryTextColor})))}));return e.createElement("div",null,e.createElement("div",{className:"page-action-bar"},e.createElement(pe._,{grow:!0},e.createElement(he.H,{placeholder:"Search Storage",value:l,onChange:o})),e.createElement(s.zx,{className:"pull-right",onClick:()=>r("",C.AddRoot)},"Add Root")),e.createElement("div",null,p("",g.base)),e.createElement("div",null,e.createElement("h3",null,"Content"),p("content/",g.content)))}function ve(t){return{secondaryTextColor:(0,i.css)`
      color: ${t.colors.text.secondary};
    `,clickable:(0,i.css)`
      pointer-events: none;
    `}}function ye(t){const r=[];return t.builtin&&r.push("Builtin"),t.ready||r.push("Not ready"),r}function xe(t){switch(t){case"git":return"code-branch";case"disk":return"folder-open";case"sql":return"database";default:return"folder-open"}}var Ce=n(20018),we=n(77980);const Fe="image/jpg, image/jpeg, image/png, image/gif, image/webp";function $e({setErrorMessages:t,setPath:r,path:m,fileNames:a}){const l=(0,T.wW)(Ne),[o,F]=(0,e.useState)(void 0),[g,p]=(0,e.useState)(!1),[x,h]=(0,e.useState)(1),[c,E]=(0,e.useState)(!0);(0,e.useEffect)(()=>{h(f=>f+1)},[o]);const b=f=>{console.log("Uploaded: "+m),f.path?r(f.path):r(m)},d=async(f,L)=>{if(!f){t(["Please select a file."]);return}const A=await(0,D.$)().upload(m,f,L);A.status!==200?t([A.message]):b(A)},v=f=>{t([]);const L=f.currentTarget.files&&f.currentTarget.files.length>0&&f.currentTarget.files[0]?f.currentTarget.files[0]:void 0;L&&(F(L),(0,D.J)(L.name,a)?(p(!0),E(!0)):(p(!1),d(L,!1).then(y=>{})))},$=()=>{o&&(d(o,!0).then(f=>{}),E(!1))},W=()=>{F(void 0),p(!1),E(!1)};return e.createElement(e.Fragment,null,e.createElement(Ce.p,{accept:Fe,onFileUpload:v,key:x,className:l.uploadButton},"Upload"),o&&g&&e.createElement(we.s,{isOpen:c,body:e.createElement("div",null,e.createElement("p",null,o?.name),e.createElement("p",null,"A file with this name already exists."),e.createElement("p",null,"What would you like to do?")),title:"This file already exists",confirmText:"Replace",onConfirm:$,onDismiss:W}))}const Ne=t=>({uploadButton:(0,i.css)`
    margin-right: ${t.spacing(2)};
  `}),Oe=/^[a-z\d!\-_.*'() ]+$/,Q=256,Pe=t=>{const r=t.lastIndexOf("/");return r<1?"":t.substring(0,r)};function be(t){const r=(0,T.wW)(Te),m=(0,P.q)("storage"),a=t.match.params.path??"",l=t.queryParams.view??C.Data,o=(d,v)=>{let $=("/admin/storage/"+d).replace("//","/");v&&v!==C.Data&&($+="?view="+v),J.E1.push($)},[F,g]=(0,e.useState)(!1),[p,x]=(0,e.useState)([]),h=(0,N.Z)(()=>(0,D.$)().list(a).then(d=>{if(d){const v=d.fields[0];d.fields[0]={...v,getLinks:$=>{const W=v.values[$.valueRowIndex??0],f=a+"/"+W;return[{title:`Open ${W}`,href:`/admin/storage/${f}`,target:"_self",origin:v,onClick:()=>{o(f)}}]}}}return d}),[a]),c=(0,e.useMemo)(()=>{let d=a?.indexOf("/")<0;if(h.value)if(h.value.length===1){const $=h.value.fields[0].values[0];d=!a.endsWith($)}else d=!0;return d},[a,h]),E=(0,e.useMemo)(()=>h.value?.fields?.find(d=>d.name==="name")?.values.filter(d=>typeof d=="string")??[],[h]),b=()=>{const d=!a?.length||a==="/";switch(l){case C.AddRoot:return d?e.createElement(k,{onPathChange:o}):(o(""),e.createElement(z.$,null))}const v=h.value;if(!(0,j.aY)(v))return e.createElement(e.Fragment,null);if(d)return e.createElement(Ee,{root:v,onPathChange:o});const $=[{what:C.Data,text:"Data"}];a.indexOf("/")<0&&$.push({what:C.Config,text:"Configure"}),c||$.push({what:C.History,text:"History"});const W=c&&(a.startsWith("resources")||a.startsWith("content")),f=a.startsWith("resources/")||a.startsWith("content/"),L=()=>e.createElement("div",{className:r.errorAlert},e.createElement(M.b,{title:"Upload failed",severity:"error",onRemove:A},p.map(y=>e.createElement("div",{key:y},y)))),A=()=>{x([])};return e.createElement("div",{className:r.wrapper},e.createElement(R.Lh,{width:"100%",justify:"space-between",spacing:"md",height:25},e.createElement(q,{pathName:a,onPathChange:o,rootIcon:(0,Z.toIconName)(m.node.icon??"")}),e.createElement(R.Lh,null,W&&e.createElement(e.Fragment,null,e.createElement($e,{path:a,setErrorMessages:x,fileNames:E,setPath:o}),e.createElement(s.zx,{onClick:()=>g(!0)},"New Folder")),f&&e.createElement(s.zx,{variant:"destructive",onClick:()=>{const y=c?"Are you sure you want to delete this folder and all its contents?":"Are you sure you want to delete this file?",I=Pe(a);O.Z.publish(new X.VJ({title:`Delete ${c?"folder":"file"}`,text:y,icon:"trash-alt",yesText:"Delete",onConfirm:()=>(0,D.$)().delete({path:a,isFolder:c}).then(()=>{o(I)})}))}},"Delete"))),p.length>0&&L(),e.createElement(u.J,null,$.map(y=>e.createElement(S.O,{key:y.what,label:y.text,active:y.what===l,onChangeTab:()=>o(a,y.what)}))),c?e.createElement(me,{listing:v,view:l}):e.createElement(ie,{path:a,listing:v,onPathChange:o,view:l}),F&&e.createElement(re,{onSubmit:async({folderName:y})=>{const I=`${a}/${y}`;typeof(await(0,D.$)().createFolder(I))?.error!="string"&&(o(I),g(!1))},onDismiss:()=>{g(!1)},validate:y=>{const I=y.toLowerCase();return(0,D.J)(y,E)?"A file or a folder with the same name already exists":Oe.test(I)?y.length>Q?`Name is too long, maximum length: ${Q} characters`:!0:"Name contains illegal characters"}}))};return e.createElement(w.T,{navModel:m},e.createElement(w.T.Contents,{isLoading:h.loading},b()))}const Te=t=>({wrapper:(0,i.css)`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,tableControlRowWrapper:(0,i.css)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${t.spacing(2)};
  `,tableWrapper:(0,i.css)`
    border: 1px solid ${t.colors.border.medium};
    height: 100%;
  `,border:(0,i.css)`
    border: 1px solid ${t.colors.border.medium};
    padding: ${t.spacing(2)};
  `,errorAlert:(0,i.css)`
    padding-top: 20px;
  `,uploadButton:(0,i.css)`
    margin-right: ${t.spacing(2)};
  `})},55635:(Y,U,n)=>{n.d(U,{$:()=>R,J:()=>z});var i=n(79739),e=n(64282),N=n(85445),j=n(90857),J=n(46783);class T{constructor(){}async get(s){const u=`api/storage/read/${s}`.replace("//","/");return(0,N.i)().get(u)}async list(s){let u="api/storage/list/";s&&(u+=s+"/");const S=await(0,N.i)().get(u);if(S?.data){const O=(0,i.vP)(S);for(const w of O.fields)w.display=(0,e.U)({field:w,theme:j.config.theme2});return O}}async createFolder(s){const u=await(0,N.i)().post("/api/storage/createFolder",JSON.stringify({path:s}));return u.success?{}:{error:u.message??"unknown error"}}async deleteFolder(s){const u=await(0,N.i)().post("/api/storage/deleteFolder",JSON.stringify(s));return u.success?{}:{error:u.message??"unknown error"}}async deleteFile(s){const u=await(0,N.i)().post(`/api/storage/delete/${s.path}`);return u.success?{}:{error:u.message??"unknown error"}}async delete(s){return s.isFolder?this.deleteFolder({path:s.path,force:!0}):this.deleteFile({path:s.path})}async upload(s,u,S){const O=new FormData;O.append("folder",s),O.append("file",u),O.append("overwriteExistingFile",String(S));const w=await fetch("/api/storage/upload",{method:"POST",body:O});let P=await w.json();return P||(P={}),P.status=w.status,P.statusText=w.statusText,w.status!==200&&!P.err&&(P.err=!0),P}async write(s,u){return J.ae.post(`/api/storage/write/${s}`,u)}async getConfig(){return(0,N.i)().get("/api/storage/config")}async getOptions(s){return(0,N.i)().get(`/api/storage/options/${s}`)}}function z(Z,s){const S=Z.toLowerCase().trim();return s.map(w=>w.trim().toLowerCase()).includes(S)}let M;function R(){return M||(M=new T),M}}}]);

//# sourceMappingURL=StoragePage.e53e7a7e995737f36a0b.js.map