"use strict";(self.webpackChunk_grafana_ui=self.webpackChunk_grafana_ui||[]).push([[1369],{"../../.yarn/__virtual__/@mdx-js-react-virtual-4792127d00/2/yarn/cache/@mdx-js-react-npm-2.3.0-d5582a450b-bce1cb1dde.zip/node_modules/@mdx-js/react/lib/index.js":function(L,E,c){c.d(E,{NF:function(){return v},Zo:function(){return k},ah:function(){return r},pC:function(){return d}});var e=c("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js");const d=e.createContext({});function v(p){return m;function m(x){const P=r(x.components);return e.createElement(p,{...x,allComponents:P})}}function r(p){const m=e.useContext(d);return e.useMemo(()=>typeof p=="function"?p(m):{...m,...p},[m,p])}const n={};function k({components:p,children:m,disableParentContext:x}){let P;return x?P=typeof p=="function"?p({}):p||n:P=r(p),e.createElement(d.Provider,{value:P},m)}},"./src/components/Layout/Stack/Stack.tsx":function(L,E,c){c.d(E,{K:function(){return A}});var e=c("../../../yarn/cache/@emotion-css-npm-11.11.2-dbfa42cf83-718f758575.zip/node_modules/@emotion/css/dist/emotion-css.esm.js"),d=c("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),v=c("./src/themes/ThemeContext.tsx"),r=c("./src/components/Layout/utils/responsiveness.tsx"),n=Object.defineProperty,k=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,x=(s,h,f)=>h in s?n(s,h,{enumerable:!0,configurable:!0,writable:!0,value:f}):s[h]=f,P=(s,h)=>{for(var f in h||(h={}))p.call(h,f)&&x(s,f,h[f]);if(k)for(var f of k(h))m.call(h,f)&&x(s,f,h[f]);return s},O=(s,h)=>{var f={};for(var S in s)p.call(s,S)&&h.indexOf(S)<0&&(f[S]=s[S]);if(s!=null&&k)for(var S of k(s))h.indexOf(S)<0&&m.call(s,S)&&(f[S]=s[S]);return f};const A=d.forwardRef((s,h)=>{const f=s,{gap:S=1,alignItems:y,justifyContent:u,direction:C,wrap:i,children:w,grow:_,shrink:l,basis:z,flex:T}=f,j=O(f,["gap","alignItems","justifyContent","direction","wrap","children","grow","shrink","basis","flex"]),b=(0,v.wW)(K,S,y,u,C,i,_,l,z,T);return d.createElement("div",P({ref:h,className:b.flex},j),w)});A.displayName="Stack";const K=(s,h,f,S,y,u,C,i,w,_)=>({flex:(0,e.iv)([{display:"flex"},(0,r.U)(s,y,l=>({flexDirection:l})),(0,r.U)(s,u,l=>({flexWrap:l})),(0,r.U)(s,f,l=>({alignItems:l})),(0,r.U)(s,S,l=>({justifyContent:l})),(0,r.U)(s,h,l=>({gap:s.spacing(l)})),(0,r.U)(s,C,l=>({flexGrow:l})),(0,r.U)(s,i,l=>({flexShrink:l})),(0,r.U)(s,w,l=>({flexBasis:l})),(0,r.U)(s,_,l=>({flex:l}))])});try{A.displayName="Stack",A.__docgenInfo={description:"",displayName:"Stack",props:{gap:{defaultValue:null,description:"",name:"gap",required:!1,type:{name:"ResponsiveProp<ThemeSpacingTokens>"}},alignItems:{defaultValue:null,description:"",name:"alignItems",required:!1,type:{name:"ResponsiveProp<AlignItems>"}},justifyContent:{defaultValue:null,description:"",name:"justifyContent",required:!1,type:{name:"ResponsiveProp<JustifyContent>"}},direction:{defaultValue:null,description:"",name:"direction",required:!1,type:{name:"ResponsiveProp<Direction>"}},wrap:{defaultValue:null,description:"",name:"wrap",required:!1,type:{name:"ResponsiveProp<Wrap>"}},grow:{defaultValue:null,description:"Sets the property `flex-grow`",name:"grow",required:!1,type:{name:"ResponsiveProp<number>"}},shrink:{defaultValue:null,description:"Sets the property `flex-shrink`",name:"shrink",required:!1,type:{name:"ResponsiveProp<number>"}},basis:{defaultValue:null,description:"Sets the property `flex-basis`",name:"basis",required:!1,type:{name:"ResponsiveProp<FlexBasis>"}},flex:{defaultValue:null,description:"Sets the property `flex`",name:"flex",required:!1,type:{name:"ResponsiveProp<Flex>"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Layout/Stack/Stack.tsx#Stack"]={docgenInfo:A.__docgenInfo,name:"Stack",path:"src/components/Layout/Stack/Stack.tsx#Stack"})}catch{}},"./src/components/Layout/utils/responsiveness.tsx":function(L,E,c){c.d(E,{U:function(){return d}});function e(v,r,n,k){const p=r[k];if(p!=null)return{[v.breakpoints.up(k)]:n(p)}}function d(v,r,n){return r==null?null:typeof r!="object"||!("xs"in r)?n(r):[e(v,r,n,"xs"),e(v,r,n,"sm"),e(v,r,n,"md"),e(v,r,n,"lg"),e(v,r,n,"xl"),e(v,r,n,"xxl")]}try{d.displayName="getResponsiveStyle",d.__docgenInfo={description:"Function that converts a ResponsiveProp object into CSS",displayName:"getResponsiveStyle",props:{}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/Layout/utils/responsiveness.tsx#getResponsiveStyle"]={docgenInfo:d.__docgenInfo,name:"getResponsiveStyle",path:"src/components/Layout/utils/responsiveness.tsx#getResponsiveStyle"})}catch{}},"./src/utils/storybook/themeStorybookControls.tsx":function(L,E,c){c.d(E,{g:function(){return e}});const e={control:"select",options:[0,.25,.5,1,1.5,2,3,4,5,6,8,10]}},"./src/components/Layout/Stack/Stack.story.tsx":function(L,E,c){c.r(E),c.d(E,{AlignItemsExamples:function(){return U},Basic:function(){return M},DirectionExamples:function(){return G},GapExamples:function(){return F},JustifyContentExamples:function(){return B},WrapExamples:function(){return N},default:function(){return ee}});var e=c("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),d=c("./src/themes/ThemeContext.tsx"),v=c("./src/utils/storybook/themeStorybookControls.tsx"),r=c("./src/components/Layout/Stack/Stack.tsx"),n=c("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/jsx-runtime.js"),k=c("../../.yarn/__virtual__/@mdx-js-react-virtual-4792127d00/2/yarn/cache/@mdx-js-react-npm-2.3.0-d5582a450b-bce1cb1dde.zip/node_modules/@mdx-js/react/lib/index.js"),p=c("../../.yarn/__virtual__/@storybook-blocks-virtual-5605a2f23e/2/yarn/cache/@storybook-blocks-patch-37aea2d782-a00c56fb6e.zip/node_modules/@storybook/blocks/dist/index.mjs");function m(o){const t=Object.assign({h1:"h1",p:"p",h3:"h3",h4:"h4",ul:"ul",li:"li"},(0,k.ah)(),o.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(p.h_,{title:"MDX|Stack",component:r.K}),`
`,(0,n.jsx)(t.h1,{id:"stack",children:"Stack"}),`
`,(0,n.jsx)(t.p,{children:"The Stack component is a simple wrapper around the flexbox layout model that allows to easily create responsive and flexible layouts. It provides a simple and intuitive way to align and distribute items within a container either horizontally or vertically."}),`
`,(0,n.jsx)(t.h3,{id:"usage",children:"Usage"}),`
`,(0,n.jsx)(t.h4,{id:"when-to-use",children:"When to use"}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:"For creating responsive and flexible layouts that can adapt to different screen sizes and orientations."}),`
`,(0,n.jsx)(t.li,{children:"When needing a simple and intuitive way to align and distribute items within a container either horizontally or vertically."}),`
`,(0,n.jsx)(t.li,{children:"To easily reorder and rearrange elements without changing the HTML structure."}),`
`,(0,n.jsx)(t.li,{children:"When aiming to create equal height columns."}),`
`,(0,n.jsx)(t.li,{children:"To create a grid-like structure with automatic wrapping and sizing of items based on the available space."}),`
`]}),`
`,(0,n.jsx)(t.h4,{id:"when-not-to-use",children:"When not to use"}),`
`,(0,n.jsxs)(t.ul,{children:[`
`,(0,n.jsx)(t.li,{children:"For complex multi-dimensional layouts with intricate requirements that are better suited for CSS frameworks or grid systems."}),`
`,(0,n.jsx)(t.li,{children:"When precise control over spacing and positioning of elements is necessary."}),`
`]}),`
`,(0,n.jsx)(t.h3,{id:"props",children:"Props"}),`
`,(0,n.jsx)(p.Ed,{of:r.K})]})}function x(o={}){const{wrapper:t}=Object.assign({},(0,k.ah)(),o.components);return t?(0,n.jsx)(t,Object.assign({},o,{children:(0,n.jsx)(m,o)})):m(o)}var P=x,O=Object.defineProperty,A=Object.defineProperties,K=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,S=(o,t,a)=>t in o?O(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a,y=(o,t)=>{for(var a in t||(t={}))h.call(t,a)&&S(o,a,t[a]);if(s)for(var a of s(t))f.call(t,a)&&S(o,a,t[a]);return o},u=(o,t)=>A(o,K(t)),C,i,w,_,l,z,T,j,b,g,D,W,X,J,Y,Z,$,H;const I=({color:o,text:t,height:a})=>e.createElement("div",{style:{width:"5em",height:a,backgroundColor:o,display:"flex",alignItems:"center",justifyContent:"center"}},t&&e.createElement("h3",{style:{color:"black"}},t)),q={title:"General/Layout/Stack",component:r.K,parameters:{docs:{page:P}}},M=({direction:o,wrap:t,alignItems:a,justifyContent:V,gap:R})=>{const te=(0,d.l4)();return e.createElement("div",{style:{width:"600px",height:"600px",border:"1px solid grey"}},e.createElement(r.K,{direction:o,wrap:t,alignItems:a,justifyContent:V,gap:R},Array.from({length:5}).map((re,Q)=>e.createElement(I,{key:Q,color:te.colors.warning.main,text:Q+1}))))};M.argTypes={gap:v.g,direction:{control:"select",options:["row","row-reverse","column","column-reverse"]},wrap:{control:"select",options:["nowrap","wrap","wrap-reverse"]},alignItems:{control:"select",options:["stretch","flex-start","flex-end","center","baseline","start","end","self-start","self-end"]},justifyContent:{control:"select",options:["flex-start","flex-end","center","space-between","space-around","space-evenly","start","end","left","right"]}};const U=()=>{const o=(0,d.l4)();return e.createElement("div",{style:{width:"600px"}},e.createElement("p",null,"Align items flex-start"),e.createElement(r.K,{direction:"row",wrap:"wrap",alignItems:"flex-start",justifyContent:"start",gap:2},Array.from({length:5}).map((t,a)=>e.createElement(I,{key:a,color:o.colors.error.main,text:a+1}))),e.createElement("p",null,"Align items flex-end"),e.createElement(r.K,{direction:"row",wrap:"wrap",alignItems:"flex-end",justifyContent:"end",gap:2},Array.from({length:5}).map((t,a)=>e.createElement(I,{key:a,color:o.colors.error.main,text:a+1}))),e.createElement("p",null,"Align items baseline"),e.createElement(r.K,{direction:"row",wrap:"nowrap",alignItems:"baseline",justifyContent:"center",gap:2},Array.from({length:5}).map((t,a)=>e.createElement(I,{key:a,color:o.colors.error.main,text:a+1}))),e.createElement("p",null,"Align items center"),e.createElement(r.K,{direction:"row",wrap:"wrap",alignItems:"center",justifyContent:"center",gap:2},Array.from({length:5}).map((t,a)=>e.createElement(I,{key:a,color:o.colors.error.main,text:a+1}))),e.createElement("p",null,"Align items stretch"),e.createElement(r.K,{direction:"row",wrap:"wrap",alignItems:"stretch",justifyContent:"center",gap:2},e.createElement(I,{color:o.colors.error.main,height:"10em"}),e.createElement(I,{color:o.colors.error.main}),e.createElement(I,{color:o.colors.error.main,height:"3em"}),e.createElement(I,{color:o.colors.error.main}),e.createElement(I,{color:o.colors.error.main})))},B=()=>{const o=(0,d.l4)(),t=["space-between","space-around","space-evenly","flex-start","flex-end","center"];return e.createElement("div",{style:{width:"600px"}},t.map(a=>e.createElement(e.Fragment,null,e.createElement("p",null,"Justify Content ",a),e.createElement(r.K,{direction:"row",wrap:"wrap",alignItems:"center",justifyContent:a,gap:2},Array.from({length:5}).map((V,R)=>e.createElement(I,{key:R,color:o.colors.warning.main,text:R+1}))))))},F=()=>{const o=(0,d.l4)(),t=[2,8,10];return e.createElement("div",{style:{width:"800px"}},t.map(a=>e.createElement(e.Fragment,null,e.createElement("p",null,"Gap with spacingToken set to ",a),e.createElement(r.K,{direction:"row",wrap:"wrap",alignItems:"flex-start",justifyContent:"flex-start",gap:a},Array.from({length:5}).map((V,R)=>e.createElement(I,{key:R,color:o.colors.error.main,text:R+1}))))))},N=()=>{const o=(0,d.l4)(),t=["nowrap","wrap","wrap-reverse"];return e.createElement("div",{style:{width:"600px"}},t.map(a=>e.createElement(e.Fragment,null,e.createElement("p",null,"Wrap examples with ",a," and gap set to spacingToken 2 (16px)"),e.createElement(r.K,{direction:"row",wrap:a,alignItems:"center",justifyContent:"center",gap:2},Array.from({length:10}).map((V,R)=>e.createElement(I,{key:R,color:o.colors.warning.main,text:R+1}))))))},G=()=>{const o=(0,d.l4)(),t=["row","row-reverse","column","column-reverse"];return e.createElement("div",{style:{width:"600px"}},t.map(a=>e.createElement(e.Fragment,null,e.createElement("p",null,"Direction ",a),e.createElement(r.K,{direction:a,wrap:"wrap",alignItems:"center",justifyContent:"center",gap:2},Array.from({length:5}).map((V,R)=>e.createElement(I,{key:R,color:o.colors.warning.main,text:R+1}))))))};var ee=q;M.parameters=u(y({},M.parameters),{docs:u(y({},(C=M.parameters)==null?void 0:C.docs),{source:y({originalSource:`({
  direction,
  wrap,
  alignItems,
  justifyContent,
  gap
}) => {
  const theme = useTheme2();
  return <div style={{
    width: '600px',
    height: '600px',
    border: '1px solid grey'
  }}>
      <Stack direction={direction} wrap={wrap} alignItems={alignItems} justifyContent={justifyContent} gap={gap}>
        {Array.from({
        length: 5
      }).map((_, i) => <Item key={i} color={theme.colors.warning.main} text={i + 1} />)}
      </Stack>
    </div>;
}`},(w=(i=M.parameters)==null?void 0:i.docs)==null?void 0:w.source)})}),U.parameters=u(y({},U.parameters),{docs:u(y({},(_=U.parameters)==null?void 0:_.docs),{source:y({originalSource:`() => {
  const theme = useTheme2();
  return <div style={{
    width: '600px'
  }}>
      <p>Align items flex-start</p>
      <Stack direction="row" wrap="wrap" alignItems="flex-start" justifyContent="start" gap={2}>
        {Array.from({
        length: 5
      }).map((_, i) => <Item key={i} color={theme.colors.error.main} text={i + 1} />)}
      </Stack>
      <p>Align items flex-end</p>
      <Stack direction="row" wrap="wrap" alignItems="flex-end" justifyContent="end" gap={2}>
        {Array.from({
        length: 5
      }).map((_, i) => <Item key={i} color={theme.colors.error.main} text={i + 1} />)}
      </Stack>
      <p>Align items baseline</p>
      <Stack direction="row" wrap="nowrap" alignItems="baseline" justifyContent="center" gap={2}>
        {Array.from({
        length: 5
      }).map((_, i) => <Item key={i} color={theme.colors.error.main} text={i + 1} />)}
      </Stack>
      <p>Align items center</p>
      <Stack direction="row" wrap="wrap" alignItems="center" justifyContent="center" gap={2}>
        {Array.from({
        length: 5
      }).map((_, i) => <Item key={i} color={theme.colors.error.main} text={i + 1} />)}
      </Stack>
      <p>Align items stretch</p>
      <Stack direction="row" wrap="wrap" alignItems="stretch" justifyContent="center" gap={2}>
        <Item color={theme.colors.error.main} height="10em" />
        <Item color={theme.colors.error.main} />
        <Item color={theme.colors.error.main} height="3em" />
        <Item color={theme.colors.error.main} />
        <Item color={theme.colors.error.main} />
      </Stack>
    </div>;
}`},(z=(l=U.parameters)==null?void 0:l.docs)==null?void 0:z.source)})}),B.parameters=u(y({},B.parameters),{docs:u(y({},(T=B.parameters)==null?void 0:T.docs),{source:y({originalSource:`() => {
  const theme = useTheme2();
  const justifyContentOptions: JustifyContent[] = ['space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end', 'center'];
  return <div style={{
    width: '600px'
  }}>
      {justifyContentOptions.map(justifyContent => <>
          <p>Justify Content {justifyContent}</p>
          <Stack direction="row" wrap="wrap" alignItems="center" justifyContent={justifyContent} gap={2}>
            {Array.from({
          length: 5
        }).map((_, i) => <Item key={i} color={theme.colors.warning.main} text={i + 1} />)}
          </Stack>
        </>)}
    </div>;
}`},(b=(j=B.parameters)==null?void 0:j.docs)==null?void 0:b.source)})}),F.parameters=u(y({},F.parameters),{docs:u(y({},(g=F.parameters)==null?void 0:g.docs),{source:y({originalSource:`() => {
  const theme = useTheme2();
  const gapOptions: ThemeSpacingTokens[] = [2, 8, 10];
  return <div style={{
    width: '800px'
  }}>
      {gapOptions.map(gap => <>
          <p>Gap with spacingToken set to {gap}</p>
          <Stack direction="row" wrap="wrap" alignItems="flex-start" justifyContent="flex-start" gap={gap}>
            {Array.from({
          length: 5
        }).map((_, i) => <Item key={i} color={theme.colors.error.main} text={i + 1} />)}
          </Stack>
        </>)}
    </div>;
}`},(W=(D=F.parameters)==null?void 0:D.docs)==null?void 0:W.source)})}),N.parameters=u(y({},N.parameters),{docs:u(y({},(X=N.parameters)==null?void 0:X.docs),{source:y({originalSource:`() => {
  const theme = useTheme2();
  const wrapOptions: Wrap[] = ['nowrap', 'wrap', 'wrap-reverse'];
  return <div style={{
    width: '600px'
  }}>
      {wrapOptions.map(wrap => <>
          <p>Wrap examples with {wrap} and gap set to spacingToken 2 (16px)</p>
          <Stack direction="row" wrap={wrap} alignItems="center" justifyContent="center" gap={2}>
            {Array.from({
          length: 10
        }).map((_, i) => <Item key={i} color={theme.colors.warning.main} text={i + 1} />)}
          </Stack>
        </>)}
    </div>;
}`},(Y=(J=N.parameters)==null?void 0:J.docs)==null?void 0:Y.source)})}),G.parameters=u(y({},G.parameters),{docs:u(y({},(Z=G.parameters)==null?void 0:Z.docs),{source:y({originalSource:`() => {
  const theme = useTheme2();
  const directionOptions: Direction[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  return <div style={{
    width: '600px'
  }}>
      {directionOptions.map(direction => <>
          <p>Direction {direction}</p>
          <Stack direction={direction} wrap="wrap" alignItems="center" justifyContent="center" gap={2}>
            {Array.from({
          length: 5
        }).map((_, i) => <Item key={i} color={theme.colors.warning.main} text={i + 1} />)}
          </Stack>
        </>)}
    </div>;
}`},(H=($=G.parameters)==null?void 0:$.docs)==null?void 0:H.source)})})},"../../../yarn/cache/@emotion-css-npm-11.11.2-dbfa42cf83-718f758575.zip/node_modules/@emotion/css/dist/emotion-css.esm.js":function(L,E,c){c.d(E,{iv:function(){return f},cx:function(){return O},F4:function(){return h}});var e=c("../../../yarn/cache/@emotion-cache-npm-11.11.0-3e6e449071-ef29756247.zip/node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js"),d=c("../../../yarn/cache/@emotion-serialize-npm-1.1.2-4b856d3761-71ed270ee4.zip/node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js"),v=c("../../../yarn/cache/@emotion-utils-npm-1.2.1-3d04f99348-472fa529c6.zip/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");function r(u,C){if(u.inserted[C.name]===void 0)return u.insert("",C,u.sheet,!0)}function n(u,C,i){var w=[],_=(0,v.fp)(u,w,i);return w.length<2?i:_+C(w)}var k=function(C){var i=(0,e.Z)(C);i.sheet.speedy=function(T){this.isSpeedy=T},i.compat=!0;var w=function(){for(var j=arguments.length,b=new Array(j),g=0;g<j;g++)b[g]=arguments[g];var D=(0,d.O)(b,i.registered,void 0);return(0,v.My)(i,D,!1),i.key+"-"+D.name},_=function(){for(var j=arguments.length,b=new Array(j),g=0;g<j;g++)b[g]=arguments[g];var D=(0,d.O)(b,i.registered),W="animation-"+D.name;return r(i,{name:D.name,styles:"@keyframes "+W+"{"+D.styles+"}"}),W},l=function(){for(var j=arguments.length,b=new Array(j),g=0;g<j;g++)b[g]=arguments[g];var D=(0,d.O)(b,i.registered);r(i,D)},z=function(){for(var j=arguments.length,b=new Array(j),g=0;g<j;g++)b[g]=arguments[g];return n(i.registered,w,p(b))};return{css:w,cx:z,injectGlobal:l,keyframes:_,hydrate:function(j){j.forEach(function(b){i.inserted[b]=!0})},flush:function(){i.registered={},i.inserted={},i.sheet.flush()},sheet:i.sheet,cache:i,getRegisteredStyles:v.fp.bind(null,i.registered),merge:n.bind(null,i.registered,w)}},p=function u(C){for(var i="",w=0;w<C.length;w++){var _=C[w];if(_!=null){var l=void 0;switch(typeof _){case"boolean":break;case"object":{if(Array.isArray(_))l=u(_);else{l="";for(var z in _)_[z]&&z&&(l&&(l+=" "),l+=z)}break}default:l=_}l&&(i&&(i+=" "),i+=l)}}return i},m=k({key:"css"}),x=m.flush,P=m.hydrate,O=m.cx,A=m.merge,K=m.getRegisteredStyles,s=m.injectGlobal,h=m.keyframes,f=m.css,S=m.sheet,y=m.cache},"../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/cjs/react-jsx-runtime.production.min.js":function(L,E,c){/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e=c("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),d=Symbol.for("react.element"),v=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,n=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,k={key:!0,ref:!0,__self:!0,__source:!0};function p(m,x,P){var O,A={},K=null,s=null;P!==void 0&&(K=""+P),x.key!==void 0&&(K=""+x.key),x.ref!==void 0&&(s=x.ref);for(O in x)r.call(x,O)&&!k.hasOwnProperty(O)&&(A[O]=x[O]);if(m&&m.defaultProps)for(O in x=m.defaultProps,x)A[O]===void 0&&(A[O]=x[O]);return{$$typeof:d,type:m,key:K,ref:s,props:A,_owner:n.current}}E.Fragment=v,E.jsx=p,E.jsxs=p},"../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/jsx-runtime.js":function(L,E,c){L.exports=c("../../../yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
