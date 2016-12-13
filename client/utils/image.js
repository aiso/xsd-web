import Promise from 'nd-promise'

function resizeDataUrl(dataUrl, callback, opts){
    opts = Object.assign({
        size:500
    }, opts);
    var img = new Image();
    img.onload = function(){
        //console.log('image width='+img.width+',height:'+img.height);
        if(img.width > opts.size){
            var q = document.createElement("canvas");
            var o = q.getContext("2d");
            var scale = opts.size/img.width;
            q.width = opts.size;
            q.height = (opts.size*img.height)/img.width;
            o.drawImage(img, 0, 0, img.width, img.height, 0, 0, q.width, q.height);
            var v = q.toDataURL('image/jpeg', 0.75).replace(/data:image\/jpeg;base64,/, '');
            q = null;
            callback(v);
        }
        else
            callback(dataUrl);
    };
    img.src = "data:image/jpeg;base64," + dataUrl;
}

function scaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox){
    var result = { width: 0, height: 0, fScaleToTargetWidth: true };
    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }
    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
        fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);
    return result;
}


function cropImage(img, width, height, letterBox){
    letterBox = (typeof letterBox === 'undefined')?true:letterBox;

    var w = img.width;
    var h = img.height;
    var tw = width;
    var th = height;

    // compute the new size and offsets
    var result = scaleImage(w, h, tw, th, letterBox);

    // adjust the image coordinates and size
    img.style.width = result.width+'px';
    img.style.height = result.height+'px';
    img.style.left = result.targetleft+'px';
    img.style.top = result.targettop+'px';

    //console.log('left='+result.targetleft+",top="+result.targettop);
}

function select(){
    let deferred = null;

    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.onchange = function() {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            //const encodedData = reader.result.replace(/data:image\/jpeg;base64,/, '');
            fileInput.remove();
            deferred.resolve({ file, dataUrl:reader.result });
        };
    };
    fileInput.click();

    return new Promise((resolve, reject) => {
        deferred = { resolve, reject }
    })
}

export default {
  resizeDataUrl,
  scaleImage,
  cropImage,
  select
}