import {Component} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./model/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';

  users: User[] = [];
  usersFiltered: User[]= [] ;
  prefix: string = '';
  name: string = '';
  surname: string = '';
  userIdSelected: number | undefined;

  constructor(private manageNamesService: UserService){}
  ngOnInit(){
    this.manageNamesService.initData()
    this.refreshView()
  }

  filter() {
    if(this.prefix.length>0)
      this.usersFiltered = this.users.filter(user => user.surname.toUpperCase().startsWith(this.prefix.toUpperCase()))
    else
      this.usersFiltered = this.users
  }

  create() {
    let user = new User(-1,this.name,this.surname);
    this.manageNamesService.create(user);
    this.refreshView()
  }

  update() {
    if(this.userIdSelected) {
      let user = new User(this.userIdSelected,this.name,this.surname);
      this.manageNamesService.update(user);
      this.refreshView()
    }
  }

  delete(){
    if(this.userIdSelected) {
      console.log("user selected", this.userIdSelected)
      this.manageNamesService.delete(this.userIdSelected);
      this.userIdSelected = undefined
      this.refreshView()
    }
  }

  refreshView(){
    this.users = this.manageNamesService.getAll()
    this.filter()
  }

}
