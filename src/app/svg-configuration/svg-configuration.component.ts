import { Component } from '@angular/core';

import { GenerateSvgService } from './../generate-svg.service';

@Component({
  selector: 'app-svg-configuration',
  templateUrl: './svg-configuration.component.html',
  styleUrls: ['./svg-configuration.component.css']
})
export class SvgConfigurationComponent {

  constructor(public generateSvgService: GenerateSvgService) { }

  changeDivSize(identifier: string){
    const divElement = document.getElementById(identifier);
    if(divElement){
      divElement.style.transform = 'scale(1.2)';
      setTimeout(() => {
        divElement.style.transform = 'scale(1)';
      }, 1200)
    };
    this.generateSvgService.renderCurrent();
  }
}
