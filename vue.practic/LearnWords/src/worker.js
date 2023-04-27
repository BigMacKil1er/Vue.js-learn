
onconnect = function(e){
    let port = e.ports[0]

    port.onmessage = function(e) {
        let result = e.data
        port.postMessage(222)
    }
}