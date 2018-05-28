export class Order {
    constructor(
                public address:string,
                public price: number,
                public foodids:string[],
                public id?:string
              ) {}
}
