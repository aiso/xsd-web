import Promise from 'nd-promise'
import jsLoader from './js-loader'
import geohash from './geohash'

function extendBMap(){
    BMap.Map.prototype.geohash2point = function(gh){
        var latlng = geohash.decode(gh);
        return new BMap.Point(latlng.longitude[1], latlng.latitude[1]);
    }

    BMap.Map.prototype.createLabel = function(content, style){
        var label = new BMap.Label(content,{ offset:new BMap.Size(20,-20) });
        style = Object.assign({
            color : "black",
            fontSize : "14px",
            height : "20px",
            lineHeight : "20px",
            padding:"0 5px"
        }, style);

        label.setStyle(style);
        return label;
    }

    BMap.Map.prototype.addMarker = function(opts){
        var marker;
        if(!!opts.icon)
            marker = new BMap.Marker(this.geohash2point(opts.geohash), { icon:opts.icon });
        else
            marker = new BMap.Marker(this.geohash2point(opts.geohash));
        if(!!opts.title)
            marker.setTitle(opts.title);
        if(!!opts.label){
            var label = this.createLabel(opts.label);
            marker.setLabel(label);
        }
        if(!!opts.info){
            var infoWindow = new BMap.InfoWindow(opts.info);
            marker.addEventListener("click", function(){
                this.openInfoWindow(infoWindow);
            });
        }
        this.pushOverlay(marker);
        return marker;
    }

    BMap.Map.prototype.recoverOverlay = function(overlays){
        this.cleanOverlay();
        for(var i=0;i<overlays.length;i++){
            this.pushOverlay(overlays[i]);
        }
    }

    BMap.Map.prototype.pushOverlay = function(marker){
        this.addOverlay(marker);
        this.overlayContainer = this.overlayContainer||[];
        this.overlayContainer.push(marker);
    }

    BMap.Map.prototype.cleanOverlay = function(overlay){
        if(!this.overlayContainer) return;

        if(!!overlay)
            this.removeOverlay(overlay);
        else{
            for(var i=0;i<this.overlayContainer.length;i++){
                this.removeOverlay(this.overlayContainer[i]);
            }
        }
    }

    BMap.Map.prototype.createPin = function(url, opts){
        opts = Object.assign({ width:24,height:24 }, opts);
        return new BMap.Icon(url, new BMap.Size(opts.width,opts.height));
    }

    BMap.Map.prototype.menuItemAddNode = function(manager, callback){
        var menuItem = new BMap.MenuItem('添加节点',function(point){
            $rootScope.$apply(function(){
                ui.alert({ info:'请输入节点名称：', mode:'input' }).then(function(name){
                    var node = { id:0, name, manager, geohash:geohash.encode(point.lat, point.lng) }
                    data.update('node', node).then(callback).catch(function(data){
                        ui.alert(data.error.message);
                    })
                })
            })
        },100);
        return menuItem;
    }

}


var BaiduMap = {
    _init:false,
    getMap(){
        return new Promise((resolve, reject) => {
            if(this._init){
                resolve(BMap)
            }else{
                jsLoader.jsonp('http://api.map.baidu.com/api?v=2.0&ak=yEvTBWYoT9gdsGnZyohjnzva').then(function(){
                    extendBMap();
                    BaiduMap._init = true;
                    resolve(BMap)
                });
            }
        })
    },
    init(el, opts){
        opts = Object.assign({
            zoom:13
        }, opts);

        return this.getMap().then(function(BMap){
            var map = new BMap.Map(el);            // 创建Map实例
            //var map = new XsdMap(opts.id);
            map.enableScrollWheelZoom();
            var point;
            if(!!opts.geohash)
                point = BaiduMap.geohash2point(opts.geohash);
            else
                point = new BMap.Point(opts.lng, opts.lat);    // 创建点坐标
            map.centerAndZoom(point,opts.zoom);
            map.addControl(new BMap.NavigationControl());

            return map
        });

    },
    geohash2point(gh){
        var latlng = geohash.decode(gh);
        return new BMap.Point(latlng.longitude[1], latlng.latitude[1]);
    },
    createLabel(content, style){
        var label = new BMap.Label(content,{ offset:new BMap.Size(20,-20) });
        style = Object.assign({
            color : "black",
            fontSize : "16px",
            height : "24px",
            lineHeight : "24px",
            padding:"0 5px"
        }, style);

        label.setStyle(style);
        return label;
    },
    show(opts){
        opts = Object.assign(opts, {
            zoom:15
        });
        this.getMap().then(function(BMap){
            var map = new BMap.Map(opts.id);            // 创建Map实例
            var point = new BMap.Point(opts.lng, opts.lat);    // 创建点坐标
            map.centerAndZoom(point,opts.zoom);
            map.addControl(new BMap.NavigationControl());

            if(!!opts.title || !!opts.info){
                var infoWindow = new BMap.InfoWindow((!!opts.info)?opts.info:'', {
                    width : 100,     // 信息窗口宽度
                    height: 50,     // 信息窗口高度
                    title : (!!opts.title)?opts.title:'',  // 信息窗口标题
                    offset: new BMap.Size(0, -25)
                });  // 创建信息窗口对象
                map.openInfoWindow(infoWindow, point);
            }

            var marker = new BMap.Marker(point);        // 创建标注
            marker.addEventListener("click", function(){
                map.openInfoWindow(infoWindow, point);
            });
            map.addOverlay(marker);

        });
    },
    geocoder(address){
        return new Promise((resolve, reject) => {
            this.getMap().then(function(BMap){
                var myGeo = new BMap.Geocoder();
                myGeo.getPoint(address, function(point){
                    resolve(point);
                });
            });
        })
    }
}

export default BaiduMap;