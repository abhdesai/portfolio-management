"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[3258,9865],{95500:(Y,A,a)=>{a.d(A,{x:()=>h});var l=a(85960),n=a(95162),e=a(1992);function h(y){const b=(0,n.useDispatch)(),i=(0,l.useRef)(y);i.current=y,(0,l.useEffect)(()=>()=>{b((0,e.e)({cleanupAction:i.current}))},[b])}},84237:(Y,A,a)=>{a.d(A,{C0:()=>b,Uv:()=>h,Xq:()=>y});var l=a(85960),n=a(49199),e=a(67192),h=(i=>(i.ContactPoint="contact point",i.Template="template",i.MuteTiming="mute timing",i.AlertRule="alert rule",i.RootNotificationPolicy="root notification policy",i))(h||{});const y=({resource:i})=>l.createElement(n.b,{title:`This ${i} cannot be edited through the UI`,severity:"info"},"This ",i," has been provisioned, that means it was created by config. Please contact your server admin to update this ",i,"."),b=()=>l.createElement(e.C,{text:"Provisioned",color:"purple"})},55822:(Y,A,a)=>{a.d(A,{Z:()=>Re});var l=a(66681),n=a(93638),e=a(85960),h=a(10476),y=a(45220),b=a(47257),i=a(13086),B=a(40377),D=a(24956),O=a(7073),k=a(20519),L=a(29165),u=a(46002),w=a(96130);const De=({field:t})=>{const o=(0,b.wW)(xe);return e.createElement("div",null,e.createElement("span",{className:o.annotationTitle},"Custom annotation name and content"),e.createElement(D.I,{placeholder:"Enter custom annotation name...",width:18,...t,className:o.customAnnotationInput}))},xe=t=>({annotationTitle:(0,l.css)`
    color: ${t.colors.text.primary};
    margin-bottom: 3px;
  `,customAnnotationInput:(0,l.css)`
    margin-top: 5px;
    width: 100%;
  `}),Ce=De,Ie=({annotationField:t,annotations:o,annotation:c,index:M})=>{const{control:x}=(0,h.Gc)();return e.createElement(i.K,{direction:"column",gap:0},e.createElement("label",null,e.createElement(w.g,{name:`annotations.${M}.key`,defaultValue:t.key,render:({field:{ref:d,...g}})=>{if(!u.vY[c])return e.createElement(Ce,{field:g});let T;switch(t.key){case u.q6.dashboardUID:T="Dashboard and panel";case u.q6.panelID:T="";default:T=u.vY[c]&&u.vY[c]+" (optional)"}return e.createElement("span",{"data-testid":`annotation-key-${M}`},e.createElement(B.x,{color:"primary",variant:"bodySmall"},T))},control:x,rules:{required:{value:!!o[M]?.value,message:"Required."}}})),e.createElement(B.x,{variant:"bodySmall",color:"secondary"},u._y[c]))};var V=a(97666),ee=a(77294);const Se=({dashboard:t,panel:o,dashboardUid:c,panelId:M,onEditClick:x,onDeleteClick:d})=>{const g=(0,b.wW)(Pe),T=(0,ee.RQ)(t?.uid||c),P=(0,ee.yM)(t?.uid||c,o?.id?.toString()||M);return e.createElement("div",{className:g.container},t&&e.createElement("a",{href:T,className:g.link,target:"_blank",rel:"noreferrer","data-testid":"dashboard-annotation"},t.title," ",e.createElement(V.J,{name:"external-link-alt"})),!t&&e.createElement("span",{className:g.noLink},"Dashboard ",c," "),o&&e.createElement("a",{href:P,className:g.link,target:"_blank",rel:"noreferrer","data-testid":"panel-annotation"},o.title||"<No title>"," ",e.createElement(V.J,{name:"external-link-alt"})),!o&&e.createElement("span",{className:g.noLink}," - Panel ",M),(t||o)&&e.createElement(e.Fragment,null,e.createElement(V.J,{name:"pen",onClick:x,className:g.icon}),e.createElement(V.J,{name:"trash-alt",onClick:d,className:g.icon})))},Pe=t=>({container:(0,l.css)`
    margin-top: 5px;
  `,noLink:(0,l.css)`
    color: ${t.colors.text.secondary};
  `,link:(0,l.css)`
    color: ${t.colors.text.link};
    margin-right: ${t.spacing(1.5)};
  `,icon:(0,l.css)`
    margin-right: ${t.spacing(1)};
    cursor: pointer;
  `}),oe=Se;var se=a(56375),re=a(27160),ce=a(53565),ie=a(403),de=a(14607),X=a(7288),Ae=a(49199),s=a(96535),r=a(79468),I=a(58712);const S=I.C.injectEndpoints({endpoints:t=>({search:t.query({query:({query:o})=>{const c=new URLSearchParams({type:"dash-db",limit:"1000",page:"1",sort:"name_sort"});return o&&c.set("query",o),{url:`/api/search?${c.toString()}`}}}),dashboard:t.query({query:({uid:o})=>({url:`/api/dashboards/uid/${o}`})})})});var C=a(84513),p=a(27008);const $=(0,C.Z)(t=>{const{dashboard:o,meta:c}=structuredClone(t);return new p.f(o,c)});function U(t){return S.endpoints.dashboard.useQuery({uid:t??""},{skip:!t,selectFromResult:({currentData:c,data:M,...x})=>({dashboardModel:c?$(c):void 0,...x})})}function N(t,o){return t.title&&o.title?t.title.localeCompare(o.title):t.title&&!o.title?1:!t.title&&o.title?-1:0}const W=({dashboardUid:t,panelId:o,isOpen:c,onChange:M,onDismiss:x})=>{const d=(0,b.wW)(q),[g,T]=(0,e.useState)(t),[P,pe]=(0,e.useState)(o),[te,Le]=(0,e.useState)(""),[_,J]=(0,e.useState)(""),[ae,fe]=(0,e.useState)(""),{useSearchQuery:Ne}=S,{currentData:G=[],isFetching:Z}=Ne({query:_}),{dashboardModel:j,isFetching:ne}=U(g),Me=(0,e.useCallback)(v=>{T(v),pe(void 0)},[]),Ee=f(j),ve=Ee.filter(v=>v.title?.toLowerCase().includes(ae.toLowerCase())).sort(N)??[],m=Ee.find(v=>z(v)&&v.id?.toString()===P),E=(0,e.useMemo)(()=>G.map(v=>v.uid).indexOf(g??""),[G,g]),K=t&&t===g,H=E>=0,Q=(0,e.useCallback)(v=>{const F=E>=0;K&&F&&v?.scrollToItem(E,"smart")},[K,E]);(0,re.Z)(()=>{J(te)},500,[te]);const ye=({index:v,style:F})=>{const R=G[v],he=g===R.uid;return e.createElement("button",{type:"button",title:R.title,style:F,className:(0,l.cx)(d.rowButton,{[d.rowOdd]:v%2===1,[d.rowSelected]:he}),onClick:()=>Me(R.uid)},e.createElement("div",{className:(0,l.cx)(d.dashboardTitle,d.rowButtonTitle)},R.title),e.createElement("div",{className:d.dashboardFolder},e.createElement(V.J,{name:"folder"})," ",R.folderTitle??"General"))},le=({index:v,style:F})=>{const R=ve[v],he=R.title||"<No title>",$e=!!R.id&&P===R.id,Te=R.type==="graph"||R.type==="timeseries",be=!z(R);return e.createElement("button",{type:"button",style:F,disabled:be,className:(0,l.cx)(d.rowButton,d.panelButton,{[d.rowOdd]:v%2===1,[d.rowSelected]:$e}),onClick:()=>be?se.noop:pe(R.id)},e.createElement("div",{className:d.rowButtonTitle,title:he},he),!Te&&!be&&e.createElement(de.u,{content:"Alert tab will be disabled for this panel. It is only supported on graph and timeseries panels"},e.createElement(V.J,{name:"exclamation-triangle",className:d.warnIcon,"data-testid":"warning-icon"})),be&&e.createElement(de.u,{content:"This panel does not have a valid identifier."},e.createElement(V.J,{name:"info-circle","data-testid":"info-icon"})))};return e.createElement(X.u,{title:"Select dashboard and panel",closeOnEscape:!0,isOpen:c,onDismiss:x,className:d.modal,contentClassName:d.modalContent},!H&&t&&j&&e.createElement(Ae.b,{title:"Current selection",severity:"info",topSpacing:0,bottomSpacing:1,className:d.modalAlert},e.createElement("div",null,"Dashboard: ",j.title," (",j.uid,") in folder"," ",j.meta?.folderTitle??"General"),m&&e.createElement("div",null,"Panel: ",m.title," (",m.id,")")),e.createElement("div",{className:d.container},e.createElement(s.H,{value:te,onChange:Le,title:"Search dashboard",placeholder:"Search dashboard",autoFocus:!0}),e.createElement(s.H,{value:ae,onChange:fe,title:"Search panel",placeholder:"Search panel"}),e.createElement("div",{className:d.column},Z&&e.createElement(r.u,{text:"Loading dashboards...",className:d.loadingPlaceholder}),!Z&&e.createElement(ce.Z,null,({height:v,width:F})=>e.createElement(ie.t7,{ref:Q,itemSize:50,height:v,width:F,itemCount:G.length},ye))),e.createElement("div",{className:d.column},!g&&!ne&&e.createElement("div",{className:d.selectDashboardPlaceholder},e.createElement("div",null,"Select a dashboard to get a list of available panels")),ne&&e.createElement(r.u,{text:"Loading dashboard...",className:d.loadingPlaceholder}),g&&!ne&&e.createElement(ce.Z,null,({width:v,height:F})=>e.createElement(ie.t7,{itemSize:32,height:F,width:v,itemCount:ve.length},le)))),e.createElement(X.u.ButtonRow,null,e.createElement(L.zx,{type:"button",variant:"secondary",onClick:x,fill:"text"},"Cancel"),e.createElement(L.zx,{type:"button",variant:"primary",disabled:!(g&&P),onClick:()=>{g&&P&&M(g,P)}},"Confirm")))};function f(t){if(!t)return[];const o=t.panels.filter(x=>x.type!=="row"),c=t.panels.filter(x=>x.collapsed).flatMap(x=>x.panels??[]);return[...o,...c]}const z=t=>typeof t.id=="number"&&typeof t.type=="string",q=t=>{const o=(0,L.gN)(t);return{container:(0,l.css)`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: min-content auto;
      gap: ${t.spacing(2)};
      flex: 1;
    `,column:(0,l.css)`
      flex: 1 1 auto;
    `,dashboardTitle:(0,l.css)`
      height: 22px;
      font-weight: ${t.typography.fontWeightBold};
    `,dashboardFolder:(0,l.css)`
      height: 20px;
      font-size: ${t.typography.bodySmall.fontSize};
      color: ${t.colors.text.secondary};
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      column-gap: ${t.spacing(1)};
      align-items: center;
    `,rowButton:(0,l.css)`
      ${o};
      padding: ${t.spacing(.5)};
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      white-space: nowrap;
      cursor: pointer;
      border: 2px solid transparent;

      &:disabled {
        cursor: not-allowed;
        color: ${t.colors.text.disabled};
      }
    `,rowButtonTitle:(0,l.css)`
      text-overflow: ellipsis;
      overflow: hidden;
    `,rowSelected:(0,l.css)`
      border-color: ${t.colors.primary.border};
    `,rowOdd:(0,l.css)`
      background-color: ${t.colors.background.secondary};
    `,panelButton:(0,l.css)`
      display: flex;
      gap: ${t.spacing(1)};
      justify-content: space-between;
      align-items: center;
    `,loadingPlaceholder:(0,l.css)`
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,selectDashboardPlaceholder:(0,l.css)`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-weight: ${t.typography.fontWeightBold};
    `,modal:(0,l.css)`
      height: 100%;
    `,modalContent:(0,l.css)`
      flex: 1;
      display: flex;
      flex-direction: column;
    `,modalAlert:(0,l.css)`
      flex-grow: 0;
    `,warnIcon:(0,l.css)`
      fill: ${t.colors.warning.main};
    `}};var ue=a(21863),me=a(78985);const Be=()=>{const t=(0,b.wW)(ge),[o,c]=(0,y.Z)(!1),{control:M,register:x,watch:d,formState:{errors:g},setValue:T}=(0,h.Gc)(),P=d("annotations"),{fields:pe,append:te,remove:Le}=(0,h.Dq)({control:M,name:"annotations"}),_=P.find(m=>m.key===u.q6.dashboardUID)?.value,J=Number(P.find(m=>m.key===u.q6.panelID)?.value),[ae,fe]=(0,e.useState)(void 0),[Ne,G]=(0,e.useState)(void 0),{dashboardModel:Z,isFetching:j}=U(_);(0,e.useEffect)(()=>{if(j||!Z)return;fe(Z);const E=f(Z).find(K=>K.id===J);G(E)},[J,Z,j]);const ne=(m,E)=>{const K=(0,n.Uy)(P,H=>{const Q=H.find(le=>le.key===u.q6.dashboardUID),ye=H.find(le=>le.key===u.q6.panelID);Q?Q.value=m:H.push({key:u.q6.dashboardUID,value:m}),ye?ye.value=E.toString():H.push({key:u.q6.panelID,value:E.toString()})});T("annotations",K),c(!1)},Me=()=>{const m=P.filter(E=>E.key!==u.q6.dashboardUID&&E.key!==u.q6.panelID);T("annotations",m),fe(void 0),G(void 0)},Ee=()=>{c(!0)};function ve(){const m="https://grafana.com/docs/grafana/latest/alerting/fundamentals/annotation-label/variables-label-annotation";return e.createElement(i.K,{direction:"row",gap:.5,alignItems:"baseline"},e.createElement(B.x,{variant:"bodySmall",color:"secondary"},"Add annotations to provide more context in your alert notifications."),e.createElement(ue.h,{contentText:`Annotations add metadata to provide more information on the alert in your alert notifications.
          For example, add a Summary annotation to tell you which value caused the alert to fire or which server it happened on.
          Annotations can contain a combination of text and template code.`,externalLink:m,linkText:"Read about annotations",title:"Annotations"}))}return e.createElement(me.z,{stepNo:4,title:"Add annotations",description:ve(),fullWidth:!0},e.createElement(i.K,{direction:"column",gap:1},pe.map((m,E)=>{const K=P[E]?.key?.toLocaleLowerCase().endsWith("url"),H=K?D.I:O.K,Q=m.key;return e.createElement("div",{key:m.id,className:t.flexRow},e.createElement("div",null,e.createElement(Ie,{annotationField:m,annotations:P,annotation:Q,index:E}),_&&J&&m.key===u.q6.dashboardUID&&e.createElement(oe,{dashboard:ae,panel:Ne,dashboardUid:_.toString(),panelId:J.toString(),onEditClick:Ee,onDeleteClick:Me}),e.createElement("div",{className:t.annotationValueContainer},e.createElement(k.g,{hidden:m.key===u.q6.dashboardUID||m.key===u.q6.panelID,className:(0,l.cx)(t.flexRowItemMargin,t.field),invalid:!!g.annotations?.[E]?.value?.message,error:g.annotations?.[E]?.value?.message},e.createElement(H,{"data-testid":`annotation-value-${E}`,className:(0,l.cx)(t.annotationValueInput,{[t.textarea]:!K}),...x(`annotations.${E}.value`),placeholder:K?"https://":m.key&&`Enter a ${m.key}...`||"Enter custom annotation content...",defaultValue:m.value})),!u.vY[Q]&&e.createElement(L.zx,{type:"button",className:t.deleteAnnotationButton,"aria-label":"delete annotation",icon:"trash-alt",variant:"secondary",onClick:()=>Le(E)}))))}),e.createElement(i.K,{direction:"row",gap:1},e.createElement("div",{className:t.addAnnotationsButtonContainer},e.createElement(L.zx,{icon:"plus",type:"button",variant:"secondary",onClick:()=>{te({key:"",value:""})}},"Add custom annotation"),!ae&&e.createElement(L.zx,{type:"button",variant:"secondary",icon:"dashboard",onClick:()=>c(!0)},"Link dashboard and panel"))),o&&e.createElement(W,{isOpen:!0,dashboardUid:_,panelId:J,onChange:ne,onDismiss:()=>c(!1)})))},ge=t=>({annotationValueInput:(0,l.css)`
    width: 394px;
  `,textarea:(0,l.css)`
    height: 76px;
  `,addAnnotationsButtonContainer:(0,l.css)`
    margin-top: ${t.spacing(1)};
    gap: ${t.spacing(1)};
    display: flex;
  `,field:(0,l.css)`
    margin-bottom: ${t.spacing(.5)};
  `,flexRow:(0,l.css)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  `,flexRowItemMargin:(0,l.css)`
    margin-top: ${t.spacing(1)};
  `,deleteAnnotationButton:(0,l.css)`
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
  `,annotationTitle:(0,l.css)`
    color: ${t.colors.text.primary};
    margin-bottom: 3px;
  `,annotationContainer:(0,l.css)`
    margin-top: 5px;
  `,annotationDescription:(0,l.css)`
    color: ${t.colors.text.secondary};
  `,annotationValueContainer:(0,l.css)`
    display: flex;
  `}),Re=Be},124:(Y,A,a)=>{a.d(A,{Z:()=>Ae});var l=a(66681),n=a(85960),e=a(10476),h=a(29165),y=a(47257),b=a(79468),i=a(13086),B=a(20519),D=a(114),O=a(24956),k=a(40377),L=a(95162),u=a(92746),w=a(5970),De=a(10934),xe=a(27436);const Ce=(0,De.c)({ignoreCase:!1});function Oe(s,r){return Ce({label:s.label??"",value:s.value??"",data:{}},r)}const Ie=(s,r,I)=>{const S=I.some(p=>p.label===s),C=s.trim().length;return!S&&!!C},ee=n.forwardRef(function({onChange:r,options:I,defaultValue:S,type:C,onOpenMenu:p=()=>{}},$){return n.createElement("div",{ref:$},n.createElement(B.g,{disabled:!1,"data-testid":`alertlabel-${C}-picker`},n.createElement(xe.Ph,{placeholder:`Choose ${C}`,width:29,className:"ds-picker select-container",backspaceRemovesValue:!1,onChange:r,onOpenMenu:p,filterOption:Oe,isValidNewOption:Ie,options:I,maxMenuHeight:500,noOptionsMessage:"No labels found",defaultValue:S,allowCustomValue:!0})))});var Se=a(21863);const Pe=s=>{const r=(0,L.useDispatch)();(0,n.useEffect)(()=>{r((0,w.IA)(s))},[r,s]);const S=(0,u._)(p=>p.rulerRules)[s],C=(0,n.useMemo)(()=>{const p={},$=S?.result;return $&&Object.values($).flatMap(N=>N).flatMap(N=>N.rules).forEach(N=>{N.labels&&Object.entries(N.labels).forEach(([W,f])=>{if(!f)return;const z=p[W];z?z.add(f):p[W]=new Set([f])})}),p},[S]);return{loading:S?.loading,labelsByKey:C}};function oe(s=[]){return Array.from(s,r=>({label:r,value:r}))}const se=({remove:s,className:r,index:I})=>n.createElement(h.zx,{className:r,"aria-label":"delete label",icon:"trash-alt","data-testid":`delete-label-${I}`,variant:"secondary",onClick:()=>{s(I)}}),re=({append:s,className:r})=>n.createElement(h.zx,{className:r,icon:"plus-circle",type:"button",variant:"secondary",onClick:()=>{s({key:"",value:""})}},"Add label"),ce=({dataSourceName:s})=>{const r=(0,y.wW)(X),{register:I,control:S,watch:C,formState:{errors:p},setValue:$}=(0,e.Gc)(),U=C("labels"),{fields:N,remove:W,append:f}=(0,e.Dq)({control:S,name:"labels"}),{loading:z,labelsByKey:q}=Pe(s),[ue,me]=(0,n.useState)(""),Be=(0,n.useMemo)(()=>oe(Object.keys(q)),[q]),ge=(0,n.useCallback)(t=>oe(q[t]),[q]),Re=(0,n.useMemo)(()=>ge(ue),[ue,ge]);return n.createElement(n.Fragment,null,z&&n.createElement(b.u,{text:"Loading"}),!z&&n.createElement(i.K,{direction:"column",gap:.5},N.map((t,o)=>n.createElement("div",{key:t.id},n.createElement("div",{className:(0,l.cx)(r.flexRow,r.centerAlignRow)},n.createElement(B.g,{className:r.labelInput,invalid:!!p.labels?.[o]?.key?.message,error:p.labels?.[o]?.key?.message,"data-testid":`label-key-${o}`},n.createElement(ee,{...I(`labels.${o}.key`,{required:{value:!!U[o]?.value,message:"Required."}}),defaultValue:t.key?{label:t.key,value:t.key}:void 0,options:Be,onChange:c=>{$(`labels.${o}.key`,c.value),me(c.value)},type:"key"})),n.createElement(D.W,{className:r.equalSign},"="),n.createElement(B.g,{className:r.labelInput,invalid:!!p.labels?.[o]?.value?.message,error:p.labels?.[o]?.value?.message,"data-testid":`label-value-${o}`},n.createElement(ee,{...I(`labels.${o}.value`,{required:{value:!!U[o]?.key,message:"Required."}}),defaultValue:t.value?{label:t.value,value:t.value}:void 0,options:Re,onChange:c=>{$(`labels.${o}.value`,c.value)},onOpenMenu:()=>{me(U[o].key)},type:"value"})),n.createElement(se,{className:r.deleteLabelButton,index:o,remove:W})))),n.createElement(re,{className:r.addLabelButton,append:f})))},ie=()=>{const s=(0,y.wW)(X),{register:r,control:I,watch:S,formState:{errors:C}}=(0,e.Gc)(),p=S("labels"),{fields:$,remove:U,append:N}=(0,e.Dq)({control:I,name:"labels"});return n.createElement(n.Fragment,null,$.map((W,f)=>n.createElement("div",{key:W.id},n.createElement("div",{className:(0,l.cx)(s.flexRow,s.centerAlignRow),"data-testid":"alertlabel-input-wrapper"},n.createElement(B.g,{className:s.labelInput,invalid:!!C.labels?.[f]?.key?.message,error:C.labels?.[f]?.key?.message},n.createElement(O.I,{...r(`labels.${f}.key`,{required:{value:!!p[f]?.value,message:"Required."}}),placeholder:"key","data-testid":`label-key-${f}`,defaultValue:W.key})),n.createElement(D.W,{className:s.equalSign},"="),n.createElement(B.g,{className:s.labelInput,invalid:!!C.labels?.[f]?.value?.message,error:C.labels?.[f]?.value?.message},n.createElement(O.I,{...r(`labels.${f}.value`,{required:{value:!!p[f]?.key,message:"Required."}}),placeholder:"value","data-testid":`label-value-${f}`,defaultValue:W.value})),n.createElement(se,{className:s.deleteLabelButton,index:f,remove:U})))),n.createElement(re,{className:s.addLabelButton,append:N}))},de=({dataSourceName:s})=>{const r=(0,y.wW)(X);return n.createElement("div",null,n.createElement(i.K,{direction:"column",gap:1},n.createElement(k.x,{element:"h5"},"Labels"),n.createElement(i.K,{direction:"row",gap:1},n.createElement(k.x,{variant:"bodySmall",color:"secondary"},"Add labels to your rule to annotate your rules, ease searching, or route to a notification policy."),n.createElement(Se.h,{contentText:`The dropdown only displays labels that you have previously used for alerts. 
            Select a label from the options below or type in a new one.`,title:"Labels"}))),n.createElement("div",{className:r.labelsContainer}),s?n.createElement(ce,{dataSourceName:s}):n.createElement(ie,null))},X=s=>({icon:(0,l.css)({marginRight:s.spacing(.5)}),flexColumn:(0,l.css)({display:"flex",flexDirection:"column"}),flexRow:(0,l.css)({display:"flex",flexDirection:"row",justifyContent:"flex-start","& + button":{marginLeft:s.spacing(.5)}}),deleteLabelButton:(0,l.css)({marginLeft:s.spacing(.5),alignSelf:"flex-start"}),addLabelButton:(0,l.css)({flexGrow:0,alignSelf:"flex-start"}),centerAlignRow:(0,l.css)({alignItems:"baseline"}),equalSign:(0,l.css)({alignSelf:"flex-start",width:"28px",justifyContent:"center",marginLeft:s.spacing(.5)}),labelInput:(0,l.css)({width:"175px",marginBottom:`-${s.spacing(1)}`,"& + &":{marginLeft:s.spacing(1)}}),labelsContainer:(0,l.css)({marginBottom:s.spacing(3)})}),Ae=de},21863:(Y,A,a)=>{a.d(A,{h:()=>B});var l=a(66681),n=a(85960),e=a(47257),h=a(57652),y=a(13086),b=a(97666),i=a(40377);function B({contentText:O,externalLink:k,linkText:L,title:u}){const w=(0,e.wW)(D);return n.createElement(h.P,{content:n.createElement("div",{className:w.mutedText},O),title:n.createElement(y.K,{gap:1,direction:"row"},n.createElement(b.J,{name:"question-circle"}),u),footer:k?n.createElement("a",{href:k,target:"_blank",rel:"noreferrer"},n.createElement(y.K,{direction:"row",gap:.5,alignItems:"center"},n.createElement(i.x,{color:"link"},L," ",n.createElement(b.J,{size:"sm",name:"external-link-alt"})))):void 0,closeButton:!0,placement:"bottom-start"},n.createElement("div",{className:w.helpInfo},n.createElement(y.K,{direction:"row",alignItems:"center",gap:.5},n.createElement(b.J,{name:"question-circle",size:"sm"}),n.createElement(i.x,{variant:"bodySmall",color:"primary"},"Need help?"))))}const D=O=>({mutedText:(0,l.css)`
    color: ${O.colors.text.secondary};
    font-size: ${O.typography.size.sm};
  `,helpInfo:(0,l.css)`
    cursor: pointer;
    text-decoration: underline;
  `})},78985:(Y,A,a)=>{a.d(A,{z:()=>i});var l=a(66681),n=a(85960),e=a(47257),h=a(51637),y=a(40377),b=a(13086);const i=({title:D,stepNo:O,children:k,fullWidth:L=!1,description:u})=>{const w=(0,e.wW)(B);return n.createElement("div",{className:w.parent},n.createElement(h.C,{className:(0,l.cx)(L&&w.fullWidth),label:n.createElement(y.x,{variant:"h3"},O,". ",D)},n.createElement(b.K,{direction:"column"},u&&n.createElement("div",{className:w.description},u),k)))},B=D=>({parent:(0,l.css)`
    display: flex;
    flex-direction: row;
    max-width: ${D.breakpoints.values.xl}px;
    border: solid 1px ${D.colors.border.weak};
    border-radius: ${D.shape.radius.default};
    padding: ${D.spacing(2)} ${D.spacing(3)};
  `,description:(0,l.css)`
    margin-top: -${D.spacing(2)};
  `,fullWidth:(0,l.css)`
    width: 100%;
  `})},70335:(Y,A,a)=>{a.d(A,{W:()=>n});var l=a(81828);function n(e,h){const y=l.alertmanagerApi.endpoints.getAlertmanagerConfiguration.useQuery(e??"",{...h,skip:!e});return{...y,error:y.error}}}}]);

//# sourceMappingURL=3258.41f3cbbb44fde2fdb3fc.js.map