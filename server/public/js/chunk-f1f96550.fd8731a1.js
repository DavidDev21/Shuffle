(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1f96550"],{"0603":function(t,e,a){t.exports=a.p+"img/shuffleLogo.7a71f28e.png"},"13c8":function(t,e,a){var r=a("c3a1"),o=a("36c3"),i=a("355d").f;t.exports=function(t){return function(e){var a,s=o(e),n=r(s),l=n.length,c=0,u=[];while(l>c)i.call(s,a=n[c++])&&u.push(t?[a,s[a]]:s[a]);return u}}},"353f":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{staticClass:"navbar navbar-expand-sm justify-content-between navbar-light bg-light fixed-top"},[r("router-link",{staticClass:"navbar-brand",attrs:{to:"dashboard"}},[r("img",{staticClass:"d-inline-block align-top",attrs:{src:a("0603"),height:"30",alt:"Shuffle"}})]),r("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),r("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[r("div",{staticClass:"navbar-nav ml-auto justify-content-end"},[r("router-link",{staticClass:"nav-item nav-link",attrs:{to:"/profile"}},[t._v("Profile")]),r("router-link",{staticClass:"nav-item nav-link",attrs:{to:"/"}},[t._v("Logout")])],1)])],1)},o=[],i={name:"NavigationBar",data:function(){return{links:[{id:0,route:"home",accessLevel:"all"}]}}},s=i,n=a("2877"),l=Object(n["a"])(s,r,o,!1,null,"766d66c8",null);e["a"]=l.exports},"3d8e":function(t,e,a){"use strict";var r=a("7424");e["a"]={getJob:function(t){return Object(r["a"])().post("get-job",t)},applyJob:function(t){return Object(r["a"])().post("apply-job",t)},postJob:function(t){return Object(r["a"])().post("post-job",t)}}},"7c5f":function(t,e,a){},"7d6d":function(t,e,a){var r=a("63b6"),o=a("13c8")(!1);r(r.S,"Object",{values:function(t){return o(t)}})},"8afa":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("NavigationBar"),a("h3",[t._v("Post Job")]),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"container form-container"},[a("form",{attrs:{autocomplete:"off",enctype:"multipart/form-data"}},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{staticClass:"float-left required",attrs:{for:"title"}},[t._v("Job Title")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"Enter Job Title",required:""},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),a("div",{staticClass:"form-group col-md-6"},[a("label",{staticClass:"float-left required",attrs:{for:"salary"}},[t._v("Salary")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.salary,expression:"salary"}],staticClass:"form-control",attrs:{min:"0",type:"number",id:"salary",placeholder:"Enter Salary",required:""},domProps:{value:t.salary},on:{input:function(e){e.target.composing||(t.salary=e.target.value)}}})])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{staticClass:"float-left required",attrs:{for:"location"}},[t._v("Location")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.location,expression:"location"}],staticClass:"form-control",attrs:{type:"text",id:"location",placeholder:"Enter Location",required:""},domProps:{value:t.location},on:{input:function(e){e.target.composing||(t.location=e.target.value)}}})]),a("div",{staticClass:"form-group col-md-6"},[a("label",{staticClass:"float-left required",attrs:{for:"coverLetter"}},[t._v("Cover Letter?")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.coverLetter,expression:"coverLetter"}],staticClass:"form-control",attrs:{type:"text",id:"coverLetter",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.coverLetter=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Enter Selection")]),a("option",{attrs:{value:"true"}},[t._v("Yes")]),a("option",{attrs:{value:"false"}},[t._v("No")])])])]),a("div",{staticClass:"form-row"},[a("label",{staticClass:"float-left required",attrs:{for:"description"}},[t._v("Description")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{maxlength:"250",rows:"7",cols:"100",type:"text",id:"description",placeholder:"Write your job description here...",required:""},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})])])]),a("div",{staticClass:"container",staticStyle:{"margin-top":"30px"}},[a("button",{staticClass:"btn btn-primary mr-3",on:{click:t.returnHome}},[t._v("Return Home")]),a("button",{staticClass:"btn btn-primary",on:{click:t.postJob}},[t._v("Post Job")])])])],1)},o=[],i=(a("96cf"),a("3b8d")),s=a("db0c"),n=a.n(s),l=(a("cadf"),a("551c"),a("f751"),a("097d"),a("353f")),c=a("3d8e"),u={name:"post-job",components:{NavigationBar:l["a"]},methods:{checkRequiredFields:function(){for(var t={title:this.title,salary:this.salary,location:this.location,coverLetter:this.coverLetter,description:this.description},e=n()(t),a=0;a<e.length;a++)if(null===e[a]||0===e[a].length)return!1;return!0},returnHome:function(){this.$router.push({path:"/dashboard"})},postJob:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!1!==this.checkRequiredFields()){t.next=5;break}return alert("All required fields must be filled"),t.abrupt("return");case 5:if(!(this.salary<0||0===this.salary.length)){t.next=8;break}return alert("Salary can not be negative"),t.abrupt("return");case 8:return t.prev=8,console.log(this.title),console.log(this.salary),console.log(this.location),console.log(this.coverLetter),console.log(this.description),e=this.$store.getters.userData,console.log(this.coverLetter),t.next=18,c["a"].postJob({employer:e.email,title:this.title,salary:this.salary,location:this.location,coverLetter:this.coverLetter,description:this.description});case 18:t.sent,t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](8),console.log(t.t0);case 24:this.$router.push({path:"/dashboard"});case 25:case"end":return t.stop()}},t,this,[[8,21]])}));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.title=null,this.salary=null,this.location=null,this.coverLetter=null,this.description=null},data:function(){return{title:null,salary:null,location:null,coverLetter:null,description:null}}},d=u,p=(a("96b3"),a("2877")),v=Object(p["a"])(d,r,o,!1,null,"ea65324c",null);e["default"]=v.exports},"96b3":function(t,e,a){"use strict";var r=a("7c5f"),o=a.n(r);o.a},"9e1c":function(t,e,a){a("7d6d"),t.exports=a("584a").Object.values},db0c:function(t,e,a){t.exports=a("9e1c")}}]);
//# sourceMappingURL=chunk-f1f96550.fd8731a1.js.map