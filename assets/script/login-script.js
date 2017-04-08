cc.Class({
    extends: cc.Component,

    properties: {
        nameEditBox: cc.EditBox,
        _sceneLoading: false,
    },

    onLogin(){
        let name = this.nameEditBox.string;
        if(name.length == ''){
            return;
        }
        window.playerName = name;
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('control-scene');
        }
    }
});
