/**
 * メッセージヒストリークラス
 * メッセージを指定数内になるように管理、保存する。
 * ※strage.jsのインクルードが必須
 */
MessageHistory: {
    /**
     * コンストラクタ
     */
    MessageHistory = function(storeMessageCount) {
    	if(!storeMessageCount){
	    	STORE_MESSAGE_COUNT = storeMessageCount; // 保持数を設定する
		}
		
        if (!store.enabled) {
            console.log('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
        }
    }

    // prototype をローカル変数へ
    var p = MessageHistory.prototype;

    // メッセージの格納キー
	var STORE_KEY = 'message_history';

    // 保持するメッセージ数
	var STORE_MESSAGE_COUNT = 20;

    /**
     * 前方のメッセージを取得する
     */
    MessageHistory.getHeadMessage = function (){
        var messages = store.get(STORE_KEY);
        
        if(!messages || messages.length == 0){
        	return null;
        }
        
        return messages.slice(0, 1);
	}

    /**
     * 後方のメッセージを取得する
     */
    MessageHistory.getBackMessage = function (){
        var messages = store.get(STORE_KEY);
        
        if(!messages || messages.length == 0){
        	return null;
        }
        
        return messages.slice(-1);
	}
	
    /**
     * メッセージを前方に追加する。
     * もしメッセージが規定値以上の場合は追加しない。
     * 引数はメッセージ配列
     */
    MessageHistory.prepend = function (message){
        var messages = store.get(STORE_KEY);
        
        if(!messages){
        	messages = [];
        }

        if(messages.length < STORE_MESSAGE_COUNT){ // メッセージが指定数を超過
            return;
        }

    	messages.unshift(message);
        store.set(STORE_KEY, messages);
    }

    /**
     * メッセージを後方に追加する。
     * 引数はメッセージ配列
     */
    MessageHistory.append = function (message){
        var messages = store.get(STORE_KEY);
        
        if(!messages){
        	messages = [];
        }

        if(messages.length < STORE_MESSAGE_COUNT){ // メッセージが指定数以下
        	messages.push(message);
        } else {
            messages = messages.slice(1, STORE_MESSAGE_COUNT); // 前方を切りだす
        	messages.push(message);
        }

        store.set(STORE_KEY, messages);
    }

    /**
     * メッセージ配列を返却する。
     */
    MessageHistory.getMessages = function (){
        return store.get(STORE_KEY);
    }

    /**
     * メッセージ配列をリセットする。
     */
    MessageHistory.resetMessages = function (){
        return store.remove(STORE_KEY);
    }
};