"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2613],{54829:(Y,P,a)=>{a.r(P),a.d(P,{default:()=>X});var s=a(66681),t=a(85960),N=a(69690),A=a(5836),x=a(92369),C=a(2598),l=a(47257),F=a(20989),R=a(6005),S=a(21644),h=a(95162),G=a(7628),U=a(18888),O=a(87860);const z="https://grafana.com/?src=grafananet&cnt=public-dashboards",B="public/img/grafana_text_logo_light.svg",H="public/img/grafana_text_logo_dark.svg",E="grafana-logo",L=e=>{const o=(0,l.l4)(),i=(0,l.wW)($),{footerHide:n,footerText:d,footerLink:y,footerLogo:c,headerLogoHide:p}=e||{footerHide:!1,footerText:"Powered by",footerLogo:E,footerLink:z,headerLogoHide:!1};return{footerHide:n,footerText:t.createElement("span",{className:i.text},d),footerLogo:c===E?o.isDark?B:H:c,footerLink:y,headerLogoHide:p}};let u=()=>L();function w(e){u=()=>L(e)}const $=e=>({text:(0,s.css)({color:e.colors.text.secondary,fontSize:e.typography.body.fontSize})}),I=function(){const e=(0,l.wW)(W),o=u();return o.footerHide?null:t.createElement("div",{className:e.footer},t.createElement("a",{className:e.link,href:o.footerLink,target:"_blank",rel:"noreferrer noopener"},o.footerText," ",t.createElement("img",{className:e.logoImg,alt:"",src:o.footerLogo})))},W=e=>({footer:(0,s.css)({display:"flex",justifyContent:"end",height:"30px",padding:e.spacing(0,2,0,1)}),link:(0,s.css)({display:"flex",alignItems:"center"}),logoImg:(0,s.css)({height:"16px",marginLeft:e.spacing(.5)})});var b=a(95454),M=a(60049);const v=x.wl.pages.PublicDashboard.NotAvailable,D=({paused:e})=>{const o=(0,l.wW)(Z),i=(0,l.wW)(M.pJ),n=b.c.LoginBoxBackground();return t.createElement(b.c.LoginBackground,{className:o.container,"data-testid":v.container},t.createElement("div",{className:(0,s.cx)(o.box,n)},t.createElement(b.c.LoginLogo,{className:i.loginLogo}),t.createElement("p",{className:o.title,"data-testid":v.title},e?"This dashboard has been paused by the administrator":"The dashboard your are trying to access does not exist"),e&&t.createElement("p",{className:o.description,"data-testid":v.pausedDescription},"Try again later")))},Z=e=>({container:(0,s.css)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    :before {
      opacity: 1;
    }
  `,box:(0,s.css)`
    width: 608px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${e.spacing(4)};
    z-index: 1;
    border-radius: ${e.shape.borderRadius(4)};
    padding: ${e.spacing(6,8)};
    opacity: 1;
  `,title:(0,s.css)`
    font-size: ${e.typography.h3.fontSize};
    text-align: center;
    margin: 0;
  `,description:(0,s.css)`
    font-size: ${e.typography.h5.fontSize};
    margin: 0;
  `});var j=a(17691),T=a(45864),k=a(24024);const V=x.wl.pages.PublicDashboard,J=({dashboard:e})=>{const o=(0,h.useDispatch)(),i=u(),n=d=>{o((0,S.YT)(d))};return t.createElement(C.X,{title:e.title,pageIcon:i.headerLogoHide?void 0:"grafana",buttonOverflowAlignment:"right"},!e.timepicker.hidden&&t.createElement(G.C,{dashboard:e,onChangeTimeZone:n}))},K=e=>{const{match:o,route:i,location:n}=e,d=(0,h.useDispatch)(),y=(0,R.p)(),c=(0,N.Z)(e),p=(0,l.wW)(Q),f=(0,h.useSelector)(g=>g.dashboard),r=f.getModel();return(0,t.useEffect)(()=>{d((0,k.mV)({routeName:i.routeName,fixUrl:!1,accessToken:o.params.accessToken,keybindingSrv:y.keybindings}))},[]),(0,t.useEffect)(()=>{if(c?.location.search!==n.search){const g=c?.queryParams,m=e.queryParams;(m?.from!==g?.from||m?.to!==g?.to)&&!r?.timepicker.hidden&&(0,T.$t)().updateTimeRangeFromUrl(),!g?.refresh&&m?.refresh&&(0,T.$t)().setAutoRefresh(m.refresh)}},[c,n.search,e.queryParams,r?.timepicker.hidden]),r?r.meta.publicDashboardEnabled===!1?t.createElement(D,{paused:!0}):r.meta.dashboardNotFound?t.createElement(D,null):t.createElement(F.T,{pageNav:{text:r.title},layout:A.Q.Custom,"data-testid":V.page},t.createElement(J,{dashboard:r}),f.initError&&t.createElement(U.u,{initError:f.initError}),t.createElement("div",{className:p.gridContainer},t.createElement(j.Z,{dashboard:r,isEditable:!1,viewPanel:null,editPanel:null,hidePanelMenus:!0})),t.createElement(I,null)):t.createElement(O.B,{initPhase:f.initPhase})},Q=e=>({gridContainer:(0,s.css)({flex:1,padding:e.spacing(2,2,2,2),overflow:"auto"})}),X=K}}]);

//# sourceMappingURL=PublicDashboardPage.46e0ad328eaa58b7fb17.js.map