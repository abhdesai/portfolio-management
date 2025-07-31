"use strict";(self.webpackChunk_grafana_ui=self.webpackChunk_grafana_ui||[]).push([[862],{"../../.yarn/__virtual__/@mdx-js-react-virtual-4792127d00/2/yarn/cache/@mdx-js-react-npm-2.3.0-d5582a450b-bce1cb1dde.zip/node_modules/@mdx-js/react/lib/index.js":function(V,E,o){o.d(E,{NF:function(){return C},Zo:function(){return w},ah:function(){return g},pC:function(){return s}});var n=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js");const s=n.createContext({});function C(i){return c;function c(m){const b=g(m.components);return n.createElement(i,{...m,allComponents:b})}}function g(i){const c=n.useContext(s);return n.useMemo(()=>typeof i=="function"?i(c):{...c,...i},[c,i])}const N={};function w({components:i,children:c,disableParentContext:m}){let b;return m?b=typeof i=="function"?i({}):i||N:b=g(i),n.createElement(s.Provider,{value:b},c)}},"../../.yarn/__virtual__/@grafana-data-virtual-0996183232/1/packages/grafana-data/src/types/data.ts":function(V,E,o){o.d(E,{Gl:function(){return C},Gu:function(){return n},fQ:function(){return g}});var n=(i=>(i.NotStarted="NotStarted",i.Loading="Loading",i.Streaming="Streaming",i.Done="Done",i.Error="Error",i))(n||{});const s=null;var C=(i=>(i.Null="null",i.Ignore="connected",i.AsZero="null as zero",i))(C||{});const g=i=>!!i;function N(i){return i}function w(i){return typeof i=="object"&&i!==null?!0:!1}},"../../.yarn/__virtual__/@grafana-data-virtual-0996183232/1/packages/grafana-data/src/utils/deprecationWarning.ts":function(V,E,o){o.d(E,{d:function(){return s}});const n={},s=(C,g,N)=>{let w=`[Deprecation warning] ${C}: ${g} is deprecated`;N&&(w+=`. Use ${N} instead`);const i=Date.now(),c=n[w];(!c||i-c>1e4)&&(console.warn(w),n[w]=i)}},"./src/components/Badge/Badge.tsx":function(V,E,o){o.d(E,{C:function(){return k}});var n=o("../../../yarn/cache/@emotion-css-npm-11.11.2-dbfa42cf83-718f758575.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),C=o("../../.yarn/__virtual__/react-loading-skeleton-virtual-aac4fd7915/2/yarn/cache/react-loading-skeleton-npm-3.3.1-b364092891-7b4f4c5a12.zip/node_modules/react-loading-skeleton/dist/index.js"),g=o("../../../yarn/cache/tinycolor2-npm-1.6.0-8df41252c6-066c3acf4f.zip/node_modules/tinycolor2/esm/tinycolor.js"),N=o("./src/themes/ThemeContext.tsx"),w=o("./src/components/Icon/Icon.tsx"),i=o("./src/components/Tooltip/Tooltip.tsx"),c=Object.defineProperty,m=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable,I=(d,f,t)=>f in d?c(d,f,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[f]=t,O=(d,f)=>{for(var t in f||(f={}))b.call(f,t)&&I(d,t,f[t]);if(m)for(var t of m(f))_.call(f,t)&&I(d,t,f[t]);return d},y=(d,f)=>{var t={};for(var u in d)b.call(d,u)&&f.indexOf(u)<0&&(t[u]=d[u]);if(d!=null&&m)for(var u of m(d))f.indexOf(u)<0&&_.call(d,u)&&(t[u]=d[u]);return t};const S=s.memo(d=>{var f=d,{icon:t,color:u,text:p,tooltip:v,className:h}=f,D=y(f,["icon","color","text","tooltip","className"]);const B=(0,N.wW)(L,u),A=s.createElement("div",O({className:(0,n.cx)(B.wrapper,h)},D),t&&s.createElement(w.J,{name:t,size:"sm"}),p);return v?s.createElement(i.u,{content:v,placement:"auto"},A):A});S.displayName="Badge";const x=()=>{const d=(0,N.wW)(H);return s.createElement(C.Z,{width:60,height:22,containerClassName:d.container})},k=Object.assign(S,{Skeleton:x});k.Skeleton=x;const H=()=>({container:(0,n.iv)({lineHeight:1})}),L=(d,f)=>{let t=d.visualization.getColorByName(f),u="",p="",v="";return d.isDark?(p=(0,g.Z)(t).setAlpha(.15).toString(),u=(0,g.Z)(t).setAlpha(.25).toString(),v=(0,g.Z)(t).lighten(15).toString()):(p=(0,g.Z)(t).setAlpha(.15).toString(),u=(0,g.Z)(t).setAlpha(.25).toString(),v=(0,g.Z)(t).darken(20).toString()),{wrapper:(0,n.iv)({display:"inline-flex",padding:"1px 4px",borderRadius:d.shape.radius.default,background:p,border:`1px solid ${u}`,color:v,fontWeight:d.typography.fontWeightRegular,gap:"2px",fontSize:d.typography.bodySmall.fontSize,lineHeight:d.typography.bodySmall.lineHeight,alignItems:"center"})}};try{k.displayName="Badge",k.__docgenInfo={description:"",displayName:"Badge",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"ReactNode"}},color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"enum",value:[{value:'"blue"'},{value:'"red"'},{value:'"green"'},{value:'"orange"'},{value:'"purple"'}]}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"enum",value:[{value:'"play"'},{value:'"info"'},{value:'"link"'},{value:'"search"'},{value:'"table"'},{value:'"google"'},{value:'"microsoft"'},{value:'"github"'},{value:'"gitlab"'},{value:'"okta"'},{value:'"discord"'},{value:'"hipchat"'},{value:'"amazon"'},{value:'"google-hangouts-alt"'},{value:'"pagerduty"'},{value:'"line"'},{value:'"anchor"'},{value:'"adjust-circle"'},{value:'"angle-double-down"'},{value:'"angle-double-right"'},{value:'"angle-double-up"'},{value:'"angle-down"'},{value:'"angle-left"'},{value:'"angle-right"'},{value:'"angle-up"'},{value:'"align-left"'},{value:'"align-right"'},{value:'"application-observability"'},{value:'"apps"'},{value:'"arrow"'},{value:'"arrow-down"'},{value:'"arrow-from-right"'},{value:'"arrow-left"'},{value:'"arrow-random"'},{value:'"arrow-right"'},{value:'"arrow-to-right"'},{value:'"arrow-up"'},{value:'"arrows-h"'},{value:'"arrows-v"'},{value:'"expand-arrows"'},{value:'"at"'},{value:'"ai"'},{value:'"backward"'},{value:'"bars"'},{value:'"bell"'},{value:'"bell-slash"'},{value:'"bolt"'},{value:'"book"'},{value:'"bookmark"'},{value:'"book-open"'},{value:'"brackets-curly"'},{value:'"bug"'},{value:'"building"'},{value:'"calculator-alt"'},{value:'"calendar-alt"'},{value:'"calendar-slash"'},{value:'"camera"'},{value:'"capture"'},{value:'"channel-add"'},{value:'"chart-line"'},{value:'"check"'},{value:'"check-circle"'},{value:'"check-square"'},{value:'"circle"'},{value:'"circle-mono"'},{value:'"clipboard-alt"'},{value:'"clock-nine"'},{value:'"cloud"'},{value:'"cloud-download"'},{value:'"cloud-upload"'},{value:'"code-branch"'},{value:'"cog"'},{value:'"columns"'},{value:'"comment-alt"'},{value:'"comment-alt-message"'},{value:'"comment-alt-share"'},{value:'"comments-alt"'},{value:'"compass"'},{value:'"copy"'},{value:'"corner-down-right-alt"'},{value:'"create-dashboard"'},{value:'"credit-card"'},{value:'"crosshair"'},{value:'"cube"'},{value:'"dashboard"'},{value:'"database"'},{value:'"dice-three"'},{value:'"document-info"'},{value:'"download-alt"'},{value:'"draggabledots"'},{value:'"edit"'},{value:'"ellipsis-v"'},{value:'"envelope"'},{value:'"exchange-alt"'},{value:'"exclamation-triangle"'},{value:'"exclamation-circle"'},{value:'"external-link-alt"'},{value:'"eye"'},{value:'"eye-slash"'},{value:'"ellipsis-h"'},{value:'"fa fa-spinner"'},{value:'"favorite"'},{value:'"file-alt"'},{value:'"file-blank"'},{value:'"file-copy-alt"'},{value:'"file-download"'},{value:'"file-landscape-alt"'},{value:'"filter"'},{value:'"flip"'},{value:'"folder"'},{value:'"font"'},{value:'"fire"'},{value:'"folder-open"'},{value:'"folder-plus"'},{value:'"folder-upload"'},{value:'"forward"'},{value:'"frontend-observability"'},{value:'"gf-bar-alignment-after"'},{value:'"gf-bar-alignment-before"'},{value:'"gf-bar-alignment-center"'},{value:'"gf-glue"'},{value:'"gf-grid"'},{value:'"gf-interpolation-linear"'},{value:'"gf-interpolation-smooth"'},{value:'"gf-interpolation-step-after"'},{value:'"gf-interpolation-step-before"'},{value:'"gf-landscape"'},{value:'"gf-layout-simple"'},{value:'"gf-logs"'},{value:'"gf-ml"'},{value:'"gf-movepane-left"'},{value:'"gf-movepane-right"'},{value:'"gf-portrait"'},{value:'"gf-service-account"'},{value:'"gf-show-context"'},{value:'"gf-pin"'},{value:'"gf-prometheus"'},{value:'"gf-traces"'},{value:'"grafana"'},{value:'"graph-bar"'},{value:'"heart"'},{value:'"heart-rate"'},{value:'"heart-break"'},{value:'"history"'},{value:'"history-alt"'},{value:'"home"'},{value:'"home-alt"'},{value:'"horizontal-align-center"'},{value:'"horizontal-align-left"'},{value:'"horizontal-align-right"'},{value:'"hourglass"'},{value:'"import"'},{value:'"info-circle"'},{value:'"k6"'},{value:'"key-skeleton-alt"'},{value:'"keyboard"'},{value:'"layer-group"'},{value:'"layers-alt"'},{value:'"library-panel"'},{value:'"line-alt"'},{value:'"list-ui-alt"'},{value:'"list-ul"'},{value:'"list-ol"'},{value:'"lock"'},{value:'"map-marker"'},{value:'"map-marker-plus"'},{value:'"map-marker-minus"'},{value:'"message"'},{value:'"minus"'},{value:'"minus-circle"'},{value:'"mobile-android"'},{value:'"monitor"'},{value:'"palette"'},{value:'"panel-add"'},{value:'"pathfinder-unite"'},{value:'"pause"'},{value:'"pen"'},{value:'"percentage"'},{value:'"plug"'},{value:'"plus"'},{value:'"plus-circle"'},{value:'"plus-square"'},{value:'"power"'},{value:'"presentation-play"'},{value:'"process"'},{value:'"question-circle"'},{value:'"record-audio"'},{value:'"repeat"'},{value:'"rocket"'},{value:'"ruler-combined"'},{value:'"save"'},{value:'"search-minus"'},{value:'"search-plus"'},{value:'"share-alt"'},{value:'"shield"'},{value:'"shield-exclamation"'},{value:'"signal"'},{value:'"signin"'},{value:'"signout"'},{value:'"sitemap"'},{value:'"slack"'},{value:'"sliders-v-alt"'},{value:'"spinner"'},{value:'"sort-amount-down"'},{value:'"sort-amount-up"'},{value:'"square-shape"'},{value:'"star"'},{value:'"step-backward"'},{value:'"stopwatch"'},{value:'"stopwatch-slash"'},{value:'"sync"'},{value:'"sync-slash"'},{value:'"tag-alt"'},{value:'"telegram-alt"'},{value:'"text-fields"'},{value:'"thumbs-up"'},{value:'"times"'},{value:'"times-circle"'},{value:'"toggle-on"'},{value:'"toggle-off"'},{value:'"trash-alt"'},{value:'"unlock"'},{value:'"upload"'},{value:'"user"'},{value:'"users-alt"'},{value:'"user-arrows"'},{value:'"vertical-align-bottom"'},{value:'"vertical-align-center"'},{value:'"vertical-align-top"'},{value:'"web-section-alt"'},{value:'"wrap-text"'},{value:'"rss"'},{value:'"x"'}]}},tooltip:{defaultValue:null,description:"",name:"tooltip",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Badge/Badge.tsx#Badge"]={docgenInfo:k.__docgenInfo,name:"Badge",path:"src/components/Badge/Badge.tsx#Badge"})}catch{}},"./src/components/IconButton/IconButton.tsx":function(V,E,o){o.d(E,{h:function(){return d}});var n=o("../../../yarn/cache/@emotion-css-npm-11.11.2-dbfa42cf83-718f758575.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),C=o("../../.yarn/__virtual__/@grafana-data-virtual-0996183232/1/packages/grafana-data/src/utils/deprecationWarning.ts"),g=o("../../.yarn/__virtual__/@grafana-data-virtual-0996183232/1/packages/grafana-data/src/themes/colorManipulator.ts"),N=o("./src/themes/ThemeContext.tsx"),w=o("./src/themes/mixins.ts"),i=o("./src/components/Icon/Icon.tsx"),c=o("./src/components/Icon/utils.ts"),m=o("./src/components/Tooltip/Tooltip.tsx"),b=Object.defineProperty,_=Object.defineProperties,I=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,y=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable,x=(t,u,p)=>u in t?b(t,u,{enumerable:!0,configurable:!0,writable:!0,value:p}):t[u]=p,k=(t,u)=>{for(var p in u||(u={}))y.call(u,p)&&x(t,p,u[p]);if(O)for(var p of O(u))S.call(u,p)&&x(t,p,u[p]);return t},H=(t,u)=>_(t,I(u)),L=(t,u)=>{var p={};for(var v in t)y.call(t,v)&&u.indexOf(v)<0&&(p[v]=t[v]);if(t!=null&&O)for(var v of O(t))u.indexOf(v)<0&&S.call(t,v)&&(p[v]=t[v]);return p};const d=s.forwardRef((t,u)=>{const{size:p="md",variant:v="secondary"}=t;let h;p==="xxl"||p==="xxxl"?((0,C.d)("IconButton",'size="xxl" and size="xxxl"','size="xl"'),h="xl"):h=p;const D=(0,N.wW)(f,h,v);let B,A;if("tooltip"in t){const{tooltip:R}=t;B=typeof R=="string"?R:void 0}else if("ariaLabel"in t||"aria-label"in t){const{ariaLabel:R,["aria-label"]:G}=t;B=G||R,A=u}if("tooltip"in t){const R=t,{name:G,iconType:ae,className:q,tooltip:Z,tooltipPlacement:me}=R,ve=L(R,["name","iconType","className","tooltip","tooltipPlacement"]);return s.createElement(m.u,{ref:u,content:Z,placement:me},s.createElement("button",H(k({},ve),{ref:A,"aria-label":B,className:(0,n.cx)(D.button,q),type:"button"}),s.createElement(i.J,{name:G,size:h,className:D.icon,type:ae})))}else{const R=t,{name:G,iconType:ae,className:q}=R,Z=L(R,["name","iconType","className"]);return s.createElement("button",H(k({},Z),{ref:A,"aria-label":B,className:(0,n.cx)(D.button,q),type:"button"}),s.createElement(i.J,{name:G,size:h,className:D.icon,type:ae}))}});d.displayName="IconButton";const f=(t,u,p)=>{const v=(0,c.Bm)(u)+t.spacing.gridSize;let h=t.colors.text.primary;return p==="primary"?h=t.colors.primary.text:p==="destructive"&&(h=t.colors.error.text),{button:(0,n.iv)({zIndex:0,position:"relative",margin:`0 ${t.spacing.x0_5} 0 0`,boxShadow:"none",border:"none",display:"inline-flex",background:"transparent",justifyContent:"center",alignItems:"center",padding:0,color:h,"&[disabled], &:disabled":{cursor:"not-allowed",color:t.colors.action.disabledText,opacity:.65},"&:before":{zIndex:-1,position:"absolute",opacity:0,width:`${v}px`,height:`${v}px`,borderRadius:t.shape.radius.default,content:'""',transitionDuration:"0.2s",transitionTimingFunction:"cubic-bezier(0.4, 0, 0.2, 1)",transitionProperty:"opacity"},"&:focus, &:focus-visible":(0,w.SV)(t),"&:focus:not(:focus-visible)":(0,w.Cq)(t),"&:hover":{"&:before":{backgroundColor:p==="secondary"?t.colors.action.hover:g.Fq(h,.12),opacity:1}}}),icon:(0,n.iv)({verticalAlign:"baseline"})}};try{d.displayName="IconButton",d.__docgenInfo={description:"",displayName:"IconButton",props:{tooltip:{defaultValue:null,description:"Tooltip content to display on hover and as the aria-label",name:"tooltip",required:!0,type:{name:"PopoverContent"}},tooltipPlacement:{defaultValue:null,description:"Position of the tooltip",name:"tooltipPlacement",required:!1,type:{name:"enum",value:[{value:'"auto-start"'},{value:'"auto"'},{value:'"auto-end"'},{value:'"top-start"'},{value:'"top"'},{value:'"top-end"'},{value:'"right-start"'},{value:'"right"'},{value:'"right-end"'},{value:'"bottom-end"'},{value:'"bottom"'},{value:'"bottom-start"'},{value:'"left-end"'},{value:'"left"'},{value:'"left-start"'}]}},name:{defaultValue:null,description:"Name of the icon *",name:"name",required:!0,type:{name:"enum",value:[{value:'"play"'},{value:'"info"'},{value:'"link"'},{value:'"search"'},{value:'"table"'},{value:'"google"'},{value:'"microsoft"'},{value:'"github"'},{value:'"gitlab"'},{value:'"okta"'},{value:'"discord"'},{value:'"hipchat"'},{value:'"amazon"'},{value:'"google-hangouts-alt"'},{value:'"pagerduty"'},{value:'"line"'},{value:'"anchor"'},{value:'"adjust-circle"'},{value:'"angle-double-down"'},{value:'"angle-double-right"'},{value:'"angle-double-up"'},{value:'"angle-down"'},{value:'"angle-left"'},{value:'"angle-right"'},{value:'"angle-up"'},{value:'"align-left"'},{value:'"align-right"'},{value:'"application-observability"'},{value:'"apps"'},{value:'"arrow"'},{value:'"arrow-down"'},{value:'"arrow-from-right"'},{value:'"arrow-left"'},{value:'"arrow-random"'},{value:'"arrow-right"'},{value:'"arrow-to-right"'},{value:'"arrow-up"'},{value:'"arrows-h"'},{value:'"arrows-v"'},{value:'"expand-arrows"'},{value:'"at"'},{value:'"ai"'},{value:'"backward"'},{value:'"bars"'},{value:'"bell"'},{value:'"bell-slash"'},{value:'"bolt"'},{value:'"book"'},{value:'"bookmark"'},{value:'"book-open"'},{value:'"brackets-curly"'},{value:'"bug"'},{value:'"building"'},{value:'"calculator-alt"'},{value:'"calendar-alt"'},{value:'"calendar-slash"'},{value:'"camera"'},{value:'"capture"'},{value:'"channel-add"'},{value:'"chart-line"'},{value:'"check"'},{value:'"check-circle"'},{value:'"check-square"'},{value:'"circle"'},{value:'"circle-mono"'},{value:'"clipboard-alt"'},{value:'"clock-nine"'},{value:'"cloud"'},{value:'"cloud-download"'},{value:'"cloud-upload"'},{value:'"code-branch"'},{value:'"cog"'},{value:'"columns"'},{value:'"comment-alt"'},{value:'"comment-alt-message"'},{value:'"comment-alt-share"'},{value:'"comments-alt"'},{value:'"compass"'},{value:'"copy"'},{value:'"corner-down-right-alt"'},{value:'"create-dashboard"'},{value:'"credit-card"'},{value:'"crosshair"'},{value:'"cube"'},{value:'"dashboard"'},{value:'"database"'},{value:'"dice-three"'},{value:'"document-info"'},{value:'"download-alt"'},{value:'"draggabledots"'},{value:'"edit"'},{value:'"ellipsis-v"'},{value:'"envelope"'},{value:'"exchange-alt"'},{value:'"exclamation-triangle"'},{value:'"exclamation-circle"'},{value:'"external-link-alt"'},{value:'"eye"'},{value:'"eye-slash"'},{value:'"ellipsis-h"'},{value:'"fa fa-spinner"'},{value:'"favorite"'},{value:'"file-alt"'},{value:'"file-blank"'},{value:'"file-copy-alt"'},{value:'"file-download"'},{value:'"file-landscape-alt"'},{value:'"filter"'},{value:'"flip"'},{value:'"folder"'},{value:'"font"'},{value:'"fire"'},{value:'"folder-open"'},{value:'"folder-plus"'},{value:'"folder-upload"'},{value:'"forward"'},{value:'"frontend-observability"'},{value:'"gf-bar-alignment-after"'},{value:'"gf-bar-alignment-before"'},{value:'"gf-bar-alignment-center"'},{value:'"gf-glue"'},{value:'"gf-grid"'},{value:'"gf-interpolation-linear"'},{value:'"gf-interpolation-smooth"'},{value:'"gf-interpolation-step-after"'},{value:'"gf-interpolation-step-before"'},{value:'"gf-landscape"'},{value:'"gf-layout-simple"'},{value:'"gf-logs"'},{value:'"gf-ml"'},{value:'"gf-movepane-left"'},{value:'"gf-movepane-right"'},{value:'"gf-portrait"'},{value:'"gf-service-account"'},{value:'"gf-show-context"'},{value:'"gf-pin"'},{value:'"gf-prometheus"'},{value:'"gf-traces"'},{value:'"grafana"'},{value:'"graph-bar"'},{value:'"heart"'},{value:'"heart-rate"'},{value:'"heart-break"'},{value:'"history"'},{value:'"history-alt"'},{value:'"home"'},{value:'"home-alt"'},{value:'"horizontal-align-center"'},{value:'"horizontal-align-left"'},{value:'"horizontal-align-right"'},{value:'"hourglass"'},{value:'"import"'},{value:'"info-circle"'},{value:'"k6"'},{value:'"key-skeleton-alt"'},{value:'"keyboard"'},{value:'"layer-group"'},{value:'"layers-alt"'},{value:'"library-panel"'},{value:'"line-alt"'},{value:'"list-ui-alt"'},{value:'"list-ul"'},{value:'"list-ol"'},{value:'"lock"'},{value:'"map-marker"'},{value:'"map-marker-plus"'},{value:'"map-marker-minus"'},{value:'"message"'},{value:'"minus"'},{value:'"minus-circle"'},{value:'"mobile-android"'},{value:'"monitor"'},{value:'"palette"'},{value:'"panel-add"'},{value:'"pathfinder-unite"'},{value:'"pause"'},{value:'"pen"'},{value:'"percentage"'},{value:'"plug"'},{value:'"plus"'},{value:'"plus-circle"'},{value:'"plus-square"'},{value:'"power"'},{value:'"presentation-play"'},{value:'"process"'},{value:'"question-circle"'},{value:'"record-audio"'},{value:'"repeat"'},{value:'"rocket"'},{value:'"ruler-combined"'},{value:'"save"'},{value:'"search-minus"'},{value:'"search-plus"'},{value:'"share-alt"'},{value:'"shield"'},{value:'"shield-exclamation"'},{value:'"signal"'},{value:'"signin"'},{value:'"signout"'},{value:'"sitemap"'},{value:'"slack"'},{value:'"sliders-v-alt"'},{value:'"spinner"'},{value:'"sort-amount-down"'},{value:'"sort-amount-up"'},{value:'"square-shape"'},{value:'"star"'},{value:'"step-backward"'},{value:'"stopwatch"'},{value:'"stopwatch-slash"'},{value:'"sync"'},{value:'"sync-slash"'},{value:'"tag-alt"'},{value:'"telegram-alt"'},{value:'"text-fields"'},{value:'"thumbs-up"'},{value:'"times"'},{value:'"times-circle"'},{value:'"toggle-on"'},{value:'"toggle-off"'},{value:'"trash-alt"'},{value:'"unlock"'},{value:'"upload"'},{value:'"user"'},{value:'"users-alt"'},{value:'"user-arrows"'},{value:'"vertical-align-bottom"'},{value:'"vertical-align-center"'},{value:'"vertical-align-top"'},{value:'"web-section-alt"'},{value:'"wrap-text"'},{value:'"rss"'},{value:'"x"'}]}},size:{defaultValue:null,description:"Icon size - sizes xxl and xxxl are deprecated and when used being decreased to xl",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'},{value:'"xxxl"'}]}},iconType:{defaultValue:null,description:"Type of the icon - mono or default",name:"iconType",required:!1,type:{name:"enum",value:[{value:'"solid"'},{value:'"default"'},{value:'"mono"'}]}},variant:{defaultValue:null,description:"Variant to change the color of the Icon",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"destructive"'}]}},ariaLabel:{defaultValue:null,description:"@deprecated use aria-label instead",name:"ariaLabel",required:!1,type:{name:"string"}},"aria-label":{defaultValue:null,description:"Text available only for screen readers. No tooltip will be set in this case.",name:"aria-label",required:!0,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/IconButton/IconButton.tsx#IconButton"]={docgenInfo:d.__docgenInfo,name:"IconButton",path:"src/components/IconButton/IconButton.tsx#IconButton"})}catch{}},"./src/components/Pagination/Pagination.tsx":function(V,E,o){o.d(E,{t:function(){return w}});var n=o("../../../yarn/cache/@emotion-css-npm-11.11.2-dbfa42cf83-718f758575.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),s=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),C=o("./src/themes/ThemeContext.tsx"),g=o("./src/components/Button/Button.tsx"),N=o("./src/components/Icon/Icon.tsx");const w=({currentPage:c,numberOfPages:m,onNavigate:b,hideWhenSinglePage:_,showSmallVersion:I,className:O})=>{const y=(0,C.wW)(i),S=I?1:8,x=(0,s.useMemo)(()=>{const k=[...new Array(m).keys()],H=m>S,L=(d,f)=>s.createElement("li",{key:d,className:y.item},s.createElement(g.zx,{size:"sm",variant:f,onClick:()=>b(d)},d));return k.reduce((d,f)=>{const t=f+1,u=t===c?"primary":"secondary",p=S,v=m-S+1,h=v-p,D=t===1||t===m,B=h>-1&&c>=p&&c<=v,A=I?1:3,R=I?0:2;return H?D||c<p&&t<p||h>=0&&c>v&&t>v||h<0&&c>=p&&t>v||B&&t>=c-R&&t<=c+R?d.push(L(t,u)):(t===p&&c<p||t===v&&c>v||B&&(t===c-A||t===c+A))&&d.push(s.createElement("li",{key:t,className:y.item},s.createElement(N.J,{className:y.ellipsis,name:"ellipsis-v"}))):d.push(L(t,u)),d},[])},[c,m,b,S,I,y.ellipsis,y.item]);return _&&m<=1?null:s.createElement("div",{className:(0,n.cx)(y.container,O)},s.createElement("ol",null,s.createElement("li",{className:y.item},s.createElement(g.zx,{"aria-label":"previous page",size:"sm",variant:"secondary",onClick:()=>b(c-1),disabled:c===1},s.createElement(N.J,{name:"angle-left"}))),x,s.createElement("li",{className:y.item},s.createElement(g.zx,{"aria-label":"next page",size:"sm",variant:"secondary",onClick:()=>b(c+1),disabled:c===m},s.createElement(N.J,{name:"angle-right"})))))},i=()=>({container:(0,n.iv)({float:"right"}),item:(0,n.iv)({display:"inline-block",paddingLeft:"10px",marginBottom:"5px"}),ellipsis:(0,n.iv)({transform:"rotate(90deg)"})});try{w.displayName="Pagination",w.__docgenInfo={description:"",displayName:"Pagination",props:{currentPage:{defaultValue:null,description:"The current page index being shown.",name:"currentPage",required:!0,type:{name:"number"}},numberOfPages:{defaultValue:null,description:"Number of total pages.",name:"numberOfPages",required:!0,type:{name:"number"}},onNavigate:{defaultValue:null,description:"Callback function for fetching the selected page.",name:"onNavigate",required:!0,type:{name:"(toPage: number) => void"}},hideWhenSinglePage:{defaultValue:null,description:"When set to true and the pagination result is only one page it will not render the pagination at all.",name:"hideWhenSinglePage",required:!1,type:{name:"boolean"}},showSmallVersion:{defaultValue:null,description:"Small version only shows the current page and the navigation buttons.",name:"showSmallVersion",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Pagination/Pagination.tsx#Pagination"]={docgenInfo:w.__docgenInfo,name:"Pagination",path:"src/components/Pagination/Pagination.tsx#Pagination"})}catch{}},"./src/components/InteractiveTable/InteractiveTable.story.tsx":function(V,E,o){o.r(E),o.d(E,{Basic:function(){return te},WithControlledSort:function(){return se},WithCustomCell:function(){return re},WithHeaderTooltips:function(){return ie},WithPagination:function(){return oe},WithRowExpansion:function(){return ne},default:function(){return ca}});var n=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),s=o("../../../yarn/cache/@emotion-css-npm-11.11.2-dbfa42cf83-718f758575.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),C=o("../../../yarn/cache/lodash-npm-4.17.21-6382451519-c08619c038.zip/node_modules/lodash/lodash.js"),g=o("../../.yarn/__virtual__/react-table-virtual-9fc9bcb55f/2/yarn/cache/react-table-npm-7.8.0-61488af438-0c87db8f88.zip/node_modules/react-table/index.js"),N=o("../../.yarn/__virtual__/@grafana-data-virtual-0996183232/1/packages/grafana-data/src/types/data.ts"),w=o("./src/themes/ThemeContext.tsx"),i=o("./src/components/Icon/Icon.tsx"),c=o("./src/components/Pagination/Pagination.tsx"),m=o("./src/components/Tooltip/Tooltip.tsx"),b=o("./src/components/IconButton/IconButton.tsx"),_=Object.defineProperty,I=Object.defineProperties,O=Object.getOwnPropertyDescriptors,y=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,k=(a,e,r)=>e in a?_(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,H=(a,e)=>{for(var r in e||(e={}))S.call(e,r)&&k(a,r,e[r]);if(y)for(var r of y(e))x.call(e,r)&&k(a,r,e[r]);return a},L=(a,e)=>I(a,O(e));const d=(0,s.iv)({display:"flex",alignItems:"center",height:"100%"});function f({row:a,__rowID:e}){return n.createElement("div",{className:d},n.createElement(b.h,L(H({tooltip:"toggle row expanded","aria-controls":e,name:a.isExpanded?"angle-down":"angle-right","aria-expanded":a.isExpanded},a.getToggleRowExpandedProps()),{size:"lg"})))}try{f.displayName="ExpanderCell",f.__docgenInfo={description:"",displayName:"ExpanderCell",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"readonly K[]"}},initialState:{defaultValue:null,description:"",name:"initialState",required:!1,type:{name:"Partial<TableState<K>>"}},stateReducer:{defaultValue:null,description:"",name:"stateReducer",required:!1,type:{name:"((newState: TableState<K>, action: ActionType, previousState: TableState<K>, instance?: TableInstance<K>) => TableState<...>)"}},useControlledState:{defaultValue:null,description:"",name:"useControlledState",required:!1,type:{name:"((state: TableState<K>, meta: MetaBase<K>) => TableState<K>)"}},defaultColumn:{defaultValue:null,description:"",name:"defaultColumn",required:!1,type:{name:"Partial<Column<K>>"}},getSubRows:{defaultValue:null,description:"",name:"getSubRows",required:!1,type:{name:"((originalRow: K, relativeIndex: number) => K[])"}},getRowId:{defaultValue:null,description:"",name:"getRowId",required:!1,type:{name:"((originalRow: K, relativeIndex: number, parent?: Row<K>) => string)"}},autoResetHiddenColumns:{defaultValue:null,description:"",name:"autoResetHiddenColumns",required:!1,type:{name:"boolean"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"ColumnInstance<K>"}},row:{defaultValue:null,description:"",name:"row",required:!0,type:{name:"Row<K>"}},cell:{defaultValue:null,description:"",name:"cell",required:!0,type:{name:"Cell<K, void>"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"void"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/InteractiveTable/ExpanderCell.tsx#ExpanderCell"]={docgenInfo:f.__docgenInfo,name:"ExpanderCell",path:"src/components/InteractiveTable/ExpanderCell.tsx#ExpanderCell"})}catch{}var t=Object.defineProperty,u=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,h=(a,e,r)=>e in a?t(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,D=(a,e)=>{for(var r in e||(e={}))p.call(e,r)&&h(a,r,e[r]);if(u)for(var r of u(e))v.call(e,r)&&h(a,r,e[r]);return a};const B="__expander";function A(a){return[{id:B,Cell:f,disableSortBy:!0,width:0},...a.map(e=>D({id:e.id,accessor:e.id,Header:e.header||(()=>null),sortType:e.sortType||"alphanumeric",disableSortBy:!e.sortType,width:e.disableGrow?0:void 0,visible:e.visible},e.cell&&{Cell:e.cell}))]}var R=Object.defineProperty,G=Object.defineProperties,ae=Object.getOwnPropertyDescriptors,q=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable,ve=(a,e,r)=>e in a?R(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,$=(a,e)=>{for(var r in e||(e={}))Z.call(e,r)&&ve(a,r,e[r]);if(q)for(var r of q(e))me.call(e,r)&&ve(a,r,e[r]);return a},_e=(a,e)=>G(a,ae(e)),fe=(a,e)=>{var r={};for(var T in a)Z.call(a,T)&&e.indexOf(T)<0&&(r[T]=a[T]);if(a!=null&&q)for(var T of q(a))e.indexOf(T)<0&&me.call(a,T)&&(r[T]=a[T]);return r};const Xe=a=>{const e=a.colors.emphasize(a.colors.background.primary,.03);return{container:(0,s.iv)({display:"flex",gap:a.spacing(2),flexDirection:"column",width:"100%",overflowX:"auto"}),table:(0,s.iv)({borderRadius:a.shape.radius.default,width:"100%",td:{padding:a.spacing(1)},"td, th":{minWidth:a.spacing(3)}}),disableGrow:(0,s.iv)({width:0}),header:(0,s.iv)({borderBottom:`1px solid ${a.colors.border.weak}`,"&, & > button":{position:"relative",whiteSpace:"nowrap",padding:a.spacing(1)},"& > button":{"&:after":{content:'"\\00a0"'},width:"100%",height:"100%",background:"none",border:"none",paddingRight:a.spacing(2.5),textAlign:"left",fontWeight:a.typography.fontWeightMedium}}),row:(0,s.iv)({label:"row",borderBottom:`1px solid ${a.colors.border.weak}`,"&:hover":{backgroundColor:e},"&:last-child":{borderBottom:0}}),expandedRow:(0,s.iv)({label:"expanded-row-content",borderBottom:"none"}),expandedContentRow:(0,s.iv)({label:"expanded-row-content",td:{borderBottom:`1px solid ${a.colors.border.weak}`,position:"relative",padding:a.spacing(2,2,2,5),"&:before":{content:'""',position:"absolute",width:"1px",top:0,left:"16px",bottom:a.spacing(2),background:a.colors.border.medium}}}),sortableHeader:(0,s.iv)({"&&":{padding:0}})}};function z({className:a,columns:e,data:r,getRowId:T,headerTooltips:Q,pageSize:W=0,renderExpandedRow:X,fetchData:Y}){const M=(0,w.wW)(Xe),ee=(0,n.useMemo)(()=>A(e),[e]),ce=qe(),ge=(0,n.useCallback)(P=>`${ce}-${P.id}`.replace(/\s/g,""),[ce]),Ue=[g.useSortBy,g.useExpanded],de=W>0;de&&Ue.push(g.usePagination);const F=(0,g.useTable)({columns:ee,data:r,autoResetExpanded:!1,autoResetSortBy:!1,disableMultiSort:!0,manualSortBy:!!Y,getRowId:T,initialState:{hiddenColumns:[!X&&B,...ee.filter(P=>!(!P.visible||P.visible(r))).map(P=>P.id).filter(N.fQ)].filter(N.fQ)}},...Ue),{getTableProps:da,getTableBodyProps:ua,headerGroups:pa,prepareRow:ma}=F,{sortBy:Ge}=F.state;return(0,n.useEffect)(()=>{Y&&Y({sortBy:Ge})},[Ge,Y]),(0,n.useEffect)(()=>{de&&F.setPageSize(W)},[de,W,F.setPageSize,F]),n.createElement("div",{className:M.container},n.createElement("table",_e($({},da()),{className:(0,s.cx)(M.table,a)}),n.createElement("thead",null,pa.map(P=>{const ue=P.getHeaderGroupProps(),{key:xe}=ue,he=fe(ue,["key"]);return n.createElement("tr",$({key:xe},he),P.headers.map(U=>{const pe=U.getHeaderProps(),{key:be}=pe,ye=fe(pe,["key"]),Te=Q?.[U.id];return n.createElement("th",$($({key:be,className:(0,s.cx)(M.header,{[M.disableGrow]:U.width===0,[M.sortableHeader]:U.canSort})},ye),U.isSorted&&{"aria-sort":U.isSortedDesc?"descending":"ascending"}),n.createElement(Ye,{column:U,headerTooltip:Te}))}))})),n.createElement("tbody",$({},ua()),(de?F.page:F.rows).map(P=>{ma(P);const ue=P.getRowProps(),{key:xe}=ue,he=fe(ue,["key"]),U=ge(P),pe=P.isExpanded;return n.createElement(n.Fragment,{key:xe},n.createElement("tr",_e($({},he),{className:(0,s.cx)(M.row,pe&&M.expandedRow)}),P.cells.map(be=>{const ye=be.getCellProps(),{key:Te}=ye,va=fe(ye,["key"]);return n.createElement("td",$({key:Te},va),be.render("Cell",{__rowID:U}))})),pe&&X&&n.createElement("tr",_e($({},he),{id:U,className:M.expandedContentRow}),n.createElement("td",{colSpan:P.cells.length},X(P.original))))}))),de&&n.createElement("span",null,n.createElement(c.t,{currentPage:F.state.pageIndex+1,numberOfPages:F.pageOptions.length,onNavigate:P=>F.gotoPage(P-1)})))}const qe=()=>(0,n.useMemo)(()=>(0,C.uniqueId)("InteractiveTable"),[]),$e=a=>({sortIcon:(0,s.iv)({position:"absolute",top:a.spacing(1)}),headerTooltipIcon:(0,s.iv)({marginLeft:a.spacing(.5)})});function Ye({column:{canSort:a,render:e,isSorted:r,isSortedDesc:T,getSortByToggleProps:Q},headerTooltip:W}){const X=(0,w.wW)($e),{onClick:Y}=Q(),M=n.createElement(n.Fragment,null,e("Header"),W&&n.createElement(m.u,{theme:"info-alt",content:W.content,placement:"top-end"},n.createElement(i.J,{className:X.headerTooltipIcon,name:W.iconName||"info-circle","data-testid":"header-tooltip-icon"})),r&&n.createElement("span",{"aria-hidden":"true",className:X.sortIcon},n.createElement(i.J,{name:T?"angle-down":"angle-up"})));return a?n.createElement("button",{type:"button",onClick:Y},M):M}try{z.displayName="InteractiveTable",z.__docgenInfo={description:"",displayName:"InteractiveTable",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},columns:{defaultValue:null,description:"Table's columns definition. Must be memoized.",name:"columns",required:!0,type:{name:"Column<TableData>[]"}},data:{defaultValue:null,description:"The data to display in the table. Must be memoized.",name:"data",required:!0,type:{name:"TableData[]"}},getRowId:{defaultValue:null,description:"Must return a unique id for each row",name:"getRowId",required:!0,type:{name:"((originalRow: TableData, relativeIndex: number, parent?: Row<TableData> | undefined) => string) | undefined"}},headerTooltips:{defaultValue:null,description:"Optional tooltips for the table headers. The key must match the column id.",name:"headerTooltips",required:!1,type:{name:"Record<string, InteractiveTableHeaderTooltip>"}},pageSize:{defaultValue:{value:"0"},description:"Number of rows per page. A value of zero disables pagination. Defaults to 0.",name:"pageSize",required:!1,type:{name:"number"}},renderExpandedRow:{defaultValue:null,description:"Render function for the expanded row. if not provided, the tables rows will not be expandable.",name:"renderExpandedRow",required:!1,type:{name:"((row: TableData) => ReactNode)"}},fetchData:{defaultValue:null,description:`A custom function to fetch data when the table is sorted. If not provided, the table will be sorted client-side.
It's important for this function to have a stable identity, e.g. being wrapped into useCallback to prevent unnecessary
re-renders of the table.`,name:"fetchData",required:!1,type:{name:"FetchDataFunc<TableData>"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/InteractiveTable/InteractiveTable.tsx#InteractiveTable"]={docgenInfo:z.__docgenInfo,name:"InteractiveTable",path:"src/components/InteractiveTable/InteractiveTable.tsx#InteractiveTable"})}catch{}var Ze=o("./src/components/Button/Button.tsx"),l=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/jsx-runtime.js"),we=o("../../.yarn/__virtual__/@mdx-js-react-virtual-4792127d00/2/yarn/cache/@mdx-js-react-npm-2.3.0-d5582a450b-bce1cb1dde.zip/node_modules/@mdx-js/react/lib/index.js"),J=o("../../.yarn/__virtual__/@storybook-blocks-virtual-5605a2f23e/2/yarn/cache/@storybook-blocks-patch-37aea2d782-a00c56fb6e.zip/node_modules/@storybook/blocks/dist/index.mjs"),Je=o("./src/components/Badge/Badge.tsx");function Ee(a){const e=Object.assign({h1:"h1",p:"p",a:"a",h3:"h3",h4:"h4",code:"code",h5:"h5",pre:"pre",h2:"h2"},(0,we.ah)(),a.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(J.h_,{title:"MDX|InteractiveTable",component:z}),`
`,(0,l.jsx)(e.h1,{id:"interactivetable",children:"InteractiveTable"}),`
`,(0,l.jsx)(Je.C,{text:"Alpha",icon:"rocket",color:"blue",tooltip:"This component is still experimental."}),`
`,(0,l.jsx)(e.p,{children:`The InteractiveTable is used to display and select data efficiently.
It allows for the display and modification of detailed information.
With additional functionality it allows for batch editing, as needed by your feature's users.`}),`
`,(0,l.jsxs)(e.p,{children:["It is a wrapper around ",(0,l.jsx)(e.a,{href:"https://react-table-v7.tanstack.com/",target:"_blank",rel:"nofollow noopener noreferrer",children:"React Table"}),", for more information, refer to the ",(0,l.jsx)(e.a,{href:"https://react-table.tanstack.com/docs/overview",target:"_blank",rel:"nofollow noopener noreferrer",children:"official documentation"}),"."]}),`
`,(0,l.jsx)(e.h3,{id:"when-to-use",children:"When to use"}),`
`,(0,l.jsx)(e.p,{children:"The InteractiveTable can be used to allow users to perform administrative tasks workflows."}),`
`,(0,l.jsx)(e.h3,{id:"when-not-to-use",children:"When not to use"}),`
`,(0,l.jsx)(e.p,{children:`Avoid using the InteractiveTable where mobile or responsiveness may be a requirement.
Consider an alternative pattern where the user is presented with a summary list and can click/tap to an individual page for each row in that list.`}),`
`,(0,l.jsx)(e.h3,{id:"usage",children:"Usage"}),`
`,(0,l.jsx)(J.Ed,{of:z}),`
`,(0,l.jsxs)(e.h4,{id:"about-columns-and-data-props",children:["About ",(0,l.jsx)(e.code,{children:"columns"})," and ",(0,l.jsx)(e.code,{children:"data"})," Props"]}),`
`,(0,l.jsxs)(e.p,{children:["To avoid unnecessary rerenders, ",(0,l.jsx)(e.code,{children:"columns"})," and ",(0,l.jsx)(e.code,{children:"data"})," must be memoized."]}),`
`,(0,l.jsxs)(e.p,{children:["Columns are rendered in the same order defined in the ",(0,l.jsx)(e.code,{children:"columns"}),` prop.
Each Cell's content is automatically rendered by matching the `,(0,l.jsx)(e.code,{children:"id"})," of the column to the key of each object in the ",(0,l.jsx)(e.code,{children:"data"})," array prop."]}),`
`,(0,l.jsx)(e.h5,{id:"example",children:"Example"}),`
`,(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:`interface TableData {
  projectName: string;
  repository: string;
}

const columns = useMemo<Array<Column<TableData>>>(
  () => [
    id: 'projectName'
    header: "Project Name"
  ],
  [
    id: 'repository',
    header: "Repository"
  ],
  []
);

const data = useMemo<Array<TableData>>(
  () => [
    {
      projectName: 'Grafana',
      repository: 'https://github.com/grafana/grafana',
   }
  ],
  [
    {
      projectName: 'Loki';
      repository: 'https://github.com/grafana/loki';
    }
  ],
  []
);
`})}),`
`,(0,l.jsx)(e.h2,{id:"examples",children:"Examples"}),`
`,(0,l.jsx)(e.h3,{id:"with-row-expansion",children:"With row expansion"}),`
`,(0,l.jsx)(e.p,{children:`Individual rows can be expanded to display additional details or reconfigure properties previously defined when the row was created.
The expanded row area should be used to unclutter the primary presentation of data, carefully consider what the user needs to know at first glance and what can be hidden behind the Row Expander button.`}),`
`,(0,l.jsx)(e.p,{children:"In general, data-types that are consistent across all dataset are in the primary table, variances are pushed to the expanded section for each individual row."}),`
`,(0,l.jsx)(J.oG,{id:"experimental-interactivetable--with-row-expansion"}),`
`,(0,l.jsxs)(e.p,{children:["Row expansion is enabled whenever the ",(0,l.jsx)(e.code,{children:"renderExpanded"})," prop is provided. The ",(0,l.jsx)(e.code,{children:"renderExpanded"})," function is called with the row's data and should return a ReactNode."]}),`
`,(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:`interface TableData {
  datasource: string;
  repo: string;
  description: string;
}

const tableData: TableData[] = [
  //...
];

const columns: Array<Column<TableData>> = [
  //...
];

const ExpandedCell = ({ description }: TableData) => {
  return <p>{description}</p>;
};

export const MyComponent = () => {
  return (
    <InteractiveTable
      columns={columns}
      data={tableData}
      getRowId={(r) => r.datasource}
      renderExpandedRow={ExpandedCell}
    />
  );
};
`})}),`
`,(0,l.jsx)(e.h3,{id:"custom-cell-rendering",children:"Custom Cell Rendering"}),`
`,(0,l.jsxs)(e.p,{children:["Individual cells can be rendered using custom content dy defining a ",(0,l.jsx)(e.code,{children:"cell"})," property on the column definition."]}),`
`,(0,l.jsx)(J.oG,{id:"experimental-interactivetable--with-custom-cell"}),`
`,(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:`interface TableData {
  datasource: string;
  repo: string;
}

const RepoCell = ({
  row: {
    original: { repo },
  },
}: CellProps<WithCustomCellData, void>) => {
  return (
    <LinkButton href={repo} size="sm" icon="external-link-alt">
      Open on GitHub
    </LinkButton>
  );
};

const tableData: WithCustomCellData[] = [
  {
    datasource: 'Prometheus',
    repo: 'https://github.com/prometheus/prometheus',
  },
  {
    datasource: 'Loki',
    repo: 'https://github.com/grafana/loki',
  },
  {
    datasource: 'Tempo',
    repo: 'https://github.com/grafana/tempo',
  },
];

const columns: Array<Column<WithCustomCellData>> = [
  { id: 'datasource', header: 'Data Source' },
  { id: 'repo', header: 'Repo', cell: RepoCell },
];

export const MyComponent = () => {
  return <InteractiveTable columns={columns} data={tableData} getRowId={(r) => r.datasource} />;
};
`})}),`
`,(0,l.jsx)(e.h3,{id:"with-pagination",children:"With pagination"}),`
`,(0,l.jsxs)(e.p,{children:["The table can be rendered with pagination controls by passing in the ",(0,l.jsx)(e.code,{children:"pageSize"}),` property. All data must be provided as
only client side pagination is supported.`]}),`
`,(0,l.jsx)(J.oG,{id:"experimental-interactivetable--with-pagination"}),`
`,(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:`interface WithPaginationData {
  id: string;
  firstName: string;
  lastName: string;
  car: string;
  age: number;
}

export const MyComponent = () => {
  const pageableData: WithPaginationData[] = [
    { id: '48a3926a-e82c-4c26-b959-3a5f473e186e', firstName: 'Brynne', lastName: 'Denisevich', car: 'Cougar', age: 47 },
    {
      id: 'cf281390-adbf-4407-8cf3-a52e012f63e6',
      firstName: 'Aldridge',
      lastName: 'Shirer',
      car: 'Viper RT/10',
      age: 74,
    },
    // ...
    {
      id: 'b9b0b559-acc1-4bd8-b052-160ecf3e4f68',
      firstName: 'Ermanno',
      lastName: 'Sinott',
      car: 'Thunderbird',
      age: 26,
    },
  ];
  const columns: Array<Column<WithPaginationData>> = [
    { id: 'firstName', header: 'First name' },
    { id: 'lastName', header: 'Last name' },
    { id: 'car', header: 'Car', sortType: 'string' },
    { id: 'age', header: 'Age', sortType: 'number' },
  ];
  return <InteractiveTable columns={columns} data={pageableData} getRowId={(r) => r.id} pageSize={15} />;
};
`})}),`
`,(0,l.jsx)(e.h3,{id:"with-header-tooltips",children:"With header tooltips"}),`
`,(0,l.jsx)(e.p,{children:"It may be useful to render a tooltip on the header of a column to provide additional information about the data in that column."}),`
`,(0,l.jsx)(J.oG,{id:"experimental-interactivetable--with-header-tooltips"}),`
`,(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:`interface WithPaginationData {
  id: string;
  firstName: string;
  lastName: string;
  car: string;
  age: number;
}

export const MyComponent = () => {
  const pageableData: WithPaginationData[] = [
    { id: '48a3926a-e82c-4c26-b959-3a5f473e186e', firstName: 'Brynne', lastName: 'Denisevich', car: 'Cougar', age: 47 },
    {
      id: 'cf281390-adbf-4407-8cf3-a52e012f63e6',
      firstName: 'Aldridge',
      lastName: 'Shirer',
      car: 'Viper RT/10',
      age: 74,
    },
    // ...
    {
      id: 'b9b0b559-acc1-4bd8-b052-160ecf3e4f68',
      firstName: 'Ermanno',
      lastName: 'Sinott',
      car: 'Thunderbird',
      age: 26,
    },
  ];
  const columns: Array<Column<WithPaginationData>> = [
    { id: 'firstName', header: 'First name' },
    { id: 'lastName', header: 'Last name' },
    { id: 'car', header: 'Car', sortType: 'string' },
    { id: 'age', header: 'Age', sortType: 'number' },
  ];

  const headerToolTips = {
    age: { content: 'The number of years since the person was born' },
    lastName: {
      content: () => {
        return (
          <>
            <h4>Here is an h4</h4>
            <div>Some content</div>
            <div>Some more content</div>
          </>
        );
      },
      iconName: 'plus-square',
    },
  };
  return (
    <InteractiveTable columns={columns} data={pageableData} getRowId={(r) => r.id} headerToolTips={headerToolTips} />
  );
};
`})}),`
`,(0,l.jsx)(e.h3,{id:"with-controlled-sorting",children:"With controlled sorting"}),`
`,(0,l.jsxs)(e.p,{children:["The default sorting can be changed to controlled sorting by passing in the ",(0,l.jsx)(e.code,{children:"fetchData"})," function, which is called whenever the sorting changes and should return the sorted data. This is useful when the sorting is done server side. It is important to memoize the ",(0,l.jsx)(e.code,{children:"fetchData"})," function to prevent unnecessary rerenders and the possibility of an infinite render loop."]}),`
`,(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-tsx",children:`interface WithPaginationData {
  id: string;
  firstName: string;
  lastName: string;
  car: string;
  age: number;
}

export const WithControlledSort: StoryFn<typeof InteractiveTable> = (args) => {
  const columns: Array<Column<WithPaginationData>> = [
    { id: 'firstName', header: 'First name', sortType: 'string' },
    { id: 'lastName', header: 'Last name', sortType: 'string' },
    { id: 'car', header: 'Car', sortType: 'string' },
    { id: 'age', header: 'Age' },
  ];
  const [data, setData] = useState(pageableData);

  // In production the function will most likely make an API call to fetch the sorted data
  const fetchData = useCallback(({ sortBy }: FetchDataArgs<WithPaginationData>) => {
    if (!sortBy?.length) {
      return setData(pageableData);
    }

    setTimeout(() => {
      const newData = [...pageableData];
      newData.sort((a, b) => {
        const sort = sortBy[0];
        const aData = a[sort.id as keyof Omit<WithPaginationData, 'age'>];
        const bData = b[sort.id as keyof Omit<WithPaginationData, 'age'>];
        if (sort.desc) {
          return bData.localeCompare(aData);
        }
        return aData.localeCompare(bData);
      });
      setData(newData);
    }, 300);
  }, []);

  return <InteractiveTable columns={columns} data={data} getRowId={(r) => r.id} pageSize={15} fetchData={fetchData} />;
};
`})})]})}function Qe(a={}){const{wrapper:e}=Object.assign({},(0,we.ah)(),a.components);return e?(0,l.jsx)(e,Object.assign({},a,{children:(0,l.jsx)(Ee,a)})):Ee(a)}var ea=Qe,aa=Object.defineProperty,ta=Object.defineProperties,na=Object.getOwnPropertyDescriptors,Ne=Object.getOwnPropertySymbols,ra=Object.prototype.hasOwnProperty,la=Object.prototype.propertyIsEnumerable,Ie=(a,e,r)=>e in a?aa(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,j=(a,e)=>{for(var r in e||(e={}))ra.call(e,r)&&Ie(a,r,e[r]);if(Ne)for(var r of Ne(e))la.call(e,r)&&Ie(a,r,e[r]);return a},K=(a,e)=>ta(a,na(e)),Ce,De,Pe,Oe,Se,Re,je,ke,Be,Ae,We,Me,Le,ze,Ke,Ve,He,Fe;const oa={title:"Experimental/InteractiveTable",component:z,parameters:{docs:{page:ea},controls:{exclude:["className","renderExpandedRow","getRowId","fetchData"]}},args:{},argTypes:{}},te=a=>{const e=(0,n.useMemo)(()=>[{id:"header2",header:"With missing values",sortType:"number",disableGrow:!0},{id:"noheader",sortType:"number"}],[]),r=(0,n.useMemo)(()=>[{header1:"a",header2:1},{header1:"b",noheader:"This column doesn't have an header"},{header1:"c",noheader:"But it's still sortable"}],[]);return n.createElement(z,{columns:e,data:r,getRowId:T=>T.header1})},ia=({description:a})=>n.createElement("p",null,a),ne=a=>{const e=[{datasource:"Prometheus",repo:"https://github.com/prometheus/prometheus",description:"Open source time series database & alerting."},{datasource:"Loki",repo:"https://github.com/grafana/loki",description:"Like Prometheus but for logs. OSS logging solution from Grafana Labs."},{datasource:"Tempo",repo:"https://github.com/grafana/tempo",description:"High volume, minimal dependency trace storage. OSS tracing solution from Grafana Labs."}],r=[{id:"datasource",header:"Data Source"},{id:"repo",header:"Repo"}];return n.createElement(z,{columns:r,data:e,getRowId:T=>T.datasource,renderExpandedRow:ia})},sa=({row:{original:{repo:a}}})=>n.createElement(Ze.Qj,{href:a,size:"sm",icon:"external-link-alt"},"Open on GithHub"),re=a=>{const e=[{datasource:"Prometheus",repo:"https://github.com/prometheus/prometheus"},{datasource:"Loki",repo:"https://github.com/grafana/loki"},{datasource:"Tempo",repo:"https://github.com/grafana/tempo"}],r=[{id:"datasource",header:"Data Source"},{id:"repo",header:"Repo",cell:sa}];return n.createElement(z,{columns:r,data:e,getRowId:T=>T.datasource})},le=[{id:"48a3926a-e82c-4c26-b959-3a5f473e186e",firstName:"Brynne",lastName:"Denisevich",car:"Cougar",age:47},{id:"cf281390-adbf-4407-8cf3-a52e012f63e6",firstName:"Aldridge",lastName:"Shirer",car:"Viper RT/10",age:74},{id:"be5736f5-7015-4668-a03d-44b56f2b012c",firstName:"Sonni",lastName:"Hinrich",car:"Ramcharger",age:75},{id:"fdbe3559-c68a-4f2f-b579-48ef02642628",firstName:"Hanson",lastName:"Giraudeau",car:"X5",age:67},{id:"7d0ee01a-7ac5-4e0a-9c73-e864d10c0152",firstName:"Whitman",lastName:"Seabridge",car:"TSX",age:99},{id:"177c2287-b7cb-4b5f-8976-56ee993bed61",firstName:"Aleda",lastName:"Friman",car:"X5",age:44},{id:"87c21e60-c2f4-4a01-b2af-a6d22c196e25",firstName:"Cullen",lastName:"Kobpac",car:"Montero",age:28},{id:"dd89f32d-2ef4-4c35-8e23-a8b2219e3a69",firstName:"Fitz",lastName:"Butterwick",car:"Fox",age:70},{id:"cc1b4de7-8ec5-49bd-93bc-bee9fa1ccf37",firstName:"Jordon",lastName:"Harrington",car:"Elantra",age:39},{id:"34badca2-895f-4dff-bd34-74c1edd5f309",firstName:"Ad",lastName:"Beare",car:"Freestyle",age:58},{id:"8676e97d-b19f-4a98-bbb4-a48c3673c216",firstName:"Tally",lastName:"Prestie",car:"Montero Sport",age:91},{id:"12ea99c6-ccd9-4313-af92-df9141b3d4bd",firstName:"Wendel",lastName:"Chasles",car:"Corvette",age:89},{id:"a153ad38-d9b7-4437-a8ac-c1198f0060ef",firstName:"Lester",lastName:"Klewer",car:"Xterra",age:21},{id:"ead42cd5-dcd9-4886-879a-fce2eacb4c2b",firstName:"Ferd",lastName:"Pasterfield",car:"Tiburon",age:1},{id:"97410315-a0a5-4488-8c91-ba7ff640dd9b",firstName:"Alphonse",lastName:"Espinola",car:"Laser",age:30},{id:"e4d93eab-ca85-47cc-9867-06aeb29951e3",firstName:"Dorry",lastName:"Attew",car:"Tahoe",age:90},{id:"f0047d6f-f517-4f9d-99c2-ce15dcd6a78a",firstName:"Zed",lastName:"McMinn",car:"745",age:96},{id:"5ac3fac4-7caa-4f8e-8fde-115c4a0eca85",firstName:"Fredericka",lastName:"Hains",car:"A6",age:39},{id:"03ffcc41-4a03-46f5-a161-431d331293dd",firstName:"Syd",lastName:"Brixey",car:"Camry Hybrid",age:70},{id:"7086f360-f19d-4b0c-9bce-48b2784f200a",firstName:"Casey",lastName:"Margerrison",car:"NV3500",age:38},{id:"8375ab44-0c61-4987-8154-02d1b2fd12a7",firstName:"Sallyann",lastName:"Northleigh",car:"Tiburon",age:51},{id:"3af1e7cc-92c9-4356-85eb-bdcecbdffcda",firstName:"Yance",lastName:"Nani",car:"F350",age:21},{id:"46cf82f7-d9be-4a1d-b7cc-fc15133353dc",firstName:"Judas",lastName:"Riach",car:"RSX",age:31},{id:"0d10f9cd-78b9-4584-bc01-a35bcae0a14a",firstName:"Mikkel",lastName:"Dellenbrok",car:"VUE",age:53},{id:"1a78e628-6b8b-4d6a-b391-bbfa650b8024",firstName:"Son",lastName:"Vaudin",car:"Sunbird",age:47},{id:"d1349bf6-6dd1-4aed-9788-84e8b642ad63",firstName:"Emilio",lastName:"Liddington",car:"F250",age:2},{id:"14a3a8e8-15d7-469e-87c6-85181e22b3b8",firstName:"Devin",lastName:"Meadley",car:"XT",age:61},{id:"47cccba7-9f9b-44f5-985c-c2e226b2c9e4",firstName:"Harriott",lastName:"Seres",car:"LeSabre",age:11},{id:"e668a9b1-1dcd-4b5d-9d4e-479dc08695d6",firstName:"Elvin",lastName:"Diable",car:"90",age:69},{id:"addf8ee9-934c-4e81-83e8-20f50bbff028",firstName:"Rey",lastName:"Scotford",car:"H1",age:71},{id:"f22dbd3f-8419-4a1c-b542-23c3842cb59b",firstName:"King",lastName:"Catonne",car:"Suburban 2500",age:91},{id:"c85b7547-3654-41f0-94d6-becc832b81fa",firstName:"Barbabas",lastName:"Romeril",car:"Sorento",age:5},{id:"8d83b0eb-635d-452e-9f85-f19216207ad1",firstName:"Hadley",lastName:"Bartoletti",car:"Seville",age:37},{id:"9bdb532a-c747-4288-b2e9-e3f2dc7e0a15",firstName:"Willie",lastName:"Dunkerley",car:"Envoy",age:34},{id:"6b4413dd-1f77-4504-86ee-1ea5b90c6279",firstName:"Annamarie",lastName:"Burras",car:"Elantra",age:12},{id:"f17a5f2a-92a9-48a9-a05c-a3c44c66adb7",firstName:"Rebecca",lastName:"Thomason",car:"Elantra",age:6},{id:"85f7d4d2-3ae6-42ab-88dd-d4e810ebb76c",firstName:"Tatum",lastName:"Monte",car:"Achieva",age:53},{id:"3d374982-6cd9-4e6e-abf1-7de38eee4b68",firstName:"Tallie",lastName:"Goodlet",car:"Integra",age:81},{id:"ccded1ef-f648-4970-ae6e-882ba4d789fb",firstName:"Catrina",lastName:"Thunderman",car:"RX",age:91},{id:"3198513a-b05f-4d0d-8187-214f82f88531",firstName:"Aldric",lastName:"Awton",car:"Swift",age:78},{id:"35c3d0ce-52ea-4f30-8c17-b1e6b9878aa3",firstName:"Garry",lastName:"Ineson",car:"Discovery",age:25},{id:"c5ae799a-983f-4933-8a4d-cda754acedc0",firstName:"Alica",lastName:"Rubinfeld",car:"FX",age:20},{id:"cd9e5476-1ebb-46f0-926e-cee522e8d332",firstName:"Wenonah",lastName:"Blakey",car:"Cooper",age:96},{id:"17449829-4a8f-433c-8cb0-a869f153ea34",firstName:"Bevon",lastName:"Cushe",car:"GTI",age:23},{id:"d20d41a3-d9fe-492d-91df-51a962c515b9",firstName:"Marybeth",lastName:"Gauson",car:"MR2",age:53},{id:"cd046551-5df7-44b5-88b3-d1654a838214",firstName:"Kimball",lastName:"Bellhanger",car:"Ram 1500",age:56},{id:"a8114bdf-911d-410f-b90b-4c8a9c302743",firstName:"Cindelyn",lastName:"Beamont",car:"Monte Carlo",age:99},{id:"e31709ba-bf65-42d1-8c5c-60d461bc3e75",firstName:"Elfreda",lastName:"Riddles",car:"Montero",age:59},{id:"cd67179c-0c49-486d-baa9-8e956b362c2e",firstName:"Chickie",lastName:"Picheford",car:"Legend",age:56},{id:"b9b0b559-acc1-4bd8-b052-160ecf3e4f68",firstName:"Ermanno",lastName:"Sinott",car:"Thunderbird",age:26}],oe=a=>{const e=[{id:"firstName",header:"First name"},{id:"lastName",header:"Last name"},{id:"car",header:"Car",sortType:"string"},{id:"age",header:"Age",sortType:"number"}];return n.createElement(z,{columns:e,data:le,getRowId:r=>r.id,pageSize:15})},ie=a=>{const e=[{id:"firstName",header:"First name"},{id:"lastName",header:"Last name"},{id:"car",header:"Car",sortType:"string"},{id:"age",header:"Age",sortType:"number"}],r={age:{content:"The number of years since the person was born"},lastName:{content:()=>n.createElement(n.Fragment,null,n.createElement("h4",null,"Here is an h4"),n.createElement("div",null,"Some content"),n.createElement("div",null,"Some more content")),iconName:"plus-square"}};return n.createElement(z,{columns:e,data:le.slice(0,10),getRowId:T=>T.id,headerTooltips:r})},se=a=>{const e=[{id:"firstName",header:"First name",sortType:"string"},{id:"lastName",header:"Last name",sortType:"string"},{id:"car",header:"Car",sortType:"string"},{id:"age",header:"Age"}],[r,T]=(0,n.useState)(le),Q=(0,n.useCallback)(({sortBy:W})=>{if(!W?.length)return T(le);setTimeout(()=>{const X=[...le];X.sort((Y,M)=>{const ee=W[0],ce=Y[ee.id],ge=M[ee.id];return ee.desc?ge.localeCompare(ce):ce.localeCompare(ge)}),T(X)},300)},[]);return n.createElement(z,{columns:e,data:r,getRowId:W=>W.id,pageSize:15,fetchData:Q})};var ca=oa;te.parameters=K(j({},te.parameters),{docs:K(j({},(Ce=te.parameters)==null?void 0:Ce.docs),{source:j({originalSource:`args => {
  const columns = useMemo<Array<Column<TableData>>>(() => [{
    id: 'header2',
    header: 'With missing values',
    sortType: 'number',
    disableGrow: true
  }, {
    id: 'noheader',
    sortType: 'number'
  }], []);
  const data: TableData[] = useMemo(() => [{
    header1: 'a',
    header2: 1
  }, {
    header1: 'b',
    noheader: "This column doesn't have an header"
  }, {
    header1: 'c',
    noheader: "But it's still sortable"
  }], []);
  return <InteractiveTable columns={columns} data={data} getRowId={r => r.header1} />;
}`},(Pe=(De=te.parameters)==null?void 0:De.docs)==null?void 0:Pe.source)})}),ne.parameters=K(j({},ne.parameters),{docs:K(j({},(Oe=ne.parameters)==null?void 0:Oe.docs),{source:j({originalSource:`args => {
  const tableData: WithRowExpansionData[] = [{
    datasource: 'Prometheus',
    repo: 'https://github.com/prometheus/prometheus',
    description: 'Open source time series database & alerting.'
  }, {
    datasource: 'Loki',
    repo: 'https://github.com/grafana/loki',
    description: 'Like Prometheus but for logs. OSS logging solution from Grafana Labs.'
  }, {
    datasource: 'Tempo',
    repo: 'https://github.com/grafana/tempo',
    description: 'High volume, minimal dependency trace storage. OSS tracing solution from Grafana Labs.'
  }];
  const columns: Array<Column<WithRowExpansionData>> = [{
    id: 'datasource',
    header: 'Data Source'
  }, {
    id: 'repo',
    header: 'Repo'
  }];
  return <InteractiveTable columns={columns} data={tableData} getRowId={r => r.datasource} renderExpandedRow={ExpandedCell} />;
}`},(Re=(Se=ne.parameters)==null?void 0:Se.docs)==null?void 0:Re.source)})}),re.parameters=K(j({},re.parameters),{docs:K(j({},(je=re.parameters)==null?void 0:je.docs),{source:j({originalSource:`args => {
  const tableData: WithCustomCellData[] = [{
    datasource: 'Prometheus',
    repo: 'https://github.com/prometheus/prometheus'
  }, {
    datasource: 'Loki',
    repo: 'https://github.com/grafana/loki'
  }, {
    datasource: 'Tempo',
    repo: 'https://github.com/grafana/tempo'
  }];
  const columns: Array<Column<WithCustomCellData>> = [{
    id: 'datasource',
    header: 'Data Source'
  }, {
    id: 'repo',
    header: 'Repo',
    cell: RepoCell
  }];
  return <InteractiveTable columns={columns} data={tableData} getRowId={r => r.datasource} />;
}`},(Be=(ke=re.parameters)==null?void 0:ke.docs)==null?void 0:Be.source)})}),oe.parameters=K(j({},oe.parameters),{docs:K(j({},(Ae=oe.parameters)==null?void 0:Ae.docs),{source:j({originalSource:`args => {
  const columns: Array<Column<WithPaginationData>> = [{
    id: 'firstName',
    header: 'First name'
  }, {
    id: 'lastName',
    header: 'Last name'
  }, {
    id: 'car',
    header: 'Car',
    sortType: 'string'
  }, {
    id: 'age',
    header: 'Age',
    sortType: 'number'
  }];
  return <InteractiveTable columns={columns} data={pageableData} getRowId={r => r.id} pageSize={15} />;
}`},(Me=(We=oe.parameters)==null?void 0:We.docs)==null?void 0:Me.source)})}),ie.parameters=K(j({},ie.parameters),{docs:K(j({},(Le=ie.parameters)==null?void 0:Le.docs),{source:j({originalSource:`args => {
  const columns: Array<Column<WithPaginationData>> = [{
    id: 'firstName',
    header: 'First name'
  }, {
    id: 'lastName',
    header: 'Last name'
  }, {
    id: 'car',
    header: 'Car',
    sortType: 'string'
  }, {
    id: 'age',
    header: 'Age',
    sortType: 'number'
  }];
  const headerTooltips: Record<string, InteractiveTableHeaderTooltip> = {
    age: {
      content: 'The number of years since the person was born'
    },
    lastName: {
      content: () => {
        return <>
            <h4>Here is an h4</h4>
            <div>Some content</div>
            <div>Some more content</div>
          </>;
      },
      iconName: 'plus-square'
    }
  };
  return <InteractiveTable columns={columns} data={pageableData.slice(0, 10)} getRowId={r => r.id} headerTooltips={headerTooltips} />;
}`},(Ke=(ze=ie.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source)})}),se.parameters=K(j({},se.parameters),{docs:K(j({},(Ve=se.parameters)==null?void 0:Ve.docs),{source:j({originalSource:`args => {
  const columns: Array<Column<WithPaginationData>> = [{
    id: 'firstName',
    header: 'First name',
    sortType: 'string'
  }, {
    id: 'lastName',
    header: 'Last name',
    sortType: 'string'
  }, {
    id: 'car',
    header: 'Car',
    sortType: 'string'
  }, {
    id: 'age',
    header: 'Age'
  }];
  const [data, setData] = useState(pageableData);
  const fetchData = useCallback(({
    sortBy
  }: FetchDataArgs<WithPaginationData>) => {
    if (!sortBy?.length) {
      return setData(pageableData);
    }
    setTimeout(() => {
      const newData = [...pageableData];
      newData.sort((a, b) => {
        const sort = sortBy[0];
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const aData = a[(sort.id as keyof Omit<WithPaginationData, 'age'>)];
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const bData = b[(sort.id as keyof Omit<WithPaginationData, 'age'>)];
        if (sort.desc) {
          return bData.localeCompare(aData);
        }
        return aData.localeCompare(bData);
      });
      setData(newData);
    }, 300);
  }, []);
  return <InteractiveTable columns={columns} data={data} getRowId={r => r.id} pageSize={15} fetchData={fetchData} />;
}`},(Fe=(He=se.parameters)==null?void 0:He.docs)==null?void 0:Fe.source)})})},"../../.yarn/__virtual__/react-loading-skeleton-virtual-aac4fd7915/2/yarn/cache/react-loading-skeleton-npm-3.3.1-b364092891-7b4f4c5a12.zip/node_modules/react-loading-skeleton/dist/index.js":function(V,E,o){o.d(E,{Z:function(){return N}});var n=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js");const s=n.createContext({}),C=!0;function g({baseColor:i,highlightColor:c,width:m,height:b,borderRadius:_,circle:I,direction:O,duration:y,enableAnimation:S=C}){const x={};return O==="rtl"&&(x["--animation-direction"]="reverse"),typeof y=="number"&&(x["--animation-duration"]=`${y}s`),S||(x["--pseudo-element-display"]="none"),(typeof m=="string"||typeof m=="number")&&(x.width=m),(typeof b=="string"||typeof b=="number")&&(x.height=b),(typeof _=="string"||typeof _=="number")&&(x.borderRadius=_),I&&(x.borderRadius="50%"),typeof i<"u"&&(x["--base-color"]=i),typeof c<"u"&&(x["--highlight-color"]=c),x}function N({count:i=1,wrapper:c,className:m,containerClassName:b,containerTestId:_,circle:I=!1,style:O,...y}){var S,x,k;const H=n.useContext(s),L={...y};for(const[h,D]of Object.entries(y))typeof D>"u"&&delete L[h];const d={...H,...L,circle:I},f={...O,...g(d)};let t="react-loading-skeleton";m&&(t+=` ${m}`);const u=(S=d.inline)!==null&&S!==void 0?S:!1,p=[],v=Math.ceil(i);for(let h=0;h<v;h++){let D=f;if(v>i&&h===v-1){const A=(x=D.width)!==null&&x!==void 0?x:"100%",R=i%1,G=typeof A=="number"?A*R:`calc(${A} * ${R})`;D={...D,width:G}}const B=n.createElement("span",{className:t,style:D,key:h},"\u200C");u?p.push(B):p.push(n.createElement(n.Fragment,{key:h},B,n.createElement("br",null)))}return n.createElement("span",{className:b,"data-testid":_,"aria-live":"polite","aria-busy":(k=d.enableAnimation)!==null&&k!==void 0?k:C},c?p.map((h,D)=>n.createElement(c,{key:D},h)):p)}function w({children:i,...c}){return React.createElement(s.Provider,{value:c},i)}},"../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/cjs/react-jsx-runtime.production.min.js":function(V,E,o){/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),s=Symbol.for("react.element"),C=Symbol.for("react.fragment"),g=Object.prototype.hasOwnProperty,N=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,w={key:!0,ref:!0,__self:!0,__source:!0};function i(c,m,b){var _,I={},O=null,y=null;b!==void 0&&(O=""+b),m.key!==void 0&&(O=""+m.key),m.ref!==void 0&&(y=m.ref);for(_ in m)g.call(m,_)&&!w.hasOwnProperty(_)&&(I[_]=m[_]);if(c&&c.defaultProps)for(_ in m=c.defaultProps,m)I[_]===void 0&&(I[_]=m[_]);return{$$typeof:s,type:c,key:O,ref:y,props:I,_owner:N.current}}E.Fragment=C,E.jsx=i,E.jsxs=i},"../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/jsx-runtime.js":function(V,E,o){V.exports=o("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
