export class AllOrder {
    constructor(
                public address:string,
                public price: number,
                public foodids:string[],
                public id?:string
                public username?:string
              ) {}
}
