import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { TipComponent } from './tip/tip.component';
import { TipGroupComponent } from './tip-group/tip-group.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    TipComponent,
    TipGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPageScrollModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.image = (href: string, title: string, text: string) => {
    let imgSrc;
    let imgTitle;
    let imgAlt;
    let imgClass;
    if (text === '' || text === 'a') {
      imgSrc = 'assets/emoji/' + href + (text === 'a' ? '.gif' : '.png');
      imgTitle = href;
      imgAlt = href;
      imgClass = 'emoji';
    } else {
      imgSrc = (href.startsWith('http') ? '' : 'assets/images/') + href;
      if (title != null && title != '') {
        imgTitle = title;
        imgAlt = title;
      } else {
        imgTitle = text;
        imgAlt = text;
      }
      imgClass = 'image';
    }
    return '<img src="' + imgSrc + '" title="' + imgTitle + '" alt="' + imgAlt + '" class="' + imgClass + '"/>';
  }

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
