cc.Class({
    extends: cc.Component,

    properties: {
        _client: null,
        _record: null,
    },

    onLoad() {
        playerName = window.playerName;
        this._client = require('deepstream')('localhost:6020').login({username: playerName});
        //this._client.event.subscribe('status/player-name',function(){});
        //let statusRecord = this._client.record.getRecord('status/player-name');
        //statusRecord.subscribe('status/player-name');
        this._record = this._client.record.getRecord('player/'+playerName);

        this.node.on('touchstart',this.onTouch,this);
        this.node.on('touchmove',this.onTouch,this);
        this.node.on('touchend',this.onTouchEnd,this);
        this.node.on('touchcancel',this.onTouchEnd,this);
    },

    onTouch(e){
        let vector = this.node.convertToNodeSpaceAR(e.getLocation());
        let distance = vector.mag();
        if(distance <= this.node.width / 2){
            vector = cc.pNormalize(vector);
            this._record.set('move',{move:true,vector:vector});
        }
    },

    onTouchEnd(){
        this._record.set('move',{move:false});
    }

});
