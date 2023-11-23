export class Twit {
  private static list: Twit[] = [];

  private static count = 1;

  public id: number;
  public date: number;
  public reply: Twit[];

  public constructor(
    public username: string,
    public text: string,
  ) {
    this.id = Twit.count++;

    this.date = new Date().getTime();

    this.reply = [];
  }

  public static create(username: string, text: string, twit?: Twit) {
    const newTwit = new Twit(username, text);

    if (twit) {
      twit.reply.push(newTwit);

      console.log(twit);
    } else {
      this.list.push(newTwit);
    }

    console.log(this.list);

    return newTwit;
  }

  public static getById(id: number) {
    return this.list.find((item) => item.id === Number(id));
  }

  public static getList = () => this.list;
}
