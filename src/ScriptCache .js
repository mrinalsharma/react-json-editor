export class ScriptCache {
    constructor(scriptsMap, callback) {
        scriptsMap = new Map(scriptsMap);
        this.callback = callback;
        this.load(scriptsMap,callback)

    }

    load(scriptsMap,callback)
    {
        let promises = [];
        scriptsMap.forEach((tag,script) => {
            promises.push(this.loadSrc(script,tag))
        });
        Promise.all(promises).then((values) => {console.log("Files loaded successfully."+ values);callback("SUCCESS")}).catch(()=>{callback("FAILED")});
    }
    loadSrc(src, tag) {
        if(tag ==='script')
        {
            return this.scriptTag(src)
            .then((src) => {
                return src;
            })
            .catch((src) => {
                throw new Error("Loading of Script "+src+ " failed.");
            })
        }
        else if(tag ==='css') {
            return this.linkTag(src)
            .then((src) => {
                return src;
            })
            .catch((src) => {
                throw new Error("Loading of Link "+src+ " failed.");
            })

        }
      }

      scriptTag(src, cb) {
      return new Promise((resolve, reject) => {
        let resolved = false, errored = false,
        head = document.getElementsByTagName('head')[0],
        tag = document.createElement('script');
        tag.src = src;
        tag.type = 'text/javascript';
        tag.async = false; // Load in order
  
        const handleCallback = tag.onreadystatechange = function() {
          if (resolved) return handleLoad();
          if (errored) return handleReject();
          const state = tag.readyState;
          if (state === 'complete') {
            handleLoad()
          } else if (state === 'error') {
            handleReject()
          }
        }
  
        const handleLoad = (evt) => {resolved = true;resolve(src);}
        const handleReject = (evt) => {errored = true; reject(src) }
  
        tag.addEventListener('load', handleLoad)
        tag.addEventListener('error', handleReject);

        head.appendChild(tag);
        return tag;
      });
    }

    linkTag(src, cb) {
        return new Promise((resolve, reject) => {
          let resolved = false, errored = false,
          head = document.getElementsByTagName('head')[0],
          tag = document.createElement('link');
 
          tag.type = 'text/css';
          tag.async = false; // Load in order
          tag.rel = "stylesheet";
          tag.href = src;
    
          const handleCallback = tag.onreadystatechange = function() {
            if (resolved) return handleLoad();
            if (errored) return handleReject();
            const state = tag.readyState;
            if (state === 'complete') {
              handleLoad()
            } else if (state === 'error') {
              handleReject()
            }
          }
    
          const handleLoad = (evt) => {resolved = true;resolve(src);}
          const handleReject = (evt) => {errored = true; reject(src) }
    
          tag.addEventListener('load', handleLoad)
          tag.addEventListener('error', handleReject);
          head.appendChild(tag);
          return tag;
        });
      }
  }