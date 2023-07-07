import { Component } from '@angular/core';
import { GenerateSvgService } from './../generate-svg.service';
  
@Component({
  selector: 'app-svg-code-viewer',
  templateUrl: './svg-code-viewer.component.html',
  styleUrls: ['./svg-code-viewer.component.css']
})
export class SvgCodeViewerComponent {
  showMessage: boolean = false;
  alertMessage: string = "Copied";
  
  textareaValue: any;

  constructor (
    public generateSvgService: GenerateSvgService
    ){
    
  }

  copyCode(){
    navigator.clipboard.writeText(this.generateSvgService.codeViewer)
      .then(() => {
        this.alertMessage = "Copied";
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      })
      .catch((error) => {
        this.alertMessage = "Error";
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      });
  }

}
