(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70de5ce8"],{"0603":function(t,e,a){t.exports=a.p+"img/shuffleLogo.7a71f28e.png"},"13c8":function(t,e,a){var r=a("c3a1"),s=a("36c3"),n=a("355d").f;t.exports=function(t){return function(e){var a,o=s(e),i=r(o),l=i.length,c=0,u=[];while(l>c)n.call(o,a=i[c++])&&u.push(t?[a,o[a]]:o[a]);return u}}},"1af6":function(t,e,a){var r=a("63b6");r(r.S,"Array",{isArray:a("9003")})},"2d1f":function(t,e,a){t.exports=a("b606")},"353f":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{staticClass:"navbar navbar-expand-sm justify-content-between navbar-light bg-light fixed-top"},[r("router-link",{staticClass:"navbar-brand",attrs:{to:"dashboard"}},[r("img",{staticClass:"d-inline-block align-top",attrs:{src:a("0603"),height:"30",alt:"Shuffle"}})]),r("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),r("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[r("div",{staticClass:"navbar-nav ml-auto justify-content-end"},[r("router-link",{staticClass:"nav-item nav-link",attrs:{to:"/profile"}},[t._v("Profile")]),r("router-link",{staticClass:"nav-item nav-link",attrs:{to:"/"}},[t._v("Logout")])],1)])],1)},s=[],n={name:"NavigationBar",data:function(){return{links:[{id:0,route:"home",accessLevel:"all"}]}}},o=n,i=a("2877"),l=Object(i["a"])(o,r,s,!1,null,"766d66c8",null);e["a"]=l.exports},"39b6":function(t,e,a){"use strict";var r=a("cb2f"),s=a.n(r);s.a},"469f":function(t,e,a){a("6c1c"),a("1654"),t.exports=a("7d7b")},"5d73":function(t,e,a){t.exports=a("469f")},"6b54":function(t,e,a){},7236:function(t,e,a){"use strict";var r=a("7424");e["a"]={getApplicationStatus:function(t){return Object(r["a"])().post("check-app-status",t)},withdrawApplication:function(t){return Object(r["a"])().post("withdraw-application",t)},getProfile:function(t){return Object(r["a"])().post("get-profile",t)},updateProfile:function(t){return Object(r["a"])().post("update-applicant-profile",t)}}},"768b":function(t,e,a){"use strict";var r=a("a745"),s=a.n(r);function n(t){if(s()(t))return t}var o=a("5d73"),i=a.n(o);function l(t,e){var a=[],r=!0,s=!1,n=void 0;try{for(var o,l=i()(t);!(r=(o=l.next()).done);r=!0)if(a.push(o.value),e&&a.length===e)break}catch(c){s=!0,n=c}finally{try{r||null==l["return"]||l["return"]()}finally{if(s)throw n}}return a}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function u(t,e){return n(t)||l(t,e)||c()}a.d(e,"a",function(){return u})},"7d6d":function(t,e,a){var r=a("63b6"),s=a("13c8")(!1);r(r.S,"Object",{values:function(t){return s(t)}})},"7d7b":function(t,e,a){var r=a("e4ae"),s=a("7cd6");t.exports=a("584a").getIterator=function(t){var e=s(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},"7f7f":function(t,e,a){var r=a("86cc").f,s=Function.prototype,n=/^\s*function ([^ (]*)/,o="name";o in s||a("9e1e")&&r(s,o,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},"915a":function(t,e,a){"use strict";var r=a("7424");e["a"]={getApplicant:function(t){return Object(r["a"])().post("get-applicant",t)},updateApplicationStatus:function(t){return Object(r["a"])().post("change-app-status",t)},getJobPostings:function(t){return Object(r["a"])().post("get-job-postings",t)},changeJobStatus:function(t){return Object(r["a"])().post("change-job-status",t)},updateJobPost:function(t){return Object(r["a"])().post("update-job",t)},getProfile:function(t){return Object(r["a"])().post("get-profile",t)},updateProfile:function(t){return Object(r["a"])().post("update-employer-profile",t)}}},"9c60":function(t,e,a){var r=a("63b6"),s=a("13c8")(!0);r(r.S,"Object",{entries:function(t){return s(t)}})},"9e1c":function(t,e,a){a("7d6d"),t.exports=a("584a").Object.values},a745:function(t,e,a){t.exports=a("f410")},ac6a:function(t,e,a){for(var r=a("cadf"),s=a("0d58"),n=a("2aba"),o=a("7726"),i=a("32e9"),l=a("84f2"),c=a("2b4c"),u=c("iterator"),f=c("toStringTag"),p=l.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=s(d),v=0;v<m.length;v++){var g,b=m[v],h=d[b],y=o[b],w=y&&y.prototype;if(w&&(w[u]||i(w,u,p),w[f]||i(w,f,b),l[b]=p,h))for(g in r)w[g]||n(w,g,r[g],!0)}},b606:function(t,e,a){a("9c60"),t.exports=a("584a").Object.entries},c66d:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("NavigationBar"),a("ProfileHeader")],1)},s=[],n=a("353f"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"body"},[a("div",{staticClass:"row"},["applicant"===t.userType?a("div",[a("div",{staticClass:"column side"},[a("div",{staticClass:"container justify-content-center"},[a("div",{attrs:{clas:"row justify-content-center"}},[a("img",{staticClass:"border-bottom",staticStyle:{width:"250px",height:"200px"},attrs:{src:t.userData.profileImg,alt:"Img"}})]),a("div",{staticClass:"row justify-content-center"},[a("label",[t._v("Major: "+t._s(t.userData.major))])]),a("div",{staticClass:"row justify-content-center"},[a("label",[t._v("Graduation Date: "+t._s(t.userData.grad_year))])])])]),a("div",{staticClass:"column space"}),a("div",{staticClass:"column middle form-container"},[a("form",{attrs:{autocomplete:"off",enctype:"multipart/form-data"}},[a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"email"}},[t._v("Email Address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.email,expression:"userData.email"}],staticClass:"form-control",attrs:{type:"text",id:"email",name:"email",disabled:""},domProps:{value:t.userData.email},on:{input:function(e){e.target.composing||t.$set(t.userData,"email",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"password"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userPassword,expression:"userPassword"}],staticClass:"form-control",attrs:{type:"text",id:"password",name:"password"},domProps:{value:t.userPassword},on:{input:function(e){e.target.composing||(t.userPassword=e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"fname"}},[t._v("First Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.f_name,expression:"userData.f_name"}],staticClass:"form-control",attrs:{type:"text",id:"fname",name:"firstname"},domProps:{value:t.userData.f_name},on:{input:function(e){e.target.composing||t.$set(t.userData,"f_name",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"lname"}},[t._v("Last Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.l_name,expression:"userData.l_name"}],staticClass:"form-control",attrs:{type:"text",id:"lname",name:"lastname"},domProps:{value:t.userData.l_name},on:{input:function(e){e.target.composing||t.$set(t.userData,"l_name",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"bio"}},[t._v("Bio")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.userData.bio,expression:"userData.bio"}],staticClass:"form-control",attrs:{id:"bio"},domProps:{value:t.userData.bio},on:{input:function(e){e.target.composing||t.$set(t.userData,"bio",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{staticClass:"float-left",attrs:{for:"resume-upload"}},[t._v("Upload Resume (PDF only)-")]),a("input",{ref:"resume",attrs:{id:"resume-upload",type:"file"},on:{change:function(e){return t.selectFile("resume")}}})]),a("div",{staticClass:"form-row"},[a("label",{staticClass:"float-left",attrs:{for:"profileImg-upload"}},[t._v("Upload Profile Image (JPEG, PNG only)-")]),a("input",{ref:"profileImg",attrs:{id:"profileImg-upload",type:"file"},on:{change:function(e){return t.selectFile("profileImg")}}})]),a("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button"},on:{click:t.updateApplicantProfile}},[t._v("Save Changes")])])])]):t._e(),"employer"===t.userType?a("div",[a("div",{staticClass:"column side"},[a("div",{staticClass:"container justify-content-center"},[a("div",{attrs:{clas:"row justify-content-center"}},[a("img",{staticClass:"border-bottom",staticStyle:{width:"200px",height:"200px"},attrs:{src:t.userData.profileImg,alt:"Img"}})]),a("div",{staticClass:"row justify-content-center"},[a("label",[t._v("Name: "+t._s(t.userData.company_name))])]),a("div",{staticClass:"row justify-content-center"},[a("label",[t._v("Year Founded: "+t._s(t.userData.year_found))])])])]),a("div",{staticClass:"column space"}),a("div",{staticClass:"column middle form-container"},[a("form",{attrs:{autocomplete:"off",enctype:"multipart/form-data"}},[a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"email"}},[t._v("Email Address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.email,expression:"userData.email"}],staticClass:"form-control",attrs:{type:"text",id:"email",name:"email",placeholder:"Your email is...",disabled:""},domProps:{value:t.userData.email},on:{input:function(e){e.target.composing||t.$set(t.userData,"email",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"password"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userPassword,expression:"userPassword"}],staticClass:"form-control",attrs:{type:"text",id:"pass",name:"pass",placeholder:"Your password is..."},domProps:{value:t.userPassword},on:{input:function(e){e.target.composing||(t.userPassword=e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"cname"}},[t._v("Company Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.company_name,expression:"userData.company_name"}],staticClass:"form-control",attrs:{type:"text",id:"cname",name:"cname",placeholder:"Your company's name is..."},domProps:{value:t.userData.company_name},on:{input:function(e){e.target.composing||t.$set(t.userData,"company_name",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{attrs:{for:"Year"}},[t._v("Year Found")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.year_found,expression:"userData.year_found"}],staticClass:"form-control",attrs:{type:"date",id:"Year",name:"Year"},domProps:{value:t.userData.year_found},on:{input:function(e){e.target.composing||t.$set(t.userData,"year_found",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",[t._v("Company Description")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.userData.company_description,expression:"userData.company_description"}],staticClass:"form-control",attrs:{id:"des"},domProps:{value:t.userData.company_description},on:{input:function(e){e.target.composing||t.$set(t.userData,"company_description",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("label",{staticClass:"float-left",attrs:{for:"profileImg-upload"}},[t._v("Upload Profile Image (JPEG, PNG only)-")]),a("input",{ref:"profileImg",attrs:{id:"profileImg-upload",type:"file"},on:{change:function(e){return t.selectFile("profileImg")}}})]),a("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button"},on:{click:t.updateEmployerProfile}},[t._v("Save Changes")])])])]):t._e()])])},i=[],l=a("5d73"),c=a.n(l),u=a("cebc"),f=a("768b"),p=a("2d1f"),d=a.n(p),m=(a("ac6a"),a("96cf"),a("3b8d")),v=(a("7f7f"),a("db0c")),g=a.n(v),b=(a("cadf"),a("551c"),a("f751"),a("097d"),a("7236")),h=a("915a"),y={methods:{formValidation:function(t){for(var e=g()(t),a=0;a<e.length;a++)if(""===e[a])return!1;return!0},validFileType:function(t,e){var a=t.slice(t.lastIndexOf(".")).toLowerCase();console.log(a);for(var r=0;r<e.length;r++)if(console.log(e[r]),a===e[r])return!0;return!1},selectFile:function(t){var e=[".pdf"],a=void 0;if("resume"===t?(e=[".pdf"],a=this.$refs.resume.files[0].name):"profileImg"===t&&(e=[".jpg",".png"],a=this.$refs.profileImg.files[0].name),1==this.validFileType(a,e))console.log(this.$refs);else{document.getElementById(t+"-upload").value="";var r=a.slice(a.lastIndexOf("."));alert("The file extension ".concat(r," is not allowed"))}},getProfile:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a,r,s,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e=this.userData.email,console.log(e),a=this.userType,"applicant"!==a){t.next=14;break}return t.next=7,b["a"].getProfile({email:e});case 7:r=t.sent,console.log(r.data),this.userPassword=r.data.password,d()(r.data).forEach(function(t){var e=Object(f["a"])(t,2),a=e[0],r=e[1];n.userData[a]=r}),console.log(this.userData),t.next=23;break;case 14:if("employer"!==a){t.next=23;break}return t.next=17,h["a"].getProfile({email:e});case 17:s=t.sent,console.log(s.data),this.userPassword=s.data.password,console.log(this.userPassword),d()(s.data).forEach(function(t){var e=Object(f["a"])(t,2),a=e[0],r=e[1];n.userData[a]=r}),console.log(this.userData);case 23:t.next=30;break;case 25:t.prev=25,t.t0=t["catch"](0),console.log(t.t0.response),alert(t.t0),this.$router.push({name:"dashboard"});case 30:case"end":return t.stop()}},t,this,[[0,25]])}));function e(){return t.apply(this,arguments)}return e}(),updateApplicantProfile:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a,r,s,n,o,i,l;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e=new FormData,a=Object(u["a"])({},this.userData),a.password=this.userPassword,!1!==this.formValidation(a)){t.next=7;break}return alert("Fields cannot be empty"),t.abrupt("return");case 7:for(this.$refs.resume.files[0]&&e.append("resume",this.$refs.resume.files[0]),this.$refs.profileImg.files[0]&&e.append("profileImg",this.$refs.profileImg.files[0]),d()(a).forEach(function(t){var a=Object(f["a"])(t,2),r=a[0],s=a[1];e.append(r,s)}),r=!0,s=!1,n=void 0,t.prev=13,o=c()(e.entries());!(r=(i=o.next()).done);r=!0)l=i.value,console.log(l[0]+", "+l[1]);t.next=21;break;case 17:t.prev=17,t.t0=t["catch"](13),s=!0,n=t.t0;case 21:t.prev=21,t.prev=22,r||null==o.return||o.return();case 24:if(t.prev=24,!s){t.next=27;break}throw n;case 27:return t.finish(24);case 28:return t.finish(21);case 29:return t.next=31,b["a"].updateProfile(e);case 31:t.sent,alert("Changes Saved"),this.$router.push({name:"dashboard"}),t.next=39;break;case 36:t.prev=36,t.t1=t["catch"](0),console.log(t.t1);case 39:case"end":return t.stop()}},t,this,[[0,36],[13,17,21,29],[22,,24,28]])}));function e(){return t.apply(this,arguments)}return e}(),updateEmployerProfile:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=new FormData,a=Object(u["a"])({},this.userData),a.password=this.userPassword,this.$refs.profileImg.files[0]&&e.append("profileImg",this.$refs.profileImg.files[0]),d()(a).forEach(function(t){var a=Object(f["a"])(t,2),r=a[0],s=a[1];e.append(r,s)}),console.log(a),t.next=9,h["a"].updateProfile(e);case 9:t.sent,alert("Changes Saved"),this.$router.push({name:"dashboard"}),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](0),console.log(t.t0),alert(t.t0);case 18:case"end":return t.stop()}},t,this,[[0,14]])}));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){console.log("Dashboard: mounted"),this.userType=this.$store.getters.userType,this.userData=this.$store.getters.userData,console.log(this.userData),this.getProfile()},data:function(){return{userType:null,userData:null,userPassword:null}}},w=y,C=(a("39b6"),a("2877")),x=Object(C["a"])(w,o,i,!1,null,"ab4dff66",null),D=x.exports,P={name:"profile",components:{ProfileHeader:D,NavigationBar:n["a"]},methods:{loginRoute:function(){this.$router.push({path:"/"})}},data:function(){return{}}},_=P,j=(a("fcf4"),Object(C["a"])(_,r,s,!1,null,"6967cb25",null));e["default"]=j.exports},cb2f:function(t,e,a){},db0c:function(t,e,a){t.exports=a("9e1c")},f410:function(t,e,a){a("1af6"),t.exports=a("584a").Array.isArray},fcf4:function(t,e,a){"use strict";var r=a("6b54"),s=a.n(r);s.a}}]);
//# sourceMappingURL=chunk-70de5ce8.4448a948.js.map