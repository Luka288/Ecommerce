import{q as n,r as l,s as h}from"./chunk-C23PGWET.js";import{ba as c,ha as r,p as m}from"./chunk-KZ3HFMOA.js";var k=(()=>{let t=class t{constructor(){this.alert=r(l),this.auth=r(h),this._savedItem$=new m([]),this.savedItem$=this._savedItem$.asObservable(),this.checkToken$=this.auth.refreshToken;let e=localStorage.getItem("Product");e&&this._savedItem$.next(JSON.parse(e))}get savedItem(){return this._savedItem$.getValue()}set savedItem(e){e?localStorage.setItem("Product",JSON.stringify(e)):localStorage.removeItem("Product"),this._savedItem$.next(e)}getWishlist(e){if(!localStorage.getItem(n.AccessToken)){this.alert.toast("Sign up to access all features.","error","red ");return}let a=this.savedItem,o=!1;for(let d of a)if(d._id===e._id){o=!0,this.alert.toast("Item is already in wishlsit","error","red");return}this.alert.toast("Item added","success","green"),o||(this.savedItem=[...a,e])}removeItem(e){this.savedItem.splice(e,1),this.savedItem=[...this.savedItem]}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"});let s=t;return s})();export{k as a};
