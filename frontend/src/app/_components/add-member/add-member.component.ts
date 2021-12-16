import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member.model';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  member: Member = {
    username: '',
    email: '',
    password: ''
  };
  submitted = false;

  constructor( private memberService: MemberService) { }

  ngOnInit(): void { }

  saveMember(): void{
    const data = {
      username : this.member.username,
      email: this.member.email,
      password: this.member.password
    };

    this.memberService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      err =>{
        console.log(err);
        
      });
  }

  newMember() : void {
    this.submitted = false;
    this.member = {
      username : '',
      email: ''
    };
  }
}
