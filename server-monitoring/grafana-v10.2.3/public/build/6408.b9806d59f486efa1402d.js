"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[6408],{32327:(F,I,t)=>{t.d(I,{j:()=>E});var l=t(66681),e=t(85960),s=t(90857),S=t(47257),D=t(29165),T=t(27436),K=t(97666),u=t(99602);const E=({onChange:f,maxMenuHeight:M,isWidget:p=!1})=>{const L=()=>s.config.featureToggles.vizAndWidgetSplit?p?(0,u.Ry)():(0,u.hK)():(0,u.xW)(),v=(0,e.useMemo)(L,[p]),R=(0,e.useMemo)(()=>v.map(r=>({label:r.name,imgUrl:r.info.logos.small,value:r})).sort((r,h)=>r.label?.localeCompare(h.label)),[v]),[y,U]=(0,e.useState)([]),i=(0,e.useCallback)(r=>{const h=r.filter(x=>x.value).map(x=>x.value);f(h),U(r)},[f]),W=(0,S.wW)(m),b={defaultOptions:!0,getOptionLabel:r=>r.label,getOptionValue:r=>r.value,noOptionsMessage:"No Panel types found",placeholder:"Filter by type",maxMenuHeight:M,options:R,value:y,onChange:i};return e.createElement("div",{className:W.container},y.length>0&&e.createElement(D.zx,{size:"xs",icon:"trash-alt",fill:"text",className:W.clear,onClick:()=>i([]),"aria-label":"Clear types"},"Clear types"),e.createElement(T.NU,{...b,prefix:e.createElement(K.J,{name:"filter"}),"aria-label":"Panel Type filter"}))};function m(f){return{container:(0,l.css)`
      label: container;
      position: relative;
      min-width: 180px;
      flex-grow: 1;
    `,clear:(0,l.css)`
      label: clear;
      font-size: ${f.spacing(1.5)};
      position: absolute;
      top: -${f.spacing(4.5)};
      right: 0;
    `}}},68440:(F,I,t)=>{t.d(I,{P:()=>u});var l=t(85960),e=t(81445),s=t(27436),S=t(97666),D=t(19252),T=t(30824);const K=()=>(0,T.getGrafanaSearcher)().getSortOptions();function u({onChange:E,value:m,placeholder:f,filter:M,getSortOptions:p,isClearable:L}){const v=(0,e.Z)(async()=>{const y=await(p??K)();return M?y.filter(U=>M.includes(U.value)):y},[p,M]);if(v.loading)return null;const R=!!(m?.includes("desc")||m?.startsWith("-"));return l.createElement(s.Ph,{key:m,width:28,onChange:E,value:v.value?.find(y=>y.value===m)??null,options:v.value,"aria-label":"Sort",placeholder:f??`Sort (Default ${D.yw.label})`,prefix:l.createElement(S.J,{name:R?"sort-amount-down":"sort-amount-up"}),isClearable:L})}},9581:(F,I,t)=>{t.d(I,{p:()=>O});var l=t(66681),e=t(85960),s=t(34785),S=t(90857),D=t(47257),T=t(97666),K=t(59672),u=t(25802),E=t(26469),m=t(23757),f=t(7288),M=t(29165),p=t(37565),L=t(51624),v=t(1706),R=t(20079);const y={loadingState:m.Gu.Loading,dashboardTitles:[]},U=(0,R.PH)("libraryPanels/delete/searchCompleted"),i=(a=y,o)=>U.match(o)?{...a,dashboardTitles:o.payload.dashboards.map(c=>c.title),loadingState:m.Gu.Done}:a;function W(a){return async function(o){const c=await(0,v.E8)(a.uid);o(U({dashboards:c}))}}const b=({libraryPanel:a,onDismiss:o,onConfirm:c})=>{const g=(0,D.wW)(p.J),[{dashboardTitles:P,loadingState:C},N]=(0,e.useReducer)(i,y),$=(0,e.useMemo)(()=>(0,L.tb)(N),[N]);(0,e.useEffect)(()=>{$(W(a))},[$,a]);const B=!!P.length,z=C===m.Gu.Done;return e.createElement(f.u,{className:g.modal,title:"Delete library panel",icon:"trash-alt",onDismiss:o,isOpen:!0},z?null:e.createElement(r,null),z?e.createElement("div",null,B?e.createElement(x,{dashboardTitles:P}):null,B?null:e.createElement(h,null),e.createElement(f.u.ButtonRow,null,e.createElement(M.zx,{variant:"secondary",onClick:o,fill:"outline"},"Cancel"),e.createElement(M.zx,{variant:"destructive",onClick:c,disabled:B},"Delete"))):null)},r=()=>e.createElement("span",null,"Loading library panel..."),h=()=>{const a=(0,D.wW)(p.J);return e.createElement("div",{className:a.modalText},"Do you want to delete this panel?")},x=({dashboardTitles:a})=>{const o=(0,D.wW)(p.J),c=a.length===1?"dashboard.":"dashboards.",g=`${a.length} ${c}`;return a.length===0?null:e.createElement("div",null,e.createElement("p",{className:o.textInfo},"This library panel can not be deleted because it is connected to ",e.createElement("strong",null,g)," Remove the library panel from the dashboards listed below and retry."),e.createElement("table",{className:o.myTable},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"Dashboard name"))),e.createElement("tbody",null,a.map((P,C)=>e.createElement("tr",{key:`dash-title-${C}`},e.createElement("td",null,P))))))},O=({libraryPanel:a,onClick:o,onDelete:c,showSecondaryActions:g})=>{const[P,C]=(0,e.useState)(!1),N=()=>{c?.(a),C(!1)},$=S.config.panels[a.model.type]??(0,u.X)(a.model.type).meta;return e.createElement(e.Fragment,null,e.createElement(E.X,{isCurrent:!1,title:a.name,description:a.description,plugin:$,onClick:()=>o?.(a),onDelete:g?()=>C(!0):void 0},e.createElement(n,{libraryPanel:a})),P&&e.createElement(b,{libraryPanel:a,onConfirm:N,onDismiss:()=>C(!1)}))},A=({showSecondaryActions:a})=>{const o=(0,D.wW)(d);return e.createElement(E.X.Skeleton,{hasDelete:a},e.createElement(s.Z,{containerClassName:o.metaContainer,width:80}))};O.Skeleton=A;function n({libraryPanel:a}){const o=(0,D.wW)(d);return!a.meta?.folderUid&&!a.meta?.folderName?null:a.meta.folderUid?e.createElement("span",{className:o.metaContainer},e.createElement(K.r,{href:`/dashboards/f/${a.meta.folderUid}`},e.createElement(T.J,{name:"folder-upload",size:"sm"}),e.createElement("span",null,a.meta.folderName))):e.createElement("span",{className:o.metaContainer},e.createElement(T.J,{name:"folder",size:"sm"}),e.createElement("span",null,a.meta.folderName))}function d(a){return{metaContainer:(0,l.css)({display:"flex",alignItems:"center",color:a.colors.text.secondary,fontSize:a.typography.bodySmall.fontSize,paddingTop:a.spacing(.5),svg:{marginRight:a.spacing(.5),marginBottom:3}})}}},56408:(F,I,t)=>{t.d(I,{N:()=>h,e:()=>r});var l=t(66681),e=t(85960),s=t(27160),S=t(47257),D=t(74042),T=t(96535),K=t(97812),u=t.n(K),E=t(29165),m=t(27436),f=t(97666),M=t(46783),p=t(98547),L=t(95162);function v({onChange:n,maxMenuHeight:d}){const a=(0,S.wW)(y),[o,c]=(0,e.useState)(!1),g=(0,e.useCallback)(B=>R(B,c),[]),P=(0,e.useMemo)(()=>u()(g,300),[g]),[C,N]=(0,e.useState)([]),$=(0,e.useCallback)(B=>{const z=B.filter(_=>!!_.value).map(_=>_.value);n(z),N(B)},[n]);return e.createElement("div",{className:a.container},C.length>0&&e.createElement(E.zx,{size:"xs",icon:"trash-alt",fill:"text",className:a.clear,onClick:()=>n([]),"aria-label":"Clear folders"},"Clear folders"),e.createElement(m.M8,{value:C,onChange:$,isLoading:o,loadOptions:P,maxMenuHeight:d,placeholder:"Filter by folder",noOptionsMessage:"No folders found",prefix:e.createElement(f.J,{name:"filter"}),"aria-label":"Folder filter",defaultOptions:!0}))}async function R(n,d){d(!0);const a={query:n,type:p.o.DashFolder,permission:L.PermissionLevelString.View},c=(await(0,M.i)().search(a)).map(g=>({label:g.title,value:{uid:g.uid,title:g.title}}));return(!n||"general".includes(n.toLowerCase()))&&c.unshift({label:"General",value:{uid:"general",title:"General"}}),d(!1),c}function y(n){return{container:(0,l.css)({label:"container",position:"relative",minWidth:"180px",flexGrow:1}),clear:(0,l.css)({label:"clear",fontSize:n.spacing(1.5),position:"absolute",top:-n.spacing(4.5),right:0})}}var U=t(32327),i=t(68440),W=t(89248),b=t(71496),r=(n=>(n.Tight="tight",n.Spacious="spacious",n))(r||{});const h=({onClick:n,variant:d="spacious",currentPanelId:a,currentFolderUID:o,perPage:c=W.gN,showPanelFilter:g=!1,showFolderFilter:P=!1,showSort:C=!1,showSecondaryActions:N=!1})=>{const $=(0,S.wW)(x,d),[B,z]=(0,e.useState)(""),[_,G]=(0,e.useState)("");(0,s.Z)(()=>G(B),200,[B]);const[j,V]=(0,e.useState)({}),[H,J]=(0,e.useState)(o?[o]:[]),[Q,X]=(0,e.useState)([]),Z=C||g||P,Y=d==="tight"?"lg":"xs";return e.createElement("div",{className:$.container},e.createElement(D.wc,{spacing:Y},e.createElement("div",{className:$.gridContainer},e.createElement("div",{className:$.filterInputWrapper},e.createElement(T.H,{value:B,onChange:z,placeholder:"Search by name or description",width:0,escapeRegex:!1})),Z&&e.createElement(O,{showSort:C,showPanelFilter:g,showFolderFilter:P,onSortChange:V,onFolderFilterChange:J,onPanelFilterChange:X,sortDirection:j.value,variant:d})),e.createElement("div",{className:$.libraryPanelsView},e.createElement(b.u,{onClickCard:n,searchString:_,sortDirection:j.value,panelFilter:Q,folderFilter:H,currentPanelId:a,showSecondaryActions:N,perPage:c}))))};function x(n,d){const a=(0,l.css)`
    flex-direction: row;
    row-gap: ${n.spacing(1)};
  `;return{filterInputWrapper:(0,l.css)`
      flex-grow: ${d==="tight"?1:"initial"};
    `,container:(0,l.css)`
      width: 100%;
      overflow-y: auto;
      padding: ${n.spacing(1)};
    `,libraryPanelsView:(0,l.css)`
      width: 100%;
    `,gridContainer:(0,l.css)`
      ${d==="tight"?a:""};
      display: flex;
      flex-direction: column;
      width: 100%;
      column-gap: ${n.spacing(1)};
      row-gap: ${n.spacing(1)};
      padding-bottom: ${n.spacing(2)};
    `}}const O=e.memo(({variant:n="spacious",showSort:d,showPanelFilter:a,showFolderFilter:o,sortDirection:c,onSortChange:g,onFolderFilterChange:P,onPanelFilterChange:C})=>{const N=(0,S.wW)(A,n),$=(0,e.useCallback)(z=>C(z.map(_=>_.id)),[C]),B=(0,e.useCallback)(z=>P(z.map(_=>_.uid??"")),[P]);return e.createElement("div",{className:N.container},d&&e.createElement(i.P,{value:c,onChange:g,filter:["alpha-asc","alpha-desc"]}),(o||a)&&e.createElement("div",{className:N.filterContainer},o&&e.createElement(v,{onChange:B}),a&&e.createElement(U.j,{onChange:$})))});O.displayName="SearchControls";function A(n,d="spacious"){const a=(0,l.css)`
    display: flex;
    gap: ${n.spacing(1)};
    flex-grow: 1;
    flex-direction: row;
    justify-content: end;
  `,o=(0,l.css)`
    ${a};
    flex-grow: initial;
    flex-direction: column;
    justify-content: normal;
  `,c=(0,l.css)`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    gap: 4px;
  `,g=(0,l.css)`
    ${c};
    flex-direction: column;
    margin-left: initial;
  `;switch(d){case"spacious":return{container:a,filterContainer:c};case"tight":return{container:o,filterContainer:g}}}},71496:(F,I,t)=>{t.d(I,{u:()=>f});var l=t(66681),e=t(85960),s=t(27160),S=t(23757),D=t(47257),T=t(13086),K=t(44574),u=t(9581),E=t(51624),m=t(11386);const f=({onClickCard:p,searchString:L,sortDirection:v,panelFilter:R,folderFilter:y,showSecondaryActions:U,currentPanelId:i,perPage:W=40,isWidget:b})=>{const r=(0,D.wW)(M),[{libraryPanels:h,page:x,perPage:O,numberOfPages:A,loadingState:n,currentPanelId:d},a]=(0,e.useReducer)(m._p,{...m.p$,currentPanelId:i,perPage:W}),o=(0,e.useMemo)(()=>(0,E.tb)(a),[a]);(0,s.Z)(()=>o((0,E.Xu)({searchString:L,sortDirection:v,panelFilter:R,folderFilterUIDs:y,page:x,perPage:O,currentPanelId:d,isWidget:b})),300,[L,v,R,y,x,o]);const c=({uid:P})=>o((0,E.UO)(P,{searchString:L,sortDirection:v,panelFilter:R,folderFilterUIDs:y,page:x,perPage:O})),g=P=>o((0,m.oO)({page:P}));return e.createElement(T.K,{direction:"column",wrap:"nowrap"},n===S.Gu.Loading?e.createElement(e.Fragment,null,e.createElement(u.p.Skeleton,{showSecondaryActions:U}),e.createElement(u.p.Skeleton,{showSecondaryActions:U}),e.createElement(u.p.Skeleton,{showSecondaryActions:U})):h.length<1?e.createElement("p",{className:r.noPanelsFound},"No library panels found."):h?.map((P,C)=>e.createElement(u.p,{key:`library-panel=${C}`,libraryPanel:P,onDelete:c,onClick:p,showSecondaryActions:U})),h.length?e.createElement("div",{className:r.pagination},e.createElement(K.t,{currentPage:x,numberOfPages:A,onNavigate:g,hideWhenSinglePage:!0})):null)},M=p=>({pagination:(0,l.css)({alignSelf:"center",marginTop:p.spacing(1)}),noPanelsFound:(0,l.css)({label:"noPanelsFound",minHeight:200})})},51624:(F,I,t)=>{t.d(I,{UO:()=>y,Xu:()=>R,tb:()=>U});var l=t(34269),e=t(16226),s=t(21964),S=t(59069),D=t(55670),T=t(25066),K=t(85431),u=t(87550),E=t(95135),m=t(24596),f=t(23136),M=t(90857),p=t(99602),L=t(1706),v=t(11386);function R(i){const W=(r,h)=>r.id===h.type,b=(r,h)=>{const x=(0,p.xW)();return r.filter(O=>{const A=x.find(n=>W(n,O));return h?!!A?.skipDataQuery:!A?.skipDataQuery})};return function(r){const h=new l.w0,x=(0,e.D)((0,L.Pq)({searchString:i.searchString,perPage:i.perPage,page:i.page,excludeUid:i.currentPanelId,sortDirection:i.sortDirection,typeFilter:i.panelFilter,folderFilterUIDs:i.folderFilterUIDs})).pipe((0,T.z)(O=>{const{elements:A}=O;if(M.config.featureToggles.vizAndWidgetSplit&&i.isWidget!==void 0){const n=b(A,i.isWidget);return(0,s.of)({...O,elements:n})}return(0,s.of)({...O,elements:A})}),(0,T.z)(({perPage:O,elements:A,page:n,totalCount:d})=>(0,s.of)((0,v.zK)({libraryPanels:A,page:n,perPage:O,totalCount:d}))),(0,K.K)(O=>(console.error(O),(0,s.of)((0,v.zK)({...v.p$,page:i.page,perPage:i.perPage})))),(0,u.x)(()=>h.unsubscribe()),(0,E.B)());h.add((0,S.T)((0,D.H)(50).pipe((0,m.h)((0,v.xU)()),(0,f.R)(x)),x).subscribe(r))}}function y(i,W){return async function(b){try{await(0,L.UO)(i),R(W)(b)}catch(r){console.error(r)}}}function U(i){return function(W){return W instanceof Function?W(i):i(W)}}},11386:(F,I,t)=>{t.d(I,{_p:()=>K,oO:()=>T,p$:()=>s,xU:()=>S,zK:()=>D});var l=t(20079),e=t(23757);const s={loadingState:e.Gu.Loading,libraryPanels:[],totalCount:0,perPage:40,page:1,numberOfPages:0,currentPanelId:void 0},S=(0,l.PH)("libraryPanels/view/initSearch"),D=(0,l.PH)("libraryPanels/view/searchCompleted"),T=(0,l.PH)("libraryPanels/view/changePage"),K=(u,E)=>{if(S.match(E))return{...u,loadingState:e.Gu.Loading};if(D.match(E)){const{libraryPanels:m,page:f,perPage:M,totalCount:p}=E.payload,L=Math.ceil(p/M);return{...u,libraryPanels:m,perPage:M,totalCount:p,loadingState:e.Gu.Done,numberOfPages:L,page:f>L?f-1:f}}return T.match(E)?{...u,page:E.payload.page}:u}},37565:(F,I,t)=>{t.d(I,{J:()=>e});var l=t(66681);function e(s){return{myTable:(0,l.css)`
      max-height: 204px;
      overflow-y: auto;
      margin-top: 11px;
      margin-bottom: 28px;
      border-radius: ${s.shape.radius.default};
      border: 1px solid ${s.colors.action.hover};
      background: ${s.colors.background.primary};
      color: ${s.colors.text.secondary};
      font-size: ${s.typography.h6.fontSize};
      width: 100%;

      thead {
        color: #538ade;
        font-size: ${s.typography.bodySmall.fontSize};
      }

      th,
      td {
        padding: 6px 13px;
        height: ${s.spacing(4)};
      }

      tbody > tr:nth-child(odd) {
        background: ${s.colors.background.secondary};
      }
    `,noteTextbox:(0,l.css)`
      margin-bottom: ${s.spacing(4)};
    `,textInfo:(0,l.css)`
      color: ${s.colors.text.secondary};
      font-size: ${s.typography.size.sm};
    `,dashboardSearch:(0,l.css)`
      margin-top: ${s.spacing(2)};
    `,modal:(0,l.css)`
      width: 500px;
    `,modalText:(0,l.css)`
      font-size: ${s.typography.h4.fontSize};
      color: ${s.colors.text.primary};
      margin-bottom: ${s.spacing(4)};
      padding-top: ${s.spacing(2)};
    `}}}}]);

//# sourceMappingURL=6408.b9806d59f486efa1402d.js.map