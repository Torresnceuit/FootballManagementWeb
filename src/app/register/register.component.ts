import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    register: any = {};
    loading = false;
    result = '';

    constructor(
        private router: Router,
        private registerService: RegisterService
      ) { }

      
    create() {
        this.loading = true;
        this.registerService.register(this.register)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                    this.result = 'You are required to provide correct information';
                });
    }

  ngOnInit() {
  }

}
