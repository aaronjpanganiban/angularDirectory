import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean = false;
  public contacts:MyContact[] = [];
  public isItUpdate:boolean = false;
  public contactId:string | null = null;
  public contact : MyContact = {} as MyContact;
  selectedContact:any = new MyContact();
  buttonTitle:string = "Hide";
  visible:boolean = false;
  searchText: string = '';
  currentItem:any = this.contacts.length;

  constructor(private contService:ContactService, private router:Router) { 
  }


  ngOnInit(): void {
    this.getAllContactData(); 
  }

  getAllContactData(){
    this.loading = true;
    this.contService.getAllContacts().subscribe((data:MyContact[])=>{
      this.contacts = data;
      this.loading = false;
      this.currentItem= this.contacts.length;
    })
  }
  deleteContact(contactId:string | undefined){
    if(contactId){
      this.contService.deleteContacts(contactId).subscribe((data:{})=>{
        this.getAllContactData();        
      });
    }
  }
 
onSearchTextEntered(searchValue: string){
  this.searchText = searchValue;
}

// addContact(_contact: MyContact) {
//   window.location.reload();
//   this.router.navigate(['/']); 
// }

// showhideUtility(){
//   this.visible = this.visible?false:true;
//   this.buttonTitle = this.visible?"Hide":"Show";
// }

// showDetails(contact:MyContact) {
//  this.visible = true;
//  this.isItUpdate = true;
//  this.selectedContact=Object.assign({},contact)

// }

// update(contact: MyContact) {  
// this.contacts = this.contacts.map(cont => {
//  if(contact.id === cont.id) {
//    return contact;
//  }
//  return cont;
// })
// window.location.reload();  
// }

}
