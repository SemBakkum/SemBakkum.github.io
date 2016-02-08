function GetData() {
    // 1. Instantiate XHR - Start 

    var xhr; 
    if (window.XMLHttpRequest) 
        xhr = new XMLHttpRequest(); 
    else if (window.ActiveXObject) 
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    else 
        throw new Error("Ajax is not supported by your browser");
    // 1. Instantiate XHR - End
    
    // 2. Handle Response from Server - Start
    xhr.onreadystatechange = function () {
        if (xhr.readyState < 4)
            document.getElementById('div1').innerHTML = "Loading...";
        else if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) 
                document.getElementById('div1').innerHTML = xhr.responseText;
        }
    }
    // 2. Handle Response from Server - End

    // 3. Specify your action, location and Send to the server - Start   
    xhr.open('GET', 'http://www.ajax-tutor.com/demo/data1.html');
    xhr.send(null);
    // 3. Specify your action, location and Send to the server - End
}