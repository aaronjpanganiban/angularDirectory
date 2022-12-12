import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contactId:string | null = null;
  // @Input() isupdate:boolean = false;
  // @Input() contact = {} as MyContact;
  // @Output() contactChange =new EventEmitter<MyContact>();
  // @Output() contactAdd =new EventEmitter<MyContact>();
  

  contactForm = this.fb.group({
  id:  [''],
  name:  ['',[Validators.required,Validators.minLength(3)]],
  username:  ['',[Validators.required,Validators.minLength(3)]],
  email: ['',[Validators.required,Validators.email,Validators.minLength(10)]],
  mobile: ['',[Validators.minLength(11)]],
  company: [''],
  title: [''],
  photo: [''],
  phone: ['',[Validators.required,Validators.minLength(11)]],
  address: [''],
  website: ['']
  })
 

  constructor(private contService:ContactService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {}



  addContact() {
  this.contService.CreateContacts(this.contactForm.value).subscribe((data:MyContact)=>{     
      this.router.navigate(['/'])
    })

      
}

  // ngOnChanges(): void {
  //   if(this.isupdate === true){
  //     this.contactForm.patchValue({
  //       id:this.contact.id,
  //       name:this.contact.name,
  //       email:this.contact.email,
  //       mobile:this.contact.mobile,
  //       company:this.contact.company.name,
  //       title:this.contact.title,
  //       photo:this.contact.photo,
  //       phone:this.contact.phone,
  //       address:this.contact.address.street,
  //       website:this.contact.website
  //     })
  //   }
  // }

 // test() {
  //   console.log(this.contactForm)
  //   console.log(this.contact)
  //   this.contactForm.patchValue({
  //     id:this.contact.id,
  //     name:this.contact.name,
  //     email:this.contact.email,
  //     mobile:this.contact.mobile,
  //     company:this.contact.company,
  //     title:this.contact.title,
  //     photo:this.contact.photo
  //   })
  // }

    // resetForm() {
  //   this.isupdate = false;
  //   this.contactForm.reset();
  // }

 

  // update() { 
  //   let contact: MyContact = {
  //     id: this.contactForm.value.id,
  //   name: this.contactForm.value.name,
  //   username: this.contactForm.value.username,
  //   email: this.contactForm.value.email,
  //   photo: this.contactForm.value.photo,
  //   mobile: this.contactForm.value.mobile,
  //   company: this.contactForm.value.company,
  //   title: this.contactForm.value.title,
  //   phone:this.contactForm.value.phone,
  //   address:this.contactForm.value.address,
  //   website:this.contactForm.value.website
  //   }
  //   this.contService.updateContacts(contact, this.contact.id).subscribe((data:MyContact)=>{   
  //   })
  //   this.contactChange.emit(contact);
  // }

}
