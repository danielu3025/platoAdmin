export class UserInfo {
  fbId = '';
  email = '';
  name = '';
  role = '';
  lastSelectedRest = '';
  rests: string[] = [];

  constructor(fbId: string, email: string, name: string, role: string, lastSelectedRest: string, rests: string[]) {
    this.fbId = fbId;
    this.email = email;
    this.name = name;
    this.role = role;
    this.lastSelectedRest = lastSelectedRest;
    this.rests = rests;
  }
}
