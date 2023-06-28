import { Component } from '@angular/core';

import { GenerateSvgService } from './../generate-svg.service';

@Component({
  selector: 'app-svg-viewer',
  templateUrl: './svg-viewer.component.html',
  styleUrls: ['./svg-viewer.component.css']
})
export class SvgViewerComponent {
  constructor(public generateSvgService: GenerateSvgService) { }

}
