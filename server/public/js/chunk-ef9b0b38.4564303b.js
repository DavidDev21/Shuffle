(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ef9b0b38"],{"0603":function(t,e,o){t.exports=o.p+"img/shuffleLogo.7a71f28e.png"},"13c8":function(t,e,o){var a=o("c3a1"),s=o("36c3"),r=o("355d").f;t.exports=function(t){return function(e){var o,n=s(e),i=a(n),c=i.length,l=0,u=[];while(c>l)r.call(n,o=i[l++])&&u.push(t?[o,n[o]]:n[o]);return u}}},"353f":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar-expand-sm justify-content-between navbar-light bg-light fixed-top"},[a("router-link",{staticClass:"navbar-brand",attrs:{to:"dashboard"}},[a("img",{staticClass:"d-inline-block align-top",attrs:{src:o("0603"),height:"30",alt:"Shuffle"}})]),a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("div",{staticClass:"navbar-nav ml-auto justify-content-end"},[a("router-link",{staticClass:"nav-item nav-link",attrs:{to:"/profile"}},[t._v("Profile")]),a("router-link",{staticClass:"nav-item nav-link",attrs:{to:"/"}},[t._v("Logout")])],1)])],1)},s=[],r={name:"NavigationBar",data:function(){return{links:[{id:0,route:"home",accessLevel:"all"}]}}},n=r,i=o("2877"),c=Object(i["a"])(n,a,s,!1,null,"766d66c8",null);e["a"]=c.exports},"73e9":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container"},[o("NavigationBar"),!1===t.showUpdateForm?o("div",[t._m(0),o("div",{staticClass:"row justify-content-center"},[o("table",{staticClass:"table table-hover table-bordered"},[t._m(1),o("tbody",t._l(this.jobs,function(e){return o("tr",{key:e.job_id,attrs:{scope:"row"}},[o("td",[t._v(t._s(e.job_id))]),o("td",[t._v(t._s(e.title))]),o("td",[t._v(t._s(e.location))]),!0===e.requireCoverLetter?o("td",[t._v("Yes")]):t._e(),!1===e.requireCoverLetter?o("td",[t._v("No")]):t._e(),o("td",[t._v(t._s(e.numTotalApplicants))]),o("td",[t._v(t._s(e.status))]),o("td",[t._v(t._s(e.createdAt))]),o("td",[o("button",{staticClass:"btn btn-primary",on:{click:function(o){return t.manageJob(e)}}},[t._v("Manage")]),"closed"===e.status?o("button",{staticClass:"btn btn-success",on:{click:function(o){return t.changeJobStatus(e.job_id,"open")}}},[t._v("Reopen Job")]):t._e(),"open"===e.status?o("button",{staticClass:"btn btn-danger",on:{click:function(o){return t.changeJobStatus(e.job_id,"closed")}}},[t._v("Close Job")]):t._e()])])}),0)]),void 0===this.jobs||0===this.jobs.length?o("h5",[t._v("No jobs have been posted")]):t._e()])]):t._e(),!0===t.showUpdateForm?o("div",[o("div",{staticClass:"row justify-content-center"},[o("h3",[t._v("Job ID: "+t._s(t.selectJob.job_id))])]),o("div",{staticClass:"row justify-content-center"},[o("h3",[t._v("Title: "+t._s(t.selectJob.title))])]),o("div",{staticClass:"row justify-content-center mt-3"},[o("form",{attrs:{autocomplete:"off",enctype:"multipart/form-data"}},[o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-6"},[o("label",{staticClass:"float-left required",attrs:{for:"location"}},[t._v("Location")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.selectJob.location,expression:"selectJob.location"}],staticClass:"form-control",attrs:{type:"text",id:"location",placeholder:"Enter Location",required:""},domProps:{value:t.selectJob.location},on:{input:function(e){e.target.composing||t.$set(t.selectJob,"location",e.target.value)}}})]),o("div",{staticClass:"form-group col-md-6"},[o("label",{staticClass:"float-left required",attrs:{for:"salary"}},[t._v("Salary")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.selectJob.salary,expression:"selectJob.salary"}],staticClass:"form-control",attrs:{min:"0",type:"number",id:"salary",placeholder:"Enter Salary",required:""},domProps:{value:t.selectJob.salary},on:{input:function(e){e.target.composing||t.$set(t.selectJob,"salary",e.target.value)}}})])]),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-12"},[o("label",{staticClass:"float-left required",attrs:{for:"coverLetter"}},[t._v("Cover Letter?")]),o("select",{directives:[{name:"model",rawName:"v-model",value:t.selectJob.requireCoverLetter,expression:"selectJob.requireCoverLetter"}],staticClass:"form-control",attrs:{type:"text",id:"coverLetter",required:""},on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.$set(t.selectJob,"requireCoverLetter",e.target.multiple?o:o[0])}}},[o("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Enter Selection")]),o("option",{attrs:{value:"true"}},[t._v("Yes")]),o("option",{attrs:{value:"false"}},[t._v("No")])])])]),o("div",{staticClass:"form-row"},[o("label",{staticClass:"float-left required",attrs:{for:"description"}},[t._v("Description")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.selectJob.description,expression:"selectJob.description"}],staticClass:"form-control",attrs:{rows:"7",cols:"100",type:"text",id:"description",placeholder:"Write your job description here...",required:""},domProps:{value:t.selectJob.description},on:{input:function(e){e.target.composing||t.$set(t.selectJob,"description",e.target.value)}}})])])]),o("div",{staticClass:"row mt-3 justify-content-center"},[o("button",{staticClass:"btn btn-primary mr-3",on:{click:t.toggleUpdateForm}},[t._v("Return")]),o("button",{staticClass:"btn btn-primary",on:{click:t.updateJob}},[t._v("Save Changes")])])]):t._e()],1)},s=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row justify-content-center"},[o("h3",[t._v("Job Postings")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("thead",[o("tr",[o("th",{attrs:{scope:"col"}},[t._v("Job ID")]),o("th",{attrs:{scope:"col"}},[t._v("Job Title")]),o("th",{attrs:{scope:"col"}},[t._v("Location")]),o("th",{attrs:{scope:"col"}},[t._v("Cover Letter?")]),o("th",{attrs:{scope:"col"}},[t._v("Total Number of Applicants")]),o("th",{attrs:{scope:"col"}},[t._v("Status")]),o("th",{attrs:{scope:"col"}},[t._v("Posted At")]),o("th",{attrs:{scope:"col"}},[t._v("Options")])])])}],r=o("cebc"),n=(o("96cf"),o("3b8d")),i=o("db0c"),c=o.n(i),l=o("353f"),u=o("915a"),p={name:"view-job-posts",components:{NavigationBar:l["a"]},methods:{toggleUpdateForm:function(){this.showUpdateForm=!this.showUpdateForm},formValidation:function(){for(var t=c()(this.selectJob),e=0;e<t.length;e++)if(null===t[e]||0===t[e].length)return!1;return!0},getJobPostings:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u["a"].getJobPostings({email:this.$store.getters.userData.email});case 3:e=t.sent,this.jobs=e.data,console.log(this.jobs),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}},t,this,[[0,8]])}));function e(){return t.apply(this,arguments)}return e}(),changeJobStatus:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e,o){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u["a"].changeJobStatus({job_id:e,status:o});case 3:t.sent,this.getJobPostings(),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}},t,this,[[0,7]])}));function e(e,o){return t.apply(this,arguments)}return e}(),manageJob:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.showUpdateForm=!0,this.selectJob=e;case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),updateJob:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(this.formValidation()),!1!==this.formValidation()){t.next=6;break}return alert("Required Fields must be filled"),t.abrupt("return");case 6:if(!(this.selectJob.salary<0||0===this.selectJob.salary.length)){t.next=9;break}return alert("Salary can not be negative / empty"),t.abrupt("return");case 9:return t.prev=9,console.log(this.selectJob),t.next=13,u["a"].updateJobPost(Object(r["a"])({},this.selectJob));case 13:t.sent,console.log("I am back"),this.showUpdateForm=!1,this.selectJob=null,this.getJobPostings(),t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](9),console.log(t.t0);case 23:case"end":return t.stop()}},t,this,[[9,20]])}));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){console.log("I am mounted: View Applicant"),this.showUpdateForm=!1,this.selectJob=null,this.getJobPostings()},data:function(){return{jobs:null,selectJob:null,showUpdateForm:!1}}},b=p,d=(o("b8d0"),o("2877")),v=Object(d["a"])(b,a,s,!1,null,"1f0926f0",null);e["default"]=v.exports},"7d6d":function(t,e,o){var a=o("63b6"),s=o("13c8")(!1);a(a.S,"Object",{values:function(t){return s(t)}})},"915a":function(t,e,o){"use strict";var a=o("7424");e["a"]={getApplicant:function(t){return Object(a["a"])().post("get-applicant",t)},updateApplicationStatus:function(t){return Object(a["a"])().post("change-app-status",t)},getJobPostings:function(t){return Object(a["a"])().post("get-job-postings",t)},changeJobStatus:function(t){return Object(a["a"])().post("change-job-status",t)},updateJobPost:function(t){return Object(a["a"])().post("update-job",t)},getProfile:function(t){return Object(a["a"])().post("get-profile",t)},updateProfile:function(t){return Object(a["a"])().post("update-employer-profile",t)}}},"9e1c":function(t,e,o){o("7d6d"),t.exports=o("584a").Object.values},b8d0:function(t,e,o){"use strict";var a=o("b8f3"),s=o.n(a);s.a},b8f3:function(t,e,o){},db0c:function(t,e,o){t.exports=o("9e1c")}}]);
//# sourceMappingURL=chunk-ef9b0b38.4564303b.js.map