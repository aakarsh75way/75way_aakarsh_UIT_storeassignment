export  type Inputs = {
    email: string
    password: string
    confirmPassword:string
    username:string
    preference: 'user' | 'employee';
  }

  export type Login={
    email:string,
    password:string
  }
  export type RLogin={
    accessToken:string,
    findUser:{
      _id:string,
      email:string,
      password:string,
      username:string,
      role:string,
      preference:string
      __v:number
    }
  }
  export type Param={
    _id:string
  }