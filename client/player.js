class Player{
    
    constructor(n){
    this.hand=new Hand();
    this.n=n;
    if (this.n==0){

    }
    }
    
    play(state){
        this.myHand._state(state);
    }
    current(){
        this.myHand._state();
    }
}
module.exports=Player;