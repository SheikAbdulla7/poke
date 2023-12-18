import { Directive, ElementRef, Input } from '@angular/core';

type ImgSrc = string | null | undefined
@Directive({ 
    standalone: true,
    selector: '[appRenderImage]' 
})
export class ImageRenderDirective {
    @Input() appRenderImage: ImgSrc

    private static defaultImage = "../../assets/no_image.jpg";
    private static count=0;
    constructor(private elementRef: ElementRef) { 
        console.log("Entered directive")
        this.initImage()
    }

    private initImage() {
        // this.elementRef.nativeElement.onload = () => {
        //     console.log("src data " + this.appRenderImage + " " + ++ImageRenderDirective.count)
        // }

        this.elementRef.nativeElement.onerror = () => {
            // console.log("Error When loading source data " + this.appRenderImage)
            this.setImage(ImageRenderDirective.defaultImage)
        }
    }

    private setImage(src: ImgSrc) {
        this.elementRef.nativeElement.setAttribute("src", src);
    }

    
}