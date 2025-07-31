"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[7544],{30672:(W,z,n)=>{n.d(z,{_:()=>i});function i(S){S.getRowProps.push(w=>[w,D()]),S.getHeaderGroupProps.push(w=>[w,D()]),S.getFooterGroupProps.push(w=>[w,D()]),S.getHeaderProps.push((w,{column:L})=>[w,e(L)]),S.getCellProps.push((w,{cell:L})=>[w,e(L.column)]),S.getFooterProps.push((w,{column:L})=>[w,e(L)])}i.pluginName="useCustomFlexLayout";function e(S){return{style:{flex:S.totalWidth===0?"0 0 auto":`${S.totalWidth} 0 0`}}}function D(){return{style:{display:"flex",flex:"1 0 auto"}}}},57544:(W,z,n)=>{n.d(z,{Q:()=>K});var i=n(66681),e=n(85960),D=n(36226),S=n(403),w=n(54563),L=n(1713),U=n(47257),q=n(41027),_=n(45913),ee=n(30672),te=n(40865),G=n(34785),ae=n(58309),le=n(64282),ne=n(94372),se=n(1930),J=n(90857),oe=n(81502),j=n(55973),B=n(97666),re=n(40377),V=n(7042),ce=n(60484),M=n(95329),ie=n(87809),de=n(14914),ue=n(75169),me=n(87501),fe=n(7288),ve=n(10305),X=n(62577),he=n(56512);const O=[{label:"Score",value:"score"},{label:"Fields",value:"fields"},{label:"Allowed actions",value:"allowed_actions"}];function ge({name:t,explain:a,frame:u,row:d}){const[m,s]=(0,e.useState)(!0),[v,y]=(0,e.useState)("score"),p=e.createElement(me.H,{title:t,icon:"info",tabs:O,activeTab:v,onChangeTab:o=>{y(o.value)}});return e.createElement(fe.u,{title:p,isOpen:m,onDismiss:()=>s(!1),closeOnBackdropClick:!0,closeOnEscape:!0},e.createElement(ve.I,null,v===O[0].value&&e.createElement(X.p,{width:"100%",height:"70vh",language:"json",showLineNumbers:!1,showMiniMap:!0,value:JSON.stringify(a,null,2),readOnly:!1}),v===O[1].value&&e.createElement("div",null,e.createElement(he.H,{data:u,rowIndex:d})),v===O[2].value&&e.createElement(X.p,{width:"100%",height:"70vh",language:"json",showLineNumbers:!1,showMiniMap:!1,value:(()=>{const o=u.fields.find(h=>h.name==="allowed_actions")?.values?.[d],l=u.fields.find(h=>h.name==="ds_uid")?.values?.[d];return JSON.stringify({dsUids:l??[],allowedActions:o??[]},null,2)})(),readOnly:!1})))}const pe=175,xe=200,we=(t,a,u,d,m,s,v,y,p)=>{const o=[],l=t.view.fields,h=l.uid,N=l.kind;let E=0;const C=l[t.view.dataFrame.meta?.custom?.sortBy];C&&(E=175,C.type===ae.fS.time&&(E+=25),a-=E),l.explain&&l.score&&(a-=100);let g=50;u&&d&&(g=0,o.push({id:"column-checkbox",width:g,Header:()=>{const{view:c}=t,f=u("*","*"),r=c.every(x=>u(x.kind,x.uid));return e.createElement(j.X,{indeterminate:!r&&f,checked:r,disabled:!t,onChange:x=>{if(f)m();else for(let b=0;b<c.length;b++){const H=c.get(b);d(H.kind,H.uid)}}})},Cell:c=>{const f=h.values[c.row.index],r=N?N.values[c.row.index]:"dashboard",x=u(r,f),b=f!=null;return e.createElement("div",{...c.cellProps,className:s.cell},e.createElement(j.X,{disabled:!b,value:x&&b,onChange:H=>{d(r,f)}}))},field:h}),a-=g),g=Math.max(a*.2,300),o.push({Cell:c=>{let f=(0,i.cx)(s.nameCellStyle),r=l.name.values[c.row.index];return r?.length||(r=c.row.index>=t.view.dataFrame.length?"Loading...":"Missing title",f+=" "+s.missingTitleText),e.createElement("div",{className:s.cell,...c.cellProps},t.isItemLoaded(c.row.index)?e.createElement("a",{href:c.userProps.href,onClick:c.userProps.onClick,className:f,title:r},r):e.createElement(G.Z,{width:200}))},id:"column-name",field:l.name,Header:()=>e.createElement("div",null,(0,M.t)("search.results-table.name-header","Name")),width:g}),a-=g,g=pe,o.push(Ce(t,l.kind,l.panel_type,g,s)),a-=g,l.ds_uid&&y&&(g=Math.min(a/2.5,xe),o.push(Ee(l.ds_uid,g,s.typeIcon,s.datasourceItem,s.invalidDatasourceItem,y)),a-=g);const $=!p||ye(t.view.fields.tags),k=t.view.dataFrame.meta?.custom;if(k?.locationInfo&&a>0&&(g=$?Math.max(a/1.75,300):a,a-=g,o.push({Cell:c=>{const f=(l.location?.values[c.row.index]??"").split("/");return e.createElement("div",{...c.cellProps,className:s.cell},t.isItemLoaded(c.row.index)?e.createElement("div",{className:s.locationContainer},f.map(r=>{let x=k.locationInfo[r];return!x&&r==="general"&&(x={kind:"folder",url:"/dashboards",name:"General"}),x?e.createElement("a",{key:r,href:x.url,className:s.locationItem},e.createElement(B.J,{name:(0,ue.J6)(x.kind)}),e.createElement(re.x,{variant:"body",truncate:!0},x.name)):e.createElement("span",{key:r},r)})):e.createElement(G.Z,{width:150}))},id:"column-location",field:l.location??l.url,Header:(0,M.t)("search.results-table.location-header","Location"),width:g})),a>0&&$&&o.push(Se(t,l.tags,a,s,v)),C&&E){const c=C.display??(0,le.U)({field:C,theme:J.config.theme2});o.push({Header:(0,ne.CZ)(C),Cell:f=>e.createElement("div",{...f.cellProps,className:s.cell},Pe({sortField:C,getDisplay:c,index:f.row.index,kind:l.kind})),id:"column-sort-field",field:C,width:E})}if(l.explain&&l.score){const c=l.score.values,f=r=>{ce.Z.publish(new de.Dn({component:ge,props:{name:l.name.values[r],explain:l.explain.values[r],frame:t.view.dataFrame,row:r}}))};o.push({Header:()=>e.createElement("div",{className:s.sortedHeader},"Score"),Cell:r=>e.createElement("div",{...r.cellProps,className:(0,i.cx)(s.cell,s.explainItem),onClick:()=>f(r.row.index)},c[r.row.index]),id:"column-score-field",field:l.score,width:100})}return o};function ye(t){for(let a=0;a<t.values.length;a++)if(t.values[a]!=null)return!0;return!1}function Ee(t,a,u,d,m,s){const v=(0,oe.F)();return{id:"column-datasource",field:t,Header:(0,M.t)("search.results-table.datasource-header","Data source"),Cell:y=>{const p=t.values[y.row.index];return p?.length?e.createElement("div",{...y.cellProps,className:(0,i.cx)(d)},p.map((o,l)=>{const h=v.getInstanceSettings(o),N=h?.meta?.info?.logos?.small;return N?e.createElement("span",{key:l,onClick:E=>{E.stopPropagation(),E.preventDefault(),s(h.uid)}},e.createElement("img",{src:N,alt:"",width:14,height:14,title:h.type,className:u}),h.name):e.createElement("span",{className:m,key:l},o)})):null},width:a}}function Ce(t,a,u,d,m){return{id:"column-type",field:a??u,Header:(0,M.t)("search.results-table.type-header","Type"),Cell:s=>{const v=s.row.index,y=a?.values[v]??"dashboard";let p="apps",o="Dashboard";if(y)switch(o=y,o){case"dashboard":o=(0,M.t)("search.results-table.type-dashboard","Dashboard");break;case"folder":p="folder",o=(0,M.t)("search.results-table.type-folder","Folder");break;case"panel":p=`${ie.Co.panel}`;const l=u.values[v];if(l){o=l;const h=J.config.panels[o];if(h?.name)o=h.name;else switch(l){case"row":o="Row",p="bars";break;case"singlestat":o="Singlestat";break;default:p="question-circle"}}break}return e.createElement("div",{...s.cellProps,className:(0,i.cx)(m.cell,m.typeCell)},t.isItemLoaded(s.row.index)?e.createElement(e.Fragment,null,e.createElement(B.J,{name:p,size:"sm",title:o,className:m.typeIcon}),o):e.createElement(G.Z,{width:100}))},width:d}}function Se(t,a,u,d,m){return{Cell:s=>{const v=a.values[s.row.index];return e.createElement("div",{...s.cellProps,className:d.cell},t.isItemLoaded(s.row.index)?e.createElement(e.Fragment,null,v?e.createElement(V.P,{className:d.tagList,tags:v,onClick:m}):null):e.createElement(V.P.Skeleton,null))},id:"column-tags",field:a,Header:(0,M.t)("search.results-table.tags-header","Tags"),width:u}}function Pe({kind:t,sortField:a,index:u,getDisplay:d}){const m=a.values[u];return["folder","panel"].includes(t.values[u])&&m===0?"-":(0,se.zc)(d(m))}const Z=36,K=e.memo(({response:t,width:a,height:u,selection:d,selectionToggle:m,clearSelection:s,onTagSelected:v,onDatasourceChange:y,onClickItem:p,keyboardEvents:o})=>{const l=(0,U.wW)(Ie),h=(0,U.wW)(Ne),N=(0,_.p)((0,U.l4)(),L.Ss.Sm),E=(0,e.useRef)(null),[C,g]=(0,e.useState)(null),$=(0,te.v)(o,0,t),k=(0,e.useMemo)(()=>t?.view?.dataFrame.fields.length?Array(t.totalRows).fill(0):[],[t]);(0,e.useEffect)(()=>{E.current&&E.current.resetloadMoreItemsCache(),C&&C.scrollTo(0)},[k,C]);const c=(0,e.useMemo)(()=>we(t,a,d,m,s,h,v,y,t.view?.length>=t.totalRows),[t,a,h,d,m,s,v,y]),f=(0,e.useMemo)(()=>({columns:c,data:k}),[c,k]),{getTableProps:r,getTableBodyProps:x,headerGroups:b,rows:H,prepareRow:Q}=(0,D.useTable)(f,ee._),He=(0,e.useCallback)(async(P,R)=>{await t.loadMoreItems(P,R);const I=d?.("*","*");if(!(!m||!d||!I))for(let F=P;F<t.view.length;F++){const T=t.view.get(F);d(T.kind,T.uid)||m(T.kind,T.uid)}},[t,d,m]),Te=(0,e.useCallback)(({index:P,style:R})=>{const I=H[P];Q(I);const F=t.view.fields.url?.values[P];let T=l.rowContainer;return P===$.y&&(T+=" "+l.selectedRow),e.createElement("div",{...I.getRowProps({style:R}),className:T},I.cells.map((A,Y)=>e.createElement(q.p,{key:Y,tableStyles:N,cell:A,columnIndex:Y,columnCount:I.cells.length,userProps:{href:F,onClick:p},frame:t.view.dataFrame})))},[H,Q,t.view.fields.url?.values,$,l,N,p,t.view.dataFrame]);return H.length?e.createElement("div",{...r(),"aria-label":"Search results table",role:"table"},b.map(P=>{const{key:R,...I}=P.getHeaderGroupProps({style:{width:a}});return e.createElement("div",{key:R,...I,className:l.headerRow},P.headers.map(F=>{const{key:T,...A}=F.getHeaderProps();return e.createElement("div",{key:T,...A,role:"columnheader",className:l.headerCell},F.render("Header"))}))}),e.createElement("div",{...x()},e.createElement(w.Z,{ref:E,isItemLoaded:t.isItemLoaded,itemCount:H.length,loadMoreItems:He},({onItemsRendered:P,ref:R})=>e.createElement(S.t7,{ref:I=>{R(I),g(I)},onItemsRendered:P,height:u-Z,itemCount:H.length,itemSize:N.rowHeight,width:a,style:{overflow:"hidden auto"}},Te)))):e.createElement("div",{className:l.noData},"No data")});K.displayName="SearchResultsTable";const Ie=t=>{const a=t.colors.emphasize(t.colors.background.primary,.03);return{noData:(0,i.css)`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    `,headerCell:(0,i.css)`
      align-items: center;
      display: flex;
      overflo: hidden;
      padding: ${t.spacing(1)};
    `,headerRow:(0,i.css)`
      background-color: ${t.colors.background.secondary};
      display: flex;
      gap: ${t.spacing(1)};
      height: ${Z}px;
    `,selectedRow:(0,i.css)`
      background-color: ${a};
      box-shadow: inset 3px 0px ${t.colors.primary.border};
    `,rowContainer:(0,i.css)`
      display: flex;
      gap: ${t.spacing(1)};
      height: ${Z}px;
      label: row;
      &:hover {
        background-color: ${a};
      }

      &:not(:hover) div[role='cell'] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}},Ne=t=>({cell:(0,i.css)({padding:t.spacing(1),overflow:"hidden",display:"flex",alignItems:"center"}),nameCellStyle:(0,i.css)`
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: text;
      white-space: nowrap;
    `,typeCell:(0,i.css)({gap:t.spacing(.5)}),typeIcon:(0,i.css)`
      fill: ${t.colors.text.secondary};
    `,datasourceItem:(0,i.css)`
      span {
        &:hover {
          color: ${t.colors.text.link};
        }
      }
    `,missingTitleText:(0,i.css)`
      color: ${t.colors.text.disabled};
      font-style: italic;
    `,invalidDatasourceItem:(0,i.css)`
      color: ${t.colors.error.main};
      text-decoration: line-through;
    `,locationContainer:(0,i.css)({display:"flex",flexWrap:"nowrap",gap:t.spacing(1),overflow:"hidden"}),locationItem:(0,i.css)`
      align-items: center;
      color: ${t.colors.text.secondary};
      display: flex;
      flex-wrap: nowrap;
      gap: 4px;
      overflow: hidden;
    `,explainItem:(0,i.css)`
      cursor: pointer;
    `,tagList:(0,i.css)`
      justify-content: flex-start;
      flex-wrap: nowrap;
    `})}}]);

//# sourceMappingURL=7544.d772cd74840999dcb13c.js.map