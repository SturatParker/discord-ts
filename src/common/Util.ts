export class Util {
  static channelMention(id: string): string {
    return `<#${id}>`;
  }
  static memberMention(id: string): string {
    return `<@${id}>`;
  }
}
