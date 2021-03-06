import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';
import { UserdashboardComponent } from '../userdashboard.component';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-viewissuedbooks',
  templateUrl: './viewissuedbooks.component.html',
  styleUrls: ['./viewissuedbooks.component.css']
})
export class ViewissuedbooksComponent implements OnInit {
  userissueObj:any;
  username:string;
  viewusertemp:boolean=false;
  constructor(private router:Router,private hc:HttpClient,private us:UserdashboardComponent,private ls:LoginService) { }

  ngOnInit() {
    this.username=this.us.username;
    this.hc.get(`user/viewissuedbooks/${this.us.userObj["userid"]}`).subscribe((objOfres:object)=>{
      if(objOfres["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.userLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else
      {
      this.userissueObj=objOfres["data"];
      this.viewusertemp = true;
     console.log("this is userissue obj",this.userissueObj);
     $(function() {
      $(document).ready(function() {
        $('#userissueexample').DataTable();
      });
    }); 
  }
});

  }
 
}
