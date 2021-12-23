import { Injectable } from '@angular/core';
import {User} from "./model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //just two records at the very beginning
  initData(){
    if(localStorage.getItem('data')==null)
      localStorage.setItem('data', JSON.stringify([
        {"id": 1,"name": "Polar","surname": "Bear"},
        {"id": 2,"name": "Black","surname": "Bear"}
      ]));
  }

  //get all users from local storage
  getAll(): User[] {
    let users: User[] = []
    let data = localStorage.getItem('data')
    if (data != null) {
      let us = JSON.parse(data)
      users = us.map((it: {id: number; name: string;surname: string;}) => new User(it.id,it.name,it.surname))
    }
    return users
  }

  //create a user
  create(user: User) {
    let data = localStorage.getItem('data')
    if (data != null) {
      let users = JSON.parse(data)
      let nextId = users.length>0?(users[users.length-1].id + 1):1;
      users.push({id:nextId,name:user.name,surname:user.surname})
      localStorage.setItem('data', JSON.stringify(users))
    }
  }

  update(user: User) {
    let data = localStorage.getItem('data')
    if (data != null) {
      let users = JSON.parse(data)
      for (let i = 0; i < users.length ; i++) {
        if(users[i].id==user.id)
          users[i] = {id:user.id,name:user.name,surname:user.surname}
      }
      localStorage.setItem('data', JSON.stringify(users))
    }
  }

  delete(id:number) {
    let data = localStorage.getItem('data')
    if (data != null) {
      let users = JSON.parse(data)
      let newUsers = []
      for (let i = 0; i < users.length ; i++) {
        if(users[i].id!=id)
          newUsers.push(users[i])
      }
      localStorage.setItem('data', JSON.stringify(newUsers))
    }
  }
}
