import { MissionImage } from "./mission-image.model";

export class MissionDetails {
  constructor(
    public id: number,
    public name: string,
    public phoneNumber: string,
    public description: string,
    public address: string,
    public employer: Employer,
    public missionTypeName: string,
    public missionNotes: MissionNote[],
    public missionImages: MissionImage[],
  ){};
};

interface MissionNote{
  id: number;
  title: string;
  pinned: boolean;
  createdAt: Date;
}

interface Employer{

}
