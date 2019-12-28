export class Mission {
    constructor(
      public id: number = null,
      public phoneNumber: string = null,
      public description: string = null,
      public address: string = null,
      public employerId: number = 0,
      public missionTypeId: number = 0
    ){};
  };