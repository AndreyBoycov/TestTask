import {Component, OnInit} from '@angular/core';
import {withIdentifier} from 'codelyzer/util/astQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  requests = new XMLHttpRequest();
  comments: [{name: string, instagram_username: string, text: string}];
  id = 0;
  loadingComments = true;
  loading = true;
  openReadMore = false;
  mobile = false;
  moreLinks;
    // : [{title: string, url: string, date: string, img: string}];
  arrImage = ['../assets/icons/insta.svg', '../assets/icons/DMEXCO%20(2).svg', '../assets/icons/limits.svg'];

  ngOnInit() {
    this.mobile = window.outerWidth < 600;
    this.loadingComments = true;
    this.requests.open('GET', 'http://localhost:4200/assets/service/feedback_data.json');
    this.requests.responseType = 'json';
    this.requests.onload = () => {
      setTimeout(() => {
        this.loadingComments = false;
        }, 1000);
      this.comments = this.requests.response;
      console.log(this.requests.response, 'this.requests');
      console.log(this.comments, 'this.comments');
    };
    this.requests.send();
  }

  goPost(url: string) {
    const tagA = document.createElement('a' );
    tagA.href = url;
    tagA.target = '_blank';
    tagA.click();
  }

  openMore() {
    if (!this.moreLinks) {
      this.loading = true;
      this.requests.open('GET', 'http://localhost:4200/assets/service/blog_posts.json');
      this.requests.responseType = 'json';
      this.requests.onload = () => {
        setTimeout(() => {
          this.loading = false;
        }, 10000);
        this.moreLinks = this.requests.response;
        let id = 0;
        this.moreLinks = this.moreLinks.map(item => {
          console.log(item);
          item = {...item, img: this.arrImage[id]};
          id = (id >= this.arrImage.length - 1) ? 0 : ++id;
          return item;
        });
        console.log(this.requests.response, 'this.requests');
        console.log(this.moreLinks, 'this.moreLinks');
      };
      this.requests.send();
    }
  }
}
