"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1884],{25661:(L,v,e)=>{e.d(v,{F:()=>c});var l=e(66681),a=e(85960),f=e(47257),p=e(79253);const c=({renderExpandedContent:r,...s})=>{const i=(0,f.wW)(t);return a.createElement(p.t,{renderExpandedContent:r?(T,P,y)=>a.createElement(a.Fragment,null,P!==y.length-1&&a.createElement("div",{className:(0,l.cx)(i.contentGuideline,i.guideline)}),r(T,P,y)):void 0,renderPrefixHeader:()=>a.createElement("div",{className:i.relative},a.createElement("div",{className:(0,l.cx)(i.headerGuideline,i.guideline)})),renderPrefixCell:(T,P,y)=>a.createElement("div",{className:i.relative},a.createElement("div",{className:(0,l.cx)(i.topGuideline,i.guideline)}),P!==y.length-1&&a.createElement("div",{className:(0,l.cx)(i.bottomGuideline,i.guideline)})),...s})},t=r=>({relative:(0,l.css)`
    position: relative;
    height: 100%;
  `,guideline:(0,l.css)`
    left: -19px;
    border-left: 1px solid ${r.colors.border.weak};
    position: absolute;

    ${r.breakpoints.down("md")} {
      display: none;
    }
  `,topGuideline:(0,l.css)`
    width: 18px;
    border-bottom: 1px solid ${r.colors.border.medium};
    top: 0;
    bottom: 50%;
  `,bottomGuideline:(0,l.css)`
    top: 50%;
    bottom: 0;
  `,contentGuideline:(0,l.css)`
    top: 0;
    bottom: 0;
    left: -49px !important;
  `,headerGuideline:(0,l.css)`
    top: -17px;
    bottom: 0;
  `})},84237:(L,v,e)=>{e.d(v,{C0:()=>t,Uv:()=>p,Xq:()=>c});var l=e(85960),a=e(49199),f=e(67192),p=(r=>(r.ContactPoint="contact point",r.Template="template",r.MuteTiming="mute timing",r.AlertRule="alert rule",r.RootNotificationPolicy="root notification policy",r))(p||{});const c=({resource:r})=>l.createElement(a.b,{title:`This ${r} cannot be edited through the UI`,severity:"info"},"This ",r," has been provisioned, that means it was created by config. Please contact your server admin to update this ",r,"."),t=()=>l.createElement(f.C,{text:"Provisioned",color:"purple"})},58662:(L,v,e)=>{e.d(v,{V:()=>f});var l=e(85960),a=e(97666);const f=({namespace:p,group:c})=>c?l.createElement(l.Fragment,null,p," ",l.createElement(a.J,{name:"angle-right"})," ",c):l.createElement(l.Fragment,null,p)},71332:(L,v,e)=>{e.d(v,{V:()=>t});var l=e(66681),a=e(85960),f=e(47257),p=e(14607),c=e(97666);const t=({rule:s})=>{const i=(0,f.wW)(r);return s.health==="err"||s.health==="error"?a.createElement(p.u,{theme:"error",content:s.lastError||"No error message provided."},a.createElement("div",{className:i.warn},a.createElement(c.J,{name:"exclamation-triangle"}),a.createElement("span",null,"error"))):a.createElement(a.Fragment,null,s.health)},r=s=>({warn:(0,l.css)`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${s.spacing(1)};

    color: ${s.colors.warning.text};
  `})},71474:(L,v,e)=>{e.d(v,{p:()=>T});var l=e(66681),a=e(85960),f=e(18678),p=e(47257),c=e(13086),t=e(75682),r=e(25119),s=e(9001),i=e(14591);const T=({rule:y,isDeleting:F,isCreating:b,isPaused:U})=>{const z=(0,p.wW)(P),{promRule:g}=y,H=(0,a.useMemo)(()=>{if(g&&(0,s.x_)(g)&&g.alerts?.length&&g.state!==r.x_.Inactive){const W=g.activeAt?new Date(g.activeAt):(0,s.ub)(g);if(W)return a.createElement("span",{title:String(W),className:z.for},"for"," ",(0,f.vT)({start:W,end:new Date},!1))}return null},[g,z]);return F?a.createElement(c.K,{gap:1},a.createElement(t.$,null),"Deleting"):b?a.createElement(c.K,{gap:1},a.createElement(t.$,null),"Creating"):g&&(0,s.x_)(g)?a.createElement(c.K,{gap:1},a.createElement(i.l,{state:g.state,isPaused:U}),H):g&&(0,s.OP)(g)?a.createElement(a.Fragment,null,"Recording rule"):a.createElement(a.Fragment,null,"n/a")},P=y=>({for:(0,l.css)`
    font-size: ${y.typography.bodySmall.fontSize};
    color: ${y.colors.text.secondary};
    white-space: nowrap;
    padding-top: 2px;
  `})},50657:(L,v,e)=>{e.d(v,{i:()=>ve});var l=e(66681),a=e(78321),f=e(12173);function p(n,D){(0,f.Z)(2,arguments);var R=(0,a.Z)(n),h=(0,a.Z)(D);return R.getTime()<h.getTime()}var c=e(47266),t=e(85960),r=e(18678),s=e(85745),i=e(12537),T=e(47257),P=e(14607),y=e(89248),F=e(72142),b=e(46002),U=e(9001),z=e(79253),g=e(25661),H=e(84237),W=e(58662),X=e(13202),w=e(56375),k=e(30694),Y=e(29165),q=e(55855),G=e(54635),_=e(13086),ee=e(44839),Z=e(97666),te=e(77980),ne=e(93991),ae=e(95162),x=e(57297),le=e(5970),j=e(76679),J=e(77294),V=e(60956),Q=e(87873),oe=e(5279);const Ke=n=>window.matchMedia(`(max-width: ${n}px)`).matches,re=({rule:n,rulesSource:D})=>{const R=(0,ae.useDispatch)(),h=(0,k.TH)(),I=(0,ne.iG)(),A=(0,T.wW)(ie),[d,o]=(0,t.useState)(void 0),{namespace:u,group:E,rulerRule:C}=n,[m,M]=(0,t.useState)(),B=h.pathname+h.search,K=se(h.pathname),Re=(0,U.Pc)(n.rulerRule)&&!!n.rulerRule.grafana_alert.provenance,[he,Me]=(0,x.wp)(n,x.iY.Update),[Pe,ye]=(0,x.wp)(n,x.iY.Delete),[Ce,Te]=(0,x.wp)(n,x.iY.Duplicate),[Oe,xe]=(0,x.wp)(n,x.iY.ModifyExport),Ae=he&&Me,Ie=Pe&&ye,Le=Ce&&Te,Ue=Oe&&xe,S=[],$=[],We=()=>{if(m&&m.rulerRule){const O=V.Zk((0,j.EG)(m.namespace.rulesSource),m.namespace.name,m.group.name,m.rulerRule);R((0,le.hS)(O,{navigateTo:K?"/alerting/list":void 0})),M(void 0)}},Be=()=>(0,J.t6)(D,n),$e=(0,j.EG)(D);if(K||S.push(t.createElement(P.u,{placement:"top",content:"View"},t.createElement(Y.Qj,{className:A.button,title:"View",size:"sm",key:"view",variant:"secondary",icon:"eye",href:(0,J.V2)(D,n,B)}))),C){const O=V.Zk($e,u.name,E.name,C);if(Ae){const N=(0,Q.u)(`/alerting/${encodeURIComponent(V.$V(O))}/edit`,{returnTo:B});S.push(t.createElement(P.u,{placement:"top",content:"Edit"},t.createElement(Y.Qj,{title:"Edit",className:A.button,size:"sm",key:"edit",variant:"secondary",icon:"pen",href:N})))}K&&S.push(t.createElement(q.m,{key:"copy",icon:"copy",onClipboardError:N=>{I.error("Error while copying URL",N)},className:A.button,size:"sm",getText:Be},"Copy link to rule")),Le&&$.push(t.createElement(G.v.Item,{label:"Duplicate",icon:"copy",onClick:()=>o({identifier:O,isProvisioned:Re})})),Ue&&$.push(t.createElement(G.v.Item,{label:"Modify export",icon:"edit",url:(0,Q.u)(`/alerting/${encodeURIComponent(V.$V(O))}/modify-export`,{returnTo:h.pathname+h.search})})),Ie&&$.push(t.createElement(G.v.Item,{label:"Delete",icon:"trash-alt",onClick:()=>M(n)}))}return S.length||$.length?t.createElement(t.Fragment,null,t.createElement(_.K,{gap:1},S.map((O,N)=>t.createElement(t.Fragment,{key:N},O)),$.length>0&&t.createElement(ee.L,{overlay:t.createElement(G.v,null,$.map(O=>t.createElement(t.Fragment,{key:(0,w.uniqueId)("action_")},O)))},t.createElement(Y.zx,{variant:"secondary",size:"sm"},"More",t.createElement(Z.J,{name:"angle-down"})))),!!m&&t.createElement(te.s,{isOpen:!0,title:"Delete rule",body:t.createElement("div",null,t.createElement("p",null,'Deleting "',t.createElement("strong",null,m.name),'" will permanently remove it from your alert rule list.'),t.createElement("p",null,"Are you sure you want to delete this rule?")),confirmText:"Yes, delete",icon:"exclamation-triangle",onConfirm:We,onDismiss:()=>M(void 0)}),d&&t.createElement(oe._,{identifier:d.identifier,isProvisioned:d.isProvisioned,onDismiss:()=>o(void 0)})):null};function se(n){return n.endsWith("/view")}const ie=n=>({button:(0,l.css)`
    padding: 0 ${n.spacing(2)};
  `});var ce=e(90857),de=e(39374);function ue({rule:n}){const D=(0,T.wW)(me),{exceedsLimit:R}=(0,t.useMemo)(()=>(0,de.f)(n.group.interval),[n.group.interval]);return R?t.createElement(P.u,{theme:"error",content:t.createElement("div",null,"A minimum evaluation interval of"," ",t.createElement("span",{className:D.globalLimitValue},ce.config.unifiedAlerting.minInterval)," has been configured in Grafana and will be used instead of the ",n.group.interval," interval configured for the Rule Group.")},t.createElement(Z.J,{name:"stopwatch-slash",className:D.icon})):null}function me(n){return{globalLimitValue:(0,l.css)`
      font-weight: ${n.typography.fontWeightBold};
    `,icon:(0,l.css)`
      fill: ${n.colors.warning.text};
    `}}var Ee=e(60808),pe=e(71332),ge=e(71474);const ve=({rules:n,className:D,showGuidelines:R=!1,emptyMessage:h="No rules found.",showGroupColumn:I=!1,showSummaryColumn:A=!1,showNextEvaluationColumn:d=!1})=>{const o=(0,T.wW)(fe),u=(0,l.cx)(o.wrapper,D,{[o.wrapperMargin]:R}),E=(0,t.useMemo)(()=>n.map((M,B)=>({id:`${M.namespace.name}-${M.group.name}-${M.name}-${B}`,data:M})),[n]),C=De(A,I,d);if(!n.length)return t.createElement("div",{className:(0,l.cx)(u,o.emptyMessage)},h);const m=R?g.F:z.t;return t.createElement("div",{className:u,"data-testid":"rules-table"},t.createElement(m,{cols:C,isExpandable:!0,items:E,renderExpandedContent:({data:M})=>t.createElement(Ee.Ii,{rule:M}),pagination:{itemsPerPage:y.gN},paginationStyles:o.pagination}))},fe=n=>({wrapperMargin:(0,l.css)`
    ${n.breakpoints.up("md")} {
      margin-left: 36px;
    }
  `,emptyMessage:(0,l.css)`
    padding: ${n.spacing(1)};
  `,wrapper:(0,l.css)`
    width: auto;
    border-radius: ${n.shape.radius.default};
  `,pagination:(0,l.css)`
    display: flex;
    margin: 0;
    padding-top: ${n.spacing(1)};
    padding-bottom: ${n.spacing(.25)};
    justify-content: center;
    border-left: 1px solid ${n.colors.border.medium};
    border-right: 1px solid ${n.colors.border.medium};
    border-bottom: 1px solid ${n.colors.border.medium};
  `});function De(n,D,R){const{hasRuler:h,rulerRulesLoaded:I}=(0,F.h)(),A=(0,t.useCallback)(d=>{const o=d.promRule?.lastEvaluation&&(0,r.qb)(d.promRule.lastEvaluation),u=d.group.interval&&(0,r.jO)(d.group.interval);if(!o||!u||(0,U.E)(d))return;const E=(0,r.RA)(d.group.interval),C=Date.parse(d.promRule?.lastEvaluation||""),m=(0,r.Ks)(C,E);return p(m,new Date)?{humanized:`within ${(0,c.Z)(E)}`,fullDate:`within ${(0,c.Z)(E)}`}:{humanized:`in ${(0,s.CQ)(m).locale("en").fromNow(!0)}`,fullDate:(0,i.dq)(m,{format:"YYYY-MM-DD HH:mm:ss"})}},[]);return(0,t.useMemo)(()=>{const d=[{id:"state",label:"State",renderCell:({data:o})=>{const{namespace:u}=o,{rulesSource:E}=u,{promRule:C,rulerRule:m}=o,M=!!(h(E)&&I(E)&&C&&!m),B=!!(h(E)&&I(E)&&m&&!C),K=(0,U.E)(o);return t.createElement(ge.p,{rule:o,isDeleting:M,isCreating:B,isPaused:K})},size:"165px"},{id:"name",label:"Name",renderCell:({data:o})=>o.name,size:R?4:5},{id:"provisioned",label:"",renderCell:({data:o})=>{const u=o.rulerRule;return(0,U.Pc)(u)&&u.grafana_alert.provenance?t.createElement(H.C0,null):null},size:"100px"},{id:"warnings",label:"",renderCell:({data:o})=>t.createElement(ue,{rule:o}),size:"45px"},{id:"health",label:"Health",renderCell:({data:{promRule:o,group:u}})=>o?t.createElement(pe.V,{rule:o}):null,size:"75px"}];return n&&d.push({id:"summary",label:"Summary",renderCell:({data:o})=>t.createElement(X.Z,{input:o.annotations[b.q6.summary]??""}),size:R?4:5}),R&&d.push({id:"nextEvaluation",label:"Next evaluation",renderCell:({data:o})=>{const u=A(o);return u&&t.createElement(P.u,{placement:"top",content:`${u?.fullDate}`,theme:"info"},t.createElement("span",null,u?.humanized))},size:2}),D&&d.push({id:"group",label:"Group",renderCell:({data:o})=>{const{namespace:u,group:E}=o;return E.name==="default"?t.createElement(W.V,{namespace:u.name}):t.createElement(W.V,{namespace:u.name,group:E.name})},size:5}),d.push({id:"actions",label:"Actions",renderCell:({data:o})=>t.createElement(re,{rule:o,rulesSource:o.namespace.rulesSource}),size:"200px"}),d},[n,D,R,h,I,A])}},72142:(L,v,e)=>{e.d(v,{h:()=>p});var l=e(85960),a=e(76679),f=e(92746);function p(){const c=(0,f._)(s=>s.rulerRules),t=(0,l.useCallback)(s=>{const i=typeof s=="string"?s:s.name;return i===a.GC||!!c[i]?.result},[c]),r=(0,l.useCallback)(s=>{const i=(0,a.EG)(s);return!!c[i]?.result},[c]);return{hasRuler:t,rulerRulesLoaded:r}}}}]);

//# sourceMappingURL=1884.f8699095335b633417eb.js.map