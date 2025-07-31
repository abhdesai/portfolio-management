"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[5624],{80316:(ne,M,n)=>{n.d(M,{u:()=>C});var a=n(85960),z=n(62577),U=n(56375),R=n(19050);function O(l){const c=l.languages.CompletionItemKind.Function;return[{label:R.AlertmanagerTemplateFunction.toUpper,detail:"function(s string)",kind:c},{label:R.AlertmanagerTemplateFunction.toLower,detail:"function(s string)",kind:c},{label:R.AlertmanagerTemplateFunction.title,documentation:"Capitalizes the first letter of each word",detail:"function(s string)",kind:c},{label:R.AlertmanagerTemplateFunction.join,documentation:{value:"Joins an array of strings using the separator provided."},detail:"function(separator string, s []string)",kind:c},{label:R.AlertmanagerTemplateFunction.match,detail:"function",kind:c},{label:R.AlertmanagerTemplateFunction.safeHtml,detail:"function(pattern, repl, text)",kind:c},{label:R.AlertmanagerTemplateFunction.reReplaceAll,detail:"function(pattern, repl, text)",kind:c},{label:R.AlertmanagerTemplateFunction.stringSlice,detail:"function(s ...string)",kind:c}]}var e=n(9049);function L(l){const c={triggerCharacters:["."],provideCompletionItems(d,h,b){const S=d.getWordUntilPosition(h),B={startLineNumber:h.lineNumber,endLineNumber:h.lineNumber,startColumn:S.startColumn,endColumn:S.endColumn},K=new V(l,B);if(!E(d,h))return K.getSnippetsSuggestions();if(b.triggerKind===l.languages.CompletionTriggerKind.Invoke&&!b.triggerCharacter)return K.getFunctionsSuggestions();const ie=d.getWordUntilPosition({lineNumber:h.lineNumber,column:h.column-1});return K.getTemplateDataSuggestions(ie.word)}};return l.languages.registerCompletionItemProvider("go-template",c)}function E(l,c){const d={startLineNumber:c.lineNumber,endLineNumber:c.lineNumber,startColumn:l.getLineMinColumn(c.lineNumber),endColumn:l.getLineMaxColumn(c.lineNumber)},h='\\{\\{[a-zA-Z0-9._() "]+\\}\\}';return l.findMatches(h,d,!0,!1,null,!0).some(S=>S.range.containsPosition(c))}class V{constructor(c,d){this.monaco=c,this.range=d,this.getSnippetsSuggestions=()=>this.getCompletionsFromDefinitions((0,e.Zn)(this.monaco)),this.getFunctionsSuggestions=()=>this.getCompletionsFromDefinitions(O(this.monaco)),this.getTemplateDataSuggestions=h=>{switch(h){case"":return this.getCompletionsFromDefinitions((0,e.y5)(this.monaco),(0,e.J_)(this.monaco));case"Alerts":return this.getCompletionsFromDefinitions((0,e.WA)(this.monaco));case"GroupLabels":case"CommonLabels":case"CommonAnnotations":case"Labels":case"Annotations":return this.getCompletionsFromDefinitions((0,e.wY)(this.monaco));default:return{suggestions:[]}}},this.getCompletionsFromDefinitions=(...h)=>({suggestions:(0,U.concat)(...h).map(S=>j(S,this.range))})}}function j({label:l,detail:c,documentation:d,kind:h,insertText:b},S){const B=typeof l=="string"?l:l.label,K=typeof l=="string"?{label:l,description:c}:{...l};return K.description??=c,{label:K,kind:h,insertText:b??B,range:S,documentation:d,detail:c}}const D="go-template",Z={id:D,extensions:[],aliases:[],mimetypes:[],loader:()=>Promise.resolve().then(n.bind(n,19050))},H=(l,c)=>{const{id:d,loader:h}=c;l.languages.getLanguages().find(S=>S.id===d)||(l.languages.register({id:d}),h().then(S=>{l.languages.setMonarchTokensProvider(d,S.language),l.languages.setLanguageConfiguration(d,S.conf)}))},C=l=>{const c=!!l.autoHeight,d=(0,a.useRef)(null),h=b=>{if(c){const S=b.getContentHeight();try{b.layout({height:S,width:NaN})}catch{}}};return(0,a.useEffect)(()=>()=>{d.current?.dispose()},[]),a.createElement(z.p,{showLineNumbers:!0,showMiniMap:!1,...l,onEditorDidMount:h,onBeforeEditorMount:b=>{H(b,Z),d.current=L(b)},language:D})}},35624:(ne,M,n)=>{n.d(M,{OZ:()=>lt});var a=n(66681),z=n(35260),U=n(12173),R=n(23417);function O(t,o){(0,U.Z)(2,arguments);var m=(0,R.Z)(o);return(0,z.Z)(t,-m)}var e=n(85960),L=n(10476),E=n(30694),V=n(53565),j=n(85445),D=n(47257),q=n(49199),Z=n(51637),H=n(20519),C=n(24956),l=n(70523),c=n(94439),d=n(29165),h=n(96525),b=n(13086),S=n(75682),B=n(95500),K=n(95162),Q=n(58712);const ie="/api/alertmanager/grafana/config/api/v1/templates/test",Ae=Q.C.injectEndpoints({endpoints:t=>({previewTemplate:t.mutation({query:({template:o,alerts:m,name:s})=>({url:ie,data:{template:o,alerts:m,name:s},method:"POST"})})})}),{usePreviewTemplateMutation:xe}=Ae;var Te=n(92746),we=n(5970),me=n(76679),Le=n(77294),Ce=n(30422),Ne=n(58538),ue=n(84237),pe=n(14607),ge=n(97666),Re=n(62577),Oe=n(67192),fe=n(403),De=n(69977),ae=n(7288),$e=n(96535),he=n(79468),Pe=n(81828),_=n(658),be=n(13405);function Ie({onSelect:t,isOpen:o,onClose:m}){const s=(0,D.wW)(Fe),[r,y]=(0,e.useState)(),[i,p]=(0,e.useState)(null),{useGetAlertmanagerAlertsQuery:I}=Pe.alertmanagerApi,{currentData:$=[],isFetching:T,isError:G}=I({amSourceName:me.GC,filter:{inhibited:!0,silenced:!0,active:!0}}),[F,W]=(0,e.useState)(""),A=(0,e.useMemo)(()=>{const g={};return!T&&$&&$.forEach(f=>{g[f.labels.alertname]||(g[f.labels.alertname]=[]),g[f.labels.alertname].push(f)}),g},[T,$]),N=(0,e.useCallback)(g=>{y(g),p(null)},[]),w=(0,e.useMemo)(()=>{const g=Object.keys(A).filter(u=>u.toLowerCase().includes(F.toLowerCase())),f={};return g.forEach(u=>{f[u]=A[u]}),f},[A,F]);if(G)return null;const v=Object.keys(w||[]),x=({index:g,style:f})=>{if(!w)return null;const u=v[g],P=u===r;return e.createElement("button",{type:"button",title:u,style:f,className:(0,a.cx)(s.rowButton,{[s.rowOdd]:g%2===1,[s.rowSelected]:P}),onClick:()=>N(u)},e.createElement("div",{className:(0,a.cx)(s.ruleTitle,s.rowButtonTitle)},u),e.createElement("div",{className:s.alertFolder},e.createElement(e.Fragment,null,e.createElement(ge.J,{name:"folder"})," ",w[u][0].labels.grafana_folder??"")))},ee=(g,f)=>{const P=g.map(k=>k.labels).map(_.cH),J=(0,be.z)(P),X=(0,be.r)((0,_.cH)(f.labels),J);return X.length?(0,_.P3)((0,_.nW)(X)):(0,_.P3)(f.labels)},te=({index:g,style:f})=>{const u=(0,e.useMemo)(()=>r?A[r]:[],[]),P=u[g],J=i?.includes(P),X=(0,e.useMemo)(()=>ee(u,P),[u,P]),re=()=>{if(J&&i){p(i.filter(k=>k!==P));return}p([...i||[],P])};return e.createElement("button",{type:"button",style:f,className:(0,a.cx)(s.rowButton,s.instanceButton,{[s.rowOdd]:g%2===1,[s.rowSelected]:J}),onClick:re},e.createElement("div",{className:s.rowButtonTitle,title:P.labels.alertname},e.createElement(pe.u,{placement:"bottom",content:e.createElement("pre",null,JSON.stringify(P,null,2)),theme:"info"},e.createElement("div",null,X.map((k,mt)=>e.createElement(De.V,{key:mt,name:k,className:s.tag}))))))},Y=()=>{const g=i?.map(f=>({annotations:f.annotations,labels:f.labels,startsAt:f.startsAt,endsAt:f.endsAt}))||[];t(g),le()},le=()=>{y(void 0),p(null),W(""),oe("")},se=()=>{le(),m()},oe=g=>{W(g)};return e.createElement("div",null,e.createElement(ae.u,{title:"Select alert instances",className:s.modal,closeOnEscape:!0,isOpen:o,onDismiss:se,contentClassName:s.modalContent},e.createElement("div",{className:s.container},e.createElement($e.H,{value:F,onChange:oe,title:"Search alert rule",placeholder:"Search alert rule",autoFocus:!0}),e.createElement("div",null,r&&"Select one or more instances from the list below"||""),e.createElement("div",{className:s.column},T&&e.createElement(he.u,{text:"Loading rules...",className:s.loadingPlaceholder}),!T&&e.createElement(V.Z,null,({height:g,width:f})=>e.createElement(fe.t7,{itemSize:50,height:g,width:f,itemCount:v.length},x))),e.createElement("div",{className:s.column},!r&&!T&&e.createElement("div",{className:s.selectedRulePlaceholder},e.createElement("div",null,"Select an alert rule to get a list of available firing instances")),T&&e.createElement(he.u,{text:"Loading rule...",className:s.loadingPlaceholder}),r&&A[r].length&&!T&&e.createElement(V.Z,null,({width:g,height:f})=>e.createElement(fe.t7,{itemSize:32,height:f,width:g,itemCount:A[r].length||0},te)))),e.createElement(ae.u.ButtonRow,null,e.createElement(d.zx,{type:"button",variant:"secondary",onClick:se},"Cancel"),e.createElement(d.zx,{type:"button",variant:"primary",disabled:!(r&&i),onClick:()=>{r&&i&&Y()}},"Add alert data to payload"))))}const Fe=t=>{const o=(0,d.gN)(t);return{container:(0,a.css)`
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      grid-template-rows: min-content auto;
      gap: ${t.spacing(2)};
      flex: 1;
    `,tag:(0,a.css)`
      margin: 5px;
    `,column:(0,a.css)`
      flex: 1 1 auto;
    `,alertLabels:(0,a.css)`
      overflow-x: auto;
      height: 32px;
    `,ruleTitle:(0,a.css)`
      height: 22px;
      font-weight: ${t.typography.fontWeightBold};
    `,rowButton:(0,a.css)`
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
    `,rowButtonTitle:(0,a.css)`
      overflow-x: auto;
    `,rowSelected:(0,a.css)`
      border-color: ${t.colors.primary.border};
    `,rowOdd:(0,a.css)`
      background-color: ${t.colors.background.secondary};
    `,instanceButton:(0,a.css)`
      display: flex;
      gap: ${t.spacing(1)};
      justify-content: space-between;
      align-items: center;
    `,loadingPlaceholder:(0,a.css)`
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,selectedRulePlaceholder:(0,a.css)`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-weight: ${t.typography.fontWeightBold};
    `,modal:(0,a.css)`
      height: 100%;
    `,modalContent:(0,a.css)`
      flex: 1;
      display: flex;
      flex-direction: column;
    `,modalAlert:(0,a.css)`
      flex-grow: 0;
    `,warnIcon:(0,a.css)`
      fill: ${t.colors.warning.main};
    `,labels:(0,a.css)`
      justify-content: flex-start;
    `,alertFolder:(0,a.css)`
      height: 20px;
      font-size: ${t.typography.bodySmall.fontSize};
      color: ${t.colors.text.secondary};
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      column-gap: ${t.spacing(1)};
      align-items: center;
    `}},We=[{name:"Receiver",type:"string",notes:"Name of the contact point that the notification is being sent to."},{name:"Status",type:"string",notes:"firing if at least one alert is firing, otherwise resolved"},{name:"Alerts",type:"[]Alert",notes:"List of alert objects that are included in this notification."},{name:"Alerts.Firing",type:"[]Alert",notes:"List of firing alerts"},{name:"Alerts.Resolved",type:"[]Alert",notes:"List of resolved alerts"},{name:"GroupLabels",type:"KeyValue",notes:"Labels these alerts were grouped by."},{name:"CommonLabels",type:"KeyValue",notes:"Labels common to all the alerts included in this notification."},{name:"CommonAnnotations",type:"KeyValue",notes:"Annotations common to all the alerts included in this notification."},{name:"ExternalURL",type:"string",notes:"Back link to the Grafana that sent the notification."}],Ke=[{name:"Labels",type:"KeyValue",notes:"Set of labels attached to the alert."},{name:"Annotations",type:"KeyValue",notes:"Set of annotations attached to the alert."},{name:"StartsAt",type:"time.Time",notes:"Time the alert started firing."},{name:"EndsAt",type:"time.Time",notes:"Time the alert ends firing."}],Ve=[{name:"Status",type:"string",notes:"firing or resolved."},{name:"Labels",type:"KeyValue",notes:"Set of labels attached to the alert."},{name:"Annotations",type:"KeyValue",notes:"Set of annotations attached to the alert."},{name:"Values",type:"KeyValue",notes:"The values of all instant queries, reduce and math expressions, and classic conditions for the alert. It does not contain time series data."},{name:"StartsAt",type:"time.Time",notes:"Time the alert started firing."},{name:"EndsAt",type:"time.Time",notes:"Only set if the end time of an alert is known. Otherwise set to a configurable timeout period from the time since the last alert was received."},{name:"GeneratorURL",type:"string",notes:"A back link to Grafana or external Alertmanager."},{name:"SilenceURL",type:"string",notes:"Link to Grafana silence for with labels for this alert pre-filled. Only for Grafana managed alerts."},{name:"DashboardURL",type:"string",notes:"Link to Grafana dashboard, if alert rule belongs to one. Only for Grafana managed alerts."},{name:"PanelURL",type:"string",notes:"Link to Grafana dashboard panel, if alert rule belongs to one. Only for Grafana managed alerts."},{name:"Fingerprint",type:"string",notes:"Fingerprint that can be used to identify the alert."},{name:"ValueString",type:"string",notes:"String that contains the labels and value of each reduced expression in the alert."}],Be=[{name:"SortedPairs",returns:"KeyValue",notes:"Returns sorted list of key & value string pairs"},{name:"Remove",args:"[]string",returns:"KeyValue",notes:"Returns a copy of the Key/Value map without the given keys."},{name:"Names",returns:"[]string",notes:"List of label names"},{name:"Values",returns:"[]string",notes:"List of label values"}],Ge=`{
  "summary": "alert summary",
  "description": "alert description"
}
`;var ye=n(23595);function Me(){const t=(0,D.wW)(Ue),o=e.createElement(ce,{caption:e.createElement("h4",{className:t.header},"Alert template data ",e.createElement("span",null,"Available only when in the context of an Alert (e.g. inside .Alerts loop)")),dataItems:Ve});return e.createElement(b.K,{gap:2},e.createElement(ce,{caption:e.createElement("h4",{className:t.header},"Template Data"),dataItems:We,typeRenderer:m=>m==="[]Alert"?e.createElement(ye.z,{content:o},e.createElement("div",{className:t.interactiveType},m)):m==="KeyValue"?e.createElement(ye.z,{content:e.createElement(ze,null)},e.createElement("div",{className:t.interactiveType},m)):m}))}const Ue=t=>({header:(0,a.css)`
    color: ${t.colors.text.primary};

    span {
      color: ${t.colors.text.secondary};
      font-size: ${t.typography.bodySmall.fontSize};
    }
  `,interactiveType:(0,a.css)`
    color: ${t.colors.text.link};
  `});function ce({dataItems:t,caption:o,typeRenderer:m}){const s=(0,D.wW)(ve);return e.createElement("table",{className:s.table},e.createElement("caption",null,o),e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"Name"),e.createElement("th",null,"Type"),e.createElement("th",null,"Notes"))),e.createElement("tbody",null,t.map(({name:r,type:y,notes:i},p)=>e.createElement("tr",{key:p},e.createElement("td",null,r),e.createElement("td",null,m?m(y):y),e.createElement("td",null,i)))))}function ze(){const t=(0,D.wW)(ve);return e.createElement("div",null,"KeyValue is a set of key/value string pairs that represent labels and annotations.",e.createElement("pre",null,e.createElement("code",null,Ge)),e.createElement("table",{className:t.table},e.createElement("caption",null,"Key-value methods"),e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"Name"),e.createElement("th",null,"Arguments"),e.createElement("th",null,"Returns"),e.createElement("th",null,"Notes"))),e.createElement("tbody",null,Be.map(({name:o,args:m,returns:s,notes:r})=>e.createElement("tr",{key:o},e.createElement("td",null,o),e.createElement("td",null,m),e.createElement("td",null,s),e.createElement("td",null,r))))))}const ve=t=>({table:(0,a.css)`
    border-collapse: collapse;
    width: 100%;

    caption {
      caption-side: top;
    }

    td,
    th {
      padding: ${t.spacing(1,1)};
    }

    thead {
      font-weight: ${t.typography.fontWeightBold};
    }

    tbody tr:nth-child(2n + 1) {
      background-color: ${t.colors.background.secondary};
    }

    tbody td:nth-child(1) {
      font-weight: ${t.typography.fontWeightBold};
    }

    tbody td:nth-child(2) {
      font-style: italic;
    }
  `});var je=n(72435),Je=n(5106),ke=n(55822),Ze=n(124);const He={annotations:[{key:"",value:""}],labels:[{key:"",value:""}],status:"firing"},Qe=({isOpen:t,onDismiss:o,onAccept:m})=>{const s=(0,D.wW)(Ye),[r,y]=(0,e.useState)([]),i=(0,L.cI)({defaultValues:He,mode:"onBlur"}),p=i.watch("annotations"),I=i.watch("labels"),[$,T]=(0,e.useState)("firing"),G=()=>{const N={annotations:p.filter(({key:w,value:v})=>!!w&&!!v).reduce((w,{key:v,value:x})=>({...w,[v]:x}),{}),labels:I.filter(({key:w,value:v})=>!!w&&!!v).reduce((w,{key:v,value:x})=>({...w,[v]:x}),{}),startsAt:"2023-04-01T00:00:00Z",endsAt:$==="firing"?(0,z.Z)(new Date,1).toISOString():O(new Date,1).toISOString()};y(w=>[...w,N]),i.reset()},F=()=>{m(r),y([]),i.reset(),T("firing")},W=()=>{const N=I.some(v=>v.key!==""&&v.value!==""),w=p.some(v=>v.key!==""&&v.value!=="");return N||w},A=[{label:"Firing",value:"firing"},{label:"Resolved",value:"resolved"}];return e.createElement(ae.u,{onDismiss:o,isOpen:t,title:"Add custom alerts"},e.createElement(L.RV,{...i},e.createElement("form",{onSubmit:N=>{N.preventDefault(),N.stopPropagation(),i.reset(),T("firing")}},e.createElement(e.Fragment,null,e.createElement(je.Z,null,e.createElement(b.K,{direction:"column",gap:1},e.createElement("div",{className:s.section},e.createElement(ke.Z,null)),e.createElement("div",{className:s.section},e.createElement(Ze.Z,null)),e.createElement("div",{className:s.flexWrapper},e.createElement(Je.S,{value:$,options:A,onChange:N=>T(N)}),e.createElement(d.zx,{onClick:G,className:s.onAddButton,icon:"plus-circle",type:"button",variant:"secondary",disabled:!W()},"Add alert data"))))),e.createElement("div",{className:s.onSubmitWrapper}),r.length>0&&e.createElement(b.K,{direction:"column",gap:1},e.createElement("h5",null," Review alert data to add to the payload:"),e.createElement("pre",{className:s.result,"data-testid":"payloadJSON"},JSON.stringify(r,null,2))),e.createElement("div",{className:s.onSubmitWrapper},e.createElement(ae.u.ButtonRow,null,e.createElement(d.zx,{onClick:F,disabled:r.length===0,className:s.onSubmitButton},"Add alert data to payload"))))))},Ye=t=>({section:(0,a.css)`
    margin-bottom: ${t.spacing(2)};
  `,onAddButton:(0,a.css)`
    flex: none;
    width: fit-content;
    padding-right: ${t.spacing(1)};
    margin-left: auto;
  `,flexWrapper:(0,a.css)`
    display: flex;
    flex-direction: row,
    justify-content: space-between;
  `,onSubmitWrapper:(0,a.css)`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-end;
  `,onSubmitButton:(0,a.css)`
    margin-left: ${t.spacing(2)};
  `,result:(0,a.css)`
    width: 570px;
    height: 363px;
  `}),Xe="Reset to default";function qe({payload:t,setPayload:o,defaultPayload:m,setPayloadFormatError:s,payloadFormatError:r,onPayloadError:y}){const i=(0,D.wW)(Ee),p=()=>{o(m)},[I,$]=(0,e.useState)(!1),T=()=>{$(!1)},G=r!==null,F=()=>{try{const x=JSON.parse(t);JSON.stringify([...x]),s(null)}catch(x){throw s(x instanceof Error?x.message:"Invalid JSON."),y(),x}},W=()=>{try{F(),$(!0)}catch{}},A=()=>{try{F(),v(!0)}catch{}},N=x=>{T(),v(!1),o(ee=>{const te=JSON.parse(ee);return JSON.stringify([...te,...x],void 0,2)})},[w,v]=(0,e.useState)(!1);return e.createElement("div",{className:i.wrapper},e.createElement("div",{className:i.editor},e.createElement("div",{className:i.title},"Payload data",e.createElement(pe.u,{placement:"top",content:e.createElement(_e,null),theme:"info"},e.createElement(ge.J,{name:"info-circle",className:i.tooltip,size:"xl"}))),e.createElement(V.Z,{disableHeight:!0},({width:x})=>e.createElement("div",{className:i.editorWrapper},e.createElement(Re.p,{width:x,height:362,language:"json",showLineNumbers:!0,showMiniMap:!1,value:t,readOnly:!1,onBlur:o}))),e.createElement("div",{className:i.buttonsWrapper},e.createElement(d.zx,{type:"button",variant:"secondary",className:i.button,icon:"bell",disabled:G,onClick:A},"Select alert instances"),e.createElement(d.zx,{onClick:W,className:i.button,icon:"plus-circle",type:"button",variant:"secondary",disabled:G},"Add custom alerts"),e.createElement(d.zx,{onClick:p,className:i.button,icon:"arrow-up",type:"button",variant:"destructive"},Xe),r!==null&&e.createElement(Oe.C,{color:"orange",icon:"exclamation-triangle",text:"JSON Error",tooltip:"Fix errors in payload, and click Refresh preview button"}))),e.createElement(Qe,{isOpen:I,onDismiss:T,onAccept:N}),e.createElement(Ie,{onSelect:N,isOpen:w,onClose:()=>v(!1)}))}const _e=()=>{const t=(0,D.wW)(Ee);return e.createElement(ce,{caption:e.createElement("h4",{className:t.templateDataDocsHeader},"Alert template data ",e.createElement("span",null,"This is the list of alert data fields used in the preview.")),dataItems:Ke})},Ee=t=>({jsonEditor:(0,a.css)`
    width: 100%;
    height: 100%;
  `,buttonsWrapper:(0,a.css)`
    margin-top: ${t.spacing(1)};
    display: flex;
    flex-wrap: wrap;
  `,button:(0,a.css)`
    flex: none;
    width: fit-content;
    padding-right: ${t.spacing(1)};
    margin-right: ${t.spacing(1)};
    margin-bottom: ${t.spacing(1)};
  `,title:(0,a.css)`
    font-weight: ${t.typography.fontWeightBold};
    heigth: 41px;
    padding-top: 10px;
    padding-left: ${t.spacing(2)};
    margin-top: 19px;
  `,wrapper:(0,a.css)`
    flex: 1;
    min-width: 450px;
  `,tooltip:(0,a.css)`
    padding-left: ${t.spacing(1)};
  `,editorWrapper:(0,a.css)`
    width: min-content;
    padding-top: 7px;
  `,editor:(0,a.css)`
    display: flex;
    flex-direction: column;
    margin-top: ${t.spacing(-1)};
  `,templateDataDocsHeader:(0,a.css)`
    color: ${t.colors.text.primary};

    span {
      color: ${t.colors.text.secondary};
      font-size: ${t.typography.bodySmall.fontSize};
    }
  `});var et=n(80316),tt=n(9049);const nt=Object.freeze({name:"",content:""}),at=t=>t.pathname.endsWith("/duplicate"),Se=`[
  {
    "annotations": {
      "summary": "Instance instance1 has been down for more than 5 minutes"
    },
    "labels": {
      "instance": "instance1"
    },
    "startsAt": "${O(new Date,1).toISOString()}"
  }]
`,lt=({existing:t,alertManagerSourceName:o,config:m,provenance:s})=>{const r=(0,D.wW)(de),y=(0,K.useDispatch)();(0,B.x)(u=>u.unifiedAlerting.saveAMConfig=Ce.oq);const{loading:i,error:p}=(0,Te._)(u=>u.saveAMConfig),I=(0,E.TH)(),$=at(I),[T,G]=(0,e.useState)(Se),[F,W]=(0,e.useState)(null),[A,N]=(0,e.useState)("content"),w=()=>N("preview"),v=u=>{const P=(0,Ne.Z)(u.name,u.content),J={...m.template_files,[u.name]:P};t&&t.name!==u.name&&delete J[t.name];const X=[...(m.alertmanager_config.templates??[]).filter(k=>k!==t?.name),u.name],re={template_files:J,alertmanager_config:{...m.alertmanager_config,templates:X}};y((0,we.mM)({alertManagerSourceName:o,newConfig:re,oldConfig:m,successMessage:"Template saved.",redirectPath:"/alerting/notifications"}))},x=(0,L.cI)({mode:"onSubmit",defaultValues:t??nt}),{handleSubmit:ee,register:te,formState:{errors:Y},getValues:le,setValue:se,watch:oe}=x,g=u=>!m.template_files[u]||t?.name===u?!0:"Another template with this name already exists.",f=o===me.GC;return e.createElement(L.RV,{...x},e.createElement("form",{onSubmit:ee(v)},e.createElement("h4",null,t&&!$?"Edit notification template":"Create notification template"),p&&e.createElement(q.b,{severity:"error",title:"Error saving template"},p.message||(0,j.kW)(p)&&p.data?.message||String(p)),s&&e.createElement(ue.Xq,{resource:ue.Uv.Template}),e.createElement(Z.C,{disabled:!!s},e.createElement(H.g,{label:"Template name",error:Y?.name?.message,invalid:!!Y.name?.message,required:!0},e.createElement(C.I,{...te("name",{required:{value:!0,message:"Required."},validate:{nameIsUnique:g}}),placeholder:"Give your template a name",width:42,autoFocus:!0})),e.createElement(st,null),e.createElement("div",{className:r.editorsWrapper},e.createElement("div",{className:r.contentContainer},e.createElement(l.J,null,e.createElement(c.O,{label:"Content",active:A==="content",onChangeTab:()=>N("content")}),f&&e.createElement(c.O,{label:"Preview",active:A==="preview",onChangeTab:()=>N("preview")})),e.createElement("div",{className:r.contentContainerEditor},e.createElement(V.Z,null,({width:u})=>e.createElement(e.Fragment,null,A==="content"?e.createElement("div",null,e.createElement(H.g,{error:Y?.content?.message,invalid:!!Y.content?.message,required:!0},e.createElement("div",{className:r.editWrapper},e.createElement(et.u,{value:le("content"),width:u,height:363,onBlur:P=>se("content",P)}))),e.createElement("div",{className:r.buttons},i&&e.createElement(d.zx,{disabled:!0,icon:"spinner",variant:"primary"},"Saving..."),!i&&e.createElement(d.zx,{type:"submit",variant:"primary"},"Save template"),e.createElement(d.Qj,{disabled:i,href:(0,Le.eQ)("alerting/notifications",o),variant:"secondary",type:"button"},"Cancel"))):e.createElement(dt,{width:u,payload:T,templateName:oe("name"),setPayloadFormatError:W,payloadFormatError:F}))))),f&&e.createElement(qe,{payload:T,setPayload:G,defaultPayload:Se,setPayloadFormatError:W,payloadFormatError:F,onPayloadError:w}))),e.createElement(h.s,{label:"Data cheat sheet",isOpen:!1,className:r.collapsableSection},e.createElement(Me,null))))};function st(){const t=(0,D.wW)(de);return e.createElement(q.b,{title:"Templating guideline",severity:"info"},e.createElement(b.K,{direction:"row"},e.createElement("div",null,"Grafana uses Go templating language to create notification messages.",e.createElement("br",null),"To find out more about templating please visit our documentation."),e.createElement("div",null,e.createElement(d.Qj,{href:"https://grafana.com/docs/grafana/latest/alerting/manage-notifications/template-notifications/",target:"_blank",icon:"external-link-alt",variant:"secondary"},"Templating documentation"))),e.createElement("div",{className:t.snippets},"To make templating easier, we provide a few snippets in the content editor to help you speed up your workflow.",e.createElement("div",{className:t.code},Object.values(tt.hn).map(o=>o.label).join(", "))))}function ot(t){const o=t.filter(r=>r.text.trim().length>0),m=o.length>1,s=r=>{const y=`Preview for ${r.name}:`,i="=".repeat(y.length).concat(">"),p="<".concat("=".repeat(y.length));return m?`${y}
${i}${r.text}${p}
`:`${i}${r.text}${p}
`};return o.map(r=>s(r)).join(`
`)}function rt(t){return t.map(o=>o.name?`ERROR in ${o.name}:
`.concat(`${o.kind}
${o.message}
`):`ERROR:
${o.kind}
${o.message}
`).join(`
`)}const it="Preview request failed. Check if the payload data has the correct structure.";function ct(t,o,m){const s=t?it:void 0,r=t||!!o,y=o||s,i=m?.results,p=m?.errors,I=i?ot(i):"",$=p?rt(p):"";return r?y:`${I}
${$}`}function dt({payload:t,templateName:o,payloadFormatError:m,setPayloadFormatError:s,width:r}){const y=(0,D.wW)(de),{watch:i}=(0,L.Gc)(),p=i("content"),[I,{data:$,isError:T,isLoading:G}]=xe(),F=ct(T,m,$),W=(0,e.useCallback)(()=>{try{const A=JSON.parse(t);JSON.stringify([...A]),I({template:p,alerts:A,name:o}),s(null)}catch(A){s(A instanceof Error?A.message:"Invalid JSON.")}},[p,o,t,s,I]);return(0,e.useEffect)(()=>W(),[W]),e.createElement("div",{style:{width:`${r}px`},className:y.preview.wrapper},G&&e.createElement(e.Fragment,null,e.createElement(S.$,{inline:!0})," Loading preview..."),e.createElement("pre",{className:y.preview.result,"data-testid":"payloadJSON"},F),e.createElement(d.zx,{onClick:W,className:y.preview.button,icon:"arrow-up",type:"button",variant:"secondary"},"Refresh preview"))}const de=t=>({contentContainer:(0,a.css)`
    flex: 1;
    margin-bottom: ${t.spacing(6)};
  `,contentContainerEditor:(0,a.css)`
      flex:1;
      display: flex;
      padding-top: 10px;
      gap: ${t.spacing(2)};
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
      ${t.breakpoints.up("xxl")} {
        flex - wrap: nowrap;
    }
      min-width: 450px;
      height: 363px;
      `,snippets:(0,a.css)`
    margin-top: ${t.spacing(2)};
    font-size: ${t.typography.bodySmall.fontSize};
  `,code:(0,a.css)`
    color: ${t.colors.text.secondary};
    font-weight: ${t.typography.fontWeightBold};
  `,buttons:(0,a.css)`
    display: flex;
    & > * + * {
      margin-left: ${t.spacing(1)};
    }
    margin-top: -7px;
  `,textarea:(0,a.css)`
    max-width: 758px;
  `,editWrapper:(0,a.css)`
      display: flex;
      width: 100%
      heigth:100%;
      position: relative;
      `,toggle:(0,a.css)`
      color: theme.colors.text.secondary,
      marginRight: ${t.spacing(1)}`,preview:{wrapper:(0,a.css)`
      display: flex;
      width: 100%
      heigth:100%;
      position: relative;
      flex-direction: column;
      `,result:(0,a.css)`
      width: 100%;
      height: 363px;
    `,button:(0,a.css)`
      flex: none;
      width: fit-content;
      margin-top: -6px;
    `},collapsableSection:(0,a.css)`
    width: fit-content;
  `,editorsWrapper:(0,a.css)`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: ${t.spacing(1)};
  `})},9049:(ne,M,n)=>{n.d(M,{J_:()=>j,WA:()=>D,y5:()=>V,wY:()=>q,Zn:()=>H,hn:()=>Z});const a=`
{{ range .Alerts }}
  Status: {{ .Status }}
  Starts at: {{ .StartsAt }}
{{ end }}
`,z=`
[{{.Status}}] {{ .Labels.alertname }}

Labels:
{{ range .Labels.SortedPairs }}
  {{ .Name }}: {{ .Value }}
{{ end }}

{{ if gt (len .Annotations) 0 }}
Annotations:
{{ range .Annotations.SortedPairs }}
  {{ .Name }}: {{ .Value }}
{{ end }}
{{ end }}

{{ if gt (len .SilenceURL ) 0 }}
  Silence alert: {{ .SilenceURL }}
{{ end }}
{{ if gt (len .DashboardURL ) 0 }}
  Go to dashboard: {{ .DashboardURL }}
{{ end }}
`,U=E("GroupLabels.SortedPairs"),R=E("CommonLabels.SortedPairs"),O=E("CommonAnnotations.SortedPairs"),e=E("Labels.SortedPairs"),L=E("Annotations.SortedPairs");function E(C){return`
{{ range .${C} }}
  {{ .Name }} = {{ .Value }}
{{ end }}`}function V(C){const l=C.languages.CompletionItemKind.Field;return[{label:"Alerts",kind:l,detail:"Alert[]",documentation:{value:"An Array containing all alerts"}},{label:"Receiver",kind:l,detail:"string"},{label:"Status",kind:l,detail:"string"},{label:"GroupLabels",kind:l,detail:"[]KeyValue"},{label:"CommonLabels",kind:l,detail:"[]KeyValue"},{label:"CommonAnnotations",kind:l,detail:"[]KeyValue"},{label:"ExternalURL",kind:l,detail:"string"}]}function j(C){const l=C.languages.CompletionItemKind.Field;return[{label:{label:"Status",detail:"(Alert)",description:"string"},kind:l,detail:"string",documentation:{value:"Status of the alert. It can be `firing` or `resolved`"}},{label:{label:"Labels",detail:"(Alert)"},kind:l,detail:"[]KeyValue",documentation:{value:"A set of labels attached to the alert."}},{label:{label:"Annotations",detail:"(Alert)"},kind:l,detail:"[]KeyValue",documentation:"A set of annotations attached to the alert."},{label:{label:"StartsAt",detail:"(Alert)"},kind:l,detail:"time.Time",documentation:"Time the alert started firing."},{label:{label:"EndsAt",detail:"(Alert)"},kind:l,detail:"time.Time",documentation:"Only set if the end time of an alert is known. Otherwise set to a configurable timeout period from the time since the last alert was received."},{label:{label:"GeneratorURL",detail:"(Alert)"},kind:l,detail:"string",documentation:"Back link to Grafana or external Alertmanager."},{label:{label:"SilenceURL",detail:"(Alert)"},kind:l,detail:"string",documentation:"Link to Grafana silence for with labels for this alert pre-filled. Only for Grafana managed alerts."},{label:{label:"DashboardURL",detail:"(Alert)"},kind:l,detail:"string",documentation:"Link to Grafana dashboard, if alert rule belongs to one. Only for Grafana managed alerts."},{label:{label:"PanelURL",detail:"(Alert)"},kind:l,detail:"string",documentation:"Link to Grafana dashboard panel, if alert rule belongs to one. Only for Grafana managed alerts."},{label:{label:"Fingerprint",detail:"(Alert)"},kind:l,detail:"string",documentation:"Fingerprint that can be used to identify the alert."},{label:{label:"ValueString",detail:"(Alert)"},kind:l,detail:"string",documentation:"String that contains labels and values of each reduced expression in the alert."}]}function D(C){const l=C.languages.CompletionItemKind.Field;return[{label:"Firing",kind:l,detail:"Alert[]"},{label:"Resolved",kind:l,detail:"Alert[]"}]}function q(C){const l=C.languages.CompletionItemKind.Field;return[{label:"SortedPairs",kind:l,detail:"[]KeyValue"},{label:"Names",kind:l,detail:"[]string"},{label:"Values",kind:l,detail:"[]string"},{label:"Remove",detail:"KeyValue[] function(keys []string)",kind:C.languages.CompletionItemKind.Method}]}const Z={alerts:{label:"alertsloop",description:"Renders a loop through alerts",snippet:a},alertDetails:{label:"alertdetails",description:"Renders all information available about the alert",snippet:z},groupLabels:{label:"grouplabelsloop",description:"Renders a loop through group labels",snippet:U},commonLabels:{label:"commonlabelsloop",description:"Renders a loop through common labels",snippet:R},commonAnnotations:{label:"commonannotationsloop",description:"Renders a loop through common annotations",snippet:O},labels:{label:"labelsloop",description:"Renders a loop through labels",snippet:e},annotations:{label:"annotationsloop",description:"Renders a loop through annotations",snippet:L}};function H(C){const l=C.languages.CompletionItemKind.Snippet,c=C.languages.CompletionItemInsertTextRule.InsertAsSnippet,{alerts:d,alertDetails:h,groupLabels:b,commonLabels:S,commonAnnotations:B,labels:K,annotations:Q}=Z;return[{label:d.label,documentation:d.description,kind:l,insertText:d.snippet,insertTextRules:c},{label:{label:h.label,detail:"(Alert)"},documentation:h.description,kind:l,insertText:h.snippet,insertTextRules:c},{label:b.label,documentation:b.description,kind:l,insertText:b.snippet,insertTextRules:c},{label:S.label,documentation:S.description,kind:l,insertText:S.snippet,insertTextRules:c},{label:B.label,documentation:B.description,kind:l,insertText:B.snippet,insertTextRules:c},{label:{label:K.label,detail:"(Alert)"},documentation:K.description,kind:l,insertText:K.snippet,insertTextRules:c},{label:{label:Q.label,detail:"(Alert)"},documentation:Q.description,kind:l,insertText:Q.snippet,insertTextRules:c}]}},13405:(ne,M,n)=>{n.d(M,{r:()=>U,z:()=>R});var a=n(56375),z=n.n(a);function U(O,e){return O.filter(L=>!e.find(E=>JSON.stringify(E)===JSON.stringify(L)))}function R(O){const e=O.flatMap(E=>E);return(0,a.uniqBy)(e.filter(E=>e.filter(j=>(0,a.isEqual)(E,j)).length===Object.keys(O).length),E=>JSON.stringify(E))}},58538:(ne,M,n)=>{n.d(M,{M:()=>R,Z:()=>U});var a=n(56375),z=n.n(a);function U(O,e){let L=e.trim();if(!L.match(/\{\{\s*define/)){const E=L.split(`
`).map(V=>"  "+V).join(`
`);L=`{{ define "${O}" }}
${E}
{{ end }}`}return L}function R(O){const e=(L,E)=>`{{ define "${E}_NEW_${(0,a.now)()}" }}`;return O.replace(/\{\{\s*define\s*\"(?<defineName>.*)\"\s*\}\}/g,e)}}}]);

//# sourceMappingURL=5624.53d848aa2f1e1a390d24.js.map