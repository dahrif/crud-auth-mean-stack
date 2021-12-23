import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MemberService } from 'src/app/_services/member.service';
import { Member } from 'src/app/_models/member.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  content?: string;
  members?: Member[];
  currentUser: any;

  constructor(private userService: UserService, private memberService: MemberService,private tokenStorageService: TokenStorageService,private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.retrieveMembers();
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.router.navigate(['/login'])
        return false      }
    );
  }

  retrieveMembers(): void {
    this.memberService.getAll()
      .subscribe(
        data => {
          this.members = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}