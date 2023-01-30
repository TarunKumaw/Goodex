import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { ApiService } from '../../providers/api.service';
  

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  PrimeStatus: string;
  GemsStatus: string;

  constructor(public api : ApiService,
      private router: Router) {

    }

  ngOnInit() {
      this.loadScript();
  }
  ClosewLoginPoupup() {
  
    $(".main_popup").removeClass("is_visible");
  }
 loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute("src") != null &&
        scripts[i].getAttribute("src").includes("loader")
      ) {
        isFound = true;
      }
    }

    var dynamicScripts = [    
      "assets/js/bootstrap.min.js",
      "/assets/js/jquery-ui.js",
      "assets/js/jquery.amsifyselect.js",
      "assets/js/main.js",
      "/assets/js/all.min.js",
      "/assets/js/solid.min.js",
      "/assets/js/regular.min.js",
      "/assets/js/brands.min.js",
    ];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("body")[0].appendChild(node);
    }
  }

 
}
