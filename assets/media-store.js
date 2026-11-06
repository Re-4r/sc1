/* Browser-local file storage for the prototype. NOT server storage. */
(()=>{'use strict';const DB='masaha_local_media_v1',STORE='files';
function open(){return new Promise((resolve,reject)=>{if(!('indexedDB' in window))return reject(new Error('IndexedDB unavailable'));let request=indexedDB.open(DB,1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE)};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function transact(mode,action){let db=await open();return new Promise((resolve,reject)=>{let tx=db.transaction(STORE,mode),req=action(tx.objectStore(STORE));req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);tx.oncomplete=()=>db.close();tx.onerror=()=>reject(tx.error)})}
window.MasahaFiles={put:(id,file)=>transact('readwrite',s=>s.put(file,id)),get:id=>transact('readonly',s=>s.get(id)),remove:id=>transact('readwrite',s=>s.delete(id))};
})();
