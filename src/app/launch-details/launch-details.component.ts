import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
import {
  NgxGalleryAnimation,
  NgxGalleryOptions,
  NgxGalleryImage
} from "@kolkov/ngx-gallery";
import { LaunchDetailsFacadeService } from "../services/launch-details-facade.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  launchDetails$: Observable<any>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL,
    private readonly launchDetailsFacade: LaunchDetailsFacadeService
  ) {
    this.route.paramMap.subscribe(params => {
      this.launchDetails$ = this.launchDetailsFacade.launchDetailsStoreCache(
        params.get("id")
      );
      this.initGallery();
    })
  }

  ngOnInit(): void {;
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
      if (result && result.links) {
        this.galleryImages = result.links.flickr_images.map((image: string) => {
          return this.createGalleryData(image);
        });
      }
    });
  }

  private createGalleryData(item: string): NgxGalleryImage {
    return {
      small: item,
      medium: item,
      big: item
    };
  }
}
