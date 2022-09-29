import {Object,Property} from 'fabric-contract-api';


@Object()
export class ComunityStuct{
    @Property()
    public readonly type: string = "comunity"
    @Property()
    public comunityId:string;
    @Property()
    public  podList:string[];
    constructor(comunityId:string,podList:string[]){
        this.comunityId=comunityId;
        this.podList=podList;
    }

}


