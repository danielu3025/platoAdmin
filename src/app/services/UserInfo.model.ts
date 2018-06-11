export class UserInfo {
  email = '';
  name = '';
  role = '';
  rests: string[] = [];

  constructor(email, name, role, rests) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.rests = rests;
  }
}
