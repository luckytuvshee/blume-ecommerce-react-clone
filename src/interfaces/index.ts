export interface Container {
  id: string;
  className: string;
  style: any;
}

export interface SlideObject {
  id: string;
  className: string;
  style: any;
  props: any;
}

export interface Slide {
  slideId: string;
  name: string;
  containers: Container[];
  backgrounds: Object[];
  objects: Object[];
}

export interface Project {
  projectId?: string;
  slides: Slide[];
  paperSize: string;
}

export interface Image {
  imageUrl: string;
  imageType: string;
}

export interface BackgroundImage {
  className: string;
  style?: Object;
  imageurl?: string;
  src?: string;
}
