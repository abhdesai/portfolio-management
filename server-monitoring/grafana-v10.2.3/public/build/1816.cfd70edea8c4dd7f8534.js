"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1816],{7914:(k,A,a)=>{a.d(A,{g:()=>g});var r=a(66681),t=a(56375),x=a.n(t),E=a(85960),B=a(47257),C=a(13086),d=a(97096),y=a(23595);const g=({matchers:i})=>{const c=(0,B.wW)(v),p=5,u=(0,t.take)(i,p),D=(0,t.takeRight)(i,i.length-p),b=D.length>0;return E.createElement("span",{"data-testid":"label-matchers"},E.createElement(C.K,{direction:"row",gap:1,alignItems:"center",wrap:"wrap"},u.map(L=>E.createElement(h,{key:(0,t.uniqueId)(),matcher:L})),b&&E.createElement(y.z,{arrow:!0,placement:"top",content:E.createElement(E.Fragment,null,D.map(L=>E.createElement(h,{key:(0,t.uniqueId)(),matcher:L})))},E.createElement("span",null,E.createElement("div",{className:c.metadata},`and ${D.length} more`)))))},h=({matcher:[i,c,p]})=>{const u=(0,B.wW)(v);return E.createElement("div",{className:u.matcher(i).wrapper},E.createElement(C.K,{direction:"row",gap:0,alignItems:"baseline"},i," ",c," ",p))},v=i=>({matcher:c=>{const{color:p,borderColor:u}=(0,d.Bx)(c);return{wrapper:(0,r.css)`
        color: #fff;
        background: ${p};
        padding: ${i.spacing(.33)} ${i.spacing(.66)};
        font-size: ${i.typography.bodySmall.fontSize};

        border: solid 1px ${u};
        border-radius: ${i.shape.borderRadius(2)};
      `}},metadata:(0,r.css)`
    color: ${i.colors.text.secondary};

    font-size: ${i.typography.bodySmall.fontSize};
    font-weight: ${i.typography.bodySmall.fontWeight};
  `})},51816:(k,A,a)=>{a.r(A),a.d(A,{default:()=>oe});var r=a(66681),t=a(85960),x=a(47257),E=a(49199),B=a(79468),C=a(8958),d=a(34554),y=a(56375),g=a(53136),h=a.n(g),v=a(45220),i=a(29165),c=a(97096),p=a(7042),u=a(44211),D=a(46911),b=a(99586),L=a(7914);function F(e){return e.path?.length===0}function q(e){const s=new Map;function l(m,M=[]){s.set(m.id,{...m,path:M}),m.routes?.forEach(o=>l(o,[...M,m.id]))}return l(e,[]),s}function J(e){return e.object_matchers?.length===0}function _({route:e}){const s=(0,x.wW)(H);return F(e)?t.createElement("div",{className:s.defaultPolicy},"Default policy"):J(e)?t.createElement("div",{className:s.textMuted},"No matchers"):t.createElement(L.g,{matchers:e.object_matchers??[]})}const H=e=>({defaultPolicy:(0,r.css)`
    padding: ${e.spacing(.5)};
    background: ${e.colors.background.secondary};
    width: fit-content;
  `,textMuted:(0,r.css)`
    color: ${e.colors.text.secondary};
  `});var ie=a(7288),ee=a(97666),n=a(57297),f=a(84954),N=a(76679),T=a(77294),O=a(53914);function I({route:e,routesByIdMap:s}){const l=(0,x.wW)(Y),m=e.path?.slice(1)??[],M=[...(0,y.compact)(m.map(o=>s.get(o))),e];return t.createElement("div",{className:l.policyPathWrapper},t.createElement("div",{className:l.defaultPolicy},"Default policy"),M.map((o,$)=>t.createElement("div",{key:o.id},t.createElement("div",{className:l.policyInPath($,$===M.length-1)},J(o)?t.createElement("div",{className:l.textMuted},"No matchers"):t.createElement(L.g,{matchers:o.object_matchers??[]})))))}function K({onClose:e,route:s,receiver:l,routesByIdMap:m,alertManagerSourceName:M}){const o=(0,x.wW)(Y),$=F(s);return t.createElement(f.h5,{accessType:"notification",alertmanagerSourceName:N.JY},t.createElement(ie.u,{className:o.detailsModal,isOpen:!0,title:"Routing details",onDismiss:e,onClickBackdrop:e},t.createElement(d.K,{gap:0,direction:"column"},t.createElement("div",{className:(0,r.cx)(o.textMuted,o.marginBottom(2))},"Your alert instances are routed as follows."),t.createElement("div",null,"Notification policy path"),$&&t.createElement("div",{className:o.textMuted},"Default policy"),t.createElement("div",{className:o.separator(1)}),!$&&t.createElement(t.Fragment,null,t.createElement(I,{route:s,routesByIdMap:m})),t.createElement("div",{className:o.separator(4)}),t.createElement("div",{className:o.contactPoint},t.createElement(d.K,{gap:1,direction:"row",alignItems:"center"},"Contact point:",t.createElement("span",{className:o.textMuted},l.name)),t.createElement(O.q,{actions:[n.oI.UpdateContactPoint]},t.createElement(d.K,{gap:1,direction:"row",alignItems:"center"},t.createElement("a",{href:(0,T.eQ)(`/alerting/notifications/receivers/${encodeURIComponent(l.name)}/edit`,M),className:o.link,target:"_blank",rel:"noreferrer"},"See details ",t.createElement(ee.J,{name:"external-link-alt"}))))),t.createElement("div",{className:o.button},t.createElement(i.zx,{variant:"primary",type:"button",onClick:e},"Close")))))}const Y=e=>({textMuted:(0,r.css)`
    color: ${e.colors.text.secondary};
  `,link:(0,r.css)`
    display: block;
    color: ${e.colors.text.link};
  `,button:(0,r.css)`
    justify-content: flex-end;
    display: flex;
  `,detailsModal:(0,r.css)`
    max-width: 560px;
  `,defaultPolicy:(0,r.css)`
    padding: ${e.spacing(.5)};
    background: ${e.colors.background.secondary};
    width: fit-content;
  `,contactPoint:(0,r.css)`
    display: flex;
    flex-direction: row;
    gap: ${e.spacing(1)};
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${e.spacing(1)};
  `,policyPathWrapper:(0,r.css)`
    display: flex;
    flex-direction: column;
    margin-top: ${e.spacing(1)};
  `,separator:s=>(0,r.css)`
    margin-top: ${e.spacing(s)};
  `,marginBottom:s=>(0,r.css)`
    margin-bottom: ${e.spacing(e.spacing(s))};
  `,policyInPath:(s=0,l=!1)=>(0,r.css)`
    margin-left: ${30+s*30}px;
    padding: ${e.spacing(1)};
    margin-top: ${e.spacing(1)};
    border: solid 1px ${e.colors.border.weak};
    background: ${e.colors.background.secondary};
    width: fit-content;
    position: relative;

    ${l&&(0,r.css)`
        border: solid 1px ${e.colors.info.border};
      `},
    &:before {
      content: '';
      position: absolute;
      height: calc(100% - 10px);
      width: ${e.spacing(1)};
      border-left: solid 1px ${e.colors.border.weak};
      border-bottom: solid 1px ${e.colors.border.weak};
      margin-top: ${e.spacing(-2)};
      margin-left: -17px;
    }
  }  `});function Z({route:e,receiver:s,routesByIdMap:l,instancesCount:m,alertManagerSourceName:M,expandRoute:o,onExpandRouteClick:$}){const R=(0,x.wW)(X),[U,j]=(0,t.useState)(!1),w=()=>{j(!0)};return t.createElement("div",{className:R.routeHeader},t.createElement(u.U,{isCollapsed:!o,onToggle:G=>$(!G),"aria-label":"Expand policy route"}),t.createElement(d.K,{flexGrow:1,gap:1},t.createElement("div",{onClick:()=>$(!o),className:R.expandable},t.createElement(d.K,{gap:1,direction:"row",alignItems:"center"},"Notification policy",t.createElement(_,{route:e}))),t.createElement(b.L,null),t.createElement(d.K,{gap:2,direction:"row",alignItems:"center"},t.createElement(D.g,{icon:"layers-alt","data-testid":"matching-instances"},m??"-",t.createElement("span",null,h()("instance",m))),t.createElement(d.K,{gap:1,direction:"row",alignItems:"center"},t.createElement("div",null,t.createElement("span",{className:R.textMuted},"@ Delivered to")," ",s.name),t.createElement("div",{className:R.verticalBar}),t.createElement(i.zx,{type:"button",onClick:w,variant:"secondary",fill:"outline",size:"sm"},"See details")))),U&&t.createElement(K,{onClose:()=>j(!1),route:e,receiver:s,routesByIdMap:l,alertManagerSourceName:M}))}function Q({route:e,instanceMatches:s,receiver:l,routesByIdMap:m,alertManagerSourceName:M}){const o=(0,x.wW)(X),[$,R]=(0,v.Z)(!1),U=9;return t.createElement("div",{"data-testid":"matching-policy-route"},t.createElement(Z,{route:e,receiver:l,routesByIdMap:m,instancesCount:s.length,alertManagerSourceName:M,expandRoute:$,onExpandRouteClick:R}),$&&t.createElement(d.K,{gap:1,direction:"column"},t.createElement("div",{className:o.routeInstances,"data-testid":"route-matching-instance"},s.map(j=>{const w=Array.from(j.labelsMatch);let G=w.map(([P,S])=>({label:`${P[0]}=${P[1]}`,match:S.match,colorIndex:S.match?(0,c.tu)(P[0]):U}));const W=G.filter(P=>P.match),V=G.filter(P=>!P.match);return t.createElement("div",{className:o.tagListCard,key:(0,y.uniqueId)()},w.length>0?t.createElement(t.Fragment,null,W.length>0?t.createElement(p.P,{tags:W.map(P=>P.label),className:o.labelList,getColorIndex:(P,S)=>W[S].colorIndex}):t.createElement("div",{className:(0,r.cx)(o.textMuted,o.textItalic)},"No matching labels"),t.createElement("div",{className:o.labelSeparator}),t.createElement(p.P,{tags:V.map(P=>P.label),className:o.labelList,getColorIndex:(P,S)=>V[S].colorIndex})):t.createElement("div",{className:o.textMuted},"No labels"))}))))}const X=e=>({textMuted:(0,r.css)`
    color: ${e.colors.text.secondary};
  `,textItalic:(0,r.css)`
    font-style: italic;
  `,expandable:(0,r.css)`
    cursor: pointer;
  `,routeHeader:(0,r.css)`
    display: flex;
    flex-direction: row;
    gap: ${e.spacing(1)};
    align-items: center;
    border-bottom: 1px solid ${e.colors.border.weak};
    &:hover {
      background-color: ${e.components.table.rowHoverBackground};
    }
    padding: ${e.spacing(.5,.5,.5,0)};
  `,labelList:(0,r.css)`
    flex: 0 1 auto;
    justify-content: flex-start;
  `,labelSeparator:(0,r.css)`
    width: 1px;
    background-color: ${e.colors.border.weak};
  `,tagListCard:(0,r.css)`
    display: flex;
    flex-direction: row;
    gap: ${e.spacing(2)};

    position: relative;
    background: ${e.colors.background.secondary};
    padding: ${e.spacing(1)};

    border-radius: ${e.shape.borderRadius(2)};
    border: solid 1px ${e.colors.border.weak};
  `,routeInstances:(0,r.css)`
    padding: ${e.spacing(1,0,1,4)};
    position: relative;

    display: flex;
    flex-direction: column;
    gap: ${e.spacing(1)};

    &:before {
      content: '';
      position: absolute;
      left: ${e.spacing(2)};
      height: calc(100% - ${e.spacing(2)});
      width: ${e.spacing(4)};
      border-left: solid 1px ${e.colors.border.weak};
    }
  `,verticalBar:(0,r.css)`
    width: 1px;
    height: 20px;
    background-color: ${e.colors.secondary.main};
    margin-left: ${e.spacing(1)};
    margin-right: ${e.spacing(1)};
  `});var z=a(81445),te=a(70335),ce=a(78025),ae=a(71803),ne=a(59439);const re=(e,s)=>{const{currentData:l,isLoading:m,error:M}=(0,te.W)(e),o=l?.alertmanager_config,{matchInstancesToRoute:$}=(0,ce.N)(),{rootRoute:R,receivers:U}=(0,t.useMemo)(()=>o?{rootRoute:o.route?(0,ne.w2)((0,ae.br)(o.route)):void 0,receivers:o.receivers??[]}:{receivers:[],rootRoute:void 0},[o]),j=R?q((0,ne.tK)(R)):new Map,w=U.reduce((P,S)=>P.set(S.name,S),new Map)??new Map,{value:G=new Map,loading:W,error:V}=(0,z.Z)(async()=>{if(R)return await $(R,s)},[R,s]);return{routesByIdMap:j,receiversByName:w,matchingMap:G,loading:m||W,error:M??V}};function le({alertManagerSource:e,potentialInstances:s,onlyOneAM:l}){const m=(0,x.wW)(se),{routesByIdMap:M,receiversByName:o,matchingMap:$,loading:R,error:U}=re(e.name,s);return U?t.createElement(E.b,{title:"Cannot load Alertmanager configuration",severity:"error"},U.message):R?t.createElement(B.u,{text:"Loading routing preview..."}):$.size>0?t.createElement("div",{className:m.alertManagerRow},!l&&t.createElement(d.K,{direction:"row",alignItems:"center"},t.createElement("div",{className:m.firstAlertManagerLine}),t.createElement("div",{className:m.alertManagerName}," ","Alert manager:",t.createElement("img",{src:e.imgUrl,alt:"",className:m.img}),e.name),t.createElement("div",{className:m.secondAlertManagerLine})),t.createElement(d.K,{gap:1,direction:"column"},Array.from($.entries()).map(([w,G])=>{const W=M.get(w),V=W?.receiver&&o.get(W.receiver);if(!W)return null;if(!V)throw new Error("Receiver not found");return t.createElement(Q,{instanceMatches:G,route:W,receiver:V,key:w,routesByIdMap:M,alertManagerSourceName:e.name})}))):null}const oe=(0,C.Pf)(le),se=e=>({alertManagerRow:(0,r.css)`
    display: flex;
    flex-direction: column;
    gap: ${e.spacing(1)};
    width: 100%;
  `,firstAlertManagerLine:(0,r.css)`
    height: 1px;
    width: ${e.spacing(4)};
    background-color: ${e.colors.secondary.main};
  `,alertManagerName:(0,r.css)`
    width: fit-content;
  `,secondAlertManagerLine:(0,r.css)`
    height: 1px;
    width: 100%;
    flex: 1;
    background-color: ${e.colors.secondary.main};
  `,img:(0,r.css)`
    margin-left: ${e.spacing(2)};
    width: ${e.spacing(3)};
    height: ${e.spacing(3)};
    margin-right: ${e.spacing(1)};
  `})},78025:(k,A,a)=>{a.d(A,{N:()=>h});var r=a(5894),t=a(85960),x=a(45465),E=a(34456),B=a(34834);const C=()=>new B.q(new URL(a.p+a.u(3786),a.b));let d;function y(){let v;if(d===void 0)try{v=C(),d=r.Ud(v)}catch(c){c instanceof Error&&(0,x.H)(c)}return{disposeWorker:()=>{v&&d&&(d[r.Yy](),v.terminate(),d=void 0,v=void 0)}}}function g(v){if(!d)throw new Error("Route Matcher has not been initialized")}function h(){(0,t.useEffect)(()=>{const{disposeWorker:c}=y();return c},[]);const v=(0,t.useCallback)(async(c,p)=>{g(d);const u=performance.now(),D=await d.getRouteGroupsMap(c,p),b=performance.now()-u;return(0,E.PN)(`Route Groups Matched in  ${b} ms`,{matchingTime:b.toString(),alertGroupsCount:p.length.toString(),topLevelRoutesCount:c.routes?.length.toString()??"0"}),D},[]),i=(0,t.useCallback)(async(c,p)=>{g(d);const u=performance.now(),D=await d.matchInstancesToRoute(c,p),b=performance.now()-u;return(0,E.PN)(`Instances Matched in  ${b} ms`,{matchingTime:b.toString(),instancesToMatchCount:p.length.toString(),topLevelRoutesCount:c.routes?.length.toString()??"0"}),D},[]);return{getRouteGroupsMap:v,matchInstancesToRoute:i}}},71803:(k,A,a)=>{a.d(A,{Oy:()=>H,T0:()=>F,Yg:()=>L,ZS:()=>b,bi:()=>_,br:()=>D,dO:()=>p,eP:()=>ee,eh:()=>q,fx:()=>i,mJ:()=>J});var r=a(56375),t=a.n(r),x=a(16901),E=a(98724),B=a(76679),C=a(41460),d=a(5476),y=a(47689);const g=(n,f)=>Object.entries(n??{}).reduce((N,[T,O])=>[...N,{name:T,value:O,operator:f?x._M.regex:x._M.equal}],[]),h=n=>n.value,v=n=>(n??[]).map(h),i={name:"",value:"",operator:x._M.equal},c=["grafana_folder","alertname"],p=[{label:"grafana_folder",value:"grafana_folder"},{label:"alertname",value:"alertname"},{label:"Disable (...)",value:"..."}],u={id:"",overrideGrouping:!1,groupBy:c,object_matchers:[],routes:[],continue:!1,receiver:"",overrideTimings:!1,groupWaitValue:"",groupIntervalValue:"",repeatIntervalValue:"",muteTimeIntervals:[]};function D(n){return{id:(0,r.uniqueId)("route-"),...n,routes:(n.routes??[]).map(D)}}const b=n=>{if(!n)return u;const f="id"in n?n.id:(0,r.uniqueId)("route-");if(Object.keys(n).length===0)return{...u,id:f};const N=[];n.routes?.forEach(I=>{const K=b(I);N.push(K)});const T=n.object_matchers?.map(I=>({name:I[0],operator:I[1],value:I[2]}))??[],O=n.matchers?.map(I=>(0,E.cm)((0,C.tC)(I)))??[];return{id:f,object_matchers:[...O,...T,...g(n.match,!1),...g(n.match_re,!0)],continue:n.continue??!1,receiver:n.receiver??"",overrideGrouping:Array.isArray(n.group_by)&&n.group_by.length>0,groupBy:n.group_by??void 0,overrideTimings:[n.group_wait,n.group_interval,n.repeat_interval].some(Boolean),groupWaitValue:n.group_wait??"",groupIntervalValue:n.group_interval??"",repeatIntervalValue:n.repeat_interval??"",routes:N,muteTimeIntervals:n.mute_time_intervals??[]}},L=(n,f,N)=>{const T=(0,d.Tx)(f.id??"",N),{overrideGrouping:O,groupBy:I,overrideTimings:K,groupWaitValue:Y,groupIntervalValue:Z,repeatIntervalValue:Q,receiver:X}=f,z=void 0,te=O?I:z,ae=K&&Y?Y:z,re=K&&Z?Z:z,oe=K&&Q?Q:z,se=f.object_matchers?.filter(l=>l.name&&l.value&&l.operator).map(({name:l,operator:m,value:M})=>[l,m,M]),e=f.routes?.map(l=>L(n,l,N)),s={...T??{},continue:f.continue,group_by:te,object_matchers:se,match:void 0,match_re:void 0,group_wait:ae,group_interval:re,repeat_interval:oe,routes:e,mute_time_intervals:f.muteTimeIntervals,receiver:X};return n!==B.GC?(s.matchers=f.object_matchers?.map(({name:l,operator:m,value:M})=>`${l}${m}${M}`),s.object_matchers=void 0):(s.object_matchers=(0,C.QO)(s),s.matchers=void 0),f.receiver&&(s.receiver=f.receiver),s},F=n=>({label:n,value:n}),q=n=>(n??[]).map(F),J=n=>{if(n!==null)return n?h(n)??"":""},_=n=>n?v(n):[];function H(n){return n.length===0?!0:(0,y.wd)(n)||"Invalid duration format. Must be {number}{time_unit}"}const ie=n=>n.map(f=>{const[N,T,O]=f;return`${N}${T}${O}`}),ee=(n,f)=>{if(n.length===0)return!0;const N=H(n),T=H(f);if(N!==!0)return N;if(T!==!0)return T;const O=(0,y.Bg)(n),I=(0,y.Bg)(f);return I!==0&&O<I?"Repeat interval should be higher or equal to Group interval":!0}},5476:(k,A,a)=>{a.d(A,{SF:()=>E,Tx:()=>d,_P:()=>C,wB:()=>B});var r=a(56375),t=a.n(r),x=a(71803);const E=(y,g,h)=>{if(!d(g.id??"",h))throw new Error(`No such route with ID '${g.id}'`);function i(c){let p=c;if(c.id===g.id){const u=(0,x.Yg)(y,g,h);p=(0,r.omit)({...c,...u},"id")}return(0,r.omit)({...p,routes:c.routes?.map(i)},"id")}return i(h)},B=(y,g)=>{if(y.id===g.id)throw new Error("You cant remove the root policy");function h(v){return(0,r.omit)({...v,routes:v.routes?.reduce((i=[],c)=>(c.id===y.id||i.push(h(c)),i),[])},"id")}return h(g)},C=(y,g,h,v)=>{const i=(0,x.Yg)(y,g,v);function c(u){return u.id===h.id?{...u,routes:u.routes?.concat(i)}:{...u,routes:u.routes?.map(c)}}function p(u){return(0,r.omit)({...u,routes:u.routes?.map(p)},"id")}return p(c(v))};function d(y,g){return g.id===y?g:g.routes?.find(h=>d(y,h))}}}]);

//# sourceMappingURL=1816.cfd70edea8c4dd7f8534.js.map