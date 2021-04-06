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
    if (text === '' || text === 'a') {
      return '<img src="assets/emoji/' + href + (text === 'a' ? '.gif' : '.png') + '" title="' + href + '" alt="' + href + '" class="emoji"/>';
    } else {
      return '<img src="' + (href.startsWith('http') ? '' : 'assets/images/') + href + '" ' + (title != '' ? 'title="' + title + '" alt="' + title + '" ' :
        'title="' + text + '" alt="' + text + '" ') + 'class="image"/>';
    }
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
