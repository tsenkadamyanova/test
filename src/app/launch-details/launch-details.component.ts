import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
import {
  NgxGalleryAnimation,
  NgxGalleryOptions,
  NgxGalleryImage
} from "@kolkov/ngx-gallery";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsService.fetch({ id })),
    map(res => res.data.launch)
  );

  ngOnInit(): void {
    this.initGallery();
  }

  private initGallery(): void {
    this.galleryOptions = [
      {
        width: "500px",
        height: "600px",
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // // max-width 800
      {
        breakpoint: 800,
        width: "500px",
        height: "500px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        width: "300px",
        preview: false
      }
    ];

    // Gallery images
    this.launchDetails$.subscribe(result => {
      this.galleryImages = result.links.flickr_images.map(image => {
        return this.createGalleryData(image);
      });
    });
  }

  private createGalleryData(item: NgxGalleryImage): NgxGalleryImage {
    return {
      small: item,
      medium: item,
      big: item
    };
  }
}
