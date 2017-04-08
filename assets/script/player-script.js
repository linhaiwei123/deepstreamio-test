cc.Class({
    extends: cc.Component,

    properties: {
        _client: null,
        _record: null,
        _speed: null,
    },

   
    init(name) {
        this.node.getChildByName('player-name-label').getComponent(cc.Label).string = name;
        this._speed = cc.v2();
        this.node.position = cc.v2();
        this._client = window.client;
        this._record = this._client.record.getRecord('player/' + name);
        this._record.subscribe('move',this.onMove.bind(this));
    },

    onMove(data){
        if(data.move){
            this._speed = data.vector;
        }else{
            this._speed = cc.v2();
        }
    },

    update(dt){
        this.node.position = cc.pAdd(this.node.position,this._speed);
    }

});
