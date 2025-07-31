"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2273],{23796:(ne,j,s)=>{s.d(j,{A2:()=>V,bw:()=>X});var c=s(66681),p=s(56375),t=s(85960),D=s(23757),F=s(24677),Q=s(12537),f=s(47257),g=s(13086),C=s(29165),E=s(15910),$=s(75064),R=s(16148),K=s(45848),Z=s(71325),H=s(46575),J=s(72096),L=s(36530),B=s(25119),te=s(37310),z=s(23595),a=s(99586),m=s(14591),x=s(11462),v=s(63352);const N=e=>{const n=e.fields[0];return n?.config?.displayNameFromDS??e.name??n?.labels?.__name__},h=e=>{const n=e.fields[0]?.values[0];return Number.isFinite(n)?(0,v.O)(n,5):n},S=e=>e.fields[0]?.labels??{},G=e=>Object.entries(e).map(([n,r])=>n+"="+r).join(", "),b=e=>e.every(r=>r.fields.every(l=>l.values.every(d=>d==null))),V=({queries:e=[],query:n,data:r,error:l,warning:d,isAlertCondition:y,onSetCondition:P,onUpdateRefId:W,onRemoveExpression:T,onUpdateExpressionType:A,onChangeQuery:M})=>{const I=(0,f.wW)(o),U=n?.type,_=r&&Object.values(r).some(O=>!!O&&O.state===D.Gu.Loading),se=Array.isArray(r?.series)&&!_,ee=r?.series??[],oe=y??!1,{seriesCount:ce,groupedByState:le}=w(ee),ie=(0,t.useCallback)(O=>{const ae=e.filter(re=>O.refId!==re.refId).map(re=>({value:re.refId,label:re.refId}));switch(O.type){case L.Us.math:return t.createElement(K.Z,{onChange:M,query:O,labelWidth:"auto",onRunQuery:()=>{}});case L.Us.reduce:return t.createElement(Z.v,{onChange:M,refIds:ae,labelWidth:"auto",query:O});case L.Us.resample:return t.createElement(H.p,{onChange:M,query:O,labelWidth:"auto",refIds:ae});case L.Us.classic:return t.createElement(R.I,{onChange:M,query:O,refIds:ae});case L.Us.threshold:return t.createElement(J.M,{onChange:M,query:O,labelWidth:"auto",refIds:ae});default:return t.createElement(t.Fragment,null,"Expression not supported: ",O.type)}},[M,e]),ue=L.EJ.find(O=>O.value===U)?.description??"";return t.createElement("div",{className:(0,c.cx)(I.expression.wrapper,oe&&I.expression.alertCondition,U===L.Us.classic&&I.expression.classic,U!==L.Us.classic&&I.expression.nonClassic)},t.createElement("div",{className:I.expression.stack},t.createElement(q,{refId:n.refId,queryType:U,onRemoveExpression:()=>T(n.refId),onUpdateRefId:O=>W(n.refId,O),onUpdateExpressionType:O=>A(n.refId,O),onSetCondition:P,warning:d,error:l,query:n,alertCondition:oe}),t.createElement("div",{className:I.expression.body},t.createElement("div",{className:I.expression.description},ue),ie(n)),se&&t.createElement(t.Fragment,null,t.createElement(X,{series:ee,isAlertCondition:y}),t.createElement("div",{className:I.footer},t.createElement(g.K,{direction:"row",alignItems:"center"},t.createElement(a.L,null),t.createElement(k,{isCondition:!!y,firing:le[B.x_.Firing].length,normal:le[B.x_.Inactive].length,seriesCount:ce}))))))},Y=20,X=({series:e,isAlertCondition:n})=>{const{pageItems:r,previousPage:l,nextPage:d,numberOfPages:y,pageStart:P,pageEnd:W}=(0,te.h)(e,1,Y),T=(0,f.wW)(o),A=b(e),M=!A&&(0,F.xI)(e),I=y>1;return t.createElement("div",{className:T.expression.results},!A&&M&&t.createElement("div",null,r.map((U,_)=>t.createElement(i,{key:(0,p.uniqueId)(),frame:U,index:P+_,isAlertCondition:n}))),!A&&!M&&r.map((U,_)=>t.createElement(u,{key:(0,p.uniqueId)(),frame:U,index:P+_,isAlertCondition:n})),A&&t.createElement("div",{className:(0,c.cx)(T.expression.noData,T.mutedText)},"No data"),I&&t.createElement("div",{className:T.pagination.wrapper,"data-testid":"paginate-expression"},t.createElement(g.K,null,t.createElement(C.zx,{variant:"secondary",fill:"outline",onClick:l,icon:"angle-left",size:"sm","aria-label":"previous-page"}),t.createElement(a.L,null),t.createElement("span",{className:T.mutedText},P," - ",W," of ",e.length),t.createElement(a.L,null),t.createElement(C.zx,{variant:"secondary",fill:"outline",onClick:d,icon:"angle-right",size:"sm","aria-label":"next-page"}))))},k=({firing:e,normal:n,isCondition:r,seriesCount:l})=>{const{mutedText:d}=(0,f.wW)(o);return l===0?t.createElement("span",{className:d},"No series"):r?t.createElement("span",{className:d},`${l} series: ${e} firing, ${n} normal`):t.createElement("span",{className:d},`${l} series`)};function w(e){const n=e.filter(d=>h(d)===void 0).length,r={[B.x_.Firing]:e.filter(d=>h(d)!==void 0&&h(d)!==0),[B.x_.Inactive]:e.filter(d=>h(d)===0)},l=e.length-n;return{groupedByState:r,seriesCount:l}}const q=({refId:e,queryType:n,onUpdateRefId:r,onRemoveExpression:l,warning:d,onSetCondition:y,alertCondition:P,query:W,error:T})=>{const A=(0,f.wW)(o),M=(0,f.wW)(C.gN),[I,U]=(0,t.useState)(!1),se=I!==!1&&I==="refId";return t.createElement("header",{className:A.header.wrapper},t.createElement(g.K,{direction:"row",gap:.5,alignItems:"center"},t.createElement(g.K,{direction:"row",gap:1,alignItems:"center"},!se&&t.createElement("button",{type:"button",className:(0,c.cx)(M,A.editable),onClick:()=>U("refId")},t.createElement("div",{className:A.expression.refId},e)),se&&t.createElement(E.H,{autoFocus:!0,defaultValue:e,minWidth:5,onChange:ee=>{r(ee.currentTarget.value),U(!1)},onFocus:ee=>ee.target.select(),onBlur:ee=>{r(ee.currentTarget.value),U(!1)}}),t.createElement("div",null,(0,L.hF)(n))),t.createElement(a.L,null),t.createElement(x.H,{error:T,warning:d,onSetCondition:()=>y(W.refId),isCondition:P}),t.createElement($.h,{name:"trash-alt",variant:"secondary",className:A.mutedIcon,onClick:l,tooltip:"Remove expression"})))},u=({frame:e,index:n,isAlertCondition:r})=>{const l=(0,f.wW)(o),d=N(e)||"Series "+n,y=h(e),P=S(e),W=Object.entries(P),T=W.length>0,A=r&&y!==0,M=r&&y===0,I=`${T?"":d}${T?`{${G(P)}}`:""}`;return t.createElement("div",{className:l.expression.resultsRow},t.createElement(g.K,{direction:"row",gap:1,alignItems:"center"},t.createElement("div",{className:l.expression.resultLabel,title:I},t.createElement("span",null,T?"":d),T&&t.createElement(t.Fragment,null,t.createElement("span",null,"{"),W.map(([U,_],se)=>t.createElement("span",{key:(0,p.uniqueId)()},t.createElement("span",{className:l.expression.labelKey},U),t.createElement("span",null,"="),t.createElement("span",null,'"'),t.createElement("span",{className:l.expression.labelValue},_),t.createElement("span",null,'"'),se<W.length-1&&t.createElement("span",null,", "))),t.createElement("span",null,"}"))),t.createElement("div",{className:l.expression.resultValue},y),A&&t.createElement(m.l,{state:B.x_.Firing,size:"sm"}),M&&t.createElement(m.l,{state:B.x_.Inactive,size:"sm"})))},i=({frame:e,index:n})=>{const r=(0,f.wW)(o),l=e.fields[1],d=l.labels,P=l.config?.displayNameFromDS??(d?G(l.labels??{}):"Series "+n),W=e.fields[0].values,T=M=>e.fields[0].values[M],A=M=>e.fields[1].values[M];return t.createElement("div",{className:r.expression.resultsRow},t.createElement(g.K,{direction:"row",alignItems:"center"},t.createElement("span",{className:(0,c.cx)(r.mutedText,r.expression.resultLabel),title:P},P),t.createElement("div",{className:r.expression.resultValue},t.createElement(z.z,{placement:"right",wrapperClassName:r.timeseriesTableWrapper,content:t.createElement("table",{className:r.timeseriesTable},t.createElement("thead",null,t.createElement("tr",null,t.createElement("th",null,"Timestamp"),t.createElement("th",null,"Value"))),t.createElement("tbody",null,W.map((M,I)=>t.createElement("tr",{key:I},t.createElement("td",{className:r.mutedText},(0,Q.dq)(T(I))),t.createElement("td",{className:r.expression.resultValue},A(I))))))},t.createElement("span",null,"Time series data")))))},o=e=>({expression:{wrapper:(0,c.css)`
      display: flex;
      border: solid 1px ${e.colors.border.medium};
      flex: 1;
      flex-basis: 400px;
      border-radius: ${e.shape.radius.default};
    `,stack:(0,c.css)`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 0;
      width: 100%;
      min-width: 0; // this one is important to prevent text overflow
    `,classic:(0,c.css)`
      max-width: 100%;
    `,nonClassic:(0,c.css)`
      max-width: 640px;
    `,alertCondition:(0,c.css)``,body:(0,c.css)`
      padding: ${e.spacing(1)};
      flex: 1;
    `,description:(0,c.css)`
      margin-bottom: ${e.spacing(1)};
      font-size: ${e.typography.size.xs};
      color: ${e.colors.text.secondary};
    `,refId:(0,c.css)`
      font-weight: ${e.typography.fontWeightBold};
      color: ${e.colors.primary.text};
    `,results:(0,c.css)`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      border-top: solid 1px ${e.colors.border.medium};
    `,noResults:(0,c.css)`
      display: flex;
      align-items: center;
      justify-content: center;
    `,resultsRow:(0,c.css)`
      padding: ${e.spacing(.75)} ${e.spacing(1)};

      &:nth-child(odd) {
        background-color: ${e.colors.background.secondary};
      }

      &:hover {
        background-color: ${e.colors.background.canvas};
      }
    `,labelKey:(0,c.css)`
      color: ${e.isDark?"#73bf69":"#56a64b"};
    `,labelValue:(0,c.css)`
      color: ${e.isDark?"#ce9178":"#a31515"};
    `,resultValue:(0,c.css)`
      text-align: right;
    `,resultLabel:(0,c.css)`
      flex: 1;
      overflow-x: auto;

      display: inline-block;
      white-space: nowrap;
    `,noData:(0,c.css)`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${e.spacing()};
    `},mutedText:(0,c.css)`
    color: ${e.colors.text.secondary};
    font-size: 0.9em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,header:{wrapper:(0,c.css)`
      background: ${e.colors.background.secondary};
      padding: ${e.spacing(.5)} ${e.spacing(1)};
      border-bottom: solid 1px ${e.colors.border.weak};
    `},footer:(0,c.css)`
    background: ${e.colors.background.secondary};
    padding: ${e.spacing(1)};
    border-top: solid 1px ${e.colors.border.weak};
  `,draggableIcon:(0,c.css)`
    cursor: grab;
  `,mutedIcon:(0,c.css)`
    color: ${e.colors.text.secondary};
  `,editable:(0,c.css)`
    padding: ${e.spacing(.5)} ${e.spacing(1)};
    border: solid 1px ${e.colors.border.weak};
    border-radius: ${e.shape.radius.default};

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${e.spacing(1)};

    cursor: pointer;
  `,timeseriesTableWrapper:(0,c.css)`
    max-height: 500px;

    overflow-y: scroll;
  `,timeseriesTable:(0,c.css)`
    table-layout: auto;

    width: 100%;
    height: 100%;

    td,
    th {
      padding: ${e.spacing(1)};
    }

    td {
      background: ${e.colors.background.primary};
    }

    th {
      background: ${e.colors.background.secondary};
    }

    tr {
      border-bottom: 1px solid ${e.colors.border.medium};

      &:last-of-type {
        border-bottom: none;
      }
    }
  `,pagination:{wrapper:(0,c.css)`
      border-top: 1px solid ${e.colors.border.medium};
      padding: ${e.spacing()};
    `}})},11462:(ne,j,s)=>{s.d(j,{H:()=>Q});var c=s(66681),p=s(85960),t=s(47257),D=s(67192),F=s(29165);const Q=({error:g,warning:C,isCondition:E,onSetCondition:$})=>{const R=(0,t.wW)(f),K=[];return g&&E?p.createElement(D.C,{color:"red",icon:"exclamation-circle",text:"Alert condition",tooltip:g.message}):(g&&K.push(p.createElement(D.C,{key:"error",color:"red",icon:"exclamation-circle",text:"Error",tooltip:g.message})),C&&E?p.createElement(D.C,{color:"orange",icon:"exclamation-triangle",text:"Alert condition",tooltip:C.message}):(C&&K.push(p.createElement(D.C,{key:"warning",color:"orange",icon:"exclamation-triangle",text:"Warning",tooltip:C.message})),E?K.unshift(p.createElement(D.C,{key:"condition",color:"green",icon:"check",text:"Alert condition"})):K.unshift(p.createElement("button",{key:"make-condition",type:"button",className:R.actionLink,onClick:()=>$&&$()},"Set as alert condition")),p.createElement(p.Fragment,null,K)))},f=g=>{const C=(0,F.gN)(g);return{actionLink:(0,c.css)`
      ${C};
      color: ${g.colors.text.link};
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    `}}},49004:(ne,j,s)=>{s.d(j,{l:()=>E});var c=s(66681),p=s(85960),t=s(53565),D=s(24677),F=s(47257),Q=s(60484),f=s(79210),g=s(23796),C=s(90943);const E=({data:R,thresholds:K,thresholdsType:Z})=>{const H=(0,F.wW)($),J=(0,D.xI)(R.series),L=(0,C._4)(R),B=Z?{mode:Z}:void 0,te={from:R.timeRange.from.valueOf(),to:R.timeRange.to.valueOf()};return p.createElement("div",{className:H.wrapper},p.createElement(t.Z,{disableHeight:!0},({width:z})=>p.createElement("div",{style:{width:z}},J?p.createElement(f.F,{statusMessage:L,data:R.series,eventBus:Q.Z,height:300,width:z,absoluteRange:te,timeZone:"browser",onChangeTime:()=>{},splitOpenFn:()=>{},loadingState:R.state,thresholdsConfig:K,thresholdsStyle:B}):p.createElement("div",{className:H.instantVectorResultWrapper},p.createElement("header",{className:H.title},"Table"),p.createElement(g.bw,{series:R.series})))))},$=R=>({wrapper:(0,c.css)`
    width: 100%;
    position: relative;
  `,instantVectorResultWrapper:(0,c.css)`
    border: solid 1px ${R.colors.border.medium};
    border-radius: ${R.shape.radius.default};
    padding: 0;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  `,title:(0,c.css)({label:"panel-title",padding:R.spacing(),textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontSize:R.typography.h6.fontSize,fontWeight:R.typography.h6.fontWeight})})},93260:(ne,j,s)=>{s.d(j,{S:()=>D});var c=s(85960),p=s(81502),t=s(32063);function D(F){return{allDataSourcesAvailable:(0,c.useMemo)(()=>F.filter(f=>!(0,t.Pr)(f.datasourceUid)).every(f=>!!(0,p.F)().getInstanceSettings(f.datasourceUid)),[F])}}},94498:(ne,j,s)=>{s.d(j,{F3:()=>Z,HO:()=>L,eq:()=>z});var c=s(85960),p=s(81445),t=s(95162),D=s(14411),F=s(80679),Q=s(5970),f=s(76679),g=s(30422),C=s(60956),E=s(9001),$=s(68700),R=s(92746);function K(a,m){const x=H(m),v=useCombinedRuleNamespaces(m),N=useMemo(()=>{if(!a||!m||v.length===0)return[];const h=[];for(const S of v)for(const G of S.groups)for(const b of G.rules)b.name===a&&h.push(b);return h},[a,m,v]);return{...x,result:N}}function Z(a,m,x){const v=(0,f.c$)(m),{dsFeatures:N,isLoadingDsFeatures:h}=z(m),{currentData:S=[],isLoading:G,error:b}=D.alertRuleApi.endpoints.prometheusRuleNamespaces.useQuery({ruleSourceName:m,ruleName:a,namespace:x?.namespace,groupName:x?.groupName}),[V]=D.alertRuleApi.endpoints.rulerRuleGroup.useLazyQuery(),{loading:Y,error:X,value:k}=(0,p.Z)(async()=>{if(!v)throw new Error("Unable to obtain data source settings");if(b)throw new Error("Unable to obtain Prometheus rules");const w=[];if(N?.rulerConfig){const i=N.rulerConfig,o=S.map(e=>e.groups.map(n=>({namespace:e,group:n}))).flat();await Promise.allSettled(o.map(async e=>{const n=await V({rulerConfig:i,namespace:e.namespace.name,group:e.group.name}).unwrap();w.push(n)}))}return S.map(i=>(0,$.K$)(v,i,w)).flatMap(i=>i.groups.flatMap(o=>o.rules))},[v,N,G,b,S,V]);return{loading:h||Y,error:X,rules:k}}function H(a,m){const x=useDispatch(),v=useUnifiedAlertingSelector(b=>b.promRules),N=J(a,v),h=useUnifiedAlertingSelector(b=>b.rulerRules),S=J(a,h),{loading:G}=useAsync(async()=>{a&&await x(fetchPromAndRulerRulesAction({rulesSourceName:a,identifier:m}))},[x,a]);return{loading:G,error:N.error??isRulerNotSupportedResponse(S)?void 0:S.error,dispatched:N.dispatched&&S.dispatched}}function J(a,m){if(!a)return initialAsyncRequestState;const x=m[a];return x||initialAsyncRequestState}function L({ruleIdentifier:a}){const{ruleSourceName:m}=a,x=(0,f.c$)(m),{dsFeatures:v,isLoadingDsFeatures:N}=z(m),{currentData:h,isLoading:S,error:G}=D.alertRuleApi.endpoints.prometheusRuleNamespaces.useQuery({ruleSourceName:a.ruleSourceName,namespace:(0,E.qE)(a)||(0,E.E4)(a)?a.namespace:void 0,groupName:(0,E.qE)(a)||(0,E.E4)(a)?a.groupName:void 0,ruleName:(0,E.qE)(a)||(0,E.E4)(a)?a.ruleName:void 0}),[b,{currentData:V,isLoading:Y,error:X}]=D.alertRuleApi.endpoints.rulerRuleGroup.useLazyQuery(),[k,{currentData:w,isLoading:q,error:u}]=D.alertRuleApi.endpoints.rulerRules.useLazyQuery();(0,c.useEffect)(()=>{v?.rulerConfig&&(v.rulerConfig&&(0,E.E4)(a)?b({rulerConfig:v.rulerConfig,namespace:a.namespace,group:a.groupName}):(0,E.Kl)(a)&&k({rulerConfig:v.rulerConfig}))},[v,b,k,a]);const i=(0,c.useMemo)(()=>{if(h){if((0,E.Kl)(a)){const o=(0,$.bU)("grafana",h,w);for(const e of o)for(const n of e.groups)for(const r of n.rules){const l=C.Yd(m,r);if(C.Dg(l,a))return r}}if(x&&h.length>0&&((0,E.E4)(a)||(0,E.qE)(a))){const o=h.map(e=>(0,$.K$)(x,e,V?[V]:[]));for(const e of o)for(const n of e.groups)for(const r of n.rules){const l=C.Yd(m,r);if(C.Dg(l,a))return r}}}},[a,m,h,V,w,x]);return{loading:N||S||Y||q,error:G??X??u,result:i}}const te={rulerConfig:{dataSourceName:f.GC,apiVersion:"legacy"}};function z(a){const m=(0,f.HY)(a),{currentData:x,isLoading:v}=F.T.endpoints.discoverDsFeatures.useQuery({rulesSourceName:a},{skip:m});return m?{isLoadingDsFeatures:!1,dsFeatures:te}:{isLoadingDsFeatures:v,dsFeatures:x}}},98187:(ne,j,s)=>{s.d(j,{v:()=>b});var c=s(56375),p=s(93231),t=s(21964),D=s(85431),F=s(95135),Q=s(98231),f=s(90308),g=s(23757),C=s(45878),E=s(31902),$=s(71244),R=s(9833),K=s(79739),Z=s(81502),H=s(32063),J=s(4479),L=s(46783),B=s(31476),te=s(23994),z=s(80833),a=s(36530);const m={from:21600,to:0},x=(u,i)=>{const o=v(u,i);if(!o)return m;const{from:e,to:n}=h(o,i);return!e.length&&!n.length?m:{from:Math.max(...e),to:Math.min(...n)}},v=(u,i)=>{switch(u.type){case a.Us.classic:return N(u);case a.Us.math:return S(u,i);case a.Us.resample:case a.Us.reduce:case a.Us.threshold:return G(u)}},N=u=>u.conditions?.map(i=>i.query.params[0]),h=(u,i)=>{let o=[],e=[m.to];for(const n of u){const r=i.find(l=>l.refId===n);!r||!r.relativeTimeRange||(o.push(r.relativeTimeRange.from),e.push(r.relativeTimeRange.to))}return{from:o,to:e}},S=(u,i)=>i.filter(o=>o.queryType==="query"&&u.expression?.includes(o.refId)).map(o=>o.refId),G=u=>u.expression?[u.expression]:void 0;class b{constructor(i=(0,L.i)(),o=(0,Z.F)()){this.backendSrv=i,this.dataSourceSrv=o,this.subject=new p.t(1),this.lastResult={}}get(){return this.subject.asObservable()}async run(i,o){const e=Y(i,g.Gu.Done),n=[];for(const l of i){const d=l.model.refId;if((0,B.j)(l.model))continue;const y=await this.dataSourceSrv.get(l.datasourceUid);y instanceof H.CK&&y.filterQuery&&!y.filterQuery(l.model)&&n.push(d)}const r=(0,c.reject)(i,l=>n.includes(l.model.refId));if(r.length===0)return this.subject.next(e);this.subscription=V(this.backendSrv,r,o).subscribe({next:l=>{const d=q(l,(y,P)=>{const W=this.lastResult[y],T=(0,C.zR)(P,W);return(0,z.C)(T,W)});this.lastResult=d,this.subject.next(this.lastResult)},error:l=>{this.lastResult=w(this.lastResult,l),this.subject.next(this.lastResult)}})}cancel(){if(!this.subscription)return;this.subscription.unsubscribe();let i=!1;const o=q(this.lastResult,(e,n)=>(n.state===g.Gu.Loading&&(i=!0),{...n,state:g.Gu.Done}));i&&this.subject.next(o)}destroy(){this.subject&&this.subject.complete(),this.cancel()}}const V=(u,i,o)=>{const e=Y(i,g.Gu.Loading),n={data:{data:i,condition:o},url:"/api/v1/eval",method:"POST",requestId:(0,f.Z)()};return(0,E.x)({whileLoading:e,source:u.fetch(n).pipe(k(e),(0,D.K)(r=>(0,t.of)(w(e,r))),(0,te.V)(u,n.requestId),(0,F.B)())})},Y=(u,i)=>u.reduce((o,e)=>(o[e.refId]={state:i,series:[],timeRange:X(e,u)},o),{}),X=(u,i)=>{if((0,B.j)(u.model)){const o=x(u.model,i);return $.relativeToTimeRange(o)}return u.relativeTimeRange?$.relativeToTimeRange(u.relativeTimeRange):(console.warn(`Query with refId: ${u.refId} did not have any relative time range, using default.`),(0,R.JK)())},k=u=>(0,Q.U)(i=>{const{data:o}=i,e={};for(const[n,r]of Object.entries(o.results)){const{error:l,status:d,frames:y=[]}=r,P=l?[{message:l,refId:n,status:d}]:[];e[n]={errors:P,timeRange:u[n].timeRange,state:g.Gu.Done,series:y.map(K.vP)}}return e}),w=(u,i)=>{const o=(0,J.P)(i);return q(u,(e,n)=>({...n,state:g.Gu.Error,error:o}))},q=(u,i)=>{const o={};for(const[e,n]of Object.entries(u))o[e]=i(e,n);return o}}}]);

//# sourceMappingURL=2273.71eb1500dad566474322.js.map