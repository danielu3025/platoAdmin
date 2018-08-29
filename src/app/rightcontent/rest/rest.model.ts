const telAvivLat = 32.109333;
const telAvivLot = 34.855499;

export class Location {
  public latitude = telAvivLat;
  public longitude = telAvivLot;
}

export class RankingAlerts {
  public rank1 = 0;
  public rank2 = 0;
  public rank3 = 0;
}

export class Rest {
  public id: string;
  public accesability = false;
  public address: string;
  public location: Location = new Location();
  public name: string;
  public phone = '';
  public predict = false;
  public picture: string;
  public smoking = false;
  public type = 'Caffe';
  public subMenus: string[];
  public workingDays: WorkingDay[] = [];
}

export class WorkingDay {
  public startingHour = '00:00';
  public endHour = '23:59';
  public isBusy = false;
  public busyHourStart = '00:00';
  public busyHourEnd = '23:59';
}
