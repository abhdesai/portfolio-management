"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2436],{84237:(_,W,n)=>{n.d(W,{C0:()=>O,Uv:()=>N,Xq:()=>M});var r=n(85960),g=n(49199),e=n(67192),N=(h=>(h.ContactPoint="contact point",h.Template="template",h.MuteTiming="mute timing",h.AlertRule="alert rule",h.RootNotificationPolicy="root notification policy",h))(N||{});const M=({resource:h})=>r.createElement(g.b,{title:`This ${h} cannot be edited through the UI`,severity:"info"},"This ",h," has been provisioned, that means it was created by config. Please contact your server admin to update this ",h,"."),O=()=>r.createElement(e.C,{text:"Provisioned",color:"purple"})},90943:(_,W,n)=>{n.d(W,{p0:()=>te,Ps:()=>B,_m:()=>k,eW:()=>xe,_4:()=>ye,Fu:()=>ve,Ry:()=>X,Dr:()=>fe,KP:()=>he,Yq:()=>Ee});var r=n(56375),g=n(24677),e=n(37634),N=n(23757),M=n(1713),O=n(67954),h=n(34524),y=n(31476),R=n(36530),P=n(20304),U=n(84513),w=n(18745);const H=(0,U.Z)(j,(o,s)=>Z(o[0])===Z(s[0]));function j(o){const s=new w.kJ,u=o.map(i=>i.refId);return s.createNodes(u),o.forEach(i=>{const $=i.refId;((0,y.j)(i.model)&&i.model.type==="math"?re(i.model.expression??""):[i.model.expression]).forEach(T=>{$&&T&&!($===T)&&s.link(T,$)})}),s}function re(o){const s=new RegExp(/\$\{(?<var>[a-zA-Z0-9_ ]+?)\}/gm),u=new RegExp(/\$(?<var>[a-zA-Z0-9_]+)/gm),i=Array.from(o.matchAll(s)).map(m=>m.groups?.var),$=Array.from(o.matchAll(u)).map(m=>m.groups?.var);return(0,r.compact)((0,r.uniq)([...i,...$]))}const ee=(0,r.memoize)(I,(o,s)=>o+se(s));function I(o,s){const u=s.getNode(o);let i=[];function $(m){const v=m.inputEdges;v.length>0?v.forEach(T=>{T.inputNode&&$(T.inputNode)}):i?.push(m)}return $(u),i.map(m=>m.name)}function se(o){return Object.keys(o.nodes).map(s=>{const u=o.nodes[s];let i=u.outputEdges.map(m=>m.outputNode?.name).join(", "),$=u.inputEdges.map(m=>m.inputNode?.name).join(", ");return`${u.name}:${i}:${$}`}).join(" ")}function Z(o){return o.map(s=>{const u=(0,y.j)(s.model)?s.model.type:s.queryType;return s.refId+(s.model.expression??"")+u}).join()}function X(o,s,u){return o.map(i=>{if(s===u||!(0,y.j)(i.model))return i;const $=i.model.type==="math",m=i.model.type==="reduce",v=i.model.type==="resample",T=i.model.type==="classic_conditions",b=i.model.type==="threshold";if($)return{...i,model:{...i.model,expression:pe(i.model.expression??"",s,u)}};if(v||m||b){const L=i.model.expression===s;return{...i,model:{...i.model,expression:L?u:i.model.expression}}}if(T){const L=i.model.conditions?.map(G=>({...G,query:{...G.query,params:G.query.params.map(J=>J===s?u:J)}}));return{...i,model:{...i.model,conditions:L}}}return i})}function pe(o,s,u){const i=new RegExp("(\\$"+s+"\\b)|(\\${"+s+"})","gm"),$="${"+u+"}";return o.replace(i,$)}function fe(o,s){return o.find(u=>u.refId===s)!==void 0}function te(o){return o.includes("/")||o.includes("\\")?'Cannot contain "/" or "\\" characters':!0}function B(o){if(o.series.length===0)return;const s=(0,g.xI)(o.series);let u;return s&&(u=new Error("You cannot use time series data as an alert condition, consider adding a reduce expression.")),u}function k(o){if(o.errors?.length)return new Error(o.errors[0].message)}function Ee(o){const u=(o[0]?.meta?.notices??[]).find(i=>i.severity==="warning")?.text;return u?new Error(u):void 0}function ve(o){const s={},u=[R.Us.threshold,R.Us.classic];for(const m of o){if(!(0,y.j)(m.model)||!u.includes(m.model.type)||!Array.isArray(m.model.conditions))continue;const v=m.model.conditions.some(ne);m.model.conditions.forEach(T=>{const b=T.evaluator.params,L=T.query?.params[0]??m.model.expression;if(!L)return;const G=ne(T);try{const J=H(o),Re=ee(L,J);o.filter(ae=>Re.includes(ae.refId)).forEach(ae=>{const Q=ae.refId,ie=!!(!(0,y.j)(ae?.model)&&Q);Q&&!s[Q]&&(s[Q]={config:{mode:e.H.Absolute,steps:[]},mode:M.i3.Line}),Q&&ie&&!G&&!v?i(Q,b[0]):Q&&ie&&G&&($(Q,b,T.evaluator.type),s[Q].mode=M.i3.LineAndArea)})}catch(J){console.error("Failed to parse thresholds",J);return}})}function i(m,v){s[m].config.steps.push({value:-1/0,color:"transparent"},{value:v,color:O.config.theme2.colors.error.main})}function $(m,v,T){T===h.$.IsWithinRange&&s[m].config.steps.push({value:-1/0,color:"transparent"},{value:v[0],color:O.config.theme2.colors.error.main},{value:v[1],color:O.config.theme2.colors.error.main},{value:v[1],color:"transparent"}),T===h.$.IsOutsideRange&&s[m].config.steps.push({value:-1/0,color:O.config.theme2.colors.error.main},{value:v[0],color:O.config.theme2.colors.error.main},{value:v[0],color:"transparent"},{value:v[1],color:O.config.theme2.colors.error.main}),s[m].config.steps.sort((b,L)=>b.value-L.value),s[m].config.steps=s[m].config.steps.filter(b=>b.value!==void 0)}return s}function ne(o){return o.evaluator.type===h.$.IsWithinRange||o.evaluator.type===h.$.IsOutsideRange}function ye(o){const s="Failed to fetch data";if(o.state!==N.Gu.Error)return;const u=o.errors;return u?.length?u.map(i=>i.message??s).join(", "):o.error?.message??s}function he(o=""){return o==="recording"?P.$.cloudRecording:P.$.grafana}function xe(o,s){const u=s.filter(v=>!(0,y.j)(v.model)).map(v=>v.refId),i=o.filter(v=>!(0,y.j)(v.model)).map(v=>v.refId),[$,m]=(0,r.xor)(i,u);return[$,m]}},12436:(_,W,n)=>{n.r(W),n.d(W,{RuleViewer:()=>We,default:()=>_e});var r=n(66681),g=n(93638),e=n(85960),N=n(45220),M=n(16162),O=n(23757),h=n(85445),y=n(90857),R=n(47257),P=n(49199),U=n(79468),w=n(74042),H=n(29165),j=n(13086),re=n(97666),ee=n(8655),I=n(75064),se=n(89248),Z=n(48525),X=n(56375),pe=n(67192),fe=n(84673),te=n(31476),B=n(36530),k=n(34524),Ee=n(23796),ve=n(90943),ne=n(85745),ye=n(173),he=n(89280),xe=n(49683),o=n(49004);const s=4;function u({data:t,model:a,thresholds:c,dsSettings:p,relativeTimeRange:d,onTimeRangeChange:f,className:D}){const l=(0,R.wW)($),E=(0,te.j)(a),A=(0,e.useCallback)(C=>{const V=(0,ne.CQ)().unix()-C.unix();if(d){const F=d.from-d.to;f({from:V+F,to:V})}},[f,d]),x=(0,e.useCallback)(C=>C===0?(0,ne.CQ)():(0,ne.CQ)().subtract(C,"seconds"),[]);if(!t)return null;const K=xe.Vt.hasAccessToExplore();return e.createElement("div",{className:D},e.createElement("div",{className:l.header},e.createElement("div",{className:l.actions},!E&&d?e.createElement(he.x,{date:x(d.to),onChange:A,maxDate:new Date}):null,K&&!E&&e.createElement(H.Qj,{size:"md",variant:"secondary",icon:"compass",target:"_blank",href:i(p,a)},"View in Explore"))),e.createElement(o.l,{data:t,thresholds:c?.config,thresholdsType:c?.mode}))}function i(t,a){const{uid:c,type:p}=t,{refId:d,...f}=a;return ye.Cj.renderUrl(`${y.config.appSubUrl}/explore`,{left:JSON.stringify({datasource:t.uid,queries:[{refId:"A",...f,datasource:{type:p,uid:c}}],range:{from:"now-1h",to:"now"}})})}const $=t=>({header:(0,r.css)`
      height: ${t.spacing(s)};
      display: flex;
      align-items: center;
      justify-content: flex-end;
      white-space: nowrap;
      margin-bottom: ${t.spacing(2)};
    `,refId:(0,r.css)`
      font-weight: ${t.typography.fontWeightMedium};
      color: ${t.colors.text.link};
      overflow: hidden;
    `,dataSource:(0,r.css)`
      margin-left: ${t.spacing(1)};
      font-style: italic;
      color: ${t.colors.text.secondary};
    `,actions:(0,r.css)`
      display: flex;
      align-items: center;
    `,errorMessage:(0,r.css)`
      white-space: pre-wrap;
    `});function m({queries:t,condition:a,evalDataByQuery:c={},evalTimeRanges:p={},onTimeRangeChange:d}){const f=(0,X.keyBy)(Object.values(y.config.datasources),x=>x.uid),D=t.filter(x=>!(0,te.j)(x.model)),l=t.filter(x=>(0,te.j)(x.model)),E=(0,R.wW)($e),A=(0,ve.Fu)(t);return e.createElement(j.K,{gap:2,direction:"column"},e.createElement("div",{className:E.maxWidthContainer},e.createElement(j.K,{gap:2},D.map(({model:x,relativeTimeRange:K,refId:C,datasourceUid:V},F)=>{const ue=f[V];return e.createElement(v,{key:F,refId:C,isAlertCondition:a===C,model:x,relativeTimeRange:K,evalTimeRange:p[C],dataSource:ue,thresholds:A[C],queryData:c[C],onEvalTimeRangeChange:me=>d(C,me)})}))),e.createElement("div",{className:E.maxWidthContainer},e.createElement(j.K,{gap:1},l.map(({model:x,refId:K,datasourceUid:C},V)=>{const F=f[C];return(0,te.j)(x)&&e.createElement(b,{key:V,refId:K,isAlertCondition:a===K,model:x,dataSource:F,evalData:c[K]})}))))}function v({refId:t,relativeTimeRange:a,thresholds:c,model:p,dataSource:d,queryData:f,evalTimeRange:D,onEvalTimeRangeChange:l}){const E=(0,R.wW)(T),A=[d?.name??"[[Data source not found]]"];return a&&A.push((0,fe.C_)(a).display),e.createElement(L,{refId:t,headerItems:A,className:E.contentBox},e.createElement("pre",{className:E.code},e.createElement("code",null,(0,Z.$w)(p))),d&&e.createElement(u,{refId:t,dsSettings:d,model:p,data:f,thresholds:c,relativeTimeRange:D,onTimeRangeChange:l,className:E.visualization}))}const T=t=>({code:(0,r.css)`
    margin: ${t.spacing(1)};
  `,contentBox:(0,r.css)`
    flex: 1 0 100%;
  `,visualization:(0,r.css)`
    padding: ${t.spacing(1)};
  `});function b({refId:t,model:a,evalData:c,isAlertCondition:p}){function d(){switch(a.type){case B.Us.math:return e.createElement(Be,{model:a});case B.Us.reduce:return e.createElement(Pe,{model:a});case B.Us.resample:return e.createElement(Q,{model:a});case B.Us.classic:return e.createElement(J,{model:a});case B.Us.threshold:return e.createElement(ie,{model:a});default:return e.createElement(e.Fragment,null,"Expression not supported: ",a.type)}}return e.createElement(L,{refId:t,headerItems:[(0,X.startCase)(a.type)],isAlertCondition:p},d(),c&&e.createElement(Ee.bw,{series:c.series,isAlertCondition:p}))}function L({refId:t,headerItems:a=[],children:c,isAlertCondition:p,className:d}){const f=(0,R.wW)(G);return e.createElement("div",{className:(0,r.cx)(f.container,d)},e.createElement("header",{className:f.header},e.createElement("span",{className:f.refId},t),a.map((D,l)=>e.createElement("span",{key:l,className:f.textBlock},D)),p&&e.createElement("div",{className:f.conditionIndicator},e.createElement(pe.C,{color:"green",icon:"check",text:"Alert condition"}))),c)}const G=t=>({container:(0,r.css)`
    flex: 1 0 25%;
    border: 1px solid ${t.colors.border.strong};
    max-width: 100%;
  `,header:(0,r.css)`
    display: flex;
    align-items: center;
    gap: ${t.spacing(1)};
    padding: ${t.spacing(1)};
    background-color: ${t.colors.background.secondary};
  `,textBlock:(0,r.css)`
    border: 1px solid ${t.colors.border.weak};
    padding: ${t.spacing(.5,1)};
    background-color: ${t.colors.background.primary};
  `,refId:(0,r.css)`
    color: ${t.colors.text.link};
    padding: ${t.spacing(.5,1)};
    border: 1px solid ${t.colors.border.weak};
  `,conditionIndicator:(0,r.css)`
    margin-left: auto;
  `});function J({model:t}){const a=(0,R.wW)(Re),c=(0,X.keyBy)(k.Z.reducerTypes,f=>f.value),p=(0,X.keyBy)(k.Z.evalOperators,f=>f.value),d=(0,X.keyBy)(k.Z.evalFunctions,f=>f.value);return e.createElement("div",{className:a.container},t.conditions?.map(({query:f,operator:D,reducer:l,evaluator:E},A)=>{const x=Ne(E);return e.createElement(e.Fragment,{key:A},e.createElement("div",{className:a.blue},A===0?"WHEN":!!D?.type&&p[D?.type]?.text),e.createElement("div",{className:a.bold},l?.type&&c[l.type]?.text),e.createElement("div",{className:a.blue},"OF"),e.createElement("div",{className:a.bold},f.params[0]),e.createElement("div",{className:a.blue},d[E.type].text),e.createElement("div",{className:a.bold},x?`(${E.params[0]}; ${E.params[1]})`:E.params[0]))}))}const Re=t=>({container:(0,r.css)`
    padding: ${t.spacing(1)};
    display: grid;
    grid-template-columns: max-content max-content max-content max-content max-content max-content;
    gap: ${t.spacing(0,1)};
  `,...ce(t)});function Pe({model:t}){const a=(0,R.wW)(ae),{reducer:c,expression:p,settings:d}=t,f=B.SQ.find(E=>E.value===c),D=d?.mode??B.kN.Strict,l=B.YM.find(E=>E.value===D);return e.createElement("div",{className:a.container},e.createElement("div",{className:a.label},"Function"),e.createElement("div",{className:a.value},f?.label),e.createElement("div",{className:a.label},"Input"),e.createElement("div",{className:a.value},p),e.createElement("div",{className:a.label},"Mode"),e.createElement("div",{className:a.value},l?.label))}const ae=t=>({container:(0,r.css)`
    padding: ${t.spacing(1)};
    display: grid;
    gap: ${t.spacing(1)};
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    > :nth-child(6) {
      grid-column: span 3;
    }
  `,...ce(t)});function Q({model:t}){const a=(0,R.wW)(Te),{expression:c,window:p,downsampler:d,upsampler:f}=t,D=B.Fr.find(E=>E.value===d),l=B.r8.find(E=>E.value===f);return e.createElement("div",{className:a.container},e.createElement("div",{className:a.label},"Input"),e.createElement("div",{className:a.value},c),e.createElement("div",{className:a.label},"Resample to"),e.createElement("div",{className:a.value},p),e.createElement("div",{className:a.label},"Downsample"),e.createElement("div",{className:a.value},D?.label),e.createElement("div",{className:a.label},"Upsample"),e.createElement("div",{className:a.value},l?.label))}const Te=t=>({container:(0,r.css)`
    padding: ${t.spacing(1)};
    display: grid;
    gap: ${t.spacing(1)};
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  `,...ce(t)});function ie({model:t}){const a=(0,R.wW)($e),{expression:c,conditions:p}=t,d=p&&p[0]?.evaluator,f=B.Mi.find(l=>l.value===d?.type),D=d?Ne(d):!1;return e.createElement("div",{className:a.container},e.createElement("div",{className:a.label},"Input"),e.createElement("div",{className:a.value},c),d&&e.createElement(e.Fragment,null,e.createElement("div",{className:a.blue},f?.label),e.createElement("div",{className:a.bold},D?`(${d.params[0]}; ${d.params[1]})`:d.params[0])))}const $e=t=>{const{blue:a,bold:c,...p}=ce(t);return{...p,maxWidthContainer:(0,r.css)`
      max-width: 100%;
    `,container:(0,r.css)`
      padding: ${t.spacing(1)};
      display: flex;
      gap: ${t.spacing(1)};
    `,blue:(0,r.css)`
      ${a};
      margin: auto 0;
    `,bold:(0,r.css)`
      ${c};
      margin: auto 0;
    `}};function Be({model:t}){const a=(0,R.wW)($e),{expression:c}=t;return e.createElement("div",{className:a.container},e.createElement("div",{className:a.label},"Input"),e.createElement("div",{className:a.value},c))}const ce=t=>({blue:(0,r.css)`
    color: ${t.colors.text.link};
  `,bold:(0,r.css)`
    font-weight: ${t.typography.fontWeightBold};
  `,label:(0,r.css)`
    display: flex;
    align-items: center;
    padding: ${t.spacing(.5,1)};
    background-color: ${t.colors.background.secondary};
    font-size: ${t.typography.bodySmall.fontSize};
    line-height: ${t.typography.bodySmall.lineHeight};
    font-weight: ${t.typography.fontWeightBold};
  `,value:(0,r.css)`
    padding: ${t.spacing(.5,1)};
    border: 1px solid ${t.colors.border.weak};
  `});function Ne(t){return t.type===k.$.IsWithinRange||t.type===k.$.IsOutsideRange}var we=n(93260),be=n(94498),Le=n(98187),Qe=n(83507),De=n(76679),q=n(9001);function Me(t){if(!t)return[];const{namespace:a,rulerRule:c}=t,{rulesSource:p}=a;if((0,De.HY)(p)&&(0,q.Pc)(c))return c.grafana_alert.data;if((0,De.jq)(p)){const d=je(p,t);return[Fe(d,p.uid)]}return[]}function Fe(t,a){return{refId:t.refId,datasourceUid:a,queryType:"",model:t,relativeTimeRange:{from:360,to:0}}}function je(t,a){const c="A";switch(t.type){case"prometheus":return{refId:c,expr:a.query};case"loki":return{refId:c,expr:a.query};default:throw new Error(`Query for datasource type ${t.type} is currently not supported by cloud alert rules.`)}}var Oe=n(60956),Ke=n(2698),oe=n(48633),Ie=n(84237),de=n(90028),Ve=n(65959),ze=n(73509),He=n(47262),Ze=n(65732);const Ge=({group:t})=>{const a=t.source_tenants??[];return e.createElement(oe.C,{label:"Tenant sources"},e.createElement(e.Fragment,null,a.map(c=>e.createElement("div",{key:c},c))))};var Je=n(3438),Ye=n(71332),Xe=n(71474);const Se="Could not find data source for rule",Ae="Could not view rule",Ce="View rule";function We({match:t}){const a=(0,R.wW)(Ue),[c,p]=(0,N.Z)(!1),d=(0,e.useMemo)(()=>{const S=Oe.s4(t.params);if(!S)throw new Error("Rule ID is required");return Oe.Qc(S,!0)},[t.params]),{loading:f,error:D,result:l}=(0,be.HO)({ruleIdentifier:d}),E=(0,e.useMemo)(()=>new Le.v,[]),A=(0,M.Z)(E.get()),x=(0,e.useMemo)(()=>Me(l),[l]),K=(0,Qe.$9)(l?.annotations||{}),[C,V]=(0,e.useState)({}),{allDataSourcesAvailable:F}=(0,we.S)(x),ue=(0,e.useCallback)(()=>{if(x.length>0&&F){const S=x.map(Y=>({...Y,relativeTimeRange:C[Y.refId]??Y.relativeTimeRange}));let z;l&&(0,q.Pc)(l.rulerRule)&&(z=l.rulerRule.grafana_alert.condition),E.run(S,z??"A")}},[x,C,E,F,l]);(0,e.useEffect)(()=>{const S=Me(l),z=Object.fromEntries(S.map(Y=>[Y.refId,Y.relativeTimeRange??{from:0,to:0}]));V(z)},[l]),(0,e.useEffect)(()=>{F&&c&&ue()},[ue,F,c]),(0,e.useEffect)(()=>()=>E.destroy(),[E]);const me=(0,e.useCallback)((S,z)=>{const Y=(0,g.Uy)(C,tt=>{tt[S]=z});V(Y)},[C,V]);if(!d?.ruleSourceName)return e.createElement(de.$,{title:Ce},e.createElement(P.b,{title:Ae},e.createElement("details",{className:a.errorMessage},Se)));const ge=(0,De.o_)(d.ruleSourceName);if(f)return e.createElement(de.$,{title:Ce},e.createElement(U.u,{text:"Loading rule..."}));if(D||!ge)return e.createElement(P.b,{title:Ae},e.createElement("details",{className:a.errorMessage},(0,h.kW)(D)?D.message:Se,e.createElement("br",null)));if(!l)return e.createElement(de.$,{title:Ce},e.createElement("span",null,"Rule could not be found."));const le=(0,q.Jq)(l.group),et=(0,q.Pc)(l.rulerRule)&&!!l.rulerRule.grafana_alert.provenance;return e.createElement(e.Fragment,null,le&&e.createElement(P.b,{severity:"info",title:"This rule is part of a federated rule group."},e.createElement(w.wc,null,"Federated rule groups are currently an experimental feature.",e.createElement(H.zx,{fill:"text",icon:"book"},e.createElement("a",{href:"https://grafana.com/docs/metrics-enterprise/latest/tenant-management/tenant-federation/#cross-tenant-alerting-and-recording-rule-federation"},"Read documentation")))),et&&e.createElement(Ie.Xq,{resource:Ie.Uv.AlertRule}),e.createElement(de.l,null,e.createElement("div",null,e.createElement(j.K,{direction:"row",alignItems:"center",gap:1},e.createElement(re.J,{name:"bell",size:"lg"})," ",e.createElement("span",{className:a.title},l.name)),e.createElement(Xe.p,{rule:l,isCreating:!1,isDeleting:!1}),e.createElement(Ve.f,{rule:l,rulesSource:ge,isViewMode:!0})),e.createElement("div",{className:a.details},e.createElement("div",{className:a.leftSide},l.promRule&&e.createElement(oe.C,{label:"Health",horizontal:!0},e.createElement(Ye.V,{rule:l.promRule})),!!l.labels&&!!Object.keys(l.labels).length&&e.createElement(oe.C,{label:"Labels",horizontal:!0},e.createElement(Ke.s,{labels:l.labels})),e.createElement(Ze.C,{rulesSource:ge,rule:l,annotations:K}),e.createElement(ze.J,{annotations:K})),e.createElement("div",{className:a.rightSide},e.createElement(He.C,{rule:l,rulesSource:ge}),le&&e.createElement(Ge,{group:l.group}),e.createElement(oe.C,{label:"Namespace / Group",className:a.rightSideDetails},l.namespace.name," / ",l.group.name),(0,q.Pc)(l.rulerRule)&&e.createElement(ke,{rule:l.rulerRule.grafana_alert}))),e.createElement("div",null,e.createElement(Je.M,{rule:l,pagination:{itemsPerPage:se.gN},enableFiltering:!0}))),e.createElement(ee.U,{label:"Query & Results",isOpen:c,onToggle:p,loading:A&&qe(A),collapsible:!0,className:a.collapse},(0,q.Pc)(l.rulerRule)&&!le&&e.createElement(m,{condition:l.rulerRule.grafana_alert.condition,queries:x,evalDataByQuery:A,evalTimeRanges:C,onTimeRangeChange:me}),!(0,q.Pc)(l.rulerRule)&&!le&&A&&Object.keys(A).length>0&&e.createElement("div",{className:a.queries},x.map(S=>e.createElement(v,{key:S.refId,refId:S.refId,model:S.model,dataSource:Object.values(y.config.datasources).find(z=>z.uid===S.datasourceUid),queryData:A[S.refId],relativeTimeRange:S.relativeTimeRange,evalTimeRange:C[S.refId],onEvalTimeRangeChange:z=>me(S.refId,z),isAlertCondition:!1}))),!le&&!F&&e.createElement(P.b,{title:"Query not available",severity:"warning",className:a.queryWarning},"Cannot display the query preview. Some of the data sources used in the queries are not available.")))}function ke({rule:t}){const a=(0,R.wW)(Ue),c=()=>navigator.clipboard&&navigator.clipboard.writeText(t.uid);return e.createElement(oe.C,{label:"Rule UID",childrenWrapperClassName:a.ruleUid},t.uid," ",e.createElement(I.h,{name:"copy",onClick:c,tooltip:"Copy rule UID"}))}function qe(t){return!!Object.values(t).find(a=>a.state===O.Gu.Loading)}const Ue=t=>({errorMessage:(0,r.css)`
      white-space: pre-wrap;
    `,queries:(0,r.css)`
      height: 100%;
      width: 100%;
    `,collapse:(0,r.css)`
      margin-top: ${t.spacing(2)};
      border-color: ${t.colors.border.weak};
      border-radius: ${t.shape.radius.default};
    `,queriesTitle:(0,r.css)`
      padding: ${t.spacing(2,.5)};
      font-size: ${t.typography.h5.fontSize};
      font-weight: ${t.typography.fontWeightBold};
      font-family: ${t.typography.h5.fontFamily};
    `,query:(0,r.css)`
      border-bottom: 1px solid ${t.colors.border.medium};
      padding: ${t.spacing(2)};
    `,queryWarning:(0,r.css)`
      margin: ${t.spacing(4,0)};
    `,title:(0,r.css)`
      font-size: ${t.typography.h4.fontSize};
      font-weight: ${t.typography.fontWeightBold};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,details:(0,r.css)`
      display: flex;
      flex-direction: row;
      gap: ${t.spacing(4)};
    `,leftSide:(0,r.css)`
      flex: 1;
      overflow: hidden;
    `,rightSide:(0,r.css)`
      padding-right: ${t.spacing(3)};

      max-width: 360px;
      word-break: break-all;
      overflow: hidden;
    `,rightSideDetails:(0,r.css)`
      & > div:first-child {
        width: auto;
      }
    `,labels:(0,r.css)`
      justify-content: flex-start;
    `,ruleUid:(0,r.css)`
      display: flex;
      align-items: center;
      gap: ${t.spacing(1)};
    `}),_e=We},90028:(_,W,n)=>{n.d(W,{$:()=>O,l:()=>h});var r=n(66681),g=n(85960),e=n(47257),N=n(20989);const M={icon:"bell",id:"alert-rule-view"};function O(P){const{wrapInContent:U=!0,children:w,title:H}=P,j=(0,e.wW)(y);return g.createElement(N.T,{pageNav:{...M,text:H},navId:"alert-list"},g.createElement(N.T.Contents,null,g.createElement("div",{className:j.content},U?g.createElement(h,{...P}):w)))}function h({children:P,padding:U=2}){const w=(0,e.wW)(R(U));return g.createElement("div",{className:w.wrapper},P)}const y=P=>({content:(0,r.css)`
      max-width: ${P.breakpoints.values.xxl}px;
    `}),R=P=>U=>({wrapper:(0,r.css)`
      background: ${U.colors.background.primary};
      border: 1px solid ${U.colors.border.weak};
      border-radius: ${U.shape.radius.default};
      padding: ${U.spacing(P)};
    `})},71332:(_,W,n)=>{n.d(W,{V:()=>O});var r=n(66681),g=n(85960),e=n(47257),N=n(14607),M=n(97666);const O=({rule:y})=>{const R=(0,e.wW)(h);return y.health==="err"||y.health==="error"?g.createElement(N.u,{theme:"error",content:y.lastError||"No error message provided."},g.createElement("div",{className:R.warn},g.createElement(M.J,{name:"exclamation-triangle"}),g.createElement("span",null,"error"))):g.createElement(g.Fragment,null,y.health)},h=y=>({warn:(0,r.css)`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: ${y.spacing(1)};

    color: ${y.colors.warning.text};
  `})},71474:(_,W,n)=>{n.d(W,{p:()=>P});var r=n(66681),g=n(85960),e=n(18678),N=n(47257),M=n(13086),O=n(75682),h=n(25119),y=n(9001),R=n(14591);const P=({rule:w,isDeleting:H,isCreating:j,isPaused:re})=>{const ee=(0,N.wW)(U),{promRule:I}=w,se=(0,g.useMemo)(()=>{if(I&&(0,y.x_)(I)&&I.alerts?.length&&I.state!==h.x_.Inactive){const Z=I.activeAt?new Date(I.activeAt):(0,y.ub)(I);if(Z)return g.createElement("span",{title:String(Z),className:ee.for},"for"," ",(0,e.vT)({start:Z,end:new Date},!1))}return null},[I,ee]);return H?g.createElement(M.K,{gap:1},g.createElement(O.$,null),"Deleting"):j?g.createElement(M.K,{gap:1},g.createElement(O.$,null),"Creating"):I&&(0,y.x_)(I)?g.createElement(M.K,{gap:1},g.createElement(R.l,{state:I.state,isPaused:re}),se):I&&(0,y.OP)(I)?g.createElement(g.Fragment,null,"Recording rule"):g.createElement(g.Fragment,null,"n/a")},U=w=>({for:(0,r.css)`
    font-size: ${w.typography.bodySmall.fontSize};
    color: ${w.colors.text.secondary};
    white-space: nowrap;
    padding-top: 2px;
  `})},31476:(_,W,n)=>{n.d(W,{j:()=>e});var r=n(32063),g=n(36530);const e=N=>{if(!N)return!1;if((0,r.Pr)(N.datasource))return!0;const M=N;return typeof M.type!="string"?!1:Object.values(g.Us).includes(M.type)}}}]);

//# sourceMappingURL=2436.bf659e8078eaf6251fb8.js.map