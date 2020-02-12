var hand;
class Player{
    
    constructor(n){
    this.hand=new Hand();
    if (n==0){

    }
    }
    play(state){
        this.hand._state(state);
    }
    current(){
        this.hand._state();
    }
}
