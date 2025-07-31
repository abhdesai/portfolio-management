"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1783],{95500:(F,M,a)=>{a.d(M,{x:()=>x});var e=a(85960),p=a(95162),d=a(1992);function x(y){const P=(0,p.useDispatch)(),T=(0,e.useRef)(y);T.current=y,(0,e.useEffect)(()=>()=>{P((0,d.e)({cleanupAction:T.current}))},[P])}},52410:(F,M,a)=>{a.r(M),a.d(M,{default:()=>xt});var e=a(85960),p=a(30694),d=a(49199),x=a(8958),y=a(95162),P=a(80679),T=a(39512),N=a(28157),s=a(66681),O=a(56375),f=a(10476),C=a(27160),E=a(18678),B=a(9833),L=a(85745),Z=a(90857),b=a(47257),_=a(51637),U=a(20519),w=a(24956),D=a(7073),I=a(29165),K=a(95500),R=a(16901),V=a(75636),Y=a(92746),$=a(5970),z=a(98724),ye=a(41460),Q=a(77294),ee=a(30422),Se=a(96130),xe=a(27436),Ce=a(75064);const De=({className:t})=>{const n=(0,b.wW)(Me),r=(0,f.Gc)(),{control:o,register:l,formState:{errors:u}}=r,{fields:c=[],append:v,remove:i}=(0,f.Dq)({name:"matchers"});return e.createElement("div",{className:(0,s.cx)(t,n.wrapper)},e.createElement(U.g,{label:"Matching labels",required:!0},e.createElement("div",null,e.createElement("div",{className:n.matchers},c.map((h,m)=>e.createElement("div",{className:n.row,key:`${h.id}`,"data-testid":"matcher"},e.createElement(U.g,{label:"Label",invalid:!!u?.matchers?.[m]?.name,error:u?.matchers?.[m]?.name?.message},e.createElement(w.I,{...l(`matchers.${m}.name`,{required:{value:!0,message:"Required."}}),defaultValue:h.name,placeholder:"label"})),e.createElement(U.g,{label:"Operator"},e.createElement(Se.g,{control:o,render:({field:{onChange:A,ref:g,...S}})=>e.createElement(xe.Ph,{...S,onChange:G=>A(G.value),className:n.matcherOptions,options:z.tA,"aria-label":"operator"}),defaultValue:h.operator||z.tA[0].value,name:`matchers.${m}.operator`,rules:{required:{value:!0,message:"Required."}}})),e.createElement(U.g,{label:"Value",invalid:!!u?.matchers?.[m]?.value,error:u?.matchers?.[m]?.value?.message},e.createElement(w.I,{...l(`matchers.${m}.value`,{required:{value:!0,message:"Required."}}),defaultValue:h.value,placeholder:"value"})),c.length>1&&e.createElement(Ce.h,{className:n.removeButton,tooltip:"Remove matcher",name:"trash-alt",onClick:()=>i(m)},"Remove")))),e.createElement(I.zx,{type:"button",icon:"plus",variant:"secondary",onClick:()=>{const h={name:"",value:"",operator:R._M.equal};v(h)}},"Add matcher"))))},Me=t=>({wrapper:(0,s.css)`
      margin-top: ${t.spacing(2)};
    `,row:(0,s.css)`
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      background-color: ${t.colors.background.secondary};
      padding: ${t.spacing(1)} ${t.spacing(1)} 0 ${t.spacing(1)};
      & > * + * {
        margin-left: ${t.spacing(2)};
      }
    `,removeButton:(0,s.css)`
      margin-left: ${t.spacing(1)};
      margin-top: ${t.spacing(2.5)};
    `,matcherOptions:(0,s.css)`
      min-width: 140px;
    `,matchers:(0,s.css)`
      max-width: ${t.breakpoints.values.sm}px;
      margin: ${t.spacing(1)} 0;
      padding-top: ${t.spacing(.5)};
    `}),Pe=De;var Ie=a(76275);const Te=()=>{const{control:t,getValues:n}=(0,f.Gc)(),{field:{onChange:r,value:o},fieldState:{invalid:l}}=(0,f.bc)({name:"startsAt",control:t,rules:{validate:S=>n().endsAt>S}}),{field:{onChange:u,value:c},fieldState:{invalid:v}}=(0,f.bc)({name:"endsAt",control:t,rules:{validate:S=>n().startsAt<S}}),{field:{onChange:i,value:h}}=(0,f.bc)({name:"timeZone",control:t}),m=l||v,A=(0,L.CQ)(o),g=(0,L.CQ)(c);return e.createElement(U.g,{className:Oe.timeRange,label:"Silence start and end",error:m?"To is before or the same as from":"",invalid:m},e.createElement(Ie.K,{value:{from:A,to:g,raw:{from:A,to:g}},timeZone:h,onChange:S=>{r((0,L.CQ)(S.from)),u((0,L.CQ)(S.to))},onChangeTimeZone:S=>i(S),hideTimeZone:!1,hideQuickRanges:!0,placeholder:"Select time range"}))},Oe={timeRange:(0,s.css)`
    width: 400px;
  `};var be=a(67192),Re=a(79468),$e=a(81828),Ne=a(47689),se=a(2698),le=a(79253),ce=a(30209);const Be=({amSourceName:t,matchers:n})=>{const{useGetAlertmanagerAlertsQuery:r}=$e.alertmanagerApi,o=(0,b.wW)(oe),l=We(),u=n.some(m=>m.value&&m.name),{currentData:c=[],isFetching:v,isError:i}=r({amSourceName:t,filter:{matchers:n}},{skip:!u,refetchOnMountOrArgChange:!0}),h=c.map(m=>({id:m.fingerprint,data:m}));return e.createElement("div",null,e.createElement("h4",{className:o.title},"Affected alert instances",h.length>0?e.createElement(be.C,{className:o.badge,color:"blue",text:h.length}):null),!u&&e.createElement("span",null,"Add a valid matcher to see affected alerts"),i&&e.createElement(d.b,{title:"Preview not available",severity:"error"},"Error occured when generating affected alerts preview. Are you matchers valid?"),v&&e.createElement(Re.u,{text:"Loading..."}),!v&&!i&&u&&e.createElement("div",{className:o.table},h.length>0?e.createElement(le.t,{items:h,isExpandable:!1,cols:l,pagination:{itemsPerPage:10}}):e.createElement("span",null,"No matching alert instances found")))};function We(){const t=(0,b.wW)(oe);return[{id:"state",label:"State",renderCell:function({data:r}){return e.createElement(ce.G,{state:r.status.state})},size:"120px",className:t.stateColumn},{id:"labels",label:"Labels",renderCell:function({data:r}){return e.createElement(se.s,{labels:r.labels,size:"sm"})},size:"auto"},{id:"created",label:"Created",renderCell:function({data:r}){return e.createElement(e.Fragment,null,(0,Ne.gV)(r.startsAt)?"-":(0,L.CQ)(r.startsAt).format("YYYY-MM-DD HH:mm:ss"))},size:"180px"}]}const oe=t=>({table:(0,s.css)`
    max-width: ${t.breakpoints.values.lg}px;
  `,moreMatches:(0,s.css)`
    margin-top: ${t.spacing(1)};
  `,title:(0,s.css)`
    display: flex;
    align-items: center;
  `,badge:(0,s.css)`
    margin-left: ${t.spacing(1)};
  `,stateColumn:(0,s.css)`
    display: flex;
    align-items: center;
  `}),Le=t=>{const n={},r=t.get("comment"),o=t.getAll("matcher"),l=(0,ye.RT)(o);return l.length&&(n.matchers=l.map(z.cm)),r&&(n.comment=r),n},Ue=(t,n)=>{const r=new Date;if(n){const l=Date.parse(n.endsAt)<Date.now()?{start:r,end:(0,E.Ks)(r,{hours:2})}:{start:new Date(n.startsAt),end:new Date(n.endsAt)};return{id:n.id,startsAt:l.start.toISOString(),endsAt:l.end.toISOString(),comment:n.comment,createdBy:n.createdBy,duration:(0,E.vT)(l),isRegex:!1,matchers:n.matchers?.map(z.cm)||[],matcherName:"",matcherValue:"",timeZone:B.Ys}}else{const o=(0,E.Ks)(r,{hours:2});return{id:"",startsAt:r.toISOString(),endsAt:o.toISOString(),comment:`created ${(0,L.CQ)().format("YYYY-MM-DD HH:mm")}`,createdBy:Z.config.bootData.user.name,duration:"2h",isRegex:!1,matchers:[{name:"",value:"",operator:R._M.equal}],matcherName:"",matcherValue:"",timeZone:B.Ys,...Le(t)}}},Ke=({silence:t,alertManagerSourceName:n})=>{const[r]=(0,V.j)(),o=(0,e.useMemo)(()=>Ue(r,t),[t,r]),l=(0,f.cI)({defaultValues:o}),u=(0,y.useDispatch)(),c=(0,b.wW)(ze),[v,i]=(0,e.useState)(o.matchers.map(z._J)),{loading:h}=(0,Y._)(W=>W.updateSilence);(0,K.x)(W=>W.unifiedAlerting.updateSilence=ee.oq);const{register:m,handleSubmit:A,formState:g,watch:S,setValue:G,clearErrors:Ct}=l,Dt=W=>{const{id:J,startsAt:q,endsAt:Pt,comment:It,createdBy:Tt,matchers:Ot}=W,bt=Ot.map(z._J),pe=(0,O.pickBy)({id:J,startsAt:q,endsAt:Pt,comment:It,createdBy:Tt,matchers:bt},Rt=>!!Rt);u((0,$.QY)({alertManagerSourceName:n,payload:pe,exitOnSave:!0,successMessage:`Silence ${pe.id?"updated":"created"}`}))},j=S("duration"),H=S("startsAt"),k=S("endsAt"),fe=S("matchers"),[he,Ae]=(0,e.useState)(j);(0,C.Z)(()=>{if((0,E.qb)(H)&&(0,E.qb)(k))if(j!==he)G("endsAt",(0,L.CQ)((0,E.Ks)(new Date(H),(0,E.RA)(j))).toISOString()),Ae(j);else{const W=new Date(H).valueOf();if(new Date(k).valueOf()>W){const q=(0,E.vT)({start:new Date(H),end:new Date(k)});G("duration",q),Ae(q)}}},700,[Ct,j,k,he,G,H]),(0,C.Z)(()=>{const W=fe.filter(J=>J.name&&J.value).map(z._J);(0,O.isEqual)(v,W)||i(W)},700,[fe]);const Mt=!!(Z.config.bootData.user.isSignedIn&&Z.config.bootData.user.name);return e.createElement(f.RV,{...l},e.createElement("form",{onSubmit:A(Dt)},e.createElement(_.C,{label:`${t?"Recreate silence":"Create silence"}`},e.createElement("div",{className:(0,s.cx)(c.flexRow,c.silencePeriod)},e.createElement(Te,null),e.createElement(U.g,{label:"Duration",invalid:!!g.errors.duration,error:g.errors.duration&&(g.errors.duration.type==="required"?"Required field":g.errors.duration.message)},e.createElement(w.I,{className:c.createdBy,...m("duration",{validate:W=>Object.keys((0,E.RA)(W)).length===0?"Invalid duration. Valid example: 1d 4h (Available units: y, M, w, d, h, m, s)":void 0}),id:"duration"}))),e.createElement(Pe,null),e.createElement(U.g,{className:(0,s.cx)(c.field,c.textArea),label:"Comment",required:!0,error:g.errors.comment?.message,invalid:!!g.errors.comment},e.createElement(D.K,{...m("comment",{required:{value:!0,message:"Required."}}),rows:5,placeholder:"Details about the silence"})),!Mt&&e.createElement(U.g,{className:(0,s.cx)(c.field,c.createdBy),label:"Created By",required:!0,error:g.errors.createdBy?.message,invalid:!!g.errors.createdBy},e.createElement(w.I,{...m("createdBy",{required:{value:!0,message:"Required."}}),placeholder:"Who's creating the silence"})),e.createElement(Be,{amSourceName:n,matchers:v})),e.createElement("div",{className:c.flexRow},h&&e.createElement(I.zx,{disabled:!0,icon:"spinner",variant:"primary"},"Saving..."),!h&&e.createElement(I.zx,{type:"submit"},"Save silence"),e.createElement(I.Qj,{href:(0,Q.eQ)("alerting/silences",n),variant:"secondary"},"Cancel"))))},ze=t=>({field:(0,s.css)`
    margin: ${t.spacing(1,0)};
  `,textArea:(0,s.css)`
    max-width: ${t.breakpoints.values.sm}px;
  `,createdBy:(0,s.css)`
    width: 200px;
  `,flexRow:(0,s.css)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    & > * {
      margin-right: ${t.spacing(1)};
    }
  `,silencePeriod:(0,s.css)`
    max-width: ${t.breakpoints.values.sm}px;
  `}),ie=Ke;var X=a(13446),te=a(13086),Fe=a(96525),ae=a(97666),Qe=a(59672),ne=a(763),re=a(57297),we=a(53914);const me=({className:t,...n})=>{const r=(0,b.wW)(Ye);return e.createElement(I.zx,{variant:"secondary",size:"xs",className:(0,s.cx)(r.wrapper,t),...n})},Ye=t=>({wrapper:(0,s.css)`
    height: 24px;
    font-size: ${t.typography.bodySmall.fontSize};
  `});var Ze=a(90504),Ve=a(7042);const Ge=({matchers:t})=>{const n=(0,b.wW)(je);return e.createElement("div",null,e.createElement(Ve.P,{className:n.tags,tags:t.map(r=>`${r.name}${(0,z.zy)(r)}${r.value}`)}))},je=()=>({tags:(0,s.css)`
    justify-content: flex-start;
  `});var He=a(11318),Je=a(64409),Xe=a(41879),ke=a(5907);const qe=({alertManagerSourceName:t})=>{const n=(0,ke.QX)(t);return Xe.contextSrv.hasPermission(n.create)?e.createElement(Je.Z,{title:"You haven't created any silences yet",buttonIcon:"bell-slash",buttonLink:(0,Q.eQ)("alerting/silence/new",t),buttonTitle:"Create silence"}):e.createElement(He._,{callToActionElement:e.createElement("div",null),message:"No silences found."})};var _e=a(14806),et=a(44211);const tt=({alert:t,className:n})=>{const[r,o]=(0,e.useState)(!0),l=(0,E.vT)({start:new Date(t.startsAt),end:new Date(t.endsAt)}),u=Object.entries(t.labels).reduce((c,[v,i])=>((v==="alertname"||v==="__alert_rule_title__")&&(c=i),c),"");return e.createElement(e.Fragment,null,e.createElement("tr",{className:n},e.createElement("td",null,e.createElement(et.U,{isCollapsed:r,onToggle:c=>o(c)})),e.createElement("td",null,e.createElement(ce.G,{state:t.status.state})),e.createElement("td",null,"for ",l," seconds"),e.createElement("td",null,u)),!r&&e.createElement("tr",{className:n},e.createElement("td",null),e.createElement("td",{colSpan:5},e.createElement(se.s,{labels:t.labels,size:"sm"}))))},at=({silencedAlerts:t})=>{const n=(0,b.wW)(_e.D),r=(0,b.wW)(nt);return t.length?e.createElement("table",{className:(0,s.cx)(n.table,r.tableMargin)},e.createElement("colgroup",null,e.createElement("col",{className:n.colExpand}),e.createElement("col",{className:r.colState}),e.createElement("col",null),e.createElement("col",{className:r.colName})),e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null),e.createElement("th",null,"State"),e.createElement("th",null),e.createElement("th",null,"Alert name"))),e.createElement("tbody",null,t.map((o,l)=>e.createElement(tt,{key:o.fingerprint,alert:o,className:l%2===0?n.evenRow:""})))):null},nt=t=>({tableMargin:(0,s.css)`
    margin-bottom: ${t.spacing(1)};
  `,colState:(0,s.css)`
    width: 110px;
  `,colName:(0,s.css)`
    width: 65%;
  `}),rt=at,st=({silence:t})=>{const{startsAt:n,endsAt:r,comment:o,createdBy:l,silencedAlerts:u}=t,c=(0,b.wW)(lt),v="YYYY-MM-DD HH:mm",i=X.parse(n),h=X.parse(r),m=(0,E.vT)({start:new Date(n),end:new Date(r)});return e.createElement("div",{className:c.container},e.createElement("div",{className:c.title},"Comment"),e.createElement("div",null,o),e.createElement("div",{className:c.title},"Schedule"),e.createElement("div",null,`${i?.format(v)} - ${h?.format(v)}`),e.createElement("div",{className:c.title},"Duration"),e.createElement("div",null," ",m),e.createElement("div",{className:c.title},"Created by"),e.createElement("div",null," ",l),e.createElement("div",{className:c.title},"Affected alerts"),e.createElement(rt,{silencedAlerts:u}))},lt=t=>({container:(0,s.css)`
    display: grid;
    grid-template-columns: 1fr 9fr;
    grid-row-gap: 1rem;
  `,title:(0,s.css)`
    color: ${t.colors.text.primary};
  `,row:(0,s.css)`
    margin: ${t.spacing(1,0)};
  `});var ct=a(65825);const ot={[R.As.Active]:"good",[R.As.Expired]:"neutral",[R.As.Pending]:"neutral"},it=({state:t})=>e.createElement(ct.i,{state:ot[t]},t);var mt=a(57445),dt=a(14607);const de=()=>(0,O.uniqueId)("query-string-"),ut=()=>{const[t,n]=(0,e.useState)(de()),[r,o]=(0,ne.K)(),{queryString:l}=(0,Q.pF)(r),u=(0,b.wW)(gt),c=(0,O.debounce)(h=>{const m=h.target;o({queryString:m.value||null})},400),v=()=>{o({queryString:null,silenceState:null}),setTimeout(()=>n(de()))},i=l&&l.length>3?(0,z.Zh)(l).length===0:!1;return e.createElement("div",{className:u.flexRow},e.createElement(U.g,{className:u.rowChild,label:e.createElement(mt._,null,e.createElement(te.K,{gap:.5},e.createElement("span",null,"Search by matchers"),e.createElement(dt.u,{content:e.createElement("div",null,"Filter silences by matchers using a comma separated list of matchers, ie:",e.createElement("pre",null,"severity=critical, instance=~cluster-us-.+"))},e.createElement(ae.J,{name:"info-circle",size:"sm"})))),invalid:i,error:i?"Query must use valid matcher syntax":null},e.createElement(w.I,{key:t,className:u.searchInput,prefix:e.createElement(ae.J,{name:"search"}),onChange:c,defaultValue:l??"",placeholder:"Search","data-testid":"search-query-input"})),l&&e.createElement("div",{className:u.rowChild},e.createElement(I.zx,{variant:"secondary",icon:"times",onClick:v},"Clear filters")))},gt=t=>({searchInput:(0,s.css)`
    width: 360px;
  `,flexRow:(0,s.css)`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding-bottom: ${t.spacing(3)};
    border-bottom: 1px solid ${t.colors.border.medium};
  `,rowChild:(0,s.css)`
    margin-right: ${t.spacing(1)};
    margin-bottom: 0;
    max-height: 52px;
  `,fieldLabel:(0,s.css)`
    font-size: 12px;
    font-weight: 500;
  `}),Et=({silences:t,alertManagerAlerts:n,alertManagerSourceName:r})=>{const o=(0,b.wW)(Ee),[l]=(0,ne.K)(),u=ge(t,!1),c=ge(t,!0),{silenceState:v}=(0,Q.pF)(l),i=v===R.As.Expired,h=(0,e.useMemo)(()=>{const A=g=>n.filter(S=>S.status.silencedBy.includes(g));return u.map(g=>{const S=A(g.id);return{id:g.id,data:{...g,silencedAlerts:S}}})},[u,n]),m=(0,e.useMemo)(()=>{const A=g=>n.filter(S=>S.status.silencedBy.includes(g));return c.map(g=>{const S=A(g.id);return{id:g.id,data:{...g,silencedAlerts:S}}})},[c,n]);return e.createElement("div",{"data-testid":"silences-table"},!!t.length&&e.createElement(te.K,{direction:"column"},e.createElement(ut,null),e.createElement(we.q,{actions:[re.oI.CreateSilence]},e.createElement("div",{className:o.topButtonContainer},e.createElement(I.Qj,{href:(0,Q.eQ)("/alerting/silence/new",r),icon:"plus"},"Add Silence"))),e.createElement(ue,{items:h,alertManagerSourceName:r,dataTestId:"not-expired-table"}),m.length>0&&e.createElement(Fe.s,{label:`Expired silences (${m.length})`,isOpen:i},e.createElement("div",{className:o.callout},e.createElement(ae.J,{className:o.calloutIcon,name:"info-circle"}),e.createElement("span",null,"Expired silences are automatically deleted after 5 days.")),e.createElement(ue,{items:m,alertManagerSourceName:r,dataTestId:"expired-table"}))),!t.length&&e.createElement(qe,{alertManagerSourceName:r}))};function ue({items:t,alertManagerSourceName:n,dataTestId:r}){const o=vt(n);return t.length?e.createElement(le.t,{pagination:{itemsPerPage:25},items:t,cols:o,isExpandable:!0,dataTestId:r,renderExpandedContent:({data:l})=>e.createElement(st,{silence:l})}):e.createElement(e.Fragment,null,"No matching silences found")}const ge=(t,n=!1)=>{const[r]=(0,ne.K)();return(0,e.useMemo)(()=>{const{queryString:o}=(0,Q.pF)(r),l=r?.silenceIds;return t.filter(u=>typeof l=="string"&&!l.split(",").includes(u.id)||o&&!(0,z.Zh)(o).every(i=>u.matchers?.some(({name:h,value:m,isEqual:A,isRegex:g})=>i.name===h&&i.value===m&&i.isEqual===A&&i.isRegex===g))?!1:n?u.status.state===R.As.Expired:u.status.state!==R.As.Expired)},[r,t,n])},Ee=t=>({topButtonContainer:(0,s.css)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  `,addNewSilence:(0,s.css)`
    margin: ${t.spacing(2,0)};
  `,callout:(0,s.css)`
    background-color: ${t.colors.background.secondary};
    border-top: 3px solid ${t.colors.info.border};
    border-radius: ${t.shape.radius.default};
    height: 62px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
      margin-left: ${t.spacing(1)};
    }
  `,calloutIcon:(0,s.css)`
    color: ${t.colors.info.text};
  `,editButton:(0,s.css)`
    margin-left: ${t.spacing(.5)};
  `});function vt(t){const n=(0,y.useDispatch)(),r=(0,b.wW)(Ee),[o,l]=(0,re.RA)(re.oI.UpdateSilence);return(0,e.useMemo)(()=>{const u=v=>{n((0,$.yO)(t,v))},c=[{id:"state",label:"State",renderCell:function({data:{status:i}}){return e.createElement(it,{state:i.state})},size:4},{id:"matchers",label:"Matching labels",renderCell:function({data:{matchers:i}}){return e.createElement(Ge,{matchers:i||[]})},size:10},{id:"alerts",label:"Alerts",renderCell:function({data:{silencedAlerts:i}}){return e.createElement("span",{"data-testid":"alerts"},i.length)},size:4},{id:"schedule",label:"Schedule",renderCell:function({data:{startsAt:i,endsAt:h}}){const m=X.parse(i),A=X.parse(h),g="YYYY-MM-DD HH:mm";return e.createElement(e.Fragment,null," ",m?.format(g)," ","-",A?.format(g))},size:7}];return o&&l&&c.push({id:"actions",label:"Actions",renderCell:function({data:i}){return e.createElement(te.K,{gap:.5},i.status.state==="expired"?e.createElement(Qe.r,{href:(0,Q.eQ)(`/alerting/silence/${i.id}/edit`,t)},e.createElement(me,{icon:"sync"},"Recreate")):e.createElement(me,{icon:"bell",onClick:()=>u(i.id)},"Unsilence"),i.status.state!=="expired"&&e.createElement(Ze.A,{className:r.editButton,to:(0,Q.eQ)(`/alerting/silence/${i.id}/edit`,t),icon:"pen",tooltip:"edit"}))},size:5}),c},[t,n,r.editButton,l,o])}const ft=Et,ve={icon:"bell-slash"};function ht(){const{isExact:t,path:n}=(0,p.$B)(),[r,o]=(0,e.useState)();return(0,e.useEffect)(()=>{n==="/alerting/silence/new"?o({...ve,id:"silence-new",text:"Add silence"}):n==="/alerting/silence/:id/edit"&&o({...ve,id:"silence-edit",text:"Edit silence"})},[n,t]),r}var At=a(84954),pt=a(46002);const yt=()=>{const{selectedAlertmanager:t}=(0,At.ZA)(),n=(0,y.useDispatch)(),r=(0,Y._)(A=>A.silences),o=(0,Y._)(A=>A.amAlerts),l=t?o[t]||ee.oq:void 0,{currentData:u}=P.T.useDiscoverAmFeaturesQuery({amSourceName:t??""},{skip:!t});(0,e.useEffect)(()=>{function A(){t&&(n((0,$.je)(t)),n((0,$.dB)(t)))}A();const g=setInterval(()=>A,pt.cm);return()=>{clearInterval(g)}},[t,n]);const{result:c,loading:v,error:i}=t&&r[t]||ee.oq,h=(0,e.useCallback)(A=>c&&c.find(g=>g.id===A),[c]),m=i?.message?.includes("the Alertmanager is not configured")&&u?.lazyConfigInit;return t?e.createElement(e.Fragment,null,e.createElement(N.u,{currentAlertmanager:t}),m&&e.createElement(d.b,{title:"The selected Alertmanager has no configuration",severity:"warning"},"Create a new contact point to create a configuration using the default values or contact your administrator to set up the Alertmanager."),i&&!v&&!m&&e.createElement(d.b,{severity:"error",title:"Error loading silences"},i.message||"Unknown error."),l?.error&&!l?.loading&&!m&&e.createElement(d.b,{severity:"error",title:"Error loading Alertmanager alerts"},l.error?.message||"Unknown error."),c&&!i&&e.createElement(p.rs,null,e.createElement(p.AW,{exact:!0,path:"/alerting/silences"},e.createElement(ft,{silences:c,alertManagerAlerts:l?.result??[],alertManagerSourceName:t})),e.createElement(p.AW,{exact:!0,path:"/alerting/silence/new"},e.createElement(ie,{alertManagerSourceName:t})),e.createElement(p.AW,{exact:!0,path:"/alerting/silence/:id/edit"},({match:A})=>A?.params.id&&e.createElement(ie,{silence:h(A.params.id),alertManagerSourceName:t})))):null};function St(){const t=ht();return e.createElement(T.O,{pageId:"silences",pageNav:t,accessType:"instance"},e.createElement(yt,null))}const xt=(0,x.Pf)(St,{style:"page"})},39512:(F,M,a)=>{a.d(M,{J:()=>b,O:()=>_});var e=a(85960),p=a(8134),d=a(20989),x=a(84954),y=a(66681),P=a(47257),T=a(84933),N=a(27436),s=a(76679);function O(D){return D.name===s.GC?"Grafana":D.name.slice(0,37)}const f=({disabled:D=!1})=>{const I=(0,P.wW)(C),{selectedAlertmanager:K,availableAlertManagers:R,setSelectedAlertmanager:V}=(0,x.ZA)(),Y=(0,e.useMemo)(()=>R.map($=>({label:O($),value:$.name,imgUrl:$.imgUrl,meta:$.meta})),[R]);return e.createElement(T._,{className:I.field,label:D?"Alertmanager":"Choose Alertmanager",disabled:D||Y.length===1,"data-testid":"alertmanager-picker"},e.createElement(N.Ph,{"aria-label":D?"Alertmanager":"Choose Alertmanager",width:29,className:"ds-picker select-container",backspaceRemovesValue:!1,onChange:$=>{$?.value&&V($.value)},options:Y,maxMenuHeight:500,noOptionsMessage:"No datasources found",value:K,getOptionLabel:$=>$.label}))},C=D=>({field:(0,y.css)`
    margin: 0;
  `});var E=a(49199);const B=()=>e.createElement(E.b,{title:"No Alertmanager found",severity:"warning"},"We could not find any external Alertmanagers and you may not have access to the built-in Grafana Alertmanager."),L=()=>e.createElement(E.b,{title:"Selected Alertmanager not found.",severity:"warning"},"The selected Alertmanager no longer exists or you may not have permission to access it. You can select a different Alertmanager from the dropdown."),Z=({availableAlertManagers:D})=>{const I=D.length>0;return e.createElement("div",null,I?e.createElement(L,null):e.createElement(B,null))},b=({children:D,pageId:I,pageNav:K,actions:R,isLoading:V})=>e.createElement(d.T,{pageNav:K,navId:I,actions:R},e.createElement(d.T.Contents,{isLoading:V},D)),_=({children:D,accessType:I,...K})=>{const R=U();return e.createElement(x.h5,{accessType:I},e.createElement(b,{...K,actions:e.createElement(f,{disabled:R})},e.createElement(w,null,D)))};function U(){const D=(0,p.Z)();return["/edit","/new"].some(K=>D?.pathname?.includes(K))}const w=({children:D})=>{const{availableAlertManagers:I,selectedAlertmanager:K}=(0,x.ZA)();return K?e.createElement(e.Fragment,null,D):e.createElement(Z,{availableAlertManagers:I})}},53914:(F,M,a)=>{a.d(M,{q:()=>y});var e=a(56375),p=a.n(e),d=a(85960),x=a(57297);const y=({actions:f,children:C})=>{const E=(0,e.filter)(f,s),B=(0,e.filter)(f,O);return E.length?d.createElement(P,{actions:E},C):B.length?d.createElement(T,{actions:B},C):null},P=({actions:f,children:C})=>{const E=(0,x.Mz)();return N(E,f)?d.createElement(d.Fragment,null,C):null},T=({actions:f,children:C})=>{const E=(0,x.K_)();return N(E,f)?d.createElement(d.Fragment,null,C):null};function N(f,C){return(0,e.chain)(f).pick(C).values().value().some(([E,B])=>B===!0)}function s(f){return Object.values(x.oI).includes(f)}function O(f){return Object.values(x.jU).includes(f)}},28157:(F,M,a)=>{a.d(M,{u:()=>N});var e=a(66681),p=a(85960),d=a(47257),x=a(49199),y=a(16901),P=a(81828),T=a(76679);function N({currentAlertmanager:O}){const f=(0,d.wW)(s),C=O===T.GC,{currentData:E}=P.alertmanagerApi.endpoints.getAlertmanagerChoiceStatus.useQuery(void 0,{skip:!C});if(!(E?.alertmanagersChoice&&[y.TE.External,y.TE.All].includes(E?.alertmanagersChoice))||!C)return null;const L=E.numExternalAlertmanagers>0;return E.alertmanagersChoice===y.TE.External?p.createElement(x.b,{title:"Grafana alerts are not delivered to Grafana Alertmanager"},"Grafana is configured to send alerts to external Alertmanagers only. Changing Grafana Alertmanager configuration will not affect delivery of your alerts.",p.createElement("div",{className:f.adminHint},"To change your Alertmanager setup, go to the Alerting Admin page. If you do not have access, contact your Administrator.")):E.alertmanagersChoice===y.TE.All&&L?p.createElement(x.b,{title:"You have additional Alertmanagers to configure",severity:"warning"},"Ensure you make configuration changes in the correct Alertmanagers; both internal and external. Changing one will not affect the others.",p.createElement("div",{className:f.adminHint},"To change your Alertmanager setup, go to the Alerting Admin page. If you do not have access, contact your Administrator.")):null}const s=O=>({adminHint:(0,e.css)`
    font-size: ${O.typography.bodySmall.fontSize};
    font-weight: ${O.typography.bodySmall.fontWeight};
  `})},90504:(F,M,a)=>{a.d(M,{A:()=>x});var e=a(85960),p=a(14607),d=a(29165);const x=({tooltip:y,icon:P,to:T,target:N,onClick:s,className:O,tooltipPlacement:f="top",...C})=>{const E=typeof y=="string"?y:void 0;return e.createElement(p.u,{content:y,placement:f},T?e.createElement(d.Qj,{variant:"secondary",fill:"text",icon:P,href:T,size:"sm",target:N,...C,"aria-label":E}):e.createElement(d.zx,{className:O,variant:"secondary",fill:"text",size:"sm",icon:P,type:"button",onClick:s,...C,"aria-label":E}))}},30209:(F,M,a)=>{a.d(M,{G:()=>y});var e=a(85960),p=a(16901),d=a(65825);const x={[p.Z9.Active]:"bad",[p.Z9.Unprocessed]:"neutral",[p.Z9.Suppressed]:"info"},y=({state:P})=>e.createElement(d.i,{state:x[P]},P)},75636:(F,M,a)=>{a.d(M,{j:()=>x});var e=a(85960),p=a(30694),d=a(91);function x(){const{search:y}=(0,p.TH)(),P=(0,e.useMemo)(()=>new URLSearchParams(y),[y]),T=(0,e.useCallback)((N,s)=>{d.E1.partial(N,s)},[]);return[P,T]}},14806:(F,M,a)=>{a.d(M,{D:()=>p});var e=a(66681);const p=d=>({table:(0,e.css)`
    width: 100%;
    border-radius: ${d.shape.radius.default};
    border: solid 1px ${d.colors.border.weak};
    background-color: ${d.colors.background.secondary};

    th {
      padding: ${d.spacing(1)};
    }

    td {
      padding: 0 ${d.spacing(1)};
    }

    tr {
      height: 38px;
    }
  `,evenRow:(0,e.css)`
    background-color: ${d.colors.background.primary};
  `,colExpand:(0,e.css)`
    width: 36px;
  `,nameCell:(0,e.css)`
    gap: ${d.spacing(1)};
  `,actionsCell:(0,e.css)`
    text-align: right;
    width: 1%;
    white-space: nowrap;

    & > * + * {
      margin-left: ${d.spacing(.5)};
    }
  `})}}]);

//# sourceMappingURL=AlertSilences.b83b25feb1ccf146e1ea.js.map