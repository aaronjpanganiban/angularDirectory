import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading:boolean = false;
  public contactId:string | null = null;
  public contact : MyContact = {} as MyContact;
    

  constructor(private activatedRoute:ActivatedRoute, private contService:ContactService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.contService.getContacts(this.contactId).subscribe((data:MyContact)=>{
        this.contact = data;
        this.loading = false;
      })
    }     
  }

onSubmit(_contactForm: { value: any; }) {
  if(this.contactId){
    this.contService.updateContacts(this.contact, this.contactId).subscribe((_data:MyContact)=>{
      this.router.navigate(['/']).then(()=>{
      });     
    })
  }
}
}
