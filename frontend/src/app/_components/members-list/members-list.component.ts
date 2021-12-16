import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member.model';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  
  members?: Member[];
  currentMember: any;
  currentIndex = -1;
  username = '';

  constructor(private memberService: MemberService) { }

  ngOnInit() : void{
    this.retrieveMembers();
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

  refreshList(): void {
    this.retrieveMembers();
    this.currentMember = {};
    this.currentIndex = -1;
  }

  setActiveMembers(members: Member, index: number): void {
    this.currentMember = members;
    this.currentIndex = index;
  }

  removeAllMembers(): void {
    this.memberService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchUsername(): void {
    this.currentMember = {};
    this.currentIndex = -1;

    this.memberService.findByUsername(this.username)
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
