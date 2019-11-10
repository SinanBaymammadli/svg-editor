export interface Coordinate {
  x: number;
  y: number;
}

export interface IShape {
  id: string;
  startCordinate: Coordinate;
  points: Coordinate[];
  closed: boolean;
}

interface ITemplateBase {
  imageUrl: string;
  width: number;
  height: number;
  shapes: IShape[];
}

export interface ITemplateView extends ITemplateBase {
  id: string;
}

export interface ITemplateForm extends ITemplateBase {
  imageFile?: File;
}

interface ShapeInfo {
  shapeId: string;
  title: string;
}

interface ISceneBase {
  templateId: string;
  shapeInfos: ShapeInfo[];
}

export interface ISceneView extends ISceneBase {
  id: string;
}

export interface ISceneForm extends ISceneBase {}
