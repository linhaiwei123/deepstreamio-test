cc.Class({
    extends: cc.Component,

    properties: {
        _client: null,
        playerPrefab: cc.Prefab,
        panel: cc.Node,
    },

    onLoad() {
        this._client = require('deepstream')('localhost:6020').login();
        //let statusRecord = this._client.record.getRecord('status');
        //this._client.record.listen('status/.*',this.playerOnlineStatusChanged.bind(this));
        this._client.presence.subscribe(this.playerOnlineStatusChanged.bind(this));
        window.client = this._client;
    },

    playerOnlineStatusChanged(name,isOnline){
            //let name = match.replace('status/','');
            if(isOnline){
                this.addPlayer(name);
            }else{
                this.removePlayer(name);
            }
    },

    addPlayer(name){
        let player = cc.instantiate(this.playerPrefab);
        this.panel.addChild(player);
        player.name = name;
        player.getComponent('player-script').init(name);
        
      
    },
    removePlayer(name){
        this.panel.getChildByName(name).destroy();
    }
});
