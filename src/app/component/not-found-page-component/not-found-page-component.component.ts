import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser  } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope  } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane  } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-not-found-page-component',
  templateUrl: './not-found-page-component.component.html',
  styleUrls: ['./not-found-page-component.component.css']
})
export class NotFoundPageComponentComponent implements OnInit {


  faUser = faUser;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  faMapMarkedAlt = faMapMarkedAlt;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  returnHomeNav(){
   
    this.router.navigate(['/home']);
  }

}
