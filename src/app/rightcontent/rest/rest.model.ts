const telAvivLat = 32.109333;
const telAvivLot = 34.855499;

export class Location {
  public latitude = telAvivLat;
  public longitude = telAvivLot;
}

export class Rest {
  public id: string;
  public accesability = false;
  public address: string;

  public location: Location = new Location();

  public name: string;
  public phone = '';
  public picture: string;
  public rank: Object = {
    rankSum: 0,
    totalRanks: 0
  };
  public smoking = false;
  public type = 'Caffe';
  public subMenus: string[];
  public workingDays: WorkingDay[] = [];
}

export class WorkingDay {
  public startingTime = '00:00';
  public endTime = '23:59';
  public isBusy = false;
  public busyHourStart = '00:00';
  public busyHourEnd = '23:59';
}
