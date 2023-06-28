import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SvgViewerComponent } from './svg-viewer/svg-viewer.component';
import { SvgCodeViewerComponent } from './svg-code-viewer/svg-code-viewer.component';
import { SvgConfigurationComponent } from './svg-configuration/svg-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SvgViewerComponent,
    SvgCodeViewerComponent,
    SvgConfigurationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
