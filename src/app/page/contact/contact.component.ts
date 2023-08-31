import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { MessageComponent } from 'src/app/dialog/message/message.component';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  message?:string
  fg?:FormGroup=this.fb.group({
    sujet:[''],
    email:['',Validators.required],
    message:['',Validators.required]
  })

  listener:boolean=false;
  constructor(public service:ServiceService,public fb:FormBuilder,public modal:MatDialog){}


  sendMessage(){
    this.listener=true;
    let message={
      'body':this.fg?.value['sujet'],
      'message':this.fg?.value['message'],
      'recipient':this.fg?.value['email']
    }

    this.service.sendMessage(message).subscribe((value)=>{

      if(value.statusCode==200){
        this.modal.open(MessageComponent,{
          data:"Votre Mail à été envoyé avec succés"!
        })
        this.listener=false;
      }
    })
  }

}
