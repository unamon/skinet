"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[481],{3481:(S,u,i)=>{i.r(u),i.d(u,{AccountModule:()=>J});var m=i(6895),n=i(433),t=i(1571),p=i(9479),l=i(2496),c=i(4015);let d=(()=>{class e{constructor(o,r,a){this.accountService=o,this.router=r,this.activatedRoute=a,this.loginForm=new n.cw({email:new n.NI("",[n.kI.required,n.kI.email]),password:new n.NI("",n.kI.required)}),this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl||"/shop"}onSubmit(){this.accountService.login(this.loginForm.value).subscribe({next:()=>this.router.navigateByUrl(this.returnUrl)})}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(p.B),t.Y36(l.F0),t.Y36(l.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-login"]],decls:11,vars:7,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3"],[3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-3"],[3,"formControl","label"],[3,"formControl","type","label"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-3",3,"disabled"]],template:function(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return r.onSubmit()}),t.TgZ(3,"div",3)(4,"h1",4),t._uU(5,"Login"),t.qZA()(),t._UZ(6,"app-text-input",5)(7,"app-text-input",6),t.TgZ(8,"div",7)(9,"button",8),t._uU(10,"Sign in"),t.qZA()()()()()),2&o&&(t.xp6(2),t.Q6J("formGroup",r.loginForm),t.xp6(4),t.Q6J("formControl",r.loginForm.controls.email)("label","Email address"),t.xp6(1),t.Q6J("formControl",r.loginForm.controls.password)("type","password")("label","Password"),t.xp6(2),t.Q6J("disabled",r.loginForm.invalid))},dependencies:[n._Y,n.JJ,n.JL,n.oH,n.sg,c.t]}),e})();var g=i(4999),f=i(5698),v=i(3900),h=i(4004);function b(e,s){if(1&e&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&e){const o=s.$implicit;t.xp6(1),t.Oqu(o)}}function y(e,s){if(1&e&&(t.TgZ(0,"div",10),t.YNc(1,b,2,1,"li",11),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngForOf",o.errors)}}const C=[{path:"login",component:d},{path:"register",component:(()=>{class e{constructor(o,r,a){this.fb=o,this.accountService=r,this.router=a,this.errors=null,this.complexPassword="(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$",this.registerForm=this.fb.group({displayName:["",n.kI.required],email:["",[n.kI.required,n.kI.email],[this.validateEmailNotTaken()]],password:["",[n.kI.required,n.kI.pattern(this.complexPassword)]]})}onSubmit(){this.accountService.register(this.registerForm.value).subscribe({next:()=>this.router.navigateByUrl("/shop"),error:o=>this.errors=o.errors})}validateEmailNotTaken(){return o=>o.valueChanges.pipe((0,g.b)(1e3),(0,f.q)(1),(0,v.w)(()=>this.accountService.checkEmailExists(o.value).pipe((0,h.U)(r=>r?{emailExists:!0}:null))))}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(n.qu),t.Y36(p.B),t.Y36(l.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-register"]],decls:13,vars:10,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3"],[3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-3"],[3,"formControl","label"],[3,"formControl","type","label"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-3",3,"disabled"],["class","text-danger list-unstyled",4,"ngIf"],[1,"text-danger","list-unstyled"],[4,"ngFor","ngForOf"]],template:function(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return r.onSubmit()}),t.TgZ(3,"div",3)(4,"h1",4),t._uU(5,"Sign up"),t.qZA()(),t._UZ(6,"app-text-input",5)(7,"app-text-input",5)(8,"app-text-input",6),t.TgZ(9,"div",7)(10,"button",8),t._uU(11,"Sign up"),t.qZA()(),t.YNc(12,y,2,1,"div",9),t.qZA()()()),2&o&&(t.xp6(2),t.Q6J("formGroup",r.registerForm),t.xp6(4),t.Q6J("formControl",r.registerForm.controls.displayName)("label","Display name"),t.xp6(1),t.Q6J("formControl",r.registerForm.controls.email)("label","Email address"),t.xp6(1),t.Q6J("formControl",r.registerForm.controls.password)("type","password")("label","Password"),t.xp6(2),t.Q6J("disabled",r.registerForm.invalid),t.xp6(2),t.Q6J("ngIf",r.errors))},dependencies:[m.sg,m.O5,n._Y,n.JJ,n.JL,n.oH,n.sg,c.t]}),e})()}];let x=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[l.Bz.forChild(C),l.Bz]}),e})();var F=i(4466);let J=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.ez,x,F.m]}),e})()}}]);