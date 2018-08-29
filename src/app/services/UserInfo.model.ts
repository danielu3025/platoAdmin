export class UserInfo {
  fbId = '';
  email = '';
  name = '';
  role = '';
  lastSelectedRest = '';
  pic = '';
  rests: string[] = [];

  constructor(fbId: string, email: string, name: string, role: string, lastSelectedRest: string, pic: string, rests: string[]) {
    this.fbId = fbId;
    this.email = email;
    this.name = name;
    this.role = role;
    this.lastSelectedRest = lastSelectedRest;
    this.pic = pic;
    this.rests = rests;
  }
}
