import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./main-navbar.component.html",
  styleUrls: ["./main-navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private eleRef: ElementRef) {
    router.events.subscribe(res => {
      if (this.router.url === "/home") {
        this.eleRef.nativeElement.querySelector(
          ".navbar.scrolling-navbar"
        ).style.background = "rgba(171, 178, 185, 0.9)";
      }
      if (this.router.url.includes("/profile")) {
        this.eleRef.nativeElement.querySelector(".navbar").style.background =
          "#85C1E9";
      }
    });

    function scrollFunction() {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.background="#c0c0c0";
     
      } else {
        document.getElementById("navbar").style.background="";
      }
    }
    
  }

  ngOnInit() {}
}
