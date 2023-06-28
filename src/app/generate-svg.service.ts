import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as makerjs from 'makerjs';
import * as opentype from 'opentype.js';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


class Example {
  models: any;
  origin: number[];

  constructor(position: number[], varTextModel: makerjs.models.Text, outlineMargin: number, holePositionX: number, holePositionY: number, font: opentype.Font , textName: string, size: number) {
    const makerjs = require('makerjs');
    
    try {
      this.models = {
        textModel: varTextModel,
        outlineTextModel: makerjs.model.expandPaths(varTextModel, outlineMargin),
        outlineRingModel: makerjs.model.move(new makerjs.models.Oval(12, 12), [holePositionX, holePositionY]),
        ringModel: makerjs.model.move(new makerjs.models.Oval(5, 5), [holePositionX + 3.4, holePositionY + 4])
      };
    }catch(error){
      this.models = {
        textModel: varTextModel,
        //outlineTextModel: makerjs.model.outline(new makerjs.models.Text(font, textName, size, true), outlineMargin),
        outlineRingModel: makerjs.model.move(new makerjs.models.Oval(12, 12), [holePositionX, holePositionY]),
        ringModel: makerjs.model.move(new makerjs.models.Oval(5, 5), [holePositionX + 3.4, holePositionY + 4])
      };
    }
    

    this.origin = position;
  }
}


@Injectable({
  providedIn: 'root'
})
export class GenerateSvgService {
  public fontList: any[] = [];
  public listFont: any[] = [];
  private textInput?: HTMLInputElement; 
  private sizeInput?: HTMLInputElement;
  private holePositionY?: HTMLInputElement;
  private holePositionX?: HTMLInputElement;
  private outlineMargin?: HTMLInputElement;
  private indexFonts: Record<string, number> = {
    "ABeeZee": 0,
    "Acme": 7,
    "Bree Serif": 209,
    "Oswald": 1099,
    "Old Standard TT": 1085
  };
  private fontSelector?: HTMLInputElement;

  public selected_font: string = "ABeeZee";
  public text_input: string = "Verb";
  public size_input: number = 25;
  public input_hole_y: number = 17;
  public input_hole_x: number = -7;
  public input_outline: number = 3;
  public outline_svg: string = "";

  public prova: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('');
  public codeViewer: string = "";

  // Function
  public models: any = {};
  public origin: number[] = [0, 0];

  constructor(
      private http: HttpClient,
      private sanitizer: DomSanitizer
    ) { 
    this.init();
    this.loadFonts()
  }

  getGoogleFonts(apiKey: string): Observable<any> {
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;
  
    return this.http.get(url).pipe(
      tap((response: any) => {
        this.fontList = response.items;
      })
    );
  }

  init(){
    this.textInput = document.querySelector('#input-text') as HTMLInputElement;
    this.sizeInput = document.querySelector('#input-size') as HTMLInputElement;
    this.holePositionY = document.querySelector('#holePositionY') as HTMLInputElement;
    this.holePositionX = document.querySelector('#holePositionX') as HTMLInputElement;
    this.outlineMargin = document.querySelector('#outlineMargin') as HTMLInputElement;
    this.fontSelector = document.querySelector('#fontSelector') as HTMLInputElement;
  }
  async loadFonts() {
    try {
      await this.getGoogleFonts('AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc').toPromise();

      this.fontList?.forEach((font) => {
        this.listFont.push(font);
      });

      this.readQueryParams();
      
      this.renderCurrent();
    } catch (error) {
      console.log(error);
    }
  }

  readQueryParams() {

    if(!this.text_input){
      this.text_input = "Verb";
    }
    if(!this.size_input){
      this.size_input = 25;
    }
    if(!this.input_hole_y){
      this.input_hole_y = 17;
    }
    if(!this.input_hole_x){
      this.input_hole_x = -7;
    }
    if(!this.input_outline){
      this.input_outline = 3;
    }
  }

  renderCurrent() {
    this.render(
      this.text_input,
      this.size_input,
      this.input_hole_y,
      this.input_hole_x,
      this.input_outline,
      this.selected_font
    );
  }

  render(
    text: string,
    size: number,
    holePositionY: number,
    holePositionX: number,
    outlineMargin: number,
    fontName: string
  ){
    var f = this.fontList[this.indexFonts[fontName]];
    var url = f.files['regular'].substring(5); //remove http:


    if(text){
      var textArray = text.split(" ");

      opentype.load(url, (err, font) => {
        if(!err && font){
          this.callMakerjs(font, textArray, size, holePositionY, holePositionX, outlineMargin);
        }
      });
    }  
  }


  callMakerjs(font: opentype.Font, text: string[], size: number, holePositionY: number, 
    holePositionX: number, outlineMargin: number){

      this.prova = this.sanitizer.bypassSecurityTrustHtml('');

      
      function addName(textName:string, position:number[]) {
        var varTextModel = new makerjs.models.Text(font, textName, size, true);

        /* function example(origin: number[]) {
          // All the models
          self.models = {
            textModel: varTextModel,
            outlineTextModel: makerjs.model.expandPaths(varTextModel, outlineMargin),
            outlineRingModel: makerjs.model.move(new makerjs.models.Oval(12, 12), [holePositionX, holePositionY]),
            ringModel: makerjs.model.move(new makerjs.models.Oval(5, 5), [holePositionX+3.4, holePositionY+4])
          };
          self.origin = origin;
        } */
        
        var examples = {
          models: {
              x1: new Example(position, varTextModel, outlineMargin, holePositionX, holePositionY, font, textName, size)
          }
        };
        
        
        var x = examples.models;
        try {
          makerjs.model.combine(x.x1.models.outlineTextModel, x.x1.models.outlineRingModel, false, true, false, true);
        }catch(error){
          console.log("Error combine");
        }
        

        x.x1.models.outlineRingModel.layer = "red";
        x.x1.models.ringModel.layer = "red";
        try {
          x.x1.models.outlineTextModel.layer = "red"; 
        }catch(error){
          console.log("Eror change color")
        }

        return examples.models.x1;

      }
      var toExport: { models: Record<string, any> } = {
        models: {

        }
      };

      var i = 1;
      var position:number[] = [0, 0];
      text.forEach((textName) => {
        var propName = "x"+i.toString();
        let prov = addName(textName, position);
        toExport.models[propName] = prov;

        const provModel1 = prov.models.outlineTextModel;
        const modelSize1 = makerjs.measure.modelExtents(provModel1);
        const provModel2 = prov.models.outlineRingModel;
        const modelSize2 = makerjs.measure.modelExtents(provModel2);
        const altura = modelSize1.height+modelSize2.height; 

        position = [0, position[1]-altura];
        i++;
      });
 
      var svg = makerjs.exporter.toSVG(toExport, {
        fill: 'none',
        units: 'mm' 
      });

      this.prova = this.sanitizer.bypassSecurityTrustHtml(svg);
      this.codeViewer = svg;

      

    }
}