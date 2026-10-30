/* Android app bridge: HTML ka "downloads" save ab phone ke Share/Save sheet se hota hai. HTML ka koi text change nahi. */
(function(){
  var C=window.Capacitor;
  if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
  var P=C.Plugins||{};
  function b64(u8){var s='',k=0x8000;for(var i=0;i<u8.length;i+=k)s+=String.fromCharCode.apply(null,u8.subarray(i,i+k));return btoa(s)}
  window.claude={use:async function(n){
    if(n!=='downloads')throw new Error('unsupported');
    return {save:async function(o){
      var data=o.data instanceof Uint8Array?o.data:new Uint8Array(o.data);
      var w=await P.Filesystem.writeFile({path:o.filename,data:b64(data),directory:'CACHE'});
      try{await P.Share.share({title:o.filename,url:w.uri,dialogTitle:'Save / Share'})}
      catch(e){if(e&&/cancel/i.test(e.message||''))throw {code:'declined'}}
    }}
  }};
})();
