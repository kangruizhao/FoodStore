export class User {
    constructor(public phone: string,
                public password: string,
                public name?: string,
                public id?: string,
                public cpassword?: string,
              ) {}
}
